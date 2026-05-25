const STORAGE_KEY = "taxiProfit.shifts.v3";
const EXPENSE_STORAGE_KEY = "taxiProfit.expenses.v1";
const CSV_SYNC_STORAGE_KEY = "taxiProfit.csvSync.v1";
const GOAL_STORAGE_KEY = "taxiProfit.weeklyGoal.v1";
const LEGACY_GOAL_STORAGE_KEY = "taxiProfit.monthGoal.v1";
const ACTIVE_SHIFT_STORAGE_KEY = "taxiProfit.activeShift.v1";
const PROFILE_STORAGE_KEY = "taxiProfit.profile.v1";
const ONBOARDING_DRAFT_STORAGE_KEY = "taxiProfit.onboardingDraft.v1";
const DEFAULT_WEEKLY_GOAL = 10000;
const ONBOARDING_STEPS = ["welcome", "carType", "vehicle", "rent", "platforms"];
const CAR_CATALOG = {
  Toyota: ["Prius", "Camry", "Corolla", "RAV4", "Auris", "Другое"],
  Hyundai: ["Elantra", "Sonata", "Ioniq", "Accent", "Tucson", "Другое"],
  Kia: ["Ceed", "Optima", "K5", "Rio", "Niro", "Другое"],
  Renault: ["Logan", "Megane", "Fluence", "Duster", "Другое"],
  Skoda: ["Octavia", "Rapid", "Fabia", "Superb", "Другое"],
  Volkswagen: ["Jetta", "Passat", "Golf", "Polo", "Другое"],
  Nissan: ["Leaf", "Rogue", "Qashqai", "Sentra", "Другое"],
  Chevrolet: ["Lacetti", "Cruze", "Aveo", "Volt", "Другое"],
  Ford: ["Focus", "Fusion", "Mondeo", "C-Max", "Другое"],
  Tesla: ["Model 3", "Model Y", "Model S", "Другое"],
  BYD: ["Dolphin", "Qin", "Song", "Seal", "Другое"],
  Другое: ["Другое"],
};
const CAR_YEAR_START = 1995;
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
const heatHours = ["00", "08", "12", "16", "20"];

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
  sideUserAvatar: document.querySelector("#sideUserAvatar"),
  sideUserName: document.querySelector("#sideUserName"),
  sideUserSubtitle: document.querySelector("#sideUserSubtitle"),
  shiftRunnerStates: document.querySelectorAll("[data-runner-state]"),
  runnerPlatformButtons: document.querySelectorAll("[data-run-platform]"),
  startShiftButton: document.querySelector("#startShiftButton"),
  finishShiftButton: document.querySelector("#finishShiftButton"),
  cancelActiveShiftButton: document.querySelector("#cancelActiveShiftButton"),
  finishShiftForm: document.querySelector("#finishShiftForm"),
  cancelFinishShift: document.querySelector("#cancelFinishShift"),
  startOdometer: document.querySelector("#startOdometer"),
  activePlatform: document.querySelector("#activePlatform"),
  activeTimer: document.querySelector("#activeTimer"),
  activeShiftMeta: document.querySelector("#activeShiftMeta"),
  finishShiftTitle: document.querySelector("#finishShiftTitle"),
  finishShiftMeta: document.querySelector("#finishShiftMeta"),
  homeNetProfit: document.querySelector("#homeNetProfit"),
  homeProfitFormula: document.querySelector("#homeProfitFormula"),
  homeProfitDelta: document.querySelector("#homeProfitDelta"),
  homeTodayNetValue: document.querySelector("#homeTodayNetValue"),
  homeWeeklyGoalLeft: document.querySelector("#homeWeeklyGoalLeft"),
  homeWeekNet: document.querySelector("#homeWeekNet"),
  homeGoalPercent: document.querySelector("#homeGoalPercent"),
  homeGoalProgress: document.querySelector("#homeGoalProgress"),
  homeGoalText: document.querySelector("#homeGoalText"),
  homeForecast: document.querySelector("#homeForecast"),
  homePaceLabel: document.querySelector("#homePaceLabel"),
  homeForecastText: document.querySelector("#homeForecastText"),
  homeWeekOrders: document.querySelector("#homeWeekOrders"),
  homeWeekHours: document.querySelector("#homeWeekHours"),
  homeWeekOps: document.querySelector("#homeWeekOps"),
  homeAvgHourValue: document.querySelector("#homeAvgHourValue"),
  homeAvgHourText: document.querySelector("#homeAvgHourText"),
  homeAvgOrderText: document.querySelector("#homeAvgOrderText"),
  homeWeekCleanText: document.querySelector("#homeWeekCleanText"),
  homeOpsText: document.querySelector("#homeOpsText"),
  homeKmPriceText: document.querySelector("#homeKmPriceText"),
  homeMiniBars: document.querySelector("#homeMiniBars"),
  homeMiniStartLabel: document.querySelector("#homeMiniStartLabel"),
  homeMiniEndLabel: document.querySelector("#homeMiniEndLabel"),
  homeMiniMaxLabel: document.querySelector("#homeMiniMaxLabel"),
  homeBestDayLabel: document.querySelector("#homeBestDayLabel"),
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
  goalProgressSecondary: document.querySelector("#goalProgressSecondary"),
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
  appShell: document.querySelector(".app-shell"),
  pullRefresh: document.querySelector("#pullRefresh"),
  appPickerSheet: document.querySelector("#appPickerSheet"),
  appPickerTitle: document.querySelector("#appPickerTitle"),
  appPickerBody: document.querySelector("#appPickerBody"),
  appPickerButtons: document.querySelectorAll("[data-picker-target]"),
  profileButton: document.querySelector("#profileButton"),
  authForm: document.querySelector("#authForm"),
  authOverlay: document.querySelector("#authOverlay"),
  authStartButton: document.querySelector("#authStartButton"),
  authMessage: document.querySelector("#authMessage"),
  authStatusTitle: document.querySelector("#authStatusTitle"),
  authStatusText: document.querySelector("#authStatusText"),
  signOutButton: document.querySelector("#signOutButton"),
  editProfileButton: document.querySelector("#editProfileButton"),
  cancelProfileEdit: document.querySelector("#cancelProfileEdit"),
  deleteProfileButton: document.querySelector("#deleteProfileButton"),
  profileSummaryCard: document.querySelector("#profileSummaryCard"),
  profileRegisteredStatus: document.querySelector("#profileRegisteredStatus"),
  profileOdometerLabel: document.querySelector("#profileOdometerLabel"),
  profileFuelLabel: document.querySelector("#profileFuelLabel"),
  profileSessionLabel: document.querySelector("#profileSessionLabel"),
  profileSessionText: document.querySelector("#profileSessionText"),
  profileForm: document.querySelector("#profileForm"),
  profileTelegramId: document.querySelector("#profileTelegramId"),
  profileSupabaseId: document.querySelector("#profileSupabaseId"),
  profileDriverLabel: document.querySelector("#profileDriverLabel"),
  profileCarLabel: document.querySelector("#profileCarLabel"),
  profileSaveStatus: document.querySelector("#profileSaveStatus"),
  onboardingOverlay: document.querySelector("#onboardingOverlay"),
  onboardingProgress: document.querySelector("#onboardingProgress"),
  onboardingSteps: document.querySelectorAll("[data-onboarding-step]"),
  onboardingStart: document.querySelector("#onboardingStart"),
  onboardingBack: document.querySelector("#onboardingBack"),
  onboardingNext: document.querySelector("#onboardingNext"),
  onboardingChoiceButtons: document.querySelectorAll("[data-choice-group] button"),
  onboardingCarBrand: document.querySelector("#onboardingCarBrand"),
  onboardingCarModel: document.querySelector("#onboardingCarModel"),
  onboardingCarYear: document.querySelector("#onboardingCarYear"),
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
let weeklyGoal = loadWeeklyGoal();
let realtimeClient = null;
let realtimeReloadTimer = null;
let cloudLoadedOnce = false;
let menuTouchStart = null;
let pickerState = { target: null, type: null, month: null, hour: "00", minute: "00", wheelTimer: null };
let pullRefreshState = { startY: 0, pulling: false, ready: false, loading: false };
let settingsSaveTimer = null;
let authClient = null;
let currentSession = null;
let currentUser = null;
let userProfile = loadLocalProfile();
let isProfileEditing = false;
let authReady = false;
let onboardingStepIndex = 0;
let onboardingDraft = loadOnboardingDraft();

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

function loadWeeklyGoal() {
  const saved = Number(readStorage(GOAL_STORAGE_KEY));
  if (Number.isFinite(saved) && saved > 0) return saved;

  const legacy = Number(readStorage(LEGACY_GOAL_STORAGE_KEY));
  if (Number.isFinite(legacy) && legacy > 0 && legacy < 30000) return legacy;

  return DEFAULT_WEEKLY_GOAL;
}

function saveWeeklyGoal(value) {
  weeklyGoal = Number.isFinite(value) && value > 0 ? value : DEFAULT_WEEKLY_GOAL;
  writeStorage(String(weeklyGoal), GOAL_STORAGE_KEY);
}

