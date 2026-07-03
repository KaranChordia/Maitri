with open('src/character-page.css', 'r') as f:
    content = f.read()

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
  padding: 0;
  text-align: center;
  outline: none;
}

:root[data-theme="dark"] .character-selector-card {
  border-color: rgba(255,255,255,0.08);
  background: var(--body);
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

.selector-image-wrapper {
  flex: 1;
  position: relative;
  overflow: hidden;
  width: 100%;
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
  flex: none;
  background: white;
  padding: clamp(32px, 3vw, 48px) clamp(24px, 2vw, 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  border-top: 1px solid rgba(0,0,0,0.04);
  position: relative;
  z-index: 2;
}

:root[data-theme="dark"] .selector-card-content {
  background: var(--ink);
  border-top-color: rgba(255,255,255,0.05);
}

.selector-card-content h2 {
  font-size: clamp(32px, 3.5vw, 48px);
  margin: 0 0 12px 0;
  line-height: 1.1;
  color: var(--ink);
  width: 100%;
}

:root[data-theme="dark"] .selector-card-content h2 {
  color: white;
}

.selector-card-content p {
  font-size: clamp(15px, 1.2vw, 18px);
  margin: 0 auto;
  color: var(--ink-soft);
  line-height: 1.5;
  width: 100%;
  max-width: 90%;
}

:root[data-theme="dark"] .selector-card-content p {
  color: rgba(255,255,255,0.8);
}

"""
        
        with open('src/character-page.css', 'w') as f:
            f.write(before + start_marker + new_css + after)
        print("CSS fixed.")
    else:
        print("Could not find end marker")
else:
    print("Could not find start marker")
