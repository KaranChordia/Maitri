import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpenText,
  CalendarDots,
  Crown,
  FlowerLotus,
  Gift,
  Heart,
  Lightbulb,
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
  maitriCircleHero: publicPath("assets/generated/optimized/maitri-circle-hero.jpg"),
  manuPortrait: publicPath("assets/generated/optimized/manu-portrait.jpg"),
  savitribaiCutout: publicPath("assets/generated/optimized/savitribai-companion-cutout.png"),
  kalpanaCutout: publicPath("assets/generated/optimized/kalpana-companion-cutout.png"),
  universeMap: publicPath("assets/generated/optimized/universe-map.jpg"),
  circle: publicPath("assets/generated/optimized/circle-gathering.jpg"),
  girlsReading: publicPath("assets/generated/optimized/girls-reading-together.jpg"),
  portal: publicPath("assets/generated/optimized/waitlist-portal.jpg"),
};

// Keep the existing artwork intact in the repository while the founder selects its replacement.
const SHOW_MAITRI_LOGO = true;

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

const ENABLE_ABOUT_PAGE = false;

const navItems = [
  ["Home", publicPath("#top")],
  ["Companions", publicPath("characters.html")],
  ...(ENABLE_ABOUT_PAGE ? [["About Us", publicPath("about.html")]] : []),
];

const brandAssets = {
  // Logo-only: Flowing pages (23.svg). Do not reuse as a decorative motif.
  mark: publicPath("assets/brand/icons/svg/23.svg"),
  motifs: {
    layeredOrbit: publicPath("assets/brand/icons/svg/18.svg"),
    quietPetals: publicPath("assets/brand/icons/svg/19.svg"),
    storyBloom: publicPath("assets/brand/icons/svg/20.svg"),
    gentleBridge: publicPath("assets/brand/icons/svg/21.svg"),
    openHeart: publicPath("assets/brand/icons/svg/22.svg"),
    storySpark: publicPath("assets/brand/icons/svg/24.svg"),
    softSun: publicPath("assets/brand/icons/svg/25.svg"),
    friendshipClover: publicPath("assets/brand/icons/svg/26.svg"),
    steadySteps: publicPath("assets/brand/icons/svg/27.svg"),
    courageRipple: publicPath("assets/brand/icons/svg/28.svg"),
    growingCircle: publicPath("assets/brand/icons/svg/29.svg"),
  },
};

const brandPillars = [
  {
    motif: "friendshipClover",
    label: "Friendship",
    text: "The friends children choose during play become part of the stories they tell about themselves.",
    tone: "rose",
  },
  {
    motif: "storyBloom",
    label: "Stories",
    text: "Every Maitri friend has her own personality, dreams, family, strengths, and adventures.",
    tone: "amber",
  },
  {
    motif: "storySpark",
    label: "Imagination",
    text: "Through play and storytelling, children discover new places, cultures, and inspiring role models.",
    tone: "teal",
  },
  {
    motif: "layeredOrbit",
    label: "Values",
    text: "Timeless values stay with children long after childhood.",
    tone: "violet",
  },
];

const homepageLibraryBooks = [
  {
    id: "horse",
    title: "Manu: The Horse Nobody Could Ride",
    character: "Manu",
    tone: "violet",
    image: shwetikaAssets.horseRace,
    premise: "Before Manu changed history, she learned to be brave one small step at a time.",
  },
  {
    id: "festival",
    title: "Manu and the River Festival",
    character: "Manu",
    tone: "teal",
    image: shwetikaAssets.manuAtGhats,
    premise: "A festival day becomes a lesson in helping without needing attention.",
  },
  {
    id: "sunrise",
    title: "The Promise at Sunrise",
    character: "Manu",
    tone: "amber",
    image: shwetikaAssets.storyOneChance,
    premise: "Manu makes a promise to try again even when the first answer is no.",
  },
];

const homepageCompanions = [
  {
    name: "Manu",
    number: "01",
    role: "Courage with kindness",
    world: "Bithoor and the Ganga banks",
    image: shwetikaAssets.manuDoll,
    href: publicPath("manu.html"),
    tone: "rose",
  },
  {
    name: "Savitribai",
    number: "02",
    role: "Learning with courage",
    world: "Pune's first classrooms",
    image: generatedAssets.savitribaiCutout,
    href: publicPath("savitribai.html"),
    tone: "amber",
  },
  {
    name: "Kalpana",
    number: "03",
    role: "Dreaming with persistence",
    world: "Karnal skies and space journeys",
    image: generatedAssets.kalpanaCutout,
    href: publicPath("kalpana.html"),
    tone: "teal",
  },
];

