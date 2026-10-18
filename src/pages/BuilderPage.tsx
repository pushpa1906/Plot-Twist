import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import OptionListEditor from '../components/OptionListEditor.tsx'
import PalettePicker from '../components/PalettePicker.tsx'
import { buildTest, cleanList, validateBuilder, type BuilderErrors } from '../lib/builder.ts'
import { saveTest } from '../lib/storage.ts'

export default function BuilderPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [headlines, setHeadlines] = useState<string[]>([''])
  const [ctas, setCtas] = useState<string[]>([''])
  const [colors, setColors] = useState<string[]>([])
  const [errors, setErrors] = useState<BuilderErrors>({})

  const variantCount = cleanList(headlines).length * cleanList(ctas).length * colors.length

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
    <main className="mx-auto max-w-2xl p-6">
      <Link to="/" className="text-sm text-blue-800 underline">
        ← All tests
      </Link>
      <h1 className="mt-2 text-3xl font-bold">🧩 Mix &amp; Match Builder</h1>
      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-6">
        <div>
          <label htmlFor="test-name" className="font-semibold">
            Test name
          </label>
          <input
            id="test-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            className="mt-2 w-full rounded border border-stone-400 bg-white px-3 py-2"
          />
          {errors.name && (
            <p role="alert" className="mt-1 text-sm text-red-700">
              {errors.name}
            </p>
          )}
        </div>
        <OptionListEditor label="Headlines (1-4)" noun="headline" values={headlines} error={errors.headlines} onChange={setHeadlines} />
        <OptionListEditor label="Button texts (1-4)" noun="button text" values={ctas} error={errors.ctas} onChange={setCtas} />
        <fieldset>
          <legend className="font-semibold">Accent colors (pick 1-4)</legend>
          <div className="mt-2">
            <PalettePicker selected={colors} onChange={setColors} />
          </div>
          {errors.colors && (
            <p role="alert" className="mt-1 text-sm text-red-700">
              {errors.colors}
            </p>
          )}
        </fieldset>
        <p aria-live="polite" className="text-stone-700">
          This will create <strong>{variantCount}</strong> {variantCount === 1 ? 'version' : 'versions'}.
        </p>
        <button type="submit" className="rounded bg-stone-900 px-5 py-2 font-semibold text-white">
          Create test
        </button>
      </form>
    </main>
  )
}
