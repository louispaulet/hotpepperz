import { Link } from 'react-router-dom'
import VisualImage from '../VisualImage'
import { resolveImageSrc } from '../../lib/media'

const baseUrl = import.meta.env.BASE_URL

function RelatedRail({ title, items }) {
  if (!items.length) return null

  return (
    <section className="panel rounded-[2rem] p-6 sm:p-8">
      <p className="section-kicker">{title}</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.href} to={item.href} className="panel overflow-hidden rounded-[1.8rem]">
            {item.visual ? (
              <VisualImage
                src={resolveImageSrc(baseUrl, item.visual.image)}
                alt={item.visual.alt}
                item={item.visual}
                className="h-40 w-full"
              />
            ) : null}
            <div className="p-5">
              <p className="section-kicker">{item.kind}</p>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--color-cream)]">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{item.copy}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RelatedRail
