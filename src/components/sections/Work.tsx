import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Lock, ArrowUpRight } from 'lucide-react'
import { profile } from '../../content/profile'
import { copy } from '../../content/copy'
import { assets } from '../../content/assets'
import { WordsPullUpMultiStyle } from '../animations/WordsPullUpMultiStyle'
import { accentStyles } from '../ui/accents'
import { ProjectDiagram } from '../diagrams/ProjectDiagram'

const EASE = [0.22, 1, 0.36, 1] as const

export function Work() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="work" className="border-t border-cream/10 bg-night px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="text-[10px] uppercase tracking-[0.25em] text-cream/50 sm:text-xs">
          {copy.work.label}
        </p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <WordsPullUpMultiStyle
              segments={[
                { text: copy.work.line1, className: 'text-cream' },
                { text: copy.work.line2, className: 'font-serif italic text-cream/40' },
              ]}
              className="gap-x-[0.28em] text-2xl font-light sm:text-3xl md:text-4xl"
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
                  <span className="w-8 shrink-0 text-xs text-cream/40 md:text-sm">0{i + 1}</span>
                  <span className={`h-2 w-2 shrink-0 rounded-full ${accent.dot}`} />
                  <span className="flex-1 text-xl font-light text-cream transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                    {project.name}
                  </span>
                  <span className="hidden text-sm text-cream/40 md:block">{project.tagline}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors group-hover:border-cream/50"
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
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 pl-12 pr-1 md:pl-[4.5rem] lg:grid-cols-5">
                        <div className="space-y-6 lg:col-span-2">
                          <p className="text-sm leading-relaxed text-cream/80 md:text-base">
                            {project.description}
                          </p>
                          <div className="space-y-4 border-t border-cream/10 pt-5 text-sm">
                            <div className="flex gap-6">
                              <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
                                  Role
                                </p>
                                <p className="mt-1 text-cream">{project.role}</p>
                              </div>
                              <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
                                  Period
                                </p>
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
                                className="inline-flex items-center gap-1 text-xs font-bold text-cream underline-offset-4 hover:underline"
                              >
                                Visit <ArrowUpRight className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="space-y-6 lg:col-span-3">
                          {art && (
                            <div className="relative aspect-[21/10] overflow-hidden rounded-lg">
                              <img
                                src={art}
                                alt={`${project.name} — illustrated scene`}
                                className="absolute inset-0 h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
                              How it works
                            </p>
                            <div className="mt-4 rounded-lg border border-cream/10 bg-navy/40 p-4 md:p-6">
                              <ProjectDiagram projectId={project.id} accent={project.accent} />
                            </div>
                          </div>
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
