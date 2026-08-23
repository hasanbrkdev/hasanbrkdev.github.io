import { useRef } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Brain, Layers, Clapperboard } from 'lucide-react'
import { profile } from '../../content/profile'
import { copy } from '../../content/copy'
import { assets } from '../../content/assets'
import { WordsPullUpMultiStyle } from '../animations/WordsPullUpMultiStyle'
import { accentStyles } from '../ui/accents'
import { EASE_OUT, VIEWPORT, useTilt } from '../animations/motion'

const ICONS = { brain: Brain, layers: Layers, clapperboard: Clapperboard }

type Speciality = (typeof profile.specialities)[number]

export function Specialities() {
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()

  // Gentle scroll parallax inside the panorama frame.
  const panoRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: panoProgress } = useScroll({
    target: panoRef,
    offset: ['start end', 'end start'],
  })
  const panoY = useTransform(panoProgress, [0, 1], ['-4%', '4%'])

  return (
    <section
      id="specialities"
      className="relative border-t border-cream/10 bg-night px-6 py-20 sm:px-10 md:py-28"
    >
      <div className="relative mx-auto max-w-5xl">
        <p className="type-eyebrow text-[10px] text-cream/50 sm:text-xs">
          {copy.specialities.label}
        </p>
        <div className="mt-6 max-w-4xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: copy.specialities.line1, className: 'text-cream' },
              { text: copy.specialities.line2, className: 'text-cream/40' },
            ]}
            className="type-display gap-x-[0.28em] text-2xl sm:text-3xl md:text-4xl"
          />
        </div>

        {assets.specialitiesImage && (
          <div
            ref={panoRef}
            className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-xl"
          >
            <motion.img
              src={assets.specialitiesImage}
              alt="Cozy illustrated workspace"
              initial={{ opacity: 0, scale: 1.06 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 5, ease: EASE_OUT },
              }}
              className="absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover"
              style={reduced ? undefined : { y: panoY }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.5 }}
              className="absolute bottom-4 left-5 text-sm text-cream"
            >
              {copy.specialities.mediaCaption}
            </motion.p>
          </div>
        )}

        <div
          ref={gridRef}
          className="mt-16 grid grid-cols-1 gap-px bg-cream/10 [perspective:900px] md:grid-cols-3"
        >
          {profile.specialities.map((spec, i) => (
            <SpecialityCard key={spec.id} spec={spec} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SpecialityCard({
  spec,
  index,
  inView,
}: {
  spec: Speciality
  index: number
  inView: boolean
}) {
  const Icon = ICONS[spec.icon]
  const accent = accentStyles[spec.accent]
  const reduced = useReducedMotion()
  const { rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt(3)

  // Entrance direction varies per column: left, up, right.
  const entry = index === 0 ? { x: -24, y: 0 } : index === 1 ? { x: 0, y: 24 } : { x: 24, y: 0 }

  return (
    <motion.div
      initial={{ opacity: 0, ...entry }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.13, ease: EASE_OUT }}
      whileHover={{ y: -4 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={reduced ? undefined : { rotateX, rotateY }}
      className="group bg-night p-6 transition-colors duration-500 hover:bg-navy md:p-8"
    >
      <div className="flex items-center justify-between">
        <Icon className={`h-5 w-5 ${accent.text}`} strokeWidth={1.5} />
        <span className="tnum text-xs text-cream/40 transition-colors group-hover:text-cream/70">
          0{index + 1}
        </span>
      </div>
      <h3 className="type-title mt-6 text-base text-cream md:text-lg">{spec.title}</h3>
      <p className="mt-1 font-serif text-sm italic text-cream/50 md:text-base">{spec.blurb}</p>
      <ul className="mt-6 space-y-3 border-t border-cream/10 pt-5">
        {spec.points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span
              className={`mt-[0.55em] h-px w-4 shrink-0 origin-left transition-transform duration-300 group-hover:scale-x-150 ${accent.dot}`}
            />
            <span className="text-xs leading-snug text-cream/70 sm:text-sm">{point}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
