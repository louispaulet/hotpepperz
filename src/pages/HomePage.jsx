import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
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
    image: 'images/serrano-peppers.jpg',
    alt: 'Fresh serrano peppers for Market Ember No. 3',
    position: 'center center',
  },
  'Lantern Choir': {
    ...editorialImages.habaneroPlant,
  },
  'After Midnight': {
    ...editorialImages.trinidadScorpionBottle,
  },
  'Signal Bloom': {
    ...editorialImages.ajiAmarilloBottle,
  },
}

const familyVisuals = {
  'Bright Citrus': {
    ...editorialImages.marketCrate,
    image: 'images/jalapeno-peppers.jpg',
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
    ...editorialImages.nagaCluster,
  },
}

const processVisuals = [
  editorialImages.fermentedJar,
  editorialImages.habaneroPlant,
  editorialImages.bottleLineup,
]

const pathwayCards = [
  {
    title: 'Editorial storefront',
    copy: 'Bigger image moments, cleaner pacing, and a brand world that feels closer to a food magazine than a demo shell.',
    link: '/',
    cta: 'See the overview',
    visual: editorialImages.ajiAmarilloBottle,
  },
  {
    title: 'Hands-on formulation',
    copy: 'Build around brightness, body, and danger before jumping to naming or label generation.',
    link: '/lab',
    cta: 'Open the lab',
    visual: editorialImages.fermentedJar,
  },
  {
    title: 'Pepper reference atlas',
    copy: 'Use the wiki like a compact buying guide, with clearer flavor clues and stronger pepper portraits.',
    link: '/wiki',
    cta: 'Browse the guide',
    visual: editorialImages.trinidadScorpionBottle,
  },
]

function formatShu(value) {
  return `${numberFormatter.format(value)} SHU`
}

