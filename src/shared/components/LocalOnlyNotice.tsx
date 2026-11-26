"use client";

import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import Icon from "./Icon";

/**
 * The one message for a feature that only works on the machine OmniRoute runs on, shown
 * where a remote dashboard would otherwise get the route guard's 403 (see
 * `useLocalOnlyBlocked`). No retry and no dismiss: neither changes anything from a remote
 * session.
 */
export function LocalOnlyNotice({ className }: { className?: string }) {
  const t = useTranslations("common");
  return (
    <Alert
      data-testid="local-only-notice"
      variant="info"
      dismissible={false}
      className={className}
      icon={<Icon name="computer" size={18} />}
      title={t("localOnlyTitle")}
      description={t("localOnlyDescription")}
    />
  );
}
