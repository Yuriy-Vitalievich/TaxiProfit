# Supabase setup

1. Open Supabase project `aqogfuzhjqbsanaovcox`.
2. Go to `SQL Editor`.
3. Open `supabase-schema.sql` from this repository.
4. Paste the full SQL into Supabase and run it.
5. Reload TaxiProfit.

The app uses:

- `shifts` table for driver shifts.
- `expenses` table for expenses.
- `payload` JSON column to keep the current app data shape flexible.

Important: the current policies allow anonymous public read/write because the app has no login yet. This is fine for a quick personal MVP while the repository is public only if you understand that anyone with the site URL can technically write to the database. The safer next step is adding authentication or a server-side sync layer before using sensitive production data.
