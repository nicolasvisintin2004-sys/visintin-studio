import Link from "next/link";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { Lockup } from "@/components/marca";
import { RedesEnPie } from "@/components/redes";
import { redesActivas } from "@/content/social";
import { mensajes, sitio } from "@/content/sitio";
import { navegacion, pie as textos } from "@/content/textos";

export function Pie() {
  const anio = new Date().getFullYear();

  /**
   * El diagnóstico encabeza la lista y no está en `navegacion.enlaces`, que
   * es el menú del medio de la barra. Acá abajo sí tiene que figurar: el pie
   * es la única lista completa de páginas del sitio, y es de donde sale
   * también el mapa mental de alguien que llega por una página suelta.
   */
  const secciones = [navegacion.destacado, ...navegacion.enlaces];

  // La cuarta columna sólo existe si hay alguna red cargada.
  const columnas = redesActivas.length > 0 ? "lg:grid-cols-[1.4fr_1fr_1fr_1fr]" : "lg:grid-cols-[1.4fr_1fr_1fr]";

  return (
    <footer className="border-t border-borde">
      <div className={`contenedor grid gap-12 py-16 lg:py-20 ${columnas}`}>
        <div>
          {/* El lockup entero, tambien en movil: aca hay ancho de sobra y
              el pie es el ultimo lugar donde se ve la marca. */}
          <Lockup className="h-6 w-auto text-texto" />
          <p className="t-cuerpo mt-4 max-w-[38ch] text-[0.9375rem]">{textos.descripcion}</p>
        </div>

        <nav aria-label="Pie">
          <p className="t-etiqueta mb-5">{textos.secciones}</p>
          <ul className="flex flex-col gap-3">
            {secciones.map(({ href, texto }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[0.9375rem] text-suave transition-colors duration-300 hover:text-texto"
                >
                  {texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="t-etiqueta mb-5">{textos.contacto}</p>
          <ul className="flex flex-col gap-3 text-[0.9375rem]">
            <li>
              <a
                href={`mailto:${sitio.email}`}
                className="text-suave transition-colors duration-300 hover:text-texto"
              >
                {sitio.email}
              </a>
            </li>
            <li>
              {/* El canal, no el número: igual que en la página de contacto. */}
              <EnlaceWhatsApp
                mensaje={mensajes.general}
                origen="pie"
                className="text-suave transition-colors duration-300 hover:text-texto"
              >
                WhatsApp
              </EnlaceWhatsApp>
            </li>
            <li className="text-suave">
              {sitio.ciudad}, {textos.pais}
            </li>
          </ul>
        </div>

        <RedesEnPie />
      </div>

      <div className="contenedor flex flex-wrap items-center justify-between gap-4 border-t border-borde py-7">
        <p className="t-dato text-suave">
          © {anio} {textos.derechos}
        </p>
        <a
          href="#contenido"
          className="t-dato text-suave transition-colors duration-300 hover:text-texto"
        >
          {textos.arriba} ↑
        </a>
      </div>
    </footer>
  );
}
