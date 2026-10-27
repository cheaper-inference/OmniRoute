"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { Badge, Button, Card, Input, Toggle } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { useNotificationStore } from "@/store/notificationStore";

type ModelLockoutSettings = {
  enabled: boolean;
  errorCodes: number[];
  baseCooldownMs: number;
  maxCooldownMs: number;
  maxBackoffSteps: number;
  useExponentialBackoff: boolean;
};

const DEFAULTS: ModelLockoutSettings = {
  enabled: false,
  errorCodes: [403, 404, 429, 502, 503, 504],
  baseCooldownMs: 120_000,
  maxCooldownMs: 1_800_000,
  maxBackoffSteps: 10,
  useExponentialBackoff: true,
};

type WebkitAudioWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

function scheduleNotifyChime(context: AudioContext): void {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const startsAt = context.currentTime;
  const endsAt = startsAt + 0.1;

  // A short, locally synthesized tone avoids shipping a third-party audio asset.
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(880, startsAt);
  gain.gain.setValueAtTime(0.0001, startsAt);
  gain.gain.exponentialRampToValueAtTime(0.045, startsAt + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, startsAt + 0.09);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.onended = () => {
    oscillator.disconnect();
    gain.disconnect();
  };
  oscillator.start(startsAt);
  oscillator.stop(endsAt);
}

function playNotifyChime(contextRef: { current: AudioContext | null }): void {
  try {
    if (typeof window === "undefined") return;

    const AudioContextConstructor =
      window.AudioContext ?? (window as WebkitAudioWindow).webkitAudioContext;
    if (!AudioContextConstructor) return;

    if (!contextRef.current || contextRef.current.state === "closed") {
      contextRef.current = new AudioContextConstructor();
    }

    const context = contextRef.current;
    if (context.state !== "running") {
      void context
        .resume()
        .then(() => {
          try {
            scheduleNotifyChime(context);
          } catch {
            // Sound is optional and must never block a settings change.
          }
        })
        .catch(() => undefined);
      return;
    }

    scheduleNotifyChime(context);
  } catch {
    // Sound is optional and must never block a settings change.
  }
}

function NumberField({
  label,
  value,
  suffix,
  min = 0,
  max,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  suffix?: string;
  min?: number;
  max?: number;
  hint?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-end gap-2">
      <Input
        type="number"
        label={label}
        hint={hint}
        min={min}
        max={max}
        value={value}
        onChange={(event) => {
          if (event.target.value === "") return;
          const nextValue = Number(event.target.value);
          if (Number.isFinite(nextValue)) {
            onChange(nextValue);
          }
        }}
        className="min-w-0 flex-1"
      />
      {suffix ? <span className="pb-2.5 text-xs text-text-muted">{suffix}</span> : null}
    </div>
  );
}

