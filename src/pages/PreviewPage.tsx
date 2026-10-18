import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import ChapterBoxLanding from '../components/ChapterBoxLanding.tsx'
import { generateVariants } from '../lib/combinations.ts'
import { getTest } from '../lib/storage.ts'

type Width = 'desktop' | 'phone'

export default function PreviewPage() {
  const { id = '' } = useParams()
  const test = useMemo(() => getTest(id), [id])
  const variants = useMemo(() => (test ? generateVariants(test.id, test.options) : []), [test])
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState<Width>('desktop')

  if (!test || variants.length === 0) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p>We could not find that test.</p>
        <Link to="/" className="text-blue-800 underline">
          Back to all tests
        </Link>
      </main>
    )
  }

  const variant = variants[index]
  const go = (step: number) => setIndex((i) => (i + step + variants.length) % variants.length)
  const btn = 'rounded border border-stone-400 bg-white px-4 py-2 font-medium'

  return (
    <main className="mx-auto max-w-5xl p-6">
      <Link to="/" className="text-sm text-blue-800 underline">
        ← All tests
      </Link>
      <h1 className="mt-2 text-3xl font-bold">👀 Sneak Peek: {test.name}</h1>

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
        <div role="group" aria-label="Preview width" className="ml-auto flex gap-2">
          {(['desktop', 'phone'] as const).map((w) => (
            <button
              key={w}
              type="button"
              aria-pressed={width === w}
              onClick={() => setWidth(w)}
              className={`${btn} ${width === w ? 'bg-stone-900 text-white' : ''}`}
            >
              {w === 'desktop' ? '🖥️ Desktop' : '📱 Phone'}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`mx-auto mt-6 overflow-hidden rounded-xl border border-stone-300 shadow ${
          width === 'phone' ? 'max-w-[375px]' : 'w-full'
        }`}
      >
        <ChapterBoxLanding headline={variant.headline} cta={variant.cta} color={variant.color} />
      </div>
    </main>
  )
}
