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
    title: 'Ingredient energy',
    copy: 'Start with abundance and ingredient context before the controls ask for decisions.',
  },
  {
    visual: editorialImages.habaneroMacro,
    title: 'Texture references',
    copy: 'Close crops keep the page tactile without stealing too much vertical space.',
  },
  {
    visual: editorialImages.fermentedJar,
    title: 'Fermentation cues',
    copy: 'Process imagery keeps the recipe builder grounded in something believable.',
  },
  {
    visual: editorialImages.ajiAmarilloBottle,
    title: 'Packaging target',
    copy: 'Bottle references show what the final concept is trying to become.',
  },
]

function LabPage() {
  return (
    <div className="page-sections">
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
    <section className="panel rounded-[2rem] p-5 sm:p-6 lg:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="section-kicker">Hot sauce lab</p>
          <h1 className="display-font mt-2 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
            Build the blend, see the effect, generate the concept.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
            The lab opens directly on the configurator now, so the active step, the live result,
            and the main action stay in one reading flow.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-white/8 bg-black/16 p-4 lg:max-w-md">
          <p className="section-kicker">Quick note</p>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{pairingRules[0]}</p>
        </div>
      </div>
    </section>
  )
}

function OptionalReferenceSection() {
  return (
    <details className="panel rounded-[2rem] p-5 sm:p-6 lg:p-7">
      <summary className="cursor-pointer list-none">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="section-kicker">Optional references</p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--color-cream)] sm:text-3xl">
              Open this only if you want visual prompts and step notes.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
            All of the extra editorial material lives behind one optional panel now, so the lab
            itself does not end with multiple giant things to click.
          </p>
        </div>
      </summary>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-4">
          <div>
            <p className="section-kicker">Visual prompts</p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
              Ingredient abundance, texture, fermentation, and packaging cues stay available here
              when you want extra inspiration.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {referenceCards.map((item) => (
              <article key={item.title} className="panel overflow-hidden rounded-[1.8rem]">
                <VisualImage
                  src={resolveImageSrc(baseUrl, item.visual.image)}
                  alt={item.visual.alt}
                  item={item.visual}
                  className="h-40 w-full"
                />
                <div className="p-6">
                  <p className="section-kicker">Reference image</p>
                  <h2 className="mt-4 text-2xl font-semibold text-[var(--color-cream)]">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="section-kicker">Step notes</p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
              The editorial read behind each step still exists, but it is tucked into the same
              optional area instead of becoming a second giant control at the bottom of the page.
            </p>
          </div>
          <div className="grid gap-4">
            {labSteps.map((step, index) => (
              <article key={step.title} className="panel overflow-hidden rounded-[1.8rem]">
                <img
                  src={resolveImageSrc(baseUrl, noteVisuals[index].image)}
                  alt={noteVisuals[index].alt}
                  className="h-40 w-full object-cover"
                  style={{ objectPosition: noteVisuals[index].position }}
                />
                <div className="p-6">
                  <p className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                    Lab note 0{index + 1}
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
