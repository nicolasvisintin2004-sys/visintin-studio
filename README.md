# Visintin Studio

El sitio de Visintin Studio: en español, con una página por sección y una
página propia por proyecto del portfolio.

Lo que el sitio dice que hace: **ordeno y automatizo el trabajo de una PyME, y
la web es una de las piezas.** Son dos líneas de trabajo con el mismo peso
—sitios y sistemas web, e IA y automatización aplicada— y las dos empiezan por
el mismo lugar, que es el diagnóstico.

| Ruta | Qué hay |
| --- | --- |
| `/` | Hero, diagnóstico, cinta de rubros, índice de secciones y cierre |
| `/diagnostico` | El producto de entrada, con página propia y barra reducida |
| `/servicios` | Los cuatro servicios agrupados en dos líneas, y los nueve entregables |
| `/proyectos` | El portfolio, con desplazamiento horizontal en escritorio |
| `/proyectos/<slug>` | Cada proyecto: resultado, situación inicial con capturas del "antes", qué se desarrolló |
| `/planes` | Cómo trabajo: el diagnóstico, las tres ramas y los tres planes web |
| `/estudio` | Sobre mí y las preguntas frecuentes |
| `/contacto` | WhatsApp, formulario y correo |
| `/notas` | El blog en MDX. **Todavía no está en el menú** |
| `/notas/<slug>` | Cada nota |
| `/api/leads` | Recibe el formulario. Es una función de Netlify |
| `/api/leads/export` | Baja las consultas en CSV, con token |

El inicio no repite el contenido de las otras páginas: presenta el estudio y
lleva a cada sección. Al pie de cada página hay una franja que lleva a la
siguiente, en el orden del menú. `/diagnostico` es la excepción a todo: es una
página de aterrizaje, así que no tiene menú completo ni franja al pie, porque
el único camino hacia adelante es el formulario.

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4, compilado como estático
puro y servido desde el CDN de Netlify. GSAP se usa sólo para el desplazamiento
horizontal del portfolio y se descarga aparte, nada más en escritorio.

```bash
npm install
npm run dev
```

Queda en http://localhost:3100.

> ### ⚠ Si el sitio se ve completamente quieto
>
> Fijate si tu sistema tiene **"reducir movimiento"** activado. Windows lo
> llama *Configuración → Accesibilidad → Efectos visuales → Efectos de
> animación*; macOS, *Accesibilidad → Pantalla → Reducir movimiento*.
>
> Con eso activado el sitio apaga **todo** a propósito: el preloader, las
> entradas por scroll, los títulos que suben línea por línea, el cursor, la
> cinta, la deriva de las capturas y el progreso de lectura. Es correcto y es
> obligatorio, pero deja el sitio pareciendo estático, y desde ahí es
> imposible revisar si el movimiento está bien hecho.
>
> Para verlo con el movimiento encendido sin tocar la configuración del
> sistema, está la herramienta de más abajo:
>
> ```bash
> node herramientas/probar-movimiento.mjs http://127.0.0.1:4407
> ```

---

## Dónde se toca cada cosa

Todo el contenido vive en `content/`, tipado. Para cambiar un texto no hay que
abrir ningún componente.

| Archivo | Qué tiene |
| --- | --- |
| `content/sitio.ts` | WhatsApp, correo, dirección del sitio, medición y los mensajes precargados |
| `content/textos.ts` | Los textos de cada sección: títulos, bajadas, botones |
| `content/diagnostico.ts` | **El precio**, los cuatro entregables, el proceso y las preguntas del diagnóstico |
| `content/servicios.ts` | Las dos líneas, los cuatro servicios y los rubros de la cinta |
| `content/pedidos.ts` | Los entregables concretos que van al pie de Servicios |
| `content/proyectos.ts` | Los proyectos del portfolio, con su resultado y sus capturas |
| `content/planes.ts` | Las tres ramas, los tres planes y el mantenimiento |
| `content/preguntas.ts` | Las preguntas frecuentes (también alimentan el JSON-LD) |
| `content/social.ts` | LinkedIn, Instagram y YouTube. Vacías no se renderizan |
| `content/notas/registro.ts` | Las notas del blog |
| `content/testimonios.ts` | Vacío a propósito. Sin testimonios no hay sección |

