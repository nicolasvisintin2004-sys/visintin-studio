# Rescate del sitio anterior

Todo lo que valía la pena del sitio viejo, en un solo archivo, antes de borrarlo.
El sitio completo sigue existiendo en el historial de git (commit `18d486d`): si
falta algo, se recupera con `git show 18d486d:ruta/del/archivo`.

---

## 1. Datos duros (esto es lo que NO se puede volver a inventar)

| Dato | Valor | Dónde estaba |
| --- | --- | --- |
| WhatsApp | `5492920304938` (+54 2920 30-4938) | `lib/sitio.ts` |
| Email | `nico@visintin.com.ar` | `lib/sitio.ts` |
| Verificación Google Search Console | `byjy1nX8alSqxtKqDPgMa1zFKUxlv_OIJHdRbG9DsAk` | `lib/sitio.ts` |
| Nombre / autor | Visintin Studio · Nicolás Visintin | `lib/sitio.ts` |
| URL del sitio | se resolvía de `NEXT_PUBLIC_SITE_URL` → `URL` (Netlify) → localhost | `lib/sitio.ts` |

**Formato del link de WhatsApp:** `https://wa.me/<numero>?text=<mensaje url-encoded>`.
El `9` después del `54` corresponde a móviles argentinos. Estaba marcado como
"verificar el link una vez antes de publicar".

**La verificación de Google corresponde al dominio de Netlify.** Si se registra el
dominio propio, Google entrega un token nuevo: este deja de servir.

---

## 2. Datos personales que van en "Sobre mí"

- Nicolás Visintin, 19 años, de Carmen de Patagones.
- Vive en Buenos Aires. Estudia Ingeniería Industrial en UADE.
- Zona de trabajo: todo el país, a distancia. Horario de respuesta: lunes a viernes, 9 a 20.

**Bio larga (sirve como base; el prompt nuevo pide otro tono pero la sustancia es esta):**

> Empecé haciendo sitios para negocios que conocía y me encontré siempre con la misma
> escena: empresas con veinte años de oficio, productos que se venden solos cuando
> alguien los ve de cerca, y toda su presencia reducida a un perfil de Instagram donde
> las medidas se piden por mensaje privado.
>
> Me terminé enfocando en fábricas de motorhomes y talleres de conversión por una razón
> práctica: son productos caros, técnicos y que se comparan mucho antes de comprarse. El
> que está por gastar USD 50.000 lee todo, mide todo y compara todo. Un negocio así no
> necesita un sitio lindo: necesita uno que conteste las preguntas antes de que las haga.
>
> Lo de Ingeniería Industrial no es un dato suelto. Es la carrera de medir procesos y
> sacar lo que no aporta, que es bastante parecido a lo que hago acá.

---

## 3. Precios (el sitio nuevo NO los muestra, pero son los que cotizás)

| Plan | Precio viejo | Mantenimiento incluido |
| --- | --- | --- |
| Esencial | USD 450 | 1 mes |
| Completo (recomendado) | USD 800 | 3 meses |
| Crecimiento | USD 1.200 | 6 meses |
| Mantenimiento mensual | USD 35/mes | hosting, dominio, SSL, backups, monitoreo de uptime, actualizaciones de seguridad y 2 h mensuales de cambios de contenido. Se factura por semestre adelantado. |

- **Forma de pago:** mitad al arrancar, mitad al publicar.
- **Moneda:** "Los precios se cotizan en dólares y se cobran en pesos al tipo de cambio
  MEP del día de pago."
- El prompt nuevo cambia los meses de mantenimiento incluido (1 / 2 / 3), mueve la
  redacción de textos de Crecimiento a Completo, y el inglés de Completo a Crecimiento.

---

## 4. Preguntas frecuentes — respuestas ya escritas y buenas

**¿El sitio es mío?**
Sí. Dominio, código y contenido a tu nombre. Si un día te vas, te llevás todo.

**¿Qué pasa si dejás de trabajar conmigo?**
Es la pregunta correcta. Está hecho con tecnología estándar y documentada, así que
cualquier desarrollador puede continuarlo. Te entrego el repositorio y los accesos desde
el día uno, no al final.

**Tenés 19 años. ¿Por qué te contrataría?**
Por lo mismo por lo que contratarías a cualquiera: porque podés ver lo que hice y
medirlo. En la sección Trabajo está el Lighthouse de cada proyecto. Si los números no te
convencen, la edad es lo de menos; si te convencen, también.

**¿Cuánto tarda?**
Entre una y tres semanas desde que están los textos y las fotos. Lo que más demora los
proyectos no es el desarrollo: es esperar el contenido.

**¿Cómo se paga?**
La mitad al arrancar y la mitad al publicar. Cotizo en dólares y cobro en pesos al tipo
de cambio MEP del día de pago.

