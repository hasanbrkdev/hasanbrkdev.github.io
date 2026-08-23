import type { Profile } from './schema'

export interface ResumeModel {
  name: string
  title: string
  contact: {
    email: string
    phone: string
    location: string
    github: string
    linkedin: string
  }
  summary: string
  skillGroups: Profile['resume']['skillGroups']
  experience: Profile['resume']['experience']
  education: Profile['resume']['education']
  languages: Profile['resume']['languages']
  academicProjects: NonNullable<Profile['resume']['academicProjects']>
}

// Flattens site identity + resume-only fields into the exact shape the PDF
// renders. The tailoring workflow only ever touches profile.ts; this mapping
// (and the PDF layout) stay fixed.
export function buildResumeModel(profile: Profile): ResumeModel {
  return {
    name: profile.identity.name,
    title: profile.identity.title,
    contact: {
      email: profile.identity.email,
      phone: profile.resume.phone,
      location: profile.identity.location,
      github: profile.identity.github,
      linkedin: profile.identity.linkedin,
    },
    summary: profile.resume.summary,
    skillGroups: profile.resume.skillGroups,
    experience: profile.resume.experience,
    education: profile.resume.education,
    languages: profile.resume.languages,
    academicProjects: profile.resume.academicProjects ?? [],
  }
}
