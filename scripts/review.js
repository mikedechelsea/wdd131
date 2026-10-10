// ── Review counter ────────────────────────────────────────────
const STORAGE_KEY = "reviewCount";
let count = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
count += 1;
localStorage.setItem(STORAGE_KEY, count);
document.getElementById("review-count").textContent = count;

// ── Parse submitted data from URL (form used method=get) ──────
const params = new URLSearchParams(window.location.search);

function display(id, key, fallback) {
  const el = document.getElementById(id);
  if (el) el.textContent = params.get(key) || fallback;
}

display("rv-product",  "product-name", "—");
display("rv-rating",   "rating",       "—");
display("rv-date",     "install-date", "—");
display("rv-review",   "written-review", "(none)");
display("rv-username", "username",     "Anonymous");

// Features is multi-value; getAll returns an array
const features = params.getAll("features");
document.getElementById("rv-features").textContent =
  features.length ? features.join(", ") : "None selected";

// ── Footer dates ──────────────────────────────────────────────
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  "Last Modification: " + document.lastModified;
