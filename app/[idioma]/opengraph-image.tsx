import { ImageResponse } from "next/og";
import { esIdioma, idiomas } from "@/lib/i18n";
import { sitio } from "@/lib/sitio";

/**
 * El dominio sale de la dirección real del sitio, no escrito a mano.
 * Hoy es el de Netlify; el día que compres el dominio propio, cambia solo
 * en la primera compilación y no hay que acordarse de tocar esta imagen.
 */
const dominio = sitio.url.replace(/^https?:\/\//, "").replace(/^www\./, "");

/** Se prerenderiza una por idioma en vez de generarse a demanda. */
export function generateStaticParams() {
  return idiomas.map((idioma) => ({ idioma }));
}

export const alt = "Visintin Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Se busca Archivo en Google Fonts al compilar. Si la red falla, la imagen
 * igual se genera con la tipografía por defecto: preferimos una imagen
 * menos fiel a la marca antes que un build roto.
 */
async function cargarArchivo(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Archivo:wght@700",
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((r) => r.text());

    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    if (!url) return null;

    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

const lineas = {
  es: [
    "Sitios web para PyMEs argentinas",
    "que en persona convencen",
    "y en Google no aparecen.",
  ],
  en: [
    "Websites for businesses that win",
    "people over in person",
    "and don't show up on Google.",
  ],
} as const;

const pie = {
  es: "NEXT.JS · SEO TÉCNICO · WHATSAPP",
  en: "NEXT.JS · TECHNICAL SEO · WHATSAPP",
} as const;

export default async function Imagen({
  params,
}: {
  params: Promise<{ idioma: string }>;
}) {
  const { idioma } = await params;
  const lang = esIdioma(idioma) ? idioma : "es";
  const archivo = await cargarArchivo();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0C",
          color: "#FFFFFF",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 4,
            color: "#8A8A92",
          }}
        >
          VISINTIN STUDIO · DESARROLLO WEB · BUENOS AIRES
        </div>

        {/* Los cortes van a mano: Satori no soporta text-wrap: balance, y
            dejado al ajuste automático "aparecen." queda solo en su línea. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 62,
            lineHeight: 1.12,
            letterSpacing: -1.5,
            fontWeight: 700,
          }}
        >
          {lineas[lang].map((linea) => (
            <span key={linea}>{linea}</span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #3E3E44",
            paddingTop: 28,
            fontSize: 24,
            color: "#8A8A92",
            letterSpacing: 2,
          }}
        >
          <span>{pie[lang]}</span>
          <span style={{ color: "#FFFFFF" }}>{dominio.toUpperCase()}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: archivo
        ? [{ name: "Archivo", data: archivo, style: "normal", weight: 700 }]
        : undefined,
    },
  );
}
