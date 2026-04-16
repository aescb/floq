import type { Metadata } from "next";
import InvestorDemo from "./_components/InvestorDemo";

export const metadata: Metadata = {
  title: "Floq — Demo para inversores",
  description: "Oportunidad de inversión en Floq: cercado virtual con IA para el ganado latinoamericano. Mercado, modelo y métricas.",
};

export default function InversoresPage() {
  return <InvestorDemo />;
}
