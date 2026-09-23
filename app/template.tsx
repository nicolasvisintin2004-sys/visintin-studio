/**
 * El envoltorio que se vuelve a montar en cada cambio de página.
 *
 * Es lo único que separa una navegación de un corte seco. Sin esto, pasar de
 * Servicios a Proyectos reemplaza el contenido de un frame al siguiente y el
 * sitio se siente como varios sitios pegados; con esto, se siente como uno
 * solo que cambia de sección.
 *
 * Va en `template.tsx` y no en `layout.tsx` porque un layout se monta una
 * sola vez y sobrevive a la navegación —que es justo lo que queremos para la
 * barra, el pie y el preloader— mientras que un template se vuelve a montar
 * en cada ruta, que es lo que hace falta para que la animación se dispare de
 * nuevo.
 *
 * Los 380 ms y el que sea sólo opacidad están explicados en `globals.css`,
 * junto a la animación. El resumen de lo segundo, que es lo que más
 * importa: cualquier `transform` o `filter` acá adentro convertiría a este
 * div en el bloque contenedor de todo lo que sea `position: fixed` dentro de
 * la página —el panel que sigue al cursor en Servicios, el pin de GSAP del
 * portfolio— y los rompería sin dar ningún aviso.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="transicion-pagina">{children}</div>;
}
