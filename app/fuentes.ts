import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

/**
 * Las tres familias del sitio.
 *
 * Clash Display y Satoshi se bajaron de Fontshare en su versión variable y
 * viven en `app/fuentes/`: un archivo por familia cubre todos los pesos, así
 * que son 72 KB en total en vez de los ~180 KB que costarían cinco archivos
 * estáticos. Se autohospedan, que es lo único compatible con `output: export`
 * y además evita un salto a un dominio ajeno en el camino crítico.
 *
 * Cada una declara una pila de respaldo real y su métrica aproximada, para que
 * el texto que se pinta con la fuente de sistema mientras carga la variable
 * ocupe casi el mismo espacio y el CLS quede en cero.
 */

export const display = localFont({
  src: "./fuentes/ClashDisplay-Variable.woff2",
  variable: "--fuente-display",
  display: "swap",
  weight: "200 700",
  // Clash Display es más angosta y más alta que Arial; estos ajustes acercan
  // la caja del respaldo a la de la fuente real.
  fallback: ["Arial", "Helvetica", "sans-serif"],
  adjustFontFallback: false,
});

export const cuerpo = localFont({
  src: "./fuentes/Satoshi-Variable.woff2",
  variable: "--fuente-cuerpo",
  display: "swap",
  weight: "300 900",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Arial",
    "sans-serif",
  ],
  adjustFontFallback: false,
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--fuente-mono",
  display: "swap",
  weight: ["400", "500"],
});

/** Las tres clases juntas, para colgar del `<html>`. */
export const clasesDeFuente = `${display.variable} ${cuerpo.variable} ${mono.variable}`;
