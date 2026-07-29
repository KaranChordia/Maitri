from pathlib import Path
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import landscape
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).with_name("Maitri_Brand_Book_2026.pdf")
ASSET = ROOT / "09_demos/maitri-circle/public/assets"
CAPTURE = Path(__file__).with_name("assets")

W, H = landscape((13.333 * inch, 7.5 * inch))
M = 42

CRIMSON = HexColor("#FF96AF")
ORANGE = HexColor("#FFB098")
PLUM = HexColor("#451039")
PLUM_SOFT = HexColor("#6D4961")
BODY = HexColor("#243533")
CREAM = HexColor("#FFF8ED")
BLUSH = HexColor("#FFF1E7")
MIST = HexColor("#EFFAFA")
TEAL = HexColor("#189A93")
VIOLET = HexColor("#8B61C8")
AMBER = HexColor("#F3A823")
BLUE = HexColor("#1785AC")
WHITE = HexColor("#FFFFFF")
PALE_PINK = HexColor("#FFE4EA")
PALE_ORANGE = HexColor("#FFE7DE")

FONT_DIR = Path("/Users/karanchordia/Downloads/Outfit/static")
pdfmetrics.registerFont(TTFont("Outfit", str(FONT_DIR / "Outfit-Regular.ttf")))
pdfmetrics.registerFont(TTFont("Outfit-Medium", str(FONT_DIR / "Outfit-Medium.ttf")))
pdfmetrics.registerFont(TTFont("Outfit-SemiBold", str(FONT_DIR / "Outfit-SemiBold.ttf")))
pdfmetrics.registerFont(TTFont("Outfit-Bold", str(FONT_DIR / "Outfit-Bold.ttf")))
pdfmetrics.registerFont(TTFont("Outfit-ExtraBold", str(FONT_DIR / "Outfit-ExtraBold.ttf")))


def pstyle(size=12, leading=None, color=BODY, font="Outfit", align=TA_LEFT):
    return ParagraphStyle(
        "p",
        fontName=font,
        fontSize=size,
        leading=leading or size * 1.28,
        textColor=color,
        alignment=align,
        spaceAfter=0,
    )


def paragraph(c, text, x, y, width, size=12, leading=None, color=BODY,
              font="Outfit", align=TA_LEFT, max_height=300):
    p = Paragraph(text, pstyle(size, leading, color, font, align))
    _, height = p.wrap(width, max_height)
    p.drawOn(c, x, y - height)
    return height


def rounded(c, x, y, w, h, radius=24, fill=WHITE, alpha=1, stroke=None):
    c.saveState()
    c.setFillAlpha(alpha)
    c.setFillColor(fill)
    if stroke:
        c.setStrokeColor(stroke)
        c.setLineWidth(0.8)
    else:
        c.setStrokeColor(fill)
    c.roundRect(x, y, w, h, radius, fill=1, stroke=1 if stroke else 0)
    c.restoreState()


def soft_circle(c, x, y, r, color, alpha=0.14):
    c.saveState()
    c.setFillAlpha(alpha)
    c.setFillColor(color)
    c.circle(x, y, r, fill=1, stroke=0)
    c.restoreState()


def blob_path(c, x, y, w, h):
    p = c.beginPath()
    p.moveTo(x + 0.10 * w, y + 0.42 * h)
    p.curveTo(x + 0.02 * w, y + 0.78 * h, x + 0.25 * w, y + 1.02 * h, x + 0.53 * w, y + 0.96 * h)
    p.curveTo(x + 0.84 * w, y + 0.91 * h, x + 1.02 * w, y + 0.73 * h, x + 0.94 * w, y + 0.40 * h)
    p.curveTo(x + 0.88 * w, y + 0.10 * h, x + 0.63 * w, y - 0.02 * h, x + 0.35 * w, y + 0.03 * h)
    p.curveTo(x + 0.14 * w, y + 0.07 * h, x + 0.04 * w, y + 0.20 * h, x + 0.10 * w, y + 0.42 * h)
    p.close()
    return p


