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
            A pepper-first journal about hot sauce craft, ingredient knowledge, and the traditions
            that make a good bottle worth keeping on the table.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
            Explore
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--color-text-soft)]">
            <Link to="/">Journal</Link>
            <Link to="/lab">Workshop</Link>
            <Link to="/wiki">Field Guide</Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
            House Note
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            The workshop can generate bottle naming and label studies when the optional AI keys are
            configured, but the core reference material is written to stand on its own.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