const aboutPrinciples = [
  {
    icon: Heart,
    label: "Friendship before instruction",
    text: "Every Maitri companion should feel like a friend children choose, not a lesson they are given.",
    tone: "rose",
  },
  {
    icon: FlowerLotus,
    label: "India in all its richness",
    text: "Characters, families, places, and traditions are imagined with warmth, specificity, and cultural care.",
    tone: "amber",
  },
  {
    icon: Sparkle,
    label: "Wonder that opens the world",
    text: "Stories begin close to home and invite children toward new questions, places, possibilities, and dreams.",
    tone: "violet",
  },
  {
    icon: Plant,
    label: "Stories that grow with children",
    text: "Books and play are designed to become shared rituals that families can return to as children grow.",
    tone: "teal",
  },
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

const manuLearnCards = [
  ["Asking courage", "Manu asks why when something feels unfair.", Lightbulb, "amber"],
  ["Trying courage", "Manu begins even when the first step feels hard.", ShieldCheck, "teal"],
  ["Kindness courage", "Manu chooses friendship and care before proving herself.", Heart, "rose"],
  ["Quiet courage", "Manu does what is right even when no one is watching.", FlowerLotus, "violet"],
];

const firstBoxContents = [
  ["Doll", "A Manu companion doll for meaningful play.", Gift],
  ["32-page storybook", "The first adventure with Manu and Badal.", BookOpenText],
  ["Letter from Manu", "A warm note that makes Manu feel close.", NotePencil],
  ["Six activities", "Simple prompts for drawing, choosing, and talking.", PaintBrush],
  ["Sticker sheets", "A separate play insert with companion art, objects, values, and decorative motifs.", Star],
];

const manuQuickFacts = [
  {
    label: "Full name",
    value: "Manikarnika",
    note: "Everyone calls her Manu.",
    motif: "courageRipple",
    tone: "rose",
    size: "wide",
  },
  {
    label: "Her story begins",
    value: "Bithoor",
    note: "Beside the Ganga, before her journey became forever linked with Jhansi.",
    motif: "layeredOrbit",
    tone: "teal",
    size: "wide",
  },
  {
    label: "Favourite treat",
    value: "Hot jalebis",
    note: "A warm, playful detail from Manu's character world.",
    motif: "softSun",
    tone: "amber",
    size: "compact",
  },
  {
    label: "She loves",
    value: "Riding horses",
    note: "Especially learning patiently with Badal.",
    motif: "steadySteps",
    tone: "violet",
    size: "compact",
  },
  {
    label: "Birthday",
    value: "19 November",
    note: "A date remembered with her story.",
    motif: "storySpark",
    tone: "rose",
    size: "compact",
  },
];

const manuReadingMotifs = ["openHeart", "friendshipClover", "growingCircle"];
const manuBoxMotifs = [
  "quietPetals",
  "storyBloom",
  "gentleBridge",
  "steadySteps",
  "courageRipple",
];

const manuChildActivities = [
  ["Design your courage crest", "Draw symbols for the qualities you want to carry.", Crown, "amber"],
  ["What would Manu do?", "Pause at a story choice and talk through a brave, kind response.", Lightbulb, "teal"],
  ["Track small brave steps", "Notice one moment of asking, trying, helping, or waiting each day.", CalendarDots, "violet"],
  ["Make a brave promise", "Write or draw one small promise to take beyond the story.", NotePencil, "rose"],
];

const companionPageIds = ["manu", "savitribai", "kalpana"];


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
    title: "Activities and Reflection",
    image: shwetikaAssets.storyActivitiesStickers,
    text: "Crest design, what-would-Manu-do choices, courage tracking, stable play, a maze, and a brave promise.",
    takeaway: "Repeat play carries the value home.",
    reader: [
      ["Page 25", "Design your warrior crest", "Draw a crest that feels like you. Add stickers for the qualities you want to carry: brave, curious, kind, strong, or leader."],
      ["Page 27", "Courage tracker", "For seven days, write or draw one small brave action. It can be asking a question, trying again, saying sorry, or helping someone feel safe."],
      ["Page 30", "My brave promise", "Complete the sentence: I promise to be brave when _____. Add a sticker or drawing beside your promise and share it with a grown-up."],
    ],
  },
];

const manuBookJourney = [
  {
    pages: "Book 1",
    title: "Manu's Big, Brave Heart",
    image: shwetikaAssets.manuWithFather,
    text: "Manu is a curious child who asks why girls should stand aside, learns to ride, and begins discovering courage in everyday choices.",
    takeaway: "Early manuscript direction exists; preview copy in development.",
    reader: [
      ["Opening promise", "Before she was a queen, Manu was a girl like the child reader."],
      ["Core scenes", "Ghats, stables, riding practice, friendship, family love, and one brave question."],
      ["First-box connection", "This story anchors the doll, letter, activities, and stickers in one warm first experience."],
    ],
  },
  {
    pages: "Book 2",
    title: "Manu and the Court of Kings",
    image: shwetikaAssets.manuAtGhats,
    text: "Manu grows older inside a larger court world, learning how to stay herself in rooms shaped by rules, politics, and quiet judgment.",
    takeaway: "Early manuscript direction exists; preview copy in development.",
    reader: [
      ["Emotional question", "How do you belong without shrinking yourself?"],
      ["Story world", "Bithoor, the Peshwa's court, friendships, debates, and listening before leadership."],
      ["Preview note", "This page shares the direction of the journey while the final story wording is still being shaped."],
    ],
  },
  {
    pages: "Book 3",
    title: "Manu Becomes Lakshmibai",
    image: shwetikaAssets.manuOnHorse,
    text: "Manu faces change, leaves familiar places, reaches Jhansi, and begins understanding what a new name and new responsibility can mean.",
    takeaway: "Early manuscript direction exists; sensitive details remain review-led.",
    reader: [
      ["Emotional question", "How does courage help a child move through change?"],
      ["Story world", "The road to Jhansi, the fort, a new name, and early lessons in responsibility."],
      ["Preview note", "This later story should stay gentle, age-aware, and emotionally clear for children."],
    ],
  },
  {
    pages: "Book 4",
    title: "The Rani Who Said No",
    image: shwetikaAssets.storyOneChance,
    text: "A later, more serious arc about responsibility, loss, and standing firm, to be handled with extra care for child readers.",
    takeaway: "Journey preview only; needs careful story and historical review before final detail.",
    reader: [
      ["Preview lane", "A future story about resolve and responsibility."],
      ["Care note", "This arc should stay light at preview stage and be shaped with child emotional safety in mind."],
    ],
  },
  {
    pages: "Book 5",
    title: "Laxmibai Rides",
    image: shwetikaAssets.horseRace,
    text: "A later action-led story direction that should only appear as a high-level journey marker for now.",
    takeaway: "Journey preview only; keep the focus on courage rather than spectacle.",
    reader: [
      ["Preview lane", "A future story about courage under pressure."],
      ["Care note", "The story direction should keep child-safety and emotional care ahead of spectacle."],
    ],
  },
  {
    pages: "Book 6",
    title: "Manu Lives Forever",
    image: shwetikaAssets.storyLetterFromManu,
    text: "The final arc keeps Manu's legacy alive through a modern child who discovers the story and carries its courage forward.",
    takeaway: "Journey preview only; useful as the emotional end-point of the Manu journey.",
    reader: [
      ["Preview lane", "A future bridge between history, family memory, and today's child."],
      ["Care note", "The ending should leave children with living courage, not only a history lesson."],
    ],
  },
];

