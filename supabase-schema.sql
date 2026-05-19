create extension if not exists pgcrypto;

create table if not exists public.shifts (
  id uuid primary key default gen_random_uuid(),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.shifts replica identity full;
alter table public.expenses replica identity full;

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

alter table public.shifts enable row level security;
alter table public.expenses enable row level security;

drop policy if exists "Public read shifts" on public.shifts;
create policy "Public read shifts"
on public.shifts for select
to anon
using (true);

drop policy if exists "Public insert shifts" on public.shifts;
create policy "Public insert shifts"
on public.shifts for insert
to anon
with check (true);

drop policy if exists "Public update shifts" on public.shifts;
create policy "Public update shifts"
on public.shifts for update
to anon
using (true)
with check (true);

drop policy if exists "Public delete shifts" on public.shifts;
create policy "Public delete shifts"
on public.shifts for delete
to anon
using (true);

drop policy if exists "Public read expenses" on public.expenses;
create policy "Public read expenses"
on public.expenses for select
to anon
using (true);

drop policy if exists "Public insert expenses" on public.expenses;
create policy "Public insert expenses"
on public.expenses for insert
to anon
with check (true);

drop policy if exists "Public update expenses" on public.expenses;
create policy "Public update expenses"
on public.expenses for update
to anon
using (true)
with check (true);

drop policy if exists "Public delete expenses" on public.expenses;
create policy "Public delete expenses"
on public.expenses for delete
to anon
using (true);

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
  end if;
end
$$;
