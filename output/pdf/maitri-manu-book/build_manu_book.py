from pathlib import Path
from math import pi

from PIL import Image, ImageEnhance, ImageFilter, ImageOps
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).resolve().parent
TMP = ROOT / "tmp" / "pdfs" / "maitri-manu-book"
ASSET = ROOT / "09_demos" / "maitri-circle" / "public" / "assets" / "shwetika" / "manu" / "optimized"

MM = 72 / 25.4
TRIM_W, TRIM_H = 297 * MM, 210 * MM
BLEED = 3 * MM
PAGE_W, PAGE_H = TRIM_W + 2 * BLEED, TRIM_H + 2 * BLEED
SPREAD_W = 2 * TRIM_W
PREVIEW_W, PREVIEW_H = SPREAD_W, TRIM_H

INK = HexColor("#172F49")
RUST = HexColor("#C66A36")
GOLD = HexColor("#D9A23A")
CREAM = HexColor("#FFF6E6")
PLUM = HexColor("#542743")
MIST = HexColor("#E9D6B6")

REGULAR = "/Users/karanchordia/Downloads/Outfit/static/Outfit-Regular.ttf"
BOLD = "/Users/karanchordia/Downloads/Outfit/static/Outfit-Bold.ttf"
EXTRA = "/Users/karanchordia/Downloads/Outfit/static/Outfit-ExtraBold.ttf"


def register_fonts():
    pdfmetrics.registerFont(TTFont("Maitri", REGULAR))
    pdfmetrics.registerFont(TTFont("MaitriBold", BOLD))
    pdfmetrics.registerFont(TTFont("MaitriDisplay", EXTRA))


def h(c):
    return HexColor(c)


SPREADS = [
    dict(img="manu-at-ghats.jpg", kicker="A Maitri story", title="Manu & Badal", text="A big, brave heart learns that courage can be quiet, kind, and patient.", kind="title"),
    dict(img="manu-riding-with-father.jpg", kicker="Bithoor, beside the Ganga", title="The courtyard rule", text="In the morning courtyard, Manu watched the boys practise riding. Hooves tapped the dust, wooden swords clicked, and every sound made her step closer. She loved the bright river, hot jalebis, and questions that would not stay quiet in her mind."),
    dict(img="manu-on-horse.jpg", kicker="A question opens a door", title="Why not?", text="Someone laughed softly and said, “Girls do not need to ride like that.” Manu did not shout. She looked at the horses, then asked the bravest question she knew: “Why not?” Later, she picked up a little river stone. “I will learn,” she whispered. “One tiny step at a time.”"),
    dict(img="horse-race.jpg", kicker="That afternoon", title="A horse named Badal", text="A dark, restless horse came to the stable. His name was Badal. He tossed his head whenever anyone came too near. The stable grew loud with worried voices, but Manu saw something different: ears twitching at sharp sounds, eyes searching for a safe place."),
    dict(img="story-one-chance.jpg", kicker="Listening closely", title="A quiet answer", text="Manu stood by the stable door and waited. She did not reach for Badal. She did not ask him to be brave before he was ready. After a long while, his stamping slowed. Manu smiled. Quiet answers count too."),
    dict(img="story-one-chance.jpg", kicker="By evening", title="A difficult decision", text="The stable master sighed. “If no one can handle him, Badal may have to leave.” The words landed heavily in Manu’s chest. She felt scared. Then she remembered her little promise in the dust: begin with one tiny step."),
    dict(img="story-one-chance.jpg", kicker="Manu steps forward", title="One chance", text="“Please give me one chance,” Manu said. Her voice was small at first, but it did not disappear. “Not to force him. To help him trust.” The grown-ups looked at one another. Then the stable master nodded once."),
    dict(img="story-badal-chooses.jpg", kicker="Care before control", title="A gentle beginning", text="Manu brushed Badal’s neck with slow, gentle strokes. When he stepped back, she stepped back too. Trust, Manu learned, cannot be pulled like a rope. It grows when someone notices you, gives you room, and comes back kindly."),
    dict(img="story-badal-chooses.jpg", kicker="The next day", title="Badal chooses", text="Before Manu called him, Badal came to the stall door. Manu laughed with surprise. It felt like the sun had opened inside the stable. She did not rush. She simply held out her hand, and Badal lowered his warm, curious nose."),
    dict(img="story-badal-chooses.jpg", kicker="One careful circle", title="Slow is still forward", text="They did not gallop. They walked. Then they turned. Then they walked again. Every gentle step said the same thing: we are learning together. The courtyard watched a different kind of strength - courage that made another heart feel safe."),
    dict(img="horse-race.jpg", kicker="What everyone saw", title="The bravest kind of strong", text="An elder smiled and said, “Remember this child. One day, her courage will make many people stand taller.” Manu did not know the future. She only knew that Badal was safe, and that asking, waiting, and trying again had changed their day."),
    dict(img="story-letter-from-manu.jpg", kicker="A letter from Manu", title="Dear friend,", text="Some people may tell you what you can and cannot do. When that happens, you can ask a brave question. You can listen. You can learn. You can begin. You do not have to be loud to be strong."),
    dict(img="story-letter-from-manu.jpg", kicker="Keep this close", title="One kind step", text="I was scared too. Courage was not a loud roar for me. It was one small step toward Badal, then another. When you feel scared, take one kind step. That is enough for today. I will be cheering for you.\n\nWith friendship,\nManu"),
    dict(img="story-activities-stickers.jpg", kicker="Make it yours", title="Design your courage crest", text="Draw a crest that feels like you. Add symbols for the qualities you want to carry: brave, curious, kind, strong, or a good friend. Put it somewhere you will see it before a hard moment."),
    dict(img="story-activities-stickers.jpg", kicker="Seven small days", title="Courage tracker", text="For the next seven days, draw or write one small brave action. It might be asking a question, trying again, saying sorry, helping someone feel safe, or waiting patiently. Small is still brave."),
    dict(img="story-activities-stickers.jpg", kicker="A promise for tomorrow", title="My big, brave heart", text="Complete this sentence and share it with a grown-up: “I promise to be brave when ________.” Add a drawing beside your promise. Then remember Manu and Badal: brave can be gentle, too."),
]


