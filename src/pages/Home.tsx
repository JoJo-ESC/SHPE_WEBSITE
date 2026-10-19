import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from '../components/Icon'
import { SocialLinks } from '../components/Layout'
import { CheckList, SectionHead, SignupForm } from '../components/ui'
import { useReveal } from '../components/useReveal'
import { OFFICERS } from '../data/eboard'
import { HOME_CALENDAR } from '../data/events'
import { asset } from '../data/site'

// `position` overrides the default crop (CSS object-position) for photos framed differently
const SLIDES: { src: string; alt: string; position?: string }[] = [
  { src: asset('images/chapter-group.jpg'), alt: 'SHPE-Rensselaer members at a chapter event' },
  { src: asset('images/shpetinas-dinner.jpg'), alt: 'SHPEtinas members sharing dinner' },
  { src: asset('images/eboard.jpg'), alt: 'The SHPE-Rensselaer Executive Board' },
  { src: asset('images/img-0493_orig.jpg'), alt: 'SHPE-Rensselaer members holding flags from across Latin America', position: '50% 40%' },
]

function Hero() {
  const [i, setI] = useState(0)

  useEffect(() => {
    // Leave the first photo up for visitors who turn off motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 7000)
    return () => clearInterval(t)
  }, [i])

  return (
    <section className="hero">
      {SLIDES.map((s, n) => (
        <img
          key={s.src}
          src={s.src}
          alt={n === i ? s.alt : ''}
          className={`hero-img ${n === i ? 'is-active' : ''}`}
          style={s.position ? { objectPosition: s.position } : undefined}
        />
      ))}
      <div className="hero-shade" aria-hidden="true" />
      <div className="container hero-inner" data-reveal>
        <h1 className="hero-title">
          Find your <em>familia</em>
          <br />
          in STEM.
        </h1>
        <p className="hero-lead">
          SHPE-Rensselaer is a community of Hispanic students at RPI. We grow as leaders, build our careers and give back
          through community outreach, and we're always welcoming new members.
        </p>
        <div className="actions">
          <Link to="/#join" className="btn btn-primary">
            Become a member
          </Link>
          <Link to="/events" className="btn btn-ghost-light">
            See what's next
          </Link>
        </div>
      </div>
      <div className="container hero-foot" data-reveal>
        <SocialLinks className="social-hero" />
        <div className="hero-dots">
          {SLIDES.map((s, n) => (
            <button
              key={s.src}
              className={n === i ? 'is-active' : ''}
              aria-label={`Show photo ${n + 1} of ${SLIDES.length}`}
              aria-pressed={n === i}
              onClick={() => setI(n)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function NextStrip() {
  return (
    <section className="next-strip">
      <div className="container next-grid" data-reveal>
        <Link to="/events" className="next-link">
          <h3>2026–27 member calendar</h3>
          <p>GBMs, workshops and socials for the year, all in one place. September is out now.</p>
        </Link>
        <dl className="stats">
          <div>
            <dt>1974</dt>
            <dd>SHPE founded in Los Angeles</dd>
          </div>
          <div>
            <dt>9</dt>
            <dd>officers on this year's Eboard</dd>
          </div>
          <div>
            <dt>RPI</dt>
            <dd>our home in Troy, NY</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

const ABOUT_TABS = {
  Mission: (
    <>
      <p className="about-lead">
        SHPE changes lives by empowering the Hispanic community to realize its fullest potential and to impact the world
        through STEM awareness, access, support and development.
      </p>
      <p>At RPI, that means showing up for each other in class, in our careers and in Troy.</p>
    </>
  ),
  Vision: (
    <>
      <p className="about-lead">
        A world where Hispanics are highly valued and influential as the leading innovators, scientists, mathematicians
        and engineers.
      </p>
      <p>Every GBM, workshop and outreach event at SHPE-Rensselaer moves us closer to it.</p>
    </>
  ),
  'Since 1974': (
    <>
      <p className="about-lead">
        SHPE was founded in Los Angeles in 1974 by a group of city engineers. Their goal was a national network of
        professional engineers who could serve as role models in the Hispanic community.
      </p>
      <p>Two student chapters followed right away, and SHPE-Rensselaer carries that same mission at RPI today.</p>
    </>
  ),
}

function About() {
  const [tab, setTab] = useState<keyof typeof ABOUT_TABS>('Since 1974')
  return (
    <section className="section bg-mist about-section" id="about">
      <div className="container about-grid" data-reveal>
        <div>
          <h2 className="h1">
            Part of a national movement, rooted at <em>RPI.</em>
          </h2>
          <img className="about-photo" src={asset('images/eboard.jpg')} alt="SHPE-Rensselaer Executive Board in front of the chapter banner" />
        </div>
        <div>
          <div className="tabs" role="tablist">
            {(Object.keys(ABOUT_TABS) as (keyof typeof ABOUT_TABS)[]).map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'is-active' : ''} onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>
          <div className="about-body" role="tabpanel">
            {ABOUT_TABS[tab]}
          </div>
        </div>
      </div>
    </section>
  )
}

const PILLARS: { title: string; body: string; icon: IconName; to: string }[] = [
  { title: 'Professional development', body: "Build the skills, confidence and connections that turn an RPI degree into a career you're proud of.", icon: 'briefcase', to: '/membershpe/professional-development' },
  { title: 'Outreach Weekend', body: "Bring STEM to the next generation and be the role model you wish you'd had growing up.", icon: 'pin', to: '/membershpe/outreach-weekend' },
  { title: 'Community', body: 'General body meetings, study nights and socials. A familia of dedicated RPI students who have your back.', icon: 'users', to: '/events' },
]

function WhySHPE() {
  return (
    <section className="section why-section">
      <div className="container" data-reveal>
        <h2 className="h1 why-title">
          Why <em>SHPE?</em>
          <br />
          and How Do I Get <em>Involved?</em>
        </h2>
        <div className="why-grid">
          <p className="why-copy">
            SHPE is a family of dedicated students at RPI. We take pride in seeing the success of our members and greatly
            value the leaderSHPE that keeps our organization running. To become involved, check out our upcoming events
            page. Feel free to contact an Executive Board member, or send us a message. We always welcome new members!
          </p>
          <ul className="feature-list">
            {PILLARS.map((p) => (
              <li key={p.title}>
                <Link to={p.to}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <Icon name={p.icon} size={18} className="feature-icon" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function MonthCalendar() {
  const { year, month, entries } = HOME_CALENDAR
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

  return (
    <section className="section cal-section">
      <div className="container cal-layout" data-reveal>
        <div className="cal-copy">
          <h2 className="h2">This month's calendar</h2>
          <p>
            Here's everything happening in SHPE this {monthName}: GBMs, Study Jams, career events and time with the
            familia. Everyone is welcome, no sign-up needed. Just show up.
          </p>
          <Link to="/events" className="arrow-link">
            See all events
          </Link>
        </div>

        <div className="cal-card">
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
              {entries.map((e) => {
                const { col, row } = cell(e.days[0])
                // Multi-day events run as a spaced-out banner across their days
                return (
                  <span
                    key={e.title}
                    className={`cal-event ${e.days.length > 1 ? 'is-banner' : ''} ${e.title.length > 20 ? 'is-long' : ''}`}
                    style={{ gridColumn: `${col} / span ${e.days.length}`, gridRow: row }}
                  >
                    <strong>{e.title}</strong>
                    {e.time}
                  </span>
                )
              })}
            </div>
            <ul className="cal-agenda">
              {entries.map((e) => (
                <li key={e.title}>
                  <span>{shortDate(e)}</span>
                  <strong>{e.title}</strong>
                  {e.time && <small>{e.time}</small>}
                </li>
              ))}
            </ul>
          </div>
          <span className="cal-sep" aria-hidden="true">
            {monthName.slice(0, 3)}
          </span>
        </div>
      </div>
    </section>
  )
}

function Collage() {
  return (
    <section className="collage" aria-label="Chapter programs">
      <div className="collage-grid" data-reveal>
        <Link to="/eboard#committees" className="collage-tile collage-logo">
          <img src={asset('images/mentorshpe.png')} alt="MentorSHPE: The power of connection" />
        </Link>
        <img className="collage-tile" src={asset('images/gbm.jpg')} alt="Members talking at a general body meeting" />
        <Link to="/eboard#committees" className="collage-tile collage-shpetinas">
          <img src={asset('images/shpetinas-logo.png')} alt="SHPEtinas: Igniting Latinas in STEM" />
        </Link>
        <img className="collage-tile" src={asset('images/cooking.jpg')} alt="A member cooking at a chapter social" />
        <img className="collage-tile" src={asset('images/shpetinas-dinner.jpg')} alt="SHPEtinas dinner" />
      </div>
    </section>
  )
}

function EboardPreview() {
  return (
    <section className="section bg-navy eb-section">
      <div className="container">
        <h2 className="h2" data-reveal>
          Meet the 2026–27 <em>Eboard</em>
        </h2>
        <ul className="eb-cards" data-reveal="stagger">
          {OFFICERS.map((o, n) => (
            <li key={o.id} className="eb-card" style={{ '--i': n } as CSSProperties}>
              {o.photo && <img src={o.photo} alt="" loading="lazy" />}
              <div className="eb-card-body">
                <h3>{o.name}</h3>
                <p>{o.role}</p>
              </div>
              <a className="eb-card-mail" href={`mailto:${o.email}`} aria-label={`Email ${o.name}`} title={o.email}>
                <Icon name="mail" size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Join() {
  return (
    <section className="section bg-cream join-section" id="join">
      <div className="container join-grid" data-reveal>
        <div>
          <h2 className="h1">
            Get on the list. We'll take it from <em>there.</em>
          </h2>
          <p className="lead-dark">
            All majors and all years are welcome. Leave your info and you'll hear about our next GBM, workshops and
            opportunities first.
          </p>
          <CheckList
            items={[
              'Event reminders and the monthly calendar',
              'Professional development and outreach opportunities',
              'Chapter news from the Eboard',
            ]}
          />
        </div>
        <SignupForm />
      </div>
    </section>
  )
}

export function Supporters() {
  return (
    <section className="section supporters">
      <div className="container" data-reveal>
        <SectionHead
          title="Thank you to our Sponsors"
          aside={
            <p>
              Want to support the chapter? <Link to="/contact?topic=corporate" className="link-strong">Contact our Alumni &amp; Corporate Rep</Link>
            </p>
          }
        />
        <ul className="sponsor-row">
          <li className="sponsor">
            <img src={asset('images/GlobalFoundries-New-Logo.png.webp')} alt="GlobalFoundries" width={226} height={127} />
          </li>
        </ul>
      </div>
    </section>
  )
}

export function Home() {
  useReveal()
  return (
    <>
      <Hero />
      <NextStrip />
      <About />
      <WhySHPE />
      <MonthCalendar />
      <Collage />
      <EboardPreview />
      <Join />
      <Supporters />
    </>
  )
}
