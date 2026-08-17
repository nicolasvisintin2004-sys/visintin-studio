import { Revelado } from "@/components/revelado";
import { obtenerProceso } from "@/content/proceso";
import type { Idioma } from "@/lib/i18n";

/**
 * El plazo manda: Archivo grande arriba, el paso en mono debajo, la
 * descripción en cuerpo. Es lo primero que se lee de cada etapa.
 */
export function Proceso({
  idioma,
  largo = false,
}: {
  idioma: Idioma;
  largo?: boolean;
}) {
  const proceso = obtenerProceso(idioma);

  return (
    <ol className="grilla mt-4 gap-y-5">
      {proceso.map((etapa, i) => (
        <Revelado
          key={etapa.paso}
          como="li"
          retraso={i * 60}
          className="border-line col-span-12 border-t pt-2 md:col-span-3"
        >
          <p className="font-display text-display-m condensada text-fg tabular-nums">
            {etapa.plazo}
          </p>

          <p className="etiqueta text-fg mt-1">
            <span className="text-fg-muted mr-1">0{i + 1}</span>
            {etapa.paso}
          </p>

          <p className="text-small text-fg-muted mt-1.5">
            {largo ? etapa.detalle : etapa.resumen}
          </p>
        </Revelado>
      ))}
    </ol>
  );
}
