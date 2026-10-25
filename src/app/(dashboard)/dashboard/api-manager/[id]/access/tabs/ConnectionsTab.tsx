"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import ProviderConnectionPermissionList, {
  type ProviderConnection,
} from "@/app/(dashboard)/dashboard/api-manager/components/ProviderConnectionPermissionList";
import type { ApiKeyAccessFormState } from "../useApiKeyAccessForm";
import TabErrorList from "./TabErrorList";

interface ConnectionsTabProps {
  formState: ApiKeyAccessFormState;
  allConnections: ProviderConnection[];
  setAllowAllConnections: (allow: boolean) => void;
  setSelectedConnections: (connections: string[]) => void;
  errors?: string[];
}

export default function ConnectionsTab({
  formState,
  allConnections,
  setAllowAllConnections,
  setSelectedConnections,
  errors,
}: ConnectionsTabProps) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex flex-col gap-5">
      <TabErrorList errors={errors} />

      <div className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">{t("allowedConnections")}</p>
            <p className="text-xs text-text-muted">
              {formState.allowAllConnections
                ? t("allConnectionsDesc")
                : formState.selectedConnections.length === 0
                  ? t("selectAtLeastOneConnection")
                  : t("restrictedToConnections", { count: formState.selectedConnections.length })}
            </p>
          </div>
          <div className="flex gap-1 p-0.5 bg-surface rounded-md shrink-0">
            <Button
              size="sm"
              variant={formState.allowAllConnections ? "primary" : "ghost"}
              aria-pressed={formState.allowAllConnections}
              onClick={() => {
                setAllowAllConnections(true);
                setSelectedConnections([]);
              }}
              className="gap-1.5 text-xs"
            >
              {t("allConnections")}
            </Button>
            <Button
              size="sm"
              variant={!formState.allowAllConnections ? "primary" : "ghost"}
              aria-pressed={!formState.allowAllConnections}
              onClick={() => setAllowAllConnections(false)}
              className="gap-1.5 text-xs"
            >
              {t("onlySelectedConnections")}
            </Button>
          </div>
        </div>

        {!formState.allowAllConnections && (
          <div className="pt-2">
            <ProviderConnectionPermissionList
              connections={allConnections}
              selectedConnections={formState.selectedConnections}
              onSelectionChange={setSelectedConnections}
            />
          </div>
        )}
      </div>
    </div>
  );
}
