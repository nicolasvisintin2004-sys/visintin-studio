import Link from "next/link";
import { botonPrimario, botonSecundario, botonTexto, Flecha } from "@/components/boton";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { LuzEnTarjeta } from "@/components/luz-en-tarjeta";
import { Planes } from "@/components/planes";
import { Revelado } from "@/components/revelado";
import { diagnostico } from "@/content/diagnostico";
import { ramas } from "@/content/planes";
import { mensajes } from "@/content/sitio";
import { planes as textos } from "@/content/textos";

/**
 * Cómo trabajo: el mapa del estudio en una pantalla.
 *
 * Reemplaza a la sección que antes era sólo "Planes". El problema de aquella
 * era que mostraba tres alcances de sitio web como si eso fuera todo lo que
 * se puede contratar, cuando la web es una de tres ramas. Y arrancaba por el
 * precio de algo que todavía no se sabe si hace falta.
 *
 * El orden acá es el orden real del trabajo: primero el diagnóstico, que es
 * por donde entran todos, y después las tres cosas que pueden salir de él.
 * Los tres planes web siguen estando completos, pero adentro de su rama.
 */
export function ComoTrabajo() {
  return (
    <section id="como-trabajo" className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h1"
          etiqueta={textos.etiqueta}
          titulo={textos.titulo}
          bajada={textos.bajada}
          claseTitulo="max-w-[16ch]"
        />

        <EntradaPorDiagnostico />
        <Ramas />
      </div>

      {/*
        Los tres planes, como sub-bloque de la primera rama y no como la
        sección entera. `Planes` trae su propio contenedor y su propio
        encabezado en `h2`, que es el nivel que le corresponde debajo del
        `h1` de esta página.
      */}
      <Planes />

      <div className="contenedor">
        <Revelado>
          <div className="mt-16 flex flex-wrap items-baseline justify-between gap-6">
            <p className="t-subtitulo max-w-[20ch]">{textos.cierre}</p>
            <EnlaceWhatsApp mensaje={mensajes.general} origen="como_trabajo" className={botonTexto}>
              {textos.cierreAccion}
              <Flecha />
            </EnlaceWhatsApp>
          </div>
        </Revelado>
      </div>
    </section>
  );
}

/**
 * El diagnóstico, arriba de todo y solo.
 *
 * Ocupa el ancho entero y las tres ramas van abajo, en tres columnas. Es el
 * diagrama del que todos entran por el mismo lugar, dicho con la disposición
 * en vez de con un dibujo: un SVG con flechas sería una imagen más que
 * mantener, y no diría nada que el layout no diga solo.
 */
function EntradaPorDiagnostico() {
  return (
    <>
      <Revelado>
        <div className="relative mt-16 rounded-xl border border-acento bg-superficie p-8 lg:mt-24 lg:p-12">
          <LuzEnTarjeta />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="t-etiqueta text-acento">{diagnostico.etiqueta}</p>
              <h2 className="t-subtitulo mt-5 max-w-[22ch]">
                Todos los proyectos empiezan por acá.
              </h2>
              <p className="t-cuerpo mt-5 text-[0.9375rem]">{diagnostico.bajada}</p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <Link href="/diagnostico" className={botonPrimario}>
                {diagnostico.accionCorta}
              </Link>
            </div>
          </div>
        </div>
      </Revelado>

      {/* El tramo vertical del diagrama: la única línea que baja del
          diagnóstico hacia las tres ramas. Decorativa y oculta a los
          lectores de pantalla, que ya tienen el orden del documento. */}
      <div aria-hidden="true" className="flex justify-center">
        <span className="block h-14 w-px bg-borde lg:h-20" />
      </div>
    </>
  );
}

/** Las tres ramas que salen del diagnóstico. */
function Ramas() {
  return (
    <>
      <Revelado>
        <p className="t-etiqueta text-center">{textos.ramasEtiqueta}</p>
      </Revelado>

      <ul className="mt-10 grid gap-px border border-borde bg-borde lg:grid-cols-3">
        {ramas.map((rama, i) => (
          <Revelado as="li" key={rama.slug} retardo={i * 90} className="bg-fondo">
            <div className="flex h-full flex-col p-8 lg:p-10">
              <p className="t-etiqueta">{rama.para}</p>
              <h2 className="t-subtitulo mt-4">{rama.nombre}</h2>
              <p className="t-cuerpo mt-4 text-[0.9375rem]">{rama.texto}</p>

              <ul className="mt-8 flex flex-col gap-3.5">
                {rama.ejemplos.map((ejemplo) => (
                  <li key={ejemplo} className="flex gap-3 text-[0.9375rem] text-suave">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-acento" />
                    <span>{ejemplo}</span>
                  </li>
                ))}
              </ul>

              {/* `mt-auto` empuja el botón al pie: las tres columnas terminan
                  a la misma altura aunque las listas tengan distinto largo.
                  La primera rama no lleva botón porque su llamado son los
                  tres planes que están justo abajo. */}
              {rama.accion && (
                <div className="mt-auto pt-10">
                  <EnlaceWhatsApp
                    mensaje={mensajes.rama(rama.nombre.toLowerCase())}
                    origen={`rama_${rama.slug}`}
                    className={`${botonSecundario} w-full`}
                  >
                    {rama.accion}
                  </EnlaceWhatsApp>
                </div>
              )}
            </div>
          </Revelado>
        ))}
      </ul>
    </>
  );
}
