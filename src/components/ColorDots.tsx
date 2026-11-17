/** Small round swatches for the colors a test uses. Decorative, so hidden from screen readers. */
export default function ColorDots({ colors }: { colors: string[] }) {
  return (
    <span aria-hidden="true" className="flex gap-1">
      {colors.map((hex) => (
        <span key={hex} className="h-4 w-4 rounded-full border border-ink/20" style={{ backgroundColor: hex }} />
      ))}
    </span>
  )
}
