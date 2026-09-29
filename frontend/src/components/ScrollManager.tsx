import { useEffect } from "react";
import { useLocation } from "react-router";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * React Router doesn't handle scrolling on its own. This:
 * - scrolls to the element matching the URL hash (/#market), also when arriving from another page;
 * - scrolls to the top on every other page change (otherwise you land mid-page).
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    // `key` changes on every navigation, so clicking the same anchor twice still scrolls.
  }, [pathname, hash, key]);

  return null;
}