const kalpanaStorybookPreviews = characterLibrary.kalpana.prompts.map((prompt, index) => ({
  pages: `Preview ${index + 1}`,
  title: prompt.label.replace(/\.$/, ""),
  image: null,
  text: prompt.text,
  takeaway:
    index === 0
      ? "Wonder can become a serious dream."
      : index === 1
        ? "Practice turns curiosity into confidence."
        : "A big dream can still stay humble and human.",
  reader: [
    ["Story seed", prompt.title, prompt.text],
    ["Page direction", "Development note", "Keep this child-facing and focused on curiosity, practice, and persistence."],
  ],
}));

const companionPageContent = {
  manu: {
    id: "manu",
    ...characterLibrary.manu,
    pageTitle: "My name is Manikarnika. You can call me Manu.",
    eyebrow: "Hi, I'm Manu",
    intro:
      "My story begins beside the Ganga in Bithoor, long before I was remembered as Rani Lakshmibai of Jhansi. I love horses, brave questions, and the kind of courage that grows one small step at a time.",
    note: null,
    primaryAction: ["Read Manu's first story", "#first-story"],
    secondaryAction: ["See all companions", publicPath("characters.html")],
    storyPreviews: manuStorybookPreviews,
    bookJourney: manuBookJourney,
    valuesTitle: "Four ways Manu makes courage feel close",
    values: manuLearnCards,
    parentPanelTitle: "Parent-child conversation",
    parentPanelText:
      "Manu helps families talk about asking brave questions, trying once, being kind first, and taking one steady step when something feels hard.",
    firstBox: true,
  },
  savitribai: {
    id: "savitribai",
    ...characterLibrary.savitribai,
    image: generatedAssets.savitribaiCutout,
    pageTitle: "Savitribai: the friend who keeps learning",
    eyebrow: "Maitri Companion",
    intro:
      "Savitribai is a learning-led friend whose story grows around courage, resilience, teaching, and the right of every child to read.",
    note: "Her fuller story world is arriving next in the Maitri Circle.",
    primaryAction: ["Read story previews", "#book-previews"],
    secondaryAction: ["Back to companions", publicPath("characters.html")],
    storyPreviews: savitribaiStorybookPreviews,
    valuesTitle: "A companion for learning courage",
    values: characterLibrary.savitribai.values,
    parentPanelTitle: "Parent-child conversation",
    parentPanelText:
      "Savitribai gives families a warm way to talk about learning, resilience, and continuing gently when others do not understand your dream.",
  },
  kalpana: {
    id: "kalpana",
    ...characterLibrary.kalpana,
    image: generatedAssets.kalpanaCutout,
    pageTitle: "Kalpana: the friend who looked up",
    eyebrow: "Maitri Companion",
    intro:
      "Kalpana brings wonder and curiosity into the circle: questions, practice, persistence, and the courage to keep a dream alive.",
    note: "Her fuller story world is arriving next in the Maitri Circle.",
    primaryAction: ["Read story previews", "#book-previews"],
    secondaryAction: ["Back to companions", publicPath("characters.html")],
    storyPreviews: kalpanaStorybookPreviews,
    valuesTitle: "A companion for wonder and persistence",
    values: characterLibrary.kalpana.values,
    parentPanelTitle: "Parent-child conversation",
    parentPanelText:
      "Kalpana helps families talk about curiosity, science, practice, and how small questions can grow into big dreams.",
  },
};

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
      <img src={brandAssets.mark} alt="" aria-hidden="true" />
      <span className="brand-wordmark">Maitri</span>
    </a>
  );
}

function BrandMotif({ name, className = "" }) {
  return (
    <img
      className={`brand-motif ${className}`}
      src={brandAssets.motifs[name]}
      alt=""
      aria-hidden="true"
    />
  );
}

