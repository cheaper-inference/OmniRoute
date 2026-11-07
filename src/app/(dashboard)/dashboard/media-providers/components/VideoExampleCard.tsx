"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
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

interface Props {
  providerId: string;
}

const ENDPOINT_PATH = "/api/v1/videos/generations";

function extractError(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const err = d.error as Record<string, unknown> | undefined;
  if (err?.message) return String(err.message);
  if (typeof d.message === "string") return d.message;
  return null;
}

function VideoResultRenderer(data: unknown, unsupportedText: string) {
  if (!data || typeof data !== "object") {
    return <pre className="text-xs p-3 text-text-main">{JSON.stringify(data, null, 2)}</pre>;
  }
  const d = data as Record<string, unknown>;
  const items = Array.isArray(d.data) ? (d.data as Array<Record<string, unknown>>) : [];
  const videoUrl =
    items[0] && typeof items[0].url === "string"
      ? items[0].url
      : typeof d.url === "string"
        ? d.url
        : null;
  if (videoUrl) {
    return (
      <div className="p-3">
        <video controls src={videoUrl} className="max-w-full rounded-lg border border-border">
          {unsupportedText}
        </video>
      </div>
    );
  }
  return <pre className="text-xs p-3 text-text-main">{JSON.stringify(data, null, 2)}</pre>;
}

export function VideoExampleCard({ providerId }: Props) {
  const t = useTranslations("miniPlayground");
  const textareaId = useId();
  const { apiKey, keys } = useApiKey();
  const { models } = useProviderModels(providerId);

  const firstModel = models[0]?.id ?? "";
  const [model, setModel] = useState<string>("");
  const [prompt, setPrompt] = useState<string>(() => t("videoSample"));
  const [running, setRunning] = useState<boolean>(false);
  const [result, setResult] = useState<{ data: unknown; latencyMs: number } | undefined>();
  const [error, setError] = useState<string | null>(null);

  const effectiveModel = model || firstModel;
  const buildBody = () => ({ model: effectiveModel, prompt });

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

  const modelOptions = models.length > 0 ? models : [{ id: "wan-2.1-t2v-14b" }];

  return (
    <PlaygroundCard
      kindLabel={t("video")}
      apiEndpoint={ENDPOINT_PATH}
      onRun={handleRun}
      curlSnippet={curlSnippet}
      running={running}
      result={result}
      error={error}
      resultRenderer={(data) => VideoResultRenderer(data, t("browserVideoUnsupported"))}
    >
      {/* Model */}
      <Select
        label={t("model")}
        value={model || firstModel}
        onChange={(e) => setModel(e.target.value)}
        options={modelOptions.map((m) => ({ value: m.id, label: m.id }))}
      />
      {/* Prompt */}
      <Field label={t("prompt")} htmlFor={textareaId}>
        <Textarea
          id={textareaId}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          placeholder={t("videoSample")}
          className="resize-none"
        />
      </Field>
    </PlaygroundCard>
  );
}
