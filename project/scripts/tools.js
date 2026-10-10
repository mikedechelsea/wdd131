// ── Tool data ─────────────────────────────────────────────────
const tools = [
  {
    id: "sql",
    name: "SQL",
    category: "query",
    icon: "🗄️",
    level: "beginner",
    levelLabel: "Beginner-Friendly",
    what: "SQL (Structured Query Language) is the standard language for working with relational databases. It lets you retrieve, filter, aggregate, and join data across tables with simple, readable commands.",
    why: "Almost every data role requires SQL. It is the fastest path from raw database to usable insights and is listed in the majority of data analyst job postings."
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    category: "query",
    icon: "📊",
    level: "beginner",
    levelLabel: "Beginner-Friendly",
    what: "Excel is the world's most widely used spreadsheet application. It supports formulas, pivot tables, charts, and Power Query for data transformation — all without writing code.",
    why: "Excel is present in virtually every workplace and is an excellent starting point before moving to dedicated analytics tools."
  },
  {
    id: "python",
    name: "Python",
    category: "programming",
    icon: "🐍",
    level: "intermediate",
    levelLabel: "Intermediate",
    what: "Python is a versatile, readable programming language with powerful libraries for data analysis (Pandas, NumPy) and visualization (Matplotlib, Seaborn, Plotly).",
    why: "Python is the most popular language in data science and machine learning. Its readable syntax and huge ecosystem make it the best second tool to learn after SQL."
  },
  {
    id: "r",
    name: "R",
    category: "programming",
    icon: "📈",
    level: "intermediate",
    levelLabel: "Intermediate",
    what: "R is a language designed specifically for statistical computing and data visualization. It has a rich ecosystem of packages available through CRAN and Bioconductor.",
    why: "R excels at statistical analysis and academic research. It is widely used in healthcare, social science, and research environments where rigorous statistics are essential."
  },
  {
    id: "powerbi",
    name: "Power BI",
    category: "visualization",
    icon: "📉",
    level: "beginner",
    levelLabel: "Beginner-Friendly",
    what: "Power BI is Microsoft's business intelligence platform. It lets you connect to data sources, transform data with Power Query, and build interactive dashboards and reports.",
    why: "Power BI is one of the most in-demand visualization tools in business. Its drag-and-drop interface makes it accessible to beginners while scaling to enterprise needs."
  },
  {
    id: "tableau",
    name: "Tableau",
    category: "visualization",
    icon: "🎨",
    level: "beginner",
    levelLabel: "Beginner-Friendly",
    what: "Tableau is an industry-leading data visualization platform that lets users create interactive, shareable dashboards without writing code. Tableau Public is free to use.",
    why: "Tableau is frequently listed in analyst job postings and produces stunning visuals with minimal effort. Its community and free resources make learning straightforward."
  }
];

// ── Skills checklist data ─────────────────────────────────────
const skills = [
  { id: "sk1", text: "Write a basic SQL SELECT query with WHERE and GROUP BY" },
  { id: "sk2", text: "Create a pivot table and chart in Microsoft Excel" },
  { id: "sk3", text: "Load and explore a dataset using Python and Pandas" },
  { id: "sk4", text: "Build a bar chart or scatter plot using Matplotlib or Seaborn" },
  { id: "sk5", text: "Connect Power BI to a data source and publish a report" },
  { id: "sk6", text: "Create an interactive dashboard in Tableau Public" },
  { id: "sk7", text: "Complete a full end-to-end data analysis project" }
];

const SKILLS_KEY = "datastartSkills";

// ── Render tool cards ─────────────────────────────────────────
function renderToolCards(list) {
  const grid = document.getElementById("tools-grid");
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `<p class="section-intro">No tools match this filter.</p>`;
    return;
  }

  grid.innerHTML = list.map(tool => `
    <article class="tool-card" data-category="${tool.category}">
      <div class="tool-card-head">
        <span class="tool-icon" aria-hidden="true">${tool.icon}</span>
        <div class="tool-meta">
          <h3>${tool.name}</h3>
          <span class="level-badge ${tool.level}">${tool.levelLabel}</span>
        </div>
      </div>
      <div class="tool-card-body">
        <p>${tool.what}</p>
        <p class="tool-why">💡 ${tool.why}</p>
      </div>
    </article>
  `).join("");
}

// ── Filter buttons ────────────────────────────────────────────
function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      const filtered = filter === "all"
        ? tools
        : tools.filter(t => t.category === filter);

      renderToolCards(filtered);
    });
  });
}

// ── Skills checklist ──────────────────────────────────────────
function saveSkills() {
  const checked = skills
    .filter(s => document.getElementById(s.id)?.checked)
    .map(s => s.id);
  localStorage.setItem(SKILLS_KEY, JSON.stringify(checked));
}

function updateProgress() {
  const total   = skills.length;
  const done    = skills.filter(s => document.getElementById(s.id)?.checked).length;
  const pct     = Math.round((done / total) * 100);
  const bar     = document.getElementById("skills-progress-bar");
  const label   = document.getElementById("skills-progress-label");
  if (bar)   bar.style.width   = `${pct}%`;
  if (label) label.textContent = `${done} of ${total} skills completed (${pct}%)`;
}

function renderChecklist() {
  const list = document.getElementById("skills-checklist");
  if (!list) return;

  const saved = JSON.parse(localStorage.getItem(SKILLS_KEY) || "[]");

  list.innerHTML = skills.map(s => `
    <li>
      <label>
        <input type="checkbox" id="${s.id}" ${saved.includes(s.id) ? "checked" : ""}>
        <span>${s.text}</span>
      </label>
    </li>
  `).join("");

  list.querySelectorAll("input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", () => {
      saveSkills();
      updateProgress();
    });
  });

  updateProgress();
}

// ── Init ──────────────────────────────────────────────────────
const toolsGrid = document.getElementById("tools-grid");
if (toolsGrid) {
  renderToolCards(tools);
  initFilters();
}

renderChecklist();
