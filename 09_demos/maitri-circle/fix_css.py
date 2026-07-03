import re

with open('src/character-page.css', 'r') as f:
    content = f.read()

start_pattern = r'\.character-selector-card\s*\{'
end_pattern = r'/\*\s*Dashboard Container\s*\*/'

match_start = re.search(start_pattern, content)
match_end = re.search(end_pattern, content)

if match_start and match_end:
    start_idx = match_start.start()
    end_idx = match_end.start()
    
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
  padding: clamp(30px, 4vw, 50px);
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

.selector-card-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%);
  z-index: 1;
  opacity: 0.9;
  transition: opacity 0.6s var(--spring);
}

.character-selector-card:hover .selector-card-bg {
  opacity: 1;
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
}

.selector-card-content h2 {
  font-size: clamp(36px, 4vw, 54px);
  margin: 0 0 12px 0;
  line-height: 1.1;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  width: 100%;
}

.selector-card-content p {
  font-size: clamp(15px, 1.2vw, 18px);
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.5;
  width: 100%;
  max-width: 90%;
  color: white;
  text-shadow: 0 1px 4px rgba(0,0,0,0.4);
  transition: opacity 0.5s var(--spring);
}

.character-selector-card:hover .selector-card-content p {
  opacity: 1;
}

"""
    
    with open('src/character-page.css', 'w') as f:
        f.write(content[:start_idx] + new_css.strip() + '\n\n' + content[end_idx:])
    
    print("CSS replaced.")
else:
    print("Regex failed to match.")

