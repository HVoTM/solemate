import { CheckCircle2, Footprints, HeartPulse, Layers, Timer } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Placeholder } from "./Section";

const features = [
  "Insole: a 5-point sensor array (pressure, accelerometer/gyroscope, temperature), on-device microcontroller, Bluetooth module, and self-charging battery powered by walking motion.",
  "Mobile app: real-time data display, emergency contact management, and long-term history of falls/temperature trends.",
  "Alert network: when a fall or a sustained temperature anomaly is detected, the system automatically sends an SMS/call with GPS location to family, and can also notify the nearest medical facility where infrastructure allows.",
];

// Why the sensors sit in the shoe rather than on the wrist, waist or phone.
const footAdvantages = [
  {
    icon: Timer,
    title: "First point of contact",
    text: "When balance is lost, the foot reacts first: pressure shifts and posture changes. This data is available several hundred milliseconds earlier than data from the wrist or waist.",
  },
  {
    icon: Footprints,
    title: "Naturally worn",
    text: "Unlike a wristband or phone, footwear is worn daily without having to remember to put on a device, solving the biggest compliance problem of current wearables.",
  },
  {
    icon: HeartPulse,
    title: "Clinically critical for diabetic patients",
    text: "Most diabetic foot ulcers form on the sole, the area under load while walking. Placing sensors right there enables earlier detection than any other wearable location.",
  },
  {
    icon: Layers,
    title: "Rich biomechanical data",
    text: "The foot provides mechanical data (pressure, motion) and physiological data (temperature, moisture) at the same time: two complementary data types not easily available together anywhere else on the body.",
  },
];

export default function Solution() {
  return (
    <div className="space-y-14">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <p className="leading-relaxed">Slip Solemate device into your shoes and let it monitor</p>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <Placeholder label="Product photo, render or prototype image" className="aspect-video" />
      </div>

      <div>
        <h3 className="text-xl font-semibold tracking-tight">Why the feet?</h3>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Where a sensor sits decides what it can detect and whether people actually wear it.
        </p>
        <Accordion type="single" collapsible defaultValue={footAdvantages[0].title} className="mt-6 max-w-3xl">
          {footAdvantages.map(({ icon: Icon, title, text }) => (
            <AccordionItem key={title} value={title}>
              <AccordionTrigger className="items-center py-4 text-base hover:no-underline">
                <span className="flex items-center gap-3">
                  <Icon className="size-5 shrink-0 text-primary" />
                  {title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pl-8 leading-relaxed text-muted-foreground">{text}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
