# Maitri Next Phase: Current State and Decision Register

Prepared: 2026-07-14  
Purpose: establish the source-of-truth boundary for the next-phase execution before public-site, identity, storybook, or content work is treated as approved.

## Operating rule

The repository remains the durable source of truth. Trello is the accountability and review layer. Reference material may inform structure or exploration, but it does not become product truth, public copy, or a production commitment without explicit review.

## 1. Current state observed in the repository

### Programme and product

- Maitri is positioned as a story-first companion universe inspired by remarkable women from India.
- The active phase is narrower than a full launch: website interest capture, Manu's character universe, prototype development, and Instagram/YouTube presence.
- Manu is the first complete companion proof. The wider character ecosystem should not be developed ahead of a coherent Manu experience.
- The first-box direction currently documented is: doll, 32-page storybook, letter from Manu, six activity pages, and sticker pages.
- Accessories, playsets, additional books, schools/workshops, preorder payments, and heavier ecosystem features are sequenced future layers, not first-box dependencies.
- Important product decisions remain open, including target age band, price/cost ceilings, final physical specifications, illustration direction, sticker specification, and whether the letter/activity elements are bound or separate.

### Active website implementation at the start of this cycle

The default site is `09_demos/maitri-circle/`, served under the `/Maitri/` base path. At the start of this cycle, the rendered homepage sequence in `src/App.jsx` was:

1. Maitri Circle hero
2. Meet Manu
3. First Manu Box
4. For Families
5. Future Reading Circles
6. Waitlist
7. Footer

Observed implementation details:

- The homepage already preserves the required Maitri Circle-first hierarchy and introduces Manu as the first concrete companion.
- The header contains a `Join Waitlist` action, but the hero's two main actions are currently `Meet Manu` and `Explore Companions`; the waitlist is not the hero's primary action.
- Future Reading Circles still appears in three current user-facing places: primary navigation, the homepage `Schools` section, and the waitlist interest selector.
- The waitlist captures name, email, audience role, and one interest. It stores submissions in local browser storage and optionally posts to `VITE_MAITRI_WAITLIST_ENDPOINT` when configured.
- If the optional endpoint request fails, the current interface still saves locally and displays a joined state. A production capture destination, explicit failure policy, consent/privacy wording, and verification method are therefore still open.
- `characters.html` and `companions.html` resolve to the same companion hub. `manu.html` resolves to the current Manu detail page. A canonical public hub route has not been recorded.
- The current Manu detail page already contains a hero, wider book journey, first-box storybook previews, values, first-box contents, parent-facing explanation, and waitlist bridge.
- On the current Manu page, the six-book journey appears before the Book 1 / first-box story experience. The supplied page reference suggests the opposite content progression: meet Manu, understand Book 1, experience its story and activities, see the box, then preview the wider universe.
- The current Manu page includes visible development language and future-book material. Public copy approval and historical review remain required.
- The previous readiness plan records successful builds and responsive checks, but those results must be re-run after the approved implementation slice; this inventory does not treat them as current release evidence.

### First confirmed website slice implemented on 2026-07-14

The repository now contains a reviewable implementation of the confirmed first slice:

- `Join Waitlist` is the primary homepage hero action and `Meet Manu` is the secondary action.
- Future Reading Circles has been removed from homepage navigation, homepage content, the waitlist interest selector, and the Story Universe's public journey naming.
- The Manu detail page now presents: Meet Manu, Book 1, child activities, parent reassurance, confirmed first-box contents, future story directions, future companions, and the waitlist.
- The supplied Manu HTML and recording have not been used as visual or claim authority.
- The production build passes and all seven static HTML inputs are emitted.

This implementation is ready for browser and founder review. It does not close O-02, O-03, O-05, O-06, or G6: exact public-copy approval, durable waitlist capture, canonical route naming, deployed verification, and final release approval remain open.

### Working tree

- `git status` was clean at the start of this operating-control pass on 2026-07-14.
- No pre-existing uncommitted website work was found to reconcile.

## 2. Confirmed decisions and boundaries

These are carried directly from the next-phase execution brief and established repository decisions. They are safe planning inputs, not a substitute for final public-copy approval.

