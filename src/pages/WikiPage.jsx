import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import VisualImage from '../components/VisualImage'
import {
  heatDestinations,
  houseSauces,
  pairingRules,
  peppers,
  pepperTrivia,
  safetyChecklist,
  sauceFamilies,
} from '../data/catalog'
import { editorialImages, resolveImageSrc, wikiGallery } from '../lib/media'

const numberFormatter = new Intl.NumberFormat('en-US')
const baseUrl = import.meta.env.BASE_URL

const familyVisuals = {
  'Green Table Sauces': {
    image: 'images/jalapeno-peppers.png',
    alt: 'Jalapeno peppers for green table sauces',
    position: 'center 58%',
  },
  'Caribbean Fruit-Forward': editorialImages.habaneroPlant,
  'Dark Roasted Bottles': editorialImages.fermentedJar,
  'Superhot Reserve': editorialImages.trinidadScorpionBottle,
}

const houseSauceVisuals = {
  'Mercado Verde': {
    image: 'images/serrano-peppers.png',
    alt: 'Serrano peppers supporting Mercado Verde',
    position: 'center center',
  },
  'Yucatan Lantern': editorialImages.habaneroPlant,
  'Midnight Molino': editorialImages.pepperStillLife,
  'Coastal Gold': editorialImages.ajiAmarilloBottle,
}

const rulePanels = [
  {
    title: 'Pairing principles',
    visual: editorialImages.marketCrate,
    items: pairingRules,
  },
  {
    title: 'Kitchen safety',
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
          <p className="section-kicker">Pepper reference</p>
          <h1 className="display-font viewport-hero-title mt-4 max-w-5xl uppercase leading-[0.9] text-[var(--color-cream)]">
            The field guide behind the burn.
          </h1>
          <p className="viewport-hero-copy mt-4 max-w-3xl text-base leading-7 text-[var(--color-text-soft)] sm:text-lg">
            Scoville tells you how loudly a pepper can speak. It does not tell you whether the voice
            is grassy, floral, smoky, or sweet. This guide is for that second question, the one that
            matters when you are actually cooking.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => scrollToSection('peppers')} className="secondary-button">
            Pepper Profiles
          </button>
          <button type="button" onClick={() => scrollToSection('families')} className="secondary-button">
            Sauce Families
          </button>
          <button type="button" onClick={() => scrollToSection('pairings')} className="secondary-button">
            Rules and Safety
          </button>
        </div>
      </div>

      <div className="mt-8 grid min-h-0 gap-4 lg:flex-1 lg:grid-cols-[1.1fr_0.9fr]">
        <GalleryWall />
        <article className="rounded-[1.8rem] border border-white/10 bg-black/16 p-5 sm:p-6">
          <p className="section-kicker">Reader's note</p>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            A good pepper reference should help you cook, not just impress your friends with a high
            number. Habanero may be hotter than cayenne, but cayenne often tastes more familiar in a
            vinegar sauce. Scotch bonnet can perfume a pot long before it punishes it.
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
          <p className="section-kicker">Pepper profiles</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
            Heat makes the headline. Flavor writes the article.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          The best sauce makers learn to hear peppers as distinct ingredients, not as anonymous fuel.
          Some arrive citrus-bright, some feel earthy, and some are all ambush.
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
            A bottle becomes more useful when it knows what kind of table it belongs on.
          </h2>
        </div>
        <Link to="/lab" className="primary-button w-full sm:w-auto">
          Build from the guide
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
      <HeatTrailSection />
    </section>
  )
}

function RulePanels() {
  return (
    <section id="pairings" className="panel viewport-panel rounded-[2rem] p-7 sm:p-8">
      <div>
        <p className="section-kicker">Rules of use</p>
        <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
          Pairing, safety, and a few truths every chili lover learns eventually.
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

function HeatTrailSection() {
  return (
    <section className="panel viewport-panel rounded-[2rem] p-7 sm:p-8">
      <div>
        <p className="section-kicker">Heat trail</p>
        <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
          Restaurants worth remembering when the craving gets serious.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
          No website about hot peppers should act like the story ends at home. Some lessons have to be
          learned at the table, ideally with a cold drink nearby and a cook who knows exactly how far
          to push the fire.
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        {heatDestinations.map((destination) => (
          <a
            key={destination.name}
            href={destination.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)] transition hover:border-white/16 hover:bg-white/6"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <span className="text-lg font-semibold text-[var(--color-cream)]">{destination.name}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                {destination.city}
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-text)]">{destination.dish}</p>
            <p className="mt-2">{destination.note}</p>
          </a>
        ))}

        {pepperTrivia.slice(2).map((item) => (
          <div
            key={item.title}
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            <span className="text-lg font-semibold text-[var(--color-cream)]">{item.title}</span>
            <p className="mt-2">{item.copy}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WikiPage
