# Maitri World Direction

## Purpose

This document defines the intended long-term direction for the Maitri Circle interactive world in `09_demos/maitri-circle/`.

It is meant to be a stable reference for future design and implementation work so the prototype does not drift into a generic landing page or a disconnected set of interactive scenes.

The target is not "a site with some 3D." The target is a world-first Maitri experience where navigation, storytelling, product understanding, and emotional positioning all happen through one branded environment.

## Strategic Reference

This direction is informed by the interaction model used on `https://brand.ledger.com/`, specifically:

- a navigable branded world instead of a brochure
- distinct named zones with clear roles
- guided exploration through missions and collectibles
- strong use of light, camera movement, and HUD framing
- a feeling that the user has entered a system, not just opened a page

Maitri should borrow the system design, not the cyber or industrial aesthetic.

## Core Translation For Maitri

Ledger's "city" should translate into Maitri's "story world."

That means:

- the experience should feel like entering a miniature story town
- the world should express courage, kindness, curiosity, and Indian storytelling heritage
- the places in the world should explain Maitri's offering before the user reads much copy
- the interaction should feel invitational, warm, and memorable rather than technical

The right emotional target is:

"A story-rich world children want to enter, and parents immediately understand."

## What The World Must Do

The interactive world should eventually become the main explanatory surface for Maitri.

It should communicate:

- who Maitri is
- who Manu is
- what the first box includes
- how story, play, and values connect
- how parents and schools participate
- how future characters can expand the universe without changing the system

## Existing Base In The Prototype

The current prototype already contains the correct base structure:

- a 3D world map in `src/StoryUniverse.jsx`
- five world destinations:
  - `Library`
  - `Bazaar`
  - `Classroom`
  - `River Town`
  - `Hillside`
- inventory logic
- location entry and return flows
- camera controls
- interior scene transitions for selected destinations

This means the correct next step is to elevate the current world, not replace it.

## North Star Experience

The user should feel the following sequence:

1. They arrive at a beautiful, living Maitri world.
2. The world itself makes them curious.
3. A guided path shows them where to begin.
4. Each location reveals one part of Maitri's value.
5. By the end, they understand the first box, the emotional tone, and the wider universe.

The world should be able to support both free exploration and guided journeys.

## Creative Principles

### 1. World-first, not section-first

The world is the primary interface. Supporting panels should exist, but they should explain what the world already introduces.

### 2. Softly cinematic

Camera, lighting, haze, and motion should create emotional depth without becoming aggressive or game-like.

### 3. Warm and handcrafted

Materials, colors, and forms should feel story-made, tactile, and human. Avoid cold sci-fi surfaces.

### 4. Child wonder with parent clarity

The world should delight children, but the information architecture should still make sense to parents on first pass.

### 5. One place, one role

Every destination must have a distinct narrative and product job. No decorative zones without meaning.

### 6. Discoverability with purpose

Collectibles, hidden objects, and small interactions should reinforce the story and product system, not distract from it.

## Desired Aesthetic Language

Maitri should not imitate Ledger's visual tone directly.

Borrow:

- structured exploration
- camera choreography
- mini-map logic
- mission framing
- world silhouette as brand asset
- light as hierarchy

Do not borrow:

- cold monochrome futurism
- techno-military HUD density
- industrial texture language
- emotionally distant product framing

Maitri's equivalent should be:

- river light
- lantern glow
- textile banners
- wood, stone, paper, brass, and painted surfaces
- miniature architecture with clear Indian cues
- dawn and evening atmospheres

## World Structure

The current destinations should remain the system base.

### River Town

Role:

- emotional center of the world
- first place the camera orients around
- best entry point for story-led journeys

What it should explain:

- Maitri is a living story world
- Manu's universe is rooted in place, memory, and values
- movement through the world is part of the storytelling

Signature elements:

- bridge crossings
- water shimmer
- festival lamps
- boat letters
- stepping stones
- central path markers

### Library

Role:

- story and reading anchor
- home of books, letters, read-alouds, and future character archives

What it should explain:

- Maitri is story-first
- the books are not accessories to the doll; they are core to the experience

Signature elements:

- glowing shelves
- stacked story lanterns
- rotating book displays
- character letter desk
- read-aloud spotlight moments

### Bazaar

Role:

- product and keepsake anchor
- place where accessories, journals, outfit pieces, and first-box objects become tangible

What it should explain:

- Maitri is a story-product system, not just a book and not just a doll
- objects carry meaning from the story world

Signature elements:

- fabric canopies
- story objects on tables
- keepsake displays
- accessory stalls
- gift wrapping or promise-tag details

### Classroom

Role:

- school and teacher anchor
- where the educational layer becomes visible

What it should explain:

- Maitri can live in classrooms, circles, and guided learning environments
- values-based learning is built into the system

Signature elements:

- chalkboard or painted lesson walls
- activity rugs
- value tokens
- read-together circle area
- teacher prompt boards

### Hillside

Role:

- calm, reflective, parent-child anchor
- the quiet counterbalance to the busier world spaces

What it should explain:

- Maitri is not only about excitement; it also creates space for reflection, emotional safety, and values

Signature elements:

- tree shade
- resting stones
- nature objects
- promise lanterns
- reflective prompts

## Interaction System

The world should move from "click a place and open content" to "enter a place and participate in a guided micro-experience."

### Primary interaction layers

1. Exploration
   The user moves through the world and learns what each place is.

2. Focus mode
   The camera moves into a destination and reveals its local experience.

3. Guided journeys
   The user chooses a route such as:
   - `Start with Manu`
   - `Build the First Box`
   - `For Parents`
   - `For Schools`

