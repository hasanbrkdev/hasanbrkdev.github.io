import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile } from '../../content/profile'
import { copy } from '../../content/copy'
import { assets } from '../../content/assets'
import { scrollToId } from '../ui/scroll'
import { EASE_INOUT } from '../animations/motion'

const marqueeText = `${profile.identity.name} — `

const socials = [
  { label: 'GitHub', href: profile.identity.github },
  { label: 'LinkedIn', href: profile.identity.linkedin },
  { label: 'Email', href: `mailto:${profile.identity.email}` },
]

export function Hero() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // Scroll parallax — the WORLD (background + island cutout) moves as one body
  // so the island never ghosts against its own image; depth comes from the
  // marquee sliding between the sky and the island at its own rate.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const worldY = useTransform(scrollYProgress, [0, 1], ['0vh', '6vh'])
  const marqueeY = useTransform(scrollYProgress, [0, 1], ['0vh', '-7vh'])
  const chromeOp = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Mouse parallax — world and marquee drift in opposite x directions.
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 })
  const worldX = useTransform(mx, (v) => v * 0.5)
  const marqueeX = useTransform(mx, (v) => v * -0.3)

  function onHeroPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    mx.set((e.clientX / window.innerWidth - 0.5) * 12)
  }

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  function goTo(target: string) {
    setDrawerOpen(false)
    scrollToId(target)
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={onHeroPointerMove}
      onPointerLeave={() => mx.set(0)}
      className="relative h-[100dvh] w-full overflow-hidden bg-night"
    >
      {/* Background artwork (cozy night scene) — farthest layer, moves least */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={reduced ? undefined : { y: worldY, x: worldX, scale: 1.06 }}
      >
        {assets.heroVideo ? (
          <video
            ref={(el) => {
              // React omits the muted attribute; set the property so autoplay
              // policies treat the video as muted.
              if (el) el.muted = true
            }}
            src={assets.heroVideo}
            poster={assets.heroImage ?? undefined}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={(e) => {
              void e.currentTarget.play().catch(() => undefined)
            }}
            className="anim-fade-in absolute inset-0 h-full w-full object-cover [object-position:38%_50%]"
          />
        ) : assets.heroImage ? (
          <img
            src={assets.heroImage}
            alt=""
            className="anim-fade-in absolute inset-0 h-full w-full object-cover [object-position:38%_50%]"
          />
        ) : (
          <div className="anim-fade-in absolute inset-0 bg-gradient-to-b from-[#0F0F0E] via-[#161511] to-[#241F15]">
            <div className="absolute bottom-0 left-1/2 h-[30vh] w-[80vw] -translate-x-1/2 rounded-[100%] bg-amber/15 blur-3xl" />
          </div>
        )}
      </motion.div>
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-overlay" />

      {/* Giant scrolling name — middle layer */}
      <motion.div
        className="absolute inset-x-0 top-[16vh] z-10 overflow-hidden will-change-transform sm:top-[14vh]"
        style={reduced ? undefined : { y: marqueeY }}
      >
        <motion.div
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1.1, ease: EASE_INOUT, delay: 0.35 }}
          style={reduced ? undefined : { x: marqueeX }}
        >
          <div
            className="marquee type-marquee flex w-max whitespace-nowrap text-[15vh] leading-none text-cream sm:text-[21vh]"
            style={{ animationDuration: '52s' }}
          >
            <span className="pr-[6vw]">{marqueeText}</span>
            <span className="pr-[6vw]">{marqueeText}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Foreground cutout sits on top of the marquee — nearest layer, moves most */}
      {assets.heroCutout && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 will-change-transform"
          style={reduced ? undefined : { y: worldY, x: worldX, scale: 1.06 }}
        >
          <img
            src={assets.heroCutout}
            alt=""
            className="anim-rise-in h-full w-full object-cover [object-position:38%_50%]"
            style={{ animationDelay: '150ms' }}
          />
        </motion.div>
      )}

      {/* Header chrome — fades out as the hero scrolls away */}
      <motion.header
        className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8"
        style={reduced ? undefined : { opacity: chromeOp }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="anim-slide-r text-lg font-medium tracking-wide text-cream"
          style={{ animationDelay: '550ms' }}
        >
          {profile.identity.firstName}
        </button>

        <div className="hidden items-start gap-16 sm:flex lg:gap-24">
          <span className="anim-drop tnum text-sm text-cream" style={{ animationDelay: '620ms' }}>
            {copy.hero.year}
          </span>
          <nav className="flex flex-col gap-0.5 text-sm">
            {copy.nav.map((item, i) => (
              <button
                key={item.target}
                onClick={() => goTo(item.target)}
                className="anim-drop text-left text-cream transition-opacity duration-300 hover:opacity-60"
                style={{ animationDelay: `${680 + i * 60}ms` }}
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/resume"
              className="anim-drop text-cream transition-opacity duration-300 hover:opacity-60"
              style={{ animationDelay: `${680 + copy.nav.length * 60}ms` }}
            >
              {copy.navResumeLabel}
            </Link>
          </nav>
          <div className="flex flex-col gap-0.5 text-sm">
            {socials.map((social, i) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="anim-drop text-cream transition-opacity duration-300 hover:opacity-60"
                style={{ animationDelay: `${800 + i * 60}ms` }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="anim-drop z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 sm:hidden"
          style={{ animationDelay: '680ms' }}
        >
          <span
            className={`h-0.5 w-6 bg-cream transition-all duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${
              drawerOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-cream transition-opacity duration-300 ${drawerOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-0.5 w-6 bg-cream transition-all duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${
              drawerOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </motion.header>

      {/* Cream rule */}
      <div
        className="anim-line absolute inset-x-6 bottom-[5.5rem] z-10 h-0.5 bg-cream sm:inset-x-10 sm:bottom-28"
        style={{ animationDelay: '700ms' }}
      />

      {/* Hero footer */}
      <motion.footer
        className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-6 pb-5 text-xs leading-relaxed sm:z-10 sm:px-10 sm:pb-8 sm:text-sm"
        style={reduced ? undefined : { opacity: chromeOp }}
      >
        <div className="anim-fade-up text-cream" style={{ animationDelay: '900ms' }}>
          {copy.hero.footerLeft.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="anim-fade-up text-right text-cream" style={{ animationDelay: '1000ms' }}>
          {copy.hero.footerRight.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </motion.footer>

      {/* Mobile drawer */}
      <div className="sm:hidden">
        <div
          onClick={() => setDrawerOpen(false)}
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
            drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        />
        <div
          className={`fixed inset-y-0 right-0 z-40 w-[80%] max-w-sm bg-[#1B1A17] px-8 py-10 transition-transform duration-[600ms] [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className={`absolute right-6 top-6 text-cream transition-all duration-300 ${
              drawerOpen ? 'rotate-0 opacity-100 delay-300' : 'rotate-90 opacity-0'
            }`}
          >
            <X size={26} strokeWidth={1.5} />
          </button>

          <p
            className={`type-micro text-xs text-cream/50 transition-all duration-500 ${
              drawerOpen ? 'translate-y-0 opacity-100 delay-[250ms]' : 'translate-y-4 opacity-0'
            }`}
          >
            {copy.hero.siteIndexLabel}
          </p>
          <nav className="mt-6 flex flex-col gap-4">
            {copy.nav.map((item, i) => (
              <button
                key={item.target}
                onClick={() => goTo(item.target)}
                className={`text-left text-4xl text-cream transition-all duration-500 ${
                  drawerOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: drawerOpen ? `${300 + i * 80}ms` : '0ms' }}
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/resume"
              className={`text-4xl text-cream transition-all duration-500 ${
                drawerOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: drawerOpen ? `${300 + copy.nav.length * 80}ms` : '0ms' }}
            >
              {copy.navResumeLabel}
            </Link>
          </nav>

          <p
            className={`type-micro mt-12 text-xs text-cream/50 transition-all duration-500 ${
              drawerOpen ? 'translate-y-0 opacity-100 delay-500' : 'translate-y-4 opacity-0'
            }`}
          >
            {copy.hero.findMeLabel}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((social, i) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className={`text-sm text-cream transition-all duration-500 ${
                  drawerOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: drawerOpen ? `${550 + i * 60}ms` : '0ms' }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
