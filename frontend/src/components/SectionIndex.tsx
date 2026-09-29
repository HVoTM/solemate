import { Link } from "react-router";
import type { SectionMeta } from "@/sections/registry";

/** Table-of-contents style index, one row per section; clicking scrolls to that section. */
export default function SectionIndex({ sections }: { sections: SectionMeta[] }) {
  return (
    <nav aria-label="Project overview" className="mx-auto max-w-md">
      <ol className="flex flex-col gap-2.5">
        {sections.map(({ id, label }, i) => (
          <li key={id}>
            <Link
              to={`/#${id}`}
              className="group flex items-baseline gap-3 rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <span className="font-mono text-xs text-muted-foreground">({i + 1})</span>
              <span
                aria-hidden
                className="flex-1 translate-y-[-0.25em] border-b border-dotted border-muted-foreground/50 transition-colors group-hover:border-foreground/60"
              />
              <span className="text-sm font-medium transition-colors group-hover:text-primary">{label}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
