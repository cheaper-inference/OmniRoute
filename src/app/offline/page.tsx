"use client";

import Icon from "@/shared/components/Icon";
import { OmniRouteLockup } from "@/shared/components/OmniRouteLogo";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { buttonVariants } from "@omniroute/ui-kit/button";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import { useTranslations } from "next-intl";

function subscribeToOnline(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export default function OfflinePage() {
  const t = useTranslations("publicSystem");
  const isOnline = useSyncExternalStore(
    subscribeToOnline,
    () => navigator.onLine,
    () => false
  );

  return (
    <main className="min-h-screen text-text-main flex items-center justify-center p-6">
      <Card padding="lg" className="w-full max-w-xl text-center">
        <div className="mb-4 flex justify-center">
          <OmniRouteLockup />
        </div>
        <Icon name="wifi_off" size={48} className="mx-auto mb-3 text-text-muted" />
        <h1 className="ci-heading text-2xl">{t("offline.title")}</h1>
        <p className="mt-3 text-text-muted leading-relaxed">{t("offline.description")}</p>

        <div className="mt-6" aria-live="polite">
          <Badge
            variant={isOnline ? "success" : "warning"}
            icon={<Icon name={isOnline ? "wifi" : "wifi_off"} size={16} />}
          >
            {isOnline ? t("offline.connectionRestored") : t("offline.offlineModeDetected")}
          </Badge>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button size="lg" onClick={() => window.location.reload()}>
            {t("offline.retryConnection")}
          </Button>
          <Link href="/status" className={buttonVariants({ variant: "outline", size: "lg" })}>
            {t("offline.openStatusPage")}
          </Link>
        </div>
      </Card>
    </main>
  );
}
