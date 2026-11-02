import type { MonthCalendar } from '../data/events'
import type { CalendarStatus } from './useMonthCalendar'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
// Titles a single day cell has room for before it says "+N more"
const PER_CELL = 2

/**
 * The blue month-grid card from the mockup. Every size inside it is in em, so
 * the card scales with its font-size (see "Calendar card" in styles.css).
 */
export function CalendarCard({ calendar, status = 'ready' }: { calendar: MonthCalendar; status?: CalendarStatus }) {
  const { year, month, entries } = calendar
  const first = new Date(year, month, 1)
  const offset = first.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthName = first.toLocaleString('en-US', { month: 'long' })
  // Grid position (1-based) of a date in the month
  const cell = (d: number) => ({ col: ((offset + d - 1) % 7) + 1, row: Math.floor((offset + d - 1) / 7) + 1 })
  const busy = new Set(entries.flatMap((e) => e.days))
  const shortDate = (e: (typeof entries)[number]) =>
    `${WEEKDAYS[new Date(year, month, e.days[0]).getDay()].slice(0, 3)}, ${monthName.slice(0, 3)} ${
      e.days.length > 1 ? `${e.days[0]}–${e.days[e.days.length - 1]}` : e.days[0]
    }`

  // Multi-day events run as a spaced-out banner, split wherever they wrap to the next week
  const banners = entries
    .filter((e) => e.days.length > 1)
    .flatMap((e) =>
      e.days.reduce<number[][]>((runs, d) => {
        const run = runs[runs.length - 1]
        if (run && d === run[run.length - 1] + 1 && cell(d).row === cell(run[0]).row) run.push(d)
        else runs.push([d])
        return runs
      }, []).map((days) => ({ ...e, days })),
    )
  // Single-day events share their day's cell
  const byDay = new Map<number, typeof entries>()
  for (const e of entries.filter((e) => e.days.length === 1)) byDay.set(e.days[0], [...(byDay.get(e.days[0]) ?? []), e])

  let message = null
  if (status === 'error') message = "The calendar couldn't load. Try again soon."
  else if (status === 'ready' && entries.length === 0) message = `${monthName}'s calendar is coming soon.`

  return (
    <div className={`cal-card ${status === 'loading' ? 'is-loading' : ''}`} aria-busy={status === 'loading'}>
      <div className="cal-main">
        <h3 className="cal-title">
          {monthName} {year}
        </h3>
        <div className="cal-weekdays" aria-hidden="true">
          {WEEKDAYS.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        <div className="cal-grid" aria-hidden="true">
          {Array.from({ length: daysInMonth }, (_, n) => {
            const { col, row } = cell(n + 1)
            return (
              <span key={n} className={`cal-day ${busy.has(n + 1) ? 'has-event' : ''}`} style={{ gridColumn: col, gridRow: row }}>
                {n + 1}
              </span>
            )
          })}
          {banners.map((e) => {
            const { col, row } = cell(e.days[0])
            return (
              <span
                key={`${e.title}-${e.days[0]}`}
                className={`cal-event ${e.days.length > 1 ? 'is-banner' : ''} ${e.days.length < 4 && e.title.length > e.days.length * 6 ? 'is-tight' : ''} ${e.title.length > 20 ? 'is-long' : ''}`}
                style={{ gridColumn: `${col} / span ${e.days.length}`, gridRow: row }}
              >
                <strong>{e.title}</strong>
              </span>
            )
          })}
          {[...byDay].map(([day, list]) => {
            const { col, row } = cell(day)
            const [only] = list
            return list.length === 1 ? (
              <span key={day} className={`cal-event ${only.title.length > 20 ? 'is-long' : ''}`} style={{ gridColumn: col, gridRow: row }}>
                <strong>{only.title}</strong>
                {only.time}
              </span>
            ) : (
              <span key={day} className="cal-event is-multi" style={{ gridColumn: col, gridRow: row }}>
                {list.slice(0, list.length > PER_CELL ? PER_CELL - 1 : PER_CELL).map((e, n) => (
                  <strong key={n}>{e.title}</strong>
                ))}
                {list.length > PER_CELL && <small>+{list.length - PER_CELL + 1} more</small>}
              </span>
            )
          })}
        </div>
        {entries.length > 0 && (
          <ul className="cal-agenda">
            {entries.map((e, n) => (
              <li key={n}>
                <span>{shortDate(e)}</span>
                <strong>{e.title}</strong>
                {e.time && <small>{e.time}</small>}
              </li>
            ))}
          </ul>
        )}
        {message && <p className="cal-empty">{message}</p>}
      </div>
      <span className="cal-sep" aria-hidden="true">
        {monthName.slice(0, 3)}
      </span>
    </div>
  )
}
