"use client";

import { useTranslations } from "next-intl";
import Toggle from "@/shared/components/Toggle";

export interface McpPermissionState {
  mcpConnectEnabled: boolean;
  compressionReadEnabled: boolean;
}

/** Explicit grants remain independent of broad management and of each other. */
export default function McpPermissionControls({
  state,
  onChange,
  disabled = false,
}: {
  state: McpPermissionState;
  onChange: (field: keyof McpPermissionState, enabled: boolean) => void;
  disabled?: boolean;
}) {
  const t = useTranslations("apiManager");
  return (
    <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
      {(["mcpConnectEnabled", "compressionReadEnabled"] as const).map((field) => (
        <div key={field} className="flex items-start justify-between gap-3">
          <Toggle
            size="sm"
            label={t(field)}
            description={t(`${field}Desc`)}
            checked={state[field]}
            disabled={disabled}
            onChange={(checked) => onChange(field, checked)}
          />
        </div>
      ))}
    </div>
  );
}
