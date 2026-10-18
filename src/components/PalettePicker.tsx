import { useRovingFocus } from '../hooks/useRovingFocus.ts'
import { MAX_OPTIONS } from '../lib/builder.ts'
import { PALETTE } from '../lib/palette.ts'
import { readableTextColor } from '../lib/contrast.ts'

interface PalettePickerProps {
  selected: string[]
  onChange: (colors: string[]) => void
}

export default function PalettePicker({ selected, onChange }: PalettePickerProps) {
  const { getItemProps } = useRovingFocus<HTMLButtonElement>({
    count: PALETTE.length,
    orientation: 'both',
  })

  function toggle(hex: string) {
    if (selected.includes(hex)) onChange(selected.filter((c) => c !== hex))
    else if (selected.length < MAX_OPTIONS) onChange([...selected, hex])
  }

  return (
    <div role="group" aria-label="Accent colors" className="flex flex-wrap gap-3">
      {PALETTE.map(({ name, hex }, index) => {
        const isOn = selected.includes(hex)
        // aria-disabled (not disabled) so a full palette can still be reached with the arrow keys
        const full = !isOn && selected.length >= MAX_OPTIONS
        const roving = getItemProps(index)
        return (
          <button
            key={hex}
            type="button"
            aria-pressed={isOn}
            aria-disabled={full || undefined}
            {...roving}
            onClick={() => {
              roving.onClick()
              toggle(hex)
            }}
            className={`flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-medium ${
              full ? 'opacity-40' : ''
            } ${isOn ? 'border-stone-900' : 'border-transparent'}`}
            style={{ backgroundColor: hex, color: readableTextColor(hex) }}
          >
            <span aria-hidden="true">{isOn ? '✓' : '+'}</span>
            {name}
          </button>
        )
      })}
    </div>
  )
}
