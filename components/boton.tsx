import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

type Variante = "primario" | "secundario";

type Props = {
  href: string;
  children: ReactNode;
  variante?: Variante;
  className?: string;
};

/**
 * Los botones no nombran colores: usan la capa semántica. El primario
 * es "el color del texto de fondo", así que dentro de una sección
 * invertida se da vuelta solo, sin una sola variante extra.
 */
const estilos: Record<Variante, string> = {
  // El borde transparente no se ve, pero iguala la caja con la del
  // secundario: sin él, dos botones de distinta variante uno al lado del
  // otro quedan 2px corridos.
  primario:
    "border border-transparent bg-fg text-surface hover:opacity-88 transition-opacity",
  // El relleno barre de izquierda a derecha, igual que el subrayado de
  // los enlaces: es el mismo gesto del sistema a otra escala.
  secundario: "barrido border border-line-strong text-fg",
};

const base =
  "inline-flex items-center justify-center gap-1 rounded-md px-3 py-1.5 " +
  "font-sans text-small font-medium tracking-tight " +
  // Respuesta táctil al apretar. 150ms para que se sienta inmediato.
  "transition-[scale] duration-150 active:scale-[0.98]";

/** Exportado para que el botón de WhatsApp comparta exactamente la misma caja. */
export function clasesBoton(variante: Variante = "primario", extra = "") {
  return `${base} ${estilos[variante]} ${extra}`;
}

export function Boton({
  href,
  children,
  variante = "primario",
  className = "",
}: Props) {
  const clases = clasesBoton(variante, className);
  const externo = href.startsWith("http") || href.startsWith("mailto:");

  if (externo) {
    return (
      <a
        href={href}
        className={clases}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href as LinkProps["href"]} className={clases}>
      {children}
    </Link>
  );
}

export function EnlaceFlecha({
  href,
  children,
  className = "",
}: Omit<Props, "variante">) {
  const clases = `subrayado inline-flex items-baseline gap-0.5 text-small font-medium text-fg ${className}`;
  const externo = href.startsWith("http") || href.startsWith("mailto:");

  const contenido = (
    <>
      {children}
      <span aria-hidden="true">→</span>
    </>
  );

  if (externo) {
    return (
      <a
        href={href}
        className={clases}
        target="_blank"
        rel="noopener noreferrer"
      >
        {contenido}
      </a>
    );
  }

  return (
    <Link href={href as LinkProps["href"]} className={clases}>
      {contenido}
    </Link>
  );
}
