"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";

interface UpstreamCaFieldProps {
  value: string;
  onChange: (v: string) => void;
  onSave: (path: string) => Promise<void>;
}

/**
 * Input + Test button for the optional upstream CA certificate path.
 * Used for corporate networks that intercept TLS upstream.
 */
export function UpstreamCaField({ value, onChange, onSave }: UpstreamCaFieldProps) {
  const t = useTranslations("agentBridge");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"ok" | "error" | null>(null);

  const handleTest = async () => {
    if (!value.trim()) return;
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/tools/agent-bridge/upstream-ca/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: value.trim() }),
      });
      setTestResult(res.ok ? "ok" : "error");
    } catch {
      setTestResult("error");
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async () => {
    await onSave(value.trim());
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-end gap-2">
        <Input
          type="text"
          label={t("upstreamCaLabel") || "Upstream CA Certificate (corporate)"}
          className="min-w-[14rem] flex-1"
          placeholder={t("upstreamCaPlaceholder") || "/etc/ssl/certs/corp-ca.pem"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button variant="outline" onClick={handleTest} disabled={!value.trim()} loading={testing}>
          {testing ? t("upstreamCaTesting") : t("upstreamCaTest") || "Test TLS"}
        </Button>
        <Button variant="secondary" onClick={handleSave} disabled={!value.trim()}>
          {t("save") || "Save"}
        </Button>
      </div>
      {testResult === "ok" && (
        <p role="status" className="flex items-center gap-1 text-xs text-success">
          <Icon name="check_circle" size={12} />
          {t("upstreamCaTestOk") || "TLS test passed"}
        </p>
      )}
      {testResult === "error" && (
        <p role="alert" className="flex items-center gap-1 text-xs text-error">
          <Icon name="error" size={12} />
          {t("upstreamCaTestError") || "TLS test failed — check the path and CA file"}
        </p>
      )}
    </div>
  );
}
