# SHPE-Rensselaer website

The redesigned site for [shpe.rpi.edu](https://shpe.rpi.edu), built with React, TypeScript and Vite. It has no backend: everything is static.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs static files to dist/
```

## Where things live

| What | File |
| --- | --- |
| Links, emails, Google Forms, PDFs, socials | `src/data/site.ts` |
| Eboard officers and committees | `src/data/eboard.ts` |
| Monthly calendar events | Google Calendar (see below), or `src/data/events.ts` until it's connected |
| Resources page list | `src/data/resources.ts` |
| Colors, fonts and all styling | `src/styles.css` (tokens at the top) |
| Photos | `public/images/` |

Most yearly updates only need the files in `src/data/`. Search for `TODO` to find links that still need real URLs.

To add an officer headshot, put the image in `public/images/` and set `photo: '/images/name.jpg'` on that officer in `eboard.ts`. Add `linkedin: 'https://…'` there as well to show the LinkedIn button.

## Forms

There is no server yet, so the mailing-list form opens the visitor's email app with the message already filled in. To collect signups automatically, point the form handler in `src/components/ui.tsx` (`SignupForm`) at a Google Form or Formspree endpoint.

## Live calendar

The calendars on the Home and Events pages can read straight from a public Google Calendar, so adding an event there updates the site within a minute of a page reload. No rebuild is needed. Until it's set up, they show the months typed into `src/data/events.ts`.

One-time setup:

1. **Make the calendar.** In the chapter's Google account, create a calendar just for member events (for example "SHPE-RPI Events"). Under *Share with specific people*, give other officers *Make changes to events* so they can add events too.
2. **Make it public.** In that calendar's settings, under *Access permissions for events*, check *Make available to public* and choose *See all event details*.
3. **Copy its ID.** Under *Integrate calendar*, copy the *Calendar ID* (it looks like `abc123@group.calendar.google.com`).
4. **Get an API key.** In the [Google Cloud console](https://console.cloud.google.com/), create a project, enable the *Google Calendar API*, then go to *APIs & Services → Credentials → Create credentials → API key*. Edit the key:
   - *Application restrictions*: **Websites**, adding `https://jojo-esc.github.io/*`, `http://localhost:5173/*` and the final domain (for example `https://shpe.rpi.edu/*`).
   - *API restrictions*: **Restrict key** to the Google Calendar API only.

   The key ends up in the site's code, which is normal for a read-only key on a public calendar. The restrictions above stop anyone else from using it. The Calendar API is free at this level of use.
5. **Add both values.**
   - Local development: create `.env.local` (git ignores it) from `.env.example` and restart `npm run dev`.
   - Live site: in GitHub, go to *Settings → Secrets and variables → Actions → Variables* and add `VITE_GCAL_ID` and `VITE_GCAL_KEY`. The next deploy picks them up.

Once it's connected, the Events page opens on the current month and can go to any month, and its button becomes *Add to Google Calendar*.

Tips for events:
- Keep titles short (about 20 characters) so they fit in a day square. "GBM 3" and "Study Jam" work well.
- Give events start and end times; the site shows them like "6:30 - 9 PM" in Troy time.
- Make multi-day things (career fair, breaks) *all-day* events. They show as a banner across the days.
- A day with three or more events shows the first one and "+2 more"; phones and screen readers get the full list.

## Deploying

Upload the contents of `dist/`. The site uses clean URLs (`/events`, `/eboard`…), so the server must send unknown paths to `index.html`. `public/.htaccess` does this on Apache.

## License

The code is released under the [MIT License](LICENSE). The SHPE name and logos, the RPI name, sponsor logos and the member photos in `public/images/` belong to their owners and aren't covered by it.
