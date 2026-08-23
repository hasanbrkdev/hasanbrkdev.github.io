import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export interface StyledSegment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: StyledSegment[]
  className?: string
  center?: boolean
}

const EASE = [0.16, 1, 0.3, 1] as const

export function WordsPullUpMultiStyle({
  segments,
  className = '',
  center = false,
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const words = segments.flatMap((segment) =>
    segment.text.split(' ').map((word) => ({ word, className: segment.className ?? '' })),
  )

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap ${center ? 'justify-center' : ''} ${className}`}
    >
      {words.map(({ word, className: wordClass }, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
          className={`inline-block ${wordClass}`}
        >
          {word}
          {i < words.length - 1 ? ' ' : null}
        </motion.span>
      ))}
    </div>
  )
}
