/**
 * Los textos de las secciones.
 *
 * Están acá y no adentro de los componentes para poder corregir una frase sin
 * abrir un archivo con JSX.
 *
 * El registro es formal y sobrio, con voseo. Se trata al visitante de "vos"
 * porque en Argentina el "usted" en un sitio web suena a banco, pero sin
 * coloquialismos ni chistes: nada de "charlamos", "sin vueltas" o "te está
 * comiendo el día". Los botones van en infinitivo ("Consultar por WhatsApp")
 * y no en imperativo ("Escribime"). Primera persona cuando habla Nicolás,
 * porque el estudio es una persona; impersonal cuando se describe el trabajo.
 *
 * Tampoco "soluciones digitales", "transformación digital" ni "potenciamos
 * tu marca": formal no quiere decir vacío. Con la línea de automatización
 * esto se vuelve más importante todavía, porque es el rubro donde más se
 * escribe así: acá no hay "revolución", ni "potenciá tu negocio con IA", ni
 * "agencia de IA". Se dice qué tarea deja de hacerse a mano y listo.
 */

export const hero = {
  etiqueta: "Sistemas web y automatización · Buenos Aires",
  /**
   * Tres líneas, cortadas a mano: cada una entra con su propia máscara, con
   * 80 ms de diferencia.
   *
   * NINGUNA PUEDE PASAR DE 8,4 em. El tamaño de `.t-display` está calculado
   * para que la línea más larga entre en un solo renglón —está explicado en
   * `app/globals.css`— y una línea más larga que eso se parte en dos, duplica
   * el alto del título y empuja el resto del hero fuera de la pantalla.
   *
   * Medidas actuales, en em de Clash Display 600 con este tracking:
   *   "Ordeno el trabajo" 7,96 · "de tu empresa" 6,68 · "y lo automatizo." 7,12
   */
  titulo: ["Ordeno el trabajo", "de tu empresa", "y lo automatizo."],
  bajada:
    "Dos líneas con el mismo peso: los sitios y sistemas que usan tus clientes, y las automatizaciones que le sacan horas repetidas a la semana. Las dos empiezan en el mismo lugar, que es entender cómo trabaja el negocio y por dónde entra el dinero.",
  accionPrincipal: "Ver el diagnóstico",
  accionSecundaria: "Consultar por WhatsApp",
};

export const servicios = {
  etiqueta: "Servicios",
  titulo: "Dos líneas de trabajo, una misma manera de empezar.",
  bajada:
    "Un sitio resuelve lo que ve el cliente; una automatización resuelve lo que pasa puertas adentro. La mayoría de los proyectos necesita algo de las dos, y en qué orden conviene hacerlo es justamente lo que define el diagnóstico.",
  /**
   * La lista de entregables concretos que va abajo de los cuatro servicios.
   * Es la misma sección: las cuatro categorías expresadas con las palabras
   * que usa quien consulta.
   */
  pedidosTitulo: "Los proyectos que se solicitan con más frecuencia.",
  pedidosBajada:
    "Al seleccionar cualquiera de ellos se abre WhatsApp con la consulta ya redactada, de modo que la conversación comienza con el alcance definido.",
  cierre: "Si tu proyecto no figura en la lista, también puede desarrollarse.",
  cierreAccion: "Consultar un proyecto distinto",
  /** Ayuda para quien navega la lista con el teclado y no con el mouse. */
  ayudaTeclado: "Presioná Enter sobre cada servicio para ver el detalle",
};

/**
 * El portfolio.
 *
 * Ni el título ni la bajada cuentan cuántos proyectos hay, salvo la línea que
 * lo dice de frente. Había tres entradas y dos eran demostraciones propias,
 * sin cliente detrás; se sacaron. Queda una menos, pero es real, y la frase
 * "por ahora hay uno" hace más por la confianza que tres fichas de las cuales
 * dos hay que aclarar que no existen.
 */
