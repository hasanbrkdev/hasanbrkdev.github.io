// Generated cozy artwork lives in /public/assets. Paths are nullable so the
// site renders sensible fallbacks until an asset exists.
// Ambient loops pair a compressed mp4 with a poster extracted from its own
// first frame, so the poster→video swap never jumps even when the generated
// clip reframes the source artwork.
export interface LoopMedia {
  video: string
  poster: string
}

export const assets: {
  heroVideo: string | null
  heroImage: string | null
  heroCutout: string | null
  specialitiesImage: string | null
  specialitiesLoop: LoopMedia | null
  resumeImage: string | null
  projectArt: Record<string, string>
  projectLoops: Record<string, LoopMedia>
} = {
  // Hero poster + cutout are both derived from the loop's own first frame,
  // so background video, poster and foreground island stay pixel-locked.
  heroVideo: '/assets/hero-loop.mp4',
  heroImage: '/assets/hero-poster.jpg',
  heroCutout: '/assets/hero-cutout.png',
  specialitiesImage: '/assets/specialities.jpg',
  specialitiesLoop: {
    video: '/assets/specialities-loop.mp4',
    poster: '/assets/specialities-poster.jpg',
  },
  resumeImage: null,
  projectArt: {
    lumos: '/assets/lumos.jpg',
    gia: '/assets/gia.jpg',
    carousel: '/assets/carousel.jpg',
    reconchille: '/assets/reconchille.jpg',
    koi: '/assets/koi.jpg',
    qplace: '/assets/qplace.jpg',
    traveler: '/assets/traveler.jpg',
    'video-engine': '/assets/video-engine.jpg',
    'meta-learner': '/assets/meta-learner.jpg',
    'ml-eval': '/assets/ml-eval.jpg',
    colorization: '/assets/colorization.jpg',
  },
  projectLoops: {
    lumos: { video: '/assets/lumos-loop.mp4', poster: '/assets/lumos-poster.jpg' },
    gia: { video: '/assets/gia-loop.mp4', poster: '/assets/gia-poster.jpg' },
    carousel: { video: '/assets/carousel-loop.mp4', poster: '/assets/carousel-poster.jpg' },
    reconchille: {
      video: '/assets/reconchille-loop.mp4',
      poster: '/assets/reconchille-poster.jpg',
    },
    koi: { video: '/assets/koi-loop.mp4', poster: '/assets/koi-poster.jpg' },
  },
}