| ID | Confirmed decision or boundary | Execution consequence |
| --- | --- | --- |
| C-01 | Maitri Circle remains the homepage's overall promise; Manu is the first concrete companion. | Preserve the current homepage hierarchy. Do not turn the homepage into a Manu-only product page. |
| C-02 | Future Reading Circles is to be removed from the current website. | Remove it from navigation, homepage content, waitlist choices, and any linked copy; do not silently rename it into another future programme. |
| C-03 | `Join the waitlist` is the primary current-stage action. | Strengthen the hero and page-level CTA hierarchy around interest capture without implying preorder or availability. |
| C-04 | The supplied Manu page material is an information-architecture reference, not a visual-design authority. | Adapt the content progression into existing Maitri components, styles, and responsive behaviour. Do not clone the reference page. |
| C-05 | The identity idea is `companion + circle`. | Write and approve an identity brief before exploring distinct logo routes. Do not treat the circle as a navigation feature. |
| C-06 | The visiting card follows the selected identity route. | Do not produce final card art before a logo route and card details are approved. |
| C-07 | The physical storybook requires evidence and supplier input before production choices are final. | Compare viable routes, obtain samples/quotes, and make trade-offs visible before committing. |
| C-08 | Trello is the shared accountability layer; the repository is the durable source of truth. | Cards link to repo sources and approvals; durable decisions and specifications are recorded in the repo. |
| C-09 | Public claims require human review. | Do not publish unverified history or product, safety, compliance, price, production, preorder, delivery, or proof claims. |
| C-10 | One approved source should drive the content system. | Derive website/article, Instagram/Reels, and YouTube outputs from one approved story or founder insight. |

## 3. Reference-only inputs

The following sources may shape hierarchy, questions, or exploration. They are not approval evidence.

| Reference | Permitted use | Do not inherit without approval/evidence |
| --- | --- | --- |
| `10_source_context/shwetika_shared/2026-06-29_manu_doll/series_bible/Manu_Series_Bible.html` | Series-level content concepts, story arc questions, age-aware creator considerations, and possible recurring book anatomy. | Six-book commitment, titles, age progression, historical assertions, battle/death treatment, publishing claims, or final public wording. |
| `/Users/karanchordia/Downloads/screen-capture.webm` | Content progression and page pacing: meet Manu, personality, Book 1, story moments, grown-up reassurance, box, activities, wider journey, waitlist. | Visual design, exact specifications, product contents, proof points, dates, returns, manufacturing/safety claims, or unsupported historical claims. |
| Existing Manu story previews in `src/App.jsx` | Implementation inventory and a basis for review against approved story sources. | Final published copy or verified history. The source itself labels portions as preview/development material. |
| Earlier readiness and execution plans | Known risks, prior rationale, and sequencing context. | Current build/QA evidence, current deployment state, or founder approval not explicitly recorded. |

## 4. Must preserve

- Maitri Circle-first homepage hierarchy and the existing premium visual language.
- Manu-first product focus: one lovable, child-centred first companion before wide ecosystem expansion.
- Story-first relationship: the storybook is the emotional engine, not filler beside the doll.
- The approved first-box scope boundary and separation of future add-ons.
- Consumer-facing language; no internal planning, canon-management, prototype-lab, or process UI on public pages.
- Child-safe, warm, culturally rooted, parent-trusted tone.
- Clear separation between verified history, child-friendly interpretation, and inspired fictional scenes.
- No payment request or production/delivery promise at the waitlist stage.
- `/Maitri/` base-path compatibility until a deployment URL decision explicitly changes it.
- Existing user changes if the working tree becomes dirty during implementation; re-check before edits and do not overwrite unrelated work.
- Founder approval for public copy, sensitive historical material, identity selection, and product/manufacturing commitments.

## 5. Open decisions requiring Shwetika

