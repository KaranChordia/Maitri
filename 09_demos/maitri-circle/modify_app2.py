with open('src/App.jsx', 'r') as f:
    content = f.read()

# Fix className for main
content = content.replace(
    "<main className={`maitri-page character-world-page ${!selectedId ? 'no-scroll' : ''}`}>\n      <Header />",
    "<main className={`maitri-page character-world-page ${!selectedId ? 'no-scroll' : 'dashboard-active'}`}>\n      <Header />"
)

# Fix the storybook reader UI in App.jsx to have a close button and better immersive structure
old_reader = """                {activeStoryPreview && (
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
                )}"""

new_reader = """                {activeStoryPreview && (
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
                )}"""

content = content.replace(old_reader, new_reader)

with open('src/App.jsx', 'w') as f:
    f.write(content)

