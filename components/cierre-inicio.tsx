import Link from "next/link";
import { botonPrimario, botonSecundario } from "@/components/boton";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { LuzEnTarjeta } from "@/components/luz-en-tarjeta";
import { Revelado } from "@/components/revelado";
import { mensajes } from "@/content/sitio";
import { inicio } from "@/content/textos";

/**
 * El cierre del inicio: una tarjeta con el llamado a escribir.
 *
 * Es el único lugar del inicio que empuja a WhatsApp después del hero. Lleva
 * el borde de bronce y la luz que sigue al cursor, igual que la tarjeta de
 * WhatsApp de la página de contacto: es la misma invitación, dicha en los dos
 * lugares donde alguien termina de leer.
 */
export function CierreInicio() {
  return (
    <section className="contenedor pb-[var(--espacio-seccion)]">
      <Revelado>
        <div className="relative rounded-xl border border-acento bg-superficie p-10 lg:p-16">
          <LuzEnTarjeta />
          <p className="t-etiqueta mb-6 text-acento">{inicio.cierreEtiqueta}</p>
          <h2 className="t-titulo max-w-[16ch]">{inicio.cierreTitulo}</h2>
          <p className="t-cuerpo mt-6">{inicio.cierreTexto}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <EnlaceWhatsApp
              mensaje={mensajes.general}
              origen="inicio_cierre"
              className={botonPrimario}
              magnetico
            >
              {inicio.cierreAccion}
            </EnlaceWhatsApp>
            <Link href="/contacto" className={botonSecundario}>
              {inicio.cierreSecundaria}
            </Link>
          </div>
        </div>
      </Revelado>
    </section>
  );
}
