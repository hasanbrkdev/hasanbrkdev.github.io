import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { EASE_OUT } from './motion'

interface StatNumberProps {
  value: string
  className?: string
}

/**
 * Counts up from 0 to the numeric part of `value` when scrolled into view.
 * Non-numeric suffixes ("+", "%", …) are preserved. Reduced motion renders
 * the final value immediately.
 */
export function StatNumber({ value, className = '' }: StatNumberProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()

  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''

  const [display, setDisplay] = useState(reduced || target === null ? value : `0${suffix}`)

  useEffect(() => {
    if (!inView || target === null) return
    if (reduced) {
      setDisplay(value)
      return
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, target, suffix, value, reduced])

  return (
    <p ref={ref} className={className}>
      {display}
    </p>
  )
}
