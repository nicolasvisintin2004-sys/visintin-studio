# Pendientes

Lo que quedó abierto, ordenado por lo que más bloquea la publicación.

---

## Lo que tenés que completar vos, de una sentada

Todo esto está marcado en el código con `[DECIDIR]` o `[COMPLETAR: Nico]`, o
tiene un valor por defecto que conviene revisar. Son quince minutos si tenés
los datos a mano.

| Qué | Dónde | Estado |
| --- | --- | --- |
| **Precio del diagnóstico** | `content/diagnostico.ts` → `PRECIO_DIAGNOSTICO` | Vacío. Muestra "Consultar precio" |
| Días de trabajo del diagnóstico | `content/diagnostico.ts` → `DIAS_DE_TRABAJO` | Puesto en `10`, con margen. Ajustar con los primeros diagnósticos entregados |
| LinkedIn y YouTube | `content/social.ts` → `url` | Vacías. Instagram ya está cargado |
| Revisar el texto del caso de BULK | `content/proyectos.ts` | Publicado. Ver "Revisá el texto del caso de BULK" |
| Números de resultado del proyecto | `content/proyectos.ts` → campo opcional `medicion` | Ausente. Ver abajo |

### El precio es la decisión que más importa

Es el único número del sitio y la página entera está construida alrededor de
él. Mientras esté vacío, `/diagnostico` funciona y se ve bien, pero dice
"Consultar precio", que es exactamente lo que la página existe para evitar: el
que llega sin saber qué pedir vuelve a quedar en "escribime y vemos".

Dos cosas para tener en cuenta al elegirlo. Tiene que ser **barato en relación
al proyecto que puede seguir** —si el diagnóstico sale lo mismo que una
landing, nadie lo compra— y tiene que **cubrir tu tiempo real**: son dos horas
de reunión más el análisis, que es lo que hoy está estimado en cinco días
hábiles.

### Los números de los proyectos

El campo `medicion` está vacío y es correcto que lo esté: el sitio de Taller
Italia todavía no está publicado, así que no hay nada que medir. La línea de
"antes y después" que sí está es cualitativa, y el "antes" está documentado con
tres capturas reales, que valen más que cualquier número.

No lo completes con nada hasta que haya datos de Search Console o de la
medición del sitio. **Un porcentaje inventado es lo único que puede hundir la
venta** el día que el cliente pregunte de dónde salió.

---

## Antes de publicar

### 1. Verificar el link de WhatsApp

`content/sitio.ts` tiene `5492920304938`, heredado del sitio anterior. Sigue
sin verificarse. Abrir el botón, ver que WhatsApp reconozca el número y que
abra tu chat. Si el `9` sobra, sacarlo.

Sigue siendo un camino de conversión central del sitio, aunque ya no el único.

### 2. Poner en marcha el formulario

Es lo más importante de esta actualización y es lo único que necesita cuentas
nuevas. Los pasos están en el README; el resumen:

