import type { Captura } from "./proyectos";
import { ACCION_DEMO } from "./turnos-acciones";

/**
 * Visintin Turnos: la página de ventas del producto.
 *
 * Es la única página del sitio que vende un producto y no un servicio, y le
 * habla a otra persona: el dueño de un consultorio o centro médico de dos a
 * quince profesionales, que la lee desde el celular entre un paciente y otro.
 * Por eso el tono es más directo que el del resto del sitio —frases cortas,
 * "plata" en vez de "dinero", botones que proponen— y no hay que "corregirlo"
 * para que coincida con las demás páginas.
 *
 * Lo que sí se mantiene es la primera persona del singular. El texto original
 * estaba en plural —"te mostramos", "un número nuestro"— y la página del
 * estudio se titula "Una persona, no una agencia": el plural en una página y
 * el singular en la otra es el tipo de contradicción que se registra sin
 * poder decir por qué.
 *
 * ── Lo que esta página no puede decir ──
 *
 * No hay clientes todavía, así que no hay testimonios, ni logos, ni cantidad
 * de consultorios, ni porcentajes de mejora. No se inventa ninguno. Tampoco se
 * promete un resultado: "mirá cuánto estás perdiendo" se puede decir,
 * "recuperá la mitad de tus turnos" no. Y no se dice que el producto tenga
 * historia clínica, facturación, pagos, señas, aplicación nativa ni
 * inteligencia artificial: no los tiene.
 */

/**
 * La página existe pero todavía no se anuncia.
 *
 * En `false` no entra al sitemap, se marca `noindex` y no se enlaza desde el
 * pie ni desde Servicios: se puede abrir escribiendo la dirección, que es lo
 * que hace falta para revisarla, y nada más. Se pasa a `true` cuando el demo
 * tenga dirección pública y los recordatorios por WhatsApp salgan de verdad;
 * antes de eso, la página vendería algo que no se puede probar.
 */
export const TURNOS_PUBLICADA = false;

/**
 * Las direcciones de los dos demos.
 *
 * Vacías significa que el producto todavía no está publicado. Con cualquiera
 * de las dos vacía, la sección "Probalo ahora" directamente no existe: una
 * sección que invita a probar algo que no se puede abrir es peor que no
 * tenerla. Con las dos cargadas aparecen las pestañas, el demo embebido en
 * escritorio, el código QR y el botón de abrir en el celular, y el segundo
 * botón de la portada pasa a decir "Probalo ahora".
 *
 * El tipo es `string` a secas y no el literal vacío: con `as const`, el día
 * que se cargara una dirección la comparación de abajo dejaba de compilar.
 *
 * Para embeber el demo hace falta además que la aplicación de turnos permita
 * que este sitio la muestre adentro de un marco. Eso se configura allá.
 */
export const DEMOS: Record<"consultorio" | "clinica", string> = {
  consultorio: "",
  clinica: "",
};

export const demoDisponible = DEMOS.consultorio !== "" && DEMOS.clinica !== "";

/**
 * Una captura del producto. Las de escritorio llevan además un recorte para
 * el celular: la pantalla entera reducida a 340 px no se lee, así que ahí se
 * muestra un pedazo casi a tamaño real. Los genera `procesar-turnos.mjs`.
 */
export type CapturaDeTurnos = Captura & {
  movil?: { archivo: string; ancho: number; alto: number };
};

/** El pie de todas las capturas. Se dice siempre: los números son de mentira. */
const DATOS_FICTICIOS = "Consultorio de demostración, con datos ficticios.";

