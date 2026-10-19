import { useEffect } from 'react'

/**
 * Fades in every element marked `data-reveal` the first time it scrolls into
 * view (styles live under "Scroll reveal" in styles.css). Call it once in a
 * page component. `data-reveal="stagger"` fades the element's children in one
 * after another instead, using each child's `--i` for the delay.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not([data-revealed])')
    const show = (el: Element) => el.setAttribute('data-revealed', '')

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(show)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          show(entry.target)
          io.unobserve(entry.target)
        }
      },
      // Start once the top edge is 40px onto the screen
      { rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
