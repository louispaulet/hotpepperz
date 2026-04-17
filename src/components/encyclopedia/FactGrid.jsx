function FactGrid({ facts }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {facts.map((fact) => (
        <article key={fact.label} className="rounded-[1.6rem] border border-white/10 bg-black/16 p-5">
          <p className="section-kicker">{fact.label}</p>
          <p className="mt-3 text-sm leading-7 text-[var(--color-text)]">{fact.value}</p>
        </article>
      ))}
    </div>
  )
}

export default FactGrid
