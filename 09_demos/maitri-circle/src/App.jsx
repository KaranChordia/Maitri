import { useState } from "react";
import {
  ArrowRight,
  Backpack,
  BookBookmark,
  BookOpenText,
  CalendarDots,
  ChalkboardTeacher,
  CheckCircle,
  Compass,
  Crown,
  FacebookLogo,
  FlowerLotus,
  Gift,
  GraduationCap,
  Heart,
  InstagramLogo,
  Lightbulb,
  List,
  LockKey,
  Minus,
  NotePencil,
  Package,
  PaintBrush,
  Plant,
  Plus,
  SealCheck,
  ShieldCheck,
  Sparkle,
  Star,
  Tag,
  TShirt,
  UsersThree,
  X,
  YoutubeLogo,
} from "@phosphor-icons/react";

const generatedAssets = {
  hero: "/assets/generated/optimized/hero-scene.jpg",
  universe: "/assets/generated/optimized/universe-map.jpg",
  manu: "/assets/generated/optimized/manu-portrait.jpg",
  circle: "/assets/generated/optimized/circle-gathering.jpg",
  schools: "/assets/generated/optimized/schools-workshop.jpg",
  portal: "/assets/generated/optimized/waitlist-portal.jpg",
};

const navItems = [
  ["Story Universe", "#universe"],
  ["Meet Manu", "#manu"],
  ["Characters", "/characters.html"],
  ["For Parents", "#circle"],
  ["For Schools", "#schools"],
  ["Maitri Circle", "#waitlist"],
];

const heroProof = [
  {
    icon: Heart,
    text: "Built on values that last",
    tone: "rose",
  },
  {
    icon: BookOpenText,
    text: "Stories rooted in India, for today",
    tone: "teal",
  },
  {
    icon: ShieldCheck,
    text: "Parent-trusted, child-loved",
    tone: "violet",
  },
];

const values = [
  ["Courage", ShieldCheck, "teal"],
  ["Kindness", Heart, "rose"],
  ["Curiosity", Lightbulb, "amber"],
  ["Empathy", FlowerLotus, "violet"],
];

const manuKeepsakes = [
  ["Storybook that inspires", BookOpenText, "cyan"],
  ["A journal for big ideas & doodles", NotePencil, "orange"],
  ["Thoughtful little extras", Backpack, "mauve"],
];

const circleBenefits = [
  ["Parent connect and support", UsersThree, "violet"],
  ["Story + activity kits every month", CalendarDots, "teal"],
  ["Early access to new stories & friends", Gift, "amber"],
];

const schoolBenefits = [
  ["Curriculum-aligned story programs", BookBookmark, "cyan"],
  ["Teacher training & resources", ChalkboardTeacher, "blue"],
  ["Social-emotional learning focus", Plant, "green"],
];

const characterModes = [
  ["profile", "Profile", UsersThree],
  ["studio", "Story Studio", BookOpenText],
  ["voice", "Voice & Tone", Heart],
  ["world", "Visual World", Compass],
  ["notes", "Notes", NotePencil],
];

