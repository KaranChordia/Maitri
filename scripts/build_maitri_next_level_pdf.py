from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "maitri_next_level_foundation_plan.pdf"


PAGE_W, PAGE_H = LETTER
MARGIN_X = 0.72 * inch
MARGIN_Y = 0.68 * inch

INK = colors.HexColor("#21302b")
MUTED = colors.HexColor("#5f6f68")
TEAL = colors.HexColor("#21726d")
ROSE = colors.HexColor("#a84e5f")
AMBER = colors.HexColor("#b17422")
VIOLET = colors.HexColor("#6d5aa8")
PAPER = colors.HexColor("#fbf8f1")
MIST = colors.HexColor("#eef5f1")
BLUSH = colors.HexColor("#f7eef0")
GOLD_WASH = colors.HexColor("#fbf0dd")
LINE = colors.HexColor("#d8ded5")


def style_sheet():
    base = getSampleStyleSheet()
    styles = {}
    styles["title"] = ParagraphStyle(
        "Title",
        parent=base["Title"],
        fontName="Helvetica-Bold",
        fontSize=30,
        leading=34,
        textColor=INK,
        alignment=TA_LEFT,
        spaceAfter=16,
    )
    styles["subtitle"] = ParagraphStyle(
        "Subtitle",
        parent=base["BodyText"],
        fontName="Helvetica",
        fontSize=13,
        leading=18,
        textColor=MUTED,
        spaceAfter=18,
    )
    styles["eyebrow"] = ParagraphStyle(
        "Eyebrow",
        parent=base["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=11,
        textColor=TEAL,
        uppercase=True,
        spaceAfter=8,
    )
    styles["h1"] = ParagraphStyle(
        "H1",
        parent=base["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=17,
        leading=21,
        textColor=INK,
        spaceBefore=16,
        spaceAfter=8,
    )
    styles["h2"] = ParagraphStyle(
        "H2",
        parent=base["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12.5,
        leading=16,
        textColor=TEAL,
        spaceBefore=10,
        spaceAfter=6,
    )
    styles["body"] = ParagraphStyle(
        "Body",
        parent=base["BodyText"],
        fontName="Helvetica",
        fontSize=10.2,
        leading=15,
        textColor=INK,
        spaceAfter=7,
    )
    styles["small"] = ParagraphStyle(
        "Small",
        parent=base["BodyText"],
        fontName="Helvetica",
        fontSize=8.6,
        leading=11.5,
        textColor=MUTED,
    )
    styles["label"] = ParagraphStyle(
        "Label",
        parent=base["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=9.2,
        leading=12,
        textColor=INK,
        spaceAfter=3,
    )
    styles["card_title"] = ParagraphStyle(
        "CardTitle",
        parent=base["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=13,
        textColor=INK,
        spaceAfter=4,
    )
    styles["card_body"] = ParagraphStyle(
        "CardBody",
        parent=base["BodyText"],
        fontName="Helvetica",
        fontSize=8.7,
        leading=12,
        textColor=INK,
    )
    styles["quote"] = ParagraphStyle(
        "Quote",
        parent=base["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=18,
        textColor=TEAL,
        leftIndent=12,
        rightIndent=12,
        spaceBefore=6,
        spaceAfter=8,
    )
    styles["center_small"] = ParagraphStyle(
        "CenterSmall",
        parent=styles["small"],
        alignment=TA_CENTER,
    )
    return styles


S = style_sheet()


def p(text, style="body"):
    return Paragraph(text, S[style])


def bullets(items, level=0):
    rows = [[Paragraph("-", S["body"]), p(item, "body")] for item in items]
    table = Table(rows, colWidths=[0.18 * inch, PAGE_W - 2 * MARGIN_X - 0.18 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                ("TEXTCOLOR", (0, 0), (0, -1), TEAL),
            ]
        )
    )
    return table


def numbered(items):
    return ListFlowable(
        [ListItem(p(item, "body"), leftIndent=0) for item in items],
        bulletType="1",
        leftIndent=18,
        bulletFontName="Helvetica-Bold",
        bulletFontSize=9,
        bulletColor=TEAL,
    )


def callout(title, body, fill=MIST, accent=TEAL):
    table = Table(
        [[p(title, "card_title")], [p(body, "card_body")]],
        colWidths=[PAGE_W - 2 * MARGIN_X],
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 0.75, colors.white),
                ("LINEBEFORE", (0, 0), (0, -1), 4, accent),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, 0), 10),
                ("BOTTOMPADDING", (0, -1), (-1, -1), 11),
            ]
        )
    )
    return table


