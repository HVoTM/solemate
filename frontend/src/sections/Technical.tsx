import { ArrowRight, Footprints, PersonStanding, Scale } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// Import image static assets
import diabeticNeuropathyImg from "@/assets/conditions/diabetic-neuropathy.jpg";
import parkinsonsImg from "@/assets/conditions/parkinsons-disease.jpg";
import FallResponseFlow from "@/components/FallResponseFlow";

// "Why the foot?" — what foot receptors control, and how nerve damage shows up in pressure data.
const footFunctions = [
  { icon: Scale, label: "Balance" },
  { icon: PersonStanding, label: "Posture" },
  { icon: Footprints, label: "Movement adjustment" },
];

const signalChain = [
  "Nervous system is affected",
  "Neural control signals change",
  "Foot placement changes",
  "Pressure distribution changes",
];

const conditions = [
  {
    name: "Diabetic neuropathy",
    effect: "Loss of sensation and abnormal pressure distribution.",
    image: diabeticNeuropathyImg,
    alt: "Illustration of a foot with diabetic neuropathy: damaged nerves, narrowed blood vessels with reduced blood flow, and an ulcer on the sole.",
  },
  {
    name: "Parkinson’s disease",
    effect: "Reduced control over gait and stepping patterns.",
    image: parkinsonsImg,
    alt: "Illustration of Parkinson's disease symptoms: stooped posture, forward tilt of the trunk, tremors, reduced arm swing, and a shuffling, short-stepped gait.",
  },
];

// TODO: real specifications. Keep units in their own field so values stay aligned.
const properties = [
  { name: "Property 1", value: "—", unit: "unit" },
  { name: "Property 2", value: "—", unit: "unit" },
  { name: "Property 3", value: "—", unit: "unit" },
  { name: "Property 4", value: "—", unit: "unit" },
];

const mechanism = [
  { title: "Step 1", text: "Input / sensing — what is measured or captured." },
  { title: "Step 2", text: "Physical, chemical or biological principle at work." },
  { title: "Step 3", text: "Processing — how the signal becomes information." },
  { title: "Step 4", text: "Output — what the user sees or gets." },
];

export default function Technical() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Biology of Feet</CardTitle>
          <CardDescription className="max-w-3xl">
            The foot contains thousands of mechanoreceptors and nerve endings. They continuously send signals to the
            brain to help control:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <ul className="flex flex-wrap gap-2">
            {footFunctions.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-sm text-accent-foreground">
                <Icon className="size-4" />
                {label}
              </li>
            ))}
          </ul>

          <div>
            <p className="mb-3 text-sm font-medium">When the nervous system is affected:</p>
            <ol className="flex flex-col gap-2 md:flex-row md:items-stretch">
              {signalChain.map((step, i) => {
                const last = i === signalChain.length - 1;
                return (
                  <li key={step} className="flex flex-col items-center gap-2 md:flex-1 md:flex-row">
                    <div
                      className={`w-full flex-1 rounded-lg border p-3 text-sm ${last ? "border-primary/40 bg-primary/5" : "bg-muted/40"}`}
                    >
                      <span className="mb-1 block font-mono text-xs text-muted-foreground">{i + 1}</span>
                      {step}
                      {last && <span className="mt-1 block text-xs text-primary">Measurable in the insole</span>}
                    </div>
                    {!last && <ArrowRight className="size-4 shrink-0 rotate-90 text-muted-foreground md:rotate-0" />}
                  </li>
                );
              })}
            </ol>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium">Examples</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {conditions.map((c) => (
                <div key={c.name} className="flex flex-col rounded-lg border p-4">
                  <p className="font-medium">{c.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.effect}</p>
                  {/* Fixed height + object-contain: landscape and portrait images line up side by side. */}
                  <img
                    src={c.image}
                    alt={c.alt}
                    loading="lazy"
                    className="mt-4 h-80 w-full rounded-md border bg-white object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key properties</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="divide-y text-sm">
            {properties.map((p) => (
              <div key={p.name} className="flex justify-between gap-4 py-2.5">
                <dt className="text-muted-foreground">{p.name}</dt>
                <dd className="font-mono tabular-nums">
                  {p.value} <span className="text-muted-foreground">{p.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scientific mechanism</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {mechanism.map((m, i) => (
              <li key={m.title} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs text-accent-foreground">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium">{m.title}</p>
                  <p className="text-sm text-muted-foreground">{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>How Solemate responds to a fall</CardTitle>
          <CardDescription>From a reading in the insole to an SOS, with a chance for the user to cancel a false alarm.</CardDescription>
        </CardHeader>
        <CardContent>
          <FallResponseFlow />
        </CardContent>
      </Card>
    </div>
  );
}
