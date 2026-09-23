"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMagnetico } from "@/hooks/use-magnetico";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

/**
 * Un enlace interno que se corre hacia el cursor cuando se le acerca.
 *
 * Existe porque el gesto magnético estaba atado a `EnlaceWhatsApp`, y ahora
 * el botón principal del hero es un enlace interno al diagnóstico. El efecto
 * tiene que señalar cuál es el botón importante de la página, no a qué
 * destino apunta.
 *
 * Se usa con la misma avaricia que antes: un solo botón por página, y sólo en
 * las páginas que tienen uno claramente principal. En todos lados deja de
 * señalar nada.
 */
export function EnlaceMagnetico({ href, children, className }: Props) {
  const ref = useMagnetico<HTMLAnchorElement>();

  return (
    <Link ref={ref} href={href} className={className}>
      {children}
    </Link>
  );
}
