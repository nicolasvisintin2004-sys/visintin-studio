"use client";

import { useEffect, useState } from "react";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { ACCION_DEMO, MENSAJE_DEMO } from "@/content/turnos-acciones";

/**
 * El botón fijo de abajo, sólo en el celular.
 *
 * La página es larga y el que la lee entre un paciente y otro no va a volver
 * arriba a buscar el botón: tiene que tenerlo a mano en el momento en que se
 * convence, que puede ser en cualquier sección.
 *
 * Aparece al pasar la primera pantalla —arriba ya hay un botón grande y no
 * hace falta otro encima— y se va al llegar al cierre, que tiene el suyo. Dos
 * botones iguales a un dedo de distancia se leen como insistencia.
 *
 * En esta página reemplaza al círculo flotante de WhatsApp del resto del
 * sitio, que en el celular se oculta: `components/boton-flotante.tsx`.
 */
export function BarraDemo() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alDesplazar = () => {
      const cierre = document.getElementById("pedir");
      const pasoLaPortada = window.scrollY > window.innerHeight * 0.85;
      // Llegó al cierre cuando su borde de arriba entra por abajo.
      const llegoAlCierre = cierre
        ? cierre.getBoundingClientRect().top < window.innerHeight
        : false;
      setVisible(pasoLaPortada && !llegoAlCierre);
    };
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alDesplazar);
    return () => {
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", alDesplazar);
    };
  }, []);

  return (
    <div
      // `inert` lo saca del orden de tabulación mientras está escondido.
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-[9100] border-t border-borde bg-fondo/90 px-5 pb-[calc(0.875rem+env(safe-area-inset-bottom))] pt-3.5 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <EnlaceWhatsApp
        mensaje={MENSAJE_DEMO}
        origen="turnos_barra"
        className="flex w-full items-center justify-center rounded-full bg-texto px-7 py-4 text-[0.9375rem] font-medium leading-none text-fondo"
      >
        {ACCION_DEMO}
      </EnlaceWhatsApp>
    </div>
  );
}
