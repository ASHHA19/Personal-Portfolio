'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { GithubIcon } from '@/components/brand-icons'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { projectCategories, projects } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>('All')

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work across AI, vision & hardware"
          description="Real projects that combine machine learning, computer vision, and embedded engineering."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                'relative rounded-full px-4 py-2 text-sm transition-colors',
                filter === cat
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {filter === cat ? (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                />
              ) : (
                <span className="absolute inset-0 -z-10 rounded-full border border-border bg-card/50" />
              )}
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.title}
                layout
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={viewportOnce}
                whileHover={{ y: -8 }}
                className="glass group flex flex-col overflow-hidden rounded-2xl transition-colors hover:border-primary/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-xs text-foreground backdrop-blur">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-secondary/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                    >
                      <GithubIcon className="h-4 w-4" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
