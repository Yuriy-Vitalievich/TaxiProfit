const STORAGE_KEY = "taxiProfit.shifts.v3";
const EXPENSE_STORAGE_KEY = "taxiProfit.expenses.v1";
const CSV_SYNC_STORAGE_KEY = "taxiProfit.csvSync.v1";
const GOAL_STORAGE_KEY = "taxiProfit.monthGoal.v1";
const ACTIVE_SHIFT_STORAGE_KEY = "taxiProfit.activeShift.v1";
const DEFAULT_MONTH_GOAL = 70000;
const SUPABASE_URL = "https://aqogfuzhjqbsanaovcox.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_HHwwAnF8AfI0IW1CdlROtg_sOjD-Wl_";
const SUPABASE_REST_URL = `${SUPABASE_URL}/rest/v1`;
const GOOGLE_SHEETS_WEB_APP_URL = "";
const REALTIME_REFRESH_DELAY = 500;
const telegramApp = window.Telegram?.WebApp || null;

const seedShifts = [
  { date: "2026-05-01", weekday: "пт", start: "17:00", end: "22:15", hours: 5, ordersBolt: 0, ordersUklon: 9, ordersCash: 0, grossBolt: 0, grossUklon: 1688.62, grossCash: 0, gross: 1688.62, rent: 0, fuel: 0, other: 0, netValue: 1688.62, km: 57.4, comment: "7 050,10" },
  { date: "2026-05-02", weekday: "сб", start: "12:30", end: "23:30", hours: 11, ordersBolt: 0, ordersUklon: 24, ordersCash: 0, grossBolt: 0, grossUklon: 3605.8, grossCash: 0, gross: 3605.8, rent: 0, fuel: 0, other: 0, netValue: 3605.8, km: 113.5, comment: "" },
  { date: "2026-05-03", weekday: "вс", start: "18:00", end: "22:00", hours: 4, ordersBolt: 0, ordersUklon: 12, ordersCash: 0, grossBolt: 0, grossUklon: 1755.68, grossCash: 0, gross: 1755.68, rent: 0, fuel: 0, other: 0, netValue: 1755.68, km: 64.2, comment: "" },
  { date: "2026-05-04", weekday: "пн", start: "9:00", end: "14:30", hours: 6, ordersBolt: 0, ordersUklon: 16, ordersCash: 0, grossBolt: 0, grossUklon: 2142.56, grossCash: 0, gross: 2142.56, rent: 0, fuel: 0, other: 0, netValue: 2142.56, km: 74.1, comment: "" },
  { date: "2026-05-04", weekday: "пн", start: "17:00", end: "22:30", hours: 6, ordersBolt: 0, ordersUklon: 11, ordersCash: 0, grossBolt: 0, grossUklon: 1686.74, grossCash: 0, gross: 1686.74, rent: 0, fuel: 0, other: 0, netValue: 1686.74, km: 71.6, comment: "" },
  { date: "2026-05-05", weekday: "вт", start: "9:00", end: "14:15", hours: 5, ordersBolt: 0, ordersUklon: 12, ordersCash: 0, grossBolt: 0, grossUklon: 1769.34, grossCash: 0, gross: 1769.34, rent: 0, fuel: 0, other: 0, netValue: 1769.34, km: 65.9, comment: "" },
  { date: "2026-05-06", weekday: "ср", start: "9:15", end: "10:30", hours: 1, ordersBolt: 0, ordersUklon: 5, ordersCash: 0, grossBolt: 0, grossUklon: 623.18, grossCash: 0, gross: 623.18, rent: 0, fuel: 0, other: 0, netValue: 623.18, km: 20.1, comment: "" },
  { date: "2026-05-06", weekday: "ср", start: "19:30", end: "23:45", hours: 4, ordersBolt: 0, ordersUklon: 14, ordersCash: 0, grossBolt: 0, grossUklon: 1864.68, grossCash: 0, gross: 1864.68, rent: 0, fuel: 0, other: 0, netValue: 1864.68, km: 65.7, comment: "" },
  { date: "2026-05-07", weekday: "чт", start: "9:30", end: "15:45", hours: 6, ordersBolt: 0, ordersUklon: 14, ordersCash: 0, grossBolt: 0, grossUklon: 2160, grossCash: 0, gross: 2160, rent: 0, fuel: 0, other: 0, netValue: 2160, km: 89.5, comment: "" },
  { date: "2026-05-07", weekday: "чт", start: "20:00", end: "23:00", hours: 3, ordersBolt: 0, ordersUklon: 6, ordersCash: 0, grossBolt: 0, grossUklon: 956.68, grossCash: 0, gross: 956.68, rent: 0, fuel: 0, other: 0, netValue: 956.68, km: 38.2, comment: "" },
  { date: "2026-05-08", weekday: "пт", start: "", end: "", hours: 0, ordersBolt: 0, ordersUklon: 0, ordersCash: 0, grossBolt: 0, grossUklon: 0, grossCash: 0, gross: 0, rent: 0, fuel: 0, other: 0, netValue: 0, km: 0, comment: "" },
  { date: "2026-05-09", weekday: "сб", start: "12:00", end: "23:00", hours: 11, ordersBolt: 0, ordersUklon: 25, ordersCash: 0, grossBolt: 0, grossUklon: 5800, grossCash: 0, gross: 5800, rent: 0, fuel: 0, other: 0, netValue: 5800, km: 197.5, comment: "" },
  { date: "2026-05-10", weekday: "вс", start: "15:00", end: "23:45", hours: 9, ordersBolt: 0, ordersUklon: 19, ordersCash: 0, grossBolt: 0, grossUklon: 3457.04, grossCash: 0, gross: 3457.04, rent: 0, fuel: 0, other: 0, netValue: 3457.04, km: 112.6, comment: "" },
  { date: "2026-05-11", weekday: "пн", start: "18:45", end: "22:30", hours: 4, ordersBolt: 0, ordersUklon: 11, ordersCash: 0, grossBolt: 0, grossUklon: 1784.32, grossCash: 0, gross: 1784.32, rent: 0, fuel: 0, other: 0, netValue: 1784.32, km: 77.1, comment: "" },
  { date: "2026-05-12", weekday: "вт", start: "11:45", end: "13:30", hours: 2, ordersBolt: 0, ordersUklon: 9, ordersCash: 0, grossBolt: 0, grossUklon: 1316.1, grossCash: 0, gross: 1316.1, rent: 0, fuel: 0, other: 0, netValue: 1316.1, km: 54.8, comment: "" },
  { date: "2026-05-13", weekday: "ср", start: "", end: "", hours: 0, ordersBolt: 0, ordersUklon: 0, ordersCash: 0, grossBolt: 0, grossUklon: 0, grossCash: 0, gross: 0, rent: 0, fuel: 0, other: 0, netValue: 0, km: 0, comment: "" },
  { date: "2026-05-14", weekday: "чт", start: "12:45", end: "23:30", hours: 11, ordersBolt: 0, ordersUklon: 19, ordersCash: 0, grossBolt: 0, grossUklon: 2641.22, grossCash: 0, gross: 2641.22, rent: 0, fuel: 0, other: 0, netValue: 2641.22, km: 106.4, comment: "" },
  { date: "2026-05-15", weekday: "пт", start: "16:00", end: "23:45", hours: 8, ordersBolt: 0, ordersUklon: 22, ordersCash: 0, grossBolt: 0, grossUklon: 4400, grossCash: 0, gross: 4400, rent: 0, fuel: 0, other: 0, netValue: 4400, km: 151.7, comment: "" },
  { date: "2026-05-16", weekday: "сб", start: "13:00", end: "18:45", hours: 6, ordersBolt: 0, ordersUklon: 12, ordersCash: 0, grossBolt: 0, grossUklon: 1954.86, grossCash: 0, gross: 1954.86, rent: 0, fuel: 0, other: 0, netValue: 1954.86, km: 74.4, comment: "" },
  { date: "2026-05-16", weekday: "сб", start: "20:45", end: "23:45", hours: 3, ordersBolt: 0, ordersUklon: 6, ordersCash: 0, grossBolt: 0, grossUklon: 1773, grossCash: 0, gross: 1773, rent: 0, fuel: 0, other: 0, netValue: 1773, km: 71.5, comment: "" },
  { date: "2026-05-17", weekday: "вс", start: "19:00", end: "23:45", hours: 5, ordersBolt: 0, ordersUklon: 12, ordersCash: 0, grossBolt: 0, grossUklon: 2600, grossCash: 0, gross: 2600, rent: 0, fuel: 0, other: 0, netValue: 2600, km: 93.9, comment: "" },
  { date: "2026-05-18", weekday: "пн", start: "19:00", end: "23:45", hours: 5, ordersBolt: 0, ordersUklon: 23, ordersCash: 0, grossBolt: 0, grossUklon: 3000, grossCash: 0, gross: 3000, rent: 0, fuel: 0, other: 0, netValue: 3000, km: 89.4, comment: "" },
];

const seedExpenses = [
  { date: "2026-05-01", category: "Аренда авто", description: "Залог", amount: 0, payment: "Наличные", comment: "200$  8860 грн" },
  { date: "2026-05-01", category: "Аренда авто", description: "Аренда", amount: 6300, payment: "Наличные", comment: "на неделю вперед" },
  { date: "2026-05-01", category: "Топливо", description: "UKRNAFTA", amount: 2700, payment: "Карта", comment: "Полный бак" },
  { date: "2026-05-01", category: "Мойка", description: "Авангард", amount: 500, payment: "Перевод", comment: "кузов + салон" },
  { date: "2026-05-04", category: "Аренда авто", description: "Аренда", amount: 1800, payment: "Перевод", comment: "за два дня" },
  { date: "2026-05-05", category: "Топливо", description: "UKRNAFTA", amount: 2733.65, payment: "Карта", comment: "Полный бак" },
  { date: "2026-05-06", category: "Мойка", description: "Самообслужка", amount: 100, payment: "Наличные", comment: "плохо помыл" },
  { date: "2026-05-09", category: "Топливо", description: "UKRNAFTA", amount: 3196.67, payment: "Карта", comment: "Никина карта (без скидки)" },
  { date: "2026-05-08", category: "Штраф", description: "парковка", amount: 170, payment: "Карта", comment: "Ника оплатила" },
  { date: "2026-05-11", category: "Аренда авто", description: "Аренда", amount: 6300, payment: "Перевод", comment: "на неделю вперед" },
  { date: "2026-05-11", category: "Мойка", description: "Авангард", amount: 450, payment: "Карта", comment: "кузов + салон" },
  { date: "2026-05-14", category: "Топливо", description: "UKRNAFTA", amount: 2694, payment: "Наличные", comment: "скидка -3 грн/л" },
  { date: "2026-05-14", category: "Прочее", description: "Пахучка", amount: 624.8, payment: "Наличные", comment: "" },
  { date: "2026-05-16", category: "Мойка", description: "Самообслужка", amount: 330, payment: "Карта", comment: "" },
  { date: "2026-05-18", category: "Аренда авто", description: "Аренда", amount: 6300, payment: "Карта", comment: "на неделю вперед" },
  { date: "2026-05-18", category: "Топливо", description: "UKRNAFTA", amount: 3095.93, payment: "Наличные", comment: "" },
];

