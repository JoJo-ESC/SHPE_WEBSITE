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
| Calendar events | The chapter Google Calendar (see below) |
| Monthly event flyers | `src/data/events.ts`, images in `public/images/calendar/` |
| Resources page list | `src/data/resources.ts` |
| Colors, fonts and all styling | `src/styles.css` (tokens at the top) |
| Photos | `public/images/` |

Most yearly updates only need the files in `src/data/`. Search for `TODO` to find links that still need real URLs.

To add an officer headshot, put the image in `public/images/` and set `photo: '/images/name.jpg'` on that officer in `eboard.ts`. Add `linkedin: 'https://…'` there as well to show the LinkedIn button.

## Forms

There is no server yet, so the mailing-list form opens the visitor's email app with the message already filled in. To collect signups automatically, point the form handler in `src/components/ui.tsx` (`SignupForm`) at a Google Form or Formspree endpoint.

## Calendar

The Home and Events pages embed the chapter's public Google Calendar, "SHPE-RPI Events". An event added there shows on the site right away, with no rebuild. The calendar's ID is in `src/data/googleCalendar.ts`.

- **Show event names.** In the calendar's settings, under *Access permissions for events*, check *Make available to public* and choose *See all event details*. With *See only free/busy*, the site shows every event as "busy".
- **Let other officers add events.** Under *Share with specific people*, give them *Make changes to events*.
- **Use a different calendar.** Copy its *Calendar ID* from *Integrate calendar* in its settings (it looks like `abc123@group.calendar.google.com`) and paste it into `CALENDAR_ID`.

Each month's event flyers show under the calendar. To add a month, put the images in `public/images/calendar/` and add the month to the end of `FLYERS` in `src/data/events.ts`. The newest month is the one shown.

## Deploying

Upload the contents of `dist/`. The site uses clean URLs (`/events`, `/eboard`…), so the server must send unknown paths to `index.html`. `public/.htaccess` does this on Apache.

## License

The code is released under the [MIT License](LICENSE). The SHPE name and logos, the RPI name, sponsor logos and the member photos in `public/images/` belong to their owners and aren't covered by it.
