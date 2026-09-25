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
  // Vacío: el de BULK, que estuvo acá, ya se publicó. El próximo caso en
  // curso entra en esta lista hasta que se pueda contar.
];
