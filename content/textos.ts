import type { Idioma, Lista, Texto } from "@/lib/i18n";

/**
 * Todos los textos de interfaz, con su traducción al lado.
 *
 * Se guardan en pares y no en dos archivos separados a propósito: si falta
 * una traducción, TypeScript lo marca en el momento de escribirla y no
 * aparece un hueco en inglés en producción.
 */

type Seccion = Record<string, Texto | Lista>;

type Localizada<T extends Seccion> = {
  [K in keyof T]: T[K] extends Lista ? readonly string[] : string;
};

/** Devuelve una sección entera ya resuelta al idioma pedido. */
export function seccion<T extends Seccion>(
  obj: T,
  idioma: Idioma,
): Localizada<T> {
  const salida = {} as Localizada<T>;
  for (const clave of Object.keys(obj) as (keyof T)[]) {
    // @ts-expect-error el mapeo de tipos ya garantiza la forma
    salida[clave] = obj[clave][idioma];
  }
  return salida;
}

export const nav = {
  trabajo: { es: "Trabajo", en: "Work" },
  planes: { es: "Planes", en: "Plans" },
  estudio: { es: "Estudio", en: "Studio" },
  notas: { es: "Notas", en: "Notes" },
  contacto: { es: "Contacto", en: "Contact" },
  whatsapp: { es: "WhatsApp", en: "WhatsApp" },
  menu: { es: "Menú", en: "Menu" },
  cerrar: { es: "Cerrar", en: "Close" },
  saltar: { es: "Saltar al contenido", en: "Skip to content" },
  principal: { es: "Principal", en: "Main" },
  escribime: { es: "Escribime por WhatsApp", en: "Message me on WhatsApp" },
  cambiarIdioma: { es: "Cambiar a inglés", en: "Switch to Spanish" },
} as const;

export const pie = {
  descripcion: {
    es: "Sitios web para PyMEs argentinas. Trabajo con clientes de todo el país.",
    en: "Websites for Argentine small businesses. I work with clients across the country.",
  },
  ciudad: { es: "Buenos Aires, Argentina", en: "Buenos Aires, Argentina" },
  pie: { es: "Pie", en: "Footer" },
} as const;

export const comun = {
  verTodo: { es: "Ver todo", en: "See all" },
  verDetalle: { es: "Ver el detalle", en: "See the details" },
  sobreMi: { es: "Sobre mí", en: "About me" },
  volverInicio: { es: "Volver al inicio", en: "Back to home" },
  capturaPendiente: { es: "Captura pendiente", en: "Screenshot pending" },
  fotoPendiente: { es: "Foto pendiente", en: "Photo pending" },
  enDesarrollo: { es: "En desarrollo", en: "In progress" },
  entregado: { es: "Entregado", en: "Delivered" },
  disponibilidad: { es: "Disponibilidad", en: "Availability" },
  migas: { es: "Migas de pan", en: "Breadcrumbs" },
  inicio: { es: "Inicio", en: "Home" },
  minLectura: { es: "min de lectura", en: "min read" },
  cierreTitulo: { es: "¿Charlamos 15 minutos?", en: "Got 15 minutes to talk?" },
} as const;

export const metricas = {
  titulo: { es: "Rendimiento medido", en: "Measured performance" },
  sinDatos: { es: "Sin datos aún", en: "No data yet" },
  movil: { es: "móvil", en: "mobile" },
  escritorio: { es: "escritorio", en: "desktop" },
} as const;

export const contador = {
  etiqueta: { es: "Esta página cargó en", en: "This page loaded in" },
} as const;

