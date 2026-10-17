import type { Test, TestStatus } from '../types.ts'

const STORAGE_KEY = 'plot-twist:tests'
const STATUSES: readonly TestStatus[] = ['draft', 'running', 'paused', 'ended']

// Lets tests pass a fake storage; the app uses the browser's localStorage.
type KeyValueStore = Pick<Storage, 'getItem' | 'setItem'>

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isTest(value: unknown): value is Test {
  if (typeof value !== 'object' || value === null) return false
  const t = value as Record<string, unknown>
  const options = t.options as Record<string, unknown> | null | undefined
  return (
    typeof t.id === 'string' &&
    typeof t.name === 'string' &&
    typeof t.createdAt === 'string' &&
    STATUSES.includes(t.status as TestStatus) &&
    typeof options === 'object' &&
    options !== null &&
    isStringArray(options.headlines) &&
    isStringArray(options.ctas) &&
    isStringArray(options.colors)
  )
}

/** All saved tests. Bad or missing data gives an empty list instead of crashing. */
export function loadTests(store: KeyValueStore = localStorage): Test[] {
  try {
    const raw = store.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isTest) : []
  } catch {
    return []
  }
}

export function getTest(id: string, store: KeyValueStore = localStorage): Test | undefined {
  return loadTests(store).find((test) => test.id === id)
}

/** Adds a new test, or replaces the one with the same id. */
export function saveTest(test: Test, store: KeyValueStore = localStorage): void {
  const tests = loadTests(store)
  const exists = tests.some((t) => t.id === test.id)
  const updated = exists ? tests.map((t) => (t.id === test.id ? test : t)) : [...tests, test]
  store.setItem(STORAGE_KEY, JSON.stringify(updated))
}
