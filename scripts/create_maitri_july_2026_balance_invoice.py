from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "invoices" / "Kramaniti_Maitri_July_2026_Balance_Invoice.pdf"
LOGO = Path("/Users/karanchordia/Documents/GitHub/kramaniti/08_brand_assets/logos/kramaniti_mark_gold.png")
FONT = Path("/Users/karanchordia/Downloads/Outfit/static/Outfit-Regular.ttf")
FONT_BOLD = Path("/Users/karanchordia/Downloads/Outfit/static/Outfit-Bold.ttf")

PAGE_W, PAGE_H = A4
GOLD = colors.HexColor("#D2A900")
INK = colors.HexColor("#151513")
MUTED = colors.HexColor("#6B6A65")
LINE = colors.HexColor("#D8D3C8")
PAPER = colors.HexColor("#FAF9F6")


def money(value):
    return f"Rs. {value:,.0f}"


def text(c, value, x, y, font="Outfit", size=10, colour=INK):
    c.setFont(font, size)
    c.setFillColor(colour)
    c.drawString(x, y, value)


def right(c, value, x, y, font="Outfit", size=10, colour=INK):
    c.setFont(font, size)
    c.setFillColor(colour)
    c.drawRightString(x, y, value)


def wrap(c, value, x, y, width, font="Outfit", size=10, colour=INK, leading=None):
    leading = leading or size * 1.35
    c.setFont(font, size)
    c.setFillColor(colour)
    line, lines = "", []
    for word in value.split():
        candidate = f"{line} {word}".strip()
        if line and c.stringWidth(candidate, font, size) > width:
            lines.append(line)
            line = word
        else:
            line = candidate
    if line:
        lines.append(line)
    for index, item in enumerate(lines):
        c.drawString(x, y - index * leading, item)
    return y - len(lines) * leading


def box(c, x, y, width, height, fill=None, stroke=LINE):
    c.setLineWidth(0.8)
    c.setStrokeColor(stroke)
    if fill:
        c.setFillColor(fill)
        c.rect(x, y, width, height, fill=1, stroke=1)
    else:
        c.rect(x, y, width, height, fill=0, stroke=1)


