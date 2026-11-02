import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { PageHero, SectionHead } from '../components/ui'
import { prefersMotion, useAutoplay, useLoop } from '../components/useLoop'
import { useReveal } from '../components/useReveal'
import { asset, OUTREACH_PAGE_LIVE } from '../data/site'

// SHPE National's five development pillars, one slide each
const PILLARS = [
  {
    name: 'Community Outreach',
    text: 'Share STEM with students in Troy and beyond through local outreach programs and social awareness events.',
    photo: asset('images/img-0493_orig.jpg'),
    alt: 'Members holding flags from across Latin America',
  },
  {
    name: 'Leadership',
    text: 'Build leadership and teamwork skills by helping run the chapter, and represent us at the SHPE Convention, NILA and ETLC.',
    photo: asset('images/eboard.jpg'),
    alt: 'The Executive Board in front of the chapter banner',
  },
  {
    name: 'Professional',
    text: 'Get your resume in front of companies and build a local and national network through workshops and career fairs.',
    photo: asset('images/d5213e29-8ae1-4fc0-a685-af4282694c0b_orig.jpg'),
    alt: 'Chapter members at the SHPE National Convention',
  },
  {
    name: 'Academic',
    text: 'Get through tough classes together, qualify for SHPE and company scholarships, and explore research and grad school.',
    photo: asset('images/img-0172_orig.jpg'),
    alt: 'Members working together at a table',
  },
  {
    name: 'Chapter Development',
    text: 'Plan our meetings, socials and fundraisers, and leave the chapter stronger than you found it.',
    photo: asset('images/img-9949_orig.jpg'),
    alt: 'Members gathered outside at the chapter BBQ',
  },
]

const WAYS = [
  {
    title: 'Professional development',
    body: 'Scholarships, conferences, career fairs and resume workshops that get you ready for the real thing.',
    to: '/membershpe/professional-development',
  },
  {
    title: 'Outreach Weekend',
    body: 'Serve underrepresented high school students through K-12 events, SHPE Jr. and our annual Outreach Weekend.',
    to: OUTREACH_PAGE_LIVE ? '/membershpe/outreach-weekend' : undefined,
  },
]

function Pillars() {
  const { copies, pos, animate, step, settle, swipe } = useLoop(PILLARS)
  // Plays on its own unless the visitor prefers reduced motion; the pause button stops it
  const [playing, setPlaying] = useState(prefersMotion)
  const restartTimer = useAutoplay(step, playing)

  const go = (dir: 1 | -1) => {
    step(dir)
    restartTimer()
  }

  return (
    <section className="section bg-mist">
      <div className="container" data-reveal>
        <SectionHead
          title={<>How we develop our <em>members</em></>}
          aside={
            <div className="pillar-arrows">
              <button
                className="prev-arrow pillar-play"
                aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
                onClick={() => setPlaying(!playing)}
              >
                <Icon name={playing ? 'pause' : 'play'} size={22} />
              </button>
              <button className="prev-arrow" aria-label="Previous pillar" onClick={() => go(-1)}>
                <Icon name="chevronLeft" size={26} />
              </button>
              <button className="prev-arrow" aria-label="Next pillar" onClick={() => go(1)}>
                <Icon name="chevron" size={26} />
              </button>
            </div>
          }
        />
        <div className="pillar-viewport" {...swipe}>
          <ul
            className={`pillar-track ${animate ? 'is-animated' : ''}`}
            style={{ '--pos': pos } as CSSProperties}
            onTransitionEnd={settle}
            onTransitionCancel={settle}
          >
            {copies.map(({ item: pl, copy, key }, n) => (
              <li key={key} className={n === pos ? 'is-active' : ''} aria-hidden={copy !== 1 || undefined}>
                <figure className="pillar-slide">
                  <img src={pl.photo} alt={copy === 1 ? pl.alt : ''} draggable={false} loading="lazy" />
                  <figcaption>
                    <h3>{pl.name}</h3>
                    <p>{pl.text}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function MemberSHPE() {
  useReveal()
  return (
    <>
      <PageHero
        title={
          <>
            Being a member means <em>more than a meeting.</em>
          </>
        }
        lead="Everything we do is built around SHPE National's five development pillars. Joining means joining a strong organization, backed by strong companies."
        photos={[
          asset('images/img-0165_orig.jpg'),
          asset('images/301e251a-694c-4c7f-8ecd-8cedb0176ad1_orig.jpg'),
          asset('images/copy-of-dsc05820_orig.jpg'),
        ]}
      />

      <section className="section ways-section">
        <div className="container" data-reveal>
          <div className="ways">
            {WAYS.map((w) =>
              w.to ? (
                <Link key={w.title} to={w.to} className="way">
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                </Link>
              ) : (
                <div key={w.title} className="way">
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                  <p className="way-soon">Page coming soon</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <Pillars />
    </>
  )
}
