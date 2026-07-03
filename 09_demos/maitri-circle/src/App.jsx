import { lazy, Suspense, useEffect, useState } from "react";
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
};

const navItems = [
  ["Meet Manu", publicPath("#manu")],
  ["First Box", publicPath("#first-box")],
  ["For Families", publicPath("#circle")],
  ["Manu Page", publicPath("characters.html")],
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
    role: "Launch character",
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
  kalpana: {
    name: "Kalpana",
    initials: "KC",
    role: "Future STEM friend",
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

const characterOrder = ["manu", "kalpana", "mary"];

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
  ["Sticker pages", "Characters, objects, values, and decorative motifs.", Star],
];

const futureFeatureSlots = [
  ["Story", "a warm child-facing arc"],
  ["Values", "one clear life skill"],
  ["Play", "activities children can repeat"],
  ["Parents", "conversation prompts"],
  ["Shelf", "a growing circle of friends"],
];

const characterDashboardModes = [
  ["storybook", "Storybook", BookOpenText],
  ["talk", "Courage Prompts", Heart],
  ["accessories", "Future Add-ons", Gift],
  ["activities", "Activities", PaintBrush],
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
    image: shwetikaAssets.manuAtGhats,
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
    image: shwetikaAssets.manuOnHorse,
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
    image: shwetikaAssets.manuDoll,
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
    image: generatedAssets.universeMap,
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
          <h1>Meet Manu, Maitri's first brave friend.</h1>
          <p>
            Maitri is a story-first Indian companion doll brand beginning with
            Manu: a child-facing courage story, a premium doll in development,
            and a first box designed for meaningful family play.
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
          <ArrowButton href={publicPath("characters.html")}>Open Manu's Story</ArrowButton>
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
    { id: "mary", ...characterLibrary["Mary Kom"] || {
      name: "Mary Kom", role: "Future athlete friend", tone: "amber",
      initials: "MK",
      tagline: "A fighter who learned that true strength starts from within."
    }}
  ];

  return (
    <div className="character-selector-fullscreen">
      <div className="character-selector-grid">
        {characters.map(char => {
          if (!char.name) return null;
          return (
            <div 
              key={char.id} 
              className={`character-selector-card ${char.tone}`}
              onClick={() => onSelect(char.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(char.id);
                }
              }}
            >
              {char.image ? (
                <img src={char.image} alt={char.name} className="selector-character-img" />
              ) : (
                <div className="selector-placeholder-img">
                  <span>{char.initials}</span>
                </div>
              )}
              <div className="selector-card-bg"></div>
              <div className="selector-card-content">
                <h2>{char.name}</h2>
                <p>{char.tagline}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

function CharacterDashboard({ selectedId, onBack }) {
  const [activeFeature, setActiveFeature] = useState("storybook");
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  
  const character = characterLibrary[selectedId];
  const displayCharacter = character || {
      name: "Mary Kom", role: "Future athlete friend", tone: "amber",
      initials: "MK",
      tagline: "A fighter who learned that true strength starts from within."
  };

  const isManu = selectedId === "manu";

  // For manu dashboard
  const activeStoryPreview = activeStoryIndex === null ? null : manuStorybookPreviews[activeStoryIndex];
  const heroStops = manuAdventureStops.slice(0, 4);

  return (
    <div className="character-dashboard-layout">
      <aside className="dashboard-sidebar">
        <button className="dashboard-back-btn" onClick={onBack}>
          <ArrowLeft size={18} weight="bold" />
          <span>Back to Characters</span>
        </button>
        <div className="dashboard-character-info">
          <div className="dashboard-avatar">
            {displayCharacter.image ? <img src={displayCharacter.image} alt={displayCharacter.name} /> : <span>{displayCharacter.initials}</span>}
          </div>
          <h2>{displayCharacter.name}</h2>
          <span className="dashboard-role">{displayCharacter.role}</span>
        </div>
        
        <nav className="dashboard-nav">
          {characterDashboardModes.map(([id, label, Icon]) => (
            <button 
              key={id}
              className={`dashboard-nav-item ${activeFeature === id ? "active" : ""}`}
              onClick={() => setActiveFeature(id)}
            >
              <Icon size={20} weight="duotone" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="dashboard-content">
        {!isManu ? (
          <div className="dashboard-placeholder">
            <LockKey size={48} weight="duotone" />
            <h2>{displayCharacter.name} is a future friend.</h2>
            <p>Her story, doll, and activity rituals will follow after Manu finds her first families.</p>
          </div>
        ) : (
          <div className="dashboard-panel-container">
            {activeFeature === "storybook" && (
              <div className="dashboard-panel storybook-panel">
                <div className="dashboard-panel-head">
                  <BookOpenText size={30} weight="duotone" />
                  <div>
                    <span>Book one preview</span>
                    <h3>Manu: The Horse Nobody Could Ride</h3>
                    <p>An early 32-page first-box story plan: 22 story pages, 2 pages from Manu, 6 activity pages, and 2 sticker pages.</p>
                  </div>
                </div>
                <div className="storybook-preview-grid">
                  {manuStorybookPreviews.map((preview, index) => (
                    <button
                      className={activeStoryIndex === index ? "active" : ""}
                      key={preview.pages}
                      onClick={() => setActiveStoryIndex(index)}
                    >
                      <span className="storybook-thumb">
                        <img src={preview.image} alt="" />
                      </span>
                      <span>{preview.pages}</span>
                      <h4>{preview.title}</h4>
                      <p>{preview.text}</p>
                    </button>
                  ))}
                </div>
                {activeStoryPreview && (
                  <div className="storybook-immersive-overlay">
                    <div className="storybook-immersive-backdrop" onClick={() => setActiveStoryIndex(null)}></div>
                    <div className="storybook-immersive-modal">
                      <button className="storybook-close-btn" onClick={() => setActiveStoryIndex(null)}>
                        <X size={24} weight="bold" />
                      </button>
                      <div className="storybook-spread">
                        <div className="storybook-page storybook-left-page">
                          <img src={activeStoryPreview.image} alt="" className="storybook-full-image" />
                        </div>
                        <div className="storybook-page storybook-right-page">
                          <span className="storybook-tag">Preview reader</span>
                          <h2>{activeStoryPreview.title}</h2>
                          <h4>{activeStoryPreview.takeaway}</h4>
                          <div className="storybook-text-content">
                            {activeStoryPreview.reader.map(([page, title, text]) => (
                              <article key={`${activeStoryPreview.pages}-${page}`}>
                                <strong>{page}</strong>
                                <h5>{title}</h5>
                                <p>{text}</p>
                              </article>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeFeature === "talk" && (
              <div className="dashboard-panel talk-panel">
                <div className="dashboard-panel-head">
                  <Heart size={30} weight="duotone" />
                  <div>
                    <span>Future possibility</span>
                    <h3>Courage prompts with Manu</h3>
                    <p>A guided prompt format where children can explore brave questions with a grown-up nearby.</p>
                  </div>
                </div>
                <div className="talk-preview">
                  <div>
                    {manuTalkPrompts.map((prompt) => (
                      <button type="button" key={prompt}>{prompt}</button>
                    ))}
                  </div>
                  <blockquote>
                    I felt scared too. A brave step does not have to be loud. Try one kind step, then tell someone you trust what happened.
                  </blockquote>
                </div>
              </div>
            )}
            
            {activeFeature === "accessories" && (
              <div className="dashboard-panel accessories-panel">
                <div className="dashboard-panel-head">
                  <Gift size={30} weight="duotone" />
                  <div>
                    <span>Future add-on direction</span>
                    <h3>Accessories that belong to the story.</h3>
                    <p>Add-ons should feel earned from Manu's world, not random merchandise.</p>
                  </div>
                </div>
                <div className="accessory-preview-grid">
                  {manuAccessoryPreviews.map(([label, text, Icon]) => (
                    <article key={label}>
                      <Icon size={28} weight="duotone" />
                      <h4>{label}</h4>
                      <p>{text}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
            
            {activeFeature === "activities" && (
              <div className="dashboard-panel activities-panel">
                <div className="dashboard-panel-head">
                  <PaintBrush size={30} weight="duotone" />
                  <div>
                    <span>Repeat play</span>
                    <h3>Activities that turn the story into practice.</h3>
                    <p>Manu's first experience can keep children returning through choices, stickers, drawing prompts, and family conversations.</p>
                  </div>
                </div>
                <div className="manu-investor-grid">
                  {heroStops.map((stop) => {
                    const StopIcon = stop.icon;
                    return (
                      <article className={`investor-story-card ${stop.tone}`} key={stop.id}>
                        <StopIcon size={28} weight="duotone" />
                        <span>{stop.label}</span>
                        <h3>{stop.title}</h3>
                        <p>{stop.lesson}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
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
              Meet Maitri's first friend through story, play, family prompts,
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
                <span>See future friends</span>
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
                  aria-label={locked ? `${item.name} future preview` : `${item.name} launch character`}
                  key={id}
                  onClick={() => selectCharacter(id)}
                >
                  <CharacterVisual character={item} compact />
                  <span>
                    <strong>{item.name}</strong>
                    <small>{locked ? "Future direction" : "Launch character"}</small>
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
        <p>A brave friend. A story to keep. Values children can practice.</p>
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
  const isCharacterPage = path === "/characters" || path.endsWith("/characters.html");
  const isStoryUniversePage = path === "/story-universe" || path.endsWith("/story-universe.html");

  if (isCharacterPage) {
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
