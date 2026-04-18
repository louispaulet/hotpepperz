import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import HubPanel from '../components/HubPanel'
import InteractiveCard from '../components/InteractiveCard'
import VisualImage from '../components/VisualImage'
import { pepperProfiles, recipeFeatures, restaurants, legends } from '../data/catalog'
import {
  getLegendAssociation,
  getPepperAssociation,
  getRecipeAssociation,
  getRestaurantAssociation,
  resolveImageSrc,
} from '../lib/media'

const baseUrl = import.meta.env.BASE_URL

function WikiPage() {
  return (
    <div className="page-sections directory-page">
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
    <section className="panel directory-hero overflow-hidden rounded-[2.2rem]">
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
              A directory-first atlas with clear routes into profiles, notebooks, spotlights, and legends.
            </h1>
            <p className="hero-copy mt-4 max-w-3xl text-base leading-8 text-[var(--color-text)]">
              Use this page as the structured front door to the encyclopedia. Each section below now
              behaves as a category with explicit type labels, visible actions, and clearer hierarchy
              instead of one long run of similar-looking cards.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/wiki/origins" className="secondary-button">
                Pepper Origins Atlas
              </Link>
              <Link to="/wiki/heat-pairings" className="secondary-button">
                Heat, Pairings, And Uses
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
    <section className="viewport-section directory-section grid gap-4">
      <HubPanel
        kicker="Pepper profiles"
        typeLabel="Reference category"
        title="Pepper dossiers with clearer facts above the fold."
        description="Profiles now prioritize origin, heat, climate, pairings, and related reading so users can scan the key reference cues quickly."
        links={[
          { to: '/wiki/origins', label: 'Browse by origin landscape' },
          { to: '/wiki/heat-pairings', label: 'Move from peppers to pairings' },
        ]}
        ctaHref="/wiki/origins"
        ctaLabel="Open origins atlas"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pepperProfiles.map((pepper) => {
          const media = getPepperAssociation(pepper.slug)

          return (
            <InteractiveCard
              key={pepper.slug}
              to={`/wiki/peppers/${pepper.slug}`}
              className="panel directory-card directory-card--pepper overflow-hidden rounded-[1.8rem]"
              typeLabel={pepper.contentType}
              title={pepper.name}
              description={pepper.summary}
              meta={pepper.origin}
              actionLabel={pepper.cardAction}
              tone="pepper"
              media={
                <VisualImage
                  src={resolveImageSrc(baseUrl, media.portraitVisual.image)}
                  alt={media.portraitVisual.alt}
                  item={media.portraitVisual}
                  className="h-48 w-full"
                />
              }
            />
          )
        })}
      </div>
    </section>
  )
}

function RecipeIndexSection() {
  return (
    <section className="viewport-section directory-section grid gap-4">
      <HubPanel
        kicker="Pairings and recipes"
        typeLabel="Kitchen category"
        title="Pairing studies and recipe notebooks are now explicitly different destinations."
        description="Studies explain flavor logic. Notebooks stay closer to method and use. The cards now signal which reading mode each entry belongs to."
        links={[
          { to: '/wiki/heat-pairings', label: 'Browse the pairings index' },
          { to: '/lab', label: 'Switch to the sauce workshop' },
        ]}
        ctaHref="/wiki/heat-pairings"
        ctaLabel="Open pairings index"
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {recipeFeatures.map((recipe) => {
          const media = getRecipeAssociation(recipe.slug)

          return (
            <InteractiveCard
              key={recipe.slug}
              to={`/wiki/recipes/${recipe.slug}`}
              className="panel directory-card directory-card--recipe overflow-hidden rounded-[1.8rem]"
              typeLabel={recipe.contentType}
              title={recipe.title}
              description={recipe.summary}
              meta={recipe.kind}
              actionLabel={recipe.cardAction}
              tone="recipe"
              media={
                <VisualImage
                  src={resolveImageSrc(baseUrl, media.heroVisual.image)}
                  alt={media.heroVisual.alt}
                  item={media.heroVisual}
                  className="h-44 w-full"
                />
              }
            />
          )
        })}
      </div>
    </section>
  )
}

function RestaurantIndexSection() {
  return (
    <section className="viewport-section directory-section grid gap-4">
      <HubPanel
        kicker="Restaurants"
        typeLabel="Editorial category"
        title="Restaurant pages now read like spotlights rather than unlabeled image tiles."
        description="Each spotlight clarifies city, recognition, and why the restaurant matters to pepper culture before sending the user deeper."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {restaurants.slice(0, 6).map((restaurant) => {
          const media = getRestaurantAssociation(restaurant.slug)

          return (
            <InteractiveCard
              key={restaurant.slug}
              to={`/wiki/restaurants/${restaurant.slug}`}
              className="panel directory-card directory-card--restaurant overflow-hidden rounded-[1.8rem]"
              typeLabel={restaurant.contentType}
              title={restaurant.name}
              description={restaurant.summary}
              meta={`${restaurant.city} • ${restaurant.recognition}`}
              actionLabel={restaurant.cardAction}
              tone="restaurant"
              media={
                <VisualImage
                  src={resolveImageSrc(baseUrl, media.heroVisual.image)}
                  alt={media.heroVisual.alt}
                  item={media.heroVisual}
                  className="h-44 w-full"
                />
              }
            />
          )
        })}
      </div>
    </section>
  )
}

function LegendIndexSection() {
  const legend = legends[0]
  const media = getLegendAssociation(legend.slug)

  return (
    <section className="viewport-section directory-section grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
      <HubPanel
        kicker="Legend"
        typeLabel="Story category"
        title="The pepper routes."
        description="The legend now lives as a clear story destination rather than a teaser block. Use it for migration, trade, adaptation, and context across related peppers."
        links={[
          { to: `/wiki/legends/${legend.slug}`, label: 'Read the history page' },
          { to: '/wiki/origins', label: 'Jump from story to atlas' },
        ]}
        ctaHref={`/wiki/legends/${legend.slug}`}
        ctaLabel="Open the legend"
        className="directory-heading directory-heading--legend"
      />

      <InteractiveCard
        to={`/wiki/legends/${legend.slug}`}
        className="panel directory-card directory-card--legend overflow-hidden rounded-[2rem]"
        typeLabel={legend.contentType}
        title={legend.title}
        description={legend.summary}
        meta="History and migration"
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

export default WikiPage
