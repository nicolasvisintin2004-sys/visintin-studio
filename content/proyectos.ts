export type Captura = {
  /**
   * Nombre del archivo sin extensión. De cada uno existe un `.avif` y un
   * `.webp`, generados por una de las dos herramientas de `herramientas/`.
   */
  archivo: string;
  /**
   * En qué carpeta de `public/imagenes/` está.
   *
   *  · `trabajo` — capturas del sitio construido, de `procesar-capturas.mjs`.
   *  · `evidencia` — capturas del "antes", de `procesar-evidencia.mjs`.
   */
  carpeta?: "trabajo" | "evidencia";
  alt: string;
  /** Dimensiones explícitas y obligatorias: sin esto el CLS deja de ser cero. */
  ancho: number;
  alto: number;
  /**
   * Cómo se enmarca. `movil` va con las esquinas de un teléfono; `retrato` es
   * una imagen alta que no es una pantalla de teléfono —una ficha de Google,
   * por ejemplo— y se limita en ancho para que no domine la página.
   */
  formato: "escritorio" | "movil" | "retrato";
  /** Pie de la captura. Dice qué se está mirando, no adjetivos. */
  pie: string;
  /**
   * `false` apaga la deriva en esta captura.
   *
   * La deriva agranda la imagen un 9 % para tener margen al moverla, así que
   * recorta un 4,5 % de cada costado. En casi todas las capturas ahí no hay
   * nada; en la del carrito de BULK, que es un panel pegado al borde derecho,
   * se comía los precios y los botones de cantidad.
   */
  deriva?: false;
};

export type Proyecto = {
  slug: string;
  nombre: string;
  /** Cómo se llama el negocio en una conversación, para el mensaje de WhatsApp. */
  cliente: string;
  rubro: string;
  ubicacion: string;
  anio: number;
  /**
   * `cliente` es trabajo pago y real; `demo` es un sitio completo construido
   * por mi cuenta para mostrar el alcance.
   *
   * Hoy no hay ninguna demo en el portfolio y es una decisión, no una falta:
   * había dos y se sacaron. Un portfolio con un cliente real dice menos que
   * uno con tres entradas, pero dice la verdad, y la alternativa obligaba a
   * aclarar en cada ficha que dos de los tres negocios no existían.
   */
  tipo: "cliente" | "demo";
  estado: "en-desarrollo" | "publicado";
  /**
   * La línea de resultado, arriba de todo en la ficha.
   *
   * Es lo primero que se lee de un proyecto, antes que la descripción: qué
   * pasaba antes y qué pasa ahora. Una descripción cuenta lo que se construyó,
   * que es lo que le importa a quien lo construyó; el "antes y después" cuenta
   * qué cambió para el negocio, que es lo que le importa al que está mirando.
   *
   * Es cualitativo a propósito. Hay una tentación fuerte de poner acá un
   * porcentaje, y un porcentaje inventado es lo único que puede hundir la
   * venta el día que el cliente pregunte de dónde salió.
   */
  resultado: { antes: string; despues: string };
  /**
   * El número, cuando exista.
   *
   * Hoy no existe: ninguno de los dos casos lleva todavía el tiempo suficiente
   * en línea. Se completa con datos de Search Console y de la medición del
   * sitio cuando lleven unos meses publicados. Hasta entonces el campo va ausente y la ficha
   * muestra sólo la línea cualitativa.
   */
  medicion?: string;
  /** Una línea. Es lo que se lee en el panel del portfolio. */
  resumen: string;
  /**
   * El problema que tenía el negocio antes. Sin esto, un sitio es decoración.
   * Un párrafo por entrada: doscientas palabras seguidas no las lee nadie.
   */
  problema: readonly string[];
  /**
   * Las pruebas de ese problema, si existen.
   *
   * Vale mucho más que el párrafo de arriba: una captura de lo que devolvía
   * Google antes del sitio no se puede discutir, y un párrafo sí. Cuando no
   * haya, el campo va ausente y la sección no se renderiza.
   */
  evidencia?: readonly Captura[];
  /** Qué construí. Cada punto es algo que se puede señalar en la pantalla. */
  construido: readonly string[];
  stack: readonly string[];
  urlEnVivo: string;
  /** Cómo se ve la dirección escrita, sin protocolo. */
  urlVisible: string;
  capturas: readonly Captura[];
};

const ESCRITORIO = { ancho: 2048, alto: 1280, formato: "escritorio" as const };
const MOVIL = { ancho: 780, alto: 1688, formato: "movil" as const };

/**
 * Los proyectos publicados.
 *
 * Acá va SÓLO lo que se muestra. Los casos en curso viven en
 * `content/proyectos-en-curso.ts`, que no lo importa nada que se renderice, y
 * el motivo está explicado ahí: este archivo lo importa un componente de
 * cliente, así que todo lo que esté escrito acá viaja al navegador, se
 * renderice o no. Un caso que todavía no se puede contar no puede estar en
 * este archivo ni marcado con una bandera.
 *
 * Publicar un caso es mover su entrada de aquel archivo a este.
 */