### Cambiar el número de WhatsApp

`content/sitio.ts`, campo `whatsapp`.

```ts
whatsapp: "5492920304938",   // formato wa.me: país + 9 + área sin 0 + número sin 15
```

El número no se muestra en ninguna parte del sitio: los botones dicen
"WhatsApp" y el número viaja adentro del enlace. Después de cambiarlo, abrir el
botón una vez y confirmar que WhatsApp reconoce el número.

### Poner el precio del diagnóstico

Es el único precio del sitio, y está en una sola línea de
`content/diagnostico.ts`:

```ts
export const PRECIO_DIAGNOSTICO = "USD 180";   // vacío muestra "Consultar precio"
```

Se escribe tal como tiene que leerse, con la moneda incluida. Vacío es un
estado válido: la página funciona igual, muestra "Consultar precio" y el dato
estructurado de Google omite el precio en vez de declarar uno inválido.

En el mismo archivo está `DIAS_DE_TRABAJO`, que es el plazo que aparece en el
paso del medio del proceso.

**Sólo el diagnóstico muestra precio.** Los tres planes, la automatización
puntual y el acompañamiento no, y es una regla y no un olvido: el diagnóstico
es el único trabajo acotado y cerrado, así que ahí el número ayuda. Los demás
son variables, y un número suelto o espanta o miente.

### Cambiar un texto de una sección

`content/textos.ts`. Está partido por sección (`hero`, `inicio`, `servicios`,
`portfolio`, `caso`, `planes`, `sobreMi`, `preguntas`, `contacto`, `pie`).
`inicio` es el índice y el cierre de la portada; `caso`, los textos fijos de la
página de cada proyecto.

El título y la descripción que ve Google en cada página están en `paginas`,
en el mismo archivo. El menú, y con él el orden de las páginas, sale de
`navegacion.enlaces`: una página que se agregue ahí aparece sola en el menú,
en el pie, en el índice del inicio y en el sitemap.

**El registro es formal, con voseo.** Se trata al visitante de "vos", pero sin
coloquialismos: nada de "charlamos", "contame" o "sin vueltas". Los botones van
en infinitivo ("Consultar por WhatsApp", "Solicitar precio") y ninguno se
repite entre secciones. Los mensajes de WhatsApp empiezan con "Hola Nicolás" y
no "Hola Nico", porque los escribe alguien que todavía no te conoce. El detalle
está en el comentario de arriba de `content/textos.ts`.

El título del hero es un arreglo de tres líneas porque cada una entra con su
propia animación, y lo mismo vale para el de `/diagnostico`. **Ninguna línea
puede pasar de 8,4 em**, que es el ancho para el que está calculado el tamaño
de `.t-display`. Una línea más larga se parte en dos, duplica el alto del
título y empuja el resto del hero fuera de la pantalla.

Ocho coma cuatro em son unos 17 caracteres, pero depende mucho de cuáles: una
línea llena de `m`, `w` y `d` entra bastante antes que una de `i` y `l`. Las
medidas actuales están anotadas en el comentario de cada título, y para medir
una nueva está la sonda que se pega en la consola del navegador —está en
`PENDIENTES.md`—.

### Sumar un proyecto al portfolio

Son tres pasos.

**1. Capturar el sitio.** Editar la lista del final de
`herramientas/capturar-portfolio.sh` con las direcciones del proyecto nuevo y
correr:

```bash
bash herramientas/capturar-portfolio.sh .capturas
```

Usa Chrome en modo headless. Si Chrome no está en la ruta habitual, se cambia
la variable `CHROME` del script.

