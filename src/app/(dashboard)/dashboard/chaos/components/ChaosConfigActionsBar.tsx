"use client";

import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import Button from "@/shared/components/Button";
import { chaosText, type ChaosTranslator } from "../chaosI18n";

/**
 * Save/Reset + Test-run action buttons for the Chaos Mode config page.
 * Extracted out of ChaosConfigPageClient.tsx to keep the page component under
 * the complexity/size ratchet (config/quality/complexity-baseline.json).
 */
export function ChaosConfigActionsBar({
  saving,
  testing,
  testDisabled,
  onSave,
  onReset,
  onTest,
}: {
  saving: boolean;
  testing: boolean;
  testDisabled: boolean;
  onSave: () => void;
  onReset: () => void;
  onTest: () => void;
}) {
  const t = useTranslations("chaosConfig") as ChaosTranslator;

  return (
    <>
      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="primary" icon="save" onClick={onSave} disabled={saving} loading={saving}>
          {t("saveConfig")}
        </Button>
        <Button variant="outline" icon="restart_alt" onClick={onReset} disabled={saving}>
          {t("configReset")}
        </Button>
      </div>

      {/* Test Button */}
      <Card.Section>
        <p className="text-sm font-medium text-text-main mb-2">{t("testButton")}</p>
        <Button
          variant="warning"
          icon="play_arrow"
          onClick={onTest}
          disabled={testing || testDisabled}
          loading={testing}
        >
          {testing ? chaosText(t, "running", "Running...") : t("testButton")}
        </Button>
      </Card.Section>
    </>
  );
}
