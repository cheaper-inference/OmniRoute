"use client";

import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { buttonVariants } from "@omniroute/ui-kit/button";
import { OMNIROUTE_REPO_URL } from "@/shared/constants/projectLinks";
import { useLocalDismissal } from "@/shared/hooks/useLocalDismissal";
import Icon from "./Icon";

export default function StarInviteCard({
  storageKey = "omniroute-star-invite-dismissed-v1",
}: {
  storageKey?: string;
}) {
  const t = useTranslations("starInvite");
  const { dismissed, dismiss } = useLocalDismissal(storageKey);

  if (dismissed) return null;

  return (
    <Alert
      variant="success"
      title={t("title")}
      description={t("body")}
      actions={
        <a
          href={OMNIROUTE_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ size: "lg", className: "max-w-full" })}
        >
          <Icon name="star" size={16} />
          <span className="whitespace-normal">{t("button")}</span>
        </a>
      }
      dismissLabel={t("dismiss")}
      onDismiss={dismiss}
    />
  );
}
