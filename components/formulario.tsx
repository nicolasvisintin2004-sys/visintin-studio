"use client";

import { useId, useState } from "react";
import { seccion, textos } from "@/content/textos";
import type { Idioma } from "@/lib/i18n";
import { sitio } from "@/lib/sitio";

const campoBase =
  "border-line-strong bg-surface text-fg text-body w-full rounded-md border px-1.5 py-1 " +
  "placeholder:text-fg-muted focus-visible:border-fg";

/**
 * No hay backend, y agregar uno para cinco campos sería agregar una cosa
 * más que se puede romper. El formulario arma un mensaje ordenado y lo
 * abre en WhatsApp, que es donde este cliente contesta igual.
 */
export function Formulario({ idioma }: { idioma: Idioma }) {
  const id = useId();
  const txt = seccion(textos.formulario, idioma);

  const [datos, setDatos] = useState({
    nombre: "",
    negocio: "",
    rubro: txt.rubros[0],
    necesita: "",
    presupuesto: txt.presupuestos[0],
  });

  const mensaje =
    `${txt.encabezado}\n\n` +
    `${txt.campoNombre}: ${datos.nombre || "—"}\n` +
    `${txt.campoNegocio}: ${datos.negocio || "—"}\n` +
    `${txt.campoRubro}: ${datos.rubro}\n` +
    `${txt.campoPresupuesto}: ${datos.presupuesto}\n\n` +
    `${txt.campoNecesita}:\n${datos.necesita || "—"}`;

  const completo = datos.nombre.trim() !== "" && datos.necesita.trim() !== "";

  const actualizar = (campo: keyof typeof datos) => (valor: string) =>
    setDatos((previos) => ({ ...previos, [campo]: valor }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.open(
          `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(mensaje)}`,
          "_blank",
          "noopener,noreferrer",
        );
      }}
      className="space-y-3"
    >
      <div>
        <label htmlFor={`${id}-nombre`} className="etiqueta block">
          {txt.nombre}
        </label>
        <input
          id={`${id}-nombre`}
          name="nombre"
          required
          autoComplete="name"
          value={datos.nombre}
          onChange={(e) => actualizar("nombre")(e.target.value)}
          className={`${campoBase} mt-1`}
        />
      </div>

      <div>
        <label htmlFor={`${id}-negocio`} className="etiqueta block">
          {txt.negocio}
        </label>
        <input
          id={`${id}-negocio`}
          name="negocio"
          autoComplete="organization"
          value={datos.negocio}
          onChange={(e) => actualizar("negocio")(e.target.value)}
          className={`${campoBase} mt-1`}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label htmlFor={`${id}-rubro`} className="etiqueta block">
            {txt.rubro}
          </label>
          <select
            id={`${id}-rubro`}
            name="rubro"
            value={datos.rubro}
            onChange={(e) => actualizar("rubro")(e.target.value)}
            className={`${campoBase} mt-1`}
          >
            {txt.rubros.map((rubro) => (
              <option key={rubro} value={rubro}>
                {rubro}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-presupuesto`} className="etiqueta block">
            {txt.presupuesto}
          </label>
          <select
            id={`${id}-presupuesto`}
            name="presupuesto"
            value={datos.presupuesto}
            onChange={(e) => actualizar("presupuesto")(e.target.value)}
            className={`${campoBase} mt-1`}
          >
            {txt.presupuestos.map((rango) => (
              <option key={rango} value={rango}>
                {rango}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-necesita`} className="etiqueta block">
          {txt.necesita}
        </label>
        <textarea
          id={`${id}-necesita`}
          name="necesita"
          required
          rows={4}
          value={datos.necesita}
          onChange={(e) => actualizar("necesita")(e.target.value)}
          placeholder={txt.marcador}
          className={`${campoBase} mt-1 resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={!completo}
        className="bg-fg text-surface text-small rounded-md px-3 py-1.5 font-medium transition-opacity hover:opacity-88 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {txt.enviar}
      </button>

      <p className="text-small text-fg-muted">
        {txt.aclaracion}{" "}
        <a href={`mailto:${sitio.email}`} className="subrayado text-fg">
          {sitio.email}
        </a>
        .
      </p>
    </form>
  );
}
