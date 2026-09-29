import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bluetooth,
  Footprints,
  LayoutDashboard,
  Radio,
  RotateCcw,
  Siren,
  Timer,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { cn } from "cn";

type Node = {
  /** Optional: omit or pass null for a text-only header. */
  icon?: LucideIcon | null;
  /** Where this step runs. */
  where: string;
  title: string;
  text: string;
  tone?: "decision" | "alert";
};

const insole: Node = {
  icon: Footprints,
  where: "Solemate insole",
  title: "Sense & analyse",
  text: "Tracks balance, temperature asymmetry and pressure distribution, then runs fall detection and ulcer-risk prediction.",
};
const detect: Node = {
  icon: TriangleAlert,
  where: "Solemate insole",
  title: "Fall detected?",
  text: "The fall-detection algorithm checks each new reading.",
  tone: "decision",
};
const dashboard: Node = {
  icon: LayoutDashboard,
  where: "Dashboard app",
  title: "User's dashboard",
  text: "Shows live telemetry and health trends. When a fall is reported, it starts the cancellation countdown.",
};
const countdown: Node = {
  icon: Timer,
  where: "Dashboard app",
  title: "30-second countdown",
  text: "The user has 30 seconds to decline the emergency notice before it is escalated.",
  tone: "decision",
};
const sos: Node = {
  icon: Siren,
  where: "Emergency contacts",
  title: "Send SOS",
  text: "Alerts the assigned people and emergency services (911).",
  tone: "alert",
};

function FlowNode({ icon: Icon, where, title, text, tone }: Node) {
  return (
    <div
      className={cn(
        "h-full rounded-lg border p-4",
        tone === "decision" && "border-dashed border-primary/50 bg-primary/5",
        tone === "alert" && "border-destructive/40 bg-destructive/5",
        !tone && "bg-muted/40",
      )}
    >
      <p className="mb-2 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        {Icon && <Icon className={cn("size-4 shrink-0", tone === "alert" ? "text-destructive" : "text-primary")} />}
        {where}
      </p>
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

/** Labelled connector: points down on mobile, right on desktop. */
function Connector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-1 lg:px-1">
      <span className="text-xs font-medium text-primary">{label}</span>
      <ArrowRight className="size-4 rotate-90 text-muted-foreground lg:rotate-0" />
    </div>
  );
}

/** The "nothing to do" exit under a decision: loops back to monitoring. */
function Branch({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1 pt-1 pb-2 lg:pb-4", className)}>
      <ArrowDown className="size-4 text-muted-foreground" />
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
        <RotateCcw className="size-3.5" />
        Keep monitoring
      </span>
    </div>
  );
}

const telemetryLine = "border-dashed border-primary/40";

/**
 * Fall-response flow: insole → fall check → dashboard → cancel countdown → SOS,
 * plus a continuous telemetry line from the insole straight to the dashboard.
 *
 * Desktop (lg, 9 columns: 5 nodes + 4 connectors):
 *   row 1  the main path
 *   row 2  "no" exits under the decisions; telemetry drops from the insole (col 1) and rises into the dashboard (col 5)
 *   row 3  the telemetry line joining col 1 to col 5
 * Mobile: DOM order stacks every step with its exits directly under it; the telemetry lines are swapped for a note.
 */
export default function FallResponseFlow() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
        <FlowNode {...insole} />
        <p className="flex items-center justify-center gap-1.5 pt-2 text-xs text-muted-foreground lg:hidden">
          <Radio className="size-3.5" />
          Also streams telemetry straight to the dashboard app
        </p>
        <div className="hidden justify-center lg:col-start-1 lg:row-start-2 lg:flex">
          <div className={cn("border-l-2", telemetryLine)} />
        </div>

        <Connector label="Each reading" />
        <FlowNode {...detect} />
        <Branch label="No" className="lg:col-start-3 lg:row-start-2" />

        <Connector label="Yes" />
        <FlowNode {...dashboard} />
        <div className="hidden flex-col items-center lg:col-start-5 lg:row-start-2 lg:flex">
          <ArrowUp className="size-4 shrink-0 text-primary/60" />
          <div className={cn("flex-1 border-l-2", telemetryLine)} />
        </div>

        <Connector label="Alert" />
        <FlowNode {...countdown} />
        <Branch label="Declined" className="lg:col-start-7 lg:row-start-2" />

        <Connector label="Not declined" />
        <FlowNode {...sos} />

        <div className="hidden grid-cols-subgrid pb-3 lg:col-start-1 lg:col-end-6 lg:row-start-3 lg:grid">
          <div className={cn("ml-[50%] border-t-2", telemetryLine)} />
          <div className={cn("relative col-span-3 border-t-2", telemetryLine)}>
            <span className="absolute top-0 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 bg-card px-2 text-xs whitespace-nowrap text-muted-foreground">
              <Radio className="size-3.5" />
              Telemetry, streamed continuously
            </span>
          </div>
          <div className={cn("mr-[50%] border-t-2", telemetryLine)} />
        </div>
      </div>
      <p className="flex items-start gap-2 text-sm text-muted-foreground">
        <Bluetooth className="mt-0.5 size-4 shrink-0" />
        The insole talks to the user's phone or smartwatch wirelessly: Bluetooth in the prototype, the internet in
        production. The dashboard is a web app for the prototype.
      </p>
    </div>
  );
}
