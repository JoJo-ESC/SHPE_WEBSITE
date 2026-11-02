import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'

// Matches the strip's CSS transition, plus a little slack
const SLIDE_MS = 700

/**
 * State for a carousel that slides forever in both directions. Render the
 * items three times (`copies`) and slide the strip by `pos` items; after each
 * move the strip quietly jumps back into the middle copy, which looks identical.
 */
export function useLoop<T>(items: T[]) {
  const count = items.length
  const copies = [0, 1, 2].flatMap((copy) => items.map((item, index) => ({ item, index, copy, key: `${copy}-${index}` })))

  const [pos, setPos] = useState(count)
  const [animate, setAnimate] = useState(true)
  const sliding = useRef(false)
  const fallback = useRef<number | undefined>(undefined)
  const swipeX = useRef<number | null>(null)

  // Ends a move: back into the middle copy without animating
  const settle = useCallback(() => {
    window.clearTimeout(fallback.current)
    sliding.current = false
    setAnimate(false)
    setPos((p) => ((((p - count) % count) + count) % count) + count)
  }, [count])

  // Stable between renders, so an autoplay timer that depends on it keeps its rhythm
  const step = useCallback(
    (dir: 1 | -1) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setAnimate(false)
        setPos((p) => ((((p + dir - count) % count) + count) % count) + count)
        return
      }
      // One move at a time, so the strip never runs past the copies
      if (sliding.current) return
      sliding.current = true
      setAnimate(true)
      setPos((p) => p + dir)
      // In case the browser skips transitionend (a background tab, for one), settle anyway
      fallback.current = window.setTimeout(settle, SLIDE_MS)
    },
    [count, settle],
  )

  const onTransitionEnd = (e: { target: EventTarget; currentTarget: EventTarget }) => {
    if (e.target === e.currentTarget && sliding.current) settle()
  }

  const swipe = {
    onPointerDown: (e: PointerEvent) => (swipeX.current = e.clientX),
    onPointerUp: (e: PointerEvent) => {
      const dx = swipeX.current === null ? 0 : e.clientX - swipeX.current
      swipeX.current = null
      if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1)
    },
  }

  return { copies, pos, animate, step, settle: onTransitionEnd, swipe }
}

/** How long each slide shows before an autoplaying carousel moves on */
export const AUTOPLAY_MS = 6000

/**
 * Moves a useLoop carousel forward on a steady timer while `playing`. Call the
 * returned function after a manual move to restart the timer, so the chosen
 * slide gets its full time.
 */
export function useAutoplay(step: (dir: 1 | -1) => void, playing: boolean) {
  const [nudged, setNudged] = useState(0)

  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => step(1), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [playing, step, nudged])

  return useCallback(() => setNudged((n) => n + 1), [])
}

/** Autoplay is off for visitors who turn off motion */
export const prefersMotion = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
