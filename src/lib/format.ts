/** "1 version" / "8 versions" */
export function versionCountLabel(count: number): string {
  return `${count} ${count === 1 ? 'version' : 'versions'}`
}
