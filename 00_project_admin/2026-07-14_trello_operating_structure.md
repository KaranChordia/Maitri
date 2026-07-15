# Maitri Next Phase: Trello Operating Structure

Prepared: 2026-07-14  
Board name: `Maitri - Next Phase Delivery`  
Purpose: make ownership, founder decisions, review evidence, and closure visible without replacing repository source files.

## 1. Exact board lists

Create the lists in this order and do not add parallel status lists:

1. **Founder decisions**
   - Cards blocked on a strategic choice, public-copy approval, identity selection, budget, product commitment, or external access from Shwetika.
   - The card title begins with `[DECISION]` and states the one choice required.
2. **Ready to start**
   - Scope, owner, source links, due date, and definition of done are complete.
   - Any prerequisite founder decision is recorded, not merely implied in chat.
3. **In progress**
   - The owner is actively working on the card.
   - Work-in-progress limit: one active card per owner unless the weekly review explicitly records an exception.
4. **Awaiting Shwetika review**
   - A reviewable artifact or preview exists.
   - The card contains one precise decision/feedback request and the evidence needed to answer it.
5. **Approved / ready to publish**
   - Shwetika has approved the scoped output, but publishing, deployment, printing, supplier commitment, or final QA may still remain.
   - Approval date and conditions are written in the card.
6. **Done / archived**
   - Definition of done is fully met, durable files/decisions are stored in the repo, and any publish/verification requirement has passed.
   - `Done` never means merely drafted or sent for review.

## 2. Board fields, labels, and naming

### Required custom fields

- **Owner** - one accountable person.
- **Due date** - a real date; proposed dates become commitments only after weekly confirmation.
- **Workstream** - Operating, Website, Identity, Storybook, or Content.
- **Approval gate** - G0 through G6, or `None`.
- **Repository artifact** - path or pull/commit link to the durable output.

### Labels

- `Operating control`
- `Website`
- `Identity + collateral`
- `Physical storybook`
- `Content system`
- `Founder decision`
- `Public claim review`
- `Blocked - external input`

Labels describe the card; lists describe its state.

### Card-title format

`[WORKSTREAM-ID] Verb + concrete outcome`

Examples:

- `[WEB-01] Remove Future Reading Circles from every current website surface`
- `[DECISION][ID-03] Select one logo route for refinement`

## 3. Required card template

Copy this into every delivery card.

```markdown
## Desired outcome
One sentence describing the user, business, or operating result.

## Owner
One accountable person. Contributors may be listed separately.

## Due date
YYYY-MM-DD. State `proposed` until confirmed in weekly review.

## Source / reference links
- Repository source-of-truth path(s)
- Reference-only input(s), clearly labelled
- Related decision-register ID and approval gate

## Scope
- Included
- Excluded

## Definition of done
- Observable acceptance check
- Required review/QA evidence
- Durable repository artifact or recorded decision

## Decision or feedback needed
One precise question, or `None - decision already recorded as [ID]`.

## Review evidence
- Preview, screenshot, test result, quote/sample comparison, or source link
- Risks / unsupported claims checked

## Decision record
Date, decision-maker, decision, conditions, and affected cards/files.
```

### Review-card rule

Do not move a card to `Awaiting Shwetika review` with a general request such as “thoughts?”. Ask for one bounded action: approve, select, reject with reason, or answer one named question.

## 4. Weekly founder review ritual

Cadence: one 30-minute review each week; day/time to be confirmed at G0. Karan prepares the board before the call. Shwetika makes or defers the decisions explicitly.

### Before the review - Karan, by the previous working day

1. Update owners, due dates, source links, and evidence.
2. Move only genuinely reviewable cards into `Awaiting Shwetika review`.
3. Put decision cards in priority order; each must contain one question and a recommendation where appropriate.
4. Post a four-line board summary:
   - Moved this week
   - Founder decisions needed
   - Blocked / at risk
   - Next if approved

### During the review - 30 minutes

1. **5 minutes - movement:** confirm what reached Done and what did not.
2. **15 minutes - decisions:** handle `Founder decisions` and `Awaiting Shwetika review` from top to bottom.
3. **5 minutes - blockers:** assign the next action and owner for each blocker.
4. **5 minutes - next week:** confirm priority order, owners, and due dates for cards moving to `Ready to start`.

### After the review - Karan, same working day

1. Record each decision, date, decision-maker, and conditions on its card.
2. Update the repository decision register or relevant durable specification.
3. Move approved cards to the correct list; do not collapse approval and publication into one step.
4. Send one link to the updated board rather than starting a second feedback thread.

### Feedback protocol

