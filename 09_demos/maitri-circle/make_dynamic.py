import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Inject dynamic variables at the start of CharacterDashboard
dynamic_vars = """
  const storybookPreviews = selectedId === 'savitribai' ? savitribaiStorybookPreviews : manuStorybookPreviews;
  const adventureStops = selectedId === 'savitribai' ? savitribaiAdventureStops : manuAdventureStops;
"""

# Find CharacterDashboard declaration
pattern = r'function CharacterDashboard\(\{ selectedId, onBack \}\) \{\s*const character = characterLibrary\[selectedId\];'

replacement = r'function CharacterDashboard({ selectedId, onBack }) {\n  const character = characterLibrary[selectedId];' + dynamic_vars

content = re.sub(pattern, replacement, content)

# 2. Extract just the CharacterDashboard function block to safely replace references
# We will do a simple string replace for manuStorybookPreviews -> storybookPreviews
# and manuAdventureStops -> adventureStops
# but only AFTER the dynamic vars injection, which means we can just replace all occurrences
# inside the CharacterDashboard block.

dashboard_idx = content.find('function CharacterDashboard({ selectedId, onBack }) {')
end_idx = content.find('function CharacterPage() {')

dashboard_content = content[dashboard_idx:end_idx]

dashboard_content = dashboard_content.replace('manuStorybookPreviews', 'storybookPreviews')
dashboard_content = dashboard_content.replace('manuAdventureStops', 'adventureStops')

# Put it back
content = content[:dashboard_idx] + dashboard_content + content[end_idx:]

with open('src/App.jsx', 'w') as f:
    f.write(content)

print("Made arrays dynamic.")

