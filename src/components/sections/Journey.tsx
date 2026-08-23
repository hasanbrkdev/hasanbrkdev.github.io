import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Compass, Handshake } from 'lucide-react'
import { profile } from '../../content/profile'
import { copy } from '../../content/copy'
import { WordsPullUpMultiStyle } from '../animations/WordsPullUpMultiStyle'

const KIND_STYLE = {
  education: { icon: GraduationCap, chip: 'bg-sky/25 text-ink-soft' },
  work: { icon: Compass, chip: 'bg-butter/40 text-ink-soft' },
  partnership: { icon: Handshake, chip: 'bg-terracotta/15 text-terracotta' },
} as const

const EASE = [0.22, 1, 0.36, 1] as const

export function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="journey" className="bg-surface px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-terracotta sm:text-xs">
          {copy.journey.label}
        </p>
        <div className="mt-4 max-w-2xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: copy.journey.line1, className: 'text-ink' },
              { text: copy.journey.line2, className: 'font-serif italic text-terracotta' },
            ]}
            className="gap-x-[0.28em] text-xl sm:text-2xl md:text-3xl lg:text-4xl"
          />
        </div>

        <div ref={ref} className="relative mt-12 space-y-10 border-l-2 border-ink/10 pl-8">
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
                  className={`absolute -left-[3.05rem] flex h-9 w-9 items-center justify-center rounded-full border-4 border-surface ${chip}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-[10px] uppercase tracking-widest text-ink-faint sm:text-xs">
                  {item.period}
                </p>
                <h3 className="mt-1 text-lg font-bold text-ink md:text-xl">{item.title}</h3>
                <p className="text-sm text-terracotta">{item.org}</p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
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
