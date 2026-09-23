/**
 * Prueba la función del formulario sin desplegar nada.
 *
 *   node --experimental-strip-types herramientas/probar-leads.mts
 *
 * Llama al manejador directamente con peticiones armadas a mano y muestra qué
 * responde a cada una. Sirve para verificar la validación, el honeypot y el
 * método permitido en el momento, que es cuando conviene: lo demás sólo se
 * puede probar contra Netlify ya desplegado.
 *
 * Lee las variables de entorno que haya. Sin `SUPABASE_URL` ni
 * `RESEND_API_KEY` el caso válido responde 503, y eso está bien: significa
 * que la función se niega a decir "gracias" mientras pierde la consulta. Con
 * las variables cargadas, el mismo caso tiene que dar 200 y aparecer una fila
 * nueva en la tabla.
 *
 * Con las variables reales cargadas, esto escribe de verdad. Usar sólo contra
 * un proyecto de Supabase de prueba, o borrar la fila después.
 */

import handler from "../netlify/functions/leads.mts";

const contexto = { ip: "192.0.2.10" } as never;

const base = {
  nombre: "Nicolás Prueba",
  empresa: "Metalúrgica Prueba",
  whatsapp: "2920304938",
  email: "prueba@ejemplo.com",
  rubro: "Metalmecánica",
  mensaje: "Los presupuestos se arman a mano, uno por uno.",
  consentimiento: true,
  origen: "prueba-local",
  utm_source: "instagram",
  utm_medium: "historia",
  utm_campaign: "diagnostico-septiembre",
};

async function probar(nombre: string, cuerpo: unknown, metodo = "POST") {
  const peticion = new Request("https://ejemplo.test/api/leads", {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    ...(metodo === "POST" ? { body: JSON.stringify(cuerpo) } : {}),
  });

  const respuesta = await handler(peticion, contexto);
  const texto = await respuesta.text();
  console.log(`${String(respuesta.status).padEnd(4)} ${nombre.padEnd(36)} ${texto.slice(0, 100)}`);
}

console.log("estado  caso                                 respuesta");
console.log("─".repeat(96));

await probar("método equivocado", base, "GET");
await probar("consulta válida", base);
await probar("honeypot completado", { ...base, sitioWeb: "http://spam.test" });
await probar("sin consentimiento", { ...base, consentimiento: false });
await probar("correo inválido", { ...base, email: "no-es-un-correo" });
await probar("nombre vacío", { ...base, nombre: "" });
await probar("cuerpo sin campos", {});

console.log("─".repeat(96));
console.log(
  "Esperado sin variables de entorno: 405 · 503 · 200 · 400 · 400 · 400 · 400\n" +
    "Con Supabase configurado, el segundo caso pasa a 200 y deja una fila en `leads`.",
);
