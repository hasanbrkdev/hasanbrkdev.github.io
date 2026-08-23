import { MotionConfig } from 'framer-motion'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Specialities } from '../components/sections/Specialities'
import { Work } from '../components/sections/Work'
import { Journey } from '../components/sections/Journey'
import { ResumeCta } from '../components/sections/ResumeCta'
import { Footer } from '../components/sections/Footer'

export default function Home() {
  return (
    <main className="bg-night">
      <MotionConfig reducedMotion="user">
        <Hero />
        <About />
        <Specialities />
        <Work />
        <Journey />
        <ResumeCta />
        <Footer />
        {/* Global film grain — single fixed layer instead of per-section noise */}
        <div aria-hidden className="bg-noise pointer-events-none fixed inset-0 z-[60] opacity-[0.035]" />
      </MotionConfig>
    </main>
  )
}
