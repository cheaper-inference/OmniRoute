import { getTranslations } from "next-intl/server";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import CooldownManagerClient from "./components/CooldownManagerClient";

export const dynamic = "force-dynamic";

export default async function ResilienceCooldownsPage() {
  const t = await getTranslations("resilienceCooldowns");
  return (
    <div className="flex flex-col gap-6">
      <PageHeader compact title={t("title")} description={t("description")} />
      <CooldownManagerClient />
    </div>
  );
}
