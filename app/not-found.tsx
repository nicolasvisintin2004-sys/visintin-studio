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
 * Ahora lleva la lista entera de secciones, cada una con una línea que dice
 * qué hay ahí. Un 404 bien hecho no es una disculpa, es un mapa:
 * la mayoría de las veces lo que la persona buscaba está a un renglón de
 * distancia.
 */
export default function NoEncontrada() {
  const secciones = [...navegacion.enlaces, navegacion.destacado];

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

      {/* Filas de línea fina, como las del resto del sitio. */}
      <p className="t-etiqueta mb-6 mt-24">{noEncontrada.secciones}</p>
      <ul className="border-t border-borde">
        {secciones.map(({ href, texto }) => (
          <li key={href}>
            <Link href={href} className="group block border-b border-borde py-6">
              <span className="min-w-0">
                <span className="block font-display text-[1.25rem] font-medium leading-tight tracking-[-0.02em] transition-colors duration-500 group-hover:text-acento sm:text-[1.5rem]">
                  {texto}
                </span>
                <span className="mt-1.5 block text-[0.9375rem] text-suave">
                  {inicio.indice[href]}
                </span>
              </span>

            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
