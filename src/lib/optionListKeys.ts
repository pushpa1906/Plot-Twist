export type RowAction =
  | { type: 'none' }
  /** Move focus to row `index`; `toEnd` puts the cursor after its text. */
  | { type: 'focus'; index: number; toEnd?: boolean }
  /** Insert an empty row after `index` and focus it. */
  | { type: 'add'; index: number }
  /** Remove row `index`, then focus row `focusIndex` with the cursor at its end. */
  | { type: 'remove'; index: number; focusIndex: number }

export interface RowKeyDecision {
  /** True when the browser's default (e.g. submitting the form, moving the cursor) must be stopped. */
  preventDefault: boolean
  action: RowAction
}

const NOTHING: RowKeyDecision = { preventDefault: false, action: { type: 'none' } }

/**
 * What to do when `key` is pressed in row `index` of an option list.
 * Left/Right are never handled so the text cursor keeps working.
 */
export function decideRowKey(key: string, index: number, values: string[], max: number): RowKeyDecision {
  const last = values.length - 1

  switch (key) {
    case 'ArrowDown':
      return index < last
        ? { preventDefault: true, action: { type: 'focus', index: index + 1 } }
        : { preventDefault: true, action: { type: 'none' } }
    case 'ArrowUp':
      return index > 0
        ? { preventDefault: true, action: { type: 'focus', index: index - 1 } }
        : { preventDefault: true, action: { type: 'none' } }
    case 'Enter':
      // Always stop Enter so it never submits the form.
      if (values.length < max) return { preventDefault: true, action: { type: 'add', index } }
      return index < last
        ? { preventDefault: true, action: { type: 'focus', index: index + 1 } }
        : { preventDefault: true, action: { type: 'none' } }
    case 'Backspace':
      if (values[index] !== '' || values.length <= 1) return NOTHING
      return {
        preventDefault: true,
        action: { type: 'remove', index, focusIndex: Math.max(index - 1, 0) },
      }
    default:
      return NOTHING
  }
}