export const portfolio = {
  etiqueta: "Proyectos",
  titulo: "De Instagram a un sitio propio.",
  bajada:
    "Por ahora hay uno, y es un cliente real con el proyecto en curso. El caso empieza por el problema que tenía el negocio —con las capturas de cómo se lo encontraba en Google antes del sitio— y sigue con qué se construyó. El sitio está en línea y puede recorrerse.",
  cierre: "¿Tenés un proyecto similar?",
  cierreAccion: "Consultar un proyecto similar",
  verProyecto: "Ver el caso",
  verEnVivo: "Visitar el sitio",
  /** Se dice en la sección, no en cada tarjeta. */
  ayudaScroll: "Los proyectos se desplazan horizontalmente",
  /** Encabeza la línea de resultado de cada ficha. */
  antes: "Antes",
  despues: "Después",
  /**
   * Si es un cliente o una demostración. Se indica en cada proyecto y no sólo
   * una vez en la bajada: escondido, es el dato que convierte un portfolio
   * honesto en uno inflado.
   */
  estados: {
    clienteEnCurso: "Cliente · en desarrollo",
    cliente: "Cliente",
    demo: "Demostración",
  },
};

/** Los textos fijos de la página de cada proyecto. */
export const caso = {
  migasInicio: "Inicio",
  migasProyectos: "Proyectos",
  verEnVivo: "Visitar el sitio",
  consultarSimilar: "Consultar un proyecto similar",
  resultado: "Resultado",
  /** Encabeza las capturas del "antes", debajo de la situación inicial. */
  evidencia: "Cómo se lo encontraba antes",
  /**
   * Los rótulos de la línea de resultado, arriba de todo en la ficha.
   * Son distintos de `antes`, que titula la sección larga del problema más
   * abajo: acá son dos palabras sobre dos recuadros y tienen que ser cortas.
   */
  antesResultado: "Antes",
  despuesResultado: "Después",
  antes: "Situación inicial",
  construido: "Qué se desarrolló",
  porDentro: "El sitio en detalle",
  enLineaEtiqueta: "Sitio publicado",
  enLineaTitulo: "El sitio está disponible para recorrerlo.",
  solicitarPropuesta: "Solicitar una propuesta",
  siguiente: "Proyecto siguiente",
  verSiguiente: "Ver el caso",
};

/**
 * La página que antes se llamaba "Planes".
 *
 * Dejó de ser una lista de tres alcances para ser el mapa del estudio: todos
 * entran por el diagnóstico y de ahí salen tres ramas, de las cuales la web
 * es una. Los tres planes siguen existiendo, pero como el detalle de esa
 * rama y no como la sección entera.
 *
 * El título de la sección dice "Cómo trabajo" y no "Cómo trabajamos": el
 * estudio es una persona y lo dice en todas las demás páginas. El plural
 * mayestático acá contradiría la página del estudio.
 */
export const planes = {
  etiqueta: "Cómo trabajo",
  titulo: "Todos entran por el mismo lugar.",
  bajada:
    "El trabajo empieza siempre por el diagnóstico, porque es la única manera de saber qué conviene hacer primero. De ahí salen tres caminos, que pueden tomarse de a uno o encadenarse. Sólo el diagnóstico tiene precio publicado: es el único trabajo acotado y cerrado, y el resto depende de lo que el diagnóstico encuentre.",
  ramasEtiqueta: "Los tres caminos",
  planesEtiqueta: "El detalle de la rama de sitios",
  planesTitulo: "Tres alcances. El precio se define en la consulta.",
  planesBajada:
    "Los precios no se publican porque, sin conocer el alcance, no permiten una comparación útil: un mismo “sitio web” puede variar considerablemente según lo que incluya. El precio se informa en la primera conversación, una vez definido el alcance.",
  recomendado: "El plan más elegido",
  accion: "Solicitar precio",
  accionMantenimiento: "Consultar el mantenimiento",
  cierre: "Si ninguno se ajusta a tu necesidad, se prepara una propuesta a medida.",
  cierreAccion: "Solicitar una propuesta a medida",
};

