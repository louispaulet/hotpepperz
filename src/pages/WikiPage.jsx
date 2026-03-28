import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { houseSauces, pairingRules, peppers, safetyChecklist, sauceFamilies } from '../data/catalog'
import { editorialImages, featuredImageCredits, resolveImageSrc } from '../lib/media'

const numberFormatter = new Intl.NumberFormat('en-US')
const baseUrl = import.meta.env.BASE_URL

const heroGallery = [
  {
    image: editorialImages.habaneroMacro.image,
    alt: editorialImages.habaneroMacro.alt,
    label: 'Macro heat',
  },
  {
    image: editorialImages.bottleLineup.image,
    alt: editorialImages.bottleLineup.alt,
    label: 'Bottle logic',
  },
  {
    image: editorialImages.pepperStillLife.image,
    alt: editorialImages.pepperStillLife.alt,
    label: 'Dark field',
  },
  {
    image: editorialImages.nagaCluster.image,
    alt: editorialImages.nagaCluster.alt,
    label: 'Superhot cluster',
  },
]

const familyVisuals = {
  'Bright Citrus': {
    image: 'images/jalapeno-peppers.jpg',
    alt: 'Jalapeno peppers for bright citrus sauces',
  },
  'Tropical Heat': {
    image: editorialImages.habaneroMacro.image,
    alt: editorialImages.habaneroMacro.alt,
  },
  'Dark Smoke': {
    image: editorialImages.pepperStillLife.image,
    alt: editorialImages.pepperStillLife.alt,
  },
  'Collector Superhots': {
    image: editorialImages.nagaCluster.image,
    alt: editorialImages.nagaCluster.alt,
  },
}

const houseSauceVisuals = {
  'Market Ember No. 3': {
    image: 'images/serrano-peppers.jpg',
    alt: 'Serrano peppers supporting Market Ember No. 3',
  },
  'Lantern Choir': {
    image: editorialImages.habaneroMacro.image,
    alt: editorialImages.habaneroMacro.alt,
  },
  'After Midnight': {
    image: editorialImages.pepperStillLife.image,
    alt: editorialImages.pepperStillLife.alt,
  },
  'Signal Bloom': {
    image: 'images/aji-amarillo.jpg',
    alt: 'Aji amarillo peppers supporting Signal Bloom',
  },
}

const rulePanels = [
  {
    title: 'Pairing rules',
    image: editorialImages.pepperStillLife.image,
    alt: editorialImages.pepperStillLife.alt,
    items: pairingRules,
  },
  {
    title: 'Safety checklist',
    image: editorialImages.nagaCluster.image,
    alt: editorialImages.nagaCluster.alt,
    items: safetyChecklist,
  },
]

function formatShu(value) {
  return `${numberFormatter.format(value)} SHU`
}

