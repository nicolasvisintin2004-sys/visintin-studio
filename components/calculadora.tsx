"use client";

import { useId, useState } from "react";
import { BotonWhatsApp } from "@/components/boton-whatsapp";
import { obtenerPlanes } from "@/content/planes";
import { seccion, textos } from "@/content/textos";
import type { Idioma } from "@/lib/i18n";
import { mensajes } from "@/lib/sitio";

type Productos = "1-2" | "3-8" | "8+";
type Sitio = "no" | "viejo" | "funciona";
type Consultas = "mas" | "menos";
type Exterior = "si" | "no";

type Respuestas = {
  productos: Productos | null;
  sitio: Sitio | null;
  consultas: Consultas | null;
  exterior: Exterior | null;
};

const vacias: Respuestas = {
  productos: null,
  sitio: null,
  consultas: null,
  exterior: null,
};

/**
 * No es un quiz decorativo: es la conversación de venta. Por eso el
 * resultado siempre explica el porqué con las respuestas que dio la
 * persona, y nunca recomienda el plan más caro "por las dudas".
 *
 * Devuelve el índice del plan y el de la razón, para que la lógica no
 * dependa del idioma.
 */
function recomendar(r: Respuestas): { plan: number; razon: number } | null {
  const { productos, sitio, consultas, exterior } = r;
  if (!productos || !sitio || !consultas || !exterior) return null;

  if (exterior === "si") return { plan: 2, razon: 0 };
  if (consultas === "menos") return { plan: 2, razon: 1 };
  if (productos !== "1-2") return { plan: 1, razon: 2 };
  if (sitio === "no") return { plan: 0, razon: 3 };
  return { plan: 0, razon: 4 };
}

const campos = ["productos", "sitio", "consultas", "exterior"] as const;

/** Valores por pregunta, en el mismo orden que `calculadora.opciones`. */
const valores: string[][] = [
  ["1-2", "3-8", "8+"],
  ["no", "viejo", "funciona"],
  ["mas", "menos"],
  ["si", "no"],
];

export function Calculadora({ idioma }: { idioma: Idioma }) {
  const [respuestas, setRespuestas] = useState<Respuestas>(vacias);
  const id = useId();
  const txt = seccion(textos.calculadora, idioma);
  const planes = obtenerPlanes(idioma);

  const resultado = recomendar(respuestas);
  const plan = resultado ? planes[resultado.plan] : undefined;

  // Las opciones vienen aplanadas; se reparten según cuántas tiene cada
  // pregunta. Con reduce y no con un acumulador mutable: reasignar una
  // variable durante el render es justamente lo que React no garantiza.
  const opcionesPorPregunta = valores.reduce<readonly string[][]>(
    (acumulado, grupo) => {
      const desde = acumulado.reduce((n, t) => n + t.length, 0);
      return [...acumulado, [...txt.opciones.slice(desde, desde + grupo.length)]];
    },
    [],
  );

  return (
    <section data-surface="dark" className="bg-surface py-10 md:py-14">
      <div className="contenedor">
        <p className="etiqueta">{txt.eyebrow}</p>
        <h2 className="font-display text-display-m condensada text-fg mt-2 max-w-[20ch] text-balance">
          {txt.titulo}
        </h2>

        <div className="grilla mt-6 gap-y-4">
          <div className="col-span-12 space-y-4 md:col-span-7">
            {campos.map((campo, i) => (
              <fieldset key={campo} className="border-line border-t pt-2">
                <legend className="sr-only">{txt.preguntas[i]}</legend>

                <div className="flex items-baseline gap-1.5">
                  <span className="etiqueta">
                    0{i + 1} / 0{campos.length}
                  </span>
                  <span className="text-body text-fg" aria-hidden="true">
                    {txt.preguntas[i]}
                  </span>
                </div>

                <div className="mt-1.5 flex flex-wrap gap-1">
                  {valores[i].map((valor, j) => {
                    const marcada = respuestas[campo] === valor;
                    return (
                      <label
                        key={valor}
                        className={`text-small cursor-pointer rounded-md border px-2 py-1 transition-colors ${
                          marcada
                            ? "border-fg bg-fg text-surface"
                            : "border-line text-fg-muted hover:border-line-strong"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`${id}-${campo}`}
                          value={valor}
                          checked={marcada}
                          onChange={() =>
                            setRespuestas((previas) => ({
                              ...previas,
                              [campo]: valor,
                            }))
                          }
                          className="sr-only"
                        />
                        {opcionesPorPregunta[i][j]}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="col-span-12 md:col-span-5">
            <div
              className="border-line bg-raised h-full border p-3"
              aria-live="polite"
            >
              {resultado && plan ? (
                <>
                  <p className="etiqueta">{txt.teConviene}</p>
                  <p className="font-display text-display-m condensada text-fg mt-1">
                    {plan.nombre}
                  </p>
                  <p className="font-mono text-small text-fg-muted mt-0.5">
                    USD {plan.precio.toLocaleString("es-AR")}
                  </p>
                  <p className="text-body text-fg-muted border-line mt-2 border-t pt-2">
                    {txt.razones[resultado.razon]}
                  </p>
                  <div className="mt-3">
                    <BotonWhatsApp
                      mensaje={mensajes.calculadora(plan.nombre, idioma)}
                      origen={`calculadora-${plan.slug}`}
                      className="w-full py-1.5"
                    >
                      {txt.escribimeCon}
                    </BotonWhatsApp>
                  </div>
                </>
              ) : (
                <>
                  <p className="etiqueta">{txt.resultado}</p>
                  <p className="text-body text-fg-muted mt-2">{txt.espera}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