**2. Recortar y convertir.** Agregar el proyecto a las listas `BARRA` y
`trabajos` de `herramientas/procesar-capturas.mjs` y correr:

```bash
node herramientas/procesar-capturas.mjs
```

Deja los `.avif` y `.webp` en `public/imagenes/trabajo/`. `BARRA` es cuántos
píxeles hay que recortar de arriba para sacar una barra fija del sitio
capturado; si el sitio no tiene ninguna, va `0`.

**3. Cargar el contenido.** Agregar una entrada al arreglo
`todosLosProyectos` de `content/proyectos.ts`. El tipo `Proyecto` obliga a
completar el problema que tenía el negocio, qué se construyó y —lo que más
importa— el `resultado`, que son dos frases: qué pasaba antes y qué pasa ahora.
Las capturas se referencian por nombre de archivo, sin extensión.

La línea de resultado es lo primero que se lee de un proyecto y lo que sale en
la miniatura al compartirlo. **Es cualitativa a propósito.** Hay una tentación
fuerte de poner un porcentaje ahí, y un porcentaje inventado es lo único que
puede hundir la venta el día que el cliente pregunte de dónde salió. Cuando
haya números de verdad —Search Console, la medición del sitio— van en el campo
opcional `medicion`.

Un caso que todavía no se puede mostrar va en **`content/proyectos-en-curso.ts`**
y no en `proyectos.ts`. Hoy está vacío: el de BULK pasó por ahí y ya se
publicó. Publicar un caso es mover la entrada de un archivo al otro.

Son dos archivos y no una bandera `borrador` por un motivo que se descubrió
midiendo: `components/portfolio.tsx` es un componente de cliente e importa
`content/proyectos.ts`, así que **todo lo que esté escrito en ese archivo viaja
al navegador, se renderice o no**. Un filtro en tiempo de ejecución no lo
evita: el empaquetador no puede adivinarlo y se lleva el módulo entero. Con
placeholders daba igual; con el nombre real de un cliente cuyo proyecto todavía
no se anunció, cualquiera que abra el paquete lo lee.

Se puede comprobar en cualquier momento:

```bash
grep -rl "COMPLETAR" out/
```

La página `/proyectos/<slug>`, su miniatura propia de Open Graph y la entrada
del sitemap se generan solas.

**4. Documentar el "antes", si se puede.** Es opcional y es lo que más vale de
una ficha. El campo `evidencia` lleva capturas de cómo se encontraba el negocio
ANTES del sitio: la búsqueda de Google sin un resultado propio, la ficha de
Maps, un dominio que no resuelve. Un párrafo que dice "no tenían sitio" se
discute; una captura de Google, no.

Las capturas crudas van en `.evidencia/` y se procesan con:

```bash
node herramientas/procesar-evidencia.mjs
```

Esa herramienta existe por un motivo concreto: las capturas del navegador
vienen con la barra de marcadores personales, y las de Maps con la barra
lateral, el avatar y el historial de la cuenta. Los recortes están escritos en
el archivo, uno por captura y con el motivo al lado, así que son reproducibles
y se entiende por qué existen. **Nunca publicar una captura de navegador sin
pasarla por ahí.**

No todos los proyectos pueden tener evidencia. Un comercio que abre junto con
el sitio no tiene un "antes" que capturar, y en ese caso el campo va ausente y
la sección no se renderiza. Inventarle un problema anterior a un negocio que no
lo tuvo es la misma mentira que un porcentaje falso.

### Sumar o sacar un entregable de la lista

`content/pedidos.ts`. Es la grilla de nueve que va al pie de la sección de
Servicios: los nombres concretos con los que la gente pide las cosas.

Cada entrada necesita cuatro campos: un `slug` (que identifica el clic en la
medición, como `pedido_tienda`), un nombre corto, una línea de descripción y el
`mensaje` que se abre escrito en WhatsApp cuando alguien toca esa celda. Ese
último es el que más importa: es la diferencia entre recibir un "hola" y
recibir "necesito una tienda online con cobro por Mercado Pago".

