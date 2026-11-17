import { useEffect, useRef, useState } from 'react'
import ChapterBoxLanding from './ChapterBoxLanding.tsx'

interface MiniPreviewProps {
  headline: string
  cta: string
  color: string
}

const MAX_HEIGHT = 520

/** A shrunken, non-interactive copy of the landing page. Rendered at a real width, then scaled down. */
export default function MiniPreview({ headline, cta, color }: MiniPreviewProps) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ designWidth: 1024, scale: 0.35, innerHeight: 0 })

  useEffect(() => {
    const outerEl = outer.current
    const innerEl = inner.current
    if (!outerEl || !innerEl) return
    // Remove the copy from tab order and the accessibility tree: it is only a picture.
    innerEl.setAttribute('inert', '')
    function measure() {
      if (!outerEl || !innerEl) return
      // Match the real breakpoint so phones see the phone layout.
      const designWidth = window.innerWidth >= 640 ? 1024 : 375
      setSize({ designWidth, scale: outerEl.clientWidth / designWidth, innerHeight: innerEl.offsetHeight })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(outerEl)
    observer.observe(innerEl)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={outer}
      aria-hidden="true"
      className="w-full overflow-hidden rounded-xl border border-line bg-paper shadow-md"
      style={{ height: Math.min(size.innerHeight * size.scale, MAX_HEIGHT) }}
    >
      <div
        ref={inner}
        style={{ width: size.designWidth, transform: `scale(${size.scale})`, transformOrigin: 'top left' }}
      >
        <ChapterBoxLanding headline={headline} cta={cta} color={color} />
      </div>
    </div>
  )
}
