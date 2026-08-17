import type { Idioma, Lista, Texto } from "@/lib/i18n";
import type { Proyecto } from "@/lib/tipos";

/**
 * Los números de `medicion` son medidos, no estimados.
 * Cómo se reproducen, para volver a correrlos después del deploy:
 *
 *   next build && next start -p 4321
 *   npx lighthouse@12 http://localhost:4321/ --form-factor=mobile \
 *     --throttling-method=simulate --only-categories=performance
 *
 * Cuando el sitio esté en producción se vuelve a medir contra el
 * dominio real y se actualizan `entorno`, `url` y `medidoEl`.
 */
const fuente = [
  {
    slug: "garcia-ferrari-motorhomes",
    // Nombre propio: no se traduce.
    nombre: "García Ferrari Motorhomes",
    anio: 2026,
    estado: "en-desarrollo" as const,
    rubro: {
      es: "Fábrica de motorhomes",
      en: "Motorhome manufacturer",
    } satisfies Texto,
    resumen: {
      es: "Sitio de catálogo para una fábrica de motorhomes sobre Sprinter: una página por modelo, ficha técnica en texto y contacto directo por WhatsApp.",
      en: "Catalogue site for a Sprinter-based motorhome manufacturer: one page per model, specs in text and direct contact over WhatsApp.",
    } satisfies Texto,
    situacion: {
      es: "Una fábrica que construye unidades de USD 50.000 y presentaba todo desde un perfil de Instagram. Las medidas y las terminaciones se explicaban de nuevo en cada conversación por mensaje privado.",
      en: "A workshop building USD 50,000 units and presenting all of it from an Instagram profile. Dimensions and finishes had to be explained again in every private-message conversation.",
    } satisfies Texto,
    construido: {
      es: [
        "Una página por modelo, con ficha técnica en texto y no dentro de la imagen",
        "Notas de blog sobre patentamiento, aislación y rutas, para las búsquedas del rubro",
        "Datos estructurados y sitemap dinámico para que cada modelo entre por separado en Google",
        "Contacto por WhatsApp desde cualquier punto del recorrido, con el modelo ya escrito en el mensaje",
      ],
      en: [
        "One page per model, with specs in text rather than baked into the image",
        "Blog posts on registration, insulation and routes, aimed at the industry's searches",
        "Structured data and a dynamic sitemap so each model gets indexed separately",
        "WhatsApp contact from any point in the journey, with the model already written into the message",
      ],
    } satisfies Lista,
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Vercel"],
    entorno: {
      es: "Build de producción, previo al deploy",
      en: "Production build, before deployment",
    } satisfies Texto,
    herramienta: "Lighthouse 12.8.2",
    medidoEl: "2026-08-14",
    consultasPorMes: null,
    impresionesBusqueda: null,
  },
];

export function obtenerProyectos(idioma: Idioma): Proyecto[] {
  return fuente.map((p) => ({
    slug: p.slug,
    nombre: p.nombre,
    rubro: p.rubro[idioma],
    anio: p.anio,
    estado: p.estado,
    resumen: p.resumen[idioma],
    situacion: p.situacion[idioma],
    construido: p.construido[idioma],
    stack: p.stack,
    medicion: {
      herramienta: p.herramienta,
      dispositivo: idioma === "es" ? "móvil" : "mobile",
      entorno: p.entorno[idioma],
      url: "/",
      medidoEl: p.medidoEl,
      metricas: [
        { clave: "lcp", etiqueta: "LCP", valor: 3.8, unidad: "s", decimales: 1 },
        { clave: "cls", etiqueta: "CLS", valor: 0.0, unidad: "", decimales: 2 },
        {
          clave: "lighthouse",
          etiqueta: "Lighthouse",
          valor: 85,
          unidad: "/100",
          decimales: 0,
        },
      ],
    },
    consultasPorMes: p.consultasPorMes,
    impresionesBusqueda: p.impresionesBusqueda,
  }));
}

export function proyectoDestacado(idioma: Idioma): Proyecto {
  return obtenerProyectos(idioma)[0];
}

export const slugsDeProyecto = fuente.map((p) => p.slug);
