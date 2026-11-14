"use client";

import { useState } from "react";
import { Button, Card } from "@/shared/components";
import { BooleanField } from "./ResilienceFields";

export type AntigravityAdaptiveHealthValue = { enabled: boolean };

export default function AntigravityAdaptiveHealthCard({
  value,
  saving,
  onSave,
}: {
  value: AntigravityAdaptiveHealthValue;
  saving: boolean;
  onSave: (value: AntigravityAdaptiveHealthValue) => Promise<void>;
}) {
  const [enabled, setEnabled] = useState(value.enabled);
  const [previous, setPrevious] = useState(value.enabled);
  if (previous !== value.enabled) {
    setPrevious(value.enabled);
    setEnabled(value.enabled);
  }

  return (
    <Card className="space-y-4 p-6">
      <h2 className="text-lg font-bold">Antigravity adaptive model health</h2>
      <p className="text-sm text-text-muted">
        Temporarily avoid an Antigravity account for a specific model after repeated confirmed
        upstream response-start timeouts. Only eligible accounts are considered; cancelled requests
        and quota failures do not count. A new setting applies to new chat requests, without a
        restart.
      </p>
      <BooleanField
        label="Enable adaptive account/model health quarantine"
        description="Off by default. Does not change forced account pins or quota rules."
        checked={enabled}
        onChange={setEnabled}
      />
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          disabled={saving}
          onClick={() => setEnabled(value.enabled)}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          variant="primary"
          icon="save"
          disabled={saving || enabled === value.enabled}
          onClick={() => void onSave({ enabled }).catch(() => {})}
        >
          Save
        </Button>
      </div>
    </Card>
  );
}
