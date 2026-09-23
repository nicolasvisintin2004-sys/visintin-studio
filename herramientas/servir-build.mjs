/**
 * Sirve la carpeta `out/` como la serviría Netlify, para revisar el sitio
 * compilado y no el de desarrollo.
 *
 * Hace falta cuando lo que se quiere probar sólo existe en producción: la
 * analítica, que se compila con la variable de entorno; la imagen de Open
 * Graph ya generada; o simplemente ver el sitio sin el indicador de `next dev`
 * tapando una esquina.
 *
 *   npm run build
 *   node herramientas/servir-build.mjs
 *
 * Queda en http://localhost:4321. No pretende imitar los redirects de
 * `netlify.toml`: sólo resuelve archivos, con el mismo criterio de Netlify
 * para las rutas sin extensión.
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";

const RAIZ = process.argv[2] ?? "out";
const PUERTO = Number(process.env.PUERTO ?? 4321);

const tipos = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
};

createServer(async (pedido, respuesta) => {
  let ruta = decodeURIComponent(new URL(pedido.url, "http://x").pathname);
  if (ruta.endsWith("/")) ruta += "index.html";

  // Next exporta `/trabajo/taller-italia` como `trabajo/taller-italia.html`,
  // y la imagen de Open Graph directamente sin extensión.
  const candidatos = [ruta, `${ruta}.html`, path.posix.join(ruta, "index.html")];

  for (const candidato of candidatos) {
    try {
      const datos = await readFile(path.join(RAIZ, candidato));
      const extension = path.extname(candidato);
      respuesta.writeHead(200, {
        "Content-Type":
          tipos[extension] ??
          // `/opengraph-image` no tiene extensión y es un PNG.
          (candidato.endsWith("opengraph-image") ? "image/png" : "application/octet-stream"),
      });
      return respuesta.end(datos);
    } catch {
      // Se prueba el candidato siguiente.
    }
  }

  respuesta.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  respuesta.end(await readFile(path.join(RAIZ, "404.html")).catch(() => "404"));
}).listen(PUERTO, () => {
  console.log(`${RAIZ}/ servido en http://localhost:${PUERTO}`);
});
