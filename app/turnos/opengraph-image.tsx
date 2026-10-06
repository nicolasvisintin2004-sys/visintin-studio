import { TAMANO, TIPO, imagenOg } from "@/lib/imagen-og";

/**
 * La miniatura de Visintin Turnos.
 *
 * Es la página que se va a pasar por WhatsApp a dueños de consultorios, y
 * ahí la miniatura es lo primero que se ve. Dice la promesa, igual que el
 * título de la página, y no el nombre del producto.
 *
 * Usa la plantilla del resto del sitio, que es sólo tipográfica: no lleva una
 * captura del producto. Una pantalla de celular reducida a una miniatura de
 * WhatsApp no se lee, y el título sí.
 */
export const dynamic = "force-static";

export const alt = "Visintin Turnos · Sistema de turnos para consultorios con recordatorio por WhatsApp";
export const size = TAMANO;
export const contentType = TIPO;

export default async function Imagen() {
  return imagenOg({
    seccion: "Visintin Turnos",
    titulo: "Que el sillón no quede vacío.",
    pie: "Tus pacientes sacan turno solos y reciben un recordatorio por WhatsApp.",
  });
}
