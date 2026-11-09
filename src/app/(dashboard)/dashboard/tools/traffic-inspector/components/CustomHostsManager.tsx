"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/Modal";
import { z } from "zod";

interface CustomHost {
  host: string;
  enabled: boolean;
  label?: string | null;
  kind: "llm" | "app" | "custom";
}

interface CustomHostsManagerProps {
  onClose: () => void;
}

export function CustomHostsManager({ onClose }: CustomHostsManagerProps) {
  const t = useTranslations("trafficInspector");
  const [hosts, setHosts] = useState<CustomHost[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const HostInputSchema = z
    .string()
    .min(1)
    .max(253)
    .regex(/^[a-z0-9.-]+$/i, t("invalidHostname"));

  const fetchHosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tools/traffic-inspector/hosts");
      if (res.ok) {
        const data = (await res.json()) as { hosts: CustomHost[] };
        setHosts(data.hosts ?? []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void (async () => {
      await fetchHosts();
    })();
  }, []);

  const addHost = async () => {
    setError(null);
    const parsed = HostInputSchema.safeParse(input.trim());
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? t("invalidHost"));
      return;
    }
    const host = parsed.data;
    try {
      const res = await fetch("/api/tools/traffic-inspector/hosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ host, enabled: true }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
        setError(body?.error?.message ?? t("addHostFailed"));
        return;
      }
      setInput("");
      await fetchHosts();
    } catch {
      setError(t("networkError"));
    }
  };

  const deleteHost = async (host: string) => {
    try {
      await fetch(`/api/tools/traffic-inspector/hosts/${encodeURIComponent(host)}`, {
        method: "DELETE",
      });
      await fetchHosts();
    } catch {
      // ignore
    }
  };

  return (
    <Modal isOpen onClose={onClose} title={t("customHostsTitle")} size="md">
      <div className="mb-4 flex items-start gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addHost()}
          placeholder={t("hostPlaceholder")}
          aria-label={t("hostPlaceholder")}
          error={error ?? undefined}
          className="flex-1"
        />
        <Button variant="primary" icon="add" onClick={addHost}>
          {t("addHost")}
        </Button>
      </div>

      <div className="max-h-60 space-y-1 overflow-y-auto">
        {loading && (
          <p className="text-sm text-text-muted" role="status" aria-live="polite">
            {t("loading")}
          </p>
        )}
        {!loading && hosts.length === 0 && (
          <p className="text-sm text-text-muted italic">{t("noHostsYet")}</p>
        )}
        {hosts.map((h) => (
          <div
            key={h.host}
            className="flex items-center justify-between rounded-control border border-border bg-bg-subtle px-3 py-1.5"
          >
            <span className="text-sm font-mono text-text-main">{h.host}</span>
            <Button
              variant="ghost"
              size="icon-sm"
              icon="delete"
              onClick={() => deleteHost(h.host)}
              aria-label={t("removeHost", { host: h.host })}
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}
