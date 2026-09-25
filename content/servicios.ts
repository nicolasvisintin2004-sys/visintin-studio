/**
 * Las dos líneas de trabajo.
 *
 * El estudio hacía "sitios web y algunas cosas más". Ahora son dos líneas con
 * el mismo peso: la web es una de las piezas, no el todo. El hilo que las une
 * está escrito en `lineas`, y es lo que hay que poder decir en una frase
 * cuando alguien pregunta a qué me dedico.
 */
export type Linea = "web" | "automatizacion";

export const lineas: readonly { slug: Linea; nombre: string; promesa: string }[] = [
  {
    slug: "web",
    nombre: "Sitios y sistemas web",
    promesa:
      "Lo que el cliente ve y usa: el sitio que presenta la oferta, el catálogo que se compara, el cotizador que arma el presupuesto y el panel desde el que se administra todo.",
  },
  {
    slug: "automatizacion",
    nombre: "IA y automatización aplicada",
    promesa:
      "Lo que pasa puertas adentro: el mapa de cómo trabaja la empresa, las tareas repetidas que dejan de hacerse a mano, los mensajes que se contestan y se clasifican solos, y las herramientas que ya se usan conectadas entre sí.",
  },
];

export type Servicio = {
  numero: string;
  slug: string;
  /** A cuál de las dos líneas pertenece. Define bajo qué título se agrupa. */
  linea: Linea;
  nombre: string;
  /** Una línea que resume el servicio. Es lo que se lee sin abrir la fila. */
  promesa: string;
  /** El párrafo que aparece cuando la fila se expande. */
  detalle: string;
  /** Lo concreto que se entrega. Tres como máximo: más es una lista de supermercado. */
  entrega: readonly string[];
  /**
   * La prueba visual que sigue al cursor. Todas salen de las capturas del
   * portfolio: son trabajo real y no ilustraciones de stock.
   */
  imagen: { archivo: string; alt: string };
};

/**
 * Los cuatro servicios, agrupados en las dos líneas.
 *
 * Las cuatro pruebas visuales se reparten entre los dos casos, dos de cada
 * uno, para que la sección no parezca un solo sitio mirado desde cuatro
 * ángulos. Cada imagen va con el servicio que mejor muestra: la página de
 * producto de BULK, con el precio calculado por variante, es software y no
 * una página; su carrito, que arma el pedido para mandarlo por el chat,
 * saca de encima una tarea que antes se hacía a mano.
 *
 * Dentro de cada línea van de lo que más se pide a lo que menos. El que entra
 * buscando "página web" tiene que encontrar eso primero; el que entra sabiendo
 * que pierde horas pero no qué pedir, entra por el diagnóstico y llega a la
 * segunda línea. Las dos se muestran con el mismo peso visual: la web es una
 * de las piezas del trabajo y no el trabajo entero.
 */
export const servicios: readonly Servicio[] = [
  {
    numero: "01",
    slug: "sitios-web",
    linea: "web",
    nombre: "Sitios web",
    promesa: "Para ser encontrado y recibir consultas.",
    detalle:
      "Diseño y desarrollo a medida, sin plantillas. Cada producto o servicio tiene su propia página, con la información en texto y no dentro de una imagen: eso es lo que Google indexa y lo que el cliente compara. Los formularios solicitan los datos necesarios para presupuestar, en lugar de un mensaje genérico.",
    entrega: [
      "Una página por producto o servicio",
      "Formularios de cotización",
      "Velocidad medida y SEO técnico",
    ],
    imagen: {
      archivo: "taller-italia-interior",
      alt: "Página de producto del sitio de Taller Italia con la ficha técnica escrita en texto",
    },
  },
  {
    numero: "02",
    slug: "software-a-medida",
    linea: "web",
    nombre: "Software a medida",
    promesa: "Cuando la herramienta necesaria no existe.",
    detalle:
      "Cotizadores que reemplazan planillas de cálculo, catálogos internos para el equipo de ventas y paneles de administración para gestionar el contenido sin asistencia técnica. Cuando el proyecto requiere cobros o almacenamiento de datos, se integran Mercado Pago y Supabase.",
    entrega: [
      "Cotizadores y configuradores",
      "Paneles de administración",
      "Integraciones con Mercado Pago y Supabase",
    ],
    imagen: {
      archivo: "bulk-producto",
      alt: "Página de producto de BULK con la presentación y el sabor a elegir y el precio en efectivo ya calculado",
    },
  },
  {
    numero: "03",
    slug: "automatizaciones-e-ia",
    linea: "automatizacion",
    nombre: "Automatizaciones e IA",
    promesa: "Para eliminar las tareas repetitivas.",
    detalle:
      "En todo negocio hay tareas que alguien realiza manualmente cada día: responder las mismas consultas, trasladar datos de un sistema a otro, preparar el mismo informe cada semana. Esas tareas pueden automatizarse, y la inteligencia artificial se incorpora donde hace falta criterio y no solo una regla fija: clasificar una consulta que entró por escrito, redactar la respuesta a partir de la información real del negocio o decidir a quién derivarla. El trabajo empieza siempre por el diagnóstico, porque automatizar un proceso mal armado lo único que hace es acelerarlo.",
    entrega: [
      "Asistentes que responden y clasifican consultas",
      "Integraciones entre las herramientas que ya se usan",
      "Carga de datos y seguimientos automáticos",
    ],
    imagen: {
      archivo: "bulk-carrito",
      alt: "El carrito de BULK con el pedido armado, lo que falta para el envío gratis y el ahorro pagando en efectivo",
    },
  },
  {
    numero: "04",
    slug: "informacion-e-informes",
    linea: "automatizacion",
    nombre: "Información e informes",
    promesa: "Los datos del negocio, ordenados y disponibles.",
    detalle:
      "La mayoría de los negocios no carece de información: la tiene dispersa en planillas, cuadernos y en la memoria de algunas personas. El trabajo consiste en centralizarla y dejar armados los informes necesarios para tomar decisiones.",
    entrega: [
      "Bases de datos ordenadas",
      "Reportes con actualización automática",
      "Medición de las consultas del sitio",
    ],
    imagen: {
      archivo: "taller-italia-inicio",
      alt: "Portada del sitio de Taller Italia, con el proceso de fabricación presentado como recorrido",
    },
  },
];

/**
 * Los rubros de la cinta.
 *
 * Son PyMEs de distinto tipo y no sólo fábricas: quien tiene un comercio o un
 * consultorio tiene que reconocerse en la lista igual que un metalúrgico. Los
 * fabricantes van primero porque son los proyectos que ya existen, pero la
 * lista no puede terminar ahí o el resto se va pensando que el estudio no es
 * para ellos.
 */
export const rubros: readonly string[] = [
  "Fabricantes de motorhomes",
  "Tiendas de suplementos",
  "Comercios con local a la calle",
  "Marmolerías y metalúrgicas",
  "Estudios y consultorios",
  "Distribuidoras y mayoristas",
  "Talleres y servicios a domicilio",
  "Negocios que hoy viven en Instagram",
];
