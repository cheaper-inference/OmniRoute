"use client";

import { useTranslations } from "next-intl";
import { buttonVariants } from "@omniroute/ui-kit/button";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import { OmniRouteLockup } from "@/shared/components/OmniRouteLogo";

/**
 * Server Error Page — P-1
 *
 * Per-page error boundary for unrecoverable errors within the
 * dashboard layout. Falls back to global-error.tsx if this fails.
 */

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("publicSystem");
  const tc = useTranslations("common");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center"
      role="alert"
      aria-live="assertive"
    >
      <div className="mb-6 flex justify-center">
        <OmniRouteLockup />
      </div>
      <Icon name="build" size={40} className="mb-3 text-text-muted" />
      <h1 className="ci-heading text-2xl mb-2">{t("error.title")}</h1>
      <p className="text-[15px] text-text-muted max-w-[400px] leading-relaxed mb-2">
        {t("error.description")}
      </p>
      {error?.digest && (
        <p className="text-xs text-text-muted mb-6 font-mono">
          {t("error.errorId", { id: error.digest })}
        </p>
      )}
      {process.env.NODE_ENV === "development" && error?.message && (
        <pre
          className="p-4 rounded-lg bg-error-bg border border-error/30 text-error text-xs max-w-[600px] overflow-auto text-left mb-6"
          aria-label={t("error.detailsAriaLabel")}
        >
          {error.message}
        </pre>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button size="lg" onClick={reset} aria-label={t("error.retryAriaLabel")}>
          {t("error.tryAgain")}
        </Button>
        <a
          href="/dashboard"
          className={buttonVariants({ variant: "outline", size: "lg" })}
          aria-label={t("error.dashboardAriaLabel")}
        >
          {tc("goToDashboard")}
        </a>
        <a
          href="/status"
          className={buttonVariants({ variant: "outline", size: "lg" })}
          aria-label={t("error.statusAriaLabel")}
        >
          {t("error.systemStatus")}
        </a>
      </div>
    </div>
  );
}
