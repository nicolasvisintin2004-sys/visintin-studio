export type Pregunta = {
  pregunta: string;
  respuesta: string;
};

/**
 * Las preguntas que aparecen siempre en la primera charla.
 *
 * Están escritas para contestarlas de verdad, no para esquivarlas: la del
 * precio explica por qué unos trabajos tienen el número publicado y otros
 * no, y la del estudio de
 * una sola persona se hace en voz alta porque quien la piensa y no la
 * pregunta se va sin escribir.
 *
 * Esta lista también alimenta el JSON-LD de tipo FAQPage.
 */
export const preguntas: readonly Pregunta[] = [
  {
    pregunta: "¿Cuánto cuesta un proyecto?",
    respuesta:
      "Depende de qué sea. Los servicios de contenido para redes tienen precio fijo y publicado, porque incluyen siempre lo mismo. El de un sitio web depende del alcance, y por eso no se publica: un catálogo de cinco modelos y una página única no tienen el mismo costo. En la primera conversación por WhatsApp, con una descripción breve del negocio, puedo indicarte un rango, y la propuesta cerrada se entrega por escrito dentro de las 48 horas.",
  },
  {
    pregunta: "¿El sitio queda a mi nombre?",
    respuesta:
      "Sí. El dominio, el código y el contenido quedan a nombre del cliente. Si en algún momento decidís cambiar de proveedor, conservás todo.",
  },
  {
    pregunta: "¿Qué ocurre si dejamos de trabajar juntos?",
    respuesta:
      "El sitio está desarrollado con tecnología estándar y documentada, por lo que cualquier desarrollador puede continuarlo. El repositorio y los accesos se entregan desde el inicio del proyecto, no al final.",
  },
  {
    pregunta: "¿Por qué trabajar con un estudio de una sola persona?",
    respuesta:
      "Porque quien responde la consulta es la misma persona que desarrolla y mantiene el sitio, sin intermediarios. Y porque el trabajo puede evaluarse antes de contratar: los proyectos del portfolio están publicados y pueden recorrerse desde este sitio.",
  },
  {
    pregunta: "¿Cuánto tiempo lleva?",
    respuesta:
      "Un sitio lleva entre una y tres semanas a partir de la entrega de textos e imágenes. Lo que más suele demorar un proyecto no es el desarrollo, sino la espera del contenido; por eso, en el plan Completo, la redacción está incluida.",
  },
  {
    pregunta: "¿Cuál es la forma de pago?",
    respuesta:
      "Cincuenta por ciento al inicio y cincuenta por ciento al publicar. Los presupuestos se expresan en dólares y se abonan en pesos, al tipo de cambio MEP del día de pago.",
  },
  {
    pregunta: "¿Se puede avanzar sin fotos ni textos?",
    respuesta:
      "Sí, y es el caso más frecuente. Los textos se redactan a partir de una entrevista de media hora. Si no hay fotografías aptas, el diseño se resuelve con tipografía e información, y las imágenes se incorporan más adelante sin necesidad de rehacer el sitio.",
  },
  {
    pregunta: "¿Trabajás con clientes de otras provincias?",
    respuesta:
      "Sí. El estudio está en Buenos Aires y trabaja a distancia con todo el país; Taller Italia, uno de los proyectos publicados, es una fábrica de Mendoza, y todo el trabajo se hizo a distancia. El proceso se realiza por WhatsApp y videollamada.",
  },
];
