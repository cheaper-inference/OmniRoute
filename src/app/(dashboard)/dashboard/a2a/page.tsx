"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { interpolateNodes, nodeArgs } from "@/shared/utils/interpolateNodes";
import { Switch } from "@omniroute/ui-kit/switch";
import { Card } from "@/shared/components";
import Badge from "@/shared/components/Badge";
import EmptyState from "@/shared/components/EmptyState";
import { cn } from "@/shared/utils/cn";
import A2ADashboardPage from "../endpoint/components/A2ADashboard";

type ServiceStatus = { online: boolean; loading: boolean };

function ServiceToggle({
  label,
  status,
  enabled,
  onToggle,
  toggling,
}: {
  label: string;
  status: ServiceStatus;
  enabled: boolean;
  onToggle: () => void;
  toggling: boolean;
}) {
  const t = useTranslations("a2aDashboard");
  const tCommon = useTranslations("common");
  const online = enabled && status.online;
  const loading = enabled && status.loading;

  return (
    <div className="flex items-center gap-3">
      <Badge variant={loading ? "default" : online ? "success" : "error"} dot>
        {loading ? "..." : online ? t("online") : t("offline")}
      </Badge>

      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
        disabled={toggling}
        aria-label={enabled ? t("disableLabel", { label }) : t("enableLabel", { label })}
        title={enabled ? t("disableLabel", { label }) : t("enableLabel", { label })}
      />

      <span
        className={cn(
          "text-xs font-medium min-w-[24px]",
          enabled ? "text-success" : "text-text-muted"
        )}
      >
        {toggling ? "..." : enabled ? tCommon("on") : tCommon("off")}
      </span>
    </div>
  );
}

function DisabledPanel() {
  const t = useTranslations("a2aDashboard");
  return (
    <EmptyState
      icon="power_settings_new"
      title={t("a2aDisabledTitle")}
      description={t("a2aDisabledDesc")}
    />
  );
}

export default function A2APage() {
  const t = useTranslations("a2aDashboard");
  const tSidebar = useTranslations("sidebar");
  const [a2aStatus, setA2aStatus] = useState<ServiceStatus>({ online: false, loading: true });
  const [a2aEnabled, setA2aEnabled] = useState(false);
  const [a2aToggling, setA2aToggling] = useState(false);

  const patchSetting = useCallback(async (body: Record<string, unknown>) => {
    return fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setA2aEnabled(!!data.a2aEnabled);
        }
      } catch {
        // defaults stay
      }
    };
    void fetchSettings();
  }, []);

  const refreshStatus = useCallback(async () => {
    setA2aStatus((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch("/api/a2a/status");
      const data = res.ok ? await res.json() : null;
      setA2aStatus({ online: data?.status === "ok", loading: false });
    } catch {
      setA2aStatus({ online: false, loading: false });
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await refreshStatus();
    })();
    const interval = setInterval(() => void refreshStatus(), 30000);
    return () => clearInterval(interval);
  }, [refreshStatus]);

  const toggleA2a = useCallback(async () => {
    const newValue = !a2aEnabled;
    setA2aToggling(true);
    try {
      const res = await patchSetting({ a2aEnabled: newValue });
      if (res.ok) setA2aEnabled(newValue);
    } catch {
      // keep current
    } finally {
      setA2aToggling(false);
    }
  }, [a2aEnabled, patchSetting]);

  return (
    <div className="flex flex-col gap-6">
      {/* Page title (lote 7 pendência 12): the shell title hides when a PageHeader is present. */}
      <PageHeader compact title={tSidebar("a2a")} description={tSidebar("a2aSubtitle")} />
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">{t("a2aIntro")}</p>
            <ol className="mt-2 text-sm space-y-0.5 list-decimal list-inside text-text-muted">
              <li>
                {interpolateNodes(t("a2aStep1", nodeArgs(["code"])), {
                  code: <code className="text-xs">{t("agentCardPath")}</code>,
                })}
              </li>
              <li>
                {interpolateNodes(t("a2aStep2", nodeArgs(["code1", "code2", "code3"])), {
                  code1: <code className="text-xs">{t("rpcEndpoint")}</code>,
                  code2: <code className="text-xs">{t("rpcMethodSend")}</code>,
                  code3: <code className="text-xs">{t("rpcMethodStream")}</code>,
                })}
              </li>
              <li>
                {interpolateNodes(t("a2aStep3", nodeArgs(["code1", "code2"])), {
                  code1: <code className="text-xs">{t("rpcMethodGet")}</code>,
                  code2: <code className="text-xs">{t("rpcMethodCancel")}</code>,
                })}
              </li>
            </ol>
          </div>
          <div className="shrink-0">
            <ServiceToggle
              label={t("serviceLabel")}
              status={a2aStatus}
              enabled={a2aEnabled}
              onToggle={() => void toggleA2a()}
              toggling={a2aToggling}
            />
          </div>
        </div>
      </Card>

      {a2aEnabled ? <A2ADashboardPage /> : <DisabledPanel />}
    </div>
  );
}
