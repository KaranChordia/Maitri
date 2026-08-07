# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

The homepage hero should lead with the overall Maitri Circle promise first: Maitri as a story-first companion universe where children befriend brave Indian heroines through story, play, and parent-child reflection. Manu should remain the first concrete companion and the next major section/CTA, not the homepage's only headline.

The homepage is a brand explanation before it is a feature showcase. Its durable content order is: overall Maitri promise, what Maitri is, what Maitri does/how the experience works, who it is for, then concise glimpses of Manu, the companion circle, the Story World, and the first box. Do not lead the homepage with a detailed Manu or product-box sequence before visitors understand the brand.

For the current public homepage copy, follow the founder-provided five-part narrative in this order: “Every Great Adventure Begins with a Friend,” “What is Maitri?”, “Meet the Friends,” “Stories You’ll Read Together,” and “Be Among the First.” Preserve the existing premium visual system while keeping the wording and section hierarchy aligned to that approved source.

In the homepage “Stories You’ll Read Together” section, use one purpose-made premium illustration of girls sharing a book rather than a collage or repeated images from other sections. Present it as a simple circular or softly organic focal crop that supports the copy and connected story path.

Pair that reading illustration with an editorial view of the real titles currently available in the Story Library. Keep the books themselves recognisable as books, but style them with Maitri's light pastel paper tones, plum typography, circular motifs, and restrained depth rather than saturated standalone product-cover colours. Avoid generic process-point cards in this section, and keep its vertical rhythm compact enough that the library feels immediately connected to the section copy.

Keep the homepage composition free-flowing and contemporary. Avoid repeated square or rectangular cards, dashboard-like rows, and panels stacked edge-to-edge. Prefer connected paths, open editorial groupings, organic image crops, varied rhythm, and generous transitions that let the brand story feel like one authored journey.

Carry that same continuous, section-light design philosophy across public companion pages, especially `characters.html` and `manu.html`. Use one softly evolving page atmosphere, open editorial composition, and organic media; reserve visible containers for genuinely interactive controls rather than turning each narrative section into a rounded panel.

The supplied Manu HTML/page recording is a content-architecture reference only. Preserve the existing Maitri visual system and do not copy its visual design, product claims, proof points, specifications, or release promises. On the Manu page, introduce Manu as a friend, establish Book 1 and its child activities before any future story journey, give parents clear development-stage reassurance, show only confirmed first-box contents, and end with future companion context followed by the waitlist.

Public companion routes are static Vite inputs under the `/Maitri/` base path: `characters.html` and `companions.html` are the hub, while `manu.html`, `savitribai.html`, and `kalpana.html` are individual companion pages. Keep these pages consumer-facing and avoid internal planning terms in visible copy.

The public `about.html` route should explain Maitri through belief, story, and cultural care rather than company jargon. Keep Shwetika’s portrait, founder story, and personal note as clearly designed placeholders until she supplies the approved details; do not invent her biography.

Treat the homepage image system as the visual reference for every public page: use circular or softly organic image cutouts with a small number of offset rings, translucent layers, and restrained depth. Keep narrative sections borderless and connected through atmosphere, spacing, paths, and image rhythm; retain visible containment only for controls that own interactive state.

Do not use straight divider rules to organize Maitri narrative content. On companion pages, separate facts, values, prompts, book details, and box contents through whitespace, organic colour fields, circular markers, and typographic rhythm so adjacent sections remain visually seamless.

Give decorative circles and image-layer rings a clearly visible, unhurried ambient motion rather than leaving them static between hover interactions. Use enough travel, rotation, and breathing to be noticeable without competing with the content; preserve the stronger hover response, stagger the movement so the page does not pulse in unison, and disable non-essential motion for reduced-motion users.

Use one consistent headline treatment for public narrative-section eyebrows: larger title-case Josefin Sans text with a restrained brand-colour shimmer and a small companion-circle accent. Do not return to tiny all-caps labels or brush-stroke marker backgrounds; keep labels inside dense interactive controls compact and static.

On the homepage, keep every narrative-section eyebrow visibly large and do not place the former row of decorative dots beneath it. Brand the character collective as “Companions” in navigation, section headings, and discovery calls to action. The “Meet the Companions” section should include a creative, image-led preview of the current companion circle rather than stopping after introductory copy. Keep all companion preview portrait frames visually equal in size even when their source cutouts use different aspect ratios.

In the homepage “Stories You’ll Read Together” section, keep the reading illustration in the same softly asymmetrical, layered image-shape family as the hero artwork; do not revert it to a perfect circular crop.

On `manu.html`, use the same large, title-case narrative-section headline treatment as the homepage and omit the decorative dot row beneath those labels. Present both the selectable book thumbnails and the large active-book preview with the homepage image system’s softly asymmetrical crops, offset translucent layers, and restrained depth; do not return to sharp polygon cutouts or perfect ellipses.

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

The standalone pink motifs under `public/assets/brand/icons/svg/` (except `23.svg`, which is logo-only) are the approved decorative icon vocabulary. Render these individual SVGs directly, without bubbles, borders, shadows, coloured tiles, or enclosing shapes. The current homepage mapping is `26` friendship, `20` stories, `24` imagination, `18` values, `22` shared reading, and `25` waitlist. Retain conventional interface icons for controls whose meaning must remain immediately recognizable.
