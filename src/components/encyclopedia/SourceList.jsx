function SourceList({ sources, variant = 'default' }) {
  if (!sources?.length) return null

  return (
    <section className={`panel source-list source-list--${variant} rounded-[2rem] p-6 sm:p-8`}>
      <p className="section-kicker">Sources</p>
      <div className="mt-5 grid gap-3">
        {sources.map((source) => (
          <a
            key={source.href}
            href={source.href}
            target="_blank"
            rel="noreferrer"
            className="source-link rounded-[1.4rem] border border-white/10 bg-black/16 px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)] transition hover:border-white/16 hover:bg-white/6"
          >
            <span className="font-semibold text-[var(--color-cream)]">{source.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default SourceList
