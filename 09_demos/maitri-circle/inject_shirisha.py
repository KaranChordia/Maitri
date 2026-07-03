import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Replace kalpana in characterLibrary with shirisha
kalpana_pattern = r'  kalpana: \{.*?\},\n(?=  mary: \{)'
shirisha_lib = """  shirisha: {
    name: "Shirisha",
    initials: "BS",
    role: "Trailblazing Linewoman",
    image: null,
    tone: "teal",
    tagline: "The girl who proved that strength and skill have no gender, one brave climb at a time.",
    worldPill: "High-voltage poles and toolbelts",
    origin: "Inspired by Babburi Shirisha, Telangana's first linewoman",
    question: "What happens when you refuse to let an unfair rule stop you?",
    signature: "A heavy toolbelt, climbing boots, an 18-foot pole, and a bright safety helmet.",
    takeaway: "You are strong enough to climb any mountain—or electricity pole—in your way.",
    world: "Small village homes, electrical wires stretching across the sky, heavy tool belts, courtrooms, and the top of a tall pole looking down at the world.",
    values: [
      ["Bold courage", "She stands up to unfair rules.", ShieldCheck, "rose"],
      ["Physical courage", "She trains her body to be strong and capable.", Lightning, "amber"],
      ["Pioneer courage", "She becomes the first so others can follow.", Star, "violet"],
    ],
    traits: ["Strong", "Determined", "Fearless", "Hardworking", "Trailblazer"],
    meta: [
      ["First value", "Courage to break stereotypes"],
      ["First story", "The Men-Only Rule"],
      ["Child promise", "No job is just for boys"],
    ],
    prompts: [
      {
        id: "dream",
        label: "Shirisha wants to be an electrician.",
        title: "Story beat",
        text: "When Shirisha looked at the tangled wires that brought light to her village, she didn't see danger. She saw a puzzle she wanted to solve. She decided to learn everything about electricity.",
      },
      {
        id: "rule",
        label: "They say women cannot apply.",
        title: "Brave choice",
        text: "When it was time to get a job, the rules said 'Men Only.' People told her to give up. Instead of crying, Shirisha went to the court and asked a brave question: 'Why shouldn't I be allowed to try?'",
      },
      {
        id: "letter",
        label: "A letter from Shirisha.",
        title: "Friend letter",
        text: "Dear Friend, if someone tells you that you cannot do something just because you are a girl, don't believe them. Practice hard, be strong, and show them what you can do. You can climb as high as you want to.",
      },
    ],
  },
"""
content = re.sub(kalpana_pattern, shirisha_lib, content, flags=re.DOTALL)

# Also check if it's the last element (if mary doesn't exist)
if kalpana_pattern not in content:
    kalpana_pattern2 = r'  kalpana: \{.*?\}(?=\n\};\n\nconst manuAdventureStops)'
    content = re.sub(kalpana_pattern2, shirisha_lib.rstrip(',\n'), content, flags=re.DOTALL)

# 2. Add Shirisha arrays right after savitribai arrays
shirisha_stops = """
const shirishaAdventureStops = [
  {
    id: "tools",
    label: "The Heavy Toolbelt",
    title: "Learning the trade.",
    scene: "Shirisha is learning to be an electrician, but the tools are very heavy and her hands are tired.",
    play: "What should Shirisha do?",
    choices: ["Keep practicing", "Ask for a break", "Give up"],
    lesson: "Strength grows a little bit every day.",
    reward: "Strength Badge",
    icon: Lightning,
    tone: "teal",
  },
  {
    id: "court",
    label: "The 'Men Only' Sign",
    title: "Facing an unfair rule.",
    scene: "Shirisha wants to apply for the job, but the official paper says 'No Women Allowed.'",
    play: "How should she respond?",
    choices: ["Go to the judge", "Write a letter", "Walk away"],
    lesson: "It takes courage to be the one who says, 'This is wrong.'",
    reward: "Justice Badge",
    icon: ShieldCheck,
    tone: "rose",
  },
  {
    id: "climb",
    label: "The 18-Foot Pole",
    title: "The final test.",
    scene: "It is the day of the test. The electricity pole looks incredibly tall, and many people are watching to see if she will fail.",
    play: "Help Shirisha focus before she climbs.",
    choices: ["Take a deep breath", "Look at the top", "Ignore the crowd"],
    lesson: "When you believe in yourself, you can climb any height.",
    reward: "Trailblazer Badge",
    icon: Star,
    tone: "amber",
  },
];
"""

