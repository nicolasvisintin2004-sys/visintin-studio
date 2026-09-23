import { Revelado } from "@/components/revelado";

export type ItemAcordeon = {
  pregunta: string;
  respuesta: string;
};

type Props = {
  items: readonly ItemAcordeon[];
  /**
   * El nivel del encabezado de cada pregunta. La página del estudio pone las
   * preguntas bajo un `h2`, así que van en `h3`; la del diagnóstico también.
   * Se deja explícito para no romper la jerarquía si alguna página cambia.
   */
  nivel?: "h3" | "h4";
};

/**
 * El acordeón de preguntas.
 *
 * Con `<details>` y `<summary>` nativos: el navegador ya resuelve el teclado,
 * el foco, el estado abierto/cerrado y el anuncio para lectores de pantalla.
 * Reimplementar eso con divs y `aria-expanded` sería escribir más código para
 * quedar peor.
 *
 * El contenido está en el HTML aunque el acordeón esté cerrado, así que
 * Google lo lee y el JSON-LD de `FAQPage` que arma cada página describe algo
 * que existe de verdad en la página.
 *
 * Está separado de `components/preguntas.tsx` porque ahora hay dos listas de
 * preguntas —las del estudio y las del diagnóstico— y tienen que verse
 * exactamente igual sin que el marcado esté escrito dos veces.
 */
export function Acordeon({ items, nivel: Encabezado = "h3" }: Props) {
  return (
    <div className="border-t border-borde">
      {items.map((item, i) => (
        <Revelado key={item.pregunta} retardo={i * 50}>
          <details className="group relative border-b border-borde">
            {/* La línea que se dibuja de izquierda a derecha sobre el borde
                inferior. Va sobre el `<details>` y no sobre el `<summary>`
                para que no desaparezca al abrir la pregunta. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-acento transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100 group-open:scale-x-100"
            />
            <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-7 [&::-webkit-details-marker]:hidden">
              <Encabezado className="max-w-[40ch] font-display text-[1.125rem] font-medium leading-snug tracking-[-0.01em] transition-colors duration-300 group-hover:text-acento sm:text-[1.375rem]">
                {item.pregunta}
              </Encabezado>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-xl leading-none text-suave transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] group-open:rotate-45 group-open:text-acento"
              >
                +
              </span>
            </summary>
            <p className="t-cuerpo pb-8 pr-8">{item.respuesta}</p>
          </details>
        </Revelado>
      ))}
    </div>
  );
}
