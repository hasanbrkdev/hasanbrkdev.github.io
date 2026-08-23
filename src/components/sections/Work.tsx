import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Lock, ArrowUpRight } from 'lucide-react'
import { profile } from '../../content/profile'
import { copy } from '../../content/copy'
import { WordsPullUpMultiStyle } from '../animations/WordsPullUpMultiStyle'
import { accentStyles } from '../ui/accents'

const EASE = [0.22, 1, 0.36, 1] as const

export function Work() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="work" className="bg-paper px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-terracotta sm:text-xs">
          {copy.work.label}
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <WordsPullUpMultiStyle
              segments={[
                { text: copy.work.line1, className: 'text-ink' },
                { text: copy.work.line2, className: 'font-serif italic text-ink-faint' },
              ]}
              className="gap-x-[0.28em] text-xl sm:text-2xl md:text-3xl lg:text-4xl"
            />
          </div>
          <p className="text-xs text-ink-faint">{copy.work.hint}</p>
        </div>

        <div className="mt-10 border-t border-ink/10">
          {profile.projects.map((project, i) => {
            const accent = accentStyles[project.accent]
            const isOpen = openId === project.id
            return (
              <div key={project.id} className="border-b border-ink/10">
                <button
                  onClick={() => setOpenId(isOpen ? null : project.id)}
                  aria-expanded={isOpen}
                  className={`group flex w-full items-center gap-4 py-5 text-left transition-colors md:py-6 ${
                    isOpen ? '' : 'hover:bg-card/80'
                  }`}
                >
                  <span className="w-8 shrink-0 text-xs text-ink-faint md:text-sm">
                    0{i + 1}
                  </span>
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${accent.dot}`} />
                  <span className="flex-1 text-lg font-bold text-ink transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
                    {project.name}
                  </span>
                  <span className="hidden text-sm text-ink-faint md:block">{project.tagline}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-8 pl-12 pr-2 md:grid-cols-3 md:pl-[4.5rem]">
                        <p className="text-sm leading-relaxed text-ink-soft md:col-span-2 md:text-base">
                          {project.description}
                        </p>
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-ink-faint">Role</p>
                            <p className="mt-0.5 text-ink">{project.role}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-ink-faint">Period</p>
                            <p className="mt-0.5 text-ink">{project.period}</p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className={`rounded-full px-2.5 py-1 text-xs text-ink-soft ${accent.soft}`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          {project.confidential && (
                            <p className="flex items-center gap-1.5 pt-1 text-xs text-ink-faint">
                              <Lock className="h-3 w-3" /> Under NDA
                            </p>
                          )}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 pt-1 text-xs font-bold text-terracotta hover:underline"
                            >
                              Visit <ArrowUpRight className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
