import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import VisualImage from '../components/VisualImage'
import { houseSauces, pairingRules, peppers, safetyChecklist, sauceFamilies } from '../data/catalog'
import { editorialImages, featuredImageCredits, resolveImageSrc, wikiGallery } from '../lib/media'

const numberFormatter = new Intl.NumberFormat('en-US')
const baseUrl = import.meta.env.BASE_URL

const familyVisuals = {
  'Bright Citrus': {
    image: 'images/jalapeno-peppers.jpg',
    alt: 'Jalapeno peppers for bright citrus sauces',
    position: 'center 58%',
  },
  'Tropical Heat': editorialImages.habaneroPlant,
  'Dark Smoke': editorialImages.fermentedJar,
  'Collector Superhots': editorialImages.trinidadScorpionBottle,
}

const houseSauceVisuals = {
  'Market Ember No. 3': {
    image: 'images/serrano-peppers.jpg',
    alt: 'Serrano peppers supporting Market Ember No. 3',
    position: 'center center',
  },
  'Lantern Choir': editorialImages.habaneroPlant,
  'After Midnight': editorialImages.pepperStillLife,
  'Signal Bloom': editorialImages.ajiAmarilloBottle,
}

const rulePanels = [
  {
    title: 'Pairing rules',
    visual: editorialImages.marketCrate,
    items: pairingRules,
  },
  {
    title: 'Safety checklist',
    visual: editorialImages.nagaCluster,
    items: safetyChecklist,
  },
]

function formatShu(value) {
  return `${numberFormatter.format(value)} SHU`
}

