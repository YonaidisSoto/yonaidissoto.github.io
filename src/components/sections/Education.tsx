import { FiBookOpen } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { educationItems } from "@/lib/data/education";

export function Education() {
  return (
    <section id="education" className="section-padding" aria-label="Education">
      <Container>
        <SectionHeading
          eyebrow="Education"
          title="Education &amp; Continuous Learning"
          description="Formal hospitality management education combined with ongoing, self-directed learning in AI and automation."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {educationItems.map((item, index) => (
            <Card key={item.id} delay={(index % 3) * 0.08}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-950/5 text-navy-950 dark:bg-white/10 dark:text-accent-300">
                <FiBookOpen className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-navy-950 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                {item.institution} &middot; {item.period}
              </p>
              {item.description && (
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
