import { useState, type CSSProperties } from 'react'
import { Icon } from '../components/Icon'
import { Avatar } from '../components/ui'
import { useReveal } from '../components/useReveal'
import { COMMITTEES, OFFICERS, officer, type Officer } from '../data/eboard'
import { asset, FORMS } from '../data/site'

function Hero() {
  return (
    <section className="page-hero split-hero">
      <div className="container page-hero-inner split-hero-inner" data-reveal>
        <img
          className="split-hero-photo"
          src={asset('images/eboard.jpg')}
          alt="The 2026–27 SHPE-Rensselaer Executive Board in front of the chapter banner"
        />
        <div className="page-hero-copy">
          <h1 className="display">
            The people
            <br />
            who <em className="is-white">run the</em>
            <br />
            <em>chapter.</em>
          </h1>
          <p className="lead">Nine officers and seven committees plan everything SHPE-Rensselaer does.</p>
        </div>
      </div>
    </section>
  )
}

function OfficerCard({ o, email = true }: { o: Officer; email?: boolean }) {
  return (
    <div className="officer">
      <div className="officer-photo">
        {o.photo ? <img src={o.photo} alt={o.name} loading="lazy" /> : <Avatar name={o.name} size="lg" />}
        {email && (
          <a className="officer-mail" href={`mailto:${o.email}`} aria-label={`Email ${o.name} at ${o.email}`}>
            <Icon name="mail" size={13} />
            <span className="officer-mail-address">{o.email}</span>
            <span className="officer-mail-short">Email</span>
          </a>
        )}
      </div>
      <div className="officer-body">
        <p className="officer-role">{o.role}</p>
        <h3>{o.name}</h3>
        <p className="officer-meta">
          {o.degree} · Class of {o.year}
        </p>
      </div>
    </div>
  )
}

function Committees() {
  const [active, setActive] = useState(COMMITTEES.length - 1)
  const c = COMMITTEES[active]
  const lead = officer(c.officerId)

  return (
    <section className="section bg-navy" id="committees">
      <div className="container" data-reveal>
        <div className="section-head">
          <h2 className="h2">What does each committee do?</h2>
          <a href={FORMS.committee} className="eb-apply">
            Apply to a committee
          </a>
        </div>
        <p className="section-lead">
          Committees work side by side with the Executive Board to run our programs and events. Pick one to see what it
          does and who leads it.
        </p>
        <div className="committees">
          <div className="committee-list" role="tablist" aria-label="Committees">
            {COMMITTEES.map((x, n) => (
              <button key={x.name} role="tab" aria-selected={n === active} className={n === active ? 'is-active' : ''} onClick={() => setActive(n)}>
                {x.name}
              </button>
            ))}
          </div>
          <div className="card committee-panel" role="tabpanel" aria-label={c.name}>
            <h3>{c.name}</h3>
            <p>{c.description}</p>
          </div>
          <div className="committee-lead">
            <OfficerCard o={lead} email={false} />
          </div>
        </div>
      </div>
    </section>
  )
}

export function Eboard() {
  useReveal()
  return (
    <>
      <Hero />
      <section className="section">
        <div className="container">
          <h2 className="h2 eb-title" data-reveal>
            Our Executive Board
          </h2>
          <ul className="officers" data-reveal="stagger">
            {OFFICERS.map((o, n) => (
              <li key={o.id} style={{ '--i': n } as CSSProperties}>
                <OfficerCard o={o} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Committees />
    </>
  )
}
