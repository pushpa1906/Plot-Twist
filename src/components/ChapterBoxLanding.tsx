import { readableTextColor } from '../lib/contrast.ts'

interface ChapterBoxLandingProps {
  headline: string
  cta: string
  color: string
  /** Called when the button is clicked (used for click counting later). */
  onCtaClick?: () => void
}

/** The "Chapter Box" landing page. One variant = one headline, button text and accent color. */
export default function ChapterBoxLanding({ headline, cta, color, onCtaClick }: ChapterBoxLandingProps) {
  return (
    <div className="bg-amber-50 text-stone-900">
      <header className="flex items-center gap-2 border-b border-stone-200 px-6 py-4">
        <span aria-hidden="true" className="inline-block h-5 w-4 rounded-sm" style={{ backgroundColor: color }} />
        <span className="font-serif text-lg font-bold">Chapter Box</span>
      </header>
      <main className="px-6 py-12 text-center">
        <h1 className="mx-auto max-w-xl font-serif text-3xl font-bold leading-tight sm:text-4xl">{headline}</h1>
        <p className="mx-auto mt-4 max-w-md text-stone-700">
          A hand-picked book lands on your doorstep every month, with a bookmark and a cozy treat.
        </p>
        <button
          type="button"
          onClick={onCtaClick}
          className="mt-8 rounded-full px-8 py-3 text-lg font-semibold shadow"
          style={{ backgroundColor: color, color: readableTextColor(color) }}
        >
          {cta}
        </button>
      </main>
      <ul className="grid gap-4 px-6 pb-12 text-center text-sm text-stone-700 sm:grid-cols-3">
        <li className="rounded-lg bg-white p-4 shadow-sm">📚 New book every month</li>
        <li className="rounded-lg bg-white p-4 shadow-sm">🔖 Skip or cancel anytime</li>
        <li className="rounded-lg bg-white p-4 shadow-sm">🎁 Free bookmark in every box</li>
      </ul>
    </div>
  )
}
