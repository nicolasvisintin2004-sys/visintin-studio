import { rubros } from "@/content/servicios";
import { inicio } from "@/content/textos";

/**
 * Los rubros con los que trabajo.
 *
 * Existe para decir que no trabajo con "empresas" en abstracto: trabajo con
 * PyMEs de rubros concretos. Es lo que hace que el dueño de una marmolería se
 * reconozca en el sitio en lugar de pensar que esto es para startups.
 *
 * Antes era una cinta que se desplazaba sola y aceleraba con el scroll. Se
 * sacó: un texto que se mueve sin que nadie lo toque obliga a esperar a que
 * pase el rubro propio para leerlo, y es de los efectos que más rápido delatan
 * una plantilla. Quieta y escrita como una frase, se lee de un vistazo.
 */
export function Cinta() {
  return (
    <section className="border-y border-borde py-8 sm:py-10">
      <div className="contenedor">
        <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-suave sm:text-[1.1875rem]">
          {inicio.rubrosIntro}{" "}
          {rubros.map((rubro, i) => (
            <span key={rubro}>
              {/* Sólo la inicial: "Instagram" sigue con mayúscula. */}
              <span className="text-texto">
                {rubro.charAt(0).toLowerCase() + rubro.slice(1)}
              </span>
              {i < rubros.length - 2
                ? ", "
                : i === rubros.length - 2
                  ? " y "
                  : "."}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
