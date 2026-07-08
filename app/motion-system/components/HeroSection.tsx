/**
 * HeroSection
 * Motion spec: xl 700ms organic-enter, 80ms stagger, max 4 items
 * Reduced motion: opacity fade only (translateY zeroed)
 * Scroll trigger: page load (no IntersectionObserver needed)
 *
 * QA gates: M1, M2, M3, M4, M5, CN1
 */
'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

const STAGGER_DELAY_MS = 80   /* --motion-duration hero stagger budget */
const DURATION_MS = 700        /* --motion-duration-xl */
const DURATION_S = DURATION_MS / 1000

const EASE_ORGANIC_ENTER = [0.22, 1, 0.36, 1] as const

const HERO_ITEMS = [
  {
    type: 'eyebrow',
    text: 'MelodicBloom · Design Standards 2026–2027',
  },
  {
    type: 'heading',
    text: 'Motion with intention.',
  },
  {
    type: 'subheading',
    text: 'A complete, token-driven motion system. Every duration and easing is a named decision — not a guess.',
  },
  {
    type: 'cta',
    text: 'Explore the system ↓',
  },
]

export function HeroSection() {
  const reduced = useReducedMotion()

  const getVariants = (index: number) => ({
    hidden: {
      opacity: 0,
      y: reduced ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0.01 : DURATION_S,
        ease: reduced ? 'linear' : EASE_ORGANIC_ENTER,
        delay: reduced ? 0 : (index * STAGGER_DELAY_MS) / 1000,
      },
    },
  })

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[92svh] flex-col items-start justify-center px-6 py-[var(--space-24)] mx-auto max-w-[1200px]"
    >
      {/* Skip link target */}
      <div id="main-content" tabIndex={-1} className="sr-only" />

      {HERO_ITEMS.map((item, i) => (
        <motion.div
          key={item.type}
          variants={getVariants(i)}
          initial="hidden"
          animate="visible"
          className="mb-4 last:mb-0"
        >
          {item.type === 'eyebrow' && (
            <p className="font-label text-xs font-medium uppercase tracking-widest text-[var(--color-brand-violet)]">
              {item.text}
            </p>
          )}
          {item.type === 'heading' && (
            <h1
              id="hero-heading"
              className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.0] tracking-tight text-[var(--color-text-primary)]"
            >
              {item.text}
            </h1>
          )}
          {item.type === 'subheading' && (
            <p className="mt-2 max-w-[560px] text-[clamp(0.9rem,1.1vw,1.1rem)] leading-[1.6] text-[var(--color-text-secondary)]">
              {item.text}
            </p>
          )}
          {item.type === 'cta' && (
            <a
              href="#manifesto"
              className={
                'mt-6 inline-block text-sm font-medium text-[var(--color-brand-violet)] ' +
                'transition-colors duration-[var(--motion-duration-xs)] ease-[var(--motion-ease-organic-accent)] ' +
                'hover:text-[var(--color-brand-coral)] ' +
                'focus-visible:rounded focus-visible:outline focus-visible:outline-2 ' +
                'focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-violet)]'
              }
            >
              {item.text}
            </a>
          )}
        </motion.div>
      ))}
    </section>
  )
}
