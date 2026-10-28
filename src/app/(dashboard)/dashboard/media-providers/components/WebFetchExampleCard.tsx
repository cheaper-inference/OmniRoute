"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import { useApiKey } from "../../providers/hooks/useApiKey";
import { buildCurl } from "../../providers/utils/buildCurl";
import {
  PLAYGROUND_KEY_ID_HEADER,
  resolvePlaygroundKeyId,
} from "../../providers/utils/playgroundAuth";
import { PlaygroundCard } from "./PlaygroundCard";

interface Props {
  providerId: string;
}

/**
 * NOTE: /api/v1/web/fetch does not exist in the current codebase.
 * This card is included for forward compatibility with Phase 3 (webFetch
 * providers). The Run button will return a 404 error until the endpoint is
 * implemented.
 */
const ENDPOINT_PATH = "/api/v1/web/fetch";

const FORMAT_OPTIONS = ["markdown", "html", "links", "screenshot"] as const;
type FetchFormat = (typeof FORMAT_OPTIONS)[number];

const DEPTH_OPTIONS = [0, 1, 2, 3];

function extractError(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const err = d.error as Record<string, unknown> | undefined;
  if (err?.message) return String(err.message);
  if (typeof d.message === "string") return d.message;
  return null;
}

export function WebFetchExampleCard({ providerId }: Props) {
  const t = useTranslations("miniPlayground");
  const { apiKey, keys } = useApiKey();

  const [url, setUrl] = useState<string>("https://example.com");
  const [format, setFormat] = useState<FetchFormat>("markdown");
  const [depth, setDepth] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [result, setResult] = useState<{ data: unknown; latencyMs: number } | undefined>();
  const [error, setError] = useState<string | null>(null);

  const buildBody = () => ({ url, provider: providerId, format, depth });

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

  return (
    <PlaygroundCard
      kindLabel={t("webFetch")}
      apiEndpoint={ENDPOINT_PATH}
      onRun={handleRun}
      curlSnippet={curlSnippet}
      running={running}
      result={result}
      error={error}
    >
      {/* URL */}
      <Input
        label={t("url")}
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/article"
      />
      {/* Format + Depth row */}
      <div className="grid grid-cols-2 gap-2">
        <Select
          label={t("format")}
          value={format}
          onChange={(e) => setFormat(e.target.value as FetchFormat)}
          options={FORMAT_OPTIONS.map((f) => ({ value: f, label: f }))}
        />
        <Select
          label={t("depth")}
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          options={DEPTH_OPTIONS.map((d) => ({ value: String(d), label: String(d) }))}
        />
      </div>
    </PlaygroundCard>
  );
}
