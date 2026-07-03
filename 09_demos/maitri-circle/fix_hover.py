with open('src/character-page.css', 'r') as f:
    content = f.read()

# 1. Remove flex: 1.1 and add transform
content = content.replace('  flex: 1.1;\n  border-color: rgba(0,0,0,0.1);', '  transform: translateY(-8px);\n  border-color: rgba(0,0,0,0.1);')

# 2. Update character-selector-card text-align to center
content = content.replace('  text-align: left;\n  outline: none;', '  text-align: center;\n  outline: none;')

# 3. Update selector-card-content alignment
content = content.replace('  align-items: flex-start;', '  align-items: center;\n  text-align: center;')

# 4. Fix paragraph abruptness by removing height changes
old_p = """.selector-card-content p {
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
}"""

new_p = """.selector-card-content p {
  font-size: clamp(15px, 1.2vw, 20px);
  margin: 0 0 24px 0;
  opacity: 0.8;
  line-height: 1.5;
  max-width: 90%;
  transition: all 0.5s var(--spring);
}

.character-selector-card:hover .selector-card-content p {
  opacity: 1;
}"""

content = content.replace(old_p, new_p)

# 5. Fix selector-action transform
old_action = """.selector-action {
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  color: white;
  font-size: 16px;
}"""

new_action = """.selector-action {
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  color: white;
  font-size: 16px;
  background: white;
  color: var(--ink);
  padding: 12px 24px;
  border-radius: 999px;
  transition: transform 0.3s var(--spring), box-shadow 0.3s ease;
}

.character-selector-card:hover .selector-action {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}"""

content = content.replace(old_action, new_action)

with open('src/character-page.css', 'w') as f:
    f.write(content)

print("Hover fixed.")
