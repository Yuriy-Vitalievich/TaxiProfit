create extension if not exists pgcrypto;

alter table public.profiles add column if not exists id uuid default gen_random_uuid();
alter table public.profiles add column if not exists auth_user_id uuid references auth.users(id) on delete cascade;
alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists full_name text;
alter table public.profiles add column if not exists car_type text;
alter table public.profiles add column if not exists fuel_price numeric;
alter table public.profiles add column if not exists rent_period text;

update public.profiles
set
  id = coalesce(id, gen_random_uuid()),
  auth_user_id = coalesce(auth_user_id, user_id),
  username = coalesce(username, telegram_username),
  full_name = coalesce(full_name, driver_name, display_name),
  car_type = coalesce(car_type, car_ownership),
  rent_period = coalesce(rent_period, rent_frequency)
where id is null
   or auth_user_id is null
   or username is null
   or full_name is null
   or car_type is null
   or rent_period is null;

alter table public.profiles alter column id set not null;
create unique index if not exists profiles_id_unique on public.profiles(id);
create unique index if not exists profiles_auth_user_id_unique
on public.profiles(auth_user_id)
where auth_user_id is not null;

with ranked_profiles as (
  select
    id,
    row_number() over (
      partition by telegram_id
      order by onboarding_completed desc, updated_at desc, created_at desc
    ) as row_number
  from public.profiles
  where telegram_id is not null
)
update public.profiles p
set telegram_id = null
from ranked_profiles r
where p.id = r.id
  and r.row_number > 1;

create unique index if not exists profiles_telegram_id_unique
on public.profiles(telegram_id)
where telegram_id is not null;

alter table public.shifts add column if not exists auth_user_id uuid references auth.users(id) on delete set null;
alter table public.expenses add column if not exists auth_user_id uuid references auth.users(id) on delete set null;
alter table public.settings add column if not exists auth_user_id uuid references auth.users(id) on delete set null;

drop index if exists public.settings_legacy_key_unique;
drop index if exists public.settings_user_key_unique;
drop index if exists public.settings_telegram_key_unique;

do $$
declare
  item record;
begin
  for item in
    select conrelid::regclass as table_name, conname
    from pg_constraint c
    join unnest(c.conkey) key(attnum) on true
    join pg_attribute a on a.attrelid = c.conrelid and a.attnum = key.attnum
    where c.contype = 'f'
      and c.connamespace = 'public'::regnamespace
      and c.conrelid in ('public.shifts'::regclass, 'public.expenses'::regclass, 'public.settings'::regclass)
      and a.attname = 'user_id'
  loop
    execute format('alter table %s drop constraint if exists %I', item.table_name, item.conname);
  end loop;
end
$$;

update public.shifts s
set auth_user_id = coalesce(s.auth_user_id, s.user_id),
    user_id = p.id
from public.profiles p
where s.user_id = p.auth_user_id;

update public.expenses e
set auth_user_id = coalesce(e.auth_user_id, e.user_id),
    user_id = p.id
from public.profiles p
where e.user_id = p.auth_user_id;

update public.settings s
set auth_user_id = coalesce(s.auth_user_id, s.user_id),
    user_id = p.id
from public.profiles p
where s.user_id = p.auth_user_id;

update public.shifts s
set auth_user_id = coalesce(s.auth_user_id, s.user_id),
    user_id = null
where s.user_id is not null
  and not exists (select 1 from public.profiles p where p.id = s.user_id);

update public.expenses e
set auth_user_id = coalesce(e.auth_user_id, e.user_id),
    user_id = null
where e.user_id is not null
  and not exists (select 1 from public.profiles p where p.id = e.user_id);

update public.settings s
set auth_user_id = coalesce(s.auth_user_id, s.user_id),
    user_id = null
where s.user_id is not null
  and not exists (select 1 from public.profiles p where p.id = s.user_id);

alter table public.shifts
  add constraint shifts_user_id_profiles_id_fkey
  foreign key (user_id) references public.profiles(id) on delete cascade;

alter table public.expenses
  add constraint expenses_user_id_profiles_id_fkey
  foreign key (user_id) references public.profiles(id) on delete cascade;

alter table public.settings
  add constraint settings_user_id_profiles_id_fkey
  foreign key (user_id) references public.profiles(id) on delete cascade;

