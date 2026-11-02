import type { IconName } from '../components/Icon'
import { DOCS, FORMS, SOCIAL } from './site'

export type ResourceKind = 'Forms' | 'Documents' | 'Social'

export type Resource = {
  title: string
  description: string
  kind: ResourceKind
  tag: string
  href: string
  icon: IconName
}

// Each kind is its own group on the Resources page, in this order
export const RESOURCE_GROUPS: { kind: ResourceKind; title: string; intro: string }[] = [
  { kind: 'Forms', title: 'Forms', intro: 'Google Forms for members. Submit your resume, get reimbursed, join a committee or sign up for Outreach Weekend.' },
  { kind: 'Documents', title: 'Documents', intro: 'Official chapter documents and calendars, ready to read or download.' },
  { kind: 'Social', title: 'Social media', intro: 'Follow along for event announcements, photos and chapter news.' },
]

export const RESOURCES: Resource[] = [
  { kind: 'Forms', icon: 'briefcase', tag: 'Google Form', title: 'Resume submission', description: 'Send us your resume to share with company partners.', href: FORMS.resume },
  { kind: 'Forms', icon: 'receipt', tag: 'Google Form', title: 'Reimbursement form', description: 'Request reimbursement for approved chapter expenses.', href: FORMS.reimbursement },
  { kind: 'Forms', icon: 'users', tag: 'Google Form', title: 'Committee application', description: 'Apply to join one of our seven committees.', href: FORMS.committee },
  { kind: 'Forms', icon: 'form', tag: 'Google Form', title: 'Outreach Weekend registration', description: 'High school students: apply to be part of Outreach Weekend.', href: FORMS.outreachRegistration },
  { kind: 'Forms', icon: 'home', tag: 'Google Form', title: 'Outreach Weekend host application', description: 'RPI students: apply to host a visiting student.', href: FORMS.outreachHost },
  { kind: 'Documents', icon: 'file', tag: 'PDF · 6.7 MB', title: 'Corporate Solicitation Package 2026–27', description: 'Sponsorship opportunities for companies and partners.', href: DOCS.solicitation },
  { kind: 'Documents', icon: 'book', tag: 'PDF · 285 KB', title: 'SHPE-Rensselaer Constitution', description: 'The rules and regulations that govern our chapter.', href: DOCS.constitution },
  { kind: 'Documents', icon: 'calendar', tag: 'PDF', title: 'Member calendar: September 2026', description: 'GBMs, Study Jams and events for September.', href: DOCS.calendar },
  { kind: 'Social', icon: 'instagram', tag: '@shperpi', title: 'Instagram', description: 'Event announcements, photos and chapter news.', href: SOCIAL.instagram },
  { kind: 'Social', icon: 'instagram', tag: '@shperpioutreach', title: 'Outreach Instagram', description: 'Everything Outreach Weekend and K-12 outreach.', href: SOCIAL.outreachInstagram },
  { kind: 'Social', icon: 'tiktok', tag: '@shperpi', title: 'TikTok', description: 'Short videos from chapter life.', href: SOCIAL.tiktok },
  { kind: 'Social', icon: 'youtube', tag: '@shperpi', title: 'YouTube', description: 'Recorded events and chapter videos.', href: SOCIAL.youtube },
  { kind: 'Social', icon: 'linkedin', tag: 'SHPE-Rensselaer', title: 'LinkedIn', description: 'Professional updates and alumni connections.', href: SOCIAL.linkedin },
]
