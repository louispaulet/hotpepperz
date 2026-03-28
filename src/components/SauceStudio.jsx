import { startTransition, useDeferredValue, useState } from 'react'
import { accents, labelStyles, peppers } from '../data/catalog'
import {
  buildFallbackConcept,
  buildLabelImageUrl,
  generateSauceConcept,
} from '../lib/ai'

const numberFormatter = new Intl.NumberFormat('en-US')

const defaultRecipe = {
  pepperIds: ['serrano', 'habanero'],
  accentIds: ['mango', 'lime'],
  heatBias: 6,
  labelStyleId: 'field-notes',
}

const pepperSignals = {
  jalapeno: { brightness: 3, body: 2, danger: 1 },
  serrano: { brightness: 4, body: 2, danger: 2 },
  cayenne: { brightness: 2, body: 3, danger: 3 },
  aji_amarillo: { brightness: 3, body: 2, sweetness: 2, danger: 3 },
  habanero: { brightness: 2, sweetness: 3, body: 2, danger: 5 },
  scotch_bonnet: { brightness: 2, sweetness: 3, body: 2, danger: 5 },
  ghost: { smoke: 3, body: 4, danger: 8 },
  scorpion: { brightness: 1, body: 2, danger: 9 },
  reaper: { smoke: 1, body: 3, danger: 10 },
}

const accentSignals = {
  mango: { sweetness: 4, body: 1 },
  pineapple: { brightness: 3, sweetness: 2 },
  lime: { brightness: 4 },
  garlic: { body: 3 },
  smoke: { smoke: 5, body: 2 },
  tamarind: { brightness: 2, body: 3, sweetness: 1 },
  hibiscus: { brightness: 3, sweetness: 1 },
  cacao: { smoke: 1, body: 4 },
}

