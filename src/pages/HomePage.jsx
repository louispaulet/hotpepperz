import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import VisualImage from '../components/VisualImage'
import {
  featuredPepperSlugs,
  pepperProfileMap,
  recipeFeatures,
  restaurants,
  legends,
} from '../data/catalog'
import { getPepperAssociation, resolveImageSrc } from '../lib/media'

const baseUrl = import.meta.env.BASE_URL

function HomePage() {
  const featuredPeppers = featuredPepperSlugs.slice(0, 4).map((slug) => pepperProfileMap[slug])
  const featuredRecipes = recipeFeatures.slice(0, 3)
  const featuredRestaurants = restaurants.slice(0, 4)
  const legend = legends[0]

  return (
    <div className="page-sections">
      <HeroSection featuredPeppers={featuredPeppers} />
      <FeaturedOriginsSection peppers={featuredPeppers} />
      <PairingsSection recipes={featuredRecipes} />
      <RestaurantSection restaurants={featuredRestaurants} />
      <LegendSection legend={legend} />
      <Footer />
    </div>
  )
}

function HeroSection({ featuredPeppers }) {
  const heroPepper = featuredPeppers[0]
  const media = getPepperAssociation(heroPepper.slug)

  return (
    <section className="viewport-section grid gap-4 xl:grid-cols-[1.06fr_0.94fr]">
      <article
        className="panel overflow-hidden rounded-[2.2rem] px-6 py-7 sm:px-8 sm:py-9 xl:px-9"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(10,8,7,0.18), rgba(10,8,7,0.9)), url(${resolveImageSrc(
            baseUrl,
            media.landscapeVisual.image,
          )})`,
          backgroundSize: 'cover',
          backgroundPosition: media.landscapeVisual.position,
        }}
      >
        <p className="section-kicker">Hot pepper encyclopedia</p>
        <h1 className="display-font mt-4 max-w-4xl text-6xl uppercase leading-[0.88] text-[var(--color-cream)]">
          New peppers, new landscapes, and a much larger atlas of heat.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          HotPepperz now reads more like an editorial encyclopedia: pepper pages, recipe studies,
          legends, restaurant spotlights, and France-facing legal drafts, all connected by reusable
          pepper-to-landscape associations.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/wiki" className="primary-button">
            Open the encyclopedia
          </Link>
          <Link to="/wiki/origins" className="secondary-button">
            Browse origins atlas
          </Link>
        </div>

        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatCard value="8" label="New pepper pages" />
          <StatCard value="6" label="Restaurant spotlights" />
          <StatCard value="6" label="Bilingual legal pages" />
        </dl>
      </article>

      <article className="grid gap-4">
        <div className="panel rounded-[2.2rem] p-5 sm:p-6">
          <p className="section-kicker">Association system</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--color-cream)]">
            Each pepper now carries its own portrait and origin landscape.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            Those image pairs are reused throughout the site so the encyclopedia, recipe stories,
            restaurant pages, and home sections all share the same visual logic.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {featuredPeppers.map((pepper) => {
            const item = getPepperAssociation(pepper.slug)

            return (
              <Link key={pepper.slug} to={`/wiki/peppers/${pepper.slug}`} className="panel overflow-hidden rounded-[1.9rem]">
                <VisualImage
                  src={resolveImageSrc(baseUrl, item.portraitVisual.image)}
                  alt={item.portraitVisual.alt}
                  item={item.portraitVisual}
                  className="h-44 w-full"
                />
                <div className="p-5">
                  <p className="section-kicker">{pepper.origin}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-[var(--color-cream)]">{pepper.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{pepper.summary}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </article>
    </section>
  )
}

function FeaturedOriginsSection({ peppers }) {
  return (
    <section className="viewport-section grid gap-4 xl:grid-cols-[1fr_1fr]">
      <section className="panel rounded-[2rem] p-6 sm:p-8">
        <p className="section-kicker">Featured origins</p>
        <h2 className="display-font mt-3 text-5xl uppercase leading-none text-[var(--color-cream)]">
          Landscapes behind the fruit.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
          From humid Southeast Asian fields to Andean terraces and Surinamese lowlands, the
          encyclopedia now ties peppers to the climates that shaped them.
        </p>
        <Link to="/wiki/origins" className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-saffron)]">
          See all origin landscapes
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {peppers.map((pepper) => {
          const media = getPepperAssociation(pepper.slug)

          return (
            <Link key={pepper.slug} to={`/wiki/peppers/${pepper.slug}`} className="panel overflow-hidden rounded-[1.9rem]">
              <VisualImage
                src={resolveImageSrc(baseUrl, media.landscapeVisual.image)}
                alt={media.landscapeVisual.alt}
                item={media.landscapeVisual}
                className="h-48 w-full"
              />
              <div className="p-5">
                <p className="section-kicker">{pepper.climate}</p>
                <h3 className="mt-3 text-2xl font-semibold text-[var(--color-cream)]">{pepper.name}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{pepper.origin}</p>
              </div>
            </Link>
          )
        })}
      </section>
    </section>
  )
}

function PairingsSection({ recipes }) {
  return (
    <section className="viewport-section grid gap-4 xl:grid-cols-[1fr_1fr]">
      <section className="panel rounded-[2rem] p-6 sm:p-8">
        <p className="section-kicker">Pepper and ingredient pairings</p>
        <h2 className="display-font mt-3 text-5xl uppercase leading-none text-[var(--color-cream)]">
          Recipes, associations, and useful legends.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
          We added pairing studies, recipe notebooks, and a migration legend so the site can explain
          not just what a pepper is, but what it likes to do once it reaches the pan.
        </p>
        <Link to="/wiki/heat-pairings" className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-saffron)]">
          Open pairings and uses
        </Link>
      </section>

      <section className="grid gap-4">
        {recipes.map((recipe) => {
          const media = getPepperAssociation(recipe.leadPepperSlugs[0])

          return (
            <Link key={recipe.slug} to={`/wiki/recipes/${recipe.slug}`} className="panel overflow-hidden rounded-[1.9rem]">
              <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                <VisualImage
                  src={resolveImageSrc(baseUrl, media.landscapeVisual.image)}
                  alt={media.landscapeVisual.alt}
                  item={media.landscapeVisual}
                  className="h-44 w-full md:h-full"
                />
                <div className="p-6">
                  <p className="section-kicker">{recipe.kind}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-[var(--color-cream)]">{recipe.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{recipe.summary}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </section>
    </section>
  )
}

function RestaurantSection({ restaurants }) {
  return (
    <section className="viewport-section grid gap-4">
      <section className="panel rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Where to taste the heat</p>
            <h2 className="display-font mt-3 text-5xl uppercase leading-none text-[var(--color-cream)]">
              Restaurants and fine dining stops.
            </h2>
          </div>
          <Link to="/wiki" className="secondary-button w-full sm:w-auto">
            Browse all spotlights
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {restaurants.map((restaurant) => {
            const media = getPepperAssociation(restaurant.relatedPepperSlugs[0])

            return (
              <Link
                key={restaurant.slug}
                to={`/wiki/restaurants/${restaurant.slug}`}
                className="panel overflow-hidden rounded-[1.8rem]"
              >
                <div
                  className="relative min-h-[16rem] p-5"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(10,8,7,0.22), rgba(10,8,7,0.92)), url(${resolveImageSrc(
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
                    className="mx-auto h-28 object-contain drop-shadow-[0_20px_28px_rgba(0,0,0,0.38)]"
                  />
                  <div className="mt-5">
                    <p className="section-kicker">{restaurant.recognition}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-[var(--color-cream)]">{restaurant.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{restaurant.city}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </section>
  )
}

function LegendSection({ legend }) {
  const media = getPepperAssociation(legend.relatedPepperSlugs[0])

  return (
    <section className="viewport-section grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="panel rounded-[2rem] p-6 sm:p-8">
        <p className="section-kicker">Legend</p>
        <h2 className="display-font mt-3 text-5xl uppercase leading-none text-[var(--color-cream)]">
          The pepper routes.
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{legend.summary}</p>
        <Link to={`/wiki/legends/${legend.slug}`} className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-saffron)]">
          Read the migration story
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
          <p className="section-kicker">New legal area</p>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            The footer now also exposes bilingual France-oriented legal draft pages: legal notice,
            terms of use, and privacy policy in both French and English.
          </p>
        </div>
      </section>
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

export default HomePage
