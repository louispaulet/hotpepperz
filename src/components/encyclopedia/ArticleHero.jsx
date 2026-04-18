import VisualImage from '../VisualImage'
import { resolveImageSrc } from '../../lib/media'

const baseUrl = import.meta.env.BASE_URL

function ArticleHero({
  kicker,
  title,
  subtitle,
  landscape,
  portrait = null,
  portraitItem,
  chips = [],
  children,
  variant = 'default',
}) {
  return (
    <section className={`panel article-hero article-hero--${variant} overflow-hidden rounded-[2.2rem]`}>
      <div
        className="article-hero-shell relative isolate min-h-[24rem] overflow-hidden px-6 py-7 sm:px-8 sm:py-9"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(10, 8, 7, 0.22), rgba(10, 8, 7, 0.92)), url(${resolveImageSrc(
            baseUrl,
            landscape.image,
          )})`,
          backgroundPosition: landscape.position ?? 'center center',
          backgroundSize: 'cover',
        }}
      >
        <div className="article-hero-overlay absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,205,122,0.2),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,96,48,0.14),transparent_32%)]" />
        <div className="relative z-10 grid gap-6 xl:grid-cols-[1.08fr_0.92fr] xl:items-end">
          <div className="max-w-4xl">
            <p className="section-kicker article-kicker text-[var(--color-gold)]">{kicker}</p>
            <h1 className="display-font mt-4 text-5xl uppercase leading-[0.88] text-[var(--color-cream)] sm:text-6xl">
              {title}
            </h1>
            <p className="article-subtitle mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
              {subtitle}
            </p>
            {chips.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="article-chip rounded-full border border-white/14 bg-black/24 px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-text)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
            {children ? <div className="mt-6 max-w-3xl">{children}</div> : null}
          </div>

          {portrait ? (
            <div className="flex justify-center xl:justify-end">
              <div className="article-portrait-frame w-full max-w-[22rem] rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(10,10,10,0.12),rgba(10,10,10,0.48))] p-4 backdrop-blur-sm">
                <VisualImage
                  src={resolveImageSrc(baseUrl, portrait.image)}
                  alt={portrait.alt}
                  item={portraitItem ?? portrait}
                  className="h-[20rem] w-full overflow-hidden rounded-[1.6rem]"
                  imgClassName="scale-[1.02]"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default ArticleHero
