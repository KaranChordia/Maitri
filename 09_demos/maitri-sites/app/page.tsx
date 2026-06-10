import { MaitriInteractions } from "./site-interactions";

const valueCards = [
  ["doll-icon", "Companion dolls", "18-inch friends with varied skin tones, hair types, clothing references, and regional identity."],
  ["book-icon", "Storybooks", "Chapter-led stories that connect history, emotion, values, and child-friendly imagination."],
  ["activity-icon", "Activities", "Worksheets and parent prompts convert reading into reflection, play, and conversation."],
  ["heart-icon", "Values for life", "Courage, compassion, leadership, resilience, and curiosity as everyday choices."],
];

const circleCards = [
  ["01", "Be the first to know", "Get early updates on character reveals, stories, and launches."],
  ["02", "Beta readers", "Help shape storybooks and activities for children."],
  ["03", "Parent prompts", "Ideas and conversations to inspire confident, curious children."],
  ["04", "Character reveals", "Meet the remarkable women who inspire our dolls."],
];

export default function Home() {
  return (
    <div className="site-shell">
      <header className="floating-nav-wrap" aria-label="Main navigation">
        <div className="floating-nav">
          <a className="brand-mark" href="#top" aria-label="Maitri home">
            <span className="brand-symbol" aria-hidden="true">M</span>
            <span><strong>Maitri</strong><small>Stories that stay</small></span>
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
                <a href="#stories">Story-first worldbuilding</a>
                <a href="#manu">Character-led reveals</a>
              </div>
            </div>
            <div className="nav-item">
              <a href="#circle">Circle</a>
              <div className="nav-panel">
                <a href="#circle">Community access</a>
                <a href="#waitlist">Founder updates</a>
              </div>
            </div>
            <div className="nav-item">
              <a href="#workshops">Schools</a>
              <div className="nav-panel">
                <a href="#workshops">Workshop format</a>
                <a href="#waitlist">Pilot interest</a>
              </div>
            </div>
            <a className="nav-cta" href="#waitlist">Join the Maitri Circle</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero section-grid section-flow" aria-labelledby="heroTitle">
          <div className="hero-copy reveal section-card">
            <h1 id="heroTitle">A brave friend for every child.</h1>
            <p>
              Maitri is a story-first companion doll universe inspired by remarkable women from India.
              Each character helps children discover courage, curiosity, kindness, and belonging through
              stories they can grow up with.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button primary" href="#waitlist">Join the Maitri Circle <span aria-hidden="true"></span></a>
              <a className="button secondary" href="#manu">Meet Manu <span aria-hidden="true"></span></a>
            </div>
            <div className="hero-note" aria-label="Launch note">
              <span>Pre-launch community now forming</span>
              <span>Stories, beta reads, parent prompts, and founder updates</span>
            </div>
          </div>
          <div className="hero-visual reveal" aria-label="Maitri doll portrait and story landscape">
            <div className="arch-frame">
              <img src="/assets/hero-doll-arch.png" alt="Maitri doll in a gold jharokha arch with Indian textile details" />
            </div>
            <div className="story-scroll" aria-hidden="true"><span>Courage</span><span>Curiosity</span><span>Compassion</span></div>
          </div>
        </section>

        <section className="universe section-flow" id="stories" aria-labelledby="storiesTitle">
          <div className="section-heading reveal">
            <p className="section-label">The story universe</p>
            <h2 id="storiesTitle">A universe of stories, values, and imagination.</h2>
            <p>Maitri begins with story attachment: children meet the character, learn her choices, and begin asking, &quot;What would she do?&quot; before the doll is ever launched.</p>
          </div>
          <div className="universe-layout">
            <article className="storybook-panel reveal section-card">
              <img className="story-art" src="/assets/story-landscape.png" alt="Illustrated girl looking toward an Indian palace landscape" />
              <h3>History made personal</h3>
              <p>Stories are written from childhood moments, not distant textbook summaries. A heroine becomes someone a child can understand, question, and befriend.</p>
            </article>
            <div className="value-grid" aria-label="Maitri product pillars">
              {valueCards.map(([icon, title, text]) => (
                <article className="value-card reveal section-card" key={title}>
                  <span className={`value-icon ${icon}`} aria-hidden="true"></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="manu-band section-flow" id="manu" aria-labelledby="manuTitle">
          <div className="manu-copy reveal section-card">
            <p className="section-label light">First character reveal</p>
            <h2 id="manuTitle">Before she was a queen, she was a girl who asked why.</h2>
            <p>Manu is curious, fearless, and kind. She questions injustice, stands up for what is right, and believes every child has a voice. Her story is just the beginning.</p>
            <a className="button pale" href="#waitlist">Discover Manu&apos;s Story <span aria-hidden="true"></span></a>
          </div>
          <div className="book-spread reveal" aria-label="Manu storybook preview">
            <img src="/assets/book-spread-manu.png" alt="Open Manu storybook with illustration and chapter page" />
          </div>
        </section>

        <section className="circle section-flow" id="circle" aria-labelledby="circleTitle">
          <div className="circle-copy reveal section-card">
            <p className="section-label">Maitri Circle</p>
            <h2 id="circleTitle">A community for dreamers, parents, educators, and story lovers.</h2>
            <p>Join the circle for first looks, beta reads, parent-child prompts, classroom pilots, and character reveals before the dolls arrive.</p>
            <a className="button primary" href="#waitlist">Join the Maitri Circle <span aria-hidden="true"></span></a>
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
            <h2 id="workshopsTitle">Workshops for schools.</h2>
            <p>Maitri workshops can turn one character story into a 45-60 minute session for children, with read-alouds, value discussions, worksheets, and take-home prompts.</p>
            <div className="workshop-list"><span>Storytelling sessions</span><span>Values and leadership</span><span>Heritage and diversity</span></div>
            <a className="button primary" href="#waitlist">Invite Maitri to your school <span aria-hidden="true"></span></a>
          </div>
        </section>

        <section className="validation section-flow" aria-labelledby="validationTitle">
          <div className="section-heading reveal">
            <p className="section-label light">Demand validation</p>
            <h2 id="validationTitle">A pre-launch engine before heavy inventory.</h2>
            <p>Maitri should measure real signals before production scale: waitlist quality, beta-reader feedback, workshop interest, price comfort, character preference, and preorder intent.</p>
          </div>
          <div className="signal-rail" aria-label="Validation signals">
            <span>Waitlist growth</span><span>Story engagement</span><span>Beta feedback</span><span>School inquiries</span><span>Price comfort</span><span>Founder intent</span>
          </div>
        </section>

        <section className="waitlist section-flow" id="waitlist" aria-labelledby="waitlistTitle">
          <div className="waitlist-copy reveal section-card">
            <p className="section-label light">Founder access</p>
            <h2 id="waitlistTitle">Be the first to join the Maitri Circle.</h2>
            <p>Join for early story letters, beta reader invitations, school pilot updates, and founder preorder updates. Maitri will use these signals to decide what to build next.</p>
            <div className="promise-list" aria-label="Waitlist benefits"><span>Early access to stories</span><span>Beta reader invitations</span><span>Founder preorder updates</span></div>
            <img className="peacock-panel" src="/assets/peacock-panel.png" alt="" aria-hidden="true" />
            <div className="waitlist-state" id="waitlistState" aria-live="polite"></div>
            <div className="report-actions" aria-label="Signal report tools">
              <button className="button pale report-button" type="button" id="refreshReport">Refresh signal report</button>
              <button className="button pale report-button" type="button" id="downloadReport">Download CSV</button>
            </div>
          </div>

          <form className="waitlist-form reveal section-card" id="maitriWaitlistForm">
            <div className="form-row">
              <label>Parent / guardian name<input name="name" type="text" autoComplete="name" required /></label>
              <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
            </div>
            <div className="form-row">
              <label>Child age<select name="childAge" required><option value="">Select age range</option><option>3-5</option><option>6-8</option><option>9-11</option><option>Gift buyer / educator</option></select></label>
              <label>I am a<select name="segment" required><option value="">Select one</option><option>Parent</option><option>Grandparent or gift buyer</option><option>NRI family</option><option>Educator or school</option><option>Beta reader</option></select></label>
            </div>
            <div className="form-row">
              <label>Story preference<select name="storyPreference" required><option value="">Select one</option><option>Brave adventure</option><option>Friendship and kindness</option><option>History made personal</option><option>Parent-child activities</option></select></label>
              <label>Beta-reader interest<select name="betaReaderInterest" required><option value="">Select one</option><option>Yes, I would like to beta read</option><option>Maybe, tell me more</option><option>Not right now</option></select></label>
            </div>
            <div className="form-row">
              <label>School / educator interest<select name="schoolInterest" required><option value="">Select one</option><option>Yes, for a school or group</option><option>Maybe, if the story fit is right</option><option>Not applicable</option></select></label>
              <label>Founder preorder signal<select name="preorderSignal" required><option value="">Select one</option><option>Curious and want updates</option><option>Likely if price and safety work</option><option>Need more product details first</option><option>Only interested in stories for now</option></select></label>
            </div>
            <fieldset>
              <legend>What are you most interested in?</legend>
              <label><input type="checkbox" name="interest" value="Story newsletters" /> Story newsletters</label>
              <label><input type="checkbox" name="interest" value="Beta reading" /> Beta reading</label>
              <label><input type="checkbox" name="interest" value="School workshops" /> School workshops</label>
              <label><input type="checkbox" name="interest" value="Founder preorder" /> Founder preorder</label>
            </fieldset>
            <label>Biggest question or objection<textarea name="objection" rows={4} placeholder="For example: price, safety, age fit, story fit, or preorder timing"></textarea></label>
            <button className="button gold" type="submit">Join the Waitlist</button>
            <p className="privacy-note">Live capture uses the Sites database when deployed. Local development falls back to browser storage.</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <a className="brand-mark" href="#top" aria-label="Maitri home"><span className="brand-symbol" aria-hidden="true">M</span><span><strong>Maitri</strong><small>Stories that stay</small></span></a>
          <p>Story-first companion dolls inspired by remarkable women from India.</p>
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
