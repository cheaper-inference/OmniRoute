"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { CheckboxGroup } from "@omniroute/ui-kit/checkbox";
import { Field } from "@omniroute/ui-kit/field";
import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";
import { Badge, Button, Card, Checkbox, EmptyState, Input, Textarea } from "@/shared/components";
import { isNeedsCoreNode } from "@/lib/proxySubscription/needsCore";
import { parseLocalCoreEndpoints } from "@/lib/proxySubscription/coreEndpoint";
import { parseSelectorTag } from "@/lib/proxySubscription/selectorEndpoint";
import type { SelectorEarlyReasonCounts } from "@/lib/proxySubscription/selectorEarlyReasons";

interface SelectorLastSwitchEntry {
  at: string;
  result: string;
  member: string | null;
  kind: string | null;
}

interface SubscriptionRecord {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  mode: "global" | "rule";
  ruleProviders: string[] | null;
  localCoreEndpoint: string | null;
  updateIntervalMinutes: number;
  controlUrl: string | null;
  coreConfigPath: string | null;
  coreReloadMode?: "api" | "command" | "external" | "undeclared" | null;
  hasControlSecret: boolean;
  selectorMinGapSeconds: number;
  selectorLastSwitchAt: string | null;
  selectorLastSwitchResult: string | null;
  selectorLastSwitchMember: string | null;
  selectorLastSwitchKind: string | null;
  selectorLastSwitchBySelector?: Record<string, SelectorLastSwitchEntry | null> | null;
  lastFetchedAt: string | null;
  status: "ok" | "error" | "empty";
  error: string | null;
  lastNodes: unknown[] | null;
  lastErrorAt: string | null;
  consecutiveFailures: number;
}

interface ProviderOption {
  id: string;
  name: string;
  provider: string;
}

type FormState = {
  name: string;
  url: string;
  mode: "global" | "rule";
  ruleProviders: string[];
  localCoreEndpoint: string;
  controlUrl: string;
  coreConfigPath: string;
  controlSecret: string;
  selectorMinGapSeconds: number;
  updateIntervalMinutes: number;
  enabled: boolean;
};

const EMPTY_FORM: FormState = {
  name: "",
  url: "",
  mode: "global",
  ruleProviders: [],
  localCoreEndpoint: "",
  controlUrl: "",
  coreConfigPath: "",
  controlSecret: "",
  selectorMinGapSeconds: 60,
  updateIntervalMinutes: 60,
  enabled: true,
};

/** Next possible switch from the persisted last-switch time + gap. Pure. */
function nextSwitchLabel(
  sub: {
    selectorLastSwitchAt: string | null;
    selectorMinGapSeconds: number;
  },
  nowMs: number = Date.now()
): string {
  if (!sub.selectorLastSwitchAt) return "now";
  const at = Date.parse(sub.selectorLastSwitchAt);
  if (!Number.isFinite(at)) return "now";
  const next = at + Math.max(0, sub.selectorMinGapSeconds || 0) * 1000;
  if (next <= nowMs) return "now";
  return new Date(next).toISOString();
}

/** Selector tags that carry a stored trace entry, in line order. Pure. */
function selectorTagsWithTrace(sub: SubscriptionRecord): string[] {
  const bySelector = sub.selectorLastSwitchBySelector;
  if (!bySelector || typeof bySelector !== "object") return [];
  return parseLocalCoreEndpoints(sub.localCoreEndpoint)
    .map((line) => parseSelectorTag(line))
    .filter((tag): tag is string => tag !== null)
    .filter((tag) => bySelector[tag] !== undefined && bySelector[tag] !== null);
}

type SwitchLabels = {
  (key: "proxySubscription.lastSwitch"): string;
  (key: "proxySubscription.lastSwitchMember"): string;
  (key: "proxySubscription.lastSwitchKind"): string;
  (key: "proxySubscription.nextSwitch"): string;
  (key: "proxySubscription.nextSwitchNow"): string;
};

/** Suffix of a switch line: result, member, cause. Pure. */
function switchLineSuffix(
  resultValue: string | null,
  memberValue: string | null,
  kindLabel: string | null,
  t: SwitchLabels
): string {
  const result = resultValue && resultValue !== "ok" ? ` (${resultValue})` : "";
  const member = memberValue ? ` · ${t("proxySubscription.lastSwitchMember")}: ${memberValue}` : "";
  const kind = kindLabel ? ` · ${t("proxySubscription.lastSwitchKind")}: ${kindLabel}` : "";
  return `${result}${member}${kind}`;
}

