import { useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { initials } from '../data/eboard'
import { CONTACT } from '../data/site'
import { Icon } from './Icon'

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  image,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  crumbs?: { to: string; label: string }[]
  children?: ReactNode
  image?: string
}) {
  return (
    <section className={`page-hero ${image ? 'has-image' : ''}`}>
      <div className="hero-rings" aria-hidden="true" />
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          {crumbs && (
            <nav className="crumbs" aria-label="Breadcrumb">
              {crumbs.map((c) => (
                <span key={c.to}>
                  <Link to={c.to}>{c.label}</Link> /{' '}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="display">{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children && <div className="actions">{children}</div>}
        </div>
        {image && (
          <div className="page-hero-photo">
            <img src={image} alt="" />
          </div>
        )}
      </div>
      <div className="flag-rule" aria-hidden="true" />
    </section>
  )
}

export function SectionHead({
  eyebrow,
  title,
  aside,
  center,
}: {
  eyebrow?: string
  title: ReactNode
  aside?: ReactNode
  center?: boolean
}) {
  return (
    <div className={`section-head ${center ? 'is-center' : ''}`}>
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="h2">{title}</h2>
      </div>
      {aside && <div className="section-aside">{aside}</div>}
    </div>
  )
}

export function ArrowLink({ to, children, light }: { to: string; children: ReactNode; light?: boolean }) {
  const cls = `arrow-link ${light ? 'is-light' : ''}`
  const body = (
    <>
      {children} <Icon name="arrow" size={15} />
    </>
  )
  return to.startsWith('http') || to.startsWith('mailto') || to === '#' ? (
    <a className={cls} href={to} target={to.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {body}
    </a>
  ) : (
    <Link className={cls} to={to}>
      {body}
    </Link>
  )
}

export function Avatar({ name, photo, size = 'md' }: { name: string; photo?: string; size?: 'sm' | 'md' | 'lg' }) {
  if (photo) return <img className={`avatar avatar-${size}`} src={photo} alt="" loading="lazy" />
  return (
    <span className={`avatar avatar-${size}`} aria-hidden="true">
      {initials(name)}
    </span>
  )
}

/**
 * Mailing-list signup. There is no backend yet, so submitting opens the
 * visitor's mail app with the details filled in, addressed to the Eboard.
 * Swap `handleSubmit` for a Google Form / Formspree POST when one exists.
 */
export function SignupForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const body = [
      `Name: ${data.get('first')} ${data.get('last')}`,
      `RPI email: ${data.get('email')}`,
      `Class year: ${data.get('year')}`,
      `Major: ${data.get('major') || '—'}`,
    ].join('\n')
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Add me to the SHPE-Rensselaer mailing list')}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          First name
          <input name="first" required autoComplete="given-name" />
        </label>
        <label>
          Last name
          <input name="last" required autoComplete="family-name" />
        </label>
      </div>
      <label>
        RPI email
        <input name="email" type="email" required placeholder="rcsid@rpi.edu" autoComplete="email" />
      </label>
      <div className="form-row">
        <label>
          Class year
          <select name="year" defaultValue="2030">
            {['2027', '2028', '2029', '2030', 'Graduate student'].map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </label>
        <label>
          Major
          <input name="major" placeholder="e.g. Mechanical Engineering" />
        </label>
      </div>
      <button className="btn btn-primary btn-block" type="submit">
        {sent ? 'Check your email app to send' : 'Join SHPE-Rensselaer'}
      </button>
      <p className="form-note">We only use your info to send SHPE-Rensselaer updates.</p>
    </form>
  )
}

export function CheckList({ items, light }: { items: ReactNode[]; light?: boolean }) {
  return (
    <ul className={`checklist ${light ? 'is-light' : ''}`}>
      {items.map((item, i) => (
        <li key={i}>
          <Icon name="check" size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
