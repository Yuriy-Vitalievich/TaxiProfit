const SPREADSHEET_ID = "1RkWsPeDQBsumioh1Da1dbd4f1z5ziGQSjTRGMaKGCds";
const SHIFT_SHEET_NAME = "Смены";
const EXPENSE_SHEET_NAME = "Расходы";

function doPost(event) {
  const body = JSON.parse(event.postData.contents || "{}");
  const type = body.type;
  const payload = body.payload || {};

  if (type === "shift") {
    appendShift(payload);
  }

  if (type === "expense") {
    appendExpense(payload);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}

function appendShift(shift) {
  const sheet = getSheet(SHIFT_SHEET_NAME);
  sheet.appendRow([
    toSheetDate(shift.date),
    weekday(shift.date),
    shift.start || "",
    shift.end || "",
    shift.hours || 0,
    shift.ordersBolt || 0,
    shift.ordersUklon || 0,
    shift.ordersCash || 0,
    shift.grossBolt || 0,
    shift.grossUklon || 0,
    shift.grossCash || 0,
    shift.gross || 0,
    shift.rent || 0,
    shift.fuel || 0,
    shift.other || 0,
    shift.fees || 0,
    shift.netValue || "",
    shift.km || 0,
    shift.comment || "",
  ]);
}

function appendExpense(expense) {
  const sheet = getSheet(EXPENSE_SHEET_NAME);
  sheet.appendRow([
    toSheetDate(expense.date),
    expense.category || "",
    expense.description || "",
    expense.amount || 0,
    expense.payment || "",
    expense.comment || "",
  ]);
}

function getSheet(name) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(name);
  if (!sheet) throw new Error(`Sheet not found: ${name}`);
  return sheet;
}

function toSheetDate(value) {
  if (!value) return "";
  const parts = String(value).split("-");
  if (parts.length !== 3) return value;
  return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

function weekday(value) {
  if (!value) return "";
  const labels = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
  return labels[new Date(`${value}T12:00:00`).getDay()];
}