/** Resolved values behind one switch line. Pure. */
function switchLineValues(
  sub: SubscriptionRecord,
  tag: string | null,
  entry: SelectorLastSwitchEntry | null,
  switchKindLabel: (kind: string | null) => string | null
): { at: string; result: string | null; member: string | null; kindLabel: string | null } {
  return {
    at: entry?.at ?? sub.selectorLastSwitchAt!,
    result: entry?.result ?? sub.selectorLastSwitchResult,
    member: entry?.member ?? (tag === null ? sub.selectorLastSwitchMember : null),
    kindLabel: switchKindLabel(entry?.kind ?? (tag === null ? sub.selectorLastSwitchKind : null)),
  };
}

/** One summary line, or one `"<tag> · …"` line for a selector entry. Pure. */
function formatSwitchLine(
  sub: SubscriptionRecord,
  tag: string | null,
  entry: SelectorLastSwitchEntry | null,
  t: SwitchLabels,
  switchKindLabel: (kind: string | null) => string | null
): string {
  const v = switchLineValues(sub, tag, entry, switchKindLabel);
  const next = nextSwitchLabel({
    selectorLastSwitchAt: v.at,
    selectorMinGapSeconds: sub.selectorMinGapSeconds,
  });
  const nextText = next === "now" ? t("proxySubscription.nextSwitchNow") : next;
  const prefix = tag === null ? "" : `${tag} · `;
  const suffix = switchLineSuffix(v.result, v.member, v.kindLabel, t);
  return `${prefix}${t("proxySubscription.lastSwitch")}: ${v.at}${suffix} · ${t("proxySubscription.nextSwitch")}: ${nextText}`;
}

type SubscriptionsFetchResult = {
  items?: SubscriptionRecord[];
  earlyReasons?: Partial<SelectorEarlyReasonCounts>;
  error?: string;
};

async function fetchSubscriptionsResult(
  loadFailedMessage: string
): Promise<SubscriptionsFetchResult> {
  try {
    const res = await fetch("/api/v1/management/proxy-subscriptions");
    if (!res.ok) throw new Error(loadFailedMessage);
    const data = await res.json();
    return {
      items: Array.isArray(data.items) ? data.items : [],
      earlyReasons: data.earlyReasons ?? undefined,
    };
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
}

type SubscriptionFieldErrors = { name?: string; url?: string; ruleProviders?: string };

/**
 * Client-side form validation. Mirror of requireNameUrl (server): the feed URL
 * may be empty only for a feedless (selector-only) subscription, which is
 * accepted when a control URL is set. Pure.
 */
function validateSubscriptionForm(
  form: FormState,
  t: (key: string) => string
): SubscriptionFieldErrors {
  const errors: SubscriptionFieldErrors = {};
  if (!form.name.trim()) errors.name = t("proxySubscription.nameRequired");
  if (!form.url.trim() && !form.controlUrl.trim()) {
    errors.url = t("proxySubscription.urlRequired");
  }
  if (form.mode === "rule" && form.ruleProviders.length === 0) {
    errors.ruleProviders = t("proxySubscription.ruleModeProviderRequired");
  }
  return errors;
}

/** Subscription creation/update payload from the edited form. Pure. */
function buildSubscriptionPayload(form: FormState): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    name: form.name.trim(),
    url: form.url.trim(),
    mode: form.mode,
    ruleProviders: form.mode === "rule" ? form.ruleProviders : null,
    localCoreEndpoint: form.localCoreEndpoint.trim() || null,
    controlUrl: form.controlUrl.trim() || null,
    coreConfigPath: form.coreConfigPath.trim() || null,
    selectorMinGapSeconds: Number(form.selectorMinGapSeconds) || 60,
    updateIntervalMinutes: Number(form.updateIntervalMinutes) || 60,
    enabled: form.enabled,
  };
  if (form.controlSecret.length > 0) payload.controlSecret = form.controlSecret;
  return payload;
}

type EarlyReasonLabelKey =
  | "proxySubscription.earlySkipsSinceRestart"
  | "proxySubscription.error.SELECTOR_EARLY_NO_CONTROL"
  | "proxySubscription.error.SELECTOR_EARLY_UNMAPPED";