alter table public.shifts add column if not exists platform text;
alter table public.shifts add column if not exists start_time timestamptz;
alter table public.shifts add column if not exists end_time timestamptz;
alter table public.shifts add column if not exists work_duration numeric;
alter table public.shifts add column if not exists start_odometer numeric;
alter table public.shifts add column if not exists end_odometer numeric;
alter table public.shifts add column if not exists total_km numeric;
alter table public.shifts add column if not exists paid_km numeric;
alter table public.shifts add column if not exists empty_km numeric;
alter table public.shifts add column if not exists orders_count integer;
alter table public.shifts add column if not exists gross_income numeric;
alter table public.shifts add column if not exists fuel_cost numeric;
alter table public.shifts add column if not exists rent_cost numeric;
alter table public.shifts add column if not exists other_expenses numeric;
alter table public.shifts add column if not exists net_income numeric;

alter table public.expenses add column if not exists shift_id uuid references public.shifts(id) on delete set null;
alter table public.expenses add column if not exists expense_type text;
alter table public.expenses add column if not exists amount numeric;
alter table public.expenses add column if not exists comment text;

create table if not exists public.driver_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  car_type text,
  car_brand text,
  car_model text,
  odometer numeric,
  fuel_consumption numeric,
  fuel_type text,
  fuel_price numeric,
  rent_amount numeric,
  rent_period text,
  weekly_goal numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

create table if not exists public.driver_platforms (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  platform_name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(user_id, platform_name)
);

create index if not exists shifts_user_id_idx on public.shifts(user_id);
create index if not exists expenses_user_id_idx on public.expenses(user_id);
create index if not exists settings_user_id_idx on public.settings(user_id);
create index if not exists driver_settings_user_id_idx on public.driver_settings(user_id);
create index if not exists driver_platforms_user_id_idx on public.driver_platforms(user_id);

create or replace function public.current_telegram_id()
returns bigint
language sql
stable
as $$
  select case
    when coalesce(auth.jwt() -> 'user_metadata' ->> 'telegram_id', auth.jwt() -> 'app_metadata' ->> 'telegram_id') ~ '^[0-9]+$'
    then coalesce(auth.jwt() -> 'user_metadata' ->> 'telegram_id', auth.jwt() -> 'app_metadata' ->> 'telegram_id')::bigint
    else null
  end
$$;

create or replace function public.current_profile_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select p.id
  from public.profiles p
  where p.auth_user_id = auth.uid()
     or p.user_id = auth.uid()
     or (p.telegram_id is not null and p.telegram_id = public.current_telegram_id())
  order by p.onboarding_completed desc, p.updated_at desc
  limit 1
$$;

create or replace function public.profile_belongs_to_current_user(target_profile_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = target_profile_id
      and (
        p.auth_user_id = auth.uid()
        or p.user_id = auth.uid()
        or (p.telegram_id is not null and p.telegram_id = public.current_telegram_id())
      )
  )
$$;

create or replace function public.upsert_current_telegram_profile(profile_payload jsonb)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  tg bigint := coalesce(public.current_telegram_id(), nullif(profile_payload ->> 'telegram_id', '')::bigint);
  uid uuid := auth.uid();
  target_id uuid;
  saved public.profiles;