export const home = {
  eyebrow: {
    es: "Desarrollo web · Buenos Aires",
    en: "Web development · Buenos Aires",
  },
  titulo: {
    es: "Sitios web para PyMEs argentinas que en persona convencen y en Google no aparecen.",
    en: "Websites for Argentine businesses that win people over in person and don't show up on Google.",
  },
  subtitulo: {
    es: "Next.js, SEO técnico y contacto directo por WhatsApp. Rápidos de verdad, medibles y tuyos.",
    en: "Next.js, technical SEO and direct contact over WhatsApp. Genuinely fast, measurable, and yours.",
  },
  verTrabajos: { es: "Ver trabajos", en: "See my work" },
  problemaEyebrow: { es: "Por qué importa", en: "Why it matters" },
  problemas: {
    es: [
      "No aparecés en Google.",
      "Si alguien busca lo que hacés y no te conoce por nombre, hoy encuentra a tu competencia.",
      "Las consultas se pierden en el DM.",
      "Instagram no muestra medidas, especificaciones ni precios. El que compara se va con el que sí se los muestra.",
      "Te ves más chico de lo que sos.",
      "Un negocio de veinte años con un perfil de Instagram y nada más transmite menos solidez de la que tiene.",
    ],
    en: [
      "You don't show up on Google.",
      "If someone searches for what you do and doesn't know your name, today they find your competition.",
      "Enquiries get lost in the DMs.",
      "Instagram doesn't show dimensions, specs or prices. Anyone comparing options goes with whoever does show them.",
      "You look smaller than you are.",
      "A twenty-year-old business with an Instagram profile and nothing else comes across as less solid than it is.",
    ],
  },
  simuladorEyebrow: { es: "Lo que ve tu cliente", en: "What your customer sees" },
  simuladorTitulo: {
    es: "Así te encuentran hoy. Así te podrían encontrar.",
    en: "This is how they find you today. This is how they could.",
  },
  simuladorBajada: {
    es: "La mayoría de tus clientes te busca antes de escribirte. Lo que aparece ahí decide si te escriben o no.",
    en: "Most of your customers look you up before they message you. What comes up decides whether they message you at all.",
  },
  simuladorNota: {
    es: "Simulación · no es una búsqueda real",
    en: "Simulation · not a real search",
  },
  trabajoEyebrow: { es: "Trabajo seleccionado", en: "Selected work" },
  verProyecto: { es: "Ver el proyecto", en: "See the project" },
  procesoEyebrow: { es: "El proceso", en: "The process" },
  quienEyebrow: { es: "Quién está atrás", en: "Who's behind this" },
  quienTitulo: {
    es: "Soy una persona, no una agencia.",
    en: "I'm one person, not an agency.",
  },
  quienTexto: {
    es: "Visintin Studio es Nicolás Visintin. Cuando escribís, te contesto yo. Cuando algo se rompe, lo arreglo yo. No hay cuenta que te derive a un equipo que nunca conociste.",
    en: "Visintin Studio is Nicolás Visintin. When you write, I answer. When something breaks, I fix it. There's no account manager handing you off to a team you never met.",
  },
  quienEnlace: {
    es: "Cómo trabajo, en detalle",
    en: "How I work, in detail",
  },
  metaTitulo: {
    es: "Visintin Studio · Desarrollo web para PyMEs argentinas",
    en: "Visintin Studio · Web development for Argentine small businesses",
  },
  metaDescripcion: {
    es: "Sitios web para PyMEs argentinas que en persona convencen y en Google no aparecen. Rápidos, medibles y tuyos. Planes desde USD 450, con precio a la vista.",
    en: "Websites for Argentine businesses that win people over in person and don't show up on Google. Fast, measurable and yours. Plans from USD 450, prices in plain sight.",
  },
} as const;

