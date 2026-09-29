import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const team = [
  { name: "Member 1", role: "Role" },
  { name: "Member 2", role: "Role" },
  { name: "Member 3", role: "Role" },
  { name: "Member 4", role: "Role" },
  { name: "Member 5", role: "Role" },
];

export default function About() {
  return (
    <section className="space-y-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="mt-3 text-muted-foreground">Background, approach and methodology go here.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {team.map((m) => (
          <Card key={m.name}>
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-accent font-medium text-accent-foreground">
                {m.name.charAt(0)}
              </div>
              <CardTitle>{m.name}</CardTitle>
              <CardDescription>{m.role}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
