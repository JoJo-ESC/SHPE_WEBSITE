import { useReveal } from '../components/useReveal'
import { asset, CONTACT, SOCIAL } from '../data/site'

// Last spring's flyers, shown whole since they're mostly text
const FLYERS = [
  {
    src: asset('images/outreach-2026-brochure.png'),
    alt: 'Outreach Weekend 2026 student flyer: a free 3-day program for high school sophomores, juniors and seniors, March 20 to 22, 2026, with applications due February 22',
    title: 'For high school students',
    body: 'Three free days of college-level challenges, professor workshops and leadership activities.',
  },
  {
    src: asset('images/outreach-2026-host-flyer.png'),
    alt: 'Outreach Weekend 2026 host application flyer: applications due February 15, and hosts who house a student for the full weekend enter a $25 Amazon gift card raffle',
    title: 'For RPI student hosts',
    body: 'Hosts welcomed a visiting student for the weekend, with a $25 Amazon gift card raffle as a thank-you.',
  },
]

export function OutreachWeekend() {
  useReveal()
  return (
    <>
      <section className="page-hero ow-hero">
        <div className="container ow-hero-inner" data-reveal>
          <img className="ow-logo" src={asset('images/outreach-2026-logo.png')} alt="SHP·E, the WALL-E themed Outreach Weekend logo" />
          <h1 className="display">
            Outreach <em>Weekend</em>
          </h1>
          <p className="lead">
            A free three-day weekend at RPI where high school students explore STEM through college-level challenges,
            professor workshops and leadership activities.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" data-reveal>
          <div className="ow-head">
            <h2 className="h2">
              Last spring: <em>WALL-E</em>
            </h2>
            <p>
              From March 20 to 22, 2026, high school students spent three days on campus with RPI student hosts, meeting
              professors and seeing what studying STEM is really like.
            </p>
          </div>
          <div className="ow-flyers">
            {FLYERS.map((f) => (
              <figure key={f.src} className="ow-flyer">
                <img src={f.src} alt={f.alt} loading="lazy" />
                <figcaption>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container ow-upcoming" data-reveal>
          <h2 className="h2">
            Next up: <em>spring 2027</em>
          </h2>
          <p>
            Dates, student registration and host applications are coming soon. Follow{' '}
            <a href={SOCIAL.outreachInstagram} target="_blank" rel="noreferrer" className="link-strong">
              @shperpioutreach
            </a>{' '}
            to hear first, or reach us at{' '}
            <a href={`mailto:${CONTACT.outreachEmail}`} className="link-strong">
              {CONTACT.outreachEmail}
            </a>{' '}
            and{' '}
            <a href={`tel:${CONTACT.outreachPhone.replace(/\D/g, '')}`} className="link-strong">
              {CONTACT.outreachPhone}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
