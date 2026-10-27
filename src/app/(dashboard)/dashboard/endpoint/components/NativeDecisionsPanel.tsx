"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import { matchesSearch } from "@/shared/utils/turkishText";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/errorSanitization.ts";
import {
  isSystemOneProvider,
  systemOneRequestLimits,
} from "@omniroute/open-sse/config/systemOneRegistry.ts";
import { projectNativeDecisionResult } from "./nativeDecisionResult";
import {
  buildNativeDecisionBody,
  EMPTY_NATIVE_DECISION_DRAFT,
  type NativeDecisionDraft,
} from "./nativeDecisionDraft";

const keySchema = z.object({
  id: z.string().min(1),
  name: z.string().optional(),
  isActive: z.boolean().optional(),
  isBanned: z.boolean().optional(),
});
const modelSchema = z.object({
  id: z.string().min(1).max(512),
  name: z.string().optional(),
  provider: z.string().optional(),
  owned_by: z.string().optional(),
  root: z.string().optional(),
  tier: z.enum(["free", "paid"]).optional(),
  native_adapter: z.enum(["available", "unavailable", "unknown"]).optional().catch(undefined),
  context_length: z.number().int().positive().nullable().optional().catch(undefined),
  pricing: z
    .object({
      prompt: z.string().regex(/^\d+(?:\.\d+)?$/),
      completion: z.string().regex(/^\d+(?:\.\d+)?$/),
    })
    .optional()
    .catch(undefined),
  supported_endpoints: z.array(z.string()).optional().catch(undefined),
  input_modalities: z.array(z.string()).nullable().optional().catch(undefined),
  output_modalities: z.array(z.string()).nullable().optional().catch(undefined),
  decision_primitives: z.array(z.string()).nullable().optional().catch(undefined),
});
type KeyOption = { id: string; name: string };
type ModelOption = z.infer<typeof modelSchema>;
type Result = { status: number; body: Record<string, unknown> };
function offerLabel(model: ModelOption): string {
  if (model.tier === "free") return "tierFree";
  if (!model.pricing) return "priceAccessUnknown";
  const exactZero = /^0+(?:\.0+)?$/;
  return exactZero.test(model.pricing.prompt) && exactZero.test(model.pricing.completion)
    ? "publishedZeroPrice"
    : "tierPaid";
}
const KEY_HEADER = "x-omniroute-playground-key-id";

