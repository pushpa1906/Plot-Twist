import { describe, expect, it } from 'vitest'
import { buildTest, cleanList, validateBuilder, type BuilderInput } from './builder.ts'

const valid: BuilderInput = {
  name: 'Spring test',
  headlines: ['Read more', 'Find your next book'],
  ctas: ['Join now'],
  colors: ['#7f1d1d', '#166534'],
}

describe('validateBuilder', () => {
  it('accepts a valid form', () => {
    expect(validateBuilder(valid)).toEqual({})
  })

  it('requires a name', () => {
    expect(validateBuilder({ ...valid, name: '   ' }).name).toBeDefined()
  })

  it('ignores blank entries when counting', () => {
    expect(validateBuilder({ ...valid, headlines: ['', '  '] }).headlines).toBeDefined()
    expect(validateBuilder({ ...valid, headlines: ['Hi', ''] })).toEqual({})
  })

  it('rejects more than 4 options', () => {
    const five = ['a', 'b', 'c', 'd', 'e']
    expect(validateBuilder({ ...valid, ctas: five }).ctas).toBeDefined()
    expect(validateBuilder({ ...valid, colors: Array(5).fill('#7f1d1d') }).colors).toBeDefined()
  })

  it('rejects duplicate text, ignoring case', () => {
    expect(validateBuilder({ ...valid, ctas: ['Join', 'join'] }).ctas).toBeDefined()
  })

  it('rejects colors outside the palette or none at all', () => {
    expect(validateBuilder({ ...valid, colors: ['#123456'] }).colors).toBeDefined()
    expect(validateBuilder({ ...valid, colors: [] }).colors).toBeDefined()
  })
})

describe('buildTest', () => {
  it('makes a trimmed draft test', () => {
    const test = buildTest({ ...valid, name: ' Spring ', headlines: [' Hi ', ''] }, 't1', new Date(0))
    expect(test).toMatchObject({ id: 't1', name: 'Spring', status: 'draft' })
    expect(test.options.headlines).toEqual(['Hi'])
    expect(test.createdAt).toBe('1970-01-01T00:00:00.000Z')
  })
})

describe('cleanList', () => {
  it('trims and removes empties', () => {
    expect(cleanList([' a ', '', '  '])).toEqual(['a'])
  })
})
