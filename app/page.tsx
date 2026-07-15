import { HeroVideoBackground } from '@/components/hero-video-background'
import { CursorGlow } from '@/components/cursor-glow'
import { ScrollProgress } from '@/components/scroll-progress'
import { BackToTop } from '@/components/back-to-top'
import { Preloader } from '@/components/preloader'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Skills } from '@/components/sections/skills'
import { Projects } from '@/components/sections/projects'
import { Experience } from '@/components/sections/experience'
import { Certifications } from '@/components/sections/certifications'
import { Contact } from '@/components/sections/contact'

export default function Page() {
  return (
    <>
      <Preloader />
      <HeroVideoBackground />
      <CursorGlow />
      <ScrollProgress />
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  )
}
