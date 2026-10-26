// Convierte publicaciones de Instagram hechas para clientes en AVIF + WebP
// dentro de public/imagenes/contenido/, para mostrarlas como ejemplo del
// servicio de creación de contenido en /servicios.
//
//   node herramientas/procesar-contenido.mjs [carpeta-de-salida-de-bulk]
//
// Las piezas no viven en este repositorio: las exporta el proyecto de BULK en
// `instagram/salida/`, una carpeta por publicación. Acá sólo se leen.
//
// Se eligen a mano y no se toman todas. Las primeras publicaciones de BULK
// —"agua o leche", "creatina en la comida" y el reel de mitos— llevan
// ilustraciones generadas que se ven de baja calidad, y no se muestran. Las
// que van son de la línea editorial, con fotos reales.
//
// Las piezas miden 1080×1350. En la página se muestran a menos de 300 px de
// ancho, así que con 540 alcanza para una pantalla de alta densidad.
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

const ORIGEN = process.argv[2] ?? "C:/Users/Administrator/Desktop/CLAUDE CODE/Bulk_AR/instagram/salida";
const DESTINO = "public/imagenes/contenido";
const ANCHO = 540;

/** [publicación, lámina, nombre de salida] */
const piezas = [
  ["carrusel-cuanta-proteina", "01", "bulk-cuanta-proteina"],
  ["carrusel-cuanta-proteina", "02", "bulk-cuanta-proteina-grafico"],
  ["carrusel-5-alimentos-proteina", "01", "bulk-alimentos-proteina"],
  ["carrusel-5-alimentos-proteina", "03", "bulk-alimentos-carne"],
  ["carrusel-primer-suplemento", "01", "bulk-primer-suplemento"],
  ["carrusel-como-tomar-suplementos", "02", "bulk-como-tomar"],
];

await mkdir(DESTINO, { recursive: true });

for (const [carpeta, lamina, nombre] of piezas) {
  const base = sharp(path.join(ORIGEN, carpeta, `${lamina}.png`)).resize({ width: ANCHO });
  await base.clone().avif({ quality: 60, effort: 6 }).toFile(`${DESTINO}/${nombre}.avif`);
  await base.clone().webp({ quality: 80 }).toFile(`${DESTINO}/${nombre}.webp`);
  const { width, height } = await sharp(`${DESTINO}/${nombre}.avif`).metadata();
  const { size } = await stat(`${DESTINO}/${nombre}.avif`);
  console.log(`${nombre.padEnd(30)} ${width}x${height}  avif ${(size / 1024).toFixed(0)} KB`);
}
