/**
 * Los datos del negocio. Si algo se repite en dos lugares del sitio, sale
 * de acá: es el único archivo que hay que tocar para cambiar un teléfono.
 */

/**
 * Dirección pública. De acá salen el canonical, el sitemap y la URL de la
 * imagen de Open Graph, así que si está mal, WhatsApp no muestra la miniatura
 * al compartir el enlace y Google indexa direcciones que no existen.
 *
 *  1. NEXT_PUBLIC_SITE_URL — se define a mano cuando esté el dominio propio.
 *  2. URL — la que pone Netlify sola en cada compilación de producción.
 *  3. localhost — sólo para desarrollo.
 */
const direccion =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? "http://localhost:3100";

export const sitio = {
  nombre: "Visintin Studio",
  autor: "Nicolás Visintin",
  url: direccion.replace(/\/$/, ""),
  email: "visintinstudio@gmail.com",
  ciudad: "Buenos Aires",
  pais: "AR",

  /**
   * Formato wa.me: código de país + 9 (móviles argentinos) + área sin 0 +
   * número sin 15. Escrito para leer: +54 2920 30-4938.
   *
   * El número no se muestra en ninguna parte del sitio: los botones dicen
   * "WhatsApp" y el número viaja adentro del enlace. Es una decisión de
   * presentación y no de privacidad — cualquier enlace a wa.me lo contiene—,
   * pero evita que quede a la vista para copiar y pegar.
   */
  whatsapp: "5492920304938",

  /**
   * Verificación de propiedad de Google Search Console. Es un token público:
   * va en el HTML de todas las páginas y no da acceso a nada. Corresponde al
   * dominio de Netlify; si se registra el dominio propio, Google entrega otro.
   */
  verificacionGoogle: "byjy1nX8alSqxtKqDPgMa1zFKUxlv_OIJHdRbG9DsAk",

  /**
   * Medición de Google Analytics 4. Vacío significa que no se carga nada:
   * el sitio funciona igual y no se pide ni un byte a Google.
   * Se completa con el identificador propio (formato G-XXXXXXXXXX).
   */
  googleAnalytics: process.env.NEXT_PUBLIC_GA_ID ?? "",

  /**
   * Medición sin cookies, con Umami. Convive con Google Analytics en lugar
   * de reemplazarlo: los dos reciben exactamente los mismos eventos desde
   * `lib/analitica.ts`, y cada uno se enciende por su cuenta completando su
   * variable. Con las dos vacías el sitio no le pide un byte a nadie.
   *
   * El script pesa alrededor de 2 KB, no usa cookies y no necesita cartel de
   * consentimiento, que es lo que lo hace preferible para el uso diario. El
   * `host` se completa sólo si es una instancia propia; vacío apunta al
   * servicio de Umami.
   */
  umamiId: process.env.NEXT_PUBLIC_UMAMI_ID ?? "",
  umamiHost: process.env.NEXT_PUBLIC_UMAMI_HOST ?? "https://cloud.umami.is",
} as const;

/**
 * Dónde se envían las consultas del formulario.
 *
 * Es una dirección del mismo dominio y no la del proveedor: del otro lado hay
 * una función de Netlify, y el redireccionamiento está escrito en
 * `netlify.toml`. Si algún día cambia el proveedor, cambia esa línea y no el
 * código del formulario.
 */
export const API_LEADS = "/api/leads";

/**
 * Disponibilidad. Se dice una sola vez en todo el sitio: repetida en cada
 * sección se lee como táctica de venta. Actualizar el mes cuando se llene
 * la agenda.
 */
export const disponibilidad = "Agenda limitada: dos proyectos por mes";

/** Arma el enlace de WhatsApp con el mensaje ya escrito. */
export function linkWhatsApp(mensaje: string): string {
  return `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/**
 * El mensaje precargado cambia según desde dónde se toca el botón, así sé
 * qué estaba mirando la persona antes de escribirme. Es la diferencia entre
 * "Hola" y una conversación que arranca por el medio.
 *
 * Van con "Nicolás" y no con "Nico": los escribe alguien que todavía no me
 * conoce, y es la primera frase de una relación comercial.
 */
export const mensajes = {
  general:
    "Hola Nicolás, vi el sitio de Visintin Studio y quisiera hacer una consulta sobre un proyecto.",
  servicios: (servicio: string) =>
    `Hola Nicolás, me interesa el servicio de ${servicio}. ¿Podríamos conversarlo?`,
  portfolio:
    "Hola Nicolás, vi los proyectos del sitio y quisiera consultar por uno similar.",
  proyecto: (cliente: string) =>
    `Hola Nicolás, vi el proyecto de ${cliente} y quisiera consultar por algo similar.`,
  plan: (plan: string) =>
    `Hola Nicolás, me interesa el plan ${plan}. ¿Podrías indicarme el precio?`,
  mantenimiento:
    "Hola Nicolás, quisiera consultar qué incluye el mantenimiento mensual.",
  sobreMi:
    "Hola Nicolás, vi el sitio de Visintin Studio y quisiera hacer una consulta.",
  preguntas:
    "Hola Nicolás, tengo una consulta que no figura en las preguntas frecuentes.",
  contacto: "Hola Nicolás, quisiera contarte sobre un proyecto.",
  diagnostico:
    "Hola Nicolás, vi la página del diagnóstico y quisiera solicitarlo. ¿Cómo seguimos?",
  rama: (rama: string) =>
    `Hola Nicolás, me interesa el servicio de ${rama}. ¿Podríamos conversarlo?`,
  /** Para quien ya dejó sus datos en el formulario y además quiere escribir. */
  urgente:
    "Hola Nicolás, acabo de completar el formulario del sitio y necesitaría resolverlo con urgencia.",
} as const;
