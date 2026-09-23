import { botonPrimario, botonSecundario, botonTexto, Flecha } from "@/components/boton";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { LuzEnTarjeta } from "@/components/luz-en-tarjeta";
import { Revelado } from "@/components/revelado";
import { mantenimiento, planes as listaDePlanes } from "@/content/planes";
import { mensajes } from "@/content/sitio";
import { planes as textos } from "@/content/textos";

/**
 * Los tres planes de sitio web, sin precios.
 *
 * Dejó de ser la sección entera de la página para ser el detalle de una de
 * las tres ramas que salen del diagnóstico. Por eso encabeza en `h2` y no en
 * `h1`: el `h1` de la página es "Todos entran por el mismo lugar", y estos
 * tres alcances cuelgan de ahí.
 *
 * El acento aparece una sola vez en todo el bloque: en el borde de la tarjeta
 * recomendada. Ese es todo el trabajo que tiene que hacer para que el ojo
 * vaya al del medio.
 */
export function Planes() {
  return (
    <div id="planes" className="contenedor pt-24 lg:pt-32">
      <EncabezadoSeccion
        nivel="h2"
        etiqueta={textos.planesEtiqueta}
        titulo={textos.planesTitulo}
        bajada={textos.planesBajada}
        claseTitulo="max-w-[18ch] text-[clamp(1.875rem,4vw,3.25rem)]"
      />

      <ul className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:items-start">
        {listaDePlanes.map((plan, i) => (
          <Revelado as="li" key={plan.slug} retardo={i * 90}>
            <article
              className={`relative flex h-full flex-col rounded-xl border bg-superficie p-8 lg:p-10 ${
                plan.recomendado ? "border-acento lg:-mt-6 lg:pb-14 lg:pt-14" : "border-borde"
              }`}
            >
              <LuzEnTarjeta />
              {plan.recomendado && (
                <p className="t-dato mb-6 text-acento">{textos.recomendado}</p>
              )}

              <p className="t-etiqueta">{plan.para}</p>
              <h3 className="t-subtitulo mt-4">{plan.nombre}</h3>
              <p className="t-cuerpo mt-4 text-[0.9375rem]">{plan.promesa}</p>

              {plan.heredado && (
                <p className="t-dato mt-8 border-t border-borde pt-6 text-suave">
                  {plan.heredado}
                </p>
              )}

              <ul className={`flex flex-col gap-3.5 ${plan.heredado ? "mt-5" : "mt-8"}`}>
                {plan.incluye.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] text-suave">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-acento" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-1.5 border-t border-borde pt-6">
                <p className="t-dato text-suave">{plan.revisiones}</p>
                <p className="t-dato text-suave">{plan.mantenimiento}</p>
              </div>

              {/* `mt-auto` empuja el botón al pie: las tres tarjetas terminan
                  con el botón a la misma altura aunque las listas tengan
                  distinto largo. */}
              <div className="mt-auto pt-10">
                <EnlaceWhatsApp
                  mensaje={mensajes.plan(plan.nombre)}
                  origen={`plan_${plan.slug}`}
                  className={`w-full ${plan.recomendado ? botonPrimario : botonSecundario}`}
                >
                  {textos.accion}
                </EnlaceWhatsApp>
              </div>
            </article>
          </Revelado>
        ))}
      </ul>

      <Revelado>
        <div className="mt-10 rounded-xl border border-borde p-8">
          <h3 className="t-dato text-texto">{mantenimiento.titulo}</h3>
          <p className="t-cuerpo mt-3 text-[0.9375rem]">{mantenimiento.texto}</p>
          <EnlaceWhatsApp
            mensaje={mensajes.mantenimiento}
            origen="mantenimiento"
            className={`${botonTexto} mt-5`}
          >
            {textos.accionMantenimiento}
            <Flecha />
          </EnlaceWhatsApp>
        </div>
      </Revelado>
    </div>
  );
}
