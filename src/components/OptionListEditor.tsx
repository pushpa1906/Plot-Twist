import { MAX_OPTIONS } from '../lib/builder.ts'

interface OptionListEditorProps {
  label: string
  noun: string
  values: string[]
  error?: string
  onChange: (values: string[]) => void
}

/** A list of 1-4 text inputs with add/remove buttons. */
export default function OptionListEditor({ label, noun, values, error, onChange }: OptionListEditorProps) {
  const errorId = `${noun.replace(/\s+/g, '-')}-error`
  return (
    <fieldset>
      <legend className="font-semibold">{label}</legend>
      <div className="mt-2 space-y-2">
        {values.map((value, i) => (
          <div key={i} className="flex gap-2">
            <input
              aria-label={`${noun} ${i + 1}`}
              aria-describedby={error ? errorId : undefined}
              aria-invalid={error ? true : undefined}
              value={value}
              onChange={(e) => onChange(values.map((v, j) => (j === i ? e.target.value : v)))}
              className="min-w-0 flex-1 rounded border border-stone-400 bg-white px-3 py-2"
            />
            <button
              type="button"
              aria-label={`Remove ${noun} ${i + 1}`}
              disabled={values.length <= 1}
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="rounded border border-stone-400 px-3 disabled:opacity-40"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        disabled={values.length >= MAX_OPTIONS}
        onClick={() => onChange([...values, ''])}
        className="mt-2 text-sm font-medium text-blue-800 underline disabled:opacity-40"
      >
        + Add {noun}
      </button>
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </fieldset>
  )
}
