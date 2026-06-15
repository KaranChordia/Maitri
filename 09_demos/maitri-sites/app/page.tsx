import { MaitriInteractions } from "./site-interactions";

const valueCards = [
  ["doll-icon", "A friend to hold", "18-inch companion dolls designed for affection, identity, dressing, storytelling, and everyday imaginative play."],
  ["book-icon", "Stories to grow with", "Each character begins in a child-readable story world, so the doll feels like a friend before she becomes a product."],
  ["activity-icon", "Play after reading", "Activities, prompts, and little missions help children turn values into drawings, questions, role-play, and family conversations."],
  ["heart-icon", "Values children feel", "Courage, kindness, curiosity, empathy, and leadership are shown through choices children can understand and try."],
];

const circleCards = [
  ["01", "Story letters", "Receive new chapters, character notes, and simple reading moments to share at home."],
  ["02", "Beta readers", "Help us test storybooks and activities with real children before launch."],
  ["03", "Parent prompts", "Get thoughtful questions that make bravery, kindness, and curiosity easier to talk about."],
  ["04", "Character reveals", "Meet the girls, heroines, places, clothes, and values shaping the Maitri universe."],
];

export default function Home() {
  return (
    <div className="site-shell">
      <header className="floating-nav-wrap" aria-label="Main navigation">
        <div className="floating-nav">
          <a className="brand-mark" href="#top" aria-label="Maitri home">
            <span className="brand-symbol" aria-hidden="true">M</span>
            <span><strong>Maitri</strong><small>Stories today. Values forever.</small></span>
          </a>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              id="themeToggle"
              aria-pressed="false"
              aria-label="Switch color theme"
            >
              <span className="theme-toggle-track">
                <span className="theme-toggle-thumb"></span>
              </span>
            </button>
            <button className="nav-toggle" type="button" aria-expanded="false" aria-controls="siteNav">
              <span></span><span></span><span></span><span className="sr-only">Open navigation</span>
            </button>
          </div>
          <nav className="site-nav" id="siteNav">
            <div className="nav-item">
              <a href="#stories">Universe</a>
              <div className="nav-panel">
                <a href="#stories">Story worlds</a>
                <a href="#manu">Meet Manu</a>
              </div>
            </div>
            <div className="nav-item">
              <a href="#circle">Parents</a>
              <div className="nav-panel">
                <a href="#circle">Maitri Circle</a>
                <a href="#parents">Parent promise</a>
              </div>
            </div>
            <div className="nav-item">
              <a href="#workshops">Schools</a>
              <div className="nav-panel">
                <a href="#workshops">Workshop format</a>
                <a href="#waitlist">Pilot interest</a>
              </div>
            </div>
            <a className="nav-cta" href="#waitlist">Join Waitlist</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero section-grid section-flow" aria-labelledby="heroTitle">
          <div className="hero-copy reveal section-card">
            <h1 id="heroTitle">A brave friend for every child.</h1>
            <p>
              Maitri is a companion doll universe where children meet brave Indian heroines through stories,
              play, activities, and characters they can love like friends.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button primary" href="#waitlist">Join Waitlist <span aria-hidden="true"></span></a>
              <a className="button secondary" href="#manu">Meet Manu <span aria-hidden="true"></span></a>
            </div>
            <div className="hero-note" aria-label="Maitri promise">
              <span>Built on values that last</span>
              <span>Stories rooted in India, for today</span>
              <span>Parent-trusted, child-loved</span>
            </div>
          </div>
          <div className="hero-visual reveal" aria-label="Maitri doll portrait and story landscape">
            <div className="floating-island river-island" aria-hidden="true"><span>River Town</span></div>
            <div className="floating-island library-island" aria-hidden="true"><span>Story Library</span></div>
            <div className="floating-island classroom-island" aria-hidden="true"><span>The Classroom</span></div>
            <div className="arch-frame">
              <img src="/assets/hero-doll-arch.png" alt="Maitri doll in a gold jharokha arch with Indian textile details" />
            </div>
            <div className="story-scroll" aria-hidden="true"><span>Courage</span><span>Curiosity</span><span>Compassion</span></div>
          </div>
        </section>

        <section className="universe section-flow" id="stories" aria-labelledby="storiesTitle">
          <div className="section-heading reveal universe-copy-block">
            <p className="section-label">Story universe</p>
            <h2 id="storiesTitle">Where stories come alive and friendships grow.</h2>
            <p>From river towns to classrooms, courtyards, bazaars, and homes, Maitri gives every character a world children can enter, return to, and make their own.</p>
            <a className="button secondary" href="#waitlist">Explore the Universe <span aria-hidden="true"></span></a>
          </div>
          <div className="universe-layout">
            <div className="story-world-map reveal" aria-label="Maitri story world map">
              <article className="world-place library-place"><span>Story Library</span></article>
              <article className="world-place river-place"><span>River Town</span></article>
              <article className="world-place classroom-place"><span>The Classroom</span></article>
              <article className="world-place bazaar-place"><span>The Bazaar</span></article>
              <article className="world-place hillside-place"><span>The Hillside</span></article>
            </div>
            <div className="value-grid reveal" aria-label="Maitri product pillars">
              {valueCards.map(([icon, title, text]) => (
                <article className="value-card section-card" key={title}>
                  <span className={`value-icon ${icon}`} aria-hidden="true"></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="manu-band section-flow" id="manu" aria-labelledby="manuTitle">
          <div className="manu-portrait reveal" aria-label="Manu companion doll">
            <img src="/assets/doll-sample-1.png" alt="Maitri companion doll in ornate Indian clothing" />
          </div>
          <div className="manu-copy reveal section-card">
            <p className="section-label light">Meet Manu</p>
            <h2 id="manuTitle">Before she was a queen, she was a girl who asked why.</h2>
            <p>Manu is curious, brave, and kind. She loves asking questions, learning new skills, riding with courage, and standing up for what feels right.</p>
            <div className="character-treasures" aria-label="Manu story treasures">
              <span>Storybook</span><span>Journal prompts</span><span>Little everyday treasures</span>
            </div>
            <a className="button pale" href="#waitlist">Discover Manu <span aria-hidden="true"></span></a>
          </div>
          <div className="book-spread reveal" aria-label="Manu storybook preview">
            <img src="/assets/book-spread-manu.png" alt="Open Manu storybook with illustration and chapter page" />
          </div>
        </section>

        <section className="circle section-flow" id="circle" aria-labelledby="circleTitle">
          <div className="circle-copy reveal section-card">
            <p className="section-label">Maitri Circle</p>
            <h2 id="circleTitle">A community of parents and children, growing together.</h2>
            <p>The Maitri Circle is a warm space for early stories, beta reads, parent prompts, classroom pilots, and first access to new characters.</p>
            <a className="button primary" href="#waitlist">Join the Circle <span aria-hidden="true"></span></a>
            <div className="circle-icons" aria-label="Circle benefits">
              <span>Parent connect</span><span>Story activity kits</span><span>Early access</span>
            </div>
          </div>
          <div className="circle-story reveal">
            <div className="circle-cards" aria-label="Community benefits">
              {circleCards.map(([number, title, text]) => (
                <article className="circle-card reveal section-card" key={number}>
                  <span>{number}</span><h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
            <figure className="family-frame">
              <img src="/assets/circle-family-reading.png" alt="Parent reading a Maitri storybook with two children" />
            </figure>
          </div>
        </section>

        <section className="workshops section-flow" id="workshops" aria-labelledby="workshopsTitle">
          <div className="workshop-scene reveal">
            <img src="/assets/workshop-classroom.png" alt="Illustrated classroom workshop with children learning values from a teacher" />
          </div>
          <div className="workshop-copy reveal section-card">
            <p className="section-label">Schools and workshops</p>
            <h2 id="workshopsTitle">Stories that build confident, compassionate learners.</h2>
            <p>Maitri school sessions turn one character story into a joyful 45-60 minute experience with read-alouds, value discussions, worksheets, and take-home prompts.</p>
            <div className="workshop-list"><span>Curriculum-aligned story programs</span><span>Teacher resources</span><span>Social-emotional learning focus</span></div>
            <a className="button primary" href="#waitlist">Partner with us <span aria-hidden="true"></span></a>
          </div>
        </section>

        <section className="validation section-flow" id="parents" aria-labelledby="validationTitle">
          <div className="section-heading reveal">
            <p className="section-label light">For parents</p>
            <h2 id="validationTitle">Made for wonder, guided by care.</h2>
            <p>Maitri is being built with parent trust at the center: age-fit stories, thoughtful character research, safe product choices, inclusive representation, and play that carries meaning beyond the shelf.</p>
          </div>
          <div className="signal-rail" aria-label="Validation signals">
            <span>Age-fit stories</span><span>Inclusive Indian identity</span><span>Safe play choices</span><span>Historically inspired characters</span><span>Parent-child prompts</span><span>Quality materials</span>
          </div>
        </section>

        <section className="waitlist section-flow" id="waitlist" aria-labelledby="waitlistTitle">
          <div className="waitlist-copy reveal section-card">
            <p className="section-label light">Join waitlist</p>
            <h2 id="waitlistTitle">Be the first to step into the world of Maitri.</h2>
            <p>Join for early access to Manu, new stories, parent prompts, school session updates, and special launch invitations.</p>
            <div className="promise-list" aria-label="Waitlist benefits"><span>Early story letters</span><span>Beta reader invitations</span><span>First look at dolls</span></div>
            <img className="peacock-panel" src="/assets/peacock-panel.png" alt="" aria-hidden="true" />
            <div className="waitlist-state" id="waitlistState" aria-live="polite"></div>
          </div>

          <form className="waitlist-form reveal section-card" id="maitriWaitlistForm">
            <div className="form-row">
              <label>Parent / guardian name<input name="name" type="text" autoComplete="name" required /></label>
              <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
            </div>
            <div className="form-row">
              <label>Child age<select name="childAge" required><option value="">Select age range</option><option>5-6</option><option>7-8</option><option>9-10</option><option>11-12</option><option>Gift buyer / educator</option></select></label>
              <label>I am a<select name="segment" required><option value="">Select one</option><option>Parent</option><option>Grandparent or gift buyer</option><option>NRI family</option><option>Educator or school</option><option>Beta reader</option></select></label>
            </div>
            <div className="form-row">
              <label>Story preference<select name="storyPreference" required><option value="">Select one</option><option>Brave adventure</option><option>Friendship and kindness</option><option>History made personal</option><option>Parent-child activities</option></select></label>
              <label>Beta-reader interest<select name="betaReaderInterest" required><option value="">Select one</option><option>Yes, I would like to beta read</option><option>Maybe, tell me more</option><option>Not right now</option></select></label>
            </div>
            <div className="form-row">
              <label>School / educator interest<select name="schoolInterest" required><option value="">Select one</option><option>Yes, for a school or group</option><option>Maybe, if the story fit is right</option><option>Not applicable</option></select></label>
              <label>Launch interest<select name="preorderSignal" required><option value="">Select one</option><option>Curious and want updates</option><option>Likely if price and safety work</option><option>Need more product details first</option><option>Only interested in stories for now</option></select></label>
            </div>
            <fieldset>
              <legend>What are you most interested in?</legend>
              <label><input type="checkbox" name="interest" value="Story newsletters" /> Story newsletters</label>
              <label><input type="checkbox" name="interest" value="Beta reading" /> Beta reading</label>
              <label><input type="checkbox" name="interest" value="School workshops" /> School workshops</label>
              <label><input type="checkbox" name="interest" value="Founder preorder" /> Founder preorder</label>
            </fieldset>
            <label>What would help you trust Maitri for your child?<textarea name="objection" rows={4} placeholder="For example: safety, age fit, story fit, pricing, materials, or launch timing"></textarea></label>
            <button className="button gold" type="submit">Join the Waitlist</button>
            <p className="privacy-note">We respect your privacy and will only use your details for Maitri story and launch updates.</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <a className="brand-mark" href="#top" aria-label="Maitri home"><span className="brand-symbol" aria-hidden="true">M</span><span><strong>Maitri</strong><small>Stories today. Values forever.</small></span></a>
          <p>Story-first companion dolls and character worlds inspired by brave Indian heroines.</p>
        </div>
        <div className="footer-links" aria-label="Footer links"><strong>Explore</strong><a href="#stories">Stories</a><a href="#manu">Manu</a><a href="#circle">Circle</a><a href="#workshops">Workshops</a></div>
        <div className="footer-links" aria-label="Support links"><strong>Support</strong><a href="#waitlist">FAQs</a><a href="#waitlist">Safety and quality</a><a href="#waitlist">Contact us</a><a href="#waitlist">Privacy policy</a></div>
        <div className="footer-contact"><strong>Connect</strong><span>hello@maitridolls.com</span><span>Instagram | YouTube | Newsletter</span></div>
        <img className="footer-palace" src="/assets/footer-palace-line.png" alt="" aria-hidden="true" />
      </footer>
      <MaitriInteractions />
    </div>
  );
}
