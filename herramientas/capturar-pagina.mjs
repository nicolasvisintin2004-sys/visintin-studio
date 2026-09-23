/**
 * Captura una página entera conduciendo Chrome por el protocolo de DevTools.
 *
 * Por qué no alcanza con `chrome --headless --screenshot --window-size=W,H`:
 * este sitio usa `svh` y `100vh` (el hero, el pin del portfolio), así que
 * pedir una ventana de 14000px de alto no fotografía la página larga — la
 * estira. Hay que mantener el viewport real y que Chrome componga el resto,
 * que es exactamente lo que hace `captureBeyondViewport`.
 *
 * Sin dependencias: Node trae cliente WebSocket desde la 22.
 *
 *   node herramientas/capturar-pagina.mjs <url> <archivo.png> [ancho] [alto]
 *
 * Variables de entorno:
 *   SCROLL=<px>      fotografía sólo el viewport en esa posición
 *   MOVIMIENTO=reduce  emula `prefers-reduced-motion: reduce`
 *   HOVER=<selector>   deja el mouse encima de ese elemento
 *   EJECUTAR=<js>      corre una expresión antes de la foto
 *
 * Con MOVIMIENTO=reduce se emula `prefers-reduced-motion: reduce`; con
 * cualquier otro valor, `no-preference`. Hace falta poder forzar las dos:
 * si la máquina donde se corre tiene el movimiento reducido activado en el
 * sistema, las entradas por scroll y el desplazamiento horizontal del
 * portfolio no se arman y la captura muestra el sitio quieto.
 */
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";

const CHROME =
  process.env.CHROME_BIN ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const [url, salida, ancho = "1440", alto = "900"] = process.argv.slice(2);
if (!url || !salida) {
  console.error("uso: node herramientas/capturar-pagina.mjs <url> <archivo.png> [ancho] [alto]");
  process.exit(1);
}

const PUERTO = 9223 + Math.floor(Math.random() * 400);

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    `--remote-debugging-port=${PUERTO}`,
    `--window-size=${ancho},${alto}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * La dirección de depuración de la PESTAÑA.
 *
 * Importa que sea la de la pestaña y no la de `/json/version`, que es la del
 * navegador: al target del navegador se le pueden pedir cosas de `Target` y
 * `Browser`, pero un `Page.enable` se queda esperando para siempre.
 *
 * Chrome tarda un momento en abrir el puerto, así que se reintenta en vez de
 * dormir a ciegas una cantidad inventada de milisegundos.
 */
async function puntoDeEntrada() {
  for (let intento = 0; intento < 40; intento++) {
    try {
      const respuesta = await fetch(`http://127.0.0.1:${PUERTO}/json/list`);
      const objetivos = await respuesta.json();
      const pestania = objetivos.find(
        (o) => o.type === "page" && o.webSocketDebuggerUrl,
      );
      if (pestania) return pestania.webSocketDebuggerUrl;
    } catch {
      // El puerto todavía no está.
    }
    await esperar(250);
  }
  throw new Error("Chrome no abrió el puerto de depuración");
}

function conectar(direccion) {
  return new Promise((resolver, rechazar) => {
    const ws = new WebSocket(direccion);
    ws.onopen = () => resolver(ws);
    ws.onerror = rechazar;
  });
}