const weekdayLabels = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const heatRows = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const heatHours = ["08", "12", "16", "20", "23"];

const elements = {
  incomeChart: document.querySelector("#incomeChart"),
  heatmap: document.querySelector("#heatmap"),
  periodButtons: document.querySelectorAll("[data-period]"),
  statsPeriodControls: document.querySelector("#statsPeriodControls"),
  calendarMenu: document.querySelector("#calendarMenu"),
  calendarPopover: document.querySelector("#calendarPopover"),
  calendarPresetButtons: document.querySelectorAll("[data-calendar-period]"),
  periodLabel: document.querySelector("#periodLabel"),
  prevPeriod: document.querySelector("#prevPeriod"),
  nextPeriod: document.querySelector("#nextPeriod"),
  dayPickerWrap: document.querySelector("#dayPickerWrap"),
  dayPicker: document.querySelector("#dayPicker"),
  rangePickerWrap: document.querySelector("#rangePickerWrap"),
  rangeStart: document.querySelector("#rangeStart"),
  rangeEnd: document.querySelector("#rangeEnd"),
  viewButtons: document.querySelectorAll("[data-view]"),
  viewPanels: document.querySelectorAll("[data-view-panel]"),
  menuToggle: document.querySelector("#menuToggle"),
  menuClose: document.querySelector("#menuClose"),
  menuOverlay: document.querySelector("#menuOverlay"),
  sideMenu: document.querySelector("#sideMenu"),
  shiftRunnerStates: document.querySelectorAll("[data-runner-state]"),
  runnerPlatformButtons: document.querySelectorAll("[data-run-platform]"),
  startShiftButton: document.querySelector("#startShiftButton"),
  finishShiftButton: document.querySelector("#finishShiftButton"),
  finishShiftForm: document.querySelector("#finishShiftForm"),
  cancelFinishShift: document.querySelector("#cancelFinishShift"),
  activePlatform: document.querySelector("#activePlatform"),
  activeTimer: document.querySelector("#activeTimer"),
  finishShiftTitle: document.querySelector("#finishShiftTitle"),
  finishShiftMeta: document.querySelector("#finishShiftMeta"),
  netProfit: document.querySelector("#netProfit"),
  profitFormula: document.querySelector("#profitFormula"),
  shiftCount: document.querySelector("#shiftCount"),
  orderCount: document.querySelector("#orderCount"),
  mileageTotal: document.querySelector("#mileageTotal"),
  avgProfitText: document.querySelector("#avgProfitText"),
  avgOrdersText: document.querySelector("#avgOrdersText"),
  avgMileageText: document.querySelector("#avgMileageText"),
  avgProfitValue: document.querySelector("#avgProfitValue"),
  avgRevenueExpenseText: document.querySelector("#avgRevenueExpenseText"),
  avgRevenueText: document.querySelector("#avgRevenueText"),
  avgExpenseText: document.querySelector("#avgExpenseText"),
  avgOpsText: document.querySelector("#avgOpsText"),
  avgKmPriceText: document.querySelector("#avgKmPriceText"),
  profitDelta: document.querySelector("#profitDelta"),
  hourDelta: document.querySelector("#hourDelta"),
  onlineBadge: document.querySelector("#onlineBadge"),
  fuelDelta: document.querySelector("#fuelDelta"),
  miniBars: document.querySelector("#miniBars"),
  miniStartLabel: document.querySelector("#miniStartLabel"),
  miniEndLabel: document.querySelector("#miniEndLabel"),
  miniMaxLabel: document.querySelector("#miniMaxLabel"),
  bestDayLabel: document.querySelector("#bestDayLabel"),
  totalExpenses: document.querySelector("#totalExpenses"),
  fuelExpense: document.querySelector("#fuelExpense"),
  rentExpense: document.querySelector("#rentExpense"),
  washExpense: document.querySelector("#washExpense"),
  fineExpense: document.querySelector("#fineExpense"),
  repairExpense: document.querySelector("#repairExpense"),
  otherExpense: document.querySelector("#otherExpense"),
  syncStatus: document.querySelector("#syncStatus"),
  goalInput: document.querySelector("#goalInput"),
  goalPercent: document.querySelector("#goalPercent"),
  goalProgress: document.querySelector("#goalProgress"),
  goalText: document.querySelector("#goalText"),
  daysSummary: document.querySelector("#daysSummary"),
  daysGrid: document.querySelector("#daysGrid"),
  shiftTable: document.querySelector("#shiftTable"),
  shiftForm: document.querySelector("#shiftForm"),
  dateInput: document.querySelector("#shiftForm [name='date']"),
  startInput: document.querySelector("#shiftForm [name='start']"),
  endInput: document.querySelector("#shiftForm [name='end']"),
  grossAmountInput: document.querySelector("#shiftForm [name='grossAmount']"),
  shiftHoursPreview: document.querySelector("#shiftHoursPreview"),
  shiftGrossPreview: document.querySelector("#shiftGrossPreview"),
  rawShiftList: document.querySelector("#rawShiftList"),
  csvImport: document.querySelector("#csvImport"),
  importShiftsButton: document.querySelector("#importShiftsButton"),
  expenseForm: document.querySelector("#expenseForm"),
  expenseDateInput: document.querySelector("#expenseForm [name='date']"),
  expenseImport: document.querySelector("#expenseImport"),
  importExpensesButton: document.querySelector("#importExpensesButton"),
  csvSyncStatus: document.querySelector("#csvSyncStatus"),
  shiftFormKicker: document.querySelector("#shiftFormKicker"),
  shiftFormTitle: document.querySelector("#shiftFormTitle"),
  shiftSubmit: document.querySelector("#shiftSubmit"),
  cancelShiftEdit: document.querySelector("#cancelShiftEdit"),
  expenseFormKicker: document.querySelector("#expenseFormKicker"),
  expenseFormTitle: document.querySelector("#expenseFormTitle"),
  expenseSubmit: document.querySelector("#expenseSubmit"),
  cancelExpenseEdit: document.querySelector("#cancelExpenseEdit"),
  clearData: document.querySelector("#clearData"),
  profileButton: document.querySelector("#profileButton"),
};

let shifts = loadShifts();
let expenses = loadExpenses();
let selectedDay = latestDataDate();
let activePeriod = "day";
let periodAnchorDate = new Date(`${selectedDay}T12:00`);
let customRangeStart = "";
let customRangeEnd = "";
let editingShiftIndex = -1;
let editingExpenseIndex = -1;
let selectedRunnerPlatform = "Bolt";
let activeShift = loadActiveShift();
let pendingShiftFinish = null;
let activeShiftTimer = null;
let monthGoal = loadMonthGoal();
let realtimeClient = null;
let realtimeReloadTimer = null;
let cloudLoadedOnce = false;
let menuTouchStart = null;
let settingsSaveTimer = null;

function loadShifts() {
  const saved = readStorage();
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(normalizeShift) : [];
  } catch {
    return [];
  }
}

function saveShifts() {
  writeStorage(JSON.stringify(shifts));
}

function loadActiveShift() {
  const saved = readStorage(ACTIVE_SHIFT_STORAGE_KEY);
  if (!saved) return null;

  try {
    const parsed = JSON.parse(saved);
    return parsed?.startedAt && parsed?.platform ? parsed : null;
  } catch {
    return null;
  }
}

function saveActiveShift() {
  if (!activeShift) return;
  writeStorage(JSON.stringify(activeShift), ACTIVE_SHIFT_STORAGE_KEY);
}

function clearActiveShift() {
  activeShift = null;
  try {
    localStorage.removeItem(ACTIVE_SHIFT_STORAGE_KEY);
  } catch {
    writeStorage("", ACTIVE_SHIFT_STORAGE_KEY);
  }
}

function loadExpenses() {
  const saved = readStorage(EXPENSE_STORAGE_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(normalizeExpense) : [];
  } catch {
    return [];
  }
}

function saveExpenses() {
  writeStorage(JSON.stringify(expenses), EXPENSE_STORAGE_KEY);
}

function loadCsvSyncMeta() {
  const saved = readStorage(CSV_SYNC_STORAGE_KEY);
  if (!saved) return {};

  try {
    return JSON.parse(saved) || {};
  } catch {
    return {};
  }
}

function loadMonthGoal() {
  const saved = Number(readStorage(GOAL_STORAGE_KEY));
  return Number.isFinite(saved) && saved > 0 ? saved : DEFAULT_MONTH_GOAL;
}

function saveMonthGoal(value) {
  monthGoal = Number.isFinite(value) && value > 0 ? value : DEFAULT_MONTH_GOAL;
  writeStorage(String(monthGoal), GOAL_STORAGE_KEY);
}

function saveCsvSyncMeta(type, count) {
  const meta = {
    ...loadCsvSyncMeta(),
    [type]: {
      count,
      importedAt: new Date().toISOString(),
    },
  };
  writeStorage(JSON.stringify(meta), CSV_SYNC_STORAGE_KEY);
  renderCsvSyncStatus();
}

function formatImportDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function renderCsvSyncStatus() {
  if (!elements.csvSyncStatus) return;

  const meta = loadCsvSyncMeta();
  const parts = [];
  if (meta.shifts) parts.push(`смены: ${meta.shifts.count} строк · ${formatImportDate(meta.shifts.importedAt)}`);
  if (meta.expenses) parts.push(`расходы: ${meta.expenses.count} строк · ${formatImportDate(meta.expenses.importedAt)}`);
  elements.csvSyncStatus.textContent = parts.length ? `Последний импорт — ${parts.join("; ")}` : "Импорт еще не выполнялся.";
}

function setSyncStatus(message) {
  if (elements.syncStatus) elements.syncStatus.textContent = message;
}

function hasCloudStorage() {
  return Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY && window.fetch);
}

function hasRealtimeClient() {
  return Boolean(hasCloudStorage() && window.supabase?.createClient);
}

function hasSheetsSync() {
  return Boolean(GOOGLE_SHEETS_WEB_APP_URL && window.fetch);
}

function isTelegramMiniApp() {
  return Boolean(telegramApp?.initData || telegramApp?.initDataUnsafe?.user);
}

function setCssVar(name, value) {
  if (value) document.documentElement.style.setProperty(name, value);
}

