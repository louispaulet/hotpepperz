import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import HubPanel from '../components/HubPanel'
import InteractiveCard from '../components/InteractiveCard'
import VisualImage from '../components/VisualImage'
import {
  featuredPepperSlugs,
  pepperProfileMap,
  recipeFeatures,
  restaurants,
  legends,
} from '../data/catalog'
import {
  getLegendAssociation,
  getPepperAssociation,
  getRecipeAssociation,
  getRestaurantAssociation,
  resolveImageSrc,
} from '../lib/media'

const baseUrl = import.meta.env.BASE_URL

function HomePage() {
  const featuredPeppers = featuredPepperSlugs.slice(0, 4).map((slug) => pepperProfileMap[slug])
  const featuredRecipes = recipeFeatures.slice(0, 3)
  const featuredRestaurants = restaurants.slice(0, 4)
  const legend = legends[0]

  return (
    <div className="page-sections journal-page">
      <HeroSection featuredPeppers={featuredPeppers} />
      <FeaturedPeppersSection peppers={featuredPeppers} />
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
    <section className="viewport-section journal-landing grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
      <article
        className="panel journal-hero overflow-hidden rounded-[2.2rem] px-6 py-7 sm:px-8 sm:py-9 xl:px-9"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(10,8,7,0.18), rgba(10,8,7,0.9)), url(${resolveImageSrc(
            baseUrl,
            media.landscapeVisual.image,
          )})`,
          backgroundSize: 'cover',
          backgroundPosition: media.landscapeVisual.position,
        }}
      >
        <p className="section-kicker">Hot pepper journal</p>
        <h1 className="display-font mt-4 max-w-4xl text-6xl uppercase leading-[0.88] text-[var(--color-cream)]">
          Browse peppers, origins, pairings, and legends in one clear editorial reference.
        </h1>
        <p className="hero-copy mt-4 max-w-3xl text-base leading-8 text-[var(--color-text)]">
          HotPepperz now reads as an editorial encyclopedia: pepper profiles, origin landscapes,
          pairing studies, recipe notebooks, and the broader history of how heat travelled.
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
          <StatCard value="8" label="Pepper profiles" />
          <StatCard value="6" label="Recipe notebooks and studies" />
          <StatCard value="6" label="Bilingual legal documents" />
        </dl>
      </article>

      <section className="grid gap-4">
        <HubPanel
          kicker="Featured pepper entries"
          typeLabel="Tier 2 navigation"
          title="Every featured pepper now reads like a dossier."
          description="Pepper pages lead with origin, heat, climate, pairings, and related reading so they work as quick-reference dossiers."
          links={featuredPeppers.slice(0, 3).map((pepper) => ({
            to: `/wiki/peppers/${pepper.slug}`,
            label: pepper.name,
          }))}
          ctaHref="/wiki"
          ctaLabel="See all pepper profiles"
          className="journal-note-card"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {featuredPeppers.map((pepper) => {
            const item = getPepperAssociation(pepper.slug)

            return (
              <InteractiveCard
                key={pepper.slug}
                to={`/wiki/peppers/${pepper.slug}`}
                className="panel journal-card journal-card--pepper overflow-hidden rounded-[1.9rem]"
                typeLabel={pepper.contentType}
                title={pepper.name}
                description={pepper.summary}
                meta={pepper.origin}
                actionLabel={pepper.cardAction}
                tone="pepper"
                media={
                  <VisualImage
                    src={resolveImageSrc(baseUrl, item.portraitVisual.image)}
                    alt={item.portraitVisual.alt}
                    item={item.portraitVisual}
                    className="h-44 w-full"
                  />
                }
              />
            )
          })}
        </div>
      </section>
    </section>
  )
}

function FeaturedPeppersSection({ peppers }) {
  return (
    <section className="viewport-section grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <HubPanel
        kicker="Start here"
        typeLabel="Encyclopedia hub"
        title="A clearer way into the pepper reference."
        description="Use the encyclopedia when you want structured reference pages, the origins atlas when you want climate and geography, and the workshop when you want practical sauce-making guidance."
        links={[
          { to: '/wiki', label: 'Browse all peppers, recipes, and legends' },
          { to: '/wiki/heat-pairings', label: 'Open pairing studies and recipe notebooks' },
          { to: '/lab', label: 'Go to the sauce workshop' },
        ]}
        ctaHref="/wiki"
        ctaLabel="Open the directory"
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {peppers.slice(0, 2).map((pepper) => {
          const media = getPepperAssociation(pepper.slug)
          return (
            <InteractiveCard
              key={pepper.slug}
              to={`/wiki/peppers/${pepper.slug}`}
              className="panel journal-card overflow-hidden rounded-[1.9rem]"
              typeLabel={pepper.contentType}
              title={pepper.name}
              description={`${pepper.heatBand}. Best with ${pepper.pairings.join(', ')}.`}
              meta={pepper.origin}
              actionLabel="Open dossier"
              tone="pepper"
              media={
                <VisualImage
                  src={resolveImageSrc(baseUrl, media.portraitVisual.image)}
                  alt={media.portraitVisual.alt}
                  item={media.portraitVisual}
                  className="h-56 w-full"
                />
              }
            />
          )
        })}
      </div>
    </section>
  )
}

function FeaturedOriginsSection({ peppers }) {
  return (
    <section className="viewport-section journal-chapter-grid grid gap-4 xl:grid-cols-[1fr_1fr]">
      <HubPanel
        kicker="Featured origins"
        typeLabel="Atlas hub"
        title="Landscapes behind the fruit."
        description="The origins atlas brings peppers back to climate, terrain, and growing region. Open the atlas for landscapes, then move into a pepper profile for heat, uses, and related recipes."
        links={[
          { to: '/wiki/origins', label: 'Browse all origin landscapes' },
          { to: '/wiki', label: 'Return to encyclopedia hub' },
        ]}
        ctaHref="/wiki/origins"
        ctaLabel="Explore the atlas"
        className="chapter-card chapter-card--origins"
      />

      <section className="grid gap-4 sm:grid-cols-2">
        {peppers.map((pepper) => {
          const media = getPepperAssociation(pepper.slug)

          return (
            <InteractiveCard
              key={pepper.slug}
              to={`/wiki/peppers/${pepper.slug}`}
              className="panel journal-card journal-card--atlas overflow-hidden rounded-[1.9rem]"
              typeLabel="Origin-linked pepper"
              title={pepper.name}
              description={pepper.climate}
              meta={pepper.origin}
              actionLabel="Open origin-linked entry"
              tone="origins"
              media={
                <VisualImage
                  src={resolveImageSrc(baseUrl, media.landscapeVisual.image)}
                  alt={media.landscapeVisual.alt}
                  item={media.landscapeVisual}
                  className="h-48 w-full"
                />
              }
            />
          )
        })}
      </section>
    </section>
  )
}

function PairingsSection({ recipes }) {
  return (
    <section className="viewport-section journal-chapter-grid grid gap-4 xl:grid-cols-[1fr_1fr]">
      <HubPanel
        kicker="Heat, pairings, and uses"
        typeLabel="Pairings hub"
        title="Pairing studies and recipe notebooks now have clearer roles."
        description="Pairing studies focus on flavor logic, while recipe notebooks stay closer to the kitchen. Open whichever kind of reading you need."
        links={[
          { to: '/wiki/heat-pairings', label: 'Browse all pairing and recipe entries' },
          { to: '/lab', label: 'Switch to the workshop for bottle-building' },
        ]}
        ctaHref="/wiki/heat-pairings"
        ctaLabel="Open pairings and uses"
        className="chapter-card chapter-card--pairings"
      />

      <section className="grid gap-4">
        {recipes.map((recipe) => {
          const media = getRecipeAssociation(recipe.slug)

          return (
            <InteractiveCard
              key={recipe.slug}
              to={`/wiki/recipes/${recipe.slug}`}
              className="panel journal-card journal-card--pairings overflow-hidden rounded-[1.9rem]"
              typeLabel={recipe.contentType}
              title={recipe.title}
              description={recipe.summary}
              meta={recipe.leadPepperSlugs.length > 1 ? 'Multiple lead peppers' : 'Single lead pepper'}
              actionLabel={recipe.cardAction}
              tone="recipe"
              media={
                <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                  <VisualImage
                    src={resolveImageSrc(baseUrl, media.heroVisual.image)}
                    alt={media.heroVisual.alt}
                    item={media.heroVisual}
                    className="h-44 w-full md:h-full"
                  />
                  <div className="hidden md:block bg-[linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0))]" />
                </div>
              }
            />
          )
        })}
      </section>
    </section>
  )
}

function RestaurantSection({ restaurants }) {
  return (
    <section className="viewport-section grid gap-4">
      <section className="panel chapter-card chapter-card--restaurants rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Where to taste the heat</p>
            <h2 className="display-font mt-3 text-5xl uppercase leading-none text-[var(--color-cream)]">
              Restaurant spotlights with clearer destination cues.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-text)]">
              These cards now behave as explicit spotlights rather than decorative restaurant tiles:
              city, recognition, and the reason each stop matters sit above a clear open action.
            </p>
          </div>
          <Link to="/wiki" className="secondary-button w-full sm:w-auto">
            Browse all spotlights
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {restaurants.map((restaurant) => {
            const media = getRestaurantAssociation(restaurant.slug)

            return (
              <InteractiveCard
                key={restaurant.slug}
                to={`/wiki/restaurants/${restaurant.slug}`}
                className="panel journal-card journal-card--restaurant overflow-hidden rounded-[1.8rem]"
                typeLabel={restaurant.contentType}
                title={restaurant.name}
                description={restaurant.whyItMatters}
                meta={`${restaurant.city} • ${restaurant.recognition}`}
                actionLabel={restaurant.cardAction}
                tone="restaurant"
                media={
                  <VisualImage
                    src={resolveImageSrc(baseUrl, media.heroVisual.image)}
                    alt={media.heroVisual.alt}
                    item={media.heroVisual}
                    className="h-52 w-full"
                  />
                }
              />
            )
          })}
        </div>
      </section>
    </section>
  )
}

function LegendSection({ legend }) {
  const media = getLegendAssociation(legend.slug)

  return (
    <section className="viewport-section journal-chapter-grid grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <HubPanel
        kicker="History and migration"
        typeLabel="Legend hub"
        title="The pepper routes."
        description="The history section gathers migration, trade, and adaptation into one story that connects back to related peppers."
        links={[
          { to: `/wiki/legends/${legend.slug}`, label: 'Read the migration story' },
          { to: '/wiki/origins', label: 'Jump from story to origins atlas' },
        ]}
        ctaHref={`/wiki/legends/${legend.slug}`}
        ctaLabel="Open story hub"
        className="chapter-card chapter-card--legend"
      />

      <InteractiveCard
        to={`/wiki/legends/${legend.slug}`}
        className="panel journal-card journal-card--legend overflow-hidden rounded-[2rem]"
        typeLabel={legend.contentType}
        title={legend.title}
        description={legend.summary}
        meta="History, migration, and adaptation"
        actionLabel={legend.cardAction}
        tone="legend"
        media={
          <VisualImage
            src={resolveImageSrc(baseUrl, media.heroVisual.image)}
            alt={media.heroVisual.alt}
            item={media.heroVisual}
            className="h-56 w-full"
          />
        }
      />
    </section>
  )
}

function StatCard({ value, label }) {
  return (
    <div className="journal-stat-card rounded-[1.5rem] border border-white/10 px-4 py-4">
      <dt className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">{label}</dt>
      <dd className="mt-3 text-3xl font-semibold text-[var(--color-cream)]">{value}</dd>
    </div>
  )
}

export default HomePage