export const capturasTurnos = {
  reserva: {
    archivo: "reserva",
    carpeta: "turnos",
    alt: "La página de reserva vista en un celular: arriba el atajo «Lo antes posible» con el primer turno libre y un botón para reservarlo, y debajo la lista de profesionales con su próximo horario.",
    pie: DATOS_FICTICIOS,
    ancho: 780,
    alto: 1463,
    formato: "movil",
  },
  especialidades: {
    archivo: "especialidades",
    carpeta: "turnos",
    alt: "El primer paso de la reserva en un centro médico: la lista de especialidades, cada una con su profesional y su próximo turno.",
    pie: DATOS_FICTICIOS,
    ancho: 780,
    alto: 1463,
    formato: "movil",
  },
  agenda: {
    archivo: "agenda",
    carpeta: "turnos",
    alt: "La agenda de la semana de un consultorio: una columna por día con los turnos de cada profesional y el porcentaje de ocupación de cada jornada.",
    pie: DATOS_FICTICIOS,
    ancho: 1366,
    alto: 840,
    formato: "escritorio",
    movil: { archivo: "agenda-movil", ancho: 480, alto: 500 },
  },
  resultados: {
    archivo: "resultados",
    carpeta: "turnos",
    alt: "La pantalla de resultados: cuántos turnos se recuperaron en el mes y a cuánta plata equivalen, el ausentismo por mes y cuántos pacientes respondieron al recordatorio.",
    pie: DATOS_FICTICIOS,
    ancho: 1366,
    alto: 775,
    formato: "escritorio",
    movil: { archivo: "resultados-movil", ancho: 480, alto: 205 },
  },
} as const satisfies Record<string, CapturaDeTurnos>;

