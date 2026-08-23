import { z } from 'zod'

export const identitySchema = z.object({
  name: z.string().min(1),
  firstName: z.string().min(1),
  title: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  github: z.string().url(),
  linkedin: z.string().url(),
})

export const specialitySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  blurb: z.string().min(1),
  points: z.array(z.string().min(1)).min(2),
  icon: z.enum(['brain', 'layers', 'clapperboard']),
  accent: z.enum(['amber', 'moss', 'skyblue', 'rose', 'gold']),
})

export const projectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  role: z.string().min(1),
  stack: z.array(z.string().min(1)).min(1),
  period: z.string().min(1),
  accent: z.enum(['amber', 'moss', 'skyblue', 'rose', 'gold']),
  link: z.string().url().optional(),
  confidential: z.boolean().optional(),
  /** Short status chip, e.g. "Now building". */
  badge: z.string().optional(),
  /** Rich expandable paragraphs (Ege-style deep dive). */
  detail: z.array(z.string().min(1)).optional(),
  /** Detailed contribution bullets. */
  roleBullets: z.array(z.string().min(1)).optional(),
  /** Outbound links: live site, App Store, source, channel. */
  links: z.array(z.object({ label: z.string().min(1), url: z.string().url() })).optional(),
})

export const journeyItemSchema = z.object({
  id: z.string().min(1),
  period: z.string().min(1),
  title: z.string().min(1),
  org: z.string().min(1),
  description: z.string().min(1),
  kind: z.enum(['education', 'work', 'partnership']),
})

export const resumeSchema = z.object({
  phone: z.string().min(6),
  summary: z.string().min(1),
  skillGroups: z
    .array(
      z.object({
        label: z.string().min(1),
        items: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
  experience: z
    .array(
      z.object({
        role: z.string().min(1),
        org: z.string().min(1),
        period: z.string().min(1),
        location: z.string().optional(),
        bullets: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
  education: z
    .array(
      z.object({
        degree: z.string().min(1),
        school: z.string().min(1),
        period: z.string().min(1),
        note: z.string().optional(),
      }),
    )
    .min(1),
  languages: z.array(z.object({ name: z.string().min(1), level: z.string().min(1) })).min(1),
  academicProjects: z
    .array(
      z.object({
        name: z.string().min(1),
        year: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .optional(),
})

export const profileSchema = z.object({
  identity: identitySchema,
  hero: z.object({
    tagline: z.string().min(1),
    cta: z.string().min(1),
  }),
  about: z.object({
    label: z.string().min(1),
    headingSegments: z
      .array(z.object({ text: z.string().min(1), serif: z.boolean().optional() }))
      .min(1),
    body: z.string().min(1),
  }),
  stats: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).min(1),
  specialities: z.array(specialitySchema).length(3),
  projects: z.array(projectSchema).min(4),
  journey: z.array(journeyItemSchema).min(2),
  resume: resumeSchema,
})

export type Profile = z.infer<typeof profileSchema>
export type Speciality = z.infer<typeof specialitySchema>
export type Project = z.infer<typeof projectSchema>
export type JourneyItem = z.infer<typeof journeyItemSchema>
export type ResumeData = z.infer<typeof resumeSchema>
