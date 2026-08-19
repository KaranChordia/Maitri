# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

The homepage hero should lead with the overall Maitri Circle promise first: Maitri as a story-first companion universe where children befriend brave Indian heroines through story, play, and parent-child reflection. Manu should remain the first concrete companion and the next major section/CTA, not the homepage's only headline.

The homepage is a brand explanation before it is a feature showcase. Its durable content order is: overall Maitri promise, what Maitri is, what Maitri does/how the experience works, who it is for, then concise glimpses of Manu, the companion circle, the Story World, and the first box. Do not lead the homepage with a detailed Manu or product-box sequence before visitors understand the brand.

For the current public homepage copy, follow the founder-provided five-part narrative in this order: “Every Great Adventure Begins with a Friend,” “What is Maitri?”, “Meet the Friends,” “Stories You’ll Read Together,” and “Be Among the First.” Preserve the existing premium visual system while keeping the wording and section hierarchy aligned to that approved source.

In the homepage “Stories You’ll Read Together” section, use one purpose-made premium illustration of girls sharing a book rather than a collage or repeated images from other sections. Present it as a simple circular or softly organic focal crop that supports the copy and connected story path.

Do not show individual book previews in the homepage “Stories You’ll Read Together” section. Mirror the homepage hero anatomy instead: keep the story copy and one consistent filled-pink Library CTA on the left, and let the single reading illustration hold the right side at hero-like scale and balance.

Keep the homepage composition free-flowing and contemporary. Avoid repeated square or rectangular cards, dashboard-like rows, and panels stacked edge-to-edge. Prefer connected paths, open editorial groupings, organic image crops, varied rhythm, and generous transitions that let the brand story feel like one authored journey.

Carry that same continuous, section-light design philosophy across public companion pages, especially `characters.html` and `manu.html`. Use one softly evolving page atmosphere, open editorial composition, and organic media; reserve visible containers for genuinely interactive controls rather than turning each narrative section into a rounded panel.

The supplied Manu HTML/page recording is a content-architecture reference only. Preserve the existing Maitri visual system and do not copy its visual design, product claims, proof points, specifications, or release promises. On the Manu page, introduce Manu as a friend, show all five approved child-facing facts, establish Book 1 through its concise six-moment trail, continue into the reading-together prompts, then end with future companion context followed by the waitlist. Do not restore the superseded standalone first-box section or expanded active-story reader on this route.

Public companion routes are static Vite inputs: `characters.html` and `companions.html` are the hub, while `manu.html`, `savitribai.html`, and `kalpana.html` are individual companion pages. Local previews use the default `/Maitri/` base, while Vercel production builds at `/` through `MAITRI_BASE_PATH=/`; keep HTML assets and static-page links base-aware so both mounts work. Keep these pages consumer-facing and avoid internal planning terms in visible copy.

The public `about.html` route should explain Maitri through belief, story, and cultural care rather than company jargon. Keep Shwetika’s portrait, founder story, and personal note as clearly designed placeholders until she supplies the approved details; do not invent her biography.

Treat the homepage image system as the visual reference for every public page: use circular or softly organic image cutouts with a small number of offset rings, translucent layers, and restrained depth. Keep narrative sections borderless and connected through atmosphere, spacing, paths, and image rhythm; retain visible containment only for controls that own interactive state.

Do not use straight divider rules to organize Maitri narrative content. On companion pages, separate facts, values, prompts, book details, and box contents through whitespace, organic colour fields, circular markers, and typographic rhythm so adjacent sections remain visually seamless.

Give decorative circles and image-layer rings a clearly visible, unhurried ambient motion rather than leaving them static between hover interactions. Use enough travel, rotation, and breathing to be noticeable without competing with the content; preserve the stronger hover response, stagger the movement so the page does not pulse in unison, and disable non-essential motion for reduced-motion users.

Use one consistent headline treatment for public narrative-section eyebrows: larger title-case Josefin Sans text with a restrained brand-colour shimmer and a small companion-circle accent. Do not return to tiny all-caps labels or brush-stroke marker backgrounds; keep labels inside dense interactive controls compact and static.

