import { profile } from '../../content/profile'
import { WordsPullUpMultiStyle } from '../animations/WordsPullUpMultiStyle'
import { ScrollRevealText } from '../animations/ScrollRevealText'

export function About() {
  const segments = profile.about.headingSegments.map((s) => ({
    text: s.text,
    className: s.serif ? 'font-serif italic text-terracotta' : 'text-ink',
  }))

  return (
    <section id="about" className="bg-paper px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl rounded-3xl border border-ink/5 bg-card px-6 py-16 text-center shadow-[0_20px_60px_rgba(43,38,32,0.08)] md:rounded-[2.5rem] md:py-24">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-terracotta sm:text-xs">
          {profile.about.label}
        </p>
        <div className="mx-auto mt-6 max-w-3xl">
          <WordsPullUpMultiStyle
            segments={segments}
            center
            className="gap-x-[0.28em] text-3xl leading-[1.05] sm:text-4xl sm:leading-[1] md:text-5xl lg:text-6xl xl:text-7xl"
          />
        </div>
        <ScrollRevealText
          text={profile.about.body}
          className="mx-auto mt-10 max-w-2xl text-xs leading-relaxed text-ink sm:text-sm md:text-base"
        />
        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl italic text-terracotta md:text-5xl">{stat.value}</p>
              <p className="mt-2 text-[10px] text-ink-faint sm:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
