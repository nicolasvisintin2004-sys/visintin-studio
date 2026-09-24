export type Red = {
  slug: string;
  nombre: string;
  /**
   * Qué se publica ahí. Tres redes con el mismo "seguime" no dan ninguna
   * razón para abrir ninguna; cada una tiene que ofrecer algo distinto.
   */
  rol: string;
  /** Vacío significa que la red todavía no existe y no se renderiza el enlace. */
  url: string;
};

/**
 * Las redes.
 *
 * Una URL vacía no se muestra: es preferible que falte un ícono a que haya
 * un enlace que lleva a un perfil sin nada, que es peor que no tener perfil.
 * Los componentes filtran por `url` antes de renderizar, así que agregar una
 * red es completar la dirección acá y no tocar nada más.
 */
export const redes: readonly Red[] = [
  {
    slug: "linkedin",
    nombre: "LinkedIn",
    rol: "Qué hago",
    url: "",
  },
  {
    slug: "instagram",
    nombre: "Instagram",
    rol: "Cómo trabajo, el detrás de escena",
    url: "https://www.instagram.com/visintin.studio/",
  },
  {
    slug: "youtube",
    nombre: "YouTube",
    rol: "Lo que sé hacer, explicado",
    url: "",
  },
];

/** Las que tienen dirección cargada. Es lo único que se renderiza. */
export const redesActivas = redes.filter((red) => red.url.trim() !== "");

/**
 * Las direcciones sueltas, para el `sameAs` de los datos estructurados.
 *
 * Es lo que le dice a Google que el perfil de Instagram y este sitio son el
 * mismo negocio. Sin eso son dos entidades sueltas que casualmente se llaman
 * parecido, y el sitio no hereda nada de lo que el perfil ya construyó.
 */
export const perfilesSociales = redesActivas.map((red) => red.url);