def image_fill(c, path, x, y, w, h, organic=False):
    path = Path(path)
    if not path.exists():
        return
    img = ImageReader(str(path))
    iw, ih = img.getSize()
    scale = max(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    dx, dy = x + (w - dw) / 2, y + (h - dh) / 2
    c.saveState()
    if organic:
        c.clipPath(blob_path(c, x, y, w, h), stroke=0, fill=0)
    else:
        clip = c.beginPath()
        clip.roundRect(x, y, w, h, min(26, h / 5))
        c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(img, dx, dy, dw, dh, mask="auto")
    c.restoreState()


def mark(c, x, y, w=48):
    path = ASSET / "brand/maitri-mark-1024.png"
    c.drawImage(str(path), x, y, width=w, height=w, mask="auto", preserveAspectRatio=True)


def wordmark(c, x, y, size=28, color=PLUM):
    c.setFont("Outfit-Bold", size)
    c.setFillColor(color)
    c.drawString(x, y, "Maitri")


def two_tone_title(c, first, second, x, y, size=42):
    c.setFont("Outfit-ExtraBold", size)
    c.setFillColor(CRIMSON)
    c.drawString(x, y, first)
    first_w = pdfmetrics.stringWidth(first, "Outfit-ExtraBold", size)
    c.setFillColor(ORANGE)
    c.drawString(x + first_w, y, second)


def background(c, tone="light"):
    if tone == "plum":
        c.setFillColor(PLUM)
        c.rect(0, 0, W, H, fill=1, stroke=0)
        soft_circle(c, W - 90, H - 40, 190, CRIMSON, 0.16)
        soft_circle(c, 120, 55, 160, ORANGE, 0.12)
    else:
        c.setFillColor(CREAM)
        c.rect(0, 0, W, H, fill=1, stroke=0)
        soft_circle(c, W - 75, H - 45, 165, CRIMSON, 0.10)
        soft_circle(c, 70, 40, 150, ORANGE, 0.09)


def footer(c, page_num, section="", dark=False):
    color = HexColor("#FBE8EE") if dark else PLUM_SOFT
    c.setFillColor(color)
    c.setFont("Outfit-SemiBold", 7.5)
    c.drawString(M, 20, f"MAITRI BRAND BOOK  /  {section.upper()}")
    c.drawRightString(W - M, 20, f"{page_num:02d}")


def section_kicker(c, text, x=M, y=H - 58, dark=False):
    c.setFont("Outfit-Bold", 10)
    c.setFillColor(ORANGE if dark else CRIMSON)
    c.drawString(x, y, text.upper())
    c.setStrokeColor(ORANGE)
    c.setLineWidth(2.2)
    c.line(x, y - 8, x + 52, y - 8)


def title(c, text, x=M, y=H - 115, size=35, dark=False, max_width=640):
    color = CREAM if dark else PLUM
    return paragraph(c, text, x, y, max_width, size=size, leading=size * 1.02,
                     color=color, font="Outfit-ExtraBold")


def page_header(c, page_num, section, kicker, heading, dark=False, size=35):
    background(c, "plum" if dark else "light")
    footer(c, page_num, section, dark)
    section_kicker(c, kicker, dark=dark)
    title(c, heading, size=size, dark=dark)


def draw_bullet_list(c, items, x, y, width, color=BODY, bullet=CRIMSON,
                     size=11, gap=10):
    cursor = y
    for item in items:
        c.setFillColor(bullet)
        c.circle(x + 4, cursor - 5, 3.2, fill=1, stroke=0)
        h = paragraph(c, item, x + 16, cursor, width - 16, size=size,
                      leading=size * 1.32, color=color)
        cursor -= h + gap
    return cursor


def info_card(c, x, y, w, h, label, heading, body, tint=PALE_PINK):
    rounded(c, x, y, w, h, 26, tint, 0.72)
    c.setFillColor(CRIMSON)
    c.setFont("Outfit-Bold", 8)
    c.drawString(x + 18, y + h - 24, label.upper())
    paragraph(c, heading, x + 18, y + h - 42, w - 36, 17, 18,
              PLUM, "Outfit-Bold")
    paragraph(c, body, x + 18, y + h - 82, w - 36, 9.4, 12.2,
              BODY, "Outfit")


def chapter(c, page_num, number, heading, subheading, motif=20):
    background(c, "plum")
    footer(c, page_num, heading, True)
    c.setFillColor(ORANGE)
    c.setFont("Outfit-Bold", 12)
    c.drawString(M, H - 60, f"CHAPTER {number}")
    paragraph(c, heading, M, H - 132, 590, 56, 55, CREAM, "Outfit-ExtraBold")
    paragraph(c, subheading, M, 150, 520, 15, 20, HexColor("#F7DDE5"), "Outfit")
    icon = CAPTURE / f"icon-{motif}.png"
    if icon.exists():
        c.saveState()
        c.setFillAlpha(0.90)
        c.drawImage(str(icon), W - 290, 110, 250, 250, mask="auto")
        c.restoreState()


def cover(c):
    background(c)
    soft_circle(c, W - 165, H - 70, 220, CRIMSON, 0.18)
    soft_circle(c, W - 60, 75, 165, ORANGE, 0.14)
    mark(c, M, H - 112, 74)
    wordmark(c, M + 88, H - 90, 38)
    c.setFont("Outfit-Bold", 11)
    c.setFillColor(CRIMSON)
    c.drawString(M, H - 160, "BRAND SYSTEM  /  2026")
    paragraph(c, "Every great adventure<br/>begins with a friend.", M, H - 205,
              575, 54, 53, PLUM, "Outfit-ExtraBold")
    paragraph(c, "A detailed guide to Maitri's purpose, voice, identity, visual world, "
                 "digital behavior, and story-led applications.", M, 138, 510, 14, 19,
              BODY, "Outfit-Medium")
    image_fill(c, ASSET / "generated/optimized/hero-scene.jpg",
               W - 370, 82, 330, 350, True)
    c.setFillColor(PLUM_SOFT)
    c.setFont("Outfit-SemiBold", 8)
    c.drawString(M, 24, "MAITRI  /  MASTER BRAND BOOK")


def contents(c, page_num):
    page_header(c, page_num, "Overview", "Inside the book", "One identity. Many brave friendships.")
    chapters = [
        ("01", "Foundation", "Purpose, positioning, audiences, pillars, architecture"),
        ("02", "Expression", "Personality, voice, messaging, story principles"),
        ("03", "Identity", "Logo, colour, typography, spacing, accessibility"),
        ("04", "Visual world", "Motifs, imagery, organic cutouts, UI, motion"),
        ("05", "Applications", "Website, editorial, storybook, packaging, governance"),
    ]
    y = 315
    for i, (n, name, desc) in enumerate(chapters):
        x = M + (i % 3) * 292
        yy = y - (i // 3) * 130
        rounded(c, x, yy, 260, 100, 24, WHITE, 0.60)
        c.setFont("Outfit-Bold", 12)
        c.setFillColor(CRIMSON if i % 2 == 0 else ORANGE)
        c.drawString(x + 16, yy + 70, n)
        c.setFont("Outfit-Bold", 17)
        c.setFillColor(PLUM)
        c.drawString(x + 52, yy + 67, name)
        paragraph(c, desc, x + 16, yy + 50, 228, 9, 12, BODY)


def foundation_pages(c, start):
    p = start
    chapter(c, p, "01", "Brand foundation",
            "Maitri is a story-first companion universe. Friendship comes before product, "
            "and emotional attachment comes before expansion.", 26); c.showPage(); p += 1

    page_header(c, p, "Foundation", "Brand essence", "A friend who helps every child find the hero within.")
    paragraph(c, "Maitri creates story-rich Indian companions that help children discover "
              "courage, kindness, curiosity, and leadership through remarkable women from "
              "India's past and present.", M, 315, 560, 17, 23, PLUM, "Outfit-SemiBold")
    info_card(c, 640, 250, 270, 150, "Meaning", "Maitri means friendship.",
              "The name is not a label placed on a doll. It is the emotional contract: "
              "children first meet a friend, then enter her story.", PALE_PINK)
    c.setFillColor(ORANGE)
    c.setFont("Outfit-Bold", 12)
    c.drawString(M, 170, "THE OPERATING PRINCIPLE")
    paragraph(c, '"Let people fall in love with the characters long before they have seen the doll."',
              M, 146, 750, 24, 28, PLUM, "Outfit-ExtraBold"); c.showPage(); p += 1

    page_header(c, p, "Foundation", "Positioning", "A story-first Indian companion universe.")
    blocks = [
        ("Category", "18-inch Indian companion dolls inspired by remarkable women."),
        ("Stronger frame", "Children befriend brave Indian heroines before they own the doll."),
        ("Primary promise", "Stories and play make courage, kindness, curiosity, and leadership feel close."),
        ("Difference", "Indian girlhood, regional diversity, historical memory, and parent-trusted values."),
    ]
    for i, (lab, text) in enumerate(blocks):
        x = M + (i % 2) * 448
        y = 278 - (i // 2) * 135
        info_card(c, x, y, 410, 112, lab, text.split(".")[0] + ".", text, PALE_PINK if i % 2 == 0 else PALE_ORANGE)
    c.showPage(); p += 1

    page_header(c, p, "Foundation", "Purpose, vision, mission", "What Maitri is here to make possible.")
    rows = [
        ("Purpose", "Help children see courage and possibility in friends who feel culturally close."),
        ("Vision", "A future where Indian stories, regions, languages, and heroines belong naturally in imaginative play."),
        ("Mission", "Build character-led companions whose stories turn values into repeatable child-and-parent moments."),
    ]
    y = 325
    for i, (lab, body) in enumerate(rows):
        c.setFillColor([CRIMSON, ORANGE, TEAL][i])
        c.circle(74, y - 18, 18, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Outfit-Bold", 10)
        c.drawCentredString(74, y - 22, str(i + 1))
        c.setFillColor(PLUM)
        c.setFont("Outfit-Bold", 18)
        c.drawString(112, y - 6, lab)
        paragraph(c, body, 270, y + 2, 590, 12, 16, BODY, "Outfit-Medium")
        y -= 98
    c.showPage(); p += 1

    page_header(c, p, "Foundation", "Audience system", "Win the child. Reassure the adult.")
    audiences = [
        ("Child", "Story, emotion, friendship, adventure, repeatable play.", "The heart"),
        ("Parent", "Representation, values, quality, safety, education, trust.", "The buyer"),
        ("Gift giver", "A premium Indian-identity gift with emotional significance.", "The amplifier"),
        ("Educator", "Story-led cultural learning and guided conversation.", "The partner"),
    ]
    for i, (name, body, role) in enumerate(audiences):
        x = M + i * 222
        rounded(c, x, 135, 196, 205, 70, WHITE, 0.60)
        soft_circle(c, x + 98, 302, 26, CRIMSON if i % 2 == 0 else ORANGE, 0.55)
        c.setFont("Outfit-Bold", 16)
        c.setFillColor(PLUM)
        c.drawCentredString(x + 98, 257, name)
        c.setFont("Outfit-Bold", 8)
        c.setFillColor(CRIMSON)
        c.drawCentredString(x + 98, 237, role.upper())
        paragraph(c, body, x + 22, 215, 152, 9.5, 13, BODY, "Outfit", TA_CENTER)
    c.showPage(); p += 1

    page_header(c, p, "Foundation", "Five brand pillars", "The ideas every Maitri expression must carry.")
    pillars = [
        ("Friendship", "A companion before a collectible."),
        ("Representation", "Indian faces, regions, languages, and family worlds."),
        ("Courage with tenderness", "Bravery can be patient, kind, curious, and steady."),
        ("History made personal", "A child should feel: this story belongs to me too."),
        ("Play with purpose", "Reading, role-play, reflection, and making reinforce one value."),
    ]
    for i, (name, body) in enumerate(pillars):
        x = M + (i % 3) * 292
        y = 265 - (i // 3) * 130
        info_card(c, x, y, 260, 105, f"0{i+1}", name, body,
                  PALE_PINK if i % 2 == 0 else PALE_ORANGE)
    c.showPage(); p += 1

    page_header(c, p, "Foundation", "Brand architecture", "One circle. Distinct friends. Connected stories.")
    c.setStrokeColor(HexColor("#D9B9C5"))
    c.setLineWidth(1.5)
    c.line(150, 240, 810, 240)
    nodes = [
        (150, "Maitri", "Master brand"),
        (315, "Companions", "Character worlds"),
        (480, "Stories", "Books and letters"),
        (645, "Play", "Activities and prompts"),
        (810, "Circle", "Families and community"),
    ]
    for i, (x, name, sub) in enumerate(nodes):
        c.setFillColor(CRIMSON if i in (0, 4) else ORANGE)
        c.circle(x, 240, 18 if i else 28, fill=1, stroke=0)
        c.setFillColor(PLUM)
        c.setFont("Outfit-Bold", 14)
        c.drawCentredString(x, 195, name)
        c.setFillColor(PLUM_SOFT)
        c.setFont("Outfit-Medium", 8)
        c.drawCentredString(x, 178, sub)
    paragraph(c, "Manu is the first anchor, not the limit of the universe. Every future companion "
              "receives her own value, place, personality, story, and child-facing emotional question.",
              170, 132, 620, 11, 15, BODY, "Outfit-Medium", TA_CENTER)
    c.showPage()
    return p + 1


def expression_pages(c, start):
    p = start
    chapter(c, p, "02", "Brand expression",
            "The Maitri voice is warm enough for a child, grounded enough for a parent, "
            "and specific enough to feel culturally meaningful.", 22); c.showPage(); p += 1

    page_header(c, p, "Expression", "Personality", "Warm. Brave. Curious. Rooted. Imaginative.")
    pairs = [
        ("Warm", "not sugary", CRIMSON),
        ("Brave", "not combative", ORANGE),
        ("Indian", "not ornamental", TEAL),
        ("Premium", "not precious", VIOLET),
        ("Imaginative", "not vague", BLUE),
    ]
    for i, (a, b, col) in enumerate(pairs):
        x = M + i * 178
        soft_circle(c, x + 76, 250, 70, col, 0.12)
        c.setFillColor(PLUM)
        c.setFont("Outfit-Bold", 18)
        c.drawCentredString(x + 76, 255, a)
        c.setFillColor(PLUM_SOFT)
        c.setFont("Outfit-Medium", 10)
        c.drawCentredString(x + 76, 232, b)
    c.showPage(); p += 1

    page_header(c, p, "Expression", "Voice principles", "Speak like a thoughtful story companion.")
    voice = [
        ("Child-facing", "Short, vivid, curious. Make room for the child's answer."),
        ("Parent-facing", "Warm, credible, reassuring. Explain value without overclaiming."),
        ("Character voice", "Specific to her personality. Never generic motivation."),
        ("Historical voice", "Use 'inspired by' and separate verified history from story invention."),
    ]
    for i, (lab, body) in enumerate(voice):
        x = M + (i % 2) * 448
        y = 270 - (i // 2) * 140
        info_card(c, x, y, 410, 115, f"VOICE 0{i+1}", lab, body,
                  PALE_PINK if i % 2 == 0 else PALE_ORANGE)
    c.showPage(); p += 1

    page_header(c, p, "Expression", "Message hierarchy", "Build understanding in this order.")
    messages = [
        ("01", "Friendship", "Every great adventure begins with a friend."),
        ("02", "Story", "Each companion opens a child-sized doorway into a remarkable life."),
        ("03", "Value", "Courage, kindness, curiosity, and leadership become choices a child can try."),
        ("04", "Play", "Books, letters, prompts, and a companion keep the story alive."),
        ("05", "Circle", "More friends and stories can grow after the first bond is proven."),
    ]
    y = 330
    for n, heading, body in messages:
        c.setFillColor(CRIMSON if int(n) % 2 else ORANGE)
        c.setFont("Outfit-Bold", 10)
        c.drawString(M, y, n)
        c.setFillColor(PLUM)
        c.setFont("Outfit-Bold", 15)
        c.drawString(86, y, heading)
        paragraph(c, body, 260, y + 3, 630, 10.5, 14, BODY, "Outfit-Medium")
        y -= 62
    c.showPage(); p += 1

    page_header(c, p, "Expression", "Writing: do and avoid", "Specific, warm language earns trust.")
    rounded(c, M, 105, 414, 260, 28, HexColor("#ECFAF4"), 0.78)
    rounded(c, 502, 105, 414, 260, 28, HexColor("#FFF0F2"), 0.78)
    c.setFillColor(TEAL); c.setFont("Outfit-Bold", 13); c.drawString(64, 335, "DO")
    draw_bullet_list(c, [
        '"Before she was remembered as a queen, Manu was a girl who asked why."',
        '"One small brave step can begin a new story."',
        '"Pause here. What would a kind next step look like?"',
        "Name the place, feeling, choice, and relationship.",
    ], 64, 304, 350, size=10)
    c.setFillColor(CRIMSON); c.setFont("Outfit-Bold", 13); c.drawString(524, 335, "AVOID")
    draw_bullet_list(c, [
        '"The ultimate educational doll for fearless girls."',
        "Unverified first-in-India, safety, launch, or outcome claims.",
        "Adult motivational slogans placed in a child's mouth.",
        "Using battle, royalty, or ornament as the only sign of Indian identity.",
    ], 524, 304, 350, bullet=CRIMSON, size=10)
    c.showPage(); p += 1

    page_header(c, p, "Expression", "Story principles", "Every companion story follows the same emotional logic.")
    principles = [
        ("Begin with the child", "Meet curiosity, longing, fear, play, or friendship before achievement."),
        ("Make courage observable", "Show a question, pause, attempt, repair, or kind choice."),
        ("Keep history honest", "Separate historical anchors, interpretation, and invented scenes."),
        ("Invite reflection", "End with room to talk, draw, write, choose, or simply listen."),
        ("Continue through play", "Objects and activities should deepen the story, not distract from it."),
    ]
    draw_bullet_list(c, [f"<b>{a}</b><br/>{b}" for a, b in principles],
                     M, 330, 820, size=11.2, gap=11)
    c.showPage()
    return p + 1


def identity_pages(c, start):
    p = start
    chapter(c, p, "03", "Identity system",
            "The open-M companion mark, Outfit wordmark, official two-colour palette, "
            "and direct motif vocabulary create a warm and recognisable system.", 20); c.showPage(); p += 1

    page_header(c, p, "Identity", "Primary identity", "The companion mark and the Maitri name.", size=30)
    rounded(c, M, 118, 530, 250, 34, WHITE, 0.72)
    mark(c, 105, 180, 145); wordmark(c, 282, 225, 58)
    paragraph(c, "Primary horizontal lockup", 95, 145, 420, 10, 13, PLUM_SOFT,
              "Outfit-SemiBold", TA_CENTER)
    rounded(c, 610, 118, 305, 250, 34, PLUM, 1)
    mark(c, 698, 176, 132)
    paragraph(c, "Icon-only use for favicons, avatars, seals, and small moments.",
              642, 150, 240, 9.5, 13, CREAM, "Outfit-Medium", TA_CENTER)
    c.showPage(); p += 1

    page_header(c, p, "Identity", "Meaning and construction", "Two layered leaves meet as an open M.")
    mark(c, 90, 120, 270)
    notes = [
        ("Two presences", "The mirrored leaves suggest companionship rather than an isolated hero."),
        ("Open centre", "The notch creates an M and leaves the identity welcoming, not closed."),
        ("Soft layers", "Three tonal layers bring depth without ornament or fine detail."),
        ("Symmetry", "Balance makes the mark calm, memorable, and scalable."),
    ]
    for i, (lab, body) in enumerate(notes):
        x = 430 + (i % 2) * 238
        y = 252 - (i // 2) * 130
        info_card(c, x, y, 215, 108, str(i + 1), lab, body,
                  PALE_PINK if i % 2 == 0 else PALE_ORANGE)
    c.showPage(); p += 1

    page_header(c, p, "Identity", "Clear space and minimum size", "Protect recognition before adding decoration.")
    rounded(c, M, 115, 430, 255, 30, WHITE, 0.68)
    c.setStrokeColor(CRIMSON); c.setDash(4, 5); c.setLineWidth(1.2)
    c.rect(105, 160, 300, 155, fill=0, stroke=1); c.setDash()
    mark(c, 175, 178, 118); wordmark(c, 302, 212, 34)
    c.setFillColor(CRIMSON); c.setFont("Outfit-Bold", 9)
    c.drawString(108, 325, "CLEAR SPACE = AT LEAST HALF THE MARK HEIGHT")
    info_card(c, 525, 245, 390, 125, "Digital minimum", "28 px mark / 96 px lockup",
              "Below this size, simplify to the icon-only mark and test the open centre.", PALE_PINK)
    info_card(c, 525, 105, 390, 125, "Print minimum", "8 mm mark / 26 mm lockup",
              "Confirm output on the actual paper, finish, embroidery, or label process.", PALE_ORANGE)
    c.showPage(); p += 1

    page_header(c, p, "Identity", "Logo behavior", "Keep the mark light, clear, and unforced.")
    good = [
        "Use the approved rose layered mark on cream, white, or calm pale fields.",
        "Pair horizontally with Outfit Bold 'Maitri' in plum.",
        "Use icon-only where the brand name is already known.",
        "Test one-colour plum and reversed cream for production.",
    ]
    bad = [
        "Do not place the mark inside a circle, bubble, tile, or badge by default.",
        "Do not add shadows, outlines, glows, or extra ornaments.",
        "Do not rotate, stretch, recolour individual layers, or close the centre.",
        "Do not combine it with crowns, swords, forts, or a Manu-specific silhouette.",
    ]
    c.setFillColor(TEAL); c.setFont("Outfit-Bold", 13); c.drawString(M, 350, "USE")
    draw_bullet_list(c, good, M, 320, 390, bullet=TEAL, size=10.2)
    c.setFillColor(CRIMSON); c.setFont("Outfit-Bold", 13); c.drawString(510, 350, "AVOID")
    draw_bullet_list(c, bad, 510, 320, 390, bullet=CRIMSON, size=10.2)
    c.showPage(); p += 1

    page_header(c, p, "Identity", "Official palette", "Pastel crimson and pastel orange lead.")
    swatches = [
        ("Pastel Crimson", "#FF96AF", CRIMSON, "Emotion, courage, friendship"),
        ("Pastel Orange", "#FFB098", ORANGE, "Warmth, story light, optimism"),
        ("Plum Ink", "#451039", PLUM, "Headlines, names, primary text"),
        ("Soft Cream", "#FFF8ED", CREAM, "Primary warm surface"),
    ]
    for i, (name, hx, col, use) in enumerate(swatches):
        x = M + i * 222
        c.setFillColor(col); c.roundRect(x, 190, 196, 145, 26, fill=1, stroke=0)
        text_col = CREAM if col == PLUM else PLUM
        c.setFillColor(text_col); c.setFont("Outfit-Bold", 13); c.drawString(x + 16, 305, name)
        c.setFont("Outfit-Bold", 10); c.drawString(x + 16, 282, hx)
        paragraph(c, use, x + 16, 245, 160, 9, 12, text_col, "Outfit-Medium")
    paragraph(c, "The two pastels are expressive brand colours. Use Plum Ink for readable copy "
              "and Soft Cream for warmth. Do not use the pastels as body text on white.",
              M, 145, 780, 10.5, 14, BODY, "Outfit-Medium")
    c.showPage(); p += 1

    page_header(c, p, "Identity", "Tints and supporting accents", "The world can expand without diluting the brand.")
    for row, (name, base) in enumerate([("Crimson", CRIMSON), ("Orange", ORANGE)]):
        c.setFont("Outfit-Bold", 10); c.setFillColor(PLUM); c.drawString(M, 330 - row * 105, name)
        for i, alpha in enumerate([1, .8, .6, .4, .22, .1]):
            mixed = Color(
                base.red * alpha + CREAM.red * (1 - alpha),
                base.green * alpha + CREAM.green * (1 - alpha),
                base.blue * alpha + CREAM.blue * (1 - alpha),
            )
            c.setFillColor(mixed); c.roundRect(130 + i * 106, 302 - row * 105, 92, 48, 12, fill=1, stroke=0)
    accents = [("Teal", TEAL), ("Violet", VIOLET), ("Amber", AMBER), ("Blue", BLUE)]
    for i, (name, col) in enumerate(accents):
        x = 130 + i * 160
        c.setFillColor(col); c.circle(x, 106, 26, fill=1, stroke=0)
        c.setFillColor(PLUM); c.setFont("Outfit-SemiBold", 9); c.drawCentredString(x, 68, name)
    paragraph(c, "Supporting accents belong to companion worlds, state cues, and small storytelling "
              "moments. They never replace the official crimson-orange lead.", 690, 140, 220, 9.5, 13, BODY)
    c.showPage(); p += 1

    page_header(c, p, "Identity", "Accessibility", "Beauty must not carry meaning alone.")
    checks = [
        ("Readable text", "Use Plum Ink on cream/white for body copy and important controls."),
        ("Gradient restraint", "The official gradient is for large expressive labels, never critical instructions."),
        ("Contrast", "Target 4.5:1 for body text and 3:1 for large text and UI boundaries."),
        ("Focus", "Keep visible keyboard focus; never rely on hover or colour alone."),
        ("Motion", "Respect reduced motion and keep page transitions under half a second."),
    ]
    draw_bullet_list(c, [f"<b>{a}</b><br/>{b}" for a, b in checks], M, 335, 560, size=11)
    rounded(c, 650, 130, 250, 220, 30, PLUM, 1)
    c.setFillColor(CREAM); c.setFont("Outfit-Bold", 22); c.drawString(680, 300, "Aa")
    paragraph(c, "Primary reading pair<br/><b>Plum Ink on Soft Cream</b>",
              680, 260, 190, 12, 17, CREAM, "Outfit")
    c.setFillColor(CRIMSON); c.roundRect(680, 165, 85, 42, 18, fill=1, stroke=0)
    c.setFillColor(ORANGE); c.roundRect(780, 165, 85, 42, 18, fill=1, stroke=0)
    c.showPage(); p += 1

    page_header(c, p, "Identity", "Typography", "Outfit is the single family.")
    c.setFillColor(PLUM); c.setFont("Outfit-ExtraBold", 39); c.drawString(M, 315, "Every great adventure")
    c.setFillColor(CRIMSON); c.setFont("Outfit-Bold", 25); c.drawString(M, 265, "begins with a friend.")
    paragraph(c, "Rounded, modern, friendly, and clean enough for a premium consumer brand. "
              "One family keeps the website, story materials, packaging, and digital interfaces coherent.",
              M, 220, 560, 11, 16, BODY, "Outfit-Medium")
    samples = [
        ("EXTRA BOLD 800", "Display and campaign headlines"),
        ("BOLD 700", "Wordmark, section titles, calls to action"),
        ("SEMI BOLD 600", "Labels, navigation, captions"),
        ("REGULAR 400", "Body copy and longer reading"),
    ]
    y = 340
    for lab, use in samples:
        c.setFillColor(PLUM); c.setFont("Outfit-Bold", 9); c.drawString(660, y, lab)
        c.setFillColor(PLUM_SOFT); c.setFont("Outfit", 9); c.drawString(660, y - 18, use)
        y -= 68
    c.showPage(); p += 1

    page_header(c, p, "Identity", "Type hierarchy", "Warm, bold hierarchy without childish typography.")
    specs = [
        ("Display", "56-88 px / 0.96-1.02 line height / Bold-ExtraBold"),
        ("Section headline", "36-64 px / 1.0 line height / Bold"),
        ("Narrative eyebrow", "20-30 px / gradient / Bold / title case"),
        ("Body", "16-20 px / 1.5-1.7 line height / Regular-Medium"),
        ("Control label", "12-15 px / 1.2 line height / SemiBold-Bold"),
    ]
    y = 335
    for i, (role, spec) in enumerate(specs):
        c.setFillColor(CRIMSON if i % 2 == 0 else ORANGE)
        c.setFont("Outfit-Bold", 10); c.drawString(M, y, f"0{i+1}")
        c.setFillColor(PLUM); c.setFont("Outfit-Bold", 16); c.drawString(90, y, role)
        c.setFillColor(BODY); c.setFont("Outfit-Medium", 10); c.drawString(310, y, spec)
        y -= 62
    c.showPage()
    return p + 1


def visual_pages(c, start):
    p = start
    chapter(c, p, "04", "Visual world",
            "Maitri's world is made from circles and layers as cutouts: soft asymmetry, "
            "direct motifs, warm storybook imagery, glass navigation, and calm motion.", 23); c.showPage(); p += 1

    page_header(c, p, "Visual world", "Motif vocabulary", "Twelve approved shapes. No enclosing bubbles.")
    for i in range(12):
        col, row = i % 6, i // 6
        x, y = M + col * 144, 260 - row * 135
        path = CAPTURE / f"icon-{18+i}.png"
        if path.exists():
            c.drawImage(str(path), x + 18, y, 90, 90, mask="auto")
        c.setFillColor(PLUM_SOFT); c.setFont("Outfit-Bold", 8)
        c.drawCentredString(x + 63, y - 5, f"MOTIF {18+i}")
    paragraph(c, "Use motifs as editorial punctuation, story anchors, and decorative rhythm. "
              "Render the SVG directly - never inside circles, coloured tiles, borders, or shadows.",
              M, 90, 820, 9.5, 13, BODY, "Outfit-Medium")
    c.showPage(); p += 1

    page_header(c, p, "Visual world", "Organic cutout language", "Soft asymmetry creates a recognisable Maitri frame.")
    image_fill(c, ASSET / "generated/optimized/girls-reading-together.jpg", M, 105, 420, 285, True)
    soft_circle(c, 460, 155, 48, CRIMSON, 0.20)
    soft_circle(c, 435, 335, 26, ORANGE, 0.30)
    rules = [
        "Use one dominant organic crop, not several competing shapes.",
        "Add one or two offset translucent layers for depth.",
        "Keep edges soft and asymmetrical; avoid perfect circles as the default.",
        "Let the image remain readable without overlays.",
        "Use restraint: the crop supports the story, it is not the story.",
    ]
    draw_bullet_list(c, rules, 535, 340, 360, size=10.5)
    c.showPage(); p += 1

    page_header(c, p, "Visual world", "Imagery direction", "Cinematic warmth with emotionally readable moments.")
    image_fill(c, ASSET / "generated/optimized/manu-portrait.jpg", M, 105, 270, 290, True)
    image_fill(c, ASSET / "shwetika/manu/optimized/manu-doll-cutout.png", 350, 105, 250, 290, True)
    image_fill(c, ASSET / "generated/optimized/hero-scene.jpg", 635, 105, 280, 290, True)
    labels = [
        (M, "STORYBOOK", "Warm light, place, emotion, relationship"),
        (350, "PRODUCT", "Premium, playable, culturally rooted"),
        (635, "WORLD", "Child-led scale, discovery, invitation"),
    ]
    for x, lab, body in labels:
        c.setFillColor(CRIMSON); c.setFont("Outfit-Bold", 8); c.drawString(x, 88, lab)
        c.setFillColor(PLUM); c.setFont("Outfit-Medium", 8.5); c.drawString(x + 70, 88, body)
    c.showPage(); p += 1

    page_header(c, p, "Visual world", "Photography and illustration", "Show courage through attention, not spectacle.")
    dos = [
        "Children leaning forward, noticing, listening, trying, repairing, and sharing.",
        "Warm natural or storybook light with tactile fabrics, paper, wood, stone, and flowers.",
        "Indian settings and objects that belong to the story rather than decorate it.",
        "Expressions that feel emotionally open, curious, and specific.",
    ]
    avoids = [
        "Fierce warrior poses as the first or only image of courage.",
        "Overly royal styling for Manu's childhood story.",
        "Generic luxury still life disconnected from children or story.",
        "AI imagery with unstable faces, hands, clothing, text, or historical claims.",
    ]
    info_card(c, M, 120, 410, 245, "Direction", "What to show", "<br/>".join(dos), PALE_PINK)
    info_card(c, 505, 120, 410, 245, "Guardrail", "What to avoid", "<br/>".join(avoids), PALE_ORANGE)
    c.showPage(); p += 1

    page_header(c, p, "Visual world", "UI design principles", "A premium story surface, not an internal dashboard.")
    ui = [
        ("Glass navigation", "Translucent cream, white border, blur, soft depth, pill silhouette."),
        ("Open composition", "Use whitespace, paths, image rhythm, and typography before containers."),
        ("Purposeful containment", "Forms, menus, readers, and controls may own visible boundaries."),
        ("Direct motifs", "Approved SVGs appear bare; conventional icons remain for controls."),
        ("Continuous atmosphere", "No harsh straight dividers or stacked edge-to-edge panels."),
    ]
    for i, (lab, body) in enumerate(ui):
        x = M + (i % 3) * 292
        y = 260 - (i // 3) * 130
        info_card(c, x, y, 260, 105, f"UI 0{i+1}", lab, body,
                  PALE_PINK if i % 2 == 0 else PALE_ORANGE)
    c.showPage(); p += 1

    page_header(c, p, "Visual world", "Motion principles", "Movement should feel alive, never restless.")
    motion = [
        ("Ambient", "Unhurried circle drift, breathing, and slight rotation."),
        ("Interactive", "Small lift, spring, or image response on hover and focus."),
        ("Navigation", "Brief fade, blur, and 5-8 px travel between pages."),
        ("Timing", "180-520 ms for interface transitions; 5-9 s for ambient loops."),
        ("Accessibility", "Disable non-essential motion when reduced motion is requested."),
    ]
    y = 335
    for i, (lab, body) in enumerate(motion):
        c.setFillColor(CRIMSON if i % 2 == 0 else ORANGE)
        c.circle(72, y - 5, 7 + i * 1.5, fill=1, stroke=0)
        c.setFillColor(PLUM); c.setFont("Outfit-Bold", 15); c.drawString(105, y, lab)
        paragraph(c, body, 300, y + 3, 570, 10.5, 14, BODY, "Outfit-Medium")
        y -= 62
    c.showPage()
    return p + 1


def application_pages(c, start):
    p = start
    chapter(c, p, "05", "Applications",
            "The identity proves itself when every touchpoint feels like the same friendship: "
            "website, storybook, packaging, social content, and partner materials.", 29); c.showPage(); p += 1

    page_header(c, p, "Applications", "Website system", "The live site is the current source of truth.", size=30)
    image_fill(c, CAPTURE / "homepage-hero.png", M, 95, 560, 260, False)
    info_card(c, 640, 240, 270, 135, "Navigation", "Glass and calm",
              "The mark and wordmark anchor a translucent pill with blur, borders, soft opacity, and clear actions.", PALE_PINK)
    info_card(c, 640, 95, 270, 130, "Hierarchy", "Story before product",
              "The homepage explains the universe, then introduces companions, stories, and the first box.", PALE_ORANGE)
    c.showPage(); p += 1

    page_header(c, p, "Applications", "Companion storytelling", "Identity grows through distinct friends.", size=30)
    image_fill(c, CAPTURE / "homepage-companions.png", M, 105, 560, 270, False)
    paragraph(c, "Companion previews share one frame size and rhythm while each character retains "
              "her own role, place, world, story, and supporting accent.", 640, 340, 270, 13, 18, PLUM, "Outfit-SemiBold")
    draw_bullet_list(c, [
        "Lead with name, story, and emotional promise.",
        "Keep the Maitri mark and official palette consistent.",
        "Use supporting colours to distinguish worlds, not fragment the brand.",
        "Let the child meet the friend before reading product detail.",
    ], 640, 255, 270, size=9.5)
    c.showPage(); p += 1

    page_header(c, p, "Applications", "Manu as the first anchor", "Facts, values, story, and play speak one language.", size=30)
    image_fill(c, CAPTURE / "manu-facts.png", M, 95, 420, 250, False)
    image_fill(c, CAPTURE / "manu-story.png", 490, 95, 425, 250, False)
    c.setFillColor(CRIMSON); c.setFont("Outfit-Bold", 9); c.drawString(M, 76, "GET TO KNOW THE FRIEND")
    c.setFillColor(ORANGE); c.drawString(490, 76, "ENTER THE FIRST STORY")
    c.showPage(); p += 1

    page_header(c, p, "Applications", "Editorial and social", "One story beat per frame.")
    frames = [
        ("HOOK", "Before she was a queen, she was a girl who asked why."),
        ("MOMENT", "Manu notices Badal is frightened. She chooses patience."),
        ("PROMPT", "What is one small brave question you can ask kindly?"),
    ]
    for i, (lab, copy) in enumerate(frames):
        x = M + i * 292
        rounded(c, x, 125, 260, 245, 32, [PALE_PINK, PALE_ORANGE, MIST][i], 0.88)
        icon = CAPTURE / f"icon-{[28,27,22][i]}.png"
        if icon.exists():
            c.drawImage(str(icon), x + 20, 270, 65, 65, mask="auto")
        c.setFillColor(CRIMSON if i != 1 else ORANGE)
        c.setFont("Outfit-Bold", 8); c.drawString(x + 20, 250, lab)
        paragraph(c, copy, x + 20, 224, 218, 18, 21, PLUM, "Outfit-Bold")
        c.setFillColor(PLUM_SOFT); c.setFont("Outfit-Medium", 8)
        c.drawString(x + 20, 145, "MAITRI  /  STORY SERIES")
    c.showPage(); p += 1

    page_header(c, p, "Applications", "Storybook and packaging", "The physical experience continues the friendship.")
    components = [
        ("Companion", "A premium, playable friend."),
        ("Storybook", "The emotional engine of the first box."),
        ("Letter", "A direct relationship between Manu and the child."),
        ("Activities", "Ways to draw, choose, talk, and revisit."),
        ("Stickers", "A separate play insert using approved art and motifs."),
    ]
    for i, (lab, body) in enumerate(components):
        x = M + i * 178
        rounded(c, x, 145, 152, 210, 28, WHITE, 0.65)
        icon = CAPTURE / f"icon-{[19,20,21,23,28][i]}.png"
        if icon.exists():
            c.drawImage(str(icon), x + 38, 275, 74, 74, mask="auto")
        c.setFillColor(PLUM); c.setFont("Outfit-Bold", 14); c.drawCentredString(x + 76, 244, lab)
        paragraph(c, body, x + 18, 215, 116, 9, 12.5, BODY, "Outfit", TA_CENTER)
    paragraph(c, "All product specifications, age labels, safety claims, materials, and release promises "
              "remain subject to founder, production, compliance, and historical review.",
              M, 105, 820, 9.5, 13, PLUM_SOFT, "Outfit-Medium", TA_CENTER)
    c.showPage(); p += 1

    page_header(c, p, "Applications", "Governance", "A simple approval system protects the identity.")
    stages = [
        ("1", "Source", "Founder notes, approved assets, research, product reality"),
        ("2", "Interpret", "Brand strategy, character canon, message hierarchy"),
        ("3", "Create", "Website, story, packaging, campaign, partner materials"),
        ("4", "Review", "Brand, child language, history, safety, production, accessibility"),
        ("5", "Approve", "Founder sign-off and final asset archive"),
    ]
    c.setStrokeColor(HexColor("#D8BBC4")); c.setLineWidth(1.5); c.line(105, 245, 855, 245)
    for i, (n, lab, body) in enumerate(stages):
        x = 105 + i * 188
        c.setFillColor(CRIMSON if i % 2 == 0 else ORANGE); c.circle(x, 245, 19, fill=1, stroke=0)
        c.setFillColor(PLUM); c.setFont("Outfit-Bold", 14); c.drawCentredString(x, 205, lab)
        paragraph(c, body, x - 70, 183, 140, 8.5, 11.5, BODY, "Outfit", TA_CENTER)
    c.showPage(); p += 1

    page_header(c, p, "Applications", "Release checklist", "Before any Maitri work goes live.")
    checklist = [
        "Uses the approved mark, lockup, palette, and Outfit hierarchy.",
        "Feels warm, story-led, child-facing, and parent-trusted.",
        "Uses organic cutouts and direct motifs without enclosing bubbles.",
        "Keeps body copy readable and keyboard focus visible.",
        "Separates historical anchors from invented story scenes.",
        "Avoids unsupported first, safety, outcome, product, and release claims.",
        "Works at desktop and approximately 390 px mobile without overflow.",
        "Respects reduced motion and keeps transitions subtle.",
        "Names the owner, review status, date, and source asset version.",
    ]
    draw_bullet_list(c, checklist, M, 335, 800, size=10.5, gap=8)
    c.showPage(); p += 1

    background(c, "plum")
    footer(c, p, "Closing", True)
    mark(c, M, H - 125, 76); wordmark(c, M + 92, H - 100, 40, CREAM)
    paragraph(c, "A world of stories, courage,<br/>kindness, and unforgettable friendships.",
              M, H - 185, 650, 38, 40, CREAM, "Outfit-ExtraBold")
    paragraph(c, "This brand book is a working master built from Maitri's current approved website identity, "
              "brand strategy, character direction, and asset system. Update it only through documented review.",
              M, 150, 600, 12, 17, HexColor("#F7DDE5"), "Outfit-Medium")
    c.setFillColor(ORANGE); c.setFont("Outfit-Bold", 10)
    c.drawString(M, 92, "MASTER ASSETS")
    c.setFillColor(CREAM); c.setFont("Outfit-Medium", 9)
    c.drawString(M, 73, "09_demos/maitri-circle/public/assets/brand/")
    c.drawString(M, 57, "Maitri mark  /  12 motifs  /  Outfit  /  official palette")
    c.showPage()
    return p + 1


def build():
    c = canvas.Canvas(str(OUT), pagesize=(W, H), pageCompression=1)
    c.setTitle("Maitri Brand Book 2026")
    c.setAuthor("Maitri")
    c.setSubject("Maitri master brand system")

    page = 1
    cover(c); c.showPage(); page += 1
    contents(c, page); c.showPage(); page += 1

    page = foundation_pages(c, page)
    page = expression_pages(c, page)
    page = identity_pages(c, page)
    page = visual_pages(c, page)
    application_pages(c, page)

    c.save()
    print(OUT)


if __name__ == "__main__":
    build()
