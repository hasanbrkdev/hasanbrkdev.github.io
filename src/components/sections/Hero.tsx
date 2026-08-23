import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile } from '../../content/profile'
import { copy } from '../../content/copy'
import { assets } from '../../content/assets'
import { WordsPullUp } from '../animations/WordsPullUp'
import { scrollToId } from '../ui/scroll'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  return (
    <section className="h-screen p-4 md:p-6">
      <div className="relative h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background media with cozy-gradient fallback */}
        {assets.heroVideo ? (
          <video
            src={assets.heroVideo}
            poster={assets.heroImage ?? undefined}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : assets.heroImage ? (
          <img
            src={assets.heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#BFD9E8] via-[#F4E3C8] to-[#F2B28C]">
            <div className="absolute left-1/2 top-1/3 h-[42vw] w-[42vw] -translate-x-1/2 rounded-full bg-[#FFE9B8] opacity-80 blur-3xl" />
          </div>
        )}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25" />

        {/* Navbar pill hanging from the top edge */}
        <nav className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-b-2xl bg-ink px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
            {copy.nav.map((item) => (
              <button
                key={item.target}
                onClick={() => scrollToId(item.target)}
                className="text-[10px] text-paper/80 transition-colors hover:text-paper sm:text-xs md:text-sm"
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/resume"
              className="text-[10px] text-butter/90 transition-colors hover:text-butter sm:text-xs md:text-sm"
            >
              {copy.navResumeLabel}
            </Link>
          </div>
        </nav>

        {/* Bottom-aligned hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
          <div className="grid grid-cols-12 items-end gap-4 md:gap-6">
            <div className="col-span-12 lg:col-span-8">
              <WordsPullUp
                text={profile.identity.firstName}
                showAsterisk
                className="select-none text-[26vw] font-normal leading-[0.85] tracking-[-0.07em] text-[#FFF9EC] [text-shadow:0_2px_24px_rgba(43,38,32,0.25)] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw]"
              />
            </div>
            <div className="col-span-12 flex flex-col items-start gap-4 pb-2 lg:col-span-4 lg:items-end">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
                className="max-w-sm text-xs leading-[1.35] text-[#FFF9EC]/95 [text-shadow:0_1px_12px_rgba(43,38,32,0.3)] sm:text-sm md:text-base lg:text-right"
              >
                {profile.hero.tagline}
              </motion.p>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
                onClick={() => scrollToId('work')}
                className="group flex items-center gap-2 rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-sm font-bold text-paper transition-all hover:gap-3 sm:text-base"
              >
                {profile.hero.cta}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4 text-ink" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
