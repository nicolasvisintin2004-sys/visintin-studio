import type { Idioma, Texto } from "@/lib/i18n";

/**
 * Dirección pública del sitio. De acá salen el canonical, los hreflang, el
 * sitemap y la URL de la imagen de Open Graph, así que si está mal, WhatsApp
 * no muestra la miniatura y Google indexa direcciones que no existen.
 *
 * Orden de prioridad:
 *  1. NEXT_PUBLIC_SITE_URL — se define a mano cuando esté el dominio propio.
 *  2. URL — la que pone Netlify sola en cada compilación de producción.
 *  3. localhost — solo para desarrollo.
 *
 * Se resuelve al compilar, que es lo correcto para un sitio estático.
 */
const direccion =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "http://localhost:3000";

export const sitio = {
  nombre: "Visintin Studio",
  autor: "Nicolás Visintin",
  url: direccion.replace(/\/$/, ""),
  email: "nico@visintin.com.ar",
  /**
   * Formato wa.me: código de país + 9 (móviles argentinos) + área sin 0
   * + número sin 15. Número dado: +54 2920 30-4938.
   * Verificar el link una vez antes de publicar: si el 9 sobra, sacarlo acá.
   */
  whatsapp: "5492920304938",
} as const;

/**
 * Disponibilidad. Se dice una sola vez por página y en dos páginas nada
 * más: repetida en todas se lee como táctica de venta.
 * Actualizar el mes cuando se llene la agenda.
 */
export const disponibilidad: Texto = {
  es: "Próximo inicio: septiembre",
  en: "Next opening: September",
};

export function linkWhatsApp(mensaje: string): string {
  return `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/** Mensajes que necesitan interpolar un dato de la página. */
export const mensajes = {
  plan: (plan: string, idioma: Idioma) =>
    idioma === "es"
      ? `Hola Nico, vi tu sitio y me interesa el plan ${plan}. ¿Podemos charlar?`
      : `Hi Nico, I saw your site and I'm interested in the ${plan} plan. Can we talk?`,

  calculadora: (plan: string, idioma: Idioma) =>
    idioma === "es"
      ? `Hola Nico, usé la calculadora de tu sitio y me recomendó el plan ${plan}. ¿Lo charlamos?`
      : `Hi Nico, I used the calculator on your site and it recommended the ${plan} plan. Shall we talk?`,

  caso: (cliente: string, idioma: Idioma) =>
    idioma === "es"
      ? `Hola, vi el proyecto de ${cliente} y quería consultar algo parecido.`
      : `Hi, I saw the ${cliente} project and wanted to ask about something similar.`,

  nota: (titulo: string, idioma: Idioma) =>
    idioma === "es"
      ? `Hola, leí la nota "${titulo}" y quería hacerte una consulta.`
      : `Hi, I read your note "${titulo}" and wanted to ask you something.`,
} as const;