export const paginaPlanes = {
  eyebrow: { es: "Planes y precios", en: "Plans and pricing" },
  titulo: {
    es: "Tres formas de empezar. Los precios están acá.",
    en: "Three ways to start. The prices are right here.",
  },
  bajada: {
    es: "Cotizo en dólares y cobro en pesos al MEP del día de pago. El mantenimiento está incluido en los tres.",
    en: "I quote in US dollars and charge in pesos at the MEP rate on the day of payment. Maintenance is included in all three.",
  },
  recomendado: { es: "Recomendado", en: "Recommended" },
  consultarPor: { es: "Consultar por", en: "Ask about" },
  incluidoEnTres: {
    es: "Incluido en los tres",
    en: "Included in all three",
  },
  vaConCualquiera: {
    es: "Va con cualquiera de los tres",
    en: "Comes with any of the three",
  },
  comparacion: { es: "Comparación", en: "Comparison" },
  comparacionTitulo: {
    es: "Comparación de los tres planes",
    en: "Comparison of the three plans",
  },
  caracteristica: { es: "Característica", en: "Feature" },
  porMes: { es: "/mes", en: "/mo" },
  filas: {
    es: [
      "Páginas",
      "Rondas de revisiones",
      "Redacción de textos",
      "Datos estructurados",
      "Blog",
      "Mantenimiento sin cargo",
    ],
    en: [
      "Pages",
      "Rounds of revisions",
      "Copywriting",
      "Structured data",
      "Blog",
      "Free maintenance",
    ],
  },
  valores: {
    es: [
      "1",
      "5 a 7",
      "5 a 7 en dos idiomas",
      "1",
      "3",
      "3",
      "—",
      "—",
      "Incluida",
      "—",
      "Sí",
      "Sí",
      "—",
      "—",
      "Con 3 artículos",
      "1 mes",
      "3 meses",
      "6 meses",
    ],
    en: [
      "1",
      "5 to 7",
      "5 to 7 in two languages",
      "1",
      "3",
      "3",
      "—",
      "—",
      "Included",
      "—",
      "Yes",
      "Yes",
      "—",
      "—",
      "With 3 articles",
      "1 month",
      "3 months",
      "6 months",
    ],
  },
  metaTitulo: { es: "Planes y precios", en: "Plans and pricing" },
  metaDescripcion: {
    es: "Tres planes de desarrollo web con el precio a la vista: USD 450, USD 800 y USD 1.200. Qué incluye cada uno, mantenimiento y una calculadora para saber cuál te conviene.",
    en: "Three web development plans with prices in plain sight: USD 450, USD 800 and USD 1,200. What each one includes, maintenance, and a calculator to find the right fit.",
  },
} as const;

export const calculadora = {
  eyebrow: { es: "¿Cuál me conviene?", en: "Which one fits me?" },
  titulo: {
    es: "Cuatro preguntas y te digo cuál, con el motivo.",
    en: "Four questions and I'll tell you which one, and why.",
  },
  resultado: { es: "Resultado", en: "Result" },
  teConviene: { es: "Te conviene", en: "Your best fit" },
  escribimeCon: {
    es: "Escribime con este plan",
    en: "Message me about this plan",
  },
  espera: {
    es: "Respondé las cuatro y acá aparece el plan que te conviene, con el motivo. No se guarda nada ni se envía a ningún lado.",
    en: "Answer all four and the right plan shows up here, with the reasoning. Nothing is stored or sent anywhere.",
  },
  aria: {
    es: "Comparar resultados de búsqueda",
    en: "Compare search results",
  },
  preguntas: {
    es: [
      "¿Cuántos productos o modelos distintos vendés?",
      "¿Tenés sitio hoy?",
      "¿Recibís más consultas de las que podés atender, o menos?",
      "¿Te llegan clientes del exterior?",
    ],
    en: [
      "How many different products or models do you sell?",
      "Do you have a website today?",
      "Do you get more enquiries than you can handle, or fewer?",
      "Do you get customers from abroad?",
    ],
  },
  opciones: {
    es: [
      "1 o 2",
      "3 a 8",
      "Más de 8",
      "No",
      "Sí, pero viejo",
      "Sí, y funciona",
      "Más",
      "Menos",
      "Sí",
      "No",
    ],
    en: [
      "1 or 2",
      "3 to 8",
      "More than 8",
      "No",
      "Yes, but it's old",
      "Yes, and it works",
      "More",
      "Fewer",
      "Yes",
      "No",
    ],
  },
  razones: {
    es: [
      "Te llegan clientes del exterior, así que el sitio tiene que estar en dos idiomas. Sin eso, el que entra desde afuera se va antes de entender qué vendés.",
      "Recibís menos consultas de las que podés atender: el problema no es convertir, es que todavía no te encuentran. Eso se resuelve con contenido y palabras clave, no con una landing más linda.",
      "Tenés varios modelos y ya te llegan consultas. Lo que falta es que cada uno tenga su página con la ficha técnica en texto, para que el que compara pueda comparar sin escribirte.",
      "Uno o dos productos y todavía sin sitio: lo primero es tener un lugar propio donde caer, con el contacto a un toque. Empezar más arriba sería pagar por cosas que hoy no vas a usar.",
      "Con uno o dos productos y consultas que ya te llegan, lo que necesitás es una página que cierre bien, no un sitio grande. Si más adelante sumás modelos, se amplía sin rehacerlo.",
    ],
    en: [
      "You get customers from abroad, so the site needs to be in two languages. Without that, anyone landing from outside leaves before understanding what you sell.",
      "You get fewer enquiries than you can handle: the problem isn't converting, it's that they still can't find you. That's solved with content and keywords, not a prettier landing page.",
      "You have several models and enquiries already come in. What's missing is a page per model with the specs in text, so whoever is comparing can compare without messaging you.",
      "One or two products and no site yet: the first thing is having a place of your own to land on, with contact one tap away. Starting higher would mean paying for things you won't use yet.",
      "With one or two products and enquiries already coming in, what you need is a page that closes well, not a big site. If you add models later, it grows without being rebuilt.",
    ],
  },
} as const;

