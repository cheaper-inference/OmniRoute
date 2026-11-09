"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { interpolateNodes, nodeArgs } from "@/shared/utils/interpolateNodes";
import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";
import { Switch } from "@omniroute/ui-kit/switch";
import { Card } from "@/shared/components";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import EmptyState from "@/shared/components/EmptyState";
import Icon from "@/shared/components/Icon";
import { cn } from "@/shared/utils/cn";
import { copyToClipboard } from "@/shared/utils/clipboard";
import McpDashboardPage from "../endpoint/components/MCPDashboard";

type ServiceStatus = { online: boolean; loading: boolean };
type McpTransport = "stdio" | "sse" | "streamable-http";

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
  const t = useTranslations("mcpDashboard");
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
        {toggling ? "..." : enabled ? "ON" : "OFF"}
      </span>
    </div>
  );
}

function TransportSelector({
  value,
  onChange,
  disabled,
  baseUrl,
}: {
  value: McpTransport;
  onChange: (t: McpTransport) => void;
  disabled: boolean;
  baseUrl: string;
}) {
  const t = useTranslations("mcpDashboard");
  const options: { value: McpTransport; label: string; desc: string }[] = [
    { value: "stdio", label: "stdio", desc: t("transportStdioDesc") },
    { value: "sse", label: "SSE", desc: t("transportSseDesc") },
    {
      value: "streamable-http",
      label: "Streamable HTTP",
      desc: t("transportStreamableHttpDesc"),
    },
  ];

  const urlMap: Record<McpTransport, string> = {
    stdio: "omniroute --mcp",
    sse: `${baseUrl}/api/mcp/sse`,
    "streamable-http": `${baseUrl}/api/mcp/stream`,
  };

  return (
    <Card padding="sm" className="bg-bg-subtle">
      <RadioGroup
        label={
          <span className="flex items-center gap-2">
            <Icon name="swap_horiz" size={16} className="text-primary" />
            {t("transportMode")}
          </span>
        }
        orientation="horizontal"
        value={value}
        onValueChange={(next) => onChange(next as McpTransport)}
        disabled={disabled}
      >
        {options.map((opt) => (
          <RadioGroupItem
            key={opt.value}
            value={opt.value}
            card
            label={opt.label}
            description={opt.desc}
          />
        ))}
      </RadioGroup>

      <div className="mt-3 rounded-md bg-surface-2 px-3 py-2 flex items-center gap-2">
        <Icon
          name={value === "stdio" ? "terminal" : "link"}
          size={14}
          className="text-text-muted"
        />
        <code className="text-xs break-all text-text-muted">{urlMap[value]}</code>
        {value !== "stdio" && (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-6 px-2 text-xs"
            onClick={() => void copyToClipboard(urlMap[value])}
            title={t("mcpDashboardCopyUrl")}
          >
            {t("copy")}
          </Button>
        )}
      </div>
    </Card>
  );
}

function DisabledPanel() {
  const t = useTranslations("mcpDashboard");
  return (
    <EmptyState
      icon="power_settings_new"
      title={t("mcpDisabledTitle")}
      description={t("mcpDisabledDesc")}
    />
  );
}

export default function McpPage() {
  const t = useTranslations("mcpDashboard");
  const tSidebar = useTranslations("sidebar");
  const [mcpStatus, setMcpStatus] = useState<ServiceStatus>({ online: false, loading: true });
  const [mcpEnabled, setMcpEnabled] = useState(false);
  const [mcpToggling, setMcpToggling] = useState(false);
  const [mcpTransport, setMcpTransport] = useState<McpTransport>("stdio");
  const [transportSaving, setTransportSaving] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    void (async () => {
      await Promise.resolve();
      setBaseUrl(`${window.location.protocol}//${window.location.host}`);
    })();
  }, []);

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
          setMcpEnabled(!!data.mcpEnabled);
          setMcpTransport((data.mcpTransport as McpTransport) || "stdio");
        }
      } catch {
        // defaults stay
      }
    };
    void fetchSettings();
  }, []);

  const refreshStatus = useCallback(async () => {
    setMcpStatus((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch("/api/mcp/status");
      setMcpStatus({ online: res.ok ? !!(await res.json()).online : false, loading: false });
    } catch {
      setMcpStatus({ online: false, loading: false });
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await refreshStatus();
    })();
    const interval = setInterval(() => void refreshStatus(), 30000);
    return () => clearInterval(interval);
  }, [refreshStatus]);

  const toggleMcp = useCallback(async () => {
    const newValue = !mcpEnabled;
    setMcpToggling(true);
    try {
      const res = await patchSetting({ mcpEnabled: newValue });
      if (res.ok) setMcpEnabled(newValue);
    } catch {
      // keep current
    } finally {
      setMcpToggling(false);
    }
  }, [mcpEnabled, patchSetting]);

  const changeTransport = useCallback(
    async (newTransport: McpTransport) => {
      setTransportSaving(true);
      try {
        const res = await patchSetting({ mcpTransport: newTransport });
        if (res.ok) setMcpTransport(newTransport);
      } catch {
        // keep current
      } finally {
        setTransportSaving(false);
      }
    },
    [patchSetting]
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Page title (lote 7 pendência 12): the shell title hides when a PageHeader is present. */}
      <PageHeader compact title={tSidebar("mcp")} description={tSidebar("mcpSubtitle")} />
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">
              {t("mcpIntro", { tools: 37, scopes: 13, transports: 3 })}
            </p>
            <ol className="mt-2 text-sm space-y-0.5 list-decimal list-inside text-text-muted">
              <li>
                {interpolateNodes(t("mcpStep1", nodeArgs(["code"])), {
                  // `{code}` is an ICU argument, not a tag (see interpolateNodes).
                  code: <code className="text-xs">omniroute --mcp</code>,
                })}
              </li>
              <li>{t("mcpStep2")}</li>
              <li>
                {interpolateNodes(t("mcpStep3", nodeArgs(["code1", "code2"])), {
                  code1: <code className="text-xs">omniroute_get_health</code>,
                  code2: <code className="text-xs">omniroute_list_combos</code>,
                })}
              </li>
            </ol>
          </div>
          <div className="shrink-0">
            <ServiceToggle
              label="MCP"
              status={mcpStatus}
              enabled={mcpEnabled}
              onToggle={() => void toggleMcp()}
              toggling={mcpToggling}
            />
          </div>
        </div>
      </Card>

      {mcpEnabled && (
        <TransportSelector
          value={mcpTransport}
          onChange={(t) => void changeTransport(t)}
          disabled={transportSaving}
          baseUrl={baseUrl}
        />
      )}

      {mcpEnabled ? <McpDashboardPage /> : <DisabledPanel />}
    </div>
  );
}
