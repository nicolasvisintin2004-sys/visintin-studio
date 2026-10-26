import Link from "next/link";
import { botonPrimario } from "@/components/boton";
import {
  PRECIO_DIAGNOSTICO,
  PRECIO_SIN_DEFINIR,
  diagnostico as textos,
} from "@/content/diagnostico";

/**
 * El diagnóstico en el inicio.
 *
 * Va inmediatamente después del hero, antes que la cinta y que el índice, y
 * es el único bloque del inicio con el borde de bronce. Es deliberado: es el
 * producto de entrada y tiene que ser lo primero que se ve después del
 * título.
 *
 * No repite la página entera —eso duplicaría el texto en dos direcciones y
 * Google no sabría cuál mostrar— sino que dice qué es, qué incluye en cuatro
 * renglones y lleva ahí.
 */
export function BloqueDiagnostico() {
  const definido = PRECIO_DIAGNOSTICO.trim() !== "";

  return (
    <section className="contenedor pb-[var(--espacio-seccion)]">
      <div>
        <div className="relative rounded-xl border border-acento bg-superficie p-8 lg:p-14">

          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <p className="t-etiqueta mb-6 text-acento">{textos.etiqueta}</p>
              <h2 className="t-titulo max-w-[18ch] text-[clamp(2rem,4.5vw,3.5rem)]">
                Antes de construir nada, entender cómo trabaja la empresa.
              </h2>
              <p className="t-cuerpo mt-8">{textos.bajada}</p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link href="/diagnostico" className={botonPrimario}>
                  {textos.accion}
                </Link>
                <p className="t-dato text-suave">
                  {definido ? PRECIO_DIAGNOSTICO : PRECIO_SIN_DEFINIR}
                </p>
              </div>
            </div>

            {/* Los cuatro entregables, sólo con el nombre. El detalle está en
                la página; acá alcanza con que se vea que son cuatro cosas
                concretas y no una reunión. */}
            <ul className="flex flex-col border-t border-borde">
              {textos.entregables.lista.map((item) => (
                <li
                  key={item.numero}
                  className="border-b border-borde py-5 text-[1.0625rem] leading-snug"
                >
                  {item.nombre}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-12 text-[0.9375rem] text-acento">{textos.entregables.cierre}</p>
        </div>
      </div>
    </section>
  );
}
