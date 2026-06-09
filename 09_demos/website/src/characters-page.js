import { characterLabData, characterOrder } from './character-data.js';

const state = {
  characterId: 'manu',
  tab: 'profile',
  promptId: 'story',
};

const refs = {
  stack: document.querySelector('#characterStack'),
  name: document.querySelector('#characterName'),
  description: document.querySelector('#characterDescription'),
  avatar: document.querySelector('#characterAvatar'),
  hero: document.querySelector('#characterHero'),
  values: document.querySelector('#characterValues'),
  traits: document.querySelector('#characterTraits'),
  metaAge: document.querySelector('#metaAge'),
  metaWorld: document.querySelector('#metaWorld'),
  metaLoves: document.querySelector('#metaLoves'),
  metaInspiredBy: document.querySelector('#metaInspiredBy'),
  prompts: document.querySelector('#characterPrompts'),
  responseText: document.querySelector('#characterResponseText'),
  interactiveProcessStack: document.querySelector('#interactiveProcessStack'),
  healthStack: document.querySelector('#healthStack'),
  modeButtons: Array.from(document.querySelectorAll('.mode-pill')),
  workbenchGrid: document.querySelector('#workbenchGrid'),
};

const iconSvgs = {
  shield: `<svg class="val-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  heart: `<svg class="val-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  lightbulb: `<svg class="val-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5h4z"/><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/></svg>`,
  rocket: `<svg class="val-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 5.5C4 22 6 21 7.5 19.5L19 8l-3-3L4.5 16.5z"/><path d="M12 15l9 9M9 12l-9 9M19 8c2.5-2.5 4.5-2.5 4.5-2.5s0 2-2.5 4.5"/></svg>`,
  compass: `<svg class="val-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/></svg>`,
  stars: `<svg class="val-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  fist: `<svg class="val-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.5a1.5 1.5 0 0 0-1.5-1.5H12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4.5a1.5 1.5 0 0 0 1.5-1.5V12"/><path d="M10 11H8V9H6v4h6"/></svg>`,
  fire: `<svg class="val-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  trophy: `<svg class="val-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a6 6 0 0 1 6 6v3.5c0 3.3-2.7 6-6 6s-6-2.7-6-6V8a6 6 0 0 1 6-6z"/></svg>`,
  book: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V3.5A2.5 2.5 0 0 1 6.5 1H20v21H6.5a2.5 2.5 0 0 1-2.5-2.5z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  megaphone: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.5 7.5M14 6.5l3 3"/></svg>`,
};

function getCharacter(characterId) {
  return characterLabData[characterId] || characterLabData.manu;
}

function promptForTab(character, tab) {
  const fallback = character.prompts[0];
  const preferred = {
    profile: 'story',
    studio: 'story',
    voice: 'unfair',
    world: 'monsoon',
    notes: 'nature',
  }[tab];
  return character.prompts.find((item) => item.id === preferred) || fallback;
}

function renderSidebar() {
  if (!refs.stack) return;
  refs.stack.innerHTML = '';

  characterOrder.forEach((characterId) => {
    const character = getCharacter(characterId);
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.character = characterId;
    button.className = `character-stack-card${state.characterId === characterId ? ' is-active' : ''}`;
    button.setAttribute('aria-pressed', String(state.characterId === characterId));
    
    // Custom logic to show the accent indicator and layout
    button.innerHTML = `
      <div class="active-indicator-bar"></div>
      <div class="card-inner-flex">
        <img class="character-thumb-circle" src="${character.avatar}" alt="${character.name} Avatar" />
        <div class="character-card-texts">
          <strong>${character.name}</strong>
          <span class="character-stack-meta">${character.values.map(v => v.label).join(' • ')}</span>
        </div>
        <svg class="chevron-right" viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
      </div>
    `;
    
    button.addEventListener('click', () => {
      state.characterId = characterId;
      state.promptId = promptForTab(character, state.tab).id;
      render();
    });
    refs.stack.appendChild(button);
  });

  // Update character library count
  const countBadge = document.querySelector('#characterCount');
  if (countBadge) countBadge.textContent = characterOrder.length;
}

function renderModes() {
  refs.modeButtons.forEach((button) => {
    const active = button.dataset.tab === state.tab;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
    button.setAttribute('aria-pressed', String(active));
  });
}

function renderPrompts(character) {
  if (!refs.prompts) return;
  refs.prompts.innerHTML = '';

  character.prompts.forEach((prompt) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `prompt-list-item${prompt.id === state.promptId ? ' is-active' : ''}`;
    button.setAttribute('aria-pressed', String(prompt.id === state.promptId));
    button.innerHTML = `
      <svg class="msg-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <span class="prompt-text">${prompt.label}</span>
      <svg class="chevron-right" viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
    `;
    button.addEventListener('click', () => {
      state.promptId = prompt.id;
      render();
    });
    refs.prompts.appendChild(button);
  });
}

