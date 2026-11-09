import { getTranslations } from "next-intl/server";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import ResilienceConnectionsClient from "./components/ResilienceConnectionsClient";

export const dynamic = "force-dynamic";

export default async function ResilienceConnectionsPage() {
  const t = await getTranslations("resilienceConnections");
  return (
    <div className="flex flex-col gap-6">
      <div>
        <PageHeader
          compact
          title={t("title")}
          description={
            <>
              <strong>{t("reassuranceTitle")}</strong> {t("reassuranceDetail")}
            </>
          }
        />
        <ul className="mt-3 flex flex-wrap gap-4 text-[13px] text-text-muted">
          <li>
            <strong className="text-text-main">{t("table.healthy")}</strong> —{" "}
            {t("plainStates.healthy")}
          </li>
          <li>
            <strong className="text-text-main">{t("table.coolingDown")}</strong> —{" "}
            {t("plainStates.coolingDown")}
          </li>
          <li>
            <strong className="text-text-main">{t("table.circuitOpen")}</strong> —{" "}
            {t("plainStates.lockedOut")}
          </li>
        </ul>
      </div>
      <ResilienceConnectionsClient />
    </div>
  );
}
