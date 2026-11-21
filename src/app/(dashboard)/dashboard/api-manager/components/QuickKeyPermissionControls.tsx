"use client";
import { useTranslations } from "next-intl";
import Toggle from "@/shared/components/Toggle";
import type { useKeyTemplateCreation } from "../useKeyTemplateCreation";
import McpPermissionControls from "./McpPermissionControls";

/** Edit quick-create management and independent MCP grants, synchronizing both management states. */
export default function QuickKeyPermissionControls({
  draft,
  disabled,
}: {
  draft: ReturnType<typeof useKeyTemplateCreation>;
  disabled: boolean;
}) {
  const t = useTranslations("apiManager");
  return (
    <>
      <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("managementAccess")}</p>
          <p className="text-xs text-text-muted">{t("managementAccessDesc")}</p>
        </div>
        <Toggle
          size="sm"
          className="shrink-0"
          checked={draft.newKeyManageEnabled}
          disabled={disabled}
          onChange={(checked) => {
            draft.setNewKeyManageEnabled(checked);
            draft.setCreateKeyFormState((prev) => ({ ...prev, manageEnabled: checked }));
          }}
          ariaLabel={t("managementAccess")}
        />
      </div>
      <McpPermissionControls
        state={draft.createKeyFormState}
        disabled={disabled}
        onChange={(field, enabled) =>
          draft.setCreateKeyFormState((prev) => ({ ...prev, [field]: enabled }))
        }
      />
    </>
  );
}
