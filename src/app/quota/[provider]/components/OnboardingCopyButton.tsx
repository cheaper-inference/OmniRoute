"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import Button from "@/shared/components/Button";
import { copyToClipboard } from "@/shared/utils/clipboard";

interface OnboardingCopyButtonProps {
  /** Exactly what is copied. It is read on click and never kept in state. */
  text: string;
  label: string;
}

type CopyStatus = "idle" | "copied" | "failed";

const STATUS_TEXT = { copied: "onboardingCopied", failed: "onboardingCopyFailed" } as const;

/**
 * Copies `text` on an explicit click and says whether it worked. The status line is always
 * mounted so screen readers announce the result. A new text comes with a fresh instance (the
 * card keys it), so a status never outlives the text it was about.
 */
export default function OnboardingCopyButton({ text, label }: OnboardingCopyButtonProps) {
  const t = useTranslations("quotaSelf");
  const [status, setStatus] = useState<CopyStatus>("idle");

  const copy = async () => {
    const copied = await copyToClipboard(text);
    setStatus(copied ? "copied" : "failed");
  };

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
      <Button type="button" variant="secondary" size="sm" onClick={() => void copy()}>
        {label}
      </Button>
      <p
        role="status"
        className={status === "failed" ? "min-w-0 text-sm text-warning" : "min-w-0 text-sm"}
      >
        {status === "idle" ? null : t(STATUS_TEXT[status])}
      </p>
    </div>
  );
}
