import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router'
import ColorDots from '../components/ColorDots.tsx'
import StatusBadge from '../components/StatusBadge.tsx'
import { useRovingFocus } from '../hooks/useRovingFocus.ts'
import { generateVariants } from '../lib/combinations.ts'
import { createDemoTest } from '../lib/demo.ts'
import { versionCountLabel } from '../lib/format.ts'
import { loadTests, saveTest } from '../lib/storage.ts'

const STEPS = [
  { icon: '🧩', title: 'Mix your ideas', text: 'Add a few headlines, buttons and colors.' },
  { icon: '👀', title: 'Preview every version', text: 'We build every combination as a real page.' },
  { icon: '👑', title: 'Pick the winner', text: 'See which version your readers love most.' },
]

const primaryBtn =
  'inline-flex min-h-12 items-center justify-center rounded-full bg-plum px-6 font-semibold text-white hover:bg-plum-dark'
const secondaryBtn =
  'inline-flex min-h-12 items-center justify-center rounded-full border-2 border-plum px-6 font-semibold text-plum hover:bg-plum-tint'

export default function TestListPage() {
  const navigate = useNavigate()
  const tests = useMemo(() => loadTests(), [])
  // Each card's "Sneak Peek" link is the roving item: Up/Down move between cards, Enter opens it.
  const { getItemProps } = useRovingFocus<HTMLAnchorElement>({ count: tests.length, orientation: 'vertical' })

  function tryDemo() {
    const test = createDemoTest(crypto.randomUUID())
    saveTest(test)
    navigate(`/tests/${test.id}/preview`)
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
      <section className="py-12 text-center sm:py-16">
        <h1 className="mx-auto max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          Find out which version your readers love.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft">
          Test headlines, buttons and colors on a landing page, and let the numbers pick the winner.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/tests/new" className={primaryBtn}>
            + New test
          </Link>
          <button type="button" onClick={tryDemo} className={secondaryBtn}>
            Try a demo
          </button>
        </div>
      </section>

      <section aria-labelledby="how-heading">
        <h2 id="how-heading" className="sr-only">
          How it works
        </h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-line bg-paper-deep p-5">
              <span aria-hidden="true" className="text-2xl">
                {step.icon}
              </span>
              <h3 className="mt-2 text-lg font-bold">
                <span className="text-plum">{i + 1}.</span> {step.title}
              </h3>
              <p className="mt-1 text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="tests-heading" className="mt-12">
        <h2 id="tests-heading" className="text-2xl font-bold">
          Your tests
        </h2>
        {tests.length === 0 ? (
          <div className="mt-4 rounded-2xl border-2 border-dashed border-line p-8 text-center">
            <p aria-hidden="true" className="text-4xl">
              📚
            </p>
            <p className="mt-2 text-lg font-semibold">Your shelf is empty</p>
            <p className="mt-1 text-ink-soft">Create your first test, or try the demo to see how it works.</p>
          </div>
        ) : (
          <>
            <p className="mt-1 text-sm text-ink-soft">Tip: use ↑ ↓ to move between tests, Enter to open.</p>
            <ul className="mt-4 space-y-3">
              {tests.map((test, index) => (
                <li
                  key={test.id}
                  className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-line bg-white p-4 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-lg font-bold">{test.name}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-soft">
                      <StatusBadge status={test.status} />
                      <span>{versionCountLabel(generateVariants(test.id, test.options).length)}</span>
                      <ColorDots colors={test.options.colors} />
                    </div>
                  </div>
                  <Link
                    to={`/tests/${test.id}/preview`}
                    aria-label={`Sneak Peek: ${test.name}`}
                    className={secondaryBtn}
                    {...getItemProps(index)}
                  >
                    Sneak Peek
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  )
}
