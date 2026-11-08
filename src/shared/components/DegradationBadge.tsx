"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge as KitBadge } from "@omniroute/ui-kit/badge";
import Icon from "@/shared/components/Icon";
import { startVisiblePolling } from "@/shared/utils/visiblePolling";

export default function DegradationBadge() {
  const [isDegraded, setDegraded] = useState(false);
  const t = useTranslations("common");

  useEffect(() => {
    const checkDegradation = async () => {
      try {
        const res = await fetch("/api/health/degradation?summary=true");
        if (res.ok) {
          const data = await res.json();
          setDegraded(data.isDegraded);
        }
      } catch {
        // Ignore error
      }
    };

    return startVisiblePolling(checkDegradation, 60000);
  }, []);

  if (!isDegraded) return null;

  // Warning tone of the kit badge, rendered as the link itself so the whole pill stays one
  // focusable target.
  return (
    <KitBadge
      asChild
      variant="secondary"
      shape="pill"
      tone="warning"
      icon={<Icon name="healing" size={14} />}
      className="whitespace-nowrap no-underline"
    >
      <Link href="/dashboard/health" title={t("warning")}>
        {t("degraded")}
      </Link>
    </KitBadge>
  );
}
