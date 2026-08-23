import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Specialities } from '../components/sections/Specialities'
import { Work } from '../components/sections/Work'
import { Journey } from '../components/sections/Journey'
import { ResumeCta } from '../components/sections/ResumeCta'
import { Footer } from '../components/sections/Footer'

export default function Home() {
  return (
    <main className="bg-paper">
      <Hero />
      <About />
      <Specialities />
      <Work />
      <Journey />
      <ResumeCta />
      <Footer />
    </main>
  )
}
