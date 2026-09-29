import { Fragment } from "react";
import { Contador } from "@/components/contador";
import { Revelado } from "@/components/revelado";
import { sobreMi as textos } from "@/content/textos";

/**
 * Sobre mí.
 *
 * No hay foto. No es un olvido: no tengo una que sirva, y una de stock de
 * alguien en una reunión es exactamente lo que mata la sensación de que atrás
 * hay una persona. Mientras tanto el trabajo gráfico lo hace la tipografía
 * grande y una línea de bronce, que es más honesto y además se ve mejor.
 *
 * Cuando exista una foto real —una sola, en blanco y negro, con grano— entra
 * en la columna de la izquierda sin tocar el resto.
 */
export function SobreMi() {
  return (
    <section id="estudio" className="seccion">
      <div className="contenedor">
        <Revelado>
          <p className="t-etiqueta mb-6">{textos.etiqueta}</p>
        </Revelado>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Revelado>
            <h1 className="t-titulo max-w-[10ch]">{textos.titulo}</h1>
            <span
              aria-hidden="true"
              className="mt-8 block h-px w-24 bg-acento"
            />
          </Revelado>

          <Revelado retardo={120}>
            <div className="flex flex-col gap-6">
              {textos.parrafos.map((parrafo, i) => (
                <Fragment key={parrafo}>
                  <p className="t-cuerpo">{parrafo}</p>
                  {/* La convicción cierra el párrafo de la carrera: es lo que
                      esa formación enseña, dicho en términos del negocio. */}
                  {i === 1 && (
                    <p className="t-subtitulo my-4 border-l border-acento pl-6 text-balance">
                      {textos.conviccion}
                    </p>
                  )}
                </Fragment>
              ))}
            </div>
          </Revelado>
        </div>

        <Revelado>
          <dl className="mt-20 grid grid-cols-2 gap-px border border-borde bg-borde lg:mt-28 lg:grid-cols-4">
            {textos.datos.map((dato) => (
              <div
                key={dato.etiqueta}
                className="group bg-fondo p-7 transition-colors duration-500 hover:bg-superficie lg:p-9"
              >
                <dt className="sr-only">{dato.etiqueta}</dt>
                <dd>
                  <span className="t-titulo block tabular-nums transition-colors duration-500 group-hover:text-acento">
                    <Contador valor={dato.valor} sufijo={dato.sufijo} />
                  </span>
                  <span className="t-dato mt-3 block text-suave">{dato.etiqueta}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Revelado>
      </div>
    </section>
  );
}
