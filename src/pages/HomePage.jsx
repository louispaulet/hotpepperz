import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import VisualImage from '../components/VisualImage'
import {
  heatDestinations,
  houseSauces,
  labSteps,
  peppers,
  pepperTrivia,
  sauceFamilies,
  traditionalRecipes,
} from '../data/catalog'
import { editorialImages, homepageGallery, resolveImageSrc } from '../lib/media'

const numberFormatter = new Intl.NumberFormat('en-US')
const baseUrl = import.meta.env.BASE_URL

const heroGallery = [
  { ...editorialImages.bottleLineup, label: 'Bottle lineup' },
  { ...editorialImages.habaneroPlant, label: 'Field harvest' },
  { ...editorialImages.habaneroMacro, label: 'Habanero detail' },
  { ...editorialImages.fermentedJar, label: 'Fermentation bench' },
  { ...editorialImages.heroChili, label: 'Red chili study' },
]

const houseSauceVisuals = {
  'Mercado Verde': {
    ...editorialImages.marketCrate,
    image: 'images/serrano-peppers.png',
    alt: 'Fresh serrano peppers for Mercado Verde',
    position: 'center center',
  },
  'Yucatan Lantern': {
    ...editorialImages.habaneroPlant,
  },
  'Midnight Molino': {
    ...editorialImages.pepperStillLife,
  },
  'Coastal Gold': {
    ...editorialImages.ajiAmarilloBottle,
  },
}

const familyVisuals = {
  'Green Table Sauces': {
    ...editorialImages.marketCrate,
    image: 'images/jalapeno-peppers.png',
    alt: 'Jalapeno peppers for green table sauces',
    position: 'center 58%',
  },
  'Caribbean Fruit-Forward': {
    ...editorialImages.habaneroPlant,
  },
  'Dark Roasted Bottles': {
    ...editorialImages.fermentedJar,
  },
  'Superhot Reserve': {
    ...editorialImages.trinidadScorpionBottle,
  },
}

