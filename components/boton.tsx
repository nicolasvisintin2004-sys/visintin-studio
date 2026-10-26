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

/**
 * Para los CTA de cierre de sección: más discreto, sin caja.
 *
 * Se señala con un subrayado y no con una flecha al final. La flecha estaba
 * en quince enlaces del sitio, y en todos lados deja de indicar nada: un
 * enlace ya se sabe que lleva a otro lado. El subrayado dice lo mismo y en
 * hover se pinta de bronce, que es la respuesta a lo que hace la persona.
 */
export const botonTexto =
  "inline-flex items-center text-[0.9375rem] font-medium text-texto underline decoration-borde decoration-1 underline-offset-[6px] transition-colors duration-300 hover:text-acento hover:decoration-acento";
