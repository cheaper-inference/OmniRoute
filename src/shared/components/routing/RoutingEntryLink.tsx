"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@omniroute/ui-kit/button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";

export default function RoutingEntryLink({ apiKeyId }: { apiKeyId?: string }) {
  const t = useTranslations("reasoningRouting.editor");
  return (
    <Card padding="sm" className="flex flex-wrap items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <p className="font-medium text-text-main">{t("pageTitle")}</p>
        <p className="mt-1 text-sm text-text-muted">{t("entryHint")}</p>
      </div>
      <Link
        href={
          apiKeyId
            ? "/dashboard/api-manager/routing?apiKeyId=" + encodeURIComponent(apiKeyId)
            : "/dashboard/api-manager/routing"
        }
        className={buttonVariants({ variant: "outline", className: "shrink-0" })}
      >
        <Icon name="route" size={18} />
        {t("configure")}
      </Link>
    </Card>
  );
}
