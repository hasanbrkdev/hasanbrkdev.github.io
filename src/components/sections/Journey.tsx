import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { GraduationCap, Compass, Handshake } from 'lucide-react'
import { profile } from '../../content/profile'
import { copy } from '../../content/copy'
import { WordsPullUpMultiStyle } from '../animations/WordsPullUpMultiStyle'
import { EASE_OUT } from '../animations/motion'

const KIND_STYLE = {
  education: { icon: GraduationCap, chip: 'bg-skyblue/15 text-skyblue' },
  work: { icon: Compass, chip: 'bg-gold/15 text-gold' },
  partnership: { icon: Handshake, chip: 'bg-amber/15 text-amber' },
} as const

export function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // Amber progress line scrubs with scroll through the timeline.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.4'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })

  return (
    <section
      id="journey"
      className="border-t border-cream/10 bg-night px-6 py-20 sm:px-10 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <p className="type-eyebrow text-[10px] text-cream/50 sm:text-xs">{copy.journey.label}</p>
        <div className="mt-6 max-w-2xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: copy.journey.line1, className: 'text-cream' },
              {
                text: copy.journey.line2,
                className: 'font-serif italic tracking-normal text-amber [font-stretch:100%]',
              },
            ]}
            className="type-display gap-x-[0.28em] text-2xl sm:text-3xl md:text-4xl"
          />
        </div>

        <div ref={ref} className="relative mt-12 max-w-3xl space-y-12 pl-8">
          {/* Track + scroll-scrubbed amber progress line */}
          <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-cream/10" />
          <motion.span
            aria-hidden
            className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-amber/70 to-amber/20"
            style={reduced ? undefined : { scaleY }}
          />
          {profile.journey.map((item) => {
            const { icon: Icon, chip } = KIND_STYLE[item.kind]
            return (
              <motion.div
                key={item.id}
                initial={{ x: -16, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
                className="group relative"
              >
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                  className="absolute -left-[3.15rem] block"
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-4 border-night transition-transform duration-300 group-hover:scale-110 ${chip}`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </motion.span>
                <p className="type-micro text-[10px] text-cream/40 sm:text-xs">{item.period}</p>
                <h3 className="type-title mt-1.5 text-lg text-cream transition-colors group-hover:text-amber md:text-xl">
                  {item.title}
                </h3>
                <p className="font-serif text-sm italic text-amber">{item.org}</p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/60">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
