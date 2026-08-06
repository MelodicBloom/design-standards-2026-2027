/**
 * Motion System Microsite — Page
 * SSG. Sections assembled in order per SPEC.md.
 * Phase 1: Hero + Manifesto + StickyNav
 * Phase 2–4 sections (TagMatrix, TokenExplorer, Generator, CTA) are
 * stubbed with placeholder divs until their respective phases land.
 *
 * QA gate: P12 (SSG, no runtime data fetching)
 */
import { StickyNav } from './components/StickyNav'
import { HeroSection } from './components/HeroSection'
import { ManifestoSection } from './components/ManifestoSection'

export const dynamic = 'force-static'

export default function MotionSystemPage() {
  return (
    <>
      <StickyNav />
      <main id="main" role="main">
        <HeroSection />
        <ManifestoSection />

        {/* Phase 2 — TagMatrixSection */}
        <section
          id="tag-matrix"
          aria-label="Tag matrix — coming in Phase 2"
          className="mx-auto max-w-[1200px] px-6 py-[var(--space-20)] text-[var(--color-text-muted)]"
        >
          <p className="text-sm">Tag Matrix — Phase 2</p>
        </section>

        {/* Phase 3 — TokenExplorerSection */}
        <section
          id="token-explorer"
          aria-label="Token explorer — coming in Phase 3"
          className="mx-auto max-w-[1200px] px-6 py-[var(--space-20)] text-[var(--color-text-muted)]"
        >
          <p className="text-sm">Token Explorer — Phase 3</p>
        </section>

        {/* Phase 3 — MotionTokenGenerator */}
        <section
          id="generator"
          aria-label="Motion token generator — coming in Phase 3"
          className="mx-auto max-w-[1200px] px-6 py-[var(--space-20)] text-[var(--color-text-muted)]"
        >
          <p className="text-sm">Motion Token Generator — Phase 3</p>
        </section>

        {/* Phase 4 — CTASection */}
        <section
          id="cta"
          aria-label="Get the system — coming in Phase 4"
          className="mx-auto max-w-[1200px] px-6 py-[var(--space-20)] text-[var(--color-text-muted)]"
        >
          <p className="text-sm">CTA — Phase 4</p>
        </section>
      </main>
    </>
  )
}