export const turnos = {
  etiqueta: "Visintin Turnos",

  portada: {
    /**
     * Dos líneas, cortadas a mano, con la misma máscara que el hero.
     * Va en `.t-titulo` y no en `.t-display`: comparte el ancho con el
     * celular de la derecha y el tamaño del hero no entraría en media página.
     */
    titulo: ["Que el sillón", "no quede vacío."],
    bajada:
      "Tus pacientes sacan turno solos desde el celular, reciben un recordatorio por WhatsApp y te avisan con un toque si no pueden venir. Vos ves cuánta plata dejaste de perder.",
    accion: ACCION_DEMO,
    accionSecundaria: "Probalo ahora",
    /** Sin demo publicado no hay nada que probar: el botón lleva al recorrido. */
    accionSecundariaSinDemo: "Ver cómo funciona",
    nota: "Sin app. Sin cuenta. Tu paciente de 70 años lo usa sin ayuda.",
  },

  calculadora: {
    etiqueta: "El problema",
    titulo: "¿Cuánto te cuesta un turno que no viene?",
    campos: {
      turnos: "Turnos por mes",
      faltan: "De cada 10, cuántos faltan sin avisar",
      valor: "Valor de una consulta",
    },
    /** Los valores con los que arranca. Son un ejemplo, no un promedio. */
    inicial: { turnos: 400, faltan: 1, valor: 40_000 },
    /** El selector de ausencias: de medio turno a tres, de a medio. */
    faltanMinimo: 0.5,
    faltanMaximo: 3,
    faltanPaso: 0.5,
    resultadoAntes: "Estás perdiendo",
    resultadoDespues: "por mes.",
    debajo: "Y eso sin contar el tiempo de tu secretaria persiguiendo confirmaciones.",
    /** Obligatoria. Es lo que separa una cuenta de una promesa. */
    aclaracion:
      "Es una cuenta con los números que cargues, no una promesa. Cuánto recupera cada consultorio depende de sus pacientes.",
    accion: "Ver cómo se recupera",
  },

  probar: {
    etiqueta: "Probalo",
    titulo: "Sacá un turno de prueba. Tardás 30 segundos.",
    bajada:
      "Esto es exactamente lo que va a ver tu paciente. Con tu logo y tus colores, no los de la demostración.",
    opciones: {
      consultorio: { nombre: "Soy un consultorio", apoyo: "El paciente elige directamente con quién atenderse." },
      clinica: {
        nombre: "Somos un centro médico",
        apoyo: "Con varias especialidades, el paciente elige primero cuál busca.",
      },
    },
    qr: "O abrilo desde tu celular",
    abrir: "Abrir el demo",
    /** El enlace de escritorio, al lado del QR. Está siempre a la vista. */
    abrirAparte: "Abrirlo en otra pestaña",
    nota: "Es un consultorio de demostración, con datos ficticios. Poné cualquier número de celular: no se le manda nada a nadie.",
  },

  pasos: {
    etiqueta: "El recorrido",
    titulo: "Cómo funciona.",
    lista: [
      {
        nombre: "El paciente reserva solo",
        texto:
          "Entra al link de tu consultorio, elige día y horario, y listo. Si dos personas tocan el mismo horario a la vez, solo una se lo lleva: nunca hay dos turnos pisados.",
        // La portada ya muestra la pantalla del atajo; acá va el paso anterior.
        ilustracion: "especialidades",
      },
      {
        nombre: "Tu secretaria lo ve aparecer",
        texto:
          "El turno entra a la agenda en el momento. Y si alguien llama por teléfono, lo carga en 15 segundos con dos teclas.",
        ilustracion: "agenda",
      },
      {
        nombre: "El día anterior, WhatsApp pregunta",
        texto:
          "«¿Nos confirmás si venís?» Con dos botones. Si toca Cancelo, el horario se libera solo y lo puede tomar otro paciente.",
        ilustracion: "chat",
      },
      {
        nombre: "Vos ves el resultado",
        texto:
          "Cuántos turnos recuperaste, cuánta plata es y cómo bajó el ausentismo. Cada número te explica cómo se calcula.",
        ilustracion: "resultados",
      },
    ],
  },

  /**
   * La conversación de WhatsApp del tercer paso.
   *
   * Está escrita en HTML y no es una captura, y es una decisión: la única
   * captura del chat mide 320 px de ancho y muestra una dirección de
   * `localhost` adentro del mensaje. Los textos son los que manda el sistema,
   * con los datos del consultorio de demostración. Cuando haya una captura
   * buena del chat real, se puede reemplazar.
   */
  chat: {
    consultorio: "Consultorio Demo",
    cuenta: "Cuenta de empresa",
    recordatorio:
      "Hola Juan, te recordamos tu turno de mañana lunes 5 de octubre a las 09:30 con la Dra. Galiano en Consultorio Demo. ¿Nos confirmás si venís?",
    confirmo: "Confirmo",
    cancelo: "Cancelo",
    respuesta: "Hola Juan, tu turno del lunes 5 de octubre a las 09:30 en Consultorio Demo quedó cancelado.",
    hora: "18:00",
    pie: "El recordatorio, tal como le llega al paciente. Datos de demostración.",
    descripcion:
      "Conversación de WhatsApp: el consultorio recuerda el turno del día siguiente y ofrece dos botones, Confirmo y Cancelo. El paciente toca Cancelo y recibe la confirmación de que el turno quedó cancelado.",
  },

  incluye: {
    etiqueta: "El producto",
    titulo: "Lo que incluye.",
    lista: [
      { nombre: "Reserva online", texto: "Sin app ni cuenta. Funciona en cualquier celular." },
      { nombre: "«Lo antes posible»", texto: "El primer turno libre, a un toque." },
      { nombre: "Recordatorio por WhatsApp", texto: "Con botones para confirmar o cancelar." },
      { nombre: "Cancelación con un link", texto: "El paciente cambia o cancela solo, sin llamar." },
      { nombre: "Agenda en vivo", texto: "Lo que pasa, se ve al instante. Vista del día y de la semana." },
      { nombre: "Varias especialidades", texto: "En una clínica, el paciente elige primero cuál busca." },
      { nombre: "Pacientes que faltan", texto: "La ficha avisa quién faltó más de una vez." },
      {
        nombre: "Pacientes que no volvieron",
        texto: "La lista de quienes hace meses no vienen, con el mensaje listo para invitarlos.",
      },
      { nombre: "Pedido de reseñas", texto: "Después del turno, un mensaje pide la opinión en Google." },
      { nombre: "Resultados en pesos", texto: "Y un reporte en PDF para mostrarles a tus socios." },
      { nombre: "Tu marca", texto: "La página de reservas lleva tu logo y tu color." },
      { nombre: "Cada uno ve lo suyo", texto: "Recepción, profesionales y dueño, cada uno con su acceso." },
    ],
  },

  encaje: {
    etiqueta: "Para quién es",
    titulo: "Para quién es, y para quién no.",
    si: {
      titulo: "Es para vos si…",
      lista: [
        "Das turnos por teléfono o por WhatsApp.",
        "Tenés pacientes que faltan sin avisar.",
        "Querés saber cuánto perdés por eso.",
        "Tu secretaria pierde horas confirmando.",
      ],
    },
    no: {
      titulo: "No es para vos si…",
      lista: [
        "Necesitás historia clínica electrónica.",
        "Necesitás facturar a obras sociales.",
        "Querés cobrar señas online.",
        "Atendés por orden de llegada.",
      ],
    },
    cierre:
      "Hace una sola cosa: que la agenda se llene y la gente venga. Se usa al lado del sistema que ya tengas.",
  },

  datos: {
    etiqueta: "Privacidad",
    titulo: "Tus datos y los de tus pacientes.",
    lista: [
      "Solo se guarda lo necesario para dar un turno: nombre, teléfono y obra social. Nada clínico.",
      "Cada consultorio ve únicamente sus datos.",
      "Si un día no querés seguir, te entrego tus datos.",
    ],
  },

  preguntas: {
    etiqueta: "Antes de decidir",
    titulo: "Preguntas frecuentes.",
  },

  cierre: {
    titulo: "Veamos cuántos turnos estás perdiendo.",
    bajada:
      "Quince minutos por videollamada. Te muestro el sistema andando y hago la cuenta con tus números.",
    accion: "Pedir una demo por WhatsApp",
    alternativa: "O por correo:",
  },

};

