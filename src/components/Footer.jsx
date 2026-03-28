import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-2 rounded-[2rem] border border-amber-200/10 bg-black/18 px-6 py-8 text-sm text-amber-50/60 sm:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="display-font text-2xl uppercase tracking-[0.12em] text-amber-100">
            HotPepperz
          </p>
          <p className="mt-2 max-w-2xl">
            Fictional venture, real frontend. Built for static hosting, demo API wiring, and a
            bottle-builder experience that feels theatrical without needing a backend.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/lab" className="ghost-button">
            Open the lab
          </Link>
          <a
            href="https://pages.github.com/"
            target="_blank"
            rel="noreferrer"
            className="ghost-button"
          >
            GitHub Pages
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
