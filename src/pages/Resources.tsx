import { useState } from 'react'
import { Icon, type IconName } from '../components/Icon'
import { PageHero } from '../components/ui'
import { RESOURCES, type ResourceKind } from '../data/resources'
import { CONTACT, FORMS } from '../data/site'

const KIND_ICON: Record<ResourceKind, IconName> = { Forms: 'form', Documents: 'file', Social: 'share' }
const FILTERS = ['All', 'Forms', 'Documents', 'Social'] as const

export function Resources() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')

  const q = query.trim().toLowerCase()
  const visible = RESOURCES.filter(
    (r) => (filter === 'All' || r.kind === filter) && (!q || `${r.title} ${r.description}`.toLowerCase().includes(q)),
  )

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={
          <>
            All the essentials <em>in one place.</em>
          </>
        }
        lead="Forms, documents and links for members, all online and paperless."
      >
        <label className="search">
          <Icon name="search" size={18} />
          <span className="sr-only">Search resources</span>
          <input type="search" placeholder="Search forms, documents and links" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </PageHero>

      <section className="section bg-mist">
        <div className="container resources-layout">
          <div>
            <div className="events-toolbar">
              <div className="chips">
                {FILTERS.map((f) => (
                  <button key={f} className={`chip ${filter === f ? 'is-active' : ''}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                    {f}
                  </button>
                ))}
              </div>
              <p className="muted small">
                {visible.length} {visible.length === 1 ? 'resource' : 'resources'}
              </p>
            </div>
            <ul className="resource-list">
              {visible.map((r) => (
                <li key={r.title}>
                  <a className="card resource" href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    <span className={`icon-badge kind-${r.kind.toLowerCase()}`}>
                      <Icon name={KIND_ICON[r.kind]} size={18} />
                    </span>
                    <span className="resource-text">
                      <strong>{r.title}</strong>
                      <small>{r.description}</small>
                    </span>
                    <span className="resource-tag">{r.tag}</span>
                    <Icon name="external" size={16} className="resource-go" />
                  </a>
                </li>
              ))}
              {visible.length === 0 && (
                <li className="card empty">
                  <h3>No matches</h3>
                  <p>Try a different search, or email the Webmaster below.</p>
                </li>
              )}
            </ul>
          </div>

          <aside className="events-side">
            <div className="card-dark">
              <p className="eyebrow is-light">Most used</p>
              <div className="quick-links">
                <a href={FORMS.resume} className="is-primary">
                  Submit your resume <Icon name="arrow" size={15} />
                </a>
                <a href={FORMS.reimbursement}>
                  Get reimbursed <Icon name="arrow" size={15} />
                </a>
                <a href={FORMS.committee}>
                  Apply to a committee <Icon name="arrow" size={15} />
                </a>
              </div>
            </div>
            <div className="card">
              <h3>Can't find something?</h3>
              <p className="muted">Our Webmaster keeps this page up to date.</p>
              <a className="link-strong" href={`mailto:${CONTACT.webmaster}`}>
                {CONTACT.webmaster}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
