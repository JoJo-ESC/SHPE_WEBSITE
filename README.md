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
| Monthly calendar events | `src/data/events.ts` |
| Resources page list | `src/data/resources.ts` |
| Colors, fonts and all styling | `src/styles.css` (tokens at the top) |
| Photos | `public/images/` |

Most yearly updates only need the files in `src/data/`. Search for `TODO` to find links that still need real URLs.

To add an officer headshot, put the image in `public/images/` and set `photo: '/images/name.jpg'` on that officer in `eboard.ts`. Add `linkedin: 'https://…'` there as well to show the LinkedIn button.

## Forms

There is no server yet, so the mailing-list and contact forms open the visitor's email app with the message already filled in. To collect signups automatically, point the form handlers in `src/components/ui.tsx` (`SignupForm`) and `src/pages/Contact.tsx` at a Google Form or Formspree endpoint.

## Deploying

Upload the contents of `dist/`. The site uses clean URLs (`/events`, `/eboard`…), so the server must send unknown paths to `index.html`. `public/.htaccess` does this on Apache.

## License

The code is released under the [MIT License](LICENSE). The SHPE name and logos, the RPI name, sponsor logos and the member photos in `public/images/` belong to their owners and aren't covered by it.
