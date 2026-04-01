import { Link, NavLink } from 'react-router-dom'

function SiteFrame({ children }) {
  const navClass = ({ isActive }) =>
    [
      'rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] transition',
      isActive
        ? 'bg-[var(--color-cream)] text-[var(--color-ink)] shadow-[0_10px_24px_rgba(242,228,199,0.18)]'
        : 'text-[var(--color-text-soft)] hover:bg-white/8 hover:text-[var(--color-text)]',
    ].join(' ')

  return (
    <>
      <header className="sticky top-4 z-30 mb-8">
        <div className="panel rounded-[2rem] px-4 py-4 sm:px-6">
          <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/8 pb-4">
            <p className="mono-font text-[0.68rem] uppercase tracking-[0.32em] text-[var(--color-text-muted)]">
              Editorial hot sauce studio
            </p>
            <p className="mono-font text-[0.68rem] uppercase tracking-[0.32em] text-[var(--color-text-muted)]">
              Small batch heat atlas
            </p>
          </div>

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <Link to="/" className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-white/12 bg-[linear-gradient(160deg,rgba(255,188,104,0.28),rgba(255,92,46,0.22))] text-lg font-black text-[var(--color-cream)]">
                HZ
              </div>
              <div>
                <p className="display-font text-[1.9rem] uppercase leading-none text-[var(--color-cream)]">
                  HotPepperz
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                  Sauce design atelier
                </p>
              </div>
            </Link>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <nav className="flex flex-wrap gap-2">
                <NavLink to="/" className={navClass} end>
                  Home
                </NavLink>
                <NavLink to="/lab" className={navClass}>
                  Hot Sauce Lab
                </NavLink>
                <NavLink to="/wiki" className={navClass}>
                  Pepper Wiki
                </NavLink>
              </nav>

              <Link to="/lab" className="primary-button">
                Start a Blend
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </>
  )
}

export default SiteFrame