shirisha_stories = """
const shirishaStorybookPreviews = [
  {
    pages: "Pages 1-5",
    title: "The Puzzle of Light",
    image: null,
    text: "Shirisha grows up in a small village and becomes fascinated by how electricity works. She decides to go to school to become an electrician.",
    takeaway: "Follow what interests you, even if it's unusual.",
    reader: [
      ["Page 1", "The village lights", "Shirisha lived in a small village. When the lights flickered, she always wondered how the power traveled through the wires to reach her home."],
      ["Page 3", "A heavy decision", "When she grew older, she wanted to understand those wires. She enrolled in a school to become an electrician. The tools were heavy, but her determination was heavier."],
    ],
  },
  {
    pages: "Pages 6-11",
    title: "The Unfair Rule",
    image: null,
    text: "Shirisha is ready to work, but the official rules say 'Men Only.' Everyone tells her to go home. Instead, she goes to the High Court.",
    takeaway: "When a rule is unfair, you have the right to question it.",
    reader: [
      ["Page 6", "No women allowed", "Shirisha wanted to be a lineman, but the rulebook said 'Men Only.' People told her it was too dangerous and she should just go home."],
      ["Page 9", "The courtroom", "Shirisha knew she was just as capable. She and another brave woman went to the High Court and asked a simple question: 'Why not?' And the judge agreed with them."],
    ],
  },
  {
    pages: "Pages 12-17",
    title: "The 18-Foot Climb",
    image: null,
    text: "The court says women can apply! But Shirisha still has to pass a physical test: climbing an 18-foot electricity pole in just one minute.",
    takeaway: "True strength comes from practice and believing in yourself.",
    reader: [
      ["Page 12", "Practice makes perfect", "Shirisha had to prove she could do the job. She practiced climbing poles with her uncle until her hands were tough and strong."],
      ["Page 16", "The top of the world", "On the day of the test, she put on her boots, grabbed the pole, and climbed straight to the top in less than a minute. She looked down at the cheering crowd with a huge smile."],
    ],
  },
];
"""

content = content.replace('const manuAdventureStops = [', shirisha_stops + '\nconst manuAdventureStops = [')
content = content.replace('const manuStorybookPreviews = [', shirisha_stories + '\nconst manuStorybookPreviews = [')

# 3. Dynamic array logic in CharacterDashboard
dynamic_vars_old = """
  const storybookPreviews = selectedId === 'savitribai' ? savitribaiStorybookPreviews : manuStorybookPreviews;
  const adventureStops = selectedId === 'savitribai' ? savitribaiAdventureStops : manuAdventureStops;
"""
dynamic_vars_new = """
  const storybookPreviews = selectedId === 'savitribai' ? savitribaiStorybookPreviews : (selectedId === 'shirisha' ? shirishaStorybookPreviews : manuStorybookPreviews);
  const adventureStops = selectedId === 'savitribai' ? savitribaiAdventureStops : (selectedId === 'shirisha' ? shirishaAdventureStops : manuAdventureStops);
"""
content = content.replace(dynamic_vars_old, dynamic_vars_new)

# 4. Replace Kalpana in CharacterSelectorFullscreen
selector_old = '{ id: "kalpana", ...characterLibrary.kalpana }'
selector_new = '{ id: "shirisha", ...characterLibrary.shirisha }'
content = content.replace(selector_old, selector_new)

# 5. Fix characterOrder if it exists
content = content.replace('"kalpana"', '"shirisha"')

with open('src/App.jsx', 'w') as f:
    f.write(content)

print("Injected Shirisha successfully.")