def three_cards(cards):
    width = (PAGE_W - 2 * MARGIN_X - 0.24 * inch) / 3
    row = []
    fills = [MIST, BLUSH, GOLD_WASH]
    accents = [TEAL, ROSE, AMBER]
    for idx, (title, body) in enumerate(cards):
        inner = [
            [p(title, "card_title")],
            [p(body, "card_body")],
        ]
        card = Table(inner, colWidths=[width], hAlign="LEFT")
        card.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), fills[idx]),
                    ("BOX", (0, 0), (-1, -1), 0.5, colors.white),
                    ("LINEABOVE", (0, 0), (-1, 0), 3, accents[idx]),
                    ("LEFTPADDING", (0, 0), (-1, -1), 9),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                    ("TOPPADDING", (0, 0), (-1, 0), 10),
                    ("BOTTOMPADDING", (0, -1), (-1, -1), 11),
                ]
            )
        )
        row.append(card)
    table = Table([row], colWidths=[width, width, width], hAlign="LEFT")
    table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]))
    return table


def roadmap_table():
    data = [
        [p("Weeks", "label"), p("Main focus", "label"), p("Outputs", "label")],
        [
            p("1-2", "card_title"),
            p("Alignment and setup", "card_title"),
            p("Prototype decision sheet, Manu foundation, first-story outline, month-one social plan, website/waitlist direction.", "card_body"),
        ],
        [
            p("3-4", "card_title"),
            p("Build the first layer", "card_title"),
            p("Manu bible, story beats, parent-child prompts, letter from Manu, first-box outline, first social content batch.", "card_body"),
        ],
        [
            p("5-6", "card_title"),
            p("Make it public-ready", "card_title"),
            p("Refined story language, captions, short video scripts, Maitri Circle invitation, prototype update language.", "card_body"),
        ],
        [
            p("7-8", "card_title"),
            p("Review and decide", "card_title"),
            p("Prototype direction, feedback signals, story resonance, beta-reader decision, next two-month focus.", "card_body"),
        ],
    ]
    table = Table(data, colWidths=[0.75 * inch, 1.85 * inch, 3.95 * inch], repeatRows=1, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), TEAL),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return table


def approval_table():
    rows = [
        ["Positioning", "Maitri is a story-first companion universe where children befriend brave Indian heroines."],
        ["Phase priority", "Build prototypes while developing characters, storylines, and social presence in parallel."],
        ["Manu-first approach", "Manu remains the first complete companion experience before Maitri expands too widely."],
        ["Social posture", "Begin public storytelling without early preorder, delivery, safety, or production claims."],
        ["Working rhythm", "Prototype decisions, Manu development, and social presence move together over the next two months."],
    ]
    data = [[p("Approval area", "label"), p("Decision to confirm", "label")]]
    data.extend([[p(a, "card_title"), p(b, "card_body")] for a, b in rows])
    table = Table(data, colWidths=[1.55 * inch, 5.0 * inch], repeatRows=1, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), ROSE),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def draw_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN_X, 0.48 * inch, PAGE_W - MARGIN_X, 0.48 * inch)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN_X, 0.3 * inch, "Maitri Next-Level Foundation Plan")
    canvas.drawRightString(PAGE_W - MARGIN_X, 0.3 * inch, f"Page {doc.page}")
    canvas.restoreState()


