"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { buttonVariants } from "@omniroute/ui-kit/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { Badge, Button, Card, Input } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { cn } from "@/shared/utils/cn";

const TRANSPARENT_MITM_PORT = 443;

type MitmTargetRoute = {
  id: string;
  name: string;
  targetHost: string;
  targetPort: number;
  localPort: number;
  endpoints: string[];
  enabled: boolean;
};

type MitmStatus = {
  running: boolean;
  pid: number | null;
  dnsConfigured: boolean;
  certExists: boolean;
  hasCachedPassword: boolean;
  port: number;
  targets: MitmTargetRoute[];
  stats: {
    startedAt: string | null;
    totalRequests: number;
    interceptedRequests: number;
    activeConnections: number;
    lastRequestAt: string | null;
    lastInterceptAt: string | null;
  };
};

function emptyStatus(): MitmStatus {
  return {
    running: false,
    pid: null,
    dnsConfigured: false,
    certExists: false,
    hasCachedPassword: false,
    port: 443,
    targets: [],
    stats: {
      startedAt: null,
      totalRequests: 0,
      interceptedRequests: 0,
      activeConnections: 0,
      lastRequestAt: null,
      lastInterceptAt: null,
    },
  };
}

function formatDate(value: string | null) {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

type MitmStatusResult = { data: MitmStatus } | { errorMessage: string | null };

async function fetchMitmStatusResult(): Promise<MitmStatusResult> {
  try {
    const response = await fetch("/api/settings/mitm");
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return { errorMessage: data.error ? String(data.error) : null };
    return { data: data as MitmStatus };
  } catch (error) {
    return { errorMessage: error instanceof Error ? error.message : null };
  }
}

export default function MitmProxyTab() {
  const t = useTranslations("mitm");
  const tCommon = useTranslations("common");
  const [status, setStatus] = useState<MitmStatus>(emptyStatus);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [port, setPort] = useState("443");
  const [apiKey, setApiKey] = useState("");
  const [sudoPassword, setSudoPassword] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  const applyStatusResult = useCallback(
    (result: MitmStatusResult) => {
      if ("data" in result) {
        setStatus(result.data);
        setPort(String(TRANSPARENT_MITM_PORT));
        setFeedback(null);
      } else {
        setFeedback({
          type: "error",
          message: result.errorMessage ?? t("loadFailed"),
        });
      }
      setLoading(false);
    },
    [t]
  );

  const loadStatus = useCallback(async () => {
    setLoading(true);
    applyStatusResult(await fetchMitmStatusResult());
  }, [applyStatusResult]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await fetchMitmStatusResult();
      if (!cancelled) applyStatusResult(result);
    })();
    return () => {
      cancelled = true;
    };
  }, [applyStatusResult]);

  const updateMitm = async (payload: Record<string, unknown>, successMessage: string) => {
    setSaving(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/settings/mitm", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || t("saveFailed"));
      setStatus(data);
      setPort(String(TRANSPARENT_MITM_PORT));
      setFeedback({ type: "success", message: successMessage });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : t("saveFailed"),
      });
    } finally {
      setSaving(false);
    }
  };

  const savePort = () => {
    const parsedPort = Number.parseInt(port, 10);
    if (parsedPort !== TRANSPARENT_MITM_PORT) {
      setFeedback({ type: "error", message: t("invalidPort") });
      setPort(String(TRANSPARENT_MITM_PORT));
      return;
    }
    void updateMitm({ port: TRANSPARENT_MITM_PORT }, t("settingsSaved"));
  };

  const toggleMitm = () => {
    void updateMitm(
      {
        enabled: !status.running,
        port: TRANSPARENT_MITM_PORT,
        apiKey: String(apiKey || "").trim() || undefined,
        sudoPassword: sudoPassword || undefined,
      },
      status.running ? t("stoppedSuccess") : t("startedSuccess")
    );
  };

  const regenerateCertificate = async () => {
    if (!confirm(t("regenerateConfirm"))) return;

    setSaving(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/settings/mitm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "regenerate-cert" }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || t("regenerateFailed"));
      setStatus(data);
      setFeedback({ type: "success", message: t("regenerateSuccess") });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : t("regenerateFailed"),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-text-main">
            <Icon name="lan" size={20} className="text-text-muted" />
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-text-muted">{t("description")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant={status.running ? "success" : "default"}
            icon={status.running ? "play_circle" : "pause_circle"}
          >
            {status.running ? t("running") : t("stopped")}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => void loadStatus()} disabled={loading}>
            {t("refresh")}
          </Button>
        </div>
      </div>

      {feedback && (
        <Alert
          className="mb-5"
          variant={feedback.type === "success" ? "success" : "critical"}
          description={feedback.message}
          dismissLabel={tCommon("close")}
          onDismiss={() => setFeedback(null)}
        />
      )}

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface/50 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-text-main">{t("enable")}</p>
                <p className="text-xs text-text-muted">{t("enableDesc")}</p>
              </div>
              <Button
                variant={status.running ? "danger" : "primary"}
                icon={status.running ? "stop_circle" : "play_circle"}
                onClick={toggleMitm}
                disabled={saving || loading}
              >
                {status.running ? t("stop") : t("start")}
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <Input label={t("port")} value={port} readOnly disabled={status.running} />
              <Input
                label={t("apiKey")}
                type="password"
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                placeholder={t("apiKeyPlaceholder")}
              />
              <Input
                label={t("sudoPassword")}
                type="password"
                value={sudoPassword}
                onChange={(event) => setSudoPassword(event.target.value)}
                placeholder={status.hasCachedPassword ? t("cachedPassword") : t("sudoPassword")}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={savePort}
              disabled={saving || status.running}
            >
              {t("saveSettings")}
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-surface/50 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-text-main">{t("certificate")}</p>
                <p className="text-xs text-text-muted">
                  {status.certExists ? t("certificateReady") : t("certificateMissing")}
                </p>
              </div>
              <Badge variant={status.certExists ? "success" : "warning"} size="sm">
                {status.certExists ? t("available") : t("missing")}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/api/settings/mitm?download=cert"
                aria-disabled={!status.certExists || undefined}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  !status.certExists && "pointer-events-none opacity-50"
                )}
              >
                <Icon name="download" size={18} />
                {t("downloadCert")}
              </a>
              <Button
                variant="outline"
                size="sm"
                icon="autorenew"
                onClick={regenerateCertificate}
                disabled={saving || status.running}
              >
                {t("regenerateCert")}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {[
            {
              label: t("interceptedRequests"),
              value: status.stats.interceptedRequests.toLocaleString(),
              icon: "swap_horiz",
            },
            {
              label: t("activeConnections"),
              value: status.stats.activeConnections.toLocaleString(),
              icon: "hub",
            },
            {
              label: t("dnsConfigured"),
              value: status.dnsConfigured ? t("yes") : t("no"),
              icon: "dns",
            },
            {
              label: t("pid"),
              value: status.pid ? String(status.pid) : "-",
              icon: "tag",
            },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-surface/50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-text-main">{item.value}</p>
                </div>
                <span className="rounded-lg bg-bg-subtle p-2 text-text-muted">
                  <Icon name={item.icon} size={20} />
                </span>
              </div>
            </div>
          ))}
          <div className="rounded-xl border border-border bg-surface/50 p-4 sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("lastIntercept")}
            </p>
            <p className="mt-1 text-sm text-text-main">
              {formatDate(status.stats.lastInterceptAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border">
        <div className="border-b border-border bg-sidebar/40 px-4 py-3">
          <h3 className="text-sm font-semibold text-text-main">{t("targetRoutes")}</h3>
        </div>
        {status.targets.length === 0 ? (
          <div className="p-6 text-center text-sm text-text-muted">{t("noTargets")}</div>
        ) : (
          <Table className="min-w-[760px]">
            <TableHeader>
              <TableRow>
                <TableHead>{t("target")}</TableHead>
                <TableHead>{t("host")}</TableHead>
                <TableHead>{t("localPort")}</TableHead>
                <TableHead>{t("endpoints")}</TableHead>
                <TableHead>{t("status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {status.targets.map((target) => (
                <TableRow key={target.id}>
                  <TableCell className="font-medium text-text-main">{target.name}</TableCell>
                  <TableCell className="font-mono text-xs text-text-muted">
                    {target.targetHost}:{target.targetPort}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-text-muted">
                    {target.localPort}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {target.endpoints.map((endpoint) => (
                        <Badge key={endpoint} size="sm">
                          {endpoint}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge size="sm">{target.enabled ? t("enabled") : t("configured")}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Card>
  );
}
