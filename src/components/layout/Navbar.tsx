"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { navItems } from "@/lib/data/nav";
import { siteConfig } from "@/lib/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const activeId = useActiveSection(navItems.map((item) => item.href.replace("#", "")));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-navy-950/80"
          : "bg-transparent"
      )}
    >
      <Container className="flex items-center justify-between py-4">
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-navy-950 dark:text-white"
        >
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = activeId === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-navy-950/5 text-navy-950 dark:bg-white/10 dark:text-white"
                    : "text-slate-600 hover:text-navy-950 dark:text-slate-300 dark:hover:text-white"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-950/10 text-navy-950 lg:hidden dark:border-white/15 dark:text-white"
          >
            {open ? <FiX className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-slate-200/70 bg-white/95 backdrop-blur-md lg:hidden dark:border-white/10 dark:bg-navy-950/95"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-navy-950/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
