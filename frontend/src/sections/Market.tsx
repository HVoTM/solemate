import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// TODO: fill in figures and cite sources — judges check where market numbers come from.
const tiers = [
  { key: "TAM", name: "Total addressable market", value: "—", note: "Everyone who could use a solution like this." },
  { key: "SAM", name: "Serviceable available market", value: "—", note: "The part our product and channels can reach." },
  { key: "SOM", name: "Serviceable obtainable market", value: "—", note: "What we can realistically win in 3–5 years." },
];

export default function Market() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {tiers.map((t) => (
          <Card key={t.key}>
            <CardHeader>
              <CardDescription className="font-mono">{t.key}</CardDescription>
              <CardTitle className="font-mono text-3xl font-medium tabular-nums">{t.value}</CardTitle>
              <p className="text-sm font-medium">{t.name}</p>
              <CardDescription>{t.note}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Sources: add citations here.</p>
    </div>
  );
}
