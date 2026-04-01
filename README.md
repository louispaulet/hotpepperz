# HotPepperz

HotPepperz is a frontend-only Vite + React + Tailwind site for a fictional specialty hot sauce brand. The project now leans into an editorial food-design direction: a richer homepage, a formulation lab, and a compact pepper wiki, all built as a static app for GitHub Pages.

The site also includes an interactive sauce builder that can generate naming/copy with Groq and label art with Pollinations when API keys are provided.

## What the app does

- presents HotPepperz as an image-led specialty sauce brand
- includes a homepage with denser editorial layouts and bottle-driven storytelling
- includes a lab route for building a sauce recipe and generating a concept
- includes a wiki route for pepper education, sauce families, and pairing rules
- derives heat and flavor signals in real time from selected peppers and accents
- generates sauce names and blurbs with Groq
- generates label artwork with Pollinations
- ships as a pure frontend demo with no backend

## Stack

- Vite + React
- Tailwind CSS via `@tailwindcss/vite`
- `react-router-dom` with `HashRouter`
- `gh-pages` deployment to GitHub Pages
- Groq Chat Completions with `openai/gpt-oss-120b`
- Pollinations image generation through `gen.pollinations.ai/image`

## Prerequisites

- Node.js
- npm
- optional: GNU `make` if you want the Makefile shortcuts

## Install

```bash
npm install
```

## Environment

Create `.env.local` in the project root and use `.env.example` as the template:

```bash
VITE_GROQ_API_KEY=your_groq_key_here
VITE_POLLINATIONS_KEY=your_pollinations_publishable_key_here
VITE_POLLINATIONS_MODEL=flux
```

Environment variables:

- `VITE_GROQ_API_KEY`: Groq API key used in-browser for sauce naming and tasting copy
- `VITE_POLLINATIONS_KEY`: Pollinations publishable key used in-browser for label generation
- `VITE_POLLINATIONS_MODEL`: current tested image model, default `flux`

This is intentionally a frontend demo. The API keys above are exposed to the browser and should not be treated as production-safe.

## Local development

Using `make`:

```bash
make up
```

Using npm directly:

```bash
npm run dev -- --host
```

The local dev URL is:

```text
http://localhost:5173/hotpepperz/#/
```

The app uses `HashRouter`, so the `#/` path segment is expected both locally and on GitHub Pages.

## Common commands

Using `make`:

```bash
make up
make test
make build
make deploy
```

Using npm directly:

```bash
npm run dev -- --host
npm run test
npm run build
npm run deploy
```

Command summary:

- `make up` / `npm run dev -- --host`: start the local dev server
- `make test` / `npm run test`: run ESLint and a production build
- `make build` / `npm run build`: create the production build in `dist/`
- `make deploy` / `npm run deploy`: build the app and publish `dist/` through `gh-pages`

## Project structure

- `src/pages/HomePage.jsx`: editorial landing page with sauce storytelling and image-heavy layouts
- `src/pages/LabPage.jsx`: formulation route and creative references around the builder
- `src/pages/WikiPage.jsx`: pepper field guide, sauce family taxonomy, and pairing guidance
- `src/components/SauceStudio.jsx`: interactive sauce builder and AI generation flow
- `src/data/catalog.js`: peppers, accents, house sauces, sauce families, and lab content
- `src/lib/media.js`: shared image catalog and image metadata

## Operation notes

- Sauce names and tasting blurbs are generated with Groq using `openai/gpt-oss-120b`.
- Label images are generated through Pollinations using `gen.pollinations.ai/image`.
- The app falls back to local naming/copy behavior if Groq generation fails.
- Pollinations generation requires a valid publishable key and a supported model.
- The site includes custom local bottle renders in `public/images/` for featured sauce moments.

## Validation

```bash
make test
```

This runs linting and a production build.

## Build

```bash
make build
```

## Deploy to GitHub Pages

The app is configured for the `hotpepperz` repository path and works on GitHub Pages because it uses `HashRouter` plus `base: '/hotpepperz/'`.

```bash
make deploy
```

Equivalent npm command:

```bash
npm run deploy
```

## Project notes

- `vite.config.js` uses `base: '/hotpepperz/'`.
- Routing is handled by `HashRouter`.
- `gh-pages` publishes the `dist/` directory.
- This repo is intentionally frontend-only and demo-oriented.
- If you expose Groq or Pollinations keys publicly, treat them as temporary and rotate them as needed.
