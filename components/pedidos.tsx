import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { Revelado } from "@/components/revelado";
import { pedidos } from "@/content/pedidos";
import { servicios as textos } from "@/content/textos";

/**
 * Los entregables concretos, abajo de los cuatro servicios.
 *
 * Cada celda es un enlace a WhatsApp con el pedido ya escrito. Eso es lo que
 * convierte una lista de lectura en la parte del sitio que más me sirve: el
 * mensaje llega diciendo qué necesita la persona, y el evento de analítica
 * deja registrado cuál de los nueve se toca más.
 *
 * Es un componente de servidor y se pasa como `children` a `Servicios`, que
 * sí es de cliente. Lo único que viaja al navegador es `EnlaceWhatsApp`, que
 * ya estaba en el paquete: los nueve textos se quedan del lado del servidor.
 *
 * Va con la grilla de líneas finas —`gap-px` sobre un fondo del color del
 * borde— que es el mismo recurso de los números de "Sobre mí". Deliberado:
 * si esto fueran nueve tarjetas con un ícono de color, el acento aparecería
 * en nueve lugares y dejaría de significar algo, y además competiría con la
 * lista de cuatro filas que está justo arriba. Acá el bronce aparece sólo
 * cuando el mouse está encima de una celda, que es información y no adorno.
 */
export function Pedidos() {
  return (
    <div className="mt-24 lg:mt-32">
      {/*
        h2 bajo el h1 de la página de Servicios: no es un tema nuevo, es la
        versión concreta de las cuatro categorías de más arriba.
      */}
      <EncabezadoSeccion
        nivel="h2"
        titulo={textos.pedidosTitulo}
        bajada={textos.pedidosBajada}
        claseTitulo="max-w-[20ch] text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium"
      />

      <Revelado>
        <ul className="mt-12 grid gap-px border border-borde bg-borde sm:grid-cols-2 lg:grid-cols-3">
          {pedidos.map((pedido) => (
            <li key={pedido.slug} className="bg-fondo">
              {/* El enlace ocupa la celda entera: en un teléfono, el área de
                  toque es todo el recuadro y no sólo el título. */}
              <EnlaceWhatsApp
                mensaje={pedido.mensaje}
                origen={`pedido_${pedido.slug}`}
                className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-superficie lg:p-8"
              >
                <span className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-[1.1875rem] font-medium leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-acento">
                    {pedido.nombre}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-suave transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acento"
                  >
                    ↗
                  </span>
                </span>

                <span className="mt-3 block text-[0.9375rem] leading-relaxed text-suave">
                  {pedido.descripcion}
                </span>
              </EnlaceWhatsApp>
            </li>
          ))}
        </ul>
      </Revelado>
    </div>
  );
}
