import { describe, it, expect } from 'vitest'
import { profileSchema } from './schema'
import { profile } from './profile'
import { buildResumeModel } from './resumeModel'

describe('profile content', () => {
  it('validates against the schema', () => {
    expect(() => profileSchema.parse(profile)).not.toThrow()
  })

  it('has a valid contact email', () => {
    expect(profile.identity.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  })

  it('features the five selected projects', () => {
    const ids = profile.projects.map((p) => p.id)
    expect(ids).toContain('lumos')
    expect(ids).toContain('gia')
    expect(ids).toContain('reconchille')
    expect(ids).toContain('koi')
    expect(ids).toContain('carousel')
    expect(profile.projects.length).toBeGreaterThanOrEqual(5)
  })

  it('has exactly three specialities, each with points', () => {
    expect(profile.specialities).toHaveLength(3)
    for (const s of profile.specialities) {
      expect(s.points.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('keeps the phone number out of site-visible identity', () => {
    expect(Object.keys(profile.identity)).not.toContain('phone')
    expect(profile.resume.phone.length).toBeGreaterThan(5)
  })
})

describe('buildResumeModel', () => {
  const model = buildResumeModel(profile)

  it('merges identity and resume contact details', () => {
    expect(model.name).toBe(profile.identity.name)
    expect(model.contact.email).toBe(profile.identity.email)
    expect(model.contact.phone).toBe(profile.resume.phone)
    expect(model.contact.github).toContain('github.com')
  })

  it('carries non-empty experience, education and skills', () => {
    expect(model.experience.length).toBeGreaterThan(0)
    expect(model.education.length).toBeGreaterThan(0)
    expect(model.skillGroups.length).toBeGreaterThan(0)
    for (const g of model.skillGroups) {
      expect(g.items.length).toBeGreaterThan(0)
    }
  })

  it('every experience entry has bullets', () => {
    for (const e of model.experience) {
      expect(e.bullets.length).toBeGreaterThan(0)
    }
  })
})
