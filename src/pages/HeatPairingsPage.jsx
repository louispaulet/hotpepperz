import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { recipeFeatures } from '../data/catalog'
import { getPepperAssociation } from '../lib/media'
import VisualImage from '../components/VisualImage'
import { resolveImageSrc } from '../lib/media'

const baseUrl = import.meta.env.BASE_URL

function HeatPairingsPage() {
  return (
    <div className="page-sections">
      <section className="panel rounded-[2.2rem] p-6 sm:p-8 xl:p-9">
        <p className="section-kicker">Heat, Pairings, and Uses</p>
        <h1 className="display-font mt-4 text-5xl uppercase leading-[0.9] text-[var(--color-cream)] sm:text-6xl">
          Where peppers meet ingredients.
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          This index gathers both pairing studies and recipe notebooks. The aim is not just to name a
          pepper, but to show what it likes to sit beside on the plate.
        </p>
      </section>

      <section className="viewport-section grid gap-4 lg:grid-cols-2">
        {recipeFeatures.map((recipe) => {
          const media = getPepperAssociation(recipe.leadPepperSlugs[0])

          return (
            <Link key={recipe.slug} to={`/wiki/recipes/${recipe.slug}`} className="panel overflow-hidden rounded-[2rem]">
              <VisualImage
                src={resolveImageSrc(baseUrl, media.landscapeVisual.image)}
                alt={media.landscapeVisual.alt}
                item={media.landscapeVisual}
                className="h-48 w-full"
              />
              <div className="p-6">
                <p className="section-kicker">{recipe.kind}</p>
                <h2 className="mt-3 text-3xl font-semibold text-[var(--color-cream)]">{recipe.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{recipe.summary}</p>
              </div>
            </Link>
          )
        })}
      </section>

      <Footer />
    </div>
  )
}

export default HeatPairingsPage