Van nueve porque la grilla es de tres columnas y queda pareja. Si sumás uno,
conviene sumar tres o sacar uno, para que la última fila no quede coja.

Esos nombres también entran solos en los datos estructurados del inicio, que es
donde más trabajo hacen para Google: "tienda online" y "turnos y reservas" son
palabras que se buscan, y "software a medida" no.

### Cambiar los planes o las ramas

`content/planes.ts` tiene las dos cosas: `ramas` son los tres caminos que salen
del diagnóstico —sitio web, automatización puntual, acompañamiento mensual— y
`planes` son los tres alcances de la primera rama.

No hay precios ahí a propósito: el visitante mira el alcance y pide el número.
`recomendado: true` es lo que pinta el borde de bronce, y va en uno solo. Una
rama sin `accion` no lleva botón; la primera no lo lleva porque su llamado son
los tres planes que están justo abajo.

### Escribir una nota

Dos pasos. **1.** Crear `content/notas/<slug>.mdx` con el cuerpo en Markdown a
secas: sin encabezado de metadatos y sin una sola clase adentro, que eso lo
pone `mdx-components.tsx`. **2.** Importarla en `content/notas/registro.ts` y
agregar la entrada con título, descripción y fecha.

Los minutos de lectura se calculan solos leyendo el archivo al compilar: no hay
que escribirlos, y por eso no quedan desactualizados cuando se corrige un
párrafo.

Una nota con `borrador: true` tiene dirección y se puede leer y pasar, pero no
aparece en el listado ni en el sitemap y se marca `noindex`. Publicarla es
borrar esa línea.

**`/notas` todavía no está en el menú.** Con una sola nota, una sección de
notas vacía dice más de lo que conviene. Se agrega a `navegacion.enlaces` en
`content/textos.ts` cuando haya dos o tres publicadas; mientras tanto el
listado se marca `noindex` solo.

### Poner las redes

`content/social.ts`. Cada una tiene un `rol` —qué se publica ahí— y una `url`.
**Una url vacía no se renderiza**, ni en el pie ni en el inicio: es preferible
que falte un enlace a que haya uno que lleve a un perfil sin nada. Hoy las tres
están vacías, así que la franja de redes del inicio no existe y el pie tiene
tres columnas en lugar de cuatro.

---

## El formulario y las consultas

El formulario dejó de abrir WhatsApp con un mensaje escrito y pasa a guardar la
consulta de verdad. WhatsApp convierte bien pero no deja rastro: no se puede
medir, no se le puede volver a escribir al que no contestó y no queda ninguna
lista. Ahora quedan las dos cosas, el dato guardado y el aviso por correo, y
WhatsApp sigue estando en el botón flotante, en el hero, en el pie, en contacto
y en los nueve entregables.

### Qué se mueve

Una idea sola y no una pila de efectos: **la página sabe dónde estás y a qué
velocidad vas.** Todo lo de acá abajo se apaga por completo con
`prefers-reduced-motion`.

| Qué | Dónde | Cómo |
| --- | --- | --- |
| Telón de entrada | Al cargar el sitio | CSS, sin JavaScript |
| Título del hero, línea por línea | Inicio y `/diagnostico` | CSS; los cortes están a mano en el contenido |
| Títulos de sección, línea por línea | Todo el sitio | `components/titulo-revelado.tsx` |
| Entrada por scroll, con desenfoque | Todo el sitio | `components/revelado.tsx` |
| Progreso de lectura | La barra fija | CSS dirigido por scroll, cero JavaScript |
| Deriva de las capturas | Páginas de proyecto | CSS dirigido por scroll, cero JavaScript |
| Cinta que acelera y se da vuelta | Inicio | `components/cinta-reactiva.tsx` |
| Cambio de página | Al navegar | `app/template.tsx` |
| Resplandor que sigue al cursor | Todo el sitio | `components/resplandor.tsx` |
| Botones magnéticos | Uno por página | `hooks/use-magnetico.ts` |
| Borde iluminado de las tarjetas | Tarjetas con acento | `components/luz-en-tarjeta.tsx` |
| Panel que persigue al cursor | `/servicios` | `components/servicios.tsx` |
| Desplazamiento horizontal | `/proyectos`, con 3+ casos | GSAP, en un trozo aparte |

