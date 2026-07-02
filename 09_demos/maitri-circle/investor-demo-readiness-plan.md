# Maitri Investor Demo Readiness Plan

Prepared: 2026-07-02

Scope: `09_demos/maitri-circle`

Goal: prepare a polished, consumer-ready Maitri website that Shwetika can show to potential investors within two days, without prematurely publishing unapproved product, history, safety, pricing, shipping, or production claims.

## Audit Inputs

- Current live demo app: `index.html`, `characters.html`, `story-universe.html`
- App source: `src/App.jsx`, `src/styles.css`, `src/StoryUniverse.jsx`, `src/storyUniverse.css`
- Local app rules: `AGENTS.md`
- Product and strategy sources:
  - `README.md`
  - `00_project_admin/project_status.md`
  - `01_strategy/brand_positioning/Maitri_Strategy_Working_Brief.md`
  - `02_character_universe/manu/manu_character_bible_v1.md`
  - `05_waitlist_preorder/live_interest_capture_plan.md`
  - `11_product_development/first_doll_box/maitri_first_box_blueprint.md`
- Shwetika reference PDF: `/Users/karanchordia/Downloads/Maitri — Meet Manu! India's First Doll Line. Friends for Life_.pdf`

Important handling note: the PDF should be used as a rough structure reference only. It should not be copied into the current website without review, because it includes stronger claims than the repo currently supports.

## Current State Summary

The current Maitri site is visually strong and technically healthy enough to use as a base. The production build passes, all three routes render, no broken images were found, and no browser console errors appeared in desktop or mobile checks.

It is not yet investor-demo ready as a consumer website. The main issues are not build failures. They are content confidence, demo-only language, fake-functional interactions, unapproved claims, asset weight, and deployment assumptions.

Highest-priority cleanup before showing investors:

1. Remove internal planning language from consumer pages.
2. Hide or reframe mock commerce, mock prices, and inventory actions.
3. Soften or remove claims that need Shwetika, historical, school, product, safety, or production review.
4. Make the waitlist capture real enough for a live demo.
5. Make the Vercel/domain path explicit, because the current Vite base path is configured for `/Maitri/`.
6. Use optimized media assets and reduce unnecessary public assets.

## Reference PDF Takeaways

The PDF suggests a clearer consumer flow:

1. Hero anchored on Manu and the doll.
2. Meet Manu facts.
3. Book One preview.
4. Box contents.
5. Child activities.
6. Continuing story and future dolls.
7. Grown-up waitlist.
8. Simple footer.

Useful structural ideas:

- Lead with Manu, not with the internal ecosystem.
- Show the tangible product promise earlier.
- Use parent-friendly and child-friendly language together.
- Convert story depth into simple sections: book, box, activities, waitlist.
- Keep future characters secondary.

Do not copy these PDF claims without approval:

- "India's first doll for kids"
- "born and made right here"
- "fact-checked with historians"
- "first 500 families"
- "3,200+ families waiting"
- "100% made in India"
- "365 day returns"
- shipping or launch timing
- prices, preorder, payment, or production commitments
- exact historical childhood claims unless reviewed

## Page Audit

### Home Page: `/Maitri/`

Sections present:

- Header/navigation
- Hero
- Story Universe
- Meet Manu
- Maitri Circle
- For Schools and Workshops
- Waitlist
- Footer

What works:

- Strong first impression on desktop.
- Clear values-led positioning.
- Polished illustration style.
- Mobile layout has no page-level horizontal overflow.
- All six homepage images load.
- Waitlist has visible success state after local submission.

Needs removal or rewrite:

- Brand reads as "Maitri Circle" while the investor reference leads with "Maitri" and "Meet Manu." Decide whether the public brand should be Maitri Dolls, Maitri, or Maitri Circle before the demo.
- The Story Universe CTA appears before Manu/product context. For investors, this may make the site feel like an experience prototype rather than a product company.
- Meet Manu copy says "The new source package frames Manu..." This is internal language and should be removed.
- Meet Manu says Manu is a "six-book journey" from age seven to Lakshmibai. This may be directionally true in source files, but it should be softened unless Shwetika approves it as public copy.
- "Story + activity kits every month" implies a recurring content/product promise. Remove unless the cadence is approved.
- "Curriculum-aligned story programs" and "Teacher training & resources" imply school-program readiness. Reframe as future interest or remove unless materials exist.
- Footer social links point to `#top`. Replace with real links, hide them, or label as coming soon outside the demo flow.

Requires attention:

- The mobile hero pushes the character image below the first viewport. This is not a bug, but it weakens the immediate Manu/doll signal.
- The waitlist only collects email and stores no persistent lead. The source capture plan expects richer fields and a server or browser-local fallback.
- The homepage should probably become the investor-safe consumer narrative:
  1. Meet Manu
  2. What the first box is
  3. Why parents care
  4. What children do
  5. Story Universe preview
  6. Join waitlist

### Character Page: `/Maitri/characters.html`

Sections present:

- Header
- Start with Manu hero
- Interactive Manu story stage
- Active character dashboard
- Quest/adventure modes
- Story mode
- Play mode
- Four Courages mode
- Create mode
- Parents mode
- First box bridge
- Future character system

What works:

- Visually premium first screen.
- Manu-first direction is correct.
- Images load with no broken assets.
- Mode switching works.
- Mobile avoids page-level horizontal scroll.

Needs removal or rewrite:

- First screen says "living character bible" and "product thinking." This is internal planning language.
- "Master character pattern," "Canon pending," "Review boundary," and related review-system language should not be visible to investors unless showing internal tooling is intentional.
- Future characters such as Kalpana and Mary Kom are presented before their canon review is complete. Hide, compress, or frame them as "future universe direction" with minimal detail.
- The page is currently a hybrid of consumer page, design system, story lab, and internal canon tool. For the two-day version, simplify it into a consumer "Meet Manu" page.

Requires attention:

- One decorative `stage-river` layer extends outside the viewport on desktop and mobile. It does not create page-level horizontal scroll, but it should be checked visually after any layout changes.
- There are duplicate visible controls for several adventure stops. This is usable, but the page feels dense.
- The story acts include future arc language such as "Books 4-6: The Legacy Arc." This may pull the demo into unreviewed long-term canon instead of focusing the first product.
- The parent-facing first box content is useful and should be retained, but it should match the approved first-box blueprint: doll, 32-page storybook, letter, six activity pages, sticker pages.

Recommended two-day direction:

- Rename the page from "Maitri Character World" to a consumer-friendly "Meet Manu."
- Keep: hero, story promise, Four Courages, simple play interaction, first box bridge, parent prompts.
- Remove or hide: internal canon labels, future character management UI, review boundary labels, dense duplicate quest surfaces.

### Story Universe: `/Maitri/story-universe.html`

Sections present:

- 3D world canvas
- Header navigation
- World district controls
- Journey dock
- Street navigator
- Location interiors:
  - Ganga Ghat
  - Story Library
  - Keepsake Bazaar
  - Circle Courtyard
  - Mango Hillside

What works:

- Opens directly into the navigable world. This matches `AGENTS.md`.
- Canvas loads on desktop and mobile.
- No console errors.
- No page-level horizontal overflow.
- The 3D world is memorable and differentiating.

Needs removal or rewrite:

- The page includes accessible/DOM text "World Prototype." Remove "Prototype" from any public-facing or accessibility text before investor use.
- Keepsake Bazaar shows mock prices such as `RS. 1299`, `RS. 349`, and `RS. 499`.
- Keepsake Bazaar includes "Add to inventory." This feels like mock commerce and should be removed, hidden, or renamed.
- Story Library contains a full 32-page story draft. Since the Manu bible says website/content is not final public copy, consider showing only an approved excerpt.
- The page has no visible `h1`. Add a real heading or accessible title for SEO and accessibility.

Requires attention:

