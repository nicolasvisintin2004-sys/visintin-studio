import type { CSSProperties } from "react";
import qrcode from "qrcode-generator";
import { Acordeon } from "@/components/acordeon";
import { botonPrimario, botonSecundario } from "@/components/boton";
import { CapturaEnmarcada } from "@/components/captura";
import { EncabezadoSeccion } from "@/components/encabezado-seccion";
import { EnlaceWhatsApp } from "@/components/enlace-whatsapp";
import { MedirPreguntas } from "@/components/medir-preguntas";
import { BarraDemo } from "@/components/turnos-barra";
import { CalculadoraTurnos } from "@/components/turnos-calculadora";
import { DemoTurnos } from "@/components/turnos-demo";
import { sitio } from "@/content/sitio";
import { MENSAJE_DEMO } from "@/content/turnos-acciones";
import {
  type CapturaDeTurnos,
  DEMOS,
  capturasTurnos,
  demoDisponible,
  preguntasTurnos,
  turnos as textos,
} from "@/content/turnos";

type Estilo = CSSProperties & Record<`--${string}`, string>;

/**
 * La página de Visintin Turnos.
 *
 * Tiene un solo objetivo: que el dueño de un consultorio pida una demo. Es
 * una página de aterrizaje, igual que la del diagnóstico, así que la barra de
 * arriba se reduce a logotipo y un botón —lo resuelve
 * `components/navegacion.tsx` mirando la ruta— y no lleva la franja de
 * "sección siguiente".
 *
 * El orden es el del problema y no el del producto: primero la promesa, en
 * seguida la cuenta de cuánto se pierde con los números del que lee, después
 * la prueba, y recién entonces cómo funciona y qué incluye. Contarlo al revés
 * obliga a alguien que todavía no hizo su cuenta a leer una lista de
 * funciones, y ahí se va.
 *
 * Está pensada primero para 380 px de ancho: la va a leer alguien desde el
 * celular, entre un paciente y otro.
 *
 * Todo el archivo es de servidor. Lo que corre en el navegador son cuatro
 * piezas chicas: la calculadora, el demo embebido, la barra fija del celular
 * y la medición de las preguntas.
 */
export function PaginaTurnos() {
  return (
    <>
      <Portada />
      <Calculadora />
      <Probar />
      <Pasos />
      <Incluye />
      <Encaje />
      <Datos />
      <Preguntas />
      <Cierre />
      <BarraDemo />
    </>
  );
}

/**
 * La portada.
 *
 * El título entra con la misma máscara línea por línea que el hero, pero en
 * `.t-titulo`: comparte el ancho con el celular y el tamaño del hero no
 * entraría en media página. Es animación CSS pura: el título es lo primero
 * que se pinta y no puede esperar a un script.
 */
function Portada() {
  return (
    <section className="contenedor grid items-center gap-14 pb-16 pt-32 sm:pb-24 lg:min-h-[92svh] lg:grid-cols-[1.25fr_1fr] lg:gap-20 lg:pt-36">
      <div>
        <p className="t-etiqueta entra-tarde mb-7" style={{ "--retardo": "80ms" } as Estilo}>
          {textos.etiqueta}
        </p>

        {/* El tamaño sale de la línea más larga, que mide 7,5 em: con dos
            columnas tiene que entrar en poco más de la mitad del contenedor. */}
        <h1 className="t-titulo text-[clamp(2.5rem,5.3vw,4.75rem)] [text-wrap:wrap]">
          {textos.portada.titulo.map((linea, i) => (
            <span key={linea} className="linea-mascara">
              <span style={{ "--retardo": `${160 + i * 80}ms` } as Estilo}>{linea}</span>
            </span>
          ))}
        </h1>

        <p
          className="t-cuerpo entra-tarde mt-8 text-[1.0625rem] leading-[1.6] lg:mt-10"
          style={{ "--retardo": "480ms" } as Estilo}
        >
          {textos.portada.bajada}
        </p>

        <div
          className="entra-tarde mt-9 flex flex-wrap items-center gap-3"
          style={{ "--retardo": "600ms" } as Estilo}
        >
          <EnlaceWhatsApp
            mensaje={MENSAJE_DEMO}
            origen="turnos_portada"
            className={botonPrimario}
          >
            {textos.portada.accion}
          </EnlaceWhatsApp>
          <a href={demoDisponible ? "#probar" : "#como-funciona"} className={botonSecundario}>
            {demoDisponible
              ? textos.portada.accionSecundaria
              : textos.portada.accionSecundariaSinDemo}
          </a>
        </div>

        <p
          className="entra-tarde mt-7 text-[0.875rem] leading-relaxed text-suave"
          style={{ "--retardo": "700ms" } as Estilo}
        >
          {textos.portada.nota}
        </p>
      </div>

      <div className="entra-tarde" style={{ "--retardo": "380ms" } as Estilo}>
        <CapturaEnmarcada
          captura={capturasTurnos.reserva}
          prioritaria
          sizes="(min-width: 640px) 264px, 70vw"
        />
      </div>
    </section>
  );
}

