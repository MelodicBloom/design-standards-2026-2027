/**
 * Motion System Microsite — Layout
 * Loads fonts, imports motion token CSS, sets page-level meta shell.
 * Fonts: Clash Display (display), Satoshi (body), JetBrains Mono (code)
 * All via next/font with display:swap and unicode-range subset.
 *
 * QA gates: P11, T6 (no FOUC — theme set server-side)
 */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'styles/motion-tokens.css'

/* Inter as fallback — Clash Display and Satoshi loaded via CSS @font-face
   with font-display:swap and unicode-range in global styles */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fallback',
})

export const metadata: Metadata = {
  title: 'Motion System — MelodicBloom Design Standards 2026–2027',
  description:
    'A complete, token-driven motion system. Every duration and easing is a named decision. Built by MelodicBloom.',
  openGraph: {
    title: 'Motion System — MelodicBloom',
    description:
      'A complete, token-driven motion system. Every duration and easing is a named decision.',
    url: 'https://melodicbloom.com/motion-system',
    siteName: 'MelodicBloom',
    images: [
      {
        url: '/og/motion-system-og.png',
        width: 1200,
        height: 630,
        alt: 'Motion System — MelodicBloom Design Standards',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motion System — MelodicBloom',
    description: 'A complete, token-driven motion system. Every duration and easing is a named decision.',
    images: ['/og/motion-system-og.png'],
  },
  metadataBase: new URL('https://melodicbloom.com'),
  alternates: {
    canonical: '/motion-system',
  },
}

export default function MotionSystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${inter.variable} min-h-screen bg-[var(--color-surface-base)] text-[var(--color-text-primary)]`}
      data-theme="dark"
    >
      {/* Skip to main content — QA gate A9 */}
      <a
        href="#main-content"
        className={
          'sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] ' +
          'focus:rounded focus:bg-[var(--color-brand-violet)] focus:px-4 focus:py-2 ' +
          'focus:text-sm focus:font-medium focus:text-white focus:outline-none'
        }
      >
        Skip to main content
      </a>
      {children}
    </div>
  )
}
