"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Input } from "@/shared/components";
import type { PreferredAccountFailoverSettings } from "@/lib/resilience/settings/types";
import { BooleanField, NumberField } from "./ResilienceFields";

type OverrideKind = "provider" | "model";

function canonicalOverrideKey(kind: OverrideKind, key: string): string {
  const raw = key.trim().toLowerCase();
  if (kind === "provider" && raw === "agy") return "antigravity";
  if (kind === "model" && raw.startsWith("agy/")) return "antigravity/" + raw.slice(4);
  return raw;
}

function validOverrideKey(kind: OverrideKind, key: string): boolean {
  if (!/^[a-z0-9][a-z0-9._/@:+-]*\*?$/i.test(key) || key.length > 180) return false;
  return kind === "provider" ? !/[/*]/.test(key) : key.includes("/");
}

function validateOverride(
  kind: OverrideKind,
  key: string,
  ms: number,
  current: Record<string, number>
): string | null {
  if (!validOverrideKey(kind, key))
    return (
      "Enter a valid " +
      (kind === "provider" ? "provider" : "model (provider/model or provider/model*)") +
      " ID."
    );
  if (!(ms === 0 || (ms >= 500 && ms <= 120_000)))
    return "Timeout must be 0 (disable) or between 500 and 120000 ms.";
  if (Object.keys(current).length >= 64 && !Object.prototype.hasOwnProperty.call(current, key))
    return "Maximum 64 overrides per section.";
  return null;
}

function OverrideRow({
  id,
  ms,
  value,
  onChange,
  disabled,
}: {
  id: string;
  ms: number;
  value: Record<string, number>;
  onChange: (next: Record<string, number>) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-wrap items-end gap-2">
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
      <Button
        size="sm"
        variant="secondary"
        disabled={disabled}
        onClick={() => {
          const next = { ...value };
          delete next[id];
          onChange(next);
        }}
      >
        Remove
      </Button>
    </div>
  );
}

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
    const canonical = canonicalOverrideKey(kind, key);
    const issue = validateOverride(kind, canonical, timeoutMs, value);
    if (issue) {
      setError(issue);
      return;
    }
    onChange({ ...value, [canonical]: timeoutMs });
    setKey("");
    setError("");
  };

  return (
    <div className="space-y-3 rounded-xl border border-border p-3">
      <h3 className="text-sm font-semibold">
        {kind === "provider" ? "Provider overrides" : "Model overrides"}
      </h3>
      <p className="text-xs text-text-muted">
        {kind === "provider"
          ? "Example: codex or antigravity. Overrides the provider default."
          : "Example: anthropic/claude-opus-* or codex/gpt-6. Exact keys beat wildcard families."}{" "}
        Set 0 to disable fast failover for this entry.
      </p>
      {Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([id, ms]) => (
          <OverrideRow
            key={id}
            id={id}
            ms={ms}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
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
          <NumberField
            label="Timeout"
            value={timeoutMs}
            min={0}
            max={120000}
            suffix="ms"
            onChange={(next) => setTimeoutMs(next > 0 && next < 500 ? 500 : next)}
          />
        </div>
        <Button size="sm" variant="secondary" disabled={disabled} onClick={add}>
          Add
        </Button>
      </div>
      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
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
  if (previous !== value) {
    setPrevious(value);
    setDraft(value);
  }

  const label = (key: string, fallback: string) =>
    typeof t.has === "function" && t.has(key as never) ? t(key as never) : fallback;

  return (
    <Card className="space-y-4 p-6">
      <h2 className="text-lg font-bold">
        {label("preferredAccountFailoverTitle", "Preferred account failover")}
      </h2>
      <p className="text-sm text-text-muted">
        Applies to API-key preferred chat connections across providers only when another eligible
        account is available. One response-start timeout hop; no shared-account cooldown. The 20s
        global default is conservative; Antigravity uses 5s, Gemini 3.8 Flash 12s unless overridden.
        This measures upstream response start, not first generated token.
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
          min={500}
          max={120000}
          suffix="ms"
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
        <Button
          size="sm"
          variant="primary"
          icon="save"
          onClick={() => void onSave(draft).catch(() => {})}
          disabled={saving}
        >
          {common("save")}
        </Button>
      </div>
    </Card>
  );
}
