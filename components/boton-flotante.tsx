"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { proyectoPorSlug } from "@/content/proyectos";
import { linkWhatsApp, mensajes } from "@/content/sitio";
import { accesibilidad } from "@/content/textos";
import { registrarClicWhatsApp } from "@/lib/analitica";

type Contexto = { mensaje: string; origen: string };

/**
 * Qué se manda escrito según la página en la que está la persona.
 *
 * Es la diferencia entre recibir un "hola" suelto y recibir un mensaje que
 * ya dice desde dónde viene. En la página de un proyecto va el nombre del
 * cliente, que es lo más concreto que se puede saber de lo que estaba
 * mirando.
 */
function contextoDeRuta(ruta: string): Contexto {
  if (ruta.startsWith("/proyectos/")) {
    const proyecto = proyectoPorSlug(ruta.split("/")[2] ?? "");
    if (proyecto) {
      return {
        mensaje: mensajes.proyecto(proyecto.cliente),
        origen: `flotante_proyecto_${proyecto.slug}`,
      };
    }
  }

  const porPagina: Record<string, Contexto> = {
    "/proyectos": { mensaje: mensajes.portfolio, origen: "flotante_proyectos" },
    "/servicios": { mensaje: mensajes.general, origen: "flotante_servicios" },
    "/planes": { mensaje: mensajes.general, origen: "flotante_planes" },
    "/estudio": { mensaje: mensajes.sobreMi, origen: "flotante_estudio" },
    "/contacto": { mensaje: mensajes.contacto, origen: "flotante_contacto" },
  };

  return porPagina[ruta] ?? { mensaje: mensajes.general, origen: "flotante_inicio" };
}

export function BotonFlotante() {
  const ruta = usePathname();
  const [visible, setVisible] = useState(false);
  const contexto = contextoDeRuta(ruta);

  // En el inicio aparece recién pasado el hero, que ya tiene un botón grande
  // y no necesita otro compitiendo. En el resto de las páginas el encabezado
  // es corto, así que alcanza con un poco de desplazamiento.
  useEffect(() => {
    const umbral = () => (ruta === "/" ? window.innerHeight * 0.6 : 240);
    const alDesplazar = () => setVisible(window.scrollY > umbral());
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, [ruta]);

  return (
    <a
      href={linkWhatsApp(contexto.mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => registrarClicWhatsApp(contexto.origen)}
      aria-label={accesibilidad.botonFlotante}
      className={`fixed bottom-6 right-6 z-[9100] flex h-14 w-14 items-center justify-center rounded-full bg-acento text-fondo shadow-[0_8px_30px_rgba(0,0,0,.5)] transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-105 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29Z" />
      </svg>
    </a>
  );
}
