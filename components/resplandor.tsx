/**
 * Una luz cálida grande y muy tenue, detrás de todo el contenido.
 *
 * Es la respuesta a "falta color" sin agregar un segundo tono. El bronce del
 * sitio aparece en pocos lugares y chicos, así que el ojo concluye que la
 * página es gris. Esto no pinta ningún elemento: pone una mancha de color
 * detrás del título, tan suave que no se percibe como una forma sino como
 * temperatura.
 *
 * Antes seguía al puntero, con mucho retardo. Ahora está quieta arriba a la
 * izquierda, que es donde está el título de cada página: el color es lo que
 * suma, y una luz que acompaña al mouse era un efecto más compitiendo con el
 * único movimiento que el sitio conserva, la entrada de la portada. Tampoco
 * necesita JavaScript.
 */
export function Resplandor() {
  return (
    <div className="resplandor" aria-hidden="true">
      <style>{`
        .resplandor {
          position: fixed;
          top: 26vh;
          left: 22vw;
          translate: -50% -50%;
          /* Detrás del contenido y delante del fondo: el color de fondo lo
             pinta <html> justamente para dejar libre este plano. */
          z-index: -1;
          width: 1100px;
          height: 1100px;
          pointer-events: none;
          /*
           * Las paradas están medidas, no elegidas de ojo: 17% es el punto en
           * el que la luz se nota y los tres colores de texto siguen pasando
           * AA en el corazón del resplandor, que es el peor caso: fondo
           * rgb(43,34,26), texto 14,1:1, suave 4,8:1 y acento 5,2:1.
           */
          background: radial-gradient(
            circle closest-side,
            color-mix(in srgb, var(--color-acento) 17%, transparent),
            color-mix(in srgb, var(--color-acento) 9%, transparent) 38%,
            color-mix(in srgb, var(--color-acento) 3%, transparent) 62%,
            transparent 80%
          );
        }

        @media (max-width: 640px) {
          /* En un teléfono, 1100px es casi tres pantallas de ancho. */
          .resplandor { width: 620px; height: 620px; }
        }
      `}</style>
    </div>
  );
}
