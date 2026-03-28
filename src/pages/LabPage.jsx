import Footer from '../components/Footer'
import SauceStudio from '../components/SauceStudio'
import { labSteps, pairingRules } from '../data/catalog'

function LabPage() {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <article className="panel rounded-[2rem] p-7 sm:p-10">
          <p className="section-kicker">🧪 Hot sauce lab</p>
          <h1 className="display-font mt-4 text-5xl uppercase leading-[0.9] text-[var(--color-cream)] sm:text-7xl">
            Formulate the bottle before you brand the bottle.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
            The lab is now organized around the actual user job: choose a heat structure, balance
            the sauce, then generate a compelling concept without losing the recipe logic.
          </p>
        </article>

        <article className="panel overflow-hidden rounded-[2rem]">
          <img
            src={`${baseUrl}images/hot-sauce-still-life.jpg`}
            alt="Hot sauce still-life used as lab illustration"
            className="h-56 w-full object-cover object-left"
          />
          <div className="p-7 sm:p-8">
          <p className="section-kicker">🔥 Review before generating</p>
          <div className="mt-5 space-y-4">
            {pairingRules.slice(0, 3).map((rule) => (
              <div key={rule} className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4">
                <p className="text-sm leading-7 text-[var(--color-text-soft)]">{rule}</p>
              </div>
            ))}
          </div>
          </div>
        </article>
      </section>

      <SauceStudio />

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          {
            image: `${baseUrl}images/serrano-peppers.jpg`,
            alt: 'Serrano peppers',
            title: 'Green heat references',
            copy: 'Use fresher peppers when you want speed, lift, and a more agile sauce profile.',
          },
          {
            image: `${baseUrl}images/market-peppers.jpg`,
            alt: 'Mixed market peppers',
            title: 'Blend-thinking references',
            copy: 'Color, size, and texture differences help sell the idea that each pepper plays a different role.',
          },
          {
            image: `${baseUrl}images/hot-sauce-still-life.jpg`,
            alt: 'Hot sauce still life',
            title: 'Packaging references',
            copy: 'The bottle needs to feel like the natural outcome of the recipe, not an afterthought.',
          },
        ].map((item) => (
          <article key={item.title} className="panel overflow-hidden rounded-[1.8rem]">
            <img src={item.image} alt={item.alt} className="h-52 w-full object-cover object-left" />
            <div className="p-6">
              <p className="section-kicker">📷 Reference image</p>
              <h2 className="mt-4 text-2xl font-semibold text-[var(--color-cream)]">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{item.copy}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {labSteps.map((step, index) => (
          <article key={step.title} className="panel rounded-[1.8rem] p-6">
            <p className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
              Lab note 0{index + 1}
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-[var(--color-cream)]">{step.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{step.copy}</p>
          </article>
        ))}
      </section>

      <Footer />
    </div>
  )
}

export default LabPage
