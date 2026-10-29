"use client";

import { Input as KitInput } from "@omniroute/ui-kit/input";
import { Button, Card, Select } from "@/shared/components";

/**
 * ProviderCcAliasSection — operator control for the Claude Code discovery-alias
 * gate (`claude/&lt;provider&gt;/&lt;model&gt;` mirror ids on /v1/models — see
 * src/lib/db/ccDiscoveryAliases.ts for the gate itself).
 *
 * Renders a card on the provider detail page with:
 *   - a 3-state provider-level control (inherit / on / off)
 *   - a compact list of per-model overrides, each also inherit/on/off
 *
 * "Inherit" clears the DB override (`value: null`) and falls back to the next
 * level down (model → provider → the global EXPOSE_CC_DISCOVERY_ALIASES flag).
 * Off by default at every level — this card is purely opt-in.
 */

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";

export type CcAliasSettingValue = "on" | "off" | null;

interface ProviderCcAliasSectionProps {
  providerId: string;
}

interface CcAliasState {
  provider: CcAliasSettingValue;
  models: Record<string, "on" | "off">;
}

const DEFAULT_STATE: CcAliasState = { provider: null, models: {} };

async function fetchCcAliasState(providerId: string): Promise<CcAliasState> {
  const res = await fetch(`/api/providers/${providerId}/cc-alias`);
  const data = await res.json();
  return {
    provider: data?.provider === "on" || data?.provider === "off" ? data.provider : null,
    models: data?.models && typeof data.models === "object" ? data.models : {},
  };
}

async function throwOnErrorResponse(res: Response): Promise<void> {
  if (res.ok) return;
  const errData = await res.json().catch(() => ({}));
  const message =
    typeof errData?.error === "string"
      ? errData.error
      : errData?.error?.message || `HTTP ${res.status}`;
  throw new Error(message);
}

async function putProviderSetting(providerId: string, value: CcAliasSettingValue): Promise<void> {
  const res = await fetch(`/api/providers/${providerId}/cc-alias`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scope: "provider", value }),
  });
  await throwOnErrorResponse(res);
}

async function putModelSetting(
  providerId: string,
  modelId: string,
  value: CcAliasSettingValue
): Promise<void> {
  const res = await fetch(`/api/providers/${providerId}/cc-alias`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scope: "model", modelId, value }),
  });
  await throwOnErrorResponse(res);
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

