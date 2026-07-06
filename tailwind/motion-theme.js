/**
 * Tailwind v4 theme extension — Motion tokens
 * Maps all 9 motion tokens to CSS custom properties.
 * Import in tailwind.config.ts under theme.extend.
 *
 * Usage:
 *   import { motionTheme } from './tailwind/motion-theme'
 *   export default { theme: { extend: { ...motionTheme } } }
 *
 * Example classes:
 *   duration-motion-xl ease-organic-enter
 *   duration-motion-md ease-structured-ui
 */

export const motionTheme = {
  transitionDuration: {
    'motion-xxs': 'var(--motion-duration-xxs)',
    'motion-xs':  'var(--motion-duration-xs)',
    'motion-sm':  'var(--motion-duration-sm)',
    'motion-md':  'var(--motion-duration-md)',
    'motion-lg':  'var(--motion-duration-lg)',
    'motion-xl':  'var(--motion-duration-xl)',
  },
  transitionTimingFunction: {
    'organic-enter':  'var(--motion-ease-organic-enter)',
    'organic-accent': 'var(--motion-ease-organic-accent)',
    'structured-ui':  'var(--motion-ease-structured-ui)',
  },
  animationDuration: {
    'motion-xxs': 'var(--motion-duration-xxs)',
    'motion-xs':  'var(--motion-duration-xs)',
    'motion-sm':  'var(--motion-duration-sm)',
    'motion-md':  'var(--motion-duration-md)',
    'motion-lg':  'var(--motion-duration-lg)',
    'motion-xl':  'var(--motion-duration-xl)',
  },
  animationTimingFunction: {
    'organic-enter':  'var(--motion-ease-organic-enter)',
    'organic-accent': 'var(--motion-ease-organic-accent)',
    'structured-ui':  'var(--motion-ease-structured-ui)',
  },
}

export default motionTheme
