"use client";

import { Button, Card, Checkbox, Input } from "@/shared/components";

/**
 * ProviderParamFilterSection — Denylist/allowlist config for provider-level
 * request parameter filtering (#6625).
 *
 * Renders a card on the provider detail page where operators can configure
 * which request params to strip (block) or selectively re-add (allow) before
 * sending to the upstream provider.
 */

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";

interface ProviderParamFilterSectionProps {
  providerId: string;
}

interface ParamFilterConfig {
  block: string[];
  allow: string[];
  models?: Record<string, { block?: string[]; allow?: string[] }>;
  autoLearn: boolean;
}

function parseCommaList(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function formatCommaList(arr: string[]): string {
  return arr.join(", ");
}

// ---------------------------------------------------------------------------
// Fetch helpers — isolate the HTTP + response-shape concerns so the
// component's handlers stay focused on state transitions + user feedback.
// ---------------------------------------------------------------------------

async function fetchParamFilterConfig(providerId: string): Promise<ParamFilterConfig> {
  const res = await fetch(`/api/providers/${providerId}/param-filters`);
  const data = await res.json();
  return {
    block: Array.isArray(data.block) ? data.block : [],
    allow: Array.isArray(data.allow) ? data.allow : [],
    autoLearn: typeof data.autoLearn === "boolean" ? data.autoLearn : false,
  };
}

async function throwOnErrorResponse(res: Response): Promise<void> {
  if (res.ok) return;
  const errData = await res.json().catch(() => ({}));
  throw new Error(errData.error || `HTTP ${res.status}`);
}

async function putParamFilterConfig(providerId: string, body: ParamFilterConfig): Promise<void> {
  const res = await fetch(`/api/providers/${providerId}/param-filters`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  await throwOnErrorResponse(res);
}

async function deleteParamFilterConfig(providerId: string): Promise<void> {
  const res = await fetch(`/api/providers/${providerId}/param-filters`, { method: "DELETE" });
  await throwOnErrorResponse(res);
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

// Wraps the GET so a failure comes back as a value: the load callback then only
// sets state after the await (no synchronous setState reachable from the effect).
async function fetchParamFilterConfigSafe(
  providerId: string
): Promise<{ ok: boolean; config?: ParamFilterConfig; error?: string }> {
  try {
    return { ok: true, config: await fetchParamFilterConfig(providerId) };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

// ---------------------------------------------------------------------------
// State hook — owns config load/save/reset so the component body stays JSX-only.
// ---------------------------------------------------------------------------

type Translate = (key: string, values?: Record<string, string>) => string;

// Wraps a raw state setter so updating the draft value also marks the form
// dirty — used for the three form-local draft fields below.
function useDirtySetter<T>(setValue: (value: T) => void, setDirty: (value: boolean) => void) {
  return useCallback(
    (value: T) => {
      setValue(value);
      setDirty(true);
    },
    [setValue, setDirty]
  );
}

function useProviderParamFilterConfig(providerId: string, t: Translate) {
  const notify = useNotificationStore();
  const [, setConfig] = useState<ParamFilterConfig>({ block: [], allow: [], autoLearn: false });
  // Loading is derived: true until a load attempt for the CURRENT provider
  // settles — this also re-shows the skeleton when providerId changes.
  const [loadedProviderId, setLoadedProviderId] = useState<string | null>(null);
  const loading = loadedProviderId !== providerId;
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [blockText, setBlockTextState] = useState("");
  const [allowText, setAllowTextState] = useState("");
  const [autoLearn, setAutoLearnState] = useState(false);

  const setBlockText = useDirtySetter(setBlockTextState, setDirty);
  const setAllowText = useDirtySetter(setAllowTextState, setDirty);
  const setAutoLearn = useDirtySetter(setAutoLearnState, setDirty);

  // The async work is defined INSIDE the effect (a component-scope loader
  // called synchronously from an effect is rejected by the compiler rules);
  // every setState here runs after the await.
  useEffect(() => {
    const run = async () => {
      const outcome = await fetchParamFilterConfigSafe(providerId);
      if (outcome.ok) {
        setConfig(outcome.config);
        setBlockTextState(formatCommaList(outcome.config.block));
        setAllowTextState(formatCommaList(outcome.config.allow));
        setAutoLearnState(outcome.config.autoLearn);
      } else {
        notify.notify(t("paramFiltersLoadError", { error: outcome.error }), "error");
      }
      setLoadedProviderId(providerId);
    };
    void run();
  }, [providerId, notify, t]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const body: ParamFilterConfig = {
        block: parseCommaList(blockText),
        allow: parseCommaList(allowText),
        autoLearn,
      };
      await putParamFilterConfig(providerId, body);
      setConfig(body);
      setDirty(false);
      notify.notify(t("paramFiltersSaveSuccess"), "success");
    } catch (err) {
      notify.notify(t("paramFiltersSaveError", { error: errorMessage(err) }), "error");
    } finally {
      setSaving(false);
    }
  }, [providerId, blockText, allowText, autoLearn, notify, t]);

  const handleReset = useCallback(async () => {
    setSaving(true);
    try {
      await deleteParamFilterConfig(providerId);
      setConfig({ block: [], allow: [], autoLearn: false });
      setBlockTextState("");
      setAllowTextState("");
      setAutoLearnState(false);
      setDirty(false);
      notify.notify(t("paramFiltersResetSuccess"), "success");
    } catch (err) {
      notify.notify(t("paramFiltersResetError", { error: errorMessage(err) }), "error");
    } finally {
      setSaving(false);
    }
  }, [providerId, notify, t]);

  return {
    loading,
    saving,
    dirty,
    blockText,
    allowText,
    autoLearn,
    setBlockText,
    setAllowText,
    setAutoLearn,
    handleSave,
    handleReset,
  };
}

// ---------------------------------------------------------------------------
// Presentational sub-components
// ---------------------------------------------------------------------------

function ParamFilterSectionSkeleton() {
  return (
    <Card padding="sm" className="p-5">
      <div className="h-5 w-48 animate-pulse rounded bg-bg-subtle" />
      <div className="mt-4 h-20 animate-pulse rounded bg-bg-subtle" />
    </Card>
  );
}

function ParamFilterSectionHeader({ t }: { t: (key: string) => string }) {
  return (
    <>
      <h2 className="text-base font-semibold text-text-main mb-1">
        {t("paramFiltersSectionTitle")}
      </h2>
      <p className="text-xs text-text-muted mb-4 leading-relaxed">
        {t.rich("paramFiltersSectionHint", {
          code: (chunks) => <code className="text-xs bg-bg-subtle px-1 rounded">{chunks}</code>,
        })}
      </p>
    </>
  );
}

interface ParamListFieldProps {
  label: string;
  hint: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

function ParamListField({ label, hint, value, placeholder, onChange }: ParamListFieldProps) {
  return (
    <Input
      label={label}
      hint={hint}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mb-3"
      inputClassName="text-xs"
    />
  );
}

interface AutoLearnToggleProps {
  t: (key: string) => string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function AutoLearnToggle({ t, checked, onChange }: AutoLearnToggleProps) {
  return (
    <div className="mb-4">
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        label={
          <span className="text-xs font-medium text-text-main">
            {t("paramFiltersAutoLearnLabel")}
          </span>
        }
      />
      <p className="text-[11px] text-text-muted mt-1 ml-5">{t("paramFiltersAutoLearnHint")}</p>
    </div>
  );
}

interface ParamFilterActionsProps {
  t: (key: string) => string;
  saving: boolean;
  dirty: boolean;
  onSave: () => void;
  onReset: () => void;
}

function ParamFilterActions({ t, saving, dirty, onSave, onReset }: ParamFilterActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm" icon="save" loading={saving} onClick={onSave} disabled={saving || !dirty}>
        {saving ? t("paramFiltersSaving") : t("paramFiltersSaveChanges")}
      </Button>
      <Button size="sm" variant="outline" icon="delete" onClick={onReset} disabled={saving}>
        {t("paramFiltersResetToDefault")}
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProviderParamFilterSection({
  providerId,
}: ProviderParamFilterSectionProps) {
  const t = useTranslations("providers");
  const {
    loading,
    saving,
    dirty,
    blockText,
    allowText,
    autoLearn,
    setBlockText,
    setAllowText,
    setAutoLearn,
    handleSave,
    handleReset,
  } = useProviderParamFilterConfig(providerId, t);

  if (loading) {
    return <ParamFilterSectionSkeleton />;
  }

  return (
    <Card padding="sm" className="p-5">
      <ParamFilterSectionHeader t={t} />
      <ParamListField
        label={t("paramFiltersBlockedLabel")}
        hint={t("paramFiltersBlockedHint")}
        value={blockText}
        placeholder={t("paramFiltersBlockedPlaceholder")}
        onChange={setBlockText}
      />
      <ParamListField
        label={t("paramFiltersAllowedLabel")}
        hint={t("paramFiltersAllowedHint")}
        value={allowText}
        placeholder={t("paramFiltersAllowedPlaceholder")}
        onChange={setAllowText}
      />
      <AutoLearnToggle t={t} checked={autoLearn} onChange={setAutoLearn} />
      <ParamFilterActions
        t={t}
        saving={saving}
        dirty={dirty}
        onSave={handleSave}
        onReset={handleReset}
      />
    </Card>
  );
}
