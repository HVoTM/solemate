import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// TODO: replace with real, cited statistics.
const stats = [
  { value: "Onset", label: "Nerve damage from diabetes means people can't feel an ulcer forming until it's already an open wound.", source: "" },
  { value: "Recurrence", label: "After an ulcer heals, about 40% come back within 1 year and 65% within 5 years.", source: "" },
  { value: "Preventative Shortcoming", label: "Early warning exists, but it's hard to use: Foot temperature and pressure distribution can flag an ulcer weeks before it appears, but only if it's checked every day, and single readings often give false alarms.", source: "" },
];

export default function Why() {
  return (
    <div className="space-y-8">
      <p className="max-w-3xl leading-relaxed">
        Diabetic foot ulcers start silently and keep coming back. Nerve damage from diabetes means people can't feel an ulcer forming until it's already an open wound.
      </p>
      <p>
        1.0M–3.5M Americans have a history of foot ulcers | $9.1B–$13.2B yearly cost to US insurers
      </p>
      <i>Sources: Armstrong et al., NEJM 2017; Rice et al., Diabetes Care 2014</i>
      <br></br>
      <br></br>
      
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardTitle className="font-mono text-1xl font-medium tabular-nums">{s.value}</CardTitle>
              <CardDescription>{s.label}</CardDescription>
              <p className="text-xs text-muted-foreground/70">{s.source}</p>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
