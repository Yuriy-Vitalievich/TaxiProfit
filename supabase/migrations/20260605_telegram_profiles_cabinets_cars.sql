create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

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

alter table public.profiles add column if not exists id uuid default gen_random_uuid();
alter table public.profiles add column if not exists auth_user_id uuid references auth.users(id) on delete cascade;
alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists first_name text;
alter table public.profiles add column if not exists last_name text;
alter table public.profiles add column if not exists full_name text;
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists car_type text;
alter table public.profiles add column if not exists fuel_price numeric;
alter table public.profiles add column if not exists rent_period text;
alter table public.profiles add column if not exists onboarding_completed boolean not null default false;
alter table public.profiles add column if not exists created_at timestamptz not null default now();
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

update public.profiles
set
  id = coalesce(id, gen_random_uuid()),
  auth_user_id = coalesce(auth_user_id, user_id),
  username = coalesce(username, telegram_username),
  full_name = coalesce(full_name, driver_name, display_name),
  car_type = coalesce(car_type, car_ownership),
  rent_period = coalesce(rent_period, rent_frequency),
  avatar_url = coalesce(avatar_url, '')
where id is null
   or auth_user_id is null
   or username is null
   or full_name is null
   or car_type is null
   or rent_period is null
   or avatar_url is null;

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

create table if not exists public.driver_cabinets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  display_name text,
  avatar_url text,
  weekly_goal numeric not null default 10000,
  default_platform text not null default 'Bolt',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  ownership_type text,
  brand text,
  model text,
  year integer,
  odometer numeric,
  fuel_type text,
  fuel_consumption numeric,
  fuel_price numeric,
  rent_amount numeric,
  rent_period text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

with ranked_active_cars as (
  select
    id,
    row_number() over (
      partition by user_id
      order by updated_at desc, created_at desc, id
    ) as row_number
  from public.cars
  where is_active
)
update public.cars c
set is_active = false
from ranked_active_cars r
where c.id = r.id
  and r.row_number > 1;

create unique index if not exists cars_one_active_per_user
on public.cars(user_id)
where is_active;

insert into public.driver_cabinets (
  user_id,
  display_name,
  avatar_url,
  weekly_goal,
  default_platform
)
select
  p.id,
  coalesce(p.driver_name, p.display_name, p.full_name, ''),
  coalesce(p.avatar_url, ''),
  coalesce(p.weekly_goal, 10000),
  coalesce(p.default_platform, 'Bolt')
from public.profiles p
where p.id is not null
on conflict (user_id) do update
set
  display_name = excluded.display_name,
  avatar_url = excluded.avatar_url,
  weekly_goal = excluded.weekly_goal,
  default_platform = excluded.default_platform;

insert into public.cars (
  user_id,
  ownership_type,
  brand,
  model,
  year,
  odometer,
  fuel_type,
  fuel_consumption,
  fuel_price,
  rent_amount,
  rent_period,
  is_active
)
select
  p.id,
  coalesce(p.car_ownership, p.car_type, ''),
  coalesce(p.car_brand, ''),
  coalesce(p.car_model, ''),
  p.car_year,
  p.odometer,
  coalesce(p.fuel_type, ''),
  p.fuel_consumption,
  p.fuel_price,
  p.rent_amount,
  coalesce(p.rent_frequency, p.rent_period, ''),
  true
from public.profiles p
where p.id is not null
  and not exists (
    select 1
    from public.cars c
    where c.user_id = p.id
      and c.is_active
  );

alter table public.shifts add column if not exists car_id uuid references public.cars(id) on delete set null;
alter table public.shifts add column if not exists comment text;
alter table public.expenses add column if not exists car_id uuid references public.cars(id) on delete set null;

create index if not exists driver_cabinets_user_id_idx on public.driver_cabinets(user_id);
create index if not exists cars_user_id_idx on public.cars(user_id);
create index if not exists shifts_car_id_idx on public.shifts(car_id);
create index if not exists expenses_car_id_idx on public.expenses(car_id);

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

drop trigger if exists set_driver_cabinets_updated_at on public.driver_cabinets;
create trigger set_driver_cabinets_updated_at
before update on public.driver_cabinets
for each row
execute function public.set_updated_at();

drop trigger if exists set_cars_updated_at on public.cars;
create trigger set_cars_updated_at
before update on public.cars
for each row
execute function public.set_updated_at();

create or replace function public.get_or_create_telegram_profile(profile_payload jsonb)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  tg bigint := coalesce(public.current_telegram_id(), nullif(profile_payload ->> 'telegram_id', '')::bigint);
  target_id uuid;
  saved public.profiles;
