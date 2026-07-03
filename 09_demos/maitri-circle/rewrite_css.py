with open('src/character-page.css', 'r') as f:
    content = f.read()

parts = content.split('.dashboard-back-btn {')
after_sidebar = '.dashboard-back-btn {' + parts[1]

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
  background: var(--cream);
  padding: clamp(20px, 4vw, 60px);
  padding-top: calc(var(--header-height) + clamp(20px, 4vw, 60px));
  overflow: hidden;
  position: relative;
}

:root[data-theme="dark"] .character-selector-fullscreen {
  background: var(--body);
}

.character-selector-grid {
  display: flex;
  gap: clamp(10px, 2vw, 30px);
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  height: 100%;
}

.character-selector-card {
  flex: 1;
  border-radius: clamp(24px, 2vw, 36px);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.06);
  background: white;
  cursor: pointer;
  transition: all 0.6s var(--spring);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(24px, 3vw, 48px);
  text-align: left;
  outline: none;
}

:root[data-theme="dark"] .character-selector-card {
  border-color: rgba(255,255,255,0.08);
  background: var(--ink);
}

.character-selector-card:hover,
.character-selector-card:focus-visible {
  flex: 1.1;
  border-color: rgba(0,0,0,0.1);
  box-shadow: var(--hover-shadow);
  z-index: 10;
}

:root[data-theme="dark"] .character-selector-card:hover {
  border-color: var(--rose-deep);
}

.character-selector-card .selector-card-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0) 100%);
  z-index: 1;
  opacity: 0.8;
  transition: opacity 0.6s var(--spring);
}

.character-selector-card:hover .selector-card-bg {
  opacity: 0.95;
}

.selector-character-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
  transition: transform 1.2s var(--spring);
}

.character-selector-card:hover .selector-character-img {
  transform: scale(1.04);
}

.selector-placeholder-img {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--blush);
  z-index: 0;
}

:root[data-theme="dark"] .selector-placeholder-img {
  background: var(--ink-soft);
}

.selector-placeholder-img span {
  font-size: 120px;
  opacity: 0.05;
  font-weight: 800;
  color: var(--ink);
}

:root[data-theme="dark"] .selector-placeholder-img span {
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
  margin-bottom: 16px;
  border: 1px solid rgba(255,255,255,0.2);
}

.selector-card-content h2 {
  font-size: clamp(36px, 4vw, 64px);
  margin: 0 0 12px 0;
  line-height: 1.1;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
}

.selector-card-content p {
  font-size: clamp(15px, 1.2vw, 20px);
  margin: 0 0 24px 0;
  opacity: 0;
  line-height: 1.5;
  max-width: 90%;
  transform: translateY(10px);
  transition: all 0.5s var(--spring);
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
  font-size: 16px;
}

.selector-action::after {
  content: "→";
  margin-left: 8px;
  transition: transform 0.3s var(--spring);
}

.character-selector-card:hover .selector-action::after {
  transform: translateX(6px);
}

/* Dashboard Container */
.maitri-page.dashboard-active {
  height: 100vh;
  overflow: hidden; /* Prevent page scroll */
  display: flex;
  flex-direction: column;
  background: var(--aqua-1);
}

:root[data-theme="dark"] .maitri-page.dashboard-active {
  background: var(--body);
}

.character-dashboard-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 0; /* Internal gap handled by layout */
  width: 96%;
  max-width: 1400px;
  margin: 0 auto 30px;
  height: calc(100vh - var(--header-height) - 40px);
  
  /* The "UI Container" Look */
  background: white;
  border-radius: 32px;
  box-shadow: var(--glass-shadow);
  border: 1px solid rgba(0,0,0,0.06);
  overflow: hidden; /* Keep content inside the box */
  position: relative;
  /* Add margin-top if header is fixed */
  margin-top: calc(var(--header-height) + 10px);
}

:root[data-theme="dark"] .character-dashboard-layout {
  background: var(--ink);
  border-color: rgba(255,255,255,0.08);
}

@media (max-width: 960px) {
  .character-dashboard-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    border-radius: 20px;
  }
}

.dashboard-sidebar {
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  background: var(--cream);
  padding: 32px;
  border-right: 1px solid rgba(0,0,0,0.04);
  overflow-y: auto;
}

:root[data-theme="dark"] .dashboard-sidebar {
  background: rgba(0,0,0,0.2);
  border-color: rgba(255,255,255,0.05);
}

.dashboard-content {
  overflow-y: auto;
  padding: 40px clamp(20px, 4vw, 60px) 100px;
  height: 100%;
}

"""

# Note that after_sidebar doesn't have dashboard-content redefined if it was there before.
# I need to ensure .dashboard-content is correct. I'll replace everything up to .dashboard-back-btn.
# Let's remove any duplicate .dashboard-content in after_sidebar.
import re
after_sidebar = re.sub(r'\.dashboard-content \{.*?\}', '', after_sidebar, flags=re.DOTALL)

with open('src/character-page.css', 'w') as f:
    f.write(new_css + '\n' + after_sidebar)

