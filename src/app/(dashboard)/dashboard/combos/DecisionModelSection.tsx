"use client";

import { useEffect, useState } from "react";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";
import {
  DECISION_DECIDERS,
  MAX_DECISION_DESCRIPTIONS,
  MAX_DECISION_DESCRIPTION_CHARS,
  MAX_DECISION_DESCRIPTION_KEY_CHARS,
  MAX_DECISION_PROMPT_CHARS,
  decisionDescriptionRows,
  patchDecisionDraft,
  readDecisionDraft,
  setDecisionDescription,
  type DecisionDecider,
  type DecisionDraft,
  type DecisionWireOption,
} from "@/lib/combos/decisionModelDraft";
import type { DecisionPreviewResult, DecisionPreviewTest } from "@/lib/combos/decisionPreview";

/** Translate `key` when the message exists; otherwise (or on ICU errors) return `fallback`. */
function getI18nOrFallback(t: any, key: string, fallback: string) {
  try {
    if (typeof t?.has === "function" && t.has(key)) return t(key);
  } catch {
    // A missing ICU value must not unmount the builder step; see BuilderIntelligentStep.
  }
  return fallback;
}

/** POST to `/api/combos/decision-preview`; rejects on any non-2xx status. */
async function postPreview(body: Record<string, unknown>): Promise<DecisionPreviewResult> {
  const response = await fetch("/api/combos/decision-preview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

/** Score rounded to three decimals for display; an en dash when absent. */
function formatScore(value: number | undefined): string {
  return value === undefined ? "–" : String(Number(value.toFixed(3)));
}

const DECIDER_FALLBACK_LABELS: Record<DecisionDecider, string> = {
  systemone: "TypeSafe System One",
  http: "Own decision URL",
  "combo-model": "One of this combo's models",
};

const MODEL_PLACEHOLDERS: Record<DecisionDecider, string> = {
  systemone: "jev-latest",
  http: "decision-model",
  "combo-model": "openai/gpt-4o-mini",
};

function TestResult({ t, result }: { t: any; result: DecisionPreviewTest }) {
  if (result.status !== "selected") {
    return (
      <p className="mt-2 text-xs text-warning">
        {result.status === "failed"
          ? getI18nOrFallback(t, "decisionTestFailed", "Decision request failed:")
          : getI18nOrFallback(t, "decisionTestSkipped", "Not called:")}{" "}
        {result.reason}
        {result.httpStatus ? ` (HTTP ${result.httpStatus})` : ""}
      </p>
    );
  }
  const probabilities = Object.entries(result.probabilities ?? {}).sort((a, b) => b[1] - a[1]);
  return (
    <div className="mt-2 rounded border border-border p-2 text-xs">
      <p className="text-text-main">
        → <span className="font-mono font-semibold">{result.choice}</span>
        <span className="text-text-muted">
          {"  "}
          {getI18nOrFallback(t, "decisionTestConfidence", "confidence")}{" "}
          {formatScore(result.confidence)} · {result.latencyMs} ms
          {result.backendModel ? ` · ${result.backendModel}` : ""}
        </span>
      </p>
      {probabilities.length > 0 && (
        <ul className="mt-1 space-y-0.5 text-text-muted">
          {probabilities.map(([label, probability]) => (
            <li key={label} className="flex justify-between gap-3 font-mono">
              <span className="truncate">{label}</span>
              <span>{formatScore(probability)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
type UpdateDraft = (patch: Partial<DecisionDraft>) => void;

const numberOrUndefined = (value: string) => (value === "" ? undefined : Number(value));

/** `baseUrl` and wire format: only for the `http` decider. */
function DecisionHttpFields({
  t,
  draft,
  update,
}: {
  t: any;
  draft: DecisionDraft;
  update: UpdateDraft;
}) {
  return (
    <>
      <Input
        label={getI18nOrFallback(t, "decisionBaseUrlLabel", "Base URL")}
        type="url"
        maxLength={500}
        value={draft.baseUrl ?? ""}
        placeholder="https://decider.example.com"
        onChange={(event) => update({ baseUrl: event.target.value })}
      />
      <Select
        native
        label={getI18nOrFallback(t, "decisionWireLabel", "Wire format")}
        value={draft.wire ?? "systemone"}
        onChange={(event) => update({ wire: event.target.value as DecisionWireOption })}
        options={[
          { value: "systemone", label: "System One (/v1/systemone)" },
          { value: "openai-chat", label: "OpenAI chat (/v1/chat/completions)" },
        ]}
      />
    </>
  );
}

/** Timeout and minimum confidence. */
function DecisionLimitFields({
  t,
  draft,
  update,
}: {
  t: any;
  draft: DecisionDraft;
  update: UpdateDraft;
}) {
  return (
    <>
      <Input
        label={getI18nOrFallback(t, "decisionTimeoutLabel", "Timeout (ms)")}
        type="number"
        min="100"
        max="5000"
        step="100"
        value={draft.timeoutMs ?? ""}
        placeholder="2000"
        onChange={(event) => update({ timeoutMs: numberOrUndefined(event.target.value) })}
      />
      <Input
        label={getI18nOrFallback(t, "decisionMinConfidenceLabel", "Minimum confidence")}
        type="number"
        min="0"
        max="1"
        step="0.05"
        value={draft.minConfidence ?? ""}
        placeholder="0"
        onChange={(event) => update({ minConfidence: numberOrUndefined(event.target.value) })}
      />
    </>
  );
}

/** Decider, model, endpoint, connection and limits, plus the credential hint. */
function DecisionSettingsFields({
  t,
  draft,
  update,
}: {
  t: any;
  draft: DecisionDraft;
  update: UpdateDraft;
}) {
  const comboModel = draft.decider === "combo-model";
  return (
    <>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <Select
          native
          label={getI18nOrFallback(t, "decisionDeciderLabel", "Decider")}
          value={draft.decider}
          onChange={(event) => update({ decider: event.target.value as DecisionDecider })}
          options={DECISION_DECIDERS.map((decider) => ({
            value: decider,
            label: getI18nOrFallback(
              t,
              `decisionDecider_${decider.replace("-", "_")}`,
              DECIDER_FALLBACK_LABELS[decider]
            ),
          }))}
        />
        <Input
          label={getI18nOrFallback(t, "decisionModelLabel", "Decision model")}
          type="text"
          maxLength={200}
          value={draft.model ?? ""}
          placeholder={MODEL_PLACEHOLDERS[draft.decider]}
          onChange={(event) => update({ model: event.target.value })}
        />
        {draft.decider === "http" && <DecisionHttpFields t={t} draft={draft} update={update} />}
        {!comboModel && (
          <Input
            label={getI18nOrFallback(t, "decisionConnectionLabel", "Connection ID (optional)")}
            type="text"
            maxLength={200}
            value={draft.connectionId ?? ""}
            placeholder="OMNIROUTE_DECISION_API_KEY"
            onChange={(event) => update({ connectionId: event.target.value })}
          />
        )}
        <DecisionLimitFields t={t} draft={draft} update={update} />
      </div>
      <p className="mt-2 text-xs text-text-muted">
        {comboModel
          ? getI18nOrFallback(
              t,
              "decisionComboModelHint",
              "The decision runs in process on one of your provider models (provider/model). Combo names are refused."
            )
          : getI18nOrFallback(
              t,
              "decisionCredentialHint",
              "The key comes from the stored connection with this ID (within the API key's allowed connections) or from the OMNIROUTE_DECISION_API_KEY environment variable. No key is stored in the combo."
            )}
      </p>
    </>
  );
}

/** One description row: the model id (removable when outside the menu) and its text. */
function DescriptionRow({
  t,
  rowKey,
  inMenu,
  draft,
  placeholder,
  full,
  onRemove,
  onChange,
}: {
  t: any;
  rowKey: string;
  inMenu: boolean;
  draft: DecisionDraft;
  placeholder: string;
  full: boolean;
  onRemove: (key: string) => void;
  onChange: (decision: DecisionDraft) => void;
}) {
  const removeLabel = getI18nOrFallback(t, "decisionRemoveDescription", "Remove");
  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,14rem)_1fr] gap-2">
      <div className="flex items-center gap-1 min-w-0">
        <span className="truncate font-mono text-xs text-text-main" title={rowKey}>
          {rowKey}
        </span>
        {!inMenu && (
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => onRemove(rowKey)}
            title={removeLabel}
            aria-label={removeLabel}
          >
            <Icon name="close" size={14} />
          </Button>
        )}
      </div>
      <Input
        type="text"
        maxLength={MAX_DECISION_DESCRIPTION_CHARS}
        aria-label={rowKey}
        value={draft.descriptions?.[rowKey] ?? ""}
        placeholder={placeholder}
        disabled={draft.descriptions?.[rowKey] === undefined && full}
        onChange={(event) => onChange(setDecisionDescription(draft, rowKey, event.target.value))}
      />
    </div>
  );
}

/** Input + button that add a description row for a model id outside the menu. */
function AddDescriptionKey({
  t,
  value,
  onValue,
  onAdd,
}: {
  t: any;
  value: string;
  onValue: (value: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="flex gap-2">
      <Input
        type="text"
        maxLength={MAX_DECISION_DESCRIPTION_KEY_CHARS}
        value={value}
        placeholder={getI18nOrFallback(
          t,
          "decisionAddKeyPlaceholder",
          "Add model ID or provider/model"
        )}
        onChange={(event) => onValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onAdd();
          }
        }}
        className="flex-1"
        inputClassName="font-mono"
      />
      <Button size="sm" variant="outline" onClick={onAdd} disabled={!value.trim()}>
        {getI18nOrFallback(t, "decisionAddKey", "Add")}
      </Button>
    </div>
  );
}

/** Per-model descriptions; generated cost-rank text is the placeholder, only typed text is stored. */
function DecisionDescriptions({
  t,
  draft,
  preview,
  onChange,
}: {
  t: any;
  draft: DecisionDraft;
  preview: DecisionPreviewResult | null;
  onChange: (decision: DecisionDraft) => void;
}) {
  const [pendingKeys, setPendingKeys] = useState<string[]>([]);
  const [newKey, setNewKey] = useState("");
  const rows = decisionDescriptionRows(preview?.menu ?? [], draft.descriptions, pendingKeys);
  const descriptionCount = Object.keys(draft.descriptions ?? {}).length;
  const addKey = () => {
    const key = newKey.trim();
    if (!key || rows.some((row) => row.key === key)) return;
    setPendingKeys((keys) => [...keys, key]);
    setNewKey("");
  };
  const removeKey = (key: string) => {
    setPendingKeys((keys) => keys.filter((entry) => entry !== key));
    onChange(setDecisionDescription(draft, key, ""));
  };

  return (
    <div className="mt-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-semibold text-text-main">
          {getI18nOrFallback(t, "decisionDescriptionsLabel", "Model descriptions")}
        </p>
        <span className="text-xs text-text-muted">
          {descriptionCount}/{MAX_DECISION_DESCRIPTIONS}
        </span>
      </div>
      <p className="text-xs text-text-muted mt-1">
        {getI18nOrFallback(
          t,
          "decisionDescriptionsHint",
          "Tell the decider what each model is good at. Leave a row empty to send the generated text shown as placeholder."
        )}
      </p>
      <div className="mt-2 flex flex-col gap-2">
        {rows.map(({ key, inMenu }) => (
          <DescriptionRow
            key={key}
            t={t}
            rowKey={key}
            inMenu={inMenu}
            draft={draft}
            placeholder={preview?.generated[key] ?? `Model ${key}`}
            full={descriptionCount >= MAX_DECISION_DESCRIPTIONS}
            onRemove={removeKey}
            onChange={onChange}
          />
        ))}
        <AddDescriptionKey t={t} value={newKey} onValue={setNewKey} onAdd={addKey} />
      </div>
      <p className="mt-2 text-xs text-warning">
        {getI18nOrFallback(
          t,
          "decisionPrivacyNote",
          "Each routed request sends its last user message (up to 8000 characters) and these descriptions to the decider. Do not put internal names or secrets in descriptions."
        )}
      </p>
    </div>
  );
}

/** One-off live test with the unsaved settings, through the preview route. */
function DecisionTestPanel({
  t,
  draft,
  stepModels,
}: {
  t: any;
  draft: DecisionDraft;
  stepModels: string[];
}) {
  const [prompt, setPrompt] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<DecisionPreviewTest | null>(null);
  const [testError, setTestError] = useState(false);
  const runTest = async () => {
    setTesting(true);
    setTestError(false);
    setTestResult(null);
    try {
      const result = await postPreview({ models: stepModels, decision: draft, prompt });
      setTestResult(result.test ?? null);
    } catch {
      setTestError(true);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="mt-4">
      <p className="text-xs font-semibold text-text-main">
        {getI18nOrFallback(t, "decisionTestTitle", "Test decision")}
      </p>
      <p className="text-xs text-text-muted mt-1">
        {getI18nOrFallback(
          t,
          "decisionTestHint",
          "Sends the prompt and the current (unsaved) settings to the decider once. This is a real, possibly billed request."
        )}
      </p>
      <div className="mt-2 flex flex-col md:flex-row gap-2">
        <Textarea
          rows={2}
          maxLength={MAX_DECISION_PROMPT_CHARS}
          value={prompt}
          placeholder={getI18nOrFallback(t, "decisionTestPlaceholder", "Example prompt")}
          onChange={(event) => setPrompt(event.target.value)}
          className="flex-1"
        />
        <Button size="sm" onClick={runTest} loading={testing} disabled={testing || !prompt.trim()}>
          {getI18nOrFallback(t, "decisionTestButton", "Test")}
        </Button>
      </div>
      {testError && (
        <p className="mt-2 text-xs text-error">
          {getI18nOrFallback(t, "decisionTestError", "The preview request failed.")}
        </p>
      )}
      {testResult && <TestResult t={t} result={testResult} />}
    </div>
  );
}

/** Generated menu texts (cost rank), fetched after a short debounce and never stored. */
function useDecisionPreview(stepModels: string[]): DecisionPreviewResult | null {
  const [preview, setPreview] = useState<DecisionPreviewResult | null>(null);
  const modelsKey = stepModels.join("\n");
  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      postPreview({ models: modelsKey ? modelsKey.split("\n") : [] })
        .then((result) => {
          if (!cancelled) setPreview(result);
        })
        .catch(() => {
          if (!cancelled) setPreview(null);
        });
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [modelsKey]);
  return preview;
}

/**
 * Combo-builder section for the `decision` router: decider, endpoint, model, connection,
 * limits, per-model descriptions and a one-off live test. Stored as `config.decision`.
 */
export default function DecisionModelSection({
  t,
  config,
  stepModels,
  onChange,
}: {
  t: any;
  config: Record<string, unknown>;
  /** Plain `provider/model` step strings of the combo being edited. */
  stepModels: string[];
  onChange: (decision: DecisionDraft) => void;
}) {
  const draft = readDecisionDraft(config);
  const preview = useDecisionPreview(stepModels);
  const update: UpdateDraft = (patch) => onChange(patchDecisionDraft(draft, patch));

  return (
    <Card.Section>
      <div>
        <p className="text-xs font-semibold text-text-main">
          {getI18nOrFallback(t, "decisionRouterTitle", "Decision router")}
        </p>
        <p className="text-xs text-text-muted mt-1">
          {getI18nOrFallback(
            t,
            "decisionRouterHint",
            "A decider picks one model per request from this combo's models; Rules then picks the account. Requires the COMBO_DECISION_ROUTER_ENABLED feature flag: while it is off, or on any failure, the combo routes with Rules."
          )}
        </p>
      </div>
      <DecisionSettingsFields t={t} draft={draft} update={update} />
      <DecisionDescriptions t={t} draft={draft} preview={preview} onChange={onChange} />
      <DecisionTestPanel t={t} draft={draft} stepModels={stepModels} />
    </Card.Section>
  );
}
