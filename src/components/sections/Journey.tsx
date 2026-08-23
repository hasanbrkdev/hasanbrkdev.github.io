import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Compass, Handshake } from 'lucide-react'
import { profile } from '../../content/profile'
import { copy } from '../../content/copy'
import { WordsPullUpMultiStyle } from '../animations/WordsPullUpMultiStyle'

const KIND_STYLE = {
  education: { icon: GraduationCap, chip: 'bg-skyblue/15 text-skyblue' },
  work: { icon: Compass, chip: 'bg-gold/15 text-gold' },
  partnership: { icon: Handshake, chip: 'bg-amber/15 text-amber' },
} as const

const EASE = [0.22, 1, 0.36, 1] as const

export function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="journey"
      className="border-t border-cream/10 bg-night px-6 py-20 sm:px-10 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-[10px] uppercase tracking-[0.25em] text-cream/50 sm:text-xs">
          {copy.journey.label}
        </p>
        <div className="mt-6 max-w-2xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: copy.journey.line1, className: 'text-cream' },
              { text: copy.journey.line2, className: 'font-serif italic text-amber' },
            ]}
            className="gap-x-[0.28em] text-2xl font-light sm:text-3xl md:text-4xl"
          />
        </div>

        <div ref={ref} className="relative mt-14 space-y-12 border-l border-cream/15 pl-8">
          {profile.journey.map((item, i) => {
            const { icon: Icon, chip } = KIND_STYLE[item.kind]
            return (
              <motion.div
                key={item.id}
                initial={{ x: -16, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: EASE }}
                className="relative"
              >
                <span
                  className={`absolute -left-[3.15rem] flex h-9 w-9 items-center justify-center rounded-full border-4 border-night ${chip}`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40 sm:text-xs">
                  {item.period}
                </p>
                <h3 className="mt-1.5 text-lg font-bold text-cream md:text-xl">{item.title}</h3>
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
