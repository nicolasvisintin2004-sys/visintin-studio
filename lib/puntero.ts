"use client";

/**
 * Un único rastreador de la posición del puntero para todo el sitio.
 *
 * Hay varias piezas que necesitan saber dónde está el mouse —el cursor, el
 * resplandor del fondo, los botones magnéticos—, y cada una con su propio
 * `addEventListener("pointermove")` significa que un solo movimiento dispara
 * cuatro funciones distintas. Acá hay un escucha y una lista de suscriptos.
 *
 * El escucha se conecta al aparecer el primer suscripto y se desconecta al
 * irse el último: en una pantalla táctil, donde nada de esto se monta, no
 * queda ningún escucha colgado.
 */

type Suscripto = (x: number, y: number) => void;

const suscriptos = new Set<Suscripto>();

/** Última posición conocida, para que quien llegue tarde no arranque en cero. */
let ultimoX = 0;
let ultimoY = 0;
let huboMovimiento = false;

function alMover(evento: PointerEvent) {
  ultimoX = evento.clientX;
  ultimoY = evento.clientY;
  huboMovimiento = true;
  for (const avisar of suscriptos) avisar(ultimoX, ultimoY);
}

export function seguirPuntero(suscripto: Suscripto): () => void {
  if (suscriptos.size === 0) {
    window.addEventListener("pointermove", alMover, { passive: true });
  }
  suscriptos.add(suscripto);

  // Si el puntero ya se movió antes de que esta pieza se montara, se la pone
  // al día en vez de dejarla esperando el próximo movimiento.
  if (huboMovimiento) suscripto(ultimoX, ultimoY);

  return () => {
    suscriptos.delete(suscripto);
    if (suscriptos.size === 0) {
      window.removeEventListener("pointermove", alMover);
    }
  };
}

/**
 * Interpolación hacia un destino, con freno.
 *
 * Es el mismo bucle en el cursor, el resplandor y los botones magnéticos: se
 * acerca un porcentaje por cuadro y se apaga solo cuando ya no queda nada que
 * mover, para no dejar un `requestAnimationFrame` girando de fondo.
 */
export function crearInterpolador(
  aplicar: (x: number, y: number) => void,
  suavidad: number,
) {
  let destinoX = 0;
  let destinoY = 0;
  let x = 0;
  let y = 0;
  let cuadro = 0;
  let ubicado = false;

  const paso = () => {
    x += (destinoX - x) * suavidad;
    y += (destinoY - y) * suavidad;
    aplicar(x, y);
    const falta = Math.abs(destinoX - x) + Math.abs(destinoY - y);
    cuadro = falta < 0.1 ? 0 : requestAnimationFrame(paso);
  };

  return {
    /** Manda el punto a alcanzar. La primera vez salta, no interpola. */
    apuntar(nuevoX: number, nuevoY: number) {
      destinoX = nuevoX;
      destinoY = nuevoY;
      if (!ubicado) {
        ubicado = true;
        x = nuevoX;
        y = nuevoY;
      }
      if (!cuadro) cuadro = requestAnimationFrame(paso);
    },
    detener() {
      if (cuadro) cancelAnimationFrame(cuadro);
      cuadro = 0;
    },
    get ubicado() {
      return ubicado;
    },
  };
}
