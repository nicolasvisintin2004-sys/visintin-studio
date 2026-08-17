import type { MDXComponents } from "mdx/types";

/**
 * Estilos del cuerpo de las notas. El MDX no lleva clases: se resuelve todo
 * acá para que cada artículo sea texto y nada más.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="font-display text-heading text-fg medida mt-6 scroll-mt-12">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-fg medida mt-4 text-lg font-semibold">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-body-l text-fg-muted medida mt-2">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="medida mt-2 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="medida mt-2 space-y-1">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-body-l text-fg-muted before:text-fg pl-3 -indent-3 before:mr-1.5 before:content-['·']">
        {children}
      </li>
    ),
    strong: ({ children }) => (
      <strong className="text-fg font-semibold">{children}</strong>
    ),
    a: ({ children, href }) => (
      <a href={href} className="subrayado text-fg font-medium">
        {children}
      </a>
    ),
    hr: () => <hr className="border-line medida mt-6 border-t" />,
    table: ({ children }) => (
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-left">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="etiqueta border-line border-b py-1.5 pr-3 align-bottom">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-line text-small text-fg-muted border-b py-1.5 pr-3">
        {children}
      </td>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-line-strong text-fg medida mt-4 border-l-2 pl-3">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
