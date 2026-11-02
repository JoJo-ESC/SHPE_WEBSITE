import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCard } from '../components/CalendarCard'
import { Icon, type IconName } from '../components/Icon'
import { SocialLinks } from '../components/Layout'
import { CheckList, SectionHead, SignupForm } from '../components/ui'
import { useMonthCalendar } from '../components/useMonthCalendar'
import { useReveal } from '../components/useReveal'
import { OFFICERS, officer } from '../data/eboard'
import { START_MONTH } from '../data/events'
import { asset, CONTACT, OUTREACH_PAGE_LIVE } from '../data/site'

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
  { title: 'Outreach Weekend', body: "Bring STEM to the next generation and be the role model you wish you'd had growing up.", icon: 'pin', to: OUTREACH_PAGE_LIVE ? '/membershpe/outreach-weekend' : '/membershpe' },
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

function MonthCalendar() {
  const { calendar, status } = useMonthCalendar(START_MONTH.year, START_MONTH.month)
  const monthName = new Date(calendar.year, calendar.month, 1).toLocaleString('en-US', { month: 'long' })
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
        <CalendarCard calendar={calendar} status={status} />
      </div>
    </section>
  )
}

// The collage's three photo tiles, in grid order (top middle, bottom left, bottom right).
// All three move to their next photo together, so keep the lists the same length.
// `position` (CSS object-position) keeps faces in the wide, short tiles: lower its
// second number to show more of the top of a photo.
const COLLAGE_PHOTOS: { src: string; alt: string; position: string }[][] = [
  [
    { src: asset('images/gbm.jpg'), alt: 'Members talking at a general body meeting', position: '50% 35%' },
    { src: asset('images/img-9980_orig.jpg'), alt: 'Two members giving a thumbs up at a chapter event', position: '50% 15%' },
    { src: asset('images/img-0362_orig.jpg'), alt: 'A member posing in front of the SHPE banner', position: '50% 10%' },
    { src: asset('images/img-9754_orig.jpg'), alt: 'Three members posing together', position: '50% 15%' },
  ],
  [
    { src: asset('images/img-9996_orig.jpg'), alt: 'Two members smiling at a chapter event', position: '50% 8%' },
    { src: asset('images/img-9909_orig.jpg'), alt: 'A member smiling at the chapter BBQ', position: '50% 8%' },
    { src: asset('images/img-0137_orig.jpg'), alt: 'Three members in front of the SHPE banner', position: '50% 20%' },
    { src: asset('images/img-0493_orig.jpg'), alt: 'Members holding flags from across Latin America', position: '50% 25%' },
  ],
  [
    { src: asset('images/shpetinas-dinner.jpg'), alt: 'SHPEtinas dinner', position: '50% 45%' },
    { src: asset('images/img-0158_orig.jpg'), alt: 'A group of members at a chapter event', position: '50% 35%' },
    { src: asset('images/img-9949_orig.jpg'), alt: 'Members gathered outside at the chapter BBQ', position: '50% 30%' },
    { src: asset('images/img-0172_orig.jpg'), alt: 'Members working together at a table', position: '50% 35%' },
  ],
]
const COLLAGE_MS = 6000

function CollagePhotos({ photos, shown }: { photos: (typeof COLLAGE_PHOTOS)[number]; shown: number }) {
  return (
    <div className="collage-tile collage-photos">
      {photos.map((p, n) => (
        <img
          key={p.src}
          src={p.src}
          alt={n === shown ? p.alt : ''}
          className={n === shown ? 'is-active' : ''}
          style={{ objectPosition: p.position }}
          loading="lazy"
        />
      ))}
    </div>
  )
}

function Collage() {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    // Leave the first photos up for visitors who turn off motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => setShown((n) => (n + 1) % COLLAGE_PHOTOS[0].length), COLLAGE_MS)
    return () => clearTimeout(t)
  }, [shown])

  return (
    <section className="collage" aria-label="Chapter programs">
      <div className="collage-grid" data-reveal>
        <Link to="/eboard#committees" className="collage-tile collage-logo">
          <img src={asset('images/mentorshpe.png')} alt="MentorSHPE: The power of connection" />
        </Link>
        <CollagePhotos photos={COLLAGE_PHOTOS[0]} shown={shown} />
        <Link to="/eboard#committees" className="collage-tile collage-shpetinas">
          <img src={asset('images/shpetinas-logo.png')} alt="SHPEtinas: Igniting Latinas in STEM" />
        </Link>
        <CollagePhotos photos={COLLAGE_PHOTOS[1]} shown={shown} />
        <CollagePhotos photos={COLLAGE_PHOTOS[2]} shown={shown} />
      </div>
    </section>
  )
}

function EboardPreview() {
  return (
    <section className="section bg-navy eb-section">
      <div className="container">
        <h2 className="h2 eb-home-title" data-reveal>
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
      <div className="container" data-reveal>
        <div className="join-location">
          <div className="join-address">
            <Icon name="pin" size={22} className="join-pin" />
            <h3>Where to find us</h3>
            <p>
              <strong>{CONTACT.campus}</strong>
              <br />
              {CONTACT.addressLine1}, {CONTACT.addressLine2}
            </p>
            <a className="link-strong" href={CONTACT.mapUrl} target="_blank" rel="noreferrer">
              Get directions
            </a>
          </div>
          <iframe
            className="join-map"
            title={`Map of ${CONTACT.campus}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(`${CONTACT.campus}, ${CONTACT.addressLine1}, ${CONTACT.addressLine2}`)}&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

export function Supporters() {
  return (
    <section className="section supporters">
      <div className="container" data-reveal>
        <SectionHead
          title="Thank you to our Sponsor"
          aside={
            <p>
              Want to support the chapter? <a href={`mailto:${officer('corporate').email}`} className="link-strong">Email our Alumni &amp; Corporate Rep</a>
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