function applyTelegramTheme() {
  if (!telegramApp) return;

  const theme = telegramApp.themeParams || {};
  setCssVar("--tg-bg", theme.bg_color);
  setCssVar("--tg-secondary-bg", theme.secondary_bg_color);
  setCssVar("--tg-text", theme.text_color);
  setCssVar("--tg-hint", theme.hint_color);
  setCssVar("--tg-button", theme.button_color);
  setCssVar("--tg-button-text", theme.button_text_color);

  document.body.classList.toggle("telegram-mini-app", isTelegramMiniApp());
  document.body.dataset.telegramPlatform = telegramApp.platform || "";
  document.body.dataset.telegramColorScheme = telegramApp.colorScheme || "dark";
}

function updateTelegramViewport() {
  if (!telegramApp) return;

  const viewportHeight = telegramApp.viewportStableHeight || telegramApp.viewportHeight;
  if (viewportHeight) document.documentElement.style.setProperty("--tg-viewport-height", `${viewportHeight}px`);
}

function initialsFromTelegramUser(user) {
  const nameParts = [user?.first_name, user?.last_name].filter(Boolean);
  const initials = nameParts.map((part) => part.trim()[0]).join("");
  if (initials) return initials.slice(0, 2).toUpperCase();
  return String(user?.username || "TP").slice(0, 2).toUpperCase();
}

function syncTelegramBackButton(view = location.hash.replace("#", "")) {
  if (!telegramApp?.BackButton) return;

  if (view === "data" || view === "history") {
    telegramApp.BackButton.show();
  } else {
    telegramApp.BackButton.hide();
  }
}

function setupTelegramMiniApp() {
  if (!telegramApp) return;

  document.documentElement.classList.add("has-telegram-sdk");
  applyTelegramTheme();
  updateTelegramViewport();

  const user = telegramApp.initDataUnsafe?.user;
  if (user && elements.profileButton) {
    elements.profileButton.textContent = initialsFromTelegramUser(user);
    elements.profileButton.setAttribute(
      "aria-label",
      `Профиль Telegram: ${[user.first_name, user.last_name].filter(Boolean).join(" ") || user.username}`,
    );
  }

  telegramApp.ready?.();
  telegramApp.expand?.();
  telegramApp.disableVerticalSwipes?.();
  telegramApp.onEvent?.("themeChanged", applyTelegramTheme);
  telegramApp.onEvent?.("viewportChanged", updateTelegramViewport);
  telegramApp.BackButton?.onClick?.(() => {
    setView("dashboard");
    history.replaceState(null, "", "#dashboard");
  });
}

function preventAccidentalZoom() {
  let lastTouchEnd = 0;

  document.addEventListener(
    "touchend",
    (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 320) event.preventDefault();
      lastTouchEnd = now;
    },
    { passive: false },
  );

  document.addEventListener(
    "gesturestart",
    (event) => {
      event.preventDefault();
    },
    { passive: false },
  );
}

async function cloudRequest(path, options = {}) {
  const { method = "GET", body, query = "", prefer = "return=representation" } = options;
  const response = await fetch(`${SUPABASE_REST_URL}/${path}${query}`, {
    method,
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: prefer,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

async function sendToGoogleSheet(type, payload) {
  if (!hasSheetsSync()) return;

  try {
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        type,
        payload: stripRemoteId(payload),
      }),
    });
  } catch (error) {
    console.warn("Google Sheets sync unavailable.", error);
  }
}

function stripRemoteId(item) {
  const { remoteId, ...payload } = item;
  return payload;
}

function normalizeCloudShift(row) {
  return normalizeShift({ ...(row.payload || {}), remoteId: row.id });
}

function normalizeCloudExpense(row) {
  return normalizeExpense({ ...(row.payload || {}), remoteId: row.id });
}

async function loadCloudSettings() {
  if (!hasCloudStorage()) return false;

  try {
    const [settings] = await cloudRequest("settings", { query: "?key=eq.dashboard&select=payload&limit=1" });
    const nextGoal = Number(settings?.payload?.monthGoal);
    if (Number.isFinite(nextGoal) && nextGoal > 0) {
      saveMonthGoal(nextGoal);
      renderAll();
    }
    return true;
  } catch (error) {
    console.warn("Cloud settings are unavailable, using local settings.", error);
    return false;
  }
}

async function loadCloudData({ applyEmpty = false, silent = false } = {}) {
  if (!hasCloudStorage()) {
    setSyncStatus("Облако недоступно, работаем с локальной копией.");
    return false;
  }

  try {
    const [shiftResult, expenseResult] = await Promise.all([
      cloudRequest("shifts", { query: "?select=id,payload&order=created_at.asc" }),
      cloudRequest("expenses", { query: "?select=id,payload&order=created_at.asc" }),
    ]);

    const cloudShifts = (shiftResult || []).map(normalizeCloudShift);
    const cloudExpenses = (expenseResult || []).map(normalizeCloudExpense);
    const hasCloudRows = cloudShifts.length || cloudExpenses.length;

    if (hasCloudRows || applyEmpty || cloudLoadedOnce) {
      shifts = cloudShifts;
      expenses = cloudExpenses;
      selectedDay = latestDataDate();
      if (elements.dayPicker) elements.dayPicker.value = selectedDay;
      saveShifts();
      saveExpenses();
      renderAll();
    }
    cloudLoadedOnce = true;

    if (silent) return;
    setSyncStatus(
      hasCloudRows
        ? "Данные загружены из Supabase. Realtime подключается..."
        : "Supabase подключен, но облачная база пока пустая.",
    );
    return true;
  } catch (error) {
    setSyncStatus("Supabase ждет настройки таблиц. Выполни supabase-schema.sql.");
    console.warn("Supabase sync unavailable, using local data.", error);
    return false;
  }
}

function scheduleCloudReload(message = "Данные обновлены на другом устройстве.") {
  window.clearTimeout(realtimeReloadTimer);
  realtimeReloadTimer = window.setTimeout(async () => {
    setSyncStatus(`${message} Обновляю экран...`);
    await loadCloudData({ applyEmpty: true, silent: true });
    setSyncStatus("Realtime включен: данные синхронизируются между устройствами.");
  }, REALTIME_REFRESH_DELAY);
}

function scheduleSettingsReload() {
  window.clearTimeout(realtimeReloadTimer);
  realtimeReloadTimer = window.setTimeout(async () => {
    await loadCloudSettings();
    setSyncStatus("Realtime включен: данные синхронизируются между устройствами.");
  }, REALTIME_REFRESH_DELAY);
}

function setupRealtimeSync({ includeSettings = false } = {}) {
  if (!hasRealtimeClient()) {
    setSyncStatus("Supabase работает через REST. Для realtime нужен supabase-js CDN.");
    return;
  }

  realtimeClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  const channel = realtimeClient
    .channel("taxiprofit-live")
    .on("postgres_changes", { event: "*", schema: "public", table: "shifts" }, () => {
      scheduleCloudReload("Смены обновлены в облаке.");
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "expenses" }, () => {
      scheduleCloudReload("Расходы обновлены в облаке.");
    });

  if (includeSettings) {
    channel.on("postgres_changes", { event: "*", schema: "public", table: "settings" }, () => {
      scheduleSettingsReload();
    });
  }

  channel.subscribe((status) => {
    if (status === "SUBSCRIBED") {
      setSyncStatus("Realtime включен: данные синхронизируются между устройствами.");
    }
    if (status === "CHANNEL_ERROR") {
      setSyncStatus("Realtime ждет настройки Supabase. Проверь supabase-schema.sql.");
    }
    if (status === "CLOSED") {
      setSyncStatus("Realtime отключен. Изменения сохраняются, но обновятся после перезагрузки.");
    }
  });
}

async function saveSettingsToCloud() {
  if (!hasCloudStorage()) return;

  try {
    await cloudRequest("settings", {
      method: "POST",
      query: "?on_conflict=key",
      body: { key: "dashboard", payload: { monthGoal } },
      prefer: "resolution=merge-duplicates,return=representation",
    });
  } catch (error) {
    console.warn("Settings were saved locally but not synced to Supabase.", error);
  }
}

function scheduleSettingsSave() {
  window.clearTimeout(settingsSaveTimer);
  settingsSaveTimer = window.setTimeout(() => {
    saveSettingsToCloud();
  }, 500);
}

async function saveShiftToCloud(shift) {
  if (!hasCloudStorage()) return shift;

  const payload = stripRemoteId(shift);
  try {
    if (shift.remoteId) {
      await cloudRequest("shifts", {
        method: "PATCH",
        query: `?id=eq.${encodeURIComponent(shift.remoteId)}`,
        body: { payload },
      });
      return shift;
    }

    const [data] = await cloudRequest("shifts", { method: "POST", body: { payload } });
    return { ...shift, remoteId: data.id };
  } catch (error) {
    console.warn("Shift was saved locally but not synced to Supabase.", error);
    return shift;
  }
}

async function saveExpenseToCloud(expense) {
  if (!hasCloudStorage()) return expense;

  const payload = stripRemoteId(expense);
  try {
    if (expense.remoteId) {
      await cloudRequest("expenses", {
        method: "PATCH",
        query: `?id=eq.${encodeURIComponent(expense.remoteId)}`,
        body: { payload },
      });
      return expense;
    }

    const [data] = await cloudRequest("expenses", { method: "POST", body: { payload } });
    return { ...expense, remoteId: data.id };
  } catch (error) {
    console.warn("Expense was saved locally but not synced to Supabase.", error);
    return expense;
  }
}

async function deleteCloudRow(table, remoteId) {
  if (!hasCloudStorage() || !remoteId) return;

  try {
    await cloudRequest(table, {
      method: "DELETE",
      query: `?id=eq.${encodeURIComponent(remoteId)}`,
      prefer: "return=minimal",
    });
  } catch (error) {
    console.warn(`Could not delete ${table} row from Supabase.`, error);
  }
}

async function replaceCloudTable(table, items) {
  if (!hasCloudStorage()) return;

  try {
    await cloudRequest(table, {
      method: "DELETE",
      query: "?id=neq.00000000-0000-0000-0000-000000000000",
      prefer: "return=minimal",
    });

    if (!items.length) return;

    const data = await cloudRequest(table, {
      method: "POST",
      body: items.map((item) => ({ payload: stripRemoteId(item) })),
    });

    data.forEach((row, index) => {
      items[index].remoteId = row.id;
    });
  } catch (error) {
    console.warn(`Could not replace ${table} data in Supabase.`, error);
  }
}

function readStorage(key = STORAGE_KEY) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(value, key = STORAGE_KEY) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // In private or restricted file contexts the UI should still work in memory.
  }
}

function money(value) {
  return `₴ ${new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 }).format(Math.round(value || 0))}`;
}

