"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { clasesBoton } from "@/components/boton";
import { seccion, textos } from "@/content/textos";
import { esIdioma, idiomaPorDefecto, ruta as construirRuta } from "@/lib/i18n";

/**
 * not-found no recibe `params`, así que el idioma se saca de la ruta.
 * Es cliente por eso, y porque no hay nada que renderizar en el servidor
 * que dependa de datos.
 */
export default function NoEncontrada() {
  const rutaActual = usePathname();
  const primero = rutaActual.split("/").filter(Boolean)[0] ?? "";
  const idioma = esIdioma(primero) ? primero : idiomaPorDefecto;

  const txt = seccion(textos.noEncontrada, idioma);
  const comun = seccion(textos.comun, idioma);

  return (
    <section className="contenedor py-14 md:py-20">
      <p className="etiqueta">{txt.eyebrow}</p>
      <h1 className="font-display text-display-l condensada text-fg medida mt-3 text-balance">
        {txt.titulo}
      </h1>
      <p className="text-body-l text-fg-muted medida mt-3">{txt.texto}</p>
      <div className="mt-5">
        <Link
          href={construirRuta(idioma) as LinkProps["href"]}
          className={clasesBoton("primario")}
        >
          {comun.volverInicio}
        </Link>
      </div>
    </section>
  );
}