def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(OUT),
        pagesize=LETTER,
        leftMargin=MARGIN_X,
        rightMargin=MARGIN_X,
        topMargin=MARGIN_Y,
        bottomMargin=0.72 * inch,
        title="Maitri Next-Level Foundation Plan",
        author="Kramaniti",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=draw_page)])

    story = []
    story.append(Spacer(1, 0.45 * inch))
    story.append(p("Maitri Next-Level Foundation Plan", "title"))
    story.append(p("Prepared for Shwetika review after the investor meeting", "subtitle"))
    story.append(HRFlowable(width="34%", thickness=3, color=TEAL, hAlign="LEFT", spaceAfter=22))
    story.append(callout(
        "Purpose",
        "This document turns the post-investor direction into a clear, non-technical foundation for the next phase: two prototypes, deeper character and storyline development, and a stronger social media presence.",
        fill=MIST,
        accent=TEAL,
    ))
    story.append(Spacer(1, 18))
    story.append(p("The goal is not to rush into a launch. The goal is to use the prototype period wisely so that Maitri has a stronger story universe, clearer character system, and active public presence by the time physical product decisions become clearer.", "body"))
    story.append(Spacer(1, 24))
    story.append(three_cards([
        ("Prototype Track", "Start two prototype directions and define what each one is meant to prove for product quality, feel, cost, and first-box experience."),
        ("Story Track", "Make Manu the first fully developed proof of Maitri while beginning a repeatable system for future companions."),
        ("Social Track", "Build public familiarity through warm, story-led content before making launch or preorder claims."),
    ]))

    story.append(PageBreak())
    story.append(p("1. The Phase Shift", "h1"))
    story.append(p("Previous phase", "h2"))
    story.append(bullets([
        "A pre-launch website and Maitri Circle waitlist direction.",
        "A Manu-led story and first-box direction.",
        "Early social and content ideas.",
        "A clear story-first positioning.",
    ]))
    story.append(p("New phase", "h2"))
    story.append(bullets([
        "Physical prototypes begin.",
        "Manu becomes the first fully developed proof of the brand.",
        "The wider Maitri character universe starts taking shape.",
        "Social media begins creating audience familiarity before the product is ready.",
        "Every public-facing touchpoint builds confidence without premature promises.",
    ]))
    story.append(callout(
        "Core positioning for this phase",
        "Maitri is a story-first companion universe where children befriend brave Indian heroines through stories, play, and meaningful parent-child reflection.",
        fill=BLUSH,
        accent=ROSE,
    ))
    story.append(p("The doll is important, but the relationship with the character should begin before the doll is purchased.", "body"))
    story.append(numbered([
        "Maitri helps children meet Indian heroines as friends.",
        "Manu is the first companion and the first complete story experience.",
        "The product is being built carefully, with story, quality, and child attachment at the center.",
    ]))

    story.append(PageBreak())
    story.append(p("2. The Three Workstreams", "h1"))
    story.append(KeepTogether([
        p("Workstream 1: Prototype Development", "h2"),
        p("Create two prototype directions that help Shwetika, investors, and future partners make better product decisions.", "body"),
        bullets([
            "What should the first Maitri doll feel like in a child's hands?",
            "What visual finish, clothing, hair, and packaging feel premium enough?",
            "What matters most to parents in the first product experience?",
            "What is realistic for production, cost, quality, and timeline?",
            "Which direction best supports the Manu story and first-box experience?",
        ]),
    ]))
    story.append(callout(
        "Prototype foundation",
        "Prototype A should focus on the strongest possible Manu companion doll direction. Prototype B should test either an alternate doll style, alternate finish/material direction, or a more complete first-box presentation.",
        fill=MIST,
        accent=TEAL,
    ))
    story.append(KeepTogether([
        p("Workstream 2: Characters And Storyline", "h2"),
        p("Build the emotional heart of Maitri while product development is underway. The first priority is Manu; the wider universe can begin in a lighter way once Manu is strong.", "body"),
        bullets([
            "Character personality, story world, and first story arc.",
            "Parent-child values and key visual moments.",
            "Activity ideas, letter from Manu, and first-box story experience.",
            "Social media story beats that feel warm, child-safe, and founder-aligned.",
        ]),
    ]))
    story.append(KeepTogether([
        p("Workstream 3: Social Media Presence", "h2"),
        p("Start building familiarity and emotional demand while prototypes are being developed. Social should feel like a story-led community beginning, not a sales launch.", "body"),
        bullets([
            "Why Maitri is being built.",
            "Meet Manu and Manu's world.",
            "Courage can be gentle.",
            "Indian heroines as childhood companions.",
            "Parent-child prompts and Maitri Circle invitations.",
        ]),
    ]))

    story.append(PageBreak())
    story.append(p("3. Recommended Two-Month Roadmap", "h1"))
    story.append(roadmap_table())
    story.append(Spacer(1, 12))
    story.append(callout(
        "Operating principle",
        "Prototype decisions, Manu development, and social presence should move together. The brand should not wait for the product to be finished before building story clarity and early audience familiarity.",
        fill=GOLD_WASH,
        accent=AMBER,
    ))

    story.append(PageBreak())
    story.append(p("4. What Should Be Approved Now", "h1"))
    story.append(approval_table())
    story.append(Spacer(1, 14))
    story.append(p("Guardrails", "h1"))
    story.append(bullets([
        "Do not announce product availability before production confidence is higher.",
        "Do not take preorder money too early.",
        "Do not make safety, material, shipping, or manufacturing claims before they are confirmed.",
        "Do not overdevelop too many characters before Manu is strong.",
        "Do not turn Maitri into only a history education project.",
        "Do not make the doll feel separate from the story.",
        "Do not post sensitive product or history details without founder approval.",
    ]))

    story.append(PageBreak())
    story.append(p("5. What Success Looks Like", "h1"))
    story.append(p("By the end of this next phase, Maitri should have:", "body"))
    story.append(bullets([
        "Two prototype directions reviewed clearly.",
        "A stronger decision on the first doll direction.",
        "A well-developed Manu character foundation.",
        "A clear first Manu story direction.",
        "A first-box experience that connects doll, storybook, letter, activities, and stickers.",
        "A usable social media rhythm.",
        "A clearer Maitri Circle invitation.",
        "Better language for parents, investors, and early supporters.",
        "A foundation for deciding whether to move into beta readers, deeper book development, school pilots, or preorder planning.",
    ]))
    story.append(Spacer(1, 8))
    story.append(callout(
        "Recommended immediate next step",
        "Hold one working session to define the two prototypes, confirm which parts of Manu's story are approved for public content, and decide what Maitri should begin posting first.",
        fill=MIST,
        accent=VIOLET,
    ))
    story.append(Spacer(1, 12))
    story.append(numbered([
        "What exactly are the two prototypes, and what should each one prove?",
        "What parts of Manu's story are approved enough to build public content around?",
        "What should Maitri begin posting first so the brand starts building attention while the prototypes are underway?",
    ]))

    doc.build(story)
    print(OUT)


if __name__ == "__main__":
    build()
