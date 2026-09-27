#!/usr/bin/env python3
"""Generate public/cv.pdf - a clean one-page CV with only real portfolio data."""

from fpdf import FPDF

NAVY = (16, 42, 67)
AMBER = (181, 56, 16)
DIM = (85, 100, 117)

pdf = FPDF(format="letter", unit="pt")
pdf.set_auto_page_break(True, margin=42)
pdf.add_page()
W = pdf.w - pdf.l_margin - pdf.r_margin


def h1(text, size=26):
    pdf.set_font("helvetica", "B", size)
    pdf.set_text_color(*NAVY)
    pdf.cell(0, size + 4, text, new_x="LMARGIN", new_y="NEXT")


def kicker(text, size=8.5):
    pdf.set_font("courier", "", size)
    pdf.set_text_color(*AMBER)
    pdf.cell(0, 14, text, new_x="LMARGIN", new_y="NEXT")


def rule():
    pdf.set_draw_color(*NAVY)
    pdf.set_line_width(0.6)
    pdf.line(pdf.l_margin, pdf.get_y(), pdf.l_margin + W, pdf.get_y())
    pdf.ln(8)


def heading(text):
    pdf.ln(4)
    pdf.set_font("courier", "B", 10)
    pdf.set_text_color(*AMBER)
    pdf.cell(0, 14, text, new_x="LMARGIN", new_y="NEXT")


def line(text, bold=False, size=10.5, color=NAVY):
    pdf.set_font("helvetica", "B" if bold else "", size)
    pdf.set_text_color(*color)
    pdf.multi_cell(W, 15, text, new_x="LMARGIN", new_y="NEXT")


def dim(text, size=9.5):
    line(text, size=size, color=DIM)


# ------------------------------------------------------------------ header
h1("AYDIN KHAN")
kicker("MECHATRONICS & AUTOMATION - VIT CHENNAI")
dim("aydin.khan2025@vitstudent.ac.in   |   +91 7200092054   |   Chennai, IN")
rule()

# ------------------------------------------------------------------ about
heading("PROFILE")
line(
    "Mechatronics & Automation student working across mechanical design, electronics and "
    "software. The interest isn't any single discipline - it's the intersections: where a "
    "controller meets a mechanism, where code moves something physical."
)

# ------------------------------------------------------------------ education
heading("EDUCATION")
line("B.Tech - Mechatronics & Automation", bold=True)
dim("Vellore Institute of Technology, Chennai - CGPA 7.0/10.0, expected June 2029")
line("National Public School, Chennai", bold=True)
dim("Grade 10 GPA 8.6/10.0 - Grade 12 GPA 7.5/10.0 - SAT 1190")

# ------------------------------------------------------------------ projects
heading("PROJECTS")
projects = [
    (
        "Automatic Medical Box - BUILT",
        "First-year multidisciplinary project: an automated medical box with alarms and an "
        "app for notifying caretakers. ESP32-driven switch logic, enclosure mechanics and a "
        "Python-side notification flow.",
    ),
    (
        "Python E-Commerce Website - BUILT",
        "Grade 12 project covering the full shop flow: register, login, logout, add-to-cart, "
        "checkout, and a password database underneath.",
    ),
    (
        "Premier League Football Analytics - IN PROGRESS",
        "A football analytics environment under construction: pitch data, player nodes and "
        "match statistics through a DATA -> PROCESS -> ANALYZE -> VISUALIZE pipeline.",
    ),
    (
        "AI Exoplanet Detection - STARTING SOON",
        "Planned research project: detecting exoplanet candidates from telescope light curves "
        "through signal processing and an AI model.",
    ),
    (
        "AR Arduino Interactive Tutor - IN DEVELOPMENT",
        "Unity + AR Foundation app: point a phone at an Arduino UNO for spatial pinout "
        "overlays, an interactive 3D component catalog and animated signal waveforms.",
    ),
]
for title, body in projects:
    line(title, bold=True)
    dim(body)
    pdf.ln(3)

# ------------------------------------------------------------------ skills
heading("SKILLS")
line("Python (intermediate) - scripts, project logic, tooling")
line("SolidWorks (basic) - part & assembly modelling")
line("Java (basic) - structured problem solving")

heading("CURRENTLY LEARNING")
line("JavaScript - web / interactive software (this site is the lesson)")
line("Unity / AR Foundation - spatial apps, feeding the AR Arduino project")
line("Korean - currently learning")

# ------------------------------------------------------------------ activities
heading("LEADERSHIP & ACTIVITIES")
acts = [
    "Event Manager - Futsal, school organising committee (2024)",
    "TiE Entrepreneur Program - IIT Madras Research Park (2024)",
    "Tamil Nadu Clusters - statewide football, team vice captain, ranked 8 of 160 schools (2024)",
    "SANMUN - verbal mention (2024)",
    "Chairman's Cup, Bangalore - interschool football, 3rd place (2023)",
]
for a in acts:
    line("|  " + a, size=10)

pdf.output("public/cv.pdf")
print("wrote public/cv.pdf")
