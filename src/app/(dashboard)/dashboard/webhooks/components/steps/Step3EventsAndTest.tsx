"use client";

import { useState } from "react";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Toggle from "@/shared/components/Toggle";
import { EventChecklist } from "../shared/EventChecklist";
import { PayloadPreview } from "../shared/PayloadPreview";

interface Step3Props {
  webhookId?: string;
  events: string[];
  enabled: boolean;
  description: string;
  onChangeEvents: (events: string[]) => void;
  onChangeEnabled: (enabled: boolean) => void;
  onChangeDescription: (desc: string) => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
}

interface TestResult {
  delivered: boolean;
  status: number;
  latencyMs: number;
  payloadSent: Record<string, unknown> | null;
  responseBody: string;
  error?: string | null;
}

export function Step3EventsAndTest({
  webhookId,
  events,
  enabled,
  description,
  onChangeEvents,
  onChangeEnabled,
  onChangeDescription,
  t,
}: Step3Props) {
  const [testState, setTestState] = useState<"idle" | "sending" | "ok" | "fail">("idle");
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const sendTest = async () => {
    if (!webhookId) return;
    setTestState("sending");
    setTestResult(null);
    try {
      const res = await fetch(`/api/webhooks/${webhookId}/test`, { method: "POST" });
      const data: TestResult & { error?: string } = await res.json().catch(() => ({}));
      if (!res.ok || data.delivered === false) {
        throw new Error(data.error || t("testFailed"));
      }
      setTestResult(data);
      setTestState("ok");
    } catch (err) {
      setTestState("fail");
      setTestResult((prev) => ({
        delivered: false,
        status: 0,
        latencyMs: 0,
        payloadSent: prev?.payloadSent ?? null,
        responseBody: prev?.responseBody ?? "",
        error: err instanceof Error ? err.message : t("testFailed"),
      }));
    }
  };

  const parseResponseBody = (raw: string): Record<string, unknown> | null => {
    try {
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return raw ? { raw } : null;
    }
  };

  return (
    <div className="space-y-5">
      <Input
        label={t("name")}
        value={description}
        onChange={(e) => onChangeDescription(e.target.value)}
        placeholder={t("namePlaceholder")}
      />

      <EventChecklist
        label={t("events")}
        selected={events}
        onChange={onChangeEvents}
        allEventsLabel={t("allEvents")}
      />

      <Toggle
        checked={enabled}
        onChange={onChangeEnabled}
        label={t("enabled")}
        description={t("enabledDesc")}
      />

      {webhookId && (
        <div className="rounded-lg border border-border p-4 space-y-3">
          <p className="text-sm font-medium text-text-main">{t("testWebhook")}</p>
          <Button
            variant="outline"
            onClick={() => void sendTest()}
            disabled={testState === "sending"}
          >
            <Icon
              name={testState === "sending" ? "sync" : "send"}
              size={18}
              className={testState === "sending" ? "animate-spin" : undefined}
            />
            {t("testWebhook")}
          </Button>

          {testState === "ok" && testResult && (
            <div className="space-y-3">
              <p className="text-xs font-medium text-success">
                ✅ {testResult.status} &middot; {testResult.latencyMs}ms &middot; {t("testSuccess")}
              </p>
              {testResult.payloadSent && (
                <PayloadPreview payload={testResult.payloadSent} label={t("testPayloadSent")} />
              )}
              {testResult.responseBody && (
                <PayloadPreview
                  payload={parseResponseBody(testResult.responseBody)}
                  label={t("testResponse")}
                />
              )}
            </div>
          )}

          {testState === "fail" && testResult && (
            <div className="space-y-3">
              <p className="text-xs text-error">{testResult.error ?? t("testFailed")}</p>
              {testResult.payloadSent && (
                <PayloadPreview payload={testResult.payloadSent} label={t("testPayloadSent")} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
