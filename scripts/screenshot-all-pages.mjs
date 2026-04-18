#!/usr/bin/env node
// Screenshot all key pages of the HotPepperz site using headless Chrome (Puppeteer).
// The script:
//  - starts the Vite dev server
//  - navigates to a curated list of routes (static + representative dynamic slugs)
//  - saves PNG screenshots in a non-versioned ./screenshots directory
//  - shuts down the dev server on completion
import { spawn } from 'child_process'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { pepperProfiles } from '../src/data/pepperProfiles.js'
import { recipeFeatures } from '../src/data/recipesData.js'
import { restaurants } from '../src/data/restaurantsData.js'
import { legends } from '../src/data/legendsData.js'
import { legalPages } from '../src/data/legalContent.js'

const PORT = 5173
const BASE_URL = `http://localhost:${PORT}`
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true })
  } catch (e) {
    // ignore if exists
  }
}

function slugFromRoute(route) {
  if (route === '/') return 'home'
  return route
    .replace(/^\//, '')
    .replace(/\//g, '_')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
  // returns e.g. wiki_peppers_birds-eye-chili
}

async function main() {
  // 1) Start dev server
  console.log('[screenshot-all] Starting dev server...')
  const dev = spawn('npm', ['run', 'dev'], {
    stdio: ['inherit', 'inherit', 'inherit'],
    shell: true,
  })

  // 2) Wait for server to be ready by probing the URL
  await sleep(4000)

  // 3) Prepare routes to capture (dynamically enumerate slugs from data)
  const staticRoutes = ['/', '/lab', '/wiki', '/wiki/origins', '/wiki/heat-pairings']
  const pepperSlugs = pepperProfiles.map((p) => p.slug)
  const recipeSlugs = recipeFeatures.map((r) => r.slug)
  const restaurantSlugs = restaurants.map((r) => r.slug)
  const legendSlugs = legends.map((l) => l.slug)
  const legalSlugs = Object.keys(legalPages)
  const legalRoutes = legalSlugs.map((slug) => `/legal/${slug}`)

  const routes = [
    ...staticRoutes,
    ...pepperSlugs.map((s) => `/wiki/peppers/${s}`),
    ...recipeSlugs.map((s) => `/wiki/recipes/${s}`),
    ...restaurantSlugs.map((s) => `/wiki/restaurants/${s}`),
    ...legendSlugs.map((s) => `/wiki/legends/${s}`),
    ...legalRoutes,
  ]

  // 4) Screenshot pages using Puppeteer
  const puppeteer = await import('puppeteer')
  const browser = await puppeteer.default.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  const viewport = { width: 1280, height: 800 }
  await page.setViewport(viewport)

  // 5) Create output directory
  const repoRoot = path.dirname(fileURLToPath(import.meta.url))
  const outDir = path.resolve(process.cwd(), 'screenshots')
  await ensureDir(outDir)

  console.log(`[screenshot-all] Capturing ${routes.length} routes...`)
  for (const route of routes) {
    const url = `${BASE_URL}${route}`
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
      // Ensure page fully renders
      await sleep(500)
      const filename = slugFromRoute(route) + '.png'
      const outPath = path.resolve(outDir, filename)
      await page.screenshot({ path: outPath, fullPage: true })
      console.log(`  captured ${route} -> ${filename}`)
    } catch (err) {
      console.warn(`  WARN: failed to capture ${route}: ${err?.message ?? err}`)
    }
  }

  await browser.close()
  // 6) Stop dev server
  dev.kill('SIGINT')
  console.log('[screenshot-all] Done. Screenshots saved to ./screenshots')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
