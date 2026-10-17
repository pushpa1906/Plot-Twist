import { describe, expect, it } from 'vitest'
import { getTest, loadTests, saveTest } from './storage.ts'
import type { Test } from '../types.ts'

// Simple in-memory stand-in for localStorage
function fakeStore(initial?: string) {
  let value: string | null = initial ?? null
  return {
    getItem: () => value,
    setItem: (_key: string, v: string) => {
      value = v
    },
  }
}

const sample = (id: string, name = 'Spring test'): Test => ({
  id,
  name,
  status: 'draft',
  createdAt: '2026-01-01T00:00:00.000Z',
  options: { headlines: ['Hi'], ctas: ['Go'], colors: ['#166534'] },
})

describe('storage', () => {
  it('starts empty', () => {
    expect(loadTests(fakeStore())).toEqual([])
  })

  it('saves and finds a test by id', () => {
    const store = fakeStore()
    saveTest(sample('a'), store)
    saveTest(sample('b'), store)
    expect(loadTests(store)).toHaveLength(2)
    expect(getTest('b', store)?.id).toBe('b')
    expect(getTest('missing', store)).toBeUndefined()
  })

  it('replaces a test with the same id and keeps its position', () => {
    const store = fakeStore()
    saveTest(sample('a'), store)
    saveTest(sample('b'), store)
    saveTest(sample('a', 'Renamed'), store)
    const tests = loadTests(store)
    expect(tests.map((t) => t.id)).toEqual(['a', 'b'])
    expect(tests[0]?.name).toBe('Renamed')
  })

  it('returns an empty list for broken JSON', () => {
    expect(loadTests(fakeStore('{not json'))).toEqual([])
  })

  it('returns an empty list when the data is not a list', () => {
    expect(loadTests(fakeStore('{"a":1}'))).toEqual([])
  })

  it('skips entries with the wrong shape', () => {
    const raw = JSON.stringify([sample('ok'), { id: 'bad' }, null, 42])
    expect(loadTests(fakeStore(raw)).map((t) => t.id)).toEqual(['ok'])
  })
})
