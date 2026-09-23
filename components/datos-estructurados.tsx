type Props = {
  /** Uno o varios objetos schema.org, ya armados. */
  datos: object | readonly object[];
};

/**
 * Inserta datos estructurados (JSON-LD) en la página.
 *
 * El contenido lo arma el propio sitio desde archivos tipados: no hay entrada
 * de usuario en juego. Aun así se escapa el `<`, para que una cadena que
 * contenga "</script>" no pueda cerrar la etiqueta antes de tiempo.
 */
export function DatosEstructurados({ datos }: Props) {
  const lista = Array.isArray(datos) ? datos : [datos];

  return (
    <>
      {lista.map((dato, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(dato).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
