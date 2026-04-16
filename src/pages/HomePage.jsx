import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import VisualImage from '../components/VisualImage'
import { houseSauces, labSteps, peppers, sauceFamilies } from '../data/catalog'
import { editorialImages, homepageGallery, resolveImageSrc } from '../lib/media'

const numberFormatter = new Intl.NumberFormat('en-US')
const baseUrl = import.meta.env.BASE_URL

const heroGallery = [
  { ...editorialImages.bottleLineup, label: 'Bottle drama' },
  { ...editorialImages.habaneroPlant, label: 'Field harvest' },
  { ...editorialImages.habaneroMacro, label: 'Texture close-up' },
  { ...editorialImages.fermentedJar, label: 'Ferment detail' },
  { ...editorialImages.heroChili, label: 'Graphic hero' },
]

const houseSauceVisuals = {
  'Market Ember No. 3': {
    ...editorialImages.marketCrate,
    image: 'images/serrano-peppers.png',
    alt: 'Fresh serrano peppers for Market Ember No. 3',
    position: 'center center',
  },
  'Lantern Choir': {
    ...editorialImages.habaneroPlant,
  },
  'After Midnight': {
    ...editorialImages.pepperStillLife,
  },
  'Signal Bloom': {
    ...editorialImages.ajiAmarilloBottle,
  },
}

const familyVisuals = {
  'Bright Citrus': {
    ...editorialImages.marketCrate,
    image: 'images/jalapeno-peppers.png',
    alt: 'Jalapeno peppers representing bright citrus sauces',
    position: 'center 58%',
  },
  'Tropical Heat': {
    ...editorialImages.habaneroPlant,
  },
  'Dark Smoke': {
    ...editorialImages.fermentedJar,
  },
  'Collector Superhots': {
    ...editorialImages.trinidadScorpionBottle,
  },
}

const pathwayCards = [
  {
    title: 'Editorial storefront',
    copy: 'The landing page now reads in deliberate chapters instead of one giant column.',
    link: '/',
    cta: 'See the overview',
    visual: editorialImages.bottleLineup,
  },
  {
    title: 'Hands-on formulation',
    copy: 'The lab now opens as a guided builder, with the active step and live result kept in one reading flow.',
    link: '/lab',
    cta: 'Open the lab',
    visual: editorialImages.fermentedJar,
  },
  {
    title: 'Pepper reference atlas',
    copy: 'The wiki keeps the field guide, family map, and safety notes in separate full-screen stops.',
    link: '/wiki',
    cta: 'Browse the guide',
    visual: editorialImages.wikiHabanero,
  },
]

function formatShu(value) {
  return `${numberFormatter.format(value)} SHU`
}