function loadLocalProfile() {
  const saved = readStorage(PROFILE_STORAGE_KEY);
  if (!saved) return {};

  try {
    const parsed = JSON.parse(saved);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveLocalProfile(profile) {
  userProfile = { ...userProfile, ...(profile || {}) };
  writeStorage(JSON.stringify(userProfile), PROFILE_STORAGE_KEY);
}

function loadOnboardingDraft() {
  const saved = readStorage(ONBOARDING_DRAFT_STORAGE_KEY);
  if (!saved) return {};

  try {
    const parsed = JSON.parse(saved);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveOnboardingDraft() {
  writeStorage(JSON.stringify(onboardingDraft), ONBOARDING_DRAFT_STORAGE_KEY);
}

function clearOnboardingDraft() {
  onboardingDraft = {};
  try {
    localStorage.removeItem(ONBOARDING_DRAFT_STORAGE_KEY);
  } catch {
    writeStorage("", ONBOARDING_DRAFT_STORAGE_KEY);
  }
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

function getTelegramUser() {
  return telegramApp?.initDataUnsafe?.user || null;
}

function telegramDisplayName(user = getTelegramUser()) {
  if (!user) return "";
  return [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username || "";
}

function telegramProfilePayload(user = getTelegramUser()) {
  if (!user) return {};

  return {
    telegram_id: user.id ? Number(user.id) : null,
    telegram_username: user.username || "",
    display_name: telegramDisplayName(user),
    avatar_url: user.photo_url || "",
  };
}

function syncTelegramBackButton(view = location.hash.replace("#", "")) {
  if (!telegramApp?.BackButton) return;

  if (view !== "home") {
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

  const user = getTelegramUser();
  if (user && elements.profileButton) {
    const initials = initialsFromTelegramUser(user);
    const displayName = [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username || "TaxiProfit";
    elements.profileButton.textContent = initials;
    elements.profileButton.setAttribute(
      "aria-label",
      `Профиль Telegram: ${displayName}`,
    );
    if (elements.sideUserAvatar) {
      elements.sideUserAvatar.textContent = initials;
      if (user.photo_url) {
        elements.sideUserAvatar.style.backgroundImage = `url("${user.photo_url}")`;
        elements.sideUserAvatar.textContent = "";
      }
    }
    if (elements.sideUserName) elements.sideUserName.textContent = displayName;
    if (elements.sideUserSubtitle) elements.sideUserSubtitle.textContent = user.username ? `@${user.username}` : "Кабинет водителя";
  }

  telegramApp.ready?.();
  telegramApp.expand?.();
  telegramApp.disableVerticalSwipes?.();
  telegramApp.onEvent?.("themeChanged", applyTelegramTheme);
  telegramApp.onEvent?.("viewportChanged", updateTelegramViewport);
  telegramApp.BackButton?.onClick?.(() => {
    setView("home");
    history.replaceState(null, "", "#home");
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

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol === "file:") return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.warn("Service worker registration failed.", error);
    });
  });
}

function pickerFieldFromPath(path) {
  const [formName, fieldName] = String(path || "").split(".");
  const form = elements[formName];
  return form?.elements?.[fieldName] || null;
}

function formatPickerDate(value) {
  if (!value) return "Дата";
  return new Date(`${value}T12:00`)
    .toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
    .replace(/\s?г\.$/, "");
}

function pickerLabel(field, type) {
  if (!field) return "";
  if (type === "date") return formatPickerDate(field.value);
  if (type === "select") return field.selectedOptions?.[0]?.textContent || field.value || "Выбрать";
  return field.value || "Время";
}

function syncAppPickers() {
  elements.appPickerButtons.forEach((button) => {
    const field = pickerFieldFromPath(button.dataset.pickerTarget);
    const label = button.querySelector("[data-picker-label]");
    if (label) label.textContent = pickerLabel(field, button.dataset.picker);
  });
}

function closeAppPicker() {
  if (pickerState.wheelTimer) window.clearTimeout(pickerState.wheelTimer);
  pickerState = { target: null, type: null, month: null, hour: "00", minute: "00", wheelTimer: null };
  if (elements.appPickerSheet) elements.appPickerSheet.hidden = true;
  if (elements.appPickerBody) elements.appPickerBody.innerHTML = "";
}

function setPickerValue(value) {
  const field = pickerState.target;
  if (!field) return;
  field.value = value;
  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new Event("change", { bubbles: true }));
  syncAppPickers();
  closeAppPicker();
}

function renderDatePicker() {
  const field = pickerState.target;
  const selected = field?.value || dateKey(new Date());
  if (!pickerState.month) pickerState.month = new Date(`${selected}T12:00`);
  const month = new Date(pickerState.month.getFullYear(), pickerState.month.getMonth(), 1, 12);
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const offset = (month.getDay() + 6) % 7;
  const monthLabel = month.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
  const blanks = Array.from({ length: offset }, () => `<span class="picker-empty"></span>`).join("");
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const value = dateKey(new Date(month.getFullYear(), month.getMonth(), day, 12));
    return `<button class="picker-day ${value === selected ? "active" : ""}" type="button" data-picker-value="${value}">${day}</button>`;
  }).join("");

  elements.appPickerBody.innerHTML = `
    <div class="picker-calendar-head">
      <button type="button" data-picker-month="-1" aria-label="Предыдущий месяц">‹</button>
      <strong>${monthLabel}</strong>
      <button type="button" data-picker-month="1" aria-label="Следующий месяц">›</button>
    </div>
    <div class="picker-weekdays" aria-hidden="true">
      <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
    </div>
    <div class="picker-days">${blanks}${days}</div>
  `;
}

function renderTimePicker() {
  const selected = pickerState.target?.value || "17:30";
  const [selectedHour = "17", selectedMinute = "30"] = selected.split(":");
  pickerState.hour = selectedHour.padStart(2, "0");
  pickerState.minute = selectedMinute.padStart(2, "0");
  const hours = Array.from({ length: 24 }, (_, hour) => String(hour).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, minute) => String(minute).padStart(2, "0"));
  const column = (label, values, active, key) => `
    <div class="time-wheel-column" data-time-column="${key}">
      <span>${label}</span>
      <div class="time-wheel-scroll" data-time-scroll="${key}" tabindex="0" aria-label="${label}">
        <div class="time-wheel-spacer" aria-hidden="true"></div>
        ${values.map((value) => `
          <button class="time-wheel-option ${value === active ? "active" : ""}" type="button" data-time-part="${key}" data-time-value="${value}">
            ${value}
          </button>
        `).join("")}
        <div class="time-wheel-spacer" aria-hidden="true"></div>
      </div>
    </div>
  `;

  elements.appPickerBody.innerHTML = `
    <div class="time-wheel">
      <div class="time-wheel-highlight" aria-hidden="true"></div>
      ${column("Часы", hours, pickerState.hour, "hour")}
      <span class="time-wheel-divider" aria-hidden="true">:</span>
      ${column("Минуты", minutes, pickerState.minute, "minute")}
    </div>
    <button class="submit-button picker-confirm" type="button" data-picker-time-confirm>
      Выбрать ${pickerState.hour}:${pickerState.minute}
    </button>
  `;

  window.requestAnimationFrame(() => {
    elements.appPickerBody.querySelectorAll(".time-wheel-option.active").forEach((option) => {
      option.scrollIntoView({ block: "center" });
    });
  });
}

function updateTimeWheelClasses(part, value) {
  pickerState[part] = value;
  elements.appPickerBody.querySelectorAll(`[data-time-part="${part}"]`).forEach((option) => {
    option.classList.toggle("active", option.dataset.timeValue === value);
  });
  const confirm = elements.appPickerBody.querySelector("[data-picker-time-confirm]");
  if (confirm) confirm.textContent = `Выбрать ${pickerState.hour}:${pickerState.minute}`;
}

function selectNearestTimeWheelValue(scroll) {
  const part = scroll.dataset.timeScroll;
  const options = [...scroll.querySelectorAll(".time-wheel-option")];
  const scrollCenter = scroll.getBoundingClientRect().top + scroll.clientHeight / 2;
  const nearest = options
    .map((option) => {
      const rect = option.getBoundingClientRect();
      return { option, distance: Math.abs(rect.top + rect.height / 2 - scrollCenter) };
    })
    .sort((a, b) => a.distance - b.distance)[0]?.option;

  if (nearest) updateTimeWheelClasses(part, nearest.dataset.timeValue);
}

function renderSelectPicker() {
  const field = pickerState.target;
  const options = [...(field?.options || [])].map((option) => {
    const selected = option.value === field.value;
    return `<button class="picker-option ${selected ? "active" : ""}" type="button" data-picker-value="${option.value}">${option.textContent}</button>`;
  });
  elements.appPickerBody.innerHTML = `<div class="picker-options-grid select-grid">${options.join("")}</div>`;
}

function openAppPicker(button) {
  const field = pickerFieldFromPath(button.dataset.pickerTarget);
  if (!field || !elements.appPickerSheet) return;
  pickerState = {
    target: field,
    type: button.dataset.picker,
    month: button.dataset.picker === "date" && field.value ? new Date(`${field.value}T12:00`) : new Date(),
    hour: "00",
    minute: "00",
    wheelTimer: null,
  };
  elements.appPickerTitle.textContent = button.closest("label")?.childNodes?.[0]?.textContent?.trim() || "Выбор";
  elements.appPickerSheet.hidden = false;
  if (pickerState.type === "date") renderDatePicker();
  if (pickerState.type === "time") renderTimePicker();
  if (pickerState.type === "select") renderSelectPicker();
}

function setupAppPickers() {
  elements.appPickerButtons.forEach((button) => {
    button.addEventListener("click", () => openAppPicker(button));
  });

  elements.appPickerSheet?.addEventListener("click", (event) => {
    const close = event.target.closest("[data-picker-close]");
    if (close) {
      closeAppPicker();
      return;
    }

    const monthButton = event.target.closest("[data-picker-month]");
    if (monthButton) {
      pickerState.month = new Date(
        pickerState.month.getFullYear(),
        pickerState.month.getMonth() + Number(monthButton.dataset.pickerMonth),
        1,
        12,
      );
      renderDatePicker();
      return;
    }

    const timePartButton = event.target.closest("[data-time-value]");
    if (timePartButton) {
      const part = timePartButton.dataset.timePart;
      updateTimeWheelClasses(part, timePartButton.dataset.timeValue);
      timePartButton.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const timeConfirm = event.target.closest("[data-picker-time-confirm]");
    if (timeConfirm) {
      setPickerValue(`${pickerState.hour}:${pickerState.minute}`);
      return;
    }

    const valueButton = event.target.closest("[data-picker-value]");
    if (valueButton) setPickerValue(valueButton.dataset.pickerValue);
  });

  elements.appPickerSheet?.addEventListener(
    "scroll",
    (event) => {
      const scroll = event.target.closest?.("[data-time-scroll]");
      if (!scroll) return;
      if (pickerState.wheelTimer) window.clearTimeout(pickerState.wheelTimer);
      pickerState.wheelTimer = window.setTimeout(() => selectNearestTimeWheelValue(scroll), 90);
    },
    true,
  );

  syncAppPickers();
}

async function refreshAppData() {
  if (pullRefreshState.loading) return;
  pullRefreshState.loading = true;
  elements.pullRefresh?.classList.add("visible", "loading");
  const label = elements.pullRefresh?.querySelector("strong");
  if (label) label.textContent = "Обновляем";

  try {
    const cloudReady = await loadCloudData({ applyEmpty: true, silent: true });
    if (cloudReady) await loadCloudSettings();
    renderProfile();
    renderCsvSyncStatus();
    renderAll();
  } finally {
    window.setTimeout(() => {
      pullRefreshState = { startY: 0, pulling: false, ready: false, loading: false };
      if (label) label.textContent = "Обновить";
      elements.pullRefresh?.classList.remove("visible", "loading", "ready");
    }, 420);
  }
}

function setupPullToRefresh() {
  if (!elements.appShell || !elements.pullRefresh) return;

  elements.appShell.addEventListener(
    "touchstart",
    (event) => {
      if (pullRefreshState.loading || elements.appShell.scrollTop > 2 || !event.touches?.[0]) return;
      pullRefreshState.startY = event.touches[0].clientY;
      pullRefreshState.pulling = true;
      pullRefreshState.ready = false;
    },
    { passive: true },
  );

  elements.appShell.addEventListener(
    "touchmove",
    (event) => {
      if (!pullRefreshState.pulling || !event.touches?.[0]) return;
      const distance = event.touches[0].clientY - pullRefreshState.startY;
      if (distance <= 18) return;
      event.preventDefault();
      pullRefreshState.ready = distance > 86;
      elements.pullRefresh.classList.add("visible");
      elements.pullRefresh.style.transform = `translate(-50%, ${Math.min(distance - 68, 18)}px) scale(1)`;
      const label = elements.pullRefresh.querySelector("strong");
      if (label) label.textContent = pullRefreshState.ready ? "Отпустите" : "Потяните";
    },
    { passive: false },
  );

  elements.appShell.addEventListener(
    "touchend",
    () => {
      if (!pullRefreshState.pulling) return;
      elements.pullRefresh.style.transform = "";
      if (pullRefreshState.ready) {
        refreshAppData();
        return;
      }
      pullRefreshState = { startY: 0, pulling: false, ready: false, loading: false };
      elements.pullRefresh.classList.remove("visible", "loading");
    },
    { passive: true },
  );
}

function getAuthToken() {
  return currentSession?.access_token || SUPABASE_PUBLISHABLE_KEY;
}

function getCurrentUserId() {
  return currentUser?.id || null;
}

function getTelegramId() {
  return telegramProfilePayload().telegram_id || Number(userProfile.telegramId || 0) || null;
}

function getCloudOwnerUserId() {
  return userProfile.userId || getCurrentUserId();
}

function getCloudOwnerTelegramId() {
  return getTelegramId();
}

function cloudOwnerPayload() {
  return {
    user_id: getCloudOwnerUserId(),
    telegram_id: getCloudOwnerTelegramId(),
  };
}

function cloudOwnerQuery() {
  const telegramId = getCloudOwnerTelegramId();
  const userId = getCloudOwnerUserId();
  if (telegramId && userId) {
    return `or=(telegram_id.eq.${encodeURIComponent(telegramId)},user_id.eq.${encodeURIComponent(userId)})`;
  }
  if (telegramId) return `telegram_id=eq.${encodeURIComponent(telegramId)}`;
  if (userId) return `user_id=eq.${encodeURIComponent(userId)}`;
  return "";
}

function cloudOwnerRealtimeFilter() {
  const telegramId = getCloudOwnerTelegramId();
  if (telegramId) return `telegram_id=eq.${telegramId}`;
  const userId = getCloudOwnerUserId();
  return userId ? `user_id=eq.${userId}` : "";
}

function setAuthGateOpen(isOpen) {
  if (!elements.authOverlay) return;
  elements.authOverlay.hidden = !isOpen;
  document.body.classList.toggle("auth-open", isOpen);
}

function updateAccessFlow() {
  setAuthGateOpen(false);
  renderOnboarding();
}

function createAuthClient() {
  if (authClient || !hasRealtimeClient()) return authClient;

  authClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "taxiprofit.supabase.auth",
    },
  });

  authClient.auth.onAuthStateChange(async (_event, session) => {
    currentSession = session;
    currentUser = session?.user || null;
    authReady = true;
    renderProfile();
    updateAccessFlow();
    if (currentUser) {
      await syncTelegramAuthMetadata();
      await ensureUserProfile();
      await loadCloudData({ applyEmpty: true, silent: true });
      await loadCloudSettings();
      setupRealtimeSync({ includeSettings: true });
      renderAll();
    }
  });

  return authClient;
}

