#!/usr/bin/env bash
# Captura los sitios del portfolio en su viewport natural.
#
# Se pide una ventana un poco más alta que el recorte final por dos motivos:
# arriba, para poder sacar la barra de "DEMO" que lleva el sitio;
# abajo, para que la insignia "Powered by Netlify" —que es fija y se pega al
# borde inferior de la ventana— quede fuera del recorte.
#
#   bash herramientas/capturar-portfolio.sh .capturas [proyecto]
#
# Con un segundo argumento sólo se saca ese proyecto —`bulk`,
# `taller-italia`— y no se vuelve a fotografiar el resto, que puede haber
# cambiado en línea desde la última vez.
set -e
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
DEST="$1"
SOLO="${2:-}"
mkdir -p "$DEST"

toca() { [ -z "$SOLO" ] || [ "$SOLO" = "$1" ]; }

tomar() { # archivo url ancho alto
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-sandbox \
    --virtual-time-budget=9000 --force-device-scale-factor=2 \
    --window-size="$3,$4" --screenshot="$DEST/$1.png" "$2" >/dev/null 2>&1
  echo "  $1"
}

TI=https://talleritalia.netlify.app

if toca taller-italia; then
  echo "== taller italia"
  tomar taller-italia-inicio      "$TI/es"                                 1440 1020
  tomar taller-italia-interior    "$TI/es/trabajos/sprinter-techo-elevable" 1440 1020
  tomar taller-italia-rental      "$TI/es/rental"                          1440 1020
  tomar taller-italia-movil       "$TI/es"                                  390  960
fi

# BULK no se puede sacar con `--screenshot` a secas. A los cuatro segundos,
# o al bajar un tercio de la página, abre una ventana de bienvenida que tapa
# todo; y la toma del carrito necesita productos cargados y el panel abierto.
# Va por capturar-pagina.mjs, que conduce Chrome y deja correr código antes
# de la foto. Fotografía el viewport exacto, así que no hay barra que recortar.
#
# En las cuatro se saca la insignia "Powered by Netlify": la inyecta Netlify
# en los sitios que no tienen dominio propio y no es parte del sitio.
BK=https://bulksuplementos.netlify.app
LIMPIAR='document.querySelectorAll("dialog[open]").forEach((d) => d.close());
  document.getElementById("nl-badge-frame")?.remove();
  window.scrollTo(0, 0);'
# Tres productos de rubros distintos —creatina, barras, pasta de maní— y
# no tres proteínas: el panel tiene que mostrar un pedido creíble. Se espera
# a que se vaya el aviso de "Agregaste…" antes de abrir el carrito.
CARRITO='const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
  const botones = [...document.querySelectorAll("button[aria-label^=Agregar]")];
  for (const nombre of ["Creatine 100% Pure", "Barras Proteicas Alta Fibra", "Pasta de Maní"]) {
    botones.find((b) => b.getAttribute("aria-label").includes(nombre))?.click();
    await esperar(400);
  }
  await esperar(4000);
  document.querySelector("[aria-label=\"Abrir carrito\"]")?.click();
  await esperar(1500);'

foto() { # archivo url ancho alto [código antes de la foto]
  SCROLL=0 EJECUTAR="$LIMPIAR ${5:-}"     node herramientas/capturar-pagina.mjs "$2" "$DEST/$1.png" "$3" "$4" >/dev/null
  echo "  $1"
}

if toca bulk; then
  echo "== bulk"
  foto bulk-inicio    "$BK/"                                  1440 900
  foto bulk-producto  "$BK/producto/body-advance-whey-protein/" 1440 900
  foto bulk-carrito   "$BK/tienda/"                           1440 900 "$CARRITO"
  foto bulk-movil     "$BK/"                                   390 844
fi

# Cuando entre un proyecto nuevo se agrega su bloque acá, con las mismas
# cuatro tomas: portada, una página interior, otra sección y la vista de
# teléfono. Después hay que sumarlo a `trabajos` en procesar-capturas.mjs.
#
# Las capturas del "antes" —búsquedas de Google, fichas, páginas caídas— no
# salen de acá: se sacan a mano y se recortan con procesar-evidencia.mjs,
# porque vienen con datos personales del navegador.
