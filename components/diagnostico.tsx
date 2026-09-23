import { Acordeon } from "@/components/acordeon";
import { botonPrimario, botonSecundario } from "@/components/boton";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { Formulario } from "@/components/formulario";
import { LuzEnTarjeta } from "@/components/luz-en-tarjeta";
import { Revelado } from "@/components/revelado";
import {
  DIAS_DE_TRABAJO,
  PRECIO_DIAGNOSTICO,
  PRECIO_SIN_DEFINIR,
  diagnostico as textos,
  preguntasDiagnostico,
} from "@/content/diagnostico";
import { mensajes } from "@/content/sitio";

/**
 * La página del diagnóstico.
 *
 * Es una landing y no una sección más: quien llega acá viene de un mensaje de
 * prospección, de una historia o de un anuncio, y el único objetivo es que
 * complete el formulario. Por eso la barra de arriba se reduce a logotipo y
 * un botón —lo resuelve `components/navegacion.tsx` mirando la ruta— y por
 * eso el orden de la página no es el del resto del sitio.
 *
 * El orden es el del problema, no el del producto: primero se nombra lo que
 * le pasa a la persona, después se muestra que se puede reconocer en cuatro
 * síntomas concretos, y recién entonces aparece qué es lo que vendo. Contarlo
 * al revés obliga a alguien que todavía no se identificó con el problema a
 * entender un entregable, y ahí se va.
 *
 * Todo el archivo es de servidor salvo el formulario. Los textos de las siete
 * secciones no viajan en el JavaScript del navegador.
 */
export function PaginaDiagnostico() {
  return (
    <>
      <Portada />
      <Sintomas />
      <Entregables />
      <Proceso />
      <Encaje />
      <Precio />
      <SolicitarPor />
      <PreguntasDelDiagnostico />
    </>
  );
}

/**
 * La portada.
 *
 * Usa la misma máscara línea por línea que el hero del inicio, con los mismos
 * tiempos. Es animación CSS pura: el título es el LCP de la página a la que
 * van a apuntar todos los enlaces pagos, y no puede depender de un script.
 */
function Portada() {
  return (
    <section className="contenedor flex min-h-[80svh] flex-col justify-end pb-16 pt-32 sm:pb-24">
      <p className="t-etiqueta entra-tarde mb-8" style={{ "--retardo": "80ms" } as Estilo}>
        {textos.etiqueta}
      </p>

      <h1 className="t-display">
        {textos.titulo.map((linea, i) => (
          <span key={linea} className="linea-mascara">
            <span style={{ "--retardo": `${160 + i * 80}ms` } as Estilo}>{linea}</span>
          </span>
        ))}
      </h1>

      <div className="mt-10 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
        <p
          className="t-cuerpo entra-tarde text-[1.0625rem] leading-[1.6]"
          style={{ "--retardo": "560ms" } as Estilo}
        >
          {textos.bajada}
        </p>

        <div
          className="entra-tarde flex shrink-0 flex-wrap items-center gap-3"
          style={{ "--retardo": "680ms" } as Estilo}
        >
          <a href="#solicitar" className={botonPrimario}>
            {textos.accion}
          </a>
          <EnlaceWhatsApp
            mensaje={mensajes.diagnostico}
            origen="diagnostico_portada"
            className={botonSecundario}
          >
            Consultar por WhatsApp
          </EnlaceWhatsApp>
        </div>
      </div>
    </section>
  );
}

/**
 * Los síntomas.
 *
 * Van antes que la explicación del producto a propósito. Cada renglón está
 * escrito para que alguien lea uno y piense "eso pasa acá": es lo único que
 * convierte una página de servicio en una página que se lee entera.
 */