async function initializeAuth() {
  const client = createAuthClient();
  if (!client) {
    authReady = true;
    renderProfile();
    updateAccessFlow();
    setSyncStatus("Supabase Auth недоступен: работаем локально.");
    return false;
  }

  try {
    const { data } = await client.auth.getSession();
    currentSession = data?.session || null;
    currentUser = currentSession?.user || null;

    if (!currentUser) {
      await signInAnonymously();
    } else {
      authReady = true;
      await syncTelegramAuthMetadata();
      await ensureUserProfile();
      renderProfile();
      updateAccessFlow();
    }
    return Boolean(currentUser);
  } catch (error) {
    authReady = true;
    renderProfile();
    updateAccessFlow();
    setSyncStatus("Auth не подключился. Проверь настройки Supabase Auth.");
    console.warn("Supabase Auth unavailable.", error);
    return false;
  }
}

async function syncTelegramAuthMetadata() {
  const client = createAuthClient();
  const telegram = telegramProfilePayload();
  if (!client || !currentUser || !telegram.telegram_id) return false;

  const metadata = currentUser.user_metadata || {};
  if (String(metadata.telegram_id || "") === String(telegram.telegram_id)) return true;

  try {
    const { data, error } = await client.auth.updateUser({
      data: {
        telegram_id: String(telegram.telegram_id),
        telegram_username: telegram.telegram_username || "",
        display_name: telegram.display_name || "",
        avatar_url: telegram.avatar_url || "",
      },
    });
    if (error) throw error;
    currentUser = data?.user || currentUser;
    const refreshed = await client.auth.refreshSession();
    if (refreshed?.data?.session) {
      currentSession = refreshed.data.session;
      currentUser = currentSession.user;
    }
    return true;
  } catch (error) {
    console.warn("Could not sync Telegram metadata with Supabase Auth.", error);
    return false;
  }
}

async function signInAnonymously() {
  const client = createAuthClient();
  if (!client) return false;

  try {
    const telegram = telegramProfilePayload();
    const { data, error } = await client.auth.signInAnonymously({
      options: {
        data: {
          telegram_id: telegram.telegram_id ? String(telegram.telegram_id) : "",
          telegram_username: telegram.telegram_username || "",
          display_name: telegram.display_name || "",
          avatar_url: telegram.avatar_url || "",
        },
      },
    });
    if (error) throw error;
    currentSession = data?.session || null;
    currentUser = data?.user || currentSession?.user || null;
    authReady = true;
    await ensureUserProfile();
    renderProfile();
    updateAccessFlow();
    return Boolean(currentUser);
  } catch (error) {
    authReady = true;
    renderProfile();
    updateAccessFlow();
    setSyncStatus("Включи Anonymous sign-ins в Supabase Auth или войди через email.");
    console.warn("Anonymous auth unavailable.", error);
    return false;
  }
}

function profileFromSupabase(row = {}) {
  return {
    userId: row.user_id || getCurrentUserId() || "",
    telegramId: row.telegram_id || "",
    telegramUsername: row.telegram_username || "",
    displayName: row.display_name || "",
    driverName: row.driver_name || "",
    carOwnership: row.car_ownership || "",
    carBrand: row.car_brand || "",
    carModel: row.car_model || "",
    carYear: row.car_year || "",
    fuelType: row.fuel_type || "",
    fuelConsumption: row.fuel_consumption || "",
    odometer: row.odometer || "",
    carNumber: row.car_number || "",
    defaultPlatform: row.default_platform || "Bolt",
    rentAmount: row.rent_amount || "",
    rentFrequency: row.rent_frequency || "",
    rentPaymentDay: row.rent_payment_day || "",
    platforms: Array.isArray(row.platforms) ? row.platforms : [],
    phone: row.phone || "",
    city: row.city || "",
    avatarUrl: row.avatar_url || "",
    weeklyGoal: Number(row.weekly_goal || weeklyGoal || DEFAULT_WEEKLY_GOAL),
    onboardingCompleted: Boolean(row.onboarding_completed),
  };
}

function profileToSupabasePayload(profile = userProfile) {
  const telegram = telegramProfilePayload();
  return {
    user_id: getCurrentUserId(),
    telegram_id: telegram.telegram_id || Number(profile.telegramId || 0) || null,
    telegram_username: telegram.telegram_username || profile.telegramUsername || "",
    display_name: profile.displayName || profile.driverName || telegram.display_name || "",
    driver_name: profile.driverName || profile.displayName || telegram.display_name || "",
    car_ownership: profile.carOwnership || "",
    car_brand: profile.carBrand || "",
    car_model: profile.carModel || "",
    car_year: Number(profile.carYear || 0) || null,
    fuel_type: profile.fuelType || "",
    fuel_consumption: Number(profile.fuelConsumption || 0) || null,
    odometer: Number(profile.odometer || 0) || null,
    car_number: profile.carNumber || "",
    default_platform: profile.defaultPlatform || selectedRunnerPlatform || "Bolt",
    rent_amount: Number(profile.rentAmount || 0) || null,
    rent_frequency: profile.rentFrequency || "",
    rent_payment_day: profile.rentPaymentDay || "",
    platforms: Array.isArray(profile.platforms) ? profile.platforms : [],
    phone: profile.phone || "",
    city: profile.city || "",
    avatar_url: telegram.avatar_url || profile.avatarUrl || "",
    weekly_goal: Number(profile.weeklyGoal || weeklyGoal || DEFAULT_WEEKLY_GOAL),
    onboarding_completed: Boolean(profile.onboardingCompleted),
  };
}

async function ensureUserProfile() {
  if (!hasCloudStorage() || !getCurrentUserId()) return false;

  try {
    const telegramId = getTelegramId();
    const filters = [`user_id.eq.${encodeURIComponent(getCurrentUserId())}`];
    if (telegramId) filters.push(`telegram_id.eq.${encodeURIComponent(telegramId)}`);
    const [row] = await cloudRequest("profiles", {
      query: `?or=(${filters.join(",")})&select=*&order=onboarding_completed.desc&limit=1`,
    });

    if (row) {
      saveLocalProfile(profileFromSupabase(row));
      if (userProfile.defaultPlatform) selectedRunnerPlatform = userProfile.defaultPlatform;
      if (Number(userProfile.weeklyGoal) > 0) saveWeeklyGoal(Number(userProfile.weeklyGoal));
      renderProfile();
      fillOnboardingInputs();
      renderOnboarding();
      return true;
    }

    const [created] = await cloudRequest("profiles", {
      method: "POST",
      body: profileToSupabasePayload({
        ...userProfile,
        weeklyGoal,
      }),
    });
    saveLocalProfile(profileFromSupabase(created));
    renderProfile();
    fillOnboardingInputs();
    renderOnboarding();
    return true;
  } catch (error) {
    console.warn("Profile is unavailable, using local profile.", error);
    renderProfile();
    fillOnboardingInputs();
    renderOnboarding();
    return false;
  }
}

