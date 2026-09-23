import { botonPrimario } from "@/components/boton";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { Formulario } from "@/components/formulario";
import { LuzEnTarjeta } from "@/components/luz-en-tarjeta";
import { Revelado } from "@/components/revelado";
import { mensajes, sitio } from "@/content/sitio";
import { contacto as textos } from "@/content/textos";

/**
 * Contacto.
 *
 * WhatsApp arriba y grande; el formulario abajo, como alternativa para el que
 * prefiere escribir con calma. El orden es el orden real: casi todo el mundo
 * usa el primero.
 */
export function Contacto() {
  return (
    <section id="contacto" className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h1"
          etiqueta={textos.etiqueta}
          titulo={textos.titulo}
          bajada={textos.bajada}
          claseTitulo="max-w-[14ch]"
        />

        {/* `items-start` y no el estirado por defecto: el formulario es más
            alto que la tarjeta de WhatsApp, y sin esto la tarjeta se estiraba
            para igualarlo y quedaba media pantalla vacía adentro. */}
        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-8">
          <Revelado>
            <div className="relative flex h-full flex-col rounded-xl border border-acento bg-superficie p-8 lg:p-10">
              <LuzEnTarjeta />
              <p className="t-etiqueta text-acento">{textos.whatsappTitulo}</p>
              <p className="t-subtitulo mt-5">{textos.whatsappCanal}</p>
              <p className="t-cuerpo mt-5 text-[0.9375rem]">{textos.whatsappTexto}</p>

              <EnlaceWhatsApp
                mensaje={mensajes.contacto}
                origen="contacto_principal"
                className={`${botonPrimario} mt-10 w-full sm:w-auto`}
                magnetico
              >
                {textos.whatsappAccion}
              </EnlaceWhatsApp>

              <p className="t-dato mt-8 border-t border-borde pt-6 text-suave">
                {textos.correoEtiqueta}{" "}
                <a
                  href={`mailto:${sitio.email}`}
                  className="text-texto underline decoration-borde underline-offset-4 transition-colors hover:decoration-acento"
                >
                  {sitio.email}
                </a>
              </p>
            </div>
          </Revelado>

          <Revelado retardo={100}>
            <div className="rounded-xl border border-borde p-8 lg:p-10">
              <h2 className="t-subtitulo">{textos.formularioTitulo}</h2>
              <p className="t-cuerpo mt-4 text-[0.9375rem]">{textos.formularioTexto}</p>
              <div className="mt-8">
                <Formulario origen="contacto" />
              </div>
            </div>
          </Revelado>
        </div>
      </div>
    </section>
  );
}