/** El problema, con los números del que lee. */
function Calculadora() {
  return (
    <section id="calculadora" className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h2"
          titulo={textos.calculadora.titulo}
          claseTitulo="max-w-[18ch]"
        />
        <div className="mt-12 lg:mt-16">
          <CalculadoraTurnos />
        </div>
      </div>
    </section>
  );
}

/**
 * Un código QR dibujado en el servidor, como SVG.
 *
 * No hay imagen ni script en el navegador: son rectángulos en el HTML. El
 * margen claro alrededor lo pone el contenedor, que es de donde sale el
 * contraste que necesita la cámara para leerlo.
 */
function CodigoQR({ direccion, etiqueta }: { direccion: string; etiqueta: string }) {
  const codigo = qrcode(0, "M");
  codigo.addData(direccion);
  codigo.make();
  const lado = codigo.getModuleCount();

  let trazo = "";
  for (let fila = 0; fila < lado; fila++) {
    for (let columna = 0; columna < lado; columna++) {
      if (codigo.isDark(fila, columna)) trazo += `M${columna} ${fila}h1v1h-1z`;
    }
  }

  return (
    <svg
      viewBox={`0 0 ${lado} ${lado}`}
      width={132}
      height={132}
      role="img"
      aria-label={etiqueta}
      shapeRendering="crispEdges"
    >
      <path d={trazo} fill="#0b0c0e" />
    </svg>
  );
}

/**
 * Probarlo.
 *
 * Con las direcciones de los demos cargadas, es el demo de verdad: embebido
 * en escritorio, con un botón en el celular. Sin ellas —mientras el producto
 * no está publicado— la sección no existe: invitar a probar algo que no se
 * puede abrir es peor que no decir nada, y la reserva ya se ve en la portada
 * y en el primer paso del recorrido.
 */
function Probar() {
  const capturas = {
    consultorio: <CapturaEnmarcada captura={capturasTurnos.reserva} sizes="264px" />,
    clinica: <CapturaEnmarcada captura={capturasTurnos.especialidades} sizes="264px" />,
  };

  if (!demoDisponible) return null;

  return (
    <section id="probar" className="seccion">
      <div className="contenedor">
        <DemoTurnos
          captura={capturas}
          encabezado={
            <EncabezadoSeccion
              nivel="h2"
              titulo={textos.probar.titulo}
              bajada={textos.probar.bajada}
              claseTitulo="max-w-[14ch]"
            />
          }
          qr={{
            consultorio: (
              <CodigoQR direccion={DEMOS.consultorio} etiqueta="Código QR del demo de consultorio" />
            ),
            clinica: (
              <CodigoQR direccion={DEMOS.clinica} etiqueta="Código QR del demo de centro médico" />
            ),
          }}
        />
      </div>
    </section>
  );
}

/**
 * El recordatorio de WhatsApp, escrito en HTML.
 *
 * No es una captura y está explicado en `content/turnos.ts`: la que hay es
 * chica y muestra una dirección de `localhost`. Los colores son los del modo
 * oscuro de WhatsApp y no los del sitio, a propósito: tiene que reconocerse
 * de un vistazo como lo que le llega al paciente.
 *
 * El texto de los mensajes es texto de verdad, así que un lector de pantalla
 * lo lee en orden; lo decorativo —la barra de estado, los íconos— va oculto.
 */
