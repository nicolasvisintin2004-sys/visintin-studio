import type { Metadata, Viewport } from "next";
import { Analitica } from "@/components/analitica";
import { BotonFlotante } from "@/components/boton-flotante";
import { Cursor } from "@/components/cursor";
import { Navegacion } from "@/components/navegacion";
import { Pie } from "@/components/pie";
import { Preloader } from "@/components/preloader";
import { Resplandor } from "@/components/resplandor";
import { sitio } from "@/content/sitio";
import { meta } from "@/content/textos";
import { clasesDeFuente } from "./fuentes";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(sitio.url),
  title: {
    default: meta.titulo,
    // Cada página completa acá: "Servicios · Visintin Studio".
    template: `%s · ${sitio.nombre}`,
  },
  description: meta.descripcion,
  applicationName: sitio.nombre,
  authors: [{ name: sitio.autor }],
  creator: sitio.autor,
  // Sin canonical a propósito: cada página declara el suyo con
  // `metadatosDePagina`. Uno acá lo heredarían todas, y cada página que no lo
  // pisara le diría a Google que es una copia del inicio.
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: sitio.url,
    siteName: sitio.nombre,
    title: meta.titulo,
    description: meta.descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.titulo,
    description: meta.descripcion,
  },
  robots: { index: true, follow: true },
  verification: { google: sitio.verificacionGoogle },
};

export const viewport: Viewport = {
  // Coincide con --color-fondo: sin esto, la barra del navegador en Android
  // queda blanca arriba de un sitio negro.
  themeColor: "#0b0c0e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={clasesDeFuente}>
      <body>
        {/* El resplandor va detrás de todo (`z-index: -1`) y el grano
            encima de todo (`z-index: 9999`). Ninguno recibe eventos: son
            atmósfera, no capas con las que se interactúe. */}
        <Resplandor />
        <div className="grano" aria-hidden="true" />

        {/* El preloader va en el layout y no en el inicio: el layout se monta
            una sola vez por carga completa, así que el telón aparece al
            entrar al sitio —por la página que sea— y no cada vez que se
            vuelve al inicio desde otra sección. */}
        <Preloader />
        <Navegacion />

        {children}

        <Pie />
        <BotonFlotante />
        <Cursor />
        <Analitica />
      </body>
    </html>
  );
}