| ID | Decision needed | Options / input required | Needed before |
| --- | --- | --- | --- |
| O-01 | Confirm first delivery priority and review order. | Website refinement first; or another workstream given precedence. Confirm owners and review dates. | Moving the first batch into `Ready to start`. |
| O-02 | Approve the exact hero promise and waitlist CTA copy. | Parent-friendly promise, primary `Join the waitlist` wording, supporting text, and secondary CTA. | Public-copy implementation/final review. |
| O-03 | Approve the Manu page content map. | Book 1-first progression; amount of personality content; number of story moments; placement of parent reassurance, activities, first box, and future books/companions. | Substantial Manu page restructuring. |
| O-04 | Decide the minimum website content layer. | No separate hub yet; a small Stories/Letters surface; or a larger content area. Select the source and ownership workflow before naming it publicly. | Adding Blogs, Stories, or Letters navigation/routes. |
| O-05 | Select the durable waitlist destination and operating owner. | Approved form/database/service, access owner, required fields, consent/privacy text, failure behaviour, and reporting destination. | Calling the waitlist production-ready. |
| O-06 | Select a canonical companion-hub route/name. | `Companions`, `Characters`, or another approved public label; retain compatibility redirects/inputs as needed. | Navigation/SEO finalisation. |
| O-07 | Approve the one-page identity brief. | Audience, emotional tone, companion + circle interpretation, palette/type cues, use cases, and exclusions. | Logo route exploration. |
| O-08 | Select one identity route. | Review genuinely distinct routes at favicon, header, social, and print size. | Vector finalisation and visiting-card design. |
| O-09 | Confirm storybook research inputs. | Target reader/age, parent-led vs independent reading, desired emotional pace, first-box constraints, indicative run and budget bands, and sampling authority. | Shortlisting a production route or requesting comparable quotes. |
| O-10 | Choose the first approved content source and approval cadence. | One Manu story or founder insight; historical reviewer if required; channels; review turnaround. | Producing the first reusable content pack. |
| O-11 | Approve cardholder and print inputs. | Name, title, phone/email, website/QR destination, card size, paper, finish, and quantity/budget. | Final visiting-card art. |

## 6. Working assumptions - not decisions

These assumptions allow planning to proceed but must not be represented as founder approvals.

- Karan owns audit, option development, implementation, documentation, and verification; Shwetika owns strategic trade-offs, public-copy approval, identity selection, and product/manufacturing commitments.
- The smallest safe website slice is: remove all Future Reading Circles references, make the waitlist CTA more prominent, and prepare/approve the Manu content map before a larger page restructuring.
- The current visual system and component library are sufficient for this phase; no redesign is required.
- Book 1 should be understood before the wider Manu series is previewed.
- A separate blog/content hub should not be built until its source workflow and minimum scope are approved.
- The existing 32-page first-box blueprint is a launch-direction input, not a locked manufacturing specification.
- Proposed card due dates in the Trello operating structure are planning targets and become commitments only when confirmed in the weekly review.

## 7. Decision register and Shwetika approval gates

| Gate | Decision / evidence | Status on 2026-07-14 | Shwetika action | Work released after approval |
| --- | --- | --- | --- | --- |
| G0 - Operating start | Priority order, owners, first review sequence, and feedback channel | Open | Confirm or amend O-01 and the Trello ritual. | First cards move from `Founder decisions` to `Ready to start`. |
| G1 - Website direction | Small homepage change list, exact waitlist copy, Manu content map, content-layer scope, canonical route, and capture destination | Partly confirmed; exact choices open | Approve O-02 through O-06 individually. | Public copy implementation, Manu restructuring, route/SEO changes, and production capture work. |
| G2 - Identity brief | Audience, companion + circle interpretation, tone, usage tests, and exclusions | Direction confirmed; brief approval open | Approve O-07. | Distinct logo route exploration. |
| G3 - Identity selection | Route comparison and small-size tests | Not started; no route selected | Select one route or request one bounded revision. | Vector refinement and visiting-card design. |
| G4 - Storybook approach | Research question set, viable routes, supplier/sample evidence, cost drivers, and trade-offs | Existing blueprint only; production decision open | Approve O-09, then select a route only after evidence review. | Supplier-ready specification and sample/quote next steps. |
| G5 - Content pilot | Approved source, history boundary, reusable derivatives, approval flow, and cadence | Open | Approve O-10 and the first source pack. | Reusable website/social/video production. |
| G6 - Release | Public copy approval, responsive/browser QA, route checks, real capture verification, and no unsupported claims | Not ready | Give final publish approval after evidence is attached to the review card. | Publish/deploy the approved slice. |

### Decision logging rule

For every gate, record the date, decision-maker, decision, affected files/cards, and any expiry/review condition in the repository. A Trello comment or chat message may trigger work, but a durable decision must be reflected here or in the relevant approved specification before the card is closed.
