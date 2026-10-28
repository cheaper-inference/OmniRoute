"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
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

const ENDPOINT_PATH = "/api/v1/ocr";
const SAMPLE_DOCUMENT_URL = "https://arxiv.org/pdf/2201.04234";

function extractError(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const err = d.error as Record<string, unknown> | undefined;
  if (err?.message) return String(err.message);
  if (typeof d.message === "string") return d.message;
  return null;
}

export function OcrExampleCard({ providerId }: Props) {
  const t = useTranslations("miniPlayground");
  const { apiKey, keys } = useApiKey();
  const { models } = useProviderModels(providerId);

  const firstModel = models[0]?.id ?? "";
  const [model, setModel] = useState<string>("");
  const [documentUrl, setDocumentUrl] = useState<string>(SAMPLE_DOCUMENT_URL);
  const [running, setRunning] = useState<boolean>(false);
  const [result, setResult] = useState<{ data: unknown; latencyMs: number } | undefined>();
  const [error, setError] = useState<string | null>(null);

  const effectiveModel = model || firstModel;

  const buildBody = () => ({
    model: effectiveModel,
    document: { type: "document_url", document_url: documentUrl },
  });

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

  const modelOptions = models.length > 0 ? models : [{ id: "mistral-ocr-latest" }];

  return (
    <PlaygroundCard
      kindLabel="OCR"
      apiEndpoint={ENDPOINT_PATH}
      onRun={handleRun}
      curlSnippet={curlSnippet}
      running={running}
      result={result}
      error={error}
    >
      {/* Model select */}
      <Select
        label={t("model")}
        value={model || firstModel}
        onChange={(e) => setModel(e.target.value)}
        options={modelOptions.map((m) => ({ value: m.id, label: m.id }))}
      />
      {/* Document URL */}
      <Input
        label={t("documentUrl")}
        type="text"
        value={documentUrl}
        onChange={(e) => setDocumentUrl(e.target.value)}
        placeholder={SAMPLE_DOCUMENT_URL}
      />
    </PlaygroundCard>
  );
}