**¿Trabajás con clientes de todo el país?**
Sí. Estoy en Buenos Aires y trabajo a distancia con todo el país. Todo el proceso
funciona por WhatsApp y videollamada.

---

## 5. Los tres compromisos (textos completos, se reusan tal cual)

**Te contesto en menos de 24 horas.** Los mensajes que entran en día hábil los respondo
el mismo día o, como mucho, al siguiente. Si me escribís un domingo a la noche, tenés
respuesta el lunes. No hay bandeja compartida ni cuenta que te derive a otro: escribís
vos, contesto yo.

**No se publica un sitio que no te guste.** Todos los sitios se hacen a medida de tu
negocio: no arranco de una plantilla ni te muestro el resultado recién al final. Vas
viendo los avances y me decís qué cambiar, y para eso están las rondas de revisión de
cada plan. Nada se publica hasta que estés conforme.

**El soporte sigue después de la entrega.** Una vez publicado el sitio y con vos
conforme, el soporte cubre los cambios que aparezcan sobre lo entregado: desde corregir
un texto hasta sumar una página nueva. La carga de contenido del día a día —subir fotos,
cambiar precios— entra en las horas del mantenimiento mensual.

---

## 6. El proceso en cuatro pasos (con los plazos, que era lo bueno)

| Plazo | Paso | Qué es |
| --- | --- | --- |
| 20 min | Charla | Por WhatsApp o llamada. Entiendo el negocio, qué vendés y a quién. Sin costo y sin compromiso. |
| 48 hs | Propuesta | Alcance, plazo y precio cerrado, por escrito. Si algo no entra, lo digo antes y no después. |
| 1–3 sem | Desarrollo | Según el plan. Ves avances a medida que salen. No desaparezco tres semanas para reaparecer con todo hecho. |
| 30 min | Entrega | Publicación, capacitación para que sepas mover tu contenido, y el soporte que incluya tu plan. |

---

## 7. Argumentos de venta que funcionaban (los tres dolores)

1. **No aparecés en Google.** Si alguien busca lo que hacés y no te conoce por nombre,
   hoy encuentra a tu competencia.
2. **Las consultas se pierden en el DM.** Instagram no muestra medidas, especificaciones
   ni precios. El que compara se va con el que sí se los muestra.
3. **Te ves más chico de lo que sos.** Un negocio de veinte años con un perfil de
   Instagram y nada más transmite menos solidez de la que tiene.

Frases sueltas que sobreviven al rediseño:

- "Soy una persona, no una agencia."
- "Cuando escribís, te contesto yo. Cuando algo se rompe, lo arreglo yo."
- "Los números, no los adjetivos."
- "Ficha técnica en texto, no dentro de la imagen."
- "Lo que normalmente se explica por WhatsApp, escrito."

---

## 8. Mensajes de WhatsApp precargados por contexto (patrón a conservar)

El sitio viejo armaba el mensaje según la sección. El prompt nuevo pide lo mismo.

| Contexto | Mensaje |
| --- | --- |
| General | Hola, vi el sitio y quería consultar por un proyecto. |
| Planes | Hola, quería consultar por uno de los planes. |
| Un plan puntual | Hola Nico, vi tu sitio y me interesa el plan {plan}. ¿Podemos charlar? |
| Portfolio | Hola, vi tus trabajos y quería consultar por un proyecto. |
| Un proyecto puntual | Hola, vi el proyecto de {cliente} y quería consultar algo parecido. |
| Sobre mí | Hola, leí tu página de estudio y quería hacerte una consulta. |
| Formulario | Hola Nico, te escribo desde el sitio. + Nombre / Negocio / Rubro / Qué necesito |

El formulario no enviaba nada a ningún servidor: armaba el texto y abría WhatsApp con el
mensaje escrito para que la persona lo revise antes de mandarlo. Es una buena solución
para un sitio estático y conviene conservarla.

---

## 9. Contenido del proyecto García Ferrari (el único con texto real escrito)

- **Rubro:** fábrica de motorhomes sobre Sprinter. **Año:** 2026. **Estado:** en desarrollo.
- **Situación previa:** "Una fábrica que construye unidades de USD 50.000 y presentaba
  todo desde un perfil de Instagram. Las medidas y las terminaciones se explicaban de
  nuevo en cada conversación por mensaje privado."
- **Qué se construyó:**
  - Una página por modelo, con ficha técnica en texto y no dentro de la imagen.
  - Notas de blog sobre patentamiento, aislación y rutas, para las búsquedas del rubro.
  - Datos estructurados y sitemap dinámico para que cada modelo entre por separado en Google.
  - Contacto por WhatsApp desde cualquier punto del recorrido, con el modelo ya escrito en el mensaje.