begin
  if uid is null then
    raise exception 'auth.uid is required';
  end if;

  select p.id
  into target_id
  from public.profiles p
  where p.auth_user_id = uid
     or p.user_id = uid
     or (tg is not null and p.telegram_id = tg)
  order by
    case when p.auth_user_id = uid or p.user_id = uid then 0 else 1 end,
    p.onboarding_completed desc,
    p.updated_at desc
  limit 1;

  if target_id is null then
    insert into public.profiles (
      id, user_id, auth_user_id, telegram_id, username, full_name,
      telegram_username, display_name, driver_name, avatar_url,
      car_ownership, car_type, car_brand, car_model, car_year,
      fuel_type, fuel_consumption, fuel_price, odometer, car_number,
      default_platform, rent_amount, rent_frequency, rent_period,
      rent_payment_day, platforms, phone, city, weekly_goal, onboarding_completed
    )
    values (
      gen_random_uuid(), uid, uid, tg,
      coalesce(profile_payload ->> 'username', profile_payload ->> 'telegram_username', ''),
      coalesce(profile_payload ->> 'full_name', profile_payload ->> 'driver_name', profile_payload ->> 'display_name', ''),
      coalesce(profile_payload ->> 'telegram_username', ''),
      coalesce(profile_payload ->> 'display_name', ''),
      coalesce(profile_payload ->> 'driver_name', ''),
      coalesce(profile_payload ->> 'avatar_url', ''),
      coalesce(profile_payload ->> 'car_ownership', profile_payload ->> 'car_type', ''),
      coalesce(profile_payload ->> 'car_type', profile_payload ->> 'car_ownership', ''),
      coalesce(profile_payload ->> 'car_brand', ''),
      coalesce(profile_payload ->> 'car_model', ''),
      nullif(profile_payload ->> 'car_year', '')::integer,
      coalesce(profile_payload ->> 'fuel_type', ''),
      nullif(profile_payload ->> 'fuel_consumption', '')::numeric,
      nullif(profile_payload ->> 'fuel_price', '')::numeric,
      nullif(profile_payload ->> 'odometer', '')::numeric,
      coalesce(profile_payload ->> 'car_number', ''),
      coalesce(profile_payload ->> 'default_platform', 'Bolt'),
      nullif(profile_payload ->> 'rent_amount', '')::numeric,
      coalesce(profile_payload ->> 'rent_frequency', profile_payload ->> 'rent_period', ''),
      coalesce(profile_payload ->> 'rent_period', profile_payload ->> 'rent_frequency', ''),
      coalesce(profile_payload ->> 'rent_payment_day', ''),
      coalesce(profile_payload -> 'platforms', '[]'::jsonb),
      coalesce(profile_payload ->> 'phone', ''),
      coalesce(profile_payload ->> 'city', ''),
      coalesce(nullif(profile_payload ->> 'weekly_goal', '')::numeric, 10000),
      coalesce((profile_payload ->> 'onboarding_completed')::boolean, false)
    )
    returning * into saved;
  else
    update public.profiles
    set
      auth_user_id = uid,
      telegram_id = coalesce(tg, telegram_id),
      username = coalesce(profile_payload ->> 'username', profile_payload ->> 'telegram_username', username),
      full_name = coalesce(profile_payload ->> 'full_name', profile_payload ->> 'driver_name', profile_payload ->> 'display_name', full_name),
      telegram_username = coalesce(profile_payload ->> 'telegram_username', telegram_username),
      display_name = coalesce(profile_payload ->> 'display_name', display_name),
      driver_name = coalesce(profile_payload ->> 'driver_name', driver_name),
      avatar_url = coalesce(profile_payload ->> 'avatar_url', avatar_url),
      car_ownership = coalesce(profile_payload ->> 'car_ownership', profile_payload ->> 'car_type', car_ownership),
      car_type = coalesce(profile_payload ->> 'car_type', profile_payload ->> 'car_ownership', car_type),
      car_brand = coalesce(profile_payload ->> 'car_brand', car_brand),
      car_model = coalesce(profile_payload ->> 'car_model', car_model),
      car_year = nullif(profile_payload ->> 'car_year', '')::integer,
      fuel_type = coalesce(profile_payload ->> 'fuel_type', fuel_type),
      fuel_consumption = nullif(profile_payload ->> 'fuel_consumption', '')::numeric,
      fuel_price = nullif(profile_payload ->> 'fuel_price', '')::numeric,
      odometer = nullif(profile_payload ->> 'odometer', '')::numeric,
      car_number = coalesce(profile_payload ->> 'car_number', car_number),
      default_platform = coalesce(profile_payload ->> 'default_platform', default_platform),
      rent_amount = nullif(profile_payload ->> 'rent_amount', '')::numeric,
      rent_frequency = coalesce(profile_payload ->> 'rent_frequency', profile_payload ->> 'rent_period', rent_frequency),
      rent_period = coalesce(profile_payload ->> 'rent_period', profile_payload ->> 'rent_frequency', rent_period),
      rent_payment_day = coalesce(profile_payload ->> 'rent_payment_day', rent_payment_day),
      platforms = coalesce(profile_payload -> 'platforms', platforms),
      phone = coalesce(profile_payload ->> 'phone', phone),
      city = coalesce(profile_payload ->> 'city', city),
      weekly_goal = coalesce(nullif(profile_payload ->> 'weekly_goal', '')::numeric, weekly_goal),
      onboarding_completed = coalesce((profile_payload ->> 'onboarding_completed')::boolean, onboarding_completed)
    where id = target_id
    returning * into saved;
  end if;

  return saved;
end;
$$;

create or replace function public.clear_current_telegram_activity()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  profile_id uuid := public.current_profile_id();
begin
  if profile_id is null then
    raise exception 'profile is required';
  end if;

  delete from public.expenses where user_id = profile_id;
  delete from public.shifts where user_id = profile_id;
end;
$$;

create or replace function public.delete_current_telegram_profile_data()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  profile_id uuid := public.current_profile_id();
begin
  if profile_id is null then
    raise exception 'profile is required';
  end if;

  delete from public.settings where user_id = profile_id;
  delete from public.expenses where user_id = profile_id;
  delete from public.shifts where user_id = profile_id;
  delete from public.driver_platforms where user_id = profile_id;
  delete from public.driver_settings where user_id = profile_id;
  delete from public.profiles where id = profile_id;
end;
$$;

drop trigger if exists set_driver_settings_updated_at on public.driver_settings;
create trigger set_driver_settings_updated_at
before update on public.driver_settings
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.drivers enable row level security;
alter table public.driver_settings enable row level security;
alter table public.driver_platforms enable row level security;
alter table public.shifts enable row level security;
alter table public.expenses enable row level security;
alter table public.settings enable row level security;

