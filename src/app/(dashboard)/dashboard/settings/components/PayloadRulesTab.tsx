"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { Field } from "@omniroute/ui-kit/field";
import { Badge, Card, Button, Textarea } from "@/shared/components";
import Icon from "@/shared/components/Icon";

const EMPTY_PAYLOAD_RULES_TEMPLATE = {
  default: [],
  override: [],
  filter: [],
  defaultRaw: [],
};

const EMPTY_PAYLOAD_RULES_TEXT = JSON.stringify(EMPTY_PAYLOAD_RULES_TEMPLATE, null, 2);

type StatusMessage = {
  type: "success" | "error" | "info";
  text: string;
};

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function getRuleSectionCount(value: unknown, keys: string[]): number {
  for (const key of keys) {
    if (isObjectRecord(value) && Array.isArray(value[key])) {
      return value[key].length;
    }
  }
  return 0;
}

function getErrorMessage(payload: unknown, fallback: string): string {
  if (!isObjectRecord(payload)) return fallback;

  const nestedError = payload.error;
  if (typeof nestedError === "string" && nestedError.trim()) {
    return nestedError;
  }

  if (isObjectRecord(nestedError)) {
    if (typeof nestedError.message === "string" && nestedError.message.trim()) {
      return nestedError.message;
    }

    if (Array.isArray(nestedError.details) && nestedError.details.length > 0) {
      const detail = nestedError.details[0];
      if (isObjectRecord(detail) && typeof detail.message === "string" && detail.message.trim()) {
        return detail.message;
      }
    }
  }

  return fallback;
}

async function fetchPayloadRulesResult(
  fallbackMessage: string
): Promise<{ text?: string; error?: string }> {
  try {
    const response = await fetch("/api/settings/payload-rules");
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(getErrorMessage(payload, fallbackMessage));
    }
    return { text: JSON.stringify(payload, null, 2) };
  } catch (error) {
    return { error: error instanceof Error ? error.message : fallbackMessage };
  }
}

export default function PayloadRulesTab() {
  const t = useTranslations("settings");
  const tCommon = useTranslations("common");
  const [editorValue, setEditorValue] = useState(EMPTY_PAYLOAD_RULES_TEXT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<StatusMessage | null>(null);
  const editorId = useId();
  const editorHintId = `${editorId}-hint`;
  const editorErrorId = `${editorId}-error`;

  const parsedEditor = useMemo(() => {
    try {
      const parsed = JSON.parse(editorValue);
      if (!isObjectRecord(parsed)) {
        return { value: null, error: t("payloadMustBeObject") };
      }
      return { value: parsed, error: null };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : t("payloadInvalidJson"),
      };
    }
  }, [editorValue, t]);

  const summary = useMemo(() => {
    const source = parsedEditor.value;
    return {
      default: getRuleSectionCount(source, ["default"]),
      override: getRuleSectionCount(source, ["override"]),
      filter: getRuleSectionCount(source, ["filter"]),
      defaultRaw: getRuleSectionCount(source, ["defaultRaw", "default-raw"]),
    };
  }, [parsedEditor.value]);

  const applyConfigResult = useCallback((result: { text?: string; error?: string }) => {
    if (result.text !== undefined) setEditorValue(result.text);
    if (result.error !== undefined) setMessage({ type: "error", text: result.error });
    setLoading(false);
  }, []);

  const loadConfig = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    applyConfigResult(await fetchPayloadRulesResult(tCommon("failedToLoad")));
  }, [applyConfigResult, tCommon]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await fetchPayloadRulesResult(tCommon("failedToLoad"));
      if (!cancelled) applyConfigResult(result);
    })();
    return () => {
      cancelled = true;
    };
  }, [applyConfigResult, tCommon]);

  const handleReset = () => {
    setEditorValue(EMPTY_PAYLOAD_RULES_TEXT);
    setMessage({
      type: "info",
      text: t("payloadResetInfo"),
    });
  };

  const handleSave = async () => {
    if (parsedEditor.error || !parsedEditor.value) {
      setMessage({
        type: "error",
        text: parsedEditor.error || t("payloadValidJsonRequired"),
      });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/settings/payload-rules", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedEditor.value),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(getErrorMessage(payload, tCommon("error")));
      }

      setEditorValue(JSON.stringify(payload, null, 2));
      setMessage({ type: "success", text: t("payloadSaveSuccess") });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : tCommon("error"),
      });
    } finally {
      setSaving(false);
    }
  };

  const ruleCards = [
    ["payloadRuleDefaultTitle", "payloadRuleDefaultDesc"],
    ["payloadRuleOverrideTitle", "payloadRuleOverrideDesc"],
    ["payloadRuleFilterTitle", "payloadRuleFilterDesc"],
    ["payloadRuleDefaultRawTitle", "payloadRuleDefaultRawDesc"],
  ] as const;

  return (
    <Card title={t("payloadRulesTitle")} subtitle={t("payloadRulesDesc")} icon="data_object">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {ruleCards.map(([titleKey, descKey]) => (
            <div key={titleKey} className="rounded-lg border border-border bg-bg-subtle p-3">
              <p className="text-sm font-medium">{t(titleKey)}</p>
              <p className="text-xs text-text-muted mt-1">{t(descKey)}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge>
            {t("payloadRuleDefaultTitle")}: {summary.default}
          </Badge>
          <Badge>
            {t("payloadRuleOverrideTitle")}: {summary.override}
          </Badge>
          <Badge>
            {t("payloadRuleFilterTitle")}: {summary.filter}
          </Badge>
          <Badge>
            {t("payloadRuleDefaultRawTitle")}: {summary.defaultRaw}
          </Badge>
        </div>

        {message && (
          <Alert
            variant={
              message.type === "success" ? "success" : message.type === "info" ? "info" : "critical"
            }
            icon={
              <Icon
                name={
                  message.type === "success"
                    ? "check_circle"
                    : message.type === "info"
                      ? "info"
                      : "error"
                }
                size={16}
              />
            }
            description={message.text}
            dismissLabel={tCommon("close")}
            onDismiss={() => setMessage(null)}
          />
        )}

        <Field
          htmlFor={editorId}
          label={t("payloadEditorTitle")}
          hint={<span id={editorHintId}>{t("payloadEditorDesc")}</span>}
          error={
            parsedEditor.error ? (
              <span id={editorErrorId} role="alert">
                {t("payloadJsonParseError", { error: parsedEditor.error })}
              </span>
            ) : undefined
          }
        >
          <div className="rounded-xl border border-border overflow-hidden">
            <div
              className="flex justify-end px-4 py-2 border-b border-border bg-bg-subtle text-xs text-text-muted"
              role="status"
            >
              {loading ? tCommon("loading") : t("payloadEditorReady")}
            </div>
            <Textarea
              id={editorId}
              aria-describedby={parsedEditor.error ? editorErrorId : editorHintId}
              value={editorValue}
              onChange={(event) => {
                setEditorValue(event.target.value);
                if (message?.type === "error") setMessage(null);
              }}
              error={Boolean(parsedEditor.error)}
              spellCheck={false}
              rows={22}
              className="w-full rounded-none border-0 px-4 py-4 text-sm font-mono leading-6 resize-y min-h-[420px]"
              disabled={loading || saving}
            />
          </div>
        </Field>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={loadConfig} disabled={loading || saving}>
            {tCommon("refresh")}
          </Button>
          <Button variant="secondary" onClick={handleReset} disabled={loading || saving}>
            {tCommon("reset")}
          </Button>
          <Button onClick={handleSave} disabled={loading || saving || !!parsedEditor.error}>
            {saving ? t("saving") : t("savePayloadRules")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
