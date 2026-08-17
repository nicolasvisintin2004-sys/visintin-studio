"use client";

import { usePathname } from "next/navigation";
import { nombrePorProyecto, tituloPorNota } from "@/content/indice";
import { textos } from "@/content/textos";
import { registrarEvento } from "@/lib/analitica";
import { esIdioma, idiomaPorDefecto, type Idioma } from "@/lib/i18n";
import { linkWhatsApp, mensajes } from "@/lib/sitio";

/**
 * Arma el enlace de WhatsApp según la ruta actual.
 *
 * Se usa solo donde el componente NO puede saber su contexto: hoy, la barra
 * de navegación, que es la misma en las ocho páginas y en los dos idiomas.
 * Los botones dentro de una página reciben el mensaje por props, porque la
 * página ya tiene el dato exacto en la mano.
 */
export function idiomaDeRuta(ruta: string): Idioma {
  const primero = ruta.split("/").filter(Boolean)[0] ?? "";
  return esIdioma(primero) ? primero : idiomaPorDefecto;
}

export function mensajePorRuta(ruta: string): string {
  const idioma = idiomaDeRuta(ruta);
  // Se saca el prefijo de idioma para razonar sobre la sección.
  const sinIdioma = ruta.replace(/^\/(es|en)/, "") || "/";

  if (sinIdioma.startsWith("/trabajo/")) {
    const slug = sinIdioma.split("/")[2] ?? "";
    const cliente = nombrePorProyecto[slug];
    return cliente
      ? mensajes.caso(cliente, idioma)
      : textos.mensajesWhatsApp.trabajo[idioma];
  }

  if (sinIdioma.startsWith("/notas/")) {
    const slug = sinIdioma.split("/")[2] ?? "";
    const titulo = tituloPorNota[slug]?.[idioma];
    return titulo
      ? mensajes.nota(titulo, idioma)
      : textos.mensajesWhatsApp.general[idioma];
  }

  if (sinIdioma.startsWith("/planes")) {
    return textos.mensajesWhatsApp.planes[idioma];
  }

  if (sinIdioma.startsWith("/trabajo")) {
    return textos.mensajesWhatsApp.trabajo[idioma];
  }

  if (sinIdioma.startsWith("/estudio")) {
    return textos.mensajesWhatsApp.estudio[idioma];
  }

  return textos.mensajesWhatsApp.general[idioma];
}

export function useWhatsAppLink() {
  const ruta = usePathname();
  const href = linkWhatsApp(mensajePorRuta(ruta));

  return {
    href,
    /** Se dispara en el clic; la ruta de origen va como propiedad. */
    alHacerClic: (origen = "navegacion") => {
      registrarEvento("clic_whatsapp", { ruta, origen });
    },
  };
}
