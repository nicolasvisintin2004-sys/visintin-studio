# Cómo leer la medición

Para alguien que nunca configuró analytics. Diez minutos de lectura y no hace
falta saber programar.

---

## Lo que hay que entender primero

El sitio registra **cuatro cosas** y nada más. No hay nada que configurar
adentro del código: los cuatro ya están puestos y se envían solos.

| Evento | Qué significa |
| --- | --- |
| `view_diagnostico` | Alguien abrió la página del diagnóstico |
| `submit_lead` | Alguien completó el formulario **y el servidor lo aceptó** |
| `click_whatsapp` | Alguien tocó un botón de WhatsApp |
| `view_caso` | Alguien abrió la página de un proyecto |

Los dos primeros son el embudo que importa: **cuántos miraron el diagnóstico
contra cuántos lo pidieron.** Si de cien que lo miran lo piden dos, el problema
está en la página. Si lo miran diez, el problema está en cómo se difunde.

`submit_lead` se registra recién cuando el servidor confirma que guardó la
consulta. Eso es a propósito: si se registrara al tocar el botón, un error de
red contaría como consulta recibida y el número del panel nunca coincidiría con
la lista real.

Cada evento viaja con un dato extra. `click_whatsapp` dice de qué parte del
sitio salió (`hero`, `pie`, `pedido_reservas`, `plan_esencial`, y así), y
`submit_lead` dice de qué página y de qué rubro. Eso es lo que después permite
saber **qué es lo que la gente viene a pedir**.

---

## Encenderlo

Hay dos proveedores y funcionan iguales. Se puede usar uno, los dos o ninguno.
Con los dos vacíos el sitio no le pide un solo byte a nadie y funciona igual.

### Umami (recomendado para el día a día)

Es liviano, no usa cookies y no obliga a poner el cartel de consentimiento.

1. Entrar a [cloud.umami.is](https://cloud.umami.is) y crear una cuenta.
2. **Add website** → poner el dominio → **Save**.
3. Copiar el **Website ID** (un código largo con guiones).
4. En Netlify: **Site configuration → Environment variables → Add a variable**.
   Nombre `NEXT_PUBLIC_UMAMI_ID`, valor el código.
5. **Deploys → Trigger deploy → Deploy site**. Sin volver a publicar, la
   variable no entra.

El panel muestra las visitas en la pestaña principal y los cuatro eventos en
**Events**.

### Google Analytics 4

Da informes más completos y es gratis, pero usa cookies.

1. [analytics.google.com](https://analytics.google.com) → crear una propiedad.
2. Copiar el identificador, que empieza con `G-`.
3. En Netlify, variable `NEXT_PUBLIC_GA_ID` con ese valor, y publicar de nuevo.

Los eventos aparecen en **Informes → Interacción → Eventos**. Tardan hasta
24 horas en aparecer ahí; para verlos al momento, **Informes → Tiempo real**.

---

## Saber de dónde vino cada consulta

Esto es lo que convierte la medición en algo accionable. Cuando mandes el
enlace en un mensaje, en una historia o en un anuncio, **agregale una etiqueta
al final de la dirección**:

```
https://TUDOMINIO/diagnostico?utm_source=instagram&utm_medium=historia&utm_campaign=diagnostico-septiembre
```

Son tres partes y las inventás vos:

- `utm_source` — **dónde** lo pusiste: `instagram`, `linkedin`, `whatsapp`.
- `utm_medium` — **de qué forma**: `historia`, `mensaje-directo`, `anuncio`.
- `utm_campaign` — **qué campaña**: `diagnostico-septiembre`.

Sin espacios, sin mayúsculas y sin tildes. Usá siempre las mismas palabras, o
`Instagram` e `instagram` van a aparecer como dos fuentes distintas.

Las etiquetas se guardan apenas la persona entra y **sobreviven a que navegue
por el sitio**: si entra al diagnóstico por una historia, después mira
Proyectos y vuelve a completar el formulario, la consulta igual queda marcada
como que vino de Instagram.

Las vas a ver en dos lugares: en el panel de analytics, y —lo que más sirve—
**en cada fila de la lista de consultas**, en las columnas `utm_source`,
`utm_medium` y `utm_campaign`.

---

## Bajar la lista de consultas

Las consultas del formulario se guardan en Supabase. Para bajarlas sin entrar
a Supabase, abrí en el navegador:

```
https://TUDOMINIO/api/leads/export?token=EL_ADMIN_TOKEN
```

Baja un `.csv` que se abre en Excel o en Google Sheets, ordenado de la más
nueva a la más vieja.

**El token es una contraseña.** No lo pegues en un chat ni lo mandes por
correo: cualquiera que lo tenga puede bajarse la lista completa de contactos.
Si se filtra, se cambia la variable `ADMIN_TOKEN` en Netlify y se vuelve a
publicar; el anterior deja de funcionar al instante.

---

## Qué mirar cada mes

Cinco minutos, una vez por mes:

1. **`view_diagnostico` contra `submit_lead`.** Es el número que mueve el
   negocio. Todo lo demás es contexto.
2. **De dónde vinieron los `submit_lead`.** Si nueve de diez son de un solo
   lugar, ahí hay que poner el esfuerzo.
3. **Qué `origen` tienen los `click_whatsapp`.** Los nueve entregables de la
   página de Servicios registran cada uno el suyo. A los pocos meses vas a
   saber qué es lo que la gente viene a pedir, y eso cambia de qué habla la
   portada.

Un dato para tener a mano: el sitio anterior estuvo meses midiendo con una
herramienta que no recolectaba nada en Netlify, así que de ese período no hay
un solo dato. Vale la pena encender esto el primer día.
