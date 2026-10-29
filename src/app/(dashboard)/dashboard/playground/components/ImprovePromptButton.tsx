"use client";

// src/app/(dashboard)/dashboard/playground/components/ImprovePromptButton.tsx

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import { ConfirmModal } from "@/shared/components/Modal";
import { useImprovePrompt } from "../hooks/useImprovePrompt";
import type { ConfigState, ConfigStateSetter } from "./StudioConfigPane";

interface ImprovePromptButtonProps {
  configState: ConfigState;
  setConfigState: ConfigStateSetter;
}

/**
 * ImprovePromptButton — "✨ Improve prompt" button with quota-consumption warning.
 *
 * Flow: click → confirmation modal → confirm → calls useImprovePrompt.improve()
 * → on success, updates configState.systemPrompt and/or configState.params.
 *
 * D8: uses the model configured in the Config pane (never overrides with cheap model).
 */
export default function ImprovePromptButton({
  configState,
  setConfigState,
}: ImprovePromptButtonProps) {
  const t = useTranslations("playground");
  const { loading, error, improve } = useImprovePrompt();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [improveError, setImproveError] = useState<string | null>(null);

  async function handleConfirm() {
    setConfirmOpen(false);
    setImproveError(null);

    const model = configState.model.trim();
    if (!model) {
      setImproveError(t("setModelInConfigFirst"));
      return;
    }

    const result = await improve({
      system: configState.systemPrompt || undefined,
      model,
    });

    if (result == null) {
      setImproveError(error ?? t("improvePromptFailed"));
      return;
    }

    const improvedSystem = result.improvedSystem;
    if (improvedSystem != null) {
      setConfigState((current) => ({ ...current, systemPrompt: improvedSystem }));
    }
  }

  const isDisabled = loading || !configState.model.trim();

  return (
    <>
      <div className="flex flex-col gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setImproveError(null);
            setConfirmOpen(true);
          }}
          disabled={isDisabled}
          className="gap-1.5 self-start text-xs text-text-muted"
          aria-label={t("improvePromptAria")}
          title={!configState.model.trim() ? t("setModelFirst") : t("improvePromptTitle")}
        >
          <span className="text-[13px]" aria-hidden="true">
            ✨
          </span>
          {loading ? t("improvingPrompt") : t("improvePrompt")}
        </Button>

        {improveError && <p className="text-[11px] text-error">{improveError}</p>}
      </div>

      {/* Quota confirmation modal (kit Dialog via the ConfirmModal adapter) */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => void handleConfirm()}
        title={t("improvePrompt")}
        variant="primary"
        cancelText={t("cancel")}
        confirmText={
          <>
            <span className="text-[12px]" aria-hidden="true">
              ✨
            </span>
            {t("improveConfirm")}
          </>
        }
        // Built only while open: the body renders nothing while the dialog is closed.
        message={
          confirmOpen && (
            <span className="flex items-start gap-3">
              <span className="text-[24px] shrink-0" aria-hidden="true">
                ✨
              </span>
              <span className="flex flex-col">
                <span className="text-xs text-text-muted">
                  {t.rich("improvePromptDescription", {
                    model: () => (
                      <code className="font-mono text-primary">{configState.model}</code>
                    ),
                  })}
                </span>
                <span className="text-xs text-text-muted mt-1.5 font-medium">
                  {t("improveQuotaWarning")}
                </span>
              </span>
            </span>
          )
        }
      />
    </>
  );
}