function Sintomas() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h2"
          etiqueta={textos.sintomas.etiqueta}
          titulo={textos.sintomas.titulo}
          claseTitulo="max-w-[20ch]"
        />

        <ul className="mt-14 border-t border-borde lg:mt-20">
          {textos.sintomas.lista.map((sintoma, i) => (
            <Revelado as="li" key={sintoma} retardo={i * 70}>
              <div className="grid grid-cols-[auto_1fr] gap-5 border-b border-borde py-7 sm:gap-8">
                <span aria-hidden="true" className="mt-3.5 h-px w-8 shrink-0 bg-acento sm:w-12" />
                <p className="max-w-[56ch] text-[1.0625rem] leading-relaxed">{sintoma}</p>
              </div>
            </Revelado>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Los cuatro entregables, numerados. Es lo que se compra. */
function Entregables() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h2"
          etiqueta={textos.entregables.etiqueta}
          titulo={textos.entregables.titulo}
          bajada={textos.entregables.bajada}
          claseTitulo="max-w-[16ch]"
        />

        {/* Grilla de líneas finas, el mismo recurso de los entregables de
            Servicios y de los números del estudio: `gap-px` sobre un fondo
            del color del borde. */}
        <ul className="mt-16 grid gap-px border border-borde bg-borde lg:mt-24 lg:grid-cols-2">
          {textos.entregables.lista.map((item, i) => (
            <Revelado as="li" key={item.numero} retardo={i * 80} className="bg-fondo">
              <div className="flex h-full flex-col p-8 lg:p-10">
                <p className="t-dato text-acento">{item.numero}</p>
                <h3 className="t-subtitulo mt-5">{item.nombre}</h3>
                <p className="t-cuerpo mt-4 text-[0.9375rem]">{item.texto}</p>
              </div>
            </Revelado>
          ))}
        </ul>

        <Revelado>
          {/*
            La frase que cierra el bloque. Es la que más vende de toda la
            página, porque es la única que le saca riesgo a la compra: si el
            plan queda tuyo pase lo que pase, el diagnóstico deja de ser el
            primer paso de un embudo y pasa a ser algo que se compra solo.
          */}
          <p className="t-subtitulo mt-14 max-w-[26ch] text-acento">
            {textos.entregables.cierre}
          </p>
        </Revelado>
      </div>
    </section>
  );
}

/** Cómo es el proceso, con los tiempos reales. */
function Proceso() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h2"
          etiqueta={textos.proceso.etiqueta}
          titulo={textos.proceso.titulo}
          claseTitulo="max-w-[14ch]"
        />

        <ol className="mt-16 border-t border-borde lg:mt-24">
          {textos.proceso.pasos.map((paso, i) => (
            <Revelado as="li" key={paso.numero} retardo={i * 80}>
              <div className="grid gap-5 border-b border-borde py-9 sm:grid-cols-[auto_1fr_auto] sm:gap-8 sm:py-12">
                <span className="t-dato text-suave">{paso.numero}</span>

                <div className="min-w-0">
                  <h3 className="t-subtitulo">{paso.nombre}</h3>
                  <p className="t-cuerpo mt-3 text-[0.9375rem]">{paso.texto}</p>
                </div>

                <span className="t-dato shrink-0 self-start text-acento sm:pt-1">
                  {/* El plazo del paso del medio sale de una constante para
                      poder ajustarlo en un solo lugar cuando haya
                      diagnósticos entregados con los que promediar. */}
                  {paso.tiempo.replace("{dias}", String(DIAS_DE_TRABAJO))}
                </span>
              </div>
            </Revelado>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Para quién sirve y para quién no.
 *
 * La columna de la derecha es la que hace el trabajo. Un sitio que sólo dice
 * a quién le sirve algo se lee como un folleto; uno que se anima a decir a
 * quién no, se lee como alguien que ya lo hizo varias veces. Y además filtra:
 * las consultas que no encajan cuestan tiempo de los dos lados.
 */
function Encaje() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h2"
          etiqueta={textos.encaje.etiqueta}
          titulo={textos.encaje.titulo}
          claseTitulo="max-w-[14ch]"
        />

        <div className="mt-16 grid gap-px border border-borde bg-borde lg:mt-24 lg:grid-cols-2">
          <Revelado className="bg-fondo">
            <div className="h-full p-8 lg:p-10">
              <h3 className="t-etiqueta text-acento">{textos.encaje.siTitulo}</h3>
              <ul className="mt-8 flex flex-col gap-5">
                {textos.encaje.si.map((item) => (
                  <li key={item} className="flex gap-4 text-[1.0625rem] leading-relaxed">
                    <span aria-hidden="true" className="mt-3.5 h-px w-4 shrink-0 bg-acento" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Revelado>

          <Revelado retardo={100} className="bg-fondo">
            <div className="h-full p-8 lg:p-10">
              <h3 className="t-etiqueta">{textos.encaje.noTitulo}</h3>
              <ul className="mt-8 flex flex-col gap-5">
                {textos.encaje.no.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 text-[1.0625rem] leading-relaxed text-suave"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-3.5 h-px w-4 shrink-0 bg-borde"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Revelado>
        </div>
      </div>
    </section>
  );
}

/**
 * El precio.
 *
 * Es la única parte del sitio con un número, y va en la tarjeta de borde de
 * bronce que el sitio reserva para lo importante. Si `PRECIO_DIAGNOSTICO`
 * está vacío muestra "Consultar precio" y la página funciona igual: no se
 * rompe nada por no haber decidido todavía.
 */
function Precio() {
  const definido = PRECIO_DIAGNOSTICO.trim() !== "";

  return (
    <section className="seccion">
      <div className="contenedor">
        <Revelado>
          <div className="relative rounded-xl border border-acento bg-superficie p-10 lg:p-16">
            <LuzEnTarjeta />
            <p className="t-etiqueta mb-6 text-acento">{textos.precio.etiqueta}</p>
            <h2 className="t-titulo max-w-[16ch]">{textos.precio.titulo}</h2>

            <div className="mt-12 grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
              <div>
                <p
                  className={
                    definido
                      ? "font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.03em]"
                      : "t-subtitulo text-suave"
                  }
                >
                  {definido ? PRECIO_DIAGNOSTICO : PRECIO_SIN_DEFINIR}
                </p>
                <p className="t-dato mt-6 max-w-[34ch] text-acento">
                  {textos.precio.descuento}
                </p>
              </div>

              <div>
                <p className="t-cuerpo text-[0.9375rem]">{textos.precio.texto}</p>
                <ul className="mt-8 flex flex-col gap-3.5">
                  {textos.precio.incluye.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.9375rem] text-suave">
                      <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-acento" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a href="#solicitar" className={`${botonPrimario} mt-12 w-full sm:w-auto`}>
              {textos.accion}
            </a>
          </div>
        </Revelado>
      </div>
    </section>
  );
}

/** El formulario. Es el único destino de la página. */
function SolicitarPor() {
  return (
    <section id="solicitar" className="seccion scroll-mt-28">
      <div className="contenedor">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <EncabezadoSeccion
            nivel="h2"
            etiqueta={textos.formulario.etiqueta}
            titulo={textos.formulario.titulo}
            bajada={textos.formulario.texto}
          />

          <Revelado retardo={100}>
            <div className="rounded-xl border border-borde p-8 lg:p-10">
              {/* `origen` viaja hasta la base: es lo que después permite
                  saber si esta página trae más consultas que contacto. */}
              <Formulario origen="diagnostico" />
            </div>
          </Revelado>
        </div>
      </div>
    </section>
  );
}

function PreguntasDelDiagnostico() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h2"
          etiqueta={textos.preguntas.etiqueta}
          titulo={textos.preguntas.titulo}
          claseTitulo="max-w-[16ch]"
        />

        <div className="mt-14 lg:mt-20">
          <Acordeon items={preguntasDiagnostico} />
        </div>
      </div>
    </section>
  );
}

/** Atajo de tipo: las variables CSS no entran en `CSSProperties` sin esto. */
type Estilo = React.CSSProperties;
