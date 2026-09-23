import type { Metadata } from "next";
import Link from "next/link";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { Revelado } from "@/components/revelado";
import { notasPublicadas } from "@/content/notas/registro";
import { notas as textos, paginas } from "@/content/textos";
import { fechaLegible, minutosDeLectura } from "@/lib/lectura";
import { metadatosDePagina } from "@/lib/metadatos";

export const metadata: Metadata = {
  ...metadatosDePagina({ ruta: "/notas", ...paginas.notas }),
  /**
   * Mientras no haya ninguna nota publicada, la sección no se indexa.
   * Una página de listado vacía indexada es una página vacía en los
   * resultados de Google con el nombre del estudio al lado.
   */
  robots: notasPublicadas.length === 0 ? { index: false, follow: true } : undefined,
};

/**
 * El listado de notas.
 *
 * La sección existe pero no está en el menú: `content/notas/registro.ts`
 * explica por qué y qué hay que hacer para publicarla. La dirección funciona,
 * así que se puede compartir un enlace directo a una nota antes de abrir la
 * sección entera.
 *
 * Usa las mismas filas del índice del inicio: línea fina, número en mono,
 * título grande y la flecha que se corre en hover.
 */
export default async function PaginaNotas() {
  const conLectura = await Promise.all(
    notasPublicadas.map(async (nota) => ({
      ...nota,
      minutos: await minutosDeLectura(nota.slug),
    })),
  );

  return (
    <main id="contenido">
      <section className="seccion">
        <div className="contenedor">
          <EncabezadoSeccion
            nivel="h1"
            etiqueta={textos.etiqueta}
            titulo={textos.titulo}
            bajada={textos.bajada}
            claseTitulo="max-w-[18ch]"
          />

          {conLectura.length === 0 ? (
            <Revelado>
              <p className="t-subtitulo mt-16 text-suave lg:mt-24">{textos.vacio}</p>
            </Revelado>
          ) : (
            <ul className="mt-16 border-t border-borde lg:mt-24">
              {conLectura.map((nota, i) => (
                <Revelado as="li" key={nota.slug} retardo={i * 70}>
                  <Link
                    href={`/notas/${nota.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-borde py-9 sm:gap-8 sm:py-12"
                  >
                    <span className="t-dato text-suave transition-colors duration-500 group-hover:text-acento">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0">
                      <span className="block font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] transition-colors duration-500 group-hover:text-acento">
                        {nota.titulo}
                      </span>
                      <span className="t-dato mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-suave">
                        <time dateTime={nota.fecha}>{fechaLegible(nota.fecha)}</time>
                        <span aria-hidden="true" className="opacity-40">
                          ·
                        </span>
                        <span>
                          {nota.minutos} {textos.lectura}
                        </span>
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className="text-2xl leading-none text-suave transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1.5 group-hover:text-acento"
                    >
                      →
                    </span>
                  </Link>
                </Revelado>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
