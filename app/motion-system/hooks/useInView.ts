/**
 * useInView
 * IntersectionObserver hook for scroll-triggered reveals.
 * Threshold: 0.15 (15% visible) — matches SPEC.md scroll trigger spec.
 * once: true disconnects the observer after first trigger (QA gate M7).
 *
 * QA gates: M6 (15-20% threshold), M7 (once-only for hero/manifesto)
 */
'use client'

import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  once?: boolean
}

export function useInView(
  options: UseInViewOptions = {}
): [React.RefObject<HTMLElement>, boolean] {
  const { threshold = 0.15, once = true } = options
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return [ref, inView]
}