const accessoryAtelier = {
  manu: {
    title: "Manu's Courage Kit",
    subtitle: "Accessories that extend the horse story into play, dressing, and parent-led reflection.",
    bundleLabel: "First adventure bundle",
    bundlePrice: 1699,
    bundle: ["badal", "crest", "cape"],
    note: "Best paired with the Book 1 box: The Horse Nobody Could Ride.",
    accessories: [
      {
        id: "badal",
        name: "Badal Companion Horse",
        price: 1299,
        category: "Play figure",
        icon: Package,
        tone: "teal",
        story: "A small Badal figure with saddle detail for recreating Manu's stable scene.",
        includes: ["Badal figure", "Soft saddle", "Grooming brush"],
      },
      {
        id: "crest",
        name: "Warrior Crest Sticker Pack",
        price: 349,
        category: "Creative add-on",
        icon: PaintBrush,
        tone: "rose",
        story: "Reusable symbols for courage promises, activity pages, and journal covers.",
        includes: ["Crests", "Lotus marks", "Courage words"],
      },
      {
        id: "cape",
        name: "Marigold Cape & Sash",
        price: 799,
        category: "Dress set",
        icon: TShirt,
        tone: "amber",
        story: "A festive cape and sash designed for ceremony, storytelling, and gentle role play.",
        includes: ["Cape", "Sash", "Keepsake card"],
      },
      {
        id: "journal",
        name: "Brave Promise Journal",
        price: 499,
        category: "Reflection",
        icon: NotePencil,
        tone: "violet",
        story: "A guided mini journal for children to record brave moments and questions.",
        includes: ["7 prompts", "Doodle pages", "Parent note"],
      },
    ],
  },
  kalpana: {
    title: "Kalpana's Sky Lab",
    subtitle: "STEM-friendly accessories that keep wonder playful, tactile, and parent-approved.",
    bundleLabel: "Rooftop dreamer bundle",
    bundlePrice: 1499,
    bundle: ["patch", "stars", "notebook"],
    note: "Designed as a later character extension after Manu's first box is validated.",
    accessories: [
      {
        id: "patch",
        name: "Mission Patch Maker",
        price: 599,
        category: "Creative STEM",
        icon: Star,
        tone: "violet",
        story: "Children design a mission patch that turns a dream into a visible goal.",
        includes: ["Patch base", "Space stickers", "Design prompts"],
      },
      {
        id: "stars",
        name: "Rooftop Star Cards",
        price: 449,
        category: "Flash cards",
        icon: Sparkle,
        tone: "teal",
        story: "A compact card set for sky words, questions, and bedtime conversation.",
        includes: ["24 cards", "Parent guide", "Question ring"],
      },
      {
        id: "notebook",
        name: "Flight Sketch Notebook",
        price: 549,
        category: "Journal",
        icon: NotePencil,
        tone: "amber",
        story: "A sketchbook for paper planes, moon maps, and ideas worth trying twice.",
        includes: ["Idea pages", "Wing templates", "Sticker strip"],
      },
      {
        id: "jacket",
        name: "Explorer Jacket Set",
        price: 899,
        category: "Dress set",
        icon: TShirt,
        tone: "green",
        story: "A soft explorer jacket and star scarf for future space-story play.",
        includes: ["Jacket", "Star scarf", "Mission card"],
      },
    ],
  },
  mary: {
    title: "Mary's Practice Pack",
    subtitle: "Movement-led accessories that celebrate effort, care, rhythm, and resilience.",
    bundleLabel: "Seven-day practice bundle",
    bundlePrice: 1399,
    bundle: ["wraps", "tracker", "medal"],
    note: "Keeps the lesson on practice and heart rather than competition alone.",
    accessories: [
      {
        id: "wraps",
        name: "Practice Wraps & Bag",
        price: 699,
        category: "Dress set",
        icon: Backpack,
        tone: "amber",
        story: "Soft wraps and a tiny gear bag for practice scenes and responsibility play.",
        includes: ["Soft wraps", "Mini bag", "Care card"],
      },
      {
        id: "tracker",
        name: "Seven-Day Practice Tracker",
        price: 399,
        category: "Activity",
        icon: CalendarDots,
        tone: "green",
        story: "A small tracker that rewards showing up, trying again, and encouraging others.",
        includes: ["Tracker pad", "Effort stickers", "Parent prompts"],
      },
      {
        id: "medal",
        name: "Heart Medal Set",
        price: 549,
        category: "Keepsake",
        icon: Crown,
        tone: "rose",
        story: "A symbolic medal set for effort, kindness, and focus after a practice challenge.",
        includes: ["3 medals", "Ribbon cards", "Promise card"],
      },
      {
        id: "field",
        name: "Morning Run Play Mat",
        price: 999,
        category: "Play set",
        icon: Package,
        tone: "teal",
        story: "A foldable mini scene for warm-up paths, home support, and daily rhythm.",
        includes: ["Foldable mat", "Path tokens", "Story starter"],
      },
    ],
  },
};

