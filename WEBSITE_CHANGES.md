# Website Changes

Planned updates to the SHPE-Rensselaer website. Every checklist item below is done. The only work left is adding the real Resources files and forms once they're ready (the "Add later" column in section 6).

## 1. Eboard: move officer emails

- [x] Show each officer's email below their major and grad date, instead of on top of their photo.

**Where:** `OfficerCard` in `src/pages/Eboard.tsx`. Styles are under `.officer-mail` in `src/styles.css`.

**Note:** The same card appears in the Committees section with its email hidden. Keep it hidden there unless we decide otherwise.

## 2. Overview: 5 Pillars of SHPE section

- [x] Rename the existing pillars slideshow from "How we develop our members" to "5 Pillars of SHPE". The slideshow itself stays the same.

**Where:** `Pillars` in `src/pages/MemberSHPE.tsx`

## 3. Outreach Weekend: title description

- [x] Mention high school students from NYC and Westchester in the description under the page title.
- [x] Include the 2026 days: Friday, March 20 - Sunday, March 22.
- [x] Keep the "Next up: spring 2027" section as it is. It already says dates, registration and host applications are coming soon.

**Where:** The hero section of `src/pages/OutreachWeekend.tsx`

**Final copy:**

> A free three-day weekend at RPI, held Friday, March 20 - Sunday, March 22, 2026, where high school students from NYC and Westchester explored STEM through college-level challenges, professor workshops and leadership activities.

## 4. Professional Development: National Convention

- [x] Update the location to Indianapolis, Indiana.
- [x] Update the dates to October 28-31.
- [x] Update the attendance from 48 to 35.
- [x] Rename "National Conference" to "National Convention" in the card's name, title and description.

**Where:** The `CONFERENCES` list in `src/pages/ProfessionalDevelopment.tsx`

**Final copy:**

> The SHPE National Convention takes place every fall. This year it was in Indianapolis, Indiana, from October 28 to 31.

## 5. Home

### Sponsor link

- [x] Make the GlobalFoundries logo link to the company website (https://gf.com).

**Where:** `Supporters` in `src/pages/Home.tsx`

### Sign-up form

- [x] Add `2031` and `Prospective student` to the class year options.

**Where:** `SignupForm` in `src/components/ui.tsx`

### Chapter history

- [x] Mention when SHPE-RPI was founded.
- [x] Remove "Two student chapters followed right away" from the "Since 1974" tab and say when RPI joined instead.

**Where:** `ABOUT_TABS` in `src/pages/Home.tsx`

**Final copy:**

> SHPE-Rensselaer was founded at RPI in 1983 and carries that same mission today.

## 6. Resources

### Links and documents

The page already has a card for each of these. For now, all eight cards stay on the page and link to nothing (`#`), until the real files and forms are ready.

| Item | Change now | Add later |
| --- | --- | --- |
| Corporate Package | None, already `#` | PDF |
| Constitution | None, already `#` | PDF |
| Member Calendar (Aug-Nov) | Change card title, already `#` | PDF |
| Current Outreach Weekend Form: Registration | Remove 2026 link, set to `#` | Current link |
| Current Outreach Weekend Form: Host | Remove 2026 link, set to `#` | Current link |
| Resume Form | None, already `#` | Google Form link |
| Reimbursement Form | None, already `#` | Google Form link |
| Committee Application | None, already `#` | Google Form link |

- [x] Set the two Outreach Weekend form links to `#`.
- [x] Change the tag on those two cards from "Google Form" to "Coming soon".
- [x] Update the Member Calendar card to say Aug-Nov.
- [x] Update the Home page line "September is out now" to match.

**Where:** Links are in `FORMS` and `DOCS` in `src/data/site.ts`. Cards are in `src/data/resources.ts`. The Home line is in `NextStrip` in `src/pages/Home.tsx`.

### Page header

- [x] Replace the grey header background with `public/images/gbm.jpg`, with a dark overlay so the text stays readable. This photo isn't in any page's hero section.
- [x] Make the slogan the page headline: **Everything the familia needs, all in one place.**
- [x] Move the current title, "Important Links, Documents, Social Media", to a smaller line below the slogan.

**Where:** `.res-hero` in `src/styles.css` and the header in `src/pages/Resources.tsx`
