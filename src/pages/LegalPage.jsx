import { Link, Navigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import ContentTypeBadge from '../components/ContentTypeBadge'
import TextLink from '../components/TextLink'
import { legalPages } from '../data/catalog'
import { getBreadcrumbs } from '../lib/breadcrumbs'

function LegalPage({ slug: explicitSlug }) {
  const params = useParams()
  const slug = explicitSlug ?? params.slug
  const page = legalPages[slug]

  if (!page) return <Navigate to="/" replace />

  const breadcrumbs = getBreadcrumbs(`/legal/${page.slug}`, page)

  return (
    <div className="page-sections legal-page">
      <section className="panel legal-hero rounded-[2.2rem] p-6 sm:p-8 xl:p-9">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="section-kicker">Legal</p>
          <ContentTypeBadge tone="legal">{page.contentType}</ContentTypeBadge>
        </div>
        <h1 className="display-font mt-4 text-5xl uppercase leading-[0.9] text-[var(--color-cream)] sm:text-6xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-text)]">{page.intro}</p>

        <div className="legal-meta-grid mt-6 grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
          <div className="rounded-[1.4rem] border border-white/10 bg-black/16 px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]">
            <p className="section-kicker">Document details</p>
            <p className="mt-3 text-[var(--color-text)]">Language: {page.language}</p>
            <p className="text-[var(--color-text)]">Last updated: {page.lastUpdated}</p>
          </div>
          <Link to={page.alternateLanguagePath} className="secondary-button w-full lg:w-auto">
            Open {page.language === 'FR' ? 'English' : 'French'} version
          </Link>
          <Link to="/wiki" className="context-link">
            Return to encyclopedia
          </Link>
        </div>
      </section>

      <section className="viewport-section legal-stack grid gap-4 xl:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="panel legal-toc rounded-[2rem] p-5 sm:p-6">
          <p className="section-kicker">On this page</p>
          <div className="mt-4 flex flex-col gap-3">
            {page.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="text-link">
                <span>{section.heading}</span>
                <span aria-hidden="true" className="text-link-arrow">
                  →
                </span>
              </a>
            ))}
          </div>
          <div className="mt-6 border-t border-white/8 pt-6">
            <p className="section-kicker">Language parity</p>
            <TextLink to={page.alternateLanguagePath}>Open mirrored legal document</TextLink>
          </div>
        </aside>

        <div className="grid gap-4">
          {page.sections.map((section) => (
            <article
              key={section.heading}
              id={section.id}
              className="panel legal-card rounded-[2rem] p-6 sm:p-8"
            >
              <p className="section-kicker">{page.language}</p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--color-cream)]">{section.heading}</h2>
              {section.items ? (
                <div className="mt-5 grid gap-3">
                  {section.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.4rem] border border-white/10 bg-black/16 px-4 py-3 text-sm leading-7 text-[var(--color-text)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
              {section.paragraphs ? (
                <div className="mt-5 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="legal-paragraph text-base leading-8 text-[var(--color-text)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
            </article>
          ))}

          <article className="panel legal-card legal-card--note rounded-[2rem] p-6 sm:p-8">
            <p className="section-kicker">Compliance note</p>
            <p className="mt-4 text-base leading-8 text-[var(--color-text)]">
              This text is provided as a compliance-oriented editorial draft for a France-facing site.
              It is not legal advice and should be reviewed by a qualified professional before a
              production launch.
            </p>
            <div className="mt-5 grid gap-3">
              {page.references.map((reference) => (
                <a
                  key={reference.href}
                  href={reference.href}
                  target="_blank"
                  rel="noreferrer"
                  className="source-link rounded-[1.4rem] border border-white/10 bg-black/16 px-4 py-4 text-sm leading-7 text-[var(--color-text)] transition hover:border-white/16 hover:bg-white/6"
                >
                  <span className="font-semibold text-[var(--color-cream)]">{reference.label}</span>
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LegalPage
