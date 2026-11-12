import { flyersFor } from '../data/events'

/** The month's event flyers, each opening full size in a new tab. Renders nothing for a month without flyers. */
export function CalendarFlyers({ year, month }: { year: number; month: number }) {
  const pages = flyersFor(year, month)
  if (pages.length === 0) return null
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
