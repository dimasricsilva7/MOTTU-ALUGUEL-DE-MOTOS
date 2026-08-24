create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  event_id text not null unique,
  source_url text,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- O site usa a SUPABASE_SERVICE_ROLE_KEY apenas no servidor para ler/gravar/excluir.
-- Não crie policies públicas para esta tabela.
