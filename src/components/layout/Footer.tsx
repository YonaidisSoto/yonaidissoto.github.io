import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { siteConfig } from "@/lib/data/site";
import { navItems } from "@/lib/data/nav";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/70 bg-white py-12 dark:border-white/10 dark:bg-navy-950">
      <Container className="flex flex-col items-center gap-6 text-center">
        <a href="#home" className="font-display text-lg font-bold text-navy-950 dark:text-white">
          {siteConfig.name}
        </a>

        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-600 transition-colors hover:text-navy-950 dark:text-slate-400 dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-950/10 text-navy-950 transition-colors hover:bg-navy-950/5 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
          >
            <FiLinkedin className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-950/10 text-navy-950 transition-colors hover:bg-navy-950/5 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
          >
            <FiGithub className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Send an email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-950/10 text-navy-950 transition-colors hover:bg-navy-950/5 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
          >
            <FiMail className="h-4 w-4" />
          </a>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-500">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