function moneyInputValue(value) {
  const amount = Number(value || 0);
  return Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
}

function compactMoney(value) {
  const amount = Number(value || 0);
  if (amount >= 1000) return `₴${Number((amount / 1000).toFixed(1))}k`;
  return money(amount).replace(" ", "");
}

function sum(items, key) {
  return items.reduce((total, item) => total + Number(item[key] || 0), 0);
}

function shiftExpenses(shift) {
  return Number(shift.fuel || 0) + Number(shift.rent || 0) + Number(shift.other || shift.wash || 0) + Number(shift.fees || 0);
}

function net(shift) {
  if (shift.netValue !== undefined && shift.netValue !== "" && Number.isFinite(Number(shift.netValue))) {
    return Number(shift.netValue);
  }
  return Number(shift.gross || 0) - shiftExpenses(shift);
}

function totalOrders(shift) {
  return Number(shift.ordersBolt || 0) + Number(shift.ordersUklon || 0) + Number(shift.ordersCash || 0) + Number(shift.trips || 0);
}

function isWorkShift(shift) {
  return Number(shift.hours || 0) > 0 || Number(shift.gross || 0) > 0 || totalOrders(shift) > 0 || Number(shift.km || 0) > 0;
}

function normalizeShift(shift) {
  const gross =
    Number(shift.gross || 0) ||
    Number(shift.grossBolt || 0) +
      Number(shift.grossUklon || 0) +
      Number(shift.grossCash || 0) +
      Number(shift.grossIndrive || 0);
  return {
    ...shift,
    gross,
    fuel: Number(shift.fuel || 0),
    rent: Number(shift.rent || 0),
    other: Number(shift.other || shift.wash || 0),
    fees: Number(shift.fees || 0),
    hours: Number(shift.hours || 0),
    km: Number(shift.km || 0),
    ordersBolt: Number(shift.ordersBolt || 0),
    ordersUklon: Number(shift.ordersUklon || 0),
    ordersCash: Number(shift.ordersCash || 0),
    grossBolt: Number(shift.grossBolt || 0),
    grossUklon: Number(shift.grossUklon || 0),
    grossCash: Number(shift.grossCash || 0),
    grossIndrive: Number(shift.grossIndrive || 0),
    platform: shift.platform || undefined,
  };
}

function normalizeExpense(expense) {
  return {
    remoteId: expense.remoteId,
    date: expense.date,
    category: expense.category || "Прочие",
    description: expense.description || "",
    amount: Number(expense.amount || 0),
    payment: expense.payment || "",
    comment: expense.comment || "",
  };
}

function dateValue(shift) {
  return new Date(`${shift.date}T${normalizeTime(shift.start || "12:00")}`);
}

function normalizeTime(value) {
  const [hour = "12", minute = "00"] = String(value || "12:00").split(":");
  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

function timeToMinutes(value) {
  const [hour, minute] = normalizeTime(value).split(":").map(Number);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
  return hour * 60 + minute;
}

function calculateHours(start, end) {
  if (!start || !end) return "";

  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);
  if (startMinutes === null || endMinutes === null) return "";

  let diff = endMinutes - startMinutes;
  if (diff < 0) diff += 24 * 60;
  if (diff === 0) return "";

  const hours = diff / 60;
  return Number.isInteger(hours) ? String(hours) : hours.toFixed(1);
}

function formatClockDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
}

function localDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function localTimeKey(date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function runnerElapsedMs(finish = new Date()) {
  const source = pendingShiftFinish || activeShift;
  if (!source?.startedAt) return 0;
  const end = source.endedAt ? new Date(source.endedAt) : finish;
  return Math.max(0, end - new Date(source.startedAt));
}

function updateShiftAutoSummary() {
  const calculated = calculateHours(elements.startInput.value, elements.endInput.value);
  const gross = Number(elements.grossAmountInput?.value || 0);

  if (elements.shiftHoursPreview) {
    elements.shiftHoursPreview.textContent = calculated ? `${calculated} ч` : "—";
  }

  if (elements.shiftGrossPreview) {
    elements.shiftGrossPreview.textContent = money(gross);
  }
}

function sortedShifts() {
  return [...shifts].sort((a, b) => dateValue(b) - dateValue(a));
}

function indexedShifts() {
  return shifts
    .map((shift, sourceIndex) => ({ shift, sourceIndex }))
    .sort((a, b) => dateValue(b.shift) - dateValue(a.shift));
}

function indexedExpenses() {
  return expenses
    .map((expense, sourceIndex) => ({ expense, sourceIndex }))
    .sort((a, b) => new Date(`${b.expense.date}T12:00`) - new Date(`${a.expense.date}T12:00`));
}

function latestDataDate() {
  const latestShift = sortedShifts()[0]?.date;
  if (latestShift) return latestShift;
  return new Date().toISOString().slice(0, 10);
}

function todayValue() {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return today;
}

function dayBounds(value) {
  const start = new Date(`${value}T00:00:00`);
  const end = new Date(`${value}T23:59:59.999`);
  return { start, end };
}

function monthStart(value) {
  const start = new Date(value);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  return start;
}

function yearStart(value) {
  const start = new Date(value);
  start.setMonth(0, 1);
  start.setHours(0, 0, 0, 0);
  return start;
}

function weekStart(value) {
  const start = new Date(value);
  const mondayOffset = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - mondayOffset);
  start.setHours(0, 0, 0, 0);
  return start;
}

function endOfDay(value) {
  const end = new Date(value);
  end.setHours(23, 59, 59, 999);
  return end;
}

function periodBounds(period) {
  const anchor = new Date(periodAnchorDate);
  anchor.setHours(23, 59, 59, 999);
  const end = anchor;
  const start = new Date(end);

  if (period === "day") {
    const selected = selectedDay || latestDataDate();
    return dayBounds(selected);
  }

  if (period === "today") {
    return dayBounds(dateKey(new Date()));
  }

  if (period === "yesterday") {
    return dayBounds(dateKey(addDays(new Date(), -1)));
  }

  if (period === "week") {
    const currentWeekStart = weekStart(new Date());
    const startOfWeek = weekStart(anchor);
    const endOfWeek = dateKey(startOfWeek) === dateKey(currentWeekStart) ? todayValue() : endOfDay(addDays(startOfWeek, 6));
    return { start: startOfWeek, end: endOfWeek };
  }

  if (period === "prevWeek") {
    const currentWeekStart = weekStart(end);
    const prevWeekStart = addDays(currentWeekStart, -7);
    return { start: prevWeekStart, end: endOfDay(addDays(currentWeekStart, -1)) };
  }

  if (period === "month") {
    const currentMonthStart = monthStart(new Date());
    const startOfMonth = monthStart(anchor);
    const endOfMonth =
      dateKey(startOfMonth) === dateKey(currentMonthStart)
        ? todayValue()
        : endOfDay(new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0));
    return { start: startOfMonth, end: endOfMonth };
  }

  if (period === "prevMonth") {
    const currentMonthStart = monthStart(end);
    const prevMonthStart = new Date(currentMonthStart);
    prevMonthStart.setMonth(prevMonthStart.getMonth() - 1);
    return { start: prevMonthStart, end: endOfDay(addDays(currentMonthStart, -1)) };
  }

  if (period === "year") {
    const currentYearStart = yearStart(new Date());
    const startOfYear = yearStart(anchor);
    const endOfYear =
      dateKey(startOfYear) === dateKey(currentYearStart)
        ? todayValue()
        : endOfDay(new Date(startOfYear.getFullYear(), 11, 31));
    return { start: startOfYear, end: endOfYear };
  }

  if (period === "prevYear") {
    const currentYearStart = yearStart(end);
    const prevYearStart = new Date(currentYearStart);
    prevYearStart.setFullYear(prevYearStart.getFullYear() - 1);
    return { start: prevYearStart, end: endOfDay(addDays(currentYearStart, -1)) };
  }

  if (period === "custom") {
    const fallback = latestDataDate();
    const from = customRangeStart || fallback;
    const to = customRangeEnd || from;
    const startDate = from <= to ? from : to;
    const endDate = from <= to ? to : from;
    return {
      start: new Date(`${startDate}T00:00:00`),
      end: new Date(`${endDate}T23:59:59.999`),
    };
  }

  return { start, end };
}

function currentRange(period) {
  if (period === "all") return shifts;

  const { start, end } = periodBounds(period);
  return shifts.filter((shift) => {
    const value = dateValue(shift);
    return value >= start && value <= end;
  });
}

function expenseRange(period) {
  if (period === "all") return expenses;

  const { start, end } = periodBounds(period);
  return expenses.filter((expense) => {
    const value = new Date(`${expense.date}T12:00`);
    return value >= start && value <= end;
  });
}

