import Link from "next/link";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { inicio, navegacion } from "@/content/textos";

/**
 * El índice del inicio: una fila por página del sitio.
 *
 * Reemplaza a las secciones que antes se leían de corrido en la misma página.
 * No repite su contenido —eso lo hace cada página— sino que dice en una línea
 * qué hay en cada una y lleva hasta ahí.
 *
 * Usa el mismo lenguaje que la lista de servicios: filas separadas por líneas
 * finas y el bronce reservado para el estado. Sin número adelante —son
 * páginas, no pasos— ni flecha atrás: en hover el nombre pasa a bronce, y la
 * fila entera es el enlace.
 */
export function Indice() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h2"
          titulo={inicio.indiceTitulo}
          claseTitulo="max-w-[14ch]"
        />

        <ul className="mt-16 border-t border-borde lg:mt-24">
          {navegacion.enlaces.map(({ href, texto }) => (
            <li key={href}>
              <Link
                href={href}
                className="group block border-b border-borde py-9 sm:py-12"
              >

                <span className="min-w-0">
                  <span className="block font-display text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-none tracking-[-0.03em] transition-colors duration-500 group-hover:text-acento">
                    {texto}
                  </span>
                  <span className="mt-3 block text-[0.9375rem] text-suave">
                    {inicio.indice[href]}
                  </span>
                </span>

              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