On the homepage, keep every narrative-section eyebrow visibly large and do not place the former row of decorative dots beneath it. Brand the character collective as “Companions” in navigation, section headings, and discovery calls to action. The “Meet the Companions” section should include a creative, image-led preview of the current companion circle rather than stopping after introductory copy. Keep all companion preview portrait frames visually equal in size even when their source cutouts use different aspect ratios.

In the homepage “Stories You’ll Read Together” section, keep the reading illustration in the same softly asymmetrical, layered image-shape family as the hero artwork; do not revert it to a perfect circular crop.

On `manu.html`, use solid pastel-pink narrative eyebrows with no dotted accents and use decorative motifs sparingly. Keep the hero free of a CTA row. Present Manu's facts as an open organic two-column constellation with every label, value, and note visible, becoming one calm column on mobile; do not replace it with a selector or separate active-detail reveal. Keep the concise Book 1 trail and interactive reading-together prompts welcoming to children and accompanying adults, while reduced-motion users receive the complete experience without scroll-led animation.

When founder-provided Manu references are supplied as screenshots, use them as content-architecture inputs rather than visual-design sources. Keep the Maitri visual system, foreground a warm first-person introduction, and place memorable child-facing facts before the book experience. Current highlighted facts are Manikarnika/Manu, childhood in Bithoor with her later Jhansi legacy clearly distinguished, hot jalebis, horse riding with Badal, and 19 November. Do not inherit unsupported comparison claims, release claims, age labels, outfit counts, or product specifications from reference screenshots.

Keep the in-progress About page disabled until the founder explicitly asks to publish it. Preserve its source reversibly, but omit it from public navigation and production build inputs while disabled.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

For `story-universe.html`, the world must load directly into the navigable 3D scene. Do not reintroduce a launch gate, layer panel, or "Enter World" button before the world is usable.

Clicked world locations must open authored Three.js interior scenes inside the canvas itself. React overlays should stay compact and support interaction, such as reading a selected book or returning to the world; they should not substitute for a 3D location with flat environment cards.

Hover treatment on the world should be minimal: show only the location name near the pointer, and keep the world, landmarks, camera, lighting, and location interiors as the primary experience.

The public Maitri Circle waitlist collects only name and email. Its free production backend is the bound Google Apps Script documented under `05_waitlist_preorder/google_sheets_waitlist/`, reached through the Vercel serverless route at `/api/waitlist`. Keep the honeypot, server-side validation, response-body verification, and explicit success/failure states intact. Never report a successful signup from a local-only fallback or expose the Apps Script URL or shared secret through a `VITE_` variable.

The current website logo is the founder-selected Flowing pages motif: `public/assets/brand/icons/svg/23.svg`, paired horizontally with the Josefin Sans `Maitri` wordmark in website headers and footers. Keep favicons icon-only using the same `23.svg`. Do not reuse `23.svg` as a decorative motif elsewhere on the site.

Josefin Sans is the single font family across the public website: headings, body, nav, buttons, forms, and Story Universe UI. Do not reintroduce Outfit, Lora, or mixed type systems.

The public brand mark is enabled in header and footer: `23.svg` paired with the Josefin Sans `Maitri` wordmark (`SHOW_MAITRI_LOGO = true`).

The companions hub canonical route is `characters.html`. Keep `companions.html` as a redirect/alias only; do not maintain two competing hub implementations. Public UI classnames must stay consumer-facing (`companion-*`, `story-*`); do not reintroduce `investor-*` or dashboard/lab naming on public pages.

Story Universe 3D polish is deferred and is not part of the current ship-ready homepage/companions pass. Keep the existing world route working, but do not prioritize overlay/layout rewrites there until the founder asks.

The mobile hamburger menu opens a glass panel anchored under the header, matching the header width and glass treatment. Keep a soft pastel wash, circular motif accents, editorial Josefin Sans links, an in-panel Join Waitlist CTA, and a light scrim behind the panel. Do not return to a cramped generic dropdown or conflicting absolute/transform centering that breaks layout.

The official Maitri website palette is pastel crimson `#ff96af` and pastel orange `#ffb098`. Use this pair for public narrative-section headline gradients and future brand-led colour decisions. Keep mobile navigation visually continuous with the main glass navigation bar through matching translucent borders, blur, opacity, and restrained motion.

