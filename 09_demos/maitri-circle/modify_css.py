import re

with open('src/character-page.css', 'r') as f:
    content = f.read()

new_css = """/* =========================================================================
   Character Page Redesign
   ========================================================================= */

main.no-scroll {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.character-selector-fullscreen {
  flex: 1;
  display: flex;
  background: var(--ink);
  padding: 0; /* Containerless, full-bleed */
  overflow: hidden;
  position: relative;
}

.character-selector-grid {
  display: flex;
  gap: 0; /* Containerless, no gaps */
  width: 100%;
  height: 100vh; /* Fill entire screen */
  margin: 0;
}

.character-selector-card {
  flex: 1;
  border-radius: 0; /* Containerless, sharp edges */
  position: relative;
  overflow: hidden;
  border: none;
  background: var(--ink);
  cursor: pointer;
  transition: flex 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(40px, 6vw, 80px) clamp(30px, 4vw, 60px);
  text-align: left;
  outline: none;
}

.character-selector-card:hover,
.character-selector-card:focus-visible {
  flex: 1.5; /* Expanded smoothly */
  z-index: 10;
}

.character-selector-card .selector-card-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%);
  z-index: 1;
  opacity: 0.7;
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.character-selector-card:hover .selector-card-bg {
  opacity: 0.9;
}

.selector-character-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease;
  filter: saturate(0.8) brightness(0.9);
}

.character-selector-card:hover .selector-character-img {
  transform: scale(1.05);
  filter: saturate(1.1) brightness(1);
}

.selector-placeholder-img {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--body);
  z-index: 0;
}

.selector-placeholder-img span {
  font-size: 15vw;
  opacity: 0.05;
  font-weight: 800;
  color: white;
}

.selector-card-content {
  position: relative;
  z-index: 2;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.selector-pill {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 20px;
  border: 1px solid rgba(255,255,255,0.2);
  transform: translateY(20px);
  opacity: 0.8;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.character-selector-card:hover .selector-pill {
  transform: translateY(0);
  opacity: 1;
}

.selector-card-content h2 {
  font-size: clamp(40px, 5vw, 80px);
  margin: 0 0 16px 0;
  line-height: 1.1;
  color: white;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
  transform: translateY(10px);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.character-selector-card:hover .selector-card-content h2 {
  transform: translateY(0);
}

.selector-card-content p {
  font-size: clamp(16px, 1.4vw, 22px);
  margin: 0 0 30px 0;
  opacity: 0;
  line-height: 1.5;
  max-width: 90%;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  height: 0;
  overflow: hidden;
}

.character-selector-card:hover .selector-card-content p {
  opacity: 0.9;
  transform: translateY(0);
  height: auto;
}

.selector-action {
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  color: white;
  font-size: 18px;
  opacity: 0.7;
  transform: translateY(10px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.character-selector-card:hover .selector-action {
  opacity: 1;
  transform: translateY(0);
}

.selector-action::after {
  content: "→";
  margin-left: 8px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.character-selector-card:hover .selector-action::after {
  transform: translateX(8px);
}

/* Dashboard Layout */
.maitri-page.dashboard-active {
  height: 100vh;
  overflow: hidden; /* Prevent page scroll */
  display: flex;
  flex-direction: column;
}

.character-dashboard-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: clamp(30px, 4vw, 60px);
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  /* Fixed height, scroll internally */
  height: calc(100vh - var(--header-height)); 
  padding: 40px clamp(20px, 4vw, 60px);
  overflow: hidden;
}

@media (max-width: 960px) {
  .character-dashboard-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    padding-top: 20px;
  }
}

.dashboard-sidebar {
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  background: white;
  padding: 32px;
  border-radius: 24px;
  box-shadow: var(--tile-shadow);
  border: 1px solid rgba(0,0,0,0.04);
  overflow-y: auto;
}

:root[data-theme="dark"] .dashboard-sidebar {
  background: var(--body);
  border-color: rgba(255,255,255,0.1);
}

.dashboard-content {
  overflow-y: auto;
  padding-right: 10px; /* space for scrollbar */
  padding-bottom: 40px;
  height: 100%;
}
"""

# Replace lines up to .dashboard-back-btn with new_css
parts = content.split('.dashboard-back-btn {')
new_content = new_css + '\n.dashboard-back-btn {' + parts[1]

with open('src/character-page.css', 'w') as f:
    f.write(new_content)

