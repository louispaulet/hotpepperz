import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="panel mt-4 rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.75fr_0.75fr]">
        <div>
          <p className="display-font text-3xl uppercase tracking-[0.12em] text-[var(--color-cream)]">
            HotPepperz
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
            A fictional hot sauce atelier built as a static frontend experience: part editorial
            brand world, part formulation lab, part compact pepper reference.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
            Explore
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--color-text-soft)]">
            <Link to="/">Overview</Link>
            <Link to="/lab">Hot Sauce Lab</Link>
            <Link to="/wiki">Pepper Wiki</Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
            Notes
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            Demo-only AI wiring. Naming uses Groq when configured. Label art uses Pollinations
            when a publishable key is present.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
