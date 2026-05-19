# Supabase setup

1. Open Supabase project `aqogfuzhjqbsanaovcox`.
2. Go to `SQL Editor`.
3. Open `supabase-schema.sql` from this repository.
4. Paste the full SQL into Supabase and run it.
5. Reload TaxiProfit.
6. Open TaxiProfit on two devices or two browser windows. Add/edit a shift in one window; the other window should refresh automatically within a second.

The app uses:

- `shifts` table for driver shifts.
- `expenses` table for expenses.
- `payload` JSON column to keep the current app data shape flexible.
- Realtime is enabled for both tables through the `supabase_realtime` publication, so open devices receive changes without manual reload.

Important: the current policies allow anonymous public read/write because the app has no login yet. This is fine for a quick personal MVP while the repository is public only if you understand that anyone with the site URL can technically write to the database. The safer next step is adding authentication or a server-side sync layer before using sensitive production data.
