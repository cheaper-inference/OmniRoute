"use client";

import { useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";
import {
  ANTIGRAVITY_CREDITS_MODES,
  isAntigravityCreditsMode,
  type CreditsMode,
} from "@omniroute/open-sse/config/antigravityCreditsMode.ts";
import { Button, Card } from "@/shared/components";
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

async function readConfirmedMode(response: Response): Promise<CreditsMode> {
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data: { antigravityCreditsMode?: unknown } | null = await response.json();
  if (!isAntigravityCreditsMode(data?.antigravityCreditsMode)) {
    throw new Error("Unconfirmed Antigravity credits mode");
  }
  return data.antigravityCreditsMode;
}

function useCreditsModeConfirmation(mode: unknown, onConfirmed: (mode: CreditsMode) => void) {
  const t = useTranslations("settings");
  const notify = useNotificationStore();
  const pending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [unconfirmed, setUnconfirmed] = useState(false);

  async function run(operation: () => Promise<void>) {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    try {
      await operation();
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }

  async function saveMode(next: string) {
    if (unconfirmed || next === mode || !isAntigravityCreditsMode(next)) return;
    await run(async () => {
      try {
        const response = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ antigravityCreditsMode: next }),
        });
        if (response.status === 400) {
          // The settings route rejects invalid patches before writing.
          notify.error(t("saveFailed"), `HTTP ${response.status}`);
          return;
        }
        const confirmedMode = await readConfirmedMode(response);
        if (confirmedMode !== next) {
          setUnconfirmed(true);
          return;
        }
        onConfirmed(confirmedMode);
        notify.success(t("savedSuccessfully"));
      } catch {
        // The DB write can have committed without a usable response. Never
        // resend a paid-policy change or show an old mode as confirmed.
        setUnconfirmed(true);
      }
    });
  }

  async function recheckMode() {
    await run(async () => {
      try {
        const response = await fetch("/api/settings", { cache: "no-store" });
        onConfirmed(await readConfirmedMode(response));
        setUnconfirmed(false);
      } catch {
        // Keep all modes disabled until a new GET confirms the current mode.
        notify.error(t("routingAntigravityCreditsUnconfirmed"));
      }
    });
  }

  return { busy, unconfirmed, saveMode, recheckMode };
}

export default function AntigravityCreditsCard({
  mode,
  onSaved,
}: {
  mode: unknown;
  onSaved: (mode: CreditsMode) => void;
}) {
  const t = useTranslations("settings");
  const warningId = useId();
  const unconfirmedId = useId();
  const { busy, unconfirmed, saveMode, recheckMode } = useCreditsModeConfirmation(mode, onSaved);
  const selectedMode = !unconfirmed && isAntigravityCreditsMode(mode) ? mode : "";

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
      {unconfirmed && (
        <div className="mb-3 space-y-2">
          <p id={unconfirmedId} role="alert" className="text-sm text-text-muted">
            {t("routingAntigravityCreditsUnconfirmed")}
          </p>
          <Button type="button" variant="secondary" size="sm" onClick={recheckMode} disabled={busy}>
            {t("routingAntigravityCreditsRecheck")}
          </Button>
        </div>
      )}
      <RadioGroup
        aria-label={t("routingAntigravityCreditsTitle")}
        aria-describedby={unconfirmed ? `${warningId} ${unconfirmedId}` : warningId}
        aria-busy={busy}
        value={selectedMode}
        onValueChange={saveMode}
        disabled={busy || selectedMode === ""}
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
