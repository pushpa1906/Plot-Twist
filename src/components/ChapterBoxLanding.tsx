import { readableTextColor } from '../lib/contrast.ts'

interface ChapterBoxLandingProps {
  headline: string
  cta: string
  color: string
  /** Called when the button is clicked (used for click counting later). */
  onCtaClick?: () => void
}

const NAV_LINKS = ['Books', 'Gift a box', 'Sign in']

const PICKS = [
  { title: 'The Lantern Year', author: 'Mara Ellison', bg: '#2f4b7c', tilt: '-rotate-3' },
  { title: 'Salt & Cedar', author: 'Tomas Reyes', bg: '#a0462a', tilt: 'rotate-2' },
  { title: 'Quiet Orchards', author: 'Ines Okafor', bg: '#2e6b55', tilt: '-rotate-1' },
]

const STEPS = [
  { icon: '📖', title: 'Pick a book', text: 'Tell us what you love and choose from our monthly shortlist.' },
  { icon: '📦', title: 'We ship it', text: 'Your book arrives wrapped, with a bookmark and a small treat.' },
  { icon: '🔁', title: 'Read and repeat', text: 'Finish at your pace. Skip or cancel any month, no fuss.' },
]

// Stops links from navigating; the nav is for show in this demo.
const inert = (e: React.MouseEvent) => e.preventDefault()

/** The "Chapter Box" landing page. One variant = one headline, button text and accent color. */
export default function ChapterBoxLanding({ headline, cta, color, onCtaClick }: ChapterBoxLandingProps) {
  return (
    <div className="bg-paper font-sans text-ink">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 sm:px-6">
          <a href="#" onClick={inert} className="flex min-h-11 items-center gap-2 font-serif text-xl font-bold">
            <span aria-hidden="true" className="inline-block h-5 w-4 rounded-sm" style={{ backgroundColor: color }} />
            Chapter Box
          </a>
          <nav aria-label="Main">
            <ul className="flex items-center sm:gap-2">
              {NAV_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    onClick={inert}
                    className="flex min-h-11 items-center rounded-md px-2 text-sm font-medium text-ink-soft hover:text-ink hover:underline sm:px-3"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-paper-deep px-4 py-14 text-center sm:px-6 sm:py-20">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">{headline}</h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-ink-soft">
            A hand-picked book lands on your doorstep every month, with a bookmark and a cozy treat.
          </p>
          <button
            type="button"
            onClick={onCtaClick}
            className="mt-8 min-h-12 rounded-full px-8 text-lg font-semibold shadow-md motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
            style={{ backgroundColor: color, color: readableTextColor(color) }}
          >
            {cta}
          </button>
        </section>

        <section aria-labelledby="picks-heading" className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <h2 id="picks-heading" className="text-center text-3xl font-bold">
            This month's picks
          </h2>
          <ul className="mt-10 grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-3">
            {PICKS.map((book) => (
              <li
                key={book.title}
                className={`flex aspect-[2/3] w-44 flex-col justify-between rounded-r-lg rounded-l-sm p-4 text-left text-white shadow-xl border-l-8 border-black/25 motion-safe:transition-transform motion-safe:hover:rotate-0 ${book.tilt}`}
                style={{ backgroundColor: book.bg }}
              >
                <span aria-hidden="true" className="h-0.5 w-8 bg-white/70" />
                <div>
                  <p className="font-serif text-xl font-bold leading-tight">{book.title}</p>
                  <p className="mt-2 text-sm">{book.author}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="how-heading" className="bg-paper-deep px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 id="how-heading" className="text-center text-3xl font-bold">
              How it works
            </h2>
            <ol className="mt-10 grid gap-6 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <li key={step.title} className="rounded-2xl border border-line bg-paper p-6 text-center">
                  <span aria-hidden="true" className="text-3xl">
                    {step.icon}
                  </span>
                  <h3 className="mt-3 text-xl font-bold">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-ink-soft">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-4 py-8 text-center text-sm text-ink-soft sm:px-6">
        <p className="font-serif text-base font-bold text-ink">Chapter Box</p>
        <p className="mt-1">A made-up book subscription for demo purposes. © 2026</p>
      </footer>
    </div>
  )
}
