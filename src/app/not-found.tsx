"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { OmniRouteLockup } from "@/shared/components/OmniRouteLogo";

export default function NotFound() {
  const t = useTranslations("publicSystem");
  const tc = useTranslations("common");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-bg text-text-main text-center"
      role="main"
      aria-labelledby="not-found-title"
    >
      <div className="mb-6 flex justify-center">
        <OmniRouteLockup />
      </div>
      <div className="ci-dashboard-display text-[96px] leading-none mb-2" aria-hidden="true">
        404
      </div>
      <h1 id="not-found-title" className="ci-heading text-2xl mb-2">
        {t("notFound.title")}
      </h1>
      <p className="text-[15px] text-text-muted max-w-[400px] leading-relaxed mb-8">
        {t("notFound.description")}
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/dashboard"
          className="px-8 py-3 rounded-xl text-sm font-medium no-underline transition-all duration-200 motion-reduce:transition-none shadow-warm hover:-translate-y-0.5 bg-primary text-accent-foreground hover:bg-primary-hover hover:shadow-elevated focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          aria-label={t("notFound.dashboardAriaLabel")}
        >
          {tc("goToDashboard")}
        </Link>
        <Link
          href="/status"
          className="px-8 py-3 rounded-xl text-sm font-medium no-underline border border-border hover:bg-bg-alt transition-colors duration-200 motion-reduce:transition-none focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          aria-label={t("notFound.statusAriaLabel")}
        >
          {t("notFound.systemStatus")}
        </Link>
      </div>
    </div>
  );
}
