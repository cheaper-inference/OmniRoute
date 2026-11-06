"use client";

import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Toggle from "@/shared/components/Toggle";

import { useTranslations } from "next-intl";
import { ApiKeyCompressionToggle } from "@/app/(dashboard)/dashboard/api-manager/components/ApiKeyCompressionToggle";
import { ChaosModeAccessToggle } from "@/app/(dashboard)/dashboard/api-manager/components/ChaosModeAccessToggle";
import { BypassProviderQuotaToggle } from "@/app/(dashboard)/dashboard/api-manager/components/BypassProviderQuotaToggle";
import type { ApiKeyAccessFormState, StreamDefaultMode } from "../useApiKeyAccessForm";
import TabErrorList from "./TabErrorList";

interface BehaviourTabProps {
  formState: ApiKeyAccessFormState;
  setNoLog: (enabled: boolean) => void;
  setAutoResolve: (enabled: boolean) => void;
  setStreamDefaultMode: (mode: StreamDefaultMode) => void;
  setCompressionEnabled: (enabled: boolean) => void;
  setChaosModeEnabled: (enabled: boolean) => void;
  setAllowUsageCommand: (enabled: boolean) => void;
  setBypassProviderQuotaPolicyEnabled: (enabled: boolean) => void;
  errors?: string[];
}

type BehaviourSectionProps<K extends keyof BehaviourTabProps> = Pick<
  BehaviourTabProps,
  "formState" | K
>;

function PayloadPrivacyToggle({ formState, setNoLog }: BehaviourSectionProps<"setNoLog">) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("noLogPayloadPrivacy")}</p>
        <p className="text-xs text-text-muted">
          Disable request/response payload persistence for this API key.
        </p>
      </div>
      <Toggle
        size="sm"
        className="shrink-0"
        checked={formState.noLog}
        onChange={() => setNoLog(!formState.noLog)}
        ariaLabel={t("noLogPayloadPrivacy")}
      />
    </div>
  );
}

function AutoResolveToggle({ formState, setAutoResolve }: BehaviourSectionProps<"setAutoResolve">) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("autoResolve")}</p>
        <p className="text-xs text-text-muted">{t("autoResolveDesc")}</p>
      </div>
      <Toggle
        size="sm"
        className="shrink-0"
        checked={formState.autoResolve}
        onChange={() => setAutoResolve(!formState.autoResolve)}
        ariaLabel={t("autoResolve")}
      />
    </div>
  );
}

function StreamDefaultModeSelector({
  formState,
  setStreamDefaultMode,
}: BehaviourSectionProps<"setStreamDefaultMode">) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-sm font-medium text-text-main">{t("streamDefaultMode")}</p>
        <p className="text-xs text-text-muted">{t("streamDefaultModeDesc")}</p>
      </div>
      <div className="flex gap-1 p-0.5 bg-surface rounded-md shrink-0 w-full sm:w-auto">
        <Button
          size="sm"
          variant={formState.streamDefaultMode === "legacy" ? "primary" : "ghost"}
          aria-pressed={formState.streamDefaultMode === "legacy"}
          onClick={() => setStreamDefaultMode("legacy")}
          className="gap-1.5 text-xs flex-1 sm:flex-none justify-center"
        >
          <Icon name="settings_backup_restore" size={14} />
          {t("streamDefaultLegacy")}
        </Button>
        <Button
          size="sm"
          variant={formState.streamDefaultMode === "json" ? "primary" : "ghost"}
          aria-pressed={formState.streamDefaultMode === "json"}
          onClick={() => setStreamDefaultMode("json")}
          className="gap-1.5 text-xs flex-1 sm:flex-none justify-center"
        >
          <Icon name="data_object" size={14} />
          {t("streamDefaultJson")}
        </Button>
      </div>
    </div>
  );
}

export default function BehaviourTab({
  formState,
  setNoLog,
  setAutoResolve,
  setStreamDefaultMode,
  setCompressionEnabled,
  setChaosModeEnabled,
  setAllowUsageCommand,
  setBypassProviderQuotaPolicyEnabled,
  errors,
}: BehaviourTabProps) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex flex-col gap-5">
      <TabErrorList errors={errors} />

      {/* Privacy Toggle */}
      <PayloadPrivacyToggle formState={formState} setNoLog={setNoLog} />

      {/* Auto-Resolve Toggle */}
      <AutoResolveToggle formState={formState} setAutoResolve={setAutoResolve} />

      {/* Stream Default Compatibility */}
      <StreamDefaultModeSelector
        formState={formState}
        setStreamDefaultMode={setStreamDefaultMode}
      />

      {/* Prompt Compression Toggle */}
      <ApiKeyCompressionToggle
        enabled={formState.compressionEnabled}
        onToggle={() => setCompressionEnabled(!formState.compressionEnabled)}
      />

      {/* Chaos Mode Access Toggle */}
      <ChaosModeAccessToggle
        enabled={formState.chaosModeEnabled}
        onToggle={() => setChaosModeEnabled(!formState.chaosModeEnabled)}
      />

      {/* Local Usage Command Toggle */}
      <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("localUsageCommand")}</p>
          <p className="text-xs text-text-muted">{t("localUsageCommandDesc")}</p>
        </div>
        <Toggle
          size="sm"
          className="shrink-0"
          checked={formState.allowUsageCommand}
          onChange={() => setAllowUsageCommand(!formState.allowUsageCommand)}
          ariaLabel={t("localUsageCommand")}
        />
      </div>

      {/* Advanced Provider Quota Policy Override */}
      <BypassProviderQuotaToggle
        enabled={formState.bypassProviderQuotaPolicyEnabled}
        onToggle={() =>
          setBypassProviderQuotaPolicyEnabled(!formState.bypassProviderQuotaPolicyEnabled)
        }
      />
    </div>
  );
}
