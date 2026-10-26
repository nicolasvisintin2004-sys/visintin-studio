import { Acordeon } from "@/components/acordeon";
import { botonTexto } from "@/components/boton";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { preguntas as lista } from "@/content/preguntas";
import { mensajes } from "@/content/sitio";
import { preguntas as textos } from "@/content/textos";

/**
 * Preguntas frecuentes del estudio.
 *
 * El acordeón en sí vive en `components/acordeon.tsx`, porque la página del
 * diagnóstico tiene su propia lista y las dos tienen que verse igual.
 */
export function Preguntas() {
  return (
    <section id="preguntas" className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h2"
          titulo={textos.titulo}
          claseTitulo="max-w-[16ch]"
        />

        <div className="mt-14 lg:mt-20">
          <Acordeon items={lista} />
        </div>

        <div>
          <div className="mt-16 flex flex-wrap items-baseline justify-between gap-6">
            <p className="t-subtitulo max-w-[18ch]">{textos.cierre}</p>
            <EnlaceWhatsApp
              mensaje={mensajes.preguntas}
              origen="preguntas"
              className={botonTexto}
            >
              {textos.cierreAccion}
            </EnlaceWhatsApp>
          </div>
        </div>
      </div>
    </section>
  );
}
