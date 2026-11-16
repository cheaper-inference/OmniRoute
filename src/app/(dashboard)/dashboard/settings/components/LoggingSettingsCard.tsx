"use client";

import { useEffect, useState } from "react";
import { Card, Toggle } from "@/shared/components";
import { useTranslations } from "next-intl";

export default function LoggingSettingsCard() {
  const [loggingEnabled, setLoggingEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("settings");

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      setLoading(true);
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (res.ok && mounted) {
          const data = await res.json();
          setLoggingEnabled(data.loggingEnabled !== false);
          if (data.noLogPayloads === false) setLoggingEnabled(false);
        }
      } catch {
        // Leave the current switch state in place if settings cannot be loaded.
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadSettings();
    return () => {
      mounted = false;
    };
  }, []);

  const updateLoggingEnabled = async (value: boolean) => {
    const previousValue = loggingEnabled;
    setLoggingEnabled(value);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loggingEnabled: value, noLogPayloads: value }),
      });
      if (!res.ok) setLoggingEnabled(previousValue);
    } catch (err) {
      setLoggingEnabled(previousValue);
      console.error("Failed to update logging:", err);
    }
  };

  return (
    <Card
      icon="lock_open"
      title={t("loggingToggle")}
      subtitle={t("loggingDescription")}
      className="[&>[data-slot=card-header]]:mb-0"
      action={
        <Toggle
          ariaLabel={t("loggingToggle")}
          checked={loggingEnabled}
          onChange={updateLoggingEnabled}
          disabled={loading}
        />
      }
    />
  );
}
