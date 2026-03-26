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
| 35 | Neural Networks — Architecture & Forward Pass | hw35.html | `sat_data.mat` |
| 36 | Neural Networks — Backpropagation & Training | hw36.html | MATLAB DigitDataset |
| 37 | CNNs | hw37.html | MATLAB DigitDataset |
| 38 | Transformers & LLMs | hw38.html | — |

**Note:** After the L35–L38 restructure, the source slide decks (`356_Lesson_35.pptx` etc.) no longer align with lesson topics. Slide decks will be updated separately; use slide content as a resource but do not assume slide number = lesson number.

## MATLAB Example Policy

In-lesson MATLAB examples must be **clearly distinct** from the homework problem — use a different function/domain so students must extrapolate. Current mapping:
- L29 example: `f(x) = x^2 - 4*ln(x)`, hard-coded 4-step walkthrough (no loop, no UDF) — HW uses Buckingham potential
- L30 example: `f = 4*x1^2 + x2^2`, hard-coded 5-step GD walkthrough (no loop), gradient arrows normalized, semilog convergence plot — HW uses `4*x1^2 - 16*x1 + x2^2 - 6*x2 + 25`
- L31 example: Gaussian ML (sample mean) — HW uses exponential/laser-speckle
- L32 example: scalar Bayesian (single sample) — HW uses 50-dim covariance
- L35 example: synthetic spectral data with `patternnet` (3 features, 2 classes) — HW uses `sat_data.mat` (2 features, 4 classes) with `patternnet`
- L36 example: MATLAB DigitDataset, DL Toolbox layers (`featureInputLayer` + `fullyConnectedLayer` + `dropoutLayer`), `trainNetwork` with Adam; 3 tunable params at top (`n_per_class=100`, `n_hidden=10`, `learn_rate=0.05`) default to overfitting; 5×5 prediction grid at end — HW uses same dataset/API, students sweep network size, early stopping, and learning rate
- L37 example: MATLAB DigitDataset, CNN with `imageInputLayer` + `convolution2dLayer` + `batchNormalizationLayer` + `maxPooling2dLayer`; pass imageDatastore directly to `trainNetwork` (no flattening); 3 tunable params (n_per_class=200, n_filters=8, learn_rate=0.01); defaults show good generalization — HW has students compare to FC baseline, sweep filter count, add depth, and test data efficiency

## Video Embedding Notes

**All videos must use `.video-link-card` — never `<iframe>`.** YouTube embeds frequently fail silently (Error 153) and show a blank box. Always use the link-card pattern instead:

```html
<a href="https://www.youtube.com/watch?v=VIDEO_ID" target="_blank" rel="noopener" class="video-link-card">
  <div class="video-link-thumb">▶</div>
  <div class="video-link-info">
    <div class="video-link-title">Video Title</div>
    <div class="video-link-channel">Channel Name &mdash; YouTube</div>
  </div>
</a>
```

Canonical video placements:
- StatQuest "Logistic Regression Pt 1" (`yIYKR4sgzI8`) → L34
- CS231n Lecture 2 — Linear Classification (`OoUX-nOEjG0`) → L34
- 3B1B "Gradient descent" (`IHZwWFHWa-w`) → L35
- 3B1B "But what is a neural network?" (`aircAruvnKk`) → L35 (architecture intuition)
- 3B1B "But what is a convolution?" (`KuXjwB4LzSA`) → L37 (first video)
- 3B1B "What is backpropagation really doing?" (`Ilg3gGewQ5U`) → L36 (first video)
- 3B1B "Backpropagation calculus" (`tIeHLnjs5U8`) → L36 (second video)
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
`/Users/caseypellizzari/Library/CloudStorage/OneDrive-afacademy.af.edu/USAFA Classes/Phys 356/2026/AI_ML_Material/`
- CS231n slides, notes, and schedule online at: https://cs231n.stanford.edu/2017/syllabus.html
- Slides: `356_Lesson_33.pptx` through `356_Lesson_38.pptx`
- HW specs: `HW_33.docx` through `HW_37.docx` (note: `HW_36.docx` is the source for hw34.html)
- Reference text: `Text - machine_learning_for_humans.pdf`
- Data: `physics_grades.mat`, `sat_data.mat` (300 GEO objects: visual magnitude + rotation rate, 4 classes)
- Solutions: `hw35_solution.m`, `hw36_solution.m` (MATLAB scripts with working code + instructor comments)

## Page Completion Status

| Page | Status | Notes |
|------|--------|-------|
| lesson29.html | ✅ Final | Bracketing + GSS; hard-coded 4-step MATLAB walkthrough; bracketing_fig1.png + GSS figures; LearnChemE video |
| lesson30.html | ✅ Final | GD + SD; hard-coded 5-step MATLAB walkthrough; gd_gradient_fig1.jpg; Trefor Bazett + Visually Explained videos |
| lesson31.html | ✅ Final | Frequentist estimation & ML; StatQuest MLE video; "Note:" callouts; E[·] notation defined |
| lesson32.html | ✅ Final | Bayesian MAP & MMSE; 3B1B + Veritasium videos; "Note:" callouts; proportionality fix in Gaussian example |
| lesson33.html | ✅ Final | Regression, regularization, bias-variance; β/x clarified; design matrix expanded; argmin equation; hw33 reference updated |
| lesson34.html | ✅ Final | Supervised Learning: KNN, SVM, logistic regression; sat_data.mat |
| lesson35.html | ✅ Final | Neural Networks: architecture, forward pass, activations; patternnet worked example; CS231n video (55:11–104:00); 3B1B gradient descent + "But what is a NN?" videos |
| lesson36.html | ✅ Final | Backprop + training; chain rule; SGD; learning rate SVG diagram; 4-panel train/val curves SVG; 2 × 3B1B videos; MATLAB example on DigitDataset using DL Toolbox layers (`featureInputLayer`, `trainNetwork`); 3 tunable params at top (`n_per_class=100`, `n_hidden=10`, `learn_rate=0.05`); 5×5 test prediction grid; default params show overfitting |
| lesson37.html | ✅ Final | CNNs; animated convolution SVG; max pooling SVG; volume flow SVG; 3B1B "But what is a convolution?" (KuXjwB4LzSA) + CS231n L5 (bNb2fEVKeEo); MATLAB example: CNN on DigitDataset with imageInputLayer, no flattening; 3 tunable params (n_per_class, n_filters, learn_rate) |
| lesson38.html | 🔄 Draft | Transformers |
| hw29.html–hw33.html | ✅ Final | Reviewed; submit/.mlx line removed from all |
| hw34.html | ✅ Final | KNN, SVM, logistic regression on sat_data.mat |
| hw35.html | ✅ Final | patternnet on sat_data.mat (4-class GEO identification); modeled on old HW_37.docx |
| hw36.html | ✅ Final | DigitDataset: network size exploration (Problem 1), overfitting + early stopping (Problem 2), sgdm lr sweep + Adam comparison (Problem 3); no redundant code from lesson; solution at AI_ML_Material/hw36_solution.m |
| hw37.html | ✅ Final | CNN on DigitDataset: CNN vs FC baseline (P1), filter count + depth (P2), data efficiency comparison (P3); solution at AI_ML_Material/hw37_solution.m |
| hw38.html | 🔄 Draft | Not yet created |

## Git / GitHub

Remote: `https://github.com/cpellizzari/phys356-site` (private, branch `main`).
Commit and push after each working session to keep GitHub in sync.
