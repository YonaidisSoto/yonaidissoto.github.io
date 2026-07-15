import { FiCheckCircle, FiExternalLink, FiGithub } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProjectImagePlaceholder } from "@/components/ui/ProjectImagePlaceholder";
import { projects } from "@/lib/data/projects";

export function Projects() {
  return (
    <section id="projects" className="section-padding" aria-label="Projects">
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="AI Automation Projects &amp; Case Studies"
          description="Selected workflow automation and generative AI projects, each solving a real operational problem."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={project.id} delay={(index % 2) * 0.1} className="flex flex-col overflow-hidden p-0">
              <ProjectImagePlaceholder
                gradient={project.gradient}
                title={project.title}
                className="h-44 w-full"
              />

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold text-navy-950 dark:text-white">
                  {project.title}
                </h3>

                <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  <p>
                    <span className="font-semibold text-navy-950 dark:text-white">Problem: </span>
                    {project.problem}
                  </p>
                  <p>
                    <span className="font-semibold text-navy-950 dark:text-white">Solution: </span>
                    {project.solution}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                <ul className="mt-4 space-y-2">
                  {project.results.map((result) => (
                    <li
                      key={result}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <FiCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-600 dark:text-accent-400" />
                      {result}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex gap-3 pt-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-full border border-navy-950/15 px-4 py-2 text-xs font-semibold text-navy-950 transition-colors hover:bg-navy-950/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                    >
                      <FiGithub className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-800 dark:bg-accent-500 dark:text-navy-950 dark:hover:bg-accent-400"
                    >
                      Live Demo
                      <FiExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