export const sobreMi = {
  etiqueta: "El estudio",
  titulo: "Una persona, no una agencia.",
  parrafos: [
    "Visintin Studio es Nicolás Visintin. Cada consulta la respondo personalmente, y cada proyecto lo desarrollo y lo mantengo yo mismo, sin intermediarios ni equipos rotativos.",
    "Estudio Ingeniería Industrial en la UADE, una disciplina centrada en analizar procesos y eliminar lo que no aporta valor. Es el enfoque que aplico a cada proyecto, y es literalmente lo que hace el diagnóstico: antes que el diseño o el software, me interesa entender cómo trabaja el negocio y dónde pierde tiempo.",
    "Trabajo con PyMEs argentinas: negocios con años de oficio y clientes propios, cuya presencia en internet se reduce a un perfil de redes sociales y cuya operación se sostiene con planillas y memoria. Casi siempre venden algo que el comprador compara en detalle antes de decidir, y ahí ni el sitio ni el sistema cumplen una función decorativa: tienen que responder las preguntas antes de que se formulen.",
  ],
  /**
   * Números reales. Ninguno inventado y ninguno que no pueda sostener.
   *
   * Los cuatro hablan de cómo trabajo y no de cuánto trabajé, que es
   * deliberado: acá había un "3 sitios publicados" que contaba dos
   * demostraciones propias como si fueran clientes. Al sacarlas dejó de ser
   * cierto, y un contador de proyectos en un estudio de una persona es el
   * número que peor envejece. El 100 % sale de la pregunta frecuente sobre a
   * nombre de quién queda el sitio.
   */
  datos: [
    { valor: 100, sufijo: " %", etiqueta: "del código y el dominio, a tu nombre" },
    { valor: 24, sufijo: " h", etiqueta: "plazo máximo de respuesta" },
    { valor: 48, sufijo: " h", etiqueta: "para la propuesta por escrito" },
    { valor: 1, sufijo: "", etiqueta: "responsable, de principio a fin" },
  ],
};

export const preguntas = {
  etiqueta: "Preguntas frecuentes",
  titulo: "Lo que conviene saber antes de empezar.",
  cierre: "¿Tenés una consulta que no figura acá?",
  cierreAccion: "Hacer una consulta",
};

export const contacto = {
  etiqueta: "Contacto",
  titulo: "Hablemos de tu proyecto.",
  bajada:
    "La primera conversación dura alrededor de veinte minutos, se realiza por WhatsApp o videollamada y no tiene costo. Al terminarla vas a saber si puedo ayudarte y cómo sería el proyecto.",
  whatsappTitulo: "Contacto directo",
  /** Lo que se lee en grande: el canal, no el número. */
  whatsappCanal: "WhatsApp",
  whatsappTexto:
    "Las consultas recibidas en días hábiles se responden en el día o, como máximo, el día hábil siguiente. Todas las respondo personalmente.",
  whatsappAccion: "Abrir WhatsApp",
  formularioTitulo: "O dejame tus datos",
  formularioTexto:
    "Si preferís escribir con calma, completá el formulario y te respondo por el medio que elijas. Es también la forma de que quede registrada la consulta si ahora no podés hablar.",
  correoEtiqueta: "También por correo:",
};

/**
 * El formulario.
 *
 * Dejó de abrir WhatsApp con un mensaje escrito y pasó a guardar la consulta
 * de verdad. El motivo está explicado en README-MEDICION.md y se resume así:
 * WhatsApp convierte bien pero no deja rastro, y el que no contesta
 * desaparece sin dejar un dato para volver a escribirle.
 */
