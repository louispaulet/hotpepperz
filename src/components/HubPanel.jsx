import ContentTypeBadge from './ContentTypeBadge'
import TextLink from './TextLink'

function HubPanel({
  kicker,
  title,
  description,
  typeLabel,
  links = [],
  ctaHref,
  ctaLabel,
  className = '',
}) {
  return (
    <section className={`panel hub-panel rounded-[2rem] p-6 sm:p-8 ${className}`.trim()}>
      <div className="flex flex-wrap items-center gap-3">
        {kicker ? <p className="section-kicker">{kicker}</p> : null}
        {typeLabel ? <ContentTypeBadge tone="hub">{typeLabel}</ContentTypeBadge> : null}
      </div>
      <h2 className="display-font mt-3 text-5xl uppercase leading-none text-[var(--color-cream)]">
        {title}
      </h2>
      <p className="section-copy mt-4 max-w-2xl text-base leading-8 text-[var(--color-text)]">
        {description}
      </p>
      {links.length ? (
        <div className="hub-panel-links mt-6 grid gap-3">
          {links.map((link) => (
            <TextLink key={`${link.to}-${link.label}`} to={link.to}>
              {link.label}
            </TextLink>
          ))}
        </div>
      ) : null}
      {ctaHref && ctaLabel ? (
        <TextLink to={ctaHref} className="mt-6">
          {ctaLabel}
        </TextLink>
      ) : null}
    </section>
  )
}

export default HubPanel
