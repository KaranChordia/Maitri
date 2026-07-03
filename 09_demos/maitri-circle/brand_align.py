import re

with open('src/character-page.css', 'r') as f:
    content = f.read()

# 1. Update .character-selector-card
new_card = """\.character-selector-card {
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
  align-items: center;
  padding: clamp(30px, 4vw, 50px) 20px;
  text-align: center !important;
  outline: none;
  box-sizing: border-box;
  box-shadow: var(--tile-shadow);
}"""
content = re.sub(r'\.character-selector-card\s*\{[^}]*\}', new_card, content)

# 2. Update .character-selector-card dark mode
new_card_dark = """\:root[data-theme="dark"] .character-selector-card {
  border-color: rgba(255, 235, 225, 0.11);
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 255, 255, 0.08) 0 58px, transparent 60px),
    linear-gradient(145deg, rgba(48, 26, 43, 0.76), rgba(21, 42, 48, 0.66));
}"""
content = re.sub(r':root\[data-theme="dark"\] \.character-selector-card\s*\{[^}]*\}', new_card_dark, content)

# 3. Update hover
new_card_hover = """\.character-selector-card:hover,
\.character-selector-card:focus-visible {
  transform: translateY(-8px);
  border-color: rgba(0,0,0,0.1);
  box-shadow: var(--hover-shadow);
  z-index: 10;
}"""
content = re.sub(r'\.character-selector-card:hover,\s*\.character-selector-card:focus-visible\s*\{[^}]*\}', new_card_hover, content)

# 4. Update dark hover
new_card_hover_dark = """\:root[data-theme="dark"] .character-selector-card:hover {
  border-color: rgba(255, 127, 160, 0.38);
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 255, 255, 0.1) 0 58px, transparent 60px),
    linear-gradient(145deg, rgba(63, 32, 52, 0.84), rgba(23, 49, 54, 0.72));
}"""
content = re.sub(r':root\[data-theme="dark"\] \.character-selector-card:hover\s*\{[^}]*\}', new_card_hover_dark, content)


# 5. Update dashboard layout
new_dashboard = """\.character-dashboard-layout {
  position: relative;
  z-index: 100;
  width: 95%;
  max-width: 1600px;
  height: clamp(600px, 85vh, 900px);
  margin: calc(var(--header-height) + 20px) auto 40px auto;
  background: var(--cream);
  border-radius: clamp(24px, 3vw, 40px);
  display: flex;
  overflow: hidden;
  box-shadow: var(--glass-shadow);
  border: 1px solid rgba(0,0,0,0.06);
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  animation: dashboardPopIn 0.6s var(--spring) forwards;
}"""
content = re.sub(r'\.character-dashboard-layout\s*\{[^}]*\}', new_dashboard, content)

# 6. Update dashboard dark
new_dashboard_dark = """\:root[data-theme="dark"] .character-dashboard-layout {
  border-color: rgba(255, 235, 225, 0.1);
  background:
    radial-gradient(circle at 12% 16%, rgba(255, 127, 160, 0.11) 0 90px, transparent 94px),
    radial-gradient(circle at 92% 16%, rgba(255, 199, 97, 0.08) 0 88px, transparent 92px),
    linear-gradient(135deg, rgba(48, 26, 43, 0.82), rgba(17, 39, 45, 0.7));
}"""
content = re.sub(r':root\[data-theme="dark"\] \.character-dashboard-layout\s*\{[^}]*\}', new_dashboard_dark, content)


# 7. Update storybook reader modal
new_storybook_modal = """\.storybook-immersive-modal {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  height: 90vh;
  background: var(--cream);
  border-radius: 32px;
  box-shadow: var(--glass-shadow);
  border: 1px solid rgba(0,0,0,0.06);
  display: flex;
  overflow: hidden;
  transform: scale(0.95) translateY(20px);
  opacity: 0;
  animation: modalPopIn 0.6s var(--spring) 0.1s forwards;
}"""
content = re.sub(r'\.storybook-immersive-modal\s*\{[^}]*\}', new_storybook_modal, content)

# 8. Update storybook reader dark
new_storybook_dark = """\:root[data-theme="dark"] .storybook-immersive-modal {
  border-color: rgba(255, 235, 225, 0.1);
  background:
    radial-gradient(circle at 12% 16%, rgba(255, 127, 160, 0.11) 0 90px, transparent 94px),
    radial-gradient(circle at 92% 16%, rgba(255, 199, 97, 0.08) 0 88px, transparent 92px),
    linear-gradient(135deg, rgba(48, 26, 43, 0.82), rgba(17, 39, 45, 0.7));
}"""
content = re.sub(r':root\[data-theme="dark"\] \.storybook-immersive-modal\s*\{[^}]*\}', new_storybook_dark, content)

content = content.replace('\.', '.')
content = content.replace('\:', ':')

with open('src/character-page.css', 'w') as f:
    f.write(content)

print("Brand tokens injected successfully.")

