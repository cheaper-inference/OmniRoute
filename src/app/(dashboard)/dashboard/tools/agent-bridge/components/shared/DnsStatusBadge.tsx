"use client";

import { useTranslations } from "next-intl";
import Badge from "@/shared/components/Badge";

interface DnsStatusBadgeProps {
  enabled: boolean;
}

export function DnsStatusBadge({ enabled }: DnsStatusBadgeProps) {
  const t = useTranslations("agentBridge");
  return (
    <Badge variant={enabled ? "success" : "default"} size="sm" dot>
      {enabled ? t("dnsOn") : t("dnsOff")}
    </Badge>
  );
}
