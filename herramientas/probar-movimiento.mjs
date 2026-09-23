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
 * completamente quieto: sin preloader, sin entradas por scroll, sin cursor,
 * sin cinta. Todo correcto según lo que pide la preferencia, y completamente
 * inútil para revisar si el movimiento está bien hecho.
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

  // Recorrer la página entera dispara los observers y carga lo diferido.
  const paso = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += paso) {
    window.scrollTo(0, y);
    await dormir(120);
  }
  await dormir(600);

  // ── Títulos partidos en líneas ──────────────────────────────────
  const titulos = [...document.querySelectorAll(".titulo-revelado")].map((t) => ({
    lineas: t.querySelectorAll(".linea-mascara").length,
    entro: t.dataset.entrar === "si",
    texto: t.textContent.replace(/\\s+/g, " ").trim(),
  }));

  // ── Progreso de lectura ─────────────────────────────────────────
  const barra = document.querySelector(".progreso-lectura");
  const animBarra = barra ? barra.getAnimations().length : -1;

  // ── Cinta ───────────────────────────────────────────────────────
  const cinta = document.querySelector(".cinta");
  const animCinta = cinta ? cinta.getAnimations() : [];
  let tasaCinta = null;
  if (animCinta.length) {
    // Un scroll brusco tiene que cambiarle la velocidad.
    window.scrollTo(0, 0);
    await dormir(200);
    window.scrollTo(0, 1200);
    await dormir(80);
    tasaCinta = animCinta[0].playbackRate;
  }

  // ── Deriva de las capturas ──────────────────────────────────────
  const conDeriva = [...document.querySelectorAll(".deriva img")];
  const animDeriva = conDeriva.filter((i) => i.getAnimations().length > 0).length;

  // ── Transición de página ────────────────────────────────────────
  const transicion = document.querySelector(".transicion-pagina");

  return {
    titulos,
    barraExiste: Boolean(barra),
    animBarra,
    cintaExiste: Boolean(cinta),
    animCinta: animCinta.length,
    tasaCinta,
    capturas: conDeriva.length,
    animDeriva,
    transicion: Boolean(transicion),
  };
})()`;

const PAGINAS = ["/", "/servicios", "/diagnostico", "/proyectos/taller-italia"];

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
  let partidosEnTotal = 0;

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
      await esperar(2200);

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
      const partidos = d.titulos.filter((t) => t.lineas > 1).length;
      if (conMovimiento) partidosEnTotal += partidos;
      const entraron = d.titulos.filter((t) => t.entro).length;

      const filas = [
        [
          "títulos partidos en líneas",
          `${partidos} de ${d.titulos.length} (${entraron} ya entraron)`,
          /*
           * Con movimiento, el conteo por página es informativo y no una
           * condición. Un título que ya está en pantalla al cargar no se
           * parte a propósito —esconderlo para después mostrarlo sería un
           * parpadeo— y uno que entra en un solo renglón tampoco, porque la
           * técnica no aportaría nada. Así que hay páginas donde cero es
           * exactamente lo correcto: la del caso, sin ir más lejos, tiene
           * tres encabezados y los tres entran en un renglón.
           *
           * Lo que sí es condición: que el sitio entero parta alguno (se
           * comprueba al final) y que con movimiento reducido no parta
           * ninguno, en ninguna página.
           */
          conMovimiento ? true : d.titulos.length === 0,
        ],
        [
          "progreso de lectura",
          d.barraExiste ? `${d.animBarra} animación(es)` : "no está",
          d.barraExiste && (conMovimiento ? d.animBarra > 0 : true),
        ],
        [
          "cinta",
          d.cintaExiste
            ? `${d.animCinta} anim · velocidad ${d.tasaCinta ?? "—"}`
            : "no está en esta página",
          !d.cintaExiste || (conMovimiento ? d.animCinta > 0 : d.animCinta === 0),
        ],
        [
          "deriva de capturas",
          d.capturas === 0 ? "no hay capturas" : `${d.animDeriva}/${d.capturas}`,
          d.capturas === 0 || (conMovimiento ? d.animDeriva > 0 : d.animDeriva === 0),
        ],
        ["transición de página", d.transicion ? "presente" : "FALTA", d.transicion],
      ];

      console.log(`\n  ${ruta}`);
      for (const [que, valor, bien] of filas) {
        if (!bien) fallas++;
        console.log(`    ${bien ? "ok  " : "MAL "} ${que.padEnd(28)} ${valor}`);
      }

      // El texto de un título partido tiene que seguir siendo el mismo.
      for (const t of d.titulos) {
        if (t.texto.includes("  ") || t.texto !== t.texto.trim()) {
          console.log(`    MAL  texto corrompido al partir: ${JSON.stringify(t.texto)}`);
          fallas++;
        }
      }
    }
  }

  console.log(`\n${"═".repeat(78)}`);
  // El sitio entero tiene que partir titulos en alguna parte. Si esto da
  // cero, la medicion de lineas se rompio y nadie lo vio: el titulo se sigue
  // leyendo igual, nada mas que quieto.
  if (partidosEnTotal === 0) {
    console.log("MAL  ningun titulo se partio en lineas en todo el sitio");
    fallas++;
  } else {
    console.log(`ok   ${partidosEnTotal} titulos partidos en lineas en total`);
  }

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
