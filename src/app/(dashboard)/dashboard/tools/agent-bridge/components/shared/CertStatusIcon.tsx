"use client";

import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";

interface CertStatusIconProps {
  trusted: boolean;
  size?: number;
}

export function CertStatusIcon({ trusted, size = 16 }: CertStatusIconProps) {
  const t = useTranslations("agentBridge");
  const label = trusted ? t("certTrusted") : t("certNotTrusted");
  return (
    <span className="inline-flex" title={label}>
      <Icon
        name={trusted ? "verified_user" : "lock_open"}
        size={size}
        ariaLabel={label}
        className={trusted ? "text-success" : "text-text-muted"}
      />
    </span>
  );
}