export const simulador = {
  consulta: {
    es: "motorhome a medida rosario",
    en: "custom motorhome builder rosario",
  },
  sinSitio: { es: "Sin sitio", en: "No website" },
  conSitio: { es: "Con sitio", en: "With a website" },
  aria: {
    es: "Comparar resultados de búsqueda",
    en: "Compare search results",
  },
  busquedaSimulada: {
    es: "Búsqueda simulada",
    en: "Simulated search",
  },
  facebookTitulo: {
    es: "Tu Fábrica - Publicaciones | Facebook",
    en: "Your Workshop - Posts | Facebook",
  },
  facebookDesc: {
    es: "Iniciar sesión. ¿Olvidaste tu cuenta? o. Crear cuenta nueva. Ahora no.",
    en: "Log in. Forgot account? or. Create new account. Not now.",
  },
  compe1Titulo: {
    es: "Motorhomes a medida en Rosario — 8 modelos con ficha técnica",
    en: "Custom motorhomes in Rosario — 8 models with full specs",
  },
  compe1Desc: {
    es: "Medidas, equipamiento y precios de cada modelo. Presupuesto en el día por WhatsApp. Fabricación propia con garantía escrita.",
    en: "Dimensions, equipment and pricing for every model. Same-day quote over WhatsApp. Built in-house with a written warranty.",
  },
  compe2Titulo: {
    es: "Fábrica de motorhomes y casas rodantes | Presupuesto online",
    en: "Motorhome and caravan workshop | Online quote",
  },
  compe2Desc: {
    es: "Más de 15 años fabricando sobre Sprinter y Ducato. Conocé los modelos disponibles y pedí tu cotización.",
    en: "Over 15 years building on Sprinter and Ducato. See the available models and request your quote.",
  },
  buenoTitulo: {
    es: "Motorhome a medida sobre Sprinter | Fábrica en Rosario",
    en: "Custom motorhome on a Sprinter | Workshop in Rosario",
  },
  buenoDesc: {
    es: "Motorhomes construidos a mano sobre Mercedes-Benz Sprinter. Ficha técnica completa, medidas y equipamiento de cada modelo. Presupuesto por WhatsApp.",
    en: "Motorhomes hand-built on Mercedes-Benz Sprinter. Full specs, dimensions and equipment for every model. Quote over WhatsApp.",
  },
  puntuacion: { es: "Puntuación", en: "Rating" },
  opiniones: { es: "opiniones", en: "reviews" },
  enlaces: {
    es: ["Modelo 4 plazas", "Modelo 6 plazas", "Ficha técnica", "Cómo lo fabricamos"],
    en: ["4-berth model", "6-berth model", "Full specs", "How we build it"],
  },
  negocioNombre: { es: "Tu Fábrica", en: "Your Workshop" },
  negocioRubro: {
    es: "Fabricante de motorhomes · Rosario",
    en: "Motorhome manufacturer · Rosario",
  },
  abierto: { es: "Abierto", en: "Open" },
  cierra: { es: "Cierra 18:00", en: "Closes 6 PM" },
  llamar: { es: "Llamar", en: "Call" },
  comoLlegar: { es: "Cómo llegar", en: "Directions" },
} as const;