function percentChange(current, previous) {
  if (!previous) return current ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function periodSummary(period) {
  const current = currentRange(period);
  const currentExpenses = expenseRange(period);
  const workedDays = new Set(current.filter(isWorkShift).map((shift) => shift.date).filter(Boolean));
  const calendarDays = dayRecords(period);
  const shiftsWorked = workedDays.size;
  const daysOff = calendarDays.filter((record) => !record.isWorkday).length;
  const hours = sum(current, "hours");
  const gross = sum(current, "gross");
  const orders = current.reduce((total, shift) => total + totalOrders(shift), 0);
  const km = sum(current, "km");
  const embeddedFuel = sum(current, "fuel");
  const embeddedRent = sum(current, "rent");
  const embeddedOther = sum(current, "other");
  const embeddedFees = sum(current, "fees");
  const fuel = embeddedFuel + sumExpensesByCategory(currentExpenses, ["Топливо"]);
  const rent = embeddedRent + sumExpensesByCategory(currentExpenses, ["Аренда авто", "Аренда"]);
  const wash = sumExpensesByCategory(currentExpenses, ["Мойка"]);
  const fine = sumExpensesByCategory(currentExpenses, ["Штраф"]);
  const repair = sumExpensesByCategory(currentExpenses, ["Ремонт"]);
  const other = embeddedOther + sumExpensesByCategory(currentExpenses, ["Прочее"]);
  const fees = embeddedFees + sumExpensesByCategory(currentExpenses, ["Комиссии"]);
  const expensesTotal = fuel + rent + wash + fine + repair + fees + other;
  const currentNet = gross - expensesTotal;

  return {
    current,
    shiftsWorked,
    daysOff,
    net: currentNet,
    gross,
    hours,
    orders,
    km,
    perHour: hours ? currentNet / hours : 0,
    avgRevenue: shiftsWorked ? gross / shiftsWorked : 0,
    avgExpenses: shiftsWorked ? expensesTotal / shiftsWorked : 0,
    avgProfit: shiftsWorked ? currentNet / shiftsWorked : 0,
    avgOrders: shiftsWorked ? orders / shiftsWorked : 0,
    avgKm: shiftsWorked ? km / shiftsWorked : 0,
    avgKmPrice: km ? gross / km : 0,
    fuel,
    rent,
    wash,
    fine,
    repair,
    fees,
    other,
    expenses: expensesTotal,
  };
}

function sumExpensesByCategory(source, names) {
  return source.reduce((total, expense) => {
    return names.includes(expense.category) ? total + Number(expense.amount || 0) : total;
  }, 0);
}

function chartData(period) {
  const records = dayRecords(period)
    .sort((a, b) => new Date(`${a.date}T12:00`) - new Date(`${b.date}T12:00`));

  if (period === "year") {
    const grouped = new Map();
    records.forEach((record) => {
      const date = new Date(`${record.date}T12:00`);
      const label = date.toLocaleDateString("ru-RU", { month: "short" }).replace(".", "");
      grouped.set(label, (grouped.get(label) || 0) + record.gross);
    });
    return [...grouped.entries()].map(([label, value]) => ({ label, value }));
  }

  return records.map((record) => ({
    label: formatChartDate(record.date),
    value: record.gross,
    isWorkday: record.isWorkday,
  }));
}

function chartLabel(period, date, start) {
  if (period === "day") return normalizeTime(start || "12:00").slice(0, 2);
  if (period === "month") return String(date.getDate());
  if (period === "year") return date.toLocaleDateString("ru-RU", { month: "short" }).replace(".", "");
  return weekdayLabels[date.getDay()];
}

function renderChart(period) {
  const data = chartData(period);
  if (!data.length) {
    elements.incomeChart.innerHTML = `<div class="empty-chart">Нет данных за период</div>`;
    return;
  }

  const max = Math.max(...data.map((item) => item.value), 1);
  const points = data.map((item, index) => {
    const x = data.length === 1 ? 50 : 5 + (index / (data.length - 1)) * 90;
    const y = 92 - (item.value / max) * 82;
    return `${x},${y}`;
  });

  elements.incomeChart.innerHTML = `
    <div class="combo-plot">
      <svg class="combo-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline points="${points.join(" ")}"></polyline>
        ${points
          .map((point) => {
            const [x, y] = point.split(",");
            return `<circle cx="${x}" cy="${y}" r="1.35"></circle>`;
          })
          .join("")}
      </svg>
      <div class="combo-bars">
        ${data
          .map((item) => {
            const height = Math.max(item.value ? 5 : 1, Math.round((item.value / max) * 88));
            return `<span class="${item.value ? "income-bar" : "zero-bar"}" style="height: ${height}%"></span>`;
          })
          .join("")}
      </div>
    </div>
    <div class="combo-labels">
      ${data.map((item) => `<small>${item.label}</small>`).join("")}
    </div>
  `;
}

function renderMetrics(period) {
  const summary = periodSummary(period);
  const previous = shifts.slice(-summary.current.length * 2, -summary.current.length);
  const previousNet = previous.reduce((total, shift) => total + Number(shift.gross || 0), 0);
  const delta = period === "all" ? 0 : percentChange(summary.net, previousNet);
  const expenseShare = summary.gross ? Math.round((summary.expenses / summary.gross) * 100) : 0;

  elements.netProfit.textContent = money(summary.net);
  elements.profitFormula.textContent = `${money(summary.gross)} выручка − ${money(summary.expenses)} расходы`;
  elements.shiftCount.textContent = summary.shiftsWorked;
  elements.orderCount.textContent = new Intl.NumberFormat("uk-UA").format(summary.orders);
  elements.mileageTotal.textContent = `${new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 1 }).format(summary.km)} км`;
  elements.profitDelta.textContent = period === "all" ? "итог" : `${delta >= 0 ? "+" : ""}${delta}%`;
  elements.profitDelta.className = delta >= 0 ? "profit" : "loss";
  elements.hourDelta.textContent = `${Number(summary.hours.toFixed(1))} ч`;
  elements.onlineBadge.textContent = `${Number(summary.avgOrders.toFixed(1))}/смена`;
  elements.fuelDelta.textContent = `${expenseShare}%`;
  elements.avgProfitText.textContent = `${money(summary.avgProfit)} средняя прибыль за смену`;
  elements.avgOrdersText.textContent = `${Number(summary.avgOrders.toFixed(1))} заказов за смену`;
  elements.avgMileageText.textContent = `${Number(summary.avgKm.toFixed(1))} км за смену`;
  elements.avgProfitValue.textContent = money(summary.avgProfit);
  elements.avgRevenueExpenseText.textContent = `${money(summary.avgRevenue)} выручка · ${money(summary.avgExpenses)} расходы`;
  elements.avgRevenueText.textContent = `${money(summary.avgRevenue)} за смену`;
  elements.avgExpenseText.textContent = `${money(summary.avgExpenses)} за смену`;
  elements.avgOpsText.textContent = `${Number(summary.avgOrders.toFixed(1))} заказов · ${Number(summary.avgKm.toFixed(1))} км за смену`;
  elements.avgKmPriceText.textContent = `${money(summary.avgKmPrice)} за км`;

  renderExpenses(summary);
  renderGoal(summary);
  renderMiniBars();
  renderDays(summary);
}

function renderMiniBars() {
  const records = dayRecords(activePeriod)
    .filter((record) => record.isWorkday)
    .sort((a, b) => new Date(`${a.date}T12:00`) - new Date(`${b.date}T12:00`));
  const visibleRecords = selectMiniRecords(records, 7);

  if (!visibleRecords.length) {
    elements.miniBars.innerHTML = Array.from({ length: 7 }, () => `<span class="empty" style="height: 18%"></span>`).join("");
    elements.bestDayLabel.textContent = "Нет рабочих дней";
    elements.miniMaxLabel.textContent = "Макс ₴0";
    elements.miniStartLabel.textContent = "—";
    elements.miniEndLabel.textContent = "—";
    return;
  }

  const max = Math.max(...visibleRecords.map((item) => item.gross), 1);
  const best = visibleRecords.reduce((winner, item) => {
    return item.gross > winner.gross ? item : winner;
  }, visibleRecords[0]);

  elements.miniBars.innerHTML = visibleRecords
    .map((item) => {
      const value = item.gross;
      const height = Math.max(18, Math.round((value / max) * 88));
      const className = item.date === best.date ? "best" : "";
      return `<span class="${className}" style="height: ${height}%"><i>${formatShortDate(item.date)}</i><b>${compactMoney(item.gross)}</b></span>`;
    })
    .join("");
  elements.bestDayLabel.textContent = `Лучший доход: ${formatDate(best.date)}`;
  elements.miniMaxLabel.textContent = `Макс ${money(best.gross)}`;
  elements.miniStartLabel.textContent = formatShortDate(visibleRecords[0].date);
  elements.miniEndLabel.textContent = formatShortDate(visibleRecords[visibleRecords.length - 1].date);
}

function selectMiniRecords(records, maxItems) {
  if (records.length <= maxItems) return records;
  const bestIndex = records.reduce((winnerIndex, item, index) => {
    return item.gross > records[winnerIndex].gross ? index : winnerIndex;
  }, 0);
  const selected = new Set([0, bestIndex, records.length - 1]);
  const step = (records.length - 1) / (maxItems - 1);

  for (let index = 0; index < maxItems && selected.size < maxItems; index += 1) {
    selected.add(Math.round(index * step));
  }

  return [...selected]
    .sort((a, b) => a - b)
    .map((index) => records[index]);
}

function renderExpenses(summary) {
  elements.totalExpenses.textContent = money(summary.expenses);
  elements.fuelExpense.textContent = money(summary.fuel);
  elements.rentExpense.textContent = money(summary.rent);
  elements.washExpense.textContent = money(summary.wash);
  elements.fineExpense.textContent = money(summary.fine);
  elements.repairExpense.textContent = money(summary.repair);
  elements.otherExpense.textContent = money(summary.other + summary.fees);
}

function renderGoal(summary) {
  const monthNet = periodSummary("month").net;
  const goal = Math.max(monthGoal, 1);
  const progress = Math.min(100, Math.round((monthNet / goal) * 100));
  const rest = Math.max(0, goal - monthNet);

  if (elements.goalInput) elements.goalInput.value = String(monthGoal);
  elements.goalPercent.textContent = `${progress}%`;
  elements.goalProgress.style.width = `${progress}%`;
  elements.goalText.textContent = rest
    ? `Осталось ${money(rest)}. При текущем темпе цель близко к концу месяца.`
    : "Цель месяца закрыта. Все, дальше уже бонусная зона.";
}

function dateKey(value) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(value, days) {
  const next = new Date(value);
  next.setDate(next.getDate() + days);
  return next;
}

function calendarBounds(period, source) {
  const dates = source.map((shift) => shift.date).filter(Boolean).sort();
  if (!dates.length) return period === "all" ? null : periodBounds(period);

  if (period !== "all") {
    const bounds = periodBounds(period);
    const latestSourceDay = new Date(`${dates[dates.length - 1]}T23:59:59.999`);
    return {
      start: bounds.start,
      end: latestSourceDay < bounds.end ? latestSourceDay : bounds.end,
    };
  }

  return {
    start: new Date(`${dates[0]}T00:00:00`),
    end: new Date(`${dates[dates.length - 1]}T23:59:59.999`),
  };
}

function dayRecords(period) {
  const source = currentRange(period === "day" ? "day" : period);
  const grouped = new Map();
  const bounds = calendarBounds(period, source);

  if (bounds) {
    for (let day = new Date(bounds.start); day <= bounds.end; day = addDays(day, 1)) {
      grouped.set(dateKey(day), {
        date: dateKey(day),
        shifts: [],
        gross: 0,
        hours: 0,
        orders: 0,
        km: 0,
      });
    }
  }

  source.forEach((shift) => {
    if (!grouped.has(shift.date)) {
      grouped.set(shift.date, {
        date: shift.date,
        shifts: [],
        gross: 0,
        hours: 0,
        orders: 0,
        km: 0,
      });
    }

    const record = grouped.get(shift.date);
    record.shifts.push(shift);
    record.gross += Number(shift.gross || 0);
    record.hours += Number(shift.hours || 0);
    record.orders += totalOrders(shift);
    record.km += Number(shift.km || 0);
  });

  expenses.forEach((expense) => {
    if (!grouped.has(expense.date)) return;
    grouped.get(expense.date).expenses = (grouped.get(expense.date).expenses || 0) + Number(expense.amount || 0);
  });

  return [...grouped.values()]
    .map((record) => ({
      ...record,
      expenses: Number(record.expenses || 0),
      isWorkday: record.shifts.some(isWorkShift),
    }))
    .sort((a, b) => new Date(`${b.date}T12:00`) - new Date(`${a.date}T12:00`));
}

function renderDays(summary) {
  const records = dayRecords(activePeriod);
  elements.daysSummary.textContent = `${summary.shiftsWorked} рабочих · ${summary.daysOff} выходных`;
  elements.daysGrid.innerHTML = records
    .map((record) => {
      const status = record.isWorkday ? "Рабочий" : "Выходной";
      const className = record.isWorkday ? "workday" : "offday";
      const shortStatus = record.isWorkday ? "Раб." : "Вых.";
      const dayGross = Number(record.gross || 0);

      return `
        <article class="day-card ${className}">
          <div>
            <strong>${formatDate(record.date)}</strong>
            <span class="day-status" title="${status}" aria-label="${status}">${shortStatus}</span>
          </div>
          <p>${record.isWorkday ? `${Number(record.hours.toFixed(1))} ч · ${record.orders} заказов` : "смены не было"}</p>
          <b>${money(dayGross)}</b>
        </article>
      `;
    })
    .join("");
}

function formatDate(value) {
  return new Date(`${value}T12:00`).toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}

function formatShortDate(value) {
  return new Date(`${value}T12:00`).toLocaleDateString("ru-RU", { day: "numeric", month: "numeric" });
}

function formatChartDate(value) {
  return new Date(`${value}T12:00`).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
  });
}