async function saveUserProfile(profile) {
  saveLocalProfile(profile);
  if (profile.defaultPlatform) selectedRunnerPlatform = profile.defaultPlatform;
  if (Number(profile.weeklyGoal) > 0) {
    saveWeeklyGoal(Number(profile.weeklyGoal));
    scheduleSettingsSave();
  }

  if (!hasCloudStorage() || !getCurrentUserId()) {
    renderProfile("Профиль сохранен локально.");
    renderOnboarding();
    return false;
  }

  try {
    const ownerUserId = getCloudOwnerUserId();
    const payload = profileToSupabasePayload(profile);
    const updated = await cloudRequest("profiles", {
      method: "PATCH",
      query: `?user_id=eq.${encodeURIComponent(ownerUserId)}`,
      body: { ...payload, user_id: ownerUserId },
    });
    if (Array.isArray(updated) && !updated.length) {
      await cloudRequest("profiles", {
        method: "POST",
        body: { ...payload, user_id: ownerUserId },
      });
    }
    renderProfile("Профиль сохранен в Supabase.");
    renderOnboarding();
    return true;
  } catch (error) {
    console.warn("Profile was saved locally but not synced.", error);
    renderProfile("Профиль сохранен локально, Supabase пока не принял изменения.");
    renderOnboarding();
    return false;
  }
}

async function deleteCloudProfile() {
  if (!hasCloudStorage() || !requireCloudUser()) return false;

  try {
    const ownerQuery = cloudOwnerQuery();
    await cloudRequest("profiles", {
      method: "DELETE",
      query: ownerQuery ? `?${ownerQuery}` : "",
      prefer: "return=minimal",
    });
    return true;
  } catch (error) {
    console.warn("Profile delete failed.", error);
    renderProfile("Не удалось удалить профиль в Supabase. Попробуй еще раз.");
    return false;
  }
}

function readProfileForm() {
  if (!elements.profileForm) return {};
  const data = new FormData(elements.profileForm);
  return {
    ...userProfile,
    driverName: String(data.get("driverName") || "").trim(),
    carBrand: String(data.get("carBrand") || "").trim(),
    carModel: String(data.get("carModel") || "").trim(),
    odometer: Number(data.get("odometer") || 0) || "",
    fuelConsumption: Number(data.get("fuelConsumption") || 0) || "",
    weeklyGoal: Number(data.get("weeklyGoal") || weeklyGoal || DEFAULT_WEEKLY_GOAL),
  };
}

function fillProfileForm() {
  if (!elements.profileForm) return;
  const profile = { ...userProfile };
  elements.profileForm.elements.driverName.value = profile.driverName || profile.displayName || telegramDisplayName() || "";
  elements.profileForm.elements.carBrand.value = profile.carBrand || "";
  elements.profileForm.elements.carModel.value = profile.carModel || "";
  elements.profileForm.elements.odometer.value = profile.odometer || "";
  elements.profileForm.elements.fuelConsumption.value = profile.fuelConsumption || "";
  elements.profileForm.elements.weeklyGoal.value = Number(profile.weeklyGoal || weeklyGoal || DEFAULT_WEEKLY_GOAL);
}

function renderProfile(message = "") {
  const telegramUser = getTelegramUser();
  const telegram = telegramProfilePayload(telegramUser);
  const profile = { ...userProfile };
  const initials = telegramUser ? initialsFromTelegramUser(telegramUser) : initialsFromTelegramUser({ username: profile.driverName || profile.displayName || "TP" });
  const displayName = profile.driverName || profile.displayName || telegram.display_name || "TaxiProfit";
  const subtitle = telegram.telegram_username ? `@${telegram.telegram_username}` : currentUser?.email || "Кабинет водителя";

  if (elements.profileButton) elements.profileButton.textContent = initials;
  if (elements.sideUserAvatar) {
    elements.sideUserAvatar.textContent = initials;
    if (telegram.avatar_url || profile.avatarUrl) {
      elements.sideUserAvatar.style.backgroundImage = `url("${telegram.avatar_url || profile.avatarUrl}")`;
      elements.sideUserAvatar.textContent = "";
    }
  }
  if (elements.sideUserName) elements.sideUserName.textContent = displayName;
  if (elements.sideUserSubtitle) elements.sideUserSubtitle.textContent = subtitle;
  if (elements.profileTelegramId) elements.profileTelegramId.textContent = telegram.telegram_id || profile.telegramId || "не передан";
  if (elements.profileSupabaseId) elements.profileSupabaseId.textContent = currentUser?.id ? `${currentUser.id.slice(0, 8)}...` : "нет входа";
  if (elements.profileDriverLabel) elements.profileDriverLabel.textContent = displayName;
  if (elements.profileCarLabel) {
    const carTitle = [profile.carBrand, profile.carModel, profile.carYear].filter(Boolean).join(" ");
    elements.profileCarLabel.textContent = carTitle || "Авто не указано";
  }
  const latestOdometer = latestKnownOdometer();
  const registered = Boolean(profile.userId || profile.onboardingCompleted || profile.driverName || profile.carBrand);
  if (elements.profileRegisteredStatus) {
    elements.profileRegisteredStatus.textContent = registered ? "Профиль зарегистрирован" : "Профиль не заполнен";
    elements.profileRegisteredStatus.classList.toggle("muted", !registered);
  }
  if (elements.profileOdometerLabel) {
    elements.profileOdometerLabel.textContent = latestOdometer ? `${formatNumber(Number(latestOdometer.toFixed(1)))} км` : "— км";
  }
  if (elements.profileFuelLabel) {
    elements.profileFuelLabel.textContent = profile.fuelConsumption ? `${formatNumber(profile.fuelConsumption)} л/100 км` : "— л/100 км";
  }
  if (elements.profileSessionLabel) {
    const telegramId = telegram.telegram_id || profile.telegramId || "";
    elements.profileSessionLabel.textContent = telegramId ? `Telegram ${telegramId}` : "Локальная сессия";
  }
  if (elements.profileSessionText) {
    elements.profileSessionText.textContent = telegram.telegram_username
      ? `@${telegram.telegram_username}`
      : currentUser?.id
        ? `Supabase ${currentUser.id.slice(0, 8)}...`
        : "Кабинет водителя";
  }

  if (elements.authStatusTitle) {
    const hasDriverProfile = Boolean(profile.userId || profile.onboardingCompleted);
    elements.authStatusTitle.textContent = currentUser
      ? currentUser.is_anonymous
        ? "Профиль подключен"
        : "Аккаунт подключен"
      : hasDriverProfile
        ? "Профиль подключен"
      : authReady
        ? "Вход не выполнен"
        : "Проверяем вход...";
  }
  if (elements.authStatusText) {
    elements.authStatusText.textContent = currentUser || profile.userId || profile.onboardingCompleted
      ? "Смены, расходы и настройки сохраняются в твоем аккаунте."
      : "Профиль будет создан автоматически при первом запуске.";
  }
  if (elements.profileForm) elements.profileForm.hidden = !isProfileEditing;
  if (elements.profileSummaryCard) elements.profileSummaryCard.hidden = isProfileEditing;
  if (elements.editProfileButton) elements.editProfileButton.textContent = isProfileEditing ? "Закрыть" : "Редактировать";
  if (elements.authMessage && message) elements.authMessage.textContent = message;
  if (elements.profileSaveStatus && message) elements.profileSaveStatus.textContent = message;
  fillProfileForm();
  syncStartOdometerDefault();
  updateAccessFlow();
}

function onboardingSequence() {
  const ownership = onboardingDraft.carOwnership || userProfile.carOwnership || "";
  if (ownership === "rent" || ownership === "fleet") return ONBOARDING_STEPS;
  return ONBOARDING_STEPS.filter((step) => step !== "rent");
}

function currentOnboardingStep() {
  return onboardingSequence()[onboardingStepIndex] || "welcome";
}

function shouldShowOnboarding() {
  return authReady && Boolean(currentUser) && !userProfile.onboardingCompleted;
}

function setOnboardingOpen(isOpen) {
  if (!elements.onboardingOverlay) return;
  elements.onboardingOverlay.hidden = !isOpen;
  document.body.classList.toggle("onboarding-open", isOpen);
}

function updateChoiceButtons() {
  elements.onboardingChoiceButtons.forEach((button) => {
    const group = button.closest("[data-choice-group]")?.dataset.choiceGroup;
    const value = button.dataset.choiceValue;
    if (group === "platforms") {
      button.classList.toggle("active", (onboardingDraft.platforms || []).includes(value));
      return;
    }
    button.classList.toggle("active", onboardingDraft[group] === value);
  });
}

function fillSelect(select, options, selectedValue = "") {
  if (!select) return;
  const currentValue = selectedValue || select.value;
  select.innerHTML = options.map((option) => {
    const value = typeof option === "object" ? option.value : option;
    const label = typeof option === "object" ? option.label : option;
    return `<option value="${String(value)}">${String(label)}</option>`;
  }).join("");
  if (currentValue && [...select.options].some((option) => option.value === String(currentValue))) {
    select.value = String(currentValue);
  }
}

function carYearOptions() {
  const currentYear = new Date().getFullYear() + 1;
  const years = [];
  for (let year = currentYear; year >= CAR_YEAR_START; year -= 1) years.push(String(year));
  return years;
}

function updateCarModelOptions() {
  const brand = elements.onboardingCarBrand?.value || onboardingDraft.carBrand || userProfile.carBrand || "Toyota";
  const models = CAR_CATALOG[brand] || CAR_CATALOG["Другое"];
  fillSelect(elements.onboardingCarModel, models, onboardingDraft.carModel || userProfile.carModel || models[0]);
}

function setupOnboardingSelects() {
  fillSelect(elements.onboardingCarBrand, Object.keys(CAR_CATALOG), onboardingDraft.carBrand || userProfile.carBrand || "Toyota");
  updateCarModelOptions();
  fillSelect(elements.onboardingCarYear, carYearOptions(), onboardingDraft.carYear || userProfile.carYear || "2020");
}

function renderOnboarding() {
  if (!elements.onboardingOverlay) return;
  const show = shouldShowOnboarding();
  setOnboardingOpen(show);
  if (!show) return;

  setupOnboardingSelects();
  const sequence = onboardingSequence();
  if (onboardingStepIndex >= sequence.length) onboardingStepIndex = sequence.length - 1;
  const step = currentOnboardingStep();
  elements.onboardingSteps.forEach((item) => {
    item.classList.toggle("active", item.dataset.onboardingStep === step);
  });
  if (elements.onboardingProgress) {
    const progress = step === "welcome" ? 8 : ((onboardingStepIndex + 1) / sequence.length) * 100;
    elements.onboardingProgress.style.width = `${Math.max(8, Math.min(100, progress))}%`;
  }
  if (elements.onboardingBack) elements.onboardingBack.hidden = step === "welcome";
  if (elements.onboardingNext) {
    elements.onboardingNext.textContent = step === "platforms" ? "Завершить" : "Далее";
    elements.onboardingNext.hidden = step === "welcome";
  }
  updateChoiceButtons();
}

