import { Navigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import ArticleHero from '../components/encyclopedia/ArticleHero'
import FactGrid from '../components/encyclopedia/FactGrid'
import RelatedRail from '../components/encyclopedia/RelatedRail'
import SourceList from '../components/encyclopedia/SourceList'
import { restaurantMap, pepperProfileMap, recipeFeatureMap } from '../data/catalog'
import { getPepperAssociation } from '../lib/media'

function RestaurantDetailPage() {
  const { slug } = useParams()
  const restaurant = restaurantMap[slug]

  if (!restaurant) return <Navigate to="/wiki" replace />

  const leadPepper = pepperProfileMap[restaurant.relatedPepperSlugs[0]]
  const media = getPepperAssociation(leadPepper.slug)

  const relatedItems = restaurant.relatedPepperSlugs
    .map((pepperSlug) => {
      const pepper = pepperProfileMap[pepperSlug]
      if (!pepper) return null
      const pepperMedia = getPepperAssociation(pepper.slug)

      return {
        href: `/wiki/peppers/${pepper.slug}`,
        title: pepper.name,
        kind: 'Pepper profile',
        copy: pepper.summary,
        visual: pepperMedia.portraitVisual,
      }
    })
    .concat(
      Object.values(recipeFeatureMap)
        .filter((recipe) =>
          recipe.relatedRestaurantSlugs?.includes(restaurant.slug) ||
          recipe.leadPepperSlugs.some((pepperSlug) => restaurant.relatedPepperSlugs.includes(pepperSlug)),
        )
        .slice(0, 2)
        .map((recipe) => {
          const recipeMedia = getPepperAssociation(recipe.leadPepperSlugs[0])

          return {
            href: `/wiki/recipes/${recipe.slug}`,
            title: recipe.title,
            kind: recipe.kind,
            copy: recipe.summary,
            visual: recipeMedia.landscapeVisual,
          }
        }),
    )
    .filter(Boolean)

  return (
    <div className="page-sections detail-page detail-page--restaurant">
      <ArticleHero
        kicker="Restaurant spotlight"
        title={restaurant.name}
        subtitle={restaurant.summary}
        landscape={media.landscapeVisual}
        portrait={media.portraitVisual}
        chips={[restaurant.city, restaurant.recognition, restaurant.cuisine]}
        variant="restaurant"
      >
        <div className="rounded-[1.6rem] border border-white/10 bg-black/24 p-4 text-sm leading-7 text-[var(--color-text-soft)]">
          {restaurant.whyItMatters}
        </div>
      </ArticleHero>

      <section className="viewport-section grid gap-4">
        <FactGrid
          variant="restaurant"
          facts={[
            { label: 'City', value: restaurant.city },
            { label: 'Recognition', value: restaurant.recognition },
            { label: 'Cuisine', value: restaurant.cuisine },
            { label: 'Pepper links', value: restaurant.relatedPepperSlugs.map((slug) => pepperProfileMap[slug]?.name).join(', ') },
          ]}
        />

        <section className="panel detail-section-card detail-section-card--restaurant rounded-[2rem] p-6 sm:p-8">
          <p className="section-kicker">Why it belongs here</p>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            This encyclopedia is not only about peppers as ingredients; it is also about where those
            peppers show up at ambitious tables. {restaurant.name} is included because it demonstrates
            how chili heat can stay culturally grounded, technically precise, and memorable in a more
            elevated dining context.
          </p>
        </section>

        <RelatedRail title="Pepper and menu context" items={relatedItems} variant="restaurant" />
        <SourceList sources={restaurant.sourceLinks} variant="restaurant" />
      </section>

      <Footer />
    </div>
  )
}

export default RestaurantDetailPage
