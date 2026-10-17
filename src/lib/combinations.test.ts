import { describe, expect, it } from 'vitest'
import { generateVariants, indexToLabel } from './combinations.ts'

const opts = (h: number, c: number, col: number) => ({
  headlines: Array.from({ length: h }, (_, i) => `Headline ${i + 1}`),
  ctas: Array.from({ length: c }, (_, i) => `Button ${i + 1}`),
  colors: Array.from({ length: col }, (_, i) => `#00000${i}`),
})

describe('indexToLabel', () => {
  it('counts A to Z, then AA, AB', () => {
    expect(indexToLabel(0)).toBe('A')
    expect(indexToLabel(25)).toBe('Z')
    expect(indexToLabel(26)).toBe('AA')
    expect(indexToLabel(27)).toBe('AB')
    expect(indexToLabel(51)).toBe('AZ')
    expect(indexToLabel(52)).toBe('BA')
  })
})

describe('generateVariants', () => {
  it('makes 8 variants for 2 x 2 x 2', () => {
    expect(generateVariants('t1', opts(2, 2, 2))).toHaveLength(8)
  })

  it('makes 1 variant for 1 x 1 x 1', () => {
    const variants = generateVariants('t1', opts(1, 1, 1))
    expect(variants).toHaveLength(1)
    expect(variants[0]?.label).toBe('A')
  })

  it('makes 64 variants for 4 x 4 x 4 with labels up to BL', () => {
    const variants = generateVariants('t1', opts(4, 4, 4))
    expect(variants).toHaveLength(64)
    expect(variants[63]?.label).toBe('BL')
  })

  it('labels in order and gives every variant a unique id', () => {
    const variants = generateVariants('t1', opts(2, 2, 2))
    expect(variants.map((v) => v.label)).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])
    expect(new Set(variants.map((v) => v.id)).size).toBe(8)
    expect(variants.every((v) => v.testId === 't1')).toBe(true)
  })

  it('covers every unique mix exactly once', () => {
    const variants = generateVariants('t1', opts(2, 3, 2))
    const mixes = new Set(variants.map((v) => `${v.headline}|${v.cta}|${v.color}`))
    expect(mixes.size).toBe(12)
  })

  it('is stable: same input gives the same output', () => {
    expect(generateVariants('t1', opts(2, 2, 2))).toEqual(generateVariants('t1', opts(2, 2, 2)))
  })
})
