import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from '../components/Icon'
import { SocialLinks } from '../components/Layout'
import { ArrowLink, Avatar, CheckList, Eyebrow, SectionHead, SignupForm } from '../components/ui'
import { OFFICERS } from '../data/eboard'
import { asset } from '../data/site'

const SLIDES = [
  { src: asset('images/chapter-group.jpg'), alt: 'SHPE-Rensselaer members at a chapter event' },
  { src: asset('images/shpetinas-dinner.jpg'), alt: 'SHPEtinas members sharing dinner' },
  { src: asset('images/eboard.jpg'), alt: 'The SHPE-Rensselaer Executive Board' },
  { src: asset('images/social.jpg'), alt: 'Members at a chapter social' },
]

function Hero() {
  const [i, setI] = useState(0)
  const go = (d: number) => setI((n) => (n + d + SLIDES.length) % SLIDES.length)

  useEffect(() => {
    const t = setInterval(() => go(1), 7000)
    return () => clearInterval(t)
  }, [i])

  return (
    <section className="hero">
      {SLIDES.map((s, n) => (
        <img key={s.src} src={s.src} alt={n === i ? s.alt : ''} className={`hero-img ${n === i ? 'is-active' : ''}`} />
      ))}
      <div className="hero-shade" aria-hidden="true" />
      <div className="container hero-inner">
        <p className="eyebrow is-light">Society of Hispanic Professional Engineers · Rensselaer Polytechnic Institute</p>
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
            See what's next <Icon name="chevron" size={15} />
          </Link>
        </div>
      </div>
      <div className="container hero-foot">
        <SocialLinks className="social-hero" />
        <div className="hero-controls">
          <div className="hero-dots" aria-hidden="true">
            {SLIDES.map((s, n) => (
              <span key={s.src} className={n === i ? 'is-active' : ''} />
            ))}
          </div>
          <button aria-label="Previous photo" onClick={() => go(-1)}>
            <Icon name="chevronLeft" size={16} />
          </button>
          <button aria-label="Next photo" onClick={() => go(1)}>
            <Icon name="chevron" size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}

function NextStrip() {
  return (
    <section className="next-strip">
      <div className="container next-grid">
        <div className="next-card">
          <span className="next-icon">
            <Icon name="calendar" size={22} />
          </span>
          <div>
            <Eyebrow>What's next in SHPE</Eyebrow>
            <h3>2026–27 member calendar</h3>
            <p>GBMs, workshops and socials for the year, all in one place. September is out now.</p>
          </div>
          <ArrowLink to="/events">Open the calendar</ArrowLink>
        </div>
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
    <section className="section bg-mist" id="about">
      <div className="container about-grid">
        <div>
          <Eyebrow>Who we are</Eyebrow>
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
    <section className="section">
      <div className="container">
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

const STEPS = [
  { title: 'Come to an event', body: 'Drop into a GBM or workshop. No experience or sign-up needed, just show up.', link: 'View the calendar', to: '/events' },
  { title: 'Meet the Eboard', body: 'Have a question? Every officer is one email away, so reach out to whoever fits.', link: 'Meet the board', to: '/eboard' },
  { title: 'Join the mailing list', body: 'Get event reminders, opportunities and chapter news straight to your RPI inbox.', link: 'Sign up below', to: '/#join' },
]

function Steps() {
  return (
    <section className="section section-tight-top">
      <div className="container">
        <SectionHead eyebrow="Getting started" title={<>Getting involved takes <em>three steps.</em></>} />
        <ol className="steps">
          {STEPS.map((s, n) => (
            <li key={s.title} className="card step">
              <span className="step-num">{n + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ArrowLink to={s.to}>{s.link}</ArrowLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Collage() {
  return (
    <section className="collage" aria-label="Chapter programs">
      <div className="collage-grid">
        <Link to="/eboard#committees" className="collage-tile collage-logo">
          <img src={asset('images/mentorshpe.png')} alt="MentorSHPE: The power of connection" />
        </Link>
        <img className="collage-tile" src={asset('images/gbm.jpg')} alt="Members talking at a general body meeting" />
        <Link to="/eboard#committees" className="collage-tile collage-shpetinas">
          <span className="shpetinas-word">SHPEtinas</span>
          <span className="shpetinas-tag">Igniting Latinas in STEM</span>
        </Link>
        <img className="collage-tile" src={asset('images/cooking.jpg')} alt="A member cooking at a chapter social" />
        <img className="collage-tile" src={asset('images/shpetinas-dinner.jpg')} alt="SHPEtinas dinner" />
      </div>
    </section>
  )
}

function EboardPreview() {
  const [sel, setSel] = useState(OFFICERS[0])
  return (
    <section className="section bg-navy">
      <div className="container">
        <SectionHead
          eyebrow="Leadership"
          title={<>Meet the 2026–27 <em>Eboard</em></>}
          aside={<p>Tap an officer to see how to reach them.</p>}
        />
        <div className="eb-preview">
          <ul className="eb-grid">
            {OFFICERS.map((o) => (
              <li key={o.id}>
                <button className={sel.id === o.id ? 'is-active' : ''} onClick={() => setSel(o)} aria-pressed={sel.id === o.id}>
                  <Avatar name={o.name} photo={o.photo} size="sm" />
                  <span>
                    <strong>{o.name}</strong>
                    <small>{o.role}</small>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="card eb-detail" aria-live="polite">
            <Avatar name={sel.name} photo={sel.photo} size="lg" />
            <Eyebrow>{sel.role}</Eyebrow>
            <h3>{sel.name}</h3>
            <p>
              {sel.degree}, class of {sel.year}
            </p>
            <a className="btn btn-navy btn-block" href={`mailto:${sel.email}`}>
              <Icon name="mail" size={16} /> {sel.email}
            </a>
            <ArrowLink to="/eboard">See the full board</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function Join() {
  return (
    <section className="section bg-cream" id="join">
      <div className="container join-grid">
        <div>
          <Eyebrow>Join the familia</Eyebrow>
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
      <div className="container">
        <SectionHead
          title="Thank you to our supporters"
          aside={
            <p>
              Want to support the chapter? <Link to="/contact?topic=corporate" className="link-strong">Contact our Alumni &amp; Corporate Rep</Link>
            </p>
          }
        />
        <ul className="sponsor-row">
          <li className="sponsor sponsor-lutron">LUTRON</li>
          <li className="sponsor sponsor-consigli">
            CONSIGLI <small>Est. 1905</small>
          </li>
        </ul>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <NextStrip />
      <About />
      <WhySHPE />
      <Steps />
      <Collage />
      <EboardPreview />
      <Join />
      <Supporters />
    </>
  )
}