export const formulario = {
  nombre: "Nombre",
  nombreMarcador: "Nombre y apellido",
  empresa: "Empresa",
  empresaMarcador: "Cómo se llama el negocio",
  whatsapp: "WhatsApp",
  whatsappMarcador: "Con característica, sin el 15",
  email: "Correo",
  emailMarcador: "nombre@empresa.com",
  rubro: "Rubro",
  rubroMarcador: "Seleccioná una opción",
  mensaje: "¿Qué te está costando más tiempo hoy?",
  mensajeMarcador:
    "Unas pocas líneas alcanzan. Si todavía no sabés qué pedir, contá cómo es un día normal.",
  mensajeOpcional: "Opcional",
  consentimiento:
    "Autorizo a Visintin Studio a contactarme por los medios indicados para responder esta consulta.",
  enviar: "Enviar la consulta",
  enviando: "Enviando…",
  /**
   * Las opciones del rubro.
   *
   * Cubren los tipos de PyME y no los rubros de fabricación: un comercio o un
   * consultorio tienen que encontrarse en la lista, no caer en "Otro".
   */
  rubros: [
    "Metalmecánica",
    "Agro",
    "Transporte y logística",
    "Comercio y retail",
    "Servicios profesionales",
    "Otro",
  ],
  /**
   * Los tres estados del envío.
   *
   * El éxito no es un `alert`: es un cambio en el mismo lugar donde estaba el
   * formulario, y dice cuándo se responde. Un "gracias" sin plazo deja a la
   * persona sin saber si tiene que esperar o escribir por otro lado.
   */
  exitoTitulo: "Recibido.",
  exitoTexto:
    "Te respondo en el día o, como máximo, el día hábil siguiente. Si es urgente, escribime por WhatsApp y lo vemos ahora.",
  exitoAccion: "Escribir por WhatsApp",
  errorTitulo: "No se pudo enviar.",
  errorTexto:
    "Algo falló del lado del servidor y la consulta no llegó. Podés intentarlo otra vez o, si preferís, escribirme directamente por WhatsApp.",
  errorAccion: "Reintentar",
  /** Lo que se dice abajo del botón, para que nadie envíe a ciegas. */
  privacidad:
    "Los datos se usan únicamente para responder la consulta. No se comparten con terceros.",
};

export const pie = {
  descripcion:
    "Sitios y sistemas web, automatización de procesos e inteligencia artificial aplicada, para PyMEs argentinas. Atención a clientes de todo el país.",
  secciones: "Secciones",
  contacto: "Contacto",
  redes: "Dónde encontrarme",
  pais: "Argentina",
  derechos: "Visintin Studio",
  arriba: "Volver arriba",
};

export const navegacion = {
  saltar: "Saltar al contenido",
  menu: "Menú",
  cerrar: "Cerrar",
  /**
   * Las páginas del sitio, en el orden del menú. Ese orden también define el
   * recorrido: al pie de cada página se ofrece ir a la siguiente.
   */
  enlaces: [
    { href: "/servicios", texto: "Servicios" },
    { href: "/proyectos", texto: "Proyectos" },
    { href: "/planes", texto: "Cómo trabajo" },
    { href: "/estudio", texto: "Estudio" },
    { href: "/contacto", texto: "Contacto" },
  ],
  /**
   * El botón de la derecha de la barra.
   *
   * Antes decía "WhatsApp". Ahora lleva al diagnóstico, que es el producto de
   * entrada: el que llega frío no sabe qué pedir por WhatsApp, y el botón que
   * le sirve es el que le ofrece algo concreto y acotado. WhatsApp no se
   * pierde —está en el botón flotante de todas las páginas, en el hero, en el
   * pie y en contacto—, deja de ser el único camino.
   */
  destacado: { href: "/diagnostico", texto: "Diagnóstico" },
  /** La franja al pie de cada página que lleva a la siguiente. */
  siguienteEtiqueta: "Sección siguiente",
};

/**
 * El inicio.
 *
 * No repite el contenido de las otras páginas: con eso Google vería el mismo
 * texto en dos direcciones distintas y no sabría cuál mostrar. Presenta el
 * estudio y ofrece un índice con una línea por sección.
 */
export const inicio = {
  indiceEtiqueta: "Contenido",
  indiceTitulo: "Por dónde seguir.",
  /** Una línea por página. Se leen en el índice, abajo del nombre. */
  indice: {
    "/servicios": "Sitios y sistemas web, automatización, IA aplicada e informes.",
    "/proyectos": "De Instagram a un sitio propio, con el antes documentado.",
    "/planes": "El diagnóstico, las tres ramas que salen de ahí y los planes web.",
    "/estudio": "Quién está detrás del trabajo y cómo se trabaja.",
    "/contacto": "WhatsApp, formulario o correo.",
    "/diagnostico": "Una radiografía de cómo trabaja tu empresa, por escrito.",
  } as Record<string, string>,
  /** La franja de redes. Cada una dice qué se publica ahí, no "seguime". */
  redesEtiqueta: "Dónde encontrarme",
  redesTitulo: "Tres lugares, tres cosas distintas.",
  cierreEtiqueta: "Contacto",
  cierreTitulo: "¿Tenés un proyecto en mente?",
  cierreTexto:
    "La primera conversación dura alrededor de veinte minutos, se realiza por WhatsApp y no tiene costo.",
  cierreAccion: "Consultar por WhatsApp",
  cierreSecundaria: "Otras formas de contacto",
};

