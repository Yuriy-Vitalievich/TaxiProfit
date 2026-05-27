const APP_VERSION = "blank-shell-1";
const VIEW_IDS = new Set(["home", "dashboard", "start", "archive", "data", "history", "profile"]);

const tg = window.Telegram?.WebApp;

if (tg) {
  document.documentElement.classList.add("has-telegram-sdk");
  try {
    tg.ready();
    tg.expand();
    tg.disableVerticalSwipes?.();
  } catch (error) {
    console.warn("Telegram shell init skipped", error);
  }
}

const sideMenu = document.querySelector("#sideMenu");
const menuOverlay = document.querySelector("#menuOverlay");
const menuToggle = document.querySelector("#menuToggle");
const menuClose = document.querySelector("#menuClose");
const profileButton = document.querySelector("#profileButton");
const settingsButton = document.querySelector("#settingsButton");
const navLinks = [...document.querySelectorAll("[data-view]")];
const viewPanels = [...document.querySelectorAll("[data-view-panel]")];
const pullRefresh = document.querySelector("#pullRefresh");

function viewFromHash() {
  const hash = window.location.hash.replace("#", "");
  return VIEW_IDS.has(hash) ? hash : "home";
}

function openMenu() {
  if (!sideMenu || !menuOverlay) return;
  sideMenu.classList.add("open");
  sideMenu.setAttribute("aria-hidden", "false");
  menuOverlay.hidden = false;
  menuToggle?.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  if (!sideMenu || !menuOverlay) return;
  sideMenu.classList.remove("open");
  sideMenu.setAttribute("aria-hidden", "true");
  menuOverlay.hidden = true;
  menuToggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function setView(viewId, options = {}) {
  const nextView = VIEW_IDS.has(viewId) ? viewId : "home";

  viewPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.viewPanel === nextView);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.view === nextView);
  });

  if (options.updateHash !== false && window.location.hash !== `#${nextView}`) {
    if (options.replace) {
      window.history.replaceState(null, "", `#${nextView}`);
    } else {
      window.location.hash = nextView;
    }
  }

  closeMenu();
  window.scrollTo({ top: 0, behavior: options.instant ? "auto" : "smooth" });
}

function applyTelegramUser() {
  const user = tg?.initDataUnsafe?.user;
  if (!user) return;

  const name = [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username || "TaxiProfit";
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  document.querySelector("#profileButton").textContent = initials || "ТП";
  document.querySelector("#sideUserAvatar").textContent = initials || "ТП";
  document.querySelector("#sideUserName").textContent = name;
  document.querySelector("#sideUserSubtitle").textContent = user.username ? `@${user.username}` : "Кабинет водителя";
}

function initNavigation() {
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setView(link.dataset.view);
    });
  });

  document.querySelectorAll("button[data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  profileButton?.addEventListener("click", () => setView("profile"));
  settingsButton?.addEventListener("click", () => setView("profile"));
  menuToggle?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);
  menuOverlay?.addEventListener("click", closeMenu);

  window.addEventListener("hashchange", () => setView(viewFromHash(), { updateHash: false, instant: true }));
}

function initSwipeMenu() {
  let startX = 0;
  let startY = 0;
  let tracking = false;

  window.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      tracking = startX <= 28 || document.body.classList.contains("menu-open");
    },
    { passive: true },
  );

  window.addEventListener(
    "touchend",
    (event) => {
      if (!tracking) return;
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = Math.abs(touch.clientY - startY);

      if (deltaY < 80 && deltaX > 70 && startX <= 36) {
        openMenu();
      }

      if (deltaY < 80 && deltaX < -70 && document.body.classList.contains("menu-open")) {
        closeMenu();
      }

      tracking = false;
    },
    { passive: true },
  );
}

function initPullRefresh() {
  if (!pullRefresh) return;

  let startY = 0;
  let pulling = false;

  window.addEventListener(
    "touchstart",
    (event) => {
      if (window.scrollY > 0) return;
      startY = event.touches[0].clientY;
      pulling = true;
    },
    { passive: true },
  );

  window.addEventListener(
    "touchmove",
    (event) => {
      if (!pulling || window.scrollY > 0) return;
      const distance = Math.max(0, event.touches[0].clientY - startY);
      const visible = Math.min(distance, 86);
      pullRefresh.style.transform = `translate(-50%, ${visible}px)`;
      pullRefresh.classList.toggle("visible", distance > 24);
    },
    { passive: true },
  );

  window.addEventListener(
    "touchend",
    () => {
      if (!pulling) return;
      pulling = false;
      pullRefresh.classList.remove("visible");
      pullRefresh.style.transform = "";
    },
    { passive: true },
  );
}

async function initServiceWorker() {
  if (!("serviceWorker" in navigator) || window.location.protocol === "file:") return;

  try {
    const registration = await navigator.serviceWorker.register(`service-worker.js?v=${APP_VERSION}`);
    await registration.update();
  } catch (error) {
    console.warn("Service worker registration skipped", error);
  }
}

applyTelegramUser();
initNavigation();
initSwipeMenu();
initPullRefresh();
setView(viewFromHash(), { replace: true, instant: true });
initServiceWorker();
