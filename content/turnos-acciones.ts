/**
 * Lo único de Visintin Turnos que hace falta fuera de su página.
 *
 * Está separado de `content/turnos.ts` por peso. La barra de navegación y el
 * botón flotante son de cliente y se cargan en todas las páginas del sitio;
 * si importaran aquel archivo, el empaquetador se llevaría al navegador los
 * textos enteros de la página de turnos en cada visita al inicio, para usar
 * dos frases. Acá están esas dos frases y nada más.
 */

/** El mensaje precargado de todos los botones de WhatsApp de la página. */
export const MENSAJE_DEMO = "Hola, quiero ver una demo de Visintin Turnos.";

/** El texto del botón principal: en la portada y en la barra de arriba. */
export const ACCION_DEMO = "Pedir una demo";