function readOnboardingInputs() {
  const root = elements.onboardingOverlay;
  if (!root) return;
  const numberValue = (name) => Number(root.querySelector(`[name="${name}"]`)?.value || 0) || "";
  const textValue = (name) => String(root.querySelector(`[name="${name}"]`)?.value || "").trim();

  onboardingDraft = {
    ...onboardingDraft,
    driverName: textValue("driverName"),
    carBrand: textValue("carBrand"),
    carModel: textValue("carModel"),
    carYear: numberValue("carYear"),
    fuelType: textValue("fuelType") || "Бензин",
    fuelConsumption: numberValue("fuelConsumption"),
    odometer: numberValue("odometer"),
    rentAmount: numberValue("rentAmount"),
    rentFrequency: textValue("rentFrequency"),
    rentPaymentDay: textValue("rentPaymentDay"),
  };
  saveOnboardingDraft();
}

function fillOnboardingInputs() {
  const root = elements.onboardingOverlay;
  if (!root) return;
  const source = { ...userProfile, ...onboardingDraft };
  ["driverName", "carBrand", "carModel", "carYear", "fuelType", "fuelConsumption", "odometer", "rentAmount", "rentFrequency", "rentPaymentDay"].forEach((name) => {
    const input = root.querySelector(`[name="${name}"]`);
    if (input && source[name] !== undefined && source[name] !== null) input.value = source[name];
  });
}

function validateOnboardingStep() {
  const step = currentOnboardingStep();
  if (step === "carType" && !onboardingDraft.carOwnership) return "Выбери тип авто.";
  if (step === "vehicle" && !String(onboardingDraft.driverName || "").trim()) return "Укажи имя водителя.";
  if (step === "platforms" && !(onboardingDraft.platforms || []).length) return "Выбери хотя бы один агрегатор.";
  return "";
}

async function finishOnboarding() {
  readOnboardingInputs();
  const platforms = onboardingDraft.platforms?.length ? onboardingDraft.platforms : ["Bolt"];
  const nextProfile = {
    ...userProfile,
    ...onboardingDraft,
    platforms,
    defaultPlatform: userProfile.defaultPlatform || platforms[0],
    onboardingCompleted: true,
  };
  await saveUserProfile(nextProfile);
  clearOnboardingDraft();
  renderProfile("Регистрация завершена. Профиль сохранен.");
  renderOnboarding();
  setView("home");
  history.replaceState(null, "", "#home");
  renderAll();
}

function nextOnboardingStep() {
  readOnboardingInputs();
  const validationMessage = validateOnboardingStep();
  if (validationMessage) {
    if (elements.profileSaveStatus) elements.profileSaveStatus.textContent = validationMessage;
    return;
  }

  const sequence = onboardingSequence();
  if (currentOnboardingStep() === "platforms") {
    finishOnboarding();
    return;
  }
  onboardingStepIndex = Math.min(onboardingStepIndex + 1, sequence.length - 1);
  fillOnboardingInputs();
  renderOnboarding();
}

