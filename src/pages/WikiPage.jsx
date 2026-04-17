import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import VisualImage from '../components/VisualImage'
import { pepperProfiles, recipeFeatures, restaurants, legends } from '../data/catalog'
import { getPepperAssociation, resolveImageSrc } from '../lib/media'

const baseUrl = import.meta.env.BASE_URL

function WikiPage() {
  return (
    <div className="page-sections">
      <HeroSection />
      <PepperIndexSection />
      <RecipeIndexSection />
      <RestaurantIndexSection />
      <LegendIndexSection />
      <Footer />
    </div>
  )
}

function HeroSection() {
  const heroMedia = getPepperAssociation('birds-eye-chili')

  return (
    <section className="panel overflow-hidden rounded-[2.2rem]">
      <div
        className="relative min-h-[26rem] px-6 py-7 sm:px-8 sm:py-9 xl:px-9"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(10,8,7,0.24), rgba(10,8,7,0.92)), url(${resolveImageSrc(
            baseUrl,
            heroMedia.landscapeVisual.image,
          )})`,
          backgroundSize: 'cover',
          backgroundPosition: heroMedia.landscapeVisual.position,
        }}
      >
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
          <div className="max-w-4xl">
            <p className="section-kicker">Encyclopedia hub</p>
            <h1 className="display-font mt-4 text-6xl uppercase leading-[0.88] text-[var(--color-cream)]">
              A real atlas of peppers, recipes, legends, and places to eat.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
              The field guide is no longer a compact side section. It now acts as a route-driven
              encyclopedia with reusable visual associations, supporting index pages, restaurant
              spotlights, and bilingual legal documents in the wider site shell.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/wiki/origins" className="secondary-button">
                Pepper Origins Atlas
              </Link>
              <Link to="/wiki/heat-pairings" className="secondary-button">
                Heat, Pairings, and Uses
              </Link>
            </div>
          </div>

          <div className="flex justify-center xl:justify-end">
            <div className="w-full max-w-[22rem] rounded-[2rem] border border-white/12 bg-black/22 p-4 backdrop-blur-sm">
              <VisualImage
                src={resolveImageSrc(baseUrl, heroMedia.portraitVisual.image)}
                alt={heroMedia.portraitVisual.alt}
                item={heroMedia.portraitVisual}
                className="h-[20rem] w-full rounded-[1.6rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PepperIndexSection() {
  return (
    <section className="viewport-section grid gap-4">
      <SectionHeading
        kicker="Pepper profiles"
        title="New portrait and landscape pairs for every featured pepper."
        ctaHref="/wiki/origins"
        ctaLabel="Open origins atlas"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pepperProfiles.map((pepper) => {
          const media = getPepperAssociation(pepper.slug)

          return (
            <Link key={pepper.slug} to={`/wiki/peppers/${pepper.slug}`} className="panel overflow-hidden rounded-[1.8rem]">
              <VisualImage
                src={resolveImageSrc(baseUrl, media.portraitVisual.image)}
                alt={media.portraitVisual.alt}
                item={media.portraitVisual}
                className="h-48 w-full"
              />
              <div className="p-5">
                <p className="section-kicker">{pepper.origin}</p>
                <h2 className="mt-3 text-2xl font-semibold text-[var(--color-cream)]">{pepper.name}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{pepper.summary}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function RecipeIndexSection() {
  return (
    <section className="viewport-section grid gap-4">
      <SectionHeading
        kicker="Pairings and recipes"
        title="Dedicated pages for ingredient associations and kitchen notebooks."
        ctaHref="/wiki/heat-pairings"
        ctaLabel="Open pairings index"
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {recipeFeatures.map((recipe) => {
          const media = getPepperAssociation(recipe.leadPepperSlugs[0])

          return (
            <Link key={recipe.slug} to={`/wiki/recipes/${recipe.slug}`} className="panel overflow-hidden rounded-[1.8rem]">
              <VisualImage
                src={resolveImageSrc(baseUrl, media.landscapeVisual.image)}
                alt={media.landscapeVisual.alt}
                item={media.landscapeVisual}
                className="h-44 w-full"
              />
              <div className="p-5">
                <p className="section-kicker">{recipe.kind}</p>
                <h2 className="mt-3 text-2xl font-semibold text-[var(--color-cream)]">{recipe.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{recipe.summary}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function RestaurantIndexSection() {
  return (
    <section className="viewport-section grid gap-4">
      <SectionHeading
        kicker="Restaurants"
        title="More Michelin and fine-dining references where hot peppers stay central."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {restaurants.slice(0, 6).map((restaurant) => {
          const media = getPepperAssociation(restaurant.relatedPepperSlugs[0])

          return (
            <Link
              key={restaurant.slug}
              to={`/wiki/restaurants/${restaurant.slug}`}
              className="panel overflow-hidden rounded-[1.8rem]"
            >
              <div
                className="min-h-[16rem] p-5"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(10,8,7,0.2), rgba(10,8,7,0.92)), url(${resolveImageSrc(
                    baseUrl,
                    media.landscapeVisual.image,
                  )})`,
                  backgroundSize: 'cover',
                  backgroundPosition: media.landscapeVisual.position,
                }}
              >
                <img
                  src={resolveImageSrc(baseUrl, media.portraitVisual.image)}
                  alt={media.portraitVisual.alt}
                  className="mx-auto h-28 object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.36)]"
                />
                <div className="mt-5">
                  <p className="section-kicker">{restaurant.recognition}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-[var(--color-cream)]">{restaurant.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{restaurant.city}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function LegendIndexSection() {
  const legend = legends[0]
  const media = getPepperAssociation(legend.relatedPepperSlugs[0])

  return (
    <section className="viewport-section grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
      <section className="panel rounded-[2rem] p-6 sm:p-8">
        <p className="section-kicker">Legend</p>
        <h2 className="display-font mt-3 text-5xl uppercase leading-none text-[var(--color-cream)]">
          The pepper routes.
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{legend.summary}</p>
        <Link to={`/wiki/legends/${legend.slug}`} className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-saffron)]">
          Read the history page
        </Link>
      </section>

      <section className="panel overflow-hidden rounded-[2rem]">
        <VisualImage
          src={resolveImageSrc(baseUrl, media.landscapeVisual.image)}
          alt={media.landscapeVisual.alt}
          item={media.landscapeVisual}
          className="h-56 w-full"
        />
        <div className="p-6">
          <p className="section-kicker">History and migration</p>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            The encyclopedia now includes a legend page that links the peppers back to trade, migration,
            and the many landscapes where they became local.
          </p>
        </div>
      </section>
    </section>
  )
}

function SectionHeading({ kicker, title, ctaHref, ctaLabel }) {
  return (
    <section className="panel rounded-[2rem] p-6 sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">{kicker}</p>
          <h2 className="display-font mt-3 text-5xl uppercase leading-none text-[var(--color-cream)]">
            {title}
          </h2>
        </div>
        {ctaHref && ctaLabel ? (
          <Link to={ctaHref} className="secondary-button w-full sm:w-auto">
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  )
}

export default WikiPage
