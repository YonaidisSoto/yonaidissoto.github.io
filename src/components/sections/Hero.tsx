"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { siteConfig } from "@/lib/data/site";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 sm:pt-24"
      aria-label="Introduction"
    >
      <div
        className="absolute inset-0 -z-10 bg-grid-slate opacity-40"
        aria-hidden="true"
      />
      <div
        className="absolute -right-40 -top-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-accent-400/20 blur-3xl dark:bg-accent-500/10"
        aria-hidden="true"
      />
      <div
        className="absolute -left-40 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-navy-700/10 blur-3xl dark:bg-navy-600/20"
        aria-hidden="true"
      />

      <Container className="grid items-center gap-16 pb-20 lg:grid-cols-[1.1fr,0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge>Available for freelance &amp; full-time roles</Badge>

          <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-navy-950 sm:text-5xl lg:text-6xl dark:text-white">
            AI Automation Specialist bridging{" "}
            <span className="text-gradient">Hospitality</span> and{" "}
            <span className="text-gradient">Intelligent Automation</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            I&apos;m {siteConfig.name}, an AI Automation Specialist helping hotel and business
            teams design AI-powered workflow automation — from n8n and OpenAI
            integrations to front office process improvement — so teams spend
            less time on repetitive work and more time on the guest and the
            business.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <LinkButton href="#projects" variant="primary">
              View Portfolio
              <FiArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="#contact" variant="secondary">
              Let&apos;s Connect
            </LinkButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="relative animate-float">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-400/30 to-navy-700/30 blur-2xl" />
            <div className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] shadow-2xl shadow-navy-950/20">
              <Image
                src="/portrait.png.png"
                alt={`${siteConfig.name} portrait`}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 24rem, 80vw"
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
