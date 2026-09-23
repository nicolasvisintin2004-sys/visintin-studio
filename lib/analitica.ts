"use client";

import { sitio } from "@/content/sitio";

type Propiedades = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    umami?: { track: (nombre: string, datos?: Propiedades) => void };
  }
}

/**
 * Envoltorio único de analítica. Todo el sitio registra por acá, así el día
 * que cambie el proveedor se toca un solo archivo.
 *
 * Hay dos proveedores y conviven:
 *
 *  · Google Analytics 4, que es gratis y da el informe completo;
 *  · Umami, que no usa cookies, pesa unos 2 KB y no obliga a poner un cartel
 *    de consentimiento —que es lo que lo vuelve el panel del día a día—.
 *
 * Cada uno se enciende completando su variable de entorno, y los eventos se
 * envían a los dos con el mismo nombre. Con las dos vacías el sitio no le
 * pide un byte a nadie y sigue funcionando igual.
 *
 * Los dos scripts se cargan tarde a propósito: no tienen nada que hacer en el
 * camino crítico. Se inyectan cuando el navegador queda ocioso o, si eso no
 * llega, en la primera interacción de la persona —que es justo antes de que
 * pueda existir el primer evento que importe.
 *
 * `gtag` encola en `dataLayer` incluso antes de que el script exista, así que
 * un clic muy temprano no se pierde. Umami no tiene esa cola, así que los
 * eventos anteriores a su carga se guardan acá y se envían al llegar.
 */

let inyectado = false;
/** Eventos ocurridos antes de que Umami terminara de cargar. */
const pendientesUmami: [string, Propiedades][] = [];

function inyectar() {
  if (inyectado) return;
  inyectado = true;

  if (sitio.googleAnalytics) {
    const etiqueta = document.createElement("script");
    etiqueta.async = true;
    etiqueta.src = `https://www.googletagmanager.com/gtag/js?id=${sitio.googleAnalytics}`;
    document.head.appendChild(etiqueta);

    gtag("js", new Date());
    gtag("config", sitio.googleAnalytics, { send_page_view: true });
  }

  if (sitio.umamiId) {
    const etiqueta = document.createElement("script");
    etiqueta.defer = true;
    etiqueta.src = `${sitio.umamiHost.replace(/\/$/, "")}/script.js`;
    etiqueta.setAttribute("data-website-id", sitio.umamiId);
    etiqueta.addEventListener("load", vaciarPendientes);
    document.head.appendChild(etiqueta);
  }
}

function vaciarPendientes() {
  if (!window.umami) return;
  for (const [nombre, propiedades] of pendientesUmami.splice(0)) {
    window.umami.track(nombre, propiedades);
  }
}

function gtag(...argumentos: unknown[]) {
  window.dataLayer = window.dataLayer ?? [];
  // GA4 exige `arguments` y no un array: por eso el push del objeto crudo.
  window.dataLayer.push(argumentos);
}

/** Si hay al menos un proveedor configurado. */
function hayMedicion() {
  return Boolean(sitio.googleAnalytics || sitio.umamiId);
}

/**
 * Se llama una vez desde el layout. Si no hay ningún proveedor configurado no
 * hace absolutamente nada y el sitio no le pide un byte a nadie.
 */
export function prepararAnalitica() {
  if (!hayMedicion() || typeof window === "undefined") return;

  const alOcioso =
    window.requestIdleCallback ?? ((fn: () => void) => window.setTimeout(fn, 2500));

  const primeraInteraccion = () => {
    inyectar();
    quitarEscuchas();
  };

  const quitarEscuchas = () => {
    for (const evento of ["pointerdown", "keydown", "touchstart"] as const) {
      window.removeEventListener(evento, primeraInteraccion);
    }
  };

  for (const evento of ["pointerdown", "keydown", "touchstart"] as const) {
    window.addEventListener(evento, primeraInteraccion, { once: true, passive: true });
  }

  alOcioso(() => {
    inyectar();
    quitarEscuchas();
  });
}

/**
 * Registra un evento en los dos proveedores. Nunca lanza: la medición no
 * puede romper una interacción del visitante, y menos la que lo lleva a
 * WhatsApp o la que envía una consulta.
 */
export function registrarEvento(nombre: string, propiedades: Propiedades = {}) {
  try {
    if (!hayMedicion()) return;
    inyectar();

    if (sitio.googleAnalytics) gtag("event", nombre, propiedades);

    if (sitio.umamiId) {
      if (window.umami) window.umami.track(nombre, propiedades);
      else pendientesUmami.push([nombre, propiedades]);
    }
  } catch {
    // Silencio deliberado.
  }
}

/**
 * Los cuatro eventos que importan.
 *
 * Están nombrados una sola vez y en un solo lugar para que el panel no
 * termine con `click_whatsapp`, `clic_whatsapp` y `whatsapp_click` contando
 * lo mismo por separado. Los nombres van en inglés, a diferencia del resto
 * del código: son los que se leen en el panel de Google y de Umami, donde
 * todo lo demás también está en inglés.
 */

/** Un clic al WhatsApp. `origen` dice desde qué parte del sitio salió. */
export function registrarClicWhatsApp(origen: string) {
  registrarEvento("click_whatsapp", { origen });
}

/** Alguien abrió la página del diagnóstico, que es el producto de entrada. */
export function registrarVistaDiagnostico() {
  registrarEvento("view_diagnostico");
}

/** Alguien abrió la página de un proyecto. */
export function registrarVistaCaso(slug: string) {
  registrarEvento("view_caso", { caso: slug });
}

/**
 * Se envió el formulario y el servidor lo aceptó.
 *
 * Se registra recién con la respuesta correcta del servidor y no al tocar el
 * botón: si se registrara antes, un error de red contaría como consulta
 * recibida y el número del panel no coincidiría con la lista de verdad.
 */
export function registrarEnvioLead(origen: string, rubro: string) {
  registrarEvento("submit_lead", { origen, rubro });
}
