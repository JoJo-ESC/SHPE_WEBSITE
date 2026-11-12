import { useSyncExternalStore } from 'react'
import { embedUrl } from '../data/googleCalendar'

const PHONE = '(max-width: 600px)'
const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(PHONE)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
const isPhone = () => window.matchMedia(PHONE).matches

/**
 * The chapter's Google Calendar: a month grid, or a list of upcoming events on phones where the grid is too cramped.
 * `lazy` waits to load it until it's scrolled near; turn it off where the calendar is near the top of the page.
 */
export function GoogleCalendar({ lazy = true }: { lazy?: boolean }) {
  const phone = useSyncExternalStore(subscribe, isPhone, () => false)
  return (
    <div className="gcal">
      <iframe title="SHPE-RPI events calendar" src={embedUrl(phone ? 'AGENDA' : 'MONTH')} loading={lazy ? 'lazy' : 'eager'} />
    </div>
  )
}
