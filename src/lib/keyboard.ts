export type Orientation = 'horizontal' | 'vertical' | 'both'

// Input types where arrow keys do not edit text, so we may still handle them.
const NON_TEXT_INPUT_TYPES = ['button', 'checkbox', 'radio', 'submit', 'reset', 'range', 'color']

interface MaybeElement {
  tagName?: string
  type?: string
  isContentEditable?: boolean
}

/** True when the key press comes from somewhere the user is typing (arrow keys belong to it). */
export function isTextEntryTarget(target: EventTarget | null): boolean {
  if (typeof target !== 'object' || target === null) return false
  const el = target as MaybeElement
  if (el.isContentEditable) return true
  const tag = el.tagName?.toUpperCase()
  if (tag === 'TEXTAREA' || tag === 'SELECT') return true
  if (tag === 'INPUT') return !NON_TEXT_INPUT_TYPES.includes((el.type ?? 'text').toLowerCase())
  return false
}

/**
 * Where focus should go after a key press in a list of `count` items, or null when the key
 * is not a navigation key. Home/End jump to the ends; arrows wrap around unless `wrap` is false.
 */
export function getNextIndex(
  key: string,
  current: number,
  count: number,
  orientation: Orientation,
  wrap = true,
): number | null {
  if (count <= 0) return null
  if (key === 'Home') return 0
  if (key === 'End') return count - 1

  const goesBack =
    (orientation !== 'vertical' && key === 'ArrowLeft') ||
    (orientation !== 'horizontal' && key === 'ArrowUp')
  const goesForward =
    (orientation !== 'vertical' && key === 'ArrowRight') ||
    (orientation !== 'horizontal' && key === 'ArrowDown')
  if (!goesBack && !goesForward) return null

  const target = current + (goesForward ? 1 : -1)
  if (target >= 0 && target < count) return target
  return wrap ? (target + count) % count : current
}
