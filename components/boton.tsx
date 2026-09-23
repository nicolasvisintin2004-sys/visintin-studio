/**
 * Las clases de los botones, como strings.
 *
 * No es un componente porque los botones del sitio son a veces `<a>`, a veces
 * `<button>` y a veces el `EnlaceWhatsApp`. Un componente que envolviera los
 * tres terminaría siendo una capa de props para nada.
 *
 * El primario es el único relleno; el resto son bordes. Así el acento sigue
 * apareciendo poco: si todos los botones fueran bronce, dejaría de significar.
 */

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.9375rem] font-medium leading-none transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]";

export const botonPrimario = `${base} bg-texto text-fondo hover:bg-acento hover:text-fondo`;

export const botonSecundario = `${base} border border-borde text-texto hover:border-acento hover:text-acento`;

/** Para los CTA de cierre de sección: más discreto, sin caja. */
export const botonTexto =
  "group inline-flex items-center gap-3 text-[0.9375rem] font-medium text-texto transition-colors duration-300 hover:text-acento";

/** La flecha que acompaña al botón de texto y se corre en hover. */
export function Flecha() {
  return (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1"
    >
      →
    </span>
  );
}
