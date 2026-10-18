import { useState } from 'react'
import { Icon, type IconName } from '../components/Icon'
import { Eyebrow, PageHero, SectionHead } from '../components/ui'
import { asset, EXTERNAL, FORMS } from '../data/site'

const SCHOLARSHIPS = [
  {
    org: 'SHPE Foundation',
    name: 'ScholarSHPE Program',
    body: 'Scholarships for Latino students pursuing engineering, math and science degrees at U.S. or Puerto Rico programs. Awards are paid in two parts, one in the fall and one in the spring.',
    needs: ['Active SHPE National membership', 'Enrollment in an accredited STEM program', 'Transcript, resume and personal statement'],
    href: EXTERNAL.scholarshpe,
  },
  {
    org: 'Great Minds in STEM',
    name: 'HENAAC Scholars Program',
    body: 'For STEM students who are active in the Hispanic community, including high school seniors starting college in the fall.',
    needs: ['Demonstrated involvement in the Hispanic community', 'Minimum GPA set each cycle', 'Transcript, resume and essay'],
    href: EXTERNAL.henaac,
  },
]

const CONFERENCES = [
  {
    season: 'Fall',
    name: 'National Convention',
    title: 'SHPE National Convention',
    body: 'The largest Hispanic socio-technical conference in the country: a career fair with recruiters, corporate-led workshops, and SHPE members from chapters everywhere.',
    note: 'The most recent convention was in Philadelphia, PA, from October 29 to November 1.',
    stat: { value: '48', label: 'active SHPE-RPI members attended the most recent convention' },
  },
  {
    season: 'Spring',
    name: 'RLDC',
    title: 'Regional Leadership Development Conference',
    body: 'Meet chapters from across the region for leadership workshops, a regional career fair and the chance to compete in technical and professional competitions.',
    note: 'Our Regional Representative shares dates and registration each spring.',
  },
  {
    season: 'Summer',
    name: 'NILA',
    title: 'National Institute for Leadership Advancement',
    body: 'An intensive leadership program for chapter officers and emerging leaders, focused on running strong chapters and growing as professionals.',
    note: 'Incoming officers are especially encouraged to attend.',
  },
]

const PREP: { title: string; body: string; icon: IconName }[] = [
  { title: 'Career fairs', body: 'Meet recruiters at events like the NSBE/SHPE Career Fair and at the SHPE National Convention.', icon: 'briefcase' },
  { title: 'Resume and interview workshops', body: 'Sharpen your resume and practice the interview before it counts.', icon: 'form' },
  { title: 'Professional panels', body: 'Hear from engineers and alumni about what working in industry and research is really like.', icon: 'users' },
]

function Scholarship({ s }: { s: (typeof SCHOLARSHIPS)[number] }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="card scholarship">
      <span className="tag tag-navy">{s.org}</span>
      <h3>{s.name}</h3>
      <p>{s.body}</p>
      <button className="disclosure" aria-expanded={open} onClick={() => setOpen(!open)}>
        What you'll need <Icon name="plus" size={16} />
      </button>
      {open && (
        <ul className="disclosure-body">
          {s.needs.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
      <a className="btn btn-navy btn-sm" href={s.href} target="_blank" rel="noreferrer">
        Learn more and apply <Icon name="external" size={14} />
      </a>
    </article>
  )
}

export function ProfessionalDevelopment() {
  const [conf, setConf] = useState(0)
  const c = CONFERENCES[conf]

  return (
    <>
      <PageHero
        crumbs={[{ to: '/membershpe', label: 'MemberSHPE' }]}
        eyebrow="Professional development"
        title={
          <>
            Pathways to <em>success.</em>
          </>
        }
        lead="Scholarships, conferences and career prep that help SHPE-Rensselaer members turn a degree into a career."
        image={asset('images/eboard.jpg')}
      >
        <a href={FORMS.resume} className="btn btn-primary">
          Submit your resume
        </a>
        <a href="#conferences" className="btn btn-ghost-light">
          See conferences
        </a>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Scholarships" title={<>Funding for your <em>degree</em></>} />
          <div className="grid-2">
            {SCHOLARSHIPS.map((s) => (
              <Scholarship key={s.name} s={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-navy" id="conferences">
        <div className="container">
          <SectionHead
            eyebrow="Conferences"
            title={<>A conference every <em>season</em></>}
            aside={<p>Network with SHPE members from other chapters, meet recruiters at the career fair, and build skills in corporate-led workshops.</p>}
          />
          <div className="season-tabs" role="tablist">
            {CONFERENCES.map((x, n) => (
              <button key={x.name} role="tab" aria-selected={n === conf} className={n === conf ? 'is-active' : ''} onClick={() => setConf(n)}>
                <small>{x.season}</small>
                {x.name}
              </button>
            ))}
          </div>
          <div className="card conf-panel" role="tabpanel">
            <div>
              <Eyebrow>Every {c.season.toLowerCase()}</Eyebrow>
              <h3 className="h2">{c.title}</h3>
              <p>{c.body}</p>
              <p className="strong">{c.note}</p>
            </div>
            {c.stat && (
              <div className="conf-stat">
                <strong>{c.stat.value}</strong>
                <span>{c.stat.label}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Career prep" title={<>Ready for the <em>room</em></>} />
          <div className="grid-3">
            {PREP.map((p) => (
              <div key={p.title} className="card">
                <span className="icon-badge">
                  <Icon name={p.icon} size={20} />
                </span>
                <h3>{p.title}</h3>
                <p className="muted">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="banner">
            <div>
              <h3>Get your resume in front of companies</h3>
              <p>Submit it once through our resume form and we'll share it with our company partners.</p>
            </div>
            <a href={FORMS.resume} className="btn btn-primary">
              Submit your resume
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
