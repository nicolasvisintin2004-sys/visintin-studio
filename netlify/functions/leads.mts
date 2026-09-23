import { createHash } from "node:crypto";
import type { Config, Context } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { z } from "zod";

/**
 * Recibe las consultas del formulario.
 *
 * ── Por qué es una función de Netlify y no `app/api/leads/route.ts` ──
 *
 * El sitio se compila con `output: "export"`: cada ruta queda como un archivo
 * HTML servido desde el CDN, sin nada corriendo del otro lado. En ese modo
 * Next no admite rutas que lean el cuerpo de una petición —sólo GET que se
 * resuelven al compilar—, así que un `route.ts` con POST directamente rompe
 * la compilación.
 *
 * Las dos salidas eran: dejar el export estático y poner el endpoint en una
 * función, o abandonar el export y servir todo el sitio con el runtime de
 * Next sobre Netlify. Se eligió lo primero: el sitio entero sigue siendo
 * estático y medido, la dirección pública sigue siendo `/api/leads` —la
 * declara el `config` de abajo—, y el formulario no sabe la diferencia.
 *
 * ── Qué hace ──
 *
 *  1. Valida con Zod, del lado del servidor. La validación del navegador es
 *     para la persona; ésta es la que cuenta.
 *  2. Descarta los robots con un honeypot, sin captcha.
 *  3. Limita a cinco envíos por hora desde la misma dirección IP.
 *  4. Guarda en Supabase.
 *  5. Avisa por correo con Resend, si está configurado.
 *
 * Los pasos 4 y 5 son independientes: que falle el aviso no puede perder la
 * consulta, y que falte Resend no puede impedir el guardado.
 */

const LIMITE_POR_HORA = 5;

const esquema = z.object({
  nombre: z.string().trim().min(2, "Nombre demasiado corto").max(120),
  empresa: z.string().trim().min(1, "Falta la empresa").max(160),
  whatsapp: z.string().trim().min(6, "Teléfono demasiado corto").max(40),
  email: z.email("Correo inválido").trim().max(160),
  /**
   * Se valida como texto acotado y no contra la lista de rubros del sitio.
   * La lista vive en `content/textos.ts`, que esta función no importa a
   * propósito: el bundler de Netlify compila esta carpeta por su cuenta y no
   * conoce el alias `@/`. Acoplarlas obligaría a redeployar la función cada
   * vez que se agrega un rubro, que es exactamente lo que no queremos.
   */
  rubro: z.string().trim().min(1).max(80),
  mensaje: z.string().trim().max(2000).optional().default(""),
  consentimiento: z.literal(true, { message: "Falta el consentimiento de contacto" }),
  origen: z.string().trim().max(60).optional().default("desconocido"),
  utm_source: z.string().trim().max(120).optional(),
  utm_medium: z.string().trim().max(120).optional(),
  utm_campaign: z.string().trim().max(120).optional(),
  /** El honeypot: si viene con algo, lo completó un robot. */
  sitioWeb: z.string().max(200).optional(),
});

/**
 * La IP, convertida en una huella que no permite reconstruirla.
 *
 * Hace falta un identificador estable para contar cinco envíos por hora, pero
 * no hace falta la dirección en sí, así que no se guarda. Con `LEADS_IP_SALT`
 * definida, la huella además no se puede comparar contra una tabla de hashes
 * precalculados de todo el espacio de direcciones, que es chico.
 */
function huellaDeIp(ip: string): string {
  const sal = process.env.LEADS_IP_SALT ?? "";
  return createHash("sha256").update(`${sal}:${ip}`).digest("hex").slice(0, 32);
}

function supabase() {
  const url = process.env.SUPABASE_URL;
  const clave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !clave) return null;

  // La clave de servicio saltea las políticas de fila. Es correcto acá y sólo
  // acá: esto corre en el servidor y la clave nunca llega al navegador.
  return createClient(url, clave, { auth: { persistSession: false } });
}

function json(cuerpo: unknown, estado: number) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { "Content-Type": "application/json" },
  });
}

