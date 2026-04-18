import { Navigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import ArticleHero from '../components/encyclopedia/ArticleHero'
import FactGrid from '../components/encyclopedia/FactGrid'
import RelatedRail from '../components/encyclopedia/RelatedRail'
import SourceList from '../components/encyclopedia/SourceList'
import { recipeFeatureMap, pepperProfileMap, restaurantMap } from '../data/catalog'
import { getRecipeAssociation, getRestaurantAssociation } from '../lib/media'
import { getBreadcrumbs } from '../lib/breadcrumbs'
import TextLink from '../components/TextLink'

function RecipeDetailPage() {
  const { slug } = useParams()
  const recipe = recipeFeatureMap[slug]

  if (!recipe) return <Navigate to="/wiki" replace />

  const leadPepper = pepperProfileMap[recipe.leadPepperSlugs[0]]
  const media = getRecipeAssociation(recipe.slug)
  const breadcrumbs = getBreadcrumbs(`/wiki/recipes/${recipe.slug}`, recipe)

  const relatedItems = recipe.relatedRestaurantSlugs
    .map((restaurantSlug) => {
      const restaurant = restaurantMap[restaurantSlug]
      if (!restaurant) return null

      const relatedMedia = getRestaurantAssociation(restaurant.slug)

      return {
        href: `/wiki/restaurants/${restaurant.slug}`,
        title: restaurant.name,
        kind: restaurant.contentType,
        copy: restaurant.summary,
        visual: relatedMedia?.heroVisual,
        actionLabel: restaurant.cardAction,
      }
    })
    .filter(Boolean)

  return (
    <div className="page-sections detail-page detail-page--recipe">
      <ArticleHero
        kicker={recipe.kind}
        title={recipe.title}
        subtitle={recipe.summary}
        landscape={media.heroVisual}
        chips={[leadPepper.name, leadPepper.origin, leadPepper.heatBand]}
        variant="recipe"
        breadcrumbs={breadcrumbs}
        typeLabel={recipe.contentType}
      >
        <p className="rounded-[1.6rem] border border-white/10 bg-black/24 p-4 text-sm leading-7 text-[var(--color-text-soft)]">
          {recipe.heroNote}
        </p>
      </ArticleHero>

      <section className="viewport-section grid gap-4">
        <FactGrid
          variant="recipe"
          facts={[
            { label: 'Lead pepper', value: leadPepper.name },
            { label: 'Pepper origin', value: leadPepper.origin },
            { label: 'Heat range', value: leadPepper.heat },
            { label: 'Use cases', value: leadPepper.culinaryUses.join(', ') },
          ]}
        />

        <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
          {recipe.sections.map((section) => (
            <article
              key={section.title}
              className="panel detail-section-card detail-section-card--recipe rounded-[2rem] p-6 sm:p-8"
            >
              <p className="section-kicker">{recipe.kind}</p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--color-cream)]">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="panel detail-section-card detail-section-card--recipe rounded-[2rem] p-6 sm:p-8">
          <p className="section-kicker">Kitchen cues</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {recipe.kitchenBullets.map((bullet) => (
              <div
                key={bullet}
                className="detail-note detail-note--recipe rounded-[1.4rem] border border-white/10 bg-black/16 px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]"
              >
                {bullet}
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <TextLink to={`/wiki/peppers/${leadPepper.slug}`}>Open the lead pepper dossier</TextLink>
            <TextLink to="/wiki/heat-pairings">Return to pairings and notebooks</TextLink>
          </div>
        </section>

        <RelatedRail title="Where this flavor logic appears" items={relatedItems} variant="recipe" />
        <SourceList sources={recipe.sources} variant="recipe" />
      </section>

      <Footer />
    </div>
  )
}

export default RecipeDetailPage
