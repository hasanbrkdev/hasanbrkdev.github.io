import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { profile } from '../../content/profile'
import { WordsPullUpMultiStyle } from '../animations/WordsPullUpMultiStyle'
import { ScrollRevealText } from '../animations/ScrollRevealText'
import { StatNumber } from '../animations/StatNumber'
import { EASE_OUT } from '../animations/motion'

export function About() {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  const segments = profile.about.headingSegments.map((s) => ({
    text: s.text,
    className: s.serif
      ? 'font-serif italic tracking-normal text-amber [font-stretch:100%]'
      : 'text-cream',
  }))

  return (
    <section id="about" className="border-t border-cream/10 bg-night px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="type-eyebrow text-[10px] text-cream/50 sm:text-xs">{profile.about.label}</p>
        <div className="mt-6 max-w-3xl">
          <WordsPullUpMultiStyle
            segments={segments}
            className="type-display gap-x-[0.28em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          />
        </div>
        <ScrollRevealText
          text={profile.about.body}
          className="mt-12 max-w-2xl text-base leading-[1.7] text-cream sm:text-lg"
        />
        <div ref={statsRef} className="mt-16 flex flex-wrap gap-10 md:gap-16">
          {profile.stats.map((stat, i) => (
            <div key={stat.label} className="group relative pl-4">
              <motion.span
                aria-hidden
                className="absolute left-0 top-0 h-full w-px origin-top bg-cream/20 transition-colors group-hover:bg-amber/60"
                initial={{ scaleY: 0 }}
                animate={statsInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: i * 0.12 }}
              />
              <StatNumber
                value={stat.value}
                className="tnum font-serif text-3xl italic text-amber md:text-5xl"
              />
              <motion.p
                className="mt-2 max-w-[10rem] text-xs text-cream/50"
                initial={{ y: 8, opacity: 0 }}
                animate={statsInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.12 + 0.2 }}
              >
                {stat.label}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
