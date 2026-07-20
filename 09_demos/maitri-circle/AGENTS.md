# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

The homepage hero should lead with the overall Maitri Circle promise first: Maitri as a story-first companion universe where children befriend brave Indian heroines through story, play, and parent-child reflection. Manu should remain the first concrete companion and the next major section/CTA, not the homepage's only headline.

The homepage is a brand explanation before it is a feature showcase. Its durable content order is: overall Maitri promise, what Maitri is, what Maitri does/how the experience works, who it is for, then concise glimpses of Manu, the companion circle, the Story World, and the first box. Do not lead the homepage with a detailed Manu or product-box sequence before visitors understand the brand.

Keep the homepage composition free-flowing and contemporary. Avoid repeated square or rectangular cards, dashboard-like rows, and panels stacked edge-to-edge. Prefer connected paths, open editorial groupings, organic image crops, varied rhythm, and generous transitions that let the brand story feel like one authored journey.

The supplied Manu HTML/page recording is a content-architecture reference only. Preserve the existing Maitri visual system and do not copy its visual design, product claims, proof points, specifications, or release promises. On the Manu page, introduce Manu as a friend, establish Book 1 and its child activities before any future story journey, give parents clear development-stage reassurance, show only confirmed first-box contents, and end with future companion context followed by the waitlist.

Public companion routes are static Vite inputs under the `/Maitri/` base path: `characters.html` and `companions.html` are the hub, while `manu.html`, `savitribai.html`, and `kalpana.html` are individual companion pages. Keep these pages consumer-facing and avoid internal planning terms in visible copy.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

For `story-universe.html`, the world must load directly into the navigable 3D scene. Do not reintroduce a launch gate, layer panel, or "Enter World" button before the world is usable.

Clicked world locations must open authored Three.js interior scenes inside the canvas itself. React overlays should stay compact and support interaction, such as reading a selected book or returning to the world; they should not substitute for a 3D location with flat environment cards.

Hover treatment on the world should be minimal: show only the location name near the pointer, and keep the world, landmarks, camera, lighting, and location interiors as the primary experience.

The public Maitri Circle waitlist collects only name and email. Its free production backend is the bound Google Apps Script documented under `05_waitlist_preorder/google_sheets_waitlist/`, reached through the Vercel serverless route at `/api/waitlist`. Keep the honeypot, server-side validation, response-body verification, and explicit success/failure states intact. Never report a successful signup from a local-only fallback or expose the Apps Script URL or shared secret through a `VITE_` variable.

Treat the existing Outfit-led `Maitri` website wordmark as the official identity anchor unless the founder changes direction. Logo refinements should preserve the current word shape, weight, plum color, and friendly simplicity. Prefer subtle companion-circle details integrated with the two `i` letters over a separate geometric `M` badge or a wholesale wordmark redesign.

The selected logo direction is `A3 — Companion circle garland`: the two `i` dots anchor a shallow garland made entirely from brand-colour circles. Use this version for visiting-card exploration and later identity applications while keeping `Outfit` at weight `700` and letter-spacing `0` unchanged.