const pathwayCards = [
  {
    title: 'Pepper knowledge, not pepper cosplay',
    copy:
      'The goal here is to treat hot sauce as a craft: agriculture, fermentation, balance, and a healthy respect for capsaicin.',
    link: '/wiki',
    cta: 'Read the field guide',
    visual: editorialImages.wikiHabanero,
  },
  {
    title: 'A working sauce bench',
    copy:
      'The workshop is built around formulation logic: lead pepper, support pepper, acid, body, and the style of bottle you want to make.',
    link: '/lab',
    cta: 'Open the sauce bench',
    visual: editorialImages.fermentedJar,
  },
  {
    title: 'Recipes, stories, and heat trails',
    copy:
      'From taquera salsa to Southern Thai spice pilgrimages, the site now reads like a cook’s notebook rather than a mood board.',
    link: '/wiki',
    cta: 'Explore the collection',
    visual: editorialImages.bottleLineup,
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
          <p className="section-kicker">Hot sauce craft, seriously taken</p>
          <h1 className="display-font viewport-hero-title mt-4 max-w-4xl uppercase leading-[0.9] text-[var(--color-cream)]">
            A field guide for people who love peppers, respect heat, and care how a sauce is made.
          </h1>
          <p className="viewport-hero-copy mt-4 max-w-3xl text-base leading-7 text-[var(--color-text-soft)] sm:text-lg">
            HotPepperz is written like a working notebook from a pepper grower and sauce maker:
            part history, part practical reference, part standing invitation to keep one good bottle
            close to the stove. Expect serious technique, pepper lore, and the occasional well-earned
            chili pun. After all, every good sauce deserves a little gravitas and a little jalapen-yo.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/lab" className="primary-button">
              Start a Sauce
            </Link>
            <Link to="/wiki" className="secondary-button">
              Browse the Pepper Guide
            </Link>
          </div>

          <dl className="mt-6 grid gap-3 md:grid-cols-3">
            <StatCard value="9" label="Pepper profiles" />
            <StatCard value="3" label="Traditional sauce templates" />
            <StatCard value="6" label="Global heat destinations" />
          </dl>

          <div className="soft-divider mt-5 pt-5">
            <p className="section-kicker">What matters in the bottle</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <SignalLine
                label="Balance first"
                copy="Heat is only half the story. Acid, aroma, texture, and finish decide whether a sauce gets used or ignored."
              />
              <SignalLine
                label="Pepper character"
                copy="Aji amarillo smells sunny, habanero smells tropical, and ghost pepper arrives with the subtlety of legal correspondence."
              />
              <SignalLine
                label="Technique over theatrics"
                copy="Good makers ferment patiently, taste in drops, and know when to let a pepper whisper instead of shout."
              />
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
        <RecipeSection />
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
        <p className="section-kicker">Inside the site</p>
        <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
          Written for cooks, collectors, and people who keep chili flakes in more than one drawer.
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
              <p className="section-kicker">Reading path</p>
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
          <p className="section-kicker">The pantry view</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
            A serious sauce starts with produce, patience, and clean seasoning.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          The best bottles rarely begin with novelty. They begin with good peppers, a clear acid
          choice, and the discipline to stop adding ingredients once the flavor is already speaking.
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
          <p className="section-kicker">House bottles</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
            Four styles that show how different peppers tell different stories.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          A habanero sauce should not read like a cayenne sauce wearing brighter shoes. Each bottle
          below is built around a distinct pepper voice, from fast green heat to slower, darker burn.
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
          <p className="section-kicker">Pepper field guide</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
            Read the peppers before you read the Scoville number.
          </h2>
        </div>
        <Link to="/wiki" className="secondary-button w-full sm:w-auto">
          Open the full guide
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
            Most memorable bottles belong to a clear culinary tradition.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          Categories are useful when they help you cook. Think less in terms of novelty branding,
          more in terms of what the bottle should do at the table.
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

function RecipeSection() {
  return (
    <section className="panel viewport-panel rounded-[2rem] p-6 sm:p-8">
      <p className="section-kicker">Traditional starting points</p>
      <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
        Three classic approaches worth learning before inventing your own.
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
        Every sauce maker eventually puts a personal stamp on the bottle, but the fastest way to
        improve is to cook a few time-tested traditions first and notice how each culture balances
        acidity, aroma, and heat.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {traditionalRecipes.map((recipe, index) => (
          <article key={recipe.name} className="rounded-[1.6rem] border border-white/10 bg-black/16 p-5">
            <p className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
              Recipe 0{index + 1}
            </p>
            <h3 className="mt-4 text-xl font-semibold text-[var(--color-cream)]">{recipe.name}</h3>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              {recipe.origin}
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
              <span className="text-[var(--color-text)]">Base:</span> {recipe.ingredients}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{recipe.method}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="viewport-section grid gap-4 xl:grid-cols-[1fr_1fr]">
      <section className="panel viewport-panel rounded-[2rem] p-7 sm:p-9">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Bench notes</p>
            <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
              Sauce making is a sequence of calm decisions.
            </h2>
          </div>
          <Link to="/lab" className="primary-button w-full sm:w-auto">
            Open the workshop
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

      <section className="panel viewport-panel rounded-[2rem] p-7 sm:p-9">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Trivia and travel</p>
            <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-5xl">
              A few facts for the road, plus places where the heat is worth the trip.
            </h2>
          </div>
          <Link to="/wiki" className="secondary-button w-full sm:w-auto">
            More field notes
          </Link>
        </div>

        <div className="mt-8 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            {pepperTrivia.slice(0, 2).map((item) => (
              <article key={item.title} className="rounded-[1.6rem] border border-white/10 bg-black/16 p-5">
                <p className="section-kicker">Pepper note</p>
                <h3 className="mt-3 text-xl font-semibold text-[var(--color-cream)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-3">
            {heatDestinations.slice(0, 4).map((destination) => (
              <a
                key={destination.name}
                href={destination.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-[1.5rem] border border-white/10 bg-black/15 p-4 transition hover:border-white/16 hover:bg-white/6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold text-[var(--color-cream)]">{destination.name}</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    {destination.city}
                  </p>
                </div>
                <p className="mt-2 text-sm text-[var(--color-text)]">{destination.dish}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{destination.note}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
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
