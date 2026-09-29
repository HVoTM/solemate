import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of the section currently in the reading zone
 * (a band just below the sticky header), or null above the first section.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      // Band from 20% to 40% down the viewport: a section becomes active as its top enters it.
      { rootMargin: "-20% 0px -60% 0px" },
    );
    const els = ids.map((id) => document.getElementById(id)).filter((el) => el !== null);
    els.forEach((el) => observer.observe(el));

    // Clear the highlight when scrolled back above the first section.
    const onScroll = () => {
      if (els[0] && els[0].getBoundingClientRect().top > window.innerHeight * 0.4) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  return active;
}
