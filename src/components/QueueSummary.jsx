const summaries = [
  { key: 'waiting', label: 'Waiting', tone: 'waiting' },
  { key: 'resolved', label: 'Resolved', tone: 'resolved' },
  { key: 'total', label: 'Total requests', tone: 'total' },
]

export default function QueueSummary({ waiting, resolved, total }) {
  const counts = { waiting, resolved, total }

  return (
    <section className="summary-strip" aria-label="Queue summary">
      {summaries.map(({ key, label, tone }) => (
        <div className={`summary-item summary-${tone}`} key={key}>
          <span className="summary-label">{label}</span>
          <strong className="summary-count">{counts[key]}</strong>
        </div>
      ))}
    </section>
  )
}