import { startTransition, useDeferredValue, useState } from 'react'
import { accents, labelStyles, peppers } from '../data/catalog'
import {
  buildFallbackConcept,
  buildLabelImageUrl,
  generateSauceConcept,
} from '../lib/ai'
import { editorialImages, resolveImageSrc } from '../lib/media'

const numberFormatter = new Intl.NumberFormat('en-US')
const baseUrl = import.meta.env.BASE_URL

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
  const [activeStep, setActiveStep] = useState(1)

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
  const dossierPeppers = hasRecipe ? deferredPeppers.slice(0, 3) : peppers.slice(0, 3)
  const bottleReferences = [
    ...dossierPeppers.map((pepper) => ({
      key: pepper.id,
      src: resolveImageSrc(baseUrl, pepper.image),
      alt: pepper.name,
      label: pepper.name,
    })),
    {
      key: 'packaging',
      src: resolveImageSrc(baseUrl, editorialImages.bottleLineup.image),
      alt: editorialImages.bottleLineup.alt,
      label: 'Packaging',
    },
  ].slice(0, 4)

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
    setActiveStep(1)
  }

  async function handleGenerateConcept() {
    if (!hasRecipe) {
      setStatus('Pick at least one pepper before asking the AI to name the sauce.')
      setActiveStep(1)
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
      setActiveStep(1)
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

  const steps = [
    {
      id: 1,
      label: 'Peppers',
      title: 'Choose your pepper architecture',
      summary: selectedPeppers.length ? `${selectedPeppers.length}/4 selected` : 'Pick a backbone',
      complete: selectedPeppers.length > 0,
    },
    {
      id: 2,
      label: 'Accents',
      title: 'Add accents for body and finish',
      summary: selectedAccents.length ? `${selectedAccents.length}/4 selected` : 'Shape sweetness and finish',
      complete: selectedAccents.length > 0,
    },
    {
      id: 3,
      label: 'Heat',
      title: 'Tune the heat narrative',
      summary: `${heatBias}/10 bias`,
      complete: true,
    },
    {
      id: 4,
      label: 'Style',
      title: 'Choose the label language',
      summary: labelStyle.name,
      complete: true,
    },
  ]

  const canGoPrev = activeStep > 1
  const canGoNext = activeStep < steps.length
  const canAdvanceCurrentStep =
    activeStep === 1 ? selectedPeppers.length > 0 : activeStep === 2 ? selectedAccents.length > 0 : true

  return (
    <section className="panel viewport-panel rounded-[2rem] p-5 sm:p-6 lg:p-7">
      <div className="flex flex-col gap-4 border-b border-white/8 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="section-kicker">Configurator</p>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
            One active step at a time. The live sauce summary stays in the same flow as the choices
            shaping it, so the builder reads like a tool instead of a split-screen report.
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

      <LabStepperHeader steps={steps} activeStep={activeStep} onStepChange={setActiveStep} />

      <div className="mt-5">
        <ActiveStepPanel
          activeStep={activeStep}
          selectedPeppers={selectedPeppers}
          selectedPepperIds={selectedPepperIds}
          onPepperToggle={onPepperToggle}
          selectedAccents={selectedAccents}
          selectedAccentIds={selectedAccentIds}
          onAccentToggle={onAccentToggle}
          heatBias={heatBias}
          setHeatBias={setHeatBias}
          heatLabel={heatLabel}
          averageScoville={averageScoville}
          labelStyles={labelStyles}
          labelStyleId={labelStyleId}
          labelStyleName={labelStyle.name}
          setLabelStyleId={setLabelStyleId}
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          canAdvanceCurrentStep={canAdvanceCurrentStep}
          onPrev={() => setActiveStep((current) => Math.max(1, current - 1))}
          onNext={() => setActiveStep((current) => Math.min(4, current + 1))}
          generatedName={generatedName}
          generatedBlurb={generatedBlurb}
          status={status}
          handleGenerateConcept={handleGenerateConcept}
          handleGenerateLabel={() => handleGenerateLabel()}
          isGeneratingName={isGeneratingName}
          isGeneratingLabel={isGeneratingLabel}
          bottleReferences={bottleReferences}
          styleDirection={styleDirection}
          labelSeed={labelSeed}
          labelImage={labelImage}
          setLabelImage={setLabelImage}
          setIsGeneratingLabel={setIsGeneratingLabel}
          setStatus={setStatus}
          servingSuggestions={servingSuggestions}
          flavorLine={flavorLine}
          labelPrompt={labelPrompt}
          recipeSignals={recipeSignals}
          recipeArchetype={recipeArchetype}
        />
      </div>
    </section>
  )
}

function LabStepperHeader({ steps, activeStep, onStepChange }) {
  return (
    <section className="mt-5 rounded-[1.7rem] border border-white/8 bg-black/14 p-3 sm:p-4">
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step) => {
          const isActive = step.id === activeStep
          const isDone = step.complete && !isActive

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepChange(step.id)}
              className={`rounded-[1.25rem] border px-3.5 py-3 text-left transition ${
                isActive
                  ? 'border-[rgba(255,208,138,0.28)] bg-[linear-gradient(135deg,rgba(247,177,74,0.16),rgba(240,91,52,0.12))]'
                  : isDone
                    ? 'border-white/12 bg-white/6'
                    : 'border-white/8 bg-black/16 hover:border-white/16 hover:bg-white/6'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  Step {step.id}
                </p>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  {isActive ? 'Current' : isDone ? 'Ready' : 'Open'}
                </span>
              </div>
              <p className="mt-2 text-base font-semibold text-[var(--color-cream)]">{step.label}</p>
              <p className="mt-1 text-sm text-[var(--color-text-soft)]">{step.summary}</p>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function ActiveStepPanel({
  activeStep,
  selectedPeppers,
  selectedPepperIds,
  onPepperToggle,
  selectedAccents,
  selectedAccentIds,
  onAccentToggle,
  heatBias,
  setHeatBias,
  heatLabel,
  averageScoville,
  labelStyles,
  labelStyleId,
  labelStyleName,
  setLabelStyleId,
  canGoPrev,
  canGoNext,
  canAdvanceCurrentStep,
  onPrev,
  onNext,
  generatedName,
  generatedBlurb,
  status,
  handleGenerateConcept,
  handleGenerateLabel,
  isGeneratingName,
  isGeneratingLabel,
  bottleReferences,
  styleDirection,
  labelSeed,
  labelImage,
  setLabelImage,
  setIsGeneratingLabel,
  setStatus,
  servingSuggestions,
  flavorLine,
  labelPrompt,
  recipeSignals,
  recipeArchetype,
}) {
  let panel = {
    stepNumber: 1,
    title: 'Choose your pepper architecture',
    copy:
      'Compare the backbone peppers quickly, then move on once the recipe has a clear entry and finish.',
    aside: `${selectedPeppers.length}/4 selected`,
    nextLabel: 'Continue to accents',
    showNext: true,
    content: (
      <PepperGrid
        peppers={peppers}
        selectedPepperIds={selectedPepperIds}
        onPepperToggle={onPepperToggle}
      />
    ),
  }

  if (activeStep === 2) {
    panel = {
      stepNumber: 2,
      title: 'Add accents for body and finish',
      copy: 'Use accents like quick seasoning moves. Keep them concise and let the peppers stay readable.',
      aside: `${selectedAccents.length}/4 selected`,
      nextLabel: 'Continue to heat',
      showNext: true,
      content: (
        <AccentChooser
          accents={accents}
          selectedAccentIds={selectedAccentIds}
          onAccentToggle={onAccentToggle}
        />
      ),
    }
  }

  if (activeStep === 3) {
    panel = {
      stepNumber: 3,
      title: 'Tune the heat narrative',
      copy: 'Shift the bottle from easy-entry to theatrical. The live result card above should react immediately.',
      aside: `${heatBias}/10 bias`,
      nextLabel: 'Continue to style',
      showNext: true,
      content: (
        <HeatTuner
          heatBias={heatBias}
          setHeatBias={setHeatBias}
          heatLabel={heatLabel}
          averageScoville={averageScoville}
        />
      ),
    }
  }

  if (activeStep === 4) {
    panel = {
      stepNumber: 4,
      title: 'Choose the label language',
      copy: 'Pick the visual lane, then generate the concept from the same card that reflects your recipe choices.',
      aside: labelStyleName,
      showNext: false,
      content: (
        <StyleChooser
          labelStyles={labelStyles}
          labelStyleId={labelStyleId}
          setLabelStyleId={setLabelStyleId}
        />
      ),
    }
  }

  return (
    <StepPanel
      stepNumber={panel.stepNumber}
      title={panel.title}
      copy={panel.copy}
      aside={panel.aside}
      headerActions={
        <StepHeaderActions
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          canAdvanceCurrentStep={canAdvanceCurrentStep}
          onPrev={onPrev}
          onNext={onNext}
          nextLabel={panel.nextLabel}
          showNext={panel.showNext}
        />
      }
    >
      <InlineLiveResultCard
        generatedName={generatedName}
        generatedBlurb={generatedBlurb}
        heatLabel={heatLabel}
        averageScoville={averageScoville}
        labelStyleName={labelStyleName}
        selectedPeppers={selectedPeppers.map((pepper) => pepper.name)}
        selectedAccents={selectedAccents.map((accent) => accent.name)}
        status={status}
        handleGenerateConcept={handleGenerateConcept}
        handleGenerateLabel={handleGenerateLabel}
        isGeneratingName={isGeneratingName}
        isGeneratingLabel={isGeneratingLabel}
      />

      {panel.content}

      <ConceptDetailsPanel
        bottleReferences={bottleReferences}
        styleDirection={styleDirection}
        labelSeed={labelSeed}
        labelImage={labelImage}
        generatedName={generatedName}
        setLabelImage={setLabelImage}
        setIsGeneratingLabel={setIsGeneratingLabel}
        setStatus={setStatus}
        servingSuggestions={servingSuggestions}
        flavorLine={flavorLine}
        labelPrompt={labelPrompt}
        recipeSignals={recipeSignals}
        recipeArchetype={recipeArchetype}
      />
    </StepPanel>
  )
}

function PepperGrid({ peppers, selectedPepperIds, onPepperToggle }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {peppers.map((pepper) => {
        const active = selectedPepperIds.includes(pepper.id)

        return (
          <button
            key={pepper.id}
            type="button"
            onClick={() => onPepperToggle(pepper.id)}
            aria-pressed={active}
            className={`rounded-[1.3rem] border p-4 text-left transition ${
              active
                ? 'border-white/18 bg-white/8 shadow-[0_16px_44px_rgba(0,0,0,0.24)]'
                : 'border-white/8 bg-black/16 hover:border-white/16 hover:bg-white/6'
            }`}
            style={{
              backgroundImage: active
                ? `linear-gradient(155deg, ${pepper.tone}24, rgba(255,255,255,0.03))`
                : undefined,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-[var(--color-cream)]">{pepper.name}</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {pepper.heatBand}
                </p>
              </div>
              <span className="mt-1 h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: pepper.tone }} />
            </div>
            <p className="mt-3 text-sm text-[var(--color-text)]">{formatShu(pepper.shuMax)}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{pepper.story}</p>
          </button>
        )
      })}
    </div>
  )
}

function AccentChooser({ accents, selectedAccentIds, onAccentToggle }) {
  return (
    <div className="flex flex-wrap gap-3">
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
  )
}

function HeatTuner({ heatBias, setHeatBias, heatLabel, averageScoville }) {
  return (
    <div className="rounded-[1.5rem] border border-white/8 bg-black/16 p-4">
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
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-7 text-[var(--color-text-soft)]">
          Current read: <span className="font-semibold text-[var(--color-cream)]">{heatLabel}</span>
        </p>
        <p className="text-sm text-[var(--color-text-soft)]">
          {averageScoville ? formatShu(averageScoville) : 'No peppers yet'}
        </p>
      </div>
    </div>
  )
}

function StyleChooser({ labelStyles, labelStyleId, setLabelStyleId }) {
  return (
    <div className="space-y-3">
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
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{style.mood}</p>
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
  )
}

function StepPanel({ stepNumber, title, copy, aside, headerActions, children }) {
  return (
    <section className="rounded-[1.8rem] border border-white/8 bg-black/14 p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="section-kicker">Step {stepNumber}</p>
          <h3 className="mt-2 text-2xl font-semibold text-[var(--color-cream)]">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{copy}</p>
        </div>
        <div className="flex flex-col gap-3 lg:min-w-[18rem] lg:items-end">
          {aside ? (
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">{aside}</p>
          ) : null}
          {headerActions}
        </div>
      </div>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  )
}

function StepHeaderActions({
  canGoPrev,
  canGoNext,
  canAdvanceCurrentStep,
  onPrev,
  onNext,
  nextLabel,
  showNext,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canGoPrev}
        className="secondary-button disabled:cursor-not-allowed disabled:opacity-50"
      >
        Back
      </button>
      {showNext ? (
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext || !canAdvanceCurrentStep}
          className="primary-button disabled:cursor-not-allowed disabled:opacity-50"
        >
          {nextLabel}
        </button>
      ) : (
        <span className="rounded-full border border-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          Final step
        </span>
      )}
    </div>
  )
}

function InlineLiveResultCard({
  generatedName,
  generatedBlurb,
  heatLabel,
  averageScoville,
  labelStyleName,
  selectedPeppers,
  selectedAccents,
  status,
  handleGenerateConcept,
  handleGenerateLabel,
  isGeneratingName,
  isGeneratingLabel,
}) {
  return (
    <section className="rounded-[1.8rem] border border-[rgba(255,208,138,0.18)] bg-[linear-gradient(180deg,rgba(48,30,20,0.78),rgba(16,12,10,0.86))] p-4 sm:p-5">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="section-kicker">Live result</p>
              <h3 className="mt-3 text-2xl font-semibold text-[var(--color-cream)] sm:text-3xl">
                {generatedName}
              </h3>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
              {heatLabel}
            </span>
          </div>

          <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
            {generatedBlurb}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <MetricCard
              label="Average Scoville"
              value={averageScoville ? formatShu(averageScoville) : 'No peppers yet'}
            />
            <MetricCard label="Label direction" value={labelStyleName} />
          </div>
        </div>

        <div className="space-y-3">
          <SelectionSummary label="Peppers in play" items={selectedPeppers} emptyLabel="No peppers yet" />
          <SelectionSummary label="Accents in play" items={selectedAccents} emptyLabel="No accents yet" />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 border-t border-white/8 pt-4 xl:flex-row xl:items-start xl:justify-between">
        <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">{status}</p>

        <div className="flex flex-col gap-3 sm:flex-row">
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
            onClick={handleGenerateLabel}
            disabled={isGeneratingLabel}
            className="secondary-button disabled:cursor-wait disabled:opacity-70"
          >
            {isGeneratingLabel ? 'Rendering...' : 'Refresh Label'}
          </button>
        </div>
      </div>
    </section>
  )
}

function ConceptDetailsPanel({
  bottleReferences,
  styleDirection,
  labelSeed,
  labelImage,
  generatedName,
  setLabelImage,
  setIsGeneratingLabel,
  setStatus,
  servingSuggestions,
  flavorLine,
  labelPrompt,
  recipeSignals,
  recipeArchetype,
}) {
  return (
    <details className="rounded-[1.8rem] border border-white/8 bg-black/12 p-4 sm:p-5">
      <summary className="cursor-pointer list-none">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="section-kicker">Concept details</p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
              Preview, prompt trace, bottle references, and serving notes live here once you want
              the secondary read.
            </p>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Secondary view
          </span>
        </div>
      </summary>

      <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(17,15,12,0.94),rgba(40,18,14,0.88))] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="section-kicker">Bottle preview</p>
                <p className="mt-2 text-sm text-[var(--color-text-soft)]">{styleDirection}</p>
              </div>
              <p className="mono-font text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Seed {labelSeed}
              </p>
            </div>

            <div className="mt-5">
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
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {bottleReferences.map((item) => (
              <figure
                key={item.key}
                className="overflow-hidden rounded-[1.2rem] border border-white/8 bg-black/18"
              >
                <img src={item.src} alt={item.alt} className="h-24 w-full object-cover" />
                <figcaption className="px-3 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.4rem] border border-white/8 bg-black/16 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
              Flavor signals
            </p>
            <div className="mt-4 space-y-4">
              {recipeSignals.map((signal) => (
                <SignalBar key={signal.label} label={signal.label} value={signal.value} compact />
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoCard label="Suggested uses" value={servingSuggestions.join(' / ')} />
            <InfoCard
              label="Flavor line"
              value={flavorLine || 'Select peppers and accents to shape the profile.'}
            />
          </div>

          <InfoCard label="Recipe read" value={recipeArchetype} />

          <InfoCard
            label="Prompt trace"
            value={
              labelPrompt || 'The current recipe will be distilled into a label illustration prompt.'
            }
          />
        </div>
      </div>
    </details>
  )
}

function SelectionSummary({ label, items, emptyLabel }) {
  return (
    <div className="rounded-[1.2rem] border border-white/8 bg-black/16 p-3.5">
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">{label}</p>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {items.length ? (
          items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-sm text-[var(--color-text-soft)]">{emptyLabel}</span>
        )}
      </div>
    </div>
  )
}

function MetricCard({ label, value, subvalue }) {
  return (
    <div className="rounded-[1.4rem] border border-white/8 bg-black/16 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">{label}</p>
      <p className="mt-2 text-xl font-semibold text-[var(--color-cream)]">{value}</p>
      {subvalue ? <p className="mt-2 text-sm text-[var(--color-text-soft)]">{subvalue}</p> : null}
    </div>
  )
}

function SignalBar({ label, value, compact = false }) {
  return (
    <div>
      <div className={`mb-2 flex items-center justify-between ${compact ? 'text-xs' : 'text-sm'} text-[var(--color-text-soft)]`}>
        <span>{label}</span>
        <span>{value}/10</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-saffron),var(--color-flame))]"
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  )
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-[1.4rem] border border-white/8 bg-black/16 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">{label}</p>
      <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{value}</p>
    </div>
  )
}

export default SauceStudio
