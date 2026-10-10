// ── Mobile navigation ─────────────────────────────────────────
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav    = document.getElementById("primary-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.textContent = isOpen ? "✕" : "☰";
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // Close menu when a nav link is tapped
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.textContent = "☰";
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ── Active nav link ───────────────────────────────────────────
function setActiveNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#primary-nav a").forEach(link => {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

// ── Footer dates ──────────────────────────────────────────────
function setFooterDates() {
  const yearEl = document.getElementById("currentyear");
  const modEl  = document.getElementById("lastModified");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl)  modEl.textContent  = `Last Modified: ${document.lastModified}`;
}

initNav();
setActiveNav();
setFooterDates();