function HomePage() {
  return (
    <div className="space-y-8 lg:space-y-10">
      <HeroSection />
      <ExperienceStrip />
      <PantryGallery />
      <SignatureShelf />
      <PepperAtlasPreview />
      <SauceFamiliesSection />
      <ProcessSection />
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <article className="panel overflow-hidden rounded-[2.2rem] p-7 sm:p-10 lg:p-12">
        <div className="relative z-10">
          <p className="section-kicker">Small-batch heat, better art direction</p>
          <h1 className="display-font mt-5 max-w-4xl text-5xl uppercase leading-[0.9] text-[var(--color-cream)] sm:text-7xl lg:text-[5.8rem]">
            A sharper hot sauce world with richer imagery and less generic fire branding.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)] sm:text-xl">
            HotPepperz now reads like a premium sauce editorial: bigger photography, better crop
            choices, more shelf energy, and a clearer path from inspiration to recipe logic.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/lab" className="primary-button">
              Build a Bottle
            </Link>
            <Link to="/wiki" className="secondary-button">
              Explore the Atlas
            </Link>
          </div>

          <dl className="mt-10 grid gap-4 md:grid-cols-3">
            <StatCard value="16" label="Visible image moments" />
            <StatCard value="9" label="Pepper profiles" />
            <StatCard value="3" label="Routes with stronger art direction" />
          </dl>

          <div className="mt-10 rounded-[1.8rem] border border-white/10 bg-black/18 p-5">
            <p className="section-kicker">What changed</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <SignalLine label="More variety" copy="Market, bottle, macro, and ferment imagery now each have a distinct job." />
              <SignalLine label="Better framing" copy="Image positions are tuned so crops feel intentional instead of accidental." />
              <SignalLine label="More atmosphere" copy="The pages lean into food-editorial rhythm with denser collage layouts." />
            </div>
          </div>
        </div>
      </article>

      <article className="grid gap-4 rounded-[2.2rem]">
        <div className="grid h-full gap-4 sm:grid-cols-[1.15fr_0.85fr]">
          <MediaFrame item={heroGallery[0]} className="min-h-[20rem] sm:min-h-[30rem]" />
          <div className="grid gap-4">
            <MediaFrame item={heroGallery[1]} className="min-h-[14rem]" />
            <div className="grid gap-4 sm:grid-cols-2">
              {heroGallery.slice(2).map((item) => (
                <MediaFrame key={item.label} item={item} className="min-h-[10rem]" compact />
              ))}
            </div>
          </div>
        </div>
      </article>
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
    <section className="grid gap-4 lg:grid-cols-3">
      {pathwayCards.map((card) => (
        <article key={card.title} className="panel overflow-hidden rounded-[1.9rem]">
          <img
            src={resolveImageSrc(baseUrl, card.visual.image)}
            alt={card.visual.alt}
            className="h-52 w-full object-cover"
            style={{ objectPosition: card.visual.position }}
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
    </section>
  )
}

function PantryGallery() {
  return (
    <section className="panel rounded-[2.1rem] p-7 sm:p-9">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Visual pantry</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-6xl">
            More photo density gives the brand a point of view.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          Instead of repeating the same bottle shot, the site now mixes produce, packaging,
          ingredient, and fermentation imagery to make each section feel more specific.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
              className={`w-full object-cover ${index === 0 ? 'h-full min-h-[23rem]' : 'h-56'}`}
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
    <section className="panel rounded-[2rem] p-7 sm:p-9">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Signature shelf</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-6xl">
            Reference bottles with sharper personalities.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          The range now feels broader on first glance because every bottle card uses imagery that
          matches its flavor direction instead of generic red-pepper filler.
        </p>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-4">
        {houseSauces.map((sauce) => {
          const visual = houseSauceVisuals[sauce.name]

          return (
            <article
              key={sauce.name}
              className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/16"
              style={{
                backgroundImage: `linear-gradient(160deg, ${sauce.tone}26, rgba(12, 12, 12, 0.08))`,
              }}
            >
              <img
                src={resolveImageSrc(baseUrl, visual.image)}
                alt={visual.alt}
                className="h-48 w-full object-cover"
                style={{ objectPosition: visual.position }}
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
    <section className="panel rounded-[2rem] p-7 sm:p-9">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Pepper atlas</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-6xl">
            Pepper cards that feel more like a field guide than a spreadsheet.
          </h2>
        </div>
        <Link to="/wiki" className="secondary-button w-full sm:w-auto">
          Open the full wiki
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {peppers.map((pepper) => (
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
              className="h-52 w-full object-cover"
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
    <section className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
      <article className="panel rounded-[2rem] p-7 sm:p-9">
        <p className="section-kicker">Sauce families</p>
        <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-6xl">
          Familiar flavor lanes make the catalog feel intentional.
        </h2>
        <p className="mt-5 text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          The visual language now backs up the information architecture: bright bottles look bright,
          fruit-forward bottles look lush, and dark blends finally feel moody.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[editorialImages.habaneroPlant, editorialImages.fermentedJar].map((item) => (
            <img
              key={item.image}
              src={resolveImageSrc(baseUrl, item.image)}
              alt={item.alt}
              className="h-44 w-full rounded-[1.5rem] object-cover"
              style={{ objectPosition: item.position }}
            />
          ))}
        </div>
      </article>

      <div className="grid gap-4 md:grid-cols-2">
        {sauceFamilies.map((family) => {
          const visual = familyVisuals[family.name]

          return (
            <article key={family.name} className="panel overflow-hidden rounded-[1.8rem]">
              <img
                src={resolveImageSrc(baseUrl, visual.image)}
                alt={visual.alt}
                className="h-40 w-full object-cover"
                style={{ objectPosition: visual.position }}
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
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="panel rounded-[2rem] p-7 sm:p-9">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Lab flow</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-6xl">
            The builder is now framed like a creative process, not a raw form.
          </h2>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {labSteps.map((step, index) => (
          <article
            key={step.title}
            className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/16"
          >
            <img
              src={resolveImageSrc(baseUrl, processVisuals[index].image)}
              alt={processVisuals[index].alt}
              className="h-44 w-full object-cover"
              style={{ objectPosition: processVisuals[index].position }}
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
      <figcaption
        className={`absolute left-4 top-4 rounded-full border border-white/12 bg-black/35 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-cream)] ${compact ? '' : ''}`}
      >
        {item.label}
      </figcaption>
    </figure>
  )
}

export default HomePage
