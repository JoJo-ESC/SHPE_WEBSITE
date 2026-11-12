// The chapter's public Google Calendar ("SHPE-RPI Events"), embedded on the Home and
// Events pages. Events added there show up on the site right away; no rebuild needed.
// The ID isn't secret: anyone viewing the embed can see it. See "Calendar" in the README.
export const CALENDAR_ID = 'b9930f8dba059e3741abf897863c51231e285df0d6ce827b8da851f58e148928@group.calendar.google.com'

// Events are shown in Troy's time zone, wherever the visitor is
const TIME_ZONE = 'America/New_York'

/** The embedded calendar: a month grid, or a list of upcoming events (used on phones) */
export const embedUrl = (mode: 'MONTH' | 'AGENDA') =>
  `https://calendar.google.com/calendar/embed?${new URLSearchParams({
    src: CALENDAR_ID,
    ctz: TIME_ZONE,
    mode,
    showPrint: '0',
  })}`

/** Adds the chapter calendar to a visitor's own Google Calendar */
export const SUBSCRIBE_URL = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(CALENDAR_ID)}`
