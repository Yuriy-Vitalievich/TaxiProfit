# Supabase Setup

TaxiProfit uses Supabase for authentication, personal cloud storage, and realtime sync.

## 1. Run The SQL Schema

1. Open Supabase project `aqogfuzhjqbsanaovcox`.
2. Go to `SQL Editor`.
3. Open `supabase-schema.sql` from this repository.
4. Paste the full SQL into Supabase and run it.
5. Wait for `Success. No rows returned`.

The schema creates:

- `profiles` - driver account/profile data.
- `shifts` - driver shifts.
- `expenses` - expenses.
- `settings` - personal dashboard settings.

Each data row has `user_id`, and RLS policies allow users to read/write only their own data through `auth.uid()`.

## 2. Enable Supabase Auth

In Supabase Dashboard:

1. Go to `Authentication` -> `Providers`.
2. Enable `Email`.
3. Enable magic links / OTP email login.
4. Go to `Authentication` -> `Sign In / Providers`.
5. Enable `Anonymous sign-ins`.

Anonymous sign-in is important for Telegram Mini App MVP: the driver can start using the app immediately, and later attach an email login.

## 3. Telegram User ID

When TaxiProfit runs inside Telegram, the app reads:

- Telegram `user.id`;
- username;
- first/last name;
- avatar URL when Telegram provides it.

This data is saved into `profiles`:

- `telegram_id`;
- `telegram_username`;
- `display_name`;
- `avatar_url`.

The current secure data owner is still Supabase `user_id`. Telegram ID is stored now for future multi-user logic, matching, support, and account migration.

## 4. Realtime Sync

Realtime is enabled for:

- `profiles`;
- `shifts`;
- `expenses`;
- `settings`.

Open TaxiProfit on two devices with the same Supabase session/user. Add or edit a shift in one window; the other window should refresh automatically.

## 5. Important Migration Note

Old public rows created before Auth do not have `user_id`.

After running the new schema, new rows are private and tied to the current Supabase user. If old personal data must be kept, either:

- import it again through CSV after login;
- or assign old rows manually in Supabase by setting `user_id` to the correct user UUID.

## 6. Local Fallback

If Auth is not enabled yet, TaxiProfit keeps working locally through `localStorage`, but cloud sync will show a warning and will not be fully personal until Auth is active.