- **Stack:** Next.js, TypeScript, Tailwind CSS, MDX, Vercel.
- **Medición** (Lighthouse 12.8.2, móvil, build de producción previo al deploy, 2026-08-14):
  LCP 3,8 s · CLS 0,00 · Lighthouse 85/100.

> Taller Italia y JAYCOR no tenían ni una línea escrita en el sitio viejo. Ese contenido
> hay que escribirlo desde cero.

**Cómo se reproducía la medición de Lighthouse:**

```
next build && next start -p 4321
npx lighthouse@12 http://localhost:4321/ --form-factor=mobile \
  --throttling-method=simulate --only-categories=performance
```

---

## 10. Las dos notas de blog (2.000 palabras ya escritas; es lo más caro de rehacer)

`content/notas/cuanto-cuesta-una-pagina-web-pyme-argentina.mdx` y su versión en inglés.
Tema: por qué tres presupuestos para lo mismo dan $200.000, $800.000 y $2.500.000.
Incluye una tabla de rangos de mercado 2026 para Argentina:

| Tipo de sitio | Rango |
| --- | --- |
| Landing de una página | $300.000 – $700.000 |
| Sitio institucional de 5 a 8 páginas | $600.000 – $1.500.000 |
| Tienda online | Arranca arriba del institucional |

Una agencia cotiza entre 40% y 80% más caro por el mismo trabajo.

El sitio nuevo es de una sola página y no tiene blog, así que las notas no entran. Están
completas en git
(`git show 18d486d:content/notas/cuanto-cuesta-una-pagina-web-pyme-argentina.mdx`)
y son material listo para publicar el día que haya una sección de notas.

---

## 11. Decisiones técnicas del sitio viejo que conviene repetir

1. **Export estático** (`output: "export"` + `publish = "out"` en Netlify): las páginas
   quedan como archivos HTML servidos desde el CDN, sin nada corriendo. Lo más rápido
   posible y no depende de la versión del plugin de Next que tenga Netlify.
2. **El idioma se resolvía con redirects de Netlify, no con middleware.** Todos caían en
   español sin mirar `Accept-Language`: buena parte del público —dueños de PyME
   argentinos— tiene Windows en inglés y lee en español. Se usó 302 y no 301 para poder
   revertirlo (un 301 queda cacheado en el navegador de cada visitante).
3. **La imagen de Open Graph necesitaba un header explícito.** Next la exporta sin
   extensión (`/es/opengraph-image`); sin `Content-Type: image/png` forzado en
   `netlify.toml`, WhatsApp no muestra la miniatura al compartir el enlace.
4. **Headers de seguridad** ya probados: `X-Content-Type-Options: nosniff`,
   `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`.
5. **`remarkPlugins` como string y no como función importada:** Turbopack necesita
   serializar la config. (Solo relevante si vuelve MDX.)
6. **Un único envoltorio de analítica** (`registrarEvento`) con `try/catch`, para que
   cambiar de proveedor toque un solo archivo y para que la medición nunca rompa una
   interacción del visitante.
7. **Dimensiones explícitas obligatorias en las imágenes**, comentado en los tipos como
   condición para que el CLS quede en cero.

---

## 12. Dos cosas que estaban MAL y no hay que repetir

1. **`@vercel/analytics` en un deploy de Netlify no mide nada.** Vercel Web Analytics
   solo recolecta en sitios hosteados en Vercel: el endpoint `/_vercel/insights` no
   existe en Netlify. Los clics a WhatsApp del sitio viejo nunca se registraron. El sitio
   nuevo necesita otro proveedor.
2. **LCP de 3,8 s y Lighthouse 85** en el proyecto de referencia, mostrados en el sitio
   como prueba de que hago sitios rápidos. Es un número flojo para estar exhibido.

---

## 13. Lo que se tira sin pena

- Toda la infraestructura bilingüe (`lib/i18n.ts`, `app/[idioma]/`, los pares
  `{es, en}`): el sitio nuevo es solo en español.
- La calculadora de planes y el simulador de resultados de Google.
- El comparador antes/después: nunca tuvo imágenes cargadas.
- `public/`: solo tenía los SVG que vienen con `create-next-app`.
- El README, que seguía siendo el de `create-next-app`.

---

## 14. URLs que van a quedar rotas al pasar a una sola página

Si Google ya indexó algo, hay que redirigir en `netlify.toml`:
`/es`, `/en`, `/es/planes`, `/es/trabajo`, `/es/trabajo/garcia-ferrari-motorhomes`,
`/es/estudio`, `/es/notas`, `/es/notas/cuanto-cuesta-una-pagina-web-pyme-argentina`,
`/es/contacto` y todos sus equivalentes en `/en`.
