import { describe, expect, it } from 'vitest'
import { getNextIndex, isTextEntryTarget } from './keyboard.ts'

describe('getNextIndex', () => {
  it('moves with the arrows that match the orientation', () => {
    expect(getNextIndex('ArrowRight', 0, 3, 'horizontal')).toBe(1)
    expect(getNextIndex('ArrowLeft', 2, 3, 'horizontal')).toBe(1)
    expect(getNextIndex('ArrowDown', 0, 3, 'vertical')).toBe(1)
    expect(getNextIndex('ArrowUp', 2, 3, 'vertical')).toBe(1)
  })

  it('ignores arrows from the other axis', () => {
    expect(getNextIndex('ArrowDown', 0, 3, 'horizontal')).toBeNull()
    expect(getNextIndex('ArrowLeft', 1, 3, 'vertical')).toBeNull()
  })

  it('accepts all four arrows when orientation is both', () => {
    expect(getNextIndex('ArrowDown', 0, 3, 'both')).toBe(1)
    expect(getNextIndex('ArrowLeft', 1, 3, 'both')).toBe(0)
  })

  it('wraps around at the ends, or stays put when wrap is off', () => {
    expect(getNextIndex('ArrowRight', 2, 3, 'horizontal')).toBe(0)
    expect(getNextIndex('ArrowLeft', 0, 3, 'horizontal')).toBe(2)
    expect(getNextIndex('ArrowRight', 2, 3, 'horizontal', false)).toBe(2)
  })

  it('supports Home and End, and ignores other keys or empty lists', () => {
    expect(getNextIndex('Home', 2, 3, 'horizontal')).toBe(0)
    expect(getNextIndex('End', 0, 3, 'horizontal')).toBe(2)
    expect(getNextIndex('a', 0, 3, 'horizontal')).toBeNull()
    expect(getNextIndex('ArrowRight', 0, 0, 'horizontal')).toBeNull()
  })
})

describe('isTextEntryTarget', () => {
  it('is true for text fields, textareas, selects and editable content', () => {
    expect(isTextEntryTarget({ tagName: 'INPUT', type: 'text' } as unknown as EventTarget)).toBe(true)
    expect(isTextEntryTarget({ tagName: 'INPUT' } as unknown as EventTarget)).toBe(true)
    expect(isTextEntryTarget({ tagName: 'TEXTAREA' } as unknown as EventTarget)).toBe(true)
    expect(isTextEntryTarget({ tagName: 'SELECT' } as unknown as EventTarget)).toBe(true)
    expect(isTextEntryTarget({ tagName: 'DIV', isContentEditable: true } as unknown as EventTarget)).toBe(true)
  })

  it('is false for buttons, checkboxes, links and null', () => {
    expect(isTextEntryTarget({ tagName: 'BUTTON' } as unknown as EventTarget)).toBe(false)
    expect(isTextEntryTarget({ tagName: 'INPUT', type: 'checkbox' } as unknown as EventTarget)).toBe(false)
    expect(isTextEntryTarget({ tagName: 'A' } as unknown as EventTarget)).toBe(false)
    expect(isTextEntryTarget(null)).toBe(false)
  })
})
