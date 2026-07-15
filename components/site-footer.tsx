import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/portfolio-data'

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent font-mono text-sm font-bold text-primary-foreground">
            AG
          </span>
          <div>
            <p className="text-sm font-semibold">ASHHA G</p>
            <p className="text-xs text-muted-foreground">
              Built with Next.js, React, Tailwind CSS, and Framer Motion.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-center text-xs text-muted-foreground sm:text-left">
        Copyright &copy; 2026 ASHHA G. All rights reserved.
      </p>
    </footer>
  )
}
