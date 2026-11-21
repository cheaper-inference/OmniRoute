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
 * to it when a result arrives. The text comes from the failure tag, never from the server.
 */
export default function LendingMessage({ notice, onReload, ref }: LendingMessageProps) {
  const t = useTranslations("quotaSelf");
  let banner: ReactNode = null;
  if (notice?.kind === "saved") {
    banner = <Alert variant="success" dismissible={false} title={t("lendingSaved")} />;
  } else if (notice?.kind === "error") {
    const text = lendingErrorText(notice.error, notice.retryAfterSeconds);
    banner = (
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
      {banner}
    </div>
  );
}
