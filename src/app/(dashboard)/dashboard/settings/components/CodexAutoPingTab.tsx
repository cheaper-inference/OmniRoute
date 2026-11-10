"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, Toggle, InfoTooltip } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import CodexWakeupsSection from "./CodexWakeupsSection";

type CodexConnection = {
  id: string;
  provider: string;
  authType?: string;
  name?: string | null;
  email?: string | null;
  displayName?: string | null;
};

function connectionLabel(conn: CodexConnection): string {
  return conn.displayName || conn.name || conn.email || conn.id;
}

function useCodexAutoPingSettings() {
  const [connections, setConnections] = useState<CodexConnection[]>([]);
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [status, setStatus] = useState<"" | "saved" | "error">("");

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/api/settings").then((res) => res.json()),
      fetch("/api/providers").then((res) => res.json()),
    ])
      .then(([settingsData, providersData]) => {
        if (cancelled) return;
        const codexOAuthConnections: CodexConnection[] = (providersData?.connections || []).filter(
          (c: CodexConnection) => c.provider === "codex" && c.authType === "oauth"
        );
        setConnections(codexOAuthConnections);
        setEnabledMap(settingsData?.codexAutoPing?.connections || {});
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleConnection = async (connectionId: string, checked: boolean) => {
    if (savingId) return;
    setSavingId(connectionId);
    setStatus("");
    const previous = enabledMap;
    const next = { ...enabledMap, [connectionId]: checked };
    setEnabledMap(next);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codexAutoPing: { connections: next } }),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setEnabledMap(previous);
        setStatus("error");
      }
    } catch {
      setEnabledMap(previous);
      setStatus("error");
    } finally {
      setSavingId(null);
    }
  };

  return { connections, enabledMap, loading, savingId, status, toggleConnection };
}

function CodexAutoPingStatus({ status }: { status: "" | "saved" | "error" }) {
  const t = useTranslations("settings");
  if (status === "saved") {
    return (
      <span role="status" className="text-xs font-medium text-success flex items-center gap-1">
        <Icon name="check_circle" size={14} /> {t("saved")}
      </span>
    );
  }
  if (status === "error") {
    return (
      <span role="alert" className="text-xs font-medium text-error flex items-center gap-1">
        <Icon name="error" size={14} /> {t("codexAutoPingSaveError")}
      </span>
    );
  }
  return null;
}

function CodexAutoPingConnectionList({
  connections,
  enabledMap,
  savingId,
  onToggle,
}: {
  connections: CodexConnection[];
  enabledMap: Record<string, boolean>;
  savingId: string | null;
  onToggle: (connectionId: string, checked: boolean) => void;
}) {
  const t = useTranslations("settings");
  return (
    <div className="flex flex-col gap-2 border-t border-border pt-3">
      {connections.map((conn) => (
        <div key={conn.id} className="flex items-center justify-between gap-3 py-1">
          <span className="text-sm font-mono truncate">{connectionLabel(conn)}</span>
          <Toggle
            checked={enabledMap[conn.id] === true}
            onChange={(value) => onToggle(conn.id, value)}
            disabled={savingId === conn.id}
            ariaLabel={t("codexAutoPingToggleAria", { connection: connectionLabel(conn) })}
          />
        </div>
      ))}
    </div>
  );
}

export default function CodexAutoPingTab() {
  const t = useTranslations("settings");
  const { connections, enabledMap, loading, savingId, status, toggleConnection } =
    useCodexAutoPingSettings();

  if (!loading && connections.length === 0) return null;

  return (
    <Card
      icon="bolt"
      title={
        <span className="flex items-center gap-1.5">
          {t("codexAutoPingTitle")}
          <InfoTooltip text={t("codexAutoPingWarning")} />
        </span>
      }
      subtitle={t("codexAutoPingDesc")}
      action={<CodexAutoPingStatus status={status} />}
    >
      {loading ? (
        <p className="text-sm text-text-muted" role="status">
          {t("loading")}
        </p>
      ) : (
        <>
          <CodexAutoPingConnectionList
            connections={connections}
            enabledMap={enabledMap}
            savingId={savingId}
            onToggle={toggleConnection}
          />
          <CodexWakeupsSection
            accounts={connections.map((conn) => ({ id: conn.id, label: connectionLabel(conn) }))}
          />
        </>
      )}
    </Card>
  );
}
