import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Add ArrowLeft
if 'ArrowLeft,' not in content:
    content = content.replace('ArrowRight,', 'ArrowLeft,\n  ArrowRight,')

# 2. Extract everything before CharacterPage
parts = content.split('function CharacterPage() {')
if len(parts) < 2:
    print("Could not find function CharacterPage() {")
    exit(1)
before_page = parts[0]

# 3. Extract everything after CharacterPageLegacy
parts2 = parts[1].split('function CharacterPageLegacy() {')
if len(parts2) < 2:
    print("Could not find function CharacterPageLegacy() {")
    exit(1)
after_page = 'function CharacterPageLegacy() {' + parts2[1]

new_components = """function CharacterSelectorFullscreen({ onSelect }) {
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
            <button 
              key={char.id} 
              className={`character-selector-card ${char.tone}`}
              onClick={() => onSelect(char.id)}
            >
              <div className="selector-card-bg"></div>
              {char.image ? (
                <img src={char.image} alt={char.name} className="selector-character-img" />
              ) : (
                <div className="selector-placeholder-img">
                  <span>{char.initials}</span>
                </div>
              )}
              <div className="selector-card-content">
                <span className="selector-pill">{char.role || "Future friend"}</span>
                <h2>{char.name}</h2>
                <p>{char.tagline}</p>
                <span className="selector-action">Explore World</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  );
}

function CharacterDashboard({ selectedId, onBack }) {
  const [activeFeature, setActiveFeature] = useState("storybook");
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  
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
                  <div className="storybook-reader">
                    <div className="storybook-reader-cover">
                      <img src={activeStoryPreview.image} alt="" />
                      <span>{activeStoryPreview.pages}</span>
                      <h4>{activeStoryPreview.title}</h4>
                    </div>
                    <div className="storybook-reader-pages">
                      <span>Preview reader</span>
                      <h4>{activeStoryPreview.takeaway}</h4>
                      {activeStoryPreview.reader.map(([page, title, text]) => (
                        <article key={`${activeStoryPreview.pages}-${page}`}>
                          <strong>{page}</strong>
                          <h5>{title}</h5>
                          <p>{text}</p>
                        </article>
                      ))}
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
    <main className={`maitri-page character-world-page ${!selectedId ? 'no-scroll' : ''}`}>
      <Header />
      {!selectedId ? (
        <CharacterSelectorFullscreen onSelect={setSelectedId} />
      ) : (
        <CharacterDashboard selectedId={selectedId} onBack={() => setSelectedId(null)} />
      )}
    </main>
  );
}
"""

with open('src/App.jsx', 'w') as f:
    f.write(before_page + new_components + after_page)

print("Modification complete.")
