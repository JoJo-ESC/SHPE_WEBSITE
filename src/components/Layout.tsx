import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { asset, CONTACT, EXTERNAL, NAV, SOCIAL } from '../data/site'
import { Icon } from './Icon'

const YEAR = new Date().getFullYear()

function Logo() {
  return (
    <Link to="/" className="logo" aria-label="SHPE-Rensselaer home">
      <img src={asset('images/mark.png')} alt="" width={34} height={34} />
      <span className="logo-word">SHPE</span>
      <span className="logo-chapter">
        Rensselaer
        <small>RPI · Troy, NY</small>
      </span>
    </Link>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className={`nav ${open ? 'is-open' : ''}`}>
      <div className="container nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Main" onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/#join" className="btn btn-light btn-sm nav-cta">
            Join us
          </Link>
        </nav>
        <button className="nav-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>
    </header>
  )
}

export function SocialLinks({ className = '' }: { className?: string }) {
  const items = [
    { href: SOCIAL.instagram, icon: 'instagram', label: 'Instagram' },
    { href: SOCIAL.tiktok, icon: 'tiktok', label: 'TikTok' },
    { href: SOCIAL.youtube, icon: 'youtube', label: 'YouTube' },
    { href: SOCIAL.linkedin, icon: 'linkedin', label: 'LinkedIn' },
  ] as const
  return (
    <div className={`social ${className}`}>
      {items.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
          <Icon name={s.icon} size={16} />
        </a>
      ))}
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="flag-rule" aria-hidden="true" />
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <span className="accent">SHPE</span> Rensselaer
          </div>
          <p className="footer-motto">
            ¿Y por qué no <em>cambiar</em> el mundo?
          </p>
          <p className="footer-small">Rensselaer Polytechnic Institute · Troy, NY</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/membershpe">MemberSHPE</Link></li>
            <li><Link to="/events">Upcoming events</Link></li>
            <li><Link to="/eboard">Eboard &amp; committees</Link></li>
            <li><Link to="/resources">Documents &amp; forms</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li>
              {CONTACT.addressLine1}
              <br />
              {CONTACT.addressLine2}
            </li>
            <li><a href={EXTERNAL.national} target="_blank" rel="noreferrer">Part of SHPE National</a></li>
          </ul>
        </div>
        <div>
          <h4>Follow along</h4>
          <SocialLinks className="social-footer" />
        </div>
      </div>
      <div className="container footer-bottom">
        © {YEAR} SHPE-Rensselaer. A chapter of the Society of Hispanic Professional Engineers.
      </div>
    </footer>
  )
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Wait a frame so the new route has rendered its anchors
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }))
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export function Layout() {
  return (
    <>
      <ScrollManager />
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
