import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { services } from "@/lib/data/services";

export function Services() {
  return (
    <section
      id="services"
      className="section-padding bg-slate-50/60 dark:bg-navy-900/40"
      aria-label="Services"
    >
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="AI Automation &amp; Hospitality Technology Services"
          description="Practical, production-ready automation for teams that want AI and workflow automation to actually save time — not add complexity."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} delay={(index % 3) * 0.08}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950/5 text-navy-950 dark:bg-white/10 dark:text-accent-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy-950 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
