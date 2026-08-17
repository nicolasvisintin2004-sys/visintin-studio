import type { MDXProps } from "mdx/types";
import type { JSX } from "react";
import type { Idioma, Texto } from "@/lib/i18n";
import Ingles from "./how-much-does-a-website-cost-argentina.mdx";
import Espanol from "./cuanto-cuesta-una-pagina-web-pyme-argentina.mdx";

/**
 * Los metadatos viven acá y el cuerpo en el .mdx.
 *
 * Cada nota tiene un slug POR IDIOMA: un slug en español no rankea en
 * búsquedas en inglés, así que traducir el artículo y dejarle la URL
 * castellana sería tirar la mitad del trabajo.
 */
export type Nota = {
  slug: string;
  titulo: string;
  bajada: string;
  /** ISO. Es la fecha de publicación que va al JSON-LD. */
  fecha: string;
  tiempoLectura: number;
  Contenido: (props: MDXProps) => JSX.Element;
};

type NotaFuente = {
  slug: Texto;
  titulo: Texto;
  bajada: Texto;
  fecha: string;
  tiempoLectura: number;
  contenido: Record<Idioma, (props: MDXProps) => JSX.Element>;
};

const fuente: NotaFuente[] = [
  {
    slug: {
      es: "cuanto-cuesta-una-pagina-web-pyme-argentina",
      en: "how-much-does-a-website-cost-argentina",
    },
    titulo: {
      es: "Cuánto cuesta una página web para una PyME en Argentina (2026)",
      en: "How much does a website cost for a small business in Argentina (2026)",
    },
    bajada: {
      es: "Precios reales del mercado argentino, qué incluye cada rango y cómo saber si un presupuesto está en línea. Sin vueltas.",
      en: "Real prices from the Argentine market, what each range includes and how to tell whether a quote is in line. No runaround.",
    },
    fecha: "2026-08-14",
    tiempoLectura: 7,
    contenido: { es: Espanol, en: Ingles },
  },
];

export function obtenerNotas(idioma: Idioma): Nota[] {
  return fuente
    .map((n) => ({
      slug: n.slug[idioma],
      titulo: n.titulo[idioma],
      bajada: n.bajada[idioma],
      fecha: n.fecha,
      tiempoLectura: n.tiempoLectura,
      Contenido: n.contenido[idioma],
    }))
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function obtenerNota(idioma: Idioma, slug: string): Nota | undefined {
  return obtenerNotas(idioma).find((nota) => nota.slug === slug);
}

/** Slug equivalente en el otro idioma, para los enlaces alternativos. */
export function slugEquivalente(
  slug: string,
  desde: Idioma,
  hacia: Idioma,
): string | undefined {
  return fuente.find((n) => n.slug[desde] === slug)?.slug[hacia];
}

export const todosLosSlugs = fuente.flatMap((n) =>
  (Object.keys(n.slug) as Idioma[]).map((idioma) => ({
    idioma,
    slug: n.slug[idioma],
  })),
);

const mesesEs = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const mesesEn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatearFecha(iso: string, idioma: Idioma): string {
  const [anio, mes, dia] = iso.split("-").map(Number);
  return idioma === "es"
    ? `${dia} de ${mesesEs[mes - 1]} de ${anio}`
    : `${mesesEn[mes - 1]} ${dia}, ${anio}`;
}
