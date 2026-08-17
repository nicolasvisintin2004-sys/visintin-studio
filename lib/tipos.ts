export type ClaveMetrica = "lcp" | "cls" | "lighthouse" | "tbt";

export type Metrica = {
  clave: ClaveMetrica;
  etiqueta: string;
  /** null = todavía no hay dato. Nunca se completa con un número inventado. */
  valor: number | null;
  unidad?: string;
  decimales: number;
};

export type Medicion = {
  /** De dónde salió el número. Sin esto es un adjetivo más. */
  herramienta: string;
  /** Ya localizado: "móvil" / "mobile". */
  dispositivo: string;
  /** Qué se midió exactamente: build local, preview o producción. */
  entorno: string;
  url: string;
  /** ISO. Se muestra como fecha corta al lado de la herramienta. */
  medidoEl: string;
  metricas: Metrica[];
};

export type Imagen = {
  src: string;
  alt: string;
  /** Obligatorias: sin dimensiones explícitas el comparador provoca CLS. */
  ancho: number;
  alto: number;
};

export type Proyecto = {
  slug: string;
  nombre: string;
  rubro: string;
  anio: number;
  /** García Ferrari es "en-desarrollo" hasta que confirmen. No es un cliente cerrado. */
  estado: "en-desarrollo" | "entregado";
  resumen: string;
  situacion: string;
  construido: string[];
  stack: string[];
  urlEnVivo?: string;
  /**
   * `antes` es la web vieja o el Instagram del cliente; `despues`, el sitio
   * nuevo. Si falta `antes`, no se dibuja el comparador y se muestra sola la
   * captura final. Si falta `despues`, no se muestra nada.
   * Las dos deben tener la MISMA relación de aspecto.
   */
  imagenes?: {
    antes?: Imagen;
    despues?: Imagen;
  };
  medicion: Medicion;
  /** Resultados de negocio. Se completan cuando existan datos reales. */
  consultasPorMes: number | null;
  impresionesBusqueda: number | null;
};
