"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";
import Button from "./Button";
import Icon from "./Icon";
import { ConfirmModal } from "./Modal";

type ButtonState = "idle" | "distributing" | "complete";

interface DistributeProxiesButtonProps {
  /** Async callback that performs the actual proxy distribution */
  onDistribute: () => Promise<void>;
  /** Whether the button should be disabled (e.g., during batch testing) */
  disabled?: boolean;
  /** Button label override */
  label?: string;
  /** Size variant */
  size?: "sm" | "md";
}

export default function DistributeProxiesButton({
  onDistribute,
  disabled = false,
  label = "Distribute Proxies",
  size = "md",
}: DistributeProxiesButtonProps) {
  const [state, setState] = useState<ButtonState>("idle");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const t = useTranslations("sharedComponents.distributeProxies");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = useCallback(async () => {
    if (disabled || state === "distributing") return;
    setConfirmOpen(false);
    setState("distributing");
    try {
      await onDistribute();
      setState("complete");
      timerRef.current = setTimeout(() => setState("idle"), 1500);
    } catch {
      setState("idle");
    }
  }, [onDistribute, disabled, state]);

  const isDisabled = disabled || state === "distributing";

  const sizeClasses = size === "sm" ? "h-7 px-2 py-1 text-[11px]" : "px-3 py-1.5 text-xs";

  const stateClasses =
    state === "distributing"
      ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
      : state === "complete"
        ? "bg-success/15 border-success/40 text-success"
        : "text-text-muted hover:text-text-main hover:border-primary/40";

  const icon = state === "distributing" ? "sync" : state === "complete" ? "check" : "swap_horiz";
  const displayLabel =
    state === "distributing"
      ? t("distributing")
      : state === "complete"
        ? t("complete")
        : label || t("defaultLabel");

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setConfirmOpen(true)}
        disabled={isDisabled}
        className={cn("gap-1.5", sizeClasses, stateClasses)}
        title={displayLabel}
        aria-label={displayLabel}
      >
        <Icon
          name={icon}
          size={14}
          className={state === "distributing" ? "animate-spin" : undefined}
        />
        {displayLabel}
      </Button>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleClick}
        title={displayLabel}
        message={t("confirmMessage")}
        confirmText={t("confirmDistribute")}
        cancelText={t("cancel")}
        variant="primary"
      />
    </>
  );
}
