import { Navigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import { legalPages } from '../data/catalog'

function LegalPage({ slug: explicitSlug }) {
  const params = useParams()
  const slug = explicitSlug ?? params.slug
  const page = legalPages[slug]

  if (!page) return <Navigate to="/" replace />

  return (
    <div className="page-sections">
      <section className="panel rounded-[2.2rem] p-6 sm:p-8 xl:p-9">
        <p className="section-kicker">Legal</p>
        <h1 className="display-font mt-4 text-5xl uppercase leading-[0.9] text-[var(--color-cream)] sm:text-6xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          {page.intro}
        </p>
      </section>

      <section className="viewport-section grid gap-4">
        {page.sections.map((section) => (
          <article key={section.heading} className="panel rounded-[2rem] p-6 sm:p-8">
            <p className="section-kicker">{page.language}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--color-cream)]">{section.heading}</h2>
            {section.items ? (
              <div className="mt-5 grid gap-3">
                {section.items.map((item) => (
                  <div key={item} className="rounded-[1.4rem] border border-white/10 bg-black/16 px-4 py-3 text-sm leading-7 text-[var(--color-text-soft)]">
                    {item}
                  </div>
                ))}
              </div>
            ) : null}
            {section.paragraphs ? (
              <div className="mt-5 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-[var(--color-text-soft)]">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </article>
        ))}

        <article className="panel rounded-[2rem] p-6 sm:p-8">
          <p className="section-kicker">Compliance note</p>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
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
                className="rounded-[1.4rem] border border-white/10 bg-black/16 px-4 py-3 text-sm leading-7 text-[var(--color-text-soft)] transition hover:border-white/16 hover:bg-white/6"
              >
                <span className="font-semibold text-[var(--color-cream)]">{reference.label}</span>
              </a>
            ))}
          </div>
        </article>
      </section>

      <Footer />
    </div>
  )
}

export default LegalPage
