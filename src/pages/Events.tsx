import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCard } from '../components/CalendarCard'
import { CalendarFlyers } from '../components/CalendarFlyers'
import { Icon } from '../components/Icon'
import { PhotoCarousel } from '../components/PhotoCarousel'
import { useMonthCalendar } from '../components/useMonthCalendar'
import { useReveal } from '../components/useReveal'
import { CALENDARS, PAST_EVENTS, START_MONTH } from '../data/events'
import { LIVE_CALENDAR, SUBSCRIBE_URL } from '../data/googleCalendar'
import { asset, DOCS } from '../data/site'

// Two rows of photos behind the hero. `grow` is each photo's share of its row's width.
const COLLAGE = [
  [
    { src: 'cooking.jpg', grow: 335 },
    { src: 'img-9801_orig.jpg', grow: 335 },
    { src: 'img-0172_orig.jpg', grow: 372 },
    { src: 'img-0137_orig.jpg', grow: 402 },
  ],
  [
    { src: 'img-0371_orig.jpg', grow: 335 },
    { src: 'img-0158_orig.jpg', grow: 360 },
    { src: 'img-9915_orig.jpg', grow: 405 },
    { src: 'img-9949_orig.jpg', grow: 343 },
  ],
]

function EventsHero() {
  return (
    <section className="page-hero events-hero">
      <div className="events-collage" aria-hidden="true">
        {COLLAGE.map((row) => (
          <div key={row[0].src}>
            {row.map((p) => (
              <img key={p.src} src={asset(`images/${p.src}`)} alt="" style={{ flexGrow: p.grow }} />
            ))}
          </div>
        ))}
      </div>
      <div className="events-hero-shade" aria-hidden="true" />
      <div className="container page-hero-inner" data-reveal>
        <div className="page-hero-copy">
          <h1 className="display">
            What's next <em>in SHPE</em>
          </h1>
          <p className="lead">GBMs, Study Jams, career events and community time. Browse the 2026–27 member calendar month by month.</p>
          <div className="actions">
            {SUBSCRIBE_URL ? (
              <a href={SUBSCRIBE_URL} className="btn btn-primary" target="_blank" rel="noreferrer">
                <Icon name="calendar" size={16} /> Add to Google Calendar
              </a>
            ) : (
              <a href={DOCS.calendar} className="btn btn-primary">
                <Icon name="download" size={16} /> Download calendar (PDF)
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Months as one running number, so stepping past December lands in January
const monthNumber = (m: { year: number; month: number }) => m.year * 12 + m.month
// Google Calendar can show any month; typed-in months stop where the data does
const FIRST = LIVE_CALENDAR ? -Infinity : monthNumber(CALENDARS[0])
const LAST = LIVE_CALENDAR ? Infinity : monthNumber(CALENDARS[CALENDARS.length - 1])

function CalendarSection() {
  const [shown, setShown] = useState(monthNumber(START_MONTH))
  const { calendar, status } = useMonthCalendar(Math.floor(shown / 12), shown % 12)
  const monthName = new Date(calendar.year, calendar.month, 1).toLocaleString('en-US', { month: 'long' })

  return (
    <section className="section bg-mist">
      <div className="container" data-reveal>
        <h2 className="h2 ev-cal-title" aria-live="polite">
          SHPE {monthName} Calendar
        </h2>
        <div className="ev-cal-layout">
          <div className="ev-cal-main">
            <CalendarCard calendar={calendar} status={status} />
          </div>
          <aside className="ev-side">
            <div className="ev-month-card">
              <div className="ev-month-switch">
                <button aria-label="Previous month" disabled={shown <= FIRST} onClick={() => setShown((s) => s - 1)}>
                  &lt;
                </button>
                <span>{monthName}</span>
                <button aria-label="Next month" disabled={shown >= LAST} onClick={() => setShown((s) => s + 1)}>
                  &gt;
                </button>
              </div>
              <div className="ev-month-body">
                <h3>What to expect every month</h3>
                <dl className="regulars">
                  <dt>General body meetings</dt>
                  <dd>6:30–9 PM, every other week</dd>
                  <dt>Study Jams</dt>
                  <dd>7–9 PM, every week</dd>
                </dl>
              </div>
            </div>
            <div className="card ev-suggest">
              <h3>Have any suggestions?</h3>
              <p>Committees help the Eboard plan everything on this calendar.</p>
              <Link to="/eboard#committees" className="link-strong">
                Explore committees
              </Link>
            </div>
          </aside>
        </div>
        <CalendarFlyers year={calendar.year} month={calendar.month} />
      </div>
    </section>
  )
}

function PreviousEvents() {
  return (
    <section className="section">
      <div className="container">
        <div className="prev-head" data-reveal>
          <h2 className="h2">Previous Events</h2>
          <p>
            Want to join the fun? <Link to="/membershpe">MemberSHPE</Link>
          </p>
        </div>
        <PhotoCarousel items={PAST_EVENTS} id="events" />
      </div>
    </section>
  )
}

export function Events() {
  useReveal()
  return (
    <>
      <EventsHero />
      <CalendarSection />
      <PreviousEvents />
    </>
  )
}
