import { motion } from 'framer-motion'
import { FileDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { copy } from '../../content/copy'
import { assets } from '../../content/assets'

export function ResumeCta() {
  return (
    <section className="bg-paper px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-ink md:grid-cols-2 md:rounded-[2.5rem]">
        <div className="flex flex-col items-start justify-center gap-5 p-8 md:p-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-butter sm:text-xs">
            {copy.resumeCta.label}
          </p>
          <h2 className="font-serif text-3xl italic text-paper md:text-5xl">
            {copy.resumeCta.heading}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-paper/70 md:text-base">
            {copy.resumeCta.body}
          </p>
          <Link
            to="/resume"
            className="group mt-2 flex items-center gap-2 rounded-full bg-paper py-1.5 pl-5 pr-1.5 text-sm font-bold text-ink transition-all hover:gap-3"
          >
            {copy.resumeCta.button}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink transition-transform group-hover:scale-110">
              <FileDown className="h-4 w-4 text-paper" />
            </span>
          </Link>
        </div>

        <div className="relative min-h-[280px] overflow-hidden">
          {assets.resumeImage ? (
            <img
              src={assets.resumeImage}
              alt="Cozy illustrated desk"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-sky/40 via-ink to-ink" />
          )}
          {/* Floating mock A4 sheet */}
          <motion.div
            initial={{ y: 24, rotate: 4, opacity: 0 }}
            whileInView={{ y: 0, rotate: 6, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 h-[320px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-card p-5 shadow-2xl"
          >
            <div className="h-3 w-2/3 rounded bg-ink/80" />
            <div className="mt-2 h-2 w-1/3 rounded bg-terracotta/70" />
            <div className="mt-5 space-y-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-1.5 w-full rounded bg-ink/10" />
              ))}
              <div className="h-1.5 w-2/3 rounded bg-ink/10" />
            </div>
            <div className="mt-4 h-2 w-1/4 rounded bg-sage/80" />
            <div className="mt-2 space-y-1.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-1.5 w-full rounded bg-ink/10" />
              ))}
            </div>
            <div className="mt-4 h-2 w-1/4 rounded bg-sky/80" />
            <div className="mt-2 space-y-1.5">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-1.5 w-full rounded bg-ink/10" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
