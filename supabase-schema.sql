create extension if not exists pgcrypto;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  telegram_id bigint,
  telegram_username text,
  display_name text,
  driver_name text,
  car_ownership text,
  car_brand text,
  car_model text,
  car_year integer,
  fuel_type text,
  fuel_consumption numeric,
  odometer numeric,
  car_number text,
  default_platform text,
  rent_amount numeric,
  rent_frequency text,
  rent_payment_day text,
  platforms jsonb not null default '[]'::jsonb,
  phone text,
  city text,
  avatar_url text,
  weekly_goal numeric not null default 10000,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.shifts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  id uuid default gen_random_uuid(),
  key text primary key,
  user_id uuid references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.settings add column if not exists id uuid default gen_random_uuid();
alter table public.shifts add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table public.expenses add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table public.settings add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table public.profiles add column if not exists car_ownership text;
alter table public.profiles add column if not exists car_brand text;
alter table public.profiles add column if not exists car_year integer;
alter table public.profiles add column if not exists fuel_type text;
alter table public.profiles add column if not exists fuel_consumption numeric;
alter table public.profiles add column if not exists odometer numeric;
alter table public.profiles add column if not exists rent_amount numeric;
alter table public.profiles add column if not exists rent_frequency text;
alter table public.profiles add column if not exists rent_payment_day text;
alter table public.profiles add column if not exists platforms jsonb not null default '[]'::jsonb;
alter table public.profiles add column if not exists onboarding_completed boolean not null default false;

update public.settings
set id = gen_random_uuid()
where id is null;

alter table public.settings alter column id set not null;

do $$
begin
  if exists (
    select 1
    from pg_constraint
    where conname = 'settings_pkey'
      and conrelid = 'public.settings'::regclass
  ) then
    alter table public.settings drop constraint settings_pkey;
  end if;
end
$$;

alter table public.settings add constraint settings_pkey primary key (id);

create unique index if not exists settings_user_key_unique
on public.settings(user_id, key)
where user_id is not null;

create unique index if not exists settings_legacy_key_unique
on public.settings(key)
where user_id is null;

create index if not exists profiles_telegram_id_idx
on public.profiles(telegram_id)
where telegram_id is not null;

alter table public.shifts replica identity full;
alter table public.expenses replica identity full;
alter table public.settings replica identity full;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_shifts_updated_at on public.shifts;
create trigger set_shifts_updated_at
before update on public.shifts
for each row
execute function public.set_updated_at();

drop trigger if exists set_expenses_updated_at on public.expenses;
create trigger set_expenses_updated_at
before update on public.expenses
for each row
execute function public.set_updated_at();

drop trigger if exists set_settings_updated_at on public.settings;
create trigger set_settings_updated_at
before update on public.settings
for each row
execute function public.set_updated_at();

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    user_id,
    telegram_id,
    telegram_username,
    display_name,
    driver_name,
    avatar_url
  )
  values (
    new.id,
    nullif(new.raw_user_meta_data ->> 'telegram_id', '')::bigint,
    new.raw_user_meta_data ->> 'telegram_username',
    coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'driver_name', new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists create_profile_for_new_user on auth.users;
create trigger create_profile_for_new_user
after insert on auth.users
for each row
execute function public.create_profile_for_new_user();

alter table public.profiles enable row level security;
alter table public.shifts enable row level security;
alter table public.expenses enable row level security;
alter table public.settings enable row level security;

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
on public.profiles for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users insert own profile" on public.profiles;
create policy "Users insert own profile"
on public.profiles for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
on public.profiles for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "Public read shifts" on public.shifts;
drop policy if exists "Users read own shifts" on public.shifts;
create policy "Users read own shifts"
on public.shifts for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Public insert shifts" on public.shifts;
drop policy if exists "Users insert own shifts" on public.shifts;
create policy "Users insert own shifts"
on public.shifts for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Public update shifts" on public.shifts;
drop policy if exists "Users update own shifts" on public.shifts;
create policy "Users update own shifts"
on public.shifts for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "Public delete shifts" on public.shifts;
drop policy if exists "Users delete own shifts" on public.shifts;
create policy "Users delete own shifts"
on public.shifts for delete
to authenticated
using (user_id = auth.uid());

drop policy if exists "Public read expenses" on public.expenses;
drop policy if exists "Users read own expenses" on public.expenses;
create policy "Users read own expenses"
on public.expenses for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Public insert expenses" on public.expenses;
drop policy if exists "Users insert own expenses" on public.expenses;
create policy "Users insert own expenses"
on public.expenses for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Public update expenses" on public.expenses;
drop policy if exists "Users update own expenses" on public.expenses;
create policy "Users update own expenses"
on public.expenses for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "Public delete expenses" on public.expenses;
drop policy if exists "Users delete own expenses" on public.expenses;
create policy "Users delete own expenses"
on public.expenses for delete
to authenticated
using (user_id = auth.uid());

drop policy if exists "Public read settings" on public.settings;
drop policy if exists "Users read own settings" on public.settings;
create policy "Users read own settings"
on public.settings for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Public insert settings" on public.settings;
drop policy if exists "Users insert own settings" on public.settings;
create policy "Users insert own settings"
on public.settings for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Public update settings" on public.settings;
drop policy if exists "Users update own settings" on public.settings;
create policy "Users update own settings"
on public.settings for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'shifts'
    ) then
      alter publication supabase_realtime add table public.shifts;
    end if;

    if not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'expenses'
    ) then
      alter publication supabase_realtime add table public.expenses;
    end if;

    if not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'settings'
    ) then
      alter publication supabase_realtime add table public.settings;
    end if;

    if not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'profiles'
    ) then
      alter publication supabase_realtime add table public.profiles;
    end if;
  end if;
end
$$;
