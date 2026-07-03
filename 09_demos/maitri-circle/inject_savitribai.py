import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

savitribai_lib = """
  savitribai: {
    name: "Savitribai",
    initials: "SP",
    role: "Pioneer of Girls' Education",
    image: null,
    tone: "amber",
    tagline: "The girl who believed that a book was the most powerful tool in the world, and courage was simply sharing it.",
    worldPill: "Pune's first classrooms and chalk dust",
    origin: "Inspired by Savitribai Phule, India's first female teacher",
    question: "How does learning open a door that can never be closed?",
    signature: "A wooden slate, a book of poetry, a spare saree, and a classroom lamp.",
    takeaway: "Learning is a superpower that nobody can take away from you.",
    world: "The bustling streets of 19th-century Pune, quiet courtyards turned into classrooms, wooden slates, chalk dust, and resilient smiles.",
    values: [
      ["Learning courage", "She believes every girl has the right to read.", BookOpenText, "amber"],
      ["Resilient courage", "She keeps walking even when people throw mud.", ShieldCheck, "teal"],
      ["Teaching courage", "She shares everything she learns with others.", Lightbulb, "violet"],
    ],
    traits: ["Resilient", "Determined", "Compassionate", "Pioneering", "Poetic"],
    meta: [
      ["First value", "Courage through resilience"],
      ["First story", "The Mud on the Saree"],
      ["Child promise", "No one can stop you from learning"],
    ],
    prompts: [
      {
        id: "learn",
        label: "Savitribai learns to read.",
        title: "Story beat",
        text: "When she was young, books were not meant for girls. But Savitribai looked at the letters and saw magic. She practiced in secret until the letters became words, and the words became her voice.",
      },
      {
        id: "mud",
        label: "People throw mud on her way to school.",
        title: "Brave choice",
        text: "Some people did not want girls to learn. They threw mud at Savitribai as she walked. She did not yell back. She simply carried a spare, clean saree in her bag, changed when she arrived, and taught her class with a smile.",
      },
      {
        id: "letter",
        label: "A letter from Savitribai.",
        title: "Friend letter",
        text: "Dear Friend, sometimes doing the right thing makes other people upset. When they throw 'mud' at your dreams, just brush it off, change your 'saree', and keep going. Your mind is yours alone.",
      },
    ],
  },
"""

savitribai_stops = """
const savitribaiAdventureStops = [
  {
    id: "secret",
    label: "The First Letter",
    title: "Tracing letters in the dust.",
    scene: "Savitribai wants to read, but girls aren't allowed to hold books. She sees a stick and some soft dirt.",
    play: "How should she practice her first letter?",
    choices: ["Draw in the dirt", "Hide a slate", "Ask for help"],
    lesson: "Curiosity is the beginning of courage.",
    reward: "Curiosity Badge",
    icon: BookOpenText,
    tone: "violet",
  },
  {
    id: "school",
    label: "The Empty Room",
    title: "Waiting for the first student.",
    scene: "The school is open, but the room is empty. Parents are too scared to send their daughters.",
    play: "What should Savitribai do?",
    choices: ["Wait patiently", "Visit families", "Sing a song"],
    lesson: "True courage is sharing what you have.",
    reward: "Patience Badge",
    icon: Heart,
    tone: "teal",
  },
  {
    id: "mud",
    label: "The Walk to School",
    title: "Facing the bullies.",
    scene: "Angry villagers block the path and throw mud on Savitribai's beautiful saree.",
    play: "Help Savitribai choose a response.",
    choices: ["Bring a spare saree", "Yell at them", "Run away"],
    lesson: "You don't always have to fight back loudly to win.",
    reward: "Resilience Badge",
    icon: ShieldCheck,
    tone: "amber",
  },
  {
    id: "poem",
    label: "The Poetry of Courage",
    title: "Writing a line of poetry when feeling sad.",
    scene: "It was a hard day. Savitribai sits by the lamp with her slate.",
    play: "What should she write about?",
    choices: ["The joy of reading", "Being strong", "A new tomorrow"],
    lesson: "Your voice is powerful.",
    reward: "Voice Badge",
    icon: Lightbulb,
    tone: "rose",
  },
];
"""

