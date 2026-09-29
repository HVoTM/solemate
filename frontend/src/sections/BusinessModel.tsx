import { Megaphone, Receipt, Sparkles, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const blocks = [
  { icon: Users, title: "Customer segments", text: "Who buys, and who uses it (if different)." },
  { icon: Sparkles, title: "Value proposition", text: "Why they would pay for it instead of the alternatives." },
  { icon: Receipt, title: "Revenue streams", text: "One-off sale, subscription, licensing, B2B contracts…" },
  { icon: Megaphone, title: "Channels", text: "How we reach customers: direct, partners, clinics, retail…" },
];

const channels = [
  {
    name: "Direct to consumer",
    text: "Patients and families buy Solemate once, or join the monthly Care Subscription, which includes the app and emergency alerts.",
  },
  {
    name: "Clinic Program (B2B)",
    text: "Podiatry clinics pay per patient per month for the insoles and a clinician dashboard to track foot health remotely.",
  },
];

// Keep prices as display strings so per-month / per-year notes stay next to the number.
const pricing = [
  { product: "Single Pair", note: "One-time", plan: "1 pair", cost: "$150", margin: "60%", price: "$375" },
  { product: "Double Pair", note: "Bundle", plan: "2 pairs", cost: "$300", margin: "55%", price: "$667" },
  {
    product: "Care Subscription",
    plan: "1 pair/year + app & alerts",
    cost: "$150/year",
    margin: "61%",
    price: "$32/month",
    priceNote: "$384/year",
  },
  {
    product: "Clinic Program",
    note: "B2B",
    plan: "1 pair/patient/year + clinician dashboard",
    cost: "$150/year",
    margin: "55%",
    price: "$28/patient/month",
    priceNote: "$336/year",
  },
];

export default function BusinessModel() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {blocks.map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="mb-2 size-5 text-primary" />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            {channels.map((c) => (
              <div key={c.name}>
                <p className="font-medium">{c.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product type</TableHead>
                <TableHead>Pairs / plan</TableHead>
                <TableHead className="text-right">Est. cost</TableHead>
                <TableHead className="text-right">Target margin</TableHead>
                <TableHead className="text-right">Selling price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricing.map((p) => (
                <TableRow key={p.product}>
                  <TableCell className="font-medium text-primary">
                    {p.product}
                    {p.note && <span className="block text-xs font-normal text-muted-foreground">{p.note}</span>}
                  </TableCell>
                  <TableCell className="max-w-48 whitespace-normal">{p.plan}</TableCell>
                  <TableCell className="text-right tabular-nums">{p.cost}</TableCell>
                  <TableCell className="text-right tabular-nums">{p.margin}</TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {p.price}
                    {p.priceNote && (
                      <span className="block text-xs font-normal text-muted-foreground">{p.priceNote}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
