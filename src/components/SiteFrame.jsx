import { Link, NavLink } from 'react-router-dom'

function SiteFrame({ children }) {
  const navClass = ({ isActive }) =>
    [
      'rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition xl:px-4 xl:py-2.5',
      isActive
        ? 'bg-[var(--color-cream)] text-[var(--color-ink)] shadow-[0_10px_24px_rgba(242,228,199,0.18)]'
        : 'text-[var(--color-text-soft)] hover:bg-white/8 hover:text-[var(--color-text)]',
    ].join(' ')

  return (
    <>
      <header className="sticky top-3 z-30 mb-4 xl:mb-5">
        <div className="panel rounded-[1.8rem] px-4 py-3 sm:px-5 xl:px-6">
          <div className="mb-3 flex items-center justify-between gap-4 border-b border-white/8 pb-3">
            <p className="mono-font text-[0.68rem] uppercase tracking-[0.32em] text-[var(--color-text-muted)]">
              Pepper journal, encyclopedia, and sauce workshop
            </p>
            <p className="mono-font text-[0.68rem] uppercase tracking-[0.32em] text-[var(--color-text-muted)]">
              Landscapes behind serious heat
            </p>
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
                <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                  Craft hot sauce encyclopedia
                </p>
              </div>
            </Link>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <nav className="flex flex-wrap gap-2">
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

              <Link to="/wiki" className="primary-button">
                Explore Heat
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </>
  )
}

export default SiteFrame
