/**
 * El diagnóstico: el producto de entrada.
 *
 * Es la única pieza del sitio que muestra un precio, y es deliberado. El
 * resto de los trabajos son variables —un cotizador puede ser una tarde o un
 * mes— y un número suelto ahí espanta o miente. El diagnóstico es acotado y
 * cerrado: dura lo mismo para todos, entrega lo mismo para todos y termina en
 * un documento. Por eso acá el número ayuda en vez de estorbar.
 *
 * También cambia a quién le habla el sitio. Hasta ahora el único camino era
 * "escribime por WhatsApp y hablamos de un sitio", que sirve para el que ya
 * sabe qué quiere. El que sabe que algo no funciona pero no sabe qué pedir
 * —que es la mayoría— no tenía por dónde entrar.
 */

/**
 * El precio, en un solo lugar.
 *
 * Vacío es un estado válido y no un error: la página funciona igual y muestra
 * "Consultar precio" en lugar del número. Se completa con el valor tal como
 * tiene que leerse, con moneda incluida: "USD 180", "$ 250.000".
 */
export const PRECIO_DIAGNOSTICO = "";

/** Lo que se muestra mientras no haya precio cargado. */
export const PRECIO_SIN_DEFINIR = "Consultar precio";

/**
 * Los días hábiles de trabajo que van entre la llamada y la entrega.
 *
 * Diez, dos semanas, y todavía no es una medición: no hay diagnósticos
 * entregados para promediar. Se eligió con margen a propósito, porque se hace
 * en paralelo con otros trabajos y las dudas se consultan por WhatsApp.
 * Entregar antes de lo prometido suma; entregar tarde arranca mal la relación.
 * Se ajusta con los primeros que salgan.
 *
 * El post del diagnóstico en Instagram (instagram/posts/10-diagnostico.md)
 * dice el mismo número: si cambia acá, cambia allá.
 */
export const DIAS_DE_TRABAJO = 10;

export const diagnostico = {
  etiqueta: "Diagnóstico",

  /**
   * El titular nombra el problema y no el producto.
   *
   * Nadie se despierta queriendo comprar un diagnóstico de procesos; se
   * despierta sabiendo que la semana se le fue y no puede decir en qué. El
   * título tiene que ser esa frase, no la descripción de lo que vendo.
   *
   * Las tres líneas están cortadas a mano y ninguna puede pasar de 8,4 em,
   * por lo mismo que el título del inicio: ver el comentario de `hero.titulo`
   * en `content/textos.ts`. Medidas actuales: 7,00 · 6,35 · 7,59.
   */
  titulo: ["Se te van horas", "cada semana.", "No sabés en qué."],
  bajada:
    "Una radiografía de cómo trabaja tu empresa: el mapa de la operación, dónde se consume el tiempo, qué puede romperse y un plan de trabajo con orden y números. Se entrega por escrito, en un documento que queda tuyo.",
  accion: "Solicitar el diagnóstico",

  /** Para el enlace desde el inicio y desde el menú. */
  accionCorta: "Ver el diagnóstico",

  sintomas: {
    etiqueta: "Antes de seguir",
    titulo: "Si algo de esto pasa en tu empresa, el diagnóstico es para vos.",
    lista: [
      "Cada presupuesto se arma a mano, uno por uno, y casi siempre lo arma la misma persona.",
      "Los pedidos entran por WhatsApp, por Instagram, por correo y por teléfono, y no hay una sola lista donde estén todos.",
      "Los precios, los clientes y el stock viven en un celular y en planillas que nadie más abre.",
      "La misma pregunta se responde veinte veces por día, y cada vez se escribe de nuevo.",
    ],
  },

  entregables: {
    etiqueta: "Qué recibís",
    titulo: "Cuatro entregables, en un documento.",
    bajada:
      "No es una reunión de la que te llevás apuntes. Es un documento escrito que podés leer, mostrarle a un socio y usar como plan de trabajo, con o sin mí.",
    /** Los cuatro bloques numerados. El orden es el orden en que se producen. */
    lista: [
      {
        numero: "01",
        nombre: "Mapa de procesos",
        texto:
          "Cómo funciona hoy la operación, paso por paso, dibujada en un diagrama que se puede imprimir y colgar. La mayoría de los dueños nunca vio su empresa dibujada, y esa es la parte que más suele sorprender.",
      },
      {
        numero: "02",
        nombre: "Dónde se pierde tiempo y plata",
        texto:
          "Cada paso del mapa con las horas que consume por semana, y qué se puede eliminar, automatizar o delegar a un sistema. Las horas salen de lo que se cuenta en la entrevista, no de un promedio de industria.",
      },
      {
        numero: "03",
        nombre: "Qué puede romperse",
        texto:
          "Revisión de los puntos frágiles: datos que viven en un solo celular, planillas sin respaldo, accesos compartidos entre varias personas y tareas que dependen de que alguien en particular esté disponible.",
      },
      {
        numero: "04",
        nombre: "Plan de trabajo con orden y números",
        texto:
          "Qué conviene hacer primero, qué después, cuánto cuesta cada cosa y cuánto devuelve. Con presupuesto por etapa, de manera que cada una pueda decidirse por separado.",
      },
    ],
    cierre: "Te llevás el plan aunque después no trabajes conmigo.",
  },

  proceso: {
    etiqueta: "Cómo es",
    titulo: "Tres pasos, con tiempos reales.",
    /** `dias` se reemplaza por DIAS_DE_TRABAJO al renderizar. */
    pasos: [
      {
        numero: "01",
        nombre: "Una llamada de una hora",
        texto:
          "Por videollamada, con quien toma las decisiones y, si se puede, con alguien que haga el trabajo todos los días. No hace falta preparar nada: las preguntas las llevo yo.",
        tiempo: "1 hora",
      },
      {
        numero: "02",
        nombre: "El trabajo de análisis",
        texto:
          "Ordeno lo que se dijo en el mapa, le pongo números a cada paso y armo el plan. Si aparece una duda, la consulto por WhatsApp; no hace falta una segunda reunión.",
        tiempo: "{dias} días hábiles",
      },
      {
        numero: "03",
        nombre: "La entrega y una reunión para recorrerla",
        texto:
          "Recibís el documento y nos juntamos otra vez para recorrerlo entero, discutir las prioridades y ajustar lo que haga falta. A partir de ahí el plan es tuyo.",
        tiempo: "1 hora",
      },
    ],
  },

  /**
   * Para quién sirve y para quién no.
   *
   * La columna de la derecha es la que más convence. Un sitio que sólo dice
   * a quién le sirve algo se lee como un folleto; uno que se anima a decir a
   * quién no, se lee como alguien que ya hizo el trabajo varias veces.
   */
  encaje: {
    etiqueta: "Antes de escribirme",
    titulo: "Para quién sirve, y para quién no.",
    siTitulo: "Tiene sentido si",
    si: [
      "Trabajan entre tres y treinta personas, y varias tareas dependen de que alguien se acuerde.",
      "El negocio funciona y factura: el problema es que no crece sin sumar horas.",
      "Ya intentaron ordenarse con planillas y las planillas también se desordenaron.",
      "Querés saber qué conviene hacer primero, antes de gastar en un sistema.",
    ],
    noTitulo: "No tiene sentido si",
    no: [
      "El negocio recién arranca y todavía no hay clientes: no hay un proceso que mapear.",
      "Lo que buscás es que alguien confirme una decisión que ya está tomada.",
      "Preferís un precio cerrado sin mostrar cómo trabaja la empresa por dentro.",
      "Esperás que la inteligencia artificial resuelva algo que en realidad es un problema de organización.",
    ],
  },

  precio: {
    etiqueta: "Precio",
    titulo: "Un precio cerrado, y qué pasa después.",
    texto:
      "El diagnóstico se paga una vez y no tiene continuidad obligatoria. Termina con el documento entregado y la reunión para recorrerlo.",
    descuento: "Si después hacemos el proyecto, el diagnóstico se descuenta del total.",
    /** Lo que acompaña al número, para que no quede un precio solo. */
    incluye: [
      "La llamada inicial de una hora",
      "El documento con los cuatro entregables",
      "La reunión para recorrerlo",
      "Las consultas por WhatsApp durante el análisis",
    ],
  },

  formulario: {
    etiqueta: "Solicitarlo",
    titulo: "Contame en qué anda la empresa.",
    texto:
      "Respondo en el día o, como máximo, el día hábil siguiente, con la fecha disponible más cercana para la llamada.",
  },

  preguntas: {
    etiqueta: "Preguntas frecuentes",
    titulo: "Lo que se pregunta siempre.",
  },
};

