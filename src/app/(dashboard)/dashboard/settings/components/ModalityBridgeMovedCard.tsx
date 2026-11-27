"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";

// One-cycle migration notice. Settings → AI no longer renders or writes the
// legacy controls; the dedicated Modality Bridge page owns these settings.
export default function ModalityBridgeMovedCard() {
  const t = useTranslations("settings");

  return (
    <Card.Section>
      <div className="flex items-start gap-3">
        <Icon name="image_search" size={20} className="text-primary" />
        <div className="min-w-0 flex-1">
          <h4 className="ci-heading text-text-main" data-size="md">
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
    </Card.Section>
  );
}
