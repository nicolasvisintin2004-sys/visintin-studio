import Link from "next/link";
import { Revelado } from "@/components/revelado";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { testimonios } from "@/content/testimonios";

type Props = {
  /** El título de la sección. Cambia según dónde se use. */
  titulo?: string;
  /** Sólo los de un proyecto. Sin esto, se muestran todos. */
  proyecto?: string;
};

/**
 * Los testimonios.
 *
 * Está escrito y no se usa en ninguna página, porque `content/testimonios.ts`
 * está vacío y esto devuelve `null`. Es deliberado: el prompt pedía dejarlo
 * listo para cuando existan, y una sección de testimonios vacía —o peor, con
 * frases inventadas— es lo único que puede hundir la venta el día que un
 * cliente llame al otro para preguntarle si dijo eso.
 *
 * Cuando haya al menos uno, se agrega `<Testimonios />` donde corresponda:
 * en el inicio después del bloque del diagnóstico, en `/diagnostico` entre el
 * encaje y el precio, o filtrado por `proyecto` dentro de la página de un
 * caso.
 *
 * Usa el mismo lenguaje que el resto: grilla de líneas finas sobre fondo del
 * color del borde, bronce sólo en la comilla y en el nombre.
 */
export function Testimonios({ titulo = "Lo que dijeron", proyecto }: Props) {
  const lista = proyecto ? testimonios.filter((t) => t.proyecto === proyecto) : testimonios;

  // Sin testimonios no hay sección: ni título, ni hueco, ni "próximamente".
  if (lista.length === 0) return null;

  return (
    <section className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion nivel="h2" titulo={titulo} claseTitulo="max-w-[16ch]" />

        <ul
          className={`mt-14 grid gap-px border border-borde bg-borde lg:mt-20 ${
            lista.length > 1 ? "lg:grid-cols-2" : ""
          }`}
        >
          {lista.map((testimonio, i) => (
            <Revelado as="li" key={testimonio.nombre} retardo={i * 80} className="bg-fondo">
              <figure className="flex h-full flex-col p-8 lg:p-10">
                <span aria-hidden="true" className="font-display text-4xl leading-none text-acento">
                  &ldquo;
                </span>

                <blockquote className="mt-5 text-[1.0625rem] leading-relaxed">
                  {testimonio.texto}
                </blockquote>

                {/* `mt-auto` deja la firma al pie: con textos de distinto
                    largo, las dos columnas terminan parejas. */}
                <figcaption className="t-dato mt-auto flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-8 text-suave">
                  <span className="text-acento">{testimonio.nombre}</span>
                  <span>{testimonio.cargo}</span>
                  {testimonio.proyecto && !proyecto && (
                    <Link
                      href={`/proyectos/${testimonio.proyecto}`}
                      className="underline decoration-borde underline-offset-4 transition-colors hover:text-texto hover:decoration-acento"
                    >
                      Ver el caso
                    </Link>
                  )}
                </figcaption>
              </figure>
            </Revelado>
          ))}
        </ul>
      </div>
    </section>
  );
}
