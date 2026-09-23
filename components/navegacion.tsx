"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Marca } from "@/components/marca";
import { diagnostico } from "@/content/diagnostico";
import { navegacion } from "@/content/textos";

/** Las rutas que se muestran con la barra reducida. */
const RUTAS_DE_ATERRIZAJE = ["/diagnostico"];

/**
 * La barra de navegación. Vive en el layout, así que es la misma en todas las
 * páginas y no se vuelve a montar al pasar de una a otra.
 *
 * El enlace activo se decide por la ruta y no por el scroll: cada sección es
 * una página propia. `/proyectos/taller-italia` también marca "Proyectos",
 * porque es una página que cuelga de esa sección.
 *
 * En /diagnostico la barra se reduce a logotipo y un botón. Es una página de
 * aterrizaje: a ella llegan los enlaces de prospección y de anuncios, y el
 * menú completo no hace más que ofrecer seis formas de irse antes de leerla.
 * El logotipo sigue siendo un enlace al inicio, porque una barra sin salida
 * es una trampa y no un diseño.
 */
export function Navegacion() {
  const ruta = usePathname();
  const [desplazado, setDesplazado] = useState(false);
  const [abierto, setAbierto] = useState(false);

  /**
   * Si la ruta cambia con el menú de mobile abierto —por ejemplo, con el
   * botón "atrás" del teléfono— el menú se cierra. Se resuelve durante el
   * render comparando con la ruta anterior, que es lo que recomienda React en
   * lugar de un efecto que llame a `setState`.
   */
  const [rutaAnterior, setRutaAnterior] = useState(ruta);
  if (ruta !== rutaAnterior) {
    setRutaAnterior(ruta);
    setAbierto(false);
  }

  const esActivo = (href: string) => ruta === href || ruta.startsWith(`${href}/`);
  const esAterrizaje = RUTAS_DE_ATERRIZAJE.some(
    (r) => ruta === r || ruta.startsWith(`${r}/`),
  );

  // La barra se vuelve opaca recién cuando el contenido empieza a pasarle por
  // debajo. Arriba de todo es invisible: el título de la página manda solo.
  useEffect(() => {
    const alDesplazar = () => setDesplazado(window.scrollY > 80);
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  // Con el menú abierto no se scrollea el fondo.
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  // Escape cierra el menú: es lo que espera cualquiera que navegue por teclado.
  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", alPulsar);
    return () => window.removeEventListener("keydown", alPulsar);
  }, [abierto]);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-full focus:bg-texto focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-fondo"
      >
        {navegacion.saltar}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[9000] transition-colors duration-500 ${
          desplazado
            ? "border-b border-borde bg-fondo/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="contenedor flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href="/"
            className="shrink-0 text-texto transition-colors duration-300 hover:text-acento"
          >
            <Marca />
          </Link>

          <nav
            aria-label="Principal"
            className={`hidden items-center gap-8 ${esAterrizaje ? "" : "lg:flex"}`}
          >
            {navegacion.enlaces.map(({ href, texto }) => {
              const activo = esActivo(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={activo ? "page" : undefined}
                  className={`relative py-2 text-[0.9375rem] transition-colors duration-300 hover:text-texto ${
                    activo ? "text-texto" : "text-suave"
                  }`}
                >
                  {texto}
                  {/* El subrayado de bronce marca en qué página estás: el
                      acento señala un estado, no adorna. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-acento transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] ${
                      activo ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/*
              El botón de la barra lleva al diagnóstico y ya no a WhatsApp.
              El que llega frío no sabe qué pedir por WhatsApp; lo que le
              sirve es algo concreto y acotado. WhatsApp no se pierde: está en
              el botón flotante de todas las páginas, en el hero, en el pie y
              en contacto.

              En la página del diagnóstico el botón apunta al formulario de
              esa misma página, que es el único destino que tiene.
            */}
            {esAterrizaje ? (
              <a
                href="#solicitar"
                className="rounded-full border border-acento px-5 py-2.5 text-[0.875rem] font-medium text-acento transition-colors duration-300 hover:bg-acento hover:text-fondo"
              >
                {diagnostico.accion}
              </a>
            ) : (
              <Link
                href={navegacion.destacado.href}
                aria-current={esActivo(navegacion.destacado.href) ? "page" : undefined}
                className="hidden rounded-full border border-acento px-5 py-2.5 text-[0.875rem] font-medium text-acento transition-colors duration-300 hover:bg-acento hover:text-fondo sm:inline-flex"
              >
                {navegacion.destacado.texto}
              </Link>
            )}

            <button
              type="button"
              onClick={() => setAbierto((v) => !v)}
              aria-expanded={abierto}
              aria-controls="menu-movil"
              className={`h-10 w-10 items-center justify-center rounded-full border border-borde text-texto lg:hidden ${
                esAterrizaje ? "hidden" : "flex"
              }`}
            >
              <span className="sr-only">{abierto ? navegacion.cerrar : navegacion.menu}</span>
              <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
                <path
                  d={abierto ? "M2 2 L14 10 M14 2 L2 10" : "M0 1.5 H16 M0 10.5 H16"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* El progreso de lectura, sobre el borde inferior de la barra.
            Es animacion dirigida por scroll de CSS puro: no hay escucha ni
            calculo en JavaScript. Ver `globals.css`. */}
        <span className="progreso-lectura" aria-hidden="true" />
      </header>

      {/* Menú de mobile. Se monta siempre para que el `aria-controls` de
          arriba apunte a algo real, y se oculta del árbol con `hidden`. */}
      <div
        id="menu-movil"
        hidden={!abierto}
        className="fixed inset-0 z-[8999] bg-fondo pt-[4.5rem] lg:hidden"
      >
        <nav aria-label="Principal" className="contenedor flex flex-col gap-2 py-10">
          {/*
            El diagnostico encabeza el menu de movil.
            En escritorio es el boton de la derecha de la barra, pero ese
            boton esta oculto abajo de 640px, y como la ruta no esta en
            `navegacion.enlaces` quedaba fuera de los dos menus: desde un
            telefono no habia forma de llegar al producto de entrada mas que
            por el pie. En movil entra la mayoria del trafico.
          */}
          <Link
            href={navegacion.destacado.href}
            aria-current={esActivo(navegacion.destacado.href) ? "page" : undefined}
            onClick={() => setAbierto(false)}
            className="t-subtitulo border-b border-borde py-5 text-acento"
          >
            {navegacion.destacado.texto}
          </Link>

          {navegacion.enlaces.map(({ href, texto }) => {
            const activo = esActivo(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={activo ? "page" : undefined}
                onClick={() => setAbierto(false)}
                className={`t-subtitulo border-b border-borde py-5 ${
                  activo ? "text-acento" : "text-texto"
                }`}
              >
                {texto}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
