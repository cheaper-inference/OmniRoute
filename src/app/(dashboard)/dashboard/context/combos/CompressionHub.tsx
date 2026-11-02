"use client";

// Compression Hub — the single place to understand and control compression.
//
// Phase 2: this Hub is now a thin overview. The master toggle, mode selector, and the
// reorderable per-layer pipeline live in the panel at /dashboard/context/settings and
// in the named-combo editor. Here we expose a single active-profile selector
// (Default-from-panel | a named combo) + a read-only preview.

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import { Skeleton } from "@/shared/components/Loading";
import Select from "@/shared/components/Select";
import Toggle from "@/shared/components/Toggle";

// ── Types ─────────────────────────────────────────────────────────────────────

type CompressionMode =
  "off" | "lite" | "standard" | "aggressive" | "ultra" | "rtk" | "codex-responses" | "stacked";

interface CompressionSettings {
  enabled: boolean;
  defaultMode: CompressionMode;
  activeComboId?: string | null;
  contextEditing?: { enabled: boolean };
  [key: string]: unknown;
}

interface NamedCombo {
  id: string;
  name: string;
  pipeline: { engine: string; intensity?: string }[];
}

// A settings PUT with no answer within this time counts as failed, so one stalled request cannot
// hold up the saves queued behind it.
const SAVE_TIMEOUT_MS = 15_000;

const FALLBACK_SETTINGS: CompressionSettings = {
  enabled: false,
  defaultMode: "off",
  contextEditing: { enabled: false },
};

// Every mounted Hub in this tab shares one save queue: a Hub that unmounts with saves still
// queued keeps sending them, and a Hub mounted afterwards loads and saves behind them, so it
// shows what the server stored and an older value never lands after a newer one. Another tab
// has its own queue and its own last-saved copy, so it can still overwrite the server behind
// this one.
let saveQueue: Promise<void> = Promise.resolve();

// A save still queued or in flight is lost if the page unloads, so the browser asks before
// leaving while any save is pending.
let pendingSaves = 0;
function confirmLeave(event: BeforeUnloadEvent) {
  event.preventDefault();
  // Chrome and Edge before 119 show the prompt only when returnValue is set.
  event.returnValue = true;
}

// ── Sub-components ──────────────────────────────────────────────────────────────

// ── Main component ──────────────────────────────────────────────────────────────

