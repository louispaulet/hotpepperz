function ContentTypeBadge({ children, tone = 'default', className = '' }) {
  return (
    <span className={`content-type-badge content-type-badge--${tone} ${className}`.trim()}>
      {children}
    </span>
  )
}

export default ContentTypeBadge
