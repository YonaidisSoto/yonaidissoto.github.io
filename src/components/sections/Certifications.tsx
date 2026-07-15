import { FiAward, FiClock } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { certifications } from "@/lib/data/certifications";

const statusLabel: Record<string, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  planned: "Planned",
};

export function Certifications() {
  return (
    <section
      id="certifications"
      className="section-padding bg-slate-50/60 dark:bg-navy-900/40"
      aria-label="Certifications"
    >
      <Container>
        <SectionHeading
          eyebrow="Certifications"
          title="Certifications &amp; Professional Development"
          description="Formal training in workflow automation and generative AI, layered on top of hands-on operational experience."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <Card key={cert.id} delay={(index % 3) * 0.08}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-950/5 text-navy-950 dark:bg-white/10 dark:text-accent-300">
                  {cert.status === "completed" ? (
                    <FiAward className="h-5 w-5" />
                  ) : (
                    <FiClock className="h-5 w-5" />
                  )}
                </div>
                <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700 dark:bg-accent-500/10 dark:text-accent-300">
                  {statusLabel[cert.status]}
                </span>
              </div>

              <h3 className="mt-4 font-display text-base font-semibold text-navy-950 dark:text-white">
                {cert.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {cert.issuer} &middot; {cert.date}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