const characterLibrary = {
  manu: {
    name: "Manu",
    initials: "M",
    role: "Anchor character",
    image: generatedAssets.manu,
    tone: "rose",
    tagline: "A curious girl near the Ganga who asks why, learns boldly, and chooses kindness.",
    worldPill: "Bithoor and the Ganga banks",
    origin: "Inspired by Rani Laxmibai of Jhansi",
    question: "What does it mean to do what is right when it is hard?",
    signature: "Badal the horse, a wooden sword, river stones, and a brave question.",
    takeaway: "Courage can begin before you feel ready.",
    world: "Bithoor on the Ganga, palace courtyards, stables, mango trees, and warm dawn light.",
    values: [
      ["Courage", "She takes one step forward even when she feels afraid.", ShieldCheck, "teal"],
      ["Care", "She notices feelings others miss and chooses patience first.", Heart, "rose"],
      ["Curiosity", "She asks why and learns through trying.", Lightbulb, "amber"],
    ],
    traits: ["Brave", "Patient", "Curious", "Kind", "Resilient", "Observant"],
    meta: [
      ["Age in story", "8-10 years"],
      ["Core book", "The Horse Nobody Could Ride"],
      ["In-box role", "First 32-page storybook anchor"],
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
    outputs: {
      parent: "Ask your child: when did you try something even though it felt hard?",
      social: "Before she was a queen, she was a girl who asked why.",
      activity: "Design a courage crest using one symbol for patience and one for bravery.",
    },
    health: [
      ["Story depth", 94],
      ["Parent trust", 88],
      ["Play potential", 91],
    ],
    modules: [
      ["Story draft", "Ready", "Book 1 arc is clear enough for page-by-page drafting."],
      ["Parent prompt", "Ready", "Courage, patience, and fairness prompts are strong."],
      ["Activity page", "In progress", "Needs page format and illustration direction."],
      ["Sticker logic", "In progress", "Decide in-box stickers versus later packs."],
    ],
    tabs: {
      profile: ["Character profile", "Manu is the first Maitri anchor: child-relatable, brave, tender, and story-led."],
      studio: ["Story Studio", "Build short beats, letters, activity prompts, and box-ready story moments from Manu's arc."],
      voice: ["Voice & Tone", "Warm, direct, brave, and simple. Manu should feel like a friend speaking to the child."],
      world: ["Visual World", "River light, stables, marigold, terracotta, cloth, horse textures, and childhood movement."],
      notes: ["Notes", "Keep Book 1 before she becomes queen. Separate history-inspired scenes from verified claims."],
    },
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
    outputs: {
      parent: "Ask your child: what is one question you want to keep exploring?",
      social: "A dream can begin on a rooftop and still reach the stars.",
      activity: "Draw a mission patch for a journey you want to take.",
    },
    health: [
      ["Story depth", 78],
      ["Parent trust", 82],
      ["Play potential", 74],
    ],
    modules: [
      ["Story draft", "Planned", "Needs a focused childhood period before expanding."],
      ["Parent prompt", "Ready", "Strong fit for curiosity and persistence."],
      ["Activity page", "Planned", "Could become STEM/art extension."],
      ["Sticker logic", "Later", "Stars, aircraft, notebooks, and mission patch symbols."],
    ],
    tabs: {
      profile: ["Character profile", "Kalpana can expand Maitri into curiosity, science, and ambition after Manu is stable."],
      studio: ["Story Studio", "Shape wonder-led STEM scenes without making the content feel like a school test."],
      voice: ["Voice & Tone", "Clear, curious, hopeful, precise, and grounded in effort."],
      world: ["Visual World", "Sky blues, notebooks, rooftops, stars, flight diagrams, and warm classroom detail."],
      notes: ["Notes", "Treat as a later character. Do not distract from the Manu first-box launch."],
    },
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
    outputs: {
      parent: "Ask your child: what is one thing that gets better with practice?",
      social: "Before the medal, there was practice. Before practice, there was belief.",
      activity: "Create a seven-day practice tracker for one small skill.",
    },
    health: [
      ["Story depth", 72],
      ["Parent trust", 80],
      ["Play potential", 77],
    ],
    modules: [
      ["Story draft", "Planned", "Needs age-safe framing around sport and resilience."],
      ["Parent prompt", "Ready", "Strong fit for practice and perseverance."],
      ["Activity page", "Planned", "Movement tracker or focus challenge could work well."],
      ["Sticker logic", "Later", "Medals, wraps, shoes, hills, and practice stars."],
    ],
    tabs: {
      profile: ["Character profile", "Mary Kom can extend Maitri into discipline, movement, courage, and community pride."],
      studio: ["Story Studio", "Create practice-led scenes that celebrate effort without glorifying winning alone."],
      voice: ["Voice & Tone", "Strong, warm, direct, encouraging, and never harsh."],
      world: ["Visual World", "Training textures, green hills, morning mist, medals, wraps, and family detail."],
      notes: ["Notes", "Keep the child lesson on effort, resilience, and care instead of conflict or aggression."],
    },
  },
};

const characterOrder = ["manu", "kalpana", "mary"];

function GeneratedArt({ src, className = "", alt = "" }) {
  return (
    <img className={`generated-art ${className}`} src={src} alt={alt} aria-hidden={alt ? undefined : true} />
  );
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Maitri Circle home">
      <span>Maitri</span>
      <i aria-hidden="true">Circle</i>
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
      <Brand />
      <nav className={`primary-nav ${open ? "open" : ""}`} aria-label="Primary">
        {navItems.map(([label, href]) => (
          <a href={href} key={label} onClick={close}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="waitlist-pill" href="#waitlist">
          Join Waitlist
        </a>
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
          <h1>A brave friend for every child.</h1>
          <p>
            Maitri Circle is a story-first companion universe that helps
            children befriend courage, kindness and curiosity through stories
            they love and companions they treasure.
          </p>
          <div className="hero-actions">
            <ArrowButton href="#manu">Meet Manu</ArrowButton>
            <ArrowButton href="#universe" variant="outline">
              Explore the Universe
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
            alt="A Maitri doll sitting beside a river story world and a courage book"
          />
        </div>
      </div>
    </section>
  );
}

function Universe() {
  return (
    <section className="universe-section section-shell wave-top" id="universe">
      <div className="split-grid universe-grid">
        <div className="section-copy">
          <span className="section-label teal-label">Story Universe</span>
          <h2>Where stories come alive and friendships grow.</h2>
          <p>
            From river towns to mountain paths, from busy classrooms to festival
            nights, Maitri's world is full of places, people and stories that
            children can see themselves in.
          </p>
          <ArrowButton href="#waitlist" variant="outline teal">
            Explore the Universe
          </ArrowButton>
          <div className="values-card">
            <strong>Values at the heart of every Maitri story</strong>
            <div>
              {values.map((item) => (
                <IconNote item={item} compact key={item[0]} />
              ))}
            </div>
          </div>
        </div>
        <div className="map-stage">
          <GeneratedArt
            src={generatedAssets.universe}
            className="map-asset"
            alt="A pastel Maitri map with the library, classroom, river town, bazaar and hillside"
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
            src={generatedAssets.manu}
            className="manu-asset"
            alt="Manu, the first Maitri friend, with flowers and story treasures"
          />
        </div>
        <div className="manu-copy">
          <span className="section-label rose-label">Meet Manu</span>
          <h2>Manu is curious. Brave. Kind. And always ready for an adventure.</h2>
          <p>
            She loves asking questions, trying new things and standing up for
            what is right. Manu comes with her storybook, journal and little
            everyday treasures.
          </p>
          <ArrowButton href="#waitlist">Discover Manu</ArrowButton>
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

function Circle() {
  return (
    <section className="circle-section section-shell" id="circle">
      <div className="split-grid circle-grid">
        <div className="section-copy">
          <span className="section-label violet-label">Maitri Circle</span>
          <h2>A community of parents and children, growing together.</h2>
          <p>
            Maitri Circle is a warm, safe space for families to share, learn and
            grow through stories, activities and real conversations.
          </p>
          <ArrowButton href="#waitlist" variant="outline violet">
            Join the Circle
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
            alt="Children and parents seated together in a warm Maitri Circle story gathering"
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
            alt="A teacher reading Maitri stories to children in a classroom"
          />
        </div>
        <div className="section-copy schools-copy">
          <span className="section-label blue-label">For Schools & Workshops</span>
          <h2>Stories that build confident, compassionate learners.</h2>
          <p>
            Our programs blend stories, play and reflection to help children
            build life skills while making learning joyful.
          </p>
          <ArrowButton href="#waitlist" variant="outline blue">
            Partner With Us
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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const submitWaitlist = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setStatus("missing");
      return;
    }
    setStatus("joined");
  };

  return (
    <section className="waitlist-section section-shell" id="waitlist">
      <GeneratedArt
        src={generatedAssets.portal}
        className="footer-portal"
        alt="A small illustrated Maitri story portal beside marigolds"
      />
      <div className="waitlist-copy">
        <h2>Be the first to step into the world of Maitri.</h2>
        <p>
          Join our waitlist for early access to Manu, our stories and special
          surprises.
        </p>
      </div>
      <form className="waitlist-form" onSubmit={submitWaitlist} noValidate>
        <label>
          <span>Email address</span>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setStatus("idle");
            }}
            aria-describedby="waitlist-note"
          />
        </label>
        <ArrowButton type="button">Join Waitlist</ArrowButton>
        <p className={`form-status ${status}`} id="waitlist-note">
          <LockKey size={15} weight="fill" />
          {status === "joined"
            ? "You are on the Maitri Circle preview list."
            : status === "missing"
              ? "Enter an email address to join the waitlist."
              : "We respect your privacy. Unsubscribe anytime."}
        </p>
      </form>
    </section>
  );
}

function CharacterLabHeader() {
  return (
    <header className="site-header character-page-header">
      <Brand />
      <nav className="character-mini-nav" aria-label="Character page">
        <a href="/">Home</a>
        <a href="/#manu">Meet Manu</a>
        <a href="/#waitlist">Join Circle</a>
      </nav>
    </header>
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

function formatRupees(value) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  }).format(value);
}

function AccessoryAtelier({
  atelier,
  character,
  cart,
  selectedAccessoryId,
  checkoutState,
  onSelect,
  onAdd,
  onRemove,
  onBundle,
  onCheckout,
}) {
  const activeAccessory =
    atelier.accessories.find((item) => item.id === selectedAccessoryId) || atelier.accessories[0];
  const selectedItems = atelier.accessories.filter((item) => cart[item.id]);
  const itemCount = selectedItems.reduce((sum, item) => sum + cart[item.id], 0);
  const total = selectedItems.reduce((sum, item) => sum + item.price * cart[item.id], 0);
  const savings = Math.max(0, total - atelier.bundlePrice);
  const ActiveIcon = activeAccessory.icon;

  return (
    <article className={`accessory-atelier ${character.tone}`} aria-label={`${character.name} accessories prototype`}>
      <div className="atelier-head">
        <div>
          <span className="panel-label">Accessory Atelier</span>
          <h3>{atelier.title}</h3>
          <p>{atelier.subtitle}</p>
        </div>
        <button className="bundle-button" type="button" onClick={onBundle}>
          <Sparkle size={17} weight="fill" />
          <span>{atelier.bundleLabel}</span>
          <strong>{formatRupees(atelier.bundlePrice)}</strong>
        </button>
      </div>

      <div className="atelier-grid">
        <section className="accessory-preview" aria-live="polite">
          <div className={`accessory-orbit ${activeAccessory.tone}`}>
            <CharacterVisual character={character} compact />
            <span>
              <ActiveIcon size={38} weight="duotone" />
            </span>
          </div>
          <div className="accessory-preview-copy">
            <span>{activeAccessory.category}</span>
            <h4>{activeAccessory.name}</h4>
            <p>{activeAccessory.story}</p>
            <div className="accessory-includes">
              {activeAccessory.includes.map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
            <button className="add-accessory-button" type="button" onClick={() => onAdd(activeAccessory.id)}>
              <Plus size={16} weight="bold" />
              <span>Add to mock cart</span>
              <strong>{formatRupees(activeAccessory.price)}</strong>
            </button>
          </div>
        </section>

        <section className="accessory-shelf" aria-label={`${character.name} accessory shelf`}>
          {atelier.accessories.map((item) => {
            const Icon = item.icon;
            const active = item.id === activeAccessory.id;
            const quantity = cart[item.id] || 0;
            return (
              <button
                className={`accessory-card ${item.tone} ${active ? "active" : ""}`}
                type="button"
                key={item.id}
                onClick={() => onSelect(item.id)}
              >
                <span className="accessory-card-icon">
                  <Icon size={24} weight="duotone" />
                </span>
                <span className="accessory-card-copy">
                  <strong>{item.name}</strong>
                  <small>{item.category}</small>
                </span>
                <span className="accessory-price">{formatRupees(item.price)}</span>
                {quantity > 0 && <span className="accessory-count">{quantity}</span>}
              </button>
            );
          })}
        </section>

        <aside className="accessory-cart" aria-label="Accessory cart prototype">
          <div className="cart-head">
            <span>
              <Tag size={18} weight="duotone" />
              Prototype cart
            </span>
            <strong>{itemCount} items</strong>
          </div>

          <div className="cart-lines">
            {selectedItems.length === 0 ? (
              <p className="empty-cart">Choose accessories to build a mock order for {character.name}.</p>
            ) : (
              selectedItems.map((item) => (
                <div className="cart-line" key={item.id}>
                  <span>
                    <strong>{item.name}</strong>
                    <small>
                      {cart[item.id]} x {formatRupees(item.price)}
                    </small>
                  </span>
                  <div className="cart-stepper" aria-label={`${item.name} quantity`}>
                    <button type="button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}>
                      <Minus size={14} weight="bold" />
                    </button>
                    <b>{cart[item.id]}</b>
                    <button type="button" onClick={() => onAdd(item.id)} aria-label={`Add ${item.name}`}>
                      <Plus size={14} weight="bold" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cart-total">
            <span>Estimated total</span>
            <strong>{formatRupees(total)}</strong>
            {savings > 0 && <small>Bundle could save {formatRupees(savings)}</small>}
          </div>

          <button className={`mock-checkout ${checkoutState}`} type="button" disabled={!itemCount} onClick={onCheckout}>
            {checkoutState === "reserved" ? <CheckCircle size={18} weight="fill" /> : <Gift size={18} weight="duotone" />}
            <span>{checkoutState === "reserved" ? "Mock order saved" : "Preview purchase"}</span>
          </button>

          <p className="atelier-note">{atelier.note}</p>
        </aside>
      </div>
    </article>
  );
}

function CharacterPage() {
  const [selectedId, setSelectedId] = useState("manu");
  const [mode, setMode] = useState("profile");
  const [promptId, setPromptId] = useState("horse");
  const [pulse, setPulse] = useState(false);
  const [selectedAccessoryByCharacter, setSelectedAccessoryByCharacter] = useState({
    manu: "badal",
    kalpana: "patch",
    mary: "wraps",
  });
  const [accessoryCart, setAccessoryCart] = useState({});
  const [checkoutByCharacter, setCheckoutByCharacter] = useState({});

  const character = characterLibrary[selectedId];
  const atelier = accessoryAtelier[selectedId];
  const activePrompt = character.prompts.find((item) => item.id === promptId) || character.prompts[0];
  const activeMode = character.tabs[mode] || character.tabs.profile;
  const selectedAccessoryId = selectedAccessoryByCharacter[selectedId] || atelier.accessories[0].id;
  const currentCart = accessoryCart[selectedId] || {};
  const checkoutState = checkoutByCharacter[selectedId] || "idle";

  const selectCharacter = (id) => {
    const next = characterLibrary[id];
    setSelectedId(id);
    setMode("profile");
    setPromptId(next.prompts[0].id);
  };

  const selectMode = (nextMode) => {
    setMode(nextMode);
    const preferredPrompt = {
      profile: character.prompts[0],
      studio: character.prompts[0],
      voice: character.prompts[1] || character.prompts[0],
      world: character.prompts[2] || character.prompts[0],
      notes: character.prompts[2] || character.prompts[0],
    }[nextMode];
    setPromptId(preferredPrompt.id);
  };

  const regenerate = () => {
    setPulse(true);
    window.setTimeout(() => setPulse(false), 420);
  };

  const selectAccessory = (id) => {
    setSelectedAccessoryByCharacter((current) => ({
      ...current,
      [selectedId]: id,
    }));
  };

  const markCartChanged = () => {
    setCheckoutByCharacter((current) => ({
      ...current,
      [selectedId]: "idle",
    }));
  };

  const addAccessory = (id) => {
    setAccessoryCart((current) => {
      const characterCart = current[selectedId] || {};
      return {
        ...current,
        [selectedId]: {
          ...characterCart,
          [id]: (characterCart[id] || 0) + 1,
        },
      };
    });
    setSelectedAccessoryByCharacter((current) => ({
      ...current,
      [selectedId]: id,
    }));
    markCartChanged();
  };

  const removeAccessory = (id) => {
    setAccessoryCart((current) => {
      const characterCart = current[selectedId] || {};
      const nextQuantity = (characterCart[id] || 0) - 1;
      const nextCart = { ...characterCart };
      if (nextQuantity > 0) {
        nextCart[id] = nextQuantity;
      } else {
        delete nextCart[id];
      }
      return {
        ...current,
        [selectedId]: nextCart,
      };
    });
    markCartChanged();
  };

  const addBundle = () => {
    setAccessoryCart((current) => {
      const characterCart = current[selectedId] || {};
      const nextCart = { ...characterCart };
      atelier.bundle.forEach((id) => {
        nextCart[id] = Math.max(nextCart[id] || 0, 1);
      });
      return {
        ...current,
        [selectedId]: nextCart,
      };
    });
    setSelectedAccessoryByCharacter((current) => ({
      ...current,
      [selectedId]: atelier.bundle[0],
    }));
    markCartChanged();
  };

  const previewCheckout = () => {
    setCheckoutByCharacter((current) => ({
      ...current,
      [selectedId]: "reserved",
    }));
  };

  return (
    <main className="maitri-page character-lab-page">
      <section className="character-lab-shell section-shell" id="top">
        <CharacterLabHeader />

        <div className="character-lab-hero">
          <div>
            <span className="section-label violet-label">Character Lab</span>
            <h1>Shape every Maitri friend with story, values, and play in one place.</h1>
            <p>
              An interactive story studio for exploring each character's values,
              child-safe prompts, parent conversation hooks, and product readiness.
            </p>
          </div>
          <div className="lab-principle-strip" aria-label="Character lab principles">
            <span>
              <strong>Story</strong>
              <small>first</small>
            </span>
            <span>
              <strong>Parent</strong>
              <small>trusted</small>
            </span>
            <span>
              <strong>Child</strong>
              <small>loved</small>
            </span>
          </div>
        </div>

        <div className="character-lab-grid">
          <aside className="character-library-panel" aria-label="Character selector">
            <div className="panel-kicker">
              <span>Character library</span>
              <strong>{characterOrder.length}</strong>
            </div>
            <div className="character-selector-stack">
              {characterOrder.map((id) => {
                const item = characterLibrary[id];
                const active = id === selectedId;
                return (
                  <button
                    className={`character-selector-card ${active ? "active" : ""}`}
                    type="button"
                    data-character-selector={id}
                    aria-pressed={active}
                    key={id}
                    onClick={() => selectCharacter(id)}
                  >
                    <CharacterVisual character={item} compact />
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.role}</small>
                    </span>
                    <ArrowRight size={18} weight="bold" />
                  </button>
                );
              })}
            </div>
            <div className="library-note">
              <strong>Foundation rule</strong>
              <p>Manu remains the first launch anchor. Other friends stay as future universe previews.</p>
            </div>
          </aside>

          <section className="character-workspace" aria-live="polite">
            <article className={`character-feature ${character.tone}`}>
              <div className="character-feature-copy">
                <span>{character.role}</span>
                <h2>{character.name}</h2>
                <p>{character.tagline}</p>
                <div className="character-feature-metrics" aria-label={`${character.name} story facts`}>
                  {character.meta.map(([label, value]) => (
                    <div key={label}>
                      <small>{label}</small>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </div>
              <div className="character-feature-art">
                <CharacterVisual character={character} />
                <div className="character-world-pill">{character.worldPill}</div>
              </div>
            </article>

            <div className="character-mode-bar" role="tablist" aria-label="Character modes">
              {characterModes.map(([id, label, Icon]) => (
                <button
                  className={mode === id ? "active" : ""}
                  type="button"
                  role="tab"
                  aria-selected={mode === id}
                  key={id}
                  onClick={() => selectMode(id)}
                >
                  <Icon size={18} weight="duotone" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div className="character-detail-grid">
              <article className="character-story-panel">
                <span className="panel-label">{activeMode[0]}</span>
                <h3>{activeMode[1]}</h3>
                <div className="character-meta-grid">
                  <div>
                    <span>Inner question</span>
                    <strong>{character.question}</strong>
                  </div>
                  <div>
                    <span>Signature objects</span>
                    <strong>{character.signature}</strong>
                  </div>
                  <div>
                    <span>Child takeaway</span>
                    <strong>{character.takeaway}</strong>
                  </div>
                  <div>
                    <span>World notes</span>
                    <strong>{character.world}</strong>
                  </div>
                </div>
                <div className="trait-cloud" aria-label={`${character.name} traits`}>
                  {character.traits.map((trait) => (
                    <span key={trait}>{trait}</span>
                  ))}
                </div>
              </article>

              <article className="prompt-studio-panel">
                <div className="prompt-panel-head">
                  <span className="panel-label">Prompt queue</span>
                  <p>Tap a prompt to change the preview output.</p>
                </div>
                <div className="prompt-choice-list">
                  {character.prompts.map((prompt) => (
                    <button
                      className={activePrompt.id === prompt.id ? "active" : ""}
                      type="button"
                      aria-pressed={activePrompt.id === prompt.id}
                      key={prompt.id}
                      onClick={() => setPromptId(prompt.id)}
                    >
                      <BookOpenText size={18} weight="duotone" />
                      <span>{prompt.label}</span>
                    </button>
                  ))}
                </div>
                <div className={`mock-output ${pulse ? "pulse" : ""}`}>
                  <div>
                    <span>Mock story output</span>
                    <button type="button" onClick={regenerate}>
                      Regenerate
                    </button>
                  </div>
                  <h4>{activePrompt.title}</h4>
                  <p>{activePrompt.text}</p>
                </div>
              </article>
            </div>

          </section>

          <aside className="character-readiness-panel" aria-label="Character readiness">
            <article className="character-insight-panel">
              <div className="insight-section">
                <span className="panel-label">Values</span>
                <div className="lab-value-stack">
                  {character.values.map(([label, text, Icon, tone]) => (
                    <div className={`lab-value ${tone}`} key={label}>
                      <Icon size={24} weight="duotone" />
                      <span>
                        <strong>{label}</strong>
                        <small>{text}</small>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="insight-section">
                <span className="panel-label">Readiness</span>
                <div className="health-list">
                  {character.health.map(([label, value]) => (
                    <div className="health-item" key={label}>
                      <div>
                        <span>{label}</span>
                        <strong>{value}%</strong>
                      </div>
                      <i>
                        <b style={{ width: `${value}%` }} />
                      </i>
                    </div>
                  ))}
                </div>
              </div>

              <div className="insight-section">
                <span className="panel-label">Outputs</span>
                <div className="output-stack">
                  <p>
                    <strong>Parent prompt</strong>
                    {character.outputs.parent}
                  </p>
                  <p>
                    <strong>Social snippet</strong>
                    {character.outputs.social}
                  </p>
                  <p>
                    <strong>Activity idea</strong>
                    {character.outputs.activity}
                  </p>
                </div>
              </div>

              <div className="insight-section">
                <span className="panel-label">Process modules</span>
                <div className="module-list">
                  {character.modules.map(([label, status, text]) => (
                    <div key={label}>
                      <span className={status.toLowerCase().replaceAll(" ", "-")}>{status}</span>
                      <strong>{label}</strong>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </aside>

          <AccessoryAtelier
            atelier={atelier}
            character={character}
            cart={currentCart}
            selectedAccessoryId={selectedAccessoryId}
            checkoutState={checkoutState}
            onSelect={selectAccessory}
            onAdd={addAccessory}
            onRemove={removeAccessory}
            onBundle={addBundle}
            onCheckout={previewCheckout}
          />
        </div>
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
        <p>Stories today. Values forever.</p>
      </div>
      <nav aria-label="Footer">
        {navItems.slice(0, 5).map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
      </nav>
      <div className="socials" aria-label="Social links">
        <a href="#top" aria-label="Instagram">
          <InstagramLogo size={21} weight="duotone" />
        </a>
        <a href="#top" aria-label="YouTube">
          <YoutubeLogo size={21} weight="duotone" />
        </a>
        <a href="#top" aria-label="Facebook">
          <FacebookLogo size={21} weight="duotone" />
        </a>
      </div>
    </footer>
  );
}

export function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  const isCharacterPage = path === "/characters" || path.endsWith("/characters.html");

  if (isCharacterPage) {
    return <CharacterPage />;
  }

  return (
    <main className="maitri-page">
      <Hero />
      <Universe />
      <Manu />
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
