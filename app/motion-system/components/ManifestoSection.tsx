/**
 * ManifestoSection
 * Motion spec: xl 700ms organic-enter, 120ms stagger
 * Scroll trigger: 15% viewport (useInView, once)
 * Reduced motion: opacity fade only (translateY zeroed)
 *
 * QA gates: M1, M2, M3, M4, M5, M6, M7, CN6
 */
'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useInView } from '../hooks/useInView'

const STAGGER_MS = 120
const DURATION_S = 0.7  /* --motion-duration-xl */
const EASE_ORGANIC_ENTER = [0.22, 1, 0.36, 1] as const

const MANIFESTO_LINES = [
  {
    type: 'label',
    text: 'The philosophy',
  },
  {
    type: 'heading',
    text: 'Beautiful Imperfection.',
  },
  {
    type: 'body',
    text: 'Perfect motion is invisible. It never announces itself. It arrives at exactly the right moment, with exactly the right weight, and disappears before you notice it was there.',
  },
  {
    type: 'body',
    text: 'This system is built on that idea. Every duration is a named decision. Every easing has a role. Nothing moves without a reason — and nothing stays still when movement would serve the person looking at it.',
  },
  {
    type: 'body',
    text: 'The Death of Perfect is the beginning of motion that actually works.',
  },
]

export function ManifestoSection() {
  const reduced = useReducedMotion()
  const [ref, inView] = useInView({ threshold: 0.15, once: true })

  const getVariants = (index: number) => ({
    hidden: {
      opacity: 0,
      y: reduced ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0.01 : DURATION_S,
        ease: reduced ? 'linear' : EASE_ORGANIC_ENTER,
        delay: reduced ? 0 : (index * STAGGER_MS) / 1000,
      },
    },
  })

  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-heading"
      ref={ref as React.RefObject<HTMLElement>}
      className="mx-auto max-w-[1200px] px-6 py-[var(--space-20)]"
    >
      <div className="max-w-[680px]">
        {MANIFESTO_LINES.map((line, i) => (
          <motion.div
            key={`${line.type}-${i}`}
            variants={getVariants(i)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="mb-5 last:mb-0"
          >
            {line.type === 'label' && (
              <p className="font-label text-xs font-medium uppercase tracking-widest text-[var(--color-brand-gold)]">
                {line.text}
              </p>
            )}
            {line.type === 'heading' && (
              <h2
                id="manifesto-heading"
                className="mt-2 font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-[var(--color-text-primary)]"
              >
                {line.text}
              </h2>
            )}
            {line.type === 'body' && (
              <p className="mt-4 text-[clamp(0.9rem,1.1vw,1.1rem)] leading-[1.6] text-[var(--color-text-secondary)]">
                {line.text}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
