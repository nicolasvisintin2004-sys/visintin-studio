/**
 * Las tres cosas que hace el estudio.
 *
 * ── Por qué tres y no más ──
 *
 * Hasta noviembre de 2026 el sitio ofrecía unas veinticuatro cosas con nombre
 * propio: el diagnóstico, dos "líneas", cuatro servicios, nueve entregables,
 * tres ramas, tres planes y el mantenimiento. Muchas eran la misma oferta
 * dicha con otro vocabulario, y la consecuencia era que no se entendía qué
 * vendía el estudio. Lo que de verdad se vende son tres cosas: sitios web,
 * contenido para redes y el sistema de turnos para consultorios. El inicio
 * muestra esas tres, cada una con una prueba real y un solo botón, y cada una
 * tiene su página, que es también el enlace que se usa desde Instagram según
 * a quién se le habla.
 *
 * Si algún día se agrega una cuarta, que sea porque se vende, no porque se
 * puede hacer.
 *
 * ── Cada puerta dice para quién es ──
 *
 * La línea `para` reemplaza a la vieja cinta de rubros: en vez de una lista
 * de ocho tipos de negocio, cada puerta nombra al que le sirve. Las agencias
 * de autos van en la primera porque es el rubro con el que se empieza a
 * prospectar; no hay todavía un caso de una agencia, y por eso dice "para" y
 * no "trabajo con".
 */

export type Puerta = {
  slug: "sitios-web" | "redes" | "turnos";
  nombre: string;
  /** A quién le sirve. Una línea. */
  para: string;
  texto: string;
  /** La página de la puerta. La de turnos sólo se enlaza si está publicada. */
  href: string;
  accion: string;
};

export const puertas = {
  sitiosWeb: {
    slug: "sitios-web",
    nombre: "Sitios web",
    para: "Para fábricas, agencias de autos y comercios.",
    texto:
      "Un lugar propio al que mandar a quien te encuentra en Instagram. Cada producto o unidad con su página, la información en texto y las consultas con los datos necesarios para presupuestar.",
    href: "/sitios-web",
    accion: "Ver sitios web",
  },
  redes: {
    slug: "redes",
    nombre: "Contenido para redes",
    para: "Para marcas que venden por Instagram.",
    texto:
      "Las publicaciones de la cuenta, pensadas para lo que la marca necesita, y mensajes que le responden solos a cada comentario. Con precio fijo.",
    href: "/redes",
    accion: "Ver contenido para redes",
  },
  turnos: {
    slug: "turnos",
    nombre: "Sistema de turnos",
    para: "Para consultorios y centros médicos.",
    texto:
      "El paciente saca turno solo desde un link y el día anterior le llega un WhatsApp para confirmar o cancelar. Si cancela, el horario se libera para otro.",
    href: "/turnos",
    accion: "Ver el sistema de turnos",
  },
} as const satisfies Record<string, Puerta>;