function formatShu(value) {
  return `${numberFormatter.format(value)} SHU`
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function getHeatProfile(selectedPeppers, heatBias) {
  if (!selectedPeppers.length) {
    return {
      averageScoville: 0,
      heatIndex: 1,
      heatLabel: 'Gentle heat',
    }
  }

  const averageScoville = Math.round(
    selectedPeppers.reduce((total, pepper) => total + (pepper.shuMin + pepper.shuMax) / 2, 0) /
      selectedPeppers.length,
  )

  const adjustedHeat = clamp(
    Math.round(Math.log10(averageScoville + 10) * 1.75 + heatBias / 3.2 - 3),
    1,
    10,
  )

  const labels = [
    'Gentle heat',
    'Porch glow',
    'Weeknight spark',
    'Table-side flame',
    'Gathering heat',
    'Slow-bloom burn',
    'Forge-ready',
    'Pulse-raising',
    'Aftershock',
    'Apex heat',
  ]

  return {
    averageScoville,
    heatIndex: adjustedHeat,
    heatLabel: labels[adjustedHeat - 1],
  }
}

function buildFlavorLine(selectedPeppers, selectedAccents) {
  const notes = [
    ...selectedPeppers.flatMap((pepper) => pepper.notes),
    ...selectedAccents.flatMap((accent) => accent.notes),
  ]

  return [...new Set(notes)].slice(0, 6).join(' / ')
}

function buildDefaultLabelSeed() {
  return Math.floor(Date.now() / 1000)
}

function toggleSelection(current, id, max) {
  if (current.includes(id)) {
    return current.filter((entry) => entry !== id)
  }

  if (current.length >= max) {
    return [...current.slice(1), id]
  }

  return [...current, id]
}

function buildRecipeSignals(selectedPeppers, selectedAccents, heatIndex) {
  const totals = {
    brightness: 0,
    sweetness: 0,
    smoke: 0,
    body: 0,
    danger: heatIndex,
  }

  selectedPeppers.forEach((pepper) => {
    const next = pepperSignals[pepper.id]
    if (!next) {
      return
    }

    Object.entries(next).forEach(([key, value]) => {
      totals[key] += value
    })
  })

  selectedAccents.forEach((accent) => {
    const next = accentSignals[accent.id]
    if (!next) {
      return
    }

    Object.entries(next).forEach(([key, value]) => {
      totals[key] += value
    })
  })

  return [
    { label: 'Brightness', value: clamp(Math.round(totals.brightness / 2), 1, 10) },
    { label: 'Sweetness', value: clamp(Math.round(totals.sweetness / 2), 1, 10) },
    { label: 'Smoke', value: clamp(Math.round(totals.smoke / 2), 1, 10) },
    { label: 'Body', value: clamp(Math.round(totals.body / 2), 1, 10) },
    { label: 'Danger', value: clamp(Math.round((totals.danger + heatIndex) / 2), 1, 10) },
  ]
}

function buildServingSuggestions(signals) {
  const map = Object.fromEntries(signals.map((signal) => [signal.label, signal.value]))
  const suggestions = []

  if (map.Brightness >= 6) {
    suggestions.push('fish tacos')
  }

  if (map.Sweetness >= 5) {
    suggestions.push('fried chicken')
  }

  if (map.Smoke >= 5 || map.Body >= 6) {
    suggestions.push('grilled steak')
  }

  if (map.Danger >= 7) {
    suggestions.push('tiny pizza drops')
  }

  if (suggestions.length < 3) {
    suggestions.push('roasted vegetables')
  }

  if (suggestions.length < 3) {
    suggestions.push('egg sandwiches')
  }

  return suggestions.slice(0, 3)
}

function buildStyleDirection(labelStyle, signals) {
  const map = Object.fromEntries(signals.map((signal) => [signal.label, signal.value]))

  if (labelStyle.id === 'apothecary') {
    return 'Collector-bottle energy with archival detail and strong ritual vibes.'
  }

  if (labelStyle.id === 'psychedelic') {
    return 'Maximal color, loud motion, and a visual promise that the bottle is not playing around.'
  }

  if (map.Smoke >= 5) {
    return 'A darker packaging direction makes sense here because the flavor profile carries weight and slow-burn drama.'
  }

  return 'Keep the label ingredient-led and legible so the heat feels designed instead of chaotic.'
}

function buildRecipeArchetype(selectedPeppers, selectedAccents, heatLabel, signals) {
  if (!selectedPeppers.length) {
    return 'Choose at least one pepper to generate a recipe archetype.'
  }

  const map = Object.fromEntries(signals.map((signal) => [signal.label, signal.value]))
  const leadPepper = selectedPeppers[selectedPeppers.length - 1]
  const leadAccent = selectedAccents[0]?.name ?? 'clean finishers'

  if (map.Smoke >= 5) {
    return `${heatLabel} with a dark, smoky finish led by ${leadPepper.name} and anchored by ${leadAccent.toLowerCase()}.`
  }

  if (map.Brightness >= 6) {
    return `${heatLabel} built to feel fast and bright, with ${leadPepper.name} carrying a lifted ${leadAccent.toLowerCase()} edge.`
  }

  if (map.Sweetness >= 5) {
    return `${heatLabel} with fruit-forward body, using ${leadPepper.name} to keep sweetness from turning flat.`
  }

  return `${heatLabel} with a balanced, all-purpose profile where ${leadPepper.name} stays at the center.`
}

function sampleUnique(items, count) {
  const copy = [...items]
  const chosen = []

  while (copy.length > 0 && chosen.length < count) {
    const index = Math.floor(Math.random() * copy.length)
    chosen.push(copy[index])
    copy.splice(index, 1)
  }

  return chosen
}

function SauceStudio() {
  const [selectedPepperIds, setSelectedPepperIds] = useState(defaultRecipe.pepperIds)
  const [selectedAccentIds, setSelectedAccentIds] = useState(defaultRecipe.accentIds)
  const [heatBias, setHeatBias] = useState(defaultRecipe.heatBias)
  const [labelStyleId, setLabelStyleId] = useState(defaultRecipe.labelStyleId)
  const [generatedName, setGeneratedName] = useState('Mango Signal Bloom')
  const [generatedBlurb, setGeneratedBlurb] = useState(
    'Serrano and habanero rise through ripe mango and lime for a bright, quick-entry burn with a polished finish.',
  )
  const [labelPrompt, setLabelPrompt] = useState(
    'editorial hot sauce label with tropical peppers, fruit cues, tactile paper, premium bottle packaging',
  )
  const [labelImage, setLabelImage] = useState('')
  const [status, setStatus] = useState(
    'Build a coherent recipe first, then generate the concept once the flavor logic feels right.',
  )
  const [isGeneratingName, setIsGeneratingName] = useState(false)
  const [isGeneratingLabel, setIsGeneratingLabel] = useState(false)
  const [labelSeed, setLabelSeed] = useState(buildDefaultLabelSeed())

  const selectedPeppers = peppers.filter((pepper) => selectedPepperIds.includes(pepper.id))
  const selectedAccents = accents.filter((accent) => selectedAccentIds.includes(accent.id))
  const deferredPeppers = useDeferredValue(selectedPeppers)
  const deferredAccents = useDeferredValue(selectedAccents)
  const labelStyle = labelStyles.find((style) => style.id === labelStyleId) ?? labelStyles[0]
  const { averageScoville, heatIndex, heatLabel } = getHeatProfile(deferredPeppers, heatBias)
  const flavorLine = buildFlavorLine(deferredPeppers, deferredAccents)
  const recipeSignals = buildRecipeSignals(deferredPeppers, deferredAccents, heatIndex)
  const servingSuggestions = buildServingSuggestions(recipeSignals)
  const styleDirection = buildStyleDirection(labelStyle, recipeSignals)
  const recipeArchetype = buildRecipeArchetype(
    deferredPeppers,
    deferredAccents,
    heatLabel,
    recipeSignals,
  )
  const hasRecipe = deferredPeppers.length > 0

  function hydrateFallbackPreview(nextPepperIds, nextAccentIds, nextHeatBias, nextStyleId, nextStatus) {
    const nextPeppers = peppers.filter((pepper) => nextPepperIds.includes(pepper.id))
    const nextAccents = accents.filter((accent) => nextAccentIds.includes(accent.id))
    const nextHeatProfile = getHeatProfile(nextPeppers, nextHeatBias)
    const fallback = buildFallbackConcept({
      peppers: nextPeppers,
      accents: nextAccents,
      heatIndex: nextHeatProfile.heatIndex,
    })

    setSelectedPepperIds(nextPepperIds)
    setSelectedAccentIds(nextAccentIds)
    setHeatBias(nextHeatBias)
    setLabelStyleId(nextStyleId)
    setGeneratedName(fallback.name)
    setGeneratedBlurb(fallback.blurb)
    setLabelPrompt(fallback.labelPrompt)
    setLabelImage('')
    setLabelSeed(buildDefaultLabelSeed())
    setStatus(nextStatus)
    setIsGeneratingLabel(false)
    setIsGeneratingName(false)
  }

  async function handleGenerateConcept() {
    if (!hasRecipe) {
      setStatus('Pick at least one pepper before asking the AI to name the sauce.')
      return
    }

    setIsGeneratingName(true)
    setStatus('Generating a bottle concept from the current formulation...')

    try {
      const concept = await generateSauceConcept({
        peppers: deferredPeppers,
        accents: deferredAccents,
        heatLabel,
        labelStyle,
      })

      setGeneratedName(concept.name)
      setGeneratedBlurb(concept.blurb)
      setLabelPrompt(concept.labelPrompt)
      setStatus('Concept generated. Rendering label art now...')
      await handleGenerateLabel(concept.name, concept.labelPrompt)
    } catch (error) {
      const fallback = buildFallbackConcept({
        peppers: deferredPeppers,
        accents: deferredAccents,
        heatIndex,
      })

      setGeneratedName(fallback.name)
      setGeneratedBlurb(fallback.blurb)
      setLabelPrompt(fallback.labelPrompt)
      setStatus(
        `Live naming was unavailable, so the lab produced a fallback concept instead. ${
          error instanceof Error ? error.message : ''
        }`.trim(),
      )
      await handleGenerateLabel(fallback.name, fallback.labelPrompt)
    } finally {
      setIsGeneratingName(false)
    }
  }

  async function handleGenerateLabel(nextName = generatedName, nextPrompt = labelPrompt) {
    if (!hasRecipe) {
      setStatus('The label prompt needs at least one pepper in the recipe.')
      return
    }

    setIsGeneratingLabel(true)
    const nextSeed = buildDefaultLabelSeed()
    setLabelSeed(nextSeed)
    setLabelImage('')

    const nextUrl = buildLabelImageUrl({
      sauceName: nextName,
      peppers: deferredPeppers,
      accents: deferredAccents,
      heatLabel,
      labelStyle,
      labelPrompt: nextPrompt,
      seed: nextSeed,
    })

    if (!nextUrl) {
      setIsGeneratingLabel(false)
      setStatus('Add VITE_POLLINATIONS_KEY to enable live label rendering in the browser.')
      return
    }

    setLabelImage(nextUrl)
    setStatus('Rendering label artwork through the image endpoint...')
  }

  function onPepperToggle(pepperId) {
    startTransition(() => {
      setSelectedPepperIds((current) => toggleSelection(current, pepperId, 4))
    })
  }

  function onAccentToggle(accentId) {
    startTransition(() => {
      setSelectedAccentIds((current) => toggleSelection(current, accentId, 4))
    })
  }

  function handleReset() {
    hydrateFallbackPreview(
      defaultRecipe.pepperIds,
      defaultRecipe.accentIds,
      defaultRecipe.heatBias,
      defaultRecipe.labelStyleId,
      'Recipe reset to the default bright-fruit formulation.',
    )
  }

  function handleRandomize() {
    const randomPeppers = sampleUnique(peppers, 2 + Math.floor(Math.random() * 2)).map(
      (pepper) => pepper.id,
    )
    const randomAccents = sampleUnique(accents, 2 + Math.floor(Math.random() * 2)).map(
      (accent) => accent.id,
    )
    const randomStyle = sampleUnique(labelStyles, 1)[0]?.id ?? defaultRecipe.labelStyleId
    const randomHeatBias = 3 + Math.floor(Math.random() * 7)

    hydrateFallbackPreview(
      randomPeppers,
      randomAccents,
      randomHeatBias,
      randomStyle,
      'New randomized formulation loaded. Review it before generating a fresh concept.',
    )
  }

  return (
    <section className="panel rounded-[2rem] p-5 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-5 border-b border-white/8 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="section-kicker">Formulation workspace</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-6xl">
            Build the sauce like a recipe review, not a slot machine.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
            Choose up to four peppers and four accents. The dossier on the right updates in real
            time so users can understand what they are building before they ask AI to package it.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleRandomize} className="secondary-button">
            Randomize Recipe
          </button>
          <button type="button" onClick={handleReset} className="secondary-button">
            Reset
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          {
            step: '01',
            title: 'Choose pepper roles',
            copy: 'Backbone, spark, or apex heat. Add only what the bottle needs.',
          },
          {
            step: '02',
            title: 'Balance body and finish',
            copy: 'Accents should sharpen, sweeten, or deepen the sauce, not blur it.',
          },
          {
            step: '03',
            title: 'Generate the package',
            copy: 'Name and label direction come last, once the recipe reads clearly.',
          },
        ].map((item) => (
          <article key={item.step} className="rounded-[1.5rem] border border-white/8 bg-black/14 p-5">
            <p className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
              Step {item.step}
            </p>
            <h3 className="mt-4 text-xl font-semibold text-[var(--color-cream)]">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{item.copy}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
        <div className="space-y-6">
          <section className="rounded-[1.8rem] border border-white/8 bg-black/14 p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-kicker">Step 1</p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--color-cream)]">
                  Choose your pepper architecture
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                  The oldest selection drops away after four peppers so the recipe stays legible.
                </p>
              </div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                {selectedPeppers.length}/4 selected
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {peppers.map((pepper) => {
                const active = selectedPepperIds.includes(pepper.id)

                return (
                  <button
                    key={pepper.id}
                    type="button"
                    onClick={() => onPepperToggle(pepper.id)}
                    aria-pressed={active}
                    className={`rounded-[1.4rem] border p-4 text-left transition ${
                      active
                        ? 'border-white/18 bg-white/8 shadow-[0_16px_44px_rgba(0,0,0,0.24)]'
                        : 'border-white/8 bg-black/16 hover:border-white/16 hover:bg-white/6'
                    }`}
                    style={{
                      backgroundImage: active
                        ? `linear-gradient(155deg, ${pepper.tone}26, rgba(255,255,255,0.03))`
                        : undefined,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-[var(--color-cream)]">{pepper.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                          {pepper.heatBand}
                        </p>
                      </div>
                      <span className="mt-1 h-3 w-3 rounded-full" style={{ backgroundColor: pepper.tone }} />
                    </div>
                    <p className="mt-3 text-sm text-[var(--color-text)]">{formatShu(pepper.shuMax)}</p>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{pepper.story}</p>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="rounded-[1.8rem] border border-white/8 bg-black/14 p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-kicker">Step 2</p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--color-cream)]">
                  Add accents for sweetness, acid, smoke, or body
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                  Choose what the sauce needs. Most bottles get muddy before they get interesting.
                </p>
              </div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                {selectedAccents.length}/4 selected
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {accents.map((accent) => {
                const active = selectedAccentIds.includes(accent.id)

                return (
                  <button
                    key={accent.id}
                    type="button"
                    onClick={() => onAccentToggle(accent.id)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-3 text-left transition ${
                      active
                        ? 'border-white/18 bg-white/8 text-[var(--color-cream)]'
                        : 'border-white/8 bg-black/16 text-[var(--color-text-soft)] hover:border-white/16 hover:bg-white/6'
                    }`}
                    style={{
                      boxShadow: active ? `inset 0 0 0 1px ${accent.tone}40` : undefined,
                    }}
                  >
                    <span className="font-semibold">{accent.name}</span>
                    <span className="ml-2 text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                      {accent.role}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[1.8rem] border border-white/8 bg-black/14 p-5 sm:p-6">
              <p className="section-kicker">Step 3</p>
              <h3 className="mt-2 text-2xl font-semibold text-[var(--color-cream)]">
                Tune the heat narrative
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                This slider adjusts the personality of the final concept as much as the sensation.
              </p>
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between text-sm text-[var(--color-text-soft)]">
                  <span>Low-key</span>
                  <span>{heatBias}/10</span>
                  <span>Theatrical</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={heatBias}
                  onChange={(event) => setHeatBias(Number(event.target.value))}
                  className="slider-track h-2 w-full cursor-pointer appearance-none rounded-full bg-white/14"
                />
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/8 bg-black/14 p-5 sm:p-6">
              <p className="section-kicker">Art direction</p>
              <h3 className="mt-2 text-2xl font-semibold text-[var(--color-cream)]">
                Choose the label language
              </h3>
              <div className="mt-5 space-y-3">
                {labelStyles.map((style) => {
                  const active = style.id === labelStyleId

                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setLabelStyleId(style.id)}
                      className={`w-full rounded-[1.3rem] border p-4 text-left transition ${
                        active
                          ? 'border-white/18 bg-white/8'
                          : 'border-white/8 bg-black/16 hover:border-white/16 hover:bg-white/6'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-base font-semibold text-[var(--color-cream)]">{style.name}</p>
                          <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                            {style.mood}
                          </p>
                        </div>
                        {active ? (
                          <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                            Active
                          </span>
                        ) : null}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <section className="rounded-[1.8rem] border border-white/8 bg-black/14 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Live dossier</p>
                <h3 className="mt-3 text-3xl font-semibold text-[var(--color-cream)]">{generatedName}</h3>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                {heatLabel}
              </span>
            </div>

            <p className="mt-4 text-base leading-8 text-[var(--color-text-soft)]">{generatedBlurb}</p>
            <p className="mt-4 rounded-[1.3rem] border border-white/8 bg-black/16 px-4 py-4 text-sm leading-7 text-[var(--color-text)]">
              {recipeArchetype}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedPeppers.map((pepper) => (
                <span
                  key={pepper.id}
                  className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]"
                >
                  {pepper.name}
                </span>
              ))}
              {selectedAccents.map((accent) => (
                <span
                  key={accent.id}
                  className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]"
                >
                  {accent.name}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-white/8 bg-black/16 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  Average Scoville
                </p>
                <p className="mt-2 text-2xl font-semibold text-[var(--color-cream)]">
                  {averageScoville ? formatShu(averageScoville) : 'No peppers yet'}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-black/16 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  Label direction
                </p>
                <p className="mt-2 text-lg font-semibold text-[var(--color-cream)]">{labelStyle.name}</p>
                <p className="mt-2 text-sm text-[var(--color-text-soft)]">{labelStyle.mood}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {recipeSignals.map((signal) => (
                <div key={signal.label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-[var(--color-text-soft)]">
                    <span>{signal.label}</span>
                    <span>{signal.value}/10</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-saffron),var(--color-flame))]"
                      style={{ width: `${signal.value * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleGenerateConcept}
                disabled={isGeneratingName}
                className="primary-button disabled:cursor-wait disabled:opacity-70"
              >
                {isGeneratingName ? 'Generating...' : 'Generate Concept'}
              </button>
              <button
                type="button"
                onClick={() => handleGenerateLabel()}
                disabled={isGeneratingLabel}
                className="secondary-button disabled:cursor-wait disabled:opacity-70"
              >
                {isGeneratingLabel ? 'Rendering...' : 'Refresh Label'}
              </button>
            </div>

            <p className="mt-4 rounded-[1.2rem] border border-white/8 bg-black/14 px-4 py-3 text-sm leading-7 text-[var(--color-text-soft)]">
              {status}
            </p>
          </section>

          <section className="rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(17,15,12,0.94),rgba(40,18,14,0.88))] p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="section-kicker">Bottle preview</p>
                <p className="mt-2 text-sm text-[var(--color-text-soft)]">{styleDirection}</p>
              </div>
              <p className="mono-font text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Seed {labelSeed}
              </p>
            </div>

            <div className="bottle-shell mx-auto">
              {labelImage ? (
                <img
                  src={labelImage}
                  alt={`AI-generated label for ${generatedName}`}
                  className="h-full w-full rounded-[1.7rem] object-cover"
                  onLoad={() => {
                    setIsGeneratingLabel(false)
                    setStatus('Label rendered. Review the packaging direction or reroll the art.')
                  }}
                  onError={() => {
                    setLabelImage('')
                    setIsGeneratingLabel(false)
                    setStatus('The label endpoint did not return art. Try rerolling or check the key.')
                  }}
                />
              ) : (
                <div className="flex h-full items-center justify-center rounded-[1.7rem] border border-dashed border-white/14 bg-black/18 px-8 text-center text-sm leading-7 text-[var(--color-text-soft)]">
                  Generate a concept to cast artwork onto the bottle.
                </div>
              )}
            </div>

            <div className="mt-5 rounded-[1.4rem] border border-white/8 bg-black/16 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                Suggested uses
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {servingSuggestions.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[1.4rem] border border-white/8 bg-black/16 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                Flavor line
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                {flavorLine || 'Select peppers and accents to shape the profile.'}
              </p>
            </div>

            <div className="mt-5 rounded-[1.4rem] border border-white/8 bg-black/16 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                Prompt trace
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                {labelPrompt || 'The current recipe will be distilled into a label illustration prompt.'}
              </p>
            </div>
          </section>
        </aside>
      </div>
    </section>
  )
}

export default SauceStudio
