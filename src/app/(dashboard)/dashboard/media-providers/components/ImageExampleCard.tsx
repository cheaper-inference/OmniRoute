"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import { Field } from "@omniroute/ui-kit/field";
import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";
import { useApiKey } from "../../providers/hooks/useApiKey";
import { useProviderModels } from "../../providers/hooks/useProviderModels";
import { buildCurl } from "../../providers/utils/buildCurl";
import {
  PLAYGROUND_KEY_ID_HEADER,
  resolvePlaygroundKeyId,
} from "../../providers/utils/playgroundAuth";
import { PlaygroundCard } from "./PlaygroundCard";

interface SuggestedHfModel {
  id: string;
  likes?: number;
  downloads?: number;
}

/**
 * useHfSuggestedImageModels — fetch suggested HuggingFace Hub image models
 * via GET /api/v1/providers/suggested-models?type=image. Only meaningful for
 * the `huggingface` provider (the only image-kind entry backed by HF Hub);
 * other providers simply never trigger the fetch.
 */
function useHfSuggestedImageModels(providerId: string): SuggestedHfModel[] {
  // Keep the fetched models tagged with the providerId they were fetched
  // for, and derive the return value below — this avoids ever calling
  // setState synchronously from the effect body (react-hooks/set-state-in-effect)
  // for the "not huggingface" early-return case; switching providers simply
  // stops matching the tag instead of requiring an explicit reset call.
  const [fetched, setFetched] = useState<{ providerId: string; models: SuggestedHfModel[] } | null>(
    null
  );

  useEffect(() => {
    if (providerId !== "huggingface") return;
    let cancelled = false;
    fetch("/api/v1/providers/suggested-models?type=image")
      .then((res) => (res.ok ? (res.json() as Promise<{ data?: SuggestedHfModel[] }>) : null))
      .then((data) => {
        if (cancelled || !data) return;
        setFetched({ providerId, models: Array.isArray(data.data) ? data.data : [] });
      })
      .catch(() => {
        // Best-effort suggestions — the static model list still works.
      });
    return () => {
      cancelled = true;
    };
  }, [providerId]);

  return fetched && fetched.providerId === providerId ? fetched.models : [];
}

interface Props {
  providerId: string;
}

const ENDPOINT_PATH = "/api/v1/images/generations";

const IMAGE_SIZES = ["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"];

function extractError(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const err = d.error as Record<string, unknown> | undefined;
  if (err?.message) return String(err.message);
  if (typeof d.message === "string") return d.message;
  return null;
}

function ImageResultRenderer(data: unknown, altText: string) {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const items = Array.isArray(d.data) ? (d.data as Array<Record<string, unknown>>) : [];
  if (items.length === 0) {
    return <pre className="text-xs p-3 text-text-main">{JSON.stringify(data, null, 2)}</pre>;
  }
  return (
    <div className="flex flex-wrap gap-2 p-3">
      {items.map((item, i) => {
        const url = typeof item.url === "string" ? item.url : null;
        const b64 = typeof item.b64_json === "string" ? item.b64_json : null;
        const src = url ?? (b64 ? `data:image/png;base64,${b64}` : null);
        if (!src) return null;
        return (
          <Image
            key={i}
            src={src}
            alt={`${altText} ${i + 1}`}
            width={200}
            height={200}
            unoptimized
            className="max-w-full rounded-lg border border-border"
            style={{ maxHeight: "200px", objectFit: "contain" }}
          />
        );
      })}
    </div>
  );
}

