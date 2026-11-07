"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Input } from "@/shared/components";
import type { PreferredAccountFailoverSettings } from "@/lib/resilience/settings/types";
import { BooleanField, NumberField } from "./ResilienceFields";

type OverrideKind = "provider" | "model";

function OverrideEditor({
  kind,
  value,
  onChange,
  disabled,
}: {
  kind: OverrideKind;
  value: Record<string, number>;
  onChange: (next: Record<string, number>) => void;
  disabled: boolean;
}) {
  const [key, setKey] = useState("");
  const [timeoutMs, setTimeoutMs] = useState(20_000);
  const [error, setError] = useState("");
  const name = kind === "provider" ? "Provider" : "Model (provider/model or provider/model*)";

  const add = () => {
    const raw = key.trim().toLowerCase();
    const canonical = raw === "agy" && kind === "provider"
      ? "antigravity" : raw.startsWith("agy/") && kind === "model"
        ? "antigravity/" + raw.slice(4) : raw;
    if (!/^[a-z0-9][a-z0-9._/@:+-]*\*?$/i.test(canonical) ||
        canonical.length > 180 ||
        (kind === "provider" && /[/*]/.test(canonical)) ||
        (kind === "model" && !canonical.includes("/"))) {
      setError("Enter a valid " + name.toLowerCase() + " ID.");
      return;
    }
    if (!(timeoutMs === 0 || (timeoutMs >= 500 && timeoutMs <= 120_000))) {
      setError("Timeout must be 0 (disable) or between 500 and 120000 ms.");
      return;
    }
    if (Object.keys(value).length >= 64 && !(canonical in value)) {
      setError("Maximum 64 overrides per section.");
      return;
    }
    onChange({ ...value, [canonical]: timeoutMs });
    setKey("");
    setError("");
  };

  return (
    <div className="space-y-3 rounded-xl border border-border p-3">
      <h3 className="text-sm font-semibold">{kind === "provider" ? "Provider overrides" : "Model overrides"}</h3>
      <p className="text-xs text-text-muted">
        {kind === "provider"
          ? "Example: codex or antigravity. Overrides the provider default."
          : "Example: anthropic/claude-opus-* or codex/gpt-6. Exact keys beat wildcard families."}
        {" "}Set 0 to disable fast failover for this entry.
      </p>
      {Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([id, ms]) => (
        <div className="flex flex-wrap items-end gap-2" key={id}>
          <span className="min-w-0 flex-1 break-all text-sm">{id}</span>
          <div className="w-40">
            <NumberField
              label="Timeout"
              value={ms}
              min={0}
              max={120000}
              suffix="ms"
              onChange={(next) => onChange({ ...value, [id]: next > 0 && next < 500 ? 500 : next })}
            />
          </div>
          <Button size="sm" variant="secondary" disabled={disabled} onClick={() => {
            const next = { ...value };
            delete next[id];
            onChange(next);
          }}>
            Remove
          </Button>
        </div>
      ))}
      <div className="flex flex-wrap items-end gap-2">
        <div className="min-w-44 flex-1">
          <Input
            label={name}
            value={key}
            onChange={(event) => setKey(event.target.value)}
            placeholder={kind === "provider" ? "codex" : "anthropic/claude-opus-*"}
          />
        </div>
        <div className="w-40">
          <NumberField label="Timeout" value={timeoutMs} min={0} max={120000} suffix="ms"
            onChange={(next) => setTimeoutMs(next > 0 && next < 500 ? 500 : next)} />
        </div>
        <Button size="sm" variant="secondary" disabled={disabled} onClick={add}>Add</Button>
      </div>
      {error && <p role="alert" className="text-sm text-danger">{error}</p>}
    </div>
  );
}

export default function PreferredAccountFailoverCard({
  value,
  saving,
  onSave,
}: {
  value: PreferredAccountFailoverSettings;
  saving: boolean;
  onSave: (next: PreferredAccountFailoverSettings) => Promise<void>;
}) {
  const t = useTranslations("settings");
  const common = useTranslations("common");
  const [draft, setDraft] = useState(value);
  const [previous, setPrevious] = useState(value);
  if (previous !== value) { setPrevious(value); setDraft(value); }

  const label = (key: string, fallback: string) =>
    typeof t.has === "function" && t.has(key as never) ? t(key as never) : fallback;

  return (
    <Card className="space-y-4 p-6">
      <h2 className="text-lg font-bold">
        {label("preferredAccountFailoverTitle", "Preferred account failover")}
      </h2>
      <p className="text-sm text-text-muted">
        Applies to API-key preferred chat connections across providers only when another eligible
        account is available. One response-start timeout hop; no shared-account cooldown.
        The 20s global default is conservative; Antigravity uses 5s, Gemini 3.8 Flash 12s
        unless overridden. This measures upstream response start, not first generated token.
      </p>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <BooleanField
          label={label("preferredAccountFailoverEnabled", "Enable preferred account failover")}
          description="Off by default. Explicit pins, managed leases, Muse, and combo targets are unaffected."
          checked={draft.enabled}
          onChange={(enabled) => setDraft({ ...draft, enabled })}
        />
        <NumberField
          label={label("preferredAccountDefaultTimeout", "Other providers: default timeout")}
          value={draft.defaultTimeoutMs}
          min={500} max={120000} suffix="ms"
          onChange={(defaultTimeoutMs) => setDraft({ ...draft, defaultTimeoutMs })}
        />
      </div>
      <OverrideEditor
        kind="provider"
        value={draft.providerTimeoutsMs}
        onChange={(providerTimeoutsMs) => setDraft({ ...draft, providerTimeoutsMs })}
        disabled={saving}
      />
      <OverrideEditor
        kind="model"
        value={draft.modelTimeoutsMs}
        onChange={(modelTimeoutsMs) => setDraft({ ...draft, modelTimeoutsMs })}
        disabled={saving}
      />
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => setDraft(value)} disabled={saving}>
          {common("cancel")}
        </Button>
        <Button size="sm" variant="primary" icon="save"
          onClick={() => void onSave(draft).catch(() => {})} disabled={saving}>
          {common("save")}
        </Button>
      </div>
    </Card>
  );
}