function renderHeatmap() {
  const source = currentRange("month");
  const grid = heatRows.map((day) => heatHours.map((hour) => ({ day, hour, value: 0 })));

  source.forEach((shift) => {
    if (!isWorkShift(shift)) return;
    const day = weekdayLabels[dateValue(shift).getDay()];
    const hour = Number(normalizeTime(shift.start || "12:00").slice(0, 2));
    const rowIndex = heatRows.indexOf(day);
    const colIndex = Math.min(heatHours.length - 1, Math.max(0, Math.floor((hour - 8) / 4)));
    if (rowIndex >= 0) grid[rowIndex][colIndex].value += net(shift) / Math.max(shift.hours, 1);
  });

  const max = Math.max(...grid.flat().map((cell) => cell.value), 1);
  const header = ["", ...heatHours].map((item) => `<span class="heat-label">${item}</span>`).join("");
  const rows = heatRows
    .map((day, rowIndex) => {
      const cells = grid[rowIndex]
        .map((cell) => `<span class="heat-cell level-${Math.max(1, Math.ceil((cell.value / max) * 5))}"></span>`)
        .join("");
      return `<span class="heat-label">${day}</span>${cells}`;
    })
    .join("");

  elements.heatmap.innerHTML = header + rows;
}

function renderShiftTables() {
  const rows = dayRecords("all")
    .slice(0, 8)
    .map((record) => {
      const clean = record.gross - record.expenses;
      const efficiency = record.gross ? Math.round((clean / record.gross) * 100) : 0;
      const scoreClass = !record.isWorkday ? "off" : efficiency >= 70 ? "high" : efficiency >= 55 ? "mid" : "low";

      return `
        <div class="table-row ${record.isWorkday ? "" : "off-row"}">
          <span data-label="Дата">${formatDate(record.date)}</span>
          <span data-label="Статус"><i class="status-chip ${record.isWorkday ? "work" : "off"}">${record.isWorkday ? "Рабочий" : "Выходной"}</i></span>
          <span data-label="Касса">${money(record.gross)}</span>
          <strong data-label="Чистыми">${money(clean)}</strong>
          <span class="score ${scoreClass}" data-label="Эффективность">${record.isWorkday ? `${efficiency}%` : "—"}</span>
        </div>
      `;
    })
    .join("");

  elements.shiftTable.querySelectorAll(".table-row:not(.table-head)").forEach((row) => row.remove());
  elements.shiftTable.insertAdjacentHTML("beforeend", rows);

  const shiftCards = indexedShifts()
    .map(
      ({ shift, sourceIndex }) => `
        <article class="raw-shift ${isWorkShift(shift) ? "" : "off-shift"} ${sourceIndex === editingShiftIndex ? "editing" : ""}">
          <div>
            <strong>${shift.date} · ${isWorkShift(shift) ? `${shift.start || "—"}–${shift.end || "—"}` : "Выходной"}</strong>
            <span>${isWorkShift(shift) ? `${shift.hours} ч · ${totalOrders(shift)} заказов · ${Number(shift.km || 0).toFixed(1)} км · ${money(net(shift))} чистыми` : "нулевой день, в средние за смену не входит"}</span>
          </div>
          <div class="row-actions">
            <button class="edit-row" type="button" data-edit-index="${sourceIndex}" aria-label="Редактировать смену">✎</button>
            <button class="delete-row" type="button" data-delete-index="${sourceIndex}" aria-label="Удалить смену">×</button>
          </div>
        </article>
      `,
    )
    .join("");

  const expenseCards = indexedExpenses()
    .map(
      ({ expense, sourceIndex }) => `
        <article class="raw-shift expense-row ${sourceIndex === editingExpenseIndex ? "editing" : ""}">
          <div>
            <strong>${expense.date} · ${expense.category}</strong>
            <span>${expense.description || "без описания"} · ${money(expense.amount)} · ${expense.payment || "оплата не указана"}</span>
          </div>
          <div class="row-actions">
            <button class="edit-row" type="button" data-edit-expense-index="${sourceIndex}" aria-label="Редактировать расход">✎</button>
            <button class="delete-row" type="button" data-delete-expense-index="${sourceIndex}" aria-label="Удалить расход">×</button>
          </div>
        </article>
      `,
    )
    .join("");

  elements.rawShiftList.innerHTML = shiftCards + expenseCards;
}

function sortedExpenses() {
  return indexedExpenses().map((item) => item.expense);
}

function renderAll() {
  renderChart(activePeriod);
  renderMetrics(activePeriod);
  renderHeatmap();
  renderShiftTables();
}

function readNumber(formData, key) {
  return Number(formData.get(key) || 0);
}

function shiftPlatform(shift) {
  if (shift.platform) return shift.platform;
  if (Number(shift.grossBolt || 0) > 0) return "Bolt";
  if (Number(shift.grossUklon || 0) > 0) return "Uklon";
  if (Number(shift.grossIndrive || shift.grossCash || 0) > 0) return "Indrive";
  return "Uklon";
}

function shiftRevenueForPlatform(shift, platform = shiftPlatform(shift)) {
  if (platform === "Bolt") return Number(shift.grossBolt || 0);
  if (platform === "InDrive" || platform === "Indrive") return Number(shift.grossIndrive || shift.grossCash || 0);
  if (platform === "Uklon") return Number(shift.grossUklon || 0);
  return Number(shift.gross || 0);
}

function platformValues(platform, amount) {
  return {
    grossBolt: platform === "Bolt" ? amount : 0,
    grossUklon: platform === "Uklon" ? amount : 0,
    grossCash: platform === "InDrive" || platform === "Indrive" ? amount : 0,
    grossIndrive: platform === "InDrive" || platform === "Indrive" ? amount : 0,
  };
}

function shiftFromForm(formData) {
  const platform = formData.get("platform") || "Uklon";
  const grossAmount = readNumber(formData, "grossAmount");
  const hours = Number(calculateHours(formData.get("start"), formData.get("end")) || 0);

  return normalizeShift({
    date: formData.get("date"),
    start: formData.get("start"),
    end: formData.get("end"),
    hours,
    platform,
    ordersBolt: 0,
    ordersUklon: 0,
    ordersCash: 0,
    ...platformValues(platform, grossAmount),
    gross: grossAmount,
    fuel: 0,
    rent: 0,
    other: 0,
    km: readNumber(formData, "km"),
    comment: "",
  });
}

function expenseFromForm(formData) {
  return normalizeExpense({
    date: formData.get("date"),
    category: formData.get("category"),
    description: formData.get("description"),
    amount: readNumber(formData, "amount"),
    payment: formData.get("payment"),
    comment: formData.get("comment"),
  });
}

function setRunnerState(state) {
  elements.shiftRunnerStates.forEach((item) => item.classList.toggle("active", item.dataset.runnerState === state));
}

function updateRunnerPlatformButtons() {
  elements.runnerPlatformButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.runPlatform === selectedRunnerPlatform);
  });
}

function updateActiveShiftTimer() {
  if (!activeShift || !elements.activeTimer) return;
  elements.activeTimer.textContent = formatClockDuration(runnerElapsedMs());
}

function renderShiftRunner() {
  updateRunnerPlatformButtons();
  window.clearInterval(activeShiftTimer);
  activeShiftTimer = null;

  if (pendingShiftFinish) {
    setRunnerState("finish");
    if (elements.finishShiftTitle) elements.finishShiftTitle.textContent = `${pendingShiftFinish.platform}: итоги смены`;
    if (elements.finishShiftMeta) elements.finishShiftMeta.textContent = formatClockDuration(runnerElapsedMs());
    return;
  }

  if (activeShift) {
    selectedRunnerPlatform = activeShift.platform;
    updateRunnerPlatformButtons();
    setRunnerState("active");
    if (elements.activePlatform) elements.activePlatform.textContent = activeShift.platform;
    updateActiveShiftTimer();
    activeShiftTimer = window.setInterval(updateActiveShiftTimer, 1000);
    return;
  }

  setRunnerState("idle");
}

function startRunnerShift() {
  activeShift = {
    platform: selectedRunnerPlatform,
    startedAt: new Date().toISOString(),
  };
  pendingShiftFinish = null;
  saveActiveShift();
  renderShiftRunner();
}

function finishRunnerShift() {
  if (!activeShift) return;
  pendingShiftFinish = {
    ...activeShift,
    endedAt: new Date().toISOString(),
  };
  elements.finishShiftForm?.reset();
  renderShiftRunner();
}

function runnerShiftFromForm(formData) {
  const started = new Date(pendingShiftFinish.startedAt);
  const ended = new Date(pendingShiftFinish.endedAt);
  const gross = readNumber(formData, "gross");
  const expensesValue = readNumber(formData, "expenses");
  const orders = readNumber(formData, "orders");
  const platform = pendingShiftFinish.platform;

  return normalizeShift({
    date: localDateKey(started),
    start: localTimeKey(started),
    end: localTimeKey(ended),
    hours: Number((runnerElapsedMs(ended) / 3600000).toFixed(1)),
    platform,
    ordersBolt: platform === "Bolt" ? orders : 0,
    ordersUklon: platform === "Uklon" ? orders : 0,
    ordersCash: platform === "InDrive" || platform === "Indrive" ? orders : 0,
    ...platformValues(platform, gross),
    gross,
    other: expensesValue,
    km: readNumber(formData, "km"),
    comment: formData.get("comment"),
  });
}

