/** Prefix a file in public/ with the deploy base path (e.g. /SHPE_WEBSITE/ on GitHub Pages). */
export const asset = (path: string) => import.meta.env.BASE_URL + path

// Central place for links and contact info. Anything marked TODO still needs
// the real URL from the Eboard before launch.

export const CONTACT = {
  email: 'president@shpe.rpi.edu',
  webmaster: 'webmaster@shpe.rpi.edu',
  addressLine1: '110 8th St',
  addressLine2: 'Troy, NY 12180',
  campus: 'Rensselaer Polytechnic Institute',
  outreachEmail: 'shpe.outreach.rpi@gmail.com',
  outreachPhone: '(518) 285-0023',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rensselaer+Polytechnic+Institute+110+8th+St+Troy+NY',
}

export const SOCIAL = {
  instagram: 'https://www.instagram.com/shperpi/',
  outreachInstagram: 'https://www.instagram.com/shperpioutreach/',
  tiktok: 'https://www.tiktok.com/@shperpi',
  youtube: 'https://www.youtube.com/@shperpi',
  linkedin: 'https://www.linkedin.com/company/shpe-rensselaer/home/',
}

export const FORMS = {
  resume: '#', // TODO: Google Form
  reimbursement: '#', // TODO: Google Form
  committee: '#', // TODO: Google Form
  outreachRegistration: '#', // TODO: 2027 Outreach Weekend form, then change the card's "Coming soon" tag
  outreachHost: '#', // TODO: 2027 Outreach Weekend form, then change the card's "Coming soon" tag
}

export const DOCS = {
  calendar: '#', // TODO: August-November 2026 calendar PDF
  solicitation: '#', // TODO: Corporate Solicitation Package PDF
  constitution: '#', // TODO: Constitution PDF
}

export const EXTERNAL = {
  national: 'https://shpe.org',
  scholarshpe: 'https://shpe.org/students/scholarships/',
  henaac: 'https://www.greatmindsinstem.org',
  nila: 'https://shpe.org/engage/events/nila/',
  globalFoundries: 'https://gf.com',
}

// The Outreach Weekend page is kept out of menus while it's reworked; it can still be
// previewed at /membershpe/outreach-weekend. Set to true to add its MemberSHPE menu
// link and the links to it on Home and Overview.
export const OUTREACH_PAGE_LIVE = true

export type NavItem = { to: string; label: string; children?: { to: string; label: string }[] }

export const NAV: NavItem[] = [
  {
    to: '/membershpe',
    label: 'MemberSHPE',
    children: [
      { to: '/membershpe', label: 'Overview' },
      { to: '/membershpe/professional-development', label: 'Professional development' },
      ...(OUTREACH_PAGE_LIVE ? [{ to: '/membershpe/outreach-weekend', label: 'Outreach Weekend' }] : []),
    ],
  },
  { to: '/events', label: 'Events' },
  { to: '/eboard', label: 'Eboard' },
  { to: '/resources', label: 'Resources' },
]
