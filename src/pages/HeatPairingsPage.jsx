import Footer from '../components/Footer'
import HubPanel from '../components/HubPanel'
import InteractiveCard from '../components/InteractiveCard'
import { recipeFeatures } from '../data/catalog'
import { getRecipeAssociation, resolveImageSrc } from '../lib/media'
import VisualImage from '../components/VisualImage'

const baseUrl = import.meta.env.BASE_URL

function HeatPairingsPage() {
  const pairingStudies = recipeFeatures.filter((recipe) => recipe.contentType === 'Pairing study')
  const notebooks = recipeFeatures.filter((recipe) => recipe.contentType === 'Recipe notebook')

  return (
    <div className="page-sections pairings-page">
      <section className="viewport-section grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <HubPanel
          kicker="Heat, Pairings, And Uses"
          typeLabel="Pairings route"
          title="Where peppers meet ingredients."
          description="This route now separates two reading modes: pairing studies for flavor logic and recipe notebooks for practical kitchen use. That keeps the index useful instead of visually ambiguous."
          links={[
            { to: '/wiki', label: 'Return to encyclopedia hub' },
            { to: '/lab', label: 'Switch to the sauce workshop' },
          ]}
          ctaHref="/lab"
          ctaLabel="Open the workshop"
          className="pairings-hero"
        />
        <section className="grid gap-4">
          {pairingStudies.slice(0, 2).map((recipe) => (
            <RecipePreviewCard key={recipe.slug} recipe={recipe} />
          ))}
        </section>
      </section>

      <section className="viewport-section grid gap-4">
        <HubPanel
          kicker="Pairing studies"
          typeLabel="Reference grouping"
          title="Flavor logic first."
          description="These entries explain why a pepper works with a given ingredient family before moving into kitchen application."
        />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {pairingStudies.map((recipe) => (
            <RecipePreviewCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="viewport-section grid gap-4">
        <HubPanel
          kicker="Recipe notebooks"
          typeLabel="Practical grouping"
          title="More method-driven kitchen pages."
          description="Notebooks stay closer to process, serving context, and handling cues while still linking back to the relevant pepper profile."
        />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {notebooks.map((recipe) => (
            <RecipePreviewCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

function RecipePreviewCard({ recipe }) {
  const media = getRecipeAssociation(recipe.slug)

  return (
    <InteractiveCard
      to={`/wiki/recipes/${recipe.slug}`}
      className="panel pairings-card overflow-hidden rounded-[2rem]"
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
          className="h-48 w-full"
        />
      }
    />
  )
}

export default HeatPairingsPage
