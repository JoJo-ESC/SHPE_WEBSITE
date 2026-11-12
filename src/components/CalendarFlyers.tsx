import { LATEST_FLYERS } from '../data/events'

/** The newest month's event flyers, each opening full size in a new tab */
export function CalendarFlyers() {
  if (!LATEST_FLYERS) return null
  const { year, month, pages } = LATEST_FLYERS
  const monthName = new Date(year, month, 1).toLocaleString('en-US', { month: 'long' })

  return (
    <div className="cal-flyers">
      <h3 className="cal-flyers-title">{monthName} event flyers</h3>
      <div className="cal-flyers-grid">
        {pages.map((p) => (
          <a key={p.src} href={p.src} target="_blank" rel="noreferrer" aria-label={`${p.alt} (opens full size)`}>
            <img src={p.src} alt={p.alt} loading="lazy" width={2880} height={1620} />
          </a>
        ))}
      </div>
    </div>
  )
}
