"use client";

import Icon from "@/shared/components/Icon";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";

import { Button, Checkbox, Modal } from "@/shared/components";
import type { RiskNoticeVariant } from "@/shared/constants/providers";

import { useRiskAcknowledged } from "../hooks/useRiskAcknowledged";

interface RiskNoticeModalProps {
  variant: RiskNoticeVariant;
  providerId: string;
  providerName: string;
  /** Provider-specific Terms of Service link, when the upstream requires one. */
  termsUrl?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function RiskNoticeModal({
  variant,
  providerId,
  providerName,
  termsUrl,
  onConfirm,
  onCancel,
}: RiskNoticeModalProps) {
  const t = useTranslations("providers.riskNotice");
  const checkboxId = useId();
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const { acknowledge } = useRiskAcknowledged(providerId);

  return (
    <Modal isOpen onClose={onCancel} title={t("title")} size="md">
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3 rounded-lg border border-warning/25 bg-warning/10 p-4">
          <Icon name="info" size={28} className="mt-0.5 leading-none text-warning" />
          <div className="min-w-0 text-text-main">
            <p className="mb-2 text-sm font-semibold">{providerName}</p>
            <p className="whitespace-pre-line text-sm leading-6 text-text-muted">{t(variant)}</p>
            {termsUrl && (
              <a
                href={termsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block break-all text-sm text-primary underline underline-offset-2"
              >
                {termsUrl}
              </a>
            )}
          </div>
        </div>

        <Checkbox
          id={checkboxId}
          checked={dontShowAgain}
          onChange={(event) => {
            const checked = event.target.checked;
            setDontShowAgain(checked);
            if (checked) acknowledge();
          }}
          label={<span className="text-xs text-text-muted">{t("dontShowAgain")}</span>}
        />

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            {t("cancel")}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {t("understand")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
