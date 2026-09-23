#!/usr/bin/env node
/**
 * Escribe `out/_headers` con el tipo de contenido de las imágenes de Open
 * Graph.
 *
 * El problema que resuelve: Next exporta cada imagen como un archivo SIN
 * extensión (`out/opengraph-image`,
 * `out/proyectos/taller-italia/opengraph-image`).
 * Servido sin el encabezado correcto, WhatsApp no muestra la miniatura al
 * compartir el enlace, que es justamente para lo que existen.
 *
 * Antes había una sola y su encabezado estaba escrito a mano en
 * `netlify.toml`. Ahora hay una por página importante y una por proyecto, así
 * que la lista se genera: agregar un proyecto o una página con miniatura
 * propia no tiene que obligarse a acordarse de tocar la configuración, porque
 * el día que alguien se olvide el enlace se comparte sin imagen y nadie se
 * entera hasta que es tarde.
 *
 * Corre después de `next build`, desde el script `build` de package.json.
 */

import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SALIDA = "out";
const NOMBRE = "opengraph-image";

/** Todas las rutas —relativas a `out/`— de los archivos que se llaman así. */
async function buscar(carpeta, prefijo = "") {
  const entradas = await readdir(path.join(SALIDA, carpeta), { withFileTypes: true });
  const encontradas = [];

  for (const entrada of entradas) {
    const ruta = `${prefijo}/${entrada.name}`;
    if (entrada.isDirectory()) {
      encontradas.push(...(await buscar(path.join(carpeta, entrada.name), ruta)));
    } else if (entrada.name === NOMBRE) {
      encontradas.push(ruta);
    }
  }

  return encontradas;
}

const rutas = (await buscar(".")).sort();

if (rutas.length === 0) {
  console.error("encabezados-og: no se encontró ninguna imagen de Open Graph.");
  process.exit(1);
}

const contenido = [
  "# Generado por herramientas/encabezados-og.mjs. No editar a mano.",
  "#",
  "# Next exporta las imágenes de Open Graph sin extensión. Sin estos",
  "# encabezados se sirven con el tipo equivocado y WhatsApp no muestra la",
  "# miniatura al compartir el enlace.",
  "",
  ...rutas.flatMap((ruta) => [
    ruta,
    "  Content-Type: image/png",
    "  Cache-Control: public, max-age=31536000, immutable",
    "",
  ]),
].join("\n");

await writeFile(path.join(SALIDA, "_headers"), contenido, "utf-8");

console.log(`encabezados-og: ${rutas.length} imágenes declaradas en out/_headers`);
for (const ruta of rutas) console.log(`  ${ruta}`);
