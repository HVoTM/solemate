/*
 * Home-page section registry — the single place that controls which sections
 * appear, in what order, and how they're labelled in the index and section nav.
 *
 * - Reorder: move entries in `homeSections`.
 * - Hide: comment an entry out.
 * - Move a section to its own page: render <Section meta={...} index={0}><X /></Section> in a new route.
 * - Section `id`s are the URL anchors (/#market), so changing one breaks shared links to it.
 */
import type { ComponentType } from "react";
import { Award, Briefcase, CircleHelp, Lightbulb, Microscope, Target, type LucideIcon } from "lucide-react";
import Why from "./Why";
import Solution from "./Solution";
import Technical from "./Technical";
import Market from "./Market";
import BusinessModel from "./BusinessModel";
import Advantages from "./Advantages";

export type SectionMeta = {
  id: string;
  /** Short name for the index and the section nav. */
  label: string;
  /** Full heading inside the section. */
  title: string;
  /** One-line summary shown under the heading. */
  blurb: string;
  icon: LucideIcon;
  Component: ComponentType;
};

export const homeSections: SectionMeta[] = [
  {
    id: "why",
    label: "Why",
    title: "Why this matters",
    blurb: "The problem, who it affects, and why existing options fall short.",
    icon: CircleHelp,
    Component: Why,
  },
  {
    id: "solution",
    label: "Solution",
    title: "Our solution",
    blurb: "What Solemate is and how people use it.",
    icon: Lightbulb,
    Component: Solution,
  },
  {
    id: "technical",
    label: "Technology",
    title: "Technical properties & scientific mechanism",
    blurb: "Why we focus on the foot, the specifications, and the science that makes it work.",
    icon: Microscope,
    Component: Technical,
  },
  {
    id: "market",
    label: "Market",
    title: "Market size",
    blurb: "How big the opportunity is, and which part we can realistically capture.",
    icon: Target,
    Component: Market,
  },
  {
    id: "business-model",
    label: "Business model",
    title: "Business model",
    blurb: "Who pays, for what, and how we reach them.",
    icon: Briefcase,
    Component: BusinessModel,
  },
  {
    id: "advantages",
    label: "Advantages",
    title: "Competitive advantages",
    blurb: "How Solemate compares to the alternatives.",
    icon: Award,
    Component: Advantages,
  },
];
