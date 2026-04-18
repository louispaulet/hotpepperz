import { Link } from 'react-router-dom'

function Breadcrumbs({ items }) {
  if (!items?.length) return null

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-trail">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-soft)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.to && !isLast ? (
                <Link to={item.to} className="breadcrumb-link">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'breadcrumb-current' : ''}>{item.label}</span>
              )}
              {!isLast ? (
                <span aria-hidden="true" className="breadcrumb-separator">
                  /
                </span>
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
