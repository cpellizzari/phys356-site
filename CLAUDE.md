# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML website for Physics 356 — **Advanced Topics in Computational Physics** at USAFA. Ten lesson pages (L29–L38) plus eight homework pages. No build step, no package manager — open files directly in a browser or serve with any static file server.

```
AI_ML_Site/
├── index.html              # Landing page with lesson grid and HW table (all 3 modules)
├── lesson29.html – lesson38.html
├── css/style.css           # Single shared stylesheet
├── js/main.js              # Nav active-link logic + Lesson 35 Chart.js GD demo
├── images/
│   ├── bracketing_fig1.png # Fig 1 from Bracketing.pdf (used in lesson29.html)
│   └── gd_gradient_fig1.jpg # Fig 1 from Gradient_Based_Optimization.pdf (used in lesson30.html)
└── hw/
    ├── hw29.html – hw32.html
    └── hw33.html – hw38.html  (hw36.html and hw37.html not yet created)
```

## CDN Dependencies (no local installs)

| Library | Purpose | CDN |
|---------|---------|-----|
| MathJax 3 | LaTeX math rendering | `cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js` |
| Chart.js | Interactive gradient-descent demo (L35) | loaded in lesson35.html |
| highlight.js 11.9 | MATLAB syntax highlighting | `cdn.jsdelivr.net/npm/highlight.js@11.9.0` |
| Google Fonts | Inter + JetBrains Mono | `fonts.googleapis.com` |

## Page Templates

Every lesson page follows this structure:
1. `<head>`: shared CSS + MathJax config + highlight.js (if MATLAB code blocks present)
2. `<header class="site-header">` with nav (same on every page; HW pages use `../` paths)
3. `<main class="page-wrapper">`:
   - `.lesson-banner` (or `.hw-header` for HW pages)
   - `.objectives-box`
   - `.notation-box`
   - Content sections in `.card` divs
4. `<footer class="site-footer">`
5. `<script src="js/main.js">` (or `../js/main.js` in hw/)

HW pages live in `hw/` and use `../css/style.css`, `../js/main.js`, and `../index.html` for nav links.

## Nav Bar (all pages)

All pages share the same 11-item nav. Lesson pages use relative paths; HW pages use `../` prefix.

```html
<a href="index.html">Home</a>
<a href="lesson29.html">L29</a> … <a href="lesson38.html">L38</a>
```

Logo text is `Advanced Topics` (badge stays `PHYS 356`).

## CSS Conventions

All colors and sizing use CSS custom properties defined at the top of `style.css`:
- `--usafa-blue: #003087`, `--usafa-gold: #c5a900`
- `.card` — standard content block
- `.callout.info / .warning / .success` — colored callout boxes
- `.video-link-card` — for YouTube videos that block embedding (Error 153)
- `.objectives-box`, `.notation-box`, `.notation-grid` — shared lesson structure
- `.hw-header` — banner style for HW pages (replaces `.lesson-banner`)

## Correct Lesson → Topic → HW Mapping

| Lesson | Topic | HW file | Notes |
|--------|-------|---------|-------|
| 29 | 1D Optimization: Bracketing & GSS | hw29.html | Buckingham potential |
| 30 | Gradient Descent & Steepest Descent | hw30.html | GD UDF on 2D quadratic |
| 31 | Frequentist Estimation & ML | hw31.html | Laser speckle / exponential |
| 32 | Bayesian Estimation: MAP & MMSE | hw32.html | Recreate MBIP Fig. 2.1 |
| 33 | Intro to ML, regression, regularization | hw33.html | `physics_grades.mat` |
| 34 | Supervised Learning (KNN, SVM, logistic regression) | hw34.html | `sat_data.mat` |
| 35 | Unsupervised Learning (k-means, PCA) | hw35.html | `sat_data.mat` |
| 36 | Linear Classification + Loss Functions + SGD | hw36.html | `sat_data.mat` |
| 37 | Neural Networks + Backpropagation | hw37.html | `sat_data.mat` |
| 38 | CNNs + Transformers/LLMs | hw38.html | — |

## MATLAB Example Policy

In-lesson MATLAB examples must be **clearly distinct** from the homework problem — use a different function/domain so students must extrapolate. Current mapping:
- L29 example: `f(x) = x^2 - 4*ln(x)`, hard-coded 4-step walkthrough (no loop, no UDF) — HW uses Buckingham potential
- L30 example: `f = 4*x1^2 + x2^2`, hard-coded 5-step GD walkthrough (no loop), gradient arrows normalized — HW uses `4*x1^2 - 16*x1 + x2^2 - 6*x2 + 25`
- L31 example: Gaussian ML (sample mean) — HW uses exponential/laser-speckle
- L32 example: scalar Bayesian (single sample) — HW uses 50-dim covariance

## Video Embedding Notes

Some YouTube videos (e.g., 3B1B) return Error 153 and cannot be embedded in `<iframe>`. Use `.video-link-card` instead.

Canonical video placements:
- 3B1B "But what is a neural network?" (`aircAruvnKk`) → L37
- 3B1B "Gradient descent" (`IHZwWFHWa-w`) → L36
- 3B1B "Backpropagation calculus" (`tIeHLnjs5U8`) → L37
- Karpathy "Let's build GPT" (`kCc8FmEb1nY`) → L38

## Source Material

**Optimization & Estimation (L29–L32):**
`~/Library/CloudStorage/OneDrive-afacademy.af.edu/USAFA Classes/Phys 356/2026/Opt_Est_Material/`
- `Bracketing.pdf` / `Bracketing.tex` — L29 bracketing algorithm
- `Gradient_Based_Optimization.pdf` / `.tex` — L30 gradient descent
- `Maxima Minima and GSS.pdf` — L29 GSS derivation
- `MBIP-Edited.pdf` — L31–L32 estimation theory (Bouman, Purdue)
- `Max_Likelihood_HW.pdf` — L31 HW source

**ML & AI (L33–L38):**
`~/Library/CloudStorage/OneDrive-afacademy.af.edu/USAFA Classes/Phys 356/2026/AI_ML_Material/`
- Slides: `356_Lesson_33.pptx` through `356_Lesson_38.pptx`
- HW specs: `HW_33.docx` through `HW_37.docx`
- Reference text: `Text - machine_learning_for_humans.pdf`
- Data: `physics_grades.mat`, `sat_data.mat`

## Page Completion Status

| Page | Status | Notes |
|------|--------|-------|
| lesson29.html | ✅ Final | Bracketing + GSS; hard-coded 4-step MATLAB walkthrough; bracketing_fig1.png + GSS figures |
| lesson30.html | ✅ Final | GD + SD; hard-coded 5-step MATLAB walkthrough; gd_gradient_fig1.jpg |
| lesson31.html | 🔄 Draft | Frequentist estimation & ML — may need review |
| lesson32.html | 🔄 Draft | Bayesian MAP & MMSE — may need review |
| lesson33.html–38.html | 🔄 Draft | ML/AI module — nav not yet updated to L29–L38 |
| hw29.html–hw32.html | 🔄 Draft | Created but not yet reviewed |
| hw33.html–hw38.html | 🔄 Draft | hw36.html and hw37.html not yet created |

## Git / GitHub

Remote: `https://github.com/cpellizzari/phys356-site` (private, branch `main`).
Commit and push after each working session to keep GitHub in sync.
