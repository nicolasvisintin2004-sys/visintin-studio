/**
 * Los servicios de Instagram.
 *
 * Son distintos de las dos líneas de trabajo del estudio, y por eso van en un
 * bloque aparte de /servicios y no como una tercera línea. Los sitios y las
 * automatizaciones empiezan por el diagnóstico porque no se sabe qué hacer
 * hasta mirar cómo trabaja la empresa. Estos tres, no: el alcance ya está
 * definido de antemano, así que tienen precio fijo y publicado, y se pueden
 * contratar directamente.
 *
 * Es la excepción a la regla de "sólo el diagnóstico tiene precio". La regla
 * existía porque un mismo "sitio web" puede costar cinco veces más que otro
 * según lo que incluya; un servicio con alcance cerrado no tiene ese
 * problema, y ahí el número ayuda a decidir.
 *
 * Los precios van en dólares porque así se cobran.
 */

export type Precio = {
  /** Lo que se lee grande: "USD 200". */
  monto: string;
  /** Para los datos estructurados de Google. */
  valor: number;
  periodo: "pago único" | "por mes";
};

export type ServicioInstagram = {
  slug: string;
  nombre: string;
  precio: Precio;
  /** Una línea: qué es. */
  promesa: string;
  detalle: readonly string[];
  /** Una lista opcional con su propio título, como el "por qué es mensual". */
  lista?: { titulo: string; items: readonly string[] };
  /** Con qué se ilustra. Sólo los que tienen algo real para mostrar. */
  ilustracion?: "palabra-clave" | "contenido";
};

export const instagram = {
  titulo: "Instagram, con precio fijo.",
  bajada:
    "Tres trabajos con el alcance cerrado de antemano. No pasan por el diagnóstico: se sabe exactamente qué incluyen, así que el precio también se sabe.",
  consultar: "Consultar por WhatsApp",
  servicios: [
    {
      slug: "auditoria-instagram",
      nombre: "Auditoría de Instagram",
      precio: { monto: "USD 200", valor: 200, periodo: "pago único" },
      promesa: "Qué funciona en tu cuenta, qué conviene cambiar y por dónde seguir.",
      detalle: [
        "Es un trabajo de una sola vez. Reviso tu cuenta completa y te entrego un informe con lo que está funcionando, lo que conviene cambiar y los próximos pasos.",
        "Te lo entrego y queda en tus manos.",
      ],
    },
    {
      slug: "mensajes-por-palabra-clave",
      nombre: "Mensajes automáticos por palabra clave",
      precio: { monto: "USD 200", valor: 200, periodo: "por mes" },
      promesa: "Cada comentario con la palabra clave recibe un mensaje privado al instante.",
      detalle: [
        "No se hace una vez y queda: es un sistema que trabaja todos los días, las 24 horas. Cada vez que alguien comenta la palabra clave en una publicación —por ejemplo, «info»—, le llega al instante un mensaje privado con la información y un link para escribirte directo por WhatsApp.",
      ],
      lista: {
        titulo: "Por qué es mensual",
        items: [
          "Funciona conectado a tu Instagram a través de herramientas que se pagan por mes mientras el sistema está activo.",
          "Instagram cambia sus reglas y permisos seguido. Si algo deja de andar, lo arreglo yo antes de que pierdas consultas.",
          "Cada vez que subís una publicación nueva o arrancás una campaña, cargo la palabra clave y ajusto el mensaje.",
          "Cada persona que comenta queda registrada y te llega el aviso a tu WhatsApp. Así no se te escapa ninguna y sabés a quién responderle primero.",
        ],
      },
      ilustracion: "palabra-clave",
    },
    {
      slug: "creacion-de-contenido",
      nombre: "Creación de contenido",
      precio: { monto: "USD 300", valor: 300, periodo: "por mes" },
      promesa: "Las publicaciones de la cuenta, pensadas para lo que la marca necesita.",
      detalle: [
        "Antes de diseñar una sola pieza, vemos juntos qué quiere la marca: a quién le habla, qué tipo de contenido necesita y qué tiene que lograr cada publicación. Recién con eso definido se produce, mes a mes.",
        "La cuenta de BULK, la tienda de suplementos que está entre los proyectos, la manejo yo. Estas son algunas de sus publicaciones.",
      ],
      ilustracion: "contenido",
    },
  ] satisfies readonly ServicioInstagram[],

  /**
   * La conversación del segundo servicio, escrita en HTML.
   *
   * Es un ejemplo del funcionamiento y no una captura de una cuenta real:
   * por eso los nombres son genéricos y el pie lo dice.
   */
  palabraClave: {
    cuenta: "tu.negocio",
    usuario: "cliente.interesado",
    comentario: "info",
    mensaje:
      "¡Hola! Gracias por escribir. Te paso los precios y las formas de pago. Si querés, seguimos por WhatsApp:",
    enlace: "Escribir por WhatsApp",
    pie: "Así funciona: un comentario y la respuesta privada al instante. Ejemplo ilustrativo.",
    descripcion:
      "Ejemplo: alguien comenta «info» en una publicación y recibe al instante un mensaje privado con la información y un botón para escribir por WhatsApp.",
  },

  /** Las piezas de BULK. Las procesa `herramientas/procesar-contenido.mjs`. */
  piezas: [
    {
      archivo: "bulk-cuanta-proteina",
      alt: "Portada de un carrusel de BULK: «¿Cuánta proteína necesitás para ganar músculo?», sobre una foto de comida.",
    },
    {
      archivo: "bulk-cuanta-proteina-grafico",
      alt: "Lámina del mismo carrusel con un gráfico: más proteína no siempre es más músculo, el beneficio se estanca cerca de 1,6 g por kilo.",
    },
    {
      archivo: "bulk-alimentos-proteina",
      alt: "Portada de un carrusel de BULK: «5 alimentos con mucha proteína», con fotos de huevos, carne, pollo, atún y yogur.",
    },
    {
      archivo: "bulk-alimentos-carne",
      alt: "Lámina del carrusel de alimentos: carne vacuna magra, 28 gramos de proteína cada 100 gramos.",
    },
    {
      archivo: "bulk-primer-suplemento",
      alt: "Portada de un carrusel de BULK: «Antes de comprar tu primer suplemento», sobre una foto de entrenamiento.",
    },
    {
      archivo: "bulk-como-tomar",
      alt: "Lámina de una guía de BULK sobre cómo tomar suplementos: creatina, proteína whey, omega 3 y vitamina D3 + K2, con la foto de cada producto.",
    },
  ],
  piezasPie: "Publicaciones de @Bulk_Ar.",
};