/** No raw client or provider keys, persistence, background discovery or automatic inference. */
export default function NativeDecisionsPanel() {
  const t = useTranslations("endpoint.decisions");
  const [keys, setKeys] = useState<KeyOption[]>([]);
  const [keyId, setKeyId] = useState("");
  const [models, setModels] = useState<ModelOption[]>([]);
  const [modelSearch, setModelSearch] = useState("");
  const [draft, setDraft] = useState<NativeDecisionDraft>({ ...EMPTY_NATIVE_DECISION_DRAFT });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const operation = useRef<{ generation: number; controller: AbortController | null }>({
    generation: 0,
    controller: null,
  });

  useEffect(
    () => () => {
      operation.current.generation++;
      operation.current.controller?.abort();
    },
    []
  );
  function invalidate() {
    operation.current.generation++;
    operation.current.controller?.abort();
    operation.current.controller = null;
    setBusy(false);
    setError(null);
    setResult(null);
    setNotice(null);
  }
  function edit(patch: Partial<NativeDecisionDraft>) {
    invalidate();
    setDraft((current) => ({ ...current, ...patch }));
  }
  function changeKey(value: string) {
    invalidate();
    setKeyId(value);
    setModels([]);
    setDraft((current) => ({ ...current, model: "" }));
  }
  async function request(
    path: string,
    init: RequestInit,
    consume: (body: Record<string, unknown>, status: number, headers: Headers) => void
  ) {
    invalidate();
    const generation = operation.current.generation;
    const controller = new AbortController();
    operation.current.controller = controller;
    const timeout = setTimeout(() => controller.abort(), 30000);
    setBusy(true);
    try {
      const response = await fetch(path, {
        ...init,
        credentials: "same-origin",
        signal: controller.signal,
      });
      const reader = response.body?.getReader();
      if (!reader) throw new Error(t("failed"));
      const cancelReader = () => {
        void reader.cancel().catch(() => {});
      };
      controller.signal.addEventListener("abort", cancelReader, { once: true });
      const chunks: Uint8Array[] = [];
      let size = 0;
      try {
        while (true) {
          controller.signal.throwIfAborted();
          const next = await reader.read();
          if (next.done) break;
          size += next.value.byteLength;
          if (size > 2097152) throw new Error(t("failed"));
          chunks.push(next.value);
        }
      } finally {
        controller.signal.removeEventListener("abort", cancelReader);
        cancelReader();
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.length;
      }
      const decoded: unknown = JSON.parse(new TextDecoder().decode(bytes));
      const parsed = z.record(z.string(), z.unknown()).safeParse(decoded);
      if (!parsed.success) throw new Error(t("failed"));
      if (controller.signal.aborted || generation !== operation.current.generation) return;
      if (!response.ok) {
        const nested = parsed.data.error;
        const code =
          nested &&
          typeof nested === "object" &&
          "type" in nested &&
          typeof nested.type === "string"
            ? nested.type
            : "";
        throw new Error(
          `${t("httpStatus", { status: response.status })}: ${code ? `${code}: ` : ""}${extractApiErrorMessage(parsed.data, t("failed"))}`
        );
      }
      consume(parsed.data, response.status, response.headers);
    } catch (cause) {
      if (generation !== operation.current.generation) return;
      if (controller.signal.aborted) setNotice(t("cancelled"));
      else setError(sanitizeErrorMessage(cause) || t("failed"));
    } finally {
      clearTimeout(timeout);
      if (generation === operation.current.generation) {
        operation.current.controller = null;
        setBusy(false);
      }
    }
  }
  function loadKeys() {
    changeKey("");
    setKeys([]);
    void request("/api/keys?limit=100", {}, (body) => {
      const rows = Array.isArray(body.keys) ? body.keys : [];
      const safe = rows.flatMap((row) => {
        const parsed = keySchema.safeParse(row);
        return parsed.success && parsed.data.isActive !== false && parsed.data.isBanned !== true
          ? [{ id: parsed.data.id, name: parsed.data.name || parsed.data.id }]
          : [];
      });
      setKeys(safe);
      if (!safe.length) setNotice(t("noKeys"));
    });
  }
  function loadModels(local = false) {
    if (!keyId) return;
    setModels([]);
    setDraft((current) => ({ ...current, model: "" }));
    void request(
      local ? "/api/v1/models?kind=decision" : "/api/v1/systemone/models",
      { headers: { [KEY_HEADER]: keyId } },
      (body) => {
        const safe = (Array.isArray(body.data) ? body.data.slice(0, 2500) : []).flatMap((row) => {
          const parsed = modelSchema.safeParse(row);
          return parsed.success ? [parsed.data] : [];
        });
        setModels(safe);
        if (!safe.length) setNotice(t("emptyCatalog"));
      }
    );
  }
  function run() {
    const selected = models.find((entry) => entry.id === draft.model);
    if (selected?.native_adapter === "unavailable") {
      setError(t("adapterUnavailable"));
      return;
    }
    const provider = selected?.provider ?? selected?.owned_by;
    const prefix = provider ? `${provider}/` : "";
    const root =
      selected?.root ??
      (prefix && selected?.id.startsWith(prefix) ? selected.id.slice(prefix.length) : null);
    const limits =
      provider && root && isSystemOneProvider(provider)
        ? systemOneRequestLimits(provider, root)
        : undefined;
    const body = buildNativeDecisionBody(draft, limits);
    const supported = selected?.decision_primitives;
    if (!body || !keyId || !selected || (supported && !supported.includes(draft.mode))) {
      setError(t("invalid"));
      return;
    }
    void request(
      "/api/v1/systemone",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", [KEY_HEADER]: keyId },
        body: JSON.stringify(body),
      },
      (data, status, headers) => {
        setResult({ status, body: projectNativeDecisionResult(data, headers) });
      }
    );
  }
  function cancel() {
    invalidate();
    setNotice(t("cancelled"));
  }
  function reset() {
    invalidate();
    setDraft({ ...EMPTY_NATIVE_DECISION_DRAFT });
  }
  const selectedModel = models.find((model) => model.id === draft.model);
  const visibleModels = models.filter(
    (model) =>
      model.id === draft.model ||
      matchesSearch(`${model.id} ${model.name || ""} ${model.provider || ""}`, modelSearch.trim())
  );
  const safeResult = result ? JSON.stringify(result.body, null, 2) : "";
  return (
    <div className="space-y-4">
      <Card title={t("title")}>
        <p className="text-sm text-text-muted">{t("description")}</p>
        <p className="mt-2 text-sm text-text-muted">{t("localCatalogNotice")}</p>
        <p className="mt-2 text-sm text-text-muted">{t("catalogNotice")}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={loadKeys} disabled={busy}>
            {t("loadKeys")}
          </Button>
          <Button variant="secondary" onClick={() => loadModels(true)} disabled={busy || !keyId}>
            {t("loadSavedModels")}
          </Button>
          <Button variant="secondary" onClick={() => loadModels(false)} disabled={busy || !keyId}>
            {t("loadCatalog")}
          </Button>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Select
            name="decision-key"
            label={t("key")}
            value={keyId}
            onChange={(event) => changeKey(event.target.value)}
          >
            <option value="">{t("chooseKey")}</option>
            {keys.map((key) => (
              <option key={key.id} value={key.id}>
                {key.name}
              </option>
            ))}
          </Select>
          <Input
            name="decision-search"
            label={t("searchModels")}
            value={modelSearch}
            maxLength={256}
            onChange={(event) => setModelSearch(event.target.value)}
          />
          <Select
            name="decision-model"
            label={t("model")}
            value={draft.model}
            onChange={(event) => edit({ model: event.target.value })}
          >
            <option value="">{t("chooseModel")}</option>
            {visibleModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name || model.id} — {model.provider || model.id} ({t(offerLabel(model))})
              </option>
            ))}
          </Select>
          <Select
            name="decision-mode"
            label={t("mode")}
            value={draft.mode}
            onChange={(event) => edit({ mode: event.target.value as NativeDecisionDraft["mode"] })}
          >
            <option
              value="noul"
              disabled={
                !!selectedModel?.decision_primitives &&
                !selectedModel.decision_primitives.includes("noul")
              }
            >
              noul
            </option>
            <option
              value="choice"
              disabled={
                !!selectedModel?.decision_primitives &&
                !selectedModel.decision_primitives.includes("choice")
              }
            >
              choice
            </option>
            <option
              value="score"
              disabled={
                !!selectedModel?.decision_primitives &&
                !selectedModel.decision_primitives.includes("score")
              }
            >
              score
            </option>
          </Select>
          <Input
            name="decision-name"
            label={t("questionName")}
            value={draft.name}
            maxLength={128}
            onChange={(event) => edit({ name: event.target.value })}
          />
        </div>
        {selectedModel && (
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-text-muted">{t("adapterStatus")}</dt>
              <dd>
                {selectedModel.native_adapter === "unavailable"
                  ? t("adapterUnavailable")
                  : selectedModel.native_adapter === "available"
                    ? t("adapterRegistered")
                    : t("unknown")}
              </dd>
            </div>
            <div>
              <dt className="text-text-muted">{t("contextLimit")}</dt>
              <dd>{selectedModel.context_length ?? t("unknown")}</dd>
            </div>
            <div>
              <dt className="text-text-muted">{t("price")}</dt>
              <dd>
                {selectedModel.pricing
                  ? `${selectedModel.pricing.prompt} / ${selectedModel.pricing.completion}`
                  : t("unknown")}
              </dd>
            </div>
            <div>
              <dt className="text-text-muted">{t("endpoints")}</dt>
              <dd>{selectedModel.supported_endpoints?.join(", ") || t("unknown")}</dd>
            </div>
            <div>
              <dt className="text-text-muted">{t("inputModalities")}</dt>
              <dd>{selectedModel.input_modalities?.join(", ") || t("unknown")}</dd>
            </div>
            <div>
              <dt className="text-text-muted">{t("outputModalities")}</dt>
              <dd>{selectedModel.output_modalities?.join(", ") || t("unknown")}</dd>
            </div>
            <div>
              <dt className="text-text-muted">{t("primitives")}</dt>
              <dd>{selectedModel.decision_primitives?.join(", ") || t("unknown")}</dd>
            </div>
          </dl>
        )}
        <div className="mt-4 space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block">{t("state")}</span>
            <Textarea
              name="decision-state"
              rows={4}
              maxLength={262144}
              value={draft.state}
              onChange={(event) => edit({ state: event.target.value })}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block">{t("instructions")}</span>
            <Textarea
              name="decision-instructions"
              rows={2}
              maxLength={16384}
              value={draft.instructions}
              onChange={(event) => edit({ instructions: event.target.value })}
            />
          </label>
          {draft.mode === "choice" && (
            <label className="block text-sm">
              <span className="mb-1 block">{t("choices")}</span>
              <Textarea
                name="decision-criteria"
                rows={4}
                maxLength={131072}
                value={draft.criteria}
                onChange={(event) => edit({ criteria: event.target.value })}
              />
            </label>
          )}
          {draft.mode === "score" && (
            <label className="block text-sm">
              <span className="mb-1 block">{t("levels")}</span>
              <Textarea
                name="decision-levels"
                rows={4}
                maxLength={131072}
                value={draft.levels}
                onChange={(event) => edit({ levels: event.target.value })}
              />
            </label>
          )}
        </div>
        <p className="mt-4 text-sm text-text-muted">{t("runNotice")}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            onClick={run}
            disabled={
              busy || !keyId || !draft.model || selectedModel?.native_adapter === "unavailable"
            }
          >
            {t("run")}
          </Button>
          <Button variant="secondary" onClick={cancel} disabled={!busy}>
            {t("cancel")}
          </Button>
          <Button variant="ghost" onClick={reset}>
            {t("reset")}
          </Button>
        </div>
        {busy && (
          <p role="status" className="mt-3 text-sm">
            {t("busy")}
          </p>
        )}
        {error && (
          <p role="alert" className="mt-3 text-sm text-error">
            {t("error")}: {error}
          </p>
        )}
        {notice && (
          <p role="status" className="mt-3 text-sm text-text-muted">
            {notice}
          </p>
        )}
        <p className="mt-3 text-xs text-text-muted">{t("retained")}</p>
      </Card>
      {result && (
        <Card title={t("result")}>
          <p>{t("httpStatus", { status: result.status })}</p>
          <p className="text-sm text-text-muted">{t("unknownCost")}</p>
          <pre className="mt-3 whitespace-pre-wrap break-words text-xs">{safeResult}</pre>
        </Card>
      )}
    </div>
  );
}
