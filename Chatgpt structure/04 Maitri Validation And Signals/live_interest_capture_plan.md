# Maitri Live Interest Capture Plan

## Purpose

The website should identify real interest before heavy inventory investment. The first live capture flow is a waitlist plus parent survey, not a preorder form.

## Capture Fields

- Parent / guardian name.
- Email address.
- Child age range.
- Buyer segment: parent, grandparent/gift buyer, NRI family, educator/school, beta reader.
- Interest type: story newsletters, beta reading, school workshops, founder preorder updates.
- Story preference: brave adventure, friendship/kindness, history made personal, parent-child activities.
- Beta-reader interest: yes, maybe, no.
- School interest: yes, maybe, no.
- Preorder signal: curious, likely, need price/safety details first, not ready.
- Key objection or question.

## Monthly Report Fields

- Total signups.
- Signup count by buyer segment.
- Child age mix.
- Story preference mix.
- Beta-reader opt-ins.
- School interest count.
- Preorder signal count.
- Top objections or questions.
- Recommended next action.

## Website Behavior

- The static demo stores entries locally in the browser and can generate a local signal summary for review.
- The Sites-ready app should post entries to a server endpoint and store them in D1 when deployed.
- If the server endpoint is unavailable during local development, the form should fall back to browser-local storage so testing still works.

## Review Rule

The website can mention founder updates and preorder interest, but must not request payment or promise production timelines until product readiness, compliance, pricing, and delivery assumptions are clear.