def prep_background(name):
    TMP.mkdir(parents=True, exist_ok=True)
    target = TMP / f"spread-{name}.jpg"
    if target.exists():
        return target
    image = Image.open(ASSET / name).convert("RGB")
    image = ImageEnhance.Color(image).enhance(0.88)
    image = ImageEnhance.Contrast(image).enhance(0.90)
    image = ImageOps.fit(image, (2400, 850), method=Image.Resampling.LANCZOS, centering=(0.5, 0.48))
    image.save(target, quality=94)
    return target


def draw_floral_border(c, w, hgt, opacity=0.28):
    c.saveState()
    c.setStrokeColor(GOLD)
    c.setFillColor(GOLD)
    c.setLineWidth(1.2)
    try:
        c.setStrokeAlpha(opacity)
        c.setFillAlpha(opacity)
    except AttributeError:
        pass
    for direction in (1, -1):
        x = 25 if direction == 1 else w - 25
        y = hgt - 32
        c.line(x, y, x + direction * 62, y - 42)
        for i in range(6):
            lx = x + direction * (9 + i * 9)
            ly = y - (9 + i * 6)
            c.circle(lx, ly, 3 + (i % 2), fill=1, stroke=0)
    c.restoreState()


def draw_text_panel(c, page_num, spread, side, show_page_num=True):
    x0 = BLEED
    y0 = BLEED
    safe_l = 15 * MM
    safe_b = 14 * MM
    # `draw_text_panel` is used by the single-page export, where a right-hand
    # page is its own canvas. The corresponding panorama crop is already
    # selected by `draw_single`; the reading field must begin on this page,
    # not one trim-width beyond it.
    page_x = x0
    page_y = y0
    c.saveState()
    c.setFillColor(CREAM)
    try:
        c.setFillAlpha(0.90)
    except AttributeError:
        pass
    # A softly rounded reading field keeps every line legible while its transparent paper tone
    # still allows the continuous scene to show through.
    c.roundRect(page_x + 10 * MM, page_y + 10 * MM, TRIM_W - 20 * MM, TRIM_H - 20 * MM, 24 * MM, fill=1, stroke=0)
    c.restoreState()
    c.saveState()
    c.setFillColor(INK)
    c.setFont("MaitriBold", 8.4)
    c.drawString(page_x + safe_l, page_y + TRIM_H - 30 * MM, spread["kicker"].upper())
    c.setFillColor(PLUM)
    c.setFont("MaitriDisplay", 22 if len(spread["title"]) < 24 else 19)
    title_lines = wrap(c, spread["title"], 21 if len(spread["title"]) < 24 else 18, TRIM_W - safe_l * 2 - 10, "MaitriDisplay")
    ty = page_y + TRIM_H - 45 * MM
    for line in title_lines:
        c.drawString(page_x + safe_l, ty, line)
        ty -= 7.3 * MM
    c.setFillColor(INK)
    c.setFont("Maitri", 12.2)
    text_lines = wrap(c, spread["text"], 12.2, TRIM_W - safe_l * 2 - 8, "Maitri")
    ty -= 5 * MM
    for line in text_lines:
        if not line:
            ty -= 4.5 * MM
        else:
            c.drawString(page_x + safe_l, ty, line)
            ty -= 5.6 * MM
    if show_page_num:
        c.setFont("MaitriBold", 7.5)
        c.setFillColor(RUST)
        c.drawRightString(page_x + TRIM_W - safe_l, page_y + safe_b, str(page_num))
    c.restoreState()


