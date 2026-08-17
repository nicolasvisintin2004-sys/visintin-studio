import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({
  options: {
    // Nombre en string y no la función importada: Turbopack necesita
    // serializar la config y no puede con una referencia a función.
    // Sin esto, las tablas de las notas salen como texto con barras.
    remarkPlugins: [["remark-gfm", {}]],
  },
});

export default withMDX(nextConfig);