function ChatWhatsApp() {
  const chat = textos.chat;
  const burbuja = "max-w-[88%] rounded-lg px-2.5 pb-1.5 pt-2 text-[0.8125rem] leading-[1.4]";
  // Al 80 % y no más tenue: sobre el verde de la respuesta del paciente, un
  // blanco al 45 % quedaba en 2,9:1.
  const hora = "mt-1 block text-right text-[0.625rem] text-white/80";

  return (
    <figure className="mx-auto w-full max-w-[280px]">
      <div className="overflow-hidden rounded-[2rem] border border-borde bg-superficie p-2">
        <div className="overflow-hidden rounded-[1.5rem] bg-[#0b141a] text-[#e9edef]">
          <div className="flex items-center gap-2.5 bg-[#1f2c33] px-3 pb-2.5 pt-7">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-[0.75rem] font-semibold text-white"
            >
              C
            </span>
            <div className="min-w-0">
              <p className="truncate text-[0.875rem] font-medium leading-tight">{chat.consultorio}</p>
              <p className="text-[0.6875rem] leading-tight text-white/75">{chat.cuenta}</p>
            </div>
          </div>

          <div className="flex min-h-[23rem] flex-col gap-1.5 px-2.5 pb-5 pt-4">
            <div className={`${burbuja} self-start rounded-tl-none bg-[#1f2c33]`}>
              {chat.recordatorio}
              <span className={hora}>{chat.hora}</span>
            </div>
            {/* Los dos botones del mensaje. No son botones de esta página. */}
            <div aria-hidden="true" className="grid max-w-[88%] grid-cols-2 gap-1.5 self-start">
              <span className="rounded-lg bg-[#1f2c33] px-4 py-2 text-center text-[0.8125rem] text-[#53bdeb]">
                {chat.confirmo}
              </span>
              <span className="rounded-lg bg-[#1f2c33] px-4 py-2 text-center text-[0.8125rem] text-[#53bdeb]">
                {chat.cancelo}
              </span>
            </div>
            <span className="sr-only">
              Botones del mensaje: {chat.confirmo} y {chat.cancelo}.
            </span>

            <div className={`${burbuja} mt-2 self-end rounded-tr-none bg-[#005c4b]`}>
              <span className="sr-only">El paciente responde: </span>
              {chat.cancelo}
              <span className={hora}>{chat.hora}</span>
            </div>

            <div className={`${burbuja} mt-2 self-start rounded-tl-none bg-[#1f2c33]`}>
              {chat.respuesta}
              <span className={hora}>{chat.hora}</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="t-dato mt-4 text-suave">{chat.pie}</figcaption>
    </figure>
  );
}

/**
 * Una pantalla de escritorio del producto.
 *
 * En el celular no se muestra la misma imagen más chica sino otra: un recorte
 * de la pantalla, casi a tamaño real. Lo elige el navegador con `<picture>`,
 * así que el teléfono ni siquiera descarga la versión grande.
 *
 * Cada `<source>` lleva su ancho y su alto, que es lo que le permite al
 * navegador reservar el lugar exacto antes de que llegue la imagen: las dos
 * versiones tienen proporciones distintas y sin eso la página saltaría.
 */
function Pantalla({ captura }: { captura: CapturaDeTurnos }) {
  const ruta = `/imagenes/turnos/${captura.archivo}`;
  const movil = captura.movil;
  const rutaMovil = movil ? `/imagenes/turnos/${movil.archivo}` : "";

  return (
    <figure>
      <div className="overflow-hidden rounded-lg border border-borde bg-superficie">
        <picture>
          {movil && (
            <>
              <source
                media="(max-width: 639px)"
                srcSet={`${rutaMovil}.avif`}
                type="image/avif"
                width={movil.ancho}
                height={movil.alto}
              />
              <source
                media="(max-width: 639px)"
                srcSet={`${rutaMovil}.webp`}
                type="image/webp"
                width={movil.ancho}
                height={movil.alto}
              />
            </>
          )}
          <source srcSet={`${ruta}.avif`} type="image/avif" />
          <source srcSet={`${ruta}.webp`} type="image/webp" />
          <img
            src={`${ruta}.webp`}
            alt={captura.alt}
            width={captura.ancho}
            height={captura.alto}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </picture>
      </div>
      <figcaption className="t-dato mt-4 text-suave">{captura.pie}</figcaption>
    </figure>
  );
}