4. Discovery loop
   The user finds meaningful objects, letters, story tokens, or keepsakes.

### Inventory system direction

The current inventory concept should stay, but the meaning should deepen.

Inventory should eventually include:

- story objects
- letters
- values tokens
- box components
- keepsakes collected during guided journeys

The inventory should feel like a memory satchel, not a commerce cart.

## HUD Direction

Ledger uses HUDs as a brand extension. Maitri should do the same in its own tone.

Maitri's HUD should feel like a story compass rather than a tactical overlay.

Recommended HUD components:

- mini-map
- current journey
- collected keepsakes count
- gentle progress state
- current location badge
- return-to-world control

Visual language:

- soft borders
- parchment, painted, or brass-inspired accents
- clear labeling
- restrained ornament
- no aggressive sci-fi paneling

## Camera Direction

Camera behavior is central to the experience and should become a deliberate design system.

### Entry

Begin with a cinematic fly-in or settling movement over the world instead of starting in a static neutral pose.

### Orientation

The camera should help the user understand hierarchy:

- first the whole world
- then the center
- then the chosen district
- then the micro-scene

### Focus

Clicking or selecting a place should trigger a meaningful move, not just an instant state change.

### Return

Returning to the map should feel graceful and spatially clear.

## Lighting Direction

Light should become the main hierarchy tool, as Ledger explicitly does in its own guidelines.

For Maitri, light should communicate emotion and focus.

Use light to:

- pull attention toward key destinations
- distinguish emotional mood by zone
- communicate time-of-day richness
- make discoveries feel rewarding

Recommended emotional lighting:

- River Town: reflective dawn or festival glow
- Library: warm interior lamp light
- Bazaar: lively fabric-filtered sunlight
- Classroom: bright, open, optimistic daylight
- Hillside: calm, golden or late-afternoon quiet

## World Silhouette

One of the most important improvements is to give the whole world a stronger memorable shape from afar.

The current world should evolve toward a branded silhouette that feels recognizably Maitri even in one frame.

Possible silhouette systems:

- a river-loop composition
- a lotus-like radial town
- a fort-and-river composition inspired by Manu's world
- a story-island with clearly staged landmark clusters

The final choice should optimize for:

- recognizability
- clean camera reads
- destination clarity
- emotional warmth

## Mission System

The mission structure is one of the strongest ideas to borrow from Ledger.

For Maitri, missions should not feel like game tasks. They should feel like guided story invitations.

Recommended first missions:

- `Start with Manu`
- `Find the Brave Promise`
- `Build the First Box`
- `Explore with Your Child`
- `See How Schools Use Maitri`

Each mission should have:

- clear start point
- 3 to 5 stops
- one collected object or outcome
- a simple completion state

## Collectibles

Hidden and discoverable items should support the brand system.

Good collectible categories:

- river stones with values
- letters
- story stamps
- companion objects like Badal
- first-box keepsakes
- festival tokens

Bad collectible categories:

- random decorative items with no narrative role
- abstract gamification points

## Recommended Build Phases

### Phase 1: Presentation Upgrade

Goal:

Make the existing world feel more cinematic and more branded without changing the full system.

Work:

- improve the opening camera sequence
- improve default lighting and atmosphere
- strengthen the overall silhouette
- refine destination emphasis through light and motion
- improve visual depth with haze, layered props, and ambient animation

### Phase 2: Navigation Upgrade

Goal:

Make the world itself the main information architecture.

Work:

- add a true mini-map
- add journey selection
- add clearer location states
- make destination entry feel more intentional
- reduce reliance on flat explanatory panels

### Phase 3: Story and Product Upgrade

Goal:

Turn each destination into a meaningful narrative and product explainer.

Work:

- deepen Library interactions
- deepen Bazaar product storytelling
- deepen Classroom school use cases
- deepen Hillside reflection prompts
- strengthen River Town as the emotional anchor

### Phase 4: Guided Mission Layer

Goal:

Support first-time users who need a structured path.

Work:

- add starter journeys
- add collected keepsake outcomes
- add progress states
- add simple completion feedback

### Phase 5: Performance and Mobile Polish

Goal:

Keep the world premium on real devices.

Work:

- reduce geometry and material cost where needed
- tune transitions for touch
- simplify effects on smaller screens
- preserve the same emotional arc on mobile

## Implementation Priorities For The Current Codebase

If this direction is implemented against the current prototype, the likely first touchpoints are:

- `src/StoryUniverse.jsx`
  - camera choreography
  - destination entry behavior
  - mission and inventory evolution
  - world composition adjustments
- `src/storyUniverse.css`
  - HUD treatment
  - stage overlays
  - destination state presentation
- `src/App.jsx`
  - how the broader site frames and links into the world

## Success Criteria

This direction is successful when:

- the world feels like the main Maitri experience, not a side feature
- the user can understand Maitri through places rather than paragraphs
- Manu's world feels emotionally specific and memorable
- parents can understand the first-box system through exploration
- the design remains warm, Indian, story-first, and non-generic
- future characters can plug into the same world system cleanly

## Non-Goals

This direction does not aim to:

- mimic Ledger's aesthetic literally
- turn Maitri into a game-first product
- overcomplicate the experience with dense controls
- prioritize spectacle over clarity
- add more world surface area before Manu's first-box story is clear

## Working Summary

Use this line as the short reference:

Maitri's interactive world should evolve into a cinematic, story-first miniature town where exploration explains the brand, the first box, and the emotional universe through warm destinations, guided journeys, and meaningful keepsakes.