function renderHealth(character) {
  if (!refs.healthStack) return;
  const metrics = [
    ['Story Depth', character.health.storyDepth],
    ['Voice Consistency', character.health.voiceConsistency],
    ['World Richness', character.health.worldRichness],
  ];

  refs.healthStack.innerHTML = metrics
    .map(
      ([label, value]) => `
        <div class="health-row">
          <div class="health-label">
            <span>${label}</span>
            <strong>${value}%</strong>
          </div>
          <div class="health-bar"><span style="width:${value}%"></span></div>
        </div>
      `
    )
    .join('');
}

function renderInteractiveProcess(character) {
  if (!refs.interactiveProcessStack) return;
  
  const moduleIcons = {
    'Story Draft': iconSvgs.book,
    'Parent Prompt': iconSvgs.users,
    'World Notes': iconSvgs.globe,
    'Social Snippet': iconSvgs.megaphone,
  };

  refs.interactiveProcessStack.innerHTML = character.modules
    .map(
      (mod) => {
        const isReady = mod.status === 'Ready';
        const statusClass = isReady ? 'status-ready' : 'status-progress';
        const cardBgClass = isReady ? 'bg-ready' : 'bg-progress';
        const iconSvg = moduleIcons[mod.label] || iconSvgs.book;
        
        return `
          <div class="process-module-card ${cardBgClass}">
            <div class="process-card-icon-wrapper">
              ${iconSvg}
            </div>
            <div class="process-card-content">
              <h4>${mod.label}</h4>
              <p>${mod.desc}</p>
              <div class="process-status-row">
                <span class="status-dot ${statusClass}"></span>
                <span class="status-text">${mod.status}</span>
              </div>
            </div>
            <svg class="chevron-right" viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
          </div>
        `;
      }
    )
    .join('');
}

function renderLeftColumn(character) {
  // We dynamically populate the left column of the workbenchGrid based on the selected tab
  const leftCol = document.querySelector('.workbench-col-left');
  if (!leftCol) return;

  if (state.tab === 'profile') {
    leftCol.innerHTML = `
      <!-- Traits Card -->
      <div class="info-panel-card traits-card">
        <div class="panel-header-row">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" class="section-icon"><path d="M12 2s-8 4-8 10c0 5.5 4.5 10 8 10s8-4.5 8-10c0-6-8-10-8-10z"/></svg>
          <h3>Traits</h3>
        </div>
        <div class="traits-flex" id="characterTraits"></div>
      </div>

      <!-- Metadata List -->
      <div class="info-panel-card meta-list-card">
        <div class="meta-item">
          <span class="meta-icon-wrapper">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </span>
          <div class="meta-details">
            <span>Age</span>
            <strong id="metaAge">8-10 years</strong>
          </div>
        </div>
        <div class="meta-item">
          <span class="meta-icon-wrapper">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </span>
          <div class="meta-details">
            <span>World</span>
            <strong id="metaWorld">A small town in India</strong>
          </div>
        </div>
        <div class="meta-item">
          <span class="meta-icon-wrapper">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </span>
          <div class="meta-details">
            <span>Loves</span>
            <strong id="metaLoves">Stories, kites, rivers, & animals</strong>
          </div>
        </div>
        <div class="meta-item">
          <span class="meta-icon-wrapper">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </span>
          <div class="meta-details">
            <span>Inspired by</span>
            <strong id="metaInspiredBy">Everyday people doing good</strong>
          </div>
        </div>
      </div>
    `;
    
    // Bind the newly created DOM nodes
    const traitsFlex = document.querySelector('#characterTraits');
    if (traitsFlex) {
      traitsFlex.innerHTML = '';
      character.traits.forEach((trait) => {
        const span = document.createElement('span');
        span.className = 'trait-pill';
        span.textContent = trait;
        traitsFlex.appendChild(span);
      });
    }
    
    const metaAge = document.querySelector('#metaAge');
    const metaWorld = document.querySelector('#metaWorld');
    const metaLoves = document.querySelector('#metaLoves');
    const metaInspiredBy = document.querySelector('#metaInspiredBy');
    
    if (metaAge) metaAge.textContent = character.meta.age;
    if (metaWorld) metaWorld.textContent = character.meta.world;
    if (metaLoves) metaLoves.textContent = character.meta.loves;
    if (metaInspiredBy) metaInspiredBy.textContent = character.meta.inspiredBy;

  } else if (state.tab === 'studio') {
    leftCol.innerHTML = `
      <div class="info-panel-card tab-detail-card">
        <div class="panel-header-row">
          ${iconSvgs.book}
          <h3>${character.tabs.studio.title}</h3>
        </div>
        <p class="tab-lead-text">${character.tabs.studio.lead}</p>
        <div class="tab-feature-list">
          <div class="feature-item">
            <strong>Custom Chapter Arcs</strong>
            <p>Generate story outlines mapped to child age ranges (5-7, 7-10) validating educational value.</p>
          </div>
          <div class="feature-item">
            <strong>Narrative Pacing</strong>
            <p>Adjust vocabulary levels and regional term glossaries dynamically for children.</p>
          </div>
        </div>
      </div>
    `;
  } else if (state.tab === 'voice') {
    leftCol.innerHTML = `
      <div class="info-panel-card tab-detail-card">
        <div class="panel-header-row">
          ${iconSvgs.megaphone}
          <h3>${character.tabs.voice.title}</h3>
        </div>
        <p class="tab-lead-text">${character.tabs.voice.lead}</p>
        <div class="tab-feature-list">
          <div class="feature-item">
            <strong>Key Phrases</strong>
            <p>Character dialogue should evoke warmth, resilience, and personal responsibility.</p>
          </div>
          <div class="feature-item">
            <strong>Speech Patterns</strong>
            <p>Inspired by historical region context (e.g. ${character.worldPill}), utilizing regional words naturally.</p>
          </div>
        </div>
      </div>
    `;
  } else if (state.tab === 'world') {
    leftCol.innerHTML = `
      <div class="info-panel-card tab-detail-card">
        <div class="panel-header-row">
          ${iconSvgs.globe}
          <h3>${character.tabs.world.title}</h3>
        </div>
        <p class="tab-lead-text">${character.tabs.world.lead}</p>
        <div class="tab-feature-list">
          <div class="feature-item">
            <strong>Environment Details</strong>
            <p>Traditional settings, architectures (Jharokha, courtyards), and natural elements (rivers, space fields, hills).</p>
          </div>
          <div class="feature-item">
            <strong>Signature Props</strong>
            <p>Physical toys, clothing materials, and objects that carry the character's story values into play.</p>
          </div>
        </div>
      </div>
    `;
  } else if (state.tab === 'notes') {
    leftCol.innerHTML = `
      <div class="info-panel-card tab-detail-card">
        <div class="panel-header-row">
          ${iconSvgs.users}
          <h3>${character.tabs.notes.title}</h3>
        </div>
        <p class="tab-lead-text">${character.tabs.notes.lead}</p>
        <div class="tab-feature-list">
          <div class="feature-item">
            <strong>Inspired Origin</strong>
            <p>Inspired directly by ${character.origin}. A values-first adaptation for children.</p>
          </div>
          <div class="feature-item">
            <strong>Sensitivity Guardrails</strong>
            <p>Focuses on everyday courage and emotional grit instead of glorifying battle or conflict.</p>
          </div>
        </div>
      </div>
    `;
  }
}

