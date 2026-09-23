-- ═══════════════════════════════════════════════════════════════════
-- La tabla de consultas.
--
-- Se pega entera en el editor SQL de Supabase (Dashboard → SQL Editor →
-- New query → pegar → Run). Se puede volver a correr sin romper nada: todo
-- está escrito con IF NOT EXISTS.
-- ═══════════════════════════════════════════════════════════════════

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- Lo que completa la persona.
  nombre        text not null,
  empresa       text not null,
  whatsapp      text not null,
  email         text not null,
  rubro         text not null,
  mensaje       text,

  -- De qué página del sitio salió el formulario. Lo completa la función sola.
  origen        text not null default 'desconocido',

  -- De qué campaña vino. Se leen de la dirección al aterrizar y sobreviven la
  -- navegación interna porque quedan guardados en la sesión del navegador.
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,

  -- Huella de la dirección IP: SHA-256 con sal, recortado a 32 caracteres.
  -- No es la IP y no permite reconstruirla. Existe únicamente para contar
  -- cinco envíos por hora y frenar el llenado automático.
  ip_hash       text
);

-- ── Índices ────────────────────────────────────────────────────────
-- El del límite por hora: la función consulta por huella y fecha en cada
-- envío, así que sin esto cada consulta recorre la tabla entera.
create index if not exists leads_ip_hash_created_at_idx
  on public.leads (ip_hash, created_at desc);

-- El de la descarga y el del panel, que siempre leen de lo más nuevo.
create index if not exists leads_created_at_idx
  on public.leads (created_at desc);


-- ═══════════════════════════════════════════════════════════════════
-- SEGURIDAD
--
-- Se activa Row Level Security y NO se crea ninguna política. Eso deja la
-- tabla cerrada para las claves públicas (`anon` y `authenticated`): aunque
-- alguien saque la clave anónima del sitio, no puede leer ni escribir acá.
--
-- Las dos funciones de Netlify usan la clave de servicio, que saltea RLS por
-- diseño. Esa clave vive sólo en las variables de entorno de Netlify y nunca
-- llega al navegador. Si alguna vez se filtra, se rota desde el panel de
-- Supabase: Settings → API → Service role → Regenerate.
-- ═══════════════════════════════════════════════════════════════════

alter table public.leads enable row level security;

-- Por las dudas: revoca el acceso directo de los roles públicos.
revoke all on public.leads from anon, authenticated;


-- ═══════════════════════════════════════════════════════════════════
-- COMPROBACIÓN
--
-- Después de correr todo, esta consulta tiene que devolver cero filas y no
-- un error. Si devuelve un error, la tabla no se creó.
-- ═══════════════════════════════════════════════════════════════════

-- select count(*) from public.leads;