def wrap(c, text, size, width, font):
    lines = []
    for para in text.split("\n"):
        if not para:
            lines.append("")
            continue
        words, current = para.split(), ""
        for word in words:
            trial = f"{current} {word}".strip()
            if pdfmetrics.stringWidth(trial, font, size) <= width or not current:
                current = trial
            else:
                lines.append(current)
                current = word
        if current:
            lines.append(current)
    return lines


def draw_single(c, index, side):
    spread = SPREADS[index]
    page_num = index * 2 + (1 if side == "left" else 2)
    img = prep_background(spread["img"])
    c.saveState()
    # Image aligns to the same 594 mm panoramic scene on its corresponding facing page.
    draw_x = BLEED if side == "left" else BLEED - TRIM_W
    c.drawImage(ImageReader(str(img)), draw_x, BLEED, width=SPREAD_W, height=TRIM_H, mask="auto")
    c.restoreState()
    if spread.get("kind") == "title":
        draw_title_page(c, page_num, side)
    elif side == "right":
        draw_text_panel(c, page_num, spread, side)
    else:
        draw_floral_border(c, PAGE_W, PAGE_H)
        c.saveState()
        c.setFillColor(CREAM)
        try:
            c.setFillAlpha(0.50)
        except AttributeError:
            pass
        c.roundRect(BLEED + 14 * MM, BLEED + 14 * MM, 61 * MM, 17 * MM, 8 * MM, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("MaitriBold", 8)
        c.drawCentredString(BLEED + 44.5 * MM, BLEED + 20 * MM, spread["kicker"].upper())
        c.restoreState()
        c.setFillColor(CREAM)
        c.setFont("MaitriBold", 7.5)
        c.drawString(BLEED + 15 * MM, BLEED + 14 * MM, str(page_num))
    c.showPage()


def draw_title_page(c, page_num, side):
    c.saveState()
    c.setFillColor(INK)
    try:
        c.setFillAlpha(0.78)
    except AttributeError:
        pass
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.restoreState()
    draw_floral_border(c, PAGE_W, PAGE_H, 0.55)
    if side == "left":
        c.setFillColor(CREAM)
        c.setFont("MaitriBold", 10)
        c.drawCentredString(PAGE_W / 2, PAGE_H * 0.67, "A MAITRI STORY")
        c.setFont("MaitriDisplay", 35)
        c.drawCentredString(PAGE_W / 2, PAGE_H * 0.55, "MANU & BADAL")
        c.setFillColor(GOLD)
        c.setFont("MaitriBold", 18)
        c.drawCentredString(PAGE_W / 2, PAGE_H * 0.47, "A Big, Brave Heart")
        c.setFillColor(CREAM)
        c.setFont("Maitri", 11)
        c.drawCentredString(PAGE_W / 2, PAGE_H * 0.37, "A story about asking, waiting, and growing trust.")
    else:
        c.setFillColor(CREAM)
        c.setFont("MaitriDisplay", 24)
        c.drawString(BLEED + 24 * MM, PAGE_H * 0.63, "For every child")
        c.drawString(BLEED + 24 * MM, PAGE_H * 0.55, "who asks, “Why not?”")
        c.setFont("Maitri", 10.8)
        c.drawString(BLEED + 24 * MM, PAGE_H * 0.42, "Story manuscript proof")
        c.drawString(BLEED + 24 * MM, PAGE_H * 0.37, "Maitri • August 2026")
        c.setFillColor(GOLD)
        c.setFont("MaitriBold", 7.5)
        c.drawRightString(PAGE_W - BLEED - 15 * MM, BLEED + 14 * MM, str(page_num))


def make_interior():
    path = OUT / "manu-and-badal-interior-manuscript-proof.pdf"
    c = canvas.Canvas(str(path), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    c.setTitle("Manu & Badal - Interior Manuscript Proof")
    c.setAuthor("Maitri")
    for index in range(len(SPREADS)):
        draw_single(c, index, "left")
        draw_single(c, index, "right")
    c.save()
    return path


def make_preview():
    path = OUT / "manu-and-badal-spread-preview.pdf"
    c = canvas.Canvas(str(path), pagesize=(PREVIEW_W, PREVIEW_H), pageCompression=1)
    c.setTitle("Manu & Badal - Spread Preview")
    for index, spread in enumerate(SPREADS):
        img = prep_background(spread["img"])
        c.drawImage(ImageReader(str(img)), 0, 0, width=PREVIEW_W, height=PREVIEW_H, mask="auto")
        if spread.get("kind") == "title":
            c.saveState(); c.setFillColor(INK); c.setFillAlpha(0.78); c.rect(0,0,PREVIEW_W,PREVIEW_H,fill=1,stroke=0); c.restoreState()
            c.setFillColor(CREAM); c.setFont("MaitriBold", 12); c.drawCentredString(PREVIEW_W/2, PREVIEW_H*0.67, "A MAITRI STORY")
            c.setFont("MaitriDisplay", 40); c.drawCentredString(PREVIEW_W/2, PREVIEW_H*0.55, "MANU & BADAL")
            c.setFillColor(GOLD); c.setFont("MaitriBold", 22); c.drawCentredString(PREVIEW_W/2, PREVIEW_H*0.46, "A Big, Brave Heart")
        else:
            # The text remains entirely on the right page; the gutter stays scenery only.
            c.saveState(); c.setFillColor(CREAM); c.setFillAlpha(0.90); c.roundRect(TRIM_W+10*MM,10*MM,TRIM_W-20*MM,TRIM_H-20*MM,24*MM,fill=1,stroke=0); c.restoreState()
            c.setFillColor(INK); c.setFont("MaitriBold", 8.4); c.drawString(TRIM_W + 15*MM, TRIM_H - 30*MM, spread["kicker"].upper())
            c.setFillColor(PLUM); c.setFont("MaitriDisplay", 22 if len(spread["title"]) < 24 else 19)
            ty = TRIM_H - 45*MM
            for line in wrap(c, spread["title"], 21 if len(spread["title"]) < 24 else 18, TRIM_W-30*MM-10, "MaitriDisplay"):
                c.drawString(TRIM_W+15*MM,ty,line); ty -= 7.3*MM
            c.setFillColor(INK); c.setFont("Maitri",12.2); ty-=5*MM
            for line in wrap(c, spread["text"],12.2,TRIM_W-30*MM-8,"Maitri"):
                if not line: ty-=4.5*MM
                else: c.drawString(TRIM_W+15*MM,ty,line); ty-=5.6*MM
        c.setStrokeColor(Color(1,1,1,alpha=0.25)); c.setLineWidth(0.6); c.line(TRIM_W, 0, TRIM_W, TRIM_H)
        c.showPage()
    c.save()
    return path


def make_cover():
    path = OUT / "manu-and-badal-cover-concept.pdf"
    c = canvas.Canvas(str(path), pagesize=(TRIM_W, TRIM_H), pageCompression=1)
    c.setTitle("Manu & Badal - Cover Concept")
    c.setAuthor("Maitri")
    image = prep_background("story-badal-chooses.jpg")
    c.drawImage(ImageReader(str(image)), 0, 0, width=TRIM_W, height=TRIM_H, mask="auto")
    c.saveState(); c.setFillColor(INK); c.setFillAlpha(0.68); c.rect(0,0,TRIM_W,TRIM_H,fill=1,stroke=0); c.restoreState()
    c.setStrokeColor(GOLD); c.setLineWidth(1.8); c.roundRect(12*MM,12*MM,TRIM_W-24*MM,TRIM_H-24*MM,13*MM,stroke=1,fill=0)
    c.setFillColor(CREAM); c.setFont("MaitriBold", 11); c.drawCentredString(TRIM_W/2,TRIM_H*0.72,"A MAITRI STORY")
    c.setFont("MaitriDisplay", 36); c.drawCentredString(TRIM_W/2,TRIM_H*0.57,"MANU & BADAL")
    c.setFillColor(GOLD); c.setFont("MaitriBold", 19); c.drawCentredString(TRIM_W/2,TRIM_H*0.47,"A Big, Brave Heart")
    c.setFillColor(CREAM); c.setFont("Maitri",10.5); c.drawCentredString(TRIM_W/2,TRIM_H*0.29,"A story about quiet courage and a horse named Badal")
    c.save()
    return path


if __name__ == "__main__":
    register_fonts()
    for output in (make_interior(), make_preview(), make_cover()):
        print(output)
