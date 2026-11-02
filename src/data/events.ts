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
  { year: 2026, month: 9, entries: [] }, // October
]

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
