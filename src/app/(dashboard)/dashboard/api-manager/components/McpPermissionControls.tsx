"use client";

import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
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
    <Card.Section className="flex flex-col gap-3">
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
    </Card.Section>
  );
}
