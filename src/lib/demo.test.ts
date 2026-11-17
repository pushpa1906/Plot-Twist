import { describe, expect, it } from 'vitest'
import { validateBuilder } from './builder.ts'
import { generateVariants } from './combinations.ts'
import { createDemoTest, DEMO_INPUT } from './demo.ts'

describe('demo test', () => {
  it('is a valid builder input', () => {
    expect(validateBuilder(DEMO_INPUT)).toEqual({})
  })

  it('makes 8 versions', () => {
    const test = createDemoTest('demo-1')
    expect(generateVariants(test.id, test.options)).toHaveLength(8)
  })
})