def label_value(c, label, value, x, y):
    text(c, label, x, y, "Outfit-Bold", 8.8, MUTED)
    text(c, value, x, y - 20, "Outfit-Bold", 12.4)


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdfmetrics.registerFont(TTFont("Outfit", str(FONT)))
    pdfmetrics.registerFont(TTFont("Outfit-Bold", str(FONT_BOLD)))
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle("Kramaniti - Maitri July 2026 Balance Invoice")
    c.setAuthor("Karan Kumar Chordia / Kramaniti")
    c.setSubject("Remaining balance invoice for July 2026")

    if LOGO.exists():
        c.drawImage(ImageReader(str(LOGO)), 66, PAGE_H - 79, 37, 37, preserveAspectRatio=True, mask="auto")
    text(c, "Maitri Dolls x Kramaniti", 124, PAGE_H - 48, "Outfit-Bold", 16.8)
    text(c, "Monthly Digital Growth, AI Systems, and Pre-Launch", 124, PAGE_H - 67, "Outfit", 10.7, MUTED)
    text(c, "Brand Building Retainer", 124, PAGE_H - 82, "Outfit", 10.7, MUTED)
    right(c, "INVOICE", PAGE_W - 58, PAGE_H - 67, "Outfit", 29)
    c.setStrokeColor(GOLD)
    c.setLineWidth(4)
    c.line(0, PAGE_H - 108, PAGE_W, PAGE_H - 108)

    x0, total_w = 56, PAGE_W - 112
    meta_y, meta_h = PAGE_H - 202, 68
    box(c, x0, meta_y, total_w, meta_h)
    for edge in (x0 + total_w / 3, x0 + total_w * 2 / 3):
        c.line(edge, meta_y, edge, meta_y + meta_h)
    label_value(c, "INVOICE NO.", "KKC/MD/BAL-004", x0 + 16, meta_y + 42)
    label_value(c, "INVOICE DATE", "17 August 2026", x0 + total_w / 3 + 16, meta_y + 42)
    label_value(c, "PAYMENT DUE", "On Receipt", x0 + total_w * 2 / 3 + 16, meta_y + 42)

    party_y, party_h, party_w, gap = PAGE_H - 392, 150, 230, 26
    box(c, x0, party_y, party_w, party_h)
    box(c, x0 + party_w + gap, party_y, party_w, party_h)
    text(c, "INVOICE RAISED BY", x0 + 16, party_y + party_h - 28, "Outfit-Bold", 8.8, MUTED)
    text(c, "Karan Kumar Chordia", x0 + 16, party_y + party_h - 55, "Outfit-Bold", 12.7)
    text(c, "Working under the Kramaniti brand name", x0 + 16, party_y + party_h - 78, "Outfit", 10)
    text(c, "PAN: BBEPC2617M", x0 + 16, party_y + party_h - 100, "Outfit", 10)
    wrap(c, "GST is not charged on this invoice. This invoice is raised in individual capacity while Kramaniti tax registration is pending.", x0 + 16, party_y + party_h - 121, party_w - 30, "Outfit", 8.8, MUTED, 12.5)
    bill_x = x0 + party_w + gap
    text(c, "BILL TO", bill_x + 16, party_y + party_h - 28, "Outfit-Bold", 8.8, MUTED)
    text(c, "Maitri Dolls", bill_x + 16, party_y + party_h - 55, "Outfit-Bold", 12.7)
    text(c, "Represented by Shwetika Chandrashekar", bill_x + 16, party_y + party_h - 78, "Outfit", 10)
    wrap(c, "For the Maitri Dolls x Kramaniti monthly retainer engagement.", bill_x + 16, party_y + party_h - 112, party_w - 30, "Outfit", 9.4, MUTED, 14)

    table_y, table_h = PAGE_H - 514, 92
    columns = [220, 80, 80, 103]
    box(c, x0, table_y, total_w, table_h)
    c.setFillColor(INK)
    c.rect(x0, table_y + table_h - 27, total_w, 27, fill=1, stroke=0)
    cursor = x0
    for column in columns[:-1]:
        cursor += column
        c.setStrokeColor(LINE)
        c.line(cursor, table_y, cursor, table_y + table_h)
    positions = [x0 + 10, x0 + columns[0] + 8, x0 + columns[0] + columns[1] + 8, x0 + columns[0] + columns[1] + columns[2] + 8]
    for heading, position in zip(["Description", "Total Retainer", "Received Earlier", "Balance Due"], positions):
        text(c, heading, position, table_y + table_h - 18, "Outfit-Bold", 8.7, colors.white)
    wrap(c, "July 2026 monthly retainer balance payment under the Maitri Foundation Retainer.", x0 + 10, table_y + 49, columns[0] - 20, "Outfit", 9.5, INK, 12.5)
    text(c, "Closing invoice for the July 2026 engagement.", x0 + 10, table_y + 14, "Outfit", 8.3, MUTED)
    right(c, money(35000), x0 + columns[0] + columns[1] - 10, table_y + 43, "Outfit", 9.7)
    right(c, money(17500), x0 + columns[0] + columns[1] + columns[2] - 10, table_y + 43, "Outfit", 9.7)
    right(c, money(17500), x0 + total_w - 10, table_y + 43, "Outfit-Bold", 9.7)

    note_y, note_h, note_w = 164, 157, 252
    box(c, x0, note_y, note_w, note_h, fill=PAPER, stroke=PAPER)
    c.setStrokeColor(GOLD)
    c.setLineWidth(3.2)
    c.line(x0, note_y, x0, note_y + note_h)
    text(c, "Payment Notes", x0 + 18, note_y + note_h - 25, "Outfit-Bold", 11.2)
    current_y = note_y + note_h - 46
    current_y = wrap(c, "Amount in words: Rupees Seventeen Thousand Five Hundred only.", x0 + 18, current_y, note_w - 36, "Outfit", 8.9, MUTED, 11.5) - 8
    current_y = wrap(c, "Total July 2026 retainer: Rs. 35,000. Rs. 17,500 was received earlier on request.", x0 + 18, current_y, note_w - 36, "Outfit", 8.9, MUTED, 11.5) - 8
    wrap(c, "This invoice closes the remaining July 2026 balance. Normal TDS deduction, if applicable, may be made on the base amount.", x0 + 18, current_y, note_w - 36, "Outfit", 8.9, MUTED, 11.5)

    total_x, total_w2, total_h = x0 + note_w + 24, total_w - note_w - 24, 91
    total_y = note_y + note_h - total_h
    box(c, total_x, total_y, total_w2, total_h)
    for line_y in (total_y + 61, total_y + 31):
        c.setStrokeColor(LINE)
        c.line(total_x, line_y, total_x + total_w2, line_y)
    text(c, "Subtotal", total_x + 10, total_y + 71, "Outfit-Bold", 9.4, MUTED)
    right(c, money(17500), total_x + total_w2 - 10, total_y + 71, "Outfit-Bold", 9.4)
    text(c, "GST", total_x + 10, total_y + 41, "Outfit-Bold", 9.4, MUTED)
    right(c, "Rs. 0", total_x + total_w2 - 10, total_y + 41, "Outfit-Bold", 9.4)
    c.setFillColor(INK)
    c.rect(total_x, total_y, total_w2, 31, fill=1, stroke=0)
    text(c, "Total Payable", total_x + 10, total_y + 11, "Outfit-Bold", 12.2, colors.white)
    right(c, money(17500), total_x + total_w2 - 10, total_y + 11, "Outfit-Bold", 12.2, colors.white)

    bank_y, bank_h = 72, 83
    box(c, x0, bank_y, total_w, bank_h)
    text(c, "Bank Details", x0 + 16, bank_y + bank_h - 24, "Outfit-Bold", 11.2)
    c.setStrokeColor(LINE)
    c.line(x0, bank_y + 44, x0 + total_w, bank_y + 44)
    fields = [("Account Holder", "Karan Kumar Chordia", x0 + 16, x0 + 145), ("Branch", "Frazer Town", x0 + 300, x0 + 394), ("Account Number", "5010 0211 0446 33", x0 + 16, x0 + 145), ("IFSC", "HDFC0000714", x0 + 300, x0 + 394)]
    for index, (label, value, lx, vx) in enumerate(fields):
        y = bank_y + 22 if index < 2 else bank_y + 4
        text(c, label, lx, y, "Outfit-Bold", 8.5, MUTED)
        text(c, value, vx, y, "Outfit", 8.8)
    text(c, "Thank you. Please share payment confirmation after transfer.", x0, 43, "Outfit", 8.8, MUTED)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.2)
    c.line(PAGE_W - 208, 57, PAGE_W - 58, 57)
    right(c, "Karan Kumar Chordia", PAGE_W - 58, 38, "Outfit-Bold", 8.3)
    right(c, "For Kramaniti", PAGE_W - 58, 25, "Outfit", 8.3)
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    main()