/**
 * Las preguntas del diagnóstico, separadas de las del estudio.
 *
 * Van acá y no en `content/preguntas.ts` porque alimentan el `FAQPage` de
 * esta página: Google exige que el marcado describa contenido que esté en la
 * misma dirección, y estas cuatro no aparecen en ninguna otra.
 */
export const preguntasDiagnostico: readonly { pregunta: string; respuesta: string }[] = [
  {
    pregunta: "¿Y si no encontrás nada?",
    respuesta:
      "No me ha pasado, pero es una posibilidad real y conviene decirlo: si al terminar el análisis la conclusión es que la operación ya está ordenada y no hay nada que valga la pena automatizar, eso queda escrito en el documento con el mismo detalle que cualquier otro resultado, y te devuelvo lo que pagaste. Un informe que inventa problemas para justificar un proyecto no me sirve a mí tampoco.",
  },
  {
    pregunta: "¿Tengo que comprometerme a algo después?",
    respuesta:
      "No. El diagnóstico termina en el documento y la reunión para recorrerlo. El plan está escrito para que puedas ejecutarlo con tu equipo, con otro proveedor o conmigo, y los presupuestos por etapa están justamente para que cada parte se decida por separado.",
  },
  {
    pregunta: "¿Hace falta que ya tenga sistemas?",
    respuesta:
      "No, y en general es al revés: los diagnósticos más útiles son los de empresas que funcionan con WhatsApp, planillas y papel. Lo que se mapea es cómo trabaja la gente, no qué software usa. Si no hay ningún sistema, el plan empieza por cuál conviene primero.",
  },
  {
    pregunta: "¿Sirve si somos cuatro personas?",
    respuesta:
      "Sí. En equipos chicos el problema no es la cantidad de procesos sino la concentración: casi todo pasa por una o dos personas, y cuando alguna falta se frena el negocio entero. Es de los casos donde el mapa se arma rápido y donde las primeras automatizaciones se notan más.",
  },
];
