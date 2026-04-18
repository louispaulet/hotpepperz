import { Navigate, Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import ArticleHero from '../components/encyclopedia/ArticleHero'
import FactGrid from '../components/encyclopedia/FactGrid'
import RelatedRail from '../components/encyclopedia/RelatedRail'
import SourceList from '../components/encyclopedia/SourceList'
import {
  pepperProfileMap,
  recipeFeatureMap,
  restaurantMap,
  legendMap,
} from '../data/catalog'
import {
  getLegendAssociation,
  getPepperAssociation,
  getRecipeAssociation,
  getRestaurantAssociation,
} from '../lib/media'
import { getBreadcrumbs } from '../lib/breadcrumbs'
import TextLink from '../components/TextLink'

function PepperDetailPage() {
  const { slug } = useParams()
  const pepper = pepperProfileMap[slug]

  if (!pepper) return <Navigate to="/wiki" replace />

  const media = getPepperAssociation(pepper.slug)
  const breadcrumbs = getBreadcrumbs(`/wiki/peppers/${pepper.slug}`, pepper)

  const relatedItems = [
    ...pepper.relatedRecipeSlugs.map((relatedSlug) => {
      const recipe = recipeFeatureMap[relatedSlug]
      if (!recipe) return null

      const leadPepper = getRecipeAssociation(recipe.slug)

      return {
        href: `/wiki/recipes/${recipe.slug}`,
        title: recipe.title,
        kind: recipe.contentType,
        copy: recipe.summary,
        visual: leadPepper?.heroVisual,
        actionLabel: recipe.cardAction,
      }
    }),
    ...pepper.relatedRestaurantSlugs.map((relatedSlug) => {
      const restaurant = restaurantMap[relatedSlug]
      if (!restaurant) return null

      const leadPepper = getRestaurantAssociation(restaurant.slug)

      return {
        href: `/wiki/restaurants/${restaurant.slug}`,
        title: restaurant.name,
        kind: restaurant.contentType,
        copy: restaurant.summary,
        visual: leadPepper?.heroVisual,
        actionLabel: restaurant.cardAction,
      }
    }),
    ...pepper.relatedLegendSlugs.map((relatedSlug) => {
      const legend = legendMap[relatedSlug]
      if (!legend) return null

      const leadPepper = getLegendAssociation(legend.slug)

      return {
        href: `/wiki/legends/${legend.slug}`,
        title: legend.title,
        kind: legend.contentType,
        copy: legend.summary,
        visual: leadPepper?.heroVisual,
        actionLabel: legend.cardAction,
      }
    }),
  ].filter(Boolean)

  return (
    <div className="page-sections detail-page detail-page--pepper">
      <ArticleHero
        kicker="Pepper profile"
        title={pepper.name}
        subtitle={pepper.summary}
        landscape={media.landscapeVisual}
        portrait={media.portraitVisual}
        chips={[pepper.origin, pepper.heatBand, pepper.heat]}
        variant="pepper"
        breadcrumbs={breadcrumbs}
        typeLabel={pepper.contentType}
      >
        <div className="rounded-[1.6rem] border border-white/10 bg-black/24 p-4 text-sm leading-7 text-[var(--color-text-soft)]">
          {pepper.cultivation}
        </div>
      </ArticleHero>

      <section className="viewport-section grid gap-4">
        <FactGrid
          variant="pepper"
          facts={[
            { label: 'Origin', value: pepper.origin },
            { label: 'Heat', value: pepper.heat },
            { label: 'Climate', value: pepper.climate },
            { label: 'Best pairings', value: pepper.pairings.join(', ') },
          ]}
        />

        <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="panel detail-section-card detail-section-card--pepper rounded-[2rem] p-6 sm:p-8">
            <p className="section-kicker">Flavor read</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--color-cream)]">How this pepper behaves</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
              {pepper.name} belongs in dishes that want {pepper.flavorNotes.join(', ')} character.
              It is especially at home in {pepper.culinaryUses.join(', ')}, where the pepper can bring
              both heat and aromatic identity.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{pepper.cultivation}</p>
            <Link to="/wiki/origins" className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-saffron)]">
              Explore the origins atlas
            </Link>
          </article>

          <article className="panel detail-section-card detail-section-card--pepper rounded-[2rem] p-6 sm:p-8">
            <p className="section-kicker">Next steps</p>
            <div className="mt-5 grid gap-3">
              {pepper.flavorNotes.map((note) => (
                <div
                  key={note}
                  className="detail-note detail-note--pepper rounded-[1.4rem] border border-white/10 bg-black/16 px-4 py-3 text-sm text-[var(--color-text-soft)]"
                >
                  {note}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3">
              <TextLink to="/wiki/origins">See this pepper through the origins atlas</TextLink>
              <TextLink to="/wiki/heat-pairings">Browse related pairings and uses</TextLink>
              {pepper.relatedRecipeSlugs[0] ? (
                <TextLink to={`/wiki/recipes/${pepper.relatedRecipeSlugs[0]}`}>
                  Jump to a linked recipe notebook
                </TextLink>
              ) : null}
            </div>
          </article>
        </section>

        <RelatedRail title="Linked reading" items={relatedItems} variant="pepper" />
        <SourceList sources={pepper.sources} variant="pepper" />
      </section>

      <Footer />
    </div>
  )
}

export default PepperDetailPage