export default function CompressionHub() {
  const t = useTranslations("contextCombos");
  const tSettings = useTranslations("settings");
  const tCommon = useTranslations("common");
  const [settings, setSettings] = useState<CompressionSettings | null>(null);
  const [combos, setCombos] = useState<NamedCombo[]>([]);
  const [loading, setLoading] = useState(true);
  // A failed settings load must not show the default-profile view: its select and
  // Context Editing toggle would save the defaults over the stored row. A retry
  // re-runs the load; answers that arrive for the run it replaced are ignored.
  const [loadFailed, setLoadFailed] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [explainerOpen, setExplainerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // The Hub shows the last saved settings plus its saves still queued, so a failed save rolls
  // back only its own fields and never undoes a newer save.
  const savedRef = useRef(FALLBACK_SETTINGS);
  const queuedRef = useRef<Partial<CompressionSettings>[]>([]);
  // The fields whose latest save failed; the error shows while any remain.
  const failedRef = useRef(new Set<string>());

  // ── Initial load (parallel) ──────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      await saveQueue;
      // The queue can hold a stalled save for up to the save timeout; a Hub unmounted during
      // that wait must not fetch.
      if (cancelled) return;
      const asJson = (r: Response) => (r.ok ? r.json() : null);
      const [settingsData, combosData] = await Promise.all([
        fetch("/api/settings/compression")
          .then(asJson)
          .catch(() => null),
        fetch("/api/context/combos")
          .then(asJson)
          .catch(() => null),
      ]);
      if (cancelled) return;
      // A failed GET must not paint the default profile: its controls would save those
      // defaults over the stored row (#15583). A successful GET becomes the base the
      // save queue overlays (#15593).
      if (settingsData) {
        savedRef.current = settingsData as CompressionSettings;
        setSettings(savedRef.current);
      }
      setLoadFailed(!settingsData);
      if (Array.isArray(combosData?.combos)) {
        setCombos(combosData.combos as NamedCombo[]);
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [loadAttempt]);

  // ── Settings mutations ───────────────────────────────────────────────────────
  const saveSettings = useCallback(
    (patch: Partial<CompressionSettings>) => {
      const showQueued = () =>
        setSettings(
          queuedRef.current.reduce<CompressionSettings>(
            (shown, queued) => ({ ...shown, ...queued }),
            savedRef.current
          )
        );
      queuedRef.current.push(patch);
      showQueued();
      failedRef.current.clear();
      setError(null);
      if (pendingSaves++ === 0) window.addEventListener("beforeunload", confirmLeave);
      saveQueue = saveQueue.then(async () => {
        // A later queued save that carries every key of this one replaces it on the server, so
        // skip this one.
        const replaced = queuedRef.current
          .slice(1)
          .some((later) => Object.keys(patch).every((key) => key in later));
        if (!replaced) {
          let ok = false;
          try {
            // Send only the changed fields (patch), not the full merged settings.
            // The API schema is designed for partial updates; sending the full
            // CompressionConfig round-trips fields unknown to the schema and causes
            // a 400 strict-validation failure (e.g. contextBudget, pipeline engines
            // added after the schema was written). CompressionPanel already does this.
            const res = await fetch("/api/settings/compression", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(patch),
              signal: AbortSignal.timeout(SAVE_TIMEOUT_MS),
            });
            ok = res.ok;
          } catch {
            // A network error or the timeout counts as a failed save.
          }
          // The error stays up until the next edit, or until later saves store every field that
          // failed, so a later save of another field cannot hide the field this one rolled back.
          for (const key of Object.keys(patch)) {
            if (ok) failedRef.current.delete(key);
            else failedRef.current.add(key);
          }
          if (ok) savedRef.current = { ...savedRef.current, ...patch };
          setError(failedRef.current.size > 0 ? t("saveSettingsFailed") : null);
        }
        queuedRef.current.shift();
        showQueued();
        if (--pendingSaves === 0) window.removeEventListener("beforeunload", confirmLeave);
      });
    },
    [t]
  );

  // ── Derived state ─────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col gap-3 p-4" aria-busy="true">
        <span className="ci-sr-only">{t("loading")}</span>
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (loadFailed) {
    return (
      <Card padding="sm" className="flex flex-col gap-5 border-primary/30">
        <div className="flex items-center justify-between gap-4">
          <p role="alert" className="text-sm text-error">
            {tSettings("compressionTitle")}: {tCommon("failedToLoad")}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setLoading(true);
              setLoadAttempt((attempt) => attempt + 1);
            }}
            className="shrink-0"
          >
            {tSettings("retry")}
          </Button>
        </div>
      </Card>
    );
  }

  const activeCombo = combos.find((c) => c.id === settings?.activeComboId) ?? null;
  const activePipelineText = activeCombo
    ? activeCombo.pipeline.map((s) => s.engine).join(" → ")
    : "";

  return (
    <Card padding="sm" className="flex flex-col gap-5 border-primary/30">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Icon name="hub" size={26} className="text-primary" />
          <div>
            <h1 className="text-xl font-bold text-text-main">{t("hubTitle")}</h1>
            <p className="text-sm text-text-muted">{t("hubDescription")}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExplainerOpen((v) => !v)}
          aria-expanded={explainerOpen}
          className="shrink-0"
        >
          {explainerOpen ? t("hideExplanation") : t("howItWorks")}
        </Button>
      </div>

      {error && (
        <p role="alert" className="rounded border border-error/40 px-3 py-2 text-xs text-error">
          {error}
        </p>
      )}

      {/* ── Explainer ── */}
      {explainerOpen && (
        <div className="rounded-lg border border-border bg-bg p-4 text-sm text-text-muted">
          <p className="mb-2">
            {t.rich("explanationIntro", {
              strong: (chunks) => <strong className="text-text-main">{chunks}</strong>,
            })}
          </p>
          <ol className="ml-4 list-decimal space-y-1.5">
            <li>
              {t.rich("explanationActiveProfile", {
                strong: (chunks) => <strong className="text-text-main">{chunks}</strong>,
              })}
            </li>
            <li>
              {t.rich("explanationDefault", {
                strong: (chunks) => <strong className="text-text-main">{chunks}</strong>,
              })}
            </li>
            <li>
              {t.rich("explanationNamedCombos", {
                strong: (chunks) => <strong className="text-text-main">{chunks}</strong>,
              })}
            </li>
            <li>
              {t.rich("explanationPreview", {
                strong: (chunks) => <strong className="text-text-main">{chunks}</strong>,
              })}
            </li>
          </ol>
        </div>
      )}

      {/* ── Active profile ── */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg p-4">
        <Select
          id="active-profile"
          label={t("activeProfile")}
          hint={t("activeProfileDescription")}
          data-testid="active-profile-select"
          value={settings?.activeComboId ?? ""}
          onChange={(e) => saveSettings({ activeComboId: e.target.value || null })}
        >
          <option value="">{t("defaultFromPanel")}</option>
          {combos.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
        <div
          data-testid="active-profile-preview"
          className="rounded-lg border border-dashed border-border px-3 py-2 text-xs text-text-muted"
        >
          {activeCombo ? (
            <span>
              {t("runs")} <span className="font-mono text-text-main">{activePipelineText}</span>
            </span>
          ) : (
            <span>
              {t("defaultConfiguredPrefix")}{" "}
              <a href="/dashboard/context/settings" className="underline hover:text-text-main">
                {t("compressionSettings")}
              </a>
              .
            </span>
          )}
        </div>
      </div>

      {/* ── Provider-delegated compression ── */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-text-main">{t("providerDelegated")}</h2>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-bg p-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-main">{t("contextEditingClaude")}</p>
            <p className="text-xs text-text-muted">{t("contextEditingDescription")}</p>
          </div>
          <Toggle
            checked={!!settings?.contextEditing?.enabled}
            onChange={() =>
              saveSettings({ contextEditing: { enabled: !settings?.contextEditing?.enabled } })
            }
            ariaLabel={t("contextEditingAria")}
          />
        </div>
        <Alert
          variant="warning"
          icon={<Icon name="info" size={16} />}
          className="[&>.ci-alert__dismiss]:hidden"
          description={t("contextEditingNote")}
        />
      </div>
    </Card>
  );
}