function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function WikiPage() {
  return (
    <div className="page-sections">
      <HeroSection />
      <GuideSection />
      <ReferenceSection />
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="viewport-section panel viewport-panel overflow-hidden rounded-[2.2rem] p-6 sm:p-8 xl:p-9">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-4xl">
          <p className="section-kicker">Pepper wiki</p>
          <h1 className="display-font viewport-hero-title mt-4 max-w-5xl uppercase leading-[0.9] text-[var(--color-cream)]">
            The wiki now reads in screen-sized field-guide chapters.
          </h1>
          <p className="viewport-hero-copy mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-soft)] sm:text-lg">
            Pepper portraits, family lanes, and safety notes stay visible in bounded panels so you
            can reference the information without the page feeling massive.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => scrollToSection('peppers')} className="secondary-button">
            Peppers
          </button>
          <button type="button" onClick={() => scrollToSection('families')} className="secondary-button">
            Sauce Families
          </button>
          <button type="button" onClick={() => scrollToSection('pairings')} className="secondary-button">
            Pairing Rules
          </button>
        </div>
      </div>

      <div className="mt-8 grid min-h-0 gap-4 lg:flex-1 lg:grid-cols-[1.1fr_0.9fr]">
        <GalleryWall />
        <article className="rounded-[1.8rem] border border-white/10 bg-black/16 p-5 sm:p-6">
          <p className="section-kicker">Reading lens</p>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            Scoville range only tells part of the story. The better cue is what kind of bottle the
            pepper wants to become: bright, tropical, smoky, or collector-grade dangerous.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[editorialImages.wikiHabanero, editorialImages.heroChili].map((item) => (
              <img
                key={item.image}
                src={resolveImageSrc(baseUrl, item.image)}
                alt={item.alt}
                className="h-36 w-full rounded-[1.4rem] object-cover"
                style={{ objectPosition: item.position }}
              />
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}

function GalleryWall() {
  return (
    <div className="grid min-h-0 gap-4 sm:grid-cols-2">
      <article className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/16 sm:row-span-2">
        <img
          src={resolveImageSrc(baseUrl, wikiGallery[0].image)}
          alt={wikiGallery[0].alt}
          className="h-full min-h-[18rem] w-full object-cover"
          style={{ objectPosition: wikiGallery[0].position }}
        />
      </article>
      {wikiGallery.slice(1, 5).map((item) => (
        <article
          key={item.image}
          className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/16"
        >
          <img
            src={resolveImageSrc(baseUrl, item.image)}
            alt={item.alt}
            className="h-32 w-full object-cover"
            style={{ objectPosition: item.position }}
          />
        </article>
      ))}
    </div>
  )
}

function GuideSection() {
  return (
    <section className="viewport-section grid gap-4 xl:grid-cols-[1fr_1fr]">
      <PepperFieldGuide />
      <FamilyPlaybook />
    </section>
  )
}

function PepperFieldGuide() {
  return (
    <section id="peppers" className="panel viewport-panel rounded-[2rem] p-7 sm:p-9">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Pepper field guide</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
            Heat is easier to read when the flavor looks alive.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          Larger crops and better image placement make the cards scan faster without requiring the
          whole route to become a giant wall of content.
        </p>
      </div>

      <div className="viewport-scroll mt-8 grid gap-4 lg:grid-cols-1">
        {peppers.slice(0, 5).map((pepper) => (
          <article
            key={pepper.id}
            className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/16"
            style={{
              backgroundImage: `linear-gradient(135deg, ${pepper.tone}26, rgba(10, 10, 10, 0.08))`,
            }}
          >
            <div className="grid h-full gap-0 md:grid-cols-[0.9fr_1.1fr]">
              <img
                src={resolveImageSrc(baseUrl, pepper.image)}
                alt={pepper.name}
                className="h-56 w-full object-cover md:h-full"
                style={{ objectPosition: pepper.imagePosition }}
              />
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-[var(--color-cream)]">{pepper.name}</h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                      {pepper.region} / {pepper.heatBand}
                    </p>
                  </div>
                  <span className="mt-1 h-3 w-3 rounded-full" style={{ backgroundColor: pepper.tone }} />
                </div>
                <p className="mt-4 text-sm text-[var(--color-text)]">
                  {formatShu(pepper.shuMin)} to {formatShu(pepper.shuMax)}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{pepper.story}</p>
                <p className="mt-4 text-sm text-[var(--color-text)]">Best for: {pepper.bestFor}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function FamilyPlaybook() {
  return (
    <section id="families" className="panel viewport-panel rounded-[2rem] p-7 sm:p-9">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Sauce playbook</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
            A tighter taxonomy makes the catalog easier to browse.
          </h2>
        </div>
        <Link to="/lab" className="primary-button w-full sm:w-auto">
          Build your own
        </Link>
      </div>

      <div className="viewport-scroll mt-8 grid gap-4 md:grid-cols-2">
        {sauceFamilies.map((family) => {
          const visual = familyVisuals[family.name]

          return (
            <article key={family.name} className="panel overflow-hidden rounded-[1.8rem]">
              <VisualImage
                src={resolveImageSrc(baseUrl, visual.image)}
                alt={visual.alt}
                item={visual}
                className="h-40 w-full"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[var(--color-cream)]">{family.name}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
                  {family.description}
                </p>
                <p className="mt-4 text-sm text-[var(--color-text)]">Best for: {family.bestFor}</p>
                <p className="mt-3 text-sm text-[var(--color-text-soft)]">{family.buildCue}</p>
              </div>
            </article>
          )
        })}

        {houseSauces.slice(0, 2).map((sauce) => {
          const visual = houseSauceVisuals[sauce.name]

          return (
            <article
              key={sauce.name}
              className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/16"
              style={{
                backgroundImage: `linear-gradient(155deg, ${sauce.tone}22, rgba(10, 10, 10, 0.06))`,
              }}
            >
              <VisualImage
                src={resolveImageSrc(baseUrl, visual.image)}
                alt={visual.alt}
                item={visual}
                className="h-40 w-full"
              />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-[var(--color-cream)]">{sauce.name}</h3>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                    {sauce.heat}
                  </span>
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {sauce.profile}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{sauce.story}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function ReferenceSection() {
  return (
    <section className="viewport-section grid gap-4 xl:grid-cols-[1fr_1fr]">
      <RulePanels />
      <ImageCredits />
    </section>
  )
}

function RulePanels() {
  return (
    <section id="pairings" className="panel viewport-panel rounded-[2rem] p-7 sm:p-8">
      <div>
        <p className="section-kicker">Rules of use</p>
        <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
          Pairing and safety notes stay visible on one screen.
        </h2>
      </div>

      <div className="viewport-scroll mt-6 grid gap-6 lg:grid-cols-2">
        {rulePanels.map((panel) => (
          <article key={panel.title} className="panel overflow-hidden rounded-[2rem]">
            <img
              src={resolveImageSrc(baseUrl, panel.visual.image)}
              alt={panel.visual.alt}
              className="h-44 w-full object-cover"
              style={{ objectPosition: panel.visual.position }}
            />
            <div className="p-7 sm:p-8">
              <p className="section-kicker">{panel.title}</p>
              <div className="mt-5 space-y-4">
                {panel.items.map((item) => (
                  <div key={item} className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4">
                    <p className="text-sm leading-7 text-[var(--color-text-soft)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ImageCredits() {
  return (
    <section className="panel viewport-panel rounded-[2rem] p-7 sm:p-8">
      <div>
        <p className="section-kicker">Image credits</p>
        <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
          Sources are easier to check without dropping below the fold forever.
        </h2>
      </div>

      <div className="viewport-scroll mt-6 grid gap-4">
        {featuredImageCredits.map((credit) => (
          <a
            key={credit.href}
            href={credit.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            {credit.label}
            <br />
            {credit.meta}
          </a>
        ))}
      </div>
    </section>
  )
}

export default WikiPage
