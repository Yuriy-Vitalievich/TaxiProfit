const STORAGE_KEY = "taxiProfit.shifts.v3";
const EXPENSE_STORAGE_KEY = "taxiProfit.expenses.v1";
const MONTH_GOAL = 70000;

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
  dayPickerWrap: document.querySelector("#dayPickerWrap"),
  dayPicker: document.querySelector("#dayPicker"),
  viewButtons: document.querySelectorAll("[data-view]"),
  viewPanels: document.querySelectorAll("[data-view-panel]"),
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
  rawShiftList: document.querySelector("#rawShiftList"),
  csvImport: document.querySelector("#csvImport"),
  expenseForm: document.querySelector("#expenseForm"),
  expenseDateInput: document.querySelector("#expenseForm [name='date']"),
  expenseImport: document.querySelector("#expenseImport"),
  clearData: document.querySelector("#clearData"),
  loadDemo: document.querySelector("#loadDemo"),
};

let activePeriod = "all";
let shifts = loadShifts();
let expenses = loadExpenses();
let selectedDay = latestDataDate();

function loadShifts() {
  const saved = readStorage();
  if (!saved) return [...seedShifts];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(normalizeShift) : [...seedShifts];
  } catch {
    return [...seedShifts];
  }
}

function saveShifts() {
  writeStorage(JSON.stringify(shifts));
}

function loadExpenses() {
  const saved = readStorage(EXPENSE_STORAGE_KEY);
  if (!saved) return [...seedExpenses];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(normalizeExpense) : [...seedExpenses];
  } catch {
    return [...seedExpenses];
  }
}

function saveExpenses() {
  writeStorage(JSON.stringify(expenses), EXPENSE_STORAGE_KEY);
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
    Number(shift.grossBolt || 0) + Number(shift.grossUklon || 0) + Number(shift.grossCash || 0);
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
  };
}

function normalizeExpense(expense) {
  return {
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

function sortedShifts() {
  return [...shifts].sort((a, b) => dateValue(b) - dateValue(a));
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

function periodBounds(period) {
  const end = todayValue();
  const start = new Date(end);

  if (period === "day") {
    const selected = selectedDay || latestDataDate();
    const dayStart = new Date(`${selected}T00:00:00`);
    const dayEnd = new Date(`${selected}T23:59:59.999`);
    return { start: dayStart, end: dayEnd };
  }

  if (period === "today") {
    start.setHours(0, 0, 0, 0);
  }

  if (period === "week") {
    const mondayOffset = (end.getDay() + 6) % 7;
    start.setDate(end.getDate() - mondayOffset);
    start.setHours(0, 0, 0, 0);
  }

  if (period === "month") {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
  }

  if (period === "year") {
    start.setMonth(0, 1);
    start.setHours(0, 0, 0, 0);
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
  const knownDays = new Set(current.map((shift) => shift.date).filter(Boolean));
  const shiftsWorked = workedDays.size;
  const daysOff = [...knownDays].filter((date) => !workedDays.has(date)).length;
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
  const progress = Math.min(100, Math.round((monthNet / MONTH_GOAL) * 100));
  const rest = Math.max(0, MONTH_GOAL - monthNet);

  elements.goalPercent.textContent = `${progress}%`;
  elements.goalProgress.style.width = `${progress}%`;
  elements.goalText.textContent = rest
    ? `Осталось ${money(rest)}. При текущем темпе цель близко к концу месяца.`
    : "Цель месяца закрыта. Все, дальше уже бонусная зона.";
}

function dayRecords(period) {
  const source = currentRange(period === "day" ? "day" : period);
  const grouped = new Map();

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
      const netValue = record.gross - record.expenses;

      return `
        <article class="day-card ${className}">
          <div>
            <strong>${formatDate(record.date)}</strong>
            <span>${status}</span>
          </div>
          <p>${record.isWorkday ? `${Number(record.hours.toFixed(1))} ч · ${record.orders} заказов` : "без смены"}</p>
          <b>${money(netValue)}</b>
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
          <span>${formatDate(record.date)}</span>
          <span><i class="status-chip ${record.isWorkday ? "work" : "off"}">${record.isWorkday ? "Рабочий" : "Выходной"}</i></span>
          <span>${money(record.gross)}</span>
          <strong>${money(clean)}</strong>
          <span class="score ${scoreClass}">${record.isWorkday ? `${efficiency}%` : "—"}</span>
        </div>
      `;
    })
    .join("");

  elements.shiftTable.querySelectorAll(".table-row:not(.table-head)").forEach((row) => row.remove());
  elements.shiftTable.insertAdjacentHTML("beforeend", rows);

  const shiftCards = sortedShifts()
    .map(
      (shift, index) => `
        <article class="raw-shift ${isWorkShift(shift) ? "" : "off-shift"}">
          <div>
            <strong>${shift.date} · ${isWorkShift(shift) ? `${shift.start || "—"}–${shift.end || "—"}` : "Выходной"}</strong>
            <span>${isWorkShift(shift) ? `${shift.hours} ч · ${totalOrders(shift)} заказов · ${Number(shift.km || 0).toFixed(1)} км · ${money(net(shift))} чистыми` : "нулевой день, в средние за смену не входит"}</span>
          </div>
          <button type="button" data-delete-index="${index}" aria-label="Удалить смену">×</button>
        </article>
      `,
    )
    .join("");

  const expenseCards = sortedExpenses()
    .map(
      (expense, index) => `
        <article class="raw-shift expense-row">
          <div>
            <strong>${expense.date} · ${expense.category}</strong>
            <span>${expense.description || "без описания"} · ${money(expense.amount)} · ${expense.payment || "оплата не указана"}</span>
          </div>
          <button type="button" data-delete-expense-index="${index}" aria-label="Удалить расход">×</button>
        </article>
      `,
    )
    .join("");

  elements.rawShiftList.innerHTML = shiftCards + expenseCards;
}

function sortedExpenses() {
  return [...expenses].sort((a, b) => new Date(`${b.date}T12:00`) - new Date(`${a.date}T12:00`));
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
    .filter((row) => parseSheetDate(row[0]) && (parseLocalNumber(row[4]) > 0 || parseLocalNumber(row[11]) > 0))
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
    elements.periodButtons.forEach((item) => item.classList.toggle("active", item === button));
    updateDayPickerVisibility();
    renderAll();
  });
});

