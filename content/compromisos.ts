import type { Idioma, Texto } from "@/lib/i18n";

/**
 * Las tres promesas del servicio, en un solo lugar.
 * Aparecen en la home, en /contacto, en /planes y en las preguntas
 * frecuentes de /estudio: si cambia una condición, se cambia acá y no
 * quedan dos páginas prometiendo cosas distintas.
 */
export type Compromiso = {
  clave: string;
  titulo: string;
  texto: string;
};

const fuente: { clave: string; titulo: Texto; texto: Texto }[] = [
  {
    clave: "respuesta",
    titulo: {
      es: "Te contesto en menos de 24 horas",
      en: "I answer in under 24 hours",
    },
    texto: {
      es: "Los mensajes que entran en día hábil los respondo el mismo día o, como mucho, al siguiente. Si me escribís un domingo a la noche, tenés respuesta el lunes. No hay bandeja compartida ni cuenta que te derive a otro: escribís vos, contesto yo.",
      en: "Messages that arrive on a business day get answered the same day or, at the latest, the next one. Write to me on a Sunday night and you have a reply on Monday. There's no shared inbox and no account manager passing you along: you write, I answer.",
    },
  },
  {
    clave: "conformidad",
    titulo: {
      es: "No se publica un sitio que no te guste",
      en: "No site goes live unless you like it",
    },
    texto: {
      es: "Todos los sitios se hacen a medida de tu negocio: no arranco de una plantilla ni te muestro el resultado recién al final. Vas viendo los avances y me decís qué cambiar, y para eso están las rondas de revisión de cada plan. Nada se publica hasta que estés conforme.",
      en: "Every site is built around your business: I don't start from a template and I don't show you the result only at the end. You see progress as it happens and tell me what to change — that's what each plan's revision rounds are for. Nothing goes live until you're happy with it.",
    },
  },
  {
    clave: "soporte",
    titulo: {
      es: "El soporte sigue después de la entrega",
      en: "Support continues after delivery",
    },
    texto: {
      es: "Una vez publicado el sitio y con vos conforme, el soporte cubre los cambios que aparezcan sobre lo entregado: desde corregir un texto hasta sumar una página nueva. La carga de contenido del día a día —subir fotos, cambiar precios— entra en las horas del mantenimiento mensual.",
      en: "Once the site is live and you're happy with it, support covers changes to what was delivered: from fixing a line of copy to adding a whole new page. Day-to-day content work — uploading photos, changing prices — comes out of the monthly maintenance hours.",
    },
  },
];

export function obtenerCompromisos(idioma: Idioma): Compromiso[] {
  return fuente.map((c) => ({
    clave: c.clave,
    titulo: c.titulo[idioma],
    texto: c.texto[idioma],
  }));
}

export function compromisoPorClave(
  clave: string,
  idioma: Idioma,
): Compromiso | undefined {
  return obtenerCompromisos(idioma).find((c) => c.clave === clave);
}
