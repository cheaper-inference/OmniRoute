"use client";

import { useState } from "react";
import { Button, Card } from "@/shared/components";
import { BooleanField } from "./ResilienceFields";

export type AntigravityTimingTelemetryValue = { enabled: boolean };

export default function AntigravityTimingTelemetryCard({
  value, saving, onSave,
}: {
  value: AntigravityTimingTelemetryValue;
  saving: boolean;
  onSave: (value: AntigravityTimingTelemetryValue) => Promise<void>;
}) {
  const [enabled, setEnabled] = useState(value.enabled);
  const [previous, setPrevious] = useState(value.enabled);
  if (previous !== value.enabled) {
    setPrevious(value.enabled);
    setEnabled(value.enabled);
  }

  return (
    <Card className="space-y-4 p-6">
      <h2 className="text-lg font-bold">Antigravity timing diagnostics</h2>
      <p className="text-sm text-text-muted">
        Record sanitized timing for actual Antigravity network sends, including
        response headers, first meaningful model delta, idle time and
        concurrency. Raw prompts, credentials and response frames are not logged.
        Changes apply to new physical sends without restarting the server.
      </p>
      <BooleanField
        label="Enable physical-send timing diagnostics"
        description="Off by default. Disabled monitoring has no routing effect."
        checked={enabled}
        onChange={setEnabled}
      />
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" disabled={saving}
          onClick={() => setEnabled(value.enabled)}>Cancel</Button>
        <Button size="sm" variant="primary" icon="save" disabled={saving || enabled === value.enabled}
          onClick={() => void onSave({ enabled }).catch(() => {})}>Save</Button>
      </div>
    </Card>
  );
}
