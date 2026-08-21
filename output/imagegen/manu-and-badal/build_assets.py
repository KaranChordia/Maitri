from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parent
PRINT_DIR = ROOT / "print-upscaled"
CONTACT_SHEET = ROOT / "manu-and-badal-contact-sheet.jpg"

SCENES = [
    "01-title-cover.png",
    "02-courtyard-rule.png",
    "03-why-not.png",
    "04-badal-arrives.png",
    "05-quiet-answer.png",
    "06-difficult-decision.png",
    "07-one-chance.png",
    "08-gentle-beginning.png",
    "09-badal-chooses.png",
    "10-slow-is-forward.png",
    "11-bravest-kind-of-strong.png",
    "12-letter-dear-friend.png",
    "13-letter-one-kind-step.png",
    "14-activity-courage-crest.png",
    "15-activity-courage-tracker.png",
    "16-activity-brave-promise.png",
]

# 594 x 210 mm double-page spread at 300 ppi.
PRINT_SIZE = (7016, 2480)


def load_font(size: int):
    candidates = (
        Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf"),
        Path("/System/Library/Fonts/Supplemental/Arial.ttf"),
    )
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


def build_print_assets():
    PRINT_DIR.mkdir(exist_ok=True)
    for name in SCENES:
        source = Image.open(ROOT / name).convert("RGB")
        fitted = ImageOps.fit(
            source,
            PRINT_SIZE,
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.5),
        )
        fitted.save(PRINT_DIR / name, format="PNG", dpi=(300, 300), optimize=True)


def build_contact_sheet():
    page_w = 2400
    margin = 72
    gutter = 32
    header_h = 126
    label_h = 48
    cols = 4
    thumb_w = (page_w - margin * 2 - gutter * (cols - 1)) // cols
    thumb_h = round(thumb_w * 210 / 594)
    rows = (len(SCENES) + cols - 1) // cols
    page_h = header_h + margin + rows * (thumb_h + label_h + gutter)
    sheet = Image.new("RGB", (page_w, page_h), "#f6efe4")
    draw = ImageDraw.Draw(sheet)
    title_font = load_font(44)
    label_font = load_font(22)
    draw.text((margin, 48), "MANU & BADAL — COMPLETE 16-SPREAD ILLUSTRATION SET", fill="#172f49", font=title_font)

    for index, name in enumerate(SCENES):
        row, col = divmod(index, cols)
        x = margin + col * (thumb_w + gutter)
        y = header_h + row * (thumb_h + label_h + gutter)
        source = Image.open(ROOT / name).convert("RGB")
        thumb = ImageOps.fit(source, (thumb_w, thumb_h), method=Image.Resampling.LANCZOS)
        sheet.paste(thumb, (x, y))
        draw.rectangle((x, y, x + thumb_w, y + thumb_h), outline="#d9a23a", width=3)
        label = name.removesuffix(".png").replace("-", " ").upper()
        draw.text((x, y + thumb_h + 12), label, fill="#542743", font=label_font)

    sheet.save(CONTACT_SHEET, format="JPEG", quality=94, subsampling=0, dpi=(150, 150))


if __name__ == "__main__":
    missing = [name for name in SCENES if not (ROOT / name).exists()]
    if missing:
        raise SystemExit(f"Missing scenes: {', '.join(missing)}")
    build_print_assets()
    build_contact_sheet()
    print(f"Built {len(SCENES)} print-layout files in {PRINT_DIR}")
    print(f"Built {CONTACT_SHEET}")
