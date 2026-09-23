"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { botonTexto, Flecha } from "@/components/boton";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { Revelado } from "@/components/revelado";
import { useConsultaMedios } from "@/hooks/use-consulta-medios";
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
};

/**
 * La lista de servicios.
 *
 * Cada fila se abre al pasar el mouse y muestra una prueba visual que sigue
 * al cursor. El gesto está justificado acá y no sería justificable en otra
 * sección: cada servicio necesita mostrar algo, y la alternativa son cuatro
 * tarjetas con un ícono adentro.
 *
 * Tres comportamientos distintos según con qué se navegue:
 *  · mouse — la fila se abre al pasar por encima y el panel persigue al cursor;
 *  · touch — se abre al tocar y el panel queda fijo abajo de la fila;
 *  · teclado — cada fila es un botón con `aria-expanded`; se abre con Enter.
 *
 * El detalle está siempre en el HTML: se muestra con `grid-template-rows` y
 * no montando nodos, así el texto existe para Google y para un lector de
 * pantalla aunque nadie pase el mouse.
 */
export function Servicios({ pedidos }: Props) {
  const [activo, setActivo] = useState<number | null>(null);

  /**
   * El gesto de la imagen que sigue al cursor sólo existe con puntero fino y
   * sin movimiento reducido. En cualquier otro caso la lista se abre al tocar
   * y la prueba visual va fija adentro de la fila.
   */
  const punteroFino = useConsultaMedios("(pointer: fine)");
  const movimientoReducido = useConsultaMedios("(prefers-reduced-motion: reduce)");
  const conMouse = punteroFino && !movimientoReducido;

  /**
   * El panel arranca en la esquina superior izquierda hasta que el puntero se
   * mueve por primera vez y le da una posición. Si se mostrara antes, una
   * fila abierta sin que el mouse se haya movido —un toque en una pantalla
   * táctil con mouse conectado— lo dibujaría flotando en el borde.
   */
  const [punteroUbicado, setPunteroUbicado] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  // El panel persigue al cursor con el mismo retardo que el círculo del
  // cursor, para que los dos se lean como una sola cosa.
  useEffect(() => {
    if (!conMouse) return;
    const nodo = panel.current;
    if (!nodo) return;

    let destinoX = 0;
    let destinoY = 0;
    let x = 0;
    let y = 0;
    let cuadro = 0;
    let arrancado = false;

    const dibujar = () => {
      x += (destinoX - x) * 0.12;
      y += (destinoY - y) * 0.12;
      nodo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const falta = Math.abs(destinoX - x) + Math.abs(destinoY - y);
      cuadro = falta < 0.2 ? 0 : requestAnimationFrame(dibujar);
    };

    const alMover = (evento: PointerEvent) => {
      // Desplazado hacia arriba y a la izquierda del puntero para que el
      // panel no tape la fila que se está leyendo.
      destinoX = evento.clientX - 190;
      destinoY = evento.clientY - 320;
      if (!arrancado) {
        arrancado = true;
        x = destinoX;
        y = destinoY;
        nodo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        setPunteroUbicado(true);
      }
      if (!cuadro) cuadro = requestAnimationFrame(dibujar);
    };

    window.addEventListener("pointermove", alMover, { passive: true });
    return () => {
      window.removeEventListener("pointermove", alMover);
      if (cuadro) cancelAnimationFrame(cuadro);
    };
  }, [conMouse]);

  const servicioActivo = activo !== null ? listaDeServicios[activo] : null;

  return (
    <section id="servicios" className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h1"
          etiqueta={textos.etiqueta}
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

          El índice que se usa para el panel que sigue al cursor es el global
          dentro de `listaDeServicios` y no el de cada grupo: si fuera el del
          grupo, abrir el tercer servicio mostraría la imagen del primero.
        */}
        {lineas.map((linea, indiceDeLinea) => (
          <div
            key={linea.slug}
            className={indiceDeLinea === 0 ? "mt-16 lg:mt-24" : "mt-20 lg:mt-28"}
          >
            <Revelado>
              <div className="flex flex-col gap-3 border-t border-acento pt-8 lg:flex-row lg:items-baseline lg:gap-12">
                <h2 className="t-subtitulo shrink-0 lg:w-[20rem]">{linea.nombre}</h2>
                <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-suave">
                  {linea.promesa}
                </p>
              </div>
            </Revelado>

            <ul className="mt-10 border-t border-borde">
              {listaDeServicios.map((servicio, i) => {
                if (servicio.linea !== linea.slug) return null;
                const abierto = activo === i;

                return (
                  <Revelado as="li" key={servicio.slug} retardo={i * 70}>
                    <div
                      className="border-b border-borde"
                      onMouseEnter={() => conMouse && setActivo(i)}
                      onMouseLeave={() => conMouse && setActivo(null)}
                    >
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
                        className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-9 text-left sm:gap-8 sm:py-12"
                      >
                        <span
                          className={`t-dato transition-colors duration-500 ${
                            abierto ? "text-acento" : "text-suave"
                          }`}
                        >
                          {servicio.numero}
                        </span>

                        <span className="min-w-0">
                          <span className="t-subtitulo block">{servicio.nombre}</span>
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
                          <div className="grid gap-8 pb-12 sm:pl-[calc(2rem+3ch)] lg:grid-cols-[1fr_auto] lg:gap-16">
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

                            {/* En touch la prueba visual va acá, fija. En
                                mouse la muestra el panel que persigue al
                                cursor. */}
                            {!conMouse && (
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
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Revelado>
                );
              })}
            </ul>
          </div>
        ))}

        {pedidos}

        <Revelado>
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
              <Flecha />
            </EnlaceWhatsApp>
          </div>
        </Revelado>
      </div>

      {/* El panel que sigue al cursor. Vive fuera del flujo y no recibe
          eventos: si los recibiera, taparía la fila que lo disparó. */}
      {conMouse && (
        <div
          ref={panel}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[8000] w-[380px]"
        >
          <div
            className={`overflow-hidden rounded-lg border border-borde bg-superficie transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
              servicioActivo && punteroUbicado ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            {/* Las cuatro imágenes se apilan y se cambia la opacidad: así el
                cambio entre servicios no parpadea con una carga nueva. */}
            <div className="relative aspect-[16/10]">
              {listaDeServicios.map((servicio, i) => (
                <picture key={servicio.slug}>
                  <source
                    srcSet={`/imagenes/trabajo/${servicio.imagen.archivo}.avif`}
                    type="image/avif"
                  />
                  <img
                    src={`/imagenes/trabajo/${servicio.imagen.archivo}.webp`}
                    alt=""
                    width={2048}
                    height={1280}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-400 ${
                      activo === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </picture>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
