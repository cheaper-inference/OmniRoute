"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";

/**
 * MITM Proxy page — moved to AgentBridge (plan 11 §12).
 * Shows a "page moved" banner for 2.5 s then redirects.
 */
export default function MitmProxyMovedPage() {
  const router = useRouter();
  const t = useTranslations("agentBridge.pageMoved");
  const tc = useTranslations("common");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/dashboard/tools/agent-bridge");
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-8">
      <Alert
        variant="warning"
        className="w-full max-w-md"
        icon={<Icon name="info" size={20} />}
        title={<h1 className="text-lg font-semibold">{t("title")}</h1>}
        description={t("message")}
        dismissLabel={tc("close")}
        actions={
          <Button variant="outline" onClick={() => router.replace("/dashboard/tools/agent-bridge")}>
            {t("goNow")}
          </Button>
        }
      />
    </div>
  );
}
