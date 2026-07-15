import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { skillGroups } from "@/lib/data/skills";

export function Skills() {
  return (
    <section id="skills" className="section-padding" aria-label="Skills">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="Technical &amp; Operational Skill Set"
          description="A blend of AI, automation, hospitality operations, development, and the soft skills that make automation projects actually land."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <Card key={group.id} delay={(index % 3) * 0.08}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-950/5 text-navy-950 dark:bg-white/10 dark:text-accent-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-navy-950 dark:text-white">
                    {group.title}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
