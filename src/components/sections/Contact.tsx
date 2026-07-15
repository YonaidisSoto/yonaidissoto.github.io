"use client";

import { useState, type FormEvent } from "react";
import { FiDownload, FiGithub, FiLinkedin, FiMail, FiSend } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Button, LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/data/site";

// This site is statically exported for GitHub Pages, which has no server
// runtime for a form submission API. The form below opens the visitor's
// email client via a `mailto:` link pre-filled with their message. To
// collect submissions directly, wire this up to a form service such as
// Formspree, Getform, or EmailJS and swap the onSubmit handler below.
export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-padding" aria-label="Contact">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's Automate Something Together"
            align="left"
            description="Whether you're hiring, running a hotel, or building a product that needs AI automation, I'd like to hear about it."
          />

          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 text-sm font-medium text-slate-700 transition-colors hover:text-navy-950 dark:text-slate-300 dark:hover:text-white"
            >
              <FiMail className="h-4 w-4 text-accent-600 dark:text-accent-400" />
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-3 text-sm font-medium text-slate-700 transition-colors hover:text-navy-950 dark:text-slate-300 dark:hover:text-white"
            >
              <FiLinkedin className="h-4 w-4 text-accent-600 dark:text-accent-400" />
              LinkedIn
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-3 text-sm font-medium text-slate-700 transition-colors hover:text-navy-950 dark:text-slate-300 dark:hover:text-white"
            >
              <FiGithub className="h-4 w-4 text-accent-600 dark:text-accent-400" />
              GitHub
            </a>
          </div>

          <LinkButton href={siteConfig.links.resume} variant="secondary" className="mt-8">
            <FiDownload className="h-4 w-4" />
            Download Resume
          </LinkButton>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card-surface flex flex-col gap-4 p-6"
          aria-label="Contact form"
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium text-navy-950 dark:text-white">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none transition-colors focus:border-accent-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-navy-950 dark:text-white">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none transition-colors focus:border-accent-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium text-navy-950 dark:text-white">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none transition-colors focus:border-accent-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
            />
          </div>

          <Button type="submit" variant="primary" className="mt-2 w-full">
            Send Message
            <FiSend className="h-4 w-4" />
          </Button>
        </form>
      </Container>
    </section>
  );
}