function setFormValues(form, values) {
  Object.entries(values).forEach(([key, value]) => {
    const field = form.elements[key];
    if (field) field.value = value ?? "";
  });
}

function resetShiftForm() {
  editingShiftIndex = -1;
  elements.shiftForm.classList.remove("editing");
  elements.shiftForm.reset();
  elements.dateInput.value = new Date().toISOString().slice(0, 10);
  elements.startInput.value = "17:30";
  elements.endInput.value = "23:30";
  elements.shiftFormKicker.textContent = "Новая смена";
  elements.shiftFormTitle.textContent = "Добавить данные";
  elements.shiftSubmit.textContent = "Добавить смену";
  elements.cancelShiftEdit.hidden = true;
  updateShiftAutoSummary();
}

function resetExpenseForm() {
  editingExpenseIndex = -1;
  elements.expenseForm.classList.remove("editing");
  elements.expenseForm.reset();
  elements.expenseDateInput.value = new Date().toISOString().slice(0, 10);
  elements.expenseFormKicker.textContent = "Журнал расходов";
  elements.expenseFormTitle.textContent = "Добавить расход";
  elements.expenseSubmit.textContent = "Добавить расход";
  elements.cancelExpenseEdit.hidden = true;
}

function editShift(index) {
  const shift = shifts[index];
  if (!shift) return;

  editingShiftIndex = index;
  elements.shiftForm.classList.add("editing");
  elements.shiftFormKicker.textContent = "Редактирование";
  elements.shiftFormTitle.textContent = "Изменить смену";
  elements.shiftSubmit.textContent = "Сохранить смену";
  elements.cancelShiftEdit.hidden = false;
  setFormValues(elements.shiftForm, {
    date: shift.date,
    start: shift.start || "",
    end: shift.end || "",
    platform: shiftPlatform(shift),
    grossAmount: shiftRevenueForPlatform(shift),
    km: shift.km || "",
  });
  updateShiftAutoSummary();
  elements.shiftForm.scrollIntoView({ behavior: "smooth", block: "start" });
  renderShiftTables();
}

function editExpense(index) {
  const expense = expenses[index];
  if (!expense) return;

  editingExpenseIndex = index;
  elements.expenseForm.classList.add("editing");
  elements.expenseFormKicker.textContent = "Редактирование";
  elements.expenseFormTitle.textContent = "Изменить расход";
  elements.expenseSubmit.textContent = "Сохранить расход";
  elements.cancelExpenseEdit.hidden = false;
  setFormValues(elements.expenseForm, {
    date: expense.date,
    category: expense.category,
    description: expense.description,
    amount: expense.amount || "",
    payment: expense.payment,
    comment: expense.comment,
  });
  elements.expenseForm.scrollIntoView({ behavior: "smooth", block: "start" });
  renderShiftTables();
}

function parseLocalNumber(value) {
  const normalized = String(value || "").replace(/\u00a0/g, "").replace(/\s/g, "").replace(",", ".");
  const number = Number(normalized);
  return Number.isFinite(number) ? number : 0;
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function parseSheetDate(value) {
  const match = String(value || "").match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return "";
  return `${match[3]}-${match[2]}-${match[1]}`;
}

function shiftsFromCSV(text) {
  return parseCSV(text)
    .slice(2)
    .filter((row) => parseSheetDate(row[0]))
    .map((row) =>
      normalizeShift({
        date: parseSheetDate(row[0]),
        weekday: row[1],
        start: row[2],
        end: row[3],
        hours: parseLocalNumber(row[4]),
        ordersBolt: parseLocalNumber(row[5]),
        ordersUklon: parseLocalNumber(row[6]),
        ordersCash: parseLocalNumber(row[7]),
        grossBolt: parseLocalNumber(row[8]),
        grossUklon: parseLocalNumber(row[9]),
        grossCash: parseLocalNumber(row[10]),
        gross: parseLocalNumber(row[11]),
        rent: parseLocalNumber(row[12]),
        fuel: parseLocalNumber(row[13]),
        other: parseLocalNumber(row[14]),
        netValue: row[16] ? parseLocalNumber(row[16]) : undefined,
        km: parseLocalNumber(row[17]),
        comment: row[18] || "",
      }),
    );
}

function expensesFromCSV(text) {
  return parseCSV(text)
    .slice(2)
    .filter((row) => parseSheetDate(row[0]) && (parseLocalNumber(row[3]) > 0 || row[1]))
    .map((row) =>
      normalizeExpense({
        date: parseSheetDate(row[0]),
        category: row[1],
        description: row[2],
        amount: parseLocalNumber(row[3]),
        payment: row[4],
        comment: row[5],
      }),
    );
}

elements.periodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activePeriod = button.dataset.period;
    periodAnchorDate = new Date(`${selectedDay || latestDataDate()}T12:00`);
    elements.periodButtons.forEach((item) => item.classList.toggle("active", item === button));
    updatePeriodControls();
    setCalendarOpen(false);
    renderAll();
  });
});

elements.periodLabel?.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  event.stopPropagation();
  setCalendarOpen(elements.calendarPopover.hidden);
});

elements.periodLabel?.addEventListener("keydown", (event) => {
  if (!["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  setCalendarOpen(elements.calendarPopover.hidden);
});

elements.calendarPresetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyCalendarPeriod(button.dataset.calendarPeriod);
    updatePeriodControls();
    setCalendarOpen(false);
    renderAll();
  });
});

document.addEventListener("click", (event) => {
  if (!elements.calendarMenu || elements.calendarMenu.contains(event.target)) return;
  setCalendarOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  setCalendarOpen(false);
  setSideMenuOpen(false);
});

elements.dayPicker?.addEventListener("change", () => {
  selectedDay = elements.dayPicker.value || latestDataDate();
  activePeriod = "day";
  updatePeriodControls();
  renderAll();
});

elements.rangeStart?.addEventListener("change", () => {
  customRangeStart = elements.rangeStart.value;
  activePeriod = "custom";
  updatePeriodControls();
  renderAll();
});

elements.rangeEnd?.addEventListener("change", () => {
  customRangeEnd = elements.rangeEnd.value;
  activePeriod = "custom";
  updatePeriodControls();
  renderAll();
});

elements.prevPeriod?.addEventListener("click", () => {
  shiftVisiblePeriod(-1);
});

elements.nextPeriod?.addEventListener("click", () => {
  shiftVisiblePeriod(1);
});

elements.viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setView(button.dataset.view);
    setSideMenuOpen(false);
  });
});

elements.menuToggle?.addEventListener("click", () => {
  setSideMenuOpen(!elements.sideMenu?.classList.contains("open"));
});

elements.menuClose?.addEventListener("click", () => {
  setSideMenuOpen(false);
});

elements.menuOverlay?.addEventListener("click", () => {
  setSideMenuOpen(false);
});

document.addEventListener(
  "touchstart",
  (event) => {
    const touch = event.touches?.[0];
    if (!touch) return;
    menuTouchStart = {
      x: touch.clientX,
      y: touch.clientY,
      at: Date.now(),
      eligible: touch.clientX <= 26 || elements.sideMenu?.classList.contains("open"),
      handled: false,
    };
  },
  { passive: true },
);

document.addEventListener(
  "touchmove",
  (event) => {
    if (!menuTouchStart?.eligible) return;
    const touch = event.touches?.[0];
    if (!touch) return;

    const dx = touch.clientX - menuTouchStart.x;
    const dy = touch.clientY - menuTouchStart.y;
    const isHorizontal = Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.6;
    if (!isHorizontal) return;

    const isOpen = elements.sideMenu?.classList.contains("open");
    if (!isOpen && dx > 64) {
      event.preventDefault();
      menuTouchStart.handled = true;
      setSideMenuOpen(true);
    }
  },
  { passive: false },
);

document.addEventListener(
  "touchend",
  () => {
    menuTouchStart = null;
  },
  { passive: true },
);

elements.runnerPlatformButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedRunnerPlatform = button.dataset.runPlatform;
    updateRunnerPlatformButtons();
  });
});

elements.startShiftButton?.addEventListener("click", () => {
  startRunnerShift();
});

elements.finishShiftButton?.addEventListener("click", () => {
  finishRunnerShift();
});

elements.cancelFinishShift?.addEventListener("click", () => {
  pendingShiftFinish = null;
  renderShiftRunner();
});

function setView(view) {
  const nextView = ["data", "history"].includes(view) ? view : "dashboard";
  elements.viewButtons.forEach((item) => item.classList.toggle("active", item.dataset.view === nextView));
  elements.viewPanels.forEach((panel) => panel.classList.toggle("active", panel.dataset.viewPanel === nextView));
  elements.statsPeriodControls?.classList.toggle("hidden", nextView !== "dashboard");
  if (nextView !== "dashboard") setCalendarOpen(false);
  syncTelegramBackButton(nextView);
}

function setSideMenuOpen(isOpen) {
  if (!elements.sideMenu || !elements.menuOverlay || !elements.menuToggle) return;
  elements.sideMenu.classList.toggle("open", isOpen);
  elements.sideMenu.setAttribute("aria-hidden", String(!isOpen));
  elements.menuToggle.setAttribute("aria-expanded", String(isOpen));
  elements.menuOverlay.hidden = !isOpen;
}

function updatePeriodControls() {
  elements.periodButtons.forEach((item) => item.classList.toggle("active", item.dataset.period === activePeriod));
  elements.dayPickerWrap?.classList.toggle("active", activePeriod === "day");
  elements.calendarPresetButtons.forEach((item) => {
    item.classList.toggle("active", isCalendarPresetActive(item.dataset.calendarPeriod));
  });
  if (elements.periodLabel) elements.periodLabel.textContent = periodLabel(activePeriod);
  const canNavigate = ["day", "week", "month", "year"].includes(activePeriod);
  if (elements.prevPeriod) elements.prevPeriod.disabled = !canNavigate;
  if (elements.nextPeriod) elements.nextPeriod.disabled = !canNavigate;

  if (elements.dayPicker) elements.dayPicker.value = selectedDay;
  if (elements.rangeStart && !elements.rangeStart.value) {
    elements.rangeStart.value = customRangeStart || latestDataDate();
    customRangeStart = elements.rangeStart.value;
  }
  if (elements.rangeEnd && !elements.rangeEnd.value) {
    elements.rangeEnd.value = customRangeEnd || latestDataDate();
    customRangeEnd = elements.rangeEnd.value;
  }
}

function setCalendarOpen(isOpen) {
  if (!elements.calendarPopover || !elements.periodLabel) return;
  elements.calendarPopover.hidden = !isOpen;
  elements.periodLabel.setAttribute("aria-expanded", String(isOpen));
}

