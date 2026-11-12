import Link from "next/link";
import { botonTexto } from "@/components/boton";
import { Captura } from "@/components/captura";
import { proyectos } from "@/content/proyectos";
import { sitiosWeb as textos } from "@/content/textos";

/**
 * Los proyectos publicados, en corto, para la página de sitios web.
 *
 * Es la prueba de que lo de arriba se hizo: la portada de cada sitio, para
 * quién es y qué cambió, y el enlace al caso completo. No repite el caso —eso
 * está en `/proyectos/[slug]`—, sólo la línea del "después", que es lo que
 * le importa al que está mirando.
 *
 * Sale de `content/proyectos.ts`, así que un caso nuevo aparece acá solo.
 */
export function Casos() {
  return (
    <section className="contenedor pt-24 lg:pt-32" aria-labelledby="casos-titulo">
      <h2
        id="casos-titulo"
        className="t-titulo max-w-[18ch] text-[clamp(1.875rem,4vw,3.25rem)]"
      >
        {textos.casosTitulo}
      </h2>

      <ul className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-2 lg:gap-8">
        {proyectos.map((proyecto) => {
          const portada =
            proyecto.capturas.find((c) => c.formato === "escritorio") ?? proyecto.capturas[0];

          return (
            <li key={proyecto.slug}>
              <Link href={`/proyectos/${proyecto.slug}`} className="group block">
                <span className="block aspect-[16/10] overflow-hidden rounded-lg border border-borde bg-superficie transition-colors duration-300 group-hover:border-acento">
                  <Captura
                    captura={portada}
                    sizes="(min-width: 1024px) 40rem, 100vw"
                    className="h-full w-full object-cover object-top"
                  />
                </span>
                <span className="t-subtitulo mt-6 block transition-colors duration-300 group-hover:text-acento">
                  {proyecto.cliente}
                </span>
                <span className="t-etiqueta mt-2 block">
                  {proyecto.rubro}, {proyecto.ubicacion}
                </span>
                <span className="t-cuerpo mt-4 block text-[0.9375rem]">
                  {proyecto.resultado.despues}
                </span>
                <span className={`${botonTexto} mt-6`}>{textos.verCaso}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
