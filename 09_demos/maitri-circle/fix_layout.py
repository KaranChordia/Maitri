with open('src/character-page.css', 'r') as f:
    content = f.read()

import re

# We will replace everything from .character-selector-card to .maitri-page.dashboard-active
start_marker = '.character-selector-card {'
end_marker = '/* Dashboard Container */'

parts = content.split(start_marker)
if len(parts) == 2:
    sub_parts = parts[1].split(end_marker)
    if len(sub_parts) == 2:
        before = parts[0]
        after = end_marker + sub_parts[1]
        
        new_css = """
.character-selector-card {
  flex: 1;
  border-radius: clamp(24px, 2vw, 36px);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.06);
  background: white;
  cursor: pointer;
  transition: transform 0.6s var(--spring), box-shadow 0.6s var(--spring), border-color 0.6s var(--spring);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
  outline: none;
}

:root[data-theme="dark"] .character-selector-card {
  border-color: rgba(255,255,255,0.08);
  background: var(--ink);
}

.character-selector-card:hover,
.character-selector-card:focus-visible {
  transform: translateY(-8px);
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
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
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
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  width: 100%;
  max-width: 100%;
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
  font-size: clamp(32px, 3.5vw, 56px);
  margin: 0 0 12px 0;
  line-height: 1.1;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  width: 100%;
}

.selector-card-content p {
  font-size: clamp(15px, 1.2vw, 18px);
  margin: 0 0 24px 0;
  opacity: 0.85;
  line-height: 1.5;
  width: 100%;
  max-width: 90%;
  transition: opacity 0.5s var(--spring);
}

.character-selector-card:hover .selector-card-content p {
  opacity: 1;
}

.selector-action {
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: var(--ink);
  padding: 12px 28px;
  border-radius: 999px;
  font-size: 16px;
  transition: transform 0.3s var(--spring), box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin-top: auto;
}

.character-selector-card:hover .selector-action {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

.selector-action::after {
  content: "→";
  margin-left: 8px;
  transition: transform 0.3s var(--spring);
}

.character-selector-card:hover .selector-action::after {
  transform: translateX(6px);
}

"""
        
        with open('src/character-page.css', 'w') as f:
            f.write(before + start_marker + new_css + after)
        print("CSS fixed.")
    else:
        print("Could not find end marker")
else:
    print("Could not find start marker")
