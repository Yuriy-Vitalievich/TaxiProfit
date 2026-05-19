# Google Sheets sync setup

The spreadsheet is private, so TaxiProfit cannot read or write it directly from the browser. Use a small Google Apps Script web app as the bridge.

Spreadsheet:

`https://docs.google.com/spreadsheets/d/1RkWsPeDQBsumioh1Da1dbd4f1z5ziGQSjTRGMaKGCds/edit`

## Setup

1. Open the Google Sheet.
2. Go to `Extensions` -> `Apps Script`.
3. Paste the contents of `google-apps-script.gs`.
4. Confirm sheet names in the script:
   - `SHIFT_SHEET_NAME = "Смены"`
   - `EXPENSE_SHEET_NAME = "Расходы"`
5. Click `Deploy` -> `New deployment`.
6. Select type `Web app`.
7. Execute as: `Me`.
8. Who has access: `Anyone with the link`.
9. Copy the web app URL.
10. Paste it into `GOOGLE_SHEETS_WEB_APP_URL` in `app.js`.

After that, every newly added shift or expense in TaxiProfit is appended to the Google Sheet automatically.

Current scope:

- Add shift -> append row to the shifts sheet.
- Add expense -> append row to the expenses sheet.
- Existing edits/deletes stay in TaxiProfit/Supabase for now. Updating existing Google Sheet rows needs a stable row id column, which we can add next.
