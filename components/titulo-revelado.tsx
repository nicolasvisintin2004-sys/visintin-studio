"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

/**
 * Un título que entra línea por línea, cada una desde abajo de su propio
 * recorte.
 *
 * Es la misma técnica del título del hero, aplicada al resto del sitio. En el
 * hero las líneas están cortadas a mano en el archivo de contenido, porque
 * ahí el corte es una decisión de diseño; en una sección cualquiera el texto
 * se acomoda solo según el ancho, así que las líneas hay que medirlas.
 *
 * ── Por qué medir y no partir por palabras ──
 *
 * Lo fácil sería envolver cada palabra y escalonarlas. Se ve en todos lados y
 * se nota: las palabras de un mismo renglón entran en momentos distintos y el
 * texto se lee como una ola de letras sueltas. Partiendo por líneas reales, lo
 * que sube es el renglón entero, que es como se mueve el texto cuando lo mueve
 * alguien que sabe.
 *
 * ── Cómo se mide ──
 *
 * Con un `Range` de un carácter que se va corriendo por el nodo de texto: cada
 * vez que la coordenada vertical del rectángulo salta, ahí terminó un renglón.
 * Es la única manera confiable, porque depende de la tipografía, del ancho
 * disponible y del algoritmo de corte del navegador, que no se pueden
 * predecir desde el código.
 *
 * ── Qué pasa si algo falla ──
 *
 * El servidor renderiza el título como texto plano, visible y completo. Todo
 * esto ocurre después, en el cliente, y sólo sobre títulos que todavía no se
 * ven. Si el JavaScript no corre, si la medición falla o si el visitante pidió
 * movimiento reducido, queda el texto tal cual: legible desde el primer frame.
 * El contenido de la etiqueta nunca cambia, así que para Google y para un
 * lector de pantalla el título es el mismo antes y después.
 */

type Props = {
  children: string;
  /** El nivel del encabezado. No hay valor por defecto a propósito. */
  as: ElementType;
  className?: string;
  /** Milisegundos antes de la primera línea. */
  retardo?: number;
};

/** Cuánto se escalona una línea respecto de la anterior. */
const ESCALON = 90;

/**
 * Parte el texto en los renglones que el navegador dibujó de verdad.
 * Devuelve una sola entrada si no se pudo medir, que es el caso seguro.
 */
function medirLineas(elemento: HTMLElement): string[] {
  const nodo = elemento.firstChild;
  if (!nodo || nodo.nodeType !== Node.TEXT_NODE) return [];

  const texto = nodo.textContent ?? "";
  if (texto.length === 0) return [];

  const rango = document.createRange();
  const lineas: string[] = [];
  let inicio = 0;
  let topeAnterior: number | null = null;

  for (let i = 0; i < texto.length; i++) {
    rango.setStart(nodo, i);
    rango.setEnd(nodo, i + 1);
    const caja = rango.getBoundingClientRect();

    // Los espacios donde el renglón corta miden cero y no dicen nada.
    if (caja.height === 0) continue;

    if (topeAnterior === null) {
      topeAnterior = caja.top;
    } else if (caja.top - topeAnterior > 1) {
      lineas.push(texto.slice(inicio, i));
      inicio = i;
      topeAnterior = caja.top;
    }
  }

  lineas.push(texto.slice(inicio));
  return lineas.map((linea) => linea.trim()).filter(Boolean);
}

export function TituloRevelado({ children, as: Etiqueta, className, retardo = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [lineas, setLineas] = useState<string[] | null>(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Lo que ya está en pantalla no se esconde para después mostrarlo: eso
    // produce un parpadeo y no una entrada. Misma regla que `Revelado`.
    if (elemento.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    const medidas = medirLineas(elemento);
    // Con una sola línea la técnica no aporta nada y `Revelado` ya la mueve.
    if (medidas.length < 2) return;

    setLineas(medidas);
  }, [children]);

  /**
   * Las líneas ya medidas se observan y entran cuando la sección aparece.
   * El observer se crea acá y no en el efecto de arriba porque los nodos de
   * cada línea recién existen después de que React los renderiza.
   */
  useEffect(() => {
    const elemento = ref.current;
    if (!elemento || !lineas) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          (entrada.target as HTMLElement).dataset.entrar = "si";
          observador.unobserve(entrada.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, [lineas]);

  if (!lineas) {
    return (
      <Etiqueta ref={ref} className={className}>
        {children}
      </Etiqueta>
    );
  }

  return (
    <Etiqueta ref={ref} className={`titulo-revelado ${className ?? ""}`}>
      {lineas.map((linea, i) => (
        <span key={`${linea}-${i}`} className="linea-mascara">
          <span style={{ "--retardo": `${retardo + i * ESCALON}ms` } as React.CSSProperties}>
            {/* El espacio de fin de renglón se recortó al medir; se repone
                acá para que copiar y pegar el título devuelva el texto
                original y no dos palabras pegadas. */}
            {i < lineas.length - 1 ? `${linea} ` : linea}
          </span>
        </span>
      ))}
    </Etiqueta>
  );
}
