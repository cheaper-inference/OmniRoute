"use client";

import { useTranslations } from "next-intl";
import Icon from "./Icon";
import Modal from "./Modal";
import Button from "@/shared/components/Button";

export interface RiskNoticeModalProps {
  open: boolean;
  title: string;
  body: string;
  dontShowAgainKey: string;
  onAccept: () => void;
  onCancel: () => void;
}

/**
 * Generic risk notice modal (D16).
 * Persists "don't show again" preference to localStorage using `dontShowAgainKey`.
 * Escape and the focus trap come from the Modal adapter (kit Dialog); Escape cancels, as the
 * legacy Escape handler did. An overlay click does nothing (closeOnOverlay={false}): the legacy
 * backdrop had no click handler, and a stray click outside must not count as a decision.
 */
export function RiskNoticeModal({
  open,
  title,
  body,
  dontShowAgainKey,
  onAccept,
  onCancel,
}: RiskNoticeModalProps) {
  const t = useTranslations("common");

  if (!open) return null;

  const handleAccept = () => {
    try {
      localStorage.setItem(dontShowAgainKey, "true");
    } catch {
      // ignore storage errors
    }
    onAccept();
  };

  return (
    <Modal
      isOpen
      onClose={onCancel}
      size="md"
      showCloseButton={false}
      closeOnOverlay={false}
      title={
        <span className="flex items-center gap-3">
          <span className="shrink-0 rounded-lg bg-warning/10 p-2 text-warning">
            <Icon name="warning" size={20} />
          </span>
          <span className="min-w-0 whitespace-normal text-base font-semibold text-text-main">
            {title}
          </span>
        </span>
      }
      footer={
        <>
          <Button variant="ghost" onClick={onCancel}>
            {t("cancel") || "Cancel"}
          </Button>
          <Button variant="primary" onClick={handleAccept}>
            <Icon name="check" size={14} className="mr-1" />
            {t("understand") || "I understand"}
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-text-muted">{body}</p>
    </Modal>
  );
}
