"use client";

import { useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";
import {
  ANTIGRAVITY_CREDITS_MODES,
  isAntigravityCreditsMode,
  type CreditsMode,
} from "@omniroute/open-sse/config/antigravityCreditsMode.ts";
import { Card } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { useNotificationStore } from "@/store/notificationStore";

const optionMessages = {
  off: {
    label: "routingAntigravityCreditsOffLabel",
    description: "routingAntigravityCreditsOffDesc",
  },
  retry: {
    label: "routingAntigravityCreditsRetryLabel",
    description: "routingAntigravityCreditsRetryDesc",
  },
  always: {
    label: "routingAntigravityCreditsAlwaysLabel",
    description: "routingAntigravityCreditsAlwaysDesc",
  },
} as const;

export default function AntigravityCreditsCard({
  mode,
  onSaved,
}: {
  mode: unknown;
  onSaved: (mode: CreditsMode) => void;
}) {
  const t = useTranslations("settings");
  const notify = useNotificationStore();
  const warningId = useId();
  const pending = useRef(false);
  const [saving, setSaving] = useState(false);

  async function saveMode(next: string) {
    if (pending.current || next === mode || !isAntigravityCreditsMode(next)) return;
    pending.current = true;
    setSaving(true);
    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ antigravityCreditsMode: next }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!isAntigravityCreditsMode(data.antigravityCreditsMode)) {
        throw new Error(t("routingAntigravityCreditsUnconfirmed"));
      }
      onSaved(data.antigravityCreditsMode);
      notify.success(t("savedSuccessfully"));
    } catch (error) {
      notify.error(t("saveFailed"), error instanceof Error ? error.message : undefined);
    } finally {
      pending.current = false;
      setSaving(false);
    }
  }

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-bg-subtle text-text-muted">
          <Icon name="toll" size={20} />
        </div>
        <div>
          <h3 className="text-lg">{t("routingAntigravityCreditsTitle")}</h3>
          <p className="text-sm text-text-muted">{t("routingAntigravityCreditsDesc")}</p>
        </div>
      </div>

      <p id={warningId} className="mb-3 text-sm text-text-muted">
        {t("routingAntigravityCreditsWarning")}
      </p>
      <RadioGroup
        aria-label={t("routingAntigravityCreditsTitle")}
        aria-describedby={warningId}
        aria-busy={saving}
        value={isAntigravityCreditsMode(mode) ? mode : undefined}
        onValueChange={saveMode}
        disabled={saving || !isAntigravityCreditsMode(mode)}
      >
        {ANTIGRAVITY_CREDITS_MODES.map((option) => (
          <RadioGroupItem
            key={option}
            card
            value={option}
            aria-label={t(optionMessages[option].label)}
            label={t(optionMessages[option].label)}
            description={t(optionMessages[option].description)}
          />
        ))}
      </RadioGroup>
    </Card>
  );
}