elements.dayPicker.addEventListener("change", () => {
  selectedDay = elements.dayPicker.value || latestDataDate();
  if (activePeriod !== "day") {
    activePeriod = "day";
    elements.periodButtons.forEach((item) => item.classList.toggle("active", item.dataset.period === "day"));
    updateDayPickerVisibility();
  }
  renderAll();
});

elements.viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setView(button.dataset.view);
  });
});

function setView(view) {
  const nextView = view === "data" ? "data" : "dashboard";
  elements.viewButtons.forEach((item) => item.classList.toggle("active", item.dataset.view === nextView));
  elements.viewPanels.forEach((panel) => panel.classList.toggle("active", panel.dataset.viewPanel === nextView));
}

function updateDayPickerVisibility() {
  elements.dayPickerWrap.classList.toggle("active", activePeriod === "day");
}

window.addEventListener("hashchange", () => {
  setView(location.hash.replace("#", ""));
});

elements.shiftForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(elements.shiftForm);

  shifts.push({
    date: formData.get("date"),
    start: formData.get("start"),
    end: formData.get("end"),
    hours: readNumber(formData, "hours"),
    ordersBolt: readNumber(formData, "ordersBolt"),
    ordersUklon: readNumber(formData, "ordersUklon"),
    ordersCash: readNumber(formData, "ordersCash"),
    grossBolt: readNumber(formData, "grossBolt"),
    grossUklon: readNumber(formData, "grossUklon"),
    grossCash: readNumber(formData, "grossCash"),
    gross:
      readNumber(formData, "gross") ||
      readNumber(formData, "grossBolt") + readNumber(formData, "grossUklon") + readNumber(formData, "grossCash"),
    fuel: readNumber(formData, "fuel"),
    rent: readNumber(formData, "rent"),
    other: readNumber(formData, "other"),
    km: readNumber(formData, "km"),
    comment: formData.get("comment"),
  });

  saveShifts();
  elements.shiftForm.reset();
  elements.dateInput.value = new Date().toISOString().slice(0, 10);
  elements.startInput.value = "17:30";
  elements.endInput.value = "23:30";
  selectedDay = latestDataDate();
  elements.dayPicker.value = selectedDay;
  renderAll();
});

elements.csvImport.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const imported = shiftsFromCSV(await file.text());
  if (imported.length) {
    shifts = imported;
    selectedDay = latestDataDate();
    elements.dayPicker.value = selectedDay;
    saveShifts();
    renderAll();
  }

  event.target.value = "";
});

elements.expenseImport.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const imported = expensesFromCSV(await file.text());
  if (imported.length) {
    expenses = imported;
    saveExpenses();
    renderAll();
  }

  event.target.value = "";
});

elements.expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(elements.expenseForm);

  expenses.push(
    normalizeExpense({
      date: formData.get("date"),
      category: formData.get("category"),
      description: formData.get("description"),
      amount: readNumber(formData, "amount"),
      payment: formData.get("payment"),
      comment: formData.get("comment"),
    }),
  );

  saveExpenses();
  elements.expenseForm.reset();
  elements.expenseDateInput.value = new Date().toISOString().slice(0, 10);
  renderAll();
});

elements.rawShiftList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-index]");
  if (!button) return;

  const ordered = sortedShifts();
  const shiftToDelete = ordered[Number(button.dataset.deleteIndex)];
  shifts = shifts.filter((shift) => shift !== shiftToDelete);
  selectedDay = latestDataDate();
  elements.dayPicker.value = selectedDay;
  saveShifts();
  renderAll();
});

elements.rawShiftList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-expense-index]");
  if (!button) return;

  const ordered = sortedExpenses();
  const expenseToDelete = ordered[Number(button.dataset.deleteExpenseIndex)];
  expenses = expenses.filter((expense) => expense !== expenseToDelete);
  saveExpenses();
  renderAll();
});

elements.clearData.addEventListener("click", () => {
  shifts = [];
  expenses = [];
  selectedDay = new Date().toISOString().slice(0, 10);
  elements.dayPicker.value = selectedDay;
  saveShifts();
  saveExpenses();
  renderAll();
});

elements.loadDemo.addEventListener("click", () => {
  shifts = [...seedShifts];
  expenses = [...seedExpenses];
  selectedDay = latestDataDate();
  elements.dayPicker.value = selectedDay;
  saveShifts();
  saveExpenses();
  renderAll();
});

elements.dateInput.value = new Date().toISOString().slice(0, 10);
elements.expenseDateInput.value = new Date().toISOString().slice(0, 10);
elements.dayPicker.value = selectedDay;
updateDayPickerVisibility();
setView(location.hash.replace("#", ""));
renderAll();
