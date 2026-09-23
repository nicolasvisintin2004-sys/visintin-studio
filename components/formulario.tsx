"use client";

import { useState, type FormEvent } from "react";
import { botonPrimario, botonSecundario } from "@/components/boton";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { API_LEADS, mensajes } from "@/content/sitio";
import { formulario as textos } from "@/content/textos";
import { registrarEnvioLead } from "@/lib/analitica";
import { leerUtm } from "@/lib/utm";

/**
 * El formulario de consulta.
 *
 * Antes armaba un mensaje y abría WhatsApp. Ahora guarda la consulta de
 * verdad, y el motivo es el que está explicado largo en README-MEDICION.md:
 * WhatsApp convierte bien pero no deja rastro. No se puede medir, no se puede
 * volver a escribirle al que no contestó y no queda ninguna lista. Con el
 * formulario quedan las dos cosas: el dato guardado y el aviso por correo.
 *
 * WhatsApp no desaparece. Sigue siendo el botón grande de la página de
 * contacto, el botón flotante de todas las páginas y el destino de los nueve
 * entregables. Lo que cambia es que deja de ser el único camino.
 *
 * Del otro lado hay una función de Netlify y no una ruta de Next: el sitio se
 * compila estático y en export no existen las rutas que leen el cuerpo de una
 * petición. La dirección pública igual es `/api/leads`, por el
 * redireccionamiento de `netlify.toml`.
 */

const campo =
  "w-full rounded-lg border border-borde bg-superficie px-4 py-3.5 text-[0.9375rem] text-texto placeholder:text-suave/60 transition-colors duration-300 focus:border-acento focus:outline-none";

const etiqueta = "t-dato mb-2.5 block text-suave";

type Estado = "listo" | "enviando" | "exito" | "error";

type Props = {
  /**
   * De qué página salió la consulta. Viaja hasta la base de datos: es lo que
   * después permite saber si el diagnóstico trae más consultas que contacto.
   */
  origen: string;
};

export function Formulario({ origen }: Props) {
  const [estado, setEstado] = useState<Estado>("listo");

  async function alEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (estado === "enviando") return;

    const datos = new FormData(evento.currentTarget);
    const rubro = String(datos.get("rubro") ?? "");

    setEstado("enviando");

    try {
      const respuesta = await fetch(API_LEADS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: datos.get("nombre"),
          empresa: datos.get("empresa"),
          whatsapp: datos.get("whatsapp"),
          email: datos.get("email"),
          rubro,
          mensaje: datos.get("mensaje"),
          consentimiento: datos.get("consentimiento") === "on",
          // El honeypot. Un humano no lo ve y lo manda vacío.
          sitioWeb: datos.get("sitio-web"),
          origen,
          ...leerUtm(),
        }),
      });

      if (!respuesta.ok) throw new Error(String(respuesta.status));

      // El evento se registra con la respuesta correcta y no al tocar el
      // botón: si no, un error de red contaría como consulta recibida.
      registrarEnvioLead(origen, rubro);
      setEstado("exito");
    } catch {
      setEstado("error");
    }
  }

  if (estado === "exito") return <Exito />;

  return (
    <form onSubmit={alEnviar} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Campo id="nombre" etiquetaTexto={textos.nombre} marcador={textos.nombreMarcador} auto="name" />
        <Campo
          id="empresa"
          etiquetaTexto={textos.empresa}
          marcador={textos.empresaMarcador}
          auto="organization"
        />
        <Campo
          id="whatsapp"
          tipo="tel"
          etiquetaTexto={textos.whatsapp}
          marcador={textos.whatsappMarcador}
          auto="tel"
        />
        <Campo
          id="email"
          tipo="email"
          etiquetaTexto={textos.email}
          marcador={textos.emailMarcador}
          auto="email"
        />
      </div>

      <div>
        <label htmlFor="rubro" className={etiqueta}>
          {textos.rubro}
        </label>
        <select id="rubro" name="rubro" required defaultValue="" className={campo}>
          <option value="" disabled>
            {textos.rubroMarcador}
          </option>
          {textos.rubros.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className={etiqueta}>
          {textos.mensaje}{" "}
          <span className="text-suave/60">· {textos.mensajeOpcional}</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          placeholder={textos.mensajeMarcador}
          className={`${campo} resize-y`}
        />
      </div>

      {/*
        El honeypot.
        Fuera de pantalla y fuera del recorrido del tabulador, sin etiqueta
        visible y oculto a los lectores. Un robot que completa todo lo que
        encuentra lo llena; una persona no lo ve nunca. Se eligió esto y no un
        captcha a propósito: el captcha frena robots y también frena clientes.
      */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="sitio-web">No completar este campo</label>
        <input id="sitio-web" name="sitio-web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-[0.875rem] leading-relaxed text-suave">
        <input
          type="checkbox"
          name="consentimiento"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-acento)]"
        />
        <span>{textos.consentimiento}</span>
      </label>

      {/* `aria-live` para que el error se anuncie sin mover el foco. */}
      <div aria-live="polite">
        {estado === "error" && (
          <div className="rounded-lg border border-acento/40 bg-superficie p-5">
            <p className="font-display text-[1.0625rem] font-medium">{textos.errorTitulo}</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-suave">
              {textos.errorTexto}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={estado === "enviando"}
          className={`${botonPrimario} w-full disabled:cursor-wait disabled:opacity-60 sm:w-auto`}
        >
          {estado === "enviando"
            ? textos.enviando
            : estado === "error"
              ? textos.errorAccion
              : textos.enviar}
        </button>
        <p className="text-[0.8125rem] leading-relaxed text-suave/80">{textos.privacidad}</p>
      </div>
    </form>
  );
}

/**
 * El estado de éxito.
 *
 * Reemplaza al formulario en el mismo lugar, con la misma entrada que usa
 * todo el sitio. No es un `alert` ni un cartel arriba de todo: la persona
 * acaba de mirar ese rectángulo durante un minuto y la respuesta tiene que
 * aparecer ahí. Dice el plazo, porque "gracias" sin plazo deja a alguien sin
 * saber si esperar o escribir por otro lado.
 */
function Exito() {
  return (
    <div className="entra-tarde rounded-lg border border-acento bg-superficie p-8 lg:p-10">
      <p className="t-etiqueta text-acento">{textos.exitoTitulo}</p>
      <p className="t-cuerpo mt-5 text-[1.0625rem]">{textos.exitoTexto}</p>
      <EnlaceWhatsApp
        mensaje={mensajes.urgente}
        origen="formulario_exito"
        className={`${botonSecundario} mt-8`}
      >
        {textos.exitoAccion}
      </EnlaceWhatsApp>
    </div>
  );
}

/** Un campo de texto. Los cuatro de arriba son iguales salvo el rótulo. */
function Campo({
  id,
  etiquetaTexto,
  marcador,
  tipo = "text",
  auto,
}: {
  id: string;
  etiquetaTexto: string;
  marcador: string;
  tipo?: "text" | "email" | "tel";
  auto: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={etiqueta}>
        {etiquetaTexto}
      </label>
      <input
        id={id}
        name={id}
        type={tipo}
        required
        autoComplete={auto}
        placeholder={marcador}
        className={campo}
      />
    </div>
  );
}
