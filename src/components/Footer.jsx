import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="panel mt-4 rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.9fr_0.9fr_1fr]">
        <div>
          <p className="display-font text-3xl uppercase tracking-[0.12em] text-[var(--color-cream)]">
            HotPepperz
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
            A pepper-first journal that now doubles as an editorial encyclopedia: peppers, recipes,
            legends, restaurants, and France-oriented legal drafts for the public-facing site shell.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
            Encyclopedia
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--color-text-soft)]">
            <Link to="/wiki">Hub</Link>
            <Link to="/wiki/origins">Pepper Origins Atlas</Link>
            <Link to="/wiki/heat-pairings">Heat, Pairings, and Uses</Link>
            <Link to="/lab">Workshop</Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
            Legal FR
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--color-text-soft)]">
            <Link to="/legal/mentions-legales">Mentions legales</Link>
            <Link to="/legal/conditions-utilisation">Conditions d’utilisation</Link>
            <Link to="/legal/politique-confidentialite">Politique de confidentialite</Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
            Legal EN
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--color-text-soft)]">
            <Link to="/legal/legal-notice">Legal Notice</Link>
            <Link to="/legal/terms-of-use">Terms of Use</Link>
            <Link to="/legal/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
