import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { PageHero } from '../components/ui'
import { CATEGORIES, EVENTS, MONTHS, type Category, type Month } from '../data/events'
import { DOCS } from '../data/site'

export function Events() {
  const [month, setMonth] = useState<Month>('September')
  const [filter, setFilter] = useState<Category | 'All'>('All')

  const visible = EVENTS.filter((e) => e.month === month && (filter === 'All' || e.category === filter))
  const weeks = useMemo(() => {
    const map = new Map<string, typeof visible>()
    visible.forEach((e) => map.set(e.week, [...(map.get(e.week) ?? []), e]))
    return [...map.entries()]
  }, [visible])

  return (
    <>
      <PageHero
        title={
          <>
            What's next <em>in SHPE</em>
          </>
        }
        lead="GBMs, Study Jams, career events and community time. Browse the 2026–27 member calendar month by month."
      >
        <a href={DOCS.calendar} className="btn btn-primary">
          <Icon name="download" size={16} /> Download calendar (PDF)
        </a>
      </PageHero>

      <section className="section bg-mist">
        <div className="container events-layout">
          <div>
            <div className="events-toolbar">
              <div className="seg" role="tablist" aria-label="Month">
                {MONTHS.map((m) => (
                  <button key={m} role="tab" aria-selected={m === month} className={m === month ? 'is-active' : ''} onClick={() => setMonth(m)}>
                    {m}
                  </button>
                ))}
              </div>
              <div className="chips" aria-label="Filter by category">
                {(['All', ...CATEGORIES] as const).map((c) => (
                  <button key={c} className={`chip ${filter === c ? 'is-active' : ''}`} aria-pressed={filter === c} onClick={() => setFilter(c)}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <p className="muted small">
              {visible.length} {visible.length === 1 ? 'event' : 'events'} in {month}
            </p>

            {weeks.length === 0 && (
              <div className="empty">
                <h3>{month} is coming soon</h3>
                <p>The Eboard posts each month's calendar ahead of time. Follow @shperpi on Instagram to hear first.</p>
              </div>
            )}

            {weeks.map(([week, items]) => (
              <div key={week} className="week">
                <h3 className="week-label">{week}</h3>
                <ul className="event-list">
                  {items.map((e) => (
                    <li key={e.title} className="event">
                      <div className="event-date">
                        {e.day ? (
                          <>
                            <small>{e.day.weekday}</small>
                            <strong>{e.day.date}</strong>
                          </>
                        ) : (
                          <>
                            <small>Week of</small>
                            <strong className="is-range">{e.range}</strong>
                          </>
                        )}
                        <small>{e.month.slice(0, 4)}</small>
                      </div>
                      <div>
                        <h4>{e.title}</h4>
                        <p className="event-time">
                          {e.category} · {e.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <aside className="events-side">
            <div className="side-block">
              <h3>Every month, count on</h3>
              <dl className="regulars">
                <dt>General body meetings</dt>
                <dd>6:30–9 PM</dd>
                <dt>Study Jams</dt>
                <dd>7–9 PM, most weeks</dd>
                <dt>SHPEtinas Cafecitos</dt>
                <dd>12–2 PM</dd>
              </dl>
            </div>
            <div className="side-block">
              <h3>Want to host an event?</h3>
              <p className="muted">Committees help the Eboard plan everything on this calendar.</p>
              <Link to="/eboard#committees" className="link-strong">
                Explore committees
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
