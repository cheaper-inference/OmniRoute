/**
 * G-08 — CLIProxyAPI Model Mapping editor.
 * Renders inside CliproxyServiceTab, between FallbackRoutingCard and ServiceLogsPanel.
 * Persists to upstream_proxy_config via PATCH /api/settings { cliproxyapi_model_mapping }.
 */
"use client";

import Icon from "@/shared/components/Icon";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Textarea } from "@/shared/components";

// ── Pure validator (exported for unit tests) ──────────────────────────────────

/** Result of parsing the textarea value. */
export type MappingParseResult =
  | { ok: true; value: Record<string, string> }
  | {
      ok: false;
      error: string;
      messageKey: "mappingInvalidJson" | "mappingMustBeObject" | "mappingValueMustBeString";
      messageValues?: { key: string };
    };

/**
 * Parse and validate the raw textarea string.
 * Valid: JSON object whose every key and value is a string.
 */
export function parseMappingJson(raw: string): MappingParseResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    const msg = e instanceof SyntaxError ? e.message : "Invalid JSON";
    return { ok: false, error: msg, messageKey: "mappingInvalidJson" };
  }

  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {
      ok: false,
      error: "Must be a JSON object (not an array or primitive)",
      messageKey: "mappingMustBeObject",
    };
  }

  const obj = parsed as Record<string, unknown>;
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val !== "string") {
      return {
        ok: false,
        error: `Value for key "${key}" must be a string, got ${Array.isArray(val) ? "array" : typeof val}`,
        messageKey: "mappingValueMustBeString",
        messageValues: { key },
      };
    }
  }

  return { ok: true, value: obj as Record<string, string> };
}

// ── Component ─────────────────────────────────────────────────────────────────

const EMPTY_MAPPING = "{}";

function formatMapping(value: Record<string, string> | null): string {
  if (!value || Object.keys(value).length === 0) return EMPTY_MAPPING;
  return JSON.stringify(value, null, 2);
}

function getMappingValidationMessage(
  result: MappingParseResult,
  t: ReturnType<typeof useTranslations>
): string | null {
  if ("messageKey" in result) return t(result.messageKey, result.messageValues);
  return null;
}

export function CliproxyModelMappingEditor() {
  const t = useTranslations("embeddedServices");
  const [rawText, setRawText] = useState<string>(EMPTY_MAPPING);
  const [savedText, setSavedText] = useState<string>(EMPTY_MAPPING);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const msgTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load current mapping from /api/settings on mount
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: Record<string, unknown>) => {
        const mapping =
          data.cliproxyapi_model_mapping &&
          typeof data.cliproxyapi_model_mapping === "object" &&
          !Array.isArray(data.cliproxyapi_model_mapping)
            ? (data.cliproxyapi_model_mapping as Record<string, string>)
            : null;
        const formatted = formatMapping(mapping);
        setRawText(formatted);
        setSavedText(formatted);
      })
      .catch(() => {
        // leave defaults if fetch fails
      })
      .finally(() => setLoaded(true));
  }, []);

  function showMsg(ok: boolean, text: string) {
    if (msgTimerRef.current) clearTimeout(msgTimerRef.current);
    setMsg({ ok, text });
    if (ok) {
      msgTimerRef.current = setTimeout(() => setMsg(null), 3000);
    }
  }

  const parseResult = parseMappingJson(rawText);
  const isValid = parseResult.ok;
  const validationMessage = getMappingValidationMessage(parseResult, t);
  const isDirty = rawText !== savedText;
  const canSave = isValid && isDirty && !saving;

  async function handleSave() {
    if (!parseResult.ok) return;
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliproxyapi_model_mapping: parseResult.value }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Re-format to canonical form after save
      const formatted = formatMapping(parseResult.value);
      setSavedText(formatted);
      setRawText(formatted);
      showMsg(true, t("mappingSaved"));
    } catch {
      showMsg(false, t("mappingSaveFailed"));
    } finally {
      setSaving(false);
    }
  }

  if (!loaded) return null;

  return (
    <Card padding="md">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-8 rounded-lg flex items-center justify-center border border-border bg-bg-subtle text-text-main">
          <Icon name="account_tree" size={20} />
        </div>
        <div>
          <h3 className="font-medium text-sm">{t("modelMapping")}</h3>
          <p className="text-xs text-text-muted">
            {t.rich("modelMappingDescription", {
              example: () => (
                <code className="font-mono bg-bg-subtle px-1 rounded">
                  {'"gpt-4o": "openai-gpt-4o"'}
                </code>
              ),
            })}
          </p>
        </div>
      </div>

      {msg && (
        <div
          className={`flex items-center gap-1.5 mb-3 px-2 py-1.5 rounded text-xs ${
            msg.ok ? "bg-success/10 text-success" : "bg-error/10 text-error"
          }`}
        >
          <Icon name={msg.ok ? "check_circle" : "error"} size={12} />
          {msg.text}
        </div>
      )}

      <Textarea
        className="min-h-[120px] resize-y font-mono text-xs"
        error={!isValid && rawText !== EMPTY_MAPPING}
        value={rawText}
        onChange={(e) => {
          setRawText(e.target.value);
          setMsg(null);
        }}
        spellCheck={false}
        aria-label={t("modelMappingEditor")}
      />

      {validationMessage && rawText !== EMPTY_MAPPING && (
        <p className="mt-1.5 text-xs text-error flex items-start gap-1">
          <Icon name="error" size={12} className="mt-0.5" />
          {validationMessage}
        </p>
      )}

      <div className="mt-3 flex justify-end">
        <Button size="sm" onClick={handleSave} disabled={!canSave} loading={saving}>
          {t("save")}
        </Button>
      </div>
    </Card>
  );
}
