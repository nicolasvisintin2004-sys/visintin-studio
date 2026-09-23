import Link from "next/link";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { Revelado } from "@/components/revelado";
import { inicio, navegacion } from "@/content/textos";

/**
 * El índice del inicio: una fila por página del sitio.
 *
 * Reemplaza a las secciones que antes se leían de corrido en la misma página.
 * No repite su contenido —eso lo hace cada página— sino que dice en una línea
 * qué hay en cada una y lleva hasta ahí.
 *
 * Usa el mismo lenguaje que la lista de servicios: filas separadas por líneas
 * finas, número en mono y el bronce reservado para el estado. En hover el
 * número y el nombre pasan a bronce y la flecha se corre; no hay nada que
 * abrir, así que la fila entera es el enlace.
 */
export function Indice() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h2"
          etiqueta={inicio.indiceEtiqueta}
          titulo={inicio.indiceTitulo}
          claseTitulo="max-w-[14ch]"
        />

        <ul className="mt-16 border-t border-borde lg:mt-24">
          {navegacion.enlaces.map(({ href, texto }, i) => (
            <Revelado as="li" key={href} retardo={i * 70}>
              <Link
                href={href}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-borde py-9 sm:gap-8 sm:py-12"
              >
                <span className="t-dato text-suave transition-colors duration-500 group-hover:text-acento">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0">
                  <span className="block font-display text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-none tracking-[-0.03em] transition-colors duration-500 group-hover:text-acento">
                    {texto}
                  </span>
                  <span className="mt-3 block text-[0.9375rem] text-suave">
                    {inicio.indice[href]}
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
      </div>
    </section>
  );
}