function WikiPage() {
  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="panel overflow-hidden rounded-[2rem] p-7 sm:p-10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-4xl">
            <p className="section-kicker">Pepper wiki</p>
            <h1 className="display-font mt-4 text-5xl uppercase leading-[0.9] text-[var(--color-cream)] sm:text-7xl">
              A compact field guide for peppers, sauce styles, and smarter pairings.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
              This wiki gives the rest of the product context: what each pepper brings, which sauce
              families make sense, and how to compose heat without flattening flavor.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="#peppers" className="secondary-button">
              Peppers
            </a>
            <a href="#families" className="secondary-button">
              Sauce Families
            </a>
            <a href="#pairings" className="secondary-button">
              Pairing Rules
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/16">
            <img
              src={resolveImageSrc(baseUrl, heroGallery[0].image)}
              alt={heroGallery[0].alt}
              className="h-80 w-full object-cover"
            />
          </article>
          <div className="grid gap-4 sm:grid-cols-2">
            {heroGallery.slice(1).map((item) => (
              <article
                key={item.label}
                className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/16"
              >
                <img
                  src={resolveImageSrc(baseUrl, item.image)}
                  alt={item.alt}
                  className="h-36 w-full object-cover"
                />
                <div className="px-4 py-3 text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  {item.label}
                </div>
              </article>
            ))}
            <article className="rounded-[1.8rem] border border-white/10 bg-black/16 p-5 sm:col-span-2">
              <p className="section-kicker">Reading lens</p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
                Heat range matters, but the faster cue is whether the pepper drives brightness,
                fruit, smoke, or delayed danger. The imagery now mirrors that progression instead
                of leaving the page as a wall of text.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="peppers" className="panel rounded-[2rem] p-7 sm:p-9">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Pepper field guide</p>
            <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-6xl">
              Heat should be legible before it is dramatic.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
            Scoville tells only one part of the story. The better buying and building cue is the
            combination of flavor, finish, and what each pepper wants to be paired with.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
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
                className="h-56 w-full object-cover"
              />
              <div className="p-5">
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
                <p className="mt-3 text-sm text-[var(--color-text-soft)]">
                  Pair with: {pepper.pairings.join(', ')}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="families" className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <article className="panel rounded-[2rem] p-7 sm:p-9">
          <p className="section-kicker">Sauce playbook</p>
          <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-6xl">
            A small taxonomy keeps the whole catalog readable.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
            Naming the patterns helps users browse with intent: bright green, fruit-led, dark
            smoke, or collector-grade superhot.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <img
              src={resolveImageSrc(baseUrl, editorialImages.bottleLineup.image)}
              alt={editorialImages.bottleLineup.alt}
              className="h-56 w-full rounded-[1.6rem] object-cover object-center"
            />
            <img
              src={resolveImageSrc(baseUrl, editorialImages.pepperStillLife.image)}
              alt={editorialImages.pepperStillLife.alt}
              className="h-56 w-full rounded-[1.6rem] object-cover"
            />
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
                  className="h-32 w-full object-cover"
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

      <section className="panel rounded-[2rem] p-7 sm:p-9">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">House examples</p>
            <h2 className="display-font mt-3 text-4xl uppercase leading-none text-[var(--color-cream)] sm:text-6xl">
              Reference bottles help explain the range.
            </h2>
          </div>
          <Link to="/lab" className="primary-button w-full sm:w-auto">
            Build your own
          </Link>
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-4">
          {houseSauces.map((sauce) => {
            const visual = houseSauceVisuals[sauce.name]

            return (
              <article
                key={sauce.name}
                className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/16"
                style={{
                  backgroundImage: `linear-gradient(155deg, ${sauce.tone}22, rgba(10, 10, 10, 0.06))`,
                }}
              >
                <img
                  src={resolveImageSrc(baseUrl, visual.image)}
                  alt={visual.alt}
                  className="h-36 w-full object-cover"
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
                  <p className="mt-4 text-sm text-[var(--color-text)]">Best on: {sauce.bestOn}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section id="pairings" className="grid gap-6 lg:grid-cols-2">
        {rulePanels.map((panel) => (
          <article key={panel.title} className="panel overflow-hidden rounded-[2rem]">
            <img
              src={resolveImageSrc(baseUrl, panel.image)}
              alt={panel.alt}
              className="h-48 w-full object-cover"
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
      </section>

      <section className="panel rounded-[2rem] p-7 sm:p-8">
        <p className="section-kicker">Image credits</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
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
          <a
            href="https://commons.wikimedia.org/wiki/File:Red_Chili_Pepper.jpg"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            Hero red chili photo
            <br />
            Wikimedia Commons, public domain
          </a>
          <a
            href="https://commons.wikimedia.org/wiki/File:Habanero_pepper.jpg"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            Habanero reference photo
            <br />
            Wikimedia Commons, public domain
          </a>
          <a
            href="https://commons.wikimedia.org/wiki/File:Fermented_hot_sauce.jpg"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            Fermented hot sauce
            <br />
            Wikimedia Commons source
          </a>
          <a
            href="https://commons.wikimedia.org/wiki/File:Serrano_peppers.jpg"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            Serrano peppers
            <br />
            Wikimedia Commons source
          </a>
          <a
            href="https://commons.wikimedia.org/wiki/File:JalapenoPeppers.JPG"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            Jalapeno peppers
            <br />
            Wikimedia Commons source
          </a>
          <a
            href="https://commons.wikimedia.org/wiki/File:Cayenne_pepper_2.JPG"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            Cayenne pepper
            <br />
            Wikimedia Commons source
          </a>
          <a
            href="https://commons.wikimedia.org/wiki/File:Aji_Amarillo_pepper.jpg"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            Aji amarillo
            <br />
            Wikimedia Commons source
          </a>
          <a
            href="https://commons.wikimedia.org/wiki/File:ARS-habanero.jpg"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            Habanero
            <br />
            Wikimedia Commons source
          </a>
          <a
            href="https://commons.wikimedia.org/wiki/File:20200826_Scotch_Bonnet_Pflanze_01.jpg"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            Scotch bonnet
            <br />
            Wikimedia Commons source
          </a>
          <a
            href="https://commons.wikimedia.org/wiki/File:Bhoot_Jolokia_(Ghost_Chili_pepper).jpg"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            Ghost pepper
            <br />
            Wikimedia Commons source
          </a>
          <a
            href="https://commons.wikimedia.org/wiki/File:Trinidad_scorpion_moruga_yellow.jpg"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            Trinidad scorpion
            <br />
            Wikimedia Commons source
          </a>
          <a
            href="https://commons.wikimedia.org/wiki/File:Carolina_Reaper_pepper_pods.jpg"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            Carolina reaper
            <br />
            Wikimedia Commons source
          </a>
          <a
            href="https://commons.wikimedia.org/wiki/File:HotPeppersinMarket.jpg"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-[var(--color-text-soft)]"
          >
            Market peppers
            <br />
            Wikimedia Commons source
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default WikiPage
