import { describe, it, expect } from 'vitest'
import { assets } from './assets'
import { profile } from './profile'

// Vite resolves this at transform time, so the test fails when a referenced
// file is missing from public/assets.
const publicFiles = Object.keys(import.meta.glob('../../public/assets/*')).map((p) =>
  p.replace('../../public', ''),
)

describe('assets', () => {
  it('every project art path resolves to a file on disk', () => {
    for (const art of Object.values(assets.projectArt)) {
      expect(publicFiles).toContain(art)
    }
  })

  it('all five featured projects have an ambient loop with poster on disk', () => {
    for (const id of ['lumos', 'gia', 'carousel', 'reconchille', 'koi']) {
      const loop = assets.projectLoops[id]
      expect(loop, `missing loop for ${id}`).toBeDefined()
      expect(loop.video).toMatch(/^\/assets\/.+\.mp4$/)
      expect(loop.poster).toMatch(/^\/assets\/.+\.jpg$/)
      expect(publicFiles).toContain(loop.video)
      expect(publicFiles).toContain(loop.poster)
    }
  })

  it('every loop key maps to a known project', () => {
    const ids = profile.projects.map((p) => p.id)
    for (const key of Object.keys(assets.projectLoops)) {
      expect(ids).toContain(key)
    }
  })

  it('specialities panorama has an ambient loop with poster on disk', () => {
    const loop = assets.specialitiesLoop
    expect(loop).not.toBeNull()
    if (loop) {
      expect(publicFiles).toContain(loop.video)
      expect(publicFiles).toContain(loop.poster)
    }
  })
})
