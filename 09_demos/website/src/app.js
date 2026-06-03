const waitlistKey = 'maitri.waitlist.entries.v1';

function getEntries() {
  try {
    return JSON.parse(localStorage.getItem(waitlistKey) || '[]');
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
    const value = entry[key] || 'Unspecified';
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function formatCounts(label, counts) {
  const rows = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, count]) => `${name}: ${count}`);
  return rows.length ? `${label}: ${rows.join(' | ')}` : `${label}: none yet`;
}

function buildSignalReport(entries) {
  const betaReaderCount = entries.filter((entry) => entry.betaReaderInterest?.startsWith('Yes')).length;
  const schoolInterestCount = entries.filter((entry) => entry.schoolInterest?.startsWith('Yes')).length;
  const preorderCount = entries.filter((entry) => entry.preorderSignal?.includes('Likely')).length;

  return [
    `${entries.length} local signup${entries.length === 1 ? '' : 's'} captured`,
    formatCounts('Segments', countBy(entries, 'segment')),
    formatCounts('Child ages', countBy(entries, 'childAge')),
    formatCounts('Story preference', countBy(entries, 'storyPreference')),
    `Beta-reader opt-ins: ${betaReaderCount}`,
    `School interest: ${schoolInterestCount}`,
    `Likely preorder signal: ${preorderCount}`,
  ].join('\n');
}

function csvEscape(value) {
  return `"${String(value || '').replaceAll('"', '""')}"`;
}

function downloadEntriesCsv() {
  const entries = getEntries();
  const headers = [
    'createdAt',
    'name',
    'email',
    'childAge',
    'segment',
    'interests',
    'storyPreference',
    'betaReaderInterest',
    'schoolInterest',
    'preorderSignal',
    'objection',
  ];
  const rows = entries.map((entry) =>
    headers
      .map((header) => csvEscape(Array.isArray(entry[header]) ? entry[header].join('; ') : entry[header]))
      .join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'maitri-local-interest-signals.csv';
  link.click();
  URL.revokeObjectURL(url);
}

function renderWaitlistState() {
  const state = document.querySelector('#waitlistState');
  if (!state) return;

  const entries = getEntries();
  if (!entries.length) {
    state.textContent = 'Current demo status: ready to collect founder interest locally.';
    return;
  }

  const latest = entries[0];
  const interests = latest.interests.length ? latest.interests.join(', ') : 'general updates';
  state.textContent = `${buildSignalReport(entries)}\nLatest: ${latest.segment}, interested in ${interests}.`;
}

function setupWaitlistForm() {
  const form = document.querySelector('#maitriWaitlistForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const entry = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      childAge: String(data.get('childAge') || '').trim(),
      segment: String(data.get('segment') || '').trim(),
      interests: data.getAll('interest').map(String),
      storyPreference: String(data.get('storyPreference') || '').trim(),
      betaReaderInterest: String(data.get('betaReaderInterest') || '').trim(),
      schoolInterest: String(data.get('schoolInterest') || '').trim(),
      preorderSignal: String(data.get('preorderSignal') || '').trim(),
      objection: String(data.get('objection') || '').trim(),
      createdAt: new Date().toISOString(),
    };

    saveEntry(entry);
    renderWaitlistState();
    form.reset();

    const button = form.querySelector('button[type="submit"]');
    if (button) {
      const oldText = button.textContent;
      button.textContent = 'You are in the Circle';
      setTimeout(() => {
        button.textContent = oldText;
      }, 1800);
    }
  });
}

function setupReportActions() {
  document.querySelector('#refreshReport')?.addEventListener('click', renderWaitlistState);
  document.querySelector('#downloadReport')?.addEventListener('click', downloadEntriesCsv);
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
    observer.observe(item);
  });
}

function setupNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#siteNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
  });

  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }
  });
}

setupNavigation();
setupWaitlistForm();
setupReportActions();
setupReveal();
renderWaitlistState();
