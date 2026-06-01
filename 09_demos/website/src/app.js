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
  localStorage.setItem(waitlistKey, JSON.stringify(entries.slice(0, 25)));
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
  state.textContent = `${entries.length} local demo signup${entries.length === 1 ? '' : 's'} captured. Latest: ${latest.segment}, interested in ${interests}.`;
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
setupReveal();
renderWaitlistState();