function HomePage() {
  return (
    <div className="page-sections">
      <HeroSection />
      <DiscoverSection />
      <CatalogSection />
      <ProcessSection />
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="viewport-section grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
      <article className="panel viewport-panel overflow-hidden rounded-[2.2rem] p-6 sm:p-8 xl:p-9">
        <div className="relative z-10">
          <p className="section-kicker">Small-batch heat, better art direction</p>
          <h1 className="display-font viewport-hero-title mt-4 max-w-4xl uppercase leading-[0.9] text-[var(--color-cream)]">
            The homepage now lands in full-screen chapters instead of spilling down the page.
          </h1>
          <p className="viewport-hero-copy mt-4 text-base leading-7 text-[var(--color-text-soft)] sm:text-lg">
            HotPepperz keeps the same editorial mood, but the pacing is tighter so every section
            reads like a complete screen with a clear next move.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/lab" className="primary-button">
              Build a Bottle
            </Link>
            <Link to="/wiki" className="secondary-button">
              Explore the Atlas
            </Link>
          </div>

          <dl className="mt-6 grid gap-3 md:grid-cols-3">
            <StatCard value="4" label="Homepage chapters" />
            <StatCard value="1" label="Focused viewport per stop" />
            <StatCard value="0" label="Massive entry overflow" />
          </dl>

          <div className="soft-divider mt-5 pt-5">
            <p className="section-kicker">What changed</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <SignalLine label="Clearer pacing" copy="The route is chunked into full-screen moments instead of one endless stack." />
              <SignalLine
                label="Bounded content"
                copy="Dense content now stays in clearer chapters and collapsed secondary panels instead of fighting the main flow."
              />
              <SignalLine label="Faster scanning" copy="Each screen answers one question at a time: where to go, what exists, and how to build." />
            </div>
          </div>
        </div>
      </article>

      <article className="grid min-h-0 gap-4 rounded-[2.2rem]">
        <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
          <MediaFrame item={heroGallery[0]} className="min-h-[18rem] sm:min-h-[24rem]" />
          <div className="grid gap-4">
            <MediaFrame item={heroGallery[1]} className="min-h-[12rem]" />
            <div className="grid gap-4 sm:grid-cols-2">
              {heroGallery.slice(2).map((item) => (
                <MediaFrame key={item.label} item={item} className="min-h-[8.5rem]" compact />
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

function DiscoverSection() {
  return (
    <section className="viewport-section grid gap-4 xl:grid-cols-[1fr_1fr]">
      <PantryGallery />
      <ExperienceStrip />
    </section>
  )
}

function CatalogSection() {
  return (
    <section className="viewport-section grid gap-4 xl:grid-cols-[1fr_1fr]">
      <div className="grid min-h-0 gap-4">
        <SignatureShelf />
        <ProcessPreview />
      </div>
      <div className="grid min-h-0 gap-4">
        <PepperAtlasPreview />
        <SauceFamiliesSection />
      </div>
    </section>
  )
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/18 px-5 py-5">
      <dt className="text-3xl font-semibold text-[var(--color-cream)]">{value}</dt>
      <dd className="mt-2 text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
        {label}
      </dd>
    </div>
  )
}

function SignalLine({ label, copy }) {
  return (
    <div className="rounded-[1.4rem] border border-white/8 bg-black/15 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{copy}</p>
    </div>
  )
}

function ExperienceStrip() {
  return (
    <section className="panel viewport-panel rounded-[2.1rem] p-6 sm:p-8">
      <div>
        <p className="section-kicker">Navigate the world</p>
        <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
          Every route gets one screen-sized promise.
        </h2>
      </div>

      <div className="viewport-scroll mt-6 grid gap-4 lg:grid-cols-3">
        {pathwayCards.map((card) => (
          <article key={card.title} className="panel overflow-hidden rounded-[1.9rem]">
            <VisualImage
              src={resolveImageSrc(baseUrl, card.visual.image)}
              alt={card.visual.alt}
              item={card.visual}
              className="h-44 w-full"
            />
            <div className="p-6">
              <p className="section-kicker">Experience</p>
              <h2 className="mt-4 text-2xl font-semibold text-[var(--color-cream)]">{card.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{card.copy}</p>
              <Link
                to={card.link}
                className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-saffron)]"
              >
                {card.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function PantryGallery() {
  return (
    <section className="panel viewport-panel rounded-[2.1rem] p-7 sm:p-9">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Visual pantry</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
            The images now work as one contained spread.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          Produce, packaging, ingredient, and fermentation imagery each keep a defined place in the
          layout so the opening view feels deliberate instead of oversized.
        </p>
      </div>

      <div className="viewport-scroll mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {homepageGallery.map((item, index) => (
          <article
            key={`${item.image}-${index}`}
            className={`overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/18 ${
              index === 0 ? 'md:col-span-2 md:row-span-2' : ''
            }`}
          >
            <img
              src={resolveImageSrc(baseUrl, item.image)}
              alt={item.alt}
              className={`w-full object-cover ${index === 0 ? 'h-full min-h-[18rem]' : 'h-40'}`}
              style={{ objectPosition: item.position }}
            />
          </article>
        ))}
      </div>
    </section>
  )
}

function SignatureShelf() {
  return (
    <section className="panel rounded-[2rem] p-6 sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Signature shelf</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
            Reference bottles with sharper personalities.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          Bottle cards stay readable in one panel, with just enough supporting copy to telegraph
          range without turning the screen into a catalog wall.
        </p>
      </div>

      <div className="viewport-scroll mt-6 grid gap-4 xl:grid-cols-2">
        {houseSauces.map((sauce) => {
          const visual = houseSauceVisuals[sauce.name]
          const productVisual = visual.presentation === 'product'

          return (
            <article
              key={sauce.name}
              className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/16"
              style={{
                backgroundImage: `linear-gradient(160deg, ${sauce.tone}26, rgba(12, 12, 12, 0.08))`,
              }}
            >
              <VisualImage
                src={resolveImageSrc(baseUrl, visual.image)}
                alt={visual.alt}
                item={visual}
                className={`w-full ${productVisual ? 'h-60' : 'h-44'}`}
                imgClassName={productVisual ? 'scale-[1.08]' : ''}
              />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-semibold text-[var(--color-cream)]">{sauce.name}</h3>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                    {sauce.heat}
                  </span>
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {sauce.profile}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{sauce.story}</p>
                <p className="mt-5 text-sm text-[var(--color-text)]">Best on: {sauce.bestOn}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function PepperAtlasPreview() {
  return (
    <section className="panel viewport-panel rounded-[2rem] p-6 sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Pepper atlas</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
            Pepper cards read like a compact field guide.
          </h2>
        </div>
        <Link to="/wiki" className="secondary-button w-full sm:w-auto">
          Open the full wiki
        </Link>
      </div>

      <div className="viewport-scroll mt-6 grid gap-4 md:grid-cols-2">
        {peppers.slice(0, 4).map((pepper) => (
          <article
            key={pepper.id}
            className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/16"
            style={{
              backgroundImage: `linear-gradient(135deg, ${pepper.tone}24, rgba(10, 10, 10, 0.06))`,
            }}
          >
            <img
              src={resolveImageSrc(baseUrl, pepper.image)}
              alt={pepper.name}
              className="h-40 w-full object-cover"
              style={{ objectPosition: pepper.imagePosition }}
            />
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--color-cream)]">{pepper.name}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                    {pepper.heatBand}
                  </p>
                </div>
                <span className="mt-1 h-3 w-3 rounded-full" style={{ backgroundColor: pepper.tone }} />
              </div>
              <p className="mt-4 text-sm text-[var(--color-text)]">
                {formatShu(pepper.shuMin)} to {formatShu(pepper.shuMax)}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{pepper.story}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function SauceFamiliesSection() {
  return (
    <section className="panel viewport-panel rounded-[2rem] p-6 sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Sauce families</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
            Familiar flavor lanes make the catalog easier to scan.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          Bright, tropical, smoky, and collector-grade routes now live in one bounded panel so the
          taxonomy feels helpful instead of sprawling.
        </p>
      </div>

      <div className="viewport-scroll mt-6 grid gap-4 md:grid-cols-2">
        {sauceFamilies.map((family) => {
          const visual = familyVisuals[family.name]

          return (
            <article key={family.name} className="panel overflow-hidden rounded-[1.8rem]">
              <VisualImage
                src={resolveImageSrc(baseUrl, visual.image)}
                alt={visual.alt}
                item={visual}
                className={`w-full ${visual.presentation === 'product' ? 'h-48' : 'h-36'}`}
              />
              <div className="p-5">
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
      </div>
    </section>
  )
}

function ProcessPreview() {
  return (
    <section className="panel viewport-panel rounded-[2rem] p-6 sm:p-8">
      <p className="section-kicker">Working method</p>
      <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
        The sauce story stays readable from first pick to final label.
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
        We trimmed the route into clearer decision points so the builder no longer disappears below
        giant supporting panels.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {labSteps.map((step, index) => (
          <article key={step.title} className="rounded-[1.6rem] border border-white/10 bg-black/16 p-5">
            <p className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
              Step 0{index + 1}
            </p>
            <h3 className="mt-4 text-xl font-semibold text-[var(--color-cream)]">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{step.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="viewport-section panel viewport-panel rounded-[2rem] p-7 sm:p-9">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Lab flow</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
            The builder now opens as one focused configurator.
          </h2>
        </div>
        <Link to="/lab" className="primary-button w-full sm:w-auto">
          Open the lab
        </Link>
      </div>

      <div className="viewport-scroll mt-8 grid gap-4 lg:grid-cols-3">
        {labSteps.map((step, index) => (
          <article
            key={step.title}
            className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/16"
          >
            <img
              src={resolveImageSrc(baseUrl, homepageGallery[index].image)}
              alt={homepageGallery[index].alt}
              className="h-40 w-full object-cover"
              style={{ objectPosition: homepageGallery[index].position }}
            />
            <div className="p-6">
              <p className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                Step 0{index + 1}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-[var(--color-cream)]">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{step.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function MediaFrame({ item, className = '', compact = false }) {
  return (
    <figure className={`panel group overflow-hidden rounded-[2rem] ${className}`}>
      <img
        src={resolveImageSrc(baseUrl, item.image)}
        alt={item.alt}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        style={{ objectPosition: item.position }}
      />
      <figcaption className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/35 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-cream)]">
        {compact ? item.label : item.label}
      </figcaption>
    </figure>
  )
}

export default HomePage
