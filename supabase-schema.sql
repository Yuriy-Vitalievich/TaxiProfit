create extension if not exists pgcrypto;

create table if not exists public.drivers (
  id uuid primary key default gen_random_uuid(),
  telegram_id bigint not null unique,
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
  telegram_id bigint,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  telegram_id bigint,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  id uuid default gen_random_uuid(),
  key text primary key,
  user_id uuid references auth.users(id) on delete cascade,
  telegram_id bigint,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.settings add column if not exists id uuid default gen_random_uuid();
alter table public.shifts add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table public.expenses add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table public.settings add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table public.shifts add column if not exists telegram_id bigint;
alter table public.expenses add column if not exists telegram_id bigint;
alter table public.settings add column if not exists telegram_id bigint;
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

create unique index if not exists settings_telegram_key_unique
on public.settings(telegram_id, key)
where telegram_id is not null;

drop index if exists settings_legacy_key_unique;
create unique index if not exists settings_legacy_key_unique
on public.settings(key)
where user_id is null and telegram_id is null;

create index if not exists profiles_telegram_id_idx
on public.profiles(telegram_id)
where telegram_id is not null;

create index if not exists drivers_telegram_id_idx
on public.drivers(telegram_id);

create index if not exists shifts_telegram_id_idx
on public.shifts(telegram_id)
where telegram_id is not null;

create index if not exists expenses_telegram_id_idx
on public.expenses(telegram_id)
where telegram_id is not null;

create index if not exists settings_telegram_id_idx
on public.settings(telegram_id)
where telegram_id is not null;

create or replace function public.current_telegram_id()
returns bigint
language sql
stable
as $$
  select case
    when (auth.jwt() -> 'user_metadata' ->> 'telegram_id') ~ '^[0-9]+$'
    then (auth.jwt() -> 'user_metadata' ->> 'telegram_id')::bigint
    else null
  end
$$;

create or replace function public.user_matches_current_telegram(target_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.user_id = target_user_id
      and p.telegram_id is not null
      and p.telegram_id = public.current_telegram_id()
  )
$$;

create or replace function public.row_matches_current_telegram(target_telegram_id bigint)
returns boolean
language sql
stable
as $$
  select target_telegram_id is not null
    and target_telegram_id = public.current_telegram_id()
$$;

create or replace function public.clear_current_telegram_activity()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  tg bigint := public.current_telegram_id();
  uid uuid := auth.uid();
begin
  delete from public.shifts
  where (uid is not null and user_id = uid)
     or (tg is not null and telegram_id = tg);

  delete from public.expenses
  where (uid is not null and user_id = uid)
     or (tg is not null and telegram_id = tg);
end;
$$;

create or replace function public.delete_current_telegram_profile_data()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  tg bigint := public.current_telegram_id();
  uid uuid := auth.uid();
begin
  delete from public.settings
  where (uid is not null and user_id = uid)
     or (tg is not null and telegram_id = tg);

  delete from public.shifts
  where (uid is not null and user_id = uid)
     or (tg is not null and telegram_id = tg);

  delete from public.expenses
  where (uid is not null and user_id = uid)
     or (tg is not null and telegram_id = tg);

  delete from public.profiles
  where (uid is not null and user_id = uid)
     or (tg is not null and telegram_id = tg);
end;
$$;

create or replace function public.upsert_current_telegram_profile(profile_payload jsonb)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  tg bigint := public.current_telegram_id();
  uid uuid := auth.uid();
  target_user_id uuid;
  saved public.profiles;
begin
  if uid is null then
    raise exception 'auth.uid is required';
  end if;

  select p.user_id
  into target_user_id
  from public.profiles p
  where p.user_id = uid
     or (tg is not null and p.telegram_id = tg)
  order by
    case when p.user_id = uid then 0 else 1 end,
    p.onboarding_completed desc,
    p.updated_at desc
  limit 1;

  if target_user_id is null then
    target_user_id := uid;
  end if;

  insert into public.profiles (
    user_id,
    telegram_id,
    telegram_username,
    display_name,
    driver_name,
    car_ownership,
    car_brand,
    car_model,
    car_year,
    fuel_type,
    fuel_consumption,
    odometer,
    car_number,
    default_platform,
    rent_amount,
    rent_frequency,
    rent_payment_day,
    platforms,
    phone,
    city,
    avatar_url,
    weekly_goal,
    onboarding_completed
  )
  values (
    target_user_id,
    coalesce(tg, nullif(profile_payload ->> 'telegram_id', '')::bigint),
    coalesce(profile_payload ->> 'telegram_username', ''),
    coalesce(profile_payload ->> 'display_name', ''),
    coalesce(profile_payload ->> 'driver_name', ''),
    coalesce(profile_payload ->> 'car_ownership', ''),
    coalesce(profile_payload ->> 'car_brand', ''),
    coalesce(profile_payload ->> 'car_model', ''),
    nullif(profile_payload ->> 'car_year', '')::integer,
    coalesce(profile_payload ->> 'fuel_type', ''),
    nullif(profile_payload ->> 'fuel_consumption', '')::numeric,
    nullif(profile_payload ->> 'odometer', '')::numeric,
    coalesce(profile_payload ->> 'car_number', ''),
    coalesce(profile_payload ->> 'default_platform', 'Bolt'),
    nullif(profile_payload ->> 'rent_amount', '')::numeric,
    coalesce(profile_payload ->> 'rent_frequency', ''),
    coalesce(profile_payload ->> 'rent_payment_day', ''),
    coalesce(profile_payload -> 'platforms', '[]'::jsonb),
    coalesce(profile_payload ->> 'phone', ''),
    coalesce(profile_payload ->> 'city', ''),
    coalesce(profile_payload ->> 'avatar_url', ''),
    coalesce(nullif(profile_payload ->> 'weekly_goal', '')::numeric, 10000),
    coalesce((profile_payload ->> 'onboarding_completed')::boolean, false)
  )
  on conflict (user_id) do update
  set
    telegram_id = excluded.telegram_id,
    telegram_username = excluded.telegram_username,
    display_name = excluded.display_name,
    driver_name = excluded.driver_name,
    car_ownership = excluded.car_ownership,
    car_brand = excluded.car_brand,
    car_model = excluded.car_model,
    car_year = excluded.car_year,
    fuel_type = excluded.fuel_type,
    fuel_consumption = excluded.fuel_consumption,
    odometer = excluded.odometer,
    car_number = excluded.car_number,
    default_platform = excluded.default_platform,
    rent_amount = excluded.rent_amount,
    rent_frequency = excluded.rent_frequency,
    rent_payment_day = excluded.rent_payment_day,
    platforms = excluded.platforms,
    phone = excluded.phone,
    city = excluded.city,
    avatar_url = excluded.avatar_url,
    weekly_goal = excluded.weekly_goal,
    onboarding_completed = excluded.onboarding_completed
  returning * into saved;

  return saved;
end;
$$;

create or replace function public.upsert_telegram_driver_profile(profile_payload jsonb)
returns public.drivers
language plpgsql
security definer
set search_path = public
as $$
declare
  tg bigint := coalesce(
    public.current_telegram_id(),
    nullif(profile_payload ->> 'telegram_id', '')::bigint
  );
  saved public.drivers;
begin
  if tg is null then
    raise exception 'telegram_id is required';
  end if;

  insert into public.drivers (
    telegram_id,
    telegram_username,
    display_name,
    driver_name,
    car_ownership,
    car_brand,
    car_model,
    car_year,
    fuel_type,
    fuel_consumption,
    odometer,
    car_number,
    default_platform,
    rent_amount,
    rent_frequency,
    rent_payment_day,
    platforms,
    phone,
    city,
    avatar_url,
    weekly_goal,
    onboarding_completed
  )
  values (
    tg,
    coalesce(profile_payload ->> 'telegram_username', ''),
    coalesce(profile_payload ->> 'display_name', ''),
    coalesce(profile_payload ->> 'driver_name', ''),
    coalesce(profile_payload ->> 'car_ownership', ''),
    coalesce(profile_payload ->> 'car_brand', ''),
    coalesce(profile_payload ->> 'car_model', ''),
    nullif(profile_payload ->> 'car_year', '')::integer,
    coalesce(profile_payload ->> 'fuel_type', ''),
    nullif(profile_payload ->> 'fuel_consumption', '')::numeric,
    nullif(profile_payload ->> 'odometer', '')::numeric,
    coalesce(profile_payload ->> 'car_number', ''),
    coalesce(profile_payload ->> 'default_platform', 'Bolt'),
    nullif(profile_payload ->> 'rent_amount', '')::numeric,
    coalesce(profile_payload ->> 'rent_frequency', ''),
    coalesce(profile_payload ->> 'rent_payment_day', ''),
    coalesce(profile_payload -> 'platforms', '[]'::jsonb),
    coalesce(profile_payload ->> 'phone', ''),
    coalesce(profile_payload ->> 'city', ''),
    coalesce(profile_payload ->> 'avatar_url', ''),
    coalesce(nullif(profile_payload ->> 'weekly_goal', '')::numeric, 10000),
    coalesce((profile_payload ->> 'onboarding_completed')::boolean, false)
  )
  on conflict (telegram_id) do update
  set
    telegram_username = excluded.telegram_username,
    display_name = excluded.display_name,
    driver_name = excluded.driver_name,
    car_ownership = excluded.car_ownership,
    car_brand = excluded.car_brand,
    car_model = excluded.car_model,
    car_year = excluded.car_year,
    fuel_type = excluded.fuel_type,
    fuel_consumption = excluded.fuel_consumption,
    odometer = excluded.odometer,
    car_number = excluded.car_number,
    default_platform = excluded.default_platform,
    rent_amount = excluded.rent_amount,
    rent_frequency = excluded.rent_frequency,
    rent_payment_day = excluded.rent_payment_day,
    platforms = excluded.platforms,
    phone = excluded.phone,
    city = excluded.city,
    avatar_url = excluded.avatar_url,
    weekly_goal = excluded.weekly_goal,
    onboarding_completed = excluded.onboarding_completed
  returning * into saved;

  return saved;
end;
$$;

create or replace function public.clear_telegram_activity(target_telegram_id bigint)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if target_telegram_id is null then
    raise exception 'telegram_id is required';
  end if;

  delete from public.shifts where telegram_id = target_telegram_id;
  delete from public.expenses where telegram_id = target_telegram_id;
end;
$$;

create or replace function public.delete_telegram_driver_account(target_telegram_id bigint)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if target_telegram_id is null then
    raise exception 'telegram_id is required';
  end if;

  delete from public.settings where telegram_id = target_telegram_id;
  delete from public.shifts where telegram_id = target_telegram_id;
  delete from public.expenses where telegram_id = target_telegram_id;
  delete from public.profiles where telegram_id = target_telegram_id;
  delete from public.drivers where telegram_id = target_telegram_id;
end;
$$;

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

drop trigger if exists set_drivers_updated_at on public.drivers;
create trigger set_drivers_updated_at
before update on public.drivers
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
alter table public.drivers enable row level security;
alter table public.shifts enable row level security;
alter table public.expenses enable row level security;
alter table public.settings enable row level security;

drop policy if exists "Telegram read driver profile" on public.drivers;
create policy "Telegram read driver profile"
on public.drivers for select
to anon, authenticated
using (telegram_id is not null);

drop policy if exists "Telegram insert driver profile" on public.drivers;
create policy "Telegram insert driver profile"
on public.drivers for insert
to anon, authenticated
with check (telegram_id is not null);

drop policy if exists "Telegram update driver profile" on public.drivers;
create policy "Telegram update driver profile"
on public.drivers for update
to anon, authenticated
using (telegram_id is not null)
with check (telegram_id is not null);

drop policy if exists "Telegram delete driver profile" on public.drivers;
create policy "Telegram delete driver profile"
on public.drivers for delete
to anon, authenticated
using (telegram_id is not null);

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
on public.profiles for select
to authenticated
using (user_id = auth.uid() or telegram_id = public.current_telegram_id());

drop policy if exists "Users insert own profile" on public.profiles;
create policy "Users insert own profile"
on public.profiles for insert
to authenticated
with check (user_id = auth.uid() or telegram_id = public.current_telegram_id());

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
on public.profiles for update
to authenticated
using (user_id = auth.uid() or telegram_id = public.current_telegram_id())
with check (user_id = auth.uid() or telegram_id = public.current_telegram_id());

drop policy if exists "Users delete own profile" on public.profiles;
create policy "Users delete own profile"
on public.profiles for delete
to authenticated
using (user_id = auth.uid() or telegram_id = public.current_telegram_id());

drop policy if exists "Public read shifts" on public.shifts;
drop policy if exists "Users read own shifts" on public.shifts;
create policy "Users read own shifts"
on public.shifts for select
to authenticated
using (
  user_id = auth.uid()
  or public.row_matches_current_telegram(telegram_id)
  or public.user_matches_current_telegram(user_id)
);

drop policy if exists "Telegram app read shifts" on public.shifts;
create policy "Telegram app read shifts"
on public.shifts for select
to anon
using (telegram_id is not null);

drop policy if exists "Public insert shifts" on public.shifts;
drop policy if exists "Users insert own shifts" on public.shifts;
create policy "Users insert own shifts"
on public.shifts for insert
to authenticated
with check (
  user_id = auth.uid()
  or public.row_matches_current_telegram(telegram_id)
  or public.user_matches_current_telegram(user_id)
);

drop policy if exists "Telegram app insert shifts" on public.shifts;
create policy "Telegram app insert shifts"
on public.shifts for insert
to anon
with check (telegram_id is not null);

drop policy if exists "Public update shifts" on public.shifts;
drop policy if exists "Users update own shifts" on public.shifts;
create policy "Users update own shifts"
on public.shifts for update
to authenticated
using (
  user_id = auth.uid()
  or public.row_matches_current_telegram(telegram_id)
  or public.user_matches_current_telegram(user_id)
)
with check (
  user_id = auth.uid()
  or public.row_matches_current_telegram(telegram_id)
  or public.user_matches_current_telegram(user_id)
);

drop policy if exists "Telegram app update shifts" on public.shifts;
create policy "Telegram app update shifts"
on public.shifts for update
to anon
using (telegram_id is not null)
with check (telegram_id is not null);

drop policy if exists "Public delete shifts" on public.shifts;
drop policy if exists "Users delete own shifts" on public.shifts;
create policy "Users delete own shifts"
on public.shifts for delete
to authenticated
using (
  user_id = auth.uid()
  or public.row_matches_current_telegram(telegram_id)
  or public.user_matches_current_telegram(user_id)
);

drop policy if exists "Telegram app delete shifts" on public.shifts;
create policy "Telegram app delete shifts"
on public.shifts for delete
to anon
using (telegram_id is not null);

drop policy if exists "Public read expenses" on public.expenses;
drop policy if exists "Users read own expenses" on public.expenses;
create policy "Users read own expenses"
on public.expenses for select
to authenticated
using (
  user_id = auth.uid()
  or public.row_matches_current_telegram(telegram_id)
  or public.user_matches_current_telegram(user_id)
);

drop policy if exists "Telegram app read expenses" on public.expenses;
create policy "Telegram app read expenses"
on public.expenses for select
to anon
using (telegram_id is not null);

drop policy if exists "Public insert expenses" on public.expenses;
drop policy if exists "Users insert own expenses" on public.expenses;
create policy "Users insert own expenses"
on public.expenses for insert
to authenticated
with check (
  user_id = auth.uid()
  or public.row_matches_current_telegram(telegram_id)
  or public.user_matches_current_telegram(user_id)
);

drop policy if exists "Telegram app insert expenses" on public.expenses;
create policy "Telegram app insert expenses"
on public.expenses for insert
to anon
with check (telegram_id is not null);

drop policy if exists "Public update expenses" on public.expenses;
drop policy if exists "Users update own expenses" on public.expenses;
create policy "Users update own expenses"
on public.expenses for update
to authenticated
using (
  user_id = auth.uid()
  or public.row_matches_current_telegram(telegram_id)
  or public.user_matches_current_telegram(user_id)
)
with check (
  user_id = auth.uid()
  or public.row_matches_current_telegram(telegram_id)
  or public.user_matches_current_telegram(user_id)
);

drop policy if exists "Telegram app update expenses" on public.expenses;
create policy "Telegram app update expenses"
on public.expenses for update
to anon
using (telegram_id is not null)
with check (telegram_id is not null);

drop policy if exists "Public delete expenses" on public.expenses;
drop policy if exists "Users delete own expenses" on public.expenses;
create policy "Users delete own expenses"
on public.expenses for delete
to authenticated
using (
  user_id = auth.uid()
  or public.row_matches_current_telegram(telegram_id)
  or public.user_matches_current_telegram(user_id)
);

drop policy if exists "Telegram app delete expenses" on public.expenses;
create policy "Telegram app delete expenses"
on public.expenses for delete
to anon
using (telegram_id is not null);

drop policy if exists "Public read settings" on public.settings;
drop policy if exists "Users read own settings" on public.settings;
create policy "Users read own settings"
on public.settings for select
to authenticated
using (
  user_id = auth.uid()
  or public.row_matches_current_telegram(telegram_id)
  or public.user_matches_current_telegram(user_id)
);

drop policy if exists "Telegram app read settings" on public.settings;
create policy "Telegram app read settings"
on public.settings for select
to anon
using (telegram_id is not null);

drop policy if exists "Public insert settings" on public.settings;
drop policy if exists "Users insert own settings" on public.settings;
create policy "Users insert own settings"
on public.settings for insert
to authenticated
with check (
  user_id = auth.uid()
  or public.row_matches_current_telegram(telegram_id)
  or public.user_matches_current_telegram(user_id)
);

drop policy if exists "Telegram app insert settings" on public.settings;
create policy "Telegram app insert settings"
on public.settings for insert
to anon
with check (telegram_id is not null);

drop policy if exists "Public update settings" on public.settings;
drop policy if exists "Users update own settings" on public.settings;
create policy "Users update own settings"
on public.settings for update
to authenticated
using (
  user_id = auth.uid()
  or public.row_matches_current_telegram(telegram_id)
  or public.user_matches_current_telegram(user_id)
)
with check (
  user_id = auth.uid()
  or public.row_matches_current_telegram(telegram_id)
  or public.user_matches_current_telegram(user_id)
);

drop policy if exists "Telegram app update settings" on public.settings;
create policy "Telegram app update settings"
on public.settings for update
to anon
using (telegram_id is not null)
with check (telegram_id is not null);

drop policy if exists "Telegram app delete settings" on public.settings;
create policy "Telegram app delete settings"
on public.settings for delete
to anon
using (telegram_id is not null);

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

    if not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'drivers'
    ) then
      alter publication supabase_realtime add table public.drivers;
    end if;
  end if;
end
$$;

grant execute on function public.upsert_telegram_driver_profile(jsonb) to anon, authenticated;
grant execute on function public.delete_telegram_driver_account(bigint) to anon, authenticated;
grant execute on function public.clear_telegram_activity(bigint) to anon, authenticated;
