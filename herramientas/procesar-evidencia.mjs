// Recorta las capturas de "antes" y las deja en AVIF + WebP dentro de public/.
//
// Son distintas de las del portfolio: no son fotos de un sitio que construí,
// sino pruebas de cómo se encontraba el negocio ANTES de tener uno. Salen de
// Google, de Maps y del navegador, así que vienen con cosas que no pueden
// publicarse.
//
// ── Por qué cada recorte ──
//
// La captura del navegador traía la barra de marcadores personales de Nicolás
// —YouTube, WhatsApp, su campus de la facultad, Netflix— y la de Maps traía la
// barra lateral con sus lugares guardados, su avatar y su historial. Nada de
// eso tiene que ver con el caso y es información personal, así que se recorta
// acá y no a ojo en un editor: escrito, el recorte es reproducible y se
// entiende por qué existe.
//
// La prueba sobrevive igual al recorte. La página de error nombra el dominio
// en su propio texto ("www.talleritalia.com.ar"), así que no hace falta
// mostrar la barra de direcciones para que se entienda cuál falló.
//
// ── Uso ──
//
//   node herramientas/procesar-evidencia.mjs
//
// Lee de `.evidencia/` (que no se versiona, igual que `.capturas/`) y escribe
// en `public/imagenes/evidencia/`.
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";

const ORIGEN = ".evidencia";
const DESTINO = "public/imagenes/evidencia";

/**
 * Qué se recorta de cada una y por qué.
 *
 * `recorte` está en píxeles del archivo original. `salida` es el ancho final:
 * ninguna se muestra a más de 900 px en el sitio, así que 1400 alcanza y
 * sobra para pantallas de alta densidad.
 */
const capturas = [
  {
    archivo: "google-busqueda",
    origen: "busqueda.png",
    // Se corta a la derecha para dejar afuera los iconos de cuenta del
    // extremo superior. Abajo, donde arranca la fila de imágenes cortada.
    recorte: { left: 60, top: 8, width: 1340, height: 700 },
    salida: 1340,
  },
  {
    archivo: "google-ficha",
    origen: "ficha.webp",
    // Sólo la tarjeta del negocio. Afuera quedan la barra lateral con los
    // lugares guardados, el panel de indicaciones y el avatar de la cuenta.
    // Abajo se corta antes de "Tu historial de Google Maps".
    recorte: { left: 494, top: 252, width: 404, height: 458 },
    salida: 808,
  },
  {
    archivo: "sitio-caido",
    origen: "caido.png",
    // Sólo el mensaje de error. Afuera quedan la barra de direcciones, la de
    // marcadores personales y los seiscientos píxeles de fondo vacío que
    // quedaban abajo: sobre un sitio oscuro se leían como un hueco y no como
    // una captura.
    recorte: { left: 560, top: 190, width: 830, height: 440 },
    salida: 1245,
  },
];

await mkdir(DESTINO, { recursive: true });

for (const { archivo, origen, recorte, salida } of capturas) {
  const base = sharp(`${ORIGEN}/${origen}`).extract(recorte).resize({ width: salida });

  await base.clone().avif({ quality: 62, effort: 6 }).toFile(`${DESTINO}/${archivo}.avif`);
  await base.clone().webp({ quality: 80 }).toFile(`${DESTINO}/${archivo}.webp`);

  const final = await sharp(`${DESTINO}/${archivo}.avif`).metadata();
  const { size } = await stat(`${DESTINO}/${archivo}.avif`);
  console.log(
    `${archivo.padEnd(20)} ${final.width}x${final.height}  avif ${(size / 1024).toFixed(0)} KB`,
  );
}
