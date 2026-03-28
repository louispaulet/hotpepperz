# HotPepperz

HotPepperz is a frontend-only Vite + React + Tailwind demo for a fictional custom hot sauce company. The site mixes a bold marketing presentation with an interactive sauce builder where users compose a recipe, generate a whimsical product name and tasting blurb with Groq, and render bottle-label art through Pollinations.

The project is intentionally static and is designed to be hosted on GitHub Pages with `HashRouter`.

## What the app does

- lets users combine peppers across a rising Scoville ladder
- layers supporting accents such as fruit, smoke, acid, and savory notes
- derives a heat profile and flavor summary in real time
- generates a sauce name and tasting copy with Groq
- generates bottle-label artwork with Pollinations
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
- optional: GNU `make` if you want to use the `make` shortcuts

## Install

Clone the repository and install dependencies:

```bash
npm install
```

## Environment

Create `.env.local` in the project root. Use `.env.example` as the template:

```bash
VITE_GROQ_API_KEY=your_groq_key_here
VITE_POLLINATIONS_KEY=your_pollinations_publishable_key_here
VITE_POLLINATIONS_MODEL=flux
```

Environment variables:

- `VITE_GROQ_API_KEY`: Groq API key used in the browser for sauce naming and tasting copy
- `VITE_POLLINATIONS_KEY`: Pollinations publishable key used in the browser for label generation
- `VITE_POLLINATIONS_MODEL`: current tested image model, default `flux`

`VITE_GROQ_API_KEY` and `VITE_POLLINATIONS_KEY` are intentionally frontend-exposed in this demo. Do not treat this setup as production-safe or production architecture.

## Local development

Start the Vite dev server:

```bash
make up
```

If you do not use `make`, the equivalent command is:

```bash
npm run dev -- --host
```

Vite will serve the app locally at:

```text
http://localhost:5173/hotpepperz/#/
```

The `#/` route segment is expected because the app uses `HashRouter` for GitHub Pages compatibility.

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

What each command does:

- `make up` / `npm run dev -- --host`: start the local dev server
- `make test` / `npm run test`: run ESLint and a production build
- `make build` / `npm run build`: create the production build in `dist/`
- `make deploy` / `npm run deploy`: build the app and publish `dist/` through `gh-pages`

## Operation notes

- Sauce names and tasting blurbs are generated with Groq using `openai/gpt-oss-120b`.
- Bottle-label images are generated through Pollinations using `gen.pollinations.ai/image`.
- Pollinations image generation currently requires a publishable key even in this frontend demo.
- The app uses a fallback naming flow if Groq generation fails.
- The label preview depends on a valid Pollinations key and a supported model. `flux` is the current tested working model.

## Validation

```bash
make test
```

This validates the repo by running linting and a production build.

## Build

```bash
make build
```

## Deploy to GitHub Pages

The app is configured for the `hotpepperz` repository path and uses `HashRouter`, so it works on GitHub Pages without custom server rewrites.

```bash
make deploy
```

Equivalent npm command:

```bash
npm run deploy
```

## Project notes

- `vite.config.js` uses `base: '/hotpepperz/'` for GitHub Pages.
- Routing is handled by `HashRouter`.
- `gh-pages` publishes the `dist/` directory.
- The label generator uses `gen.pollinations.ai/image` with a publishable key and explicit model selection.
- If you already exposed a Groq key publicly, rotate it before deploying.
- If you expose a Pollinations publishable key publicly, treat it as demo-only and rotate it if needed.
