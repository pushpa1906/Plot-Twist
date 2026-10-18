import { describe, expect, it } from 'vitest'
import { decideRowKey } from './optionListKeys.ts'

const MAX = 4

describe('decideRowKey arrows', () => {
  it('moves down and up between rows', () => {
    expect(decideRowKey('ArrowDown', 0, ['a', 'b'], MAX).action).toEqual({ type: 'focus', index: 1 })
    expect(decideRowKey('ArrowUp', 1, ['a', 'b'], MAX).action).toEqual({ type: 'focus', index: 0 })
  })

  it('does nothing at the ends', () => {
    expect(decideRowKey('ArrowDown', 1, ['a', 'b'], MAX).action).toEqual({ type: 'none' })
    expect(decideRowKey('ArrowUp', 0, ['a', 'b'], MAX).action).toEqual({ type: 'none' })
  })

  it('leaves Left and Right to the text cursor', () => {
    for (const key of ['ArrowLeft', 'ArrowRight']) {
      expect(decideRowKey(key, 0, ['a', 'b'], MAX)).toEqual({ preventDefault: false, action: { type: 'none' } })
    }
  })
})

describe('decideRowKey Enter', () => {
  it('adds a row below when under the max', () => {
    expect(decideRowKey('Enter', 0, ['a', 'b'], MAX)).toEqual({
      preventDefault: true,
      action: { type: 'add', index: 0 },
    })
  })

  it('at the max moves to the next row, or does nothing on the last one', () => {
    const four = ['a', 'b', 'c', 'd']
    expect(decideRowKey('Enter', 1, four, MAX).action).toEqual({ type: 'focus', index: 2 })
    expect(decideRowKey('Enter', 3, four, MAX)).toEqual({ preventDefault: true, action: { type: 'none' } })
  })
})

describe('decideRowKey Backspace', () => {
  it('removes an empty row and focuses the previous one', () => {
    expect(decideRowKey('Backspace', 2, ['a', 'b', ''], MAX)).toEqual({
      preventDefault: true,
      action: { type: 'remove', index: 2, focusIndex: 1 },
    })
  })

  it('removing the first row focuses the new first row', () => {
    expect(decideRowKey('Backspace', 0, ['', 'b'], MAX).action).toEqual({
      type: 'remove',
      index: 0,
      focusIndex: 0,
    })
  })

  it('keeps normal behavior when the row has text or is the only row', () => {
    expect(decideRowKey('Backspace', 1, ['a', 'b'], MAX).preventDefault).toBe(false)
    expect(decideRowKey('Backspace', 0, [''], MAX).action).toEqual({ type: 'none' })
  })
})

describe('decideRowKey other keys', () => {
  it('ignores them', () => {
    expect(decideRowKey('a', 0, ['x'], MAX)).toEqual({ preventDefault: false, action: { type: 'none' } })
  })
})
