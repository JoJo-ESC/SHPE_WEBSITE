import { useEffect, useState } from 'react'
import { CALENDARS, type CalendarEntry, type MonthCalendar } from '../data/events'
import { fetchMonth, LIVE_CALENDAR } from '../data/googleCalendar'

export type CalendarStatus = 'ready' | 'loading' | 'error'

// One request per month per visit, shared by every calendar on the site
const requests = new Map<string, Promise<CalendarEntry[]>>()

function load(year: number, month: number) {
  const key = `${year}-${month}`
  let request = requests.get(key)
  if (!request) {
    request = fetchMonth(year, month)
    // Forget failures so the next visit to the month tries again
    request.catch(() => requests.delete(key))
    requests.set(key, request)
  }
  return request
}

/** One month (0-based `month`) from Google Calendar, or from `CALENDARS` until it's connected */
export function useMonthCalendar(year: number, month: number): { calendar: MonthCalendar; status: CalendarStatus } {
  const key = `${year}-${month}`
  const [result, setResult] = useState<{ key: string; entries: CalendarEntry[] | null }>()

  useEffect(() => {
    if (!LIVE_CALENDAR) return
    let current = true
    load(year, month).then(
      (entries) => current && setResult({ key, entries }),
      () => current && setResult({ key, entries: null }),
    )
    return () => {
      current = false
    }
  }, [key, year, month])

  if (!LIVE_CALENDAR) {
    const typed = CALENDARS.find((c) => c.year === year && c.month === month)
    return { calendar: typed ?? { year, month, entries: [] }, status: 'ready' }
  }
  if (result?.key !== key) return { calendar: { year, month, entries: [] }, status: 'loading' }
  return { calendar: { year, month, entries: result.entries ?? [] }, status: result.entries ? 'ready' : 'error' }
}
