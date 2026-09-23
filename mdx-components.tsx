import type { MDXComponents } from "mdx/types";

/**
 * Cómo se ve el cuerpo de una nota.
 *
 * MDX genera HTML sin clases, así que sin esto una nota se vería con los
 * estilos por defecto del navegador arriba de un fondo negro. Acá se le da a
 * cada etiqueta las mismas clases que usa el resto del sitio: la misma escala
 * tipográfica, el mismo ancho de lectura y el mismo bronce.
 *
 * El ancho de lectura importa más de lo que parece. Una nota de dos mil
 * palabras a todo el ancho del contenedor son líneas de 120 caracteres, que
 * es donde el ojo pierde el renglón al volver.
 */
export function useMDXComponents(componentes: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="t-titulo mt-20 max-w-[20ch] text-[clamp(1.75rem,3.5vw,2.5rem)] first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="t-subtitulo mt-14 max-w-[26ch] text-[clamp(1.25rem,2vw,1.75rem)]">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mt-6 max-w-[45ch] text-[1.0625rem] leading-[1.7] text-suave">{children}</p>
    ),
    ul: ({ children }) => <ul className="mt-6 flex max-w-[45ch] flex-col gap-3.5">{children}</ul>,
    ol: ({ children }) => (
      <ol className="mt-6 flex max-w-[45ch] list-decimal flex-col gap-3.5 pl-5">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-[1.0625rem] leading-relaxed text-suave marker:text-acento">
        {children}
      </li>
    ),
    strong: ({ children }) => <strong className="font-medium text-texto">{children}</strong>,
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-texto underline decoration-borde underline-offset-4 transition-colors hover:decoration-acento"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 max-w-[45ch] border-l border-acento pl-6 text-[1.0625rem] leading-relaxed">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="mt-16 max-w-[45ch] border-borde" />,
    ...componentes,
  };
}
