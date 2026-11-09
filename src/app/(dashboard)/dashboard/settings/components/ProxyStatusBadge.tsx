"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/shared/components";

interface ProxyStatusBadgeProps {
  status?: string;
}

// Mirrors PROXY_ALIVE_PREDICATE (src/lib/db/proxies/guards.ts) — kept as a small
// client-side duplicate rather than importing the server DB module into a "use
// client" component (same pattern as RELAY_PROXY_TYPES in proxies/mappers.ts).
// Any status in this set (including "dead", written by PROXY_AUTO_DISABLE) is
// excluded from pool/rotation resolution, so it must not render as "Active".
const NOT_ALIVE_STATUSES = new Set(["inactive", "error", "disabled", "dead", "down"]);

export function ProxyStatusBadge({ status }: ProxyStatusBadgeProps) {
  const t = useTranslations("settings");
  const isInactive = NOT_ALIVE_STATUSES.has((status ?? "").toLowerCase());
  return (
    <Badge variant={isInactive ? "error" : "success"} size="sm" dot>
      {isInactive ? t("proxyStatusInactive") : t("proxyStatusActive")}
    </Badge>
  );
}
