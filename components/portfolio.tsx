"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { botonTexto, Flecha } from "@/components/boton";
import { Captura } from "@/components/captura";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { Revelado } from "@/components/revelado";
import { proyectos } from "@/content/proyectos";
import { mensajes } from "@/content/sitio";
import { portfolio as textos } from "@/content/textos";

/**
 * A partir de cuántos proyectos vale la pena el desplazamiento horizontal.
 * Con menos, la pista no llega a llenar la pantalla y el recorrido da cero.
 */
const MINIMO_PARA_HORIZONTAL = 3;

/**
 * El portfolio, con scroll horizontal dirigido por GSAP ScrollTrigger.
 *
 * Está escrito como mejora progresiva y no al revés: el HTML que sale del
 * servidor es una pila vertical normal, completamente usable. Recién en el
 * cliente, y sólo si se cumplen las tres condiciones, se pide GSAP y la
 * sección pasa a desplazarse de costado:
 *
 *  1. pantalla de 1024px para arriba,
 *  2. sin `prefers-reduced-motion`,
 *  3. el import dinámico llegó bien.
 *
 * Eso tiene una consecuencia que vale más que el efecto: en mobile —donde
 * entra casi todo el mundo— GSAP no se descarga nunca. No está en el paquete
 * principal, es un trozo aparte que sólo pide quien lo va a usar.
 */