savitribai_stories = """
const savitribaiStorybookPreviews = [
  {
    pages: "Pages 1-5",
    title: "The Girl Who Wanted to Learn",
    image: null,
    text: "Savitribai discovers a book for the first time. She realizes that the strange marks on the paper hold stories, and she decides she must learn them.",
    takeaway: "Curiosity is the beginning of courage.",
    reader: [
      ["Page 1", "A secret book", "In a world where girls were not taught to read, Savitribai saw her first book. The letters looked like strange birds waiting to take flight."],
      ["Page 2", "Drawing in the dust", "She picked up a stick and traced the shapes in the soft dust of the courtyard. She practiced in secret until the letters became words."],
      ["Page 4", "Her own voice", "When she finally read her first full word, it felt like unlocking a door that could never be closed again."],
    ],
  },
  {
    pages: "Pages 6-11",
    title: "The First Classroom",
    image: null,
    text: "Learning wasn't enough. Savitribai and her husband open the very first school for girls. The classroom is small, but the dreams inside are massive.",
    takeaway: "True courage is sharing what you have.",
    reader: [
      ["Page 6", "Opening the doors", "Savitribai arranged the wooden slates perfectly. Today was the first day of India's first school for girls. Her heart raced."],
      ["Page 8", "Waiting", "At first, no one came. Parents were afraid. But Savitribai waited by the door with a warm smile, refusing to give up."],
      ["Page 10", "The first student", "Finally, a small girl peaked around the corner. Savitribai held out her hand, and the world changed forever."],
    ],
  },
  {
    pages: "Pages 12-17",
    title: "The Mud on the Saree",
    image: null,
    text: "The village is angry that girls are learning. They throw mud at Savitribai. Instead of fighting, she prepares a brilliant, peaceful solution.",
    takeaway: "Resilience means you do not let others stop your mission.",
    reader: [
      ["Page 12", "Angry voices", "As she walked to school, people shouted and threw mud. It ruined her beautiful saree. But she did not yell back."],
      ["Page 13", "The spare saree", "Instead, she began carrying a spare, clean saree in her bag. She would arrive, change quietly, and begin teaching."],
      ["Page 16", "Unstoppable", "The bullies soon realized that no amount of mud could stop her. Her mind was hers alone, and her mission was unstoppable."],
    ],
  },
  {
    pages: "Pages 18-20",
    title: "A Letter From Savitribai",
    image: null,
    text: "Savitribai speaks directly to the child, reminding them that an educated mind is the strongest shield they can ever wear.",
    takeaway: "The story becomes a keepsake message.",
    reader: [
      ["Page 18", "Dear Friend", "Dear friend, sometimes doing the right thing makes other people upset. They might throw 'mud' at your dreams."],
      ["Page 20", "Keep going", "When they do, just brush it off, change your 'saree', and keep going. Learning is a superpower that nobody can take away from you."],
    ],
  },
];
"""

# 1. Inject characterLibrary
content = content.replace('kalpana: {', savitribai_lib + '\n  kalpana: {')

# 2. Inject adventure stops
content = content.replace('const manuStorybookPreviews = [', savitribai_stops + '\n\nconst manuStorybookPreviews = [')

# 3. Inject storybook previews
# find end of manuStorybookPreviews
idx = content.find('const characterDashboardModes')
if idx != -1:
    content = content[:idx] + savitribai_stories + '\n\n' + content[idx:]

# 4. Replace Mary with Savitribai in CharacterSelectorFullscreen
selector_replacement = """  const characters = [
    { id: "manu", ...characterLibrary.manu },
    { id: "kalpana", ...characterLibrary.kalpana },
    { id: "savitribai", ...characterLibrary.savitribai },
  ];"""
content = re.sub(r'const characters = \[\s*\{ id: "manu".*?\{ id: "mary".*?\s*\];', selector_replacement, content, flags=re.DOTALL)

with open('src/App.jsx', 'w') as f:
    f.write(content)

print("Injected Savitribai successfully.")

