import { Navigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import ArticleHero from '../components/encyclopedia/ArticleHero'
import RelatedRail from '../components/encyclopedia/RelatedRail'
import SourceList from '../components/encyclopedia/SourceList'
import { legendMap, pepperProfileMap } from '../data/catalog'
import { getPepperAssociation } from '../lib/media'

function LegendDetailPage() {
  const { slug } = useParams()
  const legend = legendMap[slug]

  if (!legend) return <Navigate to="/wiki" replace />

  const media = getPepperAssociation(legend.relatedPepperSlugs[0])

  const relatedItems = legend.relatedPepperSlugs.slice(0, 6).map((pepperSlug) => {
    const pepper = pepperProfileMap[pepperSlug]
    const pepperMedia = getPepperAssociation(pepper.slug)

    return {
      href: `/wiki/peppers/${pepper.slug}`,
      title: pepper.name,
      kind: 'Pepper profile',
      copy: pepper.summary,
      visual: pepperMedia.landscapeVisual,
    }
  })

  return (
    <div className="page-sections">
      <ArticleHero
        kicker="Legend and history"
        title={legend.title}
        subtitle={legend.summary}
        landscape={media.landscapeVisual}
        portrait={media.portraitVisual}
        chips={['History', 'Migration', 'Pepper culture']}
      />

      <section className="viewport-section grid gap-4">
        <section className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr]">
          {legend.sections.map((section) => (
            <article key={section.title} className="panel rounded-[2rem] p-6 sm:p-8">
              <p className="section-kicker">Field note</p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--color-cream)]">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{section.body}</p>
            </article>
          ))}
        </section>

        <RelatedRail title="Peppers shaped by the routes" items={relatedItems} />
        <SourceList sources={legend.sources} />
      </section>

      <Footer />
    </div>
  )
}

export default LegendDetailPage
