import { proyectoPorSlug, slugsDeProyecto } from "@/content/proyectos";
import { TAMANO, TIPO, imagenOg } from "@/lib/imagen-og";

/**
 * La miniatura de cada proyecto.
 *
 * Muestra la línea de resultado y no el nombre del cliente: quien recibe el
 * enlace por WhatsApp no conoce a Taller Italia, pero sí entiende "cada
 * consulta empezaba explicando de nuevo lo mismo" leído en la miniatura.
 *
 * Una por proyecto, todas generadas al compilar. En export estático hace
 * falta `generateStaticParams` también acá, igual que en la página.
 */
export const dynamic = "force-static";

export const alt = "Proyecto de Visintin Studio";
export const size = TAMANO;
export const contentType = TIPO;

export function generateStaticParams() {
  return slugsDeProyecto.map((slug) => ({ slug }));
}

export default async function Imagen({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const proyecto = proyectoPorSlug(slug);

  if (!proyecto) {
    return imagenOg({
      seccion: "Proyectos",
      titulo: "Tres negocios, de Instagram a un sitio propio.",
      pie: "Visintin Studio",
    });
  }

  return imagenOg({
    seccion: proyecto.rubro,
    titulo: proyecto.resultado.despues,
    pie: `Antes: ${proyecto.resultado.antes}`,
    firma: proyecto.nombre,
  });
}
