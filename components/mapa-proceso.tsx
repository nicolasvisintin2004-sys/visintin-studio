import type { CSSProperties } from "react";
import { hero } from "@/content/textos";

type Estilo = CSSProperties & Record<`--${string}`, string>;

/**
 * El mapa de procesos de la portada.
 *
 * Es el elemento propio del sitio. Lo primero que entrega el estudio es un
 * mapa de cómo trabaja la empresa, y Nicolás estudia Ingeniería Industrial:
 * diagramar procesos es literalmente el oficio. En vez de decir "ordeno y
 * automatizo", la portada lo muestra con un proceso que tiene casi cualquier
 * pyme que vende por WhatsApp.
 *
 * Es el único movimiento que no responde a algo que hace la persona, y por
 * eso es uno solo y con un orden. Después de que entra el título, una línea
 * de bronce recorre los cuatro pasos de izquierda a derecha, y al llegar a
 * cada paso manual lo ordena: lo de antes queda tachado arriba, chico, y
 * aparece cómo pasa ahora. Termina quieto y no se repite.
 *
 * El estado final es el que importa y se entiende solo: cada paso dice cómo
 * era y cómo es. Por eso con movimiento reducido, o si el CSS de animación
 * no corre, se ve directamente ese estado, y un lector de pantalla lee las
 * dos cosas en orden.
 *
 * Es CSS puro y de servidor: no hay JavaScript, y no compite con el título,
 * que es lo primero que se pinta. Los tiempos viven en `globals.css`, bajo
 * MAPA DE PROCESOS, y cada paso recibe su retardo por una variable.
 */
export function MapaProceso() {
  const { titulo, pasos } = hero.mapa;

  return (
    <figure className="mapa" aria-labelledby="mapa-titulo">
      <figcaption id="mapa-titulo" className="t-etiqueta mapa-titulo">
        {titulo}
      </figcaption>

      <div className="mapa-recorrido">
        {/* La línea que recorre los pasos. Decorativa: el orden ya lo da la
            lista. Va afuera del <ol>, que sólo admite <li> como hijos. */}
        <span aria-hidden="true" className="mapa-linea" />

        <ol className="mapa-pasos">
          {pasos.map((paso, i) => (
            <li
              key={paso.despues}
              className="mapa-paso"
              // Cuándo llega la línea a este paso: arranca a los 1300 ms y
              // cruza el ancho en 2000 ms, y los nodos están cada un cuarto.
              style={{ "--cuando": `${1300 + i * 500}ms` } as Estilo}
            >
              <span aria-hidden="true" className="mapa-nodo" />
              {paso.antes ? (
                <>
                  <s className="mapa-antes">
                    <span className="sr-only">Antes: </span>
                    {paso.antes}
                  </s>
                  <span className="mapa-despues">
                    <span className="sr-only">Ahora: </span>
                    {paso.despues}
                  </span>
                </>
              ) : (
                <span className="mapa-despues mapa-despues--inicio">{paso.despues}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
