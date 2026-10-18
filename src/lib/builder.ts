import type { Test, TestOptions } from '../types.ts'
import { PALETTE } from './palette.ts'

export const MAX_OPTIONS = 4

export interface BuilderInput {
  name: string
  headlines: string[]
  ctas: string[]
  colors: string[]
}

export type BuilderErrors = Partial<Record<'name' | 'headlines' | 'ctas' | 'colors', string>>

/** Trims every entry and drops the empty ones. */
export function cleanList(items: string[]): string[] {
  return items.map((item) => item.trim()).filter((item) => item !== '')
}

function hasDuplicates(items: string[]): boolean {
  return new Set(items.map((item) => item.toLowerCase())).size !== items.length
}

function checkTextList(items: string[], noun: string): string | undefined {
  const cleaned = cleanList(items)
  if (cleaned.length < 1) return `Add at least 1 ${noun}.`
  if (cleaned.length > MAX_OPTIONS) return `Use at most ${MAX_OPTIONS} ${noun}s.`
  if (hasDuplicates(cleaned)) return `Each ${noun} must be different.`
  return undefined
}

/** Returns an error message per invalid field. An empty object means the form is valid. */
export function validateBuilder(input: BuilderInput): BuilderErrors {
  const errors: BuilderErrors = {}
  if (input.name.trim() === '') errors.name = 'Give your test a name.'

  const headlines = checkTextList(input.headlines, 'headline')
  if (headlines) errors.headlines = headlines
  const ctas = checkTextList(input.ctas, 'button text')
  if (ctas) errors.ctas = ctas

  if (input.colors.length < 1) errors.colors = 'Pick at least 1 color.'
  else if (input.colors.length > MAX_OPTIONS) errors.colors = `Pick at most ${MAX_OPTIONS} colors.`
  else if (input.colors.some((c) => !PALETTE.some((p) => p.hex === c)))
    errors.colors = 'Choose colors from the palette.'

  return errors
}

/** Turns a valid form into a new draft test. */
export function buildTest(input: BuilderInput, id: string, now: Date = new Date()): Test {
  const options: TestOptions = {
    headlines: cleanList(input.headlines),
    ctas: cleanList(input.ctas),
    colors: [...input.colors],
  }
  return { id, name: input.name.trim(), status: 'draft', createdAt: now.toISOString(), options }
}
