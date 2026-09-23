import type { Metadata } from "next";
import { sitio } from "@/content/sitio";

/**
 * Los metadatos de una página del sitio.
 *
 * Existe para que ninguna página se olvide del canonical. Cuando el sitio era
 * una sola página, el layout declaraba `canonical: "/"` para todo; con varias
 * páginas eso es un error serio, porque cualquiera que no lo pise le dice a
 * Google que es una copia del inicio y no se indexa.
 *
 * También arma el Open Graph completo: Next reemplaza el objeto entero en vez
 * de combinarlo con el del layout, así que una página que declare sólo título
 * y descripción pierde el nombre del sitio, el idioma y —lo que más importa—
 * la imagen. Se comprobó en el HTML compilado: sin `images` acá, ninguna
 * página interna tenía `og:image`, y un enlace a /servicios compartido por
 * WhatsApp salía sin miniatura.
 */

/** La imagen generada por `app/opengraph-image.tsx`, que sirve para todo el sitio. */
const IMAGEN = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${sitio.nombre} · Sistemas web y automatización para PyMEs argentinas`,
};

export function metadatosDePagina({
  ruta,
  titulo,
  descripcion,
  tipo = "website",
  absoluto = false,
  imagen,
}: {
  /** Con barra inicial: "/servicios". */
  ruta: string;
  /** Sin el nombre del sitio: el layout lo agrega. */
  titulo: string;
  descripcion: string;
  tipo?: "website" | "article";
  /**
   * El título va tal cual, sin " · Visintin Studio" al final. Es para el
   * inicio, cuyo título ya empieza con el nombre del estudio.
   */
  absoluto?: boolean;
  /**
   * La dirección de una imagen propia, para las páginas que tienen su
   * `opengraph-image.tsx`. Sin esto heredarían la del inicio: el objeto de
   * `openGraph` que arma esta función pisa el que Next genera solo a partir
   * del archivo, así que la que gana es la de acá.
   */
  imagen?: string;
}): Metadata {
  const tituloCompleto = absoluto ? titulo : `${titulo} · ${sitio.nombre}`;
  const imagenDeLaPagina = imagen
    ? { ...IMAGEN, url: imagen, alt: tituloCompleto }
    : IMAGEN;

  return {
    title: absoluto ? { absolute: titulo } : titulo,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: {
      type: tipo,
      locale: "es_AR",
      siteName: sitio.nombre,
      url: `${sitio.url}${ruta}`,
      title: tituloCompleto,
      description: descripcion,
      images: [imagenDeLaPagina],
    },
    twitter: {
      card: "summary_large_image",
      title: tituloCompleto,
      description: descripcion,
      images: [imagenDeLaPagina.url],
    },
  };
}
