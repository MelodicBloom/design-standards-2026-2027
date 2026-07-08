/**
 * useReducedMotion
 * Wraps Framer Motion's useReducedMotion and returns a plain boolean.
 * Use at the root of every animated component.
 *
 * QA gate: M4 — prefers-reduced-motion collapses all motion
 */
'use client'

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false
}