const recibirConsulta = async (peticion: Request, contexto: Context) => {
  if (peticion.method !== "POST") {
    return json({ error: "Método no permitido" }, 405);
  }

  // ── 1. Validación ────────────────────────────────────────────────
  let crudo: unknown;
  try {
    crudo = await peticion.json();
  } catch {
    return json({ error: "Cuerpo inválido" }, 400);
  }

  const resultado = esquema.safeParse(crudo);
  if (!resultado.success) {
    return json(
      { error: "Datos inválidos", detalle: resultado.error.issues.map((i) => i.message) },
      400,
    );
  }
  const datos = resultado.data;

  // ── 2. Honeypot ──────────────────────────────────────────────────
  // Se responde 200 y no un error: un robot que recibe 400 reintenta con otra
  // forma, y uno que recibe 200 se da por satisfecho y se va.
  if (datos.sitioWeb && datos.sitioWeb.trim() !== "") {
    return json({ ok: true }, 200);
  }

  const base = supabase();
  const huella = huellaDeIp(contexto.ip ?? "desconocida");

  // ── 3. Límite por hora ───────────────────────────────────────────
  if (base) {
    const desde = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error } = await base
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", huella)
      .gte("created_at", desde);

    // Si la consulta del límite falla, se deja pasar el envío. Perder una
    // consulta real es peor que aceptar una repetida.
    if (!error && (count ?? 0) >= LIMITE_POR_HORA) {
      return json({ error: "Demasiados envíos. Probá de nuevo en un rato." }, 429);
    }
  }

  // ── 4. Guardado ──────────────────────────────────────────────────
  let guardado = false;
  if (base) {
    const { error } = await base.from("leads").insert({
      nombre: datos.nombre,
      empresa: datos.empresa,
      whatsapp: datos.whatsapp,
      email: datos.email,
      rubro: datos.rubro,
      mensaje: datos.mensaje || null,
      origen: datos.origen,
      utm_source: datos.utm_source ?? null,
      utm_medium: datos.utm_medium ?? null,
      utm_campaign: datos.utm_campaign ?? null,
      ip_hash: huella,
    });

    if (error) console.error("[leads] Supabase:", error.message);
    else guardado = true;
  }

  // ── 5. Aviso por correo ──────────────────────────────────────────
  const avisado = await avisar(datos);

  /**
   * Si no se pudo ni guardar ni avisar, la consulta se perdió y hay que
   * decirlo: el formulario muestra el error y ofrece WhatsApp. Es preferible
   * eso a un "gracias" mientras el dato se cae por un agujero.
   */
  if (!guardado && !avisado) {
    return json({ error: "No se pudo registrar la consulta" }, 503);
  }

  return json({ ok: true }, 200);
};

export default recibirConsulta;

/** Manda el aviso. Devuelve si salió; nunca lanza. */
async function avisar(datos: z.infer<typeof esquema>): Promise<boolean> {
  const clave = process.env.RESEND_API_KEY;
  const destino = process.env.LEADS_EMAIL_TO;
  const remitente = process.env.LEADS_EMAIL_FROM;
  if (!clave || !destino || !remitente) return false;

  const campana = [datos.utm_source, datos.utm_medium, datos.utm_campaign]
    .filter(Boolean)
    .join(" · ");

  const lineas = [
    `Nombre: ${datos.nombre}`,
    `Empresa: ${datos.empresa}`,
    `WhatsApp: ${datos.whatsapp}`,
    `Correo: ${datos.email}`,
    `Rubro: ${datos.rubro}`,
    `Origen: ${datos.origen}`,
    campana ? `Campaña: ${campana}` : null,
    "",
    datos.mensaje || "(sin mensaje)",
  ].filter((linea) => linea !== null);

  try {
    const { error } = await new Resend(clave).emails.send({
      from: remitente,
      to: destino,
      replyTo: datos.email,
      // El asunto trae el nombre y la empresa para poder contestar desde el
      // listado del correo sin abrir el mensaje.
      subject: `Consulta de ${datos.nombre} — ${datos.empresa}`,
      text: lineas.join("\n"),
    });

    if (error) {
      console.error("[leads] Resend:", error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[leads] Resend:", error);
    return false;
  }
}

/**
 * La dirección pública. Netlify enruta esta función en `/api/leads` sin que
 * haga falta un redireccionamiento en `netlify.toml`.
 */
export const config: Config = {
  path: "/api/leads",
};