- The 35 MB GLB model is heavy for a public investor link. Keep a fallback poster/static mode or optimize the model before broad sharing.
- On mobile, some district controls extend off-screen inside the HUD. This may be an intentional horizontal control strip, but it needs a clearer affordance or simplified mobile layout.
- The bottom HUD is dense. For demo mode, consider a guided "Start with Manu" path with fewer visible controls.
- If kept for the investor demo, this page should be framed as "Explore the Maitri story world," not as the primary explanation of the business.

## Asset Audit

No broken images were found in browser checks. The issue is weight, serving format, and public folder hygiene.

Public assets currently present:

| Asset | Size | Current note |
| --- | ---: | --- |
| `public/assets/models/maitri-world-archipelago.glb` | 35 MB | Heavy 3D model. Optimize or provide fallback before sharing widely. |
| `reference-assets/shwetika-source/manu/*.png` | 1.5 MB to 3.5 MB | Original Shwetika PNGs moved out of public; optimized JPGs now serve the app. |
| `reference-assets/generated-source/*.png` | 2.0 MB to 2.4 MB | Original generated PNGs moved out of public; optimized JPGs now serve the app. |
| `public/assets/generated/optimized/*.jpg` | 128 KB to 408 KB | Optimized serving copies now used by `App.jsx` and `StoryUniverse.jsx`. |
| `public/assets/shwetika/manu/optimized/*.jpg` | 244 KB to 540 KB | Optimized serving copies added during implementation. |
| `reference-assets/reference-crops/*.png` | 48 KB to 332 KB | Reference assets moved out of the public serving path during implementation. |
| `reference-assets/maitri-circle-reference.png` | 1.9 MB | Reference screenshot moved out of the public serving path during implementation. |

Asset actions:

1. Done: `generatedAssets` in `src/App.jsx` now uses `assets/generated/optimized/*.jpg`.
2. Done: optimized versions of Shwetika's Manu images were created and are now used by the app.
3. Done: `reference-crops/` and `maitri-circle-reference.png` were moved out of `public/` into `reference-assets/`.
4. Optimize `maitri-world-archipelago.glb` or add a static fallback for slow connections.
5. Add image dimensions or stable aspect-ratio constraints where needed to reduce layout shifts.

## Deployment Readiness

Current technical state:

- `npm run build` passes.
- Vite emits three HTML outputs: `index.html`, `characters.html`, `story-universe.html`.
- Build warning: chunks over 500 KB after minification, mainly app and Three.js bundles.
- `vite.config.mjs` sets `base: "/Maitri/"`, which fits GitHub Pages-style hosting.

Vercel/domain attention:

- A Vercel custom-domain or root-domain deployment likely needs a base path decision. If the site should live at domain root, `base` probably needs to become `/` for that deployment.
- If the site should remain under `/Maitri/`, the domain and route handoff must explain that.
- There is no committed Vercel config for this demo app.
- There is no production waitlist endpoint yet.
- Confirm current Vercel free/Hobby plan details at deployment time before promising setup constraints, limits, or domain behavior.

Recommended deployment path after approval:

1. Decide final URL shape:
   - root domain: `https://example.com/`
   - subpath: `https://example.com/Maitri/`
   - subdomain: `https://maitri.example.com/`
2. Adjust Vite `base` accordingly.
3. Add a minimal form endpoint or connect waitlist to an approved service.
4. Build locally and run production preview.
5. Deploy to Vercel.
6. Check all direct routes and refresh behavior.
7. Connect domain.
8. Run final desktop/mobile smoke tests from the deployed URL.

## Removal List

Remove before investor demo unless Shwetika explicitly approves:

- "living character bible"
- "product thinking"
- "new source package"
- "World Prototype"
- "Master pattern"
- "Canon pending"
- "Review boundary"
- visible review-process labels on consumer pages
- mock prices in Story Universe
- "Add to inventory"
- fake social links pointing to `#top`
- reference assets from public deploy path
- future character UI that suggests unapproved launch scope
- claims of monthly kits, school curriculum alignment, teacher training, production readiness, or recurring programs unless backed by real material

