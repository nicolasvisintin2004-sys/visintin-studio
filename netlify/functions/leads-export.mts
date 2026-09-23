import { timingSafeEqual } from "node:crypto";
import type { Config } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

/**
 * Descarga las consultas en CSV.
 *
 * Existe para no tener que entrar al panel de Supabase cada vez que se quiere
 * ver la lista: la dirección se abre en el navegador y baja un archivo que se
 * abre en Excel o en Google Sheets.
 *
 * Se autentica de dos maneras y las dos comparan en tiempo constante:
 *
 *  · `Authorization: Bearer <ADMIN_TOKEN>` — la preferible, para `curl` o
 *    para cualquier cosa automatizada.
 *  · `?token=<ADMIN_TOKEN>` — para abrirla desde el navegador, donde no se
 *    pueden poner encabezados a mano.
 *
 * La segunda deja el token en el historial del navegador y en los registros
 * del servidor. Es un compromiso consciente para que la lista sea accesible
 * de verdad, pero por eso el token tiene que ser largo, propio de esta
 * función y rotable: no sirve para nada más que leer esta lista.
 */

/** No filtra por longitud: `timingSafeEqual` exige buffers del mismo tamaño. */
function coincide(recibido: string, esperado: string): boolean {
  const a = Buffer.from(recibido);
  const b = Buffer.from(esperado);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Escapa un valor para CSV: comillas dobles y separadores adentro del campo. */
function celda(valor: unknown): string {
  if (valor === null || valor === undefined) return "";
  const texto = String(valor);
  // El prefijo con comilla simple neutraliza las fórmulas: un campo que
  // empieza con `=` o `+` lo ejecuta Excel al abrir el archivo, y el campo lo
  // escribió alguien de afuera.
  const seguro = /^[=+\-@\t\r]/.test(texto) ? `'${texto}` : texto;
  return `"${seguro.replace(/"/g, '""')}"`;
}

const COLUMNAS = [
  "created_at",
  "nombre",
  "empresa",
  "whatsapp",
  "email",
  "rubro",
  "mensaje",
  "origen",
  "utm_source",
  "utm_medium",
  "utm_campaign",
] as const;

const descargarConsultas = async (peticion: Request) => {
  const esperado = process.env.ADMIN_TOKEN;
  if (!esperado) {
    return new Response("ADMIN_TOKEN no está configurado", { status: 503 });
  }

  const encabezado = peticion.headers.get("authorization") ?? "";
  const delEncabezado = encabezado.startsWith("Bearer ") ? encabezado.slice(7) : "";
  const deLaDireccion = new URL(peticion.url).searchParams.get("token") ?? "";
  const recibido = delEncabezado || deLaDireccion;

  if (!coincide(recibido, esperado)) {
    return new Response("No autorizado", { status: 401 });
  }

  const url = process.env.SUPABASE_URL;
  const clave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !clave) {
    return new Response("Supabase no está configurado", { status: 503 });
  }

  const base = createClient(url, clave, { auth: { persistSession: false } });
  const { data, error } = await base
    .from("leads")
    .select(COLUMNAS.join(","))
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) {
    console.error("[leads-export] Supabase:", error.message);
    return new Response("No se pudo leer la lista", { status: 502 });
  }

  const filas = (data ?? []) as unknown as Record<string, unknown>[];
  const csv = [
    COLUMNAS.join(","),
    ...filas.map((fila) => COLUMNAS.map((columna) => celda(fila[columna])).join(",")),
  ].join("\n");

  const fecha = new Date().toISOString().slice(0, 10);

  return new Response(
    // El BOM es lo que hace que Excel en Windows abra las tildes bien. Sin
    // esto, "Metalmecánica" llega como "MetalmecÃ¡nica".
    `﻿${csv}`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="consultas-${fecha}.csv"`,
        // Una lista de contactos no se guarda en ninguna caché intermedia.
        "Cache-Control": "no-store, private",
      },
    },
  );
};

export default descargarConsultas;

export const config: Config = {
  path: "/api/leads/export",
};