begin
  if uid is null then
    raise exception 'auth.uid is required';
  end if;

  if tg is null then
    raise exception 'telegram_id is required';
  end if;

  select p.id
  into target_id
  from public.profiles p
  where p.telegram_id = tg
     or p.auth_user_id = uid
     or p.user_id = uid
  order by
    case when p.telegram_id = tg then 0 else 1 end,
    p.onboarding_completed desc,
    p.updated_at desc,
    p.created_at desc
  limit 1;

  if target_id is null then
    insert into public.profiles (
      id,
      user_id,
      auth_user_id,
      telegram_id,
      username,
      first_name,
      last_name,
      full_name,
      telegram_username,
      display_name,
      driver_name,
      avatar_url,
      onboarding_completed
    )
    values (
      gen_random_uuid(),
      uid,
      uid,
      tg,
      coalesce(profile_payload ->> 'username', profile_payload ->> 'telegram_username', ''),
      coalesce(profile_payload ->> 'first_name', ''),
      coalesce(profile_payload ->> 'last_name', ''),
      coalesce(profile_payload ->> 'full_name', profile_payload ->> 'display_name', ''),
      coalesce(profile_payload ->> 'telegram_username', profile_payload ->> 'username', ''),
      coalesce(profile_payload ->> 'display_name', profile_payload ->> 'full_name', ''),
      coalesce(profile_payload ->> 'driver_name', profile_payload ->> 'display_name', profile_payload ->> 'full_name', ''),
      coalesce(profile_payload ->> 'avatar_url', ''),
      false
    )
    returning * into saved;
  else
    update public.profiles
    set auth_user_id = null
    where auth_user_id = uid
      and id <> target_id;

    update public.profiles
    set
      auth_user_id = uid,
      telegram_id = tg,
      username = coalesce(nullif(profile_payload ->> 'username', ''), nullif(profile_payload ->> 'telegram_username', ''), username),
      first_name = coalesce(nullif(profile_payload ->> 'first_name', ''), first_name),
      last_name = coalesce(nullif(profile_payload ->> 'last_name', ''), last_name),
      full_name = coalesce(nullif(profile_payload ->> 'full_name', ''), nullif(profile_payload ->> 'display_name', ''), full_name),
      telegram_username = coalesce(nullif(profile_payload ->> 'telegram_username', ''), nullif(profile_payload ->> 'username', ''), telegram_username),
      display_name = coalesce(nullif(profile_payload ->> 'display_name', ''), nullif(profile_payload ->> 'full_name', ''), display_name),
      driver_name = coalesce(nullif(profile_payload ->> 'driver_name', ''), driver_name),
      avatar_url = coalesce(nullif(profile_payload ->> 'avatar_url', ''), avatar_url)
    where id = target_id
    returning * into saved;
  end if;

  insert into public.driver_cabinets (user_id, display_name, avatar_url, weekly_goal, default_platform)
  values (
    saved.id,
    coalesce(saved.driver_name, saved.display_name, saved.full_name, ''),
    coalesce(saved.avatar_url, ''),
    coalesce(saved.weekly_goal, 10000),
    coalesce(saved.default_platform, 'Bolt')
  )
  on conflict (user_id) do nothing;

  return saved;
end;
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
  where p.telegram_id = tg
     or p.auth_user_id = uid
     or p.user_id = uid
  order by
    case when p.telegram_id = tg then 0 else 1 end,
    p.onboarding_completed desc,
    p.updated_at desc
  limit 1;

  if target_id is null then
    saved := public.get_or_create_telegram_profile(profile_payload);
    target_id := saved.id;
  end if;

  update public.profiles
  set auth_user_id = null
  where auth_user_id = uid
    and id <> target_id;

  update public.profiles
  set
    auth_user_id = uid,
    telegram_id = coalesce(tg, telegram_id),
    username = coalesce(nullif(profile_payload ->> 'username', ''), nullif(profile_payload ->> 'telegram_username', ''), username),
    first_name = coalesce(nullif(profile_payload ->> 'first_name', ''), first_name),
    last_name = coalesce(nullif(profile_payload ->> 'last_name', ''), last_name),
    full_name = coalesce(nullif(profile_payload ->> 'full_name', ''), nullif(profile_payload ->> 'display_name', ''), full_name),
    telegram_username = coalesce(nullif(profile_payload ->> 'telegram_username', ''), nullif(profile_payload ->> 'username', ''), telegram_username),
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

  insert into public.driver_cabinets (user_id, display_name, avatar_url, weekly_goal, default_platform)
  values (
    saved.id,
    coalesce(saved.driver_name, saved.display_name, saved.full_name, ''),
    coalesce(saved.avatar_url, ''),
    coalesce(saved.weekly_goal, 10000),
    coalesce(saved.default_platform, 'Bolt')
  )
  on conflict (user_id) do update
  set
    display_name = excluded.display_name,
    avatar_url = excluded.avatar_url,
    weekly_goal = excluded.weekly_goal,
    default_platform = excluded.default_platform;

  return saved;
end;
$$;

alter table public.driver_cabinets enable row level security;
alter table public.cars enable row level security;

drop policy if exists "Users read own driver cabinet" on public.driver_cabinets;
create policy "Users read own driver cabinet"
on public.driver_cabinets for select
to authenticated
using (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users write own driver cabinet" on public.driver_cabinets;
create policy "Users write own driver cabinet"
on public.driver_cabinets for all
to authenticated
using (public.profile_belongs_to_current_user(user_id))
with check (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users read own cars" on public.cars;
create policy "Users read own cars"
on public.cars for select
to authenticated
using (public.profile_belongs_to_current_user(user_id));

drop policy if exists "Users write own cars" on public.cars;
create policy "Users write own cars"
on public.cars for all
to authenticated
using (public.profile_belongs_to_current_user(user_id))
with check (public.profile_belongs_to_current_user(user_id));

grant select, insert, update, delete on public.driver_cabinets to authenticated;
grant select, insert, update, delete on public.cars to authenticated;
grant execute on function public.get_or_create_telegram_profile(jsonb) to authenticated;
grant execute on function public.upsert_current_telegram_profile(jsonb) to authenticated;
