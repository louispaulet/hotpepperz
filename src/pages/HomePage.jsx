import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { houseSauces, labSteps, peppers, sauceFamilies } from '../data/catalog'

const numberFormatter = new Intl.NumberFormat('en-US')
const baseUrl = import.meta.env.BASE_URL

function formatShu(value) {
  return `${numberFormatter.format(value)} SHU`
}

function HomePage() {
  return (
    <div className="space-y-8 lg:space-y-10">
      <HeroSection />
      <ExperienceStrip />
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
    <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="panel overflow-hidden rounded-[2rem] p-7 sm:p-10 lg:p-12">
        <div className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
          🌶️ Trend-led packaging, smarter flavor UX
        </div>

        <div className="mt-7 max-w-4xl space-y-5">
          <h1 className="display-font text-5xl uppercase leading-[0.9] text-[var(--color-cream)] sm:text-7xl lg:text-[6.5rem]">
            Design sauces with more taste logic, more shelf presence, and less generic fire.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-soft)] sm:text-xl">
            HotPepperz now behaves like a real specialty sauce brand: editorial storefront,
            ingredient education, and a clearer lab for building bottles people would actually
            want to open.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/lab" className="primary-button">
            Build in the Lab
          </Link>
          <Link to="/wiki" className="secondary-button">
            Browse the Wiki
          </Link>
        </div>

        <dl className="mt-10 grid gap-4 md:grid-cols-3">
          <StatCard value="9" label="Pepper references" />
          <StatCard value="4" label="Sauce families" />
          <StatCard value="AI" label="Naming + label direction" />
        </dl>
      </div>

        <div className="grid gap-6">
          <article className="panel overflow-hidden rounded-[2rem]">
            <img
              src={`${baseUrl}images/hero-red-chili.jpg`}
              alt="Close-up red chili pepper used as a hero illustration"
              className="h-64 w-full object-cover"
            />
            <div className="p-7">
              <p className="section-kicker">📸 Editorial mood</p>
              <div className="mt-4 grid gap-4">
                <SignalLine label="Better flow" copy="Home, lab, and wiki now each have a clear job." />
                <SignalLine
                  label="Better education"
                  copy="Pepper heat, pairings, and sauce families are explained instead of implied."
                />
                <SignalLine
                  label="Better lab UX"
                  copy="The builder now reads like a formulation workspace, not a raw control panel."
                />
              </div>
            </div>
          </article>

          <article className="panel overflow-hidden rounded-[2rem]">
            <img
              src={`${baseUrl}images/hot-sauce-still-life.jpg`}
              alt="Hot sauce bottle still-life illustration"
              className="h-56 w-full object-cover object-left"
            />
            <div className="p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">🔥 Shelf highlight</p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--color-cream)]">
                {houseSauces[1].name}
              </h2>
              </div>
            <span className="rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
              {houseSauces[1].heat}
            </span>
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              {houseSauces[1].profile}
            </p>
            <p className="mt-4 text-base leading-7 text-[var(--color-text-soft)]">
              {houseSauces[1].story}
            </p>
            <p className="mt-5 text-sm text-[var(--color-text-soft)]">
              Best on: {houseSauces[1].bestOn}
            </p>
            </div>
          </article>
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
  const cards = [
    {
      title: 'Guided formulation lab',
      copy: 'Choose peppers by role, balance the body, then generate a concept only when the recipe makes sense.',
      link: '/lab',
      cta: 'Open the lab',
      image: `${baseUrl}images/hot-sauce-still-life.jpg`,
      alt: 'Hot sauce still life',
    },
    {
      title: 'Pepper + sauce wiki',
      copy: 'Browse quick education on heat bands, pairings, and where each sauce family fits.',
      link: '/wiki',
      cta: 'Read the guide',
      image: `${baseUrl}images/wiki-habanero.jpg`,
      alt: 'Habanero pepper',
    },
    {
      title: 'Shelf-ready brand direction',
      copy: 'The whole site now feels like a premium sauce label system instead of a themed demo page.',
      link: '/',
      cta: 'View the overview',
      image: `${baseUrl}images/market-peppers.jpg`,
      alt: 'Market peppers',
    },
  ]

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {cards.map((card) => (
        <article key={card.title} className="panel overflow-hidden rounded-[1.8rem]">
          <img src={card.image} alt={card.alt} className="h-44 w-full object-cover" />
          <div className="p-6">
          <p className="section-kicker">✨ Experience</p>
          <h2 className="mt-4 text-2xl font-semibold text-[var(--color-cream)]">{card.title}</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{card.copy}</p>
          <Link to={card.link} className="mt-6 inline-flex text-sm font-semibold text-[var(--color-saffron)]">
            {card.cta}
          </Link>
          </div>
        </article>
      ))}
    </section>
  )
}

