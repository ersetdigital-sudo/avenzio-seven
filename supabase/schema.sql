-- Avenzio Seven — skema database (Supabase Postgres)
-- Dijalankan via Management API / SQL editor. RLS aktif tanpa policy:
-- semua akses dari aplikasi lewat service role (server-side API routes).

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  cat text not null,
  prov text not null default '',
  prov_name text not null default '',
  title text not null,
  short text not null default '',
  nominal text not null default '',
  price integer not null default 0,
  bill boolean not null default false,
  description text not null default '',
  kind text not null default '',
  image_url text not null default '',
  image_public_id text not null default '',
  featured boolean not null default false,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  account_name text not null default '',
  account_number text not null default '',
  image_url text not null default '',
  image_public_id text not null default '',
  notes text not null default '',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  inv text not null unique,
  slug text not null default '',
  product_title text not null default '',
  target_number text not null default '',
  total integer not null default 0,
  status text not null default 'menunggu',
  method text not null default 'QRIS',
  wa_number text not null default '',
  customer_name text not null default '',
  note text not null default '',
  owner_token text not null default '',
  paid_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists products_cat_idx on public.products (cat);
create index if not exists products_active_idx on public.products (is_active);

alter table public.products enable row level security;
alter table public.payment_methods enable row level security;
alter table public.orders enable row level security;

create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_touch on public.products;
create trigger products_touch before update on public.products
  for each row execute function public.touch_updated_at();

drop trigger if exists payment_methods_touch on public.payment_methods;
create trigger payment_methods_touch before update on public.payment_methods
  for each row execute function public.touch_updated_at();

drop trigger if exists orders_touch on public.orders;
create trigger orders_touch before update on public.orders
  for each row execute function public.touch_updated_at();