## Claims Needing Approval

Do not publish these without explicit review:

- "India's first" category claims
- "Made in India" or manufacturing-origin claims
- age-specific product claims
- historian fact-check claims
- safety, materials, compliance, hair, vinyl, or accessory claims
- production timelines
- shipping timelines
- return policies
- preorder availability
- first-family counts or demand numbers
- exact historical dates, relationships, races, dialogue, battle details, or childhood scenes
- school curriculum alignment
- named future dolls based on real people unless the canon path is approved

## Minimum Two-Day Execution Plan

### Day 1: Consumer Polish And Risk Removal

1. Confirm Shwetika's approved public brand name for this demo:
   - Maitri
   - Maitri Dolls
   - Maitri Circle
2. Freeze the investor-demo story:
   - Manu-first
   - first box concept
   - values and parent trust
   - waitlist and validation
3. Rewrite homepage copy to remove internal language and unsupported promises.
4. Simplify `characters.html` into a consumer "Meet Manu" page.
5. Reframe Story Universe as a supporting world preview.
6. Remove pricing and inventory actions.
7. Replace fake social links or hide them.
8. Switch generated images to optimized JPGs.
9. Add a minimal real waitlist capture path or browser-local fallback with exportable entries.

### Day 2: Deployment And Demo QA

1. Decide Vercel URL/base path.
2. Add deployment config if needed.
3. Run production build.
4. Deploy to Vercel.
5. Connect or prepare domain.
6. Test:
   - homepage
   - Meet Manu page
   - Story Universe
   - waitlist submit
   - direct route refresh
   - mobile menu
   - mobile Story Universe fallback
7. Prepare a short demo script:
   - start with Manu
   - show first box concept
   - show story/play depth
   - show waitlist capture
   - optional: show Story Universe as the long-term moat
8. Prepare a fallback static walkthrough in case 3D performance is weak on the meeting device.

## Suggested Investor Demo Narrative

Recommended first pass:

1. "Maitri is a story-first Indian companion doll universe."
2. "We are starting with Manu, a child-facing courage story inspired by Rani Laxmibai."
3. "The first box is intentionally focused: doll, storybook, letter, activities, stickers."
4. "The website builds demand before production scale: parent interest, beta readers, school interest, and preorder signal."
5. "The Story Universe shows how the brand can expand beyond a single doll into books, play, learning, and future characters."

## Open Questions For Shwetika

1. What exact brand name should be on the investor-demo site?
2. Can the site publicly say "Maitri Dolls" or should it stay as "Maitri"?
3. Is Manu's doll image approved for investor-facing display?
4. Is the current Manu story excerpt approved for public/investor display?
5. Should future characters be visible at all?
6. Are school/workshop claims allowed now, or only future interest?
7. Where should waitlist submissions go for the demo?
8. What domain should be used for Vercel?
9. Should Story Universe be a primary nav item or an optional demo route?

## Verification Performed

- `npm run build` passed in `09_demos/maitri-circle`.
- Browser checked:
  - `http://127.0.0.1:3001/Maitri/`
  - `http://127.0.0.1:3001/Maitri/characters.html`
  - `http://127.0.0.1:3001/Maitri/story-universe.html`
- Desktop viewport: 1280 x 720.
- Mobile viewport: 390 x 844.
- No console errors observed.
- No broken images observed.
- Homepage and character page loaded all visible images.
- Story Universe loaded a canvas on desktop and mobile.
- Mobile homepage had no horizontal overflow.
- Character page had no page-level horizontal overflow, but decorative off-canvas content was detected.
- Story Universe mobile HUD has off-screen controls inside the control strip.

## Recommended Stop Rules

Do not deploy the investor-ready version if:

- waitlist submit silently loses data and the demo depends on capture
- direct links fail after Vercel deployment
- the site still shows internal planning language
- Story Universe shows mock prices or inventory actions
- mobile route checks produce blank or broken 3D state
- Shwetika has not approved the public claims around history, product, school use, or production readiness
