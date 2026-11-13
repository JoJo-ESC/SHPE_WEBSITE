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
  {
    name: 'SHPE Jr.',
    description:
      'The SHPE Jr. Committee develops presentations and experiments that introduce high school students to STEM. Members keep in touch with high school administrators and SHPE Jr. chapter members so activities carry on from year to year. The committee also runs at least three programs each semester, such as leadership and pre-college programs.',
    officerId: 'vp',
  },
  {
    name: 'Fundraising',
    description:
      'The Fundraising Committee raises money for the chapter through fundraisers like raffles. It also runs fundraisers that donate to philanthropic causes, like disaster relief and Latino youth education. The committee helps maintain the budget and plan chapter outings, like familia bonding and Executive Board bonding.',
    officerId: 'treasurer',
  },
  {
    name: 'Education',
    description:
      "The Education Committee maintains SHPE's educational resources, like the backwork drive and textbooks. The committee also coordinates educational and development programs, like the Resume Workshop and Beginner Series, and runs ScholarSHPE.",
    officerId: 'regional',
  },
  {
    name: 'Corporate',
    description:
      'The Corporate Committee finds corporate sponsors to support the chapter. Members work to strengthen our connection with alumni and keep them engaged. They also come up with event ideas that bring alumni, companies, faculty and students together.',
    officerId: 'corporate',
  },
  {
    name: 'MentorSHPE',
    description:
      'The MentorSHPE Committee pairs incoming freshmen and transfer students with upperclass mentors. The committee keeps mentors and mentees in touch through email and social media and organizes MentorSHPE events like basketball, trips to haunted houses and trips to trampoline parks.',
    officerId: 'internal',
  },
  {
    name: 'SHPEtinas',
    description:
      'The SHPEtinas Committee organizes professional and social SHPEtinas events, like Cafecitos. The committee also collaborates with other women-focused organizations, like SWE, and builds and maintains a network of SHPEtinas alumni.',
    officerId: 'external',
  },
  {
    name: 'Advertising',
    description:
      'The Advertising Committee creates and designs advertisements for SHPE activities and events. Members share SHPE announcements on social media and through flyers, take pictures at events and help keep the website up to date.',
    officerId: 'webmaster',
  },
]
