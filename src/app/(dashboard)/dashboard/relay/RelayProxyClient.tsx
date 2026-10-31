"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import Card from "@/shared/components/Card";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import EmptyState from "@/shared/components/EmptyState";
import Input from "@/shared/components/Input";
import { useNotificationStore } from "@/store/notificationStore";
import { useDisplayBaseUrl } from "@/shared/hooks";

interface RelayToken {
  id: string;
  name: string;
  tokenPrefix: string;
  description: string;
  comboId: string | null;
  allowedModels: string;
  maxRequestsPerMinute: number;
  maxRequestsPerDay: number;
  enabled: boolean;
  createdAt: number;
  lastUsedAt: number | null;
}

export default function RelayProxyClient() {
  const t = useTranslations("relay");
  const displayBaseUrl = useDisplayBaseUrl();
  const [tokens, setTokens] = useState<RelayToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newTokenData, setNewTokenData] = useState<{ rawToken: string; name: string } | null>(null);
  const [form, setForm] = useState({ name: "", description: "", maxRpm: "60", maxRpd: "10000" });
  const addNotification = useNotificationStore((s) => s.addNotification);

  const fetchTokens = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/relay/tokens");
      const data = await res.json();
      setTokens(Array.isArray(data) ? data : []);
    } catch {
      setTokens([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await fetchTokens();
    })();
  }, [fetchTokens]);

  const createToken = async () => {
    if (!form.name.trim()) return;
    try {
      const res = await fetch("/api/relay/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          maxRequestsPerMinute: Number(form.maxRpm),
          maxRequestsPerDay: Number(form.maxRpd),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewTokenData({ rawToken: data.rawToken, name: data.name });
        setForm({ name: "", description: "", maxRpm: "60", maxRpd: "10000" });
        setShowCreate(false);
        addNotification({ type: "success", message: t("created") });
        void fetchTokens();
      } else {
        addNotification({ type: "error", message: data.error || t("createFailed") });
      }
    } catch {
      addNotification({ type: "error", message: t("createFailed") });
    }
  };

  const toggleToken = async (id: string, enabled: boolean) => {
    try {
      await fetch(`/api/relay/tokens/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
      });
      void fetchTokens();
    } catch {
      addNotification({ type: "error", message: t("toggleFailed") });
    }
  };

  const deleteToken = async (id: string) => {
    if (!confirm(t("deleteConfirm"))) return;
    try {
      await fetch(`/api/relay/tokens/${id}`, { method: "DELETE" });
      addNotification({ type: "success", message: t("deleted") });
      void fetchTokens();
    } catch {
      addNotification({ type: "error", message: t("deleteFailed") });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        compact
        title={t("title")}
        description={t("description")}
        actions={
          <Button
            variant={showCreate ? "outline" : "primary"}
            onClick={() => setShowCreate(!showCreate)}
          >
            {showCreate ? t("cancel") : t("newToken")}
          </Button>
        }
      />

      {/* Create Form */}
      {showCreate && (
        <Card>
          <div className="p-4 space-y-4">
            <h2 className="text-sm font-semibold">{t("createTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t("nameRequired")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="my-api-relay"
              />
              <Input
                label={t("tokenDescription")}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder={t("descriptionPlaceholder")}
              />
              <Input
                label={t("maxPerMinute")}
                type="number"
                value={form.maxRpm}
                onChange={(e) => setForm({ ...form, maxRpm: e.target.value })}
              />
              <Input
                label={t("maxPerDay")}
                type="number"
                value={form.maxRpd}
                onChange={(e) => setForm({ ...form, maxRpd: e.target.value })}
              />
            </div>
            <Button onClick={createToken} disabled={!form.name.trim()}>
              {t("createButton")}
            </Button>
          </div>
        </Card>
      )}

      {/* Token Display (shown once after creation) */}
      {newTokenData && (
        <Card>
          <div className="p-4 space-y-3">
            <h2 className="text-sm font-semibold text-success">{t("createdTitle")}</h2>
            <div className="bg-bg-subtle border border-border rounded-lg p-3">
              <p className="text-xs text-text-muted mb-1">
                {t.rich("tokenFor", {
                  name: newTokenData.name,
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
              <code className="text-sm font-mono break-all select-all bg-surface px-2 py-1 rounded">
                {newTokenData.rawToken}
              </code>
            </div>
            <p className="text-xs text-text-muted">{t("shownOnce")}</p>
            <Button onClick={() => setNewTokenData(null)}>{t("dismiss")}</Button>
          </div>
        </Card>
      )}

      {/* Usage Guide */}
      <Card>
        <div className="p-4 space-y-2">
          <h2 className="text-sm font-semibold">{t("usage")}</h2>
          <p className="text-xs text-text-muted">{t("usageDescription")}</p>
          <pre className="text-xs bg-bg-subtle border border-border rounded-lg p-3 overflow-x-auto">
            {`curl ${displayBaseUrl}/v1/relay/chat/completions \\
  -H "Authorization: Bearer relay_..." \\
  -H "Content-Type: application/json" \\
  -d '{"model":"claude-sonnet-4","messages":[{"role":"user","content":"Hello"}]}'`}
          </pre>
        </div>
      </Card>

      {/* Tokens List */}
      <Card>
        <div className="p-4">
          <h2 className="text-sm font-semibold mb-3">
            {t("tokenCount", { count: tokens.length })}
          </h2>
          {loading ? (
            <p className="text-sm text-text-muted">{t("loading")}</p>
          ) : tokens.length === 0 ? (
            <EmptyState icon="key" title={t("empty")} />
          ) : (
            <div className="space-y-2">
              {tokens.map((token) => (
                <div
                  key={token.id}
                  className="flex items-center justify-between border border-border rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${token.enabled ? "bg-success" : "bg-error"}`}
                    />
                    <div>
                      <div className="font-medium text-sm">{token.name}</div>
                      <div className="text-xs text-text-muted font-mono">
                        {token.tokenPrefix}...
                      </div>
                      {token.description && (
                        <div className="text-xs text-text-muted mt-0.5">{token.description}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="info" size="sm">
                      {token.maxRequestsPerMinute}/min
                    </Badge>
                    <Badge variant="info" size="sm">
                      {token.maxRequestsPerDay}/day
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleToken(token.id, !token.enabled)}
                    >
                      {token.enabled ? t("disable") : t("enable")}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-error"
                      onClick={() => deleteToken(token.id)}
                    >
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
