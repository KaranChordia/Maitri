import { characterLabData, characterOrder } from './character-data.js';

const state = {
  characterId: 'manu',
  tab: 'profile',
  promptId: 'story',
};

const refs = {
  stack: document.querySelector('#characterStack'),
  badge: document.querySelector('#characterBadge'),
  name: document.querySelector('#characterName'),
  tagline: document.querySelector('#characterTagline'),
  worldPill: document.querySelector('#characterWorldPill'),
  initial: document.querySelector('#characterInitial'),
  origin: document.querySelector('#characterOrigin'),
  question: document.querySelector('#characterQuestion'),
  signature: document.querySelector('#characterSignature'),
  takeaway: document.querySelector('#characterTakeaway'),
  world: document.querySelector('#characterWorld'),
  traits: document.querySelector('#characterTraits'),
  tabTitle: document.querySelector('#tabTitle'),
  tabLeadTitle: document.querySelector('#tabLeadTitle'),
  tabLeadText: document.querySelector('#tabLeadText'),
  prompts: document.querySelector('#characterPrompts'),
  responseTitle: document.querySelector('#characterResponseTitle'),
  responseText: document.querySelector('#characterResponseText'),
  storyDraft: document.querySelector('#storyDraft'),
  parentPrompt: document.querySelector('#parentPrompt'),
  worldNotes: document.querySelector('#worldNotes'),
  socialSnippet: document.querySelector('#socialSnippet'),
  healthStack: document.querySelector('#healthStack'),
  moduleStack: document.querySelector('#moduleStack'),
  future: document.querySelector('#characterFuture'),
  modeButtons: Array.from(document.querySelectorAll('.mode-pill')),
};

function getCharacter(characterId) {
  return characterLabData[characterId] || characterLabData.manu;
}

function promptForTab(character, tab) {
  const fallback = character.prompts[0];
  const preferred = {
    profile: 'story',
    studio: 'circle',
    voice: 'voice',
    world: 'object',
    notes: 'circle',
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
    button.innerHTML = `
      <span class="character-stack-kicker">${character.badge}</span>
      <strong>${character.name}</strong>
      <span class="character-stack-meta">${character.traits.join(' • ')}</span>
      <span class="character-stack-note">${character.tagline}</span>
    `;
    button.addEventListener('click', () => {
      state.characterId = characterId;
      state.promptId = promptForTab(character, state.tab).id;
      render();
    });
    refs.stack.appendChild(button);
  });
}

function renderModes() {
  refs.modeButtons.forEach((button) => {
    const active = button.dataset.tab === state.tab;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function renderPrompts(character) {
  if (!refs.prompts) return;
  refs.prompts.innerHTML = '';

  character.prompts.forEach((prompt) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `prompt-chip${prompt.id === state.promptId ? ' is-active' : ''}`;
    button.setAttribute('aria-pressed', String(prompt.id === state.promptId));
    button.textContent = prompt.label;
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
    ['Story depth', character.health.storyDepth],
    ['Voice consistency', character.health.voiceConsistency],
    ['World richness', character.health.worldRichness],
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

function renderModules(character) {
  if (!refs.moduleStack) return;
  const modules = [
    ['Story draft', character.modules.storyDraft],
    ['Parent prompt', character.modules.parentPrompt],
    ['World notes', character.modules.worldNotes],
    ['Social snippet', character.modules.socialSnippet],
  ];

  refs.moduleStack.innerHTML = modules
    .map(
      ([label, value]) => `
        <article class="module-card">
          <span>${label}</span>
          <strong>${value}</strong>
        </article>
      `
    )
    .join('');
}

function render() {
  const character = getCharacter(state.characterId);
  const prompt = character.prompts.find((item) => item.id === state.promptId) || promptForTab(character, state.tab);
  state.promptId = prompt.id;

  const tab = character.tabs[state.tab] || character.tabs.profile;

  if (refs.badge) refs.badge.textContent = character.badge;
  if (refs.name) refs.name.textContent = character.name;
  if (refs.tagline) refs.tagline.textContent = character.tagline;
  if (refs.worldPill) refs.worldPill.textContent = character.worldPill;
  if (refs.initial) refs.initial.textContent = character.name.slice(0, 1).toUpperCase();
  if (refs.origin) refs.origin.textContent = character.origin;
  if (refs.question) refs.question.textContent = character.question;
  if (refs.signature) refs.signature.textContent = character.signature;
  if (refs.takeaway) refs.takeaway.textContent = character.takeaway;
  if (refs.world) refs.world.textContent = character.world;
  if (refs.future) refs.future.textContent = character.future;
  if (refs.storyDraft) refs.storyDraft.textContent = character.modules.storyDraft;
  if (refs.parentPrompt) refs.parentPrompt.textContent = character.modules.parentPrompt;
  if (refs.worldNotes) refs.worldNotes.textContent = character.modules.worldNotes;
  if (refs.socialSnippet) refs.socialSnippet.textContent = character.modules.socialSnippet;
  if (refs.tabTitle) refs.tabTitle.textContent = tab.title;
  if (refs.tabLeadTitle) refs.tabLeadTitle.textContent = tab.lead;
  if (refs.tabLeadText) {
    refs.tabLeadText.textContent =
      state.tab === 'profile'
        ? 'The profile view is the quickest way to understand the character in one glance.'
        : state.tab === 'studio'
          ? 'The studio view is meant to feel like an operator panel for stories, prompts, and outputs.'
          : state.tab === 'voice'
            ? 'The voice view keeps the words warm, specific, and child-safe.'
            : state.tab === 'world'
              ? 'The world view should keep place, texture, and object details intact.'
              : 'The notes view keeps the historical handling clear and reviewable.';
  }

  if (refs.responseTitle) refs.responseTitle.textContent = prompt.title;
  if (refs.responseText) refs.responseText.textContent = prompt.text;

  if (refs.traits) {
    refs.traits.innerHTML = '';
    character.traits.forEach((trait) => {
      const span = document.createElement('span');
      span.textContent = trait;
      refs.traits.appendChild(span);
    });
  }

  renderSidebar();
  renderModes();
  renderPrompts(character);
  renderHealth(character);
  renderModules(character);
}

refs.modeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    state.tab = button.dataset.tab || 'profile';
    const character = getCharacter(state.characterId);
    state.promptId = promptForTab(character, state.tab).id;
    render();
  });
});

render();
