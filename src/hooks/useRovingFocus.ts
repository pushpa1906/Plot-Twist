import { useRef, useState, type KeyboardEvent } from 'react'
import { getNextIndex, isTextEntryTarget, type Orientation } from '../lib/keyboard.ts'

interface RovingFocusOptions {
  count: number
  orientation: Orientation
  /** Called after arrow keys move focus (radio groups use this to also select). */
  onMove?: (index: number) => void
}

/**
 * Roving tabindex (WAI-ARIA Authoring Practices): only one item is a tab stop,
 * and arrow keys move focus between items. Spread getItemProps(i) onto each item.
 */
export function useRovingFocus<T extends HTMLElement>({ count, orientation, onMove }: RovingFocusOptions) {
  const [activeIndex, setActiveIndex] = useState(0)
  const items = useRef<(T | null)[]>([])
  const tabStop = Math.min(activeIndex, Math.max(count - 1, 0))

  function getItemProps(index: number) {
    return {
      ref: (el: T | null) => {
        items.current[index] = el
      },
      tabIndex: index === tabStop ? 0 : -1,
      onFocus: () => setActiveIndex(index),
      onClick: () => setActiveIndex(index),
      onKeyDown: (e: KeyboardEvent<T>) => {
        if (isTextEntryTarget(e.target) || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        const next = getNextIndex(e.key, index, count, orientation)
        if (next === null) return
        e.preventDefault()
        items.current[next]?.focus()
        onMove?.(next)
      },
    }
  }

  return { getItemProps }
}
