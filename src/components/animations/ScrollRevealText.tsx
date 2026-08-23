import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'

interface ScrollRevealTextProps {
  text: string
  className?: string
}

// Each word fades from 0.2 to full opacity as it crosses the viewport,
// staggered by its position in the text. Word-based (not char-based) to
// keep the span count low (~55 instead of ~340).
export function ScrollRevealText({ text, className = '' }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })
  const words = text.split(' ')

  if (reduced) {
    return <p className={className}>{text}</p>
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <AnimatedWord
          key={i}
          word={word}
          last={i === words.length - 1}
          progress={scrollYProgress}
          wordProgress={i / words.length}
        />
      ))}
    </p>
  )
}

function AnimatedWord({
  word,
  last,
  progress,
  wordProgress,
}: {
  word: string
  last: boolean
  progress: MotionValue<number>
  wordProgress: number
}) {
  const opacity = useTransform(progress, [wordProgress - 0.1, wordProgress + 0.05], [0.2, 1])
  return (
    <motion.span style={{ opacity }}>
      {word}
      {last ? null : ' '}
    </motion.span>
  )
}
