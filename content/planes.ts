import type { Idioma, Lista, Texto } from "@/lib/i18n";

export type Plan = {
  slug: string;
  nombre: string;
  precio: number;
  promesa: string;
  /** Las tres que van en la home. */
  resumen: readonly string[];
  /** La lista completa de /planes. */
  detalle: readonly string[];
  mantenimientoIncluido: string;
  recomendado?: boolean;
  /** Nota honesta al pie. Deliberada: dice qué NO hace el plan. */
  nota?: string;
};

type PlanFuente = {
  slug: string;
  precio: number;
  recomendado?: boolean;
  nombre: Texto;
  promesa: Texto;
  resumen: Lista;
  detalle: Lista;
  mantenimientoIncluido: Texto;
  nota?: Texto;
};

const fuente: PlanFuente[] = [
  {
    slug: "esencial",
    precio: 450,
    nombre: { es: "Esencial", en: "Essential" },
    promesa: {
      es: "Para dejar de perder al que ya te está buscando.",
      en: "So you stop losing the people already looking for you.",
    },
    resumen: {
      es: [
        "Landing de una página",
        "WhatsApp + formulario",
        "SEO básico y Google Business",
      ],
      en: [
        "One-page landing",
        "WhatsApp + contact form",
        "Basic SEO and Google Business",
      ],
    },
    detalle: {
      es: [
        "Landing de una página, todo en scroll",
        "Diseño responsive",
        "Botón de WhatsApp + formulario de contacto",
        "SEO básico: títulos, descripciones, sitemap, robots",
        "Ficha de Google Business optimizada",
        "1 ronda de revisiones",
      ],
      en: [
        "One-page landing, everything on scroll",
        "Responsive design",
        "WhatsApp button + contact form",
        "Basic SEO: titles, descriptions, sitemap, robots",
        "Optimised Google Business profile",
        "1 round of revisions",
      ],
    },
    mantenimientoIncluido: {
      es: "1 mes de mantenimiento sin cargo",
      en: "1 month of maintenance included",
    },
    nota: {
      es: "Con esto captás al que ya te conoce o te recomendaron. No te va a traer gente nueva desde Google — para eso está Crecimiento.",
      en: "This captures people who already know you or were referred to you. It won't bring new people from Google — that's what Growth is for.",
    },
  },
  {
    slug: "completo",
    precio: 800,
    recomendado: true,
    nombre: { es: "Completo", en: "Complete" },
    promesa: {
      es: "Para convertir al que ya te está mirando.",
      en: "So you convert the people already looking at you.",
    },
    resumen: {
      es: [
        "5 a 7 páginas, una por producto",
        "Ficha técnica en texto, no en la imagen",
        "SEO técnico completo + Analytics",
      ],
      en: [
        "5 to 7 pages, one per product",
        "Specs in text, not inside the image",
        "Full technical SEO + Analytics",
      ],
    },
    detalle: {
      es: [
        "Todo lo del plan Esencial",
        "Sitio de 5 a 7 páginas, una por producto o modelo",
        "Galería con ficha técnica en texto (no dentro de la imagen)",
        "Animaciones de scroll y transiciones",
        "SEO técnico completo + datos estructurados JSON-LD",
        "Google Analytics con medición de clics a WhatsApp",
        "Formulario de cotización con campos del rubro",
        "3 rondas de revisiones + 30 días de soporte",
      ],
      en: [
        "Everything in the Essential plan",
        "5 to 7 page site, one per product or model",
        "Gallery with specs in text (not inside the image)",
        "Scroll animations and transitions",
        "Full technical SEO + JSON-LD structured data",
        "Google Analytics tracking WhatsApp clicks",
        "Quote form with industry-specific fields",
        "3 rounds of revisions + 30 days of support",
      ],
    },
    mantenimientoIncluido: {
      es: "3 meses de mantenimiento sin cargo",
      en: "3 months of maintenance included",
    },
  },
  {
    slug: "crecimiento",
    precio: 1200,
    nombre: { es: "Crecimiento", en: "Growth" },
    promesa: {
      es: "Para llegar a los que todavía no saben que existís.",
      en: "So you reach the people who don't know you exist yet.",
    },
    resumen: {
      es: [
        "Redacción de todos los textos",
        "Blog configurado + 3 artículos",
        "Multiidioma español / inglés",
      ],
      en: [
        "All copy written for you",
        "Blog set up + 3 articles",
        "Spanish / English bilingual",
      ],
    },
    detalle: {
      es: [
        "Todo lo del plan Completo",
        "Redacción de todos los textos del sitio",
        "Investigación de palabras clave del rubro",
        "Blog configurado + 3 artículos iniciales",
        "Multiidioma español / inglés",
      ],
      en: [
        "Everything in the Complete plan",
        "All the site's copy written for you",
        "Keyword research for your industry",
        "Blog set up + 3 starter articles",
        "Spanish / English bilingual",
      ],
    },
    mantenimientoIncluido: {
      es: "6 meses de mantenimiento sin cargo",
      en: "6 months of maintenance included",
    },
  },
];

export function obtenerPlanes(idioma: Idioma): Plan[] {
  return fuente.map((plan) => ({
    slug: plan.slug,
    precio: plan.precio,
    recomendado: plan.recomendado,
    nombre: plan.nombre[idioma],
    promesa: plan.promesa[idioma],
    resumen: plan.resumen[idioma],
    detalle: plan.detalle[idioma],
    mantenimientoIncluido: plan.mantenimientoIncluido[idioma],
    nota: plan.nota?.[idioma],
  }));
}

export const mantenimiento = {
  precio: 35,
  descripcion: {
    es: "Hosting, dominio, SSL, backups, monitoreo de uptime, actualizaciones de seguridad y 2 horas mensuales de cambios de contenido. Se factura por semestre adelantado.",
    en: "Hosting, domain, SSL, backups, uptime monitoring, security updates and 2 monthly hours of content changes. Billed six months in advance.",
  } satisfies Texto,
};

export const notaDeMoneda: Texto = {
  es: "Los precios se cotizan en dólares y se cobran en pesos al tipo de cambio MEP del día de pago.",
  en: "Prices are quoted in US dollars and charged in pesos at the MEP exchange rate on the day of payment.",
};
