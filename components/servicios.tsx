"use client";

import { useState, type ReactNode } from "react";
import { botonTexto } from "@/components/boton";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { lineas, servicios as listaDeServicios } from "@/content/servicios";
import { mensajes } from "@/content/sitio";
import { servicios as textos } from "@/content/textos";

type Props = {
  /**
   * La lista de entregables concretos que va al pie de la sección. Llega
   * armada desde la página —que es un componente de servidor— en lugar de
   * importarse acá adentro: así sus nueve renglones de texto no viajan en el
   * JavaScript del navegador, porque no hay nada que interactuar en ellos.
   */
  pedidos?: ReactNode;
  /**
   * Los servicios de Instagram, que van entre las dos líneas y los
   * entregables. Llegan armados desde la página por el mismo motivo que
   * `pedidos`: son de servidor y no tienen nada que interactuar.
   */
  instagram?: ReactNode;
};

/**
 * La lista de servicios.
 *
 * Cada fila es un botón que abre el detalle y la prueba visual, que va fija
 * adentro de la fila. Antes, con mouse, la fila se abría sola al pasar por
 * encima y la imagen era un panel flotante que perseguía al cursor; se sacó.
 * Era el mismo gesto del cursor propio y de la luz en las tarjetas, repetido
 * en otra sección, y abrir algo sin pedirlo es lo contrario de lo que se
 * espera de una lista: ahora se abre cuando alguien la toca, con el mouse, el
 * dedo o el teclado, y la imagen queda al lado del texto que la explica.
 *
 * El detalle está siempre en el HTML: se muestra con `grid-template-rows` y
 * no montando nodos, así el texto existe para Google y para un lector de
 * pantalla aunque nadie abra la fila.
 */
export function Servicios({ pedidos, instagram }: Props) {
  const [activo, setActivo] = useState<number | null>(null);

  const servicioActivo = activo !== null ? listaDeServicios[activo] : null;

  return (
    <section id="servicios" className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h1"
          titulo={textos.titulo}
          bajada={textos.bajada}
          claseTitulo="max-w-[16ch]"
        />

        {/*
          Las dos líneas, con el mismo peso visual y el mismo tratamiento.
          Es el cambio de fondo de esta sección: antes eran cuatro servicios
          en una lista, con la web arriba porque era lo que más se vendía.
          Ahora son dos maneras distintas de trabajar —lo que ve el cliente y
          lo que pasa puertas adentro— y ninguna es el apéndice de la otra.

          El índice de la fila abierta es el global dentro de
          `listaDeServicios` y no el de cada grupo: si fuera el del grupo,
          abrir un servicio de la segunda línea abriría también el de la
          primera que está en la misma posición.
        */}
        {lineas.map((linea, indiceDeLinea) => (
          <div
            key={linea.slug}
            className={
              indiceDeLinea === 0 ? "mt-16 lg:mt-24" : "mt-20 lg:mt-28"
            }
          >
            <div>
              <div className="flex flex-col gap-3 border-t border-acento pt-8 lg:flex-row lg:items-baseline lg:gap-12">
                <h2 className="t-subtitulo shrink-0 lg:w-[20rem]">
                  {linea.nombre}
                </h2>
                <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-suave">
                  {linea.promesa}
                </p>
              </div>
            </div>

            <ul className="mt-10 border-t border-borde">
              {listaDeServicios.map((servicio, i) => {
                if (servicio.linea !== linea.slug) return null;
                const abierto = activo === i;

                return (
                  <li key={servicio.slug}>
                    <div className="border-b border-borde">
                      <button
                        type="button"
                        aria-expanded={abierto}
                        aria-controls={`servicio-${servicio.slug}`}
                        // Sólo el clic abre y cierra. Antes también abría al
                        // recibir el foco, y como un clic del mouse primero
                        // enfoca y después dispara el clic, la fila se abría y se
                        // cerraba en el mismo gesto. Para el teclado alcanza con
                        // esto: Enter y Espacio sobre un botón disparan el clic.
                        onClick={() => setActivo(abierto ? null : i)}
                        // Sin número adelante: son cuatro servicios, no
                        // cuatro pasos, y numerarlos sugería un orden.
                        className="group grid w-full grid-cols-[1fr_auto] items-center gap-5 py-9 text-left sm:gap-8 sm:py-12"
                      >
                        <span className="min-w-0">
                          <span
                            className={`t-subtitulo block transition-colors duration-300 group-hover:text-acento ${
                              abierto ? "text-acento" : ""
                            }`}
                          >
                            {servicio.nombre}
                          </span>
                          <span className="mt-2 block text-[0.9375rem] text-suave">
                            {servicio.promesa}
                          </span>
                        </span>

                        <span
                          aria-hidden="true"
                          className={`text-2xl leading-none text-suave transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                            abierto ? "rotate-45 text-acento" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>

                      {/*
                        0fr → 1fr anima la altura sin tener que medirla en JS.
                        El `min-h-0` del hijo no es decorativo: sin él, el hijo
                        con `overflow: hidden` aporta cero al mínimo de la pista
                        y el `1fr` se resuelve en 0px, así que el detalle nunca
                        se abría.
                      */}
                      <div
                        id={`servicio-${servicio.slug}`}
                        className="grid transition-[grid-template-rows] duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)]"
                        style={{ gridTemplateRows: abierto ? "1fr" : "0fr" }}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="grid gap-8 pb-12 lg:grid-cols-[1fr_auto] lg:gap-16">
                            <div>
                              <p className="t-cuerpo">{servicio.detalle}</p>
                              <ul className="mt-6 flex flex-wrap gap-2">
                                {servicio.entrega.map((item) => (
                                  <li
                                    key={item}
                                    className="t-dato rounded-full border border-borde px-4 py-2 text-suave"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <picture>
                              <source
                                srcSet={`/imagenes/trabajo/${servicio.imagen.archivo}.avif`}
                                type="image/avif"
                              />
                              <img
                                src={`/imagenes/trabajo/${servicio.imagen.archivo}.webp`}
                                alt={servicio.imagen.alt}
                                width={2048}
                                height={1280}
                                loading="lazy"
                                decoding="async"
                                className="w-full rounded-lg border border-borde lg:w-[340px]"
                              />
                            </picture>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {instagram}

      <div className="contenedor">
        {pedidos}

        <div>
          <div className="mt-16 flex flex-wrap items-baseline justify-between gap-6">
            <p className="t-subtitulo max-w-[18ch]">{textos.cierre}</p>
            <EnlaceWhatsApp
              mensaje={
                servicioActivo
                  ? mensajes.servicios(
                      // Sólo la primera letra: `toLowerCase()` sobre el nombre
                      // entero convertía "Automatizaciones e IA" en "… e ia".
                      servicioActivo.nombre.charAt(0).toLowerCase() +
                        servicioActivo.nombre.slice(1),
                    )
                  : mensajes.general
              }
              origen="servicios"
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
