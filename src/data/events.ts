import { asset } from './site'

// Monthly event flyers (the images from the member calendar PDF). The newest month
// here shows under the calendar on the Home and Events pages. Files go in
// public/images/calendar/; add each new month at the end.
export type Flyer = { src: string; alt: string }
export const FLYERS: { year: number; month: number; pages: Flyer[] }[] = [
  {
    year: 2026,
    month: 9, // October
    pages: [
      { src: asset('images/calendar/2026-10-1.png'), alt: 'SHPE-RPI October 2026 events flyer for October 1 to 17' },
      { src: asset('images/calendar/2026-10-2.png'), alt: 'SHPE-RPI October 2026 events flyer for October 19 to 31' },
    ],
  },
]
export const LATEST_FLYERS = FLYERS.at(-1)

// "Previous Events" carousel on the Events page. `label` curves along the bottom of the photo.
export const PAST_EVENTS: { label: string; photo: string; alt: string }[] = [
  { label: 'BBQ', photo: asset('images/img-9903_orig.jpg'), alt: 'Members grilling at the chapter BBQ' },
  { label: 'Event', photo: asset('images/img-9801_orig.jpg'), alt: 'Members hanging out in a student lounge' }, // TODO: event name
  { label: 'Event', photo: asset('images/cooking.jpg'), alt: 'A member frying food at a chapter social' }, // TODO: event name
  { label: 'GBM', photo: asset('images/img-0165_orig.jpg'), alt: 'The Eboard in front of the SHPE banner at a general body meeting' },
  { label: 'Event', photo: asset('images/img-0493_orig.jpg'), alt: 'Members holding flags from across Latin America' }, // TODO: event name
]
