export type Category = 'General body' | 'Academic' | 'Career' | 'Community'

export type ChapterEvent = {
  title: string
  category: Category
  time: string
  week: string // heading the event is grouped under
  // A single day shows weekday + day; a range shows "WEEK OF" + range
  day?: { weekday: string; date: string }
  range?: string
  month: string
}

export const MONTHS = ['September', 'October'] as const
export type Month = (typeof MONTHS)[number]

export const EVENTS: ChapterEvent[] = [
  { month: 'September', week: 'Week of Sept 1', day: { weekday: 'Tue', date: '1' }, category: 'General body', title: 'GBM 1', time: '6:30–9 PM' },
  { month: 'September', week: 'Week of Sept 6', range: '6–12', category: 'Career', title: 'GlobalFoundries', time: '6–7 PM' },
  { month: 'September', week: 'Week of Sept 13', range: '13–19', category: 'Community', title: 'MentorSHPE Mentor Matching', time: '12–2 PM' },
  { month: 'September', week: 'Week of Sept 13', range: '13–19', category: 'General body', title: 'GBM 2', time: '6:30–9 PM' },
  { month: 'September', week: 'Week of Sept 13', range: '13–19', category: 'Academic', title: 'Study Jam 1', time: '7–9 PM' },
  { month: 'September', week: 'Week of Sept 20', range: '20–26', category: 'Career', title: 'NSBE / SHPE Career Fair', time: 'Time TBA' },
  { month: 'September', week: 'Week of Sept 20', range: '20–26', category: 'Community', title: 'SHPEtinas Cafecitos', time: '12–2 PM' },
  { month: 'September', week: 'Week of Sept 20', range: '20–26', category: 'Academic', title: 'Study Jam 2', time: '7–9 PM' },
  { month: 'September', week: 'Week of Sept 27', range: '27–30', category: 'Academic', title: 'Study Jam 3', time: '7–9 PM' },
]

export const CATEGORIES: Category[] = ['General body', 'Academic', 'Career', 'Community']

// The month grid on the home page. `days` lists every date an event runs;
// multi-day events must stay within one week row. A "\n" in a title is a line
// break in the grid and a space everywhere else.
export type CalendarEntry = { days: number[]; title: string; time: string }

export const HOME_CALENDAR: { year: number; month: number; entries: CalendarEntry[] } = {
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
}
