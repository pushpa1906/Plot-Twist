/** "1 version" / "8 versions" */
export function versionCountLabel(count: number): string {
  return `${count} ${count === 1 ? 'version' : 'versions'}`
}

/** "2 × 2 × 2 = 8 versions" */
export function versionEquation(headlines: number, ctas: number, colors: number): string {
  return `${headlines} × ${ctas} × ${colors} = ${versionCountLabel(headlines * ctas * colors)}`
}
