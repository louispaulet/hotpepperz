import { Link } from 'react-router-dom'

function TextLink({ to, children, className = '' }) {
  return (
    <Link to={to} className={`text-link ${className}`.trim()}>
      <span>{children}</span>
      <span aria-hidden="true" className="text-link-arrow">
        →
      </span>
    </Link>
  )
}

export default TextLink
