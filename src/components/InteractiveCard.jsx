import { Link } from 'react-router-dom'
import ContentTypeBadge from './ContentTypeBadge'

function InteractiveCard({
  to,
  typeLabel,
  title,
  description,
  meta,
  actionLabel = 'Open entry',
  className = '',
  media = null,
  children,
  tone = 'default',
}) {
  return (
    <Link to={to} className={`interactive-card interactive-card--${tone} ${className}`.trim()}>
      {media}
      <div className="interactive-card-body p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {typeLabel ? <ContentTypeBadge tone={tone}>{typeLabel}</ContentTypeBadge> : null}
          {meta ? <p className="interactive-card-meta">{meta}</p> : null}
        </div>
        <h2 className="interactive-card-title mt-4 text-2xl font-semibold text-[var(--color-cream)]">
          {title}
        </h2>
        {description ? (
          <p className="interactive-card-copy mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-4">{children}</div> : null}
        <div className="interactive-card-action-row mt-5">
          <span className="interactive-card-action">{actionLabel}</span>
          <span aria-hidden="true" className="interactive-card-arrow">
            →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default InteractiveCard
