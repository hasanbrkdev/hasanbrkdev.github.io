import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EASE_OUT } from './motion'

export interface StyledSegment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: StyledSegment[]
  className?: string
  center?: boolean
}

export function WordsPullUpMultiStyle({
  segments,
  className = '',
  center = false,
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const words = segments.flatMap((segment) =>
    segment.text.split(' ').map((word) => ({ word, className: segment.className ?? '' })),
  )

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap ${center ? 'justify-center' : ''} ${className}`}
      style={{ perspective: 600 }}
    >
      {words.map(({ word, className: wordClass }, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ y: '0.45em', opacity: 0, rotateX: -30 }}
          animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
          transition={{ delay: i * 0.05, duration: 0.55, ease: EASE_OUT }}
          className={`inline-block ${wordClass}`}
          style={{ transformOrigin: '50% 100%', backfaceVisibility: 'hidden' }}
        >
          {word}
          {i < words.length - 1 ? ' ' : null}
        </motion.span>
      ))}
    </div>
  )
}
