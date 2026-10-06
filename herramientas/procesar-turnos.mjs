// Recorta las capturas de Visintin Turnos y las deja en AVIF + WebP dentro de
// public/imagenes/turnos/, para la página /turnos.
//
// Las capturas crudas no viven en este repositorio: las genera el proyecto de
// turnos con `pnpm capturas`, contra una base de prueba en memoria, y quedan
// en su carpeta `capturas/`. Acá sólo se leen.
//
//   node herramientas/procesar-turnos.mjs [carpeta-de-capturas]
//
// Cada recorte hace dos cosas. Saca la insignia "N" de las herramientas de
// desarrollo de Next, que sale abajo a la izquierda en todas las capturas
// porque se sacan con el servidor de desarrollo. Y deja afuera lo que no
// aporta: una pantalla de 1180 px de alto reducida al ancho de una columna no
// se lee.
//
// Las de escritorio están sacadas a 1366 px y densidad 1, así que no se
// agrandan: se guardan al ancho que tienen. En la página se muestran a la
// mitad de ese ancho o menos, que es lo que las mantiene nítidas en una
// pantalla de alta densidad. Si algún día hace falta mostrarlas más grandes,
// hay que volver a sacarlas con `deviceScaleFactor: 2` en el proyecto de
// turnos, no estirarlas acá.
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

const ORIGEN = process.argv[2] ?? "C:/Users/Administrator/Desktop/Turnos aut/capturas";
const DESTINO = "public/imagenes/turnos";

/**
 * `alto` es cuánto se conserva desde arriba, en píxeles de la captura cruda.
 * `salida` es el ancho final; sin valor, se conserva el de la captura.
 * `izquierda`, `arriba` y `ancho` recortan una parte en vez de la pantalla
 * entera, y sólo los usan las versiones para el celular.
 *
 * Las versiones `-movil` existen porque una pantalla de escritorio de 1366 px
 * reducida a los 340 px de un teléfono es una mancha: no se lee un solo
 * número. Ahí se muestra un pedazo de la pantalla, casi a tamaño real, en vez
 * de la pantalla entera en miniatura. La página elige una u otra con
 * `<picture>` según el ancho.
 */
const trabajos = [
  // La reserva tal como la ve el paciente, con el atajo "Lo antes posible".
  { origen: "clinica-profesionales", nombre: "reserva", alto: 2030, salida: 780 },
  // El primer paso en una clínica: elegir la especialidad.
  { origen: "clinica-especialidades", nombre: "especialidades", alto: 2030, salida: 780 },
  // La semana entera, en oscuro. La vista del día se sacó un domingo y sale
  // vacía; la semana muestra la agenda llena, que es lo que hay que ver.
  { origen: "semana-oscuro", nombre: "agenda", alto: 840 },
  // Para el celular: tres días de la semana, con sus turnos.
  { origen: "semana-oscuro", nombre: "agenda-movil", izquierda: 250, arriba: 118, ancho: 480, alto: 500 },
  // Los resultados: el número grande y la primera fila de gráficos.
  { origen: "resultados-oscuro", nombre: "resultados", alto: 775 },
  // Para el celular: el número grande y lo que vale en pesos.
  { origen: "resultados-oscuro", nombre: "resultados-movil", izquierda: 270, arriba: 86, ancho: 480, alto: 205 },
];

await mkdir(DESTINO, { recursive: true });

for (const { origen, nombre, alto, salida, izquierda = 0, arriba = 0, ancho } of trabajos) {
  const archivo = path.join(ORIGEN, `${origen}.png`);
  const meta = await sharp(archivo).metadata();

  let base = sharp(archivo).extract({
    left: izquierda,
    top: arriba,
    width: ancho ?? meta.width,
    height: alto,
  });
  if (salida) base = base.resize({ width: salida });

  await base.clone().avif({ quality: 62, effort: 6 }).toFile(`${DESTINO}/${nombre}.avif`);
  await base.clone().webp({ quality: 82 }).toFile(`${DESTINO}/${nombre}.webp`);

  const final = await sharp(`${DESTINO}/${nombre}.avif`).metadata();
  const { size } = await stat(`${DESTINO}/${nombre}.avif`);
  console.log(
    `${nombre.padEnd(16)} ${final.width}x${final.height}  avif ${(size / 1024).toFixed(0)} KB`,
  );
}
