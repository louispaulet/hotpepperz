import Footer from '../components/Footer'
import SauceStudio from '../components/SauceStudio'
import { labSteps, pairingRules } from '../data/catalog'
import { editorialImages, resolveImageSrc } from '../lib/media'

const baseUrl = import.meta.env.BASE_URL

const moodboardImages = [
  {
    image: editorialImages.bottleLineup.image,
    alt: editorialImages.bottleLineup.alt,
    label: 'Bottle gravity',
  },
  {
    image: editorialImages.habaneroMacro.image,
    alt: editorialImages.habaneroMacro.alt,
    label: 'Fruit lift',
  },
  {
    image: editorialImages.pepperStillLife.image,
    alt: editorialImages.pepperStillLife.alt,
    label: 'Dark field',
  },
  {
    image: editorialImages.nagaCluster.image,
    alt: editorialImages.nagaCluster.alt,
    label: 'Apex cluster',
  },
]

const referenceCards = [
  {
    image: editorialImages.habaneroMacro.image,
    alt: editorialImages.habaneroMacro.alt,
    title: 'Fruit-forward references',
    copy: 'A tight macro reads more premium than a generic pepper spread when the sauce story leans bright and polished.',
  },
  {
    image: editorialImages.pepperStillLife.image,
    alt: editorialImages.pepperStillLife.alt,
    title: 'Dark produce textures',
    copy: 'Brooding still lifes give the lab more editorial depth and keep the route from feeling like a utility screen.',
  },
  {
    image: editorialImages.nagaCluster.image,
    alt: editorialImages.nagaCluster.alt,
    title: 'Superhot references',
    copy: 'Use true superhot clusters when the bottle needs collector energy instead of generic red-pepper drama.',
  },
  {
    image: editorialImages.bottleLineup.image,
    alt: editorialImages.bottleLineup.alt,
    title: 'Packaging references',
    copy: 'A strong bottle shot helps the output feel shelf-ready before the AI label render even appears.',
  },
]

const noteVisuals = [
  {
    image: editorialImages.pepperStillLife.image,
    alt: editorialImages.pepperStillLife.alt,
  },
  {
    image: editorialImages.habaneroMacro.image,
    alt: editorialImages.habaneroMacro.alt,
  },
  {
    image: editorialImages.bottleLineup.image,
    alt: editorialImages.bottleLineup.alt,
  },
]

function LabPage() {
  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <article className="panel overflow-hidden rounded-[2rem] p-7 sm:p-10">
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] opacity-20 lg:block"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(14, 11, 9, 0) 0%, rgba(14, 11, 9, 0.86) 88%), url(${baseUrl}${editorialImages.bottleLineup.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div className="relative">
            <p className="section-kicker">Hot sauce lab</p>
            <h1 className="display-font mt-4 text-5xl uppercase leading-[0.9] text-[var(--color-cream)] sm:text-7xl">
              Formulate the bottle before you brand the bottle.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
              The lab is now organized around the actual user job: choose a heat structure, balance
              the sauce, then generate a compelling concept without losing the recipe logic.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-4">
              {moodboardImages.map((item) => (
                <figure
                  key={item.label}
                  className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/18"
                >
                  <img
                    src={resolveImageSrc(baseUrl, item.image)}
                    alt={item.alt}
                    className="h-28 w-full object-cover"
                  />
                  <figcaption className="px-4 py-3 text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                    {item.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </article>

        <article className="panel overflow-hidden rounded-[2rem]">
          <div className="grid gap-3 p-4 sm:grid-cols-[1.12fr_0.88fr]">
            <img
              src={resolveImageSrc(baseUrl, editorialImages.bottleLineup.image)}
              alt={editorialImages.bottleLineup.alt}
              className="h-64 w-full rounded-[1.5rem] object-cover sm:h-full sm:min-h-[18rem]"
            />
            <div className="grid gap-3">
              <img
                src={resolveImageSrc(baseUrl, editorialImages.habaneroMacro.image)}
                alt={editorialImages.habaneroMacro.alt}
                className="h-[8.7rem] w-full rounded-[1.5rem] object-cover"
              />
              <img
                src={resolveImageSrc(baseUrl, editorialImages.pepperStillLife.image)}
                alt={editorialImages.pepperStillLife.alt}
                className="h-[8.7rem] w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </div>
          <div className="p-7 sm:p-8">
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
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {referenceCards.map((item) => (
          <article key={item.title} className="panel overflow-hidden rounded-[1.8rem]">
            <img
              src={resolveImageSrc(baseUrl, item.image)}
              alt={item.alt}
              className="h-44 w-full object-cover object-left"
            />
            <div className="p-6">
              <p className="section-kicker">Reference image</p>
              <h2 className="mt-4 text-2xl font-semibold text-[var(--color-cream)]">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{item.copy}</p>
            </div>
          </article>
        ))}
      </section>

      <SauceStudio />

      <section className="grid gap-4 lg:grid-cols-3">
        {labSteps.map((step, index) => (
          <article key={step.title} className="panel overflow-hidden rounded-[1.8rem]">
            <img
              src={resolveImageSrc(baseUrl, noteVisuals[index].image)}
              alt={noteVisuals[index].alt}
              className="h-36 w-full object-cover"
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

      <Footer />
    </div>
  )
}

export default LabPage
