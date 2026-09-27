import { TAMANO, TIPO, imagenOg } from "@/lib/imagen-og";

/**
 * La imagen del inicio, que también es la del resto de las páginas que no
 * tienen una propia. El diseño vive en `lib/imagen-og.tsx`.
 *
 * Con `output: "export"` no hay servidor que regenere nada: Next exige
 * declarar explícitamente que esta ruta se resuelve una sola vez, al
 * compilar, y queda como archivo estático.
 */
export const dynamic = "force-static";

export const alt = "Visintin Studio · Sistemas web y automatización para PyMEs argentinas";
export const size = TAMANO;
export const contentType = TIPO;

export default async function Imagen() {
  return imagenOg({
    titulo: "Que tu empresa trabaje más y vos menos.",
    pie: "Sitios y sistemas web, automatización de procesos e IA aplicada, para PyMEs argentinas.",
  });
}
