"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { seccion, textos } from "@/content/textos";
import type { Idioma } from "@/lib/i18n";

const MS_POR_LETRA = 55;

type Estado = "sin" | "con";


function Lupa() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        fill="none"
        stroke="#9aa0a6"
        strokeWidth="2"
      />
      <line
        x1="15.5"
        y1="15.5"
        x2="21"
        y2="21"
        stroke="#9aa0a6"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Un resultado de búsqueda. `tenue` los pinta como competencia de fondo. */
function Resultado({
  migas,
  titulo,
  descripcion,
  tenue = false,
  puntaje,
  enlaces,
}: {
  migas: string;
  titulo: string;
  descripcion: string;
  tenue?: boolean;
  puntaje?: { valor: string; opiniones: string; etiqueta: string; sufijo: string };
  enlaces?: readonly string[];
}) {
  return (
    // La competencia se atenúa con COLOR, no con opacity: al 55% el gris
    // caía a 2,1:1 sobre blanco y el simulador rompía la accesibilidad de
    // toda la home. En gris pleno se lee igual de secundario y pasa.
    <div style={{ marginBottom: 22 }}>
      <div
        style={{
          fontSize: 13,
          color: tenue ? "var(--g-gris)" : "var(--g-url)",
          lineHeight: 1.3,
          wordBreak: "break-all",
        }}
      >
        {migas}
      </div>

      <div
        style={{
          fontSize: 19,
          lineHeight: 1.3,
          color: tenue ? "var(--g-desc)" : "var(--g-enlace)",
          marginTop: 2,
          textDecoration: "underline",
          textUnderlineOffset: 2,
        }}
      >
        {titulo}
      </div>

      {puntaje ? (
        <div
          style={{
            fontSize: 13,
            color: "var(--g-desc)",
            marginTop: 3,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span style={{ color: "var(--g-estrella)", letterSpacing: 1 }}>
            ★★★★★
          </span>
          <span>
            {puntaje.etiqueta}: {puntaje.valor} · {puntaje.opiniones} {puntaje.sufijo}
          </span>
        </div>
      ) : null}

      <div
        style={{
          fontSize: 14,
          lineHeight: 1.58,
          color: tenue ? "var(--g-gris)" : "var(--g-desc)",
          marginTop: 4,
        }}
      >
        {descripcion}
      </div>

      {enlaces ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "6px 24px",
            marginTop: 10,
            paddingLeft: 2,
          }}
        >
          {enlaces.map((enlace) => (
            <span
              key={enlace}
              style={{
                fontSize: 14,
                color: "var(--g-enlace)",
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              {enlace}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FichaNegocio({
  txt,
}: {
  txt: Record<string, string | readonly string[]>;
}) {
  return (
    <div
      style={{
        border: "1px solid var(--g-borde)",
        borderRadius: 8,
        padding: 16,
        fontSize: 14,
        color: "var(--g-texto)",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 400 }}>{txt.negocioNombre}</div>
      <div style={{ fontSize: 13, color: "var(--g-desc)", marginTop: 2 }}>
        {txt.negocioRubro}
      </div>
      <div
        style={{
          fontSize: 13,
          marginTop: 6,
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <span style={{ color: "var(--g-estrella)", letterSpacing: 1 }}>
          ★★★★★
        </span>
        <span style={{ color: "var(--g-desc)" }}>4,9 (27)</span>
      </div>
      <div style={{ fontSize: 13, marginTop: 10, color: "var(--g-desc)" }}>
        <span style={{ color: "#188038" }}>{txt.abierto}</span> · {txt.cierra}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <span
          style={{
            border: "1px solid var(--g-borde)",
            borderRadius: 18,
            padding: "6px 14px",
            fontSize: 13,
            color: "var(--g-enlace)",
          }}
        >
          {txt.llamar}
        </span>
        <span
          style={{
            border: "1px solid var(--g-borde)",
            borderRadius: 18,
            padding: "6px 14px",
            fontSize: 13,
            color: "var(--g-enlace)",
          }}
        >
          {txt.comoLlegar}
        </span>
      </div>
    </div>
  );
}

export function SimuladorGoogle({ idioma }: { idioma: Idioma }) {
  const txt = seccion(textos.simulador, idioma);
  const CONSULTA = txt.consulta;
  const pestanas: { valor: Estado; texto: string }[] = [
    { valor: "sin", texto: txt.sinSitio },
    { valor: "con", texto: txt.conSitio },
  ];
  const [estado, setEstado] = useState<Estado>("sin");
  const contenedor = useRef<HTMLDivElement>(null);
  const consulta = useRef<HTMLSpanElement>(null);
  const id = useId();

  /**
   * La consulta se escribe sola al entrar en pantalla.
   *
   * El texto se escribe directo en el DOM y no por estado: son 26 letras,
   * o sea 26 renders del componente entero por una animación decorativa.
   * Además el servidor entrega la consulta completa, así que sin JS, con
   * un lector de pantalla o con reduced-motion se lee igual.
   */
  useEffect(() => {
    const nodo = contenedor.current;
    const destino = consulta.current;
    if (!nodo || !destino) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let temporizador = 0;
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          observador.disconnect();

          destino.textContent = "";
          let i = 0;
          const escribir = () => {
            i += 1;
            destino.textContent = CONSULTA.slice(0, i);
            if (i < CONSULTA.length) {
              temporizador = window.setTimeout(escribir, MS_POR_LETRA);
            }
          };
          temporizador = window.setTimeout(escribir, 250);
        }
      },
      { threshold: 0.35 },
    );

    observador.observe(nodo);
    return () => {
      observador.disconnect();
      window.clearTimeout(temporizador);
    };
  }, [CONSULTA]);

  const alTeclear = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    setEstado((previo) => (previo === "sin" ? "con" : "sin"));
  };

  return (
    <div
      ref={contenedor}
      className="google border-line border"
      style={{ padding: "20px 16px 24px" }}
    >
      {/* Barra de búsqueda */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          border: "1px solid var(--g-borde)",
          borderRadius: 24,
          padding: "10px 16px",
          maxWidth: 560,
          boxShadow: "0 1px 4px rgba(32,33,36,.12)",
        }}
      >
        <Lupa />
        <span style={{ fontSize: 15, color: "var(--g-texto)" }}>
          <span ref={consulta} aria-hidden="true">
            {CONSULTA}
          </span>
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: 1,
              height: "1.05em",
              background: "var(--g-texto)",
              marginLeft: 1,
              verticalAlign: "text-bottom",
            }}
          />
        </span>
        <span className="sr-only">{txt.busquedaSimulada}: {CONSULTA}</span>
      </div>

      {/* Pestañas */}
      <div
        role="tablist"
        aria-label={txt.aria}
        onKeyDown={alTeclear}
        style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}
      >
        {pestanas.map((pestana) => {
          const activa = estado === pestana.valor;
          return (
            <button
              key={pestana.valor}
              type="button"
              role="tab"
              id={`${id}-tab-${pestana.valor}`}
              aria-selected={activa}
              aria-controls={`${id}-panel-${pestana.valor}`}
              tabIndex={activa ? 0 : -1}
              onClick={() => setEstado(pestana.valor)}
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "8px 14px",
                borderRadius: 4,
                cursor: "pointer",
                border: `1px solid ${activa ? "#202124" : "var(--g-borde)"}`,
                background: activa ? "#202124" : "transparent",
                color: activa ? "#ffffff" : "var(--g-desc)",
                transition: "background 150ms, color 150ms, border-color 150ms",
              }}
            >
              {pestana.texto}
            </button>
          );
        })}
      </div>

      {/* Los dos estados, superpuestos */}
      <div className="google-capas" style={{ marginTop: 22 }}>
        <div
          className="google-capa"
          data-activa={estado === "sin"}
          role="tabpanel"
          id={`${id}-panel-sin`}
          aria-labelledby={`${id}-tab-sin`}
          aria-hidden={estado !== "sin"}
          inert={estado !== "sin"}
        >
          <Resultado
            migas="es-la.facebook.com › pages › category › Automotive-Manufacturer › 1042…"
            titulo={txt.facebookTitulo}
            descripcion={txt.facebookDesc}
          />
          <Resultado
            tenue
            migas="tucompetencia.com.ar › modelos"
            titulo={txt.compe1Titulo}
            descripcion={txt.compe1Desc}
          />
          <Resultado
            tenue
            migas="otrotaller.com.ar › fabrica-motorhomes"
            titulo={txt.compe2Titulo}
            descripcion={txt.compe2Desc}
          />
        </div>

        <div
          className="google-capa"
          data-activa={estado === "con"}
          role="tabpanel"
          id={`${id}-panel-con`}
          aria-labelledby={`${id}-tab-con`}
          aria-hidden={estado !== "con"}
          inert={estado !== "con"}
        >
          {/* Todo por clases: un `style` en línea con gridTemplateColumns
              pisa la variante md: y la ficha nunca se va al costado. */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_240px]">
            <div>
              <Resultado
                migas="tufabrica.com.ar › modelos › sprinter"
                titulo={txt.buenoTitulo}
                descripcion={txt.buenoDesc}
                puntaje={{ valor: "4,9", opiniones: "27", etiqueta: txt.puntuacion, sufijo: txt.opiniones }}
                enlaces={txt.enlaces}
              />
            </div>
            <FichaNegocio txt={txt} />
          </div>
        </div>
      </div>
    </div>
  );
}
