create or replace view public.owner_driver_overview
with (security_invoker = true)
as
select
  p.id as user_id,
  p.telegram_id,
  p.username,
  p.first_name,
  p.last_name,
  p.full_name,
  p.avatar_url as telegram_avatar_url,
  p.onboarding_completed,
  dc.display_name as cabinet_display_name,
  dc.avatar_url as cabinet_avatar_url,
  dc.weekly_goal,
  dc.default_platform,
  c.id as active_car_id,
  c.ownership_type,
  c.brand as car_brand,
  c.model as car_model,
  c.year as car_year,
  c.odometer,
  c.fuel_type,
  c.fuel_consumption,
  c.fuel_price,
  c.rent_amount,
  c.rent_period,
  coalesce(shift_stats.shifts_count, 0) as shifts_count,
  coalesce(shift_stats.gross_income_total, 0) as gross_income_total,
  coalesce(shift_stats.net_income_total, 0) as net_income_total,
  coalesce(expense_stats.expenses_count, 0) as expenses_count,
  coalesce(expense_stats.expenses_total, 0) as expenses_total,
  p.created_at,
  p.updated_at
from public.profiles p
left join public.driver_cabinets dc on dc.user_id = p.id
left join public.cars c on c.user_id = p.id and c.is_active
left join (
  select
    user_id,
    count(*) as shifts_count,
    sum(coalesce(gross_income, 0)) as gross_income_total,
    sum(coalesce(net_income, 0)) as net_income_total
  from public.shifts
  group by user_id
) shift_stats on shift_stats.user_id = p.id
left join (
  select
    user_id,
    count(*) as expenses_count,
    sum(coalesce(amount, 0)) as expenses_total
  from public.expenses
  group by user_id
) expense_stats on expense_stats.user_id = p.id;

create or replace view public.owner_driver_cars
with (security_invoker = true)
as
select
  p.id as user_id,
  p.telegram_id,
  coalesce(dc.display_name, p.full_name, p.display_name, p.driver_name) as driver_name,
  c.id as car_id,
  c.ownership_type,
  c.brand,
  c.model,
  c.year,
  c.odometer,
  c.fuel_type,
  c.fuel_consumption,
  c.fuel_price,
  c.rent_amount,
  c.rent_period,
  c.is_active,
  c.created_at,
  c.updated_at
from public.profiles p
left join public.driver_cabinets dc on dc.user_id = p.id
join public.cars c on c.user_id = p.id;

create or replace view public.owner_driver_shifts
with (security_invoker = true)
as
select
  p.id as user_id,
  p.telegram_id,
  coalesce(dc.display_name, p.full_name, p.display_name, p.driver_name) as driver_name,
  s.id as shift_id,
  s.car_id,
  c.brand as car_brand,
  c.model as car_model,
  s.platform,
  s.start_time,
  s.end_time,
  s.start_odometer,
  s.end_odometer,
  s.total_km,
  s.orders_count,
  s.gross_income,
  s.net_income,
  s.comment,
  s.created_at,
  s.updated_at
from public.profiles p
left join public.driver_cabinets dc on dc.user_id = p.id
join public.shifts s on s.user_id = p.id
left join public.cars c on c.id = s.car_id;

create or replace view public.owner_driver_expenses
with (security_invoker = true)
as
select
  p.id as user_id,
  p.telegram_id,
  coalesce(dc.display_name, p.full_name, p.display_name, p.driver_name) as driver_name,
  e.id as expense_id,
  e.shift_id,
  e.car_id,
  c.brand as car_brand,
  c.model as car_model,
  e.expense_type,
  e.amount,
  e.comment,
  e.created_at
from public.profiles p
left join public.driver_cabinets dc on dc.user_id = p.id
join public.expenses e on e.user_id = p.id
left join public.cars c on c.id = e.car_id;

grant select on public.owner_driver_overview to authenticated;
grant select on public.owner_driver_cars to authenticated;
grant select on public.owner_driver_shifts to authenticated;
grant select on public.owner_driver_expenses to authenticated;
