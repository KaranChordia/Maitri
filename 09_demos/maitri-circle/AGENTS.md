# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

For `story-universe.html`, the world must load directly into the navigable 3D scene. Do not reintroduce a launch gate, layer panel, or "Enter World" button before the world is usable.

Clicked world locations must open authored Three.js interior scenes inside the canvas itself. React overlays should stay compact and support interaction, such as reading a selected book or returning to the world; they should not substitute for a 3D location with flat environment cards.

Hover treatment on the world should be minimal: show only the location name near the pointer, and keep the world, landmarks, camera, lighting, and location interiors as the primary experience.
