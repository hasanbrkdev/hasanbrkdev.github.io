import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Layers, Clapperboard } from 'lucide-react'
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
    <section
      id="specialities"
      className="relative border-t border-cream/10 bg-night px-6 py-20 sm:px-10 md:py-28"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto max-w-5xl">
        <p className="text-[10px] uppercase tracking-[0.25em] text-cream/50 sm:text-xs">
          {copy.specialities.label}
        </p>
        <div className="mt-6 max-w-4xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: copy.specialities.line1, className: 'text-cream' },
              { text: copy.specialities.line2, className: 'text-cream/40' },
            ]}
            className="gap-x-[0.28em] text-2xl font-light sm:text-3xl md:text-4xl"
          />
        </div>

        {assets.specialitiesImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-xl"
          >
            <img
              src={assets.specialitiesImage}
              alt="Cozy illustrated workspace"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-5 text-sm text-cream">
              {copy.specialities.mediaCaption}
            </p>
          </motion.div>
        )}

        <div ref={gridRef} className="mt-14 grid grid-cols-1 gap-px bg-cream/10 md:grid-cols-3">
          {profile.specialities.map((spec, i) => {
            const Icon = ICONS[spec.icon]
            const accent = accentStyles[spec.accent]
            return (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
                className="bg-night p-6 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <Icon className={`h-5 w-5 ${accent.text}`} strokeWidth={1.5} />
                  <span className="text-xs text-cream/40">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-base font-bold text-cream md:text-lg">{spec.title}</h3>
                <p className="mt-1 font-serif text-sm italic text-cream/50 md:text-base">
                  {spec.blurb}
                </p>
                <ul className="mt-6 space-y-3 border-t border-cream/10 pt-5">
                  {spec.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className={`mt-[0.55em] h-px w-4 shrink-0 ${accent.dot}`} />
                      <span className="text-xs leading-snug text-cream/70 sm:text-sm">{point}</span>
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
