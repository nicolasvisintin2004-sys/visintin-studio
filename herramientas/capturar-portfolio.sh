#!/usr/bin/env bash
# Captura los sitios del portfolio en su viewport natural.
#
# Se pide una ventana un poco más alta que el recorte final por dos motivos:
# arriba, para poder sacar la barra de "DEMO" que lleva el sitio;
# abajo, para que la insignia "Powered by Netlify" —que es fija y se pega al
# borde inferior de la ventana— quede fuera del recorte.
set -e
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
DEST="$1"
mkdir -p "$DEST"

tomar() { # archivo url ancho alto
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-sandbox \
    --virtual-time-budget=9000 --force-device-scale-factor=2 \
    --window-size="$3,$4" --screenshot="$DEST/$1.png" "$2" >/dev/null 2>&1
  echo "  $1"
}

TI=https://talleritalia.netlify.app

echo "== taller italia"
tomar taller-italia-inicio      "$TI/es"                                 1440 1020
tomar taller-italia-interior    "$TI/es/trabajos/sprinter-techo-elevable" 1440 1020
tomar taller-italia-rental      "$TI/es/rental"                          1440 1020
tomar taller-italia-movil       "$TI/es"                                  390  960

# Cuando entre un proyecto nuevo se agrega su bloque acá, con las mismas
# cuatro tomas: portada, una página interior, otra sección y la vista de
# teléfono. Después hay que sumarlo a `trabajos` en procesar-capturas.mjs.
#
# Las capturas del "antes" —búsquedas de Google, fichas, páginas caídas— no
# salen de acá: se sacan a mano y se recortan con procesar-evidencia.mjs,
# porque vienen con datos personales del navegador.