- Trello is the single operational feedback channel for scoped work.
- Repository files hold durable decisions, source material, specifications, and implementation.
- If feedback arrives elsewhere, Karan copies the actionable decision onto the relevant card and asks for confirmation when the wording is ambiguous.
- New ideas become new cards; they do not silently expand an active card.

## 5. First implementation-ready card set

Dates below are proposed sequencing targets, not founder-approved commitments. G0 confirms the priority order and dates.

Implementation note, 2026-07-14: the repository already contains a reviewable first website slice covering WEB-01 and draft implementations for WEB-02 through WEB-04. When the Trello board is created, load WEB-01 with its build/search evidence and place it in `Awaiting Shwetika review` until browser review is attached. Load WEB-02 through WEB-04 as review cards rather than treating their current code as final founder-approved copy or hierarchy.

### Workstream A - Operating rhythm

#### [OPS-01] Confirm next-phase priority order, owners, and review cadence

- **List:** Founder decisions
- **Owner:** Shwetika
- **Proposed due:** 2026-07-15
- **Source:** `00_project_admin/2026-07-14_next_phase_current_state_and_decision_register.md`; Gate G0
- **Desired outcome:** Release a bounded first work batch with one review path.
- **Definition of done:** Shwetika confirms the workstream order, named owners, weekly review day/time, and first review sequence; Karan records the decision in the repo and updates card dates.
- **Decision needed:** Approve or amend O-01.

#### [OPS-02] Create the board and load the approved first card batch

- **List:** Ready to start after OPS-01
- **Owner:** Karan
- **Proposed due:** 2026-07-15
- **Source:** This operating structure; Gate G0
- **Desired outcome:** Give all next-phase work one visible accountability layer.
- **Definition of done:** Exact six lists, fields, labels, card template, WIP rule, and approved first cards exist; every card has an owner, due date, source, DoD, and one decision/feedback field.
- **Decision needed:** None after OPS-01.

#### [OPS-03] Run and record the first weekly founder review

- **List:** Ready to start after cadence confirmation
- **Owner:** Karan
- **Proposed due:** 2026-07-17
- **Source:** Weekly ritual above; Gate G0
- **Desired outcome:** Prove the review/decision loop works before the programme expands.
- **Definition of done:** Four-line summary posted, decisions recorded, repo register updated, cards moved accurately, and next-week dates confirmed.
- **Decision needed:** Shwetika attends or responds to the bounded review cards.

### Workstream B - Website refinement

#### [WEB-01] Remove Future Reading Circles from every current website surface

- **List:** Ready to start
- **Owner:** Karan
- **Proposed due:** 2026-07-15
- **Source:** `09_demos/maitri-circle/src/App.jsx`; C-02; Gate G1
- **Desired outcome:** Keep the live journey focused on the current Manu and waitlist purpose.
- **Scope:** Remove `Reading Circles` from primary navigation, the `Schools` homepage section, and `Reading circle interest` from the waitlist selector; check for linked copy/anchors and remove dead navigation.
- **Definition of done:** Repository search finds no user-facing Future Reading Circles language; homepage and waitlist render without gaps/dead anchors; desktop/mobile smoke check passes; no replacement future programme is added.
- **Decision needed:** None - removal is confirmed as C-02. Any proposed replacement is a separate decision card.

#### [WEB-02] Approve and implement the waitlist-first hero hierarchy

- **List:** Founder decisions, then Ready to start
- **Owner:** Karan
- **Proposed due:** 2026-07-17
- **Source:** Current homepage hero in `src/App.jsx`; C-01 and C-03; O-02; Gate G1
- **Desired outcome:** Explain Maitri plainly and make `Join the waitlist` the unmistakable current-stage primary action while keeping Manu accessible.
- **Definition of done:** Approved promise/CTA copy is implemented in the existing design; Maitri Circle remains the hero premise; waitlist is primary; a sensible Manu secondary path remains; desktop/mobile and keyboard checks pass.
- **Decision needed:** Shwetika approves the exact hero promise, primary CTA copy, supporting copy, and secondary CTA.

#### [WEB-03] Approve the Manu page content map

- **List:** Awaiting Shwetika review after map is attached
- **Owner:** Karan
- **Proposed due:** 2026-07-16
- **Source:** `manu.html` implementation in `src/App.jsx`; `Manu_Series_Bible.html` and `screen-capture.webm` as reference-only; O-03; Gate G1
- **Desired outcome:** Agree the page hierarchy before substantial restructuring.
- **Definition of done:** Map shows existing content as keep/move/rewrite/remove/review; proposed order covers hero, personality, Book 1, story moments, activities, parent reassurance, first box, wider journey, and waitlist; each claim is tagged approved, needs history review, needs founder review, or reference-only.
- **Decision needed:** Shwetika approves the hierarchy and identifies which Book 1/story details are public-ready.

