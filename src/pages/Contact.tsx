import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Avatar, PageHero, SectionHead } from '../components/ui'
import { officer } from '../data/eboard'
import { asset, CONTACT, SOCIAL } from '../data/site'

const TOPICS = [
  { id: 'general', label: 'General question', officerId: 'president', note: 'Not sure who to ask? Start here.' },
  { id: 'corporate', label: 'Companies and sponsorship', officerId: 'corporate', note: 'Sponsorships, recruiting events and alumni connections.' },
  { id: 'outreach', label: 'Outreach and SHPE Jr.', officerId: 'external', note: 'Outreach Weekend, K-12 events and school partnerships.' },
  { id: 'conferences', label: 'Conferences', officerId: 'regional', note: 'Convention, RLDC and NILA registration and travel.' },
  { id: 'reimbursements', label: 'Reimbursements', officerId: 'treasurer', note: 'Questions about approved chapter expenses.' },
  { id: 'first-year', label: "I'm a first-year", officerId: 'freshman', note: 'New to RPI? Your class rep has your back.' },
  { id: 'website', label: 'Website', officerId: 'webmaster', note: 'Broken links, updates and resources on this site.' },
]

export function Contact() {
  const [params] = useSearchParams()
  const [topicId, setTopicId] = useState(TOPICS.some((t) => t.id === params.get('topic')) ? params.get('topic')! : 'general')
  const topic = TOPICS.find((t) => t.id === topicId)!
  const person = officer(topic.officerId)

  // No backend yet: hand the message to the visitor's mail app, addressed to
  // whoever owns the selected topic.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const body = `${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})${d.get('list') ? '\n\nPlease add me to the SHPE-Rensselaer mailing list.' : ''}`
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(`[SHPE-RPI] ${topic.label}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <PageHero
        title={
          <>
            We'd love to <em>hear from you.</em>
          </>
        }
        lead="Have a question, want to partner with us, or just want on the mailing list? Pick a topic and we'll point you to the right person."
      />

      <section className="section">
        <div className="container">
          <SectionHead title={<>What's it <em>about?</em></>} />
          <div className="chips chips-lg">
            {TOPICS.map((t) => (
              <button key={t.id} className={`chip ${t.id === topicId ? 'is-active' : ''}`} aria-pressed={t.id === topicId} onClick={() => setTopicId(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="contact-person" aria-live="polite">
            <Avatar name={person.name} photo={person.photo} size="md" />
            <div>
              <h3>{person.name}</h3>
              <p className="contact-role">{person.role}</p>
              <p>{topic.note}</p>
            </div>
            <a className="btn btn-navy" href={`mailto:${person.email}`}>
              <Icon name="mail" size={16} /> {person.email}
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container contact-grid">
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="h2">Send us a message</h2>
            <p className="muted small">Only name, email and message are required. No phone number or mailing address needed.</p>
            <div className="form-row">
              <label>
                Name
                <input name="name" required autoComplete="name" />
              </label>
              <label>
                Email
                <input name="email" type="email" required autoComplete="email" />
              </label>
            </div>
            <label>
              Topic
              <select value={topicId} onChange={(e) => setTopicId(e.target.value)}>
                {TOPICS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Message
              <textarea name="message" rows={6} required />
            </label>
            <label className="check">
              <input type="checkbox" name="list" /> Add me to the SHPE-Rensselaer mailing list
            </label>
            <button className="btn btn-navy btn-block" type="submit">
              Send message
            </button>
          </form>

          <div className="contact-side">
            <div className="side-block">
              <h3>Find us</h3>
              <a href={CONTACT.mapUrl} target="_blank" rel="noreferrer" className="map">
                <img src={asset('images/chapter-group.jpg')} alt="" />
                <span>
                  <Icon name="pin" size={18} /> Open in Maps
                </span>
              </a>
              <p className="strong">{CONTACT.campus}</p>
              <p className="muted small">
                {CONTACT.addressLine1}, {CONTACT.addressLine2}
              </p>
            </div>
            <div className="side-block">
              <h3>Follow along</h3>
              <ul className="follow">
                <li><a href={SOCIAL.instagram} target="_blank" rel="noreferrer"><Icon name="instagram" /> Instagram · @shperpi</a></li>
                <li><a href={SOCIAL.tiktok} target="_blank" rel="noreferrer"><Icon name="tiktok" /> TikTok · @shperpi</a></li>
                <li><a href={SOCIAL.youtube} target="_blank" rel="noreferrer"><Icon name="youtube" /> YouTube</a></li>
                <li><a href={SOCIAL.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
