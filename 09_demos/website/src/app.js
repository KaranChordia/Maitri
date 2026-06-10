const waitlistKey = "maitri.waitlist.entries.v1";

function getEntries() {
  try {
    return JSON.parse(localStorage.getItem(waitlistKey) || "[]");
  } catch {
    return [];
  }
}

function saveEntry(entry) {
  const entries = getEntries();
  entries.unshift(entry);
  localStorage.setItem(waitlistKey, JSON.stringify(entries.slice(0, 250)));
}

function countBy(entries, key) {
  return entries.reduce((counts, entry) => {
    const value = String(entry[key] || "Unspecified");
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function formatCounts(label, counts) {
  const rows = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, count]) => `${name}: ${count}`);
  return rows.length ? `${label}: ${rows.join(" | ")}` : `${label}: none yet`;
}

function buildLocalReport(entries) {
  return {
    total: entries.length,
    bySegment: countBy(entries, "segment"),
    byChildAge: countBy(entries, "childAge"),
    byStoryPreference: countBy(entries, "storyPreference"),
    betaReaderOptIns: entries.filter((entry) => entry.betaReaderInterest?.startsWith("Yes")).length,
    schoolInterest: entries.filter((entry) => entry.schoolInterest?.startsWith("Yes")).length,
    likelyPreorder: entries.filter((entry) => entry.preorderSignal?.includes("Likely")).length,
    latest: entries[0]
      ? {
          segment: entries[0].segment,
          interests: entries[0].interests.join(", "),
        }
      : null,
  };
}

function renderReport(report, source) {
  const state = document.querySelector("#waitlistState");
  if (!state) return;

  if (!report.total) {
    state.textContent = `${source}: ready to collect founder interest.`;
    return;
  }

  const latestInterests =
    typeof report.latest?.interests === "string" && report.latest.interests.length
      ? report.latest.interests
      : "general updates";

  state.textContent = [
    `${source}: ${report.total} signup${report.total === 1 ? "" : "s"} captured`,
    formatCounts("Segments", report.bySegment),
    formatCounts("Child ages", report.byChildAge),
    formatCounts("Story preference", report.byStoryPreference),
    `Beta-reader opt-ins: ${report.betaReaderOptIns}`,
    `School interest: ${report.schoolInterest}`,
    `Likely preorder signal: ${report.likelyPreorder}`,
    `Latest: ${report.latest?.segment || "Unspecified"}, interested in ${latestInterests}.`,
  ].join("\n");
}

async function renderWaitlistState() {
  const entries = getEntries();
  renderReport(buildLocalReport(entries), "Local development report");
}

function csvEscape(value) {
  return `"${String(value || "").replaceAll('"', '""')}"`;
}

function downloadEntriesCsv() {
  const entries = getEntries();
  const headers = [
    "createdAt",
    "name",
    "email",
    "childAge",
    "segment",
    "interests",
    "storyPreference",
    "betaReaderInterest",
    "schoolInterest",
    "preorderSignal",
    "objection",
  ];
  const rows = entries.map((entry) =>
    headers
      .map((header) => csvEscape(Array.isArray(entry[header]) ? entry[header].join("; ") : entry[header]))
      .join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "maitri-local-interest-signals.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function applyTheme(theme) {
  const themeToggle = document.querySelector("#themeToggle");
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("maitri.theme", theme);
  themeToggle?.setAttribute("aria-pressed", String(theme === "dark"));
  themeToggle?.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
}

function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#siteNav");
  const themeToggle = document.querySelector("#themeToggle");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }
  });

  themeToggle?.addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });

  applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
}

function setupWaitlistForm() {
  const form = document.querySelector("#maitriWaitlistForm");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const entry = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      childAge: String(data.get("childAge") || "").trim(),
      segment: String(data.get("segment") || "").trim(),
      interests: data.getAll("interest").map(String),
      storyPreference: String(data.get("storyPreference") || "").trim(),
      betaReaderInterest: String(data.get("betaReaderInterest") || "").trim(),
      schoolInterest: String(data.get("schoolInterest") || "").trim(),
      preorderSignal: String(data.get("preorderSignal") || "").trim(),
      objection: String(data.get("objection") || "").trim(),
      createdAt: new Date().toISOString(),
    };

    saveEntry(entry);
    await renderWaitlistState();
    form.reset();

    const button = form.querySelector('button[type="submit"]');
    if (button) {
      const oldText = button.textContent || "Join the Waitlist";
      button.textContent = "You are in the Circle";
      window.setTimeout(() => {
        button.textContent = oldText;
      }, 1800);
    }
  });
}

function setupReportActions() {
  document.querySelector("#refreshReport")?.addEventListener("click", () => {
    void renderWaitlistState();
  });
  document.querySelector("#downloadReport")?.addEventListener("click", downloadEntriesCsv);
}

function setupReveal() {
  const items = Array.from(document.querySelectorAll(".reveal"));
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
    observer.observe(item);
  });
}

setupNavigation();
setupWaitlistForm();
setupReportActions();
setupReveal();
void renderWaitlistState();
