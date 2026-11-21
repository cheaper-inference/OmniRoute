"use client";

import type { ReactNode, Ref } from "react";
import { Alert } from "@omniroute/ui-kit/alert";
import { useTranslations } from "next-intl";

import Button from "@/shared/components/Button";

import { lendingErrorText, type LendingNotice } from "../lib/lendingForm";

interface LendingMessageProps {
  notice: LendingNotice | null;
  onReload: () => void;
  ref: Ref<HTMLDivElement>;
}

/**
 * The result of the last save. The container is always mounted and focusable, so focus can move
 * to it after a save. Inside it, an always-mounted polite status region holds the saved message,
 * so the message is announced when it arrives. An error is a critical alert, inserted next to the
 * status region and never inside it, and announced on insertion. The text comes from the failure
 * tag, never from the server.
 */
export default function LendingMessage({ notice, onReload, ref }: LendingMessageProps) {
  const t = useTranslations("quotaSelf");
  let error: ReactNode = null;
  if (notice?.kind === "error") {
    const text = lendingErrorText(notice.error, notice.retryAfterSeconds);
    error = (
      <Alert
        variant="critical"
        dismissible={false}
        title={t(text.key, text.values)}
        actions={
          text.reload ? (
            <Button type="button" variant="outline" size="sm" onClick={onReload}>
              {t("lendingReload")}
            </Button>
          ) : undefined
        }
      />
    );
  }

  return (
    <div ref={ref} tabIndex={-1} className="min-w-0 break-words">
      <div role="status" className="min-w-0">
        {notice?.kind === "saved" ? (
          <Alert variant="success" dismissible={false} role="none" title={t("lendingSaved")} />
        ) : null}
      </div>
      {error}
    </div>
  );
}