drop policy if exists "Telegram read driver profile" on public.drivers;
drop policy if exists "Telegram insert driver profile" on public.drivers;
drop policy if exists "Telegram update driver profile" on public.drivers;
drop policy if exists "Telegram delete driver profile" on public.drivers;
drop policy if exists "Telegram app read shifts" on public.shifts;
drop policy if exists "Telegram app insert shifts" on public.shifts;
drop policy if exists "Telegram app update shifts" on public.shifts;
drop policy if exists "Telegram app delete shifts" on public.shifts;
drop policy if exists "Telegram app read expenses" on public.expenses;
drop policy if exists "Telegram app insert expenses" on public.expenses;
drop policy if exists "Telegram app update expenses" on public.expenses;
drop policy if exists "Telegram app delete expenses" on public.expenses;
drop policy if exists "Telegram app read settings" on public.settings;
drop policy if exists "Telegram app insert settings" on public.settings;
drop policy if exists "Telegram app update settings" on public.settings;
drop policy if exists "Telegram app delete settings" on public.settings;

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
on public.profiles for select
to authenticated
using (public.profile_belongs_to_current_user(id));

drop policy if exists "Users insert own profile" on public.profiles;
create policy "Users insert own profile"
on public.profiles for insert
to authenticated
with check (
  auth_user_id = auth.uid()
  or user_id = auth.uid()
  or telegram_id = public.current_telegram_id()
);

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
on public.profiles for update
to authenticated
using (public.profile_belongs_to_current_user(id))
with check (public.profile_belongs_to_current_user(id));

drop policy if exists "Users delete own profile" on public.profiles;
create policy "Users delete own profile"
on public.profiles for delete
to authenticated
using (public.profile_belongs_to_current_user(id));

drop policy if exists "Users read own driver settings" on public.driver_settings;
create policy "Users read own driver settings"
on public.driver_settings for select
to authenticated
using (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users write own driver settings" on public.driver_settings;
create policy "Users write own driver settings"
on public.driver_settings for all
to authenticated
using (public.profile_belongs_to_current_user(user_id))
with check (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users read own driver platforms" on public.driver_platforms;
create policy "Users read own driver platforms"
on public.driver_platforms for select
to authenticated
using (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users write own driver platforms" on public.driver_platforms;
create policy "Users write own driver platforms"
on public.driver_platforms for all
to authenticated
using (public.profile_belongs_to_current_user(user_id))
with check (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users read own shifts" on public.shifts;
create policy "Users read own shifts"
on public.shifts for select
to authenticated
using (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users insert own shifts" on public.shifts;
create policy "Users insert own shifts"
on public.shifts for insert
to authenticated
with check (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users update own shifts" on public.shifts;
create policy "Users update own shifts"
on public.shifts for update
to authenticated
using (public.profile_belongs_to_current_user(user_id))
with check (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users delete own shifts" on public.shifts;
create policy "Users delete own shifts"
on public.shifts for delete
to authenticated
using (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users read own expenses" on public.expenses;
create policy "Users read own expenses"
on public.expenses for select
to authenticated
using (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users insert own expenses" on public.expenses;
create policy "Users insert own expenses"
on public.expenses for insert
to authenticated
with check (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users update own expenses" on public.expenses;
create policy "Users update own expenses"
on public.expenses for update
to authenticated
using (public.profile_belongs_to_current_user(user_id))
with check (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users delete own expenses" on public.expenses;
create policy "Users delete own expenses"
on public.expenses for delete
to authenticated
using (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users read own settings" on public.settings;
create policy "Users read own settings"
on public.settings for select
to authenticated
using (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users insert own settings" on public.settings;
create policy "Users insert own settings"
on public.settings for insert
to authenticated
with check (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users update own settings" on public.settings;
create policy "Users update own settings"
on public.settings for update
to authenticated
using (public.profile_belongs_to_current_user(user_id))
with check (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users delete own settings" on public.settings;
create policy "Users delete own settings"
on public.settings for delete
to authenticated
using (public.profile_belongs_to_current_user(user_id));

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.driver_settings to authenticated;
grant select, insert, update, delete on public.driver_platforms to authenticated;
grant select, insert, update, delete on public.shifts to authenticated;
grant select, insert, update, delete on public.expenses to authenticated;
grant select, insert, update, delete on public.settings to authenticated;
grant execute on function public.upsert_current_telegram_profile(jsonb) to authenticated;
grant execute on function public.clear_current_telegram_activity() to authenticated;
grant execute on function public.delete_current_telegram_profile_data() to authenticated;