### Los títulos que entran línea por línea

Es el que más cambia la percepción del sitio y el que más cuidado tiene.
`TituloRevelado` **mide** dónde cortó los renglones el navegador —con un
`Range` de un carácter que se corre por el nodo de texto— y envuelve cada uno
en su propia máscara.

Se podría partir por palabras, que es lo que se ve en todos lados, y se nota:
las palabras de un mismo renglón entran en momentos distintos y el texto se
lee como una ola de letras sueltas. Partiendo por líneas reales lo que sube es
el renglón entero.

El servidor manda el título como texto plano y visible. La medición corre
después, en el cliente, y sólo sobre títulos que todavía no se ven. Si el
JavaScript no corre, si la medición falla o si hay movimiento reducido, queda
el texto tal cual. **El contenido de la etiqueta nunca cambia**, así que para
Google y para un lector de pantalla el título es el mismo antes y después.

Para armar un encabezado de sección está `EncabezadoSeccion`, que hace
etiqueta + título + bajada con el escalonado correcto:

```tsx
<EncabezadoSeccion
  nivel="h2"
  etiqueta={textos.etiqueta}
  titulo={textos.titulo}
  bajada={textos.bajada}
  claseTitulo="max-w-[16ch]"
/>
```

Las tarjetas con borde de acento **no** lo usan a propósito: ahí lo que tiene
que entrar junto es la tarjeta entera, y partirle el título se lee como un
error.

### Dos animaciones no tienen una línea de JavaScript

El progreso de lectura y la deriva de las capturas usan animaciones dirigidas
por scroll de CSS (`animation-timeline`). No hay escucha, no hay cálculo por
cuadro y el navegador las corre fuera del hilo principal. En los navegadores
que todavía no las soportan simplemente no pasan, que para las dos es
exactamente lo correcto.

### Por qué la cinta usa `updatePlaybackRate`

Lo intuitivo sería escribirle `animation-duration` desde JavaScript. No sirve:
una animación CSS calcula su progreso como tiempo sobre duración, así que al
cambiar la duración el progreso salta y la cinta pega un tirón en cada ajuste.
`updatePlaybackRate` cambia la velocidad conservando la posición, admite
valores negativos para ir al revés, y deja la animación corriendo en el
compositor.

### Por qué el cambio de página es sólo opacidad

Es una restricción técnica y no una preferencia. `transform`, `filter` y
`clip-path` sobre el contenedor de `template.tsx` crearían un bloque contenedor
nuevo, y entonces todo lo que adentro es `position: fixed` —el panel que sigue
al cursor en Servicios, el pin de GSAP del portfolio— se posicionaría contra
ese div en lugar de contra la ventana. Se rompería sin avisar.

---

## La marca

`components/marca.tsx`. Dos piezas, las dos SVG en línea y no `<img>`: no hay
una petición de red más, no hay un frame en blanco donde debería estar el
logotipo, y los trazos toman el color del contexto.

| | Dónde |
| --- | --- |
| `<Marca />` | La barra. Lockup entero desde 640px, monograma solo abajo de eso |
| `<Lockup />` | El pie, a cualquier ancho |
| `<Monograma />` | Suelto, si hace falta |
| `app/icon.svg` | El favicon: el monograma con su fondo redondeado |

La palabra "VISINTIN STUDIO" está **dibujada con trazos**, no compuesta con
una tipografía, así que no depende de que cargue ninguna fuente y se ve igual
desde el primer frame. Es la razón por la que conviene en la barra, que es lo
primero que aparece.

