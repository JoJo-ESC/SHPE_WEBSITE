import { LIVE_CALENDAR } from './googleCalendar'
import { asset } from './site'

// Month grids for the calendar on the home and Events pages. `days` lists
// every date an event runs in the month. A "\n" in a title is a line break in
// the grid and a space everywhere else.
export type CalendarEntry = { days: number[]; title: string; time: string }
export type MonthCalendar = { year: number; month: number; entries: CalendarEntry[] }

// Typed-in months, used only until the Google Calendar is connected (see README).
// In order. A month with no entries yet shows as "coming soon" on the Events page.
export const CALENDARS: MonthCalendar[] = [
  {
    year: 2026,
    month: 8, // 0-based: September
    entries: [
      { days: [3], title: 'GBM 1', time: '6:30 - 9 PM' },
      // Zero-width space lets the name wrap after "Global" in the narrow cell
      { days: [10], title: 'Global​Foundries', time: '6 - 7 PM' },
      { days: [14], title: 'Study Jam 1', time: '7 - 9 PM' },
      { days: [17], title: 'GBM 2', time: '6:30 - 9 PM' },
      { days: [19], title: 'MentorSHPE Mentor Matching', time: '12 - 2 PM' },
      { days: [20], title: 'SHPEtinas Cafecitos', time: '12 - 2 PM' },
      { days: [21], title: 'Study Jam 2', time: '7 - 9 PM' },
      { days: [24, 25], title: 'NSBE SHPE\nCareer Fair', time: '' },
      { days: [28], title: 'Study Jam 3', time: '7 - 9 PM' },
    ],
  },
  {
    year: 2026,
    month: 9, // October
    entries: [
      { days: [1], title: 'GBM 3: Movie Night', time: '6:30 - 8 PM' },
      { days: [5], title: 'LinkedIn Workshop', time: '6 - 7:30 PM' },
      { days: [5], title: 'Study Jam 4', time: '7 - 9 PM' },
      { days: [8], title: 'MentorSHPE Matching', time: '7 PM' },
      { days: [10], title: 'Alumni Weekend', time: '4 - 6 PM' },
      { days: [11], title: 'SHPEtinas Pumpkin Painting', time: '4 - 6 PM' },
      // Runs Oct 13-23, but other events share those days, so it sits on its first day only
      { days: [13], title: 'SHPE Raffle', time: 'Through Oct 23' },
      { days: [15], title: 'GBM 4: Dress to Impress', time: '6:30 - 8 PM' },
      { days: [17], title: 'SHPEtinas x SWE Pilates', time: '12 - 1 PM' },
      { days: [19], title: 'Study Jam 5', time: '7 - 9 PM' },
      { days: [20], title: 'Breast Cancer Awareness', time: '7 - 9 PM' },
      { days: [23], title: 'Familia Bonding', time: '6 - 11 PM' },
      { days: [24], title: 'Philanthropy Fest', time: '2 - 5 PM' },
      { days: [25], title: 'MentorSHPE Basketball', time: '1 - 3 PM' },
      { days: [26], title: 'Study Jam 6', time: '7 - 9 PM' },
      { days: [28, 29, 30, 31], title: 'National\nConvention', time: '' },
    ],
  },
  { year: 2026, month: 10, entries: [] }, // November
]

// Monthly event flyers (the images from the member calendar PDF), shown under the
// calendar on the home and Events pages for their month. Files go in
// public/images/calendar/. A month with no flyers here just shows the calendar.
export type Flyer = { src: string; alt: string }
export const FLYERS: { year: number; month: number; pages: Flyer[] }[] = [
  {
    year: 2026,
    month: 9, // October
    pages: [
      { src: asset('images/calendar/2026-10-1.png'), alt: 'SHPE-RPI October 2026 events flyer for October 1 to 17' },
      { src: asset('images/calendar/2026-10-2.png'), alt: 'SHPE-RPI October 2026 events flyer for October 19 to 31' },
    ],
  },
]
export const flyersFor = (year: number, month: number) =>
  FLYERS.find((f) => f.year === year && f.month === month)?.pages ?? []

// The month the home and Events pages open on: this month from Google Calendar,
// or else the latest typed-in month that has events
const latestTyped = CALENDARS.findLast((c) => c.entries.length > 0) ?? CALENDARS[0]
export const START_MONTH = LIVE_CALENDAR
  ? { year: new Date().getFullYear(), month: new Date().getMonth() }
  : { year: latestTyped.year, month: latestTyped.month }

// "Previous Events" carousel on the Events page. `label` curves along the bottom of the photo.
export const PAST_EVENTS: { label: string; photo: string; alt: string }[] = [
  { label: 'BBQ', photo: asset('images/img-9903_orig.jpg'), alt: 'Members grilling at the chapter BBQ' },
  { label: 'Event', photo: asset('images/img-9801_orig.jpg'), alt: 'Members hanging out in a student lounge' }, // TODO: event name
  { label: 'Event', photo: asset('images/cooking.jpg'), alt: 'A member frying food at a chapter social' }, // TODO: event name
  { label: 'GBM', photo: asset('images/img-0165_orig.jpg'), alt: 'The Eboard in front of the SHPE banner at a general body meeting' },
  { label: 'Event', photo: asset('images/img-0493_orig.jpg'), alt: 'Members holding flags from across Latin America' }, // TODO: event name
]
