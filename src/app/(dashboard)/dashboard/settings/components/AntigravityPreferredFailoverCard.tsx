"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card } from "@/shared/components";
import type {
  AntigravityPreferredFailoverSettings,
} from "@/lib/resilience/settings/types";
import { BooleanField, NumberField } from "./ResilienceFields";

export default function AntigravityPreferredFailoverCard({
  value,
  saving,
  onSave,
}: {
  value: AntigravityPreferredFailoverSettings;
  saving: boolean;
  onSave: (next: AntigravityPreferredFailoverSettings) => Promise<void>;
}) {
  const t = useTranslations("settings");
  const common = useTranslations("common");
  const [draft, setDraft] = useState(value);
  const [previous, setPrevious] = useState(value);
  if (previous !== value) {
    setPrevious(value);
    setDraft(value);
  }
  const label = (key: string, fallback: string) =>
    typeof t.has === "function" && t.has(key as never) ? t(key as never) : fallback;

  return (
    <Card className="space-y-4 p-6">
      <h2 className="text-lg font-bold">
        {label("antigravityPreferredFailoverTitle", "Antigravity preferred account failover")}
      </h2>
      <p className="text-sm text-text-muted">
        {label(
          "antigravityPreferredFailoverDescription",
          "Only for API-key preferred Antigravity/agy accounts with an eligible sibling. " +
            "One failover hop without cooling the first account; new values apply to new requests."
        )}
      </p>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <BooleanField
          label={label("antigravityPreferredFailoverEnabled", "Enable preferred account failover")}
          description={label(
            "antigravityPreferredFailoverEnabledDescription",
            "Off by default. Explicit pins, managed leases and combo targets are unaffected."
          )}
          checked={draft.enabled}
          onChange={(enabled) => setDraft({ ...draft, enabled })}
        />
        <div />
        <NumberField
          label={label("antigravityPreferredTimeout", "Preferred account timeout")}
          value={draft.preferredTimeoutMs}
          min={500}
          max={120000}
          suffix="ms"
          onChange={(preferredTimeoutMs) => setDraft({ ...draft, preferredTimeoutMs })}
        />
        <NumberField
          label={label("antigravityGemini38Timeout", "Gemini 3.8 preferred timeout")}
          value={draft.gemini38PreferredTimeoutMs}
          min={500}
          max={120000}
          suffix="ms"
          onChange={(gemini38PreferredTimeoutMs) =>
            setDraft({ ...draft, gemini38PreferredTimeoutMs })
          }
        />
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => setDraft(value)} disabled={saving}>
          {common("cancel")}
        </Button>
        <Button
          size="sm"
          variant="primary"
          icon="save"
          onClick={() => void onSave(draft).catch(() => {})}
          disabled={saving}
        >
          {common("save")}
        </Button>
      </div>
    </Card>
  );
}
