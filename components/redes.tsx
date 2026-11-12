import { redesActivas } from "@/content/social";
import { pie } from "@/content/textos";

/**
 * Las redes, en la columna del pie.
 *
 * Sin logotipos: el sitio resuelve todo con tipografía, y una marca de color
 * ajena sería lo único con color de la página. Si no hay ninguna dirección
 * cargada no se renderiza nada.
 *
 * Hasta noviembre de 2026 había también una franja en el inicio, con lo que
 * se publica en cada red. Se sacó para acortar el inicio: con una sola red
 * cargada era un recuadro con un enlace, y ese enlace ya está acá.
 */
export function RedesEnPie() {
  if (redesActivas.length === 0) return null;

  return (
    <div>
      <p className="t-etiqueta mb-5">{pie.redes}</p>
      <ul className="flex flex-col gap-3 text-[0.9375rem]">
        {redesActivas.map((red) => (
          <li key={red.slug}>
            <a
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-suave transition-colors duration-300 hover:text-texto"
            >
              {red.nombre}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
