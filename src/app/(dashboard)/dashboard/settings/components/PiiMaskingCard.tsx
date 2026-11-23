"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, Button, Input, Select, Toggle } from "@/shared/components";
import {
  PII_BUILTIN_TYPES,
  PII_CUSTOM_PATTERN_LIMITS,
  PII_REQUEST_TYPE_ALIASES,
  PII_TEMPLATES,
} from "@/shared/constants/piiTypes";

type PatternType = "regex" | "wildcard";

interface CustomPattern {
  id: string;
  name: string;
  type: PatternType;
  pattern: string;
  flags?: string;
  enabled: boolean;
}

interface PiiSettingsPayload {
  requestMaskingEnabled: boolean;
  responseSanitizationEnabled: boolean;
  enabledTypes: string[] | null;
  customPatterns: CustomPattern[];
  stats: {
    since: string;
    total: number;
    request: Record<string, number>;
    response: Record<string, number>;
  };
}

const EMPTY_DRAFT = { name: "", type: "regex" as PatternType, pattern: "", flags: "" };

function errorMessageOf(body: unknown): string {
  const error = (body as { error?: { message?: string; details?: Array<{ message?: string }> } })
    ?.error;
  return error?.details?.[0]?.message || error?.message || "";
}

export default function PiiMaskingCard() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const [data, setData] = useState<PiiSettingsPayload | null>(null);
  const [selected, setSelected] = useState<string[]>([...PII_BUILTIN_TYPES]);
  const [patterns, setPatterns] = useState<CustomPattern[]>([]);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [sample, setSample] = useState("");
  const [testResult, setTestResult] = useState<{ count: number; preview: string } | null>(null);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const apply = (payload: PiiSettingsPayload) => {
    setData(payload);
    setSelected(payload.enabledTypes ?? [...PII_BUILTIN_TYPES]);
    setPatterns(payload.customPatterns ?? []);
  };

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/settings/pii", { cache: "no-store" });
        if (res.ok && !cancelled) apply(await res.json());
      } catch {
        // Leave the panel in its loading state if the settings cannot be read.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleType = (type: string) =>
    setSelected((prev) => (prev.includes(type) ? prev.filter((x) => x !== type) : [...prev, type]));

  const save = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const allSelected = PII_BUILTIN_TYPES.every((type) => selected.includes(type));
      const res = await fetch("/api/settings/pii", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enabledTypes: allSelected ? null : selected,
          customPatterns: patterns,
        }),
      });
      const body = await res.json();
      if (res.ok) {
        apply(body);
        setStatus({ ok: true, message: t("piiMasking.saved") });
      } else {
        setStatus({
          ok: false,
          message: t("piiMasking.saveFailed", { message: errorMessageOf(body) }),
        });
      }
    } catch {
      setStatus({ ok: false, message: t("piiMasking.saveFailed", { message: "" }) });
    } finally {
      setSaving(false);
    }
  };

  const testDraft = async () => {
    setTestResult(null);
    setStatus(null);
    const res = await fetch("/api/settings/pii/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...draft, sampleText: sample }),
    });
    const body = await res.json();
    if (res.ok) setTestResult({ count: body.count, preview: body.preview });
    else
      setStatus({
        ok: false,
        message: t("piiMasking.testFailed", { message: errorMessageOf(body) }),
      });
  };

  const addDraft = () => {
    if (!draft.name.trim() || !draft.pattern) return;
    const id = `p${Date.now().toString(36)}`;
    setPatterns((prev) => [...prev, { id, ...draft, name: draft.name.trim(), enabled: true }]);
    setDraft(EMPTY_DRAFT);
    setTestResult(null);
  };

  const typeLabel = (type: string) => {
    const id = PII_REQUEST_TYPE_ALIASES[type] ?? type;
    if ((PII_BUILTIN_TYPES as readonly string[]).includes(id)) return t(`piiMasking.types.${id}`);
    return id.startsWith("custom:") ? id.slice("custom:".length) : id;
  };

  const statsRows = data
    ? [
        ...Object.entries(data.stats.request).map(([type, n]) => ["request", type, n] as const),
        ...Object.entries(data.stats.response).map(([type, n]) => ["response", type, n] as const),
      ]
    : [];

  return (
    <Card>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            visibility_off
          </span>
        </div>
        <h3 className="text-lg font-semibold">{t("piiMasking.title")}</h3>
      </div>
      <p className="text-sm text-text-muted mb-3">{t("piiMasking.description")}</p>

      <div className="flex flex-wrap gap-3 text-xs mb-4">
        {[
          ["piiMasking.requestFlag", "PII_REDACTION_ENABLED", data?.requestMaskingEnabled],
          [
            "piiMasking.responseFlag",
            "PII_RESPONSE_SANITIZATION",
            data?.responseSanitizationEnabled,
          ],
        ].map(([labelKey, flag, on]) => (
          <span key={String(flag)} className="rounded border border-border/50 px-2 py-1">
            {t(String(labelKey))}: <code>{String(flag)}</code>{" "}
            <strong>{on ? tc("enabled") : tc("disabled")}</strong>
          </span>
        ))}
      </div>

      <p className="font-medium mb-2">{t("piiMasking.templates")}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {PII_TEMPLATES.map((tpl) => (
          <Button
            key={tpl.id}
            size="sm"
            variant="secondary"
            onClick={() => setSelected([...tpl.types])}
          >
            {t(`piiMasking.template.${tpl.id}`)}
          </Button>
        ))}
      </div>

      <p className="font-medium mb-2">{t("piiMasking.builtinTypes")}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {PII_BUILTIN_TYPES.map((type) => (
          <label key={type} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(type)}
              onChange={() => toggleType(type)}
            />
            {t(`piiMasking.types.${type}`)}
          </label>
        ))}
      </div>

      <p className="font-medium">{t("piiMasking.customPatterns")}</p>
      <p className="text-sm text-text-muted mb-2">
        {t("piiMasking.customPatternsDesc", { max: PII_CUSTOM_PATTERN_LIMITS.maxPatterns })}
      </p>
      <div className="flex flex-col gap-2 mb-3">
        {patterns.map((p) => (
          <div key={p.id} className="flex items-center gap-2 text-sm">
            <Toggle
              size="sm"
              checked={p.enabled}
              onChange={() =>
                setPatterns((prev) =>
                  prev.map((x) => (x.id === p.id ? { ...x, enabled: !x.enabled } : x))
                )
              }
            />
            <span className="font-medium">{p.name}</span>
            <code className="truncate text-text-muted">{p.pattern}</code>
            <Button
              size="sm"
              variant="ghost"
              icon="delete"
              aria-label={tc("delete")}
              onClick={() => setPatterns((prev) => prev.filter((x) => x.id !== p.id))}
            />
          </div>
        ))}
      </div>

      {patterns.length < PII_CUSTOM_PATTERN_LIMITS.maxPatterns && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2">
          <Input
            placeholder={tc("name")}
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          />
          <Select
            value={draft.type}
            onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value as PatternType }))}
            options={[
              { value: "regex", label: t("piiMasking.typeRegex") },
              { value: "wildcard", label: t("piiMasking.typeWildcard") },
            ]}
          />
          <Input
            placeholder={t("piiMasking.pattern")}
            value={draft.pattern}
            maxLength={PII_CUSTOM_PATTERN_LIMITS.maxPatternLength}
            onChange={(e) => setDraft((d) => ({ ...d, pattern: e.target.value }))}
          />
          <Input
            placeholder={t("piiMasking.flags")}
            value={draft.flags}
            disabled={draft.type === "wildcard"}
            onChange={(e) => setDraft((d) => ({ ...d, flags: e.target.value }))}
          />
        </div>
      )}
      <textarea
        className="w-full rounded-control border border-border/50 bg-transparent p-2 text-sm mb-2"
        rows={2}
        placeholder={t("piiMasking.sampleText")}
        value={sample}
        maxLength={PII_CUSTOM_PATTERN_LIMITS.maxSampleBytes}
        onChange={(e) => setSample(e.target.value)}
      />
      <div className="flex flex-wrap gap-2 mb-2">
        <Button size="sm" variant="secondary" onClick={testDraft} disabled={!draft.pattern}>
          {t("piiMasking.test")}
        </Button>
        <Button size="sm" variant="secondary" onClick={addDraft} disabled={!draft.pattern}>
          {t("piiMasking.add")}
        </Button>
      </div>
      {testResult && (
        <div className="text-sm mb-3">
          <p>{t("piiMasking.testMatches", { count: testResult.count })}</p>
          <pre className="whitespace-pre-wrap break-all text-text-muted">{testResult.preview}</pre>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <Button onClick={save} loading={saving}>
          {tc("save")}
        </Button>
        {status && (
          <span className={status.ok ? "text-sm text-green-600" : "text-sm text-red-500"}>
            {status.message}
          </span>
        )}
      </div>

      <p className="font-medium">{t("piiMasking.statsTitle")}</p>
      {statsRows.length === 0 ? (
        <p className="text-sm text-text-muted">{t("piiMasking.statsEmpty")}</p>
      ) : (
        <ul className="text-sm mt-1 space-y-1">
          {statsRows.map(([side, type, count]) => (
            <li key={`${side}:${type}`}>
              {side === "request" ? t("piiMasking.statsRequest") : tc("responses")} ·{" "}
              {typeLabel(type)}: {count}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