function SignatureShelf() {
  return (
    <section className="panel rounded-[2rem] p-7 sm:p-9">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">🫙 Signature shelf</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-6xl">
            Reference bottles with distinct jobs.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          A better sauce catalog helps users understand range: daily-use bottles, fruit-led heat,
          dark smoke builds, and collector-grade superhot releases.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <article className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/16">
          <img
            src={`${baseUrl}images/serrano-peppers.jpg`}
            alt="Serrano peppers"
            className="h-48 w-full object-cover"
          />
        </article>
        <article className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/16">
          <img
            src={`${baseUrl}images/jalapeno-peppers.jpg`}
            alt="Jalapeno peppers"
            className="h-48 w-full object-cover"
          />
        </article>
        <article className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/16">
          <img
            src={`${baseUrl}images/hot-sauce-still-life.jpg`}
            alt="Hot sauce bottle still life"
            className="h-48 w-full object-cover object-left"
          />
        </article>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-4">
        {houseSauces.map((sauce) => (
          <article
            key={sauce.name}
            className="rounded-[1.6rem] border border-white/10 bg-black/16 p-5"
            style={{
              backgroundImage: `linear-gradient(160deg, ${sauce.tone}22, rgba(12, 12, 12, 0.06))`,
            }}
          >
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
          </article>
        ))}
      </div>
    </section>
  )
}

function PepperAtlasPreview() {
  return (
    <section className="panel rounded-[2rem] p-7 sm:p-9">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">📚 Pepper atlas</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-6xl">
            Heat data only matters when the flavor story is visible too.
          </h2>
        </div>
        <Link to="/wiki" className="secondary-button w-full sm:w-auto">
          Open the full wiki
        </Link>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <article className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/16">
            <img
              src={`${baseUrl}images/wiki-habanero.jpg`}
              alt="Habanero pepper close-up used in the pepper atlas section"
              className="h-56 w-full object-cover"
            />
          </article>
          <article className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/16">
            <img
              src={`${baseUrl}images/market-peppers.jpg`}
              alt="Assorted market peppers"
              className="h-56 w-full object-cover"
            />
          </article>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
        {peppers.map((pepper) => (
          <article
            key={pepper.id}
            className="rounded-[1.6rem] border border-white/10 bg-black/16 p-5"
            style={{
              backgroundImage: `linear-gradient(135deg, ${pepper.tone}24, rgba(10, 10, 10, 0.06))`,
            }}
          >
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
          </article>
        ))}
        </div>
      </div>
    </section>
  )
}

function SauceFamiliesSection() {
  return (
    <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <article className="panel rounded-[2rem] p-7 sm:p-9">
        <p className="section-kicker">🍽️ Sauce families</p>
        <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-6xl">
          Better IA starts by naming the patterns.
        </h2>
        <p className="mt-5 text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          Users browse faster when the site explains recognizable sauce directions instead of
          treating every bottle as random chaos.
        </p>
      </article>

      <div className="grid gap-4 md:grid-cols-2">
        {sauceFamilies.map((family) => (
          <article key={family.name} className="panel rounded-[1.8rem] p-6">
            <h3 className="text-2xl font-semibold text-[var(--color-cream)]">{family.name}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
              {family.description}
            </p>
            <p className="mt-4 text-sm text-[var(--color-text)]">Best for: {family.bestFor}</p>
            <p className="mt-3 text-sm text-[var(--color-text-soft)]">{family.buildCue}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="panel rounded-[2rem] p-7 sm:p-9">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">🧪 Lab flow</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-6xl">
            The builder now works like a recipe review, not a guessing game.
          </h2>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {labSteps.map((step, index) => (
          <article key={step.title} className="rounded-[1.8rem] border border-white/10 bg-black/16 p-6">
            <p className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
              Step 0{index + 1}
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-[var(--color-cream)]">{step.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{step.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HomePage
