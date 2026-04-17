import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { pepperProfiles } from '../data/catalog'
import { getPepperAssociation, resolveImageSrc } from '../lib/media'

const baseUrl = import.meta.env.BASE_URL

function OriginsAtlasPage() {
  return (
    <div className="page-sections">
      <section className="panel rounded-[2.2rem] p-6 sm:p-8 xl:p-9">
        <p className="section-kicker">Pepper Origins Atlas</p>
        <h1 className="display-font mt-4 text-5xl uppercase leading-[0.9] text-[var(--color-cream)] sm:text-6xl">
          Landscapes behind the heat.
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
          This index page ties each featured pepper to a typical growing environment. The same
          association is reused across the encyclopedia, so landscape and pepper always travel
          together as a single editorial unit.
        </p>
      </section>

      <section className="viewport-section grid gap-4 lg:grid-cols-2">
        {pepperProfiles.map((pepper) => {
          const media = getPepperAssociation(pepper.slug)

          return (
            <Link key={pepper.slug} to={`/wiki/peppers/${pepper.slug}`} className="panel overflow-hidden rounded-[2rem]">
              <div
                className="relative min-h-[18rem] bg-cover bg-center p-6 sm:p-7"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(10,8,7,0.18), rgba(10,8,7,0.9)), url(${resolveImageSrc(
                    baseUrl,
                    media.landscapeVisual.image,
                  )})`,
                }}
              >
                <div className="grid h-full gap-4 md:grid-cols-[1fr_0.8fr] md:items-end">
                  <div>
                    <p className="section-kicker">{pepper.origin}</p>
                    <h2 className="mt-3 text-3xl font-semibold text-[var(--color-cream)]">{pepper.name}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{pepper.climate}</p>
                  </div>
                  <img
                    src={resolveImageSrc(baseUrl, media.portraitVisual.image)}
                    alt={media.portraitVisual.alt}
                    className="mx-auto h-44 object-contain drop-shadow-[0_20px_32px_rgba(0,0,0,0.34)]"
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </section>

      <Footer />
    </div>
  )
}

export default OriginsAtlasPage
