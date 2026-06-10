"use client";

import { useEffect } from "react";

const waitlistKey = "maitri.waitlist.entries.v1";

type WaitlistEntry = {
  name: string;
  email: string;
  childAge: string;
  segment: string;
  interests: string[];
  storyPreference: string;
  betaReaderInterest: string;
  schoolInterest: string;
  preorderSignal: string;
  objection: string;
  createdAt: string;
};

type SignalReport = {
  total: number;
  bySegment: Record<string, number>;
  byChildAge: Record<string, number>;
  byStoryPreference: Record<string, number>;
  betaReaderOptIns: number;
  schoolInterest: number;
  likelyPreorder: number;
  latest?: {
    segment?: string;
    interests?: string;
  } | null;
};

function getEntries() {
  try {
    return JSON.parse(localStorage.getItem(waitlistKey) || "[]") as WaitlistEntry[];
  } catch {
    return [];
  }
}

function shouldUseLiveApi() {
  return !["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
}

function saveEntry(entry: WaitlistEntry) {
  const entries = getEntries();
  entries.unshift(entry);
  localStorage.setItem(waitlistKey, JSON.stringify(entries.slice(0, 250)));
}

function countBy(entries: WaitlistEntry[], key: keyof WaitlistEntry) {
  return entries.reduce<Record<string, number>>((counts, entry) => {
    const value = String(entry[key] || "Unspecified");
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function formatCounts(label: string, counts: Record<string, number>) {
  const rows = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, count]) => `${name}: ${count}`);
  return rows.length ? `${label}: ${rows.join(" | ")}` : `${label}: none yet`;
}

function buildLocalReport(entries: WaitlistEntry[]) {
  return {
    total: entries.length,
    bySegment: countBy(entries, "segment"),
    byChildAge: countBy(entries, "childAge"),
    byStoryPreference: countBy(entries, "storyPreference"),
    betaReaderOptIns: entries.filter((entry) =>
      entry.betaReaderInterest?.startsWith("Yes"),
    ).length,
    schoolInterest: entries.filter((entry) =>
      entry.schoolInterest?.startsWith("Yes"),
    ).length,
    likelyPreorder: entries.filter((entry) =>
      entry.preorderSignal?.includes("Likely"),
    ).length,
    latest: entries[0]
      ? {
          segment: entries[0].segment,
          interests: entries[0].interests.join(", "),
        }
      : null,
  };
}

function renderReport(report: SignalReport, source: string) {
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
  const state = document.querySelector("#waitlistState");
  if (!state) return;

  if (shouldUseLiveApi()) {
    try {
      const response = await fetch("/api/interest");
      if (response.ok) {
        renderReport((await response.json()) as SignalReport, "Live signal report");
        return;
      }
    } catch {
      // Deployed capture should use D1, but browser storage keeps the UI usable if the endpoint is unavailable.
    }
  }

  const entries = getEntries();
  renderReport(buildLocalReport(entries), "Local development report");
}

function csvEscape(value: unknown) {
  return `"${String(value || "").replaceAll('"', '""')}"`;
}

function downloadEntriesCsv() {
  const entries = getEntries();
  const headers: (keyof WaitlistEntry)[] = [
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
      .map((header) =>
        csvEscape(Array.isArray(entry[header]) ? entry[header].join("; ") : entry[header]),
      )
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

export function MaitriInteractions() {
  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>("#maitriWaitlistForm");
    const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
    const nav = document.querySelector<HTMLElement>("#siteNav");
    const themeToggle = document.querySelector<HTMLButtonElement>("#themeToggle");
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    const applyTheme = (theme: "light" | "dark") => {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("maitri.theme", theme);
      themeToggle?.setAttribute("aria-pressed", String(theme === "dark"));
      themeToggle?.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
      );
    };

    applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");

    const onToggleClick = () => {
      if (!toggle || !nav) return;
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    };

    const onNavClick = (event: Event) => {
      if (event.target instanceof HTMLAnchorElement && toggle && nav) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    };

    const onThemeToggle = () => {
      applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    };

    const onFormSubmit = async (event: SubmitEvent) => {
      event.preventDefault();
      if (!form) return;

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

      let savedLive = false;
      if (shouldUseLiveApi()) {
        try {
          const response = await fetch("/api/interest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
          });
          savedLive = response.ok;
        } catch {
          savedLive = false;
        }
      }

      if (!savedLive) {
        saveEntry(entry);
      }

      await renderWaitlistState();
      form.reset();

      const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (button) {
        const oldText = button.textContent || "Join the Waitlist";
        button.textContent = "You are in the Circle";
        window.setTimeout(() => {
          button.textContent = oldText;
        }, 1800);
      }
    };

    const onRefreshReport = () => {
      void renderWaitlistState();
    };

    const onDownloadReport = () => {
      downloadEntriesCsv();
    };

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16 },
      );

      revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
        observer?.observe(item);
      });
    } else {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    toggle?.addEventListener("click", onToggleClick);
    nav?.addEventListener("click", onNavClick);
    themeToggle?.addEventListener("click", onThemeToggle);
    form?.addEventListener("submit", onFormSubmit);
    document.querySelector("#refreshReport")?.addEventListener("click", onRefreshReport);
    document.querySelector("#downloadReport")?.addEventListener("click", onDownloadReport);
    void renderWaitlistState();

    return () => {
      toggle?.removeEventListener("click", onToggleClick);
      nav?.removeEventListener("click", onNavClick);
      themeToggle?.removeEventListener("click", onThemeToggle);
      form?.removeEventListener("submit", onFormSubmit);
      document.querySelector("#refreshReport")?.removeEventListener("click", onRefreshReport);
      document.querySelector("#downloadReport")?.removeEventListener("click", onDownloadReport);
      observer?.disconnect();
    };
  }, []);

  return null;
}