1. Proyecto en [supabase.com](https://supabase.com), y pegar
   `supabase/leads.sql` entero en el editor SQL.
2. Cuenta en [resend.com](https://resend.com) para el aviso por correo.
3. Cargar en Netlify las siete variables de `.env.example`:
   `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `LEADS_IP_SALT`,
   `RESEND_API_KEY`, `LEADS_EMAIL_TO`, `LEADS_EMAIL_FROM`, `ADMIN_TOKEN`.
4. Publicar de nuevo y **mandar una consulta de prueba desde el sitio real**.

Ese último paso no es opcional. Lo que está verificado hoy es la función en sí
—validación, honeypot, método, y que se niega a decir "gracias" si no puede
guardar— con `herramientas/probar-leads.mts`. Lo que **no** se puede verificar
sin las claves es que Supabase reciba la fila y que Resend mande el correo.

Dos cosas para generar y guardar en un lugar seguro, porque no se pueden
recuperar después:

- `ADMIN_TOKEN` y `LEADS_IP_SALT`: `openssl rand -hex 32` para cada uno.
- El `ADMIN_TOKEN` es la contraseña de la lista de contactos. Cualquiera que lo
  tenga puede bajarse todo.

### 3. Encender la medición

Está todo cableado y no falta más que el identificador. Cómo leerlo está en
[README-MEDICION.md](README-MEDICION.md), escrito para alguien que nunca
configuró analytics.

Vale la pena hacerlo el primer día: el sitio anterior estuvo meses midiendo con
`@vercel/analytics` sobre Netlify, que no recolecta nada fuera de Vercel, así
que de ese período no hay un solo dato.

Lo que más información va a dar es el par `view_diagnostico` / `submit_lead`.
Es el número que dice si la página del diagnóstico funciona, y hoy no hay forma
de saberlo.

### 4. El dominio: `visintinstudio.com.ar`

Registrado en DonWeb el 2026-09-30 y delegado a los servidores de Netlify
(`dns1…dns4.p06.nsone.net`). El DNS se maneja entero desde Netlify; en DonWeb
no hay que crear ninguna zona.

No hizo falta definir `NEXT_PUBLIC_SITE_URL`: Netlify le pasa el dominio
principal a cada compilación, y de ahí salen el sitemap, el canonical de cada
página y las imágenes de Open Graph.

En Google Search Console la propiedad es de tipo **Dominio**, verificada con
un registro TXT en el DNS de Netlify. Si alguna vez se borra ese registro, la
propiedad se desverifica.

**Lo que falta, del lado de Google:**

- Enviar `sitemap.xml` en Search Console, y pedir la indexación del inicio,
  `/diagnostico`, `/servicios`, `/proyectos` y los dos casos.
- Crear el Perfil de empresa de Google, con el sitio bien escrito.
- Poner `visintinstudio.com.ar` en la bio de Instagram.

También hace falta un dominio verificado en Resend para que el aviso salga
desde `visintinstudio@gmail.com` y no desde `onboarding@resend.dev`.

### 5. Confirmar el estado de Taller Italia

Está cargado como cliente "en desarrollo". Cuando el sitio se publique, cambiar
`estado: "en-desarrollo"` por `"publicado"` en `content/proyectos.ts`, y de
paso confirmar que el sitio sigue respondiendo en `timotorhome.com.ar`.

**Y decile a Taller Italia que cambie el enlace de su ficha de Google.** El
botón "Sitio web" apunta a `www.talleritalia.com.ar`, que no está registrado:
está verificado contra los servidores de NIC Argentina y es la tercera captura
del caso. El sitio quedó en **`timotorhome.com.ar`**, así que la ficha no se
arregla sola: cada persona que toca el botón sigue terminando en una página de
error. Se cambia en un minuto desde el perfil de empresa de Google.

Es probablemente el cambio con más impacto de todo el proyecto y no requiere
código: la ficha tiene 29 reseñas y es por donde llega la gente que ya busca
el nombre.

---

## Decisiones que quedaron tomadas y conviene saber

### El endpoint no es `app/api/leads/route.ts`

El prompt pedía una ruta de Next. No se puede: el sitio se compila con
`output: "export"` y en ese modo Next no admite rutas que lean el cuerpo de una
petición —rompe la compilación—. Está en la documentación de Next, en
"Unsupported Features".

Las dos salidas eran dejar el export estático y poner el endpoint en una
función de Netlify, o abandonar el export y servir todo el sitio con el runtime
de Next. **Se eligió lo primero.** La dirección pública sigue siendo
`/api/leads` y el formulario no sabe la diferencia, pero el sitio entero sigue
siendo diez archivos HTML en un CDN.

Si alguna vez hiciera falta lo segundo —porque aparezcan varias rutas de
servidor— el cambio es sacar `output: "export"` de `next.config.ts`, instalar
`@netlify/plugin-nextjs` y mover las dos funciones a `app/api/`. No es difícil;
lo que se pierde es la garantía de que ninguna página dependa de que algo esté
corriendo.

### La sección se llama "Cómo trabajo", no "Cómo trabajamos"

El prompt pedía "Cómo trabajamos". El resto del sitio está escrito en primera
persona del singular y la página del estudio se titula literalmente "Una
persona, no una agencia". El plural mayestático en una sección la contradice, y
es el tipo de detalle que un cliente registra sin poder decir por qué.

### El formulario tiene los rubros del prompt

Metalmecánica · Agro · Transporte y logística · Comercio y retail · Servicios
profesionales · Otro. Reemplazan a los cinco que había, que eran todos de
fabricación. Si en seis meses la medición dice que casi nadie elige "Agro" y
todos caen en "Otro", ahí está el dato para cambiarlos: el rubro viaja con cada
consulta.

### Umami además de Google Analytics, no en lugar de

El prompt pedía Plausible o Umami. Google Analytics ya estaba cableado y es
gratis, así que se dejó y se sumó Umami, que no usa cookies y no obliga a poner
cartel de consentimiento. Los dos reciben los mismos cuatro eventos desde
`lib/analitica.ts` y cada uno se enciende por su cuenta. Con las dos variables
vacías, el sitio no le pide un byte a nadie.

Los nombres de los eventos quedaron en inglés —`click_whatsapp` y no
`clic_whatsapp`— a diferencia del resto del código, porque son lo que se lee en
los paneles, donde todo lo demás también está en inglés.

### El resultado de cada caso está en `content/proyectos.ts`

El prompt pedía un `content/casos.ts` nuevo. Se agregó el campo `resultado` al
archivo que ya existía en vez de partir los proyectos en dos archivos que hay
que mantener de acuerdo.

---

## El portfolio: dos clientes reales

Se sacaron las dos demostraciones —García Ferrari y JAYCOR—. Eran sitios
propios sin cliente detrás, y además arrastraban dos problemas que estaban
anotados acá: una mostraba la marca equivocada en su propia barra y la otra
tenía un marcador de plantilla sin reemplazar en la portada.

Quedan dos casos reales, de rubros bien distintos: **Taller Italia**, una
fábrica de motorhomes con el "antes" documentado en tres capturas —la búsqueda
de Google sin sitio propio, la ficha con 4,6 y 29 reseñas, y la página de
error del dominio que figuraba en esa ficha—, y **BULK**, una tienda de
suplementos de Carmen de Patagones que abre junto con el sitio.

La bajada de `/proyectos` ya no cuenta cuántos hay —decía "por ahora hay
uno"— y las cuatro pruebas visuales de Servicios se repartieron dos y dos.

### BULK no tiene "antes", y está bien

Es un comercio que abre con el sitio. El `resultado.antes` dice con qué
contaba antes de abrir —el local, el catálogo y una cuenta de Instagram recién
creada— y no le inventa un problema anterior.

La cuenta de Instagram también la diseñaste vos. Si querés que entre como
parte del caso, la forma es cargarla en `evidencia` con capturas reales, igual
que las de Taller Italia; hoy el campo va ausente y esa sección no se muestra.

### El caso de BULK sale del código, no sólo del sitio

El texto está contrastado con el repositorio (`Desktop/Bulk_AR`): 186
productos, 351 variantes y 41 marcas contados de `productos.json`, y el stack
—Astro, funciones de Netlify y Brevo para los emails— de `package.json` y del
README. Lo que más pesa del caso es algo que desde afuera no se ve: **el
importador de la lista mayorista**, que es automatización de un proceso y le
da al caso peso en la segunda línea del estudio, no sólo en la de sitios.

**Lo que se dejó afuera a propósito:** la regla de precios. Contra qué tienda
se comparan y con qué margen es información del negocio de BULK, y un caso
público no es el lugar para publicarla. El caso dice que el importador elige
qué precio tomar, y nada más.

Que el Instagram lo diseñaste vos está dicho en el tercer párrafo del
problema; lo tomé de tu mensaje.

### Los dominios de los casos

Taller Italia está en `timotorhome.com.ar` y BULK en `bulksuplementos.com.ar`.
Los dos responden, con y sin `www` (verificado el 2026-09-29).

Las herramientas de captura siguen usando las direcciones `.netlify.app`, que
no dejan de andar cuando se agrega el dominio: Netlify las redirige solo.

### El sitio de BULK muestra avisos "FALTA:" en línea

El botón "Visitar el sitio" del caso lleva al sitio de BULK, y ahí hay notas
de desarrollo visibles para cualquiera:

- en el inicio, `FALTA: lista de productos más vendidos…`
- en `/combos/`, `FALTA: contenido del combo…` tres veces
- en `/carrito/` y `/como-comprar/`, los datos bancarios y los costos de envío
  por debajo de $100.000

Las capturas del portfolio se eligieron para que no aparezca ninguno, pero
quien entra al sitio desde el caso los ve. Conviene completarlos antes de
mandar a nadie a mirar ese caso.

El sitio de BULK ya tiene el interruptor: `mostrarFaltantes` en
`src/config/negocio.js`, hoy en `true`. Ponerlo en `false` saca los carteles,
pero no completa los datos: el carrito seguiría sin los datos bancarios para
transferir, sólo que sin avisarlo.

### Cómo se sacaron las capturas

```bash
bash herramientas/capturar-portfolio.sh .capturas bulk
node herramientas/procesar-capturas.mjs bulk
```

El segundo argumento limita a un proyecto, para no volver a fotografiar los
otros sitios, que pueden haber cambiado en línea. En BULK la herramienta cierra
la ventana de bienvenida, saca la insignia de Netlify y carga tres productos
antes de abrir el carrito.

---

## Contenido que me falta de tu parte

### Una foto tuya

La sección "Sobre mí" no tiene foto. No es un olvido: no hay ninguna usable y
una de stock era peor que nada, así que el trabajo gráfico lo hace la
tipografía y una línea de bronce.

Si conseguís una —una sola, en blanco y negro, con grano— entra en la columna
izquierda de `components/sobre-mi.tsx` sin tocar nada más.

### Grabaciones de pantalla en loop

El sitio scrolleando, en silencio, sin controles. Son lo que más sube la
percepción de calidad y no están porque no existen todavía.

Dónde irían: reemplazando la captura fija del panel que sigue al cursor en la
sección de servicios, y como portada de cada panel del portfolio. Hay que
generarlas en `.webm` y `.mp4`, con `poster` apuntando al AVIF que ya existe.

### Los números de "Sobre mí"

Hoy dicen: 3 sitios en línea · 24 h para contestarte · 48 h para la propuesta ·
1 persona. Son los cuatro que se pueden sostener sin inventar nada.

Los que faltan y valen mucho más son los de negocio, y se pueden poner recién
cuando Taller Italia lleve unos meses en línea y haya datos de Search Console.

---

## Lo que está armado y esperando una decisión

### `/notas` existe pero no está en el menú

El blog funciona: listado, nota, fecha, minutos de lectura calculados solos y
datos estructurados de `Article`. Hay **una nota escrita y en borrador**, sobre
qué tareas conviene automatizar primero.

Mientras no haya ninguna publicada, `/notas` se marca `noindex` solo y no entra
al sitemap. Para abrirlo: sacar `borrador: true` de
`content/notas/registro.ts` y agregar `{ href: "/notas", texto: "Notas" }` a
`navegacion.enlaces` en `content/textos.ts`.

Conviene esperar a tener dos o tres. Una sección de notas con una sola nota
dice más de lo que conviene.

### El componente de testimonios existe y no se usa

`components/testimonios.tsx` está escrito y funciona, pero
`content/testimonios.ts` está vacío, así que devuelve `null` y no se renderiza
en ninguna parte. No hay sección, ni hueco, ni "próximamente".

Para activarlo: agregar una entrada al archivo de contenido y poner
`<Testimonios />` donde corresponda — en el inicio después del bloque del
diagnóstico, en `/diagnostico` entre el encaje y el precio, o filtrado por
proyecto dentro de la página de un caso.

Cómo conseguirlos sin que suenen a formulario: cuando entregues un proyecto y
la persona te agradezca por WhatsApp —que pasa siempre—, pedile permiso para
usar eso mismo que escribió. Lo que dice alguien espontáneamente después de ver
su sitio andando es mejor que cualquier cosa que conteste a "¿me dejás un
testimonio?".

### Las dos notas del sitio anterior se pueden recuperar

Son **2.000 palabras ya escritas** sobre cuánto cuesta una página web, que hoy
serían las dos notas que faltan para abrir la sección. Están en el historial de
git:

```bash
git show 18d486d:content/notas/cuanto-cuesta-una-pagina-web-pyme-argentina.mdx
```

Hay que revisarlas antes de publicarlas: están escritas para el posicionamiento
anterior —sólo web, sin la línea de automatización— y la versión vieja tenía
precios concretos que ya no están en el sitio. El texto sirve; el encuadre hay
que ajustarlo.

---

## Deuda técnica conocida

### El bundle no baja de 150 KB, y no es por el sitio

El objetivo era menos de 150 KB de JavaScript comprimido. No se cumple, y la
razón está medida.

| Página | gzip | brotli (lo que sirve Netlify) |
| --- | --- | --- |
| Página vacía, con un solo `<p>` | 178,9 KB | 154,4 KB |
| Inicio | 184,9 KB | 160,2 KB |
| Diagnóstico | 186,5 KB | 161,6 KB |
| Servicios (la más pesada) | 187,4 KB | 162,4 KB |
| Página de proyecto | 183,8 KB | 159,3 KB |

**Next.js 16 con App Router arranca en 154 KB comprimidos antes de que exista
una línea de código propio.** La página más cargada suma 8 KB sobre ese piso.

Vale la pena mirar lo que las últimas actualizaciones agregaron: una página
entera nueva, un formulario con siete campos y estados, un blog en MDX, un
segundo proveedor de medición, los títulos que entran línea por línea, la
cinta que responde al scroll y la marca en SVG sumaron, todo junto, **menos de
3 KB por página**. Casi todo se renderiza en el servidor, y dos de las
animaciones nuevas —el progreso de lectura y la deriva de las capturas— no
tienen una sola línea de JavaScript.

Las opciones reales, si el número importa:

- **Dejarlo así.** Es el costo de usar Next con App Router. El HTML sale
  completo del servidor y el contenido se ve antes de que el JavaScript
  termine de cargar.
- **Rehacerlo en Astro.** Mismo diseño, mismo contenido, mismo GSAP, enviando
  alrededor de 30 KB en vez de 160. Es rehacer los componentes, no el
  contenido: `content/` se reusa tal cual, y las dos funciones de Netlify no se
  tocan.

GSAP ya está resuelto: son 50 KB en un trozo aparte que sólo descarga quien
entra desde 1024px para arriba sin movimiento reducido. En un celular no se
pide nunca, y **hoy no se pide en ninguna parte**: el desplazamiento
horizontal del portfolio necesita al menos tres proyectos y hay uno, así que
el trozo directamente no se toca. Vuelve a descargarse solo el día que el
portfolio llegue a tres.

### Falta correr Lighthouse contra producción

Los números de arriba están medidos sobre el build. El Lighthouse completo hay
que correrlo contra el dominio real una vez publicado:

```bash
npx lighthouse@12 https://<dominio>/diagnostico --form-factor=mobile --throttling-method=simulate
```

Correlo contra `/diagnostico` y no sólo contra el inicio: es la página a la que
van a apuntar los anuncios, así que es la que tiene que estar rápida.

Lo que sí está verificado a mano sobre el HTML compilado de las diez
páginas: un solo `h1` por página y jerarquía sin saltos, canonical propio y
`og:image` en cada una, `alt` y dimensiones explícitas en todas las imágenes,
contraste medido sobre el fondo (`#F4F4F1` 17,9:1 · `#8A9099` 6,1:1 ·
`#C08A4E` 6,8:1, los tres pasan AA), foco visible en todo lo navegable por
teclado, y el camino de `prefers-reduced-motion` probado entero.

### Los nombres de los servicios no son encabezados

En la lista de servicios, "Sitios web", "Software a medida", etc. son `<span>`
adentro de un `<button>` y no `<h3>`. Es a propósito: HTML no permite un
encabezado dentro de un botón.

Los nombres de las dos líneas sí son `h2`, y los nueve entregables de más abajo
son `h3` adentro de un enlace, que HTML sí permite. Esos son los que tienen
valor de búsqueda de verdad: "tienda online", "turnos y reservas", "cotizador".

### El límite de cinco envíos por hora depende de Supabase

Se cuenta consultando la propia tabla `leads` por huella de IP. Si Supabase no
responde, el envío **se deja pasar**: perder una consulta real es peor que
aceptar una repetida. En la práctica significa que si Supabase se cae, el
límite deja de aplicar durante ese rato.

Alcanza para lo que tiene que frenar, que es el llenado automático de
formularios. Si alguna vez hiciera falta algo más firme, el paso siguiente es
un almacén aparte tipo Upstash, no un captcha: un captcha frena robots y
también frena clientes.

---

## Del sitio anterior, por si se extraña

Está todo en [RESCATE.md](RESCATE.md) y en el historial de git (commit
`18d486d`). Además de las dos notas, lo que más vale la pena recuperar algún
día: **la calculadora de planes** (cuatro preguntas y te recomienda uno) y el
**simulador de resultados de Google**. Los dos funcionaban bien; no entran en
el sitio actual, pero son piezas terminadas.
