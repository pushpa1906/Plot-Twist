import type { Test } from '../types.ts'
import { buildTest, type BuilderInput } from './builder.ts'

// 2 headlines x 2 buttons x 2 colors = 8 versions
export const DEMO_INPUT: BuilderInput = {
  name: 'Demo: Chapter Box homepage',
  headlines: ['Your next favorite book, delivered', 'Read more. Stress less.'],
  ctas: ['Start my box', "See this month's picks"],
  colors: ['#6b21a8', '#0f766e'],
}

/** A ready-made sample test so new users can try the app in one click. */
export function createDemoTest(id: string, now: Date = new Date()): Test {
  return buildTest(DEMO_INPUT, id, now)
}
