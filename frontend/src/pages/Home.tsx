import { Link } from "react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionIndex from "@/components/SectionIndex";
import SectionNav from "@/components/SectionNav";
import { Section } from "@/sections/Section";
import { homeSections } from "@/sections/registry";

export default function Home() {
  return (
    <div>
      <section className="pt-6 pb-16 text-center">
        <Badge variant="secondary" className="mb-6">
          Innovation Challenge
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Solemate</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          One or two sentences on the problem you're solving and why it matters [add own slogan or sth here].
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to={`/#${homeSections[0].id}`}>
              Explore the project <ArrowDown data-icon="inline-end" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/dashboard">
              View results <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </section>

      <SectionIndex sections={homeSections} />

      <div className="mt-16">
        <SectionNav sections={homeSections} />
        {homeSections.map((s, i) => (
          <Section key={s.id} meta={s} index={i}>
            <s.Component />
          </Section>
        ))}
      </div>
    </div>
  );
}