#### [WEB-04] Adapt the approved Manu map into the existing design system

- **List:** Ready to start after WEB-03
- **Owner:** Karan
- **Proposed due:** 2026-07-21
- **Source:** Approved WEB-03 map; `src/App.jsx`, `src/styles.css`, `src/character-page.css`; C-04; Gate G1
- **Desired outcome:** Make Manu feel like a coherent extension of Maitri rather than a copied reference page or development document.
- **Definition of done:** Book 1 is understood before future books/companions; existing visual language is preserved; internal/development language is removed or appropriately framed; responsive, keyboard, route, build, console, image, and overflow checks pass; unsupported claims are absent.
- **Decision needed:** None beyond the approved content map; new copy claims return to founder review.

#### [WEB-05] Select and verify a durable waitlist capture path

- **List:** Founder decisions
- **Owner:** Karan
- **Proposed due:** 2026-07-18
- **Source:** `src/App.jsx`; `05_waitlist_preorder/live_interest_capture_plan.md`; O-05; Gate G1/G6
- **Desired outcome:** Ensure a valid signup reaches an approved durable destination and failures are not presented as successful production capture.
- **Definition of done:** Service and data owner selected; required fields and consent/privacy text approved; success/failure behaviour defined; end-to-end submission verified at the intended deployed URL; reporting/export access confirmed.
- **Decision needed:** Shwetika selects the destination, grants/assigns access, and approves data fields and privacy wording.

#### [WEB-06] Decide the minimum Stories / Letters content architecture

- **List:** Founder decisions
- **Owner:** Shwetika
- **Proposed due:** 2026-07-18
- **Source:** O-04; content-system cards below; Gate G1
- **Desired outcome:** Avoid building a content hub without a source and maintenance workflow.
- **Definition of done:** Choose no separate hub yet, a bounded Stories/Letters MVP, or a larger approved scope; name source owner, minimum content count, update cadence, and navigation label.
- **Decision needed:** Approve one option and its maintenance owner.

#### [WEB-07] Select the canonical companion hub route and public label

- **List:** Founder decisions
- **Owner:** Shwetika
- **Proposed due:** 2026-07-18
- **Source:** `characters.html`, `companions.html`, current routing in `src/App.jsx`; O-06; Gate G1
- **Desired outcome:** Give navigation and SEO one stable public name while preserving compatible routes as needed.
- **Definition of done:** Canonical label/route selected; implementation card records redirect/static-input, metadata, sitemap, and internal-link changes required.
- **Decision needed:** Select `Companions`, `Characters`, or another approved label.

### Workstream C - Brand identity and collateral

#### [ID-01] Approve the companion + circle identity brief

- **List:** Awaiting Shwetika review after draft is attached
- **Owner:** Karan
- **Proposed due:** 2026-07-17
- **Source:** C-05; current website palette/type cues; O-07; Gate G2
- **Desired outcome:** Give logo exploration a shared strategic test rather than a decorative prompt.
- **Definition of done:** One-page brief defines brand name, audience, companion + circle meaning, desired emotion, existing visual cues, favicon/header/social/card use cases, and exclusions; Shwetika approves or amends it.
- **Decision needed:** Approve the brief before routes are generated.

#### [ID-02] Explore three genuinely distinct identity routes

- **List:** Ready to start after ID-01
- **Owner:** Karan
- **Proposed due:** 2026-07-22
- **Source:** Approved ID-01; Gate G3
- **Desired outcome:** Compare meaningfully different systems, not minor stylistic variants.
- **Definition of done:** Three routes include rationale, wordmark/mark relationship, one-colour behaviour, and tests at favicon, website header, social profile, and visiting-card size; no route is called final.
- **Decision needed:** Shwetika selects one route or requests one bounded revision.

#### [ID-03] Select one identity route for refinement

- **List:** Founder decisions
- **Owner:** Shwetika
- **Proposed due:** 2026-07-24
- **Source:** ID-02 comparison; O-08; Gate G3
- **Desired outcome:** Release one route for vector refinement and collateral.
- **Definition of done:** Selected route, required changes, rejected-route rationale, and approval conditions are recorded.
- **Decision needed:** Select one route or explicitly defer.

#### [ID-04] Confirm visiting-card content and print inputs

