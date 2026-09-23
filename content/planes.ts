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
 * Los tres planes, SIN precio.
 *
 * El precio se pide por WhatsApp a propósito: el objetivo de esta sección es
 * que el visitante entienda el alcance y escriba, no que compare números con
 * otro presupuesto que incluye la mitad de las cosas.
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
 * Las tres ramas que salen del diagnóstico.
 *
 * Es el mapa del estudio en una pantalla: todos entran por el diagnóstico y
 * de ahí se abren tres caminos, que pueden tomarse de a uno o encadenarse.
 * Los tres planes web de arriba son el detalle de la primera rama, y por eso
 * la página los muestra como un sub-bloque y no como la sección entera.
 *
 * Sólo el diagnóstico tiene precio, y eso es una regla y no un descuido: es
 * el único trabajo acotado y cerrado. Los otros tres son variables, y un
 * número ahí o espanta o miente.
 */
export type Rama = {
  slug: string;
  nombre: string;
  /** Para quién es esta rama. Va arriba del nombre, en mono. */
  para: string;
  texto: string;
  /** Ejemplos concretos. Son lo que hace que alguien se reconozca. */
  ejemplos: readonly string[];
  /** La primera rama no lleva botón propio: abajo están los tres planes. */
  accion?: string;
};

export const ramas: readonly Rama[] = [
  {
    slug: "sitio-web",
    nombre: "Sitio web",
    para: "Lo que el cliente ve",
    texto:
      "El sitio que presenta la oferta, el catálogo que se compara y los formularios que traen la consulta con los datos necesarios para presupuestar. Es el trabajo que más se pide y el que se organiza en tres alcances.",
    ejemplos: [
      "Página institucional o de catálogo",
      "Tienda online con cobro",
      "Cotizador y panel de administración",
    ],
  },
  {
    slug: "automatizacion",
    nombre: "Automatización puntual",
    para: "Trabajos acotados",
    texto:
      "Trabajos chicos y delimitados, que se entregan funcionando. No reemplazan la forma de trabajar: le sacan a la semana la parte que se hace a mano todos los días.",
    ejemplos: [
      "El formulario que carga solo en la planilla",
      "El presupuesto que se arma solo",
      "El mensaje que se responde solo",
      "El reporte que llega los lunes",
    ],
    accion: "Consultar una automatización",
  },
  {
    slug: "acompanamiento",
    nombre: "Acompañamiento mensual",
    para: "Para el que ya arrancó",
    texto:
      "Para quien ya tiene el sistema funcionando y necesita que alguien lo mantenga, lo mida y lo siga mejorando. Incluye el mantenimiento del sitio y las horas mensuales de cambios.",
    ejemplos: [
      "Mantenimiento, respaldos y actualizaciones",
      "Informe mensual de consultas y su origen",
      "Horas de cambios y mejoras",
    ],
    accion: "Consultar el acompañamiento",
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
