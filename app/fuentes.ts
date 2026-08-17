import { Archivo, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Archivo es variable con eje de ancho (wdth 62–125). Los títulos
 * grandes usan la utilidad `condensada` (wdth 88); el resto queda en
 * ancho normal. Pedir el eje acá es lo que habilita esa variación
 * sin cargar un segundo archivo.
 */
export const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-display-src",
});

export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-src",
});

/**
 * Geist Mono no está en Google Fonts; JetBrains entra sin dependencia extra.
 * Se probó sin preload para aliviar el camino crítico del LCP: no movió el
 * LCP y disparó el CLS a 0,152 en las notas, porque las etiquetas mono están
 * arriba de todo y al llegar tarde empujan el artículo entero. Va con
 * preload, que es el default.
 */
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-src",
});

export const variablesDeFuente = `${display.variable} ${sans.variable} ${mono.variable}`;
