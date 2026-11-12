/**
 * Lo único de Visintin Turnos que hace falta fuera de su página.
 *
 * Está separado de `content/turnos.ts` por peso. La barra de navegación y el
 * botón flotante son de cliente y se cargan en todas las páginas del sitio;
 * si importaran aquel archivo, el empaquetador se llevaría al navegador los
 * textos enteros de la página de turnos en cada visita al inicio, para usar
 * dos frases. Acá están esas dos frases, el interruptor de publicación y
 * nada más.
 */

/**
 * La página existe pero todavía no se anuncia.
 *
 * En `false` no entra al sitemap, se marca `noindex` y no se enlaza desde el
 * menú, el pie ni el inicio: se puede abrir escribiendo la dirección, que es
 * lo que hace falta para revisarla, y nada más. La puerta de turnos del
 * inicio sigue estando, pero lleva a WhatsApp en vez de a la página.
 *
 * Se pasa a `true` cuando el demo tenga dirección pública y los recordatorios
 * por WhatsApp salgan de verdad; antes de eso, la página vendería algo que no
 * se puede probar.
 *
 * Vive acá y no en `content/turnos.ts` porque lo lee la barra de navegación,
 * que es de cliente.
 */
export const TURNOS_PUBLICADA = false;

/** El mensaje precargado de todos los botones de WhatsApp de la página. */
export const MENSAJE_DEMO = "Hola, quiero ver una demo de Visintin Turnos.";

/** El texto del botón principal: en la portada y en la barra de arriba. */
export const ACCION_DEMO = "Pedir una demo";