function applyCalendarPeriod(period) {
  if (period === "today") {
    selectedDay = dateKey(new Date());
    periodAnchorDate = new Date(`${selectedDay}T12:00`);
    activePeriod = "day";
    return;
  }

  if (period === "yesterday") {
    selectedDay = dateKey(addDays(new Date(), -1));
    periodAnchorDate = new Date(`${selectedDay}T12:00`);
    activePeriod = "day";
    return;
  }

  if (period === "prevWeek") {
    const previousWeekDay = addDays(weekStart(new Date()), -1);
    periodAnchorDate = previousWeekDay;
    selectedDay = dateKey(previousWeekDay);
    activePeriod = "week";
    return;
  }

  if (period === "prevMonth") {
    const previousMonth = monthStart(new Date());
    previousMonth.setDate(0);
    periodAnchorDate = previousMonth;
    selectedDay = dateKey(previousMonth);
    activePeriod = "month";
    return;
  }

  if (period === "prevYear") {
    const previousYear = yearStart(new Date());
    previousYear.setDate(0);
    periodAnchorDate = previousYear;
    selectedDay = dateKey(previousYear);
    activePeriod = "year";
    return;
  }

  activePeriod = period;
}

function isCalendarPresetActive(period) {
  const today = dateKey(new Date());
  const yesterday = dateKey(addDays(new Date(), -1));

  if (period === "today") return activePeriod === "day" && selectedDay === today;
  if (period === "yesterday") return activePeriod === "day" && selectedDay === yesterday;
  if (period === "prevWeek") {
    const previousWeekStart = dateKey(addDays(weekStart(new Date()), -7));
    return activePeriod === "week" && dateKey(periodBounds("week").start) === previousWeekStart;
  }
  if (period === "prevMonth") {
    const previousMonthStart = monthStart(new Date());
    previousMonthStart.setMonth(previousMonthStart.getMonth() - 1);
    return activePeriod === "month" && dateKey(periodBounds("month").start) === dateKey(previousMonthStart);
  }
  if (period === "prevYear") {
    const previousYearStart = yearStart(new Date());
    previousYearStart.setFullYear(previousYearStart.getFullYear() - 1);
    return activePeriod === "year" && dateKey(periodBounds("year").start) === dateKey(previousYearStart);
  }
  return activePeriod === period;
}

function shiftVisiblePeriod(direction) {
  if (activePeriod === "day") {
    const next = addDays(new Date(`${selectedDay}T12:00`), direction);
    selectedDay = dateKey(next);
    periodAnchorDate = new Date(`${selectedDay}T12:00`);
  } else if (activePeriod === "week") {
    periodAnchorDate = addDays(periodAnchorDate, direction * 7);
  } else if (activePeriod === "month") {
    const next = new Date(periodAnchorDate);
    next.setMonth(next.getMonth() + direction);
    periodAnchorDate = next;
  } else if (activePeriod === "year") {
    const next = new Date(periodAnchorDate);
    next.setFullYear(next.getFullYear() + direction);
    periodAnchorDate = next;
  } else {
    return;
  }

  updatePeriodControls();
  renderAll();
}

function isSameDate(first, second) {
  return first === second;
}

function fullDateLabel(value) {
  return new Date(`${value}T12:00`).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

function periodLabel(period) {
  const today = dateKey(new Date());
  const yesterday = dateKey(addDays(new Date(), -1));

  if (period === "day") {
    if (isSameDate(selectedDay, today)) return "Сегодня";
    if (isSameDate(selectedDay, yesterday)) return "Вчера";
    return fullDateLabel(selectedDay);
  }

  if (period === "week") {
    const { start, end } = periodBounds("week");
    const currentWeekStart = weekStart(new Date());
    if (dateKey(start) === dateKey(currentWeekStart)) return "Текущая неделя";
    return `${formatShortDate(dateKey(start))} - ${formatShortDate(dateKey(end))}`;
  }

  if (period === "month") {
    const current = new Date(periodAnchorDate);
    return current.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
  }

  if (period === "year") {
    return String(periodAnchorDate.getFullYear());
  }

  if (period === "all") return "За всё время";
  if (period === "today") return "Сегодня";
  if (period === "yesterday") return "Вчера";
  if (period === "prevWeek") return "Прошлая неделя";
  if (period === "prevMonth") return "Прошлый месяц";
  if (period === "prevYear") return "Прошлый год";
  if (period === "custom") {
    const from = customRangeStart || latestDataDate();
    const to = customRangeEnd || from;
    return `${fullDateLabel(from)} - ${fullDateLabel(to)}`;
  }
  return "Период";
}

function updateDayPickerVisibility() {
  updatePeriodControls();
}

window.addEventListener("hashchange", () => {
  setView(location.hash.replace("#", ""));
});

elements.shiftForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(elements.shiftForm);
  let nextShift = shiftFromForm(formData);

  if (editingShiftIndex >= 0) {
    nextShift.remoteId = shifts[editingShiftIndex]?.remoteId;
    nextShift = await saveShiftToCloud(nextShift);
    shifts[editingShiftIndex] = nextShift;
  } else {
    nextShift = await saveShiftToCloud(nextShift);
    shifts.push(nextShift);
    await sendToGoogleSheet("shift", nextShift);
  }

  saveShifts();
  resetShiftForm();
  selectedDay = latestDataDate();
  if (elements.dayPicker) elements.dayPicker.value = selectedDay;
  renderAll();
});

elements.finishShiftForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!pendingShiftFinish) return;

  const formData = new FormData(elements.finishShiftForm);
  let nextShift = runnerShiftFromForm(formData);
  nextShift = await saveShiftToCloud(nextShift);
  shifts.push(nextShift);
  await sendToGoogleSheet("shift", nextShift);

  saveShifts();
  clearActiveShift();
  pendingShiftFinish = null;
  selectedDay = latestDataDate();
  periodAnchorDate = new Date(`${selectedDay}T12:00`);
  if (elements.dayPicker) elements.dayPicker.value = selectedDay;
  renderShiftRunner();
  renderAll();
});

elements.csvImport.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const imported = shiftsFromCSV(await file.text());
  if (imported.length) {
    resetShiftForm();
    shifts = imported;
    await replaceCloudTable("shifts", shifts);
    selectedDay = latestDataDate();
    if (elements.dayPicker) elements.dayPicker.value = selectedDay;
    saveShifts();
    saveCsvSyncMeta("shifts", imported.length);
    renderAll();
  }

  event.target.value = "";
});

elements.expenseImport.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const imported = expensesFromCSV(await file.text());
  if (imported.length) {
    resetExpenseForm();
    expenses = imported;
    await replaceCloudTable("expenses", expenses);
    saveExpenses();
    saveCsvSyncMeta("expenses", imported.length);
    renderAll();
  }

  event.target.value = "";
});

elements.importShiftsButton.addEventListener("click", () => {
  elements.csvImport.click();
});

elements.importExpensesButton.addEventListener("click", () => {
  elements.expenseImport.click();
});

elements.goalInput?.addEventListener("change", () => {
  saveMonthGoal(Number(elements.goalInput.value));
  scheduleSettingsSave();
  renderAll();
});

elements.goalInput?.addEventListener("input", () => {
  const nextGoal = Number(elements.goalInput.value);
  if (!Number.isFinite(nextGoal) || nextGoal <= 0) return;
  saveMonthGoal(nextGoal);
  scheduleSettingsSave();
  renderAll();
});

elements.expenseForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(elements.expenseForm);
  let nextExpense = expenseFromForm(formData);

  if (editingExpenseIndex >= 0) {
    nextExpense.remoteId = expenses[editingExpenseIndex]?.remoteId;
    nextExpense = await saveExpenseToCloud(nextExpense);
    expenses[editingExpenseIndex] = nextExpense;
  } else {
    nextExpense = await saveExpenseToCloud(nextExpense);
    expenses.push(nextExpense);
    await sendToGoogleSheet("expense", nextExpense);
  }

  saveExpenses();
  resetExpenseForm();
  renderAll();
});

elements.startInput.addEventListener("input", () => {
  updateShiftAutoSummary();
});

elements.endInput.addEventListener("input", () => {
  updateShiftAutoSummary();
});

elements.grossAmountInput.addEventListener("input", () => {
  updateShiftAutoSummary();
});

elements.rawShiftList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-edit-index]");
  if (!button) return;

  editShift(Number(button.dataset.editIndex));
});

elements.rawShiftList.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-delete-index]");
  if (!button) return;

  const deleteIndex = Number(button.dataset.deleteIndex);
  const [deletedShift] = shifts.splice(deleteIndex, 1);
  await deleteCloudRow("shifts", deletedShift?.remoteId);
  if (editingShiftIndex === deleteIndex) resetShiftForm();
  if (editingShiftIndex > deleteIndex) editingShiftIndex -= 1;
  selectedDay = latestDataDate();
  if (elements.dayPicker) elements.dayPicker.value = selectedDay;
  saveShifts();
  renderAll();
});

elements.rawShiftList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-edit-expense-index]");
  if (!button) return;

  editExpense(Number(button.dataset.editExpenseIndex));
});

elements.rawShiftList.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-delete-expense-index]");
  if (!button) return;

  const deleteIndex = Number(button.dataset.deleteExpenseIndex);
  const [deletedExpense] = expenses.splice(deleteIndex, 1);
  await deleteCloudRow("expenses", deletedExpense?.remoteId);
  if (editingExpenseIndex === deleteIndex) resetExpenseForm();
  if (editingExpenseIndex > deleteIndex) editingExpenseIndex -= 1;
  saveExpenses();
  renderAll();
});

elements.cancelShiftEdit.addEventListener("click", () => {
  resetShiftForm();
  renderShiftTables();
});

elements.cancelExpenseEdit.addEventListener("click", () => {
  resetExpenseForm();
  renderShiftTables();
});

elements.clearData.addEventListener("click", async () => {
  shifts = [];
  expenses = [];
  selectedDay = dateKey(new Date());
  if (elements.dayPicker) elements.dayPicker.value = selectedDay;
  resetShiftForm();
  resetExpenseForm();
  await Promise.all([replaceCloudTable("shifts", shifts), replaceCloudTable("expenses", expenses)]);
  saveShifts();
  saveExpenses();
  renderAll();
});

resetShiftForm();
resetExpenseForm();
renderShiftRunner();
if (elements.dayPicker) elements.dayPicker.value = selectedDay;
setupTelegramMiniApp();
preventAccidentalZoom();
updateDayPickerVisibility();
setView(location.hash.replace("#", ""));
renderCsvSyncStatus();
renderAll();
loadCloudData().then(async (isCloudReady) => {
  if (isCloudReady) {
    const hasCloudSettings = await loadCloudSettings();
    setupRealtimeSync({ includeSettings: hasCloudSettings });
  }
});
