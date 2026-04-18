import InteractiveCard from '../InteractiveCard'
import VisualImage from '../VisualImage'
import { resolveImageSrc } from '../../lib/media'

const baseUrl = import.meta.env.BASE_URL

function RelatedRail({ title, items, variant = 'default' }) {
  if (!items.length) return null

  return (
    <section className={`panel related-rail related-rail--${variant} rounded-[2rem] p-6 sm:p-8`}>
      <p className="section-kicker">{title}</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <InteractiveCard
            key={item.href}
            to={item.href}
            className="panel related-card overflow-hidden rounded-[1.8rem]"
            typeLabel={item.kind}
            title={item.title}
            description={item.copy}
            actionLabel={item.actionLabel ?? 'Open entry'}
            tone={variant}
            media={
              item.visual ? (
              <VisualImage
                src={resolveImageSrc(baseUrl, item.visual.image)}
                alt={item.visual.alt}
                item={item.visual}
                className="h-40 w-full"
              />
              ) : null
            }
          />
        ))}
      </div>
    </section>
  )
}

export default RelatedRail
