import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile } from '../../content/profile'
import { copy } from '../../content/copy'
import { assets } from '../../content/assets'
import { scrollToId } from '../ui/scroll'

const lastName = profile.identity.name.split(' ').slice(-1)[0]
const marqueeText = `${profile.identity.firstName} — ${lastName} `

const socials = [
  { label: 'GitHub', href: profile.identity.github },
  { label: 'LinkedIn', href: profile.identity.linkedin },
  { label: 'Email', href: `mailto:${profile.identity.email}` },
]

export function Hero() {
  const [drawerOpen, setDrawerOpen] = useState(false)

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
    <section className="relative h-[100dvh] w-full overflow-hidden bg-night">
      {/* Background artwork (cozy night scene) */}
      {assets.heroVideo ? (
        <video
          src={assets.heroVideo}
          poster={assets.heroImage ?? undefined}
          autoPlay
          loop
          muted
          playsInline
          className="anim-fade-in absolute inset-0 h-full w-full object-cover"
        />
      ) : assets.heroImage ? (
        <img
          src={assets.heroImage}
          alt=""
          className="anim-fade-in absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="anim-fade-in absolute inset-0 bg-gradient-to-b from-[#0A0F1C] via-[#101A30] to-[#1A2440]">
          <div className="absolute bottom-0 left-1/2 h-[30vh] w-[80vw] -translate-x-1/2 rounded-[100%] bg-amber/15 blur-3xl" />
        </div>
      )}
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-overlay" />

      {/* Giant scrolling name */}
      <div
        className="anim-fade-up absolute inset-x-0 top-[16vh] z-10 overflow-hidden sm:top-[14vh]"
        style={{ animationDelay: '500ms' }}
      >
        <div className="marquee flex w-max whitespace-nowrap text-[16vh] font-light leading-none tracking-tight text-cream sm:text-[24vh]">
          <span className="pr-[6vw]">{marqueeText}</span>
          <span className="pr-[6vw]">{marqueeText}</span>
        </div>
      </div>

      {/* Foreground cutout sits on top of the marquee */}
      {assets.heroCutout && (
        <img
          src={assets.heroCutout}
          alt=""
          className="anim-rise-in pointer-events-none absolute inset-0 z-20 h-full w-full object-cover"
          style={{ animationDelay: '300ms' }}
        />
      )}

      {/* Header chrome */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="anim-fade-up text-lg tracking-wide text-cream"
          style={{ animationDelay: '800ms' }}
        >
          {profile.identity.firstName}
        </button>

        <div className="hidden items-start gap-16 sm:flex lg:gap-24">
          <span className="anim-fade-up text-sm text-cream" style={{ animationDelay: '900ms' }}>
            {copy.hero.year}
          </span>
          <nav className="flex flex-col gap-0.5 text-sm">
            {copy.nav.map((item, i) => (
              <button
                key={item.target}
                onClick={() => goTo(item.target)}
                className="anim-fade-up text-left text-cream transition-opacity duration-300 hover:opacity-60"
                style={{ animationDelay: `${1000 + i * 80}ms` }}
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/resume"
              className="anim-fade-up text-cream transition-opacity duration-300 hover:opacity-60"
              style={{ animationDelay: `${1000 + copy.nav.length * 80}ms` }}
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
                className="anim-fade-up text-cream transition-opacity duration-300 hover:opacity-60"
                style={{ animationDelay: `${1150 + i * 80}ms` }}
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
          className="anim-fade-up z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 sm:hidden"
          style={{ animationDelay: '900ms' }}
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
      </header>

      {/* Cream rule */}
      <div
        className="anim-line absolute inset-x-6 bottom-[5.5rem] z-10 h-0.5 bg-cream sm:inset-x-10 sm:bottom-28"
        style={{ animationDelay: '1200ms' }}
      />

      {/* Hero footer */}
      <footer className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-6 pb-5 text-xs leading-relaxed sm:px-10 sm:pb-8 sm:text-sm">
        <div className="anim-fade-up text-cream" style={{ animationDelay: '1400ms' }}>
          {copy.hero.footerLeft.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="anim-fade-up text-right text-cream" style={{ animationDelay: '1550ms' }}>
          {copy.hero.footerRight.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </footer>

      {/* Mobile drawer */}
      <div className="sm:hidden">
        <div
          onClick={() => setDrawerOpen(false)}
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
            drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        />
        <div
          className={`fixed inset-y-0 right-0 z-40 w-[80%] max-w-sm bg-[#0E1524] px-8 py-10 transition-transform duration-[600ms] [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${
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
            className={`text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500 ${
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
            className={`mt-12 text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500 ${
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
