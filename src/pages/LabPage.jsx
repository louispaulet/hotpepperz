import Footer from '../components/Footer'
import SauceStudio from '../components/SauceStudio'

function LabPage() {
  return (
    <div className="space-y-10">
      <section className="panel overflow-hidden rounded-[2rem] p-8 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">Full-screen builder</p>
            <h1 className="display-font text-5xl uppercase leading-none text-amber-50 sm:text-7xl">
              Compose the bottle before the burn does the talking.
            </h1>
            <p className="max-w-xl text-lg text-amber-50/72">
              Tune the peppers, push the heat, then let the AI naming and label pass turn your
              blend into a dramatic one-off release.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-amber-200/18 bg-black/20 p-4 text-sm text-amber-50/70">
            Demo mode: frontend-only, Groq key exposed at build time, suitable for a design flex
            and static GitHub Pages hosting.
          </div>
        </div>
      </section>
      <SauceStudio />
      <Footer />
    </div>
  )
}

export default LabPage
