import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLink, CheckList, PageHero, SectionHead } from '../components/ui'
import { asset } from '../data/site'

const PILLARS = [
  {
    name: 'Community Outreach',
    summary: 'Give back by sharing STEM with underrepresented students in Troy and beyond.',
    points: ['K-12 outreach events throughout the year', 'SHPE Jr. programs with local high school faculty', 'Our annual Outreach Weekend'],
    cta: { label: 'See Outreach Weekend', to: '/membershpe/outreach-weekend' },
  },
  {
    name: 'Leadership',
    summary: 'Step up and help run the chapter, from committee member to Executive Board officer.',
    points: ['Seven committees that plan our programs', 'Leadership conferences like NILA and RLDC', 'Real responsibility running events and budgets'],
    cta: { label: 'Explore committees', to: '/eboard#committees' },
  },
  {
    name: 'Professional',
    summary: 'Get career-ready with workshops, recruiters and a network that opens doors.',
    points: ['Career fairs and the SHPE National Convention', 'Resume and interview workshops', 'Resume sharing with company partners'],
    cta: { label: 'Professional development', to: '/membershpe/professional-development' },
  },
  {
    name: 'Academic',
    summary: 'Succeed in your classes alongside people who have taken them before.',
    points: ['Weekly Study Jams', 'MentorSHPE pairing with upperclassmen', 'Research and grad school guidance'],
    cta: { label: 'See Study Jams', to: '/events' },
  },
  {
    name: 'Chapter Development',
    summary: 'Build a chapter that is stronger every year than the one we inherited.',
    points: ['General body meetings and socials', 'Fundraising for conferences and events', 'Alumni and corporate relationships'],
    cta: { label: 'Meet the Eboard', to: '/eboard' },
  },
]

const WAYS = [
  { title: 'Upcoming events', body: 'Regular general body meetings, socials and networking events. The easiest way to meet people and stay involved.', link: 'See the calendar', to: '/events' },
  { title: 'Professional development', body: 'Career fairs, interview and resume workshops, and professional panels that get you ready for the real thing.', link: 'Explore', to: '/membershpe/professional-development' },
  { title: 'Outreach', body: 'Serve underrepresented high school students through K-12 events, SHPE Jr. and our annual Outreach Weekend.', link: 'Get involved', to: '/membershpe/outreach-weekend' },
]

const BENEFITS = [
  'Build leadership and teamwork skills for professional environments',
  'Join local community outreach programs',
  'Attend national conferences: the SHPE Convention, NILA and ETLC',
  'Submit your resume to companies',
  'Take part in professional development and social awareness events',
  'Become eligible for SHPE National and company scholarships',
  'Get exposure to companies and build local and national networks',
  'Learn about research and grad school opportunities at top STEM universities',
]

export function MemberSHPE() {
  const [active, setActive] = useState(0)
  const p = PILLARS[active]

  return (
    <>
      <PageHero
        title={
          <>
            Being a member means <em>more than a meeting.</em>
          </>
        }
        lead="Everything we do is built around SHPE National's five development pillars. Joining means joining a strong organization, backed by strong companies."
        image={asset('images/gbm.jpg')}
      />

      <section className="section">
        <div className="container">
          <SectionHead title={<>How we develop our <em>members</em></>} />
          <div className="pillars">
            <div className="pillar-tabs" role="tablist" aria-label="Development pillars">
              {PILLARS.map((pl, n) => (
                <button key={pl.name} role="tab" aria-selected={n === active} className={n === active ? 'is-active' : ''} onClick={() => setActive(n)}>
                  {pl.name}
                </button>
              ))}
            </div>
            <div className="pillar-panel" role="tabpanel">
              <h3 className="h2">{p.name}</h3>
              <p className="lead-dark">{p.summary}</p>
              <CheckList items={p.points} />
              <Link to={p.cta.to} className="btn btn-navy">
                {p.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-navy">
        <div className="container">
          <SectionHead title={<>Three ways <em>in</em></>} />
          <div className="grid-3">
            {WAYS.map((w) => (
              <div key={w.title} className="plain-item">
                <h3>{w.title}</h3>
                <p>{w.body}</p>
                <ArrowLink to={w.to} light>
                  {w.link}
                </ArrowLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            title={<>We promise you the <em>best.</em></>}
            aside={<p>Here's what being part of SHPE-Rensselaer opens up for you.</p>}
          />
          <ol className="benefits">
            {BENEFITS.map((b) => (
              <li key={b}>
                <p>{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container cta-band">
          <div>
            <h2 className="h1">
              Ready to join the <em>familia?</em>
            </h2>
            <p className="lead-dark">Get on the mailing list, or go further and help run the chapter by joining a committee.</p>
          </div>
          <div className="actions">
            <Link to="/#join" className="btn btn-navy">
              Join the mailing list
            </Link>
            <Link to="/eboard#committees" className="btn btn-outline">
              Explore committees
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
