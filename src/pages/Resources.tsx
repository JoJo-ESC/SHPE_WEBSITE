import { useState } from 'react'
import { Icon } from '../components/Icon'
import { useReveal } from '../components/useReveal'
import { RESOURCE_GROUPS, RESOURCES } from '../data/resources'
import { CONTACT } from '../data/site'

export function Resources() {
  useReveal()
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const matches = RESOURCES.filter((r) => !q || `${r.title} ${r.description} ${r.tag}`.toLowerCase().includes(q))
  const groups = RESOURCE_GROUPS.map((g) => ({ ...g, items: matches.filter((r) => r.kind === g.kind) })).filter((g) => g.items.length > 0)

  return (
    <>
      <section className="res-hero">
        <div className="container" data-reveal>
          <h1 className="res-title">Important Links, Documents, Social Media</h1>
          <label className="search res-search">
            <Icon name="search" size={16} />
            <span className="sr-only">Search resources</span>
            <input type="search" placeholder="Search forms, documents and links" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
        </div>
      </section>

      <section className="section">
        <div className="container" data-reveal>
          {groups.map((g) => (
            <div key={g.kind} className="res-group">
              <h2 className="h2">{g.title}</h2>
              <p className="res-intro">{g.intro}</p>
              <ul className="res-grid">
                {g.items.map((r) => (
                  <li key={r.href + r.title}>
                    <a className="res-link" href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                      <Icon name={r.icon} size={44} className="res-icon" />
                      <h3>{r.title}</h3>
                      <p>{r.description}</p>
                      <span className="res-tag">{r.tag}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {groups.length === 0 && <p className="res-empty">Nothing matches “{query.trim()}”. Try another search.</p>}
          <p className="res-help">
            Can't find something? Our Webmaster keeps this page up to date:{' '}
            <a className="link-strong" href={`mailto:${CONTACT.webmaster}`}>
              {CONTACT.webmaster}
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
