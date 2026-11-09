"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { buttonVariants } from "@omniroute/ui-kit/button";
import Button from "@/shared/components/Button";

const DISMISS_STORAGE_KEY = "omniroute-first-run-readiness-dismissed";

type FirstRunReadinessCardProps = {
  setupComplete: boolean;
};

// #9985: dismissal lives in localStorage, read via useSyncExternalStore — keeps
// the component free of setState-in-effect cascades and hydration-safe (server
// snapshot treats the card as dismissed; the client corrects after hydration).
const readinessListeners = new Set<() => void>();

function subscribeReadiness(onStoreChange: () => void): () => void {
  readinessListeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    readinessListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function isReadinessDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISS_STORAGE_KEY) === "true";
  } catch {
    // Storage unavailable (private mode etc.) — never show the nagging card.
    return true;
  }
}

function getServerSnapshot(): boolean {
  return true;
}

/**
 * Soft entry path for first-run users. Replaces the hard redirect to
 * /dashboard/onboarding so returning users can dismiss and stay on Home.
 */
export default function FirstRunReadinessCard({ setupComplete }: FirstRunReadinessCardProps) {
  const t = useTranslations("home");
  const dismissed = useSyncExternalStore(
    subscribeReadiness,
    isReadinessDismissed,
    getServerSnapshot
  );

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_STORAGE_KEY, "true");
    } catch {
      // ignore storage failures; still hide for this session
    }
    for (const listener of readinessListeners) listener();
  }, []);

  if (setupComplete || dismissed) return null;

  const steps = [
    t("readinessStep1"),
    t("readinessStep2"),
    t("readinessStep3"),
    t("readinessStep4"),
  ];

  return (
    <Alert
      variant="info"
      role="region"
      aria-label={t("readinessTitle")}
      // The kit close button runs the same persisted dismissal as the "readinessDismiss" action.
      dismissLabel={t("readinessDismiss")}
      onDismiss={dismiss}
      className="mb-4"
      title={
        <>
          <span className="block text-xs font-medium uppercase tracking-wide text-info">
            {t("readinessEyebrow")}
          </span>
          <span className="mt-1 block text-lg font-semibold text-text-main">
            {t("readinessTitle")}
          </span>
        </>
      }
      description={
        <>
          <p className="text-sm text-text-muted">{t("readinessSubtitle")}</p>
          <ol className="mt-3 space-y-1.5 text-sm text-text-main">
            {steps.map((label, index) => (
              <li key={label} className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-info/15 text-xs font-semibold text-info">
                  {index + 1}
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ol>
        </>
      }
      actions={
        <>
          <Link href="/dashboard/onboarding" className={buttonVariants({ size: "sm" })}>
            {t("readinessContinue")}
          </Link>
          <Button variant="ghost" size="sm" onClick={dismiss}>
            {t("readinessDismiss")}
          </Button>
        </>
      }
    />
  );
}
