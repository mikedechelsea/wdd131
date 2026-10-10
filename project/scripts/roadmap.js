// ── Phase data ────────────────────────────────────────────────
const phases = [
  {
    id: "phase1",
    title: "Phase 1 — Build Your Foundation",
    weeks: "Weeks 1–4",
    tasks: [
      "Learn spreadsheet skills: formulas, sorting, filtering, and pivot tables in Excel",
      "Understand descriptive statistics: mean, median, mode, and standard deviation",
      "Get familiar with data types: numbers, text, dates, and categories",
      "Explore free resources: Microsoft Learn Excel Training, Khan Academy Statistics"
    ]
  },
  {
    id: "phase2",
    title: "Phase 2 — Learn SQL",
    weeks: "Weeks 5–8",
    tasks: [
      "Understand how relational databases and tables work",
      "Write SELECT, WHERE, GROUP BY, ORDER BY, and JOIN queries",
      "Practice on SQLZoo, Mode Analytics, or W3Schools SQL Tutorial",
      "Mini-project: query a sample sales database and answer five business questions"
    ]
  },
  {
    id: "phase3",
    title: "Phase 3 — Learn Python Basics",
    weeks: "Weeks 9–14",
    tasks: [
      "Install Python and Jupyter Notebook via Anaconda",
      "Learn Python fundamentals: variables, loops, functions, lists, and dictionaries",
      "Explore Pandas for loading, filtering, grouping, and cleaning datasets",
      "Create charts with Matplotlib or Seaborn and publish a notebook on GitHub"
    ]
  },
  {
    id: "phase4",
    title: "Phase 4 — Learn Data Visualization",
    weeks: "Weeks 15–18",
    tasks: [
      "Choose Power BI (Windows) or Tableau Public (free, cross-platform)",
      "Connect to data, write DAX measures or calculated fields, and build a dashboard",
      "Apply dashboard design principles: simplicity, contrast, alignment, and hierarchy",
      "Mini-project: build a one-page business dashboard and share the public link"
    ]
  },
  {
    id: "phase5",
    title: "Phase 5 — Work on Real Projects",
    weeks: "Weeks 19–24",
    tasks: [
      "Complete at least three projects using real public datasets from Kaggle or data.gov",
      "Document your process, decisions, and findings clearly in each project",
      "Publish your work on GitHub and write short case-study summaries",
      "Explore introductory statistics and machine learning concepts to expand your skills"
    ]
  }
];

const PROGRESS_KEY = "datastartProgress";

// ── Render roadmap phases ─────────────────────────────────────
function renderPhases() {
  const container = document.getElementById("phases-container");
  if (!container) return;

  const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]");

  container.innerHTML = phases.map(phase => `
    <div class="phase-card">
      <div class="phase-head">
        <h3>${phase.title}</h3>
        <span class="weeks-badge">${phase.weeks}</span>
      </div>
      <div class="phase-body">
        <ul>
          ${phase.tasks.map(t => `<li>${t}</li>`).join("")}
        </ul>
        <label class="phase-complete">
          <input type="checkbox" id="${phase.id}-done"
            ${saved.includes(phase.id) ? "checked" : ""}
            data-phase="${phase.id}">
          Mark phase as complete
        </label>
      </div>
    </div>
  `).join("");

  container.querySelectorAll("input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", saveProgress);
  });

  updateOverallProgress();
}

function saveProgress() {
  const completed = phases
    .filter(p => document.getElementById(`${p.id}-done`)?.checked)
    .map(p => p.id);
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed));
  updateOverallProgress();
}

function updateOverallProgress() {
  const saved  = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]");
  const total  = phases.length;
  const done   = saved.length;
  const pct    = Math.round((done / total) * 100);
  const bar    = document.getElementById("overall-progress-bar");
  const label  = document.getElementById("overall-progress-label");
  if (bar)   bar.style.width   = `${pct}%`;
  if (label) label.textContent = `${done} of ${total} phases complete — ${pct}% of your roadmap done!`;
}

// ── Goal form ─────────────────────────────────────────────────
function buildPersonalizedPlan(data) {
  const { name, level, goal, topics, hours } = data;

  // Determine starting phase based on experience
  let startPhase;
  if (level === "complete-beginner") {
    startPhase = "Phase 1 (Foundation)";
  } else if (level === "some-excel") {
    startPhase = "Phase 2 (SQL)";
  } else if (level === "know-sql") {
    startPhase = "Phase 3 (Python)";
  } else {
    startPhase = "Phase 4 (Visualization)";
  }

  // Estimate timeline based on hours per week
  let timeline;
  if (hours === "1-3") {
    timeline = "approximately 18–24 months";
  } else if (hours === "4-7") {
    timeline = "approximately 10–14 months";
  } else if (hours === "8-14") {
    timeline = "approximately 6–8 months";
  } else {
    timeline = "approximately 4–6 months";
  }

  // Tool recommendation based on goal
  let toolRec;
  if (goal === "job") {
    toolRec = "SQL and Python — they appear in the highest number of analyst job postings.";
  } else if (goal === "current-job") {
    toolRec = "Microsoft Excel and Power BI — they are the fastest way to add value in most business roles.";
  } else if (goal === "personal") {
    toolRec = "Python and Tableau Public — great for personal projects you can share and explore freely.";
  } else {
    toolRec = "R and Python — both are widely used in academic and research settings.";
  }

  // Topic list from checkboxes
  const topicList = topics.length > 0
    ? topics.join(", ")
    : "a broad overview of all tools";

  const greeting = name.trim() ? `Hi ${name.trim()}, here` : "Here";

  return `
    <h3>Your Personalized Learning Plan</h3>
    <p>${greeting} is a plan tailored to your goals and schedule.</p>
    <p><strong>Where to start:</strong> Based on your current experience, begin at <strong>${startPhase}</strong>.</p>
    <p><strong>Estimated timeline:</strong> Studying at your available pace, completing the full roadmap should take <strong>${timeline}</strong>.</p>
    <p><strong>Recommended tools:</strong> Given your primary goal, prioritize <strong>${toolRec}</strong></p>
    <p><strong>Topics you selected:</strong> ${topicList}. Use the checklist on this page to track your progress as you work through each area.</p>
    <p>Scroll up to the roadmap phases and start checking off tasks as you complete them — your progress is saved automatically.</p>
  `;
}

function initGoalForm() {
  const form = document.getElementById("goal-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name   = form.querySelector("#goal-name").value;
    const level  = form.querySelector("#experience-level").value;
    const goal   = form.querySelector("input[name='primary-goal']:checked")?.value || "personal";
    const topics = [...form.querySelectorAll("input[name='topics']:checked")].map(cb => cb.value);
    const hours  = form.querySelector("#hours-per-week").value;

    const resultBox = document.getElementById("result-box");
    resultBox.innerHTML = buildPersonalizedPlan({ name, level, goal, topics, hours });
    resultBox.style.display = "block";
    resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// ── Init ──────────────────────────────────────────────────────
renderPhases();
initGoalForm();
