import { useState } from 'react'
import { Icon } from '../components/Icon'
import { Avatar, Eyebrow, PageHero, SectionHead } from '../components/ui'
import { COMMITTEES, OFFICERS, officer } from '../data/eboard'
import { asset, FORMS } from '../data/site'

export function Eboard() {
  const [active, setActive] = useState(COMMITTEES.length - 1)
  const c = COMMITTEES[active]
  const lead = officer(c.officerId)

  return (
    <>
      <PageHero
        eyebrow="Leadership · 2026–27"
        title={
          <>
            Meet the people who <em>run the chapter.</em>
          </>
        }
        lead="Nine officers and seven committees plan everything SHPE-Rensselaer does. Every one of them is an email away."
        image={asset('images/eboard.jpg')}
      />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Executive Board" title={<>Meet our Executive <em>Board</em></>} />
          <ul className="officers">
            {OFFICERS.map((o) => (
              <li key={o.id} className="card officer">
                <div className="officer-photo">{o.photo ? <img src={o.photo} alt={o.name} loading="lazy" /> : <Avatar name={o.name} size="lg" />}</div>
                <div className="officer-body">
                  <Eyebrow>{o.role}</Eyebrow>
                  <h3>{o.name}</h3>
                  <p className="muted small">
                    {o.degree} · Class of {o.year}
                  </p>
                  <div className="officer-actions">
                    <a className="btn btn-navy btn-sm" href={`mailto:${o.email}`}>
                      <Icon name="mail" size={14} /> Email
                    </a>
                    {o.linkedin && (
                      <a className="btn btn-outline btn-sm" href={o.linkedin} target="_blank" rel="noreferrer">
                        <Icon name="linkedin" size={14} /> LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-navy" id="committees">
        <div className="container">
          <SectionHead
            eyebrow="Committees"
            title={<>Help make it <em>happen</em></>}
            aside={
              <a href={FORMS.committee} className="btn btn-primary">
                Apply to a committee
              </a>
            }
          />
          <p className="section-lead">
            Committees work side by side with the Executive Board to run our programs and events. Pick one to see what it
            does and who leads it.
          </p>
          <div className="committees">
            <div className="committee-list" role="tablist" aria-label="Committees">
              {COMMITTEES.map((x, n) => (
                <button key={x.name} role="tab" aria-selected={n === active} className={n === active ? 'is-active' : ''} onClick={() => setActive(n)}>
                  {x.name} <Icon name="chevron" size={15} />
                </button>
              ))}
            </div>
            <div className="card committee-panel" role="tabpanel">
              <Eyebrow>Committee</Eyebrow>
              <h3 className="h2">{c.name}</h3>
              <p className="lead-dark">{c.description}</p>
              <div className="works-with">
                <Avatar name={lead.name} photo={lead.photo} size="sm" />
                <div>
                  <small>Works with</small>
                  <strong>{lead.name}</strong>
                  <small>{lead.role}</small>
                </div>
                <a className="btn btn-outline btn-sm" href={`mailto:${lead.email}?subject=${encodeURIComponent(`${c.name} committee`)}`}>
                  Ask about it
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
