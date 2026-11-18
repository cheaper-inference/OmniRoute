"use client";

import { useTranslations } from "next-intl";
import Icon from "./Icon";

/**
 * Tell the operator that the list they are looking at comes from the built-in
 * catalog instead of the provider, and why the live list could not be read.
 *
 * The sentence is translated; the reason is a technical value shown next to
 * it, as the repository already does with the connection statuses.
 */
export function DiscoveryDegradedNotice({
  degraded,
  cause,
}: {
  /** The discovery fell back to the built-in catalog: the notice says so. */
  degraded?: boolean;
  /** The reason of the fallback, when the server published one. */
  cause?: string;
}) {
  const t = useTranslations("providers");
  if (!degraded) return null;
  return (
    <aside
      data-testid="discovery-degraded-notice"
      className="flex items-start gap-2 rounded-lg border border-warning/25 bg-warning/10 px-2.5 py-2 text-xs"
    >
      <Icon name="warning" size={14} className="text-warning" />
      <span className="text-text-main">{t("localCatalogFallbackStatus")}</span>
      {cause ? (
        <span
          data-testid="discovery-degraded-cause"
          className="font-mono text-[11px] text-text-muted break-all"
        >
          {cause}
        </span>
      ) : null}
    </aside>
  );
}
