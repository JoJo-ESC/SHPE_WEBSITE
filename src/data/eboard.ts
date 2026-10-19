import { asset } from './site'

export type Officer = {
  id: string
  name: string
  role: string
  degree: string
  year: string
  email: string
  linkedin?: string
  photo?: string
}

export const OFFICERS: Officer[] = [
  { id: 'president', name: 'Lauren Caraballo', role: 'President', degree: 'B.S. Mechanical Engineering', year: "'28", email: 'president@shpe.rpi.edu', photo: asset('images/eboard/president.jpg') },
  { id: 'vp', name: 'Pablo Semidey', role: 'Vice President', degree: 'B.S. Information Technology and Web Science', year: "'28", email: 'vice-president@shpe.rpi.edu', photo: asset('images/eboard/vp.jpg') },
  { id: 'regional', name: 'Melissa Flores', role: 'Regional Representative', degree: 'Ph.D. Aerospace Engineering', year: "'28", email: 'regional-rep@shpe.rpi.edu', photo: asset('images/eboard/regional.jpg') },
  { id: 'external', name: 'Sophia Meneses', role: 'External Secretary', degree: 'B.S. Chemical Engineering', year: "'29", email: 'external-secretary@shpe.rpi.edu', photo: asset('images/eboard/external.jpeg') },
  { id: 'internal', name: 'Christopher Hernandez', role: 'Internal Secretary', degree: 'B.S. ITWS and Business Management', year: "'29", email: 'internal-secretary@shpe.rpi.edu', photo: asset('images/eboard/internal.jpg') },
  { id: 'treasurer', name: 'Carlos Mejia', role: 'Treasurer', degree: 'B.S. Electrical Engineering', year: "'29", email: 'treasurer@shpe.rpi.edu', photo: asset('images/eboard/treasurer.jpg') },
  { id: 'corporate', name: 'Anthony Enriquez', role: 'Alumni and Corporate Rep', degree: 'B.S. Electrical Engineering', year: "'28", email: 'alumni-corporate@shpe.rpi.edu', photo: asset('images/eboard/corporate.jpg') },
  { id: 'webmaster', name: 'Abigail Gutierrez', role: 'Webmaster', degree: 'B.S. Biochemistry and Biophysics', year: "'29", email: 'webmaster@shpe.rpi.edu', photo: asset('images/eboard/webmaster.jpg') },
  { id: 'freshman', name: 'Xavier Russo', role: 'Freshman Representative', degree: 'B.S. Mechanical Engineering', year: "'30", email: 'freshman-rep@shpe.rpi.edu', photo: asset('images/eboard/freshman.jpg') },
]

export const officer = (id: string) => OFFICERS.find((o) => o.id === id)!

export const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

export type Committee = { name: string; description: string; officerId: string }

export const COMMITTEES: Committee[] = [
  { name: 'SHPE Jr.', description: 'Works with local high school faculty to plan STEM projects for Hispanic high school students.', officerId: 'external' },
  { name: 'Fundraising', description: 'Plans fundraisers that help cover conference travel, events and outreach supplies.', officerId: 'treasurer' },
  { name: 'Education', description: 'Runs Study Jams and academic workshops so members can lean on each other through tough classes.', officerId: 'internal' },
  { name: 'Corporate', description: 'Builds relationships with company partners and helps bring recruiters, panels and info sessions to campus.', officerId: 'corporate' },
  { name: 'MentorSHPE', description: 'Pairs newer members with upperclassmen and grad students for guidance on classes, internships and life at RPI.', officerId: 'vp' },
  { name: 'SHPEtinas', description: 'Ignites Latinas in STEM through Cafecitos, community events and a support network of women engineers.', officerId: 'regional' },
  { name: 'Advertising', description: 'Promotes chapter activities across social media and other channels, and keeps the website up to date.', officerId: 'webmaster' },
]
