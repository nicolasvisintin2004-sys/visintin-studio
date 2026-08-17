import type { Idioma, Texto } from "@/lib/i18n";

/**
 * El proceso, en un solo lugar.
 *
 * El plazo es el elemento dominante a propósito. El miedo de una PyME que
 * nunca contrató a un desarrollador no es el precio: es que el proyecto se
 * estire seis meses. El número tranquiliza más que cualquier promesa.
 */
export type Etapa = {
  plazo: string;
  paso: string;
  resumen: string;
  detalle: string;
};

const fuente: { plazo: Texto; paso: Texto; resumen: Texto; detalle: Texto }[] = [
  {
    plazo: { es: "20 min", en: "20 min" },
    paso: { es: "Charla", en: "Call" },
    resumen: {
      es: "Entiendo el negocio. Sin costo.",
      en: "I get to know the business. Free.",
    },
    detalle: {
      es: "Por WhatsApp o llamada. Entiendo el negocio, qué vendés y a quién. Sin costo y sin compromiso.",
      en: "Over WhatsApp or a call. I get to know the business, what you sell and to whom. Free and with no commitment.",
    },
  },
  {
    plazo: { es: "48 hs", en: "48 hrs" },
    paso: { es: "Propuesta", en: "Proposal" },
    resumen: {
      es: "Alcance, plazo y precio cerrado por escrito.",
      en: "Scope, timeline and fixed price in writing.",
    },
    detalle: {
      es: "Alcance, plazo y precio cerrado, por escrito. Si algo no entra, lo digo antes y no después.",
      en: "Scope, timeline and a fixed price, in writing. If something isn't included, I say so upfront rather than later.",
    },
  },
  {
    plazo: { es: "1–3 sem", en: "1–3 wks" },
    paso: { es: "Desarrollo", en: "Build" },
    resumen: {
      es: "Ves avances. No desaparezco.",
      en: "You see progress. I don't disappear.",
    },
    detalle: {
      es: "Según el plan. Ves avances a medida que salen. No desaparezco tres semanas para reaparecer con todo hecho.",
      en: "Depending on the plan. You see progress as it happens. I don't vanish for three weeks and reappear with everything done.",
    },
  },
  {
    plazo: { es: "30 min", en: "30 min" },
    paso: { es: "Entrega", en: "Handover" },
    resumen: {
      es: "Publicación, capacitación y soporte.",
      en: "Launch, training and support.",
    },
    detalle: {
      es: "Publicación, capacitación para que sepas mover tu contenido, y el soporte que incluya tu plan.",
      en: "Launch, training so you can manage your own content, and whatever support your plan includes.",
    },
  },
];

export function obtenerProceso(idioma: Idioma): Etapa[] {
  return fuente.map((e) => ({
    plazo: e.plazo[idioma],
    paso: e.paso[idioma],
    resumen: e.resumen[idioma],
    detalle: e.detalle[idioma],
  }));
}