/**
 * Early selector-skip counts (in-memory, reset on restart). The server only
 * sends counts > 0 that concern a configured selector; renders nothing
 * otherwise. Pure.
 */
function EarlyReasonsSummary({
  reasons,
  text,
}: {
  reasons: Partial<SelectorEarlyReasonCounts> | null;
  text: (key: EarlyReasonLabelKey) => string;
}) {
  if (!reasons) return null;
  const parts = (
    [
      ["proxySubscription.error.SELECTOR_EARLY_NO_CONTROL", reasons["no-control"]],
      ["proxySubscription.error.SELECTOR_EARLY_UNMAPPED", reasons.unmapped],
    ] as const
  )
    .filter(([, count]) => typeof count === "number" && count > 0)
    .map(([key, count]) => `${text(key)}: ${count}`);
  if (parts.length === 0) return null;
  return (
    <p className="text-xs text-text-muted">
      {text("proxySubscription.earlySkipsSinceRestart")} — {parts.join(" · ")}
    </p>
  );
}

export default function SubscriptionTab() {
  const [subs, setSubs] = useState<SubscriptionRecord[]>([]);
  const [earlyReasons, setEarlyReasons] = useState<Partial<SelectorEarlyReasonCounts> | null>(null);
  const [providers, setProviders] = useState<ProviderOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations("settings");
  const localCoreId = useId();

  // Map a stored refusal kind to a generic display label. Unknown future
  // kinds fall back to plain English so the UI never shows a raw code.
  const switchKindLabel = useCallback(
    (kind: string | null): string | null => {
      if (!kind) return null;
      try {
        const label = t(`proxySubscription.switchKind.${kind}`);
        if (label && !label.includes("switchKind.")) return label;
      } catch {
        // fall through to the generic fallback below
      }
      return kind.replace(/_/g, " ");
    },
    [t]
  );

  // Resolve a subscription `error` value into a localized message. Values are
  // either a `{ code, detail? }` JSON (user-facing, i18n'd) or a plain
  // diagnostic string (technical fetch/sync errors) shown verbatim.
  const resolveSubError = useCallback(
    (raw: string | null): string | null => {
      if (!raw) return null;
      try {
        const parsed = JSON.parse(raw) as { code?: string; detail?: string };
        if (parsed?.code) {
          const base = t(`proxySubscription.error.${parsed.code}`);
          return parsed.detail ? `${base}（${parsed.detail}）` : base;
        }
      } catch {
        // plain diagnostic string — show as-is
      }
      return raw;
    },
    [t]
  );
  const [busyId, setBusyId] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  // Field-level validation lives on the fields themselves (Input / CheckboxGroup `error`);
  // `formError` stays for server responses.
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    url?: string;
    ruleProviders?: string;
  }>({});

  const applyLoadResult = useCallback((result: SubscriptionsFetchResult) => {
    if (result.items) setSubs(result.items);
    setEarlyReasons(result.earlyReasons ?? null);
    if (result.error !== undefined) setError(result.error);
    setLoading(false);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    applyLoadResult(await fetchSubscriptionsResult(t("proxySubscription.loadFailed")));
  }, [applyLoadResult, t]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await fetchSubscriptionsResult(t("proxySubscription.loadFailed"));
      if (!cancelled) applyLoadResult(result);
    })();
    void (async () => {
      try {
        const res = await fetch("/api/providers");
        if (!res.ok) return;
        const data = await res.json();
        const connections = Array.isArray(data.connections) ? data.connections : [];
        if (cancelled) return;
        setProviders(
          connections.map((c: Record<string, unknown>) => ({
            id: String(c.id),
            name: typeof c.name === "string" && c.name ? c.name : String(c.provider),
            provider: String(c.provider),
          }))
        );
      } catch {
        /* non-fatal: rule mode just won't offer a provider picker */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [applyLoadResult, t]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFormError(null);
    setFieldErrors({});
    setShowForm(false);
  };

  const startEdit = (sub: SubscriptionRecord) => {
    setEditingId(sub.id);
    setForm({
      name: sub.name,
      url: sub.url,
      mode: sub.mode,
      ruleProviders: sub.ruleProviders ?? [],
      localCoreEndpoint: sub.localCoreEndpoint ?? "",
      controlUrl: sub.controlUrl ?? "",
      coreConfigPath: sub.coreConfigPath ?? "",
      controlSecret: "",
      selectorMinGapSeconds: sub.selectorMinGapSeconds ?? 60,
      updateIntervalMinutes: sub.updateIntervalMinutes,
      enabled: sub.enabled,
    });
    setFieldErrors({});
    setShowForm(true);
  };

  const save = async () => {
    setFormError(null);
    const nextFieldErrors = validateSubscriptionForm(form, t);
    setFieldErrors(nextFieldErrors);
    if (Object.keys(nextFieldErrors).length > 0) return;
    setSaving(true);
    try {
      const payload = buildSubscriptionPayload(form);
      const res = editingId
        ? await fetch(`/api/v1/management/proxy-subscriptions/${editingId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/v1/management/proxy-subscriptions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || t("proxySubscription.saveFailed"));
      }
      resetForm();
      await load();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  const toggleEnabled = async (sub: SubscriptionRecord) => {
    setBusyId(sub.id);
    try {
      const res = await fetch(`/api/v1/management/proxy-subscriptions/${sub.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !sub.enabled }),
      });
      if (!res.ok) throw new Error(t("proxySubscription.toggleFailed"));
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusyId(null);
    }
  };

  const refresh = async (sub: SubscriptionRecord) => {
    setBusyId(sub.id);
    try {
      const res = await fetch(`/api/v1/management/proxy-subscriptions/${sub.id}/refresh`, {
        method: "POST",
      });
      if (!res.ok) throw new Error(t("proxySubscription.refreshFailed"));
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (sub: SubscriptionRecord) => {
    if (!window.confirm(t("proxySubscription.confirmDelete", { name: sub.name }))) return;
    setBusyId(sub.id);
    try {
      const res = await fetch(`/api/v1/management/proxy-subscriptions/${sub.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(t("proxySubscription.deleteFailed"));
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusyId(null);
    }
  };

  // Last switch state comes from the subscription row columns (persisted by
  // the trigger, surfaced by the list API) — the screen never calls the core
  // at open time.
  //
  // One line per selector (same tag parser as the server,
  // `parseSelectorTag`, so the lines shown are the lines stored), or the
  // single summary line when only one selector exists or the per-selector
  // column is missing (old DB, single-selector subscription).
  const describeSwitch = useCallback(
    (sub: SubscriptionRecord): string | null => {
      if (!sub.controlUrl) return null;
      if (!sub.selectorLastSwitchAt) return t("proxySubscription.lastSwitchNever");
      const tags = selectorTagsWithTrace(sub);
      if (tags.length <= 1) return formatSwitchLine(sub, null, null, t, switchKindLabel);
      const bySelector = sub.selectorLastSwitchBySelector as Record<
        string,
        SelectorLastSwitchEntry | null
      >;
      return tags
        .map((tag) => formatSwitchLine(sub, tag, bySelector[tag] ?? null, t, switchKindLabel))
        .join("\n");
    },
    [t, switchKindLabel]
  );

  const statusBadge: Record<SubscriptionRecord["status"], "success" | "error" | "warning"> = {
    ok: "success",
    error: "error",
    empty: "warning",
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-muted">{t("proxySubscription.description")}</p>
        {!showForm && (
          <Button size="sm" variant="primary" icon="add" onClick={() => setShowForm(true)}>
            {t("proxySubscription.addSubscription")}
          </Button>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-md border border-error/30 bg-error-bg px-3 py-2 text-sm text-error"
        >
          {error}
        </div>
      )}

      {showForm && (
        <Card
          padding="sm"
          title={
            editingId
              ? t("proxySubscription.editSubscription")
              : t("proxySubscription.newSubscription")
          }
          action={
            <Button size="sm" variant="secondary" icon="close" onClick={resetForm}>
              {t("cancel")}
            </Button>
          }
        >
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input
                label={t("proxySubscription.name")}
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                }}
                placeholder={t("proxySubscription.namePlaceholder")}
                error={fieldErrors.name}
              />
              <Input
                label={t("proxySubscription.url")}
                value={form.url}
                onChange={(e) => {
                  setForm({ ...form, url: e.target.value });
                  if (fieldErrors.url) setFieldErrors({ ...fieldErrors, url: undefined });
                }}
                placeholder={t("proxySubscription.urlPlaceholder")}
                error={fieldErrors.url}
              />
              <span className="text-xs text-text-muted">
                {t("proxySubscription.urlFeedlessHint")}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <RadioGroup
                label={t("proxySubscription.mode")}
                description={
                  form.mode === "global"
                    ? t("proxySubscription.globalModeDesc")
                    : t("proxySubscription.ruleModeDesc")
                }
                orientation="horizontal"
                value={form.mode}
                onValueChange={(m) => setForm({ ...form, mode: m === "rule" ? "rule" : "global" })}
              >
                <RadioGroupItem value="global" label={t("proxySubscription.globalMode")} />
                <RadioGroupItem value="rule" label={t("proxySubscription.ruleMode")} />
              </RadioGroup>

              <Field
                label={t("proxySubscription.localCoreEndpoint")}
                hint={t("proxySubscription.localCoreEndpointDesc")}
                htmlFor={localCoreId}
              >
                <Textarea
                  id={localCoreId}
                  rows={3}
                  value={form.localCoreEndpoint}
                  onChange={(e) => setForm({ ...form, localCoreEndpoint: e.target.value })}
                  placeholder={t("proxySubscription.localCoreEndpointPlaceholder")}
                />
              </Field>
            </div>

            {form.mode === "rule" &&
              (providers.length === 0 ? (
                <p className="text-xs text-text-muted" role="status">
                  {t("proxySubscription.loadingProviders")}
                </p>
              ) : (
                <CheckboxGroup
                  label={t("proxySubscription.routeByProvider")}
                  error={
                    fieldErrors.ruleProviders ? (
                      <span role="alert">{fieldErrors.ruleProviders}</span>
                    ) : undefined
                  }
                >
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {providers.map((p) => {
                      const checked = form.ruleProviders.includes(p.id);
                      return (
                        <Checkbox
                          key={p.id}
                          label={p.name}
                          checked={checked}
                          onChange={() =>
                            setForm({
                              ...form,
                              ruleProviders: checked
                                ? form.ruleProviders.filter((x) => x !== p.id)
                                : [...form.ruleProviders, p.id],
                            })
                          }
                        />
                      );
                    })}
                  </div>
                </CheckboxGroup>
              ))}

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input
                label={t("proxySubscription.controlUrl")}
                value={form.controlUrl}
                onChange={(e) => setForm({ ...form, controlUrl: e.target.value })}
                placeholder={t("proxySubscription.controlUrlPlaceholder")}
                inputMode="url"
              />
              <Input
                type="password"
                autoComplete="new-password"
                label={t("proxySubscription.controlSecret")}
                value={form.controlSecret}
                onChange={(e) => setForm({ ...form, controlSecret: e.target.value })}
                placeholder={t("proxySubscription.controlSecretPlaceholder")}
                hint={
                  editingId
                    ? t("proxySubscription.controlSecretSaved")
                    : t("proxySubscription.controlSecretNotSet")
                }
              />
              <Input
                label={t("proxySubscription.coreConfigPath")}
                value={form.coreConfigPath}
                onChange={(e) => setForm({ ...form, coreConfigPath: e.target.value })}
                placeholder={t("proxySubscription.coreConfigPathPlaceholder")}
                inputMode="url"
                hint={t("proxySubscription.coreConfigPathDesc")}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input
                type="number"
                min={0}
                max={3600}
                label={t("proxySubscription.selectorMinGap")}
                value={form.selectorMinGapSeconds}
                onChange={(e) =>
                  setForm({ ...form, selectorMinGapSeconds: Number(e.target.value) || 0 })
                }
                hint={t("proxySubscription.selectorHelp")}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:items-end">
              <Input
                type="number"
                min={5}
                label={t("proxySubscription.autoRefreshInterval")}
                value={form.updateIntervalMinutes}
                onChange={(e) =>
                  setForm({ ...form, updateIntervalMinutes: Number(e.target.value) || 60 })
                }
              />
              <Checkbox
                className="md:pb-2.5"
                checked={form.enabled}
                onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                label={t("proxySubscription.enableAfterCreate")}
              />
            </div>

            {formError && (
              <div className="text-sm text-error" role="alert">
                {formError}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button size="sm" variant="secondary" onClick={resetForm}>
                {t("cancel")}
              </Button>
              <Button size="sm" variant="primary" icon="save" onClick={save} loading={saving}>
                {saving
                  ? t("proxySubscription.saving")
                  : editingId
                    ? t("proxySubscription.saveChanges")
                    : t("proxySubscription.createSubscription")}
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-2">
        <EarlyReasonsSummary reasons={earlyReasons} text={(key) => t(key)} />
        {loading && (
          <p className="text-sm text-text-muted" role="status">
            {t("proxySubscription.loading")}
          </p>
        )}
        {!loading && subs.length === 0 && (
          <EmptyState icon="rss_feed" title={t("proxySubscription.noSubscriptions")} />
        )}
        {subs.map((sub) => {
          const needsCoreNodes = (sub.lastNodes ?? []).filter(isNeedsCoreNode);
          const showCoreHint = needsCoreNodes.length > 0 && !sub.localCoreEndpoint;
          const busy = busyId === sub.id;
          return (
            <Card key={sub.id} padding="xs" className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium truncate">{sub.name}</span>
                    <Badge size="sm" variant={statusBadge[sub.status] || statusBadge.empty}>
                      {sub.status === "ok"
                        ? t("proxySubscription.statusOk")
                        : sub.status === "error"
                          ? t("proxySubscription.statusError")
                          : t("proxySubscription.statusEmpty")}
                    </Badge>
                    <Badge size="sm">
                      {sub.mode === "global"
                        ? t("proxySubscription.global")
                        : t("proxySubscription.rule")}
                    </Badge>
                    <Badge size="sm">
                      {sub.enabled
                        ? t("proxySubscription.enabled")
                        : t("proxySubscription.disabled")}
                    </Badge>
                  </div>
                  <p className="text-xs text-text-muted truncate mt-1" title={sub.url}>
                    {sub.url}
                  </p>
                  {resolveSubError(sub.error) && (
                    <p className="text-xs text-warning mt-1 break-words">
                      {resolveSubError(sub.error)}
                    </p>
                  )}
                  {describeSwitch(sub) && (
                    <p className="text-xs text-text-muted mt-1 whitespace-pre-wrap">
                      {describeSwitch(sub)}
                    </p>
                  )}
                  {sub.coreConfigPath && (
                    <p className="text-xs text-text-muted mt-1">
                      {t("proxySubscription.coreReloadAppliedBy", {
                        mode: sub.coreReloadMode ?? "undeclared",
                      })}
                    </p>
                  )}
                  {showCoreHint && (
                    <div className="mt-2 rounded-md border border-warning/30 bg-warning-bg px-3 py-2 text-xs text-text-main space-y-1.5">
                      <p className="font-medium">
                        {t("proxySubscription.coreHintTitle", { count: needsCoreNodes.length })}
                      </p>
                      <p>{t("proxySubscription.coreHintDesc")}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <code className="rounded bg-surface px-2 py-1 border border-border">
                          socks5://127.0.0.1:2080
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          icon="content_copy"
                          onClick={() => navigator.clipboard?.writeText("socks5://127.0.0.1:2080")}
                        >
                          {t("proxySubscription.copy")}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => startEdit(sub)}>
                          {t("proxySubscription.goConfigure")}
                        </Button>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-text-muted mt-1">
                    {t("proxySubscription.nodeCount", { count: sub.lastNodes?.length ?? 0 })}
                    {needsCoreNodes.length > 0
                      ? ` (${t("proxySubscription.needsCoreCount", { count: needsCoreNodes.length })})`
                      : ""}
                    {sub.lastFetchedAt
                      ? ` · ${t("proxySubscription.lastSynced", { time: sub.lastFetchedAt })}`
                      : ""}
                    {sub.consecutiveFailures > 0
                      ? ` · ${t("proxySubscription.consecutiveFailures", { count: sub.consecutiveFailures })}`
                      : ""}
                    {sub.lastErrorAt
                      ? ` · ${t("proxySubscription.lastError", { time: sub.lastErrorAt })}`
                      : ""}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={busy}
                    onClick={() => toggleEnabled(sub)}
                  >
                    {sub.enabled ? t("proxySubscription.disable") : t("proxySubscription.enable")}
                  </Button>
                  <Button size="sm" variant="outline" disabled={busy} onClick={() => refresh(sub)}>
                    {t("proxySubscription.refreshNodes")}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={busy}
                    onClick={() => startEdit(sub)}
                  >
                    {t("proxySubscription.edit")}
                  </Button>
                  <Button size="sm" variant="danger" disabled={busy} onClick={() => remove(sub)}>
                    {t("proxySubscription.delete")}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
