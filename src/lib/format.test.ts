import { describe, expect, it } from 'vitest'
import { versionCountLabel } from './format.ts'

describe('versionCountLabel', () => {
  it('uses the singular for exactly one', () => {
    expect(versionCountLabel(1)).toBe('1 version')
  })

  it('uses the plural otherwise', () => {
    expect(versionCountLabel(0)).toBe('0 versions')
    expect(versionCountLabel(8)).toBe('8 versions')
  })
})
