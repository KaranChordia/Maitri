const siteBase = import.meta.env?.BASE_URL || "/";
const withBasePath = (path) => `${siteBase}${path.replace(/^\/+/, "")}`;

const sharedTextArea = Object.freeze({
  side: "right",
  treatment: "atmospheric-fade",
  minLines: 2,
  maxLines: 5,
});

const spread = ({ number, id, kind = "story", heading, filename, copyLines, alt }) => {
  const assetPath = `assets/books/manu-and-badal/spreads/${filename}`;

  return Object.freeze({
    number,
    id,
    kind,
    heading,
    copyLines: Object.freeze(copyLines),
    image: Object.freeze({
      assetPath,
      src: withBasePath(assetPath),
      alt,
      width: 1680,
      height: 600,
      aspectRatio: "2.8 / 1",
    }),
    textArea: sharedTextArea,
  });
};

const spreads = Object.freeze([
  spread({
    number: 1,
    id: "title-cover",
    kind: "cover",
    heading: "Manu & Badal",
    filename: "01-title-cover.webp",
    copyLines: [
      "Manu & Badal",
      "A Big, Brave Heart",
      "A story about quiet courage and growing trust.",
    ],
    alt: "Manu rests a gentle hand on Badal beside the Ganga at sunrise.",
  }),
  spread({
    number: 2,
    id: "courtyard-rule",
    heading: "The courtyard rule",
    filename: "02-courtyard-rule.webp",
    copyLines: [
      "In the courtyard, Manu watched the boys ride.",
      "Every hoofbeat made her step closer.",
      "She wanted to learn too.",
    ],
    alt: "Manu and her father watch children practise riding in a Bithoor courtyard.",
  }),
  spread({
    number: 3,
    id: "why-not",
    heading: "Why not?",
    filename: "03-why-not.webp",
    copyLines: [
      "“Girls do not need to ride,” someone said.",
      "Manu did not shout.",
      "She only asked, “Why not?”",
    ],
    alt: "Manu calmly asks why while holding a small river stone in her palm.",
  }),
  spread({
    number: 4,
    id: "badal-arrives",
    heading: "A horse named Badal",
    filename: "04-badal-arrives.webp",
    copyLines: [
      "Badal arrived restless and afraid.",
      "Everyone saw a difficult horse.",
      "Manu saw someone searching for safety.",
    ],
    alt: "A frightened Badal arrives at the stable while Manu watches with concern.",
  }),
  spread({
    number: 5,
    id: "quiet-answer",
    heading: "A quiet answer",
    filename: "05-quiet-answer.webp",
    copyLines: [
      "Manu waited by the stable door.",
      "She did not reach. She did not rush.",
      "Slowly, Badal's stamping stopped.",
    ],
    alt: "Manu waits patiently outside Badal's stall as he begins to settle.",
  }),
  spread({
    number: 6,
    id: "difficult-decision",
    heading: "A difficult decision",
    filename: "06-difficult-decision.webp",
    copyLines: [
      "“Badal may have to leave.”",
      "Manu held her little river stone.",
      "One tiny step, she remembered.",
    ],
    alt: "Manu listens at dusk as the adults consider whether Badal must leave.",
  }),
  spread({
    number: 7,
    id: "one-chance",
    heading: "One chance",
    filename: "07-one-chance.webp",
    copyLines: [
      "“Please give me one chance,” Manu said.",
      "“Not to force him.",
      "To help him trust.”",
    ],
    alt: "Manu asks her father and the stable master for one chance to help Badal.",
  }),
  spread({
    number: 8,
    id: "gentle-beginning",
    heading: "A gentle beginning",
    filename: "08-gentle-beginning.webp",
    copyLines: [
      "When Badal stepped back,",
      "Manu stepped back too.",
      "Trust cannot be pulled like a rope.",
    ],
    alt: "Manu brushes Badal gently while giving him room to move away.",
  }),
  spread({
    number: 9,
    id: "badal-chooses",
    heading: "Badal chooses",
    filename: "09-badal-chooses.webp",
    copyLines: [
      "The next morning, Badal came first.",
      "Manu held out her hand.",
      "He lowered his warm nose to meet it.",
    ],
    alt: "Badal lowers his nose to Manu's open hand in a moment of trust.",
  }),
  spread({
    number: 10,
    id: "slow-is-forward",
    heading: "Slow is still forward",
    filename: "10-slow-is-forward.webp",
    copyLines: ["They walked one careful circle.", "Then another.", "Slow was still forward."],
    alt: "Manu leads Badal through a careful circle while the courtyard watches.",
  }),
  spread({
    number: 11,
    id: "bravest-kind-of-strong",
    heading: "The bravest kind of strong",
    filename: "11-bravest-kind-of-strong.webp",
    copyLines: [
      "The courtyard saw a different kind of strength:",
      "courage that helped another heart feel safe.",
    ],
    alt: "Manu stands gratefully beside a peaceful Badal as the courtyard smiles.",
  }),
  spread({
    number: 12,
    id: "letter-dear-friend",
    kind: "letter",
    heading: "Dear friend",
    filename: "12-letter-dear-friend.webp",
    copyLines: [
      "Dear friend,",
      "you do not have to be loud to be strong.",
      "Ask. Listen. Learn. Begin.",
    ],
    alt: "Manu writes a letter beside Badal on the river steps at twilight.",
  }),
  spread({
    number: 13,
    id: "letter-one-kind-step",
    kind: "letter",
    heading: "One kind step",
    filename: "13-letter-one-kind-step.webp",
    copyLines: [
      "I was scared too.",
      "Courage was one kind step, then another.",
      "When you feel afraid, one kind step is enough.",
    ],
    alt: "Manu holds her finished letter close while Badal stands beside her at sunrise.",
  }),
  spread({
    number: 14,
    id: "activity-courage-crest",
    kind: "activity",
    heading: "Design your courage crest",
    filename: "14-activity-courage-crest.webp",
    copyLines: [
      "Design a crest that feels like you.",
      "Choose signs for brave, curious, kind,",
      "strong, or a good friend.",
    ],
    alt: "Manu plans a courage crest with natural pigments and simple craft materials.",
  }),
  spread({
    number: 15,
    id: "activity-courage-tracker",
    kind: "activity",
    heading: "Courage tracker",
    filename: "15-activity-courage-tracker.webp",
    copyLines: [
      "For seven days, mark one small brave act.",
      "Ask a question. Try again.",
      "Help someone feel safe. Wait patiently.",
    ],
    alt: "Manu places a marigold beside the first of seven empty tracker circles.",
  }),
  spread({
    number: 16,
    id: "activity-brave-promise",
    kind: "activity",
    heading: "My big, brave heart",
    filename: "16-activity-brave-promise.webp",
    copyLines: [
      "I promise to be brave when ______.",
      "Draw your promise beside these words.",
      "Brave can be gentle, too.",
    ],
    alt: "Manu and Badal invite the reader to make a brave promise at sunset.",
  }),
]);

