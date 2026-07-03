import { lazy, Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookBookmark,
  BookOpenText,
  CalendarDots,
  ChalkboardTeacher,
  CheckCircle,
  Compass,
  Crown,
  FlowerLotus,
  Gift,
  Heart,
  Lightbulb,
  Lightning,
  List,
  LockKey,
  MoonStars,
  NotePencil,
  PaintBrush,
  Plant,
  SealCheck,
  ShieldCheck,
  Sparkle,
  Star,
  Sun,
  UsersThree,
  X,
} from "@phosphor-icons/react";

const StoryUniversePage = lazy(() =>
  import("./StoryUniverse.jsx").then((module) => ({ default: module.StoryUniversePage })),
);

const siteBase = import.meta.env.BASE_URL || "/";
const publicPath = (path = "") => `${siteBase}${path.replace(/^\/+/, "")}`;
const themeStorageKey = "maitri-theme";

function getSavedTheme() {
  if (typeof window === "undefined") return "light";

  const saved = window.localStorage.getItem(themeStorageKey);
  if (saved === "dark" || saved === "light") return saved;

  return "light"; // Default to light mode
}

function applyTheme(theme, animate = false) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  if (animate) {
    root.classList.add("theme-transitioning");
    window.setTimeout(() => root.classList.remove("theme-transitioning"), 520);
  }
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

applyTheme(getSavedTheme());

const generatedAssets = {
  hero: publicPath("assets/generated/optimized/hero-scene.jpg"),
  manuPortrait: publicPath("assets/generated/optimized/manu-portrait.jpg"),
  universeMap: publicPath("assets/generated/optimized/universe-map.jpg"),
  circle: publicPath("assets/generated/optimized/circle-gathering.jpg"),
  schools: publicPath("assets/generated/optimized/schools-workshop.jpg"),
  portal: publicPath("assets/generated/optimized/waitlist-portal.jpg"),
};

const shwetikaAssets = {
  manuDoll: publicPath("assets/shwetika/manu/optimized/manu-doll-cutout.png"),
  manuOnHorse: publicPath("assets/shwetika/manu/optimized/manu-on-horse.jpg"),
  manuWithFather: publicPath("assets/shwetika/manu/optimized/manu-riding-with-father.jpg"),
  horseRace: publicPath("assets/shwetika/manu/optimized/horse-race.jpg"),
  manuAtGhats: publicPath("assets/shwetika/manu/optimized/manu-at-ghats.jpg"),
  storyOneChance: publicPath("assets/shwetika/manu/optimized/story-one-chance.jpg"),
  storyBadalChooses: publicPath("assets/shwetika/manu/optimized/story-badal-chooses.jpg"),
  storyLetterFromManu: publicPath("assets/shwetika/manu/optimized/story-letter-from-manu.jpg"),
  storyActivitiesStickers: publicPath("assets/shwetika/manu/optimized/story-activities-stickers.jpg"),
};

const navItems = [
  ["Meet Manu", publicPath("#manu")],
  ["First Box", publicPath("#first-box")],
  ["For Families", publicPath("#circle")],
  ["Companions", publicPath("companions.html")],
  ["Reading Circles", publicPath("#schools")],
];

const heroProof = [
  {
    icon: Heart,
    text: "A brave Indian friend to grow with",
    tone: "rose",
  },
  {
    icon: BookOpenText,
    text: "Stories rooted in India",
    tone: "teal",
  },
  {
    icon: ShieldCheck,
    text: "Gentle values without preaching",
    tone: "violet",
  },
];

const manuKeepsakes = [
  ["Doll companion", Gift, "rose"],
  ["32-page storybook", BookOpenText, "cyan"],
  ["Letter, activities, stickers", NotePencil, "orange"],
];

const circleBenefits = [
  ["Story-led play", BookOpenText, "violet"],
  ["Small family rituals", CalendarDots, "teal"],
  ["A calmer gifting choice", UsersThree, "amber"],
];

const schoolBenefits = [
  ["Read-aloud interest", BookBookmark, "cyan"],
  ["Gentle story sessions", ChalkboardTeacher, "blue"],
  ["Values-led reflection", Plant, "green"],
];