export const paginaTrabajo = {
  eyebrow: { es: "Trabajo", en: "Work" },
  titulo: {
    es: "Cada proyecto, con sus números.",
    en: "Every project, with its numbers.",
  },
  bajada: {
    es: "Abajo de cada caso están las métricas de rendimiento medidas, no estimadas. Es lo que le pido a cualquiera que diga que hace sitios rápidos.",
    en: "Under each case are the performance metrics as measured, not estimated. It's what I'd ask of anyone who claims to build fast websites.",
  },
  queSigue: { es: "Qué sigue", en: "What's next" },
  queSigueTexto: {
    es: "Hoy hay un proyecto en curso. Prefiero mostrar uno con los números adelante que llenar la página con maquetas que nunca se publicaron.",
    en: "Right now there's one project in progress. I'd rather show one with the numbers up front than fill the page with mockups that were never published.",
  },
  cierre: {
    es: "¿Querés que el próximo sea el tuyo?",
    en: "Want the next one to be yours?",
  },
  metaDescripcion: {
    es: "Proyectos de desarrollo web para PyMEs argentinas, con las métricas de rendimiento reales de cada sitio: LCP, CLS y score de Lighthouse en móvil.",
    en: "Web development projects for Argentine small businesses, with each site's real performance metrics: LCP, CLS and mobile Lighthouse score.",
  },
} as const;

export const caso = {
  resultado: { es: "Resultado", en: "Result" },
  resultadoTitulo: {
    es: "Los números, no los adjetivos.",
    en: "The numbers, not the adjectives.",
  },
  situacion: { es: "La situación", en: "The situation" },
  construido: { es: "Qué construí", en: "What I built" },
  capturas: { es: "Capturas", en: "Screenshots" },
  vistas: {
    es: ["Página de modelo", "Vista móvil"],
    en: ["Model page", "Mobile view"],
  },
  pendiente: { es: "pendiente", en: "pending" },
  stack: { es: "Stack", en: "Stack" },
  verEnVivo: { es: "Ver el sitio en vivo", en: "See the live site" },
  noPublicado: {
    es: "Sitio aún no publicado",
    en: "Site not published yet",
  },
  avisoEnDesarrollo: {
    es: "Proyecto en curso: el sitio todavía no está publicado. Las métricas de abajo son de una compilación de producción previa al deploy y se vuelven a medir contra el dominio real cuando salga.",
    en: "Project in progress: the site isn't published yet. The metrics below come from a production build made before deployment, and will be measured again against the real domain once it's live.",
  },
  sinResultados: {
    es: "Los resultados de negocio —consultas por mes e impresiones en búsqueda— se publican acá cuando el sitio lleve tiempo en línea y haya datos para mostrar. Antes de eso serían inventados.",
    en: "Business results — enquiries per month and search impressions — get published here once the site has been live long enough to have data. Before that, they'd be made up.",
  },
  cierre: {
    es: "¿Tenés un proyecto parecido?",
    en: "Got a similar project?",
  },
  comparadorAyuda: {
    es: "Arrastrá el divisor, o movelo con las flechas del teclado",
    en: "Drag the divider, or move it with the arrow keys",
  },
  comparadorAria: {
    es: "Comparar el sitio anterior con el nuevo",
    en: "Compare the old site with the new one",
  },
  antes: { es: "Antes", en: "Before" },
  despues: { es: "Después", en: "After" },
  sitioNuevo: { es: "El sitio nuevo", en: "The new site" },
} as const;

