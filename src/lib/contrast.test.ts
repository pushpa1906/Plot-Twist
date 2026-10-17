import { describe, expect, it } from 'vitest'
import { contrastRatio, readableTextColor } from './contrast.ts'
import { PALETTE } from './palette.ts'

describe('contrastRatio', () => {
  it('is 21 for black on white and 1 for the same color', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0)
    expect(contrastRatio('#336699', '#336699')).toBeCloseTo(1, 5)
  })
})

describe('readableTextColor', () => {
  it('uses white on dark colors and black on light colors', () => {
    expect(readableTextColor('#1e3a8a')).toBe('#ffffff')
    expect(readableTextColor('#fbbf24')).toBe('#000000')
  })

  it('reaches WCAG AA (4.5:1) for every palette color', () => {
    for (const { hex } of PALETTE) {
      expect(contrastRatio(hex, readableTextColor(hex))).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('accepts 3-digit hex', () => {
    expect(readableTextColor('#fff')).toBe('#000000')
  })
})
