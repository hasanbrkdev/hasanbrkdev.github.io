import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Lock, ArrowUpRight } from 'lucide-react'
import { profile } from '../../content/profile'
import { copy } from '../../content/copy'
import { assets } from '../../content/assets'
import { WordsPullUpMultiStyle } from '../animations/WordsPullUpMultiStyle'
import { accentStyles } from '../ui/accents'
import { ProjectDiagram } from '../diagrams/ProjectDiagram'
import { EASE_OUT, EASE_PANEL } from '../animations/motion'

const panelVariants = {
  closed: {},
  open: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
}

const panelItemVariants = {
  closed: { opacity: 0, y: 14 },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

export function Work() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="work" className="border-t border-cream/10 bg-night px-6 py-24 sm:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="type-eyebrow text-[10px] text-cream/50 sm:text-xs">{copy.work.label}</p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <WordsPullUpMultiStyle
              segments={[
                { text: copy.work.line1, className: 'text-cream' },
                {
                  text: copy.work.line2,
                  className: 'font-serif italic tracking-normal text-cream/40 [font-stretch:100%]',
                },
              ]}
              className="type-display gap-x-[0.28em] text-2xl sm:text-3xl md:text-4xl"
            />
          </div>
          <p className="text-xs text-cream/40">{copy.work.hint}</p>
        </div>

        <div className="mt-12 border-t border-cream/10">
          {profile.projects.map((project, i) => {
            const accent = accentStyles[project.accent]
            const isOpen = openId === project.id
            const art = assets.projectArt[project.id]
            return (
              <div key={project.id} className="border-b border-cream/10">
                <button
                  onClick={() => setOpenId(isOpen ? null : project.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center gap-4 py-6 text-left md:gap-6"
                >
                  <span className="tnum w-8 shrink-0 text-xs text-cream/40 md:text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150 ${accent.dot}`}
                  />
                  <div className="min-w-0 flex-1">
                    <span className="type-display block text-xl text-cream transition-all duration-300 group-hover:translate-x-2 group-hover:text-amber md:text-3xl">
                      {project.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-cream/40 md:hidden">
                      {project.tagline}
                    </span>
                  </div>
                  <span className="hidden text-sm text-cream/40 md:block">{project.tagline}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors group-hover:border-amber/60"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE_PANEL }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        variants={panelVariants}
                        initial="closed"
                        animate="open"
                        className="grid gap-8 pb-10 pl-0 pr-1 sm:pl-12 md:pl-[4.5rem] lg:grid-cols-5"
                      >
                        <motion.div
                          variants={panelItemVariants}
                          className="min-w-0 space-y-6 lg:col-span-2"
                        >
                          <p className="text-sm leading-relaxed text-cream/80 md:text-base">
                            {project.description}
                          </p>
                          <div className="space-y-4 border-t border-cream/10 pt-5 text-sm">
                            <div className="flex gap-6">
                              <div>
                                <p className="type-micro text-[10px] text-cream/40">Role</p>
                                <p className="mt-1 text-cream">{project.role}</p>
                              </div>
                              <div>
                                <p className="type-micro text-[10px] text-cream/40">Period</p>
                                <p className="mt-1 text-cream">{project.period}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                              {project.stack.map((tech) => (
                                <span key={tech} className={`text-xs ${accent.text}`}>
                                  {tech}
                                </span>
                              ))}
                            </div>
                            {project.confidential && (
                              <p className="flex items-center gap-1.5 text-xs text-cream/40">
                                <Lock className="h-3 w-3" strokeWidth={1.5} /> Under NDA
                              </p>
                            )}
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="group/link inline-flex items-center gap-1 text-xs font-semibold text-cream underline-offset-4 hover:underline"
                              >
                                Visit{' '}
                                <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:-translate-y-[0.14em] group-hover/link:translate-x-[0.14em]" />
                              </a>
                            )}
                          </div>
                        </motion.div>

                        <div className="min-w-0 space-y-6 lg:col-span-3">
                          {art && (
                            <motion.div
                              variants={panelItemVariants}
                              className="relative aspect-[21/10] overflow-hidden rounded-lg"
                            >
                              <motion.img
                                src={art}
                                alt={`${project.name} — illustrated scene`}
                                initial={{ scale: 1.06 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 5, ease: EASE_OUT }}
                                whileHover={{
                                  scale: 1.03,
                                  transition: { duration: 0.9, ease: EASE_OUT },
                                }}
                                className="absolute inset-0 h-full w-full object-cover"
                              />
                            </motion.div>
                          )}
                          <motion.div variants={panelItemVariants} className="min-w-0">
                            <p className="type-micro text-[10px] text-cream/40">How it works</p>
                            <div className="mt-4 overflow-x-auto rounded-lg border border-cream/10 bg-navy/40">
                              <div className="min-w-[540px] p-4 md:p-6">
                                <ProjectDiagram projectId={project.id} accent={project.accent} />
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
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
