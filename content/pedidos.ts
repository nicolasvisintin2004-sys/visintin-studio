export type Pedido = {
  /** Identifica el pedido en el evento de analítica: `pedido_<slug>`. */
  slug: string;
  nombre: string;
  /** Una línea. Tiene que alcanzar para que alguien se reconozca en ella. */
  descripcion: string;
  /**
   * El mensaje que se abre escrito en WhatsApp al tocar la celda.
   *
   * Es el motivo de que esta lista exista. Cuando alguien toca "Turnos y
   * reservas" me llega un mensaje que ya dice qué necesita, y la conversación
   * arranca por el medio en vez de por un "hola" del que hay que tirar.
   * También es lo que después me deja ver, en la medición, qué es lo que más
   * se pide.
   */
  mensaje: string;
};

/**
 * Los entregables, nombrados como los nombra el que llama.
 *
 * La sección de servicios está escrita en mi idioma —sitios web, software a
 * medida, automatizaciones— y eso es lo que hago. Esta lista está escrita en
 * el idioma del que me busca: nadie piensa "necesito software a medida",
 * piensa "necesito que la gente saque turno sin llamarme por teléfono".
 *
 * Sirve para tres cosas: que el visitante se reconozca en un renglón, que
 * pueda escribirme desde ahí con el pedido ya redactado, y que estas palabras
 * —"tienda online", "turnos y reservas", "cotizador"— estén escritas en la
 * página, porque son las que se buscan en Google.
 */
export const pedidos: readonly Pedido[] = [
  {
    slug: "institucional",
    nombre: "Página institucional",
    descripcion:
      "Un sitio de varias páginas para presentar el negocio, sus productos y los datos de contacto.",
    mensaje:
      "Hola Nicolás, necesito una página institucional para mi negocio. ¿Podríamos conversarlo?",
  },
  {
    slug: "one-page",
    nombre: "One-page",
    descripcion:
      "Toda la información en una sola página, adecuada para negocios con un único servicio o producto.",
    mensaje:
      "Hola Nicolás, necesito un sitio de una sola página. ¿Podríamos conversarlo?",
  },
  {
    slug: "catalogo",
    nombre: "Catálogo con fichas",
    descripcion:
      "Una página por producto o servicio, con sus características y precios en texto.",
    mensaje:
      "Hola Nicolás, necesito un catálogo con una ficha por producto. ¿Podríamos conversarlo?",
  },
  {
    slug: "tienda",
    nombre: "Tienda online",
    descripcion:
      "Carrito de compras y cobro a través de Mercado Pago, con el stock vinculado al catálogo.",
    mensaje:
      "Hola Nicolás, necesito una tienda online con cobro por Mercado Pago. ¿Podríamos conversarlo?",
  },
  {
    slug: "reservas",
    nombre: "Turnos y reservas",
    descripcion:
      "El cliente elige día y horario, y recibe la confirmación y un recordatorio.",
    mensaje:
      "Hola Nicolás, necesito un sitio donde mis clientes puedan reservar turnos en línea. ¿Podríamos conversarlo?",
  },
  {
    slug: "cotizador",
    nombre: "Cotizador",
    descripcion:
      "El visitante arma su presupuesto y la solicitud llega con los datos completos.",
    mensaje:
      "Hola Nicolás, necesito un cotizador para mi sitio. ¿Podríamos conversarlo?",
  },
  {
    slug: "panel",
    nombre: "Panel de administración",
    descripcion:
      "Para cargar productos, actualizar precios y reemplazar imágenes sin asistencia técnica.",
    mensaje:
      "Hola Nicolás, necesito un panel para administrar el contenido de mi sitio. ¿Podríamos conversarlo?",
  },
  {
    slug: "rediseno",
    nombre: "Rediseño",
    descripcion:
      "Para sitios que no generan consultas: se analiza qué falla y se corrige, sin empezar de cero.",
    mensaje:
      "Hola Nicolás, tengo un sitio en funcionamiento y quisiera rediseñarlo. ¿Podríamos conversarlo?",
  },
  {
    slug: "dos-idiomas",
    nombre: "Sitio en dos idiomas",
    descripcion:
      "Para negocios que venden al exterior o reciben consultas de países limítrofes.",
    mensaje:
      "Hola Nicolás, necesito un sitio en español e inglés. ¿Podríamos conversarlo?",
  },
];