function render() {
  const character = getCharacter(state.characterId);
  const prompt = character.prompts.find((item) => item.id === state.promptId) || promptForTab(character, state.tab);
  state.promptId = prompt.id;

  // Update Hero Card Background & Portrait
  if (refs.hero) {
    refs.hero.style.backgroundImage = `url('${character.backdrop}')`;
  }
  if (refs.avatar) {
    refs.avatar.src = character.avatar;
    refs.avatar.alt = `${character.name} Portrait`;
  }
  if (refs.name) refs.name.textContent = character.name;
  if (refs.description) refs.description.textContent = character.description;

  // Render Values List inside Hero Card
  if (refs.values) {
    refs.values.innerHTML = character.values
      .map(
        (val) => `
          <div class="value-mini-card" style="border-left: 3px solid ${val.color}">
            <div class="value-card-header" style="color: ${val.color}">
              ${iconSvgs[val.icon] || ''}
              <strong>${val.label}</strong>
            </div>
            <p>${val.text}</p>
          </div>
        `
      )
      .join('');
  }

  // Update Tab Contents
  renderLeftColumn(character);

  // Update Prompts Column
  renderPrompts(character);

  // Update AI Response Text
  if (refs.responseText) {
    refs.responseText.textContent = prompt.text;
  }

  // Update Right Sidebar
  renderHealth(character);
  renderInteractiveProcess(character);

  // Refresh active cards
  renderSidebar();
  renderModes();
}

// Wire up events
refs.modeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    state.tab = button.dataset.tab || 'profile';
    const character = getCharacter(state.characterId);
    state.promptId = promptForTab(character, state.tab).id;
    render();
  });
});

// Regenerate Mock Response button behavior
const regenerateBtn = document.querySelector('#regenerateBtn');
if (regenerateBtn) {
  regenerateBtn.addEventListener('click', () => {
    const character = getCharacter(state.characterId);
    const prompt = character.prompts.find((item) => item.id === state.promptId);
    if (prompt && refs.responseText) {
      refs.responseText.style.opacity = '0.4';
      setTimeout(() => {
        refs.responseText.textContent = prompt.text;
        refs.responseText.style.opacity = '1';
      }, 350);
    }
  });
}

// Initial render
render();

// Theme Toggle Logic
const themeToggle = document.querySelector('#themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-theme');
    const isDark = document.documentElement.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}
