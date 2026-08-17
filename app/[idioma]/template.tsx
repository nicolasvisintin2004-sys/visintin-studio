import type { ReactNode } from "react";

/**
 * template.tsx se vuelve a montar en cada navegación (a diferencia de
 * layout.tsx), así que es donde vive la transición entre páginas.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="entrada-pagina">{children}</div>;
}