function ArrowButton({ children, href, variant = "primary", type = "link", disabled = false }) {
  if (type === "button") {
    return (
      <button className={`arrow-button ${variant}`} type="submit" disabled={disabled}>
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

function Header({ waitlistHref = publicPath("#waitlist") }) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") close();
    };
    const closeOutside = (event) => {
      if (event.target instanceof Element && !event.target.closest(".site-header")) {
        close();
      }
    };

    document.body.classList.add("nav-open");
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);

    return () => {
      document.body.classList.remove("nav-open");
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open]);

  return (
    <>
      <button
        className={`nav-scrim${open ? " open" : ""}`}
        type="button"
        tabIndex={open ? 0 : -1}
        aria-hidden={!open}
        aria-label="Close navigation"
        onClick={close}
      />
      <header
        className={`site-header${SHOW_MAITRI_LOGO ? "" : " site-header--logo-hidden"}${
          open ? " site-header--nav-open" : ""
        }`}
      >
        <div className="site-header-bg" />
        {SHOW_MAITRI_LOGO ? (
          <Brand />
        ) : (
          <a className="site-wordmark" href={publicPath("#top")} aria-label="Maitri home">
            Maitri
          </a>
        )}
        <nav
          className={`primary-nav ${open ? "open" : ""}`}
          id="primary-navigation"
          aria-label="Primary"
        >
          <div className="primary-nav-panel">
            <p className="primary-nav-eyebrow">Explore Maitri</p>
            <div className="primary-nav-links">
              {navItems.map(([label, href]) => (
                <a href={href} key={label} onClick={close}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </nav>
        <div className="header-actions">
          <div className="header-utility-pill" aria-label="Quick actions">
            <a className="waitlist-pill" href={waitlistHref}>
              Join Waitlist
            </a>
            <ThemeToggle />
          </div>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section className="hero-section section-shell" id="top">
      <Header />
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="section-label teal-label">A world of unforgettable friendships</span>
          <h1>Every Great Adventure Begins with a Friend.</h1>
          <p>
            Meet Maitri, a world of stories, courage, kindness, and unforgettable friendships.
            Discover beautifully crafted 18-inch companions inspired by the remarkable girls and
            women of India. Each friend has her own story, personality, dreams, and adventures
            that inspire children to imagine boldly, live kindly, and grow with confidence.
          </p>
          <div className="hero-actions">
            <ArrowButton href="#friends">Explore the Companions</ArrowButton>
            <ArrowButton href="#waitlist" variant="outline">Join the Waitlist</ArrowButton>
          </div>
        </div>
        <div className="hero-art" aria-label="Maitri story world illustration">
          <GeneratedArt
            src={generatedAssets.hero}
            className="hero-asset"
            alt="Manu beside The River of Courage, a glowing diya, marigolds, and a river flowing through her story world"
            parallax={9}
            feather
          />
        </div>
      </div>
    </section>
  );
}

function BrandIntroduction() {
  return (
    <section className="brand-introduction section-shell" id="about">
      <div className="brand-introduction-head">
        <span className="section-label rose-label">What is Maitri?</span>
        <h2>Friendship. Stories. Imagination.</h2>
        <p>
          Maitri means friendship. We believe the friends children choose during play
          become part of the stories they tell about themselves. Each Maitri friend has
          her own personality, dreams, family, strengths, and adventures. Through play
          and storytelling, children discover new places, different cultures, inspiring
          role models, and timeless values that stay with them long after childhood.
        </p>
      </div>
      <div className="brand-pillar-grid">
        <svg className="pillar-constellation" viewBox="0 0 1200 250" preserveAspectRatio="none" aria-hidden="true">
          <path d="M35 118 C160 28 266 40 340 124 S545 218 635 113 S832 12 904 119 S1080 202 1170 82" />
        </svg>
        {brandPillars.map(({ motif, label, text, tone }, index) => (
          <article className={`brand-pillar-card ${tone}`} key={label}>
            <small className="pillar-index">0{index + 1}</small>
            <span><BrandMotif name={motif} /></span>
            <h3>{label}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhatWeDo() {
  return (
    <section className="what-we-do-section section-shell" id="stories">
      <div className="stories-editorial-layout">
        <div className="section-copy stories-editorial-copy">
          <span className="section-label amber-label">Stories You'll Read Together</span>
          <h2>Every Companion Comes With Her Own Book Series.</h2>
          <p>
            Every Maitri character is brought to life through beautifully illustrated
            chapter books written especially for young readers. These stories follow
            each girl's adventures, friendships, triumphs, and challenges, inviting
            children to laugh, wonder, and grow alongside their favourite character.
            Whether inspired by history or imagination, every story encourages courage,
            empathy, curiosity, and resilience.
          </p>
          <ArrowButton href={publicPath("story-universe.html")} variant="outline">
            Explore the Library
          </ArrowButton>
        </div>
        <div className="stories-reading-experience">
          <figure className="stories-reading-scene">
            <img
              src={generatedAssets.girlsReading}
              alt="Three girls sharing a beautifully illustrated book in a warm Maitri reading nook"
            />
            <span aria-hidden="true"><BrandMotif name="openHeart" /></span>
          </figure>
          <div className="storybook-collection" aria-label="Three stories in the Maitri library">
            <span className="storybook-collection-kicker">Maitri Story Library</span>
            <ol className="storybook-collection-list">
              {homepageLibraryBooks.map(({ id, title, character, tone, image, premise }, index) => (
                <li className={`storybook-volume ${tone}`} key={id}>
                  <a
                    className="storybook-book"
                    href={publicPath("story-universe.html")}
                    aria-label={`Explore ${title} in the Story Library`}
                  >
                    <span className="storybook-book-spine" aria-hidden="true" />
                    <span className="storybook-book-image" aria-hidden="true">
                      <img src={image} alt="" />
                    </span>
                    <span className="storybook-book-copy">
                      <span className="storybook-book-meta">Book {index + 1} · {character}</span>
                      <strong>{title}</strong>
                      <small>{premise}</small>
                      <span className="storybook-book-action">Open the story <ArrowRight size={15} weight="bold" /></span>
                    </span>
                    <span className="storybook-book-pages" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExploreMaitri() {
  return (
    <section className="explore-maitri-section section-shell" id="friends">
      <div className="explore-maitri-head">
        <div>
          <span className="section-label teal-label">Meet the Companions</span>
          <h2>Every Companion Has Her Own Story.</h2>
          <div className="hero-actions">
            <ArrowButton href={publicPath("characters.html")}>Explore All Companions</ArrowButton>
          </div>
        </div>
        <p>
          No two Maitri companions are alike. Some dream of becoming scientists. Some
          become leaders. Some make history. Some simply remind us that kindness can
          change the world. Each character invites children into a different corner
          of India, its cultures, traditions, landscapes, and stories.
        </p>
      </div>
      <div className="home-companion-constellation" aria-label="A preview of the Maitri companions">
        <svg
          className="home-companion-path"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M72 195 C224 55 376 74 492 178 S760 292 882 150 S1061 70 1142 128" />
        </svg>
        {homepageCompanions.map(({ name, number, role, world, image, href, tone }) => (
          <a className={`home-companion ${tone}`} href={href} key={name}>
            <figure>
              <img src={image} alt={`${name}, a Maitri companion`} />
            </figure>
            <div className="home-companion-copy">
              <span>Maitri Companion {number}</span>
              <h3>{name}</h3>
              <strong>{role}</strong>
              <small>{world}</small>
              <em>Meet {name} <ArrowRight size={16} weight="bold" /></em>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Waitlist() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
  });
  const [status, setStatus] = useState("idle");

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus("idle");
  };

  const submitWaitlist = async (event) => {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name) {
      setStatus("missing-name");
      return;
    }

    if (!validEmail) {
      setStatus("missing-email");
      return;
    }

    const entry = {
      name,
      email: email.toLowerCase(),
      website: form.website,
      source: window.location.pathname,
      createdAt: new Date().toISOString(),
    };
    setStatus("submitting");

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 15000);
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.ok !== true) {
        setStatus(response.status === 503 ? "unconfigured" : "error");
        return;
      }

      saveWaitlistEntry(entry);
      setForm({ name: "", email: "", website: "" });
      setStatus("joined");
    } catch {
      setStatus("error");
    }
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
        <span className="waitlist-brand-motif" aria-hidden="true">
          <BrandMotif name="softSun" />
        </span>
      </div>
      <div className="waitlist-copy">
        <span className="section-label violet-label">Be Among the First</span>
        <h2>Our First Collection is Almost Here.</h2>
        <p>
          The very first Maitri dolls are arriving soon. Join our waitlist to
          receive launch updates, behind-the-scenes previews, early access to
          pre-orders, and news about upcoming books and characters.
        </p>
      </div>
      <form
        className="waitlist-form"
        onSubmit={submitWaitlist}
        aria-busy={status === "submitting"}
        noValidate
      >
        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            autoComplete="name"
            maxLength={120}
            required
          />
        </label>
        <label>
          <span>Email address</span>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-describedby="waitlist-note"
            autoComplete="email"
            maxLength={200}
            required
          />
        </label>
        <label className="waitlist-honeypot" aria-hidden="true">
          <span>Website</span>
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={(event) => updateField("website", event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
        <ArrowButton type="button" disabled={status === "submitting"}>
          {status === "submitting" ? "Joining…" : "Join Waitlist"}
        </ArrowButton>
        <p className={`form-status ${status}`} id="waitlist-note" aria-live="polite">
          <LockKey size={15} weight="fill" />
          {status === "joined"
            ? "You are on the Maitri Circle early list. We have saved your details."
            : status === "missing-name"
              ? "Please enter your name to join the waitlist."
              : status === "missing-email"
                ? "Enter a valid email address to join the waitlist."
                : status === "submitting"
                  ? "Saving your place in the Maitri Circle…"
                  : status === "unconfigured"
                    ? "The waitlist is being connected. Please try again shortly."
                  : status === "error"
                      ? "We could not save your details just now. Please try again."
                      : "No payment here. Just launch updates, early access, and news about Maitri books and characters."}
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

function usePageMetadata(title, description) {
  useEffect(() => {
    if (!title || typeof document === "undefined") return;

    document.title = title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag && description) {
      descriptionTag.setAttribute("content", description);
    }
  }, [title, description]);
}

function StoryThumb({ preview, character }) {
  if (preview.image) {
    return (
      <span className="storybook-thumb">
        <img src={preview.image} alt="" />
      </span>
    );
  }

  return (
    <span className={`storybook-thumb placeholder ${character.tone}`}>
      <CharacterVisual character={character} compact />
    </span>
  );
}

function StoryPreviewSection({ character, previews, title, intro, sectionId = "book-previews" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePreview = previews[activeIndex] || previews[0];
  const isManuStory = character.id === "manu";

  if (!activePreview) return null;

  return (
    <section className="companion-story-experience" id={sectionId}>
      <div className="story-panel-head">
        {isManuStory ? (
          <BrandMotif name="storyBloom" className="manu-section-motif" />
        ) : (
          <BookOpenText size={34} weight="duotone" />
        )}
        <div>
          <span>{isManuStory ? "Manu's first story" : "Story preview"}</span>
          <h3>{title}</h3>
          <p>{intro}</p>
        </div>
      </div>
      <div className="storybook-preview-grid">
        {previews.map((preview, index) => (
          <button
            className={activeIndex === index ? "active" : ""}
            key={`${character.id}-${preview.pages}-${preview.title}`}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <StoryThumb preview={preview} character={character} />
            <span>{preview.pages}</span>
            <h4>{preview.title}</h4>
            <p>{preview.text}</p>
            <strong>{preview.takeaway}</strong>
          </button>
        ))}
      </div>
      <div className="storybook-reader">
        <div className={`storybook-reader-cover ${activePreview.image ? "" : "placeholder"}`}>
          {activePreview.image ? (
            <img src={activePreview.image} alt="" />
          ) : (
            <CharacterVisual character={character} />
          )}
          <span>{activePreview.pages}</span>
          <h4>{activePreview.title}</h4>
        </div>
        <div className="storybook-reader-pages">
          <span>{isManuStory ? "Read together" : character.note || "Story preview"}</span>
          <h4>{activePreview.takeaway}</h4>
          {activePreview.reader.map(([page, heading, text]) => (
            <article key={`${activePreview.title}-${page}-${heading}`}>
              <strong>{page}</strong>
              <h5>{heading}</h5>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanionHubPage() {
  usePageMetadata(
    "Meet Manu and the Maitri Companions",
    "Begin with Manu, Maitri's first brave story friend, and discover the circle of stories growing around her.",
  );

  return (
    <main className="maitri-page character-world-page companion-public-page companion-hub-page">
      <section className="character-world-shell section-shell" id="top">
        <Header />
        <section className="entry-selection">
          <div className="companion-hub-hero">
            <div className="companion-section-head">
              <span>Maitri Companions</span>
              <h1>Every Maitri journey begins with Manu.</h1>
              <p>
                She is a curious, kind friend with a big question in her heart.
                Read her first story, play through small brave moments, and let
                courage feel close to everyday childhood.
              </p>
              <ArrowButton href={publicPath("manu.html")}>Meet Manu</ArrowButton>
            </div>
            <div className="companion-hub-hero-art" aria-label="The Maitri companion circle">
              <GeneratedArt
                src={generatedAssets.maitriCircleHero}
                className="companion-circle-asset"
                alt="Children and families sharing stories with Maitri companions"
                parallax={7}
              />
              <span className="companion-art-orbit orbit-one" aria-hidden="true" />
              <span className="companion-art-orbit orbit-two" aria-hidden="true" />
            </div>
          </div>
          <div className="character-picker-grid" aria-label="Maitri companion pages">
            {companionPageIds.map((id) => {
              const character = companionPageContent[id];
              const href = publicPath(`${id}.html`);
              return (
                <a className={`character-picker-card ${character.tone}`} href={href} key={id}>
                  <span className="character-picker-frame">
                    <CharacterVisual character={character} compact />
                  </span>
                  <span>{id === "manu" ? "Start here" : "A friend for the circle"}</span>
                  <strong>{character.name}</strong>
                  <small>
                    {id === "manu"
                      ? "A first story of brave questions, patient friendship, and trying one small step."
                      : "A new story friend is waiting in the wider Maitri Circle."}
                  </small>
                  <em>{id === "manu" ? "Read Manu's story" : "Meet this friend"}</em>
                </a>
              );
            })}
          </div>
          <p className="companion-hub-closing">
            Manu comes first. More friends will join with their own stories,
            questions, and ways to make growing up feel a little more possible.
          </p>
        </section>
      </section>
      <Waitlist />
      <Footer />
    </main>
  );
}

function CompanionDetailPage({ characterId }) {
  const character = companionPageContent[characterId] || companionPageContent.manu;
  const valueCards = character.values || [];
  const isManu = character.id === "manu";

  usePageMetadata(
    `${character.name} - Maitri Dolls`,
    `${character.name} in the Maitri companion universe: ${character.tagline}`,
  );

  return (
    <main
      className={`maitri-page character-world-page companion-public-page companion-detail-page ${
        isManu ? "manu-detail-page" : ""
      }`}
    >
      <section className="character-world-shell section-shell" id="top">
        <Header waitlistHref="#waitlist" />
        <section className="selected-character-showcase character-page-hero" aria-labelledby={`${character.id}-title`}>
          <div className={`selected-character-portrait ${character.image ? "" : "placeholder"}`}>
            <span className="companion-portrait-orbit orbit-one" aria-hidden="true" />
            <span className="companion-portrait-orbit orbit-two" aria-hidden="true" />
            <span className="selected-character-frame">
              <CharacterVisual character={character} />
            </span>
          </div>
          <div className="selected-character-copy">
            <span>{character.eyebrow}</span>
            <h1 id={`${character.id}-title`}>{character.pageTitle}</h1>
            <p>{character.intro}</p>
            {character.note && (
              <div className="companion-note">
                <Sparkle size={18} weight="fill" />
                <span>{character.note}</span>
              </div>
            )}
            <div className="hero-actions">
              <ArrowButton href={character.primaryAction[1]}>{character.primaryAction[0]}</ArrowButton>
              <ArrowButton href={character.secondaryAction[1]} variant="outline">
                {character.secondaryAction[0]}
              </ArrowButton>
            </div>
          </div>
        </section>

        {isManu && (
          <section className="companion-story-box companion-values-section" id="meet-manu">
            <div>
              <span className="panel-label">Meet Manu</span>
              <h2>Get to know your new story companion.</h2>
              <p>
                Before she was remembered as Rani Lakshmibai of Jhansi, she was
                Manikarnika: a curious child whose world included horses, brave
                questions, warm jalebis, and the Ganga at Bithoor.
              </p>
            </div>
            <div className="first-box-river manu-fact-mosaic" aria-label="Get to know Manu">
              {manuQuickFacts.map(({ label, value, note, motif, tone, size }) => (
                <article className={`${tone} ${size}`} key={label}>
                  <BrandMotif name={motif} className="manu-fact-motif" />
                  <span className="manu-fact-label">{label}</span>
                  <strong>{value}</strong>
                  <p>{note}</p>
                </article>
              ))}
            </div>
            <div className="companion-story-grid">
              {valueCards.map(([label, text, Icon, tone]) => (
                <article className={`companion-story-card ${tone}`} key={label}>
                  <Icon size={28} weight="duotone" />
                  <span>{label}</span>
                  <h3>{text}</h3>
                </article>
              ))}
            </div>
          </section>
        )}

        <StoryPreviewSection
          character={character}
          previews={character.storyPreviews}
          title={character.id === "manu" ? "The Horse Nobody Could Ride" : `${character.name} story direction`}
          intro={
            character.id === "manu"
              ? "Follow Manu from one brave question in the courtyard to a patient friendship with Badal."
              : "These preview beats show how the companion page can become a fuller story experience after careful review."
          }
          sectionId={character.id === "manu" ? "first-story" : "book-previews"}
        />

        {isManu && (
          <>
            <section className="manu-parent-moment" aria-labelledby="manu-family-title">
              <div className="manu-parent-moment-copy">
                <span className="panel-label">For reading together</span>
                <h2 id="manu-family-title">A story can make room for a child&apos;s own brave answer.</h2>
                <p>
                  Manu does not have all the answers. She notices, asks, waits,
                  and tries again. That leaves space for children and the adults
                  beside them to talk, draw, wonder, or simply listen together.
                </p>
              </div>
              <div className="manu-parent-prompts" aria-label="Ways to read Manu together">
                <article>
                  <BrandMotif name={manuReadingMotifs[0]} className="manu-reading-motif" />
                  <span>01</span>
                  <p>Pause when Manu faces a hard choice.</p>
                </article>
                <article>
                  <BrandMotif name={manuReadingMotifs[1]} className="manu-reading-motif" />
                  <span>02</span>
                  <p>Ask what a kind next step could be.</p>
                </article>
                <article>
                  <BrandMotif name={manuReadingMotifs[2]} className="manu-reading-motif" />
                  <span>03</span>
                  <p>Let the answer be small, honest, and their own.</p>
                </article>
              </div>
            </section>

            <section className="manu-first-box-detail" id="first-box" aria-labelledby="first-box-title">
              <div className="manu-first-box-intro">
                <span className="panel-label">The first Manu box</span>
                <h2 id="first-box-title">A few story pieces to keep the friendship going.</h2>
                <p>
                  The first Manu box is kept intentionally simple: one friend,
                  one story, and familiar ways to revisit them together.
                </p>
              </div>
              <div className="manu-first-box-list" aria-label="Confirmed first Manu box contents">
                {firstBoxContents.map(([label, text], index) => (
                  <article key={label}>
                    <span className="box-count">0{index + 1}</span>
                    <BrandMotif
                      name={manuBoxMotifs[index]}
                      className="manu-box-motif"
                    />
                    <div>
                      <strong>{label}</strong>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="manu-circle-future" aria-labelledby="circle-future-title">
              <BrandMotif name="growingCircle" className="manu-future-motif" />
              <span className="panel-label">A circle that can grow</span>
              <h2 id="circle-future-title">Manu is the first friend. More stories can follow.</h2>
              <p>
                The Maitri Circle will grow one friendship at a time, always
                beginning with a story a child can make their own.
              </p>
              <ArrowButton href={publicPath("characters.html")} variant="outline">
                Return to the companion circle
              </ArrowButton>
            </section>
          </>
        )}

        {!isManu && (
          <>
            <section className="companion-story-box companion-values-section">
              <div>
                <span className="panel-label">{character.valuesTitle}</span>
                <h2>{character.question}</h2>
                <p>{character.takeaway}</p>
              </div>
              <div className="companion-story-grid">
                {valueCards.map(([label, text, Icon, tone]) => (
                  <article className={`companion-story-card ${tone}`} key={label}>
                    <Icon size={28} weight="duotone" />
                    <span>{label}</span>
                    <h3>{text}</h3>
                  </article>
                ))}
              </div>
            </section>
            <section className="companion-parent-section">
              <article className="companion-parent-panel">
                <span className="panel-label">{character.parentPanelTitle}</span>
                <h2>What this page helps families feel</h2>
                <p>{character.parentPanelText}</p>
              </article>
              <article className="companion-future-panel">
                <span className="panel-label">Next step</span>
                <h2>Bring this story into the Maitri Circle.</h2>
                <p>
                  Join the waitlist for companion updates and the stories
                  growing around Manu and her friends.
                </p>
                <ArrowButton href={publicPath("#waitlist")}>Join Waitlist</ArrowButton>
              </article>
            </section>
          </>
        )}
      </section>
      <Waitlist />
      <Footer />
    </main>
  );
}

function AboutPage() {
  return (
    <main className="maitri-page about-page">
      <section className="about-hero section-shell" id="top">
        <Header waitlistHref="#waitlist" />
        <div className="about-hero-layout">
          <div className="about-hero-copy">
            <span className="section-label rose-label">About Maitri</span>
            <h1>We are building friendships children can grow with.</h1>
            <p>
              Maitri began with a simple belief: the companions children love can
              carry stories, culture, curiosity, and courage into everyday play.
            </p>
            <p>
              We create beautifully crafted friends inspired by remarkable girls and
              women of India. Each companion has her own family, dreams, strengths,
              books, and adventures—made to feel like a friend first, with inspiration
              woven naturally into her story.
            </p>
            <div className="hero-actions">
              <ArrowButton href={publicPath("characters.html")}>Meet the Companions</ArrowButton>
              <ArrowButton href="#our-story" variant="outline">Read Our Story</ArrowButton>
            </div>
          </div>
          <div className="about-hero-art">
            <img
              src={generatedAssets.maitriCircleHero}
              alt="Children and families reading together in the Maitri story world"
            />
            <span className="about-art-note">
              <Heart size={19} weight="fill" />
              Friendship is where every story begins.
            </span>
          </div>
        </div>
      </section>

      <section className="about-origin section-shell" id="our-story">
        <div className="about-origin-heading">
          <span className="section-label teal-label">Why Maitri</span>
          <h2>Stories that feel close to home—and open up the world.</h2>
        </div>
        <div className="about-origin-copy">
          <p>
            Childhood companions often become part of a family’s most remembered
            moments: the stories repeated at bedtime, the questions asked during play,
            and the courage found before a new first step.
          </p>
          <p>
            Maitri brings that bond together with richly imagined Indian characters and
            story worlds. Children meet distinct friends rather than perfect heroes.
            They discover curiosity, kindness, resilience, and confidence through
            adventures that are warm, absorbing, and full of wonder.
          </p>
          <strong>Friendship is the beginning. Story is how it grows.</strong>
        </div>
      </section>

      <section className="about-principles section-shell" aria-labelledby="about-principles-title">
        <div className="about-section-heading">
          <span className="section-label amber-label">What guides us</span>
          <h2 id="about-principles-title">A world made with imagination and care.</h2>
          <p>
            These principles shape every companion, book, and experience Maitri brings
            into a child’s world.
          </p>
        </div>
        <div className="about-principle-path">
          <svg viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true">
            <path d="M35 120 C170 18 260 45 350 133 S558 215 650 112 S842 20 930 130 S1084 205 1170 91" />
          </svg>
          {aboutPrinciples.map(({ icon: Icon, label, text, tone }, index) => (
            <article className={`about-principle ${tone}`} key={label}>
              <small>0{index + 1}</small>
              <span><Icon size={30} weight="duotone" /></span>
              <h3>{label}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-founder section-shell" aria-labelledby="founder-title">
        <div className="founder-portrait-placeholder" role="img" aria-label="Portrait of Shwetika to be added">
          <span>S</span>
          <small>Shwetika’s portrait will be added here</small>
        </div>
        <div className="about-founder-copy">
          <span className="section-label violet-label">The person behind Maitri</span>
          <h2 id="founder-title">Meet Shwetika.</h2>
          <p>
            Shwetika is the founder behind Maitri. This space is reserved for her own
            story—what first inspired the idea, the memories and questions that shaped
            it, and the future she hopes Maitri can create for children and families.
          </p>
          <div className="shwetika-story-placeholder">
            <strong>To be completed with Shwetika</strong>
            <ul>
              <li>Her short personal introduction</li>
              <li>The moment the idea for Maitri began</li>
              <li>Why these companions and stories matter to her</li>
              <li>The world she hopes children will discover through Maitri</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="founder-note section-shell" aria-labelledby="founder-note-title">
        <div>
          <span className="section-label rose-label">A note from Shwetika</span>
          <h2 id="founder-note-title">Her words will complete this story.</h2>
        </div>
        <blockquote>
          “A personal note from Shwetika to children, parents, and families will be
          added here.”
          <cite>Placeholder for Shwetika’s own words</cite>
        </blockquote>
      </section>

      <Waitlist />
      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-branding">
        {SHOW_MAITRI_LOGO ? <Brand /> : null}
        <p className="footer-brand-line">Companions for Girls Who Dream Big.</p>
      </div>
      <div className="footer-navigation">
        <span className="footer-eyebrow">Explore Maitri</span>
        <nav aria-label="Footer navigation">
          {navItems.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
            </a>
          ))}
          <a href={publicPath("#waitlist")}>Waitlist</a>
          <a href={publicPath("content-studio/index.html")}>Content Studio</a>
        </nav>
      </div>
    </footer>
  );
}

function usePremiumPageTransitions() {
  useEffect(() => {
    const root = document.documentElement;
    let navigationTimer;

    const resetTransition = () => root.classList.remove("maitri-page-leaving");
    const followInternalLink = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      const link = target instanceof Element ? target.closest("a[href]") : null;
      if (!link || link.target || link.hasAttribute("download")) return;

      const destination = new URL(link.href, window.location.href);
      const isSameDocument =
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search;

      if (destination.origin !== window.location.origin || isSameDocument) return;

      event.preventDefault();
      root.classList.add("maitri-page-leaving");
      navigationTimer = window.setTimeout(() => {
        window.location.assign(destination.href);
      }, 180);
    };

    document.addEventListener("click", followInternalLink);
    window.addEventListener("pageshow", resetTransition);
    resetTransition();

    return () => {
      document.removeEventListener("click", followInternalLink);
      window.removeEventListener("pageshow", resetTransition);
      window.clearTimeout(navigationTimer);
      resetTransition();
    };
  }, []);
}

export function App() {
  usePremiumPageTransitions();

  const path = window.location.pathname.replace(/\/$/, "");
  const isCompanionPage =
    path === "/companions" ||
    path === "/characters" ||
    path.endsWith("/companions.html") ||
    path.endsWith("/characters.html");
  const companionRoute = companionPageIds.find(
    (id) => path === `/${id}` || path.endsWith(`/${id}`) || path.endsWith(`/${id}.html`),
  );
  const isStoryUniversePage = path === "/story-universe" || path.endsWith("/story-universe.html");
  const isAboutPage = path === "/about" || path.endsWith("/about.html");

  if (isCompanionPage) {
    return <CompanionHubPage />;
  }

  if (companionRoute) {
    return <CompanionDetailPage characterId={companionRoute} />;
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

  if (isAboutPage && ENABLE_ABOUT_PAGE) {
    return <AboutPage />;
  }

  return (
    <main className="maitri-page home-page">
      <Hero />
      <BrandIntroduction />
      <ExploreMaitri />
      <WhatWeDo />
      <Waitlist />
      <Footer />
    </main>
  );
}