export const paginaEstudio = {
  eyebrow: { es: "El estudio", en: "The studio" },
  titulo: {
    es: "Soy una persona, no una agencia.",
    en: "I'm one person, not an agency.",
  },
  bajada: {
    es: "Visintin Studio es Nicolás Visintin. Cuando escribís, te contesto yo; cuando algo se rompe, lo arreglo yo. No hay cuenta que te derive a un equipo que nunca conociste.",
    en: "Visintin Studio is Nicolás Visintin. When you write, I answer; when something breaks, I fix it. There's no account manager handing you off to a team you never met.",
  },
  edad: { es: "Edad", en: "Age" },
  de: { es: "De", en: "From" },
  estudia: { es: "Estudia", en: "Studying" },
  carrera: {
    es: "Ing. Industrial · UADE",
    en: "Industrial Engineering · UADE",
  },
  bio: {
    es: [
      "Me llamo Nicolás Visintin, tengo 19 años y soy de Carmen de Patagones. Vivo en Buenos Aires y estudio Ingeniería Industrial en UADE.",
      "Empecé haciendo sitios para negocios que conocía y me encontré siempre con la misma escena: empresas con veinte años de oficio, productos que se venden solos cuando alguien los ve de cerca, y toda su presencia reducida a un perfil de Instagram donde las medidas se piden por mensaje privado.",
      "Me terminé enfocando en fábricas de motorhomes y talleres de conversión por una razón práctica: son productos caros, técnicos y que se comparan mucho antes de comprarse. El que está por gastar USD 50.000 lee todo, mide todo y compara todo. Un negocio así no necesita un sitio lindo: necesita uno que conteste las preguntas antes de que las haga.",
      "Lo de Ingeniería Industrial no es un dato suelto. Es la carrera de medir procesos y sacar lo que no aporta, que es bastante parecido a lo que hago acá.",
    ],
    en: [
      "My name is Nicolás Visintin, I'm 19 and I'm from Carmen de Patagones. I live in Buenos Aires and study Industrial Engineering at UADE.",
      "I started building sites for businesses I knew and kept running into the same scene: companies with twenty years of craft, products that sell themselves once someone sees them up close, and their entire presence reduced to an Instagram profile where dimensions get asked for by private message.",
      "I ended up focusing on motorhome factories and conversion workshops for a practical reason: they're expensive, technical products that get compared at length before anyone buys. Someone about to spend USD 50,000 reads everything, measures everything and compares everything. A business like that doesn't need a pretty site: it needs one that answers the questions before they're asked.",
      "The Industrial Engineering part isn't a loose detail. It's the degree about measuring processes and removing what doesn't contribute, which is fairly close to what I do here.",
    ],
  },
  comoTrabajo: { es: "Cómo trabajo", en: "How I work" },
  comoTrabajoTitulo: {
    es: "Cuatro pasos con plazos que se cumplen.",
    en: "Four steps with deadlines that hold.",
  },
  faqEyebrow: { es: "Preguntas frecuentes", en: "Frequently asked" },
  cierre: { es: "¿Lo charlamos?", en: "Shall we talk?" },
  metaDescripcion: {
    es: "Quién está atrás de Visintin Studio, cómo trabajo paso a paso con plazos reales y las respuestas a las preguntas que conviene hacer antes de contratar a alguien.",
    en: "Who's behind Visintin Studio, how I work step by step with real deadlines, and answers to the questions worth asking before hiring anyone.",
  },
} as const;

export const paginaNotas = {
  eyebrow: { es: "Notas", en: "Notes" },
  titulo: {
    es: "Lo que normalmente se explica por WhatsApp, escrito.",
    en: "What normally gets explained over WhatsApp, written down.",
  },
  bajada: {
    es: "Precios, plazos y criterios para decidir. Sin tecnicismos y sin vender nada en el medio.",
    en: "Prices, timelines and criteria for deciding. No jargon and nothing being sold in between.",
  },
  cierre: {
    es: "¿Te quedó una duda que no está acá?",
    en: "Still have a question that isn't here?",
  },
  cierreNota: {
    es: "¿Querés un presupuesto sin vueltas?",
    en: "Want a straight quote?",
  },
  metaDescripcion: {
    es: "Notas sobre precios, plazos y decisiones técnicas de sitios web para PyMEs argentinas. Escritas para dueños de negocio, no para desarrolladores.",
    en: "Notes on pricing, timelines and technical decisions for small-business websites in Argentina. Written for business owners, not developers.",
  },
} as const;

export const paginaContacto = {
  eyebrow: { es: "Contacto", en: "Contact" },
  titulo: {
    es: "Escribime y te contesto yo.",
    en: "Write to me and I'll answer myself.",
  },
  bajada: {
    es: "La primera charla dura 20 minutos, es por WhatsApp y no tiene costo. De ahí sale si puedo ayudarte o no.",
    en: "The first conversation takes 20 minutes, happens over WhatsApp and costs nothing. That's where we find out whether I can help.",
  },
  viaRapida: { es: "La vía rápida", en: "The fast lane" },
  viaRapidaTexto: {
    es: "Los mensajes que entran en día hábil los respondo el mismo día o al siguiente. No hay bandeja compartida: escribís vos, contesto yo.",
    en: "Messages that come in on a business day get answered the same day or the next. There's no shared inbox: you write, I answer.",
  },
  otraVia: { es: "La otra vía", en: "The other way" },
  contameTitulo: { es: "Contame el proyecto", en: "Tell me about the project" },
  contameTexto: {
    es: "Cuantos más datos me des, más precisa te llega la propuesta. Nada de esto se guarda en ningún servidor.",
    en: "The more detail you give me, the more precise the proposal. None of this is stored on any server.",
  },
  correo: { es: "Correo", en: "Email" },
  zona: { es: "Zona", en: "Area" },
  zonaValor: { es: "Buenos Aires", en: "Buenos Aires" },
  zonaTexto: {
    es: "Trabajo con clientes de todo el país.",
    en: "I work with clients across the country.",
  },
  horario: { es: "Horario", en: "Hours" },
  horarioValor: { es: "Lunes a viernes", en: "Monday to Friday" },
  horarioTexto: {
    es: "Respondo consultas de 9 a 20.",
    en: "I answer enquiries from 9 AM to 8 PM.",
  },
  metaDescripcion: {
    es: "Escribime por WhatsApp y te contesto yo. También podés dejarme los datos de tu proyecto en el formulario o por correo. Trabajo con clientes de toda Argentina.",
    en: "Message me on WhatsApp and I'll answer myself. You can also leave your project details in the form or by email. I work with clients across Argentina.",
  },
} as const;

