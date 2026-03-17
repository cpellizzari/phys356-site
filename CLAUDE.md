# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML website for Physics 356 (ML/AI module) at USAFA. Six lesson pages (L33–L38) plus homework pages. No build step, no package manager — open files directly in a browser or serve with any static file server.

```
AI_ML_Site/
├── index.html          # Landing page with lesson grid and HW table
├── lesson33.html – lesson38.html
├── css/style.css       # Single shared stylesheet
├── js/main.js          # Nav active-link logic + Lesson 35 Chart.js GD demo
└── hw/
    ├── hw33.html – hw38.html
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

## CSS Conventions

All colors and sizing use CSS custom properties defined at the top of `style.css`:
- `--usafa-blue: #003087`, `--usafa-gold: #c5a900`
- `.card` — standard content block
- `.callout.info / .warning / .success` — colored callout boxes
- `.video-link-card` — for YouTube videos that block embedding (Error 153)
- `.objectives-box`, `.notation-box`, `.notation-grid` — shared lesson structure
- `.hw-header` — banner style for HW pages (replaces `.lesson-banner`)

## Correct Lesson → Topic → HW Mapping

| Lesson | Topic | HW file | HW dataset |
|--------|-------|---------|------------|
| 33 | Intro to ML, regression, regularization | hw33.html | `physics_grades.mat` |
| 34 | Supervised Learning (KNN, SVM, logistic regression) | hw34.html | `sat_data.mat` |
| 35 | Unsupervised Learning (k-means, PCA) | hw35.html | `sat_data.mat` |
| 36 | Linear Classification + Loss Functions + SGD | hw36.html | `sat_data.mat` |
| 37 | Neural Networks + Backpropagation | hw37.html | `sat_data.mat` |
| 38 | CNNs + Transformers/LLMs + Diffusion | hw38.html | — |

**Note:** `index.html` currently shows an older incorrect topic mapping — update it when lessons are rewritten.

## Video Embedding Notes

Some YouTube videos (e.g., 3B1B) return Error 153 and cannot be embedded in `<iframe>`. Use `.video-link-card` instead of `<iframe>` for those. Videos that can be embedded use a standard `<iframe>` with `allowfullscreen`.

Canonical video placements:
- 3B1B "But what is a neural network?" (`aircAruvnKk`) → L37
- 3B1B "Gradient descent" (`IHZwWFHWa-w`) → L36
- 3B1B "Backpropagation calculus" (`tIeHLnjs5U8`) → L37
- Karpathy "Let's build GPT" (`kCc8FmEb1nY`) → L38

## Source Material

Located at:
`~/Library/CloudStorage/OneDrive-afacademy.af.edu/USAFA Classes/Phys 356/2026/AI_ML_Material/`

- Slides: `356_Lesson_33.pptx` through `356_Lesson_38.pptx`
- HW specs: `HW_33.docx` through `HW_37.docx`
- Reference text: `Text - machine_learning_for_humans.pdf`
- Data: `physics_grades.mat`, `sat_data.mat`
