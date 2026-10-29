"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { Badge, Card, Button, Input, Spinner, Toggle, ProxyConfigModal } from "@/shared/components";
import Icon from "@/shared/components/Icon";

type GlobalProxyConfig = { type: string; host: string; port: number } | null;

type HealthcheckResult = {
  proxyUrl: string;
  ok: boolean;
  latencyMs: number | null;
};

type HealthcheckSummary = {
  total: number;
  working: number;
  failed: number;
};

async function fetchGlobalProxyConfig(): Promise<GlobalProxyConfig | undefined> {
  try {
    const res = await fetch("/api/settings/proxy?level=global");
    if (res.ok) {
      const data = await res.json();
      return data.proxy || null;
    }
  } catch {}
  return undefined;
}

export default function GlobalConfigTab() {
  const [proxyModalOpen, setProxyModalOpen] = useState(false);
  const [globalProxy, setGlobalProxy] = useState<GlobalProxyConfig>(null);
  const [perKeyProxyEnabled, setPerKeyProxyEnabled] = useState(false);
  const [perKeyLoading, setPerKeyLoading] = useState(true);
  const [targetUrl, setTargetUrl] = useState("https://api.openai.com/v1/models");
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<HealthcheckResult[] | null>(null);
  const [summary, setSummary] = useState<HealthcheckSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const t = useTranslations("settings");
  const tc = useTranslations("common");

  const loadGlobalProxy = useCallback(async () => {
    const proxy = await fetchGlobalProxyConfig();
    if (proxy !== undefined) setGlobalProxy(proxy);
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    void (async () => {
      const proxy = await fetchGlobalProxyConfig();
      if (mountedRef.current && proxy !== undefined) setGlobalProxy(proxy);
    })();
    void (async () => {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (mountedRef.current) setPerKeyProxyEnabled(data.perKeyProxyEnabled === true);
        }
      } catch {
        /* leave default */
      } finally {
        if (mountedRef.current) setPerKeyLoading(false);
      }
    })();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleTogglePerKeyProxyEnabled = async () => {
    const newValue = !perKeyProxyEnabled;
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ perKeyProxyEnabled: newValue }),
      });
      if (res.ok) {
        setPerKeyProxyEnabled(newValue);
      }
    } catch (err) {
      console.error("Failed to update per-key proxy setting:", err);
    }
  };

  const runHealthcheck = async () => {
    setTesting(true);
    setResults(null);
    setSummary(null);
    setError(null);

    try {
      const res = await fetch("/api/proxy-fallback/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        setError(err.error || `HTTP ${res.status}`);
        return;
      }

      const data = await res.json();
      setResults(data.results);
      setSummary(data.summary);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("healthcheckFailed"));
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card icon="vpn_lock" title={t("globalProxy")} subtitle={t("globalProxyDesc")}>
        <div className="flex flex-wrap items-center gap-3">
          {globalProxy ? (
            <Badge variant="success" className="font-mono uppercase">
              {globalProxy.type}://{globalProxy.host}:{globalProxy.port}
            </Badge>
          ) : (
            <span className="text-sm text-text-muted">{t("noGlobalProxy")}</span>
          )}
          <Button
            size="sm"
            variant={globalProxy ? "secondary" : "primary"}
            icon="settings"
            onClick={() => {
              loadGlobalProxy();
              setProxyModalOpen(true);
            }}
          >
            {globalProxy ? tc("edit") : t("configure")}
          </Button>
        </div>
      </Card>

      <Card
        icon="key"
        title={t("perKeyProxyEnabled")}
        subtitle={t("perKeyProxyEnabledDesc")}
        className="[&>[data-slot=card-header]]:mb-0"
        action={
          <Toggle
            ariaLabel={t("perKeyProxyEnabled")}
            checked={perKeyProxyEnabled}
            disabled={perKeyLoading}
            onChange={handleTogglePerKeyProxyEnabled}
          />
        }
      />

      <Card icon="network_check" title={t("bulkHealthcheck")} subtitle={t("bulkHealthcheckDesc")}>
        <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-end">
          <Input
            type="url"
            aria-label={t("bulkHealthcheck")}
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://api.openai.com/v1/models"
            className="flex-1"
            inputClassName="font-mono"
          />
          <Button
            size="sm"
            variant="primary"
            icon="play_arrow"
            loading={testing}
            onClick={runHealthcheck}
          >
            {testing ? t("healthcheckTesting") : t("healthcheckAll")}
          </Button>
        </div>

        {error && (
          <div
            role="alert"
            className="p-3 rounded-lg bg-error-bg border border-error/30 text-sm text-error"
          >
            {error}
          </div>
        )}

        {testing && !results && (
          <div className="flex items-center gap-2 text-sm text-text-muted py-2" role="status">
            <Spinner size="sm" />
            {t("healthcheckTestingAll")}
          </div>
        )}

        {summary && (
          <div className="flex flex-wrap items-center gap-4 mb-3 text-sm">
            <span className="text-text-muted">
              {t("healthcheckTotal")}: <strong>{summary.total}</strong>
            </span>
            <span className="text-success">
              {t("healthcheckWorking")}: <strong>{summary.working}</strong>
            </span>
            <span className="text-error">
              {t("healthcheckFailedLabel")}: <strong>{summary.failed}</strong>
            </span>
          </div>
        )}

        {results && results.length > 0 && (
          <Table
            scrollbarLabel={t("bulkHealthcheck")}
            containerClassName="max-h-64 overflow-y-auto"
            className="text-xs"
          >
            <TableHeader>
              <TableRow>
                <TableHead>{t("healthcheckStatus")}</TableHead>
                <TableHead>{t("healthcheckProxyUrl")}</TableHead>
                <TableHead className="text-right">{t("healthcheckLatency")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((r, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {r.ok ? (
                      <Icon
                        name="check_circle"
                        size={16}
                        className="text-success"
                        ariaLabel={t("healthcheckWorking")}
                      />
                    ) : (
                      <Icon
                        name="cancel"
                        size={16}
                        className="text-error"
                        ariaLabel={t("healthcheckFailedLabel")}
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-mono truncate max-w-xs">{r.proxyUrl}</TableCell>
                  <TableCell className="text-right text-text-muted">
                    {r.latencyMs !== null ? `${r.latencyMs}ms` : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <ProxyConfigModal
        isOpen={proxyModalOpen}
        onClose={() => setProxyModalOpen(false)}
        level="global"
        levelLabel={t("globalLabel")}
        onSaved={loadGlobalProxy}
      />
    </div>
  );
}