export const formulario = {
  nombre: { es: "Tu nombre", en: "Your name" },
  negocio: { es: "Tu negocio", en: "Your business" },
  rubro: { es: "Rubro", en: "Industry" },
  presupuesto: { es: "Presupuesto estimado", en: "Estimated budget" },
  necesita: { es: "Qué necesitás", en: "What you need" },
  marcador: {
    es: "Contame qué vendés y qué querés que haga el sitio.",
    en: "Tell me what you sell and what you want the site to do.",
  },
  enviar: {
    es: "Abrir en WhatsApp con esto escrito",
    en: "Open WhatsApp with this filled in",
  },
  aclaracion: {
    es: "Se abre WhatsApp con el mensaje ya armado, para que lo revises antes de mandarlo. Si preferís correo, escribime a",
    en: "WhatsApp opens with the message already written, so you can review it before sending. If you prefer email, write to",
  },
  rubros: {
    es: [
      "Fábrica de motorhomes",
      "Taller de conversión",
      "Metalúrgica",
      "Otro rubro",
    ],
    en: [
      "Motorhome manufacturer",
      "Conversion workshop",
      "Metalworking",
      "Other industry",
    ],
  },
  presupuestos: {
    es: ["Hasta USD 500", "USD 500 a 900", "Más de USD 900", "Todavía no sé"],
    en: [
      "Up to USD 500",
      "USD 500 to 900",
      "More than USD 900",
      "Not sure yet",
    ],
  },
  encabezado: {
    es: "Hola Nico, te escribo desde el sitio.",
    en: "Hi Nico, I'm writing from your site.",
  },
  campoNombre: { es: "Nombre", en: "Name" },
  campoNegocio: { es: "Negocio", en: "Business" },
  campoRubro: { es: "Rubro", en: "Industry" },
  campoPresupuesto: { es: "Presupuesto estimado", en: "Estimated budget" },
  campoNecesita: { es: "Qué necesito", en: "What I need" },
} as const;

export const noEncontrada = {
  eyebrow: { es: "Error 404", en: "Error 404" },
  titulo: { es: "Esta página no existe.", en: "This page doesn't exist." },
  texto: {
    es: "Puede que la haya movido o que el enlace esté mal escrito. Desde el inicio llegás a todo.",
    en: "I may have moved it, or the link may be mistyped. From the home page you can reach everything.",
  },
} as const;

export const mensajesWhatsApp = {
  general: {
    es: "Hola, vi el sitio y quería consultar por un proyecto.",
    en: "Hi, I saw your site and wanted to ask about a project.",
  },
  planes: {
    es: "Hola, quería consultar por uno de los planes.",
    en: "Hi, I wanted to ask about one of the plans.",
  },
  trabajo: {
    es: "Hola, vi tus trabajos y quería consultar por un proyecto.",
    en: "Hi, I saw your work and wanted to ask about a project.",
  },
  estudio: {
    es: "Hola, leí tu página de estudio y quería hacerte una consulta.",
    en: "Hi, I read your studio page and wanted to ask you something.",
  },
} as const;

/** Atajo: resuelve una sección completa en un solo llamado. */
export const textos = {
  nav,
  pie,
  comun,
  metricas,
  contador,
  home,
  paginaPlanes,
  calculadora,
  simulador,
  paginaTrabajo,
  caso,
  paginaEstudio,
  paginaNotas,
  paginaContacto,
  formulario,
  noEncontrada,
  mensajesWhatsApp,
} as const;
