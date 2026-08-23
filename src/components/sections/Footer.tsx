import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../../content/profile'
import { copy } from '../../content/copy'
import { WordsPullUpMultiStyle } from '../animations/WordsPullUpMultiStyle'
import { EASE_OUT, VIEWPORT } from '../animations/motion'

const socialContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const socialItemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

export function Footer() {
  return (
    <footer id="contact" className="bg-night px-6 pb-10 pt-20 text-center sm:px-10 md:pt-28">
      <div className="mx-auto max-w-3xl">
        <WordsPullUpMultiStyle
          segments={[{ text: copy.footer.heading, className: 'font-serif italic text-cream' }]}
          center
          className="justify-center gap-x-[0.28em] text-4xl sm:text-5xl md:text-7xl"
        />
        <p className="mt-5 text-sm text-cream/50 md:text-base">{copy.footer.body}</p>
        <a
          href={`mailto:${profile.identity.email}`}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-amber py-1.5 pl-5 pr-1.5 text-sm font-semibold text-night transition-all hover:gap-3 sm:text-base"
        >
          {copy.footer.emailButton}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-night transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
            <Mail
              className="h-4 w-4 text-amber transition-transform duration-300 group-hover:-rotate-12"
              strokeWidth={1.5}
            />
          </span>
        </a>
        <motion.div
          variants={socialContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-10 flex items-center justify-center gap-6"
        >
          <motion.div variants={socialItemVariants}>
            <a
              href={profile.identity.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="block text-cream/50 transition-all duration-300 hover:-translate-y-1 hover:text-cream"
            >
              <Github className="h-5 w-5" strokeWidth={1.5} />
            </a>
          </motion.div>
          <motion.div variants={socialItemVariants}>
            <a
              href={profile.identity.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="block text-cream/50 transition-all duration-300 hover:-translate-y-1 hover:text-cream"
            >
              <Linkedin className="h-5 w-5" strokeWidth={1.5} />
            </a>
          </motion.div>
          <motion.div variants={socialItemVariants}>
            <a
              href={`mailto:${profile.identity.email}`}
              aria-label="Email"
              className="block text-cream/50 transition-all duration-300 hover:-translate-y-1 hover:text-cream"
            >
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </a>
          </motion.div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 border-t border-cream/10 pt-6 text-xs text-cream/40"
        >
          {profile.identity.location} · © 2026 {profile.identity.name}
        </motion.p>
      </div>
    </footer>
  )
}
