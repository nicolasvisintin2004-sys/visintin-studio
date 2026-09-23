import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { sitio } from "@/content/sitio";

/**
 * El generador de las imágenes que se ven al compartir un enlace.
 *
 * Existe una por página importante —el inicio, el diagnóstico y cada
 * proyecto— y todas salen de acá para que se vean como una familia: mismo
 * fondo, misma tipografía, misma línea de bronce arriba a la izquierda. Si la
 * miniatura no se parece a la página, el que la toca siente que entró a otro
 * lado.
 *
 * Las fuentes se leen de `app/fuentes/` en formato TTF porque el generador de
 * imágenes no entiende WOFF2. Esos dos TTF no llegan nunca al navegador:
 * existen sólo para esto.
 */

export const TAMANO = { width: 1200, height: 630 };
export const TIPO = "image/png";

type Props = {
  /** Lo que va arriba, al lado de la línea de bronce. */
  seccion?: string;
  /** El texto grande. Una sola frase: más de tres líneas no entra. */
  titulo: string;
  /** El renglón de abajo a la izquierda. */
  pie: string;
  /** Abajo a la derecha, en bronce. Por defecto, el nombre. */
  firma?: string;
};

async function fuentes() {
  const carpeta = path.join(process.cwd(), "app", "fuentes");
  const [display, cuerpo] = await Promise.all([
    readFile(path.join(carpeta, "ClashDisplay-600.ttf")),
    readFile(path.join(carpeta, "Satoshi-400.ttf")),
  ]);

  return [
    { name: "Clash Display", data: display, weight: 600 as const, style: "normal" as const },
    { name: "Satoshi", data: cuerpo, weight: 400 as const, style: "normal" as const },
  ];
}

/**
 * El tamaño del título se elige según el largo.
 *
 * El generador no reflowea ni achica solo: un título largo con el cuerpo fijo
 * se desborda y queda cortado en la miniatura, que es justo donde no se puede
 * revisar antes de publicar.
 */
function cuerpoDelTitulo(titulo: string): number {
  if (titulo.length > 78) return 62;
  if (titulo.length > 52) return 74;
  return 92;
}

export async function imagenOg({ seccion, titulo, pie, firma }: Props) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0c0e",
          padding: "72px 80px",
          fontFamily: "Satoshi",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 2, backgroundColor: "#c08a4e" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#8a9099",
            }}
          >
            {seccion ? `${sitio.nombre} · ${seccion}` : sitio.nombre}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Clash Display",
            fontSize: cuerpoDelTitulo(titulo),
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            color: "#f4f4f1",
            maxWidth: 940,
          }}
        >
          {titulo}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            color: "#8a9099",
          }}
        >
          <div style={{ display: "flex", maxWidth: 620, lineHeight: 1.4 }}>{pie}</div>
          <div style={{ display: "flex", color: "#c08a4e" }}>{firma ?? sitio.autor}</div>
        </div>
      </div>
    ),
    { ...TAMANO, fonts: await fuentes() },
  );
}