async function main() {
  const ws = await conectar(await puntoDeEntrada());

  let siguiente = 0;
  const pendientes = new Map();
  const eventos = new Map();

  ws.onmessage = ({ data }) => {
    const mensaje = JSON.parse(data);
    if (mensaje.id && pendientes.has(mensaje.id)) {
      pendientes.get(mensaje.id)(mensaje.result);
      pendientes.delete(mensaje.id);
    } else if (mensaje.method && eventos.has(mensaje.method)) {
      eventos.get(mensaje.method)();
      eventos.delete(mensaje.method);
    }
  };

  const enviar = (method, params = {}) =>
    new Promise((resolver) => {
      const id = ++siguiente;
      pendientes.set(id, resolver);
      ws.send(JSON.stringify({ id, method, params }));
    });

  const cuandoOcurra = (method) => new Promise((r) => eventos.set(method, r));

  await enviar("Page.enable");
  await enviar("Runtime.enable");
  await enviar("Emulation.setEmulatedMedia", {
    features: [
      {
        name: "prefers-reduced-motion",
        value: process.env.MOVIMIENTO === "reduce" ? "reduce" : "no-preference",
      },
    ],
  });
  await enviar("Emulation.setDeviceMetricsOverride", {
    width: Number(ancho),
    height: Number(alto),
    deviceScaleFactor: 2,
    mobile: Number(ancho) < 768,
  });

  const cargada = cuandoOcurra("Page.loadEventFired");
  await enviar("Page.navigate", { url });
  await cargada;

  // Margen para las fuentes, la hidratación y las entradas por scroll.
  await esperar(2500);

  // Se recorre la página hasta el final para que se disparen los observers y
  // se carguen las imágenes diferidas; después se va a donde haya que mirar.
  const destino = process.env.SCROLL ? Number(process.env.SCROLL) : 0;
  await enviar("Runtime.evaluate", {
    awaitPromise: true,
    expression: `(async () => {
      const paso = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += paso) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 140));
      }
      window.scrollTo(0, ${destino});
      await new Promise(r => setTimeout(r, 1200));
    })()`,
  });

  // HOVER lleva el mouse de verdad al centro del elemento que coincida con el
  // selector. Es un movimiento real del puntero y no una clase agregada a
  // mano, así que dispara `:hover`, `group-hover` y los `pointermove` que
  // mueven el cursor y el panel de servicios. Sin esto no hay forma de
  // fotografiar la mitad de los estados del sitio.
  if (process.env.HOVER) {
    const { result } = await enviar("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const n = document.querySelector(${JSON.stringify(process.env.HOVER)});
        if (!n) return null;
        n.scrollIntoView({ block: "center", behavior: "instant" });
        const c = n.getBoundingClientRect();
        return { x: Math.round(c.left + c.width / 2), y: Math.round(c.top + c.height / 2) };
      })()`,
    });

    const punto = result?.value;
    if (!punto) throw new Error(`HOVER: no hay ningún elemento para ${process.env.HOVER}`);

    // Dos movimientos: el primero despierta los escuchas, el segundo deja el
    // puntero quieto donde va la foto.
    for (const [x, y] of [[punto.x - 40, punto.y - 40], [punto.x, punto.y]]) {
      await enviar("Input.dispatchMouseEvent", { type: "mouseMoved", x, y, buttons: 0 });
      await esperar(400);
    }
    await esperar(900);
  }

  // EJECUTAR corre una expresión en la página antes de la foto. Sirve para
  // fotografiar estados que sólo existen después de una interacción: una fila
  // de servicio abierta, una pregunta desplegada, un menú de mobile.
  if (process.env.EJECUTAR) {
    const { result } = await enviar("Runtime.evaluate", {
      awaitPromise: true,
      returnByValue: true,
      expression: `(async () => { ${process.env.EJECUTAR} })()`,
    });
    if (result?.value !== undefined) console.log("→", JSON.stringify(result.value));
    await esperar(900);
  }

  // Con SCROLL se fotografía sólo el viewport, y es lo que conviene casi
  // siempre. `captureBeyondViewport` vuelve a maquetar con el alto completo
  // del documento y ahí las unidades relativas al viewport dejan de valer lo
  // mismo: el título del hero, que se dimensiona en vw, sale a un cuarto de
  // su tamaño. Sirve para una página sin `vw` ni `svh`, y para nada más.
  const { data } = await enviar("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: !process.env.SCROLL && !process.env.HOVER,
    optimizeForSpeed: false,
  });

  await writeFile(salida, Buffer.from(data, "base64"));
  console.log(`${salida} listo`);

  ws.close();
  chrome.kill();
}

main().catch((error) => {
  console.error(error);
  chrome.kill();
  process.exit(1);
});
