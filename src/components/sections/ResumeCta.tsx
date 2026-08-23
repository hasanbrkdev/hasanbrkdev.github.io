import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { FileDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { copy } from '../../content/copy'
import { assets } from '../../content/assets'
import { EASE_OUT, VIEWPORT, useTilt } from '../animations/motion'

const colVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

// Inverted editorial block: cream field on the night page.
export function ResumeCta() {
  const reduced = useReducedMotion()
  const rightRef = useRef<HTMLDivElement>(null)
  const { rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt(4)

  // Gentle float: the A4 sheet drifts upward as the section scrolls through.
  const { scrollYProgress } = useScroll({
    target: rightRef,
    offset: ['start end', 'end start'],
  })
  const floatY = useTransform(scrollYProgress, [0, 1], [18, -18])

  return (
    <section className="border-t border-cream/10 bg-cream text-night">
      <div className="mx-auto grid max-w-5xl md:grid-cols-2">
        <motion.div
          variants={colVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="flex flex-col items-start justify-center gap-5 px-6 py-16 sm:px-10 md:py-24"
        >
          <motion.h2
            variants={itemVariants}
            className="type-display text-3xl leading-none md:text-4xl"
          >
            {copy.resumeCta.heading}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="max-w-md text-sm leading-relaxed text-night/70 md:text-base"
          >
            {copy.resumeCta.body}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to="/resume"
              className="group mt-2 flex items-center gap-2 rounded-full bg-night py-1.5 pl-5 pr-1.5 text-sm font-semibold text-cream transition-all hover:gap-3"
            >
              {copy.resumeCta.button}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream transition-transform group-hover:scale-110">
                <FileDown
                  className="h-4 w-4 text-night transition-transform duration-300 group-hover:rotate-6"
                  strokeWidth={1.5}
                />
              </span>
            </Link>
          </motion.div>
          <motion.p variants={itemVariants} className="type-micro text-[10px] text-night/40">
            {copy.resumeCta.meta}
          </motion.p>
        </motion.div>

        <div
          ref={rightRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="relative min-h-[300px] overflow-hidden [perspective:800px]"
        >
          {assets.resumeImage ? (
            <img
              src={assets.resumeImage}
              alt="Cozy illustrated desk"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-cream via-[#E4E0D2] to-[#D6D2C2]" />
          )}
          {/* Floating mock A4 sheet */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              style={reduced ? undefined : { y: floatY }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                style={reduced ? undefined : { rotate: 6, rotateX, rotateY }}
                className="h-[320px] w-[230px] rotate-6 rounded-md bg-white p-5 shadow-[0_24px_60px_rgba(10,15,28,0.25)]"
              >
                <div className="h-3 w-2/3 rounded-sm bg-night/85" />
                <div className="mt-2 h-2 w-1/3 rounded-sm bg-amber/80" />
                <div className="mt-5 space-y-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-1.5 w-full rounded-sm bg-night/10" />
                  ))}
                  <div className="h-1.5 w-2/3 rounded-sm bg-night/10" />
                </div>
                <div className="mt-4 h-2 w-1/4 rounded-sm bg-moss/80" />
                <div className="mt-2 space-y-1.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-1.5 w-full rounded-sm bg-night/10" />
                  ))}
                </div>
                <div className="mt-4 h-2 w-1/4 rounded-sm bg-skyblue/80" />
                <div className="mt-2 space-y-1.5">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-1.5 w-full rounded-sm bg-night/10" />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
