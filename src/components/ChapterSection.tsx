import type { ReactNode } from 'react'

interface ChapterSectionProps {
  number: number
  title: string
  children: ReactNode
}

/** A numbered, chapter-style block of the builder form. */
export default function ChapterSection({ number, title, children }: ChapterSectionProps) {
  const headingId = `chapter-${number}`
  return (
    <section aria-labelledby={headingId} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <h2 id={headingId} className="flex items-center gap-3 text-xl font-bold">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-plum text-base text-white"
        >
          {number}
        </span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}
