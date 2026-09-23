import type { Proyecto } from "./proyectos";

/**
 * Los proyectos que todavía no se muestran.
 *
 * ── Por qué están en un archivo aparte y no marcados con una bandera ──
 *
 * Antes vivían en `content/proyectos.ts` con `borrador: true`, y una línea
 * filtraba la lista antes de renderizarla. Funcionaba para lo visible, pero
 * no para lo que viaja: `components/portfolio.tsx` es un componente de
 * cliente e importa ese archivo, así que el empaquetador se llevaba el módulo
 * entero al navegador. El filtro corre en tiempo de ejecución y no hay forma
 * de que lo adivine, de modo que el borrador terminaba escrito, completo, en
 * el JavaScript público. Se comprobó buscando el texto en `out/`.
 *
 * Con placeholders daba igual. Con el nombre real de un cliente cuyo proyecto
 * todavía no se anunció, no: cualquiera que abra el paquete lo lee. Un caso
 * en curso suele ser justo lo que no se puede contar todavía.
 *
 * Este archivo no lo importa nada que se renderice, así que no puede filtrarse
 * por accidente. TypeScript lo sigue revisando, de modo que el contenido se
 * mantiene válido y publicarlo es mover la entrada de acá a `proyectos.ts`.
 */
export const proyectosEnCurso: readonly Proyecto[] = [
  /**
   * El segundo caso.
   *
   * No lleva `evidencia` y no tiene que llevarla: es un comercio que abre
   * junto con el sitio, así que no hay un "antes" que capturar. El
   * `resultado.antes` tiene que decir con qué contaba el negocio antes de
   * abrir —la cuenta de Instagram, la lista de proveedores, lo que sea— y no
   * describir un problema anterior que nunca existió. Inventarlo sería la
   * misma mentira que un porcentaje falso.
   */
  {
    slug: "tienda-de-suplementos",
    nombre: "[COMPLETAR: Nico] — nombre del comercio",
    cliente: "[COMPLETAR: Nico]",
    rubro: "Tienda de suplementos deportivos",
    ubicacion: "[COMPLETAR: Nico]",
    anio: 2026,
    tipo: "cliente",
    estado: "en-desarrollo",
    resultado: {
      antes: "[COMPLETAR: Nico] — con qué contaba el negocio antes de abrir",
      despues: "[COMPLETAR: Nico] — qué puede hacer el día que abre",
    },
    resumen: "[COMPLETAR: Nico]",
    problema: ["[COMPLETAR: Nico]"],
    construido: ["[COMPLETAR: Nico]"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Netlify"],
    urlEnVivo: "",
    urlVisible: "",
    capturas: [],
  },
];
