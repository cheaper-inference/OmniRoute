"use client";

import { useEffect, useRef, useState } from "react";
import { Card, Toggle } from "@/shared/components";
import { useTranslations } from "next-intl";

export default function LoggingSettingsCard() {
  const [loggingEnabled, setLoggingEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  // Last server-confirmed value. Rollbacks restore THIS, never an
  // uncommitted intermediate — so a rapid double-toggle that fails twice
  // cannot leave the switch on the first request's value.
  const confirmedRef = useRef(true);
  const t = useTranslations("settings");

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      setLoading(true);
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (res.ok && mounted) {
          const data = await res.json();
          const initial = data.loggingEnabled !== false && data.noLogPayloads !== false;
          setLoggingEnabled(initial);
          confirmedRef.current = initial;
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
    const previousConfirmed = confirmedRef.current;
    setLoggingEnabled(value);
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loggingEnabled: value, noLogPayloads: value }),
      });
      if (!res.ok) {
        setLoggingEnabled(previousConfirmed);
        return;
      }
      confirmedRef.current = value;
    } catch (err) {
      setLoggingEnabled(previousConfirmed);
      console.error("Failed to update logging:", err);
    } finally {
      setSaving(false);
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
          disabled={loading || saving}
        />
      }
    />
  );
}
