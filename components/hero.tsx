import { botonPrimario, botonSecundario } from "@/components/boton";
import { EnlaceMagnetico } from "@/components/enlace-magnetico";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { disponibilidad, mensajes } from "@/content/sitio";
import { hero } from "@/content/textos";

/**
 * El hero.
 *
 * Mide 88svh y no 100: la sección siguiente tiene que asomar por abajo. Un
 * hero de pantalla completa empuja todo el contenido fuera de la primera
 * vista y obliga a scrollear para descubrir que hay algo más.
 *
 * El título entra línea por línea con máscara —cada línea sube desde abajo de
 * su propio recorte— con 80 ms de diferencia entre una y otra. Es animación
 * CSS pura, sin JavaScript: el título es el LCP y no puede depender de que
 * cargue un script.
 */
export function Hero() {
  return (
    <section className="contenedor relative flex min-h-[88svh] flex-col justify-end pb-16 pt-32 sm:pb-24">
      <p className="t-etiqueta entra-tarde mb-8" style={{ "--retardo": "80ms" } as Estilo}>
        {hero.etiqueta}
      </p>

      <h1 className="t-display">
        {hero.titulo.map((linea, i) => (
          <span key={linea} className="linea-mascara">
            <span style={{ "--retardo": `${160 + i * 80}ms` } as Estilo}>{linea}</span>
          </span>
        ))}
      </h1>

      <div className="mt-10 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
        <p
          className="t-cuerpo entra-tarde text-[1.0625rem] leading-[1.6]"
          style={{ "--retardo": "560ms" } as Estilo}
        >
          {hero.bajada}
        </p>

        <div
          className="entra-tarde flex shrink-0 flex-wrap items-center gap-3"
          style={{ "--retardo": "680ms" } as Estilo}
        >
          {/*
            El botón principal lleva al diagnóstico y el de WhatsApp pasa a
            secundario. No es un cambio de estilo: el que llega al sitio por
            primera vez casi nunca sabe qué pedir, y "Consultar por WhatsApp"
            le pide justamente eso. El diagnóstico le ofrece algo concreto,
            acotado y con precio, que es una decisión bastante más fácil.
          */}
          <EnlaceMagnetico href="/diagnostico" className={botonPrimario}>
            {hero.accionPrincipal}
          </EnlaceMagnetico>
          <EnlaceWhatsApp
            mensaje={mensajes.general}
            origen="hero"
            className={botonSecundario}
          >
            {hero.accionSecundaria}
          </EnlaceWhatsApp>
        </div>
      </div>

      <p
        className="t-etiqueta entra-tarde mt-12 flex items-center gap-2.5"
        style={{ "--retardo": "800ms" } as Estilo}
      >
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-acento" />
        {disponibilidad}
      </p>
    </section>
  );
}

/** Atajo de tipo: las variables CSS no entran en `CSSProperties` sin esto. */
type Estilo = React.CSSProperties;
