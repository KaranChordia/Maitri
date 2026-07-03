with open('src/character-page.css', 'r') as f:
    content = f.read()

import re

# 1. Update character-selector-card
content = re.sub(
    r'\.character-selector-card\s*\{[^}]*\}',
    """\.character-selector-card {
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
  padding: clamp(30px, 4vw, 50px) 20px;
  text-align: center !important;
  outline: none;
  box-sizing: border-box;
}""",
    content
)

# 2. Update selector-card-content
content = re.sub(
    r'\.selector-card-content\s*\{[^}]*\}',
    """\.selector-card-content {
  position: relative;
  z-index: 2;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center !important;
  width: 100%;
  box-sizing: border-box;
}""",
    content
)

# 3. Update h2
content = re.sub(
    r'\.selector-card-content h2\s*\{[^}]*\}',
    """\.selector-card-content h2 {
  font-size: clamp(36px, 4vw, 54px);
  margin: 0 0 12px 0;
  line-height: 1.1;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
  text-align: center !important;
  width: 100%;
}""",
    content
)

# 4. Update p
content = re.sub(
    r'\.selector-card-content p\s*\{[^}]*\}',
    """\.selector-card-content p {
  font-size: clamp(15px, 1.2vw, 18px);
  margin: 0 auto;
  opacity: 0.95;
  line-height: 1.5;
  width: 100%;
  max-width: 90%;
  color: white;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  transition: opacity 0.5s var(--spring);
  text-align: center !important;
}""",
    content
)

content = content.replace('\.', '.')

with open('src/character-page.css', 'w') as f:
    f.write(content)

