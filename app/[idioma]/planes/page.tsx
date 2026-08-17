import type { Metadata } from "next";
import { BotonWhatsApp } from "@/components/boton-whatsapp";
import { Cabecera } from "@/components/cabecera";
import { Calculadora } from "@/components/calculadora";
import { Revelado } from "@/components/revelado";
import { obtenerCompromisos } from "@/content/compromisos";
import { mantenimiento, notaDeMoneda, obtenerPlanes } from "@/content/planes";
import { seccion, textos } from "@/content/textos";
import { alternativas, esIdioma, mismoCamino } from "@/lib/i18n";
import { mensajes } from "@/lib/sitio";

export async function generateMetadata({
  params,
}: PageProps<"/[idioma]/planes">): Promise<Metadata> {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return {};

  return {
    title: textos.paginaPlanes.metaTitulo[idioma],
    description: textos.paginaPlanes.metaDescripcion[idioma],
    alternates: alternativas(idioma, mismoCamino("/planes")),
  };
}

export default async function Planes({
  params,
}: PageProps<"/[idioma]/planes">) {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return null;

  const txt = seccion(textos.paginaPlanes, idioma);
  const nav = seccion(textos.nav, idioma);
  const planes = obtenerPlanes(idioma);
  const compromisos = obtenerCompromisos(idioma);

  // Los valores de la tabla vienen aplanados: 6 filas × 3 planes.
  const comparacion = txt.filas.map((fila, f) => ({
    fila,
    valores: [0, 1, 2].map((c) => txt.valores[f * 3 + c]),
  }));

  return (
    <>
      <Cabecera
        idioma={idioma}
        etiqueta={txt.eyebrow}
        titulo={txt.titulo}
        bajada={txt.bajada}
        migas={[{ camino: "/planes", texto: nav.planes }]}
      />

      {/* ─── Los tres planes ─── */}
      <section className="contenedor pb-8 md:pb-12">
        <div className="grilla gap-y-3">
          {planes.map((plan, i) => (
            <Revelado
              key={plan.slug}
              retraso={i * 60}
              className="col-span-12 md:col-span-4"
            >
              <div
                data-surface={plan.recomendado ? "dark" : undefined}
                className="tarjeta-viva border-line bg-surface flex h-full flex-col border p-3"
              >
                <div className="flex items-baseline justify-between gap-1">
                  <h2 className="etiqueta">{plan.nombre}</h2>
                  {plan.recomendado ? (
                    <span className="etiqueta">{txt.recomendado}</span>
                  ) : null}
                </div>

                <p className="font-display text-display-m condensada text-fg mt-1.5">
                  <span className="font-mono text-small align-super">USD</span>{" "}
                  {plan.precio.toLocaleString("es-AR")}
                </p>

                <p className="text-body text-fg-muted mt-1.5">{plan.promesa}</p>

                <ul className="border-line mt-2 space-y-1 border-t pt-2">
                  {plan.detalle.map((punto) => (
                    <li
                      key={punto}
                      className="text-small text-fg-muted flex gap-1"
                    >
                      <span aria-hidden="true" className="text-fg">
                        ·
                      </span>
                      {punto}
                    </li>
                  ))}
                </ul>

                <p className="etiqueta mt-3">{plan.mantenimientoIncluido}</p>

                {plan.nota ? (
                  <p className="border-line text-small text-fg-muted mt-3 border-t pt-2">
                    {plan.nota}
                  </p>
                ) : null}

                <div className="mt-auto pt-4">
                  <BotonWhatsApp
                    mensaje={mensajes.plan(plan.nombre, idioma)}
                    origen={`plan-${plan.slug}`}
                    variante={plan.recomendado ? "primario" : "secundario"}
                    className="w-full py-1.5"
                  >
                    {txt.consultarPor} {plan.nombre}
                  </BotonWhatsApp>
                </div>
              </div>
            </Revelado>
          ))}
        </div>

        <p className="text-small text-fg-muted medida mt-6">
          {notaDeMoneda[idioma]}
        </p>
      </section>

      {/* ─── Lo que no es una viñeta de plan ─── */}
      <section className="contenedor pb-8 md:pb-12">
        <div className="border-line border-t pt-4">
          <p className="etiqueta">{txt.vaConCualquiera}</p>

          <dl className="grilla mt-4 gap-y-4">
            {compromisos.map((compromiso, i) => (
              <Revelado
                key={compromiso.clave}
                retraso={i * 60}
                className="col-span-12 md:col-span-4"
              >
                <dt className="font-display text-heading text-fg">
                  {compromiso.titulo}
                </dt>
                <dd className="text-small text-fg-muted mt-1.5">
                  {compromiso.texto}
                </dd>
              </Revelado>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── Mantenimiento ─── */}
      <section className="border-line border-y py-6 md:py-8">
        <div className="contenedor grilla items-baseline gap-y-3">
          <div className="col-span-12 md:col-span-4">
            <p className="etiqueta">{txt.incluidoEnTres}</p>
            <p className="font-display text-display-m condensada text-fg mt-1">
              USD {mantenimiento.precio}
              <span className="font-mono text-small text-fg-muted ml-1">
                {txt.porMes}
              </span>
            </p>
          </div>
          <p className="text-body text-fg-muted medida col-span-12 md:col-span-7 md:col-start-6">
            {mantenimiento.descripcion[idioma]}
          </p>
        </div>
      </section>

      {/* ─── Comparación ─── */}
      <section className="contenedor py-8 md:py-12">
        <p className="etiqueta">{txt.comparacion}</p>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">{txt.comparacionTitulo}</caption>
            <thead>
              <tr>
                <th scope="col" className="etiqueta border-line border-b py-1.5">
                  <span className="sr-only">{txt.caracteristica}</span>
                </th>
                {planes.map((plan) => (
                  <th
                    key={plan.slug}
                    scope="col"
                    className="etiqueta border-line border-b py-1.5 pl-2"
                  >
                    {plan.nombre}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparacion.map((fila) => (
                <tr
                  key={fila.fila}
                  className="hover:bg-raised transition-colors duration-150"
                >
                  <th
                    scope="row"
                    className="border-line text-small text-fg border-b py-1.5 pr-2 font-medium"
                  >
                    {fila.fila}
                  </th>
                  {fila.valores.map((valor, i) => (
                    <td
                      key={`${fila.fila}-${planes[i].slug}`}
                      className="border-line font-mono text-small text-fg-muted border-b py-1.5 pl-2"
                    >
                      {valor}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Calculadora idioma={idioma} />
    </>
  );
}
