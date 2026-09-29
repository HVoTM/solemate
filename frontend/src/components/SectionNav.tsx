import { useMemo } from "react";
import { Link } from "react-router";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { SectionMeta } from "@/sections/registry";

/** Sticky in-page nav under the header; highlights the section being read. */
export default function SectionNav({ sections }: { sections: SectionMeta[] }) {
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(ids);

  return (
    <nav
      aria-label="Sections"
      className="sticky top-14 z-10 -mx-4 border-b bg-background/85 px-4 backdrop-blur"
    >
      <ul className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        {sections.map((s) => (
          <li key={s.id} className="shrink-0">
            <Link
              to={`/#${s.id}`}
              aria-current={active === s.id ? "location" : undefined}
              className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground aria-[current]:bg-secondary aria-[current]:font-medium aria-[current]:text-foreground"
            >
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
