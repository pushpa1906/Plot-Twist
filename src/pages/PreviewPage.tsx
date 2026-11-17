import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Link, useParams } from 'react-router'
import ChapterBoxLanding from '../components/ChapterBoxLanding.tsx'
import { useRovingFocus } from '../hooks/useRovingFocus.ts'
import { generateVariants } from '../lib/combinations.ts'
import { readableTextColor } from '../lib/contrast.ts'
import { getNextIndex, isTextEntryTarget } from '../lib/keyboard.ts'
import { getTest } from '../lib/storage.ts'

const WIDTHS = ['desktop', 'phone'] as const
type Width = (typeof WIDTHS)[number]

export default function PreviewPage() {
  const { id = '' } = useParams()
  const test = useMemo(() => getTest(id), [id])
  const variants = useMemo(() => (test ? generateVariants(test.id, test.options) : []), [test])
  const [index, setIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [width, setWidth] = useState<Width>('desktop')
  // Radio group: arrow keys move focus and select, as in the WAI-ARIA radio pattern.
  const { getItemProps } = useRovingFocus<HTMLButtonElement>({
    count: WIDTHS.length,
    orientation: 'horizontal',
    onMove: (i) => setWidth(WIDTHS[i]),
  })

  const count = variants.length
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Skip typing, shortcuts (Alt+Left = browser back) and keys a widget already handled.
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
      if (isTextEntryTarget(e.target) || count === 0) return
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + count) % count)
      else if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % count)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [count])

  if (!test || variants.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-lg">We could not find that test.</p>
        <Link to="/" className="inline-flex min-h-11 items-center text-plum underline">
          Back to all tests
        </Link>
      </main>
    )
  }

  const variant = variants[index]
  const go = (step: number) => setIndex((i) => (i + step + variants.length) % variants.length)
  const btn =
    'min-h-11 rounded-full border border-stone-500 bg-white px-4 font-medium hover:bg-plum-tint'

  // Version tabs: the selected tab is the single tab stop; arrows, Home and End select and focus.
  function onTabKeyDown(e: ReactKeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
    const next = getNextIndex(e.key, i, count, 'horizontal')
    if (next === null) return
    e.preventDefault()
    setIndex(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6">
      <Link to="/" className="inline-flex min-h-11 items-center text-sm font-medium text-plum underline">
        ← All tests
      </Link>
      <h2 className="mt-1 break-words text-3xl font-bold">Sneak Peek: {test.name}</h2>

      <div
        role="tablist"
        aria-label="Versions"
        className="mt-5 flex flex-wrap items-end gap-1.5 border-b-4 border-line pb-0"
      >
        {variants.map((v, i) => {
          const selected = i === index
          return (
            <button
              key={v.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`version-tab-${i}`}
              aria-selected={selected}
              aria-controls="version-panel"
              aria-label={`Version ${v.label}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={`flex w-11 items-center justify-center rounded-t-md border-x-2 border-t-2 border-black/30 font-serif text-lg font-bold motion-safe:transition-all ${
                selected ? 'h-16 shadow-md' : 'h-12 opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: v.color, color: readableTextColor(v.color) }}
            >
              {v.label}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" className={btn} onClick={() => go(-1)} aria-label="Previous version">
          ←
        </button>
        <p aria-live="polite" className="font-semibold">
          Version {variant.label} ({index + 1} of {variants.length})
        </p>
        <button type="button" className={btn} onClick={() => go(1)} aria-label="Next version">
          →
        </button>
        <div role="radiogroup" aria-label="Preview width" className="flex gap-2 sm:ml-auto">
          {WIDTHS.map((w, i) => {
            const roving = getItemProps(i)
            return (
              <button
                key={w}
                type="button"
                role="radio"
                aria-checked={width === w}
                {...roving}
                onClick={() => {
                  roving.onClick()
                  setWidth(w)
                }}
                className={`${btn} ${width === w ? '!border-plum !bg-plum text-white hover:!bg-plum-dark' : ''}`}
              >
                {w === 'desktop' ? '🖥️ Desktop' : '📱 Phone'}
              </button>
            )
          })}
        </div>
      </div>
      <p className="mt-2 text-sm text-ink-soft">Tip: use ← → to switch versions</p>

      <div
        role="tabpanel"
        id="version-panel"
        aria-labelledby={`version-tab-${index}`}
        className={`mx-auto mt-6 overflow-hidden rounded-xl border border-line shadow-lg ${
          width === 'phone' ? 'max-w-[375px]' : 'w-full'
        }`}
      >
        <ChapterBoxLanding headline={variant.headline} cta={variant.cta} color={variant.color} />
      </div>
    </div>
  )
}
