"use client";

/**
 * CloudSyncStatus — Compact sync status indicator for the sidebar
 *
 * Shows cloud sync connection state with a small icon + label.
 * Fetches status from /api/sync/cloud periodically.
 * Listens for 'cloud-status-changed' events to re-poll immediately.
 *
 * @module shared/components/CloudSyncStatus
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Button from "./Button";
import Icon from "./Icon";

// #6147 — user-facing labels renamed from "Cloud …" to "Remote Settings Sync"
// wording (this feature syncs the operator's own settings to their own remote
// store — it is not a cloud/telemetry service). Internal state keys, the
// `cloud_*` material icons and the cloudSync.* wiring are intentionally kept.
const STATUS_CONFIG = {
  connected: { icon: "cloud_done", color: "text-success", labelKey: "synced" },
  syncing: { icon: "cloud_sync", color: "text-info animate-pulse", labelKey: "syncing" },
  disconnected: { icon: "cloud_off", color: "text-warning", labelKey: "off" },
  error: { icon: "cloud_off", color: "text-error", labelKey: "error" },
  disabled: { icon: "cloud_off", color: "text-text-muted", labelKey: "disabled" },
};

export default function CloudSyncStatus({ collapsed = false }) {
  const t = useTranslations("cloudSyncStatus");
  const [status, setStatus] = useState("disabled");
  const [lastSync, setLastSync] = useState(null);
  const mountedRef = useRef(true);
  const router = useRouter();

  const poll = useCallback(async () => {
    try {
      const res = await fetch("/api/sync/cloud");
      if (!mountedRef.current) return;
      if (!res.ok) {
        setStatus("disconnected");
        return;
      }
      const data = await res.json();
      if (!mountedRef.current) return;

      if (!data.enabled) setStatus("disabled");
      else if (data.syncing) setStatus("syncing");
      else if (data.connected) {
        setStatus("connected");
        if (data.lastSync) setLastSync(new Date(data.lastSync));
      } else setStatus("disconnected");
    } catch {
      if (mountedRef.current) setStatus("disconnected");
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    // Schedule initial poll outside of effect body to avoid setState-in-effect lint
    queueMicrotask(poll);
    const interval = setInterval(poll, 30000);

    // Listen for immediate re-poll events from EndpointPageClient
    const handleCloudChange = () => {
      setTimeout(poll, 500); // Small delay to let backend settle
    };
    globalThis.addEventListener("cloud-status-changed", handleCloudChange);

    return () => {
      mountedRef.current = false;
      clearInterval(interval);
      globalThis.removeEventListener("cloud-status-changed", handleCloudChange);
    };
  }, [poll]);

  // Don't render if cloud sync is disabled
  if (status === "disabled") return null;

  const config = STATUS_CONFIG[status];
  const label = t(config.labelKey);

  return (
    <Button
      variant="ghost"
      size="sm"
      fullWidth
      onClick={() => router.push("/dashboard/endpoint")}
      className="justify-start gap-2 px-3 text-xs"
      title={
        lastSync
          ? t("lastSync", {
              status: status === "connected" ? t("connected") : t("disconnected"),
              time: lastSync.toLocaleTimeString(),
            })
          : label
      }
      aria-label={t("statusLabel", { status: label })}
    >
      <Icon name={config.icon} size={16} className={config.color} />
      {!collapsed && (
        <span className={`truncate ${status === "connected" ? "text-success" : "text-text-muted"}`}>
          {label}
        </span>
      )}
    </Button>
  );
}
