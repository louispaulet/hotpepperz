import Footer from '../components/Footer'
import SauceStudio from '../components/SauceStudio'
import VisualImage from '../components/VisualImage'
import { labSteps, pairingRules } from '../data/catalog'
import { editorialImages, resolveImageSrc } from '../lib/media'

const baseUrl = import.meta.env.BASE_URL

const noteVisuals = [
  editorialImages.fermentedJar,
  editorialImages.habaneroPlant,
  editorialImages.bottleLineup,
]

const referenceCards = [
  {
    visual: editorialImages.marketCrate,
    title: 'Choose ripe fruit first',
    copy:
      'Great sauce begins in the produce bin. Dense walls, good color, and clean aroma matter more than bragging rights on the label.',
  },
  {
    visual: editorialImages.habaneroMacro,
    title: 'Read the flesh',
    copy:
      'Thin peppers often feel quicker and sharper. Thicker peppers can bring body, sweetness, and a slower unfolding burn.',
  },
  {
    visual: editorialImages.fermentedJar,
    title: 'Respect fermentation',
    copy:
      'A ferment can soften raw aggression, deepen savoriness, and make a hot sauce feel settled rather than raw.',
  },
  {
    visual: editorialImages.ajiAmarilloBottle,
    title: 'Bottle with intention',
    copy:
      'Before you name a sauce, know where it belongs: tacos, roast chicken, ceviche accompaniments, or a very careful tasting spoon.',
  },
]

function LabPage() {
  return (
    <div className="page-sections lab-page">
      <section className="grid gap-4">
        <IntroSection />
        <SauceStudio />
      </section>
      <OptionalReferenceSection />
      <Footer />
    </div>
  )
}

function IntroSection() {
  return (
    <section className="panel lab-intro rounded-[2rem] p-5 sm:p-6 lg:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="section-kicker">Sauce workshop</p>
          <h1 className="display-font mt-2 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
            Build a bottle the way a careful sauce maker thinks.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
            Choose the peppers, balance the seasoning, and decide how much fire the final bottle
            should carry. The aim is not novelty heat. The aim is a sauce with structure.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-white/8 bg-black/16 p-4 lg:max-w-md">
          <p className="section-kicker">Bench reminder</p>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{pairingRules[0]}</p>
        </div>
      </div>
    </section>
  )
}

function OptionalReferenceSection() {
  return (
    <details className="panel lab-reference-panel rounded-[2rem] p-5 sm:p-6 lg:p-7">
      <summary className="cursor-pointer list-none">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="section-kicker">Reference notes</p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--color-cream)] sm:text-3xl">
              Open for ingredient reminders, process notes, and bottling cues.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
            This section keeps the slower reading nearby without getting in the way of the actual
            build. Think of it as the margin notes from the workshop bench.
          </p>
        </div>
      </summary>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-4">
          <div>
            <p className="section-kicker">Ingredient cues</p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
              Use these visual notes to think about freshness, texture, fermentation, and the
              bottle you want to end up holding.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {referenceCards.map((item) => (
              <article key={item.title} className="panel lab-reference-card overflow-hidden rounded-[1.8rem]">
                <VisualImage
                  src={resolveImageSrc(baseUrl, item.visual.image)}
                  alt={item.visual.alt}
                  item={item.visual}
                  className="h-40 w-full"
                />
                <div className="p-6">
                  <p className="section-kicker">Workshop cue</p>
                  <h2 className="mt-4 text-2xl font-semibold text-[var(--color-cream)]">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="section-kicker">Process notes</p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
              These three steps mirror the order many good sauces reveal themselves: pepper choice,
              balance, then maturity and finish.
            </p>
          </div>
          <div className="grid gap-4">
            {labSteps.map((step, index) => (
              <article key={step.title} className="panel lab-process-card overflow-hidden rounded-[1.8rem]">
                <img
                  src={resolveImageSrc(baseUrl, noteVisuals[index].image)}
                  alt={noteVisuals[index].alt}
                  className="h-40 w-full object-cover"
                  style={{ objectPosition: noteVisuals[index].position }}
                />
                <div className="p-6">
                  <p className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                    Note 0{index + 1}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold text-[var(--color-cream)]">{step.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </details>
  )
}

export default LabPage
