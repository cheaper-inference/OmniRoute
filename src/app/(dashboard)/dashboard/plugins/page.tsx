"use client";

import { useState, useEffect, useCallback } from "react";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { Alert } from "@omniroute/ui-kit/alert";
import { Card, Button, EmptyState } from "@/shared/components";
import Badge from "@/shared/components/Badge";
import Icon from "@/shared/components/Icon";
import { LocalOnlyNotice } from "@/shared/components/LocalOnlyNotice";
import { useLocalOnlyBlocked } from "@/shared/hooks/useLocalOnlyAccess";
import { detectLocalOnlyRejection } from "@/shared/utils/localOnlyAccess";
import { useNotificationStore } from "@/store/notificationStore";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import { useTranslations } from "next-intl";

const PLUGINS_API_PATH = "/api/plugins";

interface PluginInfo {
  name: string;
  version: string;
  description?: string;
  author?: string;
  status: string;
  enabled: boolean;
  hooks: string[];
}

export default function PluginsPage() {
  const { addNotification } = useNotificationStore();
  const t = useTranslations("plugins");
  const { requestConfirm, confirmDialog } = useConfirmDialog();
  const [plugins, setPlugins] = useState<PluginInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  // Plugins load and run on the host: the whole API is a local-only route.
  const localOnly = useLocalOnlyBlocked(PLUGINS_API_PATH);

  const fetchPlugins = useCallback(async () => {
    try {
      const res = await fetch(PLUGINS_API_PATH);
      if (await detectLocalOnlyRejection(res, PLUGINS_API_PATH)) return;
      if (res.ok) {
        const data = await res.json();
        setPlugins(data.plugins || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (localOnly) return;
    void (async () => {
      await fetchPlugins();
    })();
  }, [fetchPlugins, localOnly]);

  const handleScan = async () => {
    setScanning(true);
    try {
      const res = await fetch("/api/plugins/scan", { method: "POST" });
      if (res.ok) {
        addNotification({ type: "success", message: t("pluginScanComplete") });
        await fetchPlugins();
      }
    } catch {
      addNotification({ type: "error", message: t("pluginScanFailed") });
    } finally {
      setScanning(false);
    }
  };

  const handleToggle = async (name: string, enable: boolean) => {
    const endpoint = enable ? "activate" : "deactivate";
    try {
      const res = await fetch(`/api/plugins/${name}/${endpoint}`, { method: "POST" });
      if (res.ok) {
        addNotification({
          type: "success",
          message: enable ? t("activated", { name }) : t("deactivated", { name }),
        });
        await fetchPlugins();
      }
    } catch {
      addNotification({
        type: "error",
        message: enable ? t("activateFailed", { name }) : t("deactivateFailed", { name }),
      });
    }
  };

  const handleUninstall = async (name: string) => {
    if (!(await requestConfirm(t("uninstallConfirm", { name })))) return;
    try {
      const res = await fetch(`/api/plugins/${name}`, { method: "DELETE" });
      if (res.ok) {
        addNotification({ type: "success", message: t("uninstalled", { name }) });
        await fetchPlugins();
      }
    } catch {
      addNotification({ type: "error", message: t("uninstallFailed", { name }) });
    }
  };

  if (localOnly) {
    return (
      <div className="space-y-6 p-6">
        <PageHeader compact title={t("title")} />
        <LocalOnlyNotice />
      </div>
    );
  }

  if (loading) {
    return (
      <div role="status" className="p-6 text-text-muted">
        {t("loading")}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        compact
        title={t("title")}
        actions={
          <Button onClick={handleScan} disabled={scanning}>
            {scanning ? t("scanning") : t("scanForPlugins")}
          </Button>
        }
      />
      <Alert
        variant="warning"
        dismissible={false}
        icon={<Icon name="warning" size={18} />}
        title={t("privilegesWarningTitle")}
        description={t("privilegesWarningBody")}
      />
      {plugins.length === 0 ? (
        <EmptyState title={t("noPlugins")} description={t("noPluginsDescription")} />
      ) : (
        <div className="grid gap-4">
          {plugins.map((plugin) => (
            <Card key={plugin.name} padding="sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3>{plugin.name}</h3>
                  <p className="text-sm text-text-muted">
                    v{plugin.version}
                    {plugin.author ? ` by ${plugin.author}` : ""}
                    {plugin.description ? ` — ${plugin.description}` : ""}
                  </p>
                  <div className="mt-1 flex gap-1">
                    {plugin.hooks.map((hook) => (
                      <Badge key={hook} variant="info" size="sm">
                        {hook}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={plugin.enabled ? "secondary" : "primary"}
                    onClick={() => handleToggle(plugin.name, !plugin.enabled)}
                  >
                    {plugin.enabled ? t("deactivate") : t("activate")}
                  </Button>
                  <Button variant="danger" onClick={() => handleUninstall(plugin.name)}>
                    {t("uninstall")}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {confirmDialog}
    </div>
  );
}
