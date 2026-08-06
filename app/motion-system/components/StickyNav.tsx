/**
 * StickyNav
 * Sticky top nav with smooth-scroll anchors to all 6 sections.
 * Motion spec: xxs 120ms structured-ui (opacity only)
 * Reduced motion: instant (opacity transition collapses via CSS var)
 *
 * QA gates: M1, M2, M3, A3, A4
 */
'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

const NAV_LINKS = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Tag Matrix', href: '#tag-matrix' },
  { label: 'Token Explorer', href: '#token-explorer' },
  { label: 'Generator', href: '#generator' },
  { label: 'Get it', href: '#cta' },
]

export function StickyNav() {
  const reduced = useReducedMotion()

  return (
    <motion.header
      role="banner"
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-[var(--color-surface-base)]/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduced ? 0 : 0.12,   /* --motion-duration-xxs */
        ease: [0.4, 0, 0.2, 1],          /* --motion-ease-structured-ui */
      }}
    >
      <nav
        aria-label="Motion system sections"
        className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4"
      >
        <span
          className="font-display text-sm font-semibold tracking-tight text-[var(--color-text-primary)]"
          aria-label="Motion System by MelodicBloom"
        >
          Motion System
        </span>

        <ul className="flex items-center gap-6" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={
                  'text-xs font-medium text-[var(--color-text-secondary)] ' +
                  'transition-colors duration-[var(--motion-duration-xxs)] ease-[var(--motion-ease-structured-ui)] ' +
                  'hover:text-[var(--color-text-primary)] ' +
                  'focus-visible:rounded focus-visible:outline focus-visible:outline-2 ' +
                  'focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-violet)]'
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}
