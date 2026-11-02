import type { CalendarEntry } from './events'

// Set in .env.local for development and as GitHub Actions variables for the live site (see README).
// The key is visible in the built site, which is expected: restrict it to the site's domains and the Calendar API.
const CALENDAR_ID: string | undefined = import.meta.env.VITE_GCAL_ID
const API_KEY: string | undefined = import.meta.env.VITE_GCAL_KEY

/** True when the Home and Events calendars read from Google Calendar instead of `CALENDARS` */
export const LIVE_CALENDAR = Boolean(CALENDAR_ID && API_KEY)

/** Adds the chapter calendar to a visitor's own Google Calendar */
export const SUBSCRIBE_URL = CALENDAR_ID ? `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(CALENDAR_ID)}` : undefined

// Events are placed and timed in Troy's time zone, wherever the visitor is
const TIME_ZONE = 'America/New_York'
const dateFormat = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit' })
const timeFormat = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, hour: 'numeric', minute: '2-digit' })

type GoogleTime = { date?: string; dateTime?: string }
type GoogleEvent = { summary?: string; status?: string; start: GoogleTime; end: GoogleTime }

/** "2026-09-03" for the Troy date of an instant */
const troyDate = (instant: number) => dateFormat.format(instant)

/** "6:30" and "PM", or "9" and "PM" on the hour */
function clock(instant: number) {
  const parts = Object.fromEntries(timeFormat.formatToParts(instant).map((p) => [p.type, p.value]))
  return { time: parts.minute === '00' ? parts.hour : `${parts.hour}:${parts.minute}`, period: parts.dayPeriod }
}

/** "6:30 - 9 PM", "11 AM - 1 PM" */
function timeRange(start: number, end: number) {
  const from = clock(start)
  const to = clock(end)
  return from.period === to.period ? `${from.time} - ${to.time} ${to.period}` : `${from.time} ${from.period} - ${to.time} ${to.period}`
}

/** Every date from `first` to `last` ("YYYY-MM-DD", inclusive) */
function datesBetween(first: string, last: string) {
  const dates: string[] = []
  for (let d = new Date(`${first}T12:00:00Z`); d.toISOString().slice(0, 10) <= last; d.setUTCDate(d.getUTCDate() + 1)) {
    dates.push(d.toISOString().slice(0, 10))
  }
  return dates
}

function toEntry(e: GoogleEvent, monthPrefix: string): (CalendarEntry & { starts: number }) | null {
  let first: string, last: string
  let time = ''
  if (e.start.date && e.end.date) {
    // All-day: Google's end date is the day after the event ends
    const end = new Date(`${e.end.date}T12:00:00Z`)
    end.setUTCDate(end.getUTCDate() - 1)
    first = e.start.date
    last = end.toISOString().slice(0, 10)
  } else if (e.start.dateTime && e.end.dateTime) {
    const start = Date.parse(e.start.dateTime)
    // A minute back, so an event ending at midnight stays on its own day
    const end = Math.max(start, Date.parse(e.end.dateTime) - 60_000)
    first = troyDate(start)
    last = troyDate(end)
    if (first === last) time = timeRange(start, Date.parse(e.end.dateTime))
  } else {
    return null
  }
  const days = datesBetween(first, last)
    .filter((d) => d.startsWith(monthPrefix))
    .map((d) => Number(d.slice(8)))
  if (days.length === 0) return null
  return { days, title: e.summary?.trim() || 'SHPE event', time, starts: Date.parse(e.start.dateTime ?? `${first}T00:00:00Z`) }
}

/** Events in one month (0-based `month`) of the public Google Calendar, in date order */
export async function fetchMonth(year: number, month: number): Promise<CalendarEntry[]> {
  // A day of slack each side; events are then matched to the month by their Troy date
  const params = new URLSearchParams({
    key: API_KEY ?? '',
    timeMin: new Date(Date.UTC(year, month, 0)).toISOString(),
    timeMax: new Date(Date.UTC(year, month + 1, 2)).toISOString(),
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '250',
  })
  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID ?? '')}/events?${params}`)
  if (!res.ok) throw new Error(`Google Calendar responded ${res.status}`)
  const { items = [] } = (await res.json()) as { items?: GoogleEvent[] }
  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}-`
  return items
    .filter((e) => e.status !== 'cancelled')
    .map((e) => toEntry(e, monthPrefix))
    .filter((e) => e !== null)
    .sort((a, b) => a.starts - b.starts)
    .map(({ days, title, time }) => ({ days, title, time }))
}
