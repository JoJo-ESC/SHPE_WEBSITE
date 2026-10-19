import { useState } from 'react'
import { Icon } from '../components/Icon'
import { ArrowLink, CheckList, PageHero, SectionHead } from '../components/ui'
import { asset, FORMS, SOCIAL } from '../data/site'

const AUDIENCES = {
  'high-school': {
    tab: "I'm a high school student",
    title: 'Apply to be part of Outreach Weekend',
    body: 'Spend a weekend at RPI with SHPE-Rensselaer: hands-on STEM activities, college students who have been in your shoes, and a real look at what studying engineering is like.',
    points: ['Hands-on engineering workshops', 'Stay with an RPI student host', 'See campus life up close'],
    cta: 'Register for Outreach Weekend',
    href: FORMS.outreachRegistration,
  },
  rpi: {
    tab: "I'm an RPI student",
    title: 'Host a visiting student',
    body: "Be the role model you wish you'd had. Hosts welcome a high school student for the weekend, help lead workshops and show them what life at RPI is really like.",
    points: ['Lead or assist a STEM workshop', 'Host a visiting student for the weekend', 'Count it toward your outreach involvement'],
    cta: 'Apply to host',
    href: FORMS.outreachHost,
  },
}

export function OutreachWeekend() {
  const [who, setWho] = useState<keyof typeof AUDIENCES>('high-school')
  const a = AUDIENCES[who]

  return (
    <>
      <PageHero
        crumbs={[{ to: '/membershpe', label: 'MemberSHPE' }]}
        title={
          <>
            Outreach <em>Weekend</em>
          </>
        }
        lead="This year's theme is WALL-E. Our biggest outreach event of the year. Underrepresented high school students spend a weekend with SHPE-Rensselaer doing hands-on STEM, and RPI students host them."
        image={asset('images/cooking.jpg')}
      >
        <a href="#involved" className="btn btn-primary">
          Apply or host
        </a>
        <a href={SOCIAL.outreachInstagram} target="_blank" rel="noreferrer" className="btn btn-ghost-light">
          <Icon name="instagram" size={16} /> @shperpioutreach
        </a>
      </PageHero>

      <section className="section" id="involved">
        <div className="container">
          <SectionHead title={<>Which one are <em>you?</em></>} />
          <div className="seg seg-lg" role="tablist">
            {(Object.keys(AUDIENCES) as (keyof typeof AUDIENCES)[]).map((k) => (
              <button key={k} role="tab" aria-selected={who === k} className={who === k ? 'is-active' : ''} onClick={() => setWho(k)}>
                {AUDIENCES[k].tab}
              </button>
            ))}
          </div>
          <div className="audience" role="tabpanel">
            <div>
              <h3 className="h2">{a.title}</h3>
              <p className="lead-dark">{a.body}</p>
              <CheckList items={a.points} />
              <a href={a.href} className="btn btn-navy">
                {a.cta} <Icon name="arrow" size={15} />
              </a>
            </div>
            <div className="brochure">
              <img src={asset('images/chapter-group.jpg')} alt="SHPE-Rensselaer members at Outreach Weekend" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-navy">
        <div className="container workshop">
          <div>
            <h2 className="h1">
              WALL-E's Directive: <em>Escape the Maze</em>
            </h2>
            <p>
              A hands-on robotics workshop from SHPE and RCOS. Students program a small robot to sense the walls around it
              and find its own way out of a maze.
            </p>
            <p className="workshop-kit">Built with an Arduino Uno, ultrasonic sensors and motor control.</p>
          </div>
          <svg className="maze" viewBox="0 0 220 220" aria-hidden="true">
            <rect x="10" y="10" width="200" height="200" rx="14" />
            <path d="M10 60h120M170 10v90M60 60v70M60 130h80M140 130v80M100 170h-90M180 140h30M180 140v-40" />
            <circle cx="35" cy="35" r="9" className="bot" />
            <path d="M35 35h110v60h-45v55h70v45" className="route" />
          </svg>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container">
          <SectionHead title={<>Outreach doesn't stop after <em>one weekend</em></>} />
          <div className="grid-3">
            <div className="plain-item">
              <h3>K-12 outreach events</h3>
              <p className="muted">STEM activities for underrepresented students in local schools throughout the year.</p>
            </div>
            <div className="plain-item">
              <h3>SHPE Jr.</h3>
              <p className="muted">Our SHPE Jr. committee works with local high school faculty to plan STEM projects for Hispanic high school students.</p>
              <ArrowLink to={FORMS.committee}>Join the committee</ArrowLink>
            </div>
            <div className="plain-item">
              <h3>Outreach Weekend</h3>
              <p className="muted">Our annual flagship. Follow along on Instagram for this year's dates and photos.</p>
              <ArrowLink to={SOCIAL.outreachInstagram}>@shperpioutreach</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
