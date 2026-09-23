import { CintaReactiva } from "@/components/cinta-reactiva";
import { rubros } from "@/content/servicios";
import { accesibilidad } from "@/content/textos";

/**
 * La cinta de rubros.
 *
 * Existe para decir que no trabajo con "empresas" en abstracto: trabajo con
 * PyMEs de rubros concretos. Es lo que hace que el dueño de una marmolería se
 * reconozca en el sitio en lugar de pensar que esto es para startups.
 *
 * El desplazamiento es una animación CSS sobre una lista duplicada: el primer
 * juego se corre hasta -50% y en ese punto el segundo está exactamente donde
 * arrancó el primero, así que el salto no se ve.
 *
 * La velocidad la gobierna `CintaReactiva`, que es de cliente y responde al
 * scroll. Los rubros se quedan acá, del lado del servidor: lo único que viaja
 * al navegador es el contenedor con la escucha, no los ocho textos.
 */
export function Cinta() {
  const items = [...rubros, ...rubros];

  return (
    <section
      aria-label={accesibilidad.cinta}
      className="overflow-hidden border-y border-borde py-5"
    >
      <CintaReactiva className="cinta">
        {items.map((rubro, i) => (
          <span
            key={`${rubro}-${i}`}
            // La lista está duplicada para que el ciclo cierre sin costura;
            // el segundo juego no se le lee a nadie dos veces.
            aria-hidden={i >= rubros.length}
            className="t-etiqueta flex shrink-0 items-center gap-10 px-10"
          >
            {rubro}
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-acento/60" />
          </span>
        ))}
      </CintaReactiva>
    </section>
  );
}
