import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Los minutos de lectura de una nota.
 *
 * Se calcula leyendo el `.mdx` del disco en vez de guardarlo a mano en el
 * registro, por un motivo práctico: un número escrito a mano deja de ser
 * cierto la primera vez que se corrige un párrafo, y nadie se acuerda de
 * actualizarlo.
 *
 * Corre al compilar —el sitio es estático— así que leer un archivo acá no le
 * cuesta nada a nadie que visite la página.
 *
 * 200 palabras por minuto: es el promedio de lectura en pantalla para un
 * texto sin tecnicismos. Se redondea para arriba y nunca da menos de uno,
 * porque "0 min de lectura" no informa nada.
 */
const PALABRAS_POR_MINUTO = 200;

export async function minutosDeLectura(slug: string): Promise<number> {
  try {
    const archivo = path.join(process.cwd(), "content", "notas", `${slug}.mdx`);
    const texto = await readFile(archivo, "utf-8");

    const limpio = texto
      // Bloques de código enteros: no se leen como prosa.
      .replace(/```[\s\S]*?```/g, " ")
      // Direcciones de enlaces e imágenes, que no se leen.
      .replace(/\]\([^)]*\)/g, "]")
      // Lo que queda de la sintaxis de Markdown.
      .replace(/[#*_`>[\]|-]/g, " ");

    const palabras = limpio.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(palabras / PALABRAS_POR_MINUTO));
  } catch {
    // Si el archivo no se puede leer, la nota se muestra igual sin el dato.
    return 1;
  }
}

/** La fecha como se lee en español: "22 de septiembre de 2026". */
export function fechaLegible(iso: string): string {
  // `T12:00` y no la fecha pelada: `new Date("2026-09-22")` se interpreta en
  // UTC y en Argentina (UTC-3) muestra el día anterior.
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
