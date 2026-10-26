import Link from "next/link";
import { botonPrimario, botonSecundario } from "@/components/boton";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { MapaProceso } from "@/components/mapa-proceso";
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
      <h1 className="t-display">
        {hero.titulo.map((linea, i) => (
          <span key={linea} className="linea-mascara">
            <span style={{ "--retardo": `${160 + i * 80}ms` } as Estilo}>{linea}</span>
          </span>
        ))}
      </h1>

      {/* Lo que el título promete, mostrado: un proceso que se ordena. Es el
          único movimiento del sitio que no lo dispara la persona.

          En el celular va después de los botones (`order-3`): ahí el mapa es
          vertical y ocupa más de una pantalla, y antes de él los botones
          quedaban casi dos pantallas abajo. En escritorio va entre el título
          y la bajada, que es el orden en que se lee la idea. */}
      <div className="order-3 mt-14 lg:order-none lg:mt-16">
        <MapaProceso />
      </div>

      <div className="mt-14 flex flex-col gap-10 lg:mt-16 lg:flex-row lg:items-end lg:justify-between">
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
          <Link href="/diagnostico" className={botonPrimario}>
            {hero.accionPrincipal}
          </Link>
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
        className="t-etiqueta entra-tarde order-4 mt-12 flex items-center gap-2.5 lg:order-none"
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
