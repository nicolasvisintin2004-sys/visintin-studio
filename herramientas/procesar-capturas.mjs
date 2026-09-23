// Recorta las capturas crudas y las deja en AVIF + WebP dentro de public/.
//
// El recorte hace dos cosas: saca la barra de "DEMO" que el sitio lleva
// pegada arriba, y descarta la franja de abajo donde queda la insignia de
// Netlify. Lo que sobrevive es exactamente lo que se ve en la pantalla del
// visitante.
//
// Para las capturas del "antes" —búsquedas de Google, fichas, páginas
// caídas— está la otra herramienta: procesar-evidencia.mjs.
//
// El sitio se exporta estático, así que next/image no puede convertir nada en
// tiempo de compilación: los formatos se generan acá, una sola vez.
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";

const ORIGEN = ".capturas";
const DESTINO = "public/imagenes/trabajo";

/** Alto en píxeles CSS de la barra de demo de cada sitio. */
// Taller Italia lleva una línea roja debajo de la barra que sobrevivía a un
// recorte de 26px y aparecía como un filo rojo en el borde de la captura.
const BARRA = { "taller-italia": 32 };

/** Relación de aspecto de cada tipo de captura, en píxeles CSS. */
const FORMATO = {
  escritorio: { ancho: 1440, alto: 900, salida: 2048 },
  movil: { ancho: 390, alto: 844, salida: 780 },
};

const trabajos = [
  ["taller-italia-inicio", "escritorio"],
  ["taller-italia-interior", "escritorio"],
  ["taller-italia-rental", "escritorio"],
  ["taller-italia-movil", "movil"],
];

await mkdir(DESTINO, { recursive: true });

for (const [nombre, tipo] of trabajos) {
  const sitio = Object.keys(BARRA).find((s) => nombre.startsWith(s));
  const { ancho, alto, salida } = FORMATO[tipo];
  const origen = sharp(`${ORIGEN}/${nombre}.png`);
  const meta = await origen.metadata();
  // La captura se pidió con --force-device-scale-factor=2.
  const escala = meta.width / ancho;
  const recorte = {
    left: 0,
    top: Math.round(BARRA[sitio] * escala),
    width: meta.width,
    height: Math.round(alto * escala),
  };

  const base = sharp(`${ORIGEN}/${nombre}.png`)
    .extract(recorte)
    .resize({ width: salida });

  await base.clone().avif({ quality: 62, effort: 6 }).toFile(`${DESTINO}/${nombre}.avif`);
  await base.clone().webp({ quality: 80 }).toFile(`${DESTINO}/${nombre}.webp`);

  const final = await sharp(`${DESTINO}/${nombre}.avif`).metadata();
  // El peso sale del archivo en disco: `metadata()` no lo trae al leer.
  const { size } = await stat(`${DESTINO}/${nombre}.avif`);
  console.log(
    `${nombre.padEnd(28)} ${final.width}x${final.height}  avif ${(size / 1024).toFixed(0)} KB`,
  );
}
