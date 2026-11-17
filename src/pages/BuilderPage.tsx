import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import ChapterSection from '../components/ChapterSection.tsx'
import MiniPreview from '../components/MiniPreview.tsx'
import OptionListEditor from '../components/OptionListEditor.tsx'
import PalettePicker from '../components/PalettePicker.tsx'
import { buildTest, cleanList, validateBuilder, type BuilderErrors } from '../lib/builder.ts'
import { versionEquation } from '../lib/format.ts'
import { saveTest } from '../lib/storage.ts'

// Shown in the live preview until the marketer has typed or picked something.
const PLACEHOLDER = { headline: 'Your headline appears here', cta: 'Your button', color: '#5b2a6b' }

export default function BuilderPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [headlines, setHeadlines] = useState<string[]>([''])
  const [ctas, setCtas] = useState<string[]>([''])
  const [colors, setColors] = useState<string[]>([])
  const [errors, setErrors] = useState<BuilderErrors>({})

  const headlineCount = cleanList(headlines).length
  const ctaCount = cleanList(ctas).length

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const input = { name, headlines, ctas, colors }
    const found = validateBuilder(input)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    const test = buildTest(input, crypto.randomUUID())
    saveTest(test)
    navigate(`/tests/${test.id}/preview`)
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6">
      <Link to="/" className="inline-flex min-h-11 items-center text-sm font-medium text-plum underline">
        ← All tests
      </Link>
      <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Mix &amp; Match Builder</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <ChapterSection number={1} title="Name it">
            <label htmlFor="test-name" className="text-sm text-ink-soft">
              Test name
            </label>
            <input
              id="test-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={errors.name ? true : undefined}
              className="mt-1 min-h-11 w-full rounded-lg border border-stone-500 bg-white px-3 py-2"
            />
            {errors.name && (
              <p role="alert" className="mt-1 text-sm text-red-700">
                {errors.name}
              </p>
            )}
          </ChapterSection>

          <ChapterSection number={2} title="Headlines">
            <OptionListEditor label="Add 1 to 4 headlines" noun="headline" values={headlines} error={errors.headlines} onChange={setHeadlines} />
          </ChapterSection>

          <ChapterSection number={3} title="Buttons">
            <OptionListEditor label="Add 1 to 4 button texts" noun="button text" values={ctas} error={errors.ctas} onChange={setCtas} />
          </ChapterSection>

          <ChapterSection number={4} title="Colors">
            <fieldset>
              <legend className="text-sm text-ink-soft">Pick 1 to 4 accent colors</legend>
              <div className="mt-2">
                <PalettePicker selected={colors} onChange={setColors} />
              </div>
              {errors.colors && (
                <p role="alert" className="mt-1 text-sm text-red-700">
                  {errors.colors}
                </p>
              )}
            </fieldset>
          </ChapterSection>

          <div className="flex flex-wrap items-center gap-4">
            <p
              aria-live="polite"
              className="rounded-full bg-plum-tint px-4 py-2 font-semibold text-plum-dark"
            >
              {versionEquation(headlineCount, ctaCount, colors.length)}
            </p>
            <button
              type="submit"
              className="min-h-12 rounded-full bg-plum px-8 font-semibold text-white hover:bg-plum-dark"
            >
              Create test
            </button>
          </div>
        </form>

        <aside aria-labelledby="live-preview-heading" className="lg:sticky lg:top-6">
          <h2 id="live-preview-heading" className="mb-3 text-xl font-bold">
            Live preview · Version A
          </h2>
          <MiniPreview
            headline={cleanList(headlines)[0] ?? PLACEHOLDER.headline}
            cta={cleanList(ctas)[0] ?? PLACEHOLDER.cta}
            color={colors[0] ?? PLACEHOLDER.color}
          />
        </aside>
      </div>
    </main>
  )
}