const characterLibrary = {
  manu: {
    name: "Manu",
    initials: "M",
    role: "First companion",
    image: shwetikaAssets.manuDoll,
    tone: "rose",
    tagline: "The girl who asked why, listened closely, and found courage one small step at a time.",
    worldPill: "Bithoor and the Ganga banks",
    origin: "Inspired by the childhood courage of Manikarnika, later remembered as Rani Laxmibai",
    question: "How does courage grow as a child grows?",
    signature: "Badal, a wooden sword, the Ganga ghats, river stones, marigolds, and one brave question.",
    takeaway: "Courage does not wait until you are grown up.",
    world: "Bithoor on the Ganga, warm courtyards, stables, mango groves, lamps, and everyday brave choices.",
    values: [
      ["Asking courage", "She asks why when something feels unfair.", Lightbulb, "amber"],
      ["Trying courage", "She begins before she feels fully ready.", ShieldCheck, "teal"],
      ["Kindness courage", "She chooses care before proving herself.", Heart, "rose"],
    ],
    traits: ["Curious", "Patient", "Kind", "Fair", "Steady", "Observant"],
    meta: [
      ["First value", "Courage with tenderness"],
      ["First story", "The Horse Nobody Could Ride"],
      ["Child promise", "You do not have to be grown up to be brave"],
    ],
    prompts: [
      {
        id: "horse",
        label: "Manu meets the horse nobody could ride.",
        title: "Story beat",
        text: "Manu stood outside the stable and watched the horse stamp once, then lower his head. Everyone called him difficult. Manu saw something different: he was scared. She stepped closer slowly and waited until he looked back.",
      },
      {
        id: "unfair",
        label: "Someone says girls cannot learn this.",
        title: "Brave question",
        text: "When the courtyard grew quiet, Manu asked the question sitting inside her chest: 'Why not?' She did not shout. She did not run away. She stood still, waiting for an answer that made sense.",
      },
      {
        id: "letter",
        label: "A letter from Manu to a child.",
        title: "Friend letter",
        text: "Dear Friend, sometimes courage is not a loud thing. Sometimes it is one small step, one honest question, or one kind hand held out to someone who is afraid.",
      },
    ],
  },
  
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

  kalpana: {
    name: "Kalpana",
    initials: "KC",
    role: "Future STEM companion",
    image: null,
    tone: "teal",
    tagline: "A determined dreamer who looked at the sky and wanted to understand how far courage could travel.",
    worldPill: "Karnal skies and space journeys",
    origin: "Inspired by Kalpana Chawla",
    question: "What happens when a small dream keeps growing?",
    signature: "A notebook of flight sketches, stars, and a paper plane.",
    takeaway: "Big dreams become real through practice, questions, and persistence.",
    world: "Rooftops, classrooms, aircraft sketches, night skies, mission rooms, and a view of Earth.",
    values: [
      ["Wonder", "She notices the sky and keeps asking how things fly.", Sparkle, "violet"],
      ["Science", "She tests ideas and keeps learning.", Lightbulb, "teal"],
      ["Persistence", "She keeps working when the dream feels far away.", SealCheck, "amber"],
    ],
    traits: ["Dreamer", "Scientific", "Persistent", "Humble", "Adventurous"],
    meta: [
      ["Age in story", "9-12 years"],
      ["Core book", "The Girl Who Looked Up"],
      ["Product lane", "STEM story and activity kit"],
    ],
    prompts: [
      {
        id: "stars",
        label: "Kalpana maps the night sky from a rooftop.",
        title: "Story beat",
        text: "Kalpana lay on the terrace with a notebook beside her. The stars did not feel far away tonight. They felt like questions waiting for someone patient enough to answer them.",
      },
      {
        id: "practice",
        label: "Kalpana keeps working on a difficult idea.",
        title: "Persistence",
        text: "The drawing did not look right the first time. Or the second. Kalpana sharpened her pencil, turned the page, and tried the wing shape again.",
      },
      {
        id: "earth",
        label: "Kalpana describes Earth from far away.",
        title: "Wonder note",
        text: "From high above, Earth looked like one glowing home. Kalpana pressed her hand near the window and remembered every child who had ever looked up.",
      },
    ],
  },

  shirisha: {
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
  mary: {
    name: "Mary Kom",
    initials: "MK",
    role: "Future grit friend",
    image: null,
    tone: "amber",
    tagline: "A disciplined athlete who shows children that strength is built one practice at a time.",
    worldPill: "Manipur training fields",
    origin: "Inspired by Mary Kom",
    question: "How do I keep going when something is difficult?",
    signature: "Training wraps, a medal ribbon, running paths, and family support.",
    takeaway: "Strength grows through practice, focus, and the people who believe in you.",
    world: "Green hills, morning runs, training spaces, family homes, and the sound of steady practice.",
    values: [
      ["Grit", "She keeps practicing even when it is hard.", SealCheck, "green"],
      ["Discipline", "She returns to the work every day.", ShieldCheck, "amber"],
      ["Heart", "She carries family and community with her.", Heart, "rose"],
    ],
    traits: ["Disciplined", "Focused", "Resilient", "Energetic", "Caring"],
    meta: [
      ["Age in story", "9-11 years"],
      ["Core book", "The Practice Before The Prize"],
      ["Product lane", "Movement and resilience play"],
    ],
    prompts: [
      {
        id: "practice",
        label: "Mary starts her first serious practice.",
        title: "Story beat",
        text: "Mary wrapped her hands carefully. The room was quiet except for her breath. She did not need to be perfect today. She only needed to begin.",
      },
      {
        id: "morning",
        label: "Mary trains before the sun comes up.",
        title: "Training morning",
        text: "Before the village had fully woken, Mary was already running. The mist touched her cheeks, and each step reminded her that strength is built slowly.",
      },
      {
        id: "kind",
        label: "Mary encourages a younger child.",
        title: "Leadership",
        text: "The little girl missed the target and looked down. Mary smiled and held the pads steady. 'Again,' she said softly. 'This time, trust your feet.'",
      },
    ],
  },
};

const characterOrder = ["manu", "kalpana", "shirisha", "mary"];

const characterWorldModes = [
  ["story", "Story", BookOpenText],
  ["play", "Play", Compass],
  ["learn", "Four Courages", Lightbulb],
  ["create", "Create", PaintBrush],
  ["parents", "Parents", UsersThree],
];

const manuStoryActs = [
  {
    title: "The Courage to Begin",
    pages: "Book One preview",
    text: "Manu asks a brave question, notices that Badal is scared, and learns that patience can be courage too.",
    value: "Ask the brave question",
    image: shwetikaAssets.manuWithFather,
    imageAlt: "Manu learning to ride with her father beside her",
  },
  {
    title: "The Courage to Belong",
    pages: "Next story direction",
    text: "Later stories can follow Manu into new rooms, new responsibilities, and new moments where she keeps her voice.",
    value: "Belong without disappearing",
    image: shwetikaAssets.manuAtGhats,
    imageAlt: "Manu at the Ganga ghats in warm storybook light",
  },
  {
    title: "The Courage to Grow",
    pages: "Future Manu story",
    text: "The wider series can grow with Manu while keeping the child-facing promise warm, gentle, and age-aware.",
    value: "Take the next step",
    image: shwetikaAssets.manuOnHorse,
    imageAlt: "Young Manu riding a horse in storybook artwork",
  },
  {
    title: "More Brave Friends",
    pages: "Future Maitri shelf",
    text: "After families fall in love with Manu, Maitri can grow into more Indian heroines with the same warmth, care, and story-led play.",
    value: "Let courage last",
    image: shwetikaAssets.horseRace,
    imageAlt: "Manu racing on horseback as a symbol of a growing story shelf",
  },
];


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

const manuAdventureStops = [
  {
    id: "meet",
    label: "Meet Manu",
    title: "Before she was a queen, she was a girl who asked why.",
    scene:
      "Start beside the Ganga at sunrise. Manu is watching the training yard, holding one big question in her heart.",
    play: "Choose the first brave thing Manu should do.",
    choices: ["Ask why", "Listen closely", "Try once"],
    lesson: "Courage begins with noticing what feels unfair and asking with honesty.",
    reward: "Brave Question Badge",
    icon: BookOpenText,
    tone: "rose",
  },
  {
    id: "badal",
    label: "Meet Badal",
    title: "The horse nobody could ride is not angry. He is scared.",
    scene:
      "Badal stamps once and lowers his head. Manu watches quietly before stepping closer.",
    play: "Pick how Manu should approach Badal.",
    choices: ["Walk slowly", "Speak softly", "Wait patiently"],
    lesson: "Patience can be braver than showing off.",
    reward: "Kind Courage Badge",
    icon: Heart,
    tone: "teal",
  },
  {
    id: "choice",
    label: "What Would Manu Do?",
    title: "Someone says, 'Girls cannot learn this.'",
    scene:
      "The courtyard goes quiet. Manu can walk away, argue loudly, or ask a brave question.",
    play: "Help Manu choose a response.",
    choices: ["Why not?", "Teach me once", "Let me try"],
    lesson: "A brave question can open a new path.",
    reward: "Fairness Badge",
    icon: ShieldCheck,
    tone: "amber",
  },
  {
    id: "tracker",
    label: "Courage Tracker",
    title: "Small brave actions count too.",
    scene:
      "Manu's courage grows one try at a time. Mark a day when you tried, asked, helped, or waited.",
    play: "Tap days to build a seven-day courage trail.",
    choices: ["Try", "Ask", "Help"],
    lesson: "Everyday courage is something children can practice.",
    reward: "Seven Steps Badge",
    icon: CalendarDots,
    tone: "violet",
  },
  {
    id: "maze",
    label: "Reach Badal",
    title: "Find the gentle path through the stable.",
    scene:
      "A playful maze moment helps Manu reach Badal without rushing or frightening him.",
    play: "Collect the path markers in order.",
    choices: ["River stone", "Marigold", "Stable door"],
    lesson: "Problem solving works best when we slow down and look carefully.",
    reward: "Pathfinder Badge",
    icon: Compass,
    tone: "green",
  },
  {
    id: "promise",
    label: "Brave Promise",
    title: "Write one promise Manu would be proud of.",
    scene:
      "At the end of the adventure, Manu writes a small promise that can travel home with the child.",
    play: "Complete the sentence: I promise to be brave when...",
    choices: ["I try again", "I speak kindly", "I ask for help"],
    lesson: "Reflection turns a story into a parent-child conversation.",
    reward: "My Brave Promise",
    icon: NotePencil,
    tone: "rose",
  },
];

const manuLearnCards = [
  ["Asking courage", "Manu asks why when something feels unfair.", Lightbulb, "amber"],
  ["Trying courage", "Manu begins even when the first step feels hard.", ShieldCheck, "teal"],
  ["Kindness courage", "Manu chooses friendship and care before proving herself.", Heart, "rose"],
  ["Quiet courage", "Manu does what is right even when no one is watching.", FlowerLotus, "violet"],
];

const manuCreateCards = [
  ["Design your courage crest", "Choose a symbol for asking, trying, kindness, and quiet courage.", Crown, "amber"],
  ["Sticker story builder", "Place Manu, Badal, marigolds, river stones, and value words into a scene.", Star, "rose"],
  ["Stable spotter", "Look for gentle details in the stable before choosing the next move.", Sparkle, "teal"],
  ["Letter from Manu", "Read a short note that makes Manu feel like a real friend.", NotePencil, "violet"],
];

const parentPrompts = [
  "Where did you need courage today: in your body, your words, your kindness, or your patience?",
  "What is one question you have about something that feels unfair?",
  "Who could use a kind friend today?",
  "What small right thing can you do that might help someone else?",
];

const firstBoxContents = [
  ["Doll", "A Manu companion doll in development for meaningful play.", Gift],
  ["32-page storybook", "The first adventure with Manu and Badal.", BookOpenText],
  ["Letter from Manu", "A warm note that makes Manu feel close.", NotePencil],
  ["Six activities", "Simple prompts for drawing, choosing, and talking.", PaintBrush],
  ["Sticker pages", "Companion art, objects, values, and decorative motifs.", Star],
];

const futureFeatureSlots = [
  ["Story", "a warm child-facing arc"],
  ["Values", "one clear life skill"],
  ["Play", "activities children can repeat"],
  ["Parents", "conversation prompts"],
  ["Shelf", "a growing circle of friends"],
];


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


const characterDashboardModes = [
  ["storybook", "Storybook", BookOpenText],
  ["talk", "Courage Prompts", Heart],
  ["accessories", "Future Add-ons", Gift],
  ["activities", "Activities", PaintBrush],
];


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

const manuStorybookPreviews = [
  {
    pages: "Pages 1-5",
    title: "Manu Feels Different",
    image: shwetikaAssets.manuWithFather,
    text: "Manu watches the courtyard, hears what girls are not expected to do, and asks the question that opens the story: why not?",
    takeaway: "It is okay to ask brave questions.",
    reader: [
      ["Page 1", "The courtyard rule", "In the morning courtyard, Manu watched the boys practice riding. Hooves tapped the dust, wooden swords clicked, and every sound made her step closer."],
      ["Page 2", "Why not?", "Someone laughed softly and said, \"Girls do not need to ride like that.\" Manu did not shout. She looked at the horses, then asked the bravest question she knew: \"Why not?\""],
      ["Page 4", "A promise in the dust", "Manu picked up a small river stone from her pocket. \"I will learn,\" she whispered. \"Even if I have to begin with one tiny step.\""],
    ],
  },
  {
    pages: "Pages 6-11",
    title: "The Horse Nobody Could Ride",
    image: shwetikaAssets.horseRace,
    text: "Badal arrives frightened and misunderstood. Manu notices what others miss and approaches with patience instead of force.",
    takeaway: "Courage can be quiet and patient.",
    reader: [
      ["Page 5", "The horse arrives", "That afternoon, a dark, restless horse came to the stable. His name was Badal. He tossed his head whenever anyone came too near."],
      ["Page 7", "Manu notices", "Manu stood by the stable door and watched quietly. Badal was not mean. His ears twitched at sudden sounds, and his eyes searched for a safe place."],
      ["Page 10", "A quiet answer", "Badal did not come close. But after a long while, he stopped stamping. Manu smiled because quiet answers count too."],
    ],
  },
  {
    pages: "Pages 12-17",
    title: "One Chance",
    image: shwetikaAssets.storyOneChance,
    text: "When Badal may be sent away, Manu asks for one chance. She feels afraid, but chooses care before control.",
    takeaway: "Being brave does not mean being fearless.",
    reader: [
      ["Page 12", "The stable decision", "By evening, the stable master sighed. \"If no one can handle him, Badal may have to leave.\" Manu felt the words land heavy in her chest."],
      ["Page 13", "One chance", "\"Please give me one chance,\" Manu said. Her voice was small at first, but it did not disappear. \"Not to force him. To help him trust.\""],
      ["Page 16", "Care before control", "She brushed Badal's neck with slow, gentle strokes. When he stepped back, she stepped back too. Trust, Manu learned, cannot be pulled like a rope."],
    ],
  },
  {
    pages: "Pages 18-22",
    title: "Badal Chooses",
    image: shwetikaAssets.storyBadalChooses,
    text: "Manu earns Badal's trust one careful circle at a time. The courtyard sees a different kind of strength.",
    takeaway: "Real courage helps others feel safe too.",
    reader: [
      ["Page 18", "Badal chooses", "The next day, Badal came to the stall door before Manu called him. Manu laughed with surprise. It felt like the sun had opened inside the stable."],
      ["Page 20", "Slow is still forward", "They did not gallop. They walked. Then they turned. Then they walked again. Every gentle step said the same thing: we are learning together."],
      ["Page 22", "What everyone saw", "An elder smiled and said, \"Remember this child. One day, her courage will make many people stand taller.\" Manu did not know the future. She only knew Badal was safe."],
    ],
  },
  {
    pages: "Pages 23-24",
    title: "A Letter From Manu",
    image: shwetikaAssets.storyLetterFromManu,
    text: "Manu speaks directly to the child as a friend, reminding them that one kind step forward still counts as courage.",
    takeaway: "The story becomes a keepsake message.",
    reader: [
      ["Page 23", "A letter from Manu", "Dear friend, some people may tell you what you can and cannot do. When that happens, you can ask a brave question. You can listen. You can learn. You can begin."],
      ["Page 24", "One step forward", "I was scared too. Courage was not a loud roar for me. It was one small step toward Badal, then another. When you feel scared, take one kind step."],
    ],
  },
  {
    pages: "Pages 25-32",
    title: "Activities and Stickers",
    image: shwetikaAssets.storyActivitiesStickers,
    text: "Crest design, what-would-Manu-do choices, courage tracking, stable play, a maze, a brave promise, and sticker sheets.",
    takeaway: "Repeat play carries the value home.",
    reader: [
      ["Page 25", "Design your warrior crest", "Draw a crest that feels like you. Add stickers for the qualities you want to carry: brave, curious, kind, strong, or leader."],
      ["Page 27", "Courage tracker", "For seven days, write or draw one small brave action. It can be asking a question, trying again, saying sorry, or helping someone feel safe."],
      ["Page 30", "My brave promise", "Complete the sentence: I promise to be brave when _____. Add a sticker or drawing beside your promise and share it with a grown-up."],
    ],
  },
];

const manuAccessoryPreviews = [
  ["Badal companion concept", "A possible story-led horse add-on after the first Manu box is validated.", Gift],
  ["Courage sticker pack", "A small future extension for brave, curious, kind, and steady moments.", Star],
  ["Festival outfit idea", "A later dress-up layer that could connect Manu to seasonal rituals and gifting.", FlowerLotus],
];

const manuTalkPrompts = [
  "I felt scared to try something new.",
  "Someone told me I cannot do it.",
  "How can I help a nervous friend?",
];

const waitlistStorageKey = "maitri-waitlist-v1";

function readSavedWaitlist() {
  try {
    const raw = window.localStorage.getItem(waitlistStorageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveWaitlistEntry(entry) {
  const current = readSavedWaitlist();
  const withoutDuplicate = current.filter(
    (item) => item.email?.toLowerCase() !== entry.email.toLowerCase(),
  );
  const next = [entry, ...withoutDuplicate].slice(0, 100);
  window.localStorage.setItem(waitlistStorageKey, JSON.stringify(next));
  return next;
}

function GeneratedArt({ src, className = "", alt = "", parallax = false, feather = false }) {
  const moveParallax = (event) => {
    if (!parallax) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const depth = typeof parallax === "number" ? parallax : 7;
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * depth;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * depth;
    const target = event.currentTarget.parentElement || event.currentTarget;
    target.style.setProperty("--parallax-x", x.toFixed(2));
    target.style.setProperty("--parallax-y", y.toFixed(2));
    target.style.setProperty("--layer-back-x", `${(-x * 0.72).toFixed(2)}px`);
    target.style.setProperty("--layer-back-y", `${(-y * 0.52).toFixed(2)}px`);
    target.style.setProperty("--layer-shadow-x", `${(x * 0.4).toFixed(2)}px`);
    target.style.setProperty("--layer-shadow-y", `${(y * 0.46).toFixed(2)}px`);
  };

  const resetParallax = (event) => {
    if (!parallax) return;
    const target = event.currentTarget.parentElement || event.currentTarget;
    target.style.setProperty("--parallax-x", "0");
    target.style.setProperty("--parallax-y", "0");
    target.style.setProperty("--layer-back-x", "0px");
    target.style.setProperty("--layer-back-y", "0px");
    target.style.setProperty("--layer-shadow-x", "0px");
    target.style.setProperty("--layer-shadow-y", "0px");
  };

  return (
    <img
      className={`generated-art ${parallax ? "home-parallax" : ""} ${feather ? "soft-feather" : ""} ${className}`}
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      onPointerMove={moveParallax}
      onPointerLeave={resetParallax}
      onPointerOut={resetParallax}
      onPointerCancel={resetParallax}
    />
  );
}

function Brand() {
  return (
    <a className="brand" href={publicPath("#top")} aria-label="Maitri home">
      <span>Maitri</span>
    </a>
  );
}

function ArrowButton({ children, href, variant = "primary", type = "link" }) {
  if (type === "button") {
    return (
      <button className={`arrow-button ${variant}`} type="submit">
        <span>{children}</span>
        <span className="arrow-orb">
          <ArrowRight size={18} weight="bold" />
        </span>
      </button>
    );
  }

  return (
    <a className={`arrow-button ${variant}`} href={href}>
      <span>{children}</span>
      <span className="arrow-orb">
        <ArrowRight size={18} weight="bold" />
      </span>
    </a>
  );
}

function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(getSavedTheme);
  const isDark = theme === "dark";

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme = current === "dark" ? "light" : "dark";
      window.localStorage.setItem(themeStorageKey, nextTheme);
      applyTheme(nextTheme, true);
      return nextTheme;
    });
  };

  return (
    <button
      className={`header-icon-button theme-toggle ${isDark ? "active" : ""} ${className}`}
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      {isDark ? <MoonStars size={21} weight="duotone" /> : <Sun size={21} weight="duotone" />}
    </button>
  );
}

