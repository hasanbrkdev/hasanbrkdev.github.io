import { profile } from '../../content/profile'
import { WordsPullUpMultiStyle } from '../animations/WordsPullUpMultiStyle'
import { ScrollRevealText } from '../animations/ScrollRevealText'

export function About() {
  const segments = profile.about.headingSegments.map((s) => ({
    text: s.text,
    className: s.serif ? 'font-serif italic text-amber' : 'text-cream',
  }))

  return (
    <section id="about" className="border-t border-cream/10 bg-night px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="text-[10px] uppercase tracking-[0.25em] text-cream/50 sm:text-xs">
          {profile.about.label}
        </p>
        <div className="mt-8 max-w-3xl">
          <WordsPullUpMultiStyle
            segments={segments}
            className="gap-x-[0.28em] text-3xl font-light leading-[1.08] sm:text-4xl md:text-5xl lg:text-6xl"
          />
        </div>
        <ScrollRevealText
          text={profile.about.body}
          className="mt-10 max-w-2xl text-sm leading-relaxed text-cream sm:text-base"
        />
        <div className="mt-16 flex flex-wrap gap-10 md:gap-16">
          {profile.stats.map((stat) => (
            <div key={stat.label} className="border-l border-cream/20 pl-4">
              <p className="font-serif text-3xl italic text-amber md:text-5xl">{stat.value}</p>
              <p className="mt-2 max-w-[10rem] text-xs text-cream/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
