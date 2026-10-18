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
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rensselaer+Polytechnic+Institute+110+8th+St+Troy+NY',
}

export const SOCIAL = {
  instagram: 'https://www.instagram.com/shperpi/',
  outreachInstagram: 'https://www.instagram.com/shperpioutreach/',
  tiktok: 'https://www.tiktok.com/@shperpi',
  youtube: 'https://www.youtube.com/results?search_query=SHPE+Rensselaer', // TODO: channel URL
  linkedin: 'https://www.linkedin.com/search/results/all/?keywords=SHPE%20Rensselaer', // TODO: page URL
}

export const FORMS = {
  resume: '#', // TODO: Google Form
  reimbursement: '#', // TODO: Google Form
  committee: '#', // TODO: Google Form
  outreachRegistration: '#', // TODO: Google Form
  outreachHost: '#', // TODO: Google Form
}

export const DOCS = {
  calendar: '#', // TODO: September 2026 calendar PDF
  solicitation: '#', // TODO: Corporate Solicitation Package PDF
  constitution: '#', // TODO: Constitution PDF
}

export const EXTERNAL = {
  national: 'https://shpe.org',
  scholarshpe: 'https://shpe.org/students/scholarships/',
  henaac: 'https://greatmindsinstem.org/henaac/',
}

export const NAV = [
  { to: '/membershpe', label: 'MemberSHPE' },
  { to: '/events', label: 'Events' },
  { to: '/eboard', label: 'Eboard' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
]
