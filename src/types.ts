export type TestStatus = 'draft' | 'running' | 'paused' | 'ended'

export interface TestOptions {
  headlines: string[]
  ctas: string[]
  /** Hex colors, e.g. "#7c2d12" */
  colors: string[]
}

export interface Test {
  id: string
  name: string
  status: TestStatus
  /** ISO date string */
  createdAt: string
  options: TestOptions
}

export interface Variant {
  id: string
  testId: string
  /** Short label: A, B, C... */
  label: string
  headline: string
  cta: string
  color: string
}

export interface TestEvent {
  id: string
  testId: string
  variantId: string
  type: 'view' | 'click'
  /** ISO date string */
  createdAt: string
}
