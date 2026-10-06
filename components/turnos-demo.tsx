"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useConsultaMedios } from "@/hooks/use-consulta-medios";
import { DEMOS, turnos } from "@/content/turnos";
import { registrarAperturaDemo } from "@/lib/analitica";

const textos = turnos.probar;

type Cual = keyof typeof DEMOS;

type Props = {
  /** La etiqueta, el título y la bajada de la sección, ya renderizados. */
  encabezado: ReactNode;
  /** Los dos códigos QR, ya dibujados en el servidor. */
  qr: Record<Cual, ReactNode>;
  /** Las dos capturas, para cuando el demo no carga y para el celular. */
  captura: Record<Cual, ReactNode>;
};

/** Cuánto se espera al demo antes de mostrar la captura en su lugar. */
const ESPERA_MS = 4000;

/**
 * El demo, para probarlo ahí mismo.
 *
 * Sólo se monta cuando las dos direcciones están cargadas en
 * `content/turnos.ts`; mientras tanto la sección no existe, y eso lo resuelve
 * `components/turnos.tsx` del lado del servidor.
 *
 * En escritorio el demo va embebido en un marco con forma de celular, a la
 * derecha del texto, con un código QR para abrirlo en el teléfono de verdad,
 * que es donde lo va a usar el paciente. En el celular no se embebe nada: un
 * celular adentro de un celular no se puede usar, así que va un botón que lo
 * abre aparte.
 *
 * El marco se carga recién cuando la sección está por entrar en pantalla. Es
 * una aplicación entera: cargarla con la página le sumaría su peso a alguien
 * que quizá nunca baje hasta acá. Y si a los cuatro segundos no dio señales,
 * se muestra la captura en vez de un recuadro en blanco.
 *
 * Esa espera cubre el demo lento, no el demo roto. Cuando un marco embebido
 * falla —la dirección no existe, o la aplicación no permite que la muestren
 * adentro de otro sitio— el navegador dispara el mismo aviso de "cargó" que
 * cuando anda, y desde afuera no hay forma de distinguirlo: es una protección
 * del navegador, no un descuido. Por eso el enlace para abrirlo en otra
 * pestaña está siempre a la vista, también en escritorio.
 */
export function DemoTurnos({ encabezado, qr, captura }: Props) {
  const [cual, setCual] = useState<Cual>("consultorio");
  const [cerca, setCerca] = useState(false);
  const [cargado, setCargado] = useState(false);
  const [vencido, setVencido] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);
  const escritorio = useConsultaMedios("(min-width: 1024px)");

  // El marco se pide cuando la sección está a una pantalla de distancia.
  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada?.isIntersecting) return;
        setCerca(true);
        observador.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  // Cada vez que se pide un demo arranca la cuenta de los cuatro segundos.
  const embebido = escritorio && cerca;
  useEffect(() => {
    if (!embebido || cargado) return;
    const reloj = window.setTimeout(() => setVencido(true), ESPERA_MS);
    return () => window.clearTimeout(reloj);
  }, [embebido, cargado, cual]);

  const elegir = (opcion: Cual) => {
    if (opcion === cual) return;
    setCual(opcion);
    setCargado(false);
    setVencido(false);
  };

  const opciones = Object.keys(DEMOS) as Cual[];
  const fallo = vencido && !cargado;

  return (
    <div
      ref={contenedor}
      className="grid items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-20"
    >
      <div>
        {encabezado}

        <div
          role="tablist"
          aria-label={textos.titulo}
          className="mt-10 flex flex-wrap gap-3 lg:mt-12"
        >
          {opciones.map((opcion) => {
            const activa = opcion === cual;
            return (
              <button
                key={opcion}
                type="button"
                role="tab"
                id={`pestana-${opcion}`}
                aria-selected={activa}
                aria-controls="panel-demo"
                onClick={() => elegir(opcion)}
                className={`rounded-full border px-6 py-3 text-[0.9375rem] font-medium transition-colors duration-300 ${
                  activa
                    ? "border-acento bg-acento text-fondo"
                    : "border-borde text-texto hover:border-acento hover:text-acento"
                }`}
              >
                {textos.opciones[opcion].nombre}
              </button>
            );
          })}
        </div>

        <p className="t-cuerpo mt-7 text-[1.0625rem]">{textos.opciones[cual].apoyo}</p>

        {/* El QR sólo tiene sentido si se está mirando desde otra pantalla. */}
        <div className="mt-10 hidden items-center gap-6 lg:flex">
          <div className="rounded-lg bg-texto p-3">{qr[cual]}</div>
          <div>
            <p className="t-etiqueta max-w-[14ch]">{textos.qr}</p>
            <a
              href={DEMOS[cual]}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => registrarAperturaDemo(cual, "enlace")}
              className="mt-4 inline-block text-[0.9375rem] text-texto underline decoration-borde underline-offset-4 transition-colors duration-300 hover:text-acento hover:decoration-acento"
            >
              {textos.abrirAparte}
            </a>
          </div>
        </div>

        <a
          href={DEMOS[cual]}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => registrarAperturaDemo(cual, "boton")}
          // En bronce y no en blanco: la barra fija de abajo, que dice "Pedir
          // una demo", es blanca, y dos pastillas iguales una sobre la otra
          // se leen como el mismo botón repetido.
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-acento px-7 py-4 text-[0.9375rem] font-medium leading-none text-fondo sm:w-auto lg:hidden"
        >
          {textos.abrir}
        </a>

        <p className="mt-8 max-w-[52ch] text-[0.8125rem] leading-relaxed text-suave">
          {textos.nota}
        </p>
      </div>

      <div
        role="tabpanel"
        id="panel-demo"
        aria-labelledby={`pestana-${cual}`}
        className="mx-auto w-full max-w-[280px] lg:mx-0 lg:w-auto lg:max-w-none"
      >
        {embebido && !fallo ? (
          <div className="overflow-hidden rounded-[2.5rem] border border-borde bg-superficie p-2.5">
            <iframe
              key={cual}
              src={DEMOS[cual]}
              title={textos.opciones[cual].nombre}
              width={390}
              height={780}
              loading="lazy"
              onLoad={() => {
                setCargado(true);
                registrarAperturaDemo(cual, "embebido");
              }}
              // En una pantalla baja el marco se achica para entrar entero:
              // un celular cortado por abajo no se puede usar.
              style={{ height: "min(780px, calc(100svh - 8rem))" }}
              className="block rounded-[2rem] bg-white"
            />
          </div>
        ) : (
          <div className="lg:w-[280px]">{captura[cual]}</div>
        )}
      </div>
    </div>
  );
}
