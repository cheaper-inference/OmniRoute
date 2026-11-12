import { redirect } from "next/navigation";
import ProviderDetailPageClient from "./ProviderDetailPageClient";

export default async function ProviderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  if ((await params).id === "moonshot") redirect("/dashboard/providers/kimi");
  return <ProviderDetailPageClient />;
}
