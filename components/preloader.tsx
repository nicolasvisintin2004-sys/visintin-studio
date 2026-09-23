/**
 * Preloader de entrada. Un segundo, techo.
 *
 * Es CSS puro y se renderiza en el servidor: no hay JavaScript que pueda
 * fallar y dejar el sitio tapado detrás de un telón. La animación termina en
 * `visibility: hidden`, así que si las animaciones estuvieran deshabilitadas
 * el `@media (prefers-reduced-motion)` de más abajo lo saca directamente de
 * la página.
 *
 * No hay porcentajes que cuenten hasta 100: sería mentir sobre algo que ya
 * terminó de cargar. Lo que se ve es una línea que se dibuja debajo del
 * nombre, y un telón que sube revelando el hero.
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-marca">
        <span className="preloader-nombre">Visintin Studio</span>
        <span className="preloader-linea" />
      </div>

      <style>{`
        .preloader {
          position: fixed;
          inset: 0;
          z-index: 9998;
          display: grid;
          place-items: center;
          background: var(--color-fondo);
          animation: telon 520ms cubic-bezier(.76,0,.24,1) 900ms forwards;
        }

        /* El telón sube; no se desvanece. Un fade acá se lee como carga lenta. */
        @keyframes telon {
          to {
            transform: translateY(-101%);
            visibility: hidden;
          }
        }

        .preloader-marca {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .preloader-nombre {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          letter-spacing: -0.02em;
          color: var(--color-texto);
          opacity: 0;
          animation: marca 400ms cubic-bezier(.16,1,.3,1) 80ms forwards;
        }

        @keyframes marca {
          to { opacity: 1; }
        }

        .preloader-linea {
          display: block;
          height: 1px;
          width: clamp(8rem, 22vw, 14rem);
          transform-origin: left;
          transform: scaleX(0);
          background: var(--color-acento);
          animation: trazo 620ms cubic-bezier(.65,0,.35,1) 220ms forwards;
        }

        @keyframes trazo {
          to { transform: scaleX(1); }
        }

        /* Con movimiento reducido no hay entrada: el hero está desde el
           primer frame y el telón no llega a existir. */
        @media (prefers-reduced-motion: reduce) {
          .preloader { display: none; }
        }
      `}</style>
    </div>
  );
}
