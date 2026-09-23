import { TAMANO, TIPO, imagenOg } from "@/lib/imagen-og";

/**
 * La miniatura del diagnóstico.
 *
 * Tiene la suya y no la del inicio porque es la página que más se comparte a
 * mano: va en mensajes de prospección, en historias y en anuncios, y ahí la
 * miniatura es lo primero que se ve. Dice el problema, igual que el título de
 * la página, y no el nombre del producto.
 */
export const dynamic = "force-static";

export const alt = "Diagnóstico de procesos para PyMEs · Visintin Studio";
export const size = TAMANO;
export const contentType = TIPO;

export default async function Imagen() {
  return imagenOg({
    seccion: "Diagnóstico",
    titulo: "Se te van horas cada semana. No sabés en qué.",
    pie: "Una radiografía por escrito de cómo trabaja tu empresa, con un plan de trabajo.",
  });
}
