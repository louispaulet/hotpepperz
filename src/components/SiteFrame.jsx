import { Link, NavLink } from 'react-router-dom'

function SiteFrame({ children, theme }) {
  const navClass = ({ isActive }) =>
    [
      'nav-pill rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition xl:px-4 xl:py-2.5',
      isActive ? 'nav-pill-active' : 'nav-pill-idle',
    ].join(' ')

  return (
    <>
      <header className="sticky top-3 z-30 mb-4 xl:mb-5">
        <div className="panel rounded-[1.8rem] px-4 py-3 sm:px-5 xl:px-6">
          <div className="mb-3 flex items-center justify-end gap-4 border-b border-white/8 pb-3 sm:justify-between">
            <p className="header-meta mono-font hidden text-[0.68rem] uppercase tracking-[0.32em] text-[var(--color-text-muted)] sm:block">
              Pepper journal, encyclopedia, and sauce workshop
            </p>
            <div className="header-badge-row flex items-center gap-2">
              <span className="theme-badge">{theme.label}</span>
              <p className="route-aware-note mono-font hidden text-[0.68rem] uppercase tracking-[0.28em] text-[var(--color-text-muted)] sm:block">
                Route-aware edition
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <Link to="/" className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] border border-white/12 bg-[linear-gradient(160deg,rgba(255,188,104,0.28),rgba(255,92,46,0.22))] text-base font-black text-[var(--color-cream)] xl:h-12 xl:w-12 xl:text-lg">
                HZ
              </div>
              <div>
                <p className="display-font text-[1.65rem] uppercase leading-none text-[var(--color-cream)] xl:text-[1.9rem]">
                  HotPepperz
                </p>
                <p className="brand-tagline mt-1 text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                  Craft hot sauce encyclopedia
                </p>
              </div>
            </Link>

            <div className="nav-cluster flex flex-col gap-3 sm:flex-row sm:items-center">
              <nav className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <NavLink to="/" className={navClass} end>
                  Journal
                </NavLink>
                <NavLink to="/wiki" className={navClass}>
                  Encyclopedia
                </NavLink>
                <NavLink to="/wiki/origins" className={navClass}>
                  Origins
                </NavLink>
                <NavLink to="/lab" className={navClass}>
                  Workshop
                </NavLink>
              </nav>

              <Link to={theme.ctaHref} className="primary-button header-primary-cta">
                {theme.ctaLabel}
              </Link>
            </div>
          </div>

          <div className="header-context mt-4 grid gap-3 border-t border-white/8 pt-4 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
            <div className="hidden sm:block">
              <p className="section-kicker">Current section</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-cream)]">
                {theme.label}
              </p>
            </div>
            <div className="min-w-0">
              <p className="header-copy text-sm leading-7 text-[var(--color-text)]">
                <span className="sm:hidden">{theme.mobileHeaderCopy ?? theme.headerCopy}</span>
                <span className="hidden sm:inline">{theme.headerCopy}</span>
              </p>
              <p className="header-note mt-1 text-sm leading-7 text-[var(--color-text-muted)]">
                {theme.headerNote}
              </p>
            </div>
            <Link to={theme.ctaHref} className="context-link">
              <span className="sm:hidden">{theme.mobileCtaLabel ?? theme.ctaLabel}</span>
              <span className="hidden sm:inline">{theme.ctaLabel}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </>
  )
}

export default SiteFrame
