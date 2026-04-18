import Footer from '../components/Footer'
import HubPanel from '../components/HubPanel'
import InteractiveCard from '../components/InteractiveCard'
import VisualImage from '../components/VisualImage'
import { pepperProfiles } from '../data/catalog'
import { getPepperAssociation, resolveImageSrc } from '../lib/media'

const baseUrl = import.meta.env.BASE_URL

function OriginsAtlasPage() {
  return (
    <div className="page-sections atlas-page">
      <section className="viewport-section grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <HubPanel
          kicker="Pepper Origins Atlas"
          typeLabel="Atlas route"
          title="Landscapes behind the heat."
          description="This route now behaves as a landscape-first atlas. Use it to browse climates and growing contexts, then drop into the associated pepper dossier when you want heat, uses, and related reading."
          links={[
            { to: '/wiki', label: 'Return to the encyclopedia directory' },
            { to: '/wiki/heat-pairings', label: 'Continue into heat pairings and uses' },
          ]}
          ctaHref="/wiki"
          ctaLabel="Open pepper profiles"
          className="atlas-hero"
        />

        <section className="grid gap-4 sm:grid-cols-2">
          {pepperProfiles.slice(0, 4).map((pepper) => {
            const media = getPepperAssociation(pepper.slug)
            return (
              <InteractiveCard
                key={pepper.slug}
                to={`/wiki/peppers/${pepper.slug}`}
                className="panel atlas-card overflow-hidden rounded-[2rem]"
                typeLabel="Origin-linked pepper"
                title={pepper.name}
                description={pepper.climate}
                meta={pepper.origin}
                actionLabel="Open profile"
                tone="origins"
                media={
                  <div className="relative min-h-[16rem] overflow-hidden bg-black/10 p-5">
                    <VisualImage
                      src={resolveImageSrc(baseUrl, media.landscapeVisual.image)}
                      alt={media.landscapeVisual.alt}
                      item={media.landscapeVisual}
                      className="absolute inset-0 h-full w-full"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,7,0.14),rgba(10,8,7,0.86))]" />
                    <img
                      src={resolveImageSrc(baseUrl, media.portraitVisual.image)}
                      alt={media.portraitVisual.alt}
                      className="relative z-10 mx-auto mt-14 h-36 object-contain drop-shadow-[0_20px_32px_rgba(0,0,0,0.34)]"
                    />
                  </div>
                }
              />
            )
          })}
        </section>
      </section>

      <section className="viewport-section grid gap-4 lg:grid-cols-2">
        {pepperProfiles.map((pepper) => {
          const media = getPepperAssociation(pepper.slug)

          return (
            <InteractiveCard
              key={pepper.slug}
              to={`/wiki/peppers/${pepper.slug}`}
              className="panel atlas-card overflow-hidden rounded-[2rem]"
              typeLabel={pepper.contentType}
              title={pepper.name}
              description={`${pepper.climate}. Best known for ${pepper.culinaryUses.slice(0, 2).join(' and ')}.`}
              meta={pepper.origin}
              actionLabel={pepper.cardAction}
              tone="origins"
              media={
                <VisualImage
                  src={resolveImageSrc(baseUrl, media.landscapeVisual.image)}
                  alt={media.landscapeVisual.alt}
                  item={media.landscapeVisual}
                  className="h-56 w-full"
                />
              }
            />
          )
        })}
      </section>

      <Footer />
    </div>
  )
}

export default OriginsAtlasPage