/** Cómo funciona: cuatro pasos, cada uno con lo que se ve en ese momento. */
function Pasos() {
  const ilustraciones = {
    especialidades: <CapturaEnmarcada captura={capturasTurnos.especialidades} sizes="264px" />,
    agenda: <Pantalla captura={capturasTurnos.agenda} />,
    chat: <ChatWhatsApp />,
    resultados: <Pantalla captura={capturasTurnos.resultados} />,
  };

  return (
    <section id="como-funciona" className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h2"
          titulo={textos.pasos.titulo}
        />

        <ol className="mt-16 flex flex-col gap-20 lg:mt-24 lg:gap-32">
          {textos.pasos.lista.map((paso, i) => (
            <li key={paso.nombre} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <p className="t-dato text-acento">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-subtitulo mt-4 max-w-[18ch]">{paso.nombre}</h3>
                <p className="t-cuerpo mt-5 text-[1.0625rem]">{paso.texto}</p>
              </div>
              <div>
                {ilustraciones[paso.ilustracion as keyof typeof ilustraciones]}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Lo que incluye.
 *
 * Sin íconos y sin numerar. El sitio no tiene un juego de íconos, y doce
 * dibujados para esta sola página serían un segundo sistema visual injertado.
 * Tampoco van numeradas: son doce cosas que hace el producto, no doce pasos,
 * y un número adelante sugiere un orden que no existe.
 */
function Incluye() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h2"
          titulo={textos.incluye.titulo}
        />

        <ul className="mt-14 grid gap-px border border-borde bg-borde sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {textos.incluye.lista.map((item) => (
            <li key={item.nombre} className="bg-fondo p-6 lg:p-8">
              <h3 className="font-display text-[1.125rem] font-medium leading-snug tracking-[-0.01em]">
                {item.nombre}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-suave">{item.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Para quién es y para quién no. Decir lo segundo es lo que hace creíble lo primero. */
function Encaje() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h2"
          titulo={textos.encaje.titulo}
          claseTitulo="max-w-[16ch]"
        />

        <div className="mt-14 grid gap-px border border-borde bg-borde lg:mt-20 lg:grid-cols-2">
          <div className="bg-fondo p-7 lg:p-10">
            <h3 className="t-subtitulo">{textos.encaje.si.titulo}</h3>
            <ul className="mt-7 flex flex-col gap-4">
              {textos.encaje.si.lista.map((item) => (
                <li key={item} className="grid grid-cols-[auto_1fr] gap-4">
                  <span aria-hidden="true" className="mt-3 h-px w-6 bg-acento" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-fondo p-7 lg:p-10">
            <h3 className="t-subtitulo text-suave">{textos.encaje.no.titulo}</h3>
            <ul className="mt-7 flex flex-col gap-4 text-suave">
              {textos.encaje.no.lista.map((item) => (
                <li key={item} className="grid grid-cols-[auto_1fr] gap-4">
                  <span aria-hidden="true" className="mt-3 h-px w-6 bg-suave/40" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <p className="max-w-[40ch] font-display text-[1.25rem] font-medium leading-snug tracking-[-0.01em] sm:text-[1.5rem]">
            {textos.encaje.cierre}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Los datos. Tres líneas, sin dramatizar. */
function Datos() {
  return (
    <section className="seccion">
      <div className="contenedor grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <EncabezadoSeccion
            nivel="h2"
            titulo={textos.datos.titulo}
            claseTitulo="max-w-[14ch]"
          />
        </div>

        <ul className="border-t border-borde">
          {textos.datos.lista.map((linea) => (
            <li key={linea}>
              <p className="border-b border-borde py-6 text-[1.0625rem] leading-relaxed">{linea}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Preguntas() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h2"
          titulo={textos.preguntas.titulo}
        />
        <div className="mt-14 lg:mt-20">
          <MedirPreguntas pagina="turnos">
            <Acordeon items={preguntasTurnos} nivel="h3" />
          </MedirPreguntas>
        </div>
      </div>
    </section>
  );
}

/**
 * El cierre.
 *
 * Lleva el `id` que mira la barra fija del celular para saber cuándo
 * esconderse: acá ya hay un botón igual, y grande.
 */
function Cierre() {
  return (
    <section id="pedir" className="seccion border-t border-borde">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h2"
          titulo={textos.cierre.titulo}
          bajada={textos.cierre.bajada}
          claseTitulo="max-w-[16ch]"
        />

        <div className="mt-10">
          <EnlaceWhatsApp
            mensaje={MENSAJE_DEMO}
            origen="turnos_cierre"
            className={`${botonPrimario} w-full sm:w-auto`}
          >
            {textos.cierre.accion}
          </EnlaceWhatsApp>

          <p className="mt-7 text-[0.9375rem] text-suave">
            {textos.cierre.alternativa}{" "}
            <a
              href={`mailto:${sitio.email}?subject=${encodeURIComponent("Demo de Visintin Turnos")}`}
              className="text-texto underline decoration-borde underline-offset-4 transition-colors duration-300 hover:text-acento hover:decoration-acento"
            >
              {sitio.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
