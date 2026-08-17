"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BotonWhatsApp } from "@/components/boton-whatsapp";
import { SelectorIdioma } from "@/components/selector-idioma";
import { seccion, textos } from "@/content/textos";
import { ruta as construirRuta, type Idioma } from "@/lib/i18n";

export function Navegacion({ idioma }: { idioma: Idioma }) {
  const [compacta, setCompacta] = useState(false);
  const [abierta, setAbierta] = useState(false);
  const progreso = useRef<HTMLDivElement>(null);
  const rutaActual = usePathname();
  const txt = seccion(textos.nav, idioma);

  const enlaces = [
    { camino: "/trabajo", texto: txt.trabajo },
    { camino: "/planes", texto: txt.planes },
    { camino: "/estudio", texto: txt.estudio },
    { camino: "/notas", texto: txt.notas },
  ];

  useEffect(() => {
    let cuadro = 0;

    const alScrollear = () => {
      if (cuadro) return;
      cuadro = requestAnimationFrame(() => {
        cuadro = 0;
        const y = window.scrollY;
        setCompacta(y > 24);

        const alcance =
          document.documentElement.scrollHeight - window.innerHeight;
        const avance = alcance > 0 ? Math.min(Math.max(y / alcance, 0), 1) : 0;
        if (progreso.current) {
          progreso.current.style.transform = `scaleX(${avance})`;
        }
      });
    };

    alScrollear();
    window.addEventListener("scroll", alScrollear, { passive: true });
    window.addEventListener("resize", alScrollear, { passive: true });
    return () => {
      window.removeEventListener("scroll", alScrollear);
      window.removeEventListener("resize", alScrollear);
      if (cuadro) cancelAnimationFrame(cuadro);
    };
  }, []);

  useEffect(() => {
    if (!abierta) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierta(false);
    };
    document.addEventListener("keydown", alTeclear);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = "";
    };
  }, [abierta]);

  return (
    <header className="border-line bg-surface/85 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div
        ref={progreso}
        aria-hidden="true"
        className="progreso bg-fg absolute inset-x-0 -bottom-px z-20 h-[2px]"
      />

      <div
        data-compacta={compacta}
        className="contenedor relative z-10 flex h-9 items-center justify-between transition-[height] duration-200 data-[compacta=true]:h-7"
      >
        <Link
          href={construirRuta(idioma) as LinkProps["href"]}
          className="font-display condensada text-fg text-small font-bold tracking-[0.18em] uppercase"
        >
          Visintin
        </Link>

        <nav aria-label={txt.principal} className="hidden items-center gap-3 md:flex">
          {enlaces.map((item) => {
            const destino = construirRuta(idioma, item.camino);
            return (
              <Link
                key={item.camino}
                href={destino as LinkProps["href"]}
                aria-current={rutaActual.startsWith(destino) ? "page" : undefined}
                className="subrayado text-small text-fg-muted hover:text-fg aria-[current=page]:text-fg transition-colors"
              >
                {item.texto}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <SelectorIdioma idioma={idioma} />

          <BotonWhatsApp origen="navegacion" className="hidden md:inline-flex">
            {txt.whatsapp}
          </BotonWhatsApp>

          <button
            type="button"
            onClick={() => setAbierta((v) => !v)}
            aria-expanded={abierta}
            aria-controls="menu-movil"
            className="etiqueta text-fg md:hidden"
          >
            {abierta ? txt.cerrar : txt.menu}
          </button>
        </div>
      </div>

      {abierta ? (
        <div
          id="menu-movil"
          className="bg-surface fixed inset-0 flex flex-col justify-between px-3 pt-12 pb-6 md:hidden"
        >
          <nav aria-label={txt.principal} className="flex flex-col">
            {enlaces.map((item) => (
              <Link
                key={item.camino}
                href={construirRuta(idioma, item.camino) as LinkProps["href"]}
                onClick={() => setAbierta(false)}
                className="border-line font-display text-display-m condensada text-fg border-b py-2"
              >
                {item.texto}
              </Link>
            ))}
          </nav>
          <BotonWhatsApp origen="menu-movil" className="w-full py-2">
            {txt.escribime}
          </BotonWhatsApp>
        </div>
      ) : null}
    </header>
  );
}
