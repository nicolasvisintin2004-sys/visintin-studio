import type { Captura } from "@/content/proyectos";

type Props = {
  captura: Captura;
  className?: string;
  /** La única imagen que puede ser el LCP va con `prioritaria`. */
  prioritaria?: boolean;
  /** Ancho de presentación, para que el navegador elija bien. */
  sizes?: string;
};

/**
 * Una captura del portfolio.
 *
 * Va con `<picture>` a mano y no con `next/image` porque el sitio se exporta
 * estático: sin servidor no hay optimización al vuelo, así que `next/image`
 * serviría el archivo tal cual y agregaría JavaScript sin dar nada a cambio.
 * Los dos formatos ya están generados en disco por
 * `herramientas/procesar-capturas.mjs`, y el navegador elige el mejor.
 *
 * `width` y `height` van siempre: son lo que mantiene el CLS en cero.
 */
export function Captura({ captura, className, prioritaria = false, sizes }: Props) {
  const ruta = `/imagenes/${captura.carpeta ?? "trabajo"}/${captura.archivo}`;

  return (
    <picture>
      <source srcSet={`${ruta}.avif`} type="image/avif" />
      <source srcSet={`${ruta}.webp`} type="image/webp" />
      <img
        src={`${ruta}.webp`}
        alt={captura.alt}
        width={captura.ancho}
        height={captura.alto}
        sizes={sizes}
        loading={prioritaria ? "eager" : "lazy"}
        decoding={prioritaria ? "sync" : "async"}
        fetchPriority={prioritaria ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}

/**
 * La captura dentro de un marco sobrio: un borde de 1px y nada más.
 * Sin sombras ni biseles de mockup, que es justo lo que delata una plantilla.
 */
export function CapturaEnmarcada({ captura, prioritaria, sizes }: Props) {
  const esMovil = captura.formato === "movil";
  // `retrato` es una imagen alta que no es la pantalla de un teléfono: la
  // ficha de Google de un negocio, por ejemplo. Se limita en ancho para que
  // no ocupe media página, pero sin las esquinas redondeadas del marco de
  // teléfono, que la harían parecer lo que no es.
  const esRetrato = captura.formato === "retrato";

  const ancho = esMovil
    ? "mx-auto w-full max-w-[280px]"
    : esRetrato
      ? "mx-auto w-full max-w-[460px]"
      : "w-full";

  return (
    <figure className={ancho}>
      {/* `deriva` mueve la imagen un poco mas lento que la pagina dentro
          del marco. El marco ya recorta, asi que el recorrido no descubre
          el borde. Es CSS dirigido por scroll; ver `globals.css`. Una
          captura con algo importante pegado a un costado la apaga. */}
      <div
        className={`overflow-hidden border border-borde bg-superficie ${
          captura.deriva === false ? "" : "deriva"
        } ${esMovil ? "rounded-[2rem] p-2" : "rounded-lg"}`}
      >
        <Captura
          captura={captura}
          prioritaria={prioritaria}
          sizes={sizes}
          className={`w-full ${esMovil ? "rounded-[1.5rem]" : ""}`}
        />
      </div>
      <figcaption className="t-dato mt-4 text-suave">{captura.pie}</figcaption>
    </figure>
  );
}