/**
 * Las preguntas, en el orden en que las hace alguien que está por decidir.
 *
 * Tres respuestas afirman algo del servicio que hay que poder sostener el día
 * que alguien pregunte: el mes de prueba, el alta en menos de una hora y el
 * número desde el que salen los mensajes. Están anotadas en PENDIENTES.md
 * para confirmarlas antes de publicar.
 */
export const preguntasTurnos = [
  {
    pregunta: "¿Mis pacientes tienen que bajarse algo?",
    respuesta: "No. Un link y WhatsApp.",
  },
  {
    pregunta: "Mis pacientes son grandes, ¿se van a animar?",
    respuesta:
      "Probalo vos desde tu celular: es más fácil que mandar un audio. Y el que prefiera llamar, llama: tu secretaria lo carga en segundos.",
  },
  {
    pregunta: "Ya doy turnos por WhatsApp y funciona.",
    respuesta:
      "Perfecto, tus pacientes ya están ahí. Esto hace lo mismo sin que alguien tenga que contestar uno por uno, y además recuerda el turno solo.",
  },
  {
    pregunta: "¿Reemplaza mi sistema actual?",
    respuesta: "No hace falta. No es historia clínica ni facturación: se usa al lado.",
  },
  {
    pregunta: "¿Cuánto tarda en estar andando?",
    respuesta:
      "El alta lleva menos de una hora. Te ayudo a cargar profesionales, horarios y prestaciones.",
  },
  {
    pregunta: "¿Desde qué número salen los mensajes?",
    respuesta:
      "Desde un número del sistema. El mensaje dice de qué consultorio es, así que no tenés que hacer ningún trámite.",
  },
  {
    pregunta: "¿Y si quiero probar antes de decidir?",
    respuesta:
      "Se hace un mes de prueba y se mide. Al final te muestro tus propios números.",
  },
  {
    pregunta: "¿Cuánto cuesta?",
    respuesta: "Depende de cuántos profesionales tengan. Te lo digo en la demo.",
  },
] as const;

/** Para los buscadores y para la miniatura al compartir. */
export const metaTurnos = {
  titulo: "Sistema de turnos para consultorios con recordatorio por WhatsApp",
  descripcion:
    "Tus pacientes sacan turno solos desde el celular y reciben un recordatorio por WhatsApp con botones para confirmar o cancelar. Menos ausencias, medido en pesos.",
};