export const manuAndBadalBook = Object.freeze({
  schemaVersion: 1,
  id: "manu-and-badal",
  slug: "manu-and-badal",
  legacyIds: Object.freeze(["horse", "manu-the-horse-nobody-could-ride"]),
  title: "Manu & Badal",
  subtitle: "A Big, Brave Heart",
  libraryTitle: "Manu: The Horse Nobody Could Ride",
  companionId: "manu",
  character: "Manu",
  premise: "Manu learns that courage can be patient, gentle, and strong enough to help another heart feel safe.",
  values: Object.freeze(["quiet courage", "patience", "trust", "kindness", "asking why"]),
  status: Object.freeze({
    source: "ready",
    illustrations: "complete",
    websiteIntegration: "ready-for-consumer",
    publicRelease: "not-announced",
    printProduction: "creative-master-needs-final-prepress",
  }),
  format: Object.freeze({
    interiorPages: 32,
    spreads: 16,
    pageSizeMm: Object.freeze([297, 210]),
    spreadSizeMm: Object.freeze([594, 210]),
    bleedMm: 3,
    layout: "landscape-double-page",
  }),
  visualDirection: Object.freeze({
    characterFocus: "left",
    copyPlacement: "right-atmospheric-fade",
    copyLength: "2-5 lines",
    framedTextPlaceholders: false,
  }),
  historicalFraming: Object.freeze({
    mode: "inspired-by",
    note: "A child-facing fictional story inspired by the childhood courage associated with Manikarnika, later remembered as Rani Laxmibai.",
    historicalReviewRequiredBeforePublication: true,
  }),
  cover: spreads[0].image,
  spreads,
  repositorySources: Object.freeze({
    creativeMasters: "output/imagegen/manu-and-badal/",
    conciseCopy: "output/imagegen/manu-and-badal/TEXT_DRAFT.md",
    promptRecord: "output/imagegen/manu-and-badal/PROMPTS.md",
    manuscriptProof: "output/pdf/maitri-manu-book/",
  }),
});

export default manuAndBadalBook;
