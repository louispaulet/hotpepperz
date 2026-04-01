import Footer from '../components/Footer'
import SauceStudio from '../components/SauceStudio'
import VisualImage from '../components/VisualImage'
import { labSteps, pairingRules } from '../data/catalog'
import { editorialImages, labGallery, resolveImageSrc } from '../lib/media'

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
      <HeroSection />
      <section className="viewport-section">
        <SauceStudio />
      </section>
      <ReferenceSection />
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="viewport-section grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
      <article className="panel viewport-panel viewport-scroll viewport-hero-card h-full min-h-0 overflow-x-hidden rounded-[2.2rem] p-6 sm:p-8 xl:p-9">
        <div>
          <p className="section-kicker">Hot sauce lab</p>
          <h1 className="display-font viewport-hero-title mt-4 max-w-4xl uppercase leading-[0.9] text-[var(--color-cream)]">
            The custom blend lab now fits like a workstation, not a poster wall.
          </h1>
          <p className="viewport-hero-copy mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-soft)] sm:text-lg">
            The route opens with one clear brief, then drops into the builder itself. Supporting
            images and rules still exist, but they no longer bury the thing you came to use.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            {labGallery.slice(0, 4).map((item) => (
              <figure
                key={item.image}
                className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/18"
              >
                <img
                  src={resolveImageSrc(baseUrl, item.image)}
                  alt={item.alt}
                  className="h-20 w-full object-cover sm:h-24"
                  style={{ objectPosition: item.position }}
                />
              </figure>
            ))}
          </div>

          <div className="soft-divider mt-5 pt-5">
            <p className="section-kicker">Review before generating</p>
            <div className="mt-4 space-y-3">
              {pairingRules.slice(0, 3).map((rule) => (
                <div key={rule} className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4">
                  <p className="text-sm leading-7 text-[var(--color-text-soft)]">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      <div className="grid h-full min-h-0 gap-4 sm:grid-cols-2">
        <LargeVisual item={editorialImages.bottleLineup} className="min-h-[16rem] sm:row-span-2 sm:min-h-[24rem]" />
        <LargeVisual item={editorialImages.marketCrate} className="min-h-[12rem]" />
        <LargeVisual item={editorialImages.fermentedJar} className="min-h-[12rem]" />
      </div>
    </section>
  )
}

function ReferenceSection() {
  return (
    <section className="viewport-section grid gap-4 xl:grid-cols-[1fr_1fr]">
      <ReferenceBoard />
      <LabNotes />
    </section>
  )
}

function ReferenceBoard() {
  return (
    <section className="panel viewport-panel rounded-[2rem] p-7 sm:p-9">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Reference board</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
            The builder is surrounded by the right visual prompts.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          Ingredient abundance, texture, fermentation, and bottle targets each keep one role in the
          screen instead of crowding the main tool.
        </p>
      </div>

      <div className="viewport-scroll mt-8 grid gap-4 lg:grid-cols-2">
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
  )
}

function LabNotes() {
  return (
    <section className="panel viewport-panel rounded-[2rem] p-7 sm:p-9">
      <div>
        <p className="section-kicker">Lab notes</p>
        <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
          The recipe logic stays visible beside the inspiration.
        </h2>
      </div>

      <div className="viewport-scroll mt-8 grid gap-4 lg:grid-cols-1">
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
  )
}

function LargeVisual({ item, className = '' }) {
  return (
    <article className={`panel overflow-hidden rounded-[2rem] ${className}`}>
      <img
        src={resolveImageSrc(baseUrl, item.image)}
        alt={item.alt}
        className="h-full w-full object-cover"
        style={{ objectPosition: item.position }}
      />
    </article>
  )
}

export default LabPage