export const proyectos: readonly Proyecto[] = [
  {
    slug: "taller-italia",
    nombre: "Taller Italia — Ti Motorhome",
    cliente: "Taller Italia",
    rubro: "Fábrica de motorhomes a medida",
    ubicacion: "Guaymallén, Mendoza",
    anio: 2026,
    tipo: "cliente",
    estado: "en-desarrollo",
    resultado: {
      antes:
        "Veinte mil seguidores en Instagram y veintinueve reseñas en Google, pero el botón «Sitio web» de su propia ficha llevaba a un dominio que no existía.",
      despues:
        "El proceso de fabricación publicado como recorrido, con una página por unidad entregada y el alquiler separado de la fabricación.",
    },
    resumen:
      "Fábrica fundada en 1972 que construye una unidad por vez, con línea de alquiler y clientes del exterior.",
    problema: [
      "Taller Italia fabrica desde 1972 y no produce en serie: cada motorhome se proyecta sobre el vehículo que aporta el cliente. Esa característica, que es su principal diferencial, resultaba difícil de comunicar en Instagram, donde no hay un catálogo que mostrar sino un proceso.",
      "El problema no era de visibilidad. La cuenta tiene veinte mil seguidores y la ficha de Google acumula veintinueve reseñas con 4,6 de promedio: la fábrica ya era conocida y ya estaba recomendada. El problema era que no había a dónde mandar a quien preguntaba.",
      "Al buscar el nombre en Google aparecían el perfil de Instagram, la página de Facebook y un portal de terceros. Y el botón «Sitio web» de la propia ficha de Google apuntaba a un dominio que no estaba registrado: cada persona que lo tocaba terminaba en una página de error.",
      "A eso se sumaba una línea de alquiler que compartía la cuenta con la de fabricación, y consultas del exterior que se respondían sin una versión del contenido en inglés.",
    ],
    evidencia: [
      {
        archivo: "google-busqueda",
        carpeta: "evidencia",
        alt: "Resultados de Google para «taller italia motorhome»: el perfil de Instagram con 20.000 seguidores, la página de Facebook y un portal de terceros. Ningún sitio propio.",
        pie: "Buscar el nombre de la fábrica devolvía Instagram, Facebook y un portal de terceros. El primer resultado propio del negocio no existía.",
        ancho: 1340,
        alto: 700,
        formato: "escritorio",
      },
      {
        archivo: "google-ficha",
        carpeta: "evidencia",
        alt: "Ficha de Google Maps de Taller Italia Motorhome: 4,6 de calificación con 29 reseñas, dirección en Mendoza y el sitio web talleritalia.com.ar",
        pie: "La ficha tiene 4,6 con 29 reseñas: el negocio ya estaba recomendado. El sitio que figura, talleritalia.com.ar, es el de la captura siguiente.",
        ancho: 808,
        alto: 916,
        formato: "retrato",
      },
      {
        archivo: "sitio-caido",
        carpeta: "evidencia",
        alt: "Página de error del navegador: «No se puede acceder a este sitio web», con el código DNS_PROBE_FINISHED_NXDOMAIN para www.talleritalia.com.ar",
        pie: "El dominio no estaba registrado. Cada persona que tocaba «Sitio web» en Google terminaba acá. Es el mismo en el que hoy está el sitio.",
        ancho: 1245,
        alto: 660,
        formato: "escritorio",
      },
    ],
    construido: [
      "El proceso de fabricación presentado como recorrido, en reemplazo de un catálogo que no existe",
      "Una página por cada unidad entregada, para que el cliente pueda ver trabajos terminados",
      "Una sección de alquiler independiente de la de fabricación, con su propio canal de contacto",
      "Un formulario de cotización con las preguntas que el taller necesita para presupuestar",
      "Preguntas frecuentes, mapa y datos de la planta de Avellaneda 2261",
      "Versión completa en español e inglés, para las consultas del exterior",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Netlify"],
    /*
     * El dominio de la tercera captura del "antes": el que figuraba en la
     * ficha de Google y no existía. Por eso los textos del caso que hablan de
     * él van en pasado.
     */
    urlEnVivo: "https://talleritalia.com.ar",
    urlVisible: "talleritalia.com.ar",
    capturas: [
      {
        archivo: "taller-italia-inicio",
        alt: "Portada del sitio de Taller Italia: un motorhome en la planta, con el título «Fabricamos un solo motorhome por vez. El tuyo.»",
        pie: "La portada comunica el diferencial desde el inicio: no hay catálogo porque no hay producción en serie.",
        ...ESCRITORIO,
      },
      {
        archivo: "taller-italia-interior",
        alt: "Página de un trabajo entregado: Sprinter con techo elevable y garage trasero, con su descripción y los botones de cotización",
        pie: "Cada trabajo entregado tiene su propia página, con la unidad descripta en texto.",
        ...ESCRITORIO,
      },
      {
        archivo: "taller-italia-rental",
        alt: "Sección de alquiler del sitio de Taller Italia, con el motorhome de rental y su descripción",
        pie: "El alquiler se presenta por separado de la fabricación, porque responde a otro tipo de cliente.",
        ...ESCRITORIO,
      },
      {
        archivo: "taller-italia-movil",
        alt: "El sitio de Taller Italia visto en un teléfono",
        pie: "Diseñado primero para el celular, que es el dispositivo desde el que ingresa la mayoría.",
        ...MOVIL,
      },
    ],
  },
  /**
   * El segundo caso, y el primero sin "antes".
   *
   * BULK es un comercio que abre junto con el sitio, así que no hay un
   * problema anterior que capturar y no lleva `evidencia`. El `resultado.antes`
   * dice con qué contaba el negocio antes de abrir —una cuenta de Instagram
   * recién creada— y no describe una dificultad que nunca existió: inventarla
   * sería la misma mentira que un porcentaje falso.
   *
   * La cuenta de Instagram también la diseñé yo. Cuando tenga capturas que
   * valgan como prueba, pueden entrar en `evidencia`; hasta entonces el campo
   * va ausente y la sección no se renderiza.
   */
  {
    slug: "bulk",
    nombre: "BULK — Suplementos y nutrición deportiva",
    cliente: "BULK",
    rubro: "Tienda de suplementos deportivos",
    ubicacion: "Carmen de Patagones, Buenos Aires",
    anio: 2026,
    tipo: "cliente",
    estado: "en-desarrollo",
    resultado: {
      antes:
        "Un local a punto de abrir, 186 productos de 41 marcas y una cuenta de Instagram recién creada, sin un lugar donde mostrar el catálogo con precios.",
      despues:
        "El catálogo entero con precio por sabor y presentación, y un carrito que arma el pedido listo para mandar por Instagram o por email.",
    },
    resumen:
      "Tienda de suplementos que abre en Carmen de Patagones, con el catálogo en línea desde el primer día.",
    problema: [
      "BULK es una tienda de suplementos y nutrición deportiva que abre en Carmen de Patagones. Llega con ciento ochenta y seis productos de cuarenta y una marcas, y la mayoría viene en más de un sabor o presentación, cada una con su precio.",
      "Antes de abrir contaba con una cuenta de Instagram recién creada, que también diseñé. Instagram sirve para mostrar el local y las novedades, pero no para recorrer un catálogo de ese tamaño: no se puede filtrar por marca, ver qué sabores hay de cada producto ni saber cuánto suma un pedido.",
      "La venta se cierra por mensaje y se paga por transferencia o en efectivo en el local. El sitio tenía que ordenar esa forma de vender y no reemplazarla: que el cliente llegue al chat con el pedido ya armado, y no con una lista de preguntas.",
    ],
    construido: [
      "Un catálogo de 186 productos con filtros por categoría y por marca, y un buscador por nombre, marca o sabor",
      "Una página por producto, con cada sabor y presentación y el precio en efectivo ya calculado",
      "Un carrito que se conserva aunque se cierre la página y avisa cuánto falta para el envío gratis",
      "El pedido sale armado: se copia y se abre el chat de Instagram del local, o se envía por email",
      "Un código de descuento para la primera compra que llega por email, con consentimiento para recibir novedades",
      "Guías sobre creatina, proteínas y pre-entrenos, y las preguntas frecuentes de compra y envío",
    ],
    stack: ["Astro", "JavaScript", "Netlify"],
    urlEnVivo: "https://bulksuplementos.com.ar",
    urlVisible: "bulksuplementos.com.ar",
    capturas: [
      {
        archivo: "bulk-inicio",
        alt: "Portada del sitio de BULK: el título «Armá tu pedido en la web» junto a un ticket de pedido con tres productos, subtotal y envío gratis",
        pie: "La portada explica cómo se compra antes que qué se vende: el ticket es el pedido tal como le llega al local.",
        ...ESCRITORIO,
      },
      {
        archivo: "bulk-producto",
        alt: "Página de producto de BULK: una Whey Protein con la presentación y el sabor a elegir, el precio de lista y el precio en efectivo con 10 % de descuento",
        pie: "Cada presentación y cada sabor se eligen en la misma página, con el precio en efectivo ya calculado.",
        ...ESCRITORIO,
      },
      {
        archivo: "bulk-carrito",
        alt: "El carrito de BULK abierto con tres productos, la barra de lo que falta para el envío gratis y el ahorro pagando en efectivo",
        pie: "El carrito muestra cuánto falta para el envío gratis y cuánto se ahorra pagando en efectivo en el local.",
        ...ESCRITORIO,
        // El panel va pegado al borde derecho: con la deriva se cortan los precios.
        deriva: false,
      },
      {
        archivo: "bulk-movil",
        alt: "El sitio de BULK visto en un teléfono",
        pie: "Pensado primero para el celular, que es donde también está el chat al que se manda el pedido.",
        ...MOVIL,
      },
    ],
  },
];

export function proyectoPorSlug(slug: string): Proyecto | undefined {
  return proyectos.find((p) => p.slug === slug);
}

export const slugsDeProyecto = proyectos.map((p) => p.slug);
