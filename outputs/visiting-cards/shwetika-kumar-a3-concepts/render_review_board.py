from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
OUT = ROOT / "visiting-card-concepts-board.png"

W, H = 1600, 2500
BG = "#F7F0E8"
PLUM = "#3B1834"
MUTED = "#806574"
ROSE = "#E99C9F"
AQUA = "#4DC8C6"


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    name = "Arial Bold.ttf" if bold else "Arial.ttf"
    path = Path("/System/Library/Fonts/Supplemental") / name
    return ImageFont.truetype(str(path), size)


def fit_card(path: Path, width: int) -> Image.Image:
    card = Image.open(path).convert("RGBA")
    height = round(width * card.height / card.width)
    return card.resize((width, height), Image.Resampling.LANCZOS)


canvas = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(canvas)

# Soft brand circles anchor the review board without competing with the cards.
draw.ellipse((1420, -80, 1670, 170), fill="#F2D9D5")
draw.ellipse((-105, 2250, 205, 2560), fill="#D8ECE8")

draw.text((76, 72), "Shwetika Kumar — Visiting Card Concepts", fill=PLUM, font=font(44, True))
draw.text((76, 132), "Three directions incorporating Maitri’s selected A3 Companion Circle Garland.", fill=MUTED, font=font(21))
draw.text((1322, 98), "FRONT + BACK", fill="#96677F", font=font(16, True))

sections = [
    ("01 — Warm Minimal", "Quiet, warm and versatile", "v1-warm-minimal"),
    ("02 — Plum Signature", "Premium, confident and memorable", "v2-plum-signature"),
    ("03 — Story World Split", "Expressive and closest to the website’s visual language", "v3-story-world-split"),
]

x_left, x_right = 76, 813
card_width = 711
section_y = 238

for title, subtitle, stem in sections:
    draw.text((76, section_y), title, fill=PLUM, font=font(28, True))
    title_width = draw.textbbox((0, 0), title, font=font(28, True))[2]
    draw.text((96 + title_width, section_y + 8), subtitle, fill="#8B7080", font=font(17))

    card_y = section_y + 54
    for x, side in ((x_left, "front"), (x_right, "back")):
        card = fit_card(ROOT / f"{stem}-{side}.png", card_width)
        shadow = Image.new("RGBA", (card.width + 28, card.height + 34), (0, 0, 0, 0))
        shadow_draw = ImageDraw.Draw(shadow)
        shadow_draw.rounded_rectangle((14, 14, card.width + 14, card.height + 20), radius=15, fill=(62, 30, 49, 34))
        canvas.paste(shadow, (x - 14, card_y - 8), shadow)
        canvas.paste(card, (x, card_y), card)
        draw.text((x + 3, card_y + card.height + 15), side.upper(), fill="#8B7080", font=font(15, True))

    section_y = card_y + fit_card(ROOT / f"{stem}-front.png", card_width).height + 92

footer_y = H - 88
draw.line((76, footer_y - 28, W - 76, footer_y - 28), fill="#D9C9D0", width=2)
draw.text((76, footer_y), "Card trim: 90 × 50 mm", fill=MUTED, font=font(16))
right_text = "Artwork includes 3 mm bleed · contact details shown are placeholders"
right_box = draw.textbbox((0, 0), right_text, font=font(16))
draw.text((W - 76 - (right_box[2] - right_box[0]), footer_y), right_text, fill=MUTED, font=font(16))

canvas.save(OUT, "PNG", optimize=True)
print(OUT)
