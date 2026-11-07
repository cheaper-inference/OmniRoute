"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";

// One-cycle migration notice. Settings → AI no longer renders or writes the
// legacy controls; the dedicated Modality Bridge page owns these settings.
export default function ModalityBridgeMovedCard() {
  const t = useTranslations("settings");

  return (
    <section className="rounded-lg border border-border bg-bg-subtle p-4">
      <div className="flex items-start gap-3">
        <Icon name="image_search" size={20} className="text-primary" />
        <div className="min-w-0 flex-1">
          <h4 className="text-base font-semibold text-text-main">
            {t("modalityBridgeMovedTitle")}
          </h4>
          <p className="mt-1 text-sm text-text-muted">{t("modalityBridgeMovedBody")}</p>
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-3 text-sm">
        <Link href="/dashboard/settings/modality-bridge" className="text-primary hover:underline">
          {t("modalityBridgeMovedCta")}
        </Link>
      </div>
    </section>
  );
}
