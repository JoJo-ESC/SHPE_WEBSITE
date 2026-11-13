import { useState, type CSSProperties } from 'react'
import { Icon } from './Icon'
import { prefersMotion, useAutoplay, useLoop } from './useLoop'

// A photo without `photo` shows as a placeholder circle until the image arrives
export type CarouselPhoto = { label: string; photo?: string; alt: string }

/**
 * Circular photos with the label curved along the bottom, three across on
 * desktop. It slides forever in both directions (see useLoop) and moves on by
 * itself every few seconds.
 */
export function PhotoCarousel({ items, id }: { items: CarouselPhoto[]; id: string }) {
  const { copies, pos, animate, step, settle, swipe } = useLoop(items)
  const [playing] = useState(prefersMotion)
  const restartTimer = useAutoplay(step, playing)
  const go = (dir: 1 | -1) => {
    step(dir)
    restartTimer()
  }

  return (
    <div className="prev-carousel" data-reveal>
      <button className="prev-arrow" aria-label="Previous photos" onClick={() => go(-1)}>
        <Icon name="chevronLeft" size={26} />
      </button>
      <div className="prev-viewport" {...swipe}>
        <ul
          className={`prev-track ${animate ? 'is-animated' : ''}`}
          style={{ '--pos': pos } as CSSProperties}
          onTransitionEnd={settle}
          onTransitionCancel={settle}
        >
          {copies.map(({ item: e, copy, key }) => (
            <li key={key} aria-hidden={copy !== 1 || undefined}>
              <figure className={`prev-photo ${e.photo ? '' : 'is-placeholder'}`}>
                {e.photo ? (
                  <img src={e.photo} alt={copy === 1 ? e.alt : ''} draggable={false} />
                ) : (
                  <Icon name="image" size={40} className="prev-placeholder-icon" />
                )}
                <svg className="prev-label" viewBox="0 0 360 360" aria-hidden="true">
                  <path id={`arc-${id}-${key}`} d="M 14 180 A 166 166 0 0 0 346 180" fill="none" />
                  {/* dx re-centres the word, since letter-spacing also trails the last letter */}
                  <text className={e.label.length > 6 ? 'is-long' : undefined} dx={e.label.length > 6 ? 3.5 : 10}>
                    <textPath href={`#arc-${id}-${key}`} startOffset="50%" textAnchor="middle">
                      {e.label}
                    </textPath>
                  </text>
                </svg>
                {copy === 1 && <figcaption className="sr-only">{e.photo ? e.label : `${e.label} (photo coming soon)`}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      </div>
      <button className="prev-arrow" aria-label="Next photos" onClick={() => go(1)}>
        <Icon name="chevron" size={26} />
      </button>
    </div>
  )
}
