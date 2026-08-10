from pathlib import Path

from PIL import Image, ImageOps


APP_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = APP_ROOT.parents[1]
SOURCE_ROOT = REPO_ROOT / "output" / "imagegen" / "manu-and-badal"
DESTINATION = APP_ROOT / "public" / "assets" / "books" / "manu-and-badal" / "spreads"

SCENES = [
    "01-title-cover",
    "02-courtyard-rule",
    "03-why-not",
    "04-badal-arrives",
    "05-quiet-answer",
    "06-difficult-decision",
    "07-one-chance",
    "08-gentle-beginning",
    "09-badal-chooses",
    "10-slow-is-forward",
    "11-bravest-kind-of-strong",
    "12-letter-dear-friend",
    "13-letter-one-kind-step",
    "14-activity-courage-crest",
    "15-activity-courage-tracker",
    "16-activity-brave-promise",
]

WEB_SIZE = (1680, 600)


def main():
    DESTINATION.mkdir(parents=True, exist_ok=True)
    missing = [scene for scene in SCENES if not (SOURCE_ROOT / f"{scene}.png").exists()]
    if missing:
        raise SystemExit(f"Missing source illustrations: {', '.join(missing)}")

    for scene in SCENES:
        source = Image.open(SOURCE_ROOT / f"{scene}.png").convert("RGB")
        web_image = ImageOps.fit(
            source,
            WEB_SIZE,
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.5),
        )
        web_image.save(
            DESTINATION / f"{scene}.webp",
            format="WEBP",
            quality=86,
            method=6,
            exif=b"",
        )

    print(f"Synced {len(SCENES)} book spreads to {DESTINATION}")


if __name__ == "__main__":
    main()
