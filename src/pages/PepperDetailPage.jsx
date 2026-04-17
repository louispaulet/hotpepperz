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
import { getPepperAssociation } from '../lib/media'

function PepperDetailPage() {
  const { slug } = useParams()
  const pepper = pepperProfileMap[slug]

  if (!pepper) return <Navigate to="/wiki" replace />

  const media = getPepperAssociation(pepper.slug)

  const relatedItems = [
    ...pepper.relatedRecipeSlugs.map((relatedSlug) => {
      const recipe = recipeFeatureMap[relatedSlug]
      if (!recipe) return null

      const leadPepper = getPepperAssociation(recipe.leadPepperSlugs[0])

      return {
        href: `/wiki/recipes/${recipe.slug}`,
        title: recipe.title,
        kind: recipe.kind,
        copy: recipe.summary,
        visual: leadPepper?.landscapeVisual ?? leadPepper?.portraitVisual,
      }
    }),
    ...pepper.relatedRestaurantSlugs.map((relatedSlug) => {
      const restaurant = restaurantMap[relatedSlug]
      if (!restaurant) return null

      const leadPepper = getPepperAssociation(restaurant.relatedPepperSlugs[0])

      return {
        href: `/wiki/restaurants/${restaurant.slug}`,
        title: restaurant.name,
        kind: restaurant.recognition,
        copy: restaurant.summary,
        visual: leadPepper?.landscapeVisual ?? leadPepper?.portraitVisual,
      }
    }),
    ...pepper.relatedLegendSlugs.map((relatedSlug) => {
      const legend = legendMap[relatedSlug]
      if (!legend) return null

      const leadPepper = getPepperAssociation(legend.relatedPepperSlugs[0])

      return {
        href: `/wiki/legends/${legend.slug}`,
        title: legend.title,
        kind: 'Legend',
        copy: legend.summary,
        visual: leadPepper?.landscapeVisual ?? leadPepper?.portraitVisual,
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
            <p className="section-kicker">Cooking cues</p>
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
            <p className="mt-6 text-sm leading-7 text-[var(--color-text-soft)]">
              Reuse note: this pepper is paired throughout the encyclopedia with its origin landscape,
              so the same agricultural context appears on its own page, on related recipe cards, and
              inside restaurant spotlights.
            </p>
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
