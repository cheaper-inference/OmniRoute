"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import Icon from "@/shared/components/Icon";

/**
 * Shown when OmniRoute was started with auto-generated secrets (zero-config mode).
 * The banner is dismissable and persists only for the current session.
 */
export default function BootstrapBanner() {
  const t = useTranslations("common");
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  // Determine default data dir hint based on platform hint from user-agent
  const dataDir =
    typeof navigator !== "undefined" && navigator.platform?.startsWith("Win")
      ? "%APPDATA%\\omniroute\\server.env"
      : "~/.omniroute/server.env";

  return (
    <Alert
      variant="warning"
      role="alert"
      className="mb-4"
      icon={<Icon name="warning" size={18} />}
      title={t("zeroConfigBannerTitle")}
      description={t.rich("zeroConfigBannerBody", {
        dataDir,
        code: (chunks) => (
          <code className="font-mono bg-warning/15 px-1 rounded text-xs">{chunks}</code>
        ),
      })}
      dismissLabel={t("bootstrapBannerDismiss")}
      onDismiss={() => setDismissed(true)}
    />
  );
}
