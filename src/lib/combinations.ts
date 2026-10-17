import type { TestOptions, Variant } from '../types.ts'

/** 0 -> A, 25 -> Z, 26 -> AA, 27 -> AB ... (like spreadsheet columns) */
export function indexToLabel(index: number): string {
  let label = ''
  let n = index
  while (n >= 0) {
    label = String.fromCharCode(65 + (n % 26)) + label
    n = Math.floor(n / 26) - 1
  }
  return label
}

/** Builds every headline x button x color mix, labeled A, B, C... */
export function generateVariants(testId: string, options: TestOptions): Variant[] {
  const variants: Variant[] = []
  for (const headline of options.headlines) {
    for (const cta of options.ctas) {
      for (const color of options.colors) {
        const label = indexToLabel(variants.length)
        variants.push({ id: `${testId}-${label}`, testId, label, headline, cta, color })
      }
    }
  }
  return variants
}