function IconNote({ item, compact = false }) {
  const [label, Icon, tone] = item;

  return (
    <div className={`icon-note ${tone} ${compact ? "compact" : ""}`}>
      <span>
        <Icon size={compact ? 25 : 34} weight="duotone" />
      </span>
      <p>{label}</p>
    </div>
  );
}

function HeroFeature({ item }) {
  const Icon = item.icon;

  return (
    <div className={`hero-proof ${item.tone}`}>
      <span>
        <Icon size={34} weight="duotone" />
      </span>
      <p>{item.text}</p>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="site-header-bg" />
      <Brand />
      <nav className={`primary-nav ${open ? "open" : ""}`} aria-label="Primary">
        {navItems.map(([label, href]) => (
          <a href={href} key={label} onClick={close}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <div className="header-utility-pill" aria-label="Quick actions">
          <a className="waitlist-pill" href="#waitlist">
            Join Waitlist
          </a>
          <ThemeToggle />
        </div>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section section-shell" id="top">
      <Header />
      <div className="hero-grid">
        <div className="hero-copy">
          <h1>Meet Manu, Maitri's first companion.</h1>
          <p>
            Maitri begins with Manu and grows into Companions: a place where
            children can meet story-led companions, open their books, explore
            courage prompts, and keep returning through meaningful play.
          </p>
          <div className="hero-actions">
            <ArrowButton href="#manu">Meet Manu</ArrowButton>
            <ArrowButton href="#first-box" variant="outline">
              See the First Box
            </ArrowButton>
          </div>
          <div className="hero-proofs" aria-label="Maitri values">
            {heroProof.map((item) => (
              <HeroFeature item={item} key={item.text} />
            ))}
          </div>
        </div>
        <div className="hero-art" aria-label="Maitri story world illustration">
          <GeneratedArt
            src={generatedAssets.hero}
            className="hero-asset"
            alt="A warm illustrated Indian Maitri story world with children gathered in a magical landscape"
            parallax={9}
            feather
          />
        </div>
      </div>
    </section>
  );
}

function Manu() {
  return (
    <section className="manu-section section-shell" id="manu">
      <div className="manu-layout">
        <div className="manu-portrait">
          <GeneratedArt
            src={generatedAssets.manuPortrait}
            className="manu-asset"
            alt="A soft illustrated portrait of Manu in the Maitri story world"
            parallax={6}
            feather
          />
        </div>
        <div className="manu-copy">
          <span className="section-label rose-label">Meet Manu</span>
          <h2>Before she was remembered as a queen, Manu was a girl who asked why.</h2>
          <p>
            Her first Maitri story keeps courage close to childhood: asking a
            brave question, trying once, being kind first, and taking one steady
            step.
          </p>
          <ArrowButton href={publicPath("companions.html")}>Open Companions</ArrowButton>
        </div>
        <div className="keepsakes" aria-label="Manu keepsakes">
          {manuKeepsakes.map((item) => (
            <IconNote item={item} compact key={item[0]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FirstBox() {
  return (
    <section className="first-box-section section-shell" id="first-box">
      <div className="first-box-home">
        <div className="section-copy">
          <span className="section-label amber-label">First Manu Box</span>
          <h2>Manu's story becomes a first box children can hold.</h2>
          <p>
            The first Manu box is intentionally focused: a companion doll in
            development, a 32-page storybook, a letter from Manu, six activity
            pages, and stickers. The story builds the bond; the box gives
            children ways to keep playing.
          </p>
          <ArrowButton href="#waitlist" variant="outline">
            Join for updates
          </ArrowButton>
        </div>
        <div className="first-box-home-grid" aria-label="First Manu box contents">
          {firstBoxContents.map(([label, text, Icon]) => (
            <article key={label}>
              <Icon size={25} weight="duotone" />
              <strong>{label}</strong>
              <span>{text}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Circle() {
  return (
    <section className="circle-section section-shell" id="circle">
      <div className="split-grid circle-grid">
        <div className="section-copy">
          <span className="section-label violet-label">For Families</span>
          <h2>A story-led gift that makes values feel close, not forced.</h2>
          <p>
            For parents and family buyers, Maitri is a warmer alternative to
            mass-market toys and screen-led entertainment: a culturally rooted
            friend, a story worth rereading, and simple prompts for courage,
            fairness, kindness, and trying again.
          </p>
          <ArrowButton href="#waitlist" variant="outline violet">
            Join the Early List
          </ArrowButton>
          <div className="benefit-row">
            {circleBenefits.map((item) => (
              <IconNote item={item} compact key={item[0]} />
            ))}
          </div>
        </div>
        <div className="circle-art">
          <GeneratedArt
            src={generatedAssets.circle}
            className="circle-asset"
            alt="Children and parents seated together in a warm Maitri story gathering"
            parallax={7}
            feather
          />
        </div>
      </div>
    </section>
  );
}

function Schools() {
  return (
    <section className="schools-section section-shell" id="schools">
      <div className="split-grid schools-grid">
        <div className="school-art">
          <GeneratedArt
            src={generatedAssets.schools}
            className="school-asset"
            alt="A grown-up reading Maitri stories to children in a warm circle"
            parallax={7}
            feather
          />
        </div>
        <div className="section-copy schools-copy">
          <span className="section-label blue-label">Future Reading Circles</span>
          <h2>Gentle story-led moments for libraries, classrooms, and workshops.</h2>
          <p>
            Schools, libraries, and reading circles can register interest in
            future Manu read-alouds and values-led story sessions. These pilots
            will stay story-first, age-aware, and separate from formal
            classroom promises.
          </p>
          <ArrowButton href="#waitlist" variant="outline blue">
            Register Interest
          </ArrowButton>
          <div className="benefit-row schools-benefits">
            {schoolBenefits.map((item) => (
              <IconNote item={item} compact key={item[0]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Waitlist() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Parent / guardian",
    interest: "Manu updates",
  });
  const [status, setStatus] = useState("idle");

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus("idle");
  };

  const submitWaitlist = async (event) => {
    event.preventDefault();
    const email = form.email.trim();
    if (!email || !email.includes("@")) {
      setStatus("missing");
      return;
    }

    const entry = {
      ...form,
      name: form.name.trim(),
      email,
      source: window.location.pathname,
      createdAt: new Date().toISOString(),
    };

    const endpoint = import.meta.env.VITE_MAITRI_WAITLIST_ENDPOINT;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });
      } catch {
        // Keep the signup locally if the launch endpoint is unavailable during review.
      }
    }

    saveWaitlistEntry(entry);
    setStatus("joined");
    setForm((current) => ({ ...current, name: "", email: "" }));
  };

  return (
    <section className="waitlist-section section-shell" id="waitlist">
      <div className="waitlist-art">
        <GeneratedArt
          src={generatedAssets.portal}
          className="footer-portal"
          alt="A small illustrated Maitri story portal beside marigolds"
          parallax={5}
          feather
        />
      </div>
      <div className="waitlist-copy">
        <h2>Join the early list for Manu.</h2>
        <p>
          Receive early story previews, parent-child prompts, beta-reader
          invitations, and first updates as the Manu box develops. No preorder
          payment is being taken yet.
        </p>
      </div>
      <form className="waitlist-form" onSubmit={submitWaitlist} noValidate>
        <label>
          <span>Name</span>
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            autoComplete="name"
          />
        </label>
        <label>
          <span>Email address</span>
          <input
            type="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-describedby="waitlist-note"
            autoComplete="email"
          />
        </label>
        <label>
          <span>I am joining as</span>
          <select value={form.role} onChange={(event) => updateField("role", event.target.value)}>
            <option>Parent / guardian</option>
            <option>Gift buyer / family</option>
            <option>NRI family</option>
            <option>Educator / school</option>
            <option>Beta reader</option>
          </select>
        </label>
        <label>
          <span>Interest</span>
          <select value={form.interest} onChange={(event) => updateField("interest", event.target.value)}>
            <option>Manu updates</option>
            <option>Story previews</option>
            <option>First box development updates</option>
            <option>Beta reading</option>
            <option>Reading circle interest</option>
          </select>
        </label>
        <ArrowButton type="button">Join Waitlist</ArrowButton>
        <p className={`form-status ${status}`} id="waitlist-note">
          <LockKey size={15} weight="fill" />
          {status === "joined"
            ? "You are on the early Manu list."
            : status === "missing"
              ? "Enter a valid email address to join the waitlist."
              : "No preorder payment. Just Manu story updates, previews, and parent-child ideas."}
        </p>
      </form>
    </section>
  );
}

function CharacterVisual({ character, compact = false }) {
  if (character.image) {
    return (
      <img
        className={`character-visual-img ${compact ? "compact" : ""}`}
        src={character.image}
        alt={`${character.name} portrait`}
      />
    );
  }

  return (
    <span className={`character-initial ${character.tone} ${compact ? "compact" : ""}`} aria-hidden="true">
      {character.initials}
    </span>
  );
}

function CharacterSelectorFullscreen({ onSelect }) {
    const characters = [
    { id: "manu", ...characterLibrary.manu },
    { id: "kalpana", ...characterLibrary.kalpana },
    { id: "shirisha", ...characterLibrary.shirisha },
    { id: "savitribai", ...characterLibrary.savitribai },
  ];

  return (
    <div className="cx-selector">
      <section className="cx-selector-intro" aria-labelledby="character-title">
        <div>
          <span className="cx-section-mark">Maitri Companions</span>
          <h1 id="character-title">A place to meet, read, and play with story companions.</h1>
        </div>
        <p>
          Start with Manu, open her storybook, try courage prompts, and preview
          how future companions can bring new stories, activities, and add-ons
          into the same gentle world.
        </p>
      </section>
      <div className="cx-selector-grid" aria-label="Maitri companions">
        {characters.map((char) => {
          return (
            <button
              key={char.id} 
              className={`cx-selector-card ${char.id} ${char.tone}`}
              onClick={() => onSelect(char.id)}
              type="button"
            >
              <span className="cx-selector-art">
                {char.image ? (
                  <img src={char.image} alt="" />
                ) : (
                  <span>{char.initials}</span>
                )}
              </span>
              <span className="cx-selector-copy">
                <span>{char.role}</span>
                <strong>{char.name}</strong>
                <small>{char.tagline}</small>
              </span>
              <span className="cx-selector-meta">
                <span>{char.worldPill}</span>
                <ArrowRight size={18} weight="bold" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CharacterDashboard({ selectedId, onBack }) {
  const [activeFeature, setActiveFeature] = useState("storybook");
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [readerOpen, setReaderOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(manuTalkPrompts[0]);
  
  const character = characterLibrary[selectedId] || characterLibrary.manu;
  const isManu = selectedId === "manu";
  const activeStoryPreview = manuStorybookPreviews[selectedStoryIndex] || manuStorybookPreviews[0];
  const heroStops = manuAdventureStops.slice(0, 4);
  const FeatureIcon =
    characterDashboardModes.find(([id]) => id === activeFeature)?.[2] || BookOpenText;
  const selectFeature = (feature) => {
    setActiveFeature(feature);
    if (feature !== "storybook") {
      setReaderOpen(false);
    }
  };
  const openStoryPreview = (index) => {
    setSelectedStoryIndex(index);
    setReaderOpen(true);
  };

  useEffect(() => {
    if (!readerOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape" || event.key === "Esc" || event.code === "Escape") {
        setReaderOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape, true);
    return () => document.removeEventListener("keydown", closeOnEscape, true);
  }, [readerOpen]);

  if (!isManu) {
    return (
      <div className={`cx-dashboard cx-dashboard-future ${character.tone}`}>
        <aside className="cx-character-rail">
          <button className="cx-back-button" onClick={onBack} type="button">
            <ArrowLeft size={18} weight="bold" />
            <span>Companions</span>
          </button>
          <div className="cx-rail-selected">
            <CharacterVisual character={character} />
            <div>
              <span>{character.role}</span>
              <strong>{character.name}</strong>
            </div>
          </div>
        </aside>
        <main className="cx-future-stage">
          <div className="cx-future-emblem" aria-hidden="true">
            <CharacterVisual character={character} />
          </div>
          <span className="cx-section-mark">Future Companion</span>
          <h1>{character.name} is being held for the next Maitri companion shelf.</h1>
          <p>{character.tagline}</p>
          <div className="cx-future-grid">
            {futureFeatureSlots.map(([label, text]) => (
              <article key={label}>
                <strong>{label}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>
          <button className="cx-primary-action" type="button" onClick={onBack}>
            <ArrowLeft size={18} weight="bold" />
            <span>Return to Manu</span>
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="cx-dashboard">
      <aside className="cx-character-rail">
        <button className="cx-back-button" onClick={onBack} type="button">
          <ArrowLeft size={18} weight="bold" />
            <span>Companions</span>
        </button>
        <div className="cx-rail-selected">
          <CharacterVisual character={character} />
          <div>
            <span>{character.role}</span>
            <strong>{character.name}</strong>
          </div>
        </div>
        <nav className="cx-rail-menu" aria-label="Companion dashboard">
          {characterDashboardModes.map(([id, label, Icon]) => (
            <button
              key={id}
              className={activeFeature === id ? "active" : ""}
              onClick={() => selectFeature(id)}
              type="button"
            >
              <Icon size={21} weight="duotone" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="cx-stage">
        <section className="cx-story-hero">
          <img src={activeStoryPreview.image} alt="" />
          <div className="cx-story-hero-copy">
            <span>
              <FeatureIcon size={18} weight="duotone" />
              {activeFeature === "storybook" ? activeStoryPreview.pages : character.name}
            </span>
            <h1>
              {activeFeature === "storybook"
                ? activeStoryPreview.title
                : "Manu's world stays story-first."}
            </h1>
            <p>
              {activeFeature === "storybook"
                ? activeStoryPreview.text
                : "Every activity, prompt, and add-on should feel like it belongs inside Manu's courage story."}
            </p>
            <button className="cx-primary-action" type="button" onClick={() => setReaderOpen(true)}>
              <BookOpenText size={19} weight="duotone" />
              <span>Open Reader</span>
            </button>
          </div>
        </section>

        {activeFeature === "storybook" && (
          <section className="cx-chapter-grid" aria-label="Storybook chapters">
            {manuStorybookPreviews.map((preview, index) => (
              <button
                className={selectedStoryIndex === index ? "active" : ""}
                key={preview.pages}
                onClick={() => openStoryPreview(index)}
                type="button"
              >
                <img src={preview.image} alt="" />
                <span>{preview.pages}</span>
                <strong>{preview.title}</strong>
                <small>{preview.takeaway}</small>
              </button>
            ))}
          </section>
        )}

        {activeFeature === "talk" && (
          <section className="cx-dialogue-panel">
            <div className="cx-prompt-list">
              {manuTalkPrompts.map((prompt) => (
                <button
                  className={selectedPrompt === prompt ? "active" : ""}
                  type="button"
                  key={prompt}
                  onClick={() => setSelectedPrompt(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
            <blockquote>
              <Heart size={25} weight="duotone" />
              <p>
                I felt scared too. A brave step does not have to be loud. Try
                one kind step, then tell someone you trust what happened.
              </p>
              <span>{selectedPrompt}</span>
            </blockquote>
          </section>
        )}

        {activeFeature === "accessories" && (
          <section className="cx-addon-grid" aria-label="Future add-ons">
            {manuAccessoryPreviews.map(([label, text, Icon]) => (
              <article key={label}>
                <Icon size={28} weight="duotone" />
                <strong>{label}</strong>
                <span>{text}</span>
              </article>
            ))}
          </section>
        )}

        {activeFeature === "activities" && (
          <section className="cx-activity-grid" aria-label="Manu activities">
            {heroStops.map((stop) => {
              const StopIcon = stop.icon;
              return (
                <article className={stop.tone} key={stop.id}>
                  <StopIcon size={26} weight="duotone" />
                  <span>{stop.label}</span>
                  <strong>{stop.title}</strong>
                  <p>{stop.lesson}</p>
                </article>
              );
            })}
          </section>
        )}
      </main>

      <aside className="cx-context-panel" aria-label="Manu context">
        <section className="cx-context-card cx-question-card">
          <span>
            <Lightbulb size={20} weight="duotone" />
            Courage Prompt
          </span>
          <p>{parentPrompts[selectedStoryIndex % parentPrompts.length]}</p>
        </section>
        <section className="cx-context-card">
          <span>
            <Gift size={20} weight="duotone" />
            First Box
          </span>
          <div className="cx-keepsake-list">
            {firstBoxContents.slice(0, 4).map(([label, text, Icon]) => (
              <article key={label}>
                <Icon size={20} weight="duotone" />
                <div>
                  <strong>{label}</strong>
                  <small>{text}</small>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="cx-context-card cx-world-card">
          <span>
            <Compass size={20} weight="duotone" />
            Story World
          </span>
          <p>{character.world}</p>
        </section>
      </aside>

      {readerOpen && createPortal(
        <div className="cx-reader-overlay" role="dialog" aria-modal="true" aria-label="Storybook preview">
          <button className="cx-reader-backdrop" type="button" onClick={() => setReaderOpen(false)} aria-label="Dismiss reader" />
          <div className="cx-reader-modal">
            <button className="cx-reader-close" onClick={() => setReaderOpen(false)} type="button" aria-label="Close reader">
              <X size={22} weight="bold" />
            </button>
            <div className="cx-reader-image">
              <img src={activeStoryPreview.image} alt="" />
            </div>
            <div className="cx-reader-copy">
              <span>{activeStoryPreview.pages}</span>
              <h2>{activeStoryPreview.title}</h2>
              <p>{activeStoryPreview.takeaway}</p>
              <div>
                {activeStoryPreview.reader.map(([page, title, text]) => (
                  <article key={`${activeStoryPreview.pages}-${page}`}>
                    <strong>{page}</strong>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}

function CharacterPage() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <main className={`maitri-page character-world-page ${!selectedId ? 'no-scroll' : 'dashboard-active'}`}>
      <Header />
      {!selectedId ? (
        <CharacterSelectorFullscreen onSelect={setSelectedId} />
      ) : (
        <CharacterDashboard selectedId={selectedId} onBack={() => setSelectedId(null)} />
      )}
    </main>
  );
}
function CharacterPageLegacy() {
  const [selectedId, setSelectedId] = useState("manu");
  const [mode, setMode] = useState("story");
  const [activeStopId, setActiveStopId] = useState("meet");
  const [selectedChoice, setSelectedChoice] = useState("Ask why");
  const [completedStops, setCompletedStops] = useState(["meet"]);
  const [trackerMarks, setTrackerMarks] = useState(["Mon"]);
  const [promise, setPromise] = useState("");

  const character = characterLibrary[selectedId];
  const isManu = selectedId === "manu";
  const activeStop = manuAdventureStops.find((item) => item.id === activeStopId) || manuAdventureStops[0];
  const ActiveStopIcon = activeStop.icon;
  const activeStopIndex = manuAdventureStops.findIndex((item) => item.id === activeStop.id);
  const completedCount = completedStops.length;
  const progressPercent = Math.round((completedCount / manuAdventureStops.length) * 100);
  const activeBadgeCollected = completedStops.includes(activeStop.id);
  const nextStop = manuAdventureStops[activeStopIndex + 1] || manuAdventureStops[0];

  const selectCharacter = (id) => {
    setSelectedId(id);
    setMode(id === "manu" ? mode : "story");
  };

  const selectStop = (id) => {
    const nextStop = manuAdventureStops.find((item) => item.id === id);
    setActiveStopId(id);
    setSelectedChoice(nextStop?.choices[0] || "");
  };

  const collectBadge = () => {
    setCompletedStops((current) =>
      current.includes(activeStop.id) ? current : [...current, activeStop.id],
    );
  };

  const toggleTrackerMark = (day) => {
    setTrackerMarks((current) =>
      current.includes(day) ? current.filter((item) => item !== day) : [...current, day],
    );
  };

  const renderManuMode = () => {
    if (mode === "play") {
      return (
        <div className="manu-play-grid">
          <section className="adventure-map" aria-label="Manu adventure path">
            <div className="panel-kicker world-kicker">
              <span>Adventure path</span>
              <strong>{completedStops.length}/{manuAdventureStops.length}</strong>
            </div>
            <div className="adventure-path">
              {manuAdventureStops.map((stop, index) => {
                const StopIcon = stop.icon;
                const active = stop.id === activeStop.id;
                const complete = completedStops.includes(stop.id);
                return (
                  <button
                    className={`adventure-stop ${stop.tone} ${active ? "active" : ""} ${complete ? "complete" : ""}`}
                    type="button"
                    key={stop.id}
                    onClick={() => selectStop(stop.id)}
                    aria-pressed={active}
                  >
                    <span className="stop-number">{index + 1}</span>
                    <StopIcon size={24} weight="duotone" />
                    <strong>{stop.label}</strong>
                    {complete && <CheckCircle size={18} weight="fill" />}
                  </button>
                );
              })}
            </div>
          </section>

          <section className={`quest-panel ${activeStop.tone}`} aria-live="polite">
            <div className="quest-scene">
              <span className="quest-icon">
                <ActiveStopIcon size={34} weight="duotone" />
              </span>
              <div>
                <span className="panel-label">{activeStop.label}</span>
                <h3>{activeStop.title}</h3>
                <p>{activeStop.scene}</p>
              </div>
            </div>

            <div className="choice-board">
              <span>{activeStop.play}</span>
              <div>
                {activeStop.choices.map((choice) => (
                  <button
                    className={selectedChoice === choice ? "active" : ""}
                    type="button"
                    key={choice}
                    onClick={() => setSelectedChoice(choice)}
                  >
                    {choice}
                  </button>
                ))}
              </div>
              <p className="choice-response">
                <Sparkle size={16} weight="fill" />
                Manu is trying: <strong>{selectedChoice}</strong>
              </p>
            </div>

            {activeStop.id === "tracker" && (
              <div className="courage-tracker" aria-label="Seven-day courage tracker">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <button
                    className={trackerMarks.includes(day) ? "marked" : ""}
                    type="button"
                    key={day}
                    onClick={() => toggleTrackerMark(day)}
                  >
                    <span>{day}</span>
                    <Star size={16} weight={trackerMarks.includes(day) ? "fill" : "duotone"} />
                  </button>
                ))}
              </div>
            )}

            {activeStop.id === "promise" && (
              <label className="promise-input">
                <span>I promise to be brave when...</span>
                <input
                  type="text"
                  value={promise}
                  onChange={(event) => setPromise(event.target.value)}
                  placeholder="I try something hard"
                />
              </label>
            )}

            <div className="quest-reward">
              <p>
                <strong>Learning moment</strong>
                {activeStop.lesson}
              </p>
              <button type="button" onClick={collectBadge} disabled={activeBadgeCollected}>
                <Sparkle size={17} weight="fill" />
                <span>{activeBadgeCollected ? "Badge collected" : `Collect ${activeStop.reward}`}</span>
              </button>
            </div>
          </section>

          <aside className="badge-shelf" aria-label="Collected badges">
            <span className="panel-label">Collected badges</span>
            <div>
              {manuAdventureStops.map((stop) => {
                const StopIcon = stop.icon;
                const complete = completedStops.includes(stop.id);
                return (
                  <span className={complete ? "earned" : ""} key={stop.id}>
                    <StopIcon size={20} weight={complete ? "fill" : "duotone"} />
                    {stop.reward}
                  </span>
                );
              })}
            </div>
          </aside>
        </div>
      );
    }

    if (mode === "learn") {
      return (
        <div className="learning-grid">
          {manuLearnCards.map(([label, text, Icon, tone]) => (
            <article className={`learning-card ${tone}`} key={label}>
              <Icon size={32} weight="duotone" />
              <h3>{label}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      );
    }

    if (mode === "create") {
      return (
        <div className="creation-grid">
          {manuCreateCards.map(([label, text, Icon, tone]) => (
            <article className={`creation-card ${tone}`} key={label}>
              <Icon size={30} weight="duotone" />
              <div>
                <h3>{label}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      );
    }

    if (mode === "parents") {
      return (
        <div className="parent-grid">
          <section className="parent-prompts">
            <span className="panel-label">Conversation prompts</span>
            {parentPrompts.map((prompt) => (
              <p key={prompt}>{prompt}</p>
            ))}
          </section>
          <section className="first-box-panel">
            <span className="panel-label">First Manu box</span>
            <div>
              {firstBoxContents.map(([label, text, Icon]) => (
                <article key={label}>
                  <Icon size={24} weight="duotone" />
                  <span>
                    <strong>{label}</strong>
                    <small>{text}</small>
                  </span>
                </article>
              ))}
            </div>
          </section>
        </div>
      );
    }

    return (
      <div className="story-act-grid">
        {manuStoryActs.map((act) => (
          <article className="story-act-card" key={act.title}>
            <img src={act.image} alt={act.imageAlt} />
            <span>{act.pages}</span>
            <h3>{act.title}</h3>
            <p>{act.text}</p>
            <strong>{act.value}</strong>
          </article>
        ))}
      </div>
    );
  };

  return (
    <main className="maitri-page character-world-page">
      <section className="character-world-shell section-shell" id="top">
        <Header />

        <section className="character-world-hero" aria-labelledby="character-world-title">
          <div className="character-world-copy">
            <h1 id="character-world-title">Start with Manu.</h1>
            <p>
              Meet Maitri's first companion through story, play, family prompts,
              and a focused first-box experience children can return to.
            </p>
            <div className="hero-actions">
              <a className="arrow-button" href="#manu-adventure">
                <span>Begin the journey</span>
                <span className="arrow-orb">
                  <ArrowRight size={18} weight="bold" />
                </span>
              </a>
              <a className="arrow-button outline" href="#future-friends">
                <span>See future companions</span>
                <span className="arrow-orb">
                  <ArrowRight size={18} weight="bold" />
                </span>
              </a>
            </div>
          </div>

          <div className="story-stage" aria-label="Interactive Manu story stage">
            <div className="stage-sky" aria-hidden="true" />
            <div className="stage-river" aria-hidden="true" />
          <div className="stage-portrait">
            <CharacterVisual character={characterLibrary.manu} />
              <span>The Girl Who Would Be Queen</span>
            </div>
            <div className="stage-scene-card">
              <span>{activeStop.label}</span>
              <h2>{activeStop.title}</h2>
              <p>{activeStop.scene}</p>
            </div>
            <div className="stage-path" aria-label="Four courages path">
              {manuAdventureStops.slice(0, 4).map((stop, index) => {
                const StopIcon = stop.icon;
                const active = stop.id === activeStop.id;
                const complete = completedStops.includes(stop.id);
                return (
                  <button
                    className={`stage-token token-${index + 1} ${stop.tone} ${active ? "active" : ""} ${complete ? "complete" : ""}`}
                    type="button"
                    key={stop.id}
                    onClick={() => selectStop(stop.id)}
                    aria-pressed={active}
                  >
                    <StopIcon size={22} weight={complete ? "fill" : "duotone"} />
                    <span>{stop.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {isManu ? (
          <section className="manu-dashboard" id="manu-adventure" aria-live="polite">
            <section className="journey-console">
              <div className="journey-copy">
                <span className="panel-label">Meet Manu</span>
                <h2>{character.name}: The Girl Who Would Be Queen</h2>
                <p>{character.tagline}</p>
              </div>

              <div className="journey-switchboard" aria-label="Explore Manu modes">
                {characterWorldModes.map(([id, label, Icon]) => (
                  <button
                    className={mode === id ? "active" : ""}
                    type="button"
                    role="tab"
                    aria-selected={mode === id}
                    key={id}
                    onClick={() => setMode(id)}
                  >
                    <Icon size={19} weight="duotone" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="quest-workbench" style={{ "--progress": `${progressPercent}%` }}>
              <div className="quest-map" aria-label="Manu adventure stops">
                {manuAdventureStops.map((stop, index) => {
                  const StopIcon = stop.icon;
                  const active = stop.id === activeStop.id;
                  const complete = completedStops.includes(stop.id);
                  return (
                    <button
                      className={`quest-map-stop ${stop.tone} ${active ? "active" : ""} ${complete ? "complete" : ""}`}
                      type="button"
                      key={stop.id}
                      onClick={() => selectStop(stop.id)}
                      aria-pressed={active}
                    >
                      <span>{index + 1}</span>
                      <StopIcon size={21} weight={complete ? "fill" : "duotone"} />
                      <strong>{stop.label}</strong>
                    </button>
                  );
                })}
              </div>

              <article className={`quest-panel ${activeStop.tone}`} aria-live="polite">
                <div className="quest-progress-meter">
                  <div>
                    <span>{completedCount} of {manuAdventureStops.length} badges collected</span>
                    <strong>{progressPercent}%</strong>
                  </div>
                  <i aria-hidden="true" />
                </div>

                <div className="quest-scene">
                  <span className="quest-icon">
                    <ActiveStopIcon size={34} weight="duotone" />
                  </span>
                  <div>
                    <span className="panel-label">{activeStop.label}</span>
                    <h3>{activeStop.title}</h3>
                    <p>{activeStop.scene}</p>
                  </div>
                </div>

                <div className="choice-board">
                  <span>{activeStop.play}</span>
                  <div>
                    {activeStop.choices.map((choice) => (
                      <button
                        className={selectedChoice === choice ? "active" : ""}
                        type="button"
                        key={choice}
                        onClick={() => setSelectedChoice(choice)}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                  <p className="choice-response">
                    <Sparkle size={16} weight="fill" />
                    Manu is trying: <strong>{selectedChoice}</strong>
                  </p>
                </div>

                {activeStop.id === "tracker" && (
                  <div className="courage-tracker" aria-label="Seven-day courage tracker">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <button
                        className={trackerMarks.includes(day) ? "marked" : ""}
                        type="button"
                        key={day}
                        onClick={() => toggleTrackerMark(day)}
                      >
                        <span>{day}</span>
                        <Star size={16} weight={trackerMarks.includes(day) ? "fill" : "duotone"} />
                      </button>
                    ))}
                  </div>
                )}

                {activeStop.id === "promise" && (
                  <label className="promise-input">
                    <span>I promise to be brave when...</span>
                    <input
                      type="text"
                      value={promise}
                      onChange={(event) => setPromise(event.target.value)}
                      placeholder="I try something hard"
                    />
                  </label>
                )}

                <div className="quest-reward">
                  <p>
                    <strong>Learning moment</strong>
                    {activeStop.lesson}
                  </p>
                  <button type="button" onClick={collectBadge} disabled={activeBadgeCollected}>
                    <Sparkle size={17} weight="fill" />
                    <span>{activeBadgeCollected ? "Badge collected" : `Collect ${activeStop.reward}`}</span>
                  </button>
                </div>
              </article>

              <aside className="parent-clarity-board" aria-label="Parent clarity">
                <span className="panel-label">Parent clarity</span>
                <h3>Why this character matters</h3>
                <p>
                  Manu keeps bravery close to childhood: asking why, learning to belong,
                  leaving what she loves, listening as a leader, and carrying courage forward.
                </p>
                <div className="mini-promise-list">
                  <span>
                    <strong>Child promise</strong>
                    Courage does not wait until you are grown up.
                  </span>
                  <span>
                    <strong>Story care</strong>
                    Inspired by history, told gently for children.
                  </span>
                  <span>
                    <strong>Next stop</strong>
                    {nextStop.label}
                  </span>
                </div>
              </aside>
            </section>

            <section className="mode-canvas" aria-live="polite">
              {renderManuMode()}
            </section>

            <section className="first-box-bridge" aria-label="Manu first box bridge">
              <div>
              <span className="panel-label">First Manu box</span>
              <h2>The story becomes something children can hold, read, and return to.</h2>
              <p>
                  Manu's first box stays simple and meaningful: the doll creates
                  friendship, the storybook builds attachment, and the activities
                  turn courage into small parent-child moments.
              </p>
              </div>
              <div className="first-box-river">
                {firstBoxContents.map(([label, text, Icon]) => (
                  <article key={label}>
                    <Icon size={24} weight="duotone" />
                    <strong>{label}</strong>
                    <span>{text}</span>
                  </article>
                ))}
              </div>
            </section>
          </section>
        ) : (
          <section className={`future-character-preview ${character.tone}`} aria-live="polite">
            <div className="future-character-art">
              <CharacterVisual character={character} />
              <span>{character.worldPill}</span>
            </div>
            <div className="future-character-copy">
              <span className="panel-label">Future Maitri friend</span>
              <h2>{character.name}</h2>
              <p>
                This friend belongs to the future Maitri shelf. Manu comes
                first, so every new friend can receive the same care in story,
                values, play, and child-facing language.
              </p>
              <div className="future-slot-grid">
                {futureFeatureSlots.map(([label, text]) => (
                  <span key={label}>
                    <strong>{label}</strong>
                    <small>{text}</small>
                  </span>
                ))}
              </div>
              <button className="future-back-button" type="button" onClick={() => selectCharacter("manu")}>
                <Compass size={18} weight="duotone" />
                <span>Play Manu first</span>
              </button>
            </div>
          </section>
        )}

        <section className="future-feature-band" id="future-friends" aria-label="Future Maitri friends">
          <div className="future-band-head">
            <span className="panel-label">Future Maitri shelf</span>
            <h2>More friends can join when Manu has found her first families.</h2>
          </div>
          <div className="world-character-row">
            {characterOrder.map((id) => {
              const item = characterLibrary[id];
              const locked = id !== "manu";
              return (
                <button
                  className={`world-character-card ${id === selectedId ? "active" : ""} ${locked ? "preview" : ""}`}
                  type="button"
                  aria-pressed={id === selectedId}
                  aria-label={locked ? `${item.name} future companion preview` : `${item.name} first companion`}
                  key={id}
                  onClick={() => selectCharacter(id)}
                >
                  <CharacterVisual character={item} compact />
                  <span>
                    <strong>{item.name}</strong>
                    <small>{locked ? "Future companion" : "First companion"}</small>
                  </span>
                  {locked ? <LockKey size={17} weight="bold" /> : <ArrowRight size={18} weight="bold" />}
                </button>
              );
            })}
          </div>
          <div>
            {futureFeatureSlots.map(([label, text]) => (
              <article key={label}>
                <strong>{label}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
      <a className="floating-compass" href="#top" aria-label="Back to top">
        <Compass size={22} weight="duotone" />
        <Sparkle size={11} weight="fill" />
      </a>
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Brand />
        <p>A brave companion. A story to keep. Values children can practice.</p>
      </div>
      <nav aria-label="Footer">
        {navItems.slice(0, 5).map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
      </nav>
      <div className="footer-note" aria-label="Maitri launch note">
        <span>First box in development</span>
        <strong>Join the early list for Manu story and launch updates.</strong>
      </div>
    </footer>
  );
}

export function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  const isCompanionPage =
    path === "/companions" ||
    path === "/characters" ||
    path.endsWith("/companions.html") ||
    path.endsWith("/characters.html");
  const isStoryUniversePage = path === "/story-universe" || path.endsWith("/story-universe.html");

  if (isCompanionPage) {
    return <CharacterPage />;
  }

  if (isStoryUniversePage) {
    return (
      <Suspense
        fallback={
          <main className="maitri-page">
            <section
              className="section-shell"
              style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}
            >
              Opening Story World...
            </section>
          </main>
        }
      >
        <StoryUniversePage />
      </Suspense>
    );
  }

  return (
    <main className="maitri-page">
      <Hero />
      <Manu />
      <FirstBox />
      <Circle />
      <Schools />
      <Waitlist />
      <Footer />
      <a className="floating-compass" href="#top" aria-label="Back to top">
        <Compass size={22} weight="duotone" />
        <Sparkle size={11} weight="fill" />
      </a>
    </main>
  );
}
