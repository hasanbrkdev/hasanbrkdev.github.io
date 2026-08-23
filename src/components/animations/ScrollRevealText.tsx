import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

interface ScrollRevealTextProps {
  text: string
  className?: string
}

// Each character fades from 0.2 to full opacity as it crosses the viewport,
// staggered by its position in the text.
export function ScrollRevealText({ text, className = '' }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })
  const chars = text.split('')

  return (
    <p ref={ref} className={className}>
      {chars.map((char, i) => (
        <AnimatedLetter
          key={i}
          char={char}
          progress={scrollYProgress}
          charProgress={i / chars.length}
        />
      ))}
    </p>
  )
}

function AnimatedLetter({
  char,
  progress,
  charProgress,
}: {
  char: string
  progress: MotionValue<number>
  charProgress: number
}) {
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1])
  return <motion.span style={{ opacity }}>{char}</motion.span>
}
