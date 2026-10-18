import { DOCS, FORMS, SOCIAL } from './site'

export type ResourceKind = 'Forms' | 'Documents' | 'Social'

export type Resource = {
  title: string
  description: string
  kind: ResourceKind
  tag: string
  href: string
}

export const RESOURCES: Resource[] = [
  { kind: 'Forms', tag: 'Google Form', title: 'Resume submission', description: 'Send us your resume to share with company partners.', href: FORMS.resume },
  { kind: 'Forms', tag: 'Google Form', title: 'Reimbursement form', description: 'Request reimbursement for approved chapter expenses.', href: FORMS.reimbursement },
  { kind: 'Forms', tag: 'Google Form', title: 'Committee application', description: 'Apply to join one of our seven committees.', href: FORMS.committee },
  { kind: 'Forms', tag: 'Google Form', title: 'Outreach Weekend registration', description: 'High school students: apply to be part of Outreach Weekend.', href: FORMS.outreachRegistration },
  { kind: 'Forms', tag: 'Google Form', title: 'Outreach Weekend host application', description: 'RPI students: apply to host a visiting student.', href: FORMS.outreachHost },
  { kind: 'Documents', tag: 'PDF · 6.7 MB', title: 'Corporate Solicitation Package 2026–27', description: 'Sponsorship opportunities for companies and partners.', href: DOCS.solicitation },
  { kind: 'Documents', tag: 'PDF · 285 KB', title: 'SHPE-Rensselaer Constitution', description: 'The rules and regulations that govern our chapter.', href: DOCS.constitution },
  { kind: 'Documents', tag: 'PDF', title: 'Member calendar: September 2026', description: 'GBMs, Study Jams and events for September.', href: DOCS.calendar },
  { kind: 'Social', tag: 'Social', title: 'Instagram · @shperpi', description: 'Event announcements, photos and chapter news.', href: SOCIAL.instagram },
  { kind: 'Social', tag: 'Social', title: 'Instagram · @shperpioutreach', description: 'Everything Outreach Weekend and K-12 outreach.', href: SOCIAL.outreachInstagram },
  { kind: 'Social', tag: 'Social', title: 'TikTok · @shperpi', description: 'Short videos from chapter life.', href: SOCIAL.tiktok },
  { kind: 'Social', tag: 'Social', title: 'YouTube · SHPE Rensselaer', description: 'Recorded events and chapter videos.', href: SOCIAL.youtube },
  { kind: 'Social', tag: 'Social', title: 'LinkedIn · SHPE-Rensselaer', description: 'Professional updates and alumni connections.', href: SOCIAL.linkedin },
]
