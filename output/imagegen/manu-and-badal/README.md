# Manu & Badal illustration set

This folder contains the complete visual set for the current 16-spread landscape manuscript proof of **Manu & Badal: A Big, Brave Heart**.

## Deliverables

- `00-character-anchor.png` — Manu and Badal identity/model sheet.
- `01`–`11` — cover/title and story illustrations, corrected to use natural atmospheric text zones.
- `12`–`13` — direct-to-child letter illustrations.
- `14`–`16` — participation/activity illustrations.
- `manu-and-badal-contact-sheet.jpg` — one-page continuity overview.
- `print-upscaled/` — exact 7016 x 2480 px, 300 ppi layout files for a 594 x 210 mm double-page spread.
- `PROMPTS.md` — reproducible art direction and scene prompts.
- `TEXT_DRAFT.md` — concise 2–5-line copy draft matched to each quiet area.
- `framed-v1/` — recoverable archive of the rejected framed-placeholder direction.

## Production status

The source generations are approximately 2098 x 750 px. The `print-upscaled` files are dimensionally correct layout masters, created with high-quality Lanczos resampling, but upscaling does not create true native 300 ppi painted detail. Before a commercial print run, use these as approved creative masters for final high-resolution finishing, color separation, proofing, and printer-specific CMYK/PDF-X output.

The artwork intentionally keeps all primary faces and horse heads away from the center gutter. The scene continues across the right-hand page, then naturally loses detail, saturation, and contrast to create room for 2–5 short lines. There are no framed panels, hard masks, or story words baked into the illustrations.

## Rebuild

Run `python build_assets.py` from this folder to regenerate the contact sheet and print-layout copies.
