"use client";

// Client component: the kit `buttonVariants` lives in a "use client" module and cannot be
// called from a server component.
import Icon from "@/shared/components/Icon";
import { OmniRouteLockup } from "@/shared/components/OmniRouteLogo";
import Link from "next/link";
import { buttonVariants } from "@omniroute/ui-kit/button";
import Card from "@/shared/components/Card";
import { useTranslations } from "next-intl";

export default function MaintenancePage() {
  const t = useTranslations("publicSystem");

  return (
    <main className="min-h-screen text-text-main flex items-center justify-center p-6">
      <Card padding="lg" className="w-full max-w-xl text-center">
        <div className="mb-4 flex justify-center">
          <OmniRouteLockup />
        </div>
        <Icon name="construction" size={48} className="mx-auto mb-3 text-text-muted" />
        <h1 className="ci-heading text-2xl">{t("maintenance.title")}</h1>
        <p className="mt-3 text-text-muted leading-relaxed">{t("maintenance.description")}</p>

        <ul className="mt-6 text-sm text-text-muted text-left rounded-card border border-border bg-bg-subtle p-4 space-y-2">
          <li className="flex items-start gap-2">
            <Icon name="info" size={16} className="text-text-muted mt-0.5" />
            {t("maintenance.suggestion1")}
          </li>
          <li className="flex items-start gap-2">
            <Icon name="info" size={16} className="text-text-muted mt-0.5" />
            {t("maintenance.suggestion2")}
          </li>
        </ul>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/status" className={buttonVariants({ size: "lg" })}>
            {t("maintenance.systemStatus")}
          </Link>
          <Link
            href="/dashboard/health"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            {t("maintenance.healthDashboard")}
          </Link>
        </div>
      </Card>
    </main>
  );
}
