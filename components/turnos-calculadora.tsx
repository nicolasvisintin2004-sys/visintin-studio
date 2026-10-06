"use client";

import { useId, useRef, useState } from "react";
import { botonSecundario } from "@/components/boton";
import { turnos } from "@/content/turnos";
import { registrarUsoCalculadora } from "@/lib/analitica";

const textos = turnos.calculadora;

const pesos = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1 });

/** Deja sólo los dígitos de lo que se tipeó y le pone un techo razonable. */
function aNumero(texto: string, maximo: number): number {
  const digitos = texto.replace(/\D/g, "");
  if (digitos === "") return 0;
  return Math.min(Number(digitos), maximo);
}

/**
 * La calculadora de turnos perdidos.
 *
 * Es la sección que más convence de la página, y por un motivo concreto: no
 * le dice al visitante cuánto pierde un consultorio, hace que escriba su
 * propio número. Por eso el resultado es grande y los campos arrancan con un
 * ejemplo en vez de vacíos: con los campos vacíos el resultado es "$ 0" y no
 * hay nada que mirar.
 *
 * Todo se calcula acá, en el navegador. No se guarda ni se envía nada: lo
 * único que sale es el aviso de que alguien la usó, sin los números.
 *
 * Los campos de cantidad y de valor son de texto con teclado numérico y no
 * `type="number"`: así se pueden mostrar con el punto de miles —"40.000" se
 * lee, "40000" hay que contarlo— y en el celular no aparecen las flechitas.
 *
 * El primer render sale del servidor con el resultado del ejemplo ya
 * calculado, así que la página no salta cuando carga el JavaScript.
 */
export function CalculadoraTurnos() {
  const [cantidad, setCantidad] = useState<number>(textos.inicial.turnos);
  const [faltan, setFaltan] = useState<number>(textos.inicial.faltan);
  const [valor, setValor] = useState<number>(textos.inicial.valor);

  const idCantidad = useId();
  const idFaltan = useId();
  const idValor = useId();

  // Un solo aviso por visita: interesa saber si se usó, no cuántas teclas.
  const avisado = useRef(false);
  const avisar = () => {
    if (avisado.current) return;
    avisado.current = true;
    registrarUsoCalculadora();
  };

  const perdido = Math.round(cantidad * (faltan / 10) * valor);

  const campo =
    "w-full rounded-lg border border-borde bg-fondo px-4 py-3.5 font-mono text-[1.0625rem] tabular-nums text-texto transition-colors duration-300 focus:border-acento focus:outline-none";

  return (
    <div className="rounded-lg border border-borde bg-superficie p-6 sm:p-8 lg:p-10">
      <div className="grid gap-7 lg:grid-cols-3 lg:gap-8">
        <div>
          <label htmlFor={idCantidad} className="t-etiqueta mb-3 block">
            {textos.campos.turnos}
          </label>
          <input
            id={idCantidad}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={cantidad === 0 ? "" : pesos.format(cantidad)}
            onChange={(e) => {
              setCantidad(aNumero(e.target.value, 99_999));
              avisar();
            }}
            className={campo}
          />
        </div>

        <div>
          <label htmlFor={idFaltan} className="t-etiqueta mb-3 block">
            {textos.campos.faltan}
          </label>
          <div className="flex items-center gap-4 rounded-lg border border-borde bg-fondo px-4 py-3">
            <input
              id={idFaltan}
              type="range"
              min={textos.faltanMinimo}
              max={textos.faltanMaximo}
              step={textos.faltanPaso}
              value={faltan}
              onChange={(e) => {
                setFaltan(Number(e.target.value));
                avisar();
              }}
              aria-valuetext={`${decimal.format(faltan)} de cada 10`}
              className="h-7 min-w-0 flex-1 accent-[var(--color-acento)]"
            />
            <output
              htmlFor={idFaltan}
              className="w-9 shrink-0 text-right font-mono text-[1.0625rem] tabular-nums"
            >
              {decimal.format(faltan)}
            </output>
          </div>
        </div>

        <div>
          <label htmlFor={idValor} className="t-etiqueta mb-3 block">
            {textos.campos.valor}
          </label>
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-suave"
            >
              $
            </span>
            <input
              id={idValor}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={valor === 0 ? "" : pesos.format(valor)}
              onChange={(e) => {
                setValor(aNumero(e.target.value, 99_999_999));
                avisar();
              }}
              className={`${campo} pl-9`}
            />
          </div>
        </div>
      </div>

      {/* `aria-live` para que un lector de pantalla diga el resultado nuevo
          cuando cambia un campo, sin tener que ir a buscarlo. */}
      <div className="mt-10 border-t border-borde pt-10" aria-live="polite">
        <p className="font-display text-[clamp(1.75rem,5.2vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          {textos.resultadoAntes}{" "}
          <span className="whitespace-nowrap text-acento tabular-nums">
            $ {pesos.format(perdido)}
          </span>{" "}
          {textos.resultadoDespues}
        </p>
      </div>

      <p className="t-cuerpo mt-6 text-[1.0625rem]">{textos.debajo}</p>
      {/* `text-suave` entero y no al 80 %: sobre el fondo de la tarjeta, el
          atenuado quedaba en 4,06:1 y no llega al mínimo de AA. */}
      <p className="mt-4 max-w-[62ch] text-[0.8125rem] leading-relaxed text-suave">
        {textos.aclaracion}
      </p>

      <a href="#como-funciona" className={`${botonSecundario} mt-9`}>
        {textos.accion}
      </a>
    </div>
  );
}
