"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { statCounters } from "@/lib/data/education";

const paragraphs = [
  "My career started on the front lines of hospitality operations, managing front office workflows, reservations, and guest communication at properties like YOTEL Miami using Oracle OPERA Cloud PMS. That hands-on operational experience taught me exactly where manual, repetitive work slows teams down.",
  "That frustration became curiosity, and curiosity became a new discipline: AI automation. I now design workflow automations with n8n, OpenAI, and Make that take the repetitive parts of hotel and business operations — guest messaging, reporting, content drafting, SOP documentation — off people's plates.",
  "I combine operational fluency in hospitality technology with growing technical depth in prompt engineering, API integration, and workflow design. I'm continuously learning, currently deepening my skills in AI agent development and advanced automation architecture, because this field moves fast and I intend to move with it.",
];

export function About() {
  return (
    <section id="about" className="section-padding" aria-label="About Yonaidis Soto">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="From Front Office Operations to AI Automation"
          description="A hospitality background paired with a growing command of artificial intelligence and workflow automation."
        />

        <div className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-5">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-base leading-relaxed text-slate-600 dark:text-slate-300"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {statCounters.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-surface flex flex-col items-center justify-center gap-1 p-6 text-center"
              >
                <span className="font-display text-3xl font-bold text-navy-950 dark:text-white">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
