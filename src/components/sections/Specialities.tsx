import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Layers, Clapperboard, Check } from 'lucide-react'
import { profile } from '../../content/profile'
import { copy } from '../../content/copy'
import { assets } from '../../content/assets'
import { WordsPullUpMultiStyle } from '../animations/WordsPullUpMultiStyle'
import { accentStyles } from '../ui/accents'

const ICONS = { brain: Brain, layers: Layers, clapperboard: Clapperboard }
const EASE = [0.22, 1, 0.36, 1] as const

export function Specialities() {
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { once: true, margin: '-100px' })

  return (
    <section id="specialities" className="relative bg-surface px-4 py-16 md:px-6 md:py-24">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-terracotta sm:text-xs">
          {copy.specialities.label}
        </p>
        <div className="mt-4 max-w-4xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: copy.specialities.line1, className: 'text-ink' },
              { text: copy.specialities.line2, className: 'text-ink-faint' },
            ]}
            className="gap-x-[0.28em] text-xl sm:text-2xl md:text-3xl lg:text-4xl"
          />
        </div>

        <div
          ref={gridRef}
          className="mt-10 grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4"
        >
          {/* Media card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative min-h-[260px] overflow-hidden rounded-2xl"
          >
            {assets.specialitiesImage ? (
              <img
                src={assets.specialitiesImage}
                alt="Cozy illustrated workspace"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-sage/60 via-butter/50 to-peach/60" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 text-sm font-bold text-[#FFF9EC]">
              {copy.specialities.mediaCaption}
            </p>
          </motion.div>

          {/* Speciality cards */}
          {profile.specialities.map((spec, i) => {
            const Icon = ICONS[spec.icon]
            const accent = accentStyles[spec.accent]
            return (
              <motion.div
                key={spec.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: (i + 1) * 0.15, ease: EASE }}
                className="flex flex-col rounded-2xl border border-ink/5 bg-card p-5 shadow-sm"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${accent.chip}`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-ink sm:text-base">{spec.title}</h3>
                  <span className="text-xs text-ink-faint">0{i + 1}</span>
                </div>
                <p className="mt-1 text-xs text-ink-faint sm:text-sm">{spec.blurb}</p>
                <ul className="mt-4 space-y-2.5">
                  {spec.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${accent.text}`} />
                      <span className="text-xs leading-snug text-ink-soft sm:text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
