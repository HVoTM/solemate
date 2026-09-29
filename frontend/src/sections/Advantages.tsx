import { Check, Minus, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Support = "yes" | "partial" | "no";

// TODO: real competitors and criteria. First column is always Solemate.
const competitors = ["Solemate", "Alternative A", "Alternative B"];
const criteria: { name: string; support: Support[] }[] = [
  { name: "All-in-one: Fall detection, fall prediction, and foot health in one device.", support: ["yes", "partial", "no"] },
  { name: "Predict, not just React: Spots fall risk and foot ulcers before they happen", support: ["yes", "no", "yes"] },
  { name: "Works everywhere: Works at home and outdoors, with GPS alerts. No blind spots", support: ["yes", "yes", "partial"] },
  { name: "Zero effort: Fits into shoes they already wear. Nothing to remember.", support: ["yes", "no", "no"] },
  { name: "Privacy First: No cameras or mics. Data is processed on the insole.", support: ["yes", "no", "no"] },
  { name: "Smart Alerts: 30-second cancel window cuts false alarms. Alerts match the urgency.", support: ["yes", "no", "no"] },
];

const icons = {
  yes: <Check className="mx-auto size-4 text-primary" aria-label="Yes" />,
  partial: <Minus className="mx-auto size-4 text-muted-foreground" aria-label="Partial" />,
  no: <X className="mx-auto size-4 text-muted-foreground/60" aria-label="No" />,
};

export default function Advantages() {
  return (
    <Card>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              {competitors.map((c, i) => (
                <TableHead key={c} className={`text-center ${i === 0 ? "font-semibold text-primary" : ""}`}>
                  {c}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {criteria.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                {row.support.map((s, i) => (
                  <TableCell key={competitors[i]} className={i === 0 ? "bg-accent/50" : ""}>
                    {icons[s]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
