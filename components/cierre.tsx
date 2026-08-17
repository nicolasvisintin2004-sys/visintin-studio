import { BotonWhatsApp } from "@/components/boton-whatsapp";
import { textos } from "@/content/textos";
import type { Idioma } from "@/lib/i18n";

/**
 * Bloque de cierre invertido. Es la segunda —y última— inversión de
 * cualquier página: si una página necesita más de dos, el problema es
 * de jerarquía, no de color.
 */
export function Cierre({
  idioma,
  titulo,
  mensaje,
  origen = "cierre",
}: {
  idioma: Idioma;
  titulo?: string;
  mensaje?: string;
  origen?: string;
}) {
  const nav = textos.nav;

  return (
    <section data-surface="dark" className="bg-surface py-10 md:py-14">
      <div className="contenedor grilla items-center gap-y-4">
        <h2 className="font-display text-display-l condensada text-fg col-span-12 text-balance md:col-span-7">
          {titulo ?? textos.comun.cierreTitulo[idioma]}
        </h2>
        <div className="col-span-12 md:col-span-5 md:justify-self-end">
          <BotonWhatsApp mensaje={mensaje} origen={origen} className="px-4 py-2">
            {nav.escribime[idioma]}
          </BotonWhatsApp>
        </div>
      </div>
    </section>
  );
}
