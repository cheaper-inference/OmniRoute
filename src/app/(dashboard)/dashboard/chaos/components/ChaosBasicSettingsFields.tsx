"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import Input from "@/shared/components/Input";
import Textarea from "@/shared/components/Textarea";
import Toggle from "@/shared/components/Toggle";

export interface ChaosBasicSettings {
  enabled: boolean;
  timeoutMs: number;
  maxTokens: number;
  systemPrompt?: string;
}

function ChaosSystemPromptField({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  const t = useTranslations("chaosConfig");
  const id = useId();
  return (
    <Field label={t("systemPrompt")} htmlFor={id} hint={t("systemPromptDesc")}>
      <Textarea
        id={id}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="resize-y"
        placeholder={t("systemPromptPlaceholder")}
      />
    </Field>
  );
}

/**
 * Enable toggle + timeout + max tokens + system prompt fields for the Chaos
 * Mode config page. Extracted out of ChaosConfigPageClient.tsx to keep the
 * page component under the complexity/size ratchet
 * (config/quality/complexity-baseline.json).
 */
export function ChaosBasicSettingsFields({
  settings,
  onChange,
}: {
  settings: ChaosBasicSettings;
  onChange: (patch: Partial<ChaosBasicSettings>) => void;
}) {
  const t = useTranslations("chaosConfig");

  return (
    <>
      {/* Enable/Disable Toggle */}
      <Toggle
        checked={settings.enabled}
        onChange={(enabled) => onChange({ enabled })}
        label={t("enableChaos")}
        description={t("enableChaosDesc")}
      />

      {/* Timeout */}
      <Input
        label={t("timeout")}
        hint={t("timeoutDesc")}
        type="number"
        min={5000}
        max={600000}
        step={5000}
        value={settings.timeoutMs}
        onChange={(e) =>
          onChange({
            timeoutMs: Math.max(5000, Math.min(600000, Number(e.target.value) || 120000)),
          })
        }
      />

      {/* Max Tokens */}
      <Input
        label={t("maxTokens")}
        hint={t("maxTokensDesc")}
        type="number"
        min={256}
        max={128000}
        step={256}
        value={settings.maxTokens}
        onChange={(e) =>
          onChange({
            maxTokens: Math.max(256, Math.min(128000, Number(e.target.value) || 4096)),
          })
        }
      />

      <ChaosSystemPromptField
        value={settings.systemPrompt}
        onChange={(systemPrompt) => onChange({ systemPrompt })}
      />
    </>
  );
}