/** Los textos de la sección de notas. */
export const notas = {
  etiqueta: "Notas",
  titulo: "Lo que me preguntan seguido, escrito una vez.",
  bajada:
    "Artículos sobre precios, procesos y automatización en PyMEs argentinas. Sin listas de diez consejos ni contenido escrito para rellenar.",
  lectura: "min de lectura",
  volver: "Todas las notas",
  vacio: "Todavía no hay notas publicadas.",
  borrador: "Borrador",
};

/**
 * Título y descripción de cada página, para Google y para la miniatura que
 * aparece al compartir el enlace. El título se completa solo con
 * " · Visintin Studio" desde el layout.
 */
export const paginas = {
  diagnostico: {
    titulo: "Diagnóstico de procesos para PyMEs",
    /**
     * Apunta a búsquedas de problema y no de producto: nadie busca
     * "diagnóstico de procesos", busca "automatizar presupuestos",
     * "ordenar los procesos de mi empresa" o "digitalizar una pyme".
     */
    descripcion:
      "Una radiografía por escrito de cómo trabaja tu empresa: el mapa de la operación, dónde se pierden horas cada semana, qué puede romperse y un plan para ordenar y automatizar, con costos por etapa. Para PyMEs argentinas.",
  },
  servicios: {
    titulo: "Servicios",
    descripcion:
      "Sitios y sistemas web, automatización de procesos, inteligencia artificial aplicada e informes para PyMEs argentinas. Catálogos, tiendas online, turnos y reservas, cotizadores, paneles de administración y asistentes que responden consultas.",
  },
  proyectos: {
    titulo: "Proyectos",
    descripcion:
      "Un proyecto para una PyME argentina que presentaba su oferta solo en Instagram: cómo se la encontraba en Google antes del sitio, qué se construyó y el sitio publicado, para recorrerlo.",
  },
  planes: {
    titulo: "Cómo trabajo",
    descripcion:
      "Todos los proyectos empiezan por el diagnóstico. De ahí salen tres caminos: sitio web —con tres alcances—, automatización puntual y acompañamiento mensual. Sólo el diagnóstico tiene precio publicado.",
  },
  estudio: {
    titulo: "Estudio",
    descripcion:
      "Visintin Studio es Nicolás Visintin: quién desarrolla cada proyecto, cómo se trabaja y las respuestas a las preguntas que conviene hacer antes de contratar.",
  },
  contacto: {
    titulo: "Contacto",
    descripcion:
      "Consultas por WhatsApp, formulario o correo. Respuesta en el día o, como máximo, el día hábil siguiente. Atención a clientes de todo el país.",
  },
  notas: {
    titulo: "Notas",
    descripcion:
      "Artículos sobre precios, procesos y automatización en PyMEs argentinas, escritos a partir de las preguntas que aparecen en cada proyecto.",
  },
};

/** Etiquetas para lectores de pantalla, donde el texto visible no alcanza. */
export const accesibilidad = {
  botonFlotante: "Consultar por WhatsApp",
  cinta: "Rubros con los que trabaja el estudio",
};

export const noEncontrada = {
  etiqueta: "Error 404",
  titulo: "Página no encontrada.",
  texto:
    "La dirección puede haber cambiado o contener un error. Desde el inicio se accede a todas las secciones del sitio.",
  accion: "Volver al inicio",
  accionContacto: "Escribirme",
  /** Encabeza la lista de secciones, que es lo que de verdad resuelve un 404. */
  secciones: "Todas las secciones",
};

/** Metadatos por defecto. Cada página puede pisarlos. */
export const meta = {
  titulo: "Visintin Studio · Sistemas web y automatización para PyMEs argentinas",
  descripcion:
    "Ordeno y automatizo el trabajo de PyMEs argentinas. Sitios y sistemas web —catálogos, tiendas online, turnos, cotizadores y paneles— y automatización de procesos con inteligencia artificial aplicada. Todo empieza por un diagnóstico escrito de cómo trabaja la empresa.",
};
