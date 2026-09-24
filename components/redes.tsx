import { Revelado } from "@/components/revelado";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { redesActivas } from "@/content/social";
import { inicio, pie } from "@/content/textos";

/**
 * Las redes.
 *
 * Sin logotipos: el sitio resuelve todo con tipografía y una línea de bronce,
 * y tres marcas de color ajenas serían lo único con color de la página. En
 * vez del ícono va lo que se publica en cada una, que además es lo único que
 * da una razón para abrirla. "Seguime en Instagram" no es una razón.
 *
 * Si no hay ninguna dirección cargada no se renderiza nada, ni el título ni
 * la sección. Un bloque de redes vacío es peor que no tenerlo.
 */

/**
 * Las clases de grilla según cuántas redes estén cargadas.
 *
 * Escritas enteras y no armadas con plantilla porque Tailwind lee las clases
 * del código fuente: una cadena como `sm:grid-cols-${n}` no la encuentra al
 * compilar y la regla nunca llega al CSS.
 */
const columnas: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

/** La franja del inicio. */
export function RedesEnInicio() {
  if (redesActivas.length === 0) return null;

  return (
    <section className="contenedor pb-[var(--espacio-seccion)]">
      <EncabezadoSeccion
        nivel="h2"
        etiqueta={inicio.redesEtiqueta}
        titulo={inicio.redesTitulo}
        claseTitulo="max-w-[16ch]"
      />

      {/*
        Las columnas salen de cuántas redes haya cargadas y no de un tres
        fijo. Con `sm:grid-cols-3` y una sola red, la celda ocupaba un tercio
        del ancho y quedaban dos tercios de recuadro vacío al lado, que se
        lee como algo que no cargó.
      */}
      <ul
        className={`mt-14 grid gap-px border border-borde bg-borde lg:mt-20 ${
          columnas[redesActivas.length] ?? "sm:grid-cols-3"
        }`}
      >
        {redesActivas.map((red, i) => (
          <Revelado as="li" key={red.slug} retardo={i * 80} className="bg-fondo">
            <a
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col p-8 transition-colors duration-300 hover:bg-superficie lg:p-10"
            >
              <span className="flex items-start justify-between gap-4">
                <span className="font-display text-[1.375rem] font-medium leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-acento">
                  {red.nombre}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-suave transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acento"
                >
                  ↗
                </span>
              </span>
              <span className="mt-3 block text-[0.9375rem] leading-relaxed text-suave">
                {red.rol}
              </span>
            </a>
          </Revelado>
        ))}
      </ul>
    </section>
  );
}

/** La columna del pie. */
export function RedesEnPie() {
  if (redesActivas.length === 0) return null;

  return (
    <div>
      <p className="t-etiqueta mb-5">{pie.redes}</p>
      <ul className="flex flex-col gap-3 text-[0.9375rem]">
        {redesActivas.map((red) => (
          <li key={red.slug}>
            <a
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-suave transition-colors duration-300 hover:text-texto"
            >
              {red.nombre}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
