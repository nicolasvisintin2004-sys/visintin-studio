export type Testimonio = {
  /** Lo que dijo, textual. Sin retocar para que suene mejor. */
  texto: string;
  /** Quién lo dijo, con nombre y apellido. */
  nombre: string;
  /** Su rol y el negocio: "dueño de Taller Italia". */
  cargo: string;
  /**
   * El slug del proyecto, si corresponde a uno del portfolio. Sirve para
   * enlazar el testimonio con el caso.
   */
  proyecto?: string;
};

/**
 * Los testimonios.
 *
 * ESTÁ VACÍO A PROPÓSITO, y mientras lo esté la sección no se renderiza en
 * ninguna parte: ni en el inicio, ni en el diagnóstico, ni en los proyectos.
 * No hay una sección con un hueco ni un "próximamente"; simplemente no existe.
 *
 * Un testimonio inventado es el riesgo más grande de todo el sitio. El resto
 * de lo que hay acá se puede discutir —si el precio es el correcto, si el
 * título convence—, pero una frase atribuida a alguien que no la dijo es una
 * mentira con nombre y apellido, y el día que un cliente llame al otro para
 * preguntarle, se termina la conversación.
 *
 * Cómo conseguirlos sin que suenen a formulario: cuando entregues un proyecto
 * y la persona te agradezca por WhatsApp —que pasa siempre—, pedile permiso
 * para usar eso mismo que escribió. Lo que dice alguien espontáneamente
 * después de ver su sitio andando es mejor que cualquier cosa que conteste a
 * "¿me dejás un testimonio?".
 *
 * Para activarlo: agregar una entrada acá y poner `<Testimonios />` donde
 * corresponda. El componente ya está escrito en `components/testimonios.tsx`.
 */
export const testimonios: readonly Testimonio[] = [];
