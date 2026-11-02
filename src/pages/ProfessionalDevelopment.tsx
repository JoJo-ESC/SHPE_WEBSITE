import type { ReactNode } from 'react'
import { Icon, type IconName } from '../components/Icon'
import { CheckList, PageHero, SectionHead } from '../components/ui'
import { useReveal } from '../components/useReveal'
import { officer } from '../data/eboard'
import { asset, EXTERNAL, FORMS } from '../data/site'

const ext = { target: '_blank', rel: 'noreferrer', className: 'link-strong' }

const SCHOLARSHIPS = [
  {
    name: 'SHPE Foundation Scholarship Program',
    body: 'SHPE offers scholarships and opportunities for Latino students pursuing degrees in engineering, math and science. All degree programs must be in the U.S. or Puerto Rico. Awards are paid in two parts, in the fall and spring terms, and you must be a full-time student both terms to receive both payments.',
    needs: [
      'Photo/video release form',
      'Student profile form with a professional headshot',
      'Updated resume',
      'Unofficial transcripts',
      'Any other documents the scholarship sponsor requires',
    ],
    more: (
      <>
        Learn more and apply on the{' '}
        <a href={EXTERNAL.scholarshpe} {...ext}>
          SHPE scholarships page
        </a>
        .
      </>
    ),
  },
  {
    name: 'HENAAC Scholars Program',
    body: 'Scholarships for full-time college STEM students, or high school seniors starting college in the fall, who are active in the Hispanic community.',
    needs: [
      'Full-time college STEM student, or a high school senior starting college in the fall',
      'Active in the Hispanic community',
      'Overall GPA of at least 3.0',
    ],
    more: (
      <>
        Learn more and apply at{' '}
        <a href={EXTERNAL.henaac} {...ext}>
          greatmindsinstem.org
        </a>
        .
      </>
    ),
  },
]

type Conference = {
  season: string
  name: string
  title: string
  body: ReactNode
  note: ReactNode
  stat?: { value: string; label: string }
}

const CONFERENCES: Conference[] = [
  {
    season: 'Fall',
    name: 'National Conference',
    title: 'SHPE National Conference',
    body: 'The SHPE National Conference takes place every fall. This year it was in Philadelphia, PA, from October 29 to November 1.',
    note: "Time to prepare for next year's conference.",
    stat: { value: '48', label: 'SHPE-RPI members attended' },
  },
  {
    season: 'Spring',
    name: 'RLDC',
    title: 'Regional Leadership Development Conference',
    body: (
      <>
        SHPE's Regional Leadership Development Conference (RLDC) takes place every spring. If you're interested in going,
        prepare a letter of intent to our Regional Representative,{' '}
        <a href={`mailto:${officer('regional').email}?subject=${encodeURIComponent('RLDC letter of intent')}`} className="link-strong">
          {officer('regional').name}
        </a>
        , explaining
        why the conference would be a valuable experience for you.
      </>
    ),
    note: 'More information on the 2027 RLDC is coming soon.',
  },
  {
    season: 'Summer',
    name: 'NILA',
    title: 'National Institute for Leadership Advancement',
    body: 'NILA takes place every summer and gives Executive Board members the skills to grow as leaders and build a stronger chapter. Members network with leaders from other chapters and become certified chapter leaders.',
    note: (
      <>
        In summer 2026, SHPE-RPI sent its Fall 2026 Executive Board to NILA, including Webmaster{' '}
        <strong>{officer('webmaster').name}</strong>. Vice President <strong>{officer('vp').name}</strong> also represented
        the chapter at the Presidents Summit. Learn more on the{' '}
        <a href={EXTERNAL.nila} {...ext}>
          NILA website
        </a>
        .
      </>
    ),
  },
]

const PREP: { title: string; body: string; icon: IconName }[] = [
  { title: 'Career fairs', body: 'Meet recruiters at events like the NSBE/SHPE Career Fair and at the SHPE National Convention.', icon: 'briefcase' },
  { title: 'Resume and interview workshops', body: 'Sharpen your resume and practice the interview before it counts.', icon: 'form' },
  { title: 'Professional panels', body: 'Hear from engineers and alumni about what working in industry and research is really like.', icon: 'users' },
]

export function ProfessionalDevelopment() {
  useReveal()
  return (
    <>
      <PageHero
        title={
          <>
            Pathways to <em>success.</em>
          </>
        }
        lead="Scholarships, conferences and career prep that help SHPE-Rensselaer members turn a degree into a career."
        photos={[
          asset('images/d5213e29-8ae1-4fc0-a685-af4282694c0b_orig.jpg'),
          asset('images/e2634ad6-f07d-4d1e-acaf-9fdc93335d7f_orig.jpg'),
          asset('images/img-0158_orig.jpg'),
        ]}
        flip
      >
        <a href={FORMS.resume} className="btn btn-primary">
          Submit your resume
        </a>
        <a href="#conferences" className="btn btn-ghost-light">
          See conferences
        </a>
      </PageHero>

      <section className="section">
        <div className="container" data-reveal>
          <SectionHead title={<>Funding for your <em>degree</em></>} />
          <div className="cols cols-2">
            {SCHOLARSHIPS.map((x) => (
              <article key={x.name} className="info-block">
                <h3>{x.name}</h3>
                <p>{x.body}</p>
                <h4>What you'll need</h4>
                <CheckList items={x.needs} />
                <p>{x.more}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-navy" id="conferences">
        <div className="container" data-reveal>
          <SectionHead title={<>A conference every <em>season</em></>} />
          <p className="section-lead">
            Conferences are a great chance to network with SHPE members from other chapters and recruiters from your
            favorite companies at the career fair. Workshops run by corporate representatives build your professional
            development too.
          </p>
          <table className="conf-table">
            <thead>
              <tr>
                <th scope="col">When</th>
                <th scope="col">Conference</th>
                <th scope="col">What to know</th>
                <th scope="col">From our chapter</th>
              </tr>
            </thead>
            <tbody>
              {CONFERENCES.map((c) => (
                <tr key={c.name}>
                  <td className="conf-season">{c.season}</td>
                  <th scope="row">
                    <h3>{c.title}</h3>
                  </th>
                  <td>
                    <p>{c.body}</p>
                  </td>
                  <td>
                    {c.stat && (
                      <p className="info-stat">
                        <strong>{c.stat.value}</strong> {c.stat.label}
                      </p>
                    )}
                    <p className="info-note">{c.note}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="container" data-reveal>
          <SectionHead title={<>Ready for the <em>room</em></>} />
          <div className="prep">
            <div>
              <ul className="prep-list">
                {PREP.map((x) => (
                  <li key={x.title}>
                    <Icon name={x.icon} size={32} className="info-icon" />
                    <div>
                      <h3>{x.title}</h3>
                      <p>{x.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="info-cta">
                <h3>Get your resume in front of companies</h3>
                <p>
                  Submit it once through our{' '}
                  <a href={FORMS.resume} {...ext}>
                    resume form
                  </a>{' '}
                  and we'll share it with our company partners.
                </p>
              </div>
            </div>
            <img
              className="prep-photo"
              src={asset('images/img-0371_orig.jpg')}
              alt="Two members looking over a giveaway at a chapter event"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  )
}
