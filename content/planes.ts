export type Plan = {
  slug: string;
  nombre: string;
  /** Para quién es. Va arriba del nombre, en mono. */
  para: string;
  /** Una línea que explica qué resuelve el plan. */
  promesa: string;
  /** Lo que arrastra del plan anterior. Vacío en el primero. */
  heredado?: string;
  incluye: readonly string[];
  revisiones: string;
  mantenimiento: string;
  recomendado?: boolean;
};

/**
 * Los tres planes de sitio web, SIN precio. Van en /sitios-web.
 *
 * El precio se pide por WhatsApp a propósito: el objetivo de esta sección es
 * que el visitante entienda el alcance y escriba, no que compare números con
 * otro presupuesto que incluye la mitad de las cosas. Los servicios de redes
 * sí tienen precio, porque su alcance está cerrado de antemano; el porqué
 * está en `content/instagram.ts`.
 */
export const planes: readonly Plan[] = [
  {
    slug: "esencial",
    nombre: "Esencial",
    para: "Presencia correcta en Google",
    promesa:
      "Para que quien ya busca el negocio por su nombre lo encuentre.",
    incluye: [
      "Página única, diseñada primero para el celular",
      "Botón de WhatsApp flotante y formulario de contacto",
      "SEO base: títulos, sitemap, robots",
      "Ficha de Google Business optimizada",
      "Mapa y datos de contacto",
      "Medición de las consultas recibidas por WhatsApp",
    ],
    revisiones: "1 ronda de revisiones",
    mantenimiento: "1 mes de mantenimiento sin cargo",
  },
  {
    slug: "completo",
    nombre: "Completo",
    para: "Un sitio orientado a la venta",
    promesa:
      "Para que quien está comparando encuentre las respuestas sin necesidad de consultar.",
    heredado: "Incluye el plan Esencial, más:",
    recomendado: true,
    incluye: [
      "Sitio de 5 a 7 páginas, con la estructura que el negocio necesite",
      "Una página con ficha técnica por producto o servicio, que es lo que Google indexa y lo que el comprador compara",
      "Redacción de todos los textos a partir de una entrevista",
      "Formularios de cotización con las preguntas necesarias para presupuestar",
      "SEO técnico completo y datos estructurados para búsqueda local",
      "Animaciones de desplazamiento",
      "Informe mensual de consultas recibidas y su origen",
    ],
    revisiones: "3 rondas de revisiones",
    mantenimiento: "2 meses de mantenimiento sin cargo",
  },
  {
    slug: "crecimiento",
    nombre: "Crecimiento",
    para: "Alcance a nuevos clientes",
    promesa:
      "Para aparecer en búsquedas donde hoy el negocio no figura, e incorporar funciones que la competencia no ofrece.",
    heredado: "Incluye el plan Completo, más:",
    incluye: [
      "Investigación de palabras clave del rubro y de la zona",
      "Blog con tres artículos iniciales",
      "Versión completa en inglés, para negocios que venden al exterior",
      "Funcionalidad a medida: cotizador, reservas, panel de administración",
    ],
    revisiones: "3 rondas de revisiones",
    mantenimiento: "3 meses de mantenimiento sin cargo",
  },
];

/**
 * El mantenimiento es aparte y va con cualquiera de los tres. Se explica en
 * una línea al pie de la sección, sin tarjeta propia: no es un cuarto plan.
 */
export const mantenimiento = {
  titulo: "Mantenimiento mensual",
  texto:
    "Hosting, dominio, certificado SSL y copias de seguridad, más horas mensuales para cambios: carga de productos, actualización de precios y reemplazo de imágenes. Es compatible con cualquiera de los tres planes y comienza al finalizar el período sin cargo.",
};
