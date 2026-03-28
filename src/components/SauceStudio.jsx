import { startTransition, useDeferredValue, useState } from 'react'
import { accents, labelStyles, peppers } from '../data/catalog'
import {
  buildFallbackConcept,
  buildLabelImageUrl,
  generateSauceConcept,
} from '../lib/ai'

const numberFormatter = new Intl.NumberFormat('en-US')

function formatShu(value) {
  return `${numberFormatter.format(value)} SHU`
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

  const adjustedHeat = Math.min(
    10,
    Math.max(1, Math.round(Math.log10(averageScoville + 10) * 1.75 + heatBias / 3.2 - 3)),
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

  return [...new Set(notes)].slice(0, 5).join(' · ')
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

function SauceStudio({ compact = false }) {
  const [selectedPepperIds, setSelectedPepperIds] = useState(['serrano', 'habanero'])
  const [selectedAccentIds, setSelectedAccentIds] = useState(['mango', 'lime'])
  const [heatBias, setHeatBias] = useState(6)
  const [labelStyleId, setLabelStyleId] = useState('screenprint')
  const [generatedName, setGeneratedName] = useState('Sun Mango Bell Tower Blaze')
  const [generatedBlurb, setGeneratedBlurb] = useState(
    'Serrano and habanero surge through mango brightness with a lime-cut finish that leaves the room humming.',
  )
  const [labelPrompt, setLabelPrompt] = useState('artisan hot sauce poster label with tropical fire')
  const [labelImage, setLabelImage] = useState('')
  const [status, setStatus] = useState('Choose peppers, set the heat, then conjure a bottle concept.')
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
  const hasRecipe = deferredPeppers.length > 0

  async function handleGenerateConcept() {
    if (!hasRecipe) {
      setStatus('Pick at least one pepper before asking the AI to name the sauce.')
      return
    }

    setIsGeneratingName(true)
    setStatus('Talking to Groq for a fresh name and tasting line...')

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
      setStatus('Concept generated. Rendering a new label now...')
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
        `Groq did not return a live concept. Using the fallback bottle idea instead. ${
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

    setLabelImage(
      buildLabelImageUrl({
        sauceName: nextName,
        peppers: deferredPeppers,
        accents: deferredAccents,
        heatLabel,
        labelStyle,
        labelPrompt: nextPrompt,
        seed: nextSeed,
      }),
    )
    setStatus('The label image is rendering through the browser image endpoint...')
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

  const shellClass = compact
    ? 'panel rounded-[2rem] p-8 sm:p-10'
    : 'panel rounded-[2rem] p-8 sm:p-10 lg:p-12'

  return (
    <section className={shellClass}>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="eyebrow">Sauce builder</p>
          <h2 className="display-font text-4xl uppercase leading-none text-amber-50 sm:text-6xl">
            Assemble the bottle, then let the machines get theatrical.
          </h2>
        </div>
        <div className="max-w-xl rounded-[1.5rem] border border-amber-200/12 bg-black/18 p-4 text-sm text-amber-50/70">
          Pick up to four peppers and four accents. The generated bottle concept is a static-site
          demo and may fall back gracefully if live AI generation is unavailable.
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-amber-200/12 bg-black/18 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-amber-50">Choose your pepper stack</h3>
                <p className="mt-1 text-sm text-amber-50/62">
                  The oldest selection drops away once you pass four peppers.
                </p>
              </div>
              <p className="text-xs uppercase tracking-[0.22em] text-amber-100/55">
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
                    className={`rounded-[1.5rem] border p-4 text-left transition ${
                      active
                        ? 'border-amber-200/42 bg-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.24)]'
                        : 'border-white/8 bg-black/18 hover:border-amber-200/18 hover:bg-white/6'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-amber-50">{pepper.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-amber-100/55">
                          {formatShu(pepper.shuMax)}
                        </p>
                      </div>
                      <span
                        className="mt-1 h-3 w-3 rounded-full"
                        style={{ backgroundColor: pepper.tone }}
                      />
                    </div>
                    <p className="mt-3 text-sm text-amber-50/68">{pepper.story}</p>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[1.75rem] border border-amber-200/12 bg-black/18 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-amber-50">Accents and finishers</h3>
                  <p className="mt-1 text-sm text-amber-50/62">
                    Build sweetness, smoke, acid, or bitter depth.
                  </p>
                </div>
                <p className="text-xs uppercase tracking-[0.22em] text-amber-100/55">
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
                      className={`rounded-full border px-4 py-3 text-sm transition ${
                        active
                          ? 'border-amber-200/40 bg-white/9 text-amber-50'
                          : 'border-white/8 bg-black/18 text-amber-50/72 hover:border-amber-200/18'
                      }`}
                    >
                      {accent.name}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-amber-200/12 bg-black/18 p-5">
              <h3 className="text-xl font-semibold text-amber-50">Dial the heat narrative</h3>
              <p className="mt-1 text-sm text-amber-50/62">
                The slider nudges how aggressive the final concept should feel.
              </p>
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between text-sm text-amber-50/72">
                  <span>Porch glow</span>
                  <span>{heatBias}/10</span>
                  <span>Cathedral heat</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={heatBias}
                  onChange={(event) => setHeatBias(Number(event.target.value))}
                  className="slider-track h-2 w-full cursor-pointer appearance-none rounded-full bg-amber-50/15"
                />
                <div className="mt-6 flex flex-wrap gap-3">
                  {labelStyles.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setLabelStyleId(style.id)}
                      className={`rounded-full border px-4 py-3 text-sm transition ${
                        labelStyleId === style.id
                          ? 'border-amber-200/42 bg-amber-100/12 text-amber-50'
                          : 'border-white/8 bg-black/18 text-amber-50/68 hover:border-amber-200/18'
                      }`}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[1.75rem] border border-amber-200/12 bg-black/18 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-100/55">
              Live recipe output
            </p>
            <h3 className="mt-3 text-3xl font-semibold text-amber-50">{generatedName}</h3>
            <p className="mt-3 text-base text-amber-50/76">{generatedBlurb}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/8 bg-black/18 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-amber-100/55">
                  Estimated heat
                </p>
                <p className="mt-2 text-2xl font-semibold text-amber-50">{heatLabel}</p>
                <p className="mt-2 text-sm text-amber-50/68">
                  Avg. {averageScoville ? formatShu(averageScoville) : 'No peppers selected'}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/8 bg-black/18 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-amber-100/55">
                  Flavor line
                </p>
                <p className="mt-2 text-sm text-amber-50/76">
                  {flavorLine || 'Select peppers and accents to shape the profile.'}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleGenerateConcept}
                disabled={isGeneratingName}
                className="fire-button disabled:cursor-wait disabled:opacity-70"
              >
                {isGeneratingName ? 'Conjuring name...' : 'Generate sauce concept'}
              </button>
              <button
                type="button"
                onClick={() => handleGenerateLabel()}
                disabled={isGeneratingLabel}
                className="ghost-button disabled:cursor-wait disabled:opacity-70"
              >
                {isGeneratingLabel ? 'Rendering label...' : 'Refresh label art'}
              </button>
            </div>

            <p className="mt-4 text-sm text-amber-50/64">{status}</p>
          </section>

          <section className="rounded-[2rem] border border-amber-200/12 bg-[linear-gradient(180deg,rgba(18,10,8,0.92),rgba(45,14,9,0.82))] p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-amber-100/52">
                  Bottle preview
                </p>
                <p className="mt-2 text-sm text-amber-50/60">{labelStyle.name}</p>
              </div>
              <p className="mono-font text-xs uppercase tracking-[0.18em] text-amber-100/45">
                Seed {labelSeed}
              </p>
            </div>

            <div className="bottle-shell mx-auto">
              {labelImage ? (
                <img
                  src={labelImage}
                  alt={`AI-generated label for ${generatedName}`}
                  className="h-full w-full rounded-[1.75rem] object-cover"
                  onLoad={() => {
                    setIsGeneratingLabel(false)
                    setStatus('Bottle label rendered. Tweak the recipe or reroll the art.')
                  }}
                  onError={() => {
                    setIsGeneratingLabel(false)
                    setStatus('The label image endpoint did not return art. Try rerolling the label.')
                  }}
                />
              ) : (
                <div className="flex h-full items-center justify-center rounded-[1.75rem] border border-dashed border-amber-200/16 bg-black/16 px-8 text-center text-sm text-amber-50/58">
                  Generate a concept to cast artwork onto the bottle.
                </div>
              )}
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-white/8 bg-black/18 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-amber-100/55">Prompt trace</p>
              <p className="mt-2 text-sm text-amber-50/68">
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
