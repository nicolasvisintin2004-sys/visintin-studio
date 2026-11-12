import Link from "next/link";
import type { ReactNode } from "react";
import { botonTexto } from "@/components/boton";
import { Captura } from "@/components/captura";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { instagram } from "@/content/instagram";
import { proyectoPorSlug } from "@/content/proyectos";
import { puertas, type Puerta } from "@/content/servicios";
import { puertasTextos as textos } from "@/content/textos";
import { capturasTurnos } from "@/content/turnos";
import { ACCION_DEMO, MENSAJE_DEMO, TURNOS_PUBLICADA } from "@/content/turnos-acciones";

/**
 * Las tres puertas del inicio: sitios web, contenido para redes y el sistema
 * de turnos.
 *
 * Reemplaza al bloque del diagnóstico, a la cinta de rubros y al índice de
 * páginas, que eran tres maneras de no decir qué se vende. Cada puerta tiene
 * cuatro cosas y nada más: para quién es, qué es en dos renglones, una prueba
 * real y un solo enlace.
 *
 * Las pruebas son trabajo de verdad: el sitio de un cliente, publicaciones de
 * una cuenta que se maneja y el sistema de turnos con datos ficticios, que el
 * pie dice. Las tres van en el mismo marco apaisado para que las filas tengan
 * el mismo alto aunque las imágenes no tengan la misma forma.
 *
 * Es todo de servidor: no hay nada que abrir ni cerrar.
 */
export function Puertas() {
  // El precio más bajo de los servicios de redes, calculado y no escrito:
  // si cambia un precio en `content/instagram.ts`, esto se actualiza solo.
  const desde = Math.min(...instagram.servicios.map((s) => s.precio.valor));

  return (
    <section className="seccion" aria-labelledby="puertas-titulo">
      <div className="contenedor">
        <h2 id="puertas-titulo" className="t-titulo max-w-[14ch]">
          {textos.titulo}
        </h2>

        <ul className="mt-12 border-t border-borde lg:mt-20">
          <Fila puerta={puertas.sitiosWeb} prueba={<PruebaSitios />} pie={textos.pieSitios} />

          <Fila
            puerta={puertas.redes}
            dato={`${textos.desde} USD ${desde}`}
            prueba={<PruebaRedes />}
            pie={textos.pieRedes}
          />

          {/*
            Mientras la página de turnos no se anuncia, la puerta sigue
            estando —es una de las tres cosas que se venden— pero en vez de
            llevar a una página `noindex` abre WhatsApp para pedir la demo.
          */}
          <Fila
            puerta={puertas.turnos}
            prueba={<PruebaTurnos />}
            pie={textos.pieTurnos}
            enlace={
              TURNOS_PUBLICADA ? undefined : (
                <EnlaceWhatsApp
                  mensaje={MENSAJE_DEMO}
                  origen="inicio_puerta_turnos"
                  className={`${botonTexto} mt-8`}
                >
                  {ACCION_DEMO}
                </EnlaceWhatsApp>
              )
            }
          />
        </ul>
      </div>
    </section>
  );
}

type PropsFila = {
  puerta: Puerta;
  /** Un dato corto abajo del texto, como el precio. */
  dato?: string;
  prueba: ReactNode;
  pie: string;
  /** Reemplaza al enlace a la página de la puerta. */
  enlace?: ReactNode;
};

function Fila({ puerta, dato, prueba, pie, enlace }: PropsFila) {
  return (
    <li className="grid gap-8 border-b border-borde py-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16 lg:py-16">
      <div>
        <h3 className="font-display text-[clamp(1.875rem,4vw,3.25rem)] font-semibold leading-none tracking-[-0.03em]">
          {puerta.nombre}
        </h3>
        <p className="t-etiqueta mt-4">{puerta.para}</p>
        <p className="mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed">{puerta.texto}</p>
        {dato && <p className="t-dato mt-4 text-acento">{dato}</p>}

        {enlace ?? (
          <Link href={puerta.href} className={`${botonTexto} mt-8`}>
            {puerta.accion}
          </Link>
        )}
      </div>

      <figure>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-borde bg-superficie">
          {prueba}
        </div>
        <figcaption className="t-dato mt-3 text-suave">{pie}</figcaption>
      </figure>
    </li>
  );
}

/** La portada de un sitio publicado. Sale del caso, así el texto alternativo es uno solo. */
function PruebaSitios() {
  const portada = proyectoPorSlug("taller-italia")?.capturas.find(
    (c) => c.formato === "escritorio",
  );
  if (!portada) return null;

  return (
    <Captura
      captura={portada}
      sizes="(min-width: 1024px) 40rem, 100vw"
      className="h-full w-full object-cover object-top"
    />
  );
}

/** Tres portadas de carruseles de BULK, una al lado de la otra. */
function PruebaRedes() {
  const elegidas = ["bulk-cuanta-proteina", "bulk-alimentos-proteina", "bulk-primer-suplemento"];
  const piezas = instagram.piezas.filter((p) => elegidas.includes(p.archivo));

  return (
    <ul className="grid h-full grid-cols-3 content-center gap-2 px-4 sm:gap-3 sm:px-8">
      {piezas.map((pieza) => (
        <li key={pieza.archivo}>
          <Captura
            captura={{
              archivo: pieza.archivo,
              carpeta: "contenido",
              alt: pieza.alt,
              ancho: 540,
              alto: 675,
              formato: "retrato",
              pie: "",
            }}
            sizes="(min-width: 1024px) 12rem, 30vw"
            className="h-auto w-full rounded-md border border-borde"
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * La pantalla de reserva, asomando desde abajo del marco como un teléfono que
 * no termina de entrar. Lo que importa está arriba: el primer turno libre y el
 * botón para reservarlo.
 */
function PruebaTurnos() {
  return (
    <div className="absolute left-1/2 top-6 w-[44%] -translate-x-1/2 overflow-hidden rounded-t-[1.25rem] border border-borde sm:top-8">
      <Captura
        captura={capturasTurnos.reserva}
        sizes="(min-width: 1024px) 18rem, 44vw"
        className="h-auto w-full"
      />
    </div>
  );
}
