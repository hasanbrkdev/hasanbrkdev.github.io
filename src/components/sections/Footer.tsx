import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../../content/profile'
import { copy } from '../../content/copy'
import { WordsPullUp } from '../animations/WordsPullUp'

export function Footer() {
  return (
    <footer id="contact" className="bg-night px-6 pb-10 pt-20 text-center sm:px-10 md:pt-28">
      <div className="mx-auto max-w-3xl">
        <WordsPullUp
          text={copy.footer.heading}
          className="justify-center gap-x-[0.28em] font-serif text-4xl italic text-cream sm:text-5xl md:text-7xl"
        />
        <p className="mt-5 text-sm text-cream/50 md:text-base">{copy.footer.body}</p>
        <a
          href={`mailto:${profile.identity.email}`}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-amber py-1.5 pl-5 pr-1.5 text-sm font-bold text-night transition-all hover:gap-3 sm:text-base"
        >
          {copy.footer.emailButton}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-night transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
            <Mail className="h-4 w-4 text-amber" strokeWidth={1.5} />
          </span>
        </a>
        <div className="mt-10 flex items-center justify-center gap-6">
          <a
            href={profile.identity.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-cream/50 transition-colors hover:text-cream"
          >
            <Github className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <a
            href={profile.identity.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-cream/50 transition-colors hover:text-cream"
          >
            <Linkedin className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <a
            href={`mailto:${profile.identity.email}`}
            aria-label="Email"
            className="text-cream/50 transition-colors hover:text-cream"
          >
            <Mail className="h-5 w-5" strokeWidth={1.5} />
          </a>
        </div>
        <p className="mt-12 border-t border-cream/10 pt-6 text-xs text-cream/40">
          {profile.identity.location} · © 2026 {profile.identity.name}
        </p>
      </div>
    </footer>
  )
}