export function Portfolio() {
  const seccion = useRef<HTMLElement>(null);
  /**
   * Lo que se clava es este marco y no la sección entera. La bajada de arriba
   * y el cierre de abajo quedan en el flujo normal: si entraran al pin, el
   * contenido pasaría del alto del viewport y el encabezado se iría atrás de
   * la barra fija mientras los paneles se desplazan.
   */
  const marco = useRef<HTMLDivElement>(null);
  const pista = useRef<HTMLUListElement>(null);
  const indicador = useRef<HTMLSpanElement>(null);
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    /**
     * Con menos de tres proyectos no hay desplazamiento horizontal.
     *
     * No es una preferencia estética: con uno o dos paneles la pista mide
     * menos que la pantalla, así que el recorrido da cero y el pin se queda
     * clavado sin nada que desplazar. Además el gesto sólo tiene sentido
     * cuando hay más para ver de lo que entra; con un panel, clavar la
     * pantalla para mostrar una sola cosa es una traba y no un efecto.
     */
    if (proyectos.length < MINIMO_PARA_HORIZONTAL) return;

    const anchaSuficiente = window.matchMedia("(min-width: 1024px)");
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!anchaSuficiente.matches || quieto.matches) return;

    let contexto: { revert: () => void } | undefined;
    let cancelado = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelado || !marco.current || !pista.current) return;

      gsap.registerPlugin(ScrollTrigger);
      setHorizontal(true);

      // El layout recién cambia a fila en el render siguiente, así que la
      // medición se hace después de que el navegador lo aplicó.
      requestAnimationFrame(() => {
        if (cancelado || !marco.current || !pista.current) return;

        contexto = gsap.context(() => {
          const recorrido = () =>
            Math.max(0, pista.current!.scrollWidth - window.innerWidth);

          gsap.to(pista.current, {
            x: () => -recorrido(),
            ease: "none",
            scrollTrigger: {
              trigger: marco.current,
              start: "top top",
              // El alto del pin es exactamente lo que falta desplazar: así la
              // sección se suelta justo cuando termina el último panel.
              end: () => `+=${recorrido()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: ({ progress }) => {
                if (!indicador.current) return;
                const cual = Math.min(
                  proyectos.length,
                  Math.floor(progress * proyectos.length) + 1,
                );
                indicador.current.textContent = String(cual).padStart(2, "0");
              },
            },
          });
        }, seccion);
      });
    })();

    return () => {
      cancelado = true;
      contexto?.revert();
    };
  }, []);

  return (
    <section id="trabajo" ref={seccion} className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h1"
          etiqueta={textos.etiqueta}
          titulo={textos.titulo}
          bajada={textos.bajada}
          claseTitulo="max-w-[14ch]"
        />
      </div>

      {/* El marco que se clava. En vertical no es más que un contenedor. */}
      <div
        ref={marco}
        className={
          horizontal
            ? "mt-16 flex h-svh flex-col pb-10 pt-[6rem]"
            : ""
        }
      >
        {horizontal && (
          <div className="contenedor mb-8 flex items-baseline justify-between gap-6">
            <p className="t-etiqueta">{textos.ayudaScroll}</p>
            <p className="t-dato text-suave" aria-hidden="true">
              <span ref={indicador}>01</span>
              <span className="mx-1 opacity-40">/</span>
              {String(proyectos.length).padStart(2, "0")}
            </p>
          </div>
        )}

        {/*
          En horizontal la pista ocupa el alto que sobra (`min-h-0 flex-1`) y
          cada panel se estira para llenarlo. El alto lo absorbe la captura,
          que recorta desde abajo: así nada se sale de la pantalla clavada, ni
          en una notebook de 768px ni en un monitor de 1400.

          Es la alternativa a calcular el ancho del panel a partir de `svh`,
          que funcionaba pero se rompía cada vez que una línea de datos se
          partía en dos.
        */}
        <ul
          ref={pista}
          className={
            horizontal
              ? "mt-10 flex min-h-0 w-max flex-1 items-stretch gap-8 pl-[max(1.25rem,calc((100vw-82rem)/2+4rem))] pr-[15vw] will-change-transform"
              : "contenedor mt-16 grid gap-16 lg:mt-20"
          }
        >
          {proyectos.map((proyecto, i) => {
            const portada = proyecto.capturas[0];

            return (
              <li
                key={proyecto.slug}
                className={
                  horizontal ? "flex w-[min(58vw,860px)] shrink-0 flex-col" : ""
                }
              >
                <Revelado
                  retardo={horizontal ? 0 : i * 80}
                  className={horizontal ? "flex min-h-0 flex-1 flex-col" : ""}
                >
                  <article className={horizontal ? "flex min-h-0 flex-1 flex-col" : ""}>
                    <Link
                      href={`/proyectos/${proyecto.slug}`}
                      className={`group block overflow-hidden rounded-lg border border-borde bg-superficie ${
                        horizontal ? "min-h-0 flex-1" : ""
                      }`}
                    >
                      <div className={`overflow-hidden ${horizontal ? "h-full" : ""}`}>
                        <Captura
                          captura={portada}
                          sizes={horizontal ? "58vw" : "(min-width: 1024px) 80vw, 100vw"}
                          className={`w-full transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03] ${
                            horizontal ? "h-full object-cover object-top" : ""
                          }`}
                        />
                      </div>
                    </Link>

                    <div className="mt-6 flex shrink-0 flex-wrap items-start justify-between gap-x-8 gap-y-4">
                      <div className="min-w-0">
                        <p className="t-dato flex flex-wrap items-center gap-x-3 gap-y-1 text-suave">
                          <span>{proyecto.ubicacion}</span>
                          <span aria-hidden="true" className="opacity-40">
                            ·
                          </span>
                          <span>{proyecto.rubro}</span>
                          <Estado proyecto={proyecto} />
                        </p>
                        <h2 className="t-subtitulo mt-3">{proyecto.nombre}</h2>
                      </div>

                      <Link href={`/proyectos/${proyecto.slug}`} className={botonTexto}>
                        {textos.verProyecto}
                        <Flecha />
                      </Link>
                    </div>

                    {/* El resumen sólo en vertical. En la vista clavada, el
                        alto de la pantalla es el recurso escaso y este párrafo
                        repite lo que ya dice la bajada de la sección; el texto
                        completo está en la página del proyecto. */}
                    {!horizontal && (
                      <p className="t-cuerpo mt-4 max-w-[52ch]">{proyecto.resumen}</p>
                    )}
                  </article>
                </Revelado>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="contenedor">
        <Revelado>
          <div className="mt-16 flex flex-wrap items-baseline justify-between gap-6">
            <p className="t-subtitulo max-w-[18ch]">{textos.cierre}</p>
            <EnlaceWhatsApp
              mensaje={mensajes.portfolio}
              origen="portfolio"
              className={botonTexto}
            >
              {textos.cierreAccion}
              <Flecha />
            </EnlaceWhatsApp>
          </div>
        </Revelado>
      </div>
    </section>
  );
}

/**
 * La etiqueta que dice si es un cliente o una demo.
 *
 * Se dice en cada proyecto y no sólo una vez en la bajada: es la clase de
 * dato que, escondido, convierte un portfolio honesto en uno inflado.
 */
function Estado({ proyecto }: { proyecto: (typeof proyectos)[number] }) {
  // Corto a propósito: la línea de datos del panel tiene que entrar en un
  // renglón, y con la etiqueta larga se partía en dos y empujaba el título.
  const texto =
    proyecto.tipo === "cliente"
      ? proyecto.estado === "en-desarrollo"
        ? textos.estados.clienteEnCurso
        : textos.estados.cliente
      : textos.estados.demo;

  return (
    <span className="rounded-full border border-borde px-3 py-1 text-[0.6875rem] uppercase tracking-[0.12em] text-suave">
      {texto}
    </span>
  );
}