- **List:** Founder decisions after ID-03
- **Owner:** Shwetika
- **Proposed due:** 2026-07-24
- **Source:** O-11; selected identity route; Gate G3
- **Desired outcome:** Prevent invented contact details or generic print decisions.
- **Definition of done:** Name, title, phone/email, website/QR destination, size, stock, finish, quantity, and budget/print owner are confirmed.
- **Decision needed:** Approve all cardholder and production inputs.

### Workstream D - Physical storybook research

#### [BOOK-01] Approve the first-storybook research question set

- **List:** Founder decisions
- **Owner:** Karan
- **Proposed due:** 2026-07-17
- **Source:** First-box and 32-page blueprints; O-09; Gate G4
- **Desired outcome:** Research the child and product experience actually intended, not a generic children's book.
- **Definition of done:** Target reader/age, reading mode, emotional pace, illustration density, first-box constraints, indicative print run/budget bands, sampling authority, and must-test questions are recorded.
- **Decision needed:** Shwetika confirms or bounds the inputs; unresolved values remain labelled assumptions.

#### [BOOK-02] Compare two to three viable production routes

- **List:** Ready to start after BOOK-01
- **Owner:** Karan
- **Proposed due:** 2026-07-23
- **Source:** Approved BOOK-01; existing 32-page direction as a baseline, not a lock; Gate G4
- **Desired outcome:** Make format, durability, cost drivers, and child experience comparable before choosing.
- **Definition of done:** Matrix covers trim/orientation, page count, paper, cover, binding, colour, safety/durability questions, sampling, run assumptions, timelines, Indian production path, cost drivers, trade-offs, and recommendation; every supplier fact is sourced or labelled pending quote.
- **Decision needed:** None during research; route selection belongs to BOOK-03.

#### [BOOK-03] Select a route for samples and comparable printer quotes

- **List:** Founder decisions after BOOK-02
- **Owner:** Shwetika
- **Proposed due:** 2026-07-25
- **Source:** BOOK-02 evidence; Gate G4
- **Desired outcome:** Authorise a bounded evidence-gathering step without declaring the format final.
- **Definition of done:** One route (or two finalists) selected; sample/quote budget and decision deadline confirmed; identical quote questions and quantities approved.
- **Decision needed:** Choose route(s), budget range, and who may contact/commit to suppliers. No manufacturing commitment is implied.

### Workstream E - Content system

#### [CONTENT-01] Select the first approved source for the content pilot

- **List:** Founder decisions
- **Owner:** Shwetika
- **Proposed due:** 2026-07-18
- **Source:** Manu story sources or one founder insight; O-10; Gate G5
- **Desired outcome:** Anchor all channel outputs in one approved narrative.
- **Definition of done:** Source version/path selected; public-use boundary, historical-review requirement, sensitive claims, audience, and desired action recorded.
- **Decision needed:** Approve one source and its claim/history boundary.

#### [CONTENT-02] Build one source-to-distribution pilot pack

- **List:** Ready to start after CONTENT-01
- **Owner:** Karan
- **Proposed due:** 2026-07-22
- **Source:** Approved CONTENT-01; existing social calendar and Letters from Maitri; Gate G5
- **Desired outcome:** Prove that one story can become coherent website/article, Instagram/Reels, and YouTube Short material.
- **Definition of done:** Pack includes source summary, website/article version, Instagram/Reels concept, YouTube Short concept, asset needs, claim checks, CTA, and reusable template; variants preserve the same story rather than inventing unrelated posts.
- **Decision needed:** Shwetika approves the pack, tone, and public claims.

#### [CONTENT-03] Approve the repeatable publishing cadence and review SLA

- **List:** Founder decisions after CONTENT-02
- **Owner:** Shwetika
- **Proposed due:** 2026-07-24
- **Source:** Reviewed pilot pack; Gate G5
- **Desired outcome:** Set a sustainable cadence from demonstrated effort and approval capacity.
- **Definition of done:** Minimum cadence, channel order, source owner, reviewer, review turnaround, historical escalation path, and performance review rhythm are recorded.
- **Decision needed:** Approve cadence and reviewer availability; do not assume a high-frequency schedule.

## 6. Closure checks by workstream

- **Operating:** decision is recorded durably, not only in a Trello comment.
- **Website:** approved copy, build, responsive/browser, accessibility basics, direct-route refresh, console, image, overflow, and real capture checks are attached.
- **Identity:** rationale and small-size/one-colour tests are attached; final route has explicit founder selection.
- **Storybook:** sources, assumptions, supplier responses, comparable quote inputs, sample findings, and trade-offs are visible.
- **Content:** source version, claim boundary, derivatives, approvals, and publishing result are linked.

No card moves to `Done / archived` while a required founder approval, external verification, or publication check remains open.
