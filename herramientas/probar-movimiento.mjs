/**
 * Comprueba que el movimiento del sitio funcione, con las animaciones
 * ENCENDIDAS.
 *
 *   node herramientas/probar-movimiento.mjs [url-base]
 *
 * ── Por qué existe ──
 *
 * La máquina donde se desarrolla este sitio tiene `prefers-reduced-motion:
 * reduce` activado en el sistema. Eso significa que el navegador local —y el
 * panel de vista previa, que hereda la preferencia— muestra el sitio
 * completamente quieto. Correcto según lo que pide la preferencia, y
 * completamente inútil para revisar si el movimiento está bien hecho.
 *
 * ── Qué revisa ──
 *
 * El sitio tiene un solo movimiento que no dispara la persona: la portada,
 * con el título que entra línea por línea y el mapa de procesos que se
 * ordena. Todo lo demás —entradas al bajar, cinta, deriva, cursor— se sacó a
 * propósito. Así que esto comprueba dos cosas: que el mapa se anime y termine
 * en su estado final, y que en ninguna página haya otra animación corriendo
 * que no sea de las permitidas. Si alguien vuelve a agregar un efecto
 * repartido, acá aparece.
 *
 * Esta herramienta levanta Chrome emulando `no-preference` y verifica cada
 * pieza por separado, mirando el estado real del DOM y de las animaciones en
 * vez de sacar una foto: una captura de algo que se mueve no prueba nada.
 *
 * Corre las dos preferencias, además, porque la mitad del trabajo es que con
 * movimiento reducido NO pase nada.
 *
 * Conviene correrlo contra el build y no contra `next dev`, que compila a
 * demanda y puede no haber hidratado cuando la sonda mide:
 *
 *   npm run build
 *   PUERTO=4407 node herramientas/servir-build.mjs
 *   node herramientas/probar-movimiento.mjs http://127.0.0.1:4407
 */
import { spawn } from "node:child_process";

const CHROME =
  process.env.CHROME_BIN ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const BASE = process.argv[2] ?? "http://localhost:3100";
const PUERTO = 9723 + Math.floor(Math.random() * 300);

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    `--remote-debugging-port=${PUERTO}`,
    "--window-size=1440,900",
    "about:blank",
  ],
  { stdio: "ignore" },
);

async function puntoDeEntrada() {
  for (let intento = 0; intento < 40; intento++) {
    try {
      const objetivos = await (await fetch(`http://127.0.0.1:${PUERTO}/json/list`)).json();
      const pestania = objetivos.find((o) => o.type === "page" && o.webSocketDebuggerUrl);
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

/**
 * Lo que se mide en cada página, del lado del navegador.
 *
 * Devuelve datos crudos y no veredictos: quién decide si está bien o mal es
 * la tabla de abajo, para que el criterio esté en un solo lugar.
 */
const SONDA = `(async () => {
  const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

  // Lo que puede moverse solo. Cualquier otra animación es un efecto
  // repartido que no tendría que estar.
  const PERMITIDAS = ".mapa, .linea-mascara, .entra-tarde, .transicion-pagina, .progreso-lectura";

  const mapa = document.querySelector(".mapa");
  const animMapa = mapa ? mapa.getAnimations({ subtree: true }).length : -1;

  // El último paso termina de aparecer a los 3,7 s de la carga. Se espera a
  // que haya terminado, con margen, para leer el estado final, que es el
  // que importa.
  await dormir(4400);
  const despues = mapa
    ? [...mapa.querySelectorAll(".mapa-despues")].map((n) => getComputedStyle(n).opacity)
    : [];

  const intrusas = document
    .getAnimations()
    .filter((a) => {
      const blanco = a.effect && a.effect.target;
      return !(blanco && blanco.closest && blanco.closest(PERMITIDAS));
    })
    .map((a) => (a.animationName || a.constructor.name) + " en " + (a.effect?.target?.className || "?"));

  const barra = document.querySelector(".progreso-lectura");

  return {
    mapa: Boolean(mapa),
    animMapa,
    despues,
    intrusas,
    barraExiste: Boolean(barra),
    animBarra: barra ? barra.getAnimations().length : -1,
    transicion: Boolean(document.querySelector(".transicion-pagina")),
  };
})()`;

const PAGINAS = ["/", "/servicios", "/diagnostico", "/proyectos/taller-italia", "/turnos"];

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
  await enviar("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  let fallas = 0;

  for (const preferencia of ["no-preference", "reduce"]) {
    console.log(`\n${"═".repeat(78)}`);
    console.log(`prefers-reduced-motion: ${preferencia}`);
    console.log("═".repeat(78));

    await enviar("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: preferencia }],
    });

    for (const ruta of PAGINAS) {
      const cargada = cuandoOcurra("Page.loadEventFired");
      await enviar("Page.navigate", { url: `${BASE}${ruta}` });
      await cargada;
      await esperar(400);

      const { result } = await enviar("Runtime.evaluate", {
        awaitPromise: true,
        returnByValue: true,
        expression: SONDA,
      });
      const d = result.value;

      if (!d) {
        console.log(`${ruta.padEnd(28)} ERROR: la sonda no devolvió nada`);
        fallas++;
        continue;
      }

      const conMovimiento = preferencia === "no-preference";
      const enInicio = ruta === "/";
      const todosVisibles = d.despues.length > 0 && d.despues.every((o) => o === "1");

      const filas = [
        [
          "mapa de procesos",
          !d.mapa
            ? "no está en esta página"
            : `${d.animMapa} animación(es), ${d.despues.filter((o) => o === "1").length}/${d.despues.length} pasos visibles al final`,
          // En el inicio tiene que estar, terminar con todos los pasos a la
          // vista y animarse sólo si el movimiento está permitido. En el
          // resto de las páginas no tiene que estar.
          enInicio
            ? d.mapa && todosVisibles && (conMovimiento ? d.animMapa > 0 : d.animMapa === 0)
            : !d.mapa,
        ],
        [
          "animaciones fuera de lugar",
          d.intrusas.length === 0 ? "ninguna" : d.intrusas.join(", "),
          d.intrusas.length === 0,
        ],
        [
          "progreso de lectura",
          d.barraExiste ? `${d.animBarra} animación(es)` : "no está",
          d.barraExiste && (conMovimiento ? d.animBarra > 0 : true),
        ],
        ["transición de página", d.transicion ? "presente" : "FALTA", d.transicion],
      ];

      console.log(`\n  ${ruta}`);
      for (const [que, valor, bien] of filas) {
        if (!bien) fallas++;
        console.log(`    ${bien ? "ok  " : "MAL "} ${que.padEnd(28)} ${valor}`);
      }
    }
  }

  console.log(`\n${"═".repeat(78)}`);
  console.log(fallas === 0 ? "Todo en orden." : `${fallas} comprobacion(es) fallaron.`);
  ws.close();
  chrome.kill();
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  chrome.kill();
  process.exit(1);
});