export function ImageExampleCard({ providerId }: Props) {
  const t = useTranslations("miniPlayground");
  const textareaId = useId();
  const suggestedId = useId();
  const tMedia = useTranslations("media");
  const { apiKey, keys } = useApiKey();
  const { models } = useProviderModels(providerId);
  const suggestedModels = useHfSuggestedImageModels(providerId);

  const firstModel = models[0]?.id ?? "dall-e-3";
  const [model, setModel] = useState<string>("");
  const [prompt, setPrompt] = useState<string>(() => t("imageSample"));
  const [size, setSize] = useState<string>("1024x1024");
  const [running, setRunning] = useState<boolean>(false);
  const [result, setResult] = useState<{ data: unknown; latencyMs: number } | undefined>();
  const [error, setError] = useState<string | null>(null);

  const effectiveModel = model || firstModel;
  const buildBody = () => ({ model: effectiveModel, prompt, size, n: 1 });

  const curlSnippet = buildCurl({
    endpoint:
      (typeof window !== "undefined" ? window.location.origin : "http://localhost:20128") +
      ENDPOINT_PATH,
    headers: {
      Authorization: "Bearer <your-api-key>",
      "Content-Type": "application/json",
    },
    body: buildBody(),
  });

  const handleRun = async () => {
    setRunning(true);
    setError(null);
    setResult(undefined);
    const t0 = performance.now();
    try {
      // Authenticate via the dashboard session cookie — never send the masked
      // apiKey as a Bearer token (it is not a real credential; see #9935).
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "x-connection-id": providerId,
      };
      const playgroundKeyId = resolvePlaygroundKeyId(apiKey, keys);
      if (playgroundKeyId) headers[PLAYGROUND_KEY_ID_HEADER] = playgroundKeyId;
      const res = await fetch(ENDPOINT_PATH, {
        method: "POST",
        credentials: "same-origin",
        headers,
        body: JSON.stringify(buildBody()),
      });
      const data: unknown = await res.json();
      const latencyMs = performance.now() - t0;
      const errMsg = extractError(data);
      if (!res.ok || errMsg) {
        setError(errMsg ?? `HTTP ${res.status}`);
      } else {
        setResult({ data, latencyMs });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("requestFailed"));
    } finally {
      setRunning(false);
    }
  };

  const staticModelOptions = models.length > 0 ? models : [{ id: "dall-e-3" }];
  const knownModelIds = new Set(staticModelOptions.map((m) => m.id));
  const suggestedOnly = suggestedModels.filter((m) => !knownModelIds.has(m.id));
  const modelOptions = [...staticModelOptions, ...suggestedOnly.map((m) => ({ id: m.id }))];

  return (
    <PlaygroundCard
      kindLabel={t("image")}
      apiEndpoint={ENDPOINT_PATH}
      onRun={handleRun}
      curlSnippet={curlSnippet}
      running={running}
      result={result}
      error={error}
      resultRenderer={(data) => ImageResultRenderer(data, tMedia("generatedImageAlt"))}
    >
      {/* Model */}
      <Select
        label={t("model")}
        value={model || firstModel}
        onChange={(e) => setModel(e.target.value)}
        options={modelOptions.map((m) => ({ value: m.id, label: m.id }))}
      />
      {/* Suggested models from HuggingFace Hub (image kind only) */}
      {suggestedOnly.length > 0 && (
        <div role="group" aria-labelledby={suggestedId}>
          <span id={suggestedId} className="block text-xs text-text-muted mb-1">
            {tMedia("suggestedModels")}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {suggestedOnly.map((m) => (
              <Button
                key={m.id}
                size="sm"
                variant={effectiveModel === m.id ? "primary" : "outline"}
                onClick={() => setModel(m.id)}
                aria-pressed={effectiveModel === m.id}
              >
                {m.id}
              </Button>
            ))}
          </div>
        </div>
      )}
      {/* Size */}
      <Select
        label={t("size")}
        value={size}
        onChange={(e) => setSize(e.target.value)}
        options={IMAGE_SIZES.map((s) => ({ value: s, label: s }))}
      />
      {/* Prompt */}
      <Field label={t("prompt")} htmlFor={textareaId}>
        <Textarea
          id={textareaId}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          placeholder={t("imageSample")}
          className="resize-none"
        />
      </Field>
    </PlaygroundCard>
  );
}