export default function ModelLockoutCard() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const notify = useNotificationStore();
  const notifyAudioContextRef = useRef<AudioContext | null>(null);

  const [data, setData] = useState<ModelLockoutSettings>(DEFAULTS);
  const [draft, setDraft] = useState<ModelLockoutSettings>(DEFAULTS);
  const [errorCodesInput, setErrorCodesInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(
    () => () => {
      const context = notifyAudioContextRef.current;
      notifyAudioContextRef.current = null;
      if (context && context.state !== "closed") {
        try {
          void context.close().catch(() => undefined);
        } catch {
          // Sound cleanup is optional and must never block the page from unmounting.
        }
      }
    },
    []
  );

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!mounted) return;

        const raw = (json as Record<string, unknown>).modelLockout as
          Record<string, unknown> | undefined;

        const parsed: ModelLockoutSettings = {
          enabled: typeof raw?.enabled === "boolean" ? raw.enabled : DEFAULTS.enabled,
          errorCodes: Array.isArray(raw?.errorCodes)
            ? [...(raw.errorCodes as number[])].sort((a, b) => a - b)
            : [...DEFAULTS.errorCodes].sort((a, b) => a - b),
          baseCooldownMs:
            typeof raw?.baseCooldownMs === "number" ? raw.baseCooldownMs : DEFAULTS.baseCooldownMs,
          maxCooldownMs:
            typeof raw?.maxCooldownMs === "number" ? raw.maxCooldownMs : DEFAULTS.maxCooldownMs,
          maxBackoffSteps:
            typeof raw?.maxBackoffSteps === "number"
              ? raw.maxBackoffSteps
              : DEFAULTS.maxBackoffSteps,
          useExponentialBackoff:
            typeof raw?.useExponentialBackoff === "boolean"
              ? raw.useExponentialBackoff
              : DEFAULTS.useExponentialBackoff,
        };

        setData(parsed);
        setDraft(parsed);
        setErrorCodesInput("");
      } catch (error) {
        notify.error(error instanceof Error ? error.message : t("modelLockoutLoadFailed"));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void load();
    return () => {
      mounted = false;
    };
  }, [notify, t]);

  const hasChanges =
    draft.enabled !== data.enabled ||
    JSON.stringify([...draft.errorCodes].sort((a, b) => a - b)) !==
      JSON.stringify([...data.errorCodes].sort((a, b) => a - b)) ||
    draft.baseCooldownMs !== data.baseCooldownMs ||
    draft.maxCooldownMs !== data.maxCooldownMs ||
    draft.useExponentialBackoff !== data.useExponentialBackoff ||
    draft.maxBackoffSteps !== data.maxBackoffSteps;

  function validateDraft(d: ModelLockoutSettings): string | null {
    if (d.baseCooldownMs < 5000 || d.baseCooldownMs > 600000)
      return t("modelLockoutBaseRangeError");
    if (d.maxCooldownMs < 5000 || d.maxCooldownMs > 3600000) return t("modelLockoutMaxRangeError");
    if (d.maxCooldownMs < d.baseCooldownMs) return t("modelLockoutOrderError");
    if (d.maxBackoffSteps < 0 || d.maxBackoffSteps > 20) return t("modelLockoutStepsRangeError");
    return null;
  }

  const handleSave = async () => {
    const validationError = validateDraft(draft);
    if (validationError) {
      notify.error(validationError);
      return;
    }
    setSaving(true);
    const saveDraft = { ...draft, errorCodes: draft.errorCodes };
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelLockout: saveDraft }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        const issues = err?.error?.issues ?? err?.error?.details;
        if (Array.isArray(issues) && issues.length > 0) {
          const fieldLabels: Record<string, string> = {
            "modelLockout.baseCooldownMs": t("modelLockoutBaseCooldown"),
            "modelLockout.maxCooldownMs": t("modelLockoutMaxCooldown"),
            "modelLockout.maxBackoffSteps": t("modelLockoutMaxBackoffSteps"),
            "modelLockout.errorCodes": t("modelLockoutErrorCodes"),
          };
          const msg = issues
            .map(
              (d: { path?: (string | number)[]; message?: string }) =>
                `${fieldLabels[String(d.path?.[0])] || String(d.path?.[0] || "")}: ${d.message}`
            )
            .filter(Boolean)
            .join("\n");
          if (msg) throw new Error(msg);
        }
        throw new Error(err?.error?.message || `HTTP ${res.status}`);
      }
      const json = await res.json();
      const raw = (json as Record<string, unknown>).modelLockout as
        Record<string, unknown> | undefined;
      if (raw) {
        setData({
          enabled: typeof raw.enabled === "boolean" ? raw.enabled : saveDraft.enabled,
          errorCodes: Array.isArray(raw.errorCodes)
            ? [...(raw.errorCodes as number[])].sort((a, b) => a - b)
            : [...saveDraft.errorCodes].sort((a, b) => a - b),
          baseCooldownMs:
            typeof raw.baseCooldownMs === "number" ? raw.baseCooldownMs : saveDraft.baseCooldownMs,
          maxCooldownMs:
            typeof raw.maxCooldownMs === "number" ? raw.maxCooldownMs : saveDraft.maxCooldownMs,
          maxBackoffSteps:
            typeof raw.maxBackoffSteps === "number"
              ? raw.maxBackoffSteps
              : saveDraft.maxBackoffSteps,
          useExponentialBackoff:
            typeof raw.useExponentialBackoff === "boolean"
              ? raw.useExponentialBackoff
              : saveDraft.useExponentialBackoff,
        });
      } else {
        setData(saveDraft);
      }
      setErrorCodesInput("");
      notify.success(t("savedSuccessfully"));
    } catch (error) {
      notify.error(error instanceof Error ? error.message : t("modelLockoutSaveFailed"));
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setDraft(data);
    setErrorCodesInput("");
  };

  const commitErrorCodes = (inputOverride?: string) => {
    const raw = inputOverride ?? errorCodesInput;
    const code = Number(raw);
    if (!Number.isFinite(code) || code < 100 || code > 599) return;
    if (draft.errorCodes.includes(code)) {
      setErrorCodesInput("");
      return;
    }
    setDraft((prev) => ({
      ...prev,
      errorCodes: [...prev.errorCodes, code].sort((a, b) => a - b),
    }));
    setErrorCodesInput("");
  };

  const removeErrorCode = (code: number) => {
    setDraft((prev) => ({
      ...prev,
      errorCodes: prev.errorCodes.filter((c) => c !== code),
    }));
  };

  const handleResetDefaults = () => {
    setDraft({
      ...DEFAULTS,
      errorCodes: [...DEFAULTS.errorCodes].sort((a, b) => a - b),
    });
    setErrorCodesInput("");
  };

  const fmt = (ms: number) => {
    if (ms >= 60_000) return `${ms / 1000 / 60}m`;
    if (ms >= 1_000) return `${ms / 1000}s`;
    return `${ms}ms`;
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Icon name="progress_activity" className="animate-spin" />
          {t("modelLockoutLoading")}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Icon name="gpp_maybe" size={20} className="text-primary" />
            <h2 className="text-lg font-bold">{t("modelLockout")}</h2>
          </div>
          <p className="text-sm text-text-muted">{t("modelLockoutPageDescription")}</p>
        </div>
        {hasChanges ? (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={handleReset}>
              {tc("cancel")}
            </Button>
            <Button size="sm" variant="primary" icon="save" onClick={handleSave} disabled={saving}>
              {saving ? tc("saving") : tc("save")}
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="secondary" onClick={handleResetDefaults}>
            {t("resetDefaults")}
          </Button>
        )}
      </div>

      <div className="space-y-5">
        {/* Master toggle */}
        <div className="rounded-lg border border-border bg-bg-subtle px-4 py-3">
          <Toggle
            checked={draft.enabled}
            onChange={(checked) => {
              setDraft((prev) => ({ ...prev, enabled: checked }));
              playNotifyChime(notifyAudioContextRef);
            }}
            label={t("modelLockoutEnabled")}
            description={t("modelLockoutEnabledDescription")}
          />
        </div>

        {/* Error codes — tag input */}
        <div className="rounded-lg border border-border bg-bg-subtle p-4">
          <Field
            label={t("modelLockoutErrorCodes")}
            hint={t("modelLockoutErrorCodesDescription")}
            htmlFor="model-lockout-error-code"
          >
            {/* Chips row */}
            {draft.errorCodes.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {draft.errorCodes.map((code) => (
                  <Badge key={code} variant="primary" className="gap-1 pe-0.5">
                    {code}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      icon="close"
                      onClick={() => removeErrorCode(code)}
                      className="size-5 min-h-5"
                      aria-label={t("removeErrorCode", { code })}
                    />
                  </Badge>
                ))}
              </div>
            )}

            {/* Input row */}
            <div className="flex items-center gap-2">
              <Input
                id="model-lockout-error-code"
                type="text"
                inputMode="numeric"
                value={errorCodesInput}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  if (raw.length <= 3) setErrorCodesInput(raw);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commitErrorCodes();
                  }
                }}
                placeholder={t("addErrorCode")}
                className="w-32"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => commitErrorCodes()}
                disabled={!errorCodesInput.trim()}
              >
                {tc("add")}
              </Button>
            </div>

            {/* Suggested common codes — chips as clickable suggestions */}
            {draft.errorCodes.length === 0 && errorCodesInput === "" && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-xs text-text-muted">{t("suggestions")}</span>
                {[403, 404, 429, 502, 503, 504].map((code) => (
                  <Button
                    key={code}
                    variant="outline"
                    size="sm"
                    onClick={() => commitErrorCodes(String(code))}
                    className="rounded-full"
                  >
                    +{code}
                  </Button>
                ))}
              </div>
            )}
          </Field>
        </div>

        {/* Cooldowns - grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-bg-subtle p-4">
            <NumberField
              label={t("modelLockoutBaseCooldown")}
              value={draft.baseCooldownMs}
              min={5000}
              max={600000}
              suffix="ms"
              hint="5,000ms — 600,000ms"
              onChange={(baseCooldownMs) => setDraft((prev) => ({ ...prev, baseCooldownMs }))}
            />
            <p className="mt-1.5 text-xs text-text-muted">
              {t("modelLockoutBaseCooldownDescription")}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-bg-subtle p-4">
            <NumberField
              label={t("modelLockoutMaxCooldown")}
              value={draft.maxCooldownMs}
              min={draft.baseCooldownMs}
              max={3600000}
              suffix="ms"
              hint={t("modelLockoutMaxCooldownHint")}
              onChange={(maxCooldownMs) => setDraft((prev) => ({ ...prev, maxCooldownMs }))}
            />
            <p className="mt-1.5 text-xs text-text-muted">
              {t("modelLockoutMaxCooldownDescription")}
            </p>
          </div>
        </div>

        {/* Exponential backoff */}
        <div className="rounded-lg border border-border bg-bg-subtle px-4 py-3">
          <Toggle
            checked={draft.useExponentialBackoff}
            onChange={(checked) => {
              setDraft((prev) => ({
                ...prev,
                useExponentialBackoff: checked,
              }));
              playNotifyChime(notifyAudioContextRef);
            }}
            label={t("modelLockoutExponentialBackoff")}
            description={t("modelLockoutExponentialBackoffDescription")}
          />
        </div>

        {/* Max backoff steps */}
        <div className="rounded-lg border border-border bg-bg-subtle p-4">
          <NumberField
            label={t("modelLockoutMaxBackoffSteps")}
            value={draft.maxBackoffSteps}
            min={0}
            onChange={(maxBackoffSteps) => setDraft((prev) => ({ ...prev, maxBackoffSteps }))}
          />
          <p className="mt-1.5 text-xs text-text-muted">
            {t("modelLockoutMaxBackoffStepsDescription")}
          </p>
        </div>
      </div>
    </Card>
  );
}
