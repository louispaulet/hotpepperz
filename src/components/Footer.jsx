import { Link } from 'react-router-dom'
import TextLink from './TextLink'

function Footer() {
  return (
    <footer className="panel mt-4 rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.9fr_0.9fr_1fr]">
        <div>
          <p className="display-font text-3xl uppercase tracking-[0.12em] text-[var(--color-cream)]">
            HotPepperz
          </p>
          <p className="mt-3 max-w-2xl text-base leading-8 text-[var(--color-text)]">
            A pepper-first journal that now doubles as an editorial encyclopedia: peppers, recipes,
            legends, restaurants, and France-oriented legal drafts for the public-facing site shell.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
            Product
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--color-text-soft)]">
            <TextLink to="/">Journal</TextLink>
            <TextLink to="/wiki">Encyclopedia Hub</TextLink>
            <TextLink to="/lab">Workshop</TextLink>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
            Reference
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--color-text-soft)]">
            <TextLink to="/wiki/origins">Pepper Origins Atlas</TextLink>
            <TextLink to="/wiki/heat-pairings">Heat, Pairings, And Uses</TextLink>
            <TextLink to="/wiki/legends/pepper-routes">Pepper Routes</TextLink>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
            Legal FR
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--color-text-soft)]">
            <TextLink to="/legal/mentions-legales">Mentions legales</TextLink>
            <TextLink to="/legal/conditions-utilisation">Conditions d’utilisation</TextLink>
            <TextLink to="/legal/politique-confidentialite">Politique de confidentialite</TextLink>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
              Legal EN
            </p>
            <TextLink to="/legal/legal-notice">Legal Notice</TextLink>
            <TextLink to="/legal/terms-of-use">Terms of Use</TextLink>
            <TextLink to="/legal/privacy-policy">Privacy Policy</TextLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
