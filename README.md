# Yonaidis Soto — Portfolio

Premium personal portfolio for **Yonaidis Soto**, AI Automation Specialist, built with
Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion. Statically exported
for GitHub Pages.

## Stack

- Next.js 15 (App Router, static export)
- TypeScript
- Tailwind CSS
- Framer Motion (scroll/entrance animations)
- react-icons + lucide-react
- next-themes (dark/light mode)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/            # Routes, root layout, metadata, not-found, loading
  components/
    layout/       # Navbar, Footer, ThemeToggle/Provider, BackToTop
    sections/     # Hero, About, Services, Projects, Certifications,
                  # Skills, Experience, Education, Contact
    ui/           # Reusable primitives: Button, Card, Badge, Container, etc.
  hooks/          # useActiveSection (scroll-spy), useScrolled
  lib/
    data/         # Content: site.ts, services.ts, projects.ts, skills.ts,
                  # experience.ts, certifications.ts, education.ts, nav.ts
    types/        # Shared TypeScript types
    utils/        # cn() className helper
public/
  robots.txt, sitemap.xml, site.webmanifest, favicon.svg, .nojekyll
.github/workflows/deploy.yml   # GitHub Actions -> GitHub Pages
```

## Editing content

All copy lives in `src/lib/data/*.ts` as typed arrays/objects — edit those files to
change services, projects, skills, experience, certifications, education, or site-wide
info (name, links, email, SEO keywords) without touching component markup.

## Placeholder assets to replace before going live

- `public/images/portrait.jpg` — replace `AvatarPlaceholder` in
  `src/components/sections/Hero.tsx` with a real `next/image` once you have a photo.
- `public/og-image.png` (1200×630) — referenced in `src/app/layout.tsx` for Open Graph /
  Twitter cards. Add the file; the metadata reference is already wired up.
- `public/resume.pdf` — referenced by the "Download Resume" button
  (`siteConfig.links.resume` in `src/lib/data/site.ts`).
- Project screenshots — `ProjectImagePlaceholder` renders a gradient placeholder per
  project; swap in real screenshots via `next/image` when available.
- Contact form — statically exported sites have no server API route, so the form in
  `src/components/sections/Contact.tsx` currently opens a pre-filled `mailto:` link.
  To capture submissions directly, connect it to Formspree, Getform, or EmailJS.

## Deploying to GitHub Pages

This repo is configured to deploy to **https://sotoyonaidis29.github.io/Yonaidissoto**.

1. Push this project to the `sotoyonaidis29/Yonaidissoto` repository, on the `main` branch.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab) — the
   `.github/workflows/deploy.yml` workflow builds the static export (`npm run build`,
   which runs `next build` with `output: "export"`) and publishes the `out/` folder.
4. The site will be live at `https://sotoyonaidis29.github.io/Yonaidissoto/` a minute or
   two after the workflow finishes.

If the repo is ever renamed, update `repoName` in `next.config.mjs` (and the URLs in
`src/lib/data/site.ts`, `public/robots.txt`, `public/sitemap.xml`, and
`public/site.webmanifest`) to match.

### Building locally

```bash
npm run build   # outputs static site to ./out
npx serve out   # preview the export locally
```

## Type-checking & linting

```bash
npm run typecheck
npm run lint
```
