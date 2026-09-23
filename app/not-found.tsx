import Link from "next/link";
import { botonPrimario, botonSecundario } from "@/components/boton";
import { inicio, navegacion, noEncontrada } from "@/content/textos";

/**
 * La página que se ve cuando la dirección no existe.
 *
 * Ofrecía un solo botón, "Volver al inicio", y eso deja a la persona a un
 * clic de irse: llegó buscando algo concreto, se encontró con un error y la
 * única salida la manda a empezar de nuevo.
 *
 * Ahora lleva la lista entera de secciones, con la misma línea de descripción
 * que el índice del inicio. Un 404 bien hecho no es una disculpa, es un mapa:
 * la mayoría de las veces lo que la persona buscaba está a un renglón de
 * distancia.
 */
export default function NoEncontrada() {
  const secciones = [navegacion.destacado, ...navegacion.enlaces];

  return (
    <main id="contenido" className="contenedor py-32 lg:py-40">
      <p className="t-etiqueta mb-6">{noEncontrada.etiqueta}</p>
      <h1 className="t-titulo max-w-[14ch]">{noEncontrada.titulo}</h1>
      <p className="t-cuerpo mt-8">{noEncontrada.texto}</p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className={botonPrimario}>
          {noEncontrada.accion}
        </Link>
        <Link href="/contacto" className={botonSecundario}>
          {noEncontrada.accionContacto}
        </Link>
      </div>

      {/* Las mismas filas de línea fina del índice del inicio. */}
      <p className="t-etiqueta mb-6 mt-24">{noEncontrada.secciones}</p>
      <ul className="border-t border-borde">
        {secciones.map(({ href, texto }, i) => (
          <li key={href}>
            <Link
              href={href}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-borde py-6 sm:gap-8"
            >
              <span className="t-dato text-suave transition-colors duration-500 group-hover:text-acento">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0">
                <span className="block font-display text-[1.25rem] font-medium leading-tight tracking-[-0.02em] transition-colors duration-500 group-hover:text-acento sm:text-[1.5rem]">
                  {texto}
                </span>
                <span className="mt-1.5 block text-[0.9375rem] text-suave">
                  {inicio.indice[href]}
                </span>
              </span>

              <span
                aria-hidden="true"
                className="text-xl leading-none text-suave transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1.5 group-hover:text-acento"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
