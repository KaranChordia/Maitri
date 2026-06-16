import { useState } from "react";
import {
  ArrowRight,
  Backpack,
  BookBookmark,
  BookOpenText,
  CalendarDots,
  ChalkboardTeacher,
  Compass,
  FacebookLogo,
  FlowerLotus,
  Gift,
  GraduationCap,
  Heart,
  InstagramLogo,
  Lightbulb,
  List,
  LockKey,
  NotePencil,
  Plant,
  SealCheck,
  ShieldCheck,
  Sparkle,
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
  ["Our Story", "#story"],
  ["Universe", "#universe"],
  ["Meet Manu", "#manu"],
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
