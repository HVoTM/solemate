import type { ReactNode } from "react";
import type { SectionMeta } from "./registry";

/** Shared frame for every home-page section: anchor id, numbered eyebrow, heading and intro. */
export function Section({ meta, index, children }: { meta: SectionMeta; index: number; children: ReactNode }) {
  return (
    // scroll-mt-28 keeps the heading clear of the sticky header + section nav when jumped to.
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="scroll-mt-28 border-t py-16">
      <p className="font-mono text-sm text-primary">
        {String(index + 1).padStart(2, "0")} · {meta.label}
      </p>
      <h2 id={`${meta.id}-title`} className="mt-2 text-3xl font-semibold tracking-tight">
        {meta.title}
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">{meta.blurb}</p>
      <div className="mt-10">{children}</div>
    </section>
  );
}

/** Dashed box marking where an image, diagram or real content still needs to go. */
export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed bg-muted/40 p-6 text-center text-sm text-muted-foreground ${className}`}
    >
      {label}
    </div>
  );
}