The standalone motifs under `public/assets/brand/icons/svg/` (except `23.svg`, which is logo-only) are the approved decorative icon vocabulary. Use `19.svg` Quiet Petals as the simplicity reference: each motif should read as one calm, near-glyph-level solid silhouette with generous negative space and consistent visual weight. Do not use gradients, masks, filters, embedded raster images, bubbles, borders, shadows, coloured tiles, or enclosing containers. Keep public pages primarily text- and image-led, reserving motifs for rare meaningful anchors; the four “What is Maitri?” principles are the deliberate homepage exception, where four semantic motifs participate in one connected path. Keep the full family together only on a dedicated reference surface such as Content Studio Pillars, and retain conventional interface icons for controls whose meaning must remain immediately recognisable.

Content Studio lives at `content-studio/index.html` under the active site base (`/Maitri/content-studio/index.html` locally and `/content-studio/index.html` in production). Link it from the site footer with that explicit relative file path rather than a bare directory path, because Vite's SPA fallback would otherwise serve the homepage. Do not add it to the primary header navigation. Keep drafts claim-safe (no unsupported safety, materials, compliance, production, or preorder timeline language) and use the approved motif vocabulary sparingly; only the Pillars surface should display the full motif family.

For shared visual-system uniformity passes, keep the homepage, `characters.html` companion hub, shared public shell, and `public/content-studio/` aligned through one section-heading anatomy, the official `#ff96af` / `#ffb098` palette, matching pill-button geometry, circular or layered decorative primitives, and measured normal-flow spacing. Section labels use a small solid four-point petal or star centred to the text line. Compact accidental empty gaps while preserving deliberate breathing room. Do not use a shared-system pass to modify separately owned individual companion routes.

Homepage detail rules from founder review: keep the four “What is Maitri?” principles in a playful connected path; use separate low-opacity connector segments that terminate at each motif's background cutout, remain visually attached to neighbouring icons, and simplify to a quiet vertical trace on mobile. Keep the companion preview premium and normal-flow with equal portrait stages and transparent cutouts fully visible at every width. Keep section-level CTAs consistent with the hero’s filled pastel-crimson pill treatment, reserving the outline treatment for intentional secondary actions. Shared bottom-of-page waitlist sections must remain image-free across every public route; do not render the Manu doll or substitute another illustration there.

The public Story Library destination is `library.html`. Keep companion selection in one scalable left rail on desktop and stack that same selector before the catalog on small screens. Manu has the three confirmed titles; companions without confirmed Library material use an honest unavailable state. Covers should float independently of heavy card chrome, with their selection action conveyed by the cover itself rather than redundant preview or status labels. The selected companion remains borderless, using a slim solid accent, portrait emphasis, and text colour.

For a selected book with approved interior material, show one static quick-look UI across the content width: one portrait cover, up to two wide approved pages with page number and title only, and one compact selected-title block. Animate approved pages emerging from the cover, but disable that motion for reduced-motion users. Do not add a second cover, equal tall page cards, invented pages, a nested reader, internal controls, body copy, or internal scrolling. Cover-only titles stay cover-only.

Keep `story-universe.html` source and direct-route behaviour intact, but omit the unfinished Open World experience from public navigation and discovery. Homepage Library calls to action and book links lead to `library.html`, not Story Universe.

For Manu storybook spreads, do not use framed, scalloped, bordered, or panel-like text placeholders inside the illustration. Continue the painted scene across the spread, then create reading room by naturally reducing environmental detail, saturation, and contrast into an atmospheric wash. Keep each spread's copy concise at roughly 2–5 lines so the quiet image area remains part of the world rather than becoming a disguised text box.

The canonical website source for the completed Manu book package is `src/content/books/manuAndBadal.js`, exported through `src/content/books/index.js`. Future Story Library, Manu page, and Story Universe work should consume that source instead of duplicating book metadata or copy. Keep its current `horse` legacy alias during migration, preserve `publicRelease: "not-announced"`, and treat the 16 WebP spreads under `public/assets/books/manu-and-badal/spreads/` as website assets rather than final prepress artwork.