async function cloudRequest(path, options = {}) {
  const { method = "GET", body, query = "", prefer = "return=representation" } = options;
  const response = await fetch(`${SUPABASE_REST_URL}/${path}${query}`, {
    method,
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${getAuthToken()}`,
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

function requireCloudUser() {
  if (!getCloudOwnerTelegramId() && !getCloudOwnerUserId()) {
    setSyncStatus("Подключаем Telegram ID для персональной синхронизации.");
    return false;
  }
  return true;
}

async function loadCloudSettings() {
  if (!hasCloudStorage() || !requireCloudUser()) return false;

  try {
    const ownerQuery = cloudOwnerQuery();
    const [settings] = await cloudRequest("settings", {
      query: `?${ownerQuery}&key=eq.dashboard&select=payload&limit=1`,
    });
    const payload = settings?.payload || {};
    const legacyGoal = Number(payload.monthGoal);
    const nextGoal = Number.isFinite(Number(payload.weeklyGoal))
      ? Number(payload.weeklyGoal)
      : legacyGoal > 0 && legacyGoal < 30000
        ? legacyGoal
        : 0;
    if (Number.isFinite(nextGoal) && nextGoal > 0) {
      saveWeeklyGoal(nextGoal);
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

  if (!requireCloudUser()) return false;

  try {
    const ownerQuery = cloudOwnerQuery();
    const [shiftResult, expenseResult] = await Promise.all([
      cloudRequest("shifts", {
        query: `?${ownerQuery}&select=id,payload&order=created_at.asc`,
      }),
      cloudRequest("expenses", {
        query: `?${ownerQuery}&select=id,payload&order=created_at.asc`,
      }),
    ]);

    const cloudShifts = (shiftResult || []).map(normalizeCloudShift);
    const cloudExpenses = (expenseResult || []).map(normalizeCloudExpense);
    const hasCloudRows = cloudShifts.length || cloudExpenses.length;
    const hasLocalRows = shifts.length || expenses.length;
    const canApplyEmptyCloud = applyEmpty && !hasLocalRows;

    if (!hasCloudRows && hasLocalRows && !cloudLoadedOnce) {
      await Promise.all([
        replaceCloudTable("shifts", shifts),
        replaceCloudTable("expenses", expenses),
      ]);
      cloudLoadedOnce = true;
      if (!silent) setSyncStatus("Локальные данные сохранены в Supabase для этого Telegram.");
      return true;
    }

    if (hasCloudRows || canApplyEmptyCloud || (cloudLoadedOnce && !hasLocalRows)) {
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
  const realtimeFilter = cloudOwnerRealtimeFilter();
  if (!hasRealtimeClient() || !realtimeFilter) {
    setSyncStatus("Supabase работает через REST. Для realtime нужен supabase-js CDN.");
    return;
  }

  realtimeClient = createAuthClient();

  const channel = realtimeClient
    .channel(`taxiprofit-live-${realtimeFilter}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "shifts", filter: realtimeFilter }, () => {
      scheduleCloudReload("Смены обновлены в облаке.");
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "expenses", filter: realtimeFilter }, () => {
      scheduleCloudReload("Расходы обновлены в облаке.");
    });

  if (includeSettings) {
    channel.on("postgres_changes", { event: "*", schema: "public", table: "settings", filter: realtimeFilter }, () => {
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
  if (!hasCloudStorage() || !requireCloudUser()) return;

  try {
    const ownerQuery = cloudOwnerQuery();
    const ownerPayload = cloudOwnerPayload();
    const [existing] = await cloudRequest("settings", {
      query: `?${ownerQuery}&key=eq.dashboard&select=id&limit=1`,
    });
    if (existing?.id) {
      await cloudRequest("settings", {
        method: "PATCH",
        query: `?id=eq.${encodeURIComponent(existing.id)}`,
        body: { payload: { weeklyGoal }, ...ownerPayload },
      });
      return;
    }
    await cloudRequest("settings", {
      method: "POST",
      body: { key: "dashboard", ...ownerPayload, payload: { weeklyGoal } },
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
  if (!hasCloudStorage() || !requireCloudUser()) return shift;

  const ownerPayload = cloudOwnerPayload();
  const payload = stripRemoteId(shift);
  try {
    if (shift.remoteId) {
      await cloudRequest("shifts", {
        method: "PATCH",
        query: `?id=eq.${encodeURIComponent(shift.remoteId)}`,
        body: { payload, ...ownerPayload },
      });
      return shift;
    }

    const [data] = await cloudRequest("shifts", { method: "POST", body: { ...ownerPayload, payload } });
    return { ...shift, remoteId: data.id };
  } catch (error) {
    console.warn("Shift was saved locally but not synced to Supabase.", error);
    return shift;
  }
}

async function saveExpenseToCloud(expense) {
  if (!hasCloudStorage() || !requireCloudUser()) return expense;

  const ownerPayload = cloudOwnerPayload();
  const payload = stripRemoteId(expense);
  try {
    if (expense.remoteId) {
      await cloudRequest("expenses", {
        method: "PATCH",
        query: `?id=eq.${encodeURIComponent(expense.remoteId)}`,
        body: { payload, ...ownerPayload },
      });
      return expense;
    }

    const [data] = await cloudRequest("expenses", { method: "POST", body: { ...ownerPayload, payload } });
    return { ...expense, remoteId: data.id };
  } catch (error) {
    console.warn("Expense was saved locally but not synced to Supabase.", error);
    return expense;
  }
}

async function deleteCloudRow(table, remoteId) {
  if (!hasCloudStorage() || !remoteId || !requireCloudUser()) return;

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
  if (!hasCloudStorage()) return true;
  if (!requireCloudUser()) return false;

  try {
    const ownerQuery = cloudOwnerQuery();
    const ownerPayload = cloudOwnerPayload();
    await cloudRequest(table, {
      method: "DELETE",
      query: `?${ownerQuery}`,
      prefer: "return=minimal",
    });

    if (!items.length) return true;

    const data = await cloudRequest(table, {
      method: "POST",
      body: items.map((item) => ({ ...ownerPayload, payload: stripRemoteId(item) })),
    });

    data.forEach((row, index) => {
      items[index].remoteId = row.id;
    });
    return true;
  } catch (error) {
    console.warn(`Could not replace ${table} data in Supabase.`, error);
    return false;
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

function signedMoney(value) {
  const amount = Math.round(Number(value || 0));
  if (!amount) return "₴ 0";
  return `${amount > 0 ? "+" : "-"}${money(Math.abs(amount))}`;
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

function shiftActualKm(shift) {
  const totalKm = Number(shift.totalKm || 0);
  if (totalKm > 0) return totalKm;
  const start = Number(shift.odometerStart || 0);
  const end = Number(shift.odometerEnd || 0);
  if (start > 0 && end > start) return end - start;
  return Number(shift.km || 0);
}

function latestKnownOdometer() {
  const candidates = shifts
    .flatMap((shift) => [Number(shift.odometerEnd || 0), Number(shift.odometerStart || 0)])
    .filter((value) => Number.isFinite(value) && value > 0);
  const profileOdometer = Number(userProfile.odometer || 0);
  if (profileOdometer > 0) candidates.push(profileOdometer);
  return candidates.length ? Math.max(...candidates) : 0;
}

function syncStartOdometerDefault() {
  if (!elements.startOdometer || activeShift || pendingShiftFinish) return;
  const odometer = latestKnownOdometer();
  if (odometer > 0 && !elements.startOdometer.value) {
    elements.startOdometer.value = Number(odometer.toFixed(1));
  }
  if (odometer > 0) elements.startOdometer.placeholder = Number(odometer.toFixed(1));
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
    odometerStart: Number(shift.odometerStart || 0),
    odometerEnd: Number(shift.odometerEnd || 0),
    totalKm: Number(shift.totalKm || 0),
    extraKm: Number(shift.extraKm || 0),
    actualKm: Number(shift.actualKm || shift.totalKm || 0),
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

function shiftStartDateTime(shift) {
  return new Date(`${shift.date}T${normalizeTime(shift.start || "12:00")}`);
}

function shiftEndDateTime(shift) {
  const start = shiftStartDateTime(shift);
  const end = new Date(`${shift.date}T${normalizeTime(shift.end || shift.start || "12:00")}`);
  if (end < start) end.setDate(end.getDate() + 1);
  return end;
}

function heatSlotIndex(hour) {
  if (hour < 8) return 0;
  if (hour < 12) return 1;
  if (hour < 16) return 2;
  if (hour < 20) return 3;
  return 4;
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

function formatDateTime(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "время не зафиксировано";
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
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

function allDataBounds() {
  const dateValues = [
    ...shifts.map((shift) => shift.date),
    ...expenses.map((expense) => expense.date),
    dateKey(new Date()),
  ].filter(Boolean).sort();

  return {
    start: new Date(`${dateValues[0]}T00:00:00`),
    end: new Date(`${dateValues[dateValues.length - 1]}T23:59:59.999`),
  };
}

function expenseBreakdown(sourceExpenses = []) {
  const fuel = sumExpensesByCategory(sourceExpenses, ["Топливо"]);
  const rent = sumExpensesByCategory(sourceExpenses, ["Аренда авто", "Аренда"]);
  const wash = sumExpensesByCategory(sourceExpenses, ["Мойка"]);
  const fine = sumExpensesByCategory(sourceExpenses, ["Штраф"]);
  const repair = sumExpensesByCategory(sourceExpenses, ["Ремонт"]);
  const fees = sumExpensesByCategory(sourceExpenses, ["Комиссии"]);
  const other = sumExpensesByCategory(sourceExpenses, ["Прочее"]);
  return {
    fuel,
    rent,
    wash,
    fine,
    repair,
    fees,
    other,
    expenses: fuel + rent + wash + fine + repair + fees + other,
  };
}

function profileWeeklyRentAmount() {
  const amount = Number(userProfile.rentAmount || 0);
  if (!amount || !["rent", "fleet"].includes(userProfile.carOwnership)) return 0;
  if (userProfile.rentFrequency === "day") return amount * 7;
  if (userProfile.rentFrequency === "month") return (amount / 30) * 7;
  return amount;
}

function weekExpensesForDate(date) {
  const start = weekStart(new Date(`${date}T12:00`));
  const end = endOfDay(addDays(start, 6));
  const weekExpenses = expenses.filter((expense) => {
    const value = new Date(`${expense.date}T12:00`);
    return value >= start && value <= end;
  });
  const breakdown = expenseBreakdown(weekExpenses);
  const profileRent = profileWeeklyRentAmount();
  if (profileRent > 0 && breakdown.rent <= 0) {
    breakdown.rent = profileRent;
    breakdown.expenses += profileRent;
  }
  return breakdown;
}

function dailyAllocatedExpenses(date) {
  const weekly = weekExpensesForDate(date);
  return Object.fromEntries(
    Object.entries(weekly).map(([key, value]) => [key, Number(value || 0) / 7]),
  );
}

function allocatedExpensesForRange(start, end) {
  const total = { fuel: 0, rent: 0, wash: 0, fine: 0, repair: 0, fees: 0, other: 0, expenses: 0 };
  for (let day = new Date(start); day <= end; day = addDays(day, 1)) {
    const daily = dailyAllocatedExpenses(dateKey(day));
    Object.keys(total).forEach((key) => {
      total[key] += Number(daily[key] || 0);
    });
  }
  return total;
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
  const bounds = period === "all" ? allDataBounds() : periodBounds(period);
  const allocatedExpenses = allocatedExpensesForRange(bounds.start, bounds.end);
  const workedDays = new Set(current.filter(isWorkShift).map((shift) => shift.date).filter(Boolean));
  const calendarDays = dayRecords(period);
  const shiftsWorked = workedDays.size;
  const daysOff = calendarDays.filter((record) => !record.isWorkday).length;
  const hours = sum(current, "hours");
  const gross = sum(current, "gross");
  const orders = current.reduce((total, shift) => total + totalOrders(shift), 0);
  const km = sum(current, "km");
  const actualKm = current.reduce((total, shift) => total + shiftActualKm(shift), 0);
  const extraKm = current.reduce((total, shift) => total + Math.max(0, shiftActualKm(shift) - Number(shift.km || 0)), 0);
  const embeddedFuel = sum(current, "fuel");
  const embeddedRent = sum(current, "rent");
  const embeddedOther = sum(current, "other");
  const embeddedFees = sum(current, "fees");
  const fuel = embeddedFuel + allocatedExpenses.fuel;
  const rent = embeddedRent + allocatedExpenses.rent;
  const wash = allocatedExpenses.wash;
  const fine = allocatedExpenses.fine;
  const repair = allocatedExpenses.repair;
  const other = embeddedOther + allocatedExpenses.other;
  const fees = embeddedFees + allocatedExpenses.fees;
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
    actualKm,
    extraKm,
    perHour: hours ? currentNet / hours : 0,
    avgRevenue: shiftsWorked ? gross / shiftsWorked : 0,
    avgExpenses: shiftsWorked ? expensesTotal / shiftsWorked : 0,
    avgProfit: shiftsWorked ? currentNet / shiftsWorked : 0,
    avgOrders: shiftsWorked ? orders / shiftsWorked : 0,
    avgKm: shiftsWorked ? km / shiftsWorked : 0,
    avgKmPrice: km ? gross / km : 0,
    cleanKmPrice: actualKm ? currentNet / actualKm : 0,
    grossActualKmPrice: actualKm ? gross / actualKm : 0,
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

function summarizeEntries(sourceShifts, sourceExpenses = []) {
  const workedDays = new Set(sourceShifts.filter(isWorkShift).map((shift) => shift.date).filter(Boolean));
  const shiftsWorked = workedDays.size;
  const hours = sum(sourceShifts, "hours");
  const gross = sum(sourceShifts, "gross");
  const orders = sourceShifts.reduce((total, shift) => total + totalOrders(shift), 0);
  const km = sum(sourceShifts, "km");
  const actualKm = sourceShifts.reduce((total, shift) => total + shiftActualKm(shift), 0);
  const extraKm = sourceShifts.reduce((total, shift) => total + Math.max(0, shiftActualKm(shift) - Number(shift.km || 0)), 0);
  const directExpenses = expenseBreakdown(sourceExpenses);
  const fuel = sum(sourceShifts, "fuel") + directExpenses.fuel;
  const rent = sum(sourceShifts, "rent") + directExpenses.rent;
  const wash = directExpenses.wash;
  const fine = directExpenses.fine;
  const repair = directExpenses.repair;
  const other = sum(sourceShifts, "other") + directExpenses.other;
  const fees = sum(sourceShifts, "fees") + directExpenses.fees;
  const expensesTotal = fuel + rent + wash + fine + repair + fees + other;

  return {
    shiftsWorked,
    gross,
    hours,
    orders,
    km,
    actualKm,
    extraKm,
    net: gross ? gross - expensesTotal : 0,
    cleanKmPrice: actualKm ? (gross - expensesTotal) / actualKm : 0,
    grossActualKmPrice: actualKm ? gross / actualKm : 0,
    expenses: expensesTotal,
    fuel,
    rent,
    wash,
    fine,
    repair,
    fees,
    other,
  };
}

function summaryForDate(date) {
  const dayShifts = shifts.filter((shift) => shift.date === date);
  const embeddedExpenses = dayShifts.reduce(
    (total, shift) => {
      total.fuel += Number(shift.fuel || 0);
      total.rent += Number(shift.rent || 0);
      total.other += Number(shift.other || 0);
      total.fees += Number(shift.fees || 0);
      return total;
    },
    { fuel: 0, rent: 0, wash: 0, fine: 0, repair: 0, fees: 0, other: 0, expenses: 0 },
  );
  const allocated = dailyAllocatedExpenses(date);
  const sourceExpenses = [{
    category: "Топливо",
    amount: allocated.fuel + embeddedExpenses.fuel,
  }, {
    category: "Аренда авто",
    amount: allocated.rent + embeddedExpenses.rent,
  }, {
    category: "Мойка",
    amount: allocated.wash,
  }, {
    category: "Штраф",
    amount: allocated.fine,
  }, {
    category: "Ремонт",
    amount: allocated.repair,
  }, {
    category: "Комиссии",
    amount: allocated.fees + embeddedExpenses.fees,
  }, {
    category: "Прочее",
    amount: allocated.other + embeddedExpenses.other,
  }];

  return summarizeEntries(
    dayShifts.map((shift) => ({ ...shift, fuel: 0, rent: 0, other: 0, fees: 0 })),
    sourceExpenses,
  );
}

function currentWeekSummary() {
  const start = weekStart(new Date());
  const end = addDays(start, 6);
  const weekShifts = shifts.filter((shift) => {
    const value = dateValue(shift);
    return value >= start && value <= end;
  });
  const allocatedExpenses = allocatedExpensesForRange(start, endOfDay(end));
  const workedDays = new Set(weekShifts.filter(isWorkShift).map((shift) => shift.date).filter(Boolean));
  const shiftsWorked = workedDays.size;
  const hours = sum(weekShifts, "hours");
  const gross = sum(weekShifts, "gross");
  const orders = weekShifts.reduce((total, shift) => total + totalOrders(shift), 0);
  const km = sum(weekShifts, "km");
  const actualKm = weekShifts.reduce((total, shift) => total + shiftActualKm(shift), 0);
  const extraKm = weekShifts.reduce((total, shift) => total + Math.max(0, shiftActualKm(shift) - Number(shift.km || 0)), 0);
  const fuel = sum(weekShifts, "fuel") + allocatedExpenses.fuel;
  const rent = sum(weekShifts, "rent") + allocatedExpenses.rent;
  const wash = allocatedExpenses.wash;
  const fine = allocatedExpenses.fine;
  const repair = allocatedExpenses.repair;
  const other = sum(weekShifts, "other") + allocatedExpenses.other;
  const fees = sum(weekShifts, "fees") + allocatedExpenses.fees;
  const expensesTotal = fuel + rent + wash + fine + repair + fees + other;
  const currentNet = gross - expensesTotal;

  return {
    shiftsWorked,
    daysOff: 7 - shiftsWorked,
    net: currentNet,
    gross,
    hours,
    orders,
    km,
    actualKm,
    extraKm,
    perHour: hours ? currentNet / hours : 0,
    avgRevenue: shiftsWorked ? gross / shiftsWorked : 0,
    avgExpenses: shiftsWorked ? expensesTotal / shiftsWorked : 0,
    avgProfit: shiftsWorked ? currentNet / shiftsWorked : 0,
    avgOrders: shiftsWorked ? orders / shiftsWorked : 0,
    avgKm: shiftsWorked ? km / shiftsWorked : 0,
    avgKmPrice: km ? gross / km : 0,
    cleanKmPrice: actualKm ? currentNet / actualKm : 0,
    grossActualKmPrice: actualKm ? gross / actualKm : 0,
    fuel,
    rent,
    wash,
    fine,
    repair,
    fees,
    other,
    expenses: expensesTotal,
    start,
    end,
  };
}

function weeklyGoalPace(summary = currentWeekSummary()) {
  const goal = Math.max(weeklyGoal, 1);
  const today = new Date();
  const start = summary.start || weekStart(today);
  const end = summary.end || addDays(start, 6);
  const lastElapsedDay = today < end ? today : end;
  let netTotal = 0;
  let daysPassed = 0;

  for (let day = new Date(start); day <= lastElapsedDay; day = addDays(day, 1)) {
    const daily = summaryForDate(dateKey(day));
    netTotal += Number(daily.net || 0);
    daysPassed += 1;
  }

  daysPassed = Math.max(1, Math.min(7, daysPassed));
  const earned = Math.max(0, netTotal);
  const averageDailyNet = Math.max(0, netTotal / daysPassed);
  const forecast = Math.max(0, Math.round(averageDailyNet * 7));
  const progress = Math.min(100, Math.round((earned / goal) * 100));
  const rest = Math.max(0, goal - earned);

  return {
    goal,
    earned,
    netTotal,
    averageDailyNet,
    forecast,
    progress,
    rest,
    daysPassed,
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
  elements.avgKmPriceText.textContent = `${money(summary.cleanKmPrice)} за реальный км`;

  renderHomeMetrics();
  renderExpenses(summary);
  renderGoal(currentWeekSummary());
  renderMiniBars();
  renderDays(periodSummary("all"));
}

function renderHomeMetrics() {
  const today = dateKey(new Date());
  const yesterday = dateKey(addDays(new Date(), -1));
  const todaySummary = summaryForDate(today);
  const yesterdaySummary = summaryForDate(yesterday);
  const week = currentWeekSummary();
  const goalPace = weeklyGoalPace(week);
  const todayDifference = todaySummary.gross - yesterdaySummary.gross;
  const averageHourGross = week.hours ? week.gross / week.hours : 0;
  const averageOrderGross = week.orders ? week.gross / week.orders : 0;
  const cleanKmPrice = week.cleanKmPrice || 0;
  const emptyMileageShare = week.actualKm ? Math.round((week.extraKm / week.actualKm) * 100) : 0;
  const qualityOk = cleanKmPrice >= 25;
  const paceLabel = goalPace.forecast >= goalPace.goal ? "выше плана" : "ниже плана";

  elements.homeNetProfit.textContent = money(todaySummary.gross);
  elements.homeProfitFormula.textContent = yesterdaySummary.gross || todaySummary.gross
    ? `${signedMoney(todayDifference)} ${todayDifference >= 0 ? "больше" : "меньше"} чем вчера`
    : "Сегодня заработка пока нет";
  elements.homeProfitDelta.textContent = signedMoney(todayDifference);
  elements.homeProfitDelta.className = todayDifference >= 0 ? "profit" : "loss";
  elements.homeTodayNetValue.textContent = money(todaySummary.net);
  elements.homeWeeklyGoalLeft.textContent = money(goalPace.rest);

  elements.homeWeekNet.textContent = money(goalPace.earned);
  elements.homeGoalPercent.textContent = `${goalPace.progress}%`;
  elements.homeGoalProgress.style.width = `${goalPace.progress}%`;
  elements.homeGoalText.textContent = `чистыми в день ${money(goalPace.averageDailyNet)} · осталось ${money(goalPace.rest)}`;
  elements.homeForecast.textContent = money(goalPace.forecast);
  elements.homePaceLabel.textContent = paceLabel;
  elements.homePaceLabel.className = goalPace.forecast >= goalPace.goal ? "profit" : "loss";
  elements.homeForecastText.textContent = `${money(goalPace.averageDailyNet)} чистыми в день → ${money(goalPace.forecast)} за неделю`;
  elements.homeWeekOrders.textContent = new Intl.NumberFormat("uk-UA").format(week.orders);
  elements.homeWeekHours.textContent = `${Number(week.hours.toFixed(1))} ч`;
  elements.homeWeekOps.textContent = `${Number(week.km.toFixed(1))} км · ${week.shiftsWorked} рабочих дней`;
  elements.homeAvgHourValue.textContent = `${money(averageHourGross)}/ч`;
  elements.homeAvgHourText.textContent = `${money(week.gross)} выручка · ${Number(week.hours.toFixed(1))} ч`;
  elements.homeAvgOrderText.textContent = `${money(averageOrderGross)} за заказ`;
  elements.homeWeekCleanText.textContent = `${money(week.net)} чистыми · ${money(week.expenses)} расходы`;
  elements.homeOpsText.textContent = `${Number(week.km.toFixed(1))} км заказов · ${Number(week.actualKm.toFixed(1))} км всего · ${emptyMileageShare}% пустой`;
  elements.homeKmPriceText.textContent = `${money(cleanKmPrice)} за реальный км · ${qualityOk ? "норма" : "ниже 25"}`;
  elements.homeKmPriceText.className = qualityOk ? "profit" : "loss";
  renderHomeMiniBars();
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

function renderHomeMiniBars() {
  const end = new Date();
  const start = addDays(end, -6);
  const visibleRecords = [];

  for (let date = new Date(start); date <= end; date = addDays(date, 1)) {
    const key = dateKey(date);
    const record = summaryForDate(key);
    visibleRecords.push({
      date: key,
      gross: record.gross,
      isWorkday: record.gross > 0,
    });
  }

  const activeRecords = visibleRecords.filter((record) => record.gross > 0);

  if (activeRecords.length < 2) {
    elements.homeMiniBars.innerHTML = Array.from({ length: 7 }, () => `<span class="empty" style="height: 18%"></span>`).join("");
    elements.homeBestDayLabel.textContent = "Недостаточно данных для аналитики";
    elements.homeMiniMaxLabel.textContent = "Макс ₴0";
    elements.homeMiniStartLabel.textContent = formatShortDate(visibleRecords[0]?.date || dateKey(start));
    elements.homeMiniEndLabel.textContent = formatShortDate(visibleRecords[visibleRecords.length - 1]?.date || dateKey(end));
    return;
  }

  const max = Math.max(...visibleRecords.map((item) => item.gross), 1);
  const best = activeRecords.reduce((winner, item) => {
    return item.gross > winner.gross ? item : winner;
  }, activeRecords[0]);

  elements.homeMiniBars.innerHTML = visibleRecords
    .map((item) => {
      const value = item.gross;
      const height = Math.max(18, Math.round((value / max) * 88));
      const className = item.date === best.date ? "best" : "";
      return `<span class="${className}" style="height: ${height}%"><i>${formatShortDate(item.date)}</i><b>${compactMoney(item.gross)}</b></span>`;
    })
    .join("");
  elements.homeBestDayLabel.textContent = `Лучший доход: ${formatDate(best.date)}`;
  elements.homeMiniMaxLabel.textContent = `Макс ${money(best.gross)}`;
  elements.homeMiniStartLabel.textContent = formatShortDate(visibleRecords[0].date);
  elements.homeMiniEndLabel.textContent = formatShortDate(visibleRecords[visibleRecords.length - 1].date);
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
  const goalPace = weeklyGoalPace(summary);

  if (elements.goalInput) elements.goalInput.value = String(weeklyGoal);
  elements.goalPercent.textContent = `${goalPace.progress}%`;
  elements.goalProgress.style.width = `${goalPace.progress}%`;
  if (elements.goalProgressSecondary) elements.goalProgressSecondary.style.width = `${goalPace.progress}%`;
  elements.goalText.textContent = goalPace.rest
    ? `Осталось ${money(goalPace.rest)}. Сейчас ${money(goalPace.averageDailyNet)} чистыми в день → прогноз ${money(goalPace.forecast)} за неделю.`
    : `Цель недели закрыта. Средняя чистая прибыль ${money(goalPace.averageDailyNet)} в день → прогноз ${money(goalPace.forecast)}.`;
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

  grouped.forEach((record) => {
    record.expenses = Number(dailyAllocatedExpenses(record.date).expenses || 0);
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
  const records = dayRecords("all");
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
    const start = shiftStartDateTime(shift);
    const end = shiftEndDateTime(shift);
    const hourlyGross = Number(shift.gross || 0) / Math.max(Number(shift.hours || 0), 1);

    for (let cursor = new Date(start); cursor < end; ) {
      const nextHour = new Date(cursor);
      nextHour.setMinutes(60, 0, 0);
      const next = nextHour < end ? nextHour : end;
      const segmentHours = Math.max(0, (next - cursor) / 3600000);
      const day = weekdayLabels[cursor.getDay()];
      const rowIndex = heatRows.indexOf(day);
      const colIndex = heatSlotIndex(cursor.getHours());
      if (rowIndex >= 0) grid[rowIndex][colIndex].value += hourlyGross * segmentHours;
      cursor = next;
    }
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
  const comment = String(formData.get("comment") || "").trim();
  return normalizeExpense({
    date: formData.get("date"),
    category: formData.get("category"),
    description: comment,
    amount: readNumber(formData, "amount"),
    payment: "",
    comment,
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
    if (elements.finishShiftMeta) {
      elements.finishShiftMeta.textContent =
        `${formatDateTime(pendingShiftFinish.startedAt)} - ${formatDateTime(pendingShiftFinish.endedAt)} · ` +
        `${formatClockDuration(runnerElapsedMs())} · старт ${Number(pendingShiftFinish.odometerStart || 0).toFixed(1)} км`;
    }
    const odometerField = elements.finishShiftForm?.elements?.odometerEnd;
    if (odometerField && pendingShiftFinish.odometerStart && !odometerField.value) {
      odometerField.min = String(pendingShiftFinish.odometerStart);
    }
    return;
  }

  if (activeShift) {
    selectedRunnerPlatform = activeShift.platform;
    updateRunnerPlatformButtons();
    setRunnerState("active");
    if (elements.activePlatform) elements.activePlatform.textContent = activeShift.platform;
    if (elements.activeShiftMeta) {
      elements.activeShiftMeta.textContent = `${formatDateTime(activeShift.startedAt)} · старт ${Number(activeShift.odometerStart || 0).toFixed(1)} км`;
    }
    updateActiveShiftTimer();
    activeShiftTimer = window.setInterval(updateActiveShiftTimer, 1000);
    return;
  }

  setRunnerState("idle");
  syncStartOdometerDefault();
}

function startRunnerShift() {
  const odometerStart = readNumber({ get: (name) => (name === "odometerStart" ? elements.startOdometer?.value : "") }, "odometerStart");
  if (!odometerStart && odometerStart !== 0) return;
  if (!Number.isFinite(odometerStart) || odometerStart <= 0) {
    elements.startOdometer?.focus();
    elements.startOdometer?.reportValidity?.();
    return;
  }

  activeShift = {
    platform: selectedRunnerPlatform,
    startedAt: new Date().toISOString(),
    odometerStart,
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

function cancelActiveRunnerShift() {
  if (!activeShift) return;
  const shouldCancel = window.confirm("Отменить активную смену? Данные этой смены не сохранятся.");
  if (!shouldCancel) return;

  pendingShiftFinish = null;
  clearActiveShift();
  elements.startOdometer.value = "";
  renderShiftRunner();
}

function runnerShiftFromForm(formData) {
  const started = new Date(pendingShiftFinish.startedAt);
  const ended = new Date(pendingShiftFinish.endedAt);
  const gross = readNumber(formData, "gross");
  const expensesValue = readNumber(formData, "expenses");
  const orders = readNumber(formData, "orders");
  const orderKm = readNumber(formData, "km");
  const odometerStart = Number(pendingShiftFinish.odometerStart || 0);
  const odometerEnd = readNumber(formData, "odometerEnd");
  const totalKm = Math.max(0, odometerEnd - odometerStart);
  const extraKm = Math.max(0, totalKm - orderKm);
  const platform = pendingShiftFinish.platform;
  const comment = String(formData.get("comment") || "").trim();
  const odometerComment = odometerStart && odometerEnd
    ? `Одометр ${odometerStart.toFixed(1)}-${odometerEnd.toFixed(1)}; всего ${totalKm.toFixed(1)} км; пустой пробег ${extraKm.toFixed(1)} км`
    : "";

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
    km: orderKm,
    odometerStart,
    odometerEnd,
    totalKm,
    actualKm: totalKm,
    extraKm,
    comment: [comment, odometerComment].filter(Boolean).join(" · "),
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
  syncAppPickers();
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
  syncAppPickers();
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
  syncAppPickers();
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
    amount: expense.amount || "",
    comment: expense.comment || expense.description,
  });
  syncAppPickers();
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
    if (!button.getAttribute("href")) {
      history.pushState(null, "", `#${button.dataset.view}`);
    }
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

elements.cancelActiveShiftButton?.addEventListener("click", () => {
  cancelActiveRunnerShift();
});

elements.cancelFinishShift?.addEventListener("click", () => {
  pendingShiftFinish = null;
  renderShiftRunner();
});

elements.profileButton?.addEventListener("click", () => {
  setView("profile");
  history.replaceState(null, "", "#profile");
});

elements.authStartButton?.addEventListener("click", async () => {
  if (elements.authMessage) elements.authMessage.textContent = "Создаем безопасную сессию...";
  const ok = await signInAnonymously();
  if (ok && elements.authMessage) elements.authMessage.textContent = "Готово. Теперь заполни профиль водителя.";
});

elements.authForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const client = createAuthClient();
  const email = String(new FormData(elements.authForm).get("email") || "").trim();
  if (!client || !email) return;

  try {
    const telegram = telegramProfilePayload();
    const { error } = await client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: location.origin + location.pathname,
        data: {
          telegram_id: telegram.telegram_id ? String(telegram.telegram_id) : "",
          telegram_username: telegram.telegram_username || "",
          display_name: telegram.display_name || "",
          avatar_url: telegram.avatar_url || "",
        },
      },
    });
    if (error) throw error;
    if (elements.authMessage) elements.authMessage.textContent = "Ссылка для входа отправлена на email.";
  } catch (error) {
    if (elements.authMessage) elements.authMessage.textContent = "Не удалось отправить ссылку. Проверь настройки Supabase Auth.";
    console.warn("Magic link auth failed.", error);
  }
});

elements.signOutButton?.addEventListener("click", async () => {
  const client = createAuthClient();
  if (!client) return;
  await client.auth.signOut();
  currentSession = null;
  currentUser = null;
  userProfile = {};
  clearOnboardingDraft();
  writeStorage(JSON.stringify(userProfile), PROFILE_STORAGE_KEY);
  renderProfile("Вы вышли из аккаунта.");
  updateAccessFlow();
  setSyncStatus("Вход отключен: работаем с локальной копией.");
});

elements.profileForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  isProfileEditing = false;
  await saveUserProfile(readProfileForm());
  renderAll();
});

elements.editProfileButton?.addEventListener("click", () => {
  isProfileEditing = !isProfileEditing;
  fillProfileForm();
  renderProfile();
});

elements.cancelProfileEdit?.addEventListener("click", () => {
  isProfileEditing = false;
  fillProfileForm();
  renderProfile();
});

elements.deleteProfileButton?.addEventListener("click", async () => {
  const confirmed = window.confirm("Удалить профиль водителя? Смены и расходы останутся, но регистрация и настройки кабинета будут очищены.");
  if (!confirmed) return;
  const cloudDeleted = await deleteCloudProfile();
  if (hasCloudStorage() && requireCloudUser() && !cloudDeleted) return;
  userProfile = {};
  isProfileEditing = false;
  clearOnboardingDraft();
  writeStorage(JSON.stringify(userProfile), PROFILE_STORAGE_KEY);
  renderProfile("Профиль удален. При следующем входе регистрация откроется снова.");
  renderOnboarding();
  updateAccessFlow();
});

elements.onboardingStart?.addEventListener("click", () => {
  onboardingStepIndex = 1;
  renderOnboarding();
});

elements.onboardingBack?.addEventListener("click", () => {
  readOnboardingInputs();
  onboardingStepIndex = Math.max(0, onboardingStepIndex - 1);
  fillOnboardingInputs();
  renderOnboarding();
});

elements.onboardingNext?.addEventListener("click", () => {
  nextOnboardingStep();
});

elements.onboardingCarBrand?.addEventListener("change", () => {
  onboardingDraft.carBrand = elements.onboardingCarBrand.value;
  onboardingDraft.carModel = "";
  updateCarModelOptions();
  onboardingDraft.carModel = elements.onboardingCarModel?.value || "";
  saveOnboardingDraft();
});

elements.onboardingCarModel?.addEventListener("change", () => {
  onboardingDraft.carModel = elements.onboardingCarModel.value;
  saveOnboardingDraft();
});

elements.onboardingCarYear?.addEventListener("change", () => {
  onboardingDraft.carYear = elements.onboardingCarYear.value;
  saveOnboardingDraft();
});

elements.onboardingChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest("[data-choice-group]")?.dataset.choiceGroup;
    const value = button.dataset.choiceValue;
    if (!group || !value) return;

    if (group === "platforms") {
      const current = new Set(onboardingDraft.platforms || []);
      if (current.has(value)) {
        current.delete(value);
      } else {
        current.add(value);
      }
      onboardingDraft.platforms = [...current];
    } else {
      onboardingDraft[group] = value;
      if (group === "carOwnership" && value === "own") {
        onboardingDraft.rentAmount = "";
        onboardingDraft.rentFrequency = "";
        onboardingDraft.rentPaymentDay = "";
      }
    }

    saveOnboardingDraft();
    updateChoiceButtons();
  });
});

function setView(view) {
  const nextView = ["dashboard", "start", "archive", "data", "history", "profile"].includes(view) ? view : "home";
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
  const odometerEnd = readNumber(formData, "odometerEnd");
  if (pendingShiftFinish.odometerStart && odometerEnd < Number(pendingShiftFinish.odometerStart)) {
    const field = elements.finishShiftForm.elements.odometerEnd;
    field.setCustomValidity("Пробег после смены не может быть меньше стартового.");
    field.reportValidity();
    field.setCustomValidity("");
    return;
  }

  let nextShift = runnerShiftFromForm(formData);
  nextShift = await saveShiftToCloud(nextShift);
  shifts.push(nextShift);
  await sendToGoogleSheet("shift", nextShift);
  if (Number(nextShift.odometerEnd || 0) > 0) {
    userProfile = { ...userProfile, odometer: Number(nextShift.odometerEnd).toFixed(1) };
    writeStorage(JSON.stringify(userProfile), PROFILE_STORAGE_KEY);
    fillProfileForm();
    await saveUserProfile(userProfile);
  }

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
  saveWeeklyGoal(Number(elements.goalInput.value));
  scheduleSettingsSave();
  renderAll();
});

elements.goalInput?.addEventListener("input", () => {
  const nextGoal = Number(elements.goalInput.value);
  if (!Number.isFinite(nextGoal) || nextGoal <= 0) return;
  saveWeeklyGoal(nextGoal);
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
  const shouldClear = window.confirm(
    "Точно удалить все смены и расходы? Данные будут удалены из приложения и Supabase для текущего пользователя.",
  );
  if (!shouldClear) return;

  const [shiftsCleared, expensesCleared] = await Promise.all([
    replaceCloudTable("shifts", []),
    replaceCloudTable("expenses", []),
  ]);

  if (!shiftsCleared || !expensesCleared) {
    setSyncStatus("Не удалось очистить Supabase. Данные оставлены на месте, чтобы они не вернулись после перезагрузки.");
    return;
  }

  shifts = [];
  expenses = [];
  selectedDay = dateKey(new Date());
  if (elements.dayPicker) elements.dayPicker.value = selectedDay;
  resetShiftForm();
  resetExpenseForm();
  saveShifts();
  saveExpenses();
  setSyncStatus("Данные удалены из приложения и Supabase.");
  renderAll();
});

resetShiftForm();
resetExpenseForm();
renderShiftRunner();
if (elements.dayPicker) elements.dayPicker.value = selectedDay;
setupTelegramMiniApp();
registerServiceWorker();
preventAccidentalZoom();
setupAppPickers();
setupPullToRefresh();
updateDayPickerVisibility();
setView(location.hash.replace("#", ""));
renderCsvSyncStatus();
updateAccessFlow();
renderAll();
initializeAuth().then(async (isSignedIn) => {
  renderProfile();
  if (!isSignedIn) return;
  const isCloudReady = await loadCloudData();
  if (isCloudReady) {
    const hasCloudSettings = await loadCloudSettings();
    setupRealtimeSync({ includeSettings: hasCloudSettings });
  }
});
