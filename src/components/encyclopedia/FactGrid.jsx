function FactGrid({ facts, variant = 'default' }) {
  return (
    <div className={`fact-grid fact-grid--${variant} grid gap-4 md:grid-cols-2 xl:grid-cols-4`}>
      {facts.map((fact) => (
        <article key={fact.label} className="fact-card rounded-[1.6rem] border border-white/10 bg-black/16 p-5">
          <p className="section-kicker">{fact.label}</p>
          <p className="mt-3 text-base leading-7 text-[var(--color-text)]">{fact.value}</p>
        </article>
      ))}
    </div>
  )
}

export default FactGrid