Respecto de los archivos originales se sacó el rectángulo de fondo —taparía el
resplandor—, los trazos pasaron a `currentColor` y el `viewBox` se recortó a
los límites reales del dibujo, porque el aire que traían desalineaba el
logotipo con el margen del contenedor.

---

## Cómo está armado

```
components/formulario.tsx   →  POST /api/leads
                                    │
                            netlify/functions/leads.mts
                                    ├── valida con Zod
                                    ├── descarta robots (honeypot, sin captcha)
                                    ├── limita a 5 envíos por hora por IP
                                    ├── guarda en Supabase
                                    └── avisa por correo con Resend
```

**Por qué es una función de Netlify y no `app/api/leads/route.ts`.** El sitio
se compila con `output: "export"`, y en ese modo Next no admite rutas que lean
el cuerpo de una petición: un `route.ts` con POST rompe la compilación. Las dos
salidas eran dejar el export estático y poner el endpoint en una función, o
abandonar el export y servir todo el sitio con el runtime de Next sobre
Netlify. Se eligió lo primero: el sitio entero sigue siendo estático y medido,
la dirección pública sigue siendo `/api/leads` y el formulario no sabe la
diferencia.

### Ponerlo en marcha

1. Crear el proyecto en [supabase.com](https://supabase.com) y pegar
   `supabase/leads.sql` entero en **SQL Editor → New query → Run**.
2. Cargar en Netlify las variables de `.env.example`: `SUPABASE_URL`,
   `SUPABASE_SERVICE_ROLE_KEY`, `LEADS_IP_SALT`, `RESEND_API_KEY`,
   `LEADS_EMAIL_TO`, `LEADS_EMAIL_FROM` y `ADMIN_TOKEN`.
3. Publicar de nuevo. Sin eso, las variables no entran.

Cada variable dice en `.env.example` qué pasa si falta, y en todos los casos es
"no hacer nada" y no "romper". Con Resend sin configurar, la consulta se guarda
igual. **Si no se puede ni guardar ni avisar, la función responde 503 y el
formulario muestra el error y ofrece WhatsApp**, en vez de decir "gracias"
mientras pierde la consulta.

### Probarlo sin desplegar

```bash
node --experimental-strip-types herramientas/probar-leads.mts
```

Llama al manejador directamente con siete peticiones armadas a mano. Sin
variables de entorno tiene que dar `405 · 503 · 200 · 400 · 400 · 400 · 400`.
Con Supabase configurado, el segundo caso pasa a 200 y deja una fila en la
tabla.

En `npm run dev` el formulario responde error, porque las funciones de Netlify
no corren ahí. Eso es lo esperado y de paso sirve para ver el estado de error.

---

## Medición

Está explicada entera, para alguien que nunca configuró analytics, en
**[README-MEDICION.md](README-MEDICION.md)**. El resumen:

- Cuatro eventos: `view_diagnostico`, `submit_lead`, `click_whatsapp`,
  `view_caso`. Los dos primeros son el embudo que importa.
- Dos proveedores que conviven y reciben lo mismo: Google Analytics 4
  (`NEXT_PUBLIC_GA_ID`) y Umami (`NEXT_PUBLIC_UMAMI_ID`), que no usa cookies.
  Con las dos vacías el sitio no le pide un byte a nadie.
- Los enlaces admiten etiquetas UTM, que se guardan al aterrizar y sobreviven
  a que la persona navegue por el sitio, así que llegan hasta la fila de la
  consulta.

Los dos scripts se cargan tarde a propósito —cuando el navegador queda ocioso o
en la primera interacción, lo que pase antes— para que no compitan con el
contenido. Todo pasa por `lib/analitica.ts`: si algún día se cambia de
proveedor, se toca ese archivo y nada más.

---

## Publicar

Netlify ya está configurado en `netlify.toml`: compila con `npm run build` y
publica la carpeta `out`.

Cuando esté el dominio propio hay que definir:

```
NEXT_PUBLIC_SITE_URL=https://visintin.com.ar
```

De esa variable salen el canonical, el sitemap y la dirección de la imagen de
Open Graph. Sin ella se usa la que Netlify inyecta sola, que funciona pero
apunta al subdominio de Netlify.

Todas las variables, con qué hace cada una y qué pasa si falta, están en
**`.env.example`**. Ninguna es obligatoria para que el sitio compile y se vea:
lo que no funciona sin ellas es la medición y el guardado de consultas.

Las funciones de `netlify/functions/` declaran su propia dirección con
`export const config = { path: "..." }`, así que no hay redireccionamientos de
`/api/*` en `netlify.toml`. Netlify las compila solo, con esbuild.

Un detalle que se rompe en silencio: Next exporta las imágenes de Open Graph
**sin extensión**, y ahora hay cinco —el inicio, el diagnóstico y una por
proyecto—. Sus encabezados los genera `herramientas/encabezados-og.mjs` en
`out/_headers` después de cada compilación, recorriendo lo que realmente quedó
en la carpeta. Escritos a mano, un proyecto nuevo se publicaría sin miniatura y
nadie se enteraría hasta que alguien comparte el enlace.

Ojo con un detalle: el token de verificación de Google Search Console que está
en `content/sitio.ts` corresponde al dominio de Netlify. Con dominio propio,
Google entrega uno nuevo y hay que reemplazarlo.

---

## Herramientas

| Comando | Para qué |
| --- | --- |
| `bash herramientas/capturar-portfolio.sh .capturas` | Captura los sitios del portfolio |
| `node herramientas/procesar-capturas.mjs` | Recorta y convierte a AVIF + WebP |
| `node herramientas/capturar-pagina.mjs <url> <archivo.png> [ancho] [alto]` | Fotografía una página del sitio, para revisar cómo quedó |
| `node herramientas/servir-build.mjs` | Sirve `out/` en el puerto 4321, para revisar el sitio compilado |
| `node --experimental-strip-types herramientas/probar-leads.mts` | Prueba la función del formulario sin desplegar |
| `node herramientas/encabezados-og.mjs` | Escribe `out/_headers`. Corre solo después de `next build` |
| `node herramientas/procesar-evidencia.mjs` | Recorta las capturas del "antes" y les saca los datos personales |
| `node herramientas/probar-movimiento.mjs <url>` | Revisa el movimiento con las animaciones encendidas **y** apagadas |

La de capturar acepta cuatro variables de entorno:

| Variable | Qué hace |
| --- | --- |
| `SCROLL=<px>` | Fotografía sólo el viewport, en esa posición |
| `MOVIMIENTO=reduce` | Emula `prefers-reduced-motion: reduce` |
| `HOVER=<selector>` | Deja el mouse encima de ese elemento |
| `EJECUTAR=<js>` | Corre una expresión antes de la foto |

```bash
SCROLL=1500 node herramientas/capturar-pagina.mjs http://localhost:3100/servicios revision.png 1440 900
HOVER='#servicios ul:last-of-type li:nth-child(5) a' node herramientas/capturar-pagina.mjs http://localhost:3100/servicios hover.png
```

`MOVIMIENTO` hace falta más de lo que parece: si la máquina tiene el movimiento
reducido activado en el sistema, el sitio se ve quieto y parece que las
animaciones estuvieran rotas. Sin esa variable se emula `no-preference`, que es
como lo ve la mayoría.

`servir-build.mjs` es la única forma de probar la analítica, porque el
identificador se resuelve al compilar:

```bash
NEXT_PUBLIC_GA_ID=G-PRUEBA12345 npm run build
node herramientas/servir-build.mjs
```

---

## Cómo está armado

- **Cada página declara su canonical.** Pasa por `lib/metadatos.ts`, que además
  arma el Open Graph completo con la imagen. Las dos cosas se rompen solas si
  una página arma sus metadatos a mano: sin canonical, Google la toma como
  copia del inicio; sin la imagen, el enlace compartido por WhatsApp sale sin
  miniatura. Ninguna de las dos se ve en el navegador.
- **La navegación, el preloader y el botón flotante viven en el layout.** Se
  montan una vez y no al pasar de una página a otra: el telón de entrada
  aparece al llegar al sitio, no cada vez que se vuelve al inicio.
- **Estático, con dos excepciones del tamaño justo.** `output: "export"`: las
  diez páginas son archivos HTML servidos desde el CDN, sin nada corriendo
  del otro lado. Las únicas dos cosas que corren son las funciones del
  formulario, y viven aparte en `netlify/functions/`. El sitio que ve el
  visitante no depende de ellas: si las dos se cayeran, todo se sigue leyendo y
  WhatsApp sigue funcionando.
- **Las animaciones no tapan el contenido.** Todo sale del servidor visible.
  El estado oculto de las entradas por scroll lo pone el cliente, y sólo sobre
  lo que todavía no se ve. Si el JavaScript no corre, el sitio se lee igual.
- **`prefers-reduced-motion` se respeta de verdad.** Con eso activado no hay
  preloader, no hay entradas por scroll, no hay cursor y el portfolio se
  recorre en vertical: ni siquiera se descarga GSAP.
- **Las imágenes van con `<picture>` y no con `next/image`.** En un export
  estático no hay quién optimice al vuelo, así que los formatos se generan una
  vez con las herramientas de arriba. Todas llevan dimensiones explícitas.
- **Hay un solo color, y se usa de dos maneras.** Bronce `#C08A4E`. Como
  *punto*, marcando estado: el subrayado del enlace activo, el número del
  servicio abierto, el borde del plan recomendado, la línea del preloader, el
  anillo del cursor. Y como *superficie*, dando temperatura: el resplandor del
  fondo. Lo que no hace nunca es decorar un elemento porque sí.

  No hay un segundo tono a propósito. Cuando el sitio se siente gris, el
  problema no es que falte un color: es que el que hay está apareciendo en
  lugares del tamaño de un alfiler. La respuesta fue darle superficie, no
  sumarle un vecino.

- **Todo lo que se toca reacciona al cursor.** No son efectos sueltos, es una
  sola idea: la página sabe dónde estás.

  | Dónde | Qué hace |
  | --- | --- |
  | Fondo | Una luz cálida grande sigue al puntero, muy despacio |
  | Botón principal del inicio y de contacto | Se corren hacia el cursor cuando se acerca |
  | Tarjetas de plan, de contacto y cierre del inicio | El borde se ilumina donde está el mouse |
  | Índice del inicio | El número y el nombre pasan a bronce y la flecha se corre |
  | Filas de servicio | Se abren y muestran una captura que persigue al cursor |
  | Entregables | La celda se aclara y el nombre pasa a bronce |
  | Preguntas | Se dibuja una línea de bronce bajo la fila |
  | Números del estudio | La celda se aclara y el número pasa a bronce |
  | Cinta de rubros | Se frena, para poder leerla |
  | Capturas del portfolio | Escalan un 3% |

  Nada de esto existe en una pantalla táctil ni con movimiento reducido: no se
  monta el componente, no se descarga el trabajo y no queda ningún escucha
  colgado. La única excepción es el resplandor, que en ese caso se queda quieto
  sobre el hero — así el color llega igual al celular.

---

## Los otros documentos

| Archivo | Qué tiene |
| --- | --- |
| [PENDIENTES.md](PENDIENTES.md) | Lo que falta decidir y completar, ordenado por lo que más bloquea |
| [README-MEDICION.md](README-MEDICION.md) | Cómo leer la medición, para alguien que nunca configuró analytics |
| [RESCATE.md](RESCATE.md) | Lo que se guardó del sitio anterior antes de borrarlo |
| `.env.example` | Todas las variables de entorno y qué pasa si falta cada una |
| `supabase/leads.sql` | La tabla de consultas, lista para pegar en Supabase |
