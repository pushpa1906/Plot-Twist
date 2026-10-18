import { useEffect, useRef, type KeyboardEvent } from 'react'
import { MAX_OPTIONS } from '../lib/builder.ts'
import { decideRowKey } from '../lib/optionListKeys.ts'

interface OptionListEditorProps {
  label: string
  noun: string
  values: string[]
  error?: string
  onChange: (values: string[]) => void
}

/** A list of 1-4 text inputs with add/remove buttons and keyboard shortcuts. */
export default function OptionListEditor({ label, noun, values, error, onChange }: OptionListEditorProps) {
  const idBase = noun.replace(/\s+/g, '-')
  const errorId = `${idBase}-error`
  const hintId = `${idBase}-hint`
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  // Row to focus once React has rendered the change that created or moved it.
  const pendingFocus = useRef<{ index: number; toEnd: boolean } | null>(null)

  useEffect(() => {
    const pending = pendingFocus.current
    if (!pending) return
    pendingFocus.current = null
    const input = inputs.current[pending.index]
    if (!input) return
    input.focus()
    if (pending.toEnd) input.setSelectionRange(input.value.length, input.value.length)
  })

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number) {
    // Keep Enter/Backspace working normally while an input method editor is composing text.
    if (e.nativeEvent.isComposing) return
    // Leave Shift/Ctrl/Alt/Cmd combos (text selection, shortcuts) alone, except plain Enter below.
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
      if (e.key === 'Enter') e.preventDefault()
      return
    }
    const { preventDefault, action } = decideRowKey(e.key, index, values, MAX_OPTIONS)
    if (preventDefault) e.preventDefault()

    if (action.type === 'focus') {
      inputs.current[action.index]?.focus()
    } else if (action.type === 'add') {
      pendingFocus.current = { index: action.index + 1, toEnd: false }
      onChange([...values.slice(0, action.index + 1), '', ...values.slice(action.index + 1)])
    } else if (action.type === 'remove') {
      pendingFocus.current = { index: action.focusIndex, toEnd: true }
      onChange(values.filter((_, i) => i !== action.index))
    }
  }

  return (
    <fieldset>
      <legend className="font-semibold">{label}</legend>
      <div className="mt-2 space-y-2">
        {values.map((value, i) => (
          <div key={i} className="flex gap-2">
            <input
              ref={(el) => {
                inputs.current[i] = el
              }}
              aria-label={`${noun} ${i + 1}`}
              aria-describedby={error ? `${hintId} ${errorId}` : hintId}
              aria-invalid={error ? true : undefined}
              value={value}
              onChange={(e) => onChange(values.map((v, j) => (j === i ? e.target.value : v)))}
              onKeyDown={(e) => handleKeyDown(e, i)}
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
      <p id={hintId} className="mt-1 text-sm text-stone-700">
        Tip: Enter adds a row, ↑ ↓ move between rows
      </p>
      <button
        type="button"
        disabled={values.length >= MAX_OPTIONS}
        onClick={() => {
          pendingFocus.current = { index: values.length, toEnd: false }
          onChange([...values, ''])
        }}
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
