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
    copy: 'Wide market imagery helps the page feel abundant and ingredient-led before any controls appear.',
  },
  {
    visual: editorialImages.habaneroMacro,
    title: 'Texture references',
    copy: 'Macros are used sparingly to punctuate the layout and keep the brighter sections premium.',
  },
  {
    visual: editorialImages.fermentedJar,
    title: 'Fermentation cues',
    copy: 'Showing process imagery gives the formulation route credibility and a bit of workshop grit.',
  },
  {
    visual: editorialImages.ajiAmarilloBottle,
    title: 'Generated bottle direction',
    copy: 'Custom bottle renders make the lab feel closer to a real concept studio and show what a finished shelf piece could look like.',
  },
]

function LabPage() {
  return (
    <div className="space-y-8 lg:space-y-10">
      <HeroSection />
      <ReferenceBoard />
      <SauceStudio />
      <LabNotes />
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
      <article className="panel overflow-hidden rounded-[2.2rem] p-7 sm:p-10">
        <p className="section-kicker">Hot sauce lab</p>
        <h1 className="display-font mt-4 max-w-4xl text-5xl uppercase leading-[0.9] text-[var(--color-cream)] sm:text-7xl lg:text-[5.8rem]">
          Build the bottle with more visual references and clearer recipe logic.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
          The lab now sits inside a richer moodboard. Instead of a lone control panel, you get
          process photography, ingredient cues, and packaging context framing the builder.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          {labGallery.slice(0, 4).map((item) => (
            <figure
              key={item.image}
              className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/18"
            >
              <img
                src={resolveImageSrc(baseUrl, item.image)}
                alt={item.alt}
                className="h-28 w-full object-cover"
                style={{ objectPosition: item.position }}
              />
            </figure>
          ))}
        </div>

        <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-black/18 p-5">
          <p className="section-kicker">Review before generating</p>
          <div className="mt-5 space-y-4">
            {pairingRules.slice(0, 3).map((rule) => (
              <div key={rule} className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4">
                <p className="text-sm leading-7 text-[var(--color-text-soft)]">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <div className="grid gap-4 sm:grid-cols-2">
        <LargeVisual item={editorialImages.bottleLineup} className="sm:row-span-2 min-h-[18rem] sm:min-h-[34rem]" />
        <LargeVisual item={editorialImages.marketCrate} className="min-h-[16rem]" />
        <LargeVisual item={editorialImages.fermentedJar} className="min-h-[16rem]" />
      </div>
    </section>
  )
}

function ReferenceBoard() {
  return (
    <section className="panel rounded-[2rem] p-7 sm:p-9">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Reference board</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-6xl">
            The builder is surrounded by the right visual prompts.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          This route now uses more images with distinct jobs: ingredient abundance, tactile detail,
          fermentation proof, and final shelf context.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        {referenceCards.map((item) => (
          <article key={item.title} className="panel overflow-hidden rounded-[1.8rem]">
            <VisualImage
              src={resolveImageSrc(baseUrl, item.visual.image)}
              alt={item.visual.alt}
              item={item.visual}
              className="h-52 w-full"
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
    <section className="grid gap-4 lg:grid-cols-3">
      {labSteps.map((step, index) => (
        <article key={step.title} className="panel overflow-hidden rounded-[1.8rem]">
          <img
            src={resolveImageSrc(baseUrl, noteVisuals[index].image)}
            alt={noteVisuals[index].alt}
            className="h-44 w-full object-cover"
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
