import type { TestStatus } from '../types.ts'

const STYLES: Record<TestStatus, string> = {
  draft: 'bg-paper-deep text-ink-soft border-line',
  running: 'bg-green-100 text-green-900 border-green-300',
  paused: 'bg-amber-100 text-amber-900 border-amber-300',
  ended: 'bg-plum-tint text-plum-dark border-plum/30',
}

export default function StatusBadge({ status }: { status: TestStatus }) {
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STYLES[status]}`}>
      {status}
    </span>
  )
}
