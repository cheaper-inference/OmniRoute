"use client";

import { useTranslations } from "next-intl";

/**
 * 403 Forbidden Page — Phase 8.1
 *
 * Displayed when access is denied due to:
 * - Invalid API key
 * - IP not in allowlist
 * - Rate limit exceeded
 */

import Link from "next/link";
import { buttonVariants } from "@omniroute/ui-kit/button";
import Icon from "@/shared/components/Icon";
import { OmniRouteLockup } from "@/shared/components/OmniRouteLogo";

export default function ForbiddenPage() {
  const t = useTranslations("auth");
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-bg text-text-main text-center"
      aria-labelledby="forbidden-title"
    >
      <div className="mb-6 flex justify-center">
        <OmniRouteLockup />
      </div>
      <Icon name="gpp_bad" size={40} className="mb-3 text-text-muted" />
      <div className="ci-dashboard-display text-[96px] leading-none mb-2" aria-hidden="true">
        403
      </div>
      <h1 id="forbidden-title" className="ci-heading text-2xl mb-2">
        {t("accessDenied")}
      </h1>
      <p className="text-[15px] text-text-muted max-w-[400px] leading-relaxed mb-8">
        {t("accessDeniedDescription")}
      </p>
      <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
        {t("goToDashboard")}
      </Link>
    </main>
  );
}
