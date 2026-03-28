import { Link, NavLink } from 'react-router-dom'

function SiteFrame({ children }) {
  const navClass = ({ isActive }) =>
    [
      'rounded-full px-4 py-2 text-sm uppercase tracking-[0.24em] transition',
      isActive
        ? 'bg-amber-200 text-stone-900'
        : 'text-amber-100/80 hover:bg-white/8 hover:text-white',
    ].join(' ')

  return (
    <>
      <header className="sticky top-4 z-30 mb-8">
        <div className="panel flex items-center justify-between gap-4 rounded-full px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-200/30 bg-white/8 text-xl font-black text-amber-200">
              HZ
            </div>
            <div>
              <p className="display-font text-2xl uppercase tracking-[0.18em] text-amber-100">
                HotPepperz
              </p>
              <p className="text-xs uppercase tracking-[0.22em] text-amber-50/55">
                Small-batch inferno studio
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink to="/" className={navClass} end>
              Home
            </NavLink>
            <NavLink to="/lab" className={navClass}>
              Sauce Lab
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </>
  )
}

export default SiteFrame