// Wraps the GET so a failure comes back as a value: the load callback then only
// sets state after the await (no synchronous setState reachable from the effect).
async function fetchCcAliasStateSafe(
  providerId: string
): Promise<{ ok: boolean; state?: CcAliasState; error?: string }> {
  try {
    return { ok: true, state: await fetchCcAliasState(providerId) };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

/** Loads the provider's alias settings once and reports a load failure to the operator. */
function useCcAliasData(providerId: string, t: ProviderMessageTranslator) {
  const notify = useNotificationStore();
  const [state, setState] = useState<CcAliasState>(DEFAULT_STATE);
  // Loading is derived: true until a load attempt for the CURRENT provider
  // settles — this also re-shows the skeleton when providerId changes.
  const [loadedProviderId, setLoadedProviderId] = useState<string | null>(null);
  const loading = loadedProviderId !== providerId;

  // The async work is defined INSIDE the effect (a component-scope loader
  // called synchronously from an effect is rejected by the compiler rules);
  // every setState here runs after the await.
  useEffect(() => {
    const run = async () => {
      const outcome = await fetchCcAliasStateSafe(providerId);
      if (outcome.ok) {
        setState(outcome.state);
      } else {
        notify.error(
          providerText(t, "ccAliasLoadError", "Failed to load discovery-alias settings: {error}", {
            error: outcome.error,
          })
        );
      }
      setLoadedProviderId(providerId);
    };
    void run();
  }, [providerId, notify, t]);

  return { state, setState, loading };
}

function useProviderCcAliasState(providerId: string, t: ProviderMessageTranslator) {
  const notify = useNotificationStore();
  const { state, setState, loading } = useCcAliasData(providerId, t);
  const [savingProvider, setSavingProvider] = useState(false);
  const [savingModelId, setSavingModelId] = useState<string | null>(null);
  const [newModelId, setNewModelId] = useState("");

  const handleProviderChange = useCallback(
    async (value: CcAliasSettingValue) => {
      setSavingProvider(true);
      try {
        await putProviderSetting(providerId, value);
        setState((prev) => ({ ...prev, provider: value }));
      } catch (err) {
        notify.error(
          providerText(t, "ccAliasSaveError", "Failed to save discovery-alias setting: {error}", {
            error: errorMessage(err),
          })
        );
      } finally {
        setSavingProvider(false);
      }
    },
    [providerId, notify, t, setState]
  );

  const handleModelChange = useCallback(
    async (modelId: string, value: CcAliasSettingValue) => {
      setSavingModelId(modelId);
      try {
        await putModelSetting(providerId, modelId, value);
        setState((prev) => {
          const models = { ...prev.models };
          if (value === null) delete models[modelId];
          else models[modelId] = value;
          return { ...prev, models };
        });
      } catch (err) {
        notify.error(
          providerText(t, "ccAliasSaveError", "Failed to save discovery-alias setting: {error}", {
            error: errorMessage(err),
          })
        );
      } finally {
        setSavingModelId(null);
      }
    },
    [providerId, notify, t, setState]
  );

  const handleAddModelOverride = useCallback(async () => {
    const modelId = newModelId.trim();
    if (!modelId) return;
    await handleModelChange(modelId, "on");
    setNewModelId("");
  }, [newModelId, handleModelChange]);

  return {
    state,
    loading,
    savingProvider,
    savingModelId,
    newModelId,
    setNewModelId,
    handleProviderChange,
    handleModelChange,
    handleAddModelOverride,
  };
}

function CcAliasSectionSkeleton() {
  return (
    <Card padding="sm" className="p-5">
      <div className="h-5 w-64 animate-pulse rounded bg-bg-subtle" />
      <div className="mt-4 h-16 animate-pulse rounded bg-bg-subtle" />
    </Card>
  );
}

type TriState = "inherit" | "on" | "off";

function toTriState(value: CcAliasSettingValue): TriState {
  if (value === "on") return "on";
  if (value === "off") return "off";
  return "inherit";
}

function fromTriState(value: TriState): CcAliasSettingValue {
  if (value === "inherit") return null;
  return value;
}

interface TriStateSelectProps {
  t: ProviderMessageTranslator;
  value: CcAliasSettingValue;
  disabled?: boolean;
  onChange: (value: CcAliasSettingValue) => void;
  ariaLabel: string;
}

function TriStateSelect({ t, value, disabled, onChange, ariaLabel }: TriStateSelectProps) {
  return (
    <Select
      compact
      aria-label={ariaLabel}
      disabled={disabled}
      value={toTriState(value)}
      onChange={(e) => onChange(fromTriState(e.target.value as TriState))}
      className="w-auto"
      selectClassName="text-xs"
    >
      <option value="inherit">{providerText(t, "ccAliasStateInherit", "Inherit")}</option>
      <option value="on">{providerText(t, "ccAliasStateOn", "On")}</option>
      <option value="off">{providerText(t, "ccAliasStateOff", "Off")}</option>
    </Select>
  );
}

export default function ProviderCcAliasSection({ providerId }: ProviderCcAliasSectionProps) {
  const t = useTranslations("providers");
  const {
    state,
    loading,
    savingProvider,
    savingModelId,
    newModelId,
    setNewModelId,
    handleProviderChange,
    handleModelChange,
    handleAddModelOverride,
  } = useProviderCcAliasState(providerId, t);

  if (loading) {
    return <CcAliasSectionSkeleton />;
  }

  const modelEntries = Object.entries(state.models);

  return (
    <Card padding="sm" className="p-5">
      <h2 className="text-base font-semibold text-text-main mb-1">
        {providerText(t, "ccAliasSectionTitle", "Expose in Claude Code (claude/…)")}
      </h2>
      <p className="text-xs text-text-muted mb-4 leading-relaxed">
        {providerText(
          t,
          "ccAliasSectionHint",
          "Advertise this provider's models under claude/&lt;provider&gt;/&lt;model&gt; mirror ids so Claude Code's gateway model discovery can list them. Off by default — enabling this doubles catalog entries for all clients."
        )}
      </p>

      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-sm font-medium text-text-main">
          {providerText(t, "ccAliasProviderLevelLabel", "Provider default")}
        </span>
        <TriStateSelect
          t={t}
          value={state.provider}
          disabled={savingProvider}
          onChange={handleProviderChange}
          ariaLabel={providerText(t, "ccAliasProviderLevelLabel", "Provider default")}
        />
      </div>

      <ModelOverrideList
        t={t}
        entries={modelEntries}
        savingModelId={savingModelId}
        onChange={handleModelChange}
      />

      <AddOverrideRow
        t={t}
        value={newModelId}
        onValueChange={setNewModelId}
        onSubmit={handleAddModelOverride}
        disabled={savingModelId !== null}
      />
    </Card>
  );
}

function ModelOverrideList({
  t,
  entries,
  savingModelId,
  onChange,
}: {
  t: ProviderMessageTranslator;
  entries: Array<[string, CcAliasSettingValue]>;
  savingModelId: string | null;
  onChange: (modelId: string, value: CcAliasSettingValue) => void;
}) {
  if (entries.length === 0) return null;
  return (
    <div className="mb-3 flex flex-col gap-2">
      <span className="text-xs font-medium text-text-muted">
        {providerText(t, "ccAliasModelOverridesLabel", "Per-model overrides")}
      </span>
      {entries.map(([modelId, value]) => (
        <div key={modelId} className="flex items-center justify-between gap-3">
          <code className="rounded bg-sidebar px-1.5 py-0.5 font-mono text-xs text-text-muted truncate">
            {modelId}
          </code>
          <TriStateSelect
            t={t}
            value={value}
            disabled={savingModelId === modelId}
            onChange={(v) => onChange(modelId, v)}
            ariaLabel={providerText(t, "ccAliasModelOverrideAriaLabel", "Override for {modelId}", {
              modelId,
            })}
          />
        </div>
      ))}
    </div>
  );
}

function AddOverrideRow({
  t,
  value,
  onValueChange,
  onSubmit,
  disabled,
}: {
  t: ProviderMessageTranslator;
  value: string;
  onValueChange: (next: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <KitInput
        type="text"
        size="sm"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          onSubmit();
        }}
        placeholder={providerText(t, "ccAliasAddModelPlaceholder", "Model id (e.g. gpt-4o)")}
        aria-label={providerText(t, "ccAliasAddModelPlaceholder", "Model id (e.g. gpt-4o)")}
        className="flex-1 text-xs"
      />
      <Button size="sm" variant="outline" onClick={onSubmit} disabled={!value.trim() || disabled}>
        {providerText(t, "ccAliasAddModelButton", "Add override")}
      </Button>
    </div>
  );
}
