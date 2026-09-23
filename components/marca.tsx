import { sitio } from "@/content/sitio";

/**
 * La marca: el monograma y el lockup completo.
 *
 * Los dos son SVG en línea y no `<img src="...svg">`, por tres motivos:
 * no hay una petición de red más para algo que pesa medio kilobyte, no hay
 * un frame en blanco donde debería estar el logotipo mientras carga, y los
 * trazos pueden tomar el color del contexto en lugar de tenerlo quemado.
 *
 * ── Qué se cambió respecto de los archivos originales ──
 *
 *  · Se sacó el rectángulo de fondo `#0B0C0E`. En los archivos está para que
 *    se vean bien sueltos; sobre el sitio taparía el resplandor que pasa por
 *    detrás y, en la barra, el desenfoque del fondo.
 *  · Los trazos pasaron de `#F4F4F1` a `currentColor`. Es el mismo color
 *    —`--color-texto`— pero heredado, así que la marca funciona igual en el
 *    pie, en un hover o en un fondo claro si alguna vez hace falta.
 *  · La línea divisoria pasó de `#2A2F35` fijo a derivarse del color del
 *    texto, por el mismo motivo que los trazos.
 *  · Se recortó el `viewBox` a los límites reales del dibujo. Los archivos
 *    traen aire alrededor, y ese aire empujaba el logotipo hacia adentro y lo
 *    desalineaba con el margen del contenedor.
 */

/** El texto alternativo. Es el nombre, no "logo de...". */
const NOMBRE = sitio.nombre;

/**
 * El monograma solo. Para la barra en pantallas angostas, donde el lockup
 * entero no entra sin comerse el botón del menú.
 *
 * `viewBox` recortado al dibujo: la V ocupa x 34–96 y la S, con sus 20 de
 * trazo, llega hasta 172; en vertical van de 56 a 144.
 */
export function Monograma({ className }: { className?: string }) {
  return (
    <svg
      viewBox="26 48 154 104"
      className={className}
      role="img"
      aria-label={NOMBRE}
      fill="none"
    >
      <path d="M35 56 L57 56 L66 112 L75 56 L97 56 L71 144 L61 144 Z" fill="currentColor" />
      <path
        d="M163 76 A22 22 0 1 0 139 100 A22 22 0 1 1 115 124"
        stroke="currentColor"
        strokeWidth="20"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * El lockup completo: monograma, divisoria y la palabra escrita.
 *
 * La palabra está dibujada con trazos y no compuesta con una tipografía, así
 * que no depende de que cargue ninguna fuente y se ve igual desde el primer
 * frame. Es la razón por la que conviene en la barra, que es lo primero que
 * aparece.
 */
export function Lockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="44 44 1310 122"
      className={className}
      role="img"
      aria-label={NOMBRE}
      fill="none"
    >
      {/* Monograma, a la escala y posición del archivo original. */}
      <g transform="translate(28,30) scale(0.75)">
        <g transform="translate(1,0)">
          <path d="M34 56 L56 56 L65 112 L74 56 L96 56 L70 144 L60 144 Z" fill="currentColor" />
          <path
            d="M162 76 A22 22 0 1 0 138 100 A22 22 0 1 1 114 124"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/*
        La divisoria.
        No usa `--color-borde` aunque sea lo que separa todo lo demas: a 2px
        de ancho sobre el fondo, ese token queda por debajo del umbral de lo
        que se ve y la barra parecia tener un hueco en vez de una linea. Sale
        del color del texto con poca opacidad, asi que sigue atada al
        contexto y se ve en cualquier fondo donde se apoye la marca.
      */}
      <line
        x1="222"
        y1="59"
        x2="222"
        y2="151"
        stroke="color-mix(in srgb, currentColor 22%, transparent)"
        strokeWidth="2"
      />

      {/* VISINTIN STUDIO. Cada letra es un trazo con su propio desplazamiento,
          tal como vienen en el archivo. */}
      <g
        transform="translate(271,55)"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 0 L27 100 L54 0" />
        <path d="M0 0 L0 100" transform="translate(88,0)" />
        <path d="M54 22 A25 25 0 1 0 27 50 A25 25 0 1 1 0 78" transform="translate(122,0)" />
        <path d="M0 0 L0 100" transform="translate(210,0)" />
        <path d="M0 100 L0 0 L52 100 L52 0" transform="translate(244,0)" />
        <path d="M0 0 L52 0" transform="translate(330,0)" />
        <path d="M26 0 L26 100" transform="translate(330,0)" />
        <path d="M0 0 L0 100" transform="translate(416,0)" />
        <path d="M0 100 L0 0 L52 100 L52 0" transform="translate(450,0)" />
        <path d="M54 22 A25 25 0 1 0 27 50 A25 25 0 1 1 0 78" transform="translate(616,0)" />
        <path d="M0 0 L52 0" transform="translate(704,0)" />
        <path d="M26 0 L26 100" transform="translate(704,0)" />
        <path d="M0 0 L0 73 A27 27 0 0 0 54 73 L54 0" transform="translate(790,0)" />
        <path d="M0 0 L0 100" transform="translate(878,0)" />
        <path d="M0 0 L16 0 A50 50 0 0 1 16 100 L0 100" transform="translate(878,0)" />
        <path d="M0 0 L0 100" transform="translate(978,0)" />
        <path d="M28 0 A28 50 0 1 1 27.99 0 Z" transform="translate(1012,0)" />
      </g>
    </svg>
  );
}

/**
 * La marca como va en la barra y en el pie: el lockup entero donde entra, el
 * monograma solo donde no.
 *
 * El corte es en `sm` (640px). Abajo de eso la barra tiene que alojar además
 * el botón del diagnóstico y el del menú, y un lockup de casi 280px de ancho
 * los empuja fuera de la pantalla.
 *
 * El `aria-label` lo lleva cada SVG, así que el nombre se anuncia una sola
 * vez: el que está oculto con `hidden` no está en el árbol de accesibilidad.
 */
export function Marca({ className = "" }: { className?: string }) {
  return (
    <>
      <Monograma className={`h-6 w-auto sm:hidden ${className}`} />
      <Lockup className={`hidden h-6 w-auto sm:block ${className}`} />
    </>
  );
}
