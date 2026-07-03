with open('src/character-page.css', 'r') as f:
    content = f.read()

# 1. Update character-selector-card
old_card = """.character-selector-card {
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
  text-align: center;
  outline: none;
}"""

new_card = """.character-selector-card {
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
  padding: clamp(40px, 4vw, 60px) clamp(20px, 3vw, 40px);
  text-align: center;
  outline: none;
}"""
content = content.replace(old_card, new_card)


# 2. Update selector-card-content
old_content = """.selector-card-content {
  position: relative;
  z-index: 2;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}"""

new_content = """.selector-card-content {
  position: relative;
  z-index: 2;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  width: 100%;
}"""
content = content.replace(old_content, new_content)

# 3. Update h2 to ensure no horizontal overflow
old_h2 = """.selector-card-content h2 {
  font-size: clamp(36px, 4vw, 64px);
  margin: 0 0 12px 0;
  line-height: 1.1;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
}"""

new_h2 = """.selector-card-content h2 {
  font-size: clamp(32px, 3.5vw, 54px);
  margin: 0 0 16px 0;
  line-height: 1.1;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  width: 100%;
}"""
content = content.replace(old_h2, new_h2)


# 4. Update paragraph to be centered and not too constrained
old_p = """.selector-card-content p {
  font-size: clamp(15px, 1.2vw, 20px);
  margin: 0 0 24px 0;
  opacity: 0.8;
  line-height: 1.5;
  max-width: 90%;
  transition: all 0.5s var(--spring);
}"""

new_p = """.selector-card-content p {
  font-size: clamp(15px, 1.2vw, 18px);
  margin: 0 auto 24px auto;
  opacity: 0.85;
  line-height: 1.5;
  width: 100%;
  max-width: 90%;
  transition: opacity 0.5s var(--spring);
}"""
content = content.replace(old_p, new_p)

# 5. Fix button alignment (remove inline-flex text-align weirdness)
old_btn = """.selector-action {
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
}"""

new_btn = """.selector-action {
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: var(--ink);
  padding: 12px 28px;
  border-radius: 999px;
  font-size: 16px;
  margin: 0 auto;
  transition: transform 0.3s var(--spring), box-shadow 0.3s ease;
}"""
content = content.replace(old_btn, new_btn)


with open('src/character-page.css', 'w') as f:
    f.write(content)

