import type { Metadata } from "next";
import DemoApp from "./_components/DemoApp";

export const metadata: Metadata = {
  title: "Floq — Demo para ganaderos",
  description: "Demo interactivo de cercado virtual y monitoreo de hato para ganaderos. Simulación en vivo.",
};

export default function GanaderoPage() {
  return <DemoApp />;
}
