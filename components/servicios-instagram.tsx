import { botonTexto } from "@/components/boton";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { instagram as textos, type ServicioInstagram } from "@/content/instagram";
import { mensajes } from "@/content/sitio";

/**
 * Los servicios de Instagram, en /servicios.
 *
 * Van debajo de las dos líneas y con otro tratamiento: acá el precio está a la
 * vista, grande, porque es lo que distingue a estos tres del resto. El por qué
 * de que tengan precio y el resto no está en `content/instagram.ts`.
 *
 * Una fila por servicio: a la izquierda el nombre y el precio, que es lo que
 * se compara de un vistazo; a la derecha qué es y, cuando hay algo real para
 * mostrar, cómo se ve. Todo es de servidor: no hay nada que abrir ni cerrar.
 */
export function ServiciosInstagram() {
  return (
    <section className="contenedor mt-24 lg:mt-32">
      <div className="border-t border-acento pt-12 lg:pt-16">
        <EncabezadoSeccion
          nivel="h2"
          titulo={textos.titulo}
          bajada={textos.bajada}
          claseTitulo="max-w-[16ch]"
        />
      </div>

      <ul className="mt-14 border-t border-borde lg:mt-20">
        {textos.servicios.map((servicio) => (
          <Fila key={servicio.slug} servicio={servicio} />
        ))}
      </ul>
    </section>
  );
}

function Fila({ servicio }: { servicio: ServicioInstagram }) {
  return (
    <li className="grid gap-8 border-b border-borde py-12 lg:grid-cols-[20rem_1fr] lg:gap-16 lg:py-16">
      <div>
        <h3 className="t-subtitulo">{servicio.nombre}</h3>
        <p className="mt-6 flex items-baseline gap-3">
          <span className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.03em] text-acento tabular-nums">
            {servicio.precio.monto}
          </span>
          <span className="text-[0.9375rem] text-suave">{servicio.precio.periodo}</span>
        </p>
      </div>

      <div>
        <p className="max-w-[44ch] text-[1.1875rem] leading-snug">{servicio.promesa}</p>
        {servicio.detalle.map((parrafo) => (
          <p key={parrafo} className="t-cuerpo mt-5">
            {parrafo}
          </p>
        ))}

        {servicio.lista && (
          <div className="mt-8 max-w-[52ch]">
            <h4 className="t-etiqueta text-texto">{servicio.lista.titulo}</h4>
            <ul className="mt-4 flex flex-col gap-3">
              {servicio.lista.items.map((item) => (
                <li key={item} className="grid grid-cols-[auto_1fr] gap-4 text-[0.9375rem] leading-relaxed text-suave">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-5 bg-acento" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {servicio.ilustracion === "palabra-clave" && <PalabraClave />}
        {servicio.ilustracion === "contenido" && <Piezas />}

        <EnlaceWhatsApp
          mensaje={mensajes.servicios(
            // Sólo la inicial: "Instagram" sigue con mayúscula.
            servicio.nombre.charAt(0).toLowerCase() + servicio.nombre.slice(1),
          )}
          origen={`servicios_${servicio.slug}`}
          className={`${botonTexto} mt-10`}
        >
          {textos.consultar}
        </EnlaceWhatsApp>
      </div>
    </li>
  );
}

/**
 * El comentario y el mensaje privado, escritos en HTML.
 *
 * Es un ejemplo y no una captura, y el pie lo dice. Los colores son los del
 * modo oscuro de Instagram y no los del sitio, a propósito: tiene que
 * reconocerse de un vistazo como lo que pasa en la app.
 */
function PalabraClave() {
  const ej = textos.palabraClave;

  return (
    <figure className="mt-10 max-w-[340px]">
      <div className="overflow-hidden rounded-2xl border border-borde bg-black p-4 text-[#f5f5f5]">
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-[#363636]" />
          <p className="text-[0.8125rem] leading-snug">
            <span className="font-semibold">{ej.usuario}</span>{" "}
            <span>{ej.comentario}</span>
          </p>
        </div>

        <div className="mt-5 border-t border-white/10 pt-5">
          <p className="text-[0.75rem] text-white/75">
            <span className="sr-only">Mensaje privado de </span>
            {ej.cuenta}
          </p>
          <div className="mt-2 rounded-2xl rounded-tl-md bg-[#262626] p-3 text-[0.8125rem] leading-snug">
            {ej.mensaje}
            <span className="mt-3 block rounded-lg bg-[#363636] py-2 text-center font-semibold">
              {ej.enlace}
            </span>
          </div>
        </div>
      </div>
      <figcaption className="t-dato mt-4 text-suave">{ej.pie}</figcaption>
    </figure>
  );
}

/** Publicaciones reales de un cliente, como muestra del servicio de contenido. */
function Piezas() {
  return (
    <figure className="mt-10">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {textos.piezas.map((pieza) => (
          <li key={pieza.archivo}>
            <picture>
              <source srcSet={`/imagenes/contenido/${pieza.archivo}.avif`} type="image/avif" />
              <img
                src={`/imagenes/contenido/${pieza.archivo}.webp`}
                alt={pieza.alt}
                width={540}
                height={675}
                loading="lazy"
                decoding="async"
                className="h-auto w-full rounded-md border border-borde"
              />
            </picture>
          </li>
        ))}
      </ul>
      <figcaption className="t-dato mt-4 text-suave">{textos.piezasPie}</figcaption>
    </figure>
  );
}
