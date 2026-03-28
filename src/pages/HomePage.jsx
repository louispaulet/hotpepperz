import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import SauceStudio from '../components/SauceStudio'
import { featuredBlends, peppers, processSteps } from '../data/catalog'

const numberFormatter = new Intl.NumberFormat('en-US')

function formatShu(value) {
  return `${numberFormatter.format(value)} SHU`
}

function HomePage() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <HeatLadder />
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <SauceStudio compact />
        <FeaturedBlends />
      </section>
      <ProcessSection />
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="panel overflow-hidden rounded-[2rem] p-8 sm:p-10 lg:p-12">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-amber-200/20 bg-amber-100/10 px-4 py-2 text-xs uppercase tracking-[0.26em] text-amber-100/85">
            Build-your-own craft hot sauce
          </div>
          <div className="space-y-4">
            <h1 className="display-font max-w-4xl text-5xl uppercase leading-[0.92] text-amber-50 sm:text-7xl lg:text-8xl">
              Bottle your own fire, from porch glow to full cathedral heat.
            </h1>
            <p className="max-w-2xl text-lg text-amber-50/74 sm:text-xl">
              HotPepperz is a fictional studio for designing small-batch sauces with layered
              peppers, calibrated Scoville climbs, and AI-generated labels that feel printed by
              candlelight.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/lab" className="fire-button">
              Enter the Sauce Lab
            </Link>
            <a
              href="https://github.com/louispaulet/hotpepperz"
              target="_blank"
              rel="noreferrer"
              className="ghost-button"
            >
              View the Repo
            </a>
          </div>
          <dl className="grid gap-4 pt-6 sm:grid-cols-3">
            <StatCard value="9" label="Pepper tiers" />
            <StatCard value="8" label="Flavor accents" />
            <StatCard value="AI" label="Name + label pass" />
          </dl>
        </div>
      </div>

      <div className="panel relative overflow-hidden rounded-[2rem] p-8">
        <div className="absolute inset-x-6 top-6 flex justify-between text-xs uppercase tracking-[0.24em] text-amber-50/55">
          <span>Signature flight</span>
          <span>Edition 2026</span>
        </div>

        <div className="mt-12 grid gap-4">
          {featuredBlends.map((blend, index) => (
            <article
              key={blend.name}
              className="rounded-[1.75rem] border border-amber-200/12 bg-black/22 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)]"
              style={{ transform: `translateX(${index * 12}px)` }}
            >
              <p className="text-xs uppercase tracking-[0.22em] text-amber-100/55">
                Featured release {index + 1}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-amber-50">{blend.name}</h2>
              <p className="mt-3 text-sm uppercase tracking-[0.12em] text-amber-100/65">
                {blend.profile}
              </p>
              <p className="mt-4 text-sm text-amber-50/72">{blend.vibe}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-[1.5rem] border border-amber-200/12 bg-black/18 px-5 py-4 text-left">
      <dt className="text-3xl font-semibold text-amber-50">{value}</dt>
      <dd className="mt-2 text-xs uppercase tracking-[0.22em] text-amber-100/62">{label}</dd>
    </div>
  )
}

function HeatLadder() {
  return (
    <section className="panel rounded-[2rem] p-8 sm:p-10">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="eyebrow">Heat ladder</p>
          <h2 className="display-font text-4xl uppercase leading-none text-amber-50 sm:text-6xl">
            Every recipe starts with a decision about how brave you feel.
          </h2>
        </div>
        <p className="max-w-xl text-base text-amber-50/70">
          Build with crisp green peppers, lantern-fruit heat, or the apex cultivars that turn a
          sauce into a warning label.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {peppers.map((pepper) => (
          <article
            key={pepper.id}
            className="rounded-[1.5rem] border border-white/8 bg-black/18 p-5"
            style={{
              backgroundImage: `linear-gradient(135deg, ${pepper.tone}20, rgba(0,0,0,0.12))`,
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-amber-50">{pepper.name}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-amber-100/58">
                  {pepper.notes.join(' · ')}
                </p>
              </div>
              <span
                className="h-3 w-3 rounded-full shadow-[0_0_24px_rgba(255,255,255,0.18)]"
                style={{ backgroundColor: pepper.tone }}
              />
            </div>
            <div className="mt-4">
              <div className="heat-track">
                <div
                  className="heat-fill"
                  style={{
                    width: `${Math.max(8, Math.min(100, Math.log10(pepper.shuMax) * 12.2))}%`,
                    background: `linear-gradient(90deg, ${pepper.tone}, rgba(255,246,217,0.95))`,
                  }}
                />
              </div>
              <p className="mt-3 text-sm font-medium text-amber-50/80">
                {formatShu(pepper.shuMin)} to {formatShu(pepper.shuMax)}
              </p>
            </div>
            <p className="mt-4 text-sm text-amber-50/70">{pepper.story}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function FeaturedBlends() {
  return (
    <section className="panel rounded-[2rem] p-8 sm:p-10">
      <div className="space-y-3">
        <p className="eyebrow">House signatures</p>
        <h2 className="display-font text-4xl uppercase leading-none text-amber-50 sm:text-6xl">
          Reference the catalog, then break every rule.
        </h2>
        <p className="max-w-2xl text-base text-amber-50/70">
          The house blends show how fruit, smoke, and apex peppers can stay balanced when the
          recipe is deliberate.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {featuredBlends.map((blend) => (
          <article
            key={blend.name}
            className="rounded-[1.5rem] border border-amber-200/12 bg-black/18 p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-amber-50">{blend.name}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-amber-100/55">
                  {blend.profile}
                </p>
              </div>
              <span className="rounded-full border border-amber-200/16 px-3 py-1 text-xs uppercase tracking-[0.22em] text-amber-100/60">
                Signature
              </span>
            </div>
            <p className="mt-4 text-sm text-amber-50/72">{blend.vibe}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="panel rounded-[2rem] p-8 sm:p-10">
      <div className="space-y-3">
        <p className="eyebrow">How it works</p>
        <h2 className="display-font text-4xl uppercase leading-none text-amber-50 sm:text-6xl">
          A fictional studio with a very real respect for the climb.
        </h2>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {processSteps.map((step, index) => (
          <article
            key={step.title}
            className="rounded-[1.75rem] border border-amber-200/12 bg-black/18 p-6"
          >
            <p className="mono-font text-xs uppercase tracking-[0.22em] text-amber-100/48">
              Step 0{index + 1}
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-amber-50">{step.title}</h3>
            <p className="mt-4 text-sm text-amber-50/72">{step.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HomePage
