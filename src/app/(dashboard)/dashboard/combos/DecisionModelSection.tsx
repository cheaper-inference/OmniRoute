"use client";

import { useEffect, useState } from "react";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Textarea from "@/shared/components/Textarea";
import {
  MAX_DECISION_DESCRIPTIONS,
  MAX_DECISION_DESCRIPTION_CHARS,
  MAX_DECISION_DESCRIPTION_KEY_CHARS,
  decisionDescriptionRows,
  decisionEnvPrefix,
  patchDecisionModelDraft,
  readDecisionModelDraft,
  setDecisionDescription,
  type DecisionModelDraft,
} from "@/lib/combos/decisionModelDraft";
import type { DecisionPreviewResult, DecisionPreviewTest } from "@/lib/combos/decisionPreview";

function getI18nOrFallback(
  t: any,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
) {
  try {
    if (typeof t?.has === "function" && t.has(key)) return t(key, values);
  } catch {
    // Missing ICU values must not unmount the builder step; see BuilderIntelligentStep.
  }
  return fallback;
}

async function postPreview(body: Record<string, unknown>): Promise<DecisionPreviewResult> {
  const response = await fetch("/api/combos/decision-preview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function formatScore(value: number | undefined): string {
  return value === undefined ? "–" : String(Number(value.toFixed(3)));
}

function TestResult({ t, result }: { t: any; result: DecisionPreviewTest }) {
  if (result.status === "skipped" || result.status === "failed") {
    return (
      <p className="mt-2 text-[11px] text-amber-600 dark:text-amber-300">
        {result.status === "failed"
          ? getI18nOrFallback(t, "decisionTestFailed", "Decision request failed:")
          : getI18nOrFallback(t, "decisionTestSkipped", "Not called:")}{" "}
        {result.reason}
      </p>
    );
  }
  const probabilities = Object.entries(result.probabilities ?? {}).sort((a, b) => b[1] - a[1]);
  return (
    <div className="mt-2 rounded border border-black/8 dark:border-white/8 p-2 text-[11px]">
      <p className="text-text-main">
        {result.status === "selected" ? (
          <>
            → <span className="font-mono font-semibold">{result.choice}</span>
          </>
        ) : result.refused ? (
          getI18nOrFallback(t, "decisionTestRefused", "The decision model refused to choose.")
        ) : (
          getI18nOrFallback(
            t,
            "decisionTestUnusable",
            "No usable choice; the router would fall back to rules."
          )
        )}
        <span className="text-text-muted">
          {"  "}confidence {formatScore(result.confidence)} · {result.latencyMs} ms
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

export default function DecisionModelSection({
  t,
  strategy,
  config,
  stepModels,
  onChange,
}: {
  t: any;
  strategy: string;
  config: Record<string, unknown>;
  /** Plain `provider/model` step strings of the combo being edited. */
  stepModels: string[];
  onChange: (decisionModel: DecisionModelDraft | undefined) => void;
}) {
  const draft = readDecisionModelDraft(config);
  const envPrefix = decisionEnvPrefix(strategy);
  const [preview, setPreview] = useState<DecisionPreviewResult | null>(null);
  const [pendingKeys, setPendingKeys] = useState<string[]>([]);
  const [newKey, setNewKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<DecisionPreviewTest | null>(null);
  const [testError, setTestError] = useState(false);
  const modelsKey = stepModels.join("\n");

  // Generated texts (cost rank) are fetched, never stored: prices and the pool change.
  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      postPreview({ strategy, models: modelsKey ? modelsKey.split("\n") : [] })
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
  }, [strategy, modelsKey]);

  const rows = decisionDescriptionRows(preview?.menu ?? [], draft.descriptions, pendingKeys);
  const descriptionCount = Object.keys(draft.descriptions ?? {}).length;
  const update = (patch: Partial<DecisionModelDraft>) =>
    onChange(patchDecisionModelDraft(draft, patch));

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

  const runTest = async () => {
    setTesting(true);
    setTestError(false);
    setTestResult(null);
    try {
      const result = await postPreview({
        strategy,
        models: stepModels,
        decisionModel: draft,
        prompt,
      });
      setTestResult(result.test ?? null);
    } catch {
      setTestError(true);
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card.Section>
      <div>
        <p className="text-xs font-semibold text-text-main">
          {getI18nOrFallback(t, "decisionModelTitle", "Decision model")}
        </p>
        <p className="text-[11px] text-text-muted mt-1">
          {getI18nOrFallback(
            t,
            "decisionModelHint",
            "The decision service picks one model per request from the combo's models. Empty fields fall back to the {envPrefix}_* environment variables.",
            { envPrefix }
          ).replace("{envPrefix}", envPrefix)}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          label={getI18nOrFallback(t, "decisionBaseUrlLabel", "Base URL")}
          type="url"
          maxLength={500}
          value={draft.baseUrl ?? ""}
          placeholder={`${envPrefix}_BASE_URL`}
          onChange={(event) => update({ baseUrl: event.target.value })}
        />
        <Input
          label={getI18nOrFallback(t, "decisionModelLabel", "Decision model")}
          type="text"
          maxLength={200}
          value={draft.model ?? ""}
          placeholder={`${envPrefix}_MODEL`}
          onChange={(event) => update({ model: event.target.value })}
        />
        <Input
          label={getI18nOrFallback(t, "decisionApiKeyLabel", "API key")}
          type="password"
          autoComplete="off"
          maxLength={500}
          value={draft.apiKey ?? ""}
          placeholder={`${envPrefix}_API_KEY`}
          onChange={(event) => update({ apiKey: event.target.value })}
        />
        <Input
          label={getI18nOrFallback(t, "decisionTimeoutLabel", "Timeout (ms)")}
          type="number"
          min="100"
          max="30000"
          step="100"
          value={draft.timeoutMs ?? ""}
          placeholder="2000"
          onChange={(event) =>
            update({ timeoutMs: event.target.value ? Number(event.target.value) : undefined })
          }
        />
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-semibold text-text-main">
            {getI18nOrFallback(t, "decisionDescriptionsLabel", "Model descriptions")}
          </p>
          <span className="text-[10px] text-text-muted">
            {descriptionCount}/{MAX_DECISION_DESCRIPTIONS}
          </span>
        </div>
        <p className="text-[11px] text-text-muted mt-1">
          {getI18nOrFallback(
            t,
            "decisionDescriptionsHint",
            "Tell the decision model what each model is good at. Leave a row empty to send the generated text shown as placeholder."
          )}
        </p>

        <div className="mt-2 flex flex-col gap-2">
          {rows.map(({ key, inMenu }) => (
            <div key={key} className="grid grid-cols-1 md:grid-cols-[minmax(0,14rem)_1fr] gap-2">
              <div className="flex items-center gap-1 min-w-0">
                <span className="truncate font-mono text-[11px] text-text-main" title={key}>
                  {key}
                </span>
                {!inMenu && (
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => removeKey(key)}
                    title={getI18nOrFallback(t, "decisionRemoveDescription", "Remove")}
                    aria-label={getI18nOrFallback(t, "decisionRemoveDescription", "Remove")}
                  >
                    <Icon name="close" size={14} />
                  </Button>
                )}
              </div>
              <Input
                type="text"
                maxLength={MAX_DECISION_DESCRIPTION_CHARS}
                aria-label={key}
                value={draft.descriptions?.[key] ?? ""}
                placeholder={
                  preview?.generated[key] ??
                  getI18nOrFallback(
                    t,
                    "decisionCustomKeyPlaceholder",
                    "Applies when this model ID or provider/model is in the pool"
                  )
                }
                disabled={
                  draft.descriptions?.[key] === undefined &&
                  descriptionCount >= MAX_DECISION_DESCRIPTIONS
                }
                onChange={(event) =>
                  onChange(setDecisionDescription(draft, key, event.target.value))
                }
              />
            </div>
          ))}
          <div className="flex gap-2">
            <Input
              type="text"
              maxLength={MAX_DECISION_DESCRIPTION_KEY_CHARS}
              value={newKey}
              placeholder={getI18nOrFallback(
                t,
                "decisionAddKeyPlaceholder",
                "Add model ID or provider/model"
              )}
              onChange={(event) => setNewKey(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addKey();
                }
              }}
              className="flex-1"
              inputClassName="font-mono"
            />
            <Button size="sm" variant="outline" onClick={addKey} disabled={!newKey.trim()}>
              {getI18nOrFallback(t, "decisionAddKey", "Add")}
            </Button>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-amber-600 dark:text-amber-300">
          {getI18nOrFallback(
            t,
            "decisionDescriptionsPrivacy",
            "Descriptions are sent to the decision service with every routed request. Do not include internal names or secrets."
          )}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold text-text-main">
          {getI18nOrFallback(t, "decisionTestTitle", "Test decision")}
        </p>
        <p className="text-[11px] text-text-muted mt-1">
          {getI18nOrFallback(
            t,
            "decisionTestHint",
            "Sends the prompt and the current (unsaved) settings to the decision service once. This is a real, possibly billed request."
          )}
        </p>
        <div className="mt-2 flex flex-col md:flex-row gap-2">
          <Textarea
            rows={2}
            maxLength={16_000}
            value={prompt}
            placeholder={getI18nOrFallback(t, "decisionTestPlaceholder", "Example prompt")}
            onChange={(event) => setPrompt(event.target.value)}
            className="flex-1"
          />
          <Button
            size="sm"
            onClick={runTest}
            loading={testing}
            disabled={testing || !prompt.trim()}
          >
            {testing
              ? getI18nOrFallback(t, "decisionTestRunning", "Testing…")
              : getI18nOrFallback(t, "decisionTestButton", "Test")}
          </Button>
        </div>
        {testError && (
          <p className="mt-2 text-[11px] text-red-500">
            {getI18nOrFallback(t, "decisionTestError", "The preview request failed.")}
          </p>
        )}
        {testResult && <TestResult t={t} result={testResult} />}
      </div>
    </Card.Section>
  );
}
