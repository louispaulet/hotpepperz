import { Navigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import ArticleHero from '../components/encyclopedia/ArticleHero'
import RelatedRail from '../components/encyclopedia/RelatedRail'
import SourceList from '../components/encyclopedia/SourceList'
import { legendMap, pepperProfileMap } from '../data/catalog'
import { getLegendAssociation, getPepperAssociation } from '../lib/media'
import { getBreadcrumbs } from '../lib/breadcrumbs'
import TextLink from '../components/TextLink'

function LegendDetailPage() {
  const { slug } = useParams()
  const legend = legendMap[slug]

  if (!legend) return <Navigate to="/wiki" replace />

  const media = getLegendAssociation(legend.slug)
  const breadcrumbs = getBreadcrumbs(`/wiki/legends/${legend.slug}`, legend)

  const relatedItems = legend.relatedPepperSlugs.slice(0, 6).map((pepperSlug) => {
    const pepper = pepperProfileMap[pepperSlug]
    const pepperMedia = getPepperAssociation(pepper.slug)

    return {
      href: `/wiki/peppers/${pepper.slug}`,
      title: pepper.name,
      kind: pepper.contentType,
      copy: pepper.summary,
      visual: pepperMedia.landscapeVisual,
      actionLabel: pepper.cardAction,
    }
  })

  return (
    <div className="page-sections detail-page detail-page--legend">
      <ArticleHero
        kicker="Legend and history"
        title={legend.title}
        subtitle={legend.summary}
        landscape={media.heroVisual}
        chips={['History', 'Migration', 'Pepper culture']}
        variant="legend"
        breadcrumbs={breadcrumbs}
        typeLabel={legend.contentType}
      />

      <section className="viewport-section grid gap-4">
        <section className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr]">
          {legend.sections.map((section) => (
            <article
              key={section.title}
              className="panel detail-section-card detail-section-card--legend rounded-[2rem] p-6 sm:p-8"
            >
              <p className="section-kicker">Story chapter</p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--color-cream)]">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="panel detail-section-card detail-section-card--legend rounded-[2rem] p-6 sm:p-8">
          <p className="section-kicker">Continue exploring</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <TextLink to="/wiki/origins">Move from history to origin landscapes</TextLink>
            <TextLink to="/wiki">Return to the encyclopedia directory</TextLink>
          </div>
        </section>

        <RelatedRail title="Peppers shaped by the routes" items={relatedItems} variant="legend" />
        <SourceList sources={legend.sources} variant="legend" />
      </section>

      <Footer />
    </div>
  )
}

export default LegendDetailPage
