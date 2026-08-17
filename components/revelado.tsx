"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Escalonado entre hermanos. El sistema usa múltiplos de 60ms. */
  retraso?: number;
  className?: string;
  /** Dentro de un <ol>/<ul> tiene que renderizar <li>, no <div>. */
  como?: "div" | "li";
};

/**
 * Revelado al scroll: opacidad 0→1 y translateY 16px→0.
 *
 * El estado inicial en CSS es VISIBLE. Este componente recién esconde
 * el elemento después de comprobar tres cosas: que hay
 * IntersectionObserver, que el usuario no pidió menos movimiento, y
 * que el elemento no está ya en pantalla al montar.
 *
 * Esa última condición no es un detalle: si envolvés contenido del
 * primer viewport en una animación que arranca en opacity 0, el LCP
 * pasa a depender de la hidratación y se dispara el render delay.
 * Acá lo de arriba del pliegue simplemente no anima.
 */
export function Revelado({
  children,
  retraso = 0,
  className,
  como = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const Elemento = como as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const yaVisible = el.getBoundingClientRect().top < window.innerHeight * 0.9;
    if (yaVisible) return;

    el.style.setProperty("--reveal-delay", `${retraso}ms`);
    el.dataset.reveal = "oculto";

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          el.dataset.reveal = "visible";
          observador.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observador.observe(el);
    return () => observador.disconnect();
  }, [retraso]);

  return (
    <Elemento ref={ref} className={className}>
      {children}
    </Elemento>
  );
}
