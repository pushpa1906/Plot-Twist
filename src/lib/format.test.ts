import { describe, expect, it } from 'vitest'
import { versionCountLabel, versionEquation } from './format.ts'

describe('versionCountLabel', () => {
  it('uses the singular for exactly one', () => {
    expect(versionCountLabel(1)).toBe('1 version')
  })

  it('uses the plural otherwise', () => {
    expect(versionCountLabel(0)).toBe('0 versions')
    expect(versionCountLabel(8)).toBe('8 versions')
  })
})

describe('versionEquation', () => {
  it('shows the multiplication and the total', () => {
    expect(versionEquation(2, 2, 2)).toBe('2 × 2 × 2 = 8 versions')
    expect(versionEquation(1, 1, 1)).toBe('1 × 1 × 1 = 1 version')
    expect(versionEquation(0, 1, 3)).toBe('0 × 1 × 3 = 0 versions')
  })
})
