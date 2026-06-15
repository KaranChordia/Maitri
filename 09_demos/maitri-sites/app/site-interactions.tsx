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

function buildLocalReport(entries: WaitlistEntry[]) {
  return {
    total: entries.length,
  };
}

function renderReport(report: SignalReport) {
  const state = document.querySelector("#waitlistState");
  if (!state) return;

  if (!report.total) {
    state.textContent = "Join the circle for early stories and launch updates.";
    return;
  }

  state.textContent = "Thank you. You are in the Maitri Circle.";
}

async function renderWaitlistState() {
  const state = document.querySelector("#waitlistState");
  if (!state) return;

  if (shouldUseLiveApi()) {
    try {
      const response = await fetch("/api/interest");
      if (response.ok) {
        renderReport((await response.json()) as SignalReport);
        return;
      }
    } catch {
      // Deployed capture should use D1, but browser storage keeps the UI usable if the endpoint is unavailable.
    }
  }

  const entries = getEntries();
  renderReport(buildLocalReport(entries));
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
    void renderWaitlistState();

    return () => {
      toggle?.removeEventListener("click", onToggleClick);
      nav?.removeEventListener("click", onNavClick);
      themeToggle?.removeEventListener("click", onThemeToggle);
      form?.removeEventListener("submit", onFormSubmit);
      observer?.disconnect();
    };
  }, []);

  return null;
}
