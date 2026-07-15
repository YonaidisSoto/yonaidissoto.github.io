"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { experienceItems } from "@/lib/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      className="section-padding bg-slate-50/60 dark:bg-navy-900/40"
      aria-label="Experience"
    >
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Professional Experience"
          description="Operational depth in hospitality, now channeled into AI automation work."
        />

        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute bottom-0 left-4 top-0 w-px bg-slate-200 dark:bg-white/10"
            aria-hidden="true"
          />

          <ol className="space-y-10">
            {experienceItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-12"
              >
                <span
                  className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white text-xs font-bold text-white dark:border-navy-900 ${
                    item.current ? "bg-accent-500" : "bg-navy-700"
                  }`}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>

                <div className="card-surface p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-navy-950 dark:text-white">
                      {item.role}
                    </h3>
                    {item.current && (
                      <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700 dark:bg-accent-500/10 dark:text-accent-300">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {item.organization} &middot; {item.period} &middot; {item.location}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.description.map((line) => (
                      <li
                        key={line}
                        className="text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
