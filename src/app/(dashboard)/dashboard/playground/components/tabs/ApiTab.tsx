"use client";

import Icon from "@/shared/components/Icon";

// src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx
// D14: Preserves 100% of the original page.tsx Monaco multi-endpoint editor.
// Content migrated from src/app/(dashboard)/dashboard/playground/page.tsx (889 LOC).
// Zero logic changes — just moved into this tab component.

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
// Barrel import kept on purpose: tests/unit/ui/playground-api-tab.test.tsx mocks "@/shared/components".
import { Card, Button, Select, Badge } from "@/shared/components";
import Input from "@/shared/components/Input";
import { ALIAS_TO_ID } from "@/shared/constants/providers";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import dynamic from "next/dynamic";
import {
  PLAYGROUND_IMAGE_STREAM_HEADER,
  restorePlaygroundImageResponse,
} from "@/shared/utils/playgroundImageStream";
import ImageResultsInline, {
  extractPlaygroundImageResults,
  type PlaygroundImageResult,
} from "../ImageResultsInline";

// Monaco editor lazy-loaded (ssr: false) to avoid SSR issues (F10 requirement)
const Editor = dynamic(() => import("@/shared/components/MonacoEditor"), { ssr: false });

interface ModelInfo {
  id: string;
  object: string;
  owned_by: string;
}

interface ProviderOption {
  value: string;
  label: string;
}

interface ConnectionOption {
  id: string;
  name: string;
  email?: string;
  provider: string;
  authType: string;
}

const DEFAULT_BODIES: Record<string, object> = {
  chat: {
    model: "",
    messages: [{ role: "user", content: "Hello! Say hi in one sentence." }],
    max_tokens: 100,
    stream: false,
  },
  responses: {
    model: "",
    input: "Hello! Say hi in one sentence.",
    stream: false,
  },
  images: {
    model: "",
    prompt: "A beautiful sunset over mountains",
    n: 1,
    size: "1024x1024",
  },
  embeddings: {
    model: "",
    input: "Hello world",
    encoding_format: "float",
  },
  speech: {
    model: "openai/tts-1",
    input: "Hello, this is a test of the text-to-speech endpoint.",
    voice: "alloy",
    response_format: "mp3",
  },
  transcription: {
    model: "deepgram/nova-3",
    language: "en",
  },
  video: {
    model: "comfyui/animatediff",
    prompt: "A timelapse of a sunset over the ocean",
    n: 1,
  },
  music: {
    model: "comfyui/stable-audio",
    prompt: "Calm ambient piano music with soft reverb",
    duration: 10,
  },
  rerank: {
    model: "cohere/rerank-english-v3.0",
    query: "What is the capital of France?",
    documents: [
      "Paris is the capital of France.",
      "London is the capital of England.",
      "Berlin is the capital of Germany.",
    ],
    top_n: 2,
  },
  search: {
    query: "latest AI developments",
    max_results: 5,
    search_type: "web",
  },
};

const ENDPOINT_PATHS: Record<string, string> = {
  chat: "/v1/chat/completions",
  responses: "/v1/responses",
  images: "/v1/images/generations",
  embeddings: "/v1/embeddings",
  speech: "/v1/audio/speech",
  transcription: "/v1/audio/transcriptions",
  video: "/v1/videos/generations",
  music: "/v1/music/generations",
  rerank: "/v1/rerank",
  search: "/v1/search",
};

const VISION_MODELS = [
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-4-turbo",
  "gpt-4-vision",
  "claude-3",
  "claude-sonnet",
  "claude-opus",
  "claude-haiku",
  "gemini",
  "llava",
  "bakllava",
  "pixtral",
  "qwen-vl",
  "qvq",
  "mistral-pixtral",
  "kimi",
];

function isVisionModel(modelId: string): boolean {
  const lower = modelId.toLowerCase();
  return VISION_MODELS.some((k) => lower.includes(k));
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

interface ApiTabProps {
  // configState is received but ApiTab manages its own JSON state (D14)
  configState?: unknown;
}

/**
 * ApiTab — D14: Preserves 100% of the Monaco multi-endpoint editor.
 * Receives configState prop but manages its own internal JSON state
 * (the raw API tab has its own raw JSON editor, independent of the config pane).
 */
export default function ApiTab(_props: ApiTabProps) {
  const t = useTranslations("playground");

  const endpointOptions = useMemo(
    () => [
      { value: "chat", label: t("endpointOptions.chat") },
      { value: "responses", label: t("endpointOptions.responses") },
      { value: "images", label: t("endpointOptions.images") },
      { value: "embeddings", label: t("endpointOptions.embeddings") },
      { value: "speech", label: t("endpointOptions.speech") },
      { value: "transcription", label: t("endpointOptions.transcription") },
      { value: "video", label: t("endpointOptions.video") },
      { value: "music", label: t("endpointOptions.music") },
      { value: "rerank", label: t("endpointOptions.rerank") },
      { value: "search", label: t("endpointOptions.search") },
    ],
    [t]
  );

  const [models, setModels] = useState<ModelInfo[]>([]);
  const [providers, setProviders] = useState<ProviderOption[]>([]);
  const [allConnections, setAllConnections] = useState<ConnectionOption[]>([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedConnection, setSelectedConnection] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState("chat");
  const [requestBody, setRequestBody] = useState("");
  const [responseBody, setResponseBody] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [imageData, setImageData] = useState<PlaygroundImageResult[] | null>(null);
  const [transcriptionText, setTranscriptionText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseDuration, setResponseDuration] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const isSearchEndpoint = selectedEndpoint === "search";
  const isTranscriptionEndpoint = selectedEndpoint === "transcription";
  const isChatEndpoint = selectedEndpoint === "chat";
  const isImageEndpoint = selectedEndpoint === "images";
  const supportsVision = isChatEndpoint && isVisionModel(selectedModel);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const providerConnections = allConnections.filter((c) => {
    if (!selectedProvider) return false;
    const resolvedProvider = ALIAS_TO_ID[selectedProvider] || selectedProvider;
    return c.provider === resolvedProvider || c.provider === selectedProvider;
  });

  useEffect(() => {
    fetch("/v1/models")
      .then((res) => res.json())
      .then((data: { data?: ModelInfo[] }) => {
        const modelList = (data?.data || []) as ModelInfo[];
        setModels(modelList);

        const providerSet = new Set<string>();
        modelList.forEach((m) => {
          if (typeof m?.id !== "string") return;
          const parts = m.id.split("/");
          if (parts.length >= 2) providerSet.add(parts[0]);
        });
        const providerOpts = Array.from(providerSet)
          .sort()
          .map((p) => ({ value: p, label: p }));
        setProviders(providerOpts);
        if (providerOpts.length > 0) {
          setSelectedProvider(providerOpts[0].value);
        }
      })
      .catch((err: unknown) => {
        console.error("[ApiTab] Failed to load models:", err);
      });

    fetch("/api/providers/client")
      .then((res) => res.json())
      .then((data: { connections?: ConnectionOption[] }) => {
        const conns: ConnectionOption[] = [];
        for (const conn of data?.connections || []) {
          conns.push({
            id: conn.id,
            name: conn.name || conn.id,
            email: conn.email,
            provider: conn.provider,
            authType: conn.authType || "apiKey",
          });
        }
        setAllConnections(conns);
      })
      .catch(() => {});
  }, []);

  const filteredModels = (() => {
    const seen = new Set<string>();
    const out: Array<{ value: string; label: string }> = [];
    for (const m of models) {
      if (typeof m?.id !== "string") continue;
      if (selectedProvider && !m.id.startsWith(selectedProvider + "/")) continue;
      if (seen.has(m.id)) continue;
      seen.add(m.id);
      out.push({ value: m.id, label: m.id });
    }
    return out;
  })();

  const generateDefaultBody = (endpoint: string, model: string) => {
    const template = { ...DEFAULT_BODIES[endpoint] };
    if ("model" in template) {
      (template as Record<string, unknown>).model = model;
    }
    return JSON.stringify(template, null, 2);
  };

  const handleProviderChange = (newProvider: string) => {
    setSelectedProvider(newProvider);
    setSelectedConnection("");
    const providerModels = models
      .filter(
        (m) => typeof m?.id === "string" && (!newProvider || m.id.startsWith(newProvider + "/"))
      )
      .map((m) => m.id);
    const firstModel = providerModels[0] || "";
    setSelectedModel(firstModel);
    setRequestBody(generateDefaultBody(selectedEndpoint, firstModel));
    clearResults();
  };

  const handleModelChange = (newModel: string) => {
    setSelectedModel(newModel);
    setRequestBody(generateDefaultBody(selectedEndpoint, newModel));
    clearResults();
  };

  const handleEndpointChange = (newEndpoint: string) => {
    setSelectedEndpoint(newEndpoint);
    setRequestBody(generateDefaultBody(newEndpoint, selectedModel));
    setUploadedFile(null);
    setUploadedImages([]);
    clearResults();
  };

  const clearResults = useCallback(() => {
    setResponseBody("");
    setResponseStatus(null);
    setResponseDuration(null);
    setAudioUrl(null);
    setImageData(null);
    setTranscriptionText(null);
  }, []);

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setUploadedFile(file);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const base64s = await Promise.all(files.map(fileToBase64));
    setUploadedImages((prev) => [...prev, ...base64s].slice(0, 4));
  };

  const buildChatBodyWithImages = (
    parsed: Record<string, unknown>,
    imageBase64s: string[]
  ): Record<string, unknown> => {
    if (!imageBase64s.length) return parsed;
    const messages = [...((parsed.messages as Array<Record<string, unknown>>) || [])];
    if (messages.length === 0) return parsed;
    const lastMsg = messages[messages.length - 1];
    const currentContent = typeof lastMsg.content === "string" ? lastMsg.content : "";
    messages[messages.length - 1] = {
      ...lastMsg,
      content: [
        { type: "text", text: currentContent },
        ...imageBase64s.map((b64) => ({
          type: "image_url",
          image_url: { url: b64 },
        })),
      ],
    };
    return { ...parsed, messages };
  };

  const handleSend = useCallback(async () => {
    if (!requestBody.trim() && !isTranscriptionEndpoint) return;
    setLoading(true);
    clearResults();

    const controller = new AbortController();
    abortRef.current = controller;
    const startTime = Date.now();

    try {
      const path = ENDPOINT_PATHS[selectedEndpoint];
      let res: Response;

      if (isTranscriptionEndpoint) {
        const form = new FormData();
        if (uploadedFile) {
          form.append("file", uploadedFile);
        }
        try {
          const extra = JSON.parse(requestBody || "{}") as Record<string, unknown>;
          for (const [k, v] of Object.entries(extra)) {
            if (k !== "file") form.append(k, String(v));
          }
        } catch {
          /* ignore parse errors */
        }
        const fetchHeaders: Record<string, string> = {};
        if (selectedConnection) {
          fetchHeaders["X-OmniRoute-Connection"] = selectedConnection;
        }
        res = await fetch(`/api${path}`, {
          method: "POST",
          headers: fetchHeaders,
          body: form,
          signal: controller.signal,
        });
      } else {
        let parsed = JSON.parse(requestBody) as Record<string, unknown>;
        if (supportsVision && uploadedImages.length > 0) {
          parsed = buildChatBodyWithImages(parsed, uploadedImages);
        }
        const fetchHeaders: Record<string, string> = { "Content-Type": "application/json" };
        if (selectedConnection) {
          fetchHeaders["X-OmniRoute-Connection"] = selectedConnection;
        }
        if (isImageEndpoint) fetchHeaders[PLAYGROUND_IMAGE_STREAM_HEADER] = "1";
        res = await fetch(`/api${path}`, {
          method: "POST",
          headers: fetchHeaders,
          body: JSON.stringify(parsed),
          signal: controller.signal,
        });
      }

      if (isImageEndpoint) {
        res = await restorePlaygroundImageResponse(res, controller.signal);
      }

      setResponseStatus(res.status);
      setResponseDuration(Date.now() - startTime);

      const contentType = res.headers.get("content-type") || "";
      if (contentType.startsWith("audio/")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setResponseBody(`// Audio response (${contentType})\n// Click play below to listen.`);
      } else if (contentType.includes("text/event-stream")) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            accumulated += decoder.decode(value, { stream: true });
            setResponseBody(accumulated);
          }
        }
      } else {
        const data = (await res.json()) as Record<string, unknown>;
        setResponseBody(JSON.stringify(data, null, 2));
        if (isImageEndpoint && res.ok) {
          const images = extractPlaygroundImageResults(data);
          if (images.length > 0) setImageData(images);
        }
        if (isTranscriptionEndpoint && typeof (data as { text?: string })?.text === "string") {
          setTranscriptionText(
            (data as { text?: string }).text || "(empty result — check provider credentials)"
          );
        }
      }
    } catch (err: unknown) {
      const e = err as { name?: string; message?: string };
      if (e.name === "AbortError") {
        setResponseBody(JSON.stringify({ cancelled: true }, null, 2));
      } else {
        setResponseBody(JSON.stringify({ error: e.message }, null, 2));
      }
      setResponseDuration(Date.now() - startTime);
    }
    setLoading(false);
  }, [
    requestBody,
    isTranscriptionEndpoint,
    selectedEndpoint,
    uploadedFile,
    selectedConnection,
    supportsVision,
    uploadedImages,
    isImageEndpoint,
    clearResults,
  ]);

  const handleCancel = () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* silent */
    }
  };

  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);

  return (
    <div className="space-y-5 p-4 overflow-y-auto">
      {/* Info Banner */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 text-sm text-text-muted">
        <Icon name="science" size={20} className="text-primary mt-0.5" />
        <div>
          <p className="font-medium text-text-main mb-0.5">{t("title")}</p>
          <p>{t("description")}</p>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <div className="p-4 flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-1 w-full">
            <Select
              label={t("endpoint")}
              value={selectedEndpoint}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleEndpointChange(e.target.value)
              }
              options={endpointOptions}
              className="w-full"
            />
          </div>

          {!isSearchEndpoint && (
            <div className="flex-1 w-full">
              <Select
                label={t("provider")}
                value={selectedProvider}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleProviderChange(e.target.value)
                }
                options={providers}
                className="w-full"
              />
            </div>
          )}

          {!isSearchEndpoint && (
            <div className="flex-1 w-full">
              <Select
                label={t("model")}
                value={selectedModel}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleModelChange(e.target.value)
                }
                options={filteredModels}
                className="w-full"
              />
            </div>
          )}

          {!isSearchEndpoint && (
            <div className="flex-1 w-full">
              <Select
                label={t("accountKey")}
                value={selectedConnection}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedConnection(e.target.value)
                }
                options={[
                  {
                    value: "",
                    label:
                      providerConnections.length > 0
                        ? t("autoAccounts", { count: providerConnections.length })
                        : t("noAccounts"),
                  },
                  ...providerConnections.map((c) => ({
                    value: c.id,
                    label: pickDisplayValue([c.name, c.email], emailsVisible, c.id),
                  })),
                ]}
                className="w-full"
              />
            </div>
          )}

          {!isSearchEndpoint && (
            <div className="shrink-0">
              {loading ? (
                <Button icon="stop" variant="secondary" onClick={handleCancel}>
                  {t("cancel")}
                </Button>
              ) : (
                <Button
                  icon="send"
                  onClick={() => void handleSend()}
                  disabled={
                    (!requestBody.trim() && !isTranscriptionEndpoint) ||
                    (!selectedModel && !isTranscriptionEndpoint)
                  }
                >
                  {t("send")}
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* File Upload Zone */}
      {(isTranscriptionEndpoint || supportsVision) && (
        <Card>
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Icon name="attach_file" size={18} className="text-text-muted" />
              <h3 className="text-sm font-semibold text-text-main">
                {isTranscriptionEndpoint ? t("audioFile") : t("attachImages")}
              </h3>
              {isTranscriptionEndpoint && (
                <Badge variant="info" size="sm">
                  {t("multipartFormData")}
                </Badge>
              )}
              {supportsVision && (
                <Badge variant="info" size="sm">
                  {t("upToImages")}
                </Badge>
              )}
            </div>
            {isTranscriptionEndpoint && (
              <div>
                <Input
                  type="file"
                  accept="audio/*,video/*"
                  onChange={handleAudioFileChange}
                  aria-label={t("audioFile")}
                  inputClassName="text-sm file:mr-3 file:rounded file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:text-sm"
                />
                {uploadedFile && (
                  <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                    <Icon name="check_circle" size={12} className="text-success" />
                    {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(0)} KB)
                  </p>
                )}
                {!uploadedFile && (
                  <p className="text-xs text-warning mt-1 flex items-center gap-1">
                    <Icon name="info" size={12} />
                    {t("selectAudioFile")}
                  </p>
                )}
              </div>
            )}
            {supportsVision && (
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => void handleImageFileChange(e)}
                  aria-label={t("attachImages")}
                  inputClassName="text-sm file:mr-3 file:rounded file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:text-sm"
                />
                {uploadedImages.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {uploadedImages.map((src, i) => (
                      <div
                        key={i}
                        className="relative group size-16 rounded overflow-hidden border border-border"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`Attached ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setUploadedImages((prev) => prev.filter((_, idx) => idx !== i))
                          }
                          className="absolute inset-0 size-full rounded-none bg-bg/70 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                          aria-label={`${t("clearAll")} ${i + 1}`}
                          icon="close"
                        />
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedImages([])}
                      className="self-center ml-1 text-xs text-text-muted hover:text-error"
                    >
                      {t("clearAll")}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Split Editor View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="upload" size={18} className="text-text-muted" />
                <h3 className="text-sm font-semibold text-text-main">{t("request")}</h3>
                <Badge variant="info" size="sm">
                  POST {ENDPOINT_PATHS[selectedEndpoint]}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => void handleCopy(requestBody)}
                  className="text-text-muted"
                  title={t("copy")}
                  aria-label={t("copy")}
                  icon="content_copy"
                />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => {
                    const template = { ...DEFAULT_BODIES[selectedEndpoint] };
                    if ("model" in template)
                      (template as Record<string, unknown>).model = selectedModel;
                    setRequestBody(JSON.stringify(template, null, 2));
                  }}
                  className="text-text-muted"
                  title={t("resetToDefault")}
                  aria-label={t("resetToDefault")}
                  icon="restart_alt"
                />
              </div>
            </div>
            {isTranscriptionEndpoint && (
              <p className="text-xs text-text-muted bg-warning/10 border border-warning/20 rounded px-2 py-1.5 flex items-start gap-1">
                <Icon name="info" size={12} className="text-warning mt-0.5" />
                {t("transcriptionHint")}
              </p>
            )}
            <div className="border border-border rounded-lg overflow-hidden">
              <Editor
                height="400px"
                defaultLanguage="json"
                value={requestBody}
                onChange={(value: string | undefined) => setRequestBody(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 12,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  automaticLayout: true,
                  formatOnPaste: true,
                }}
              />
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="download" size={18} className="text-text-muted" />
                <h3 className="text-sm font-semibold text-text-main">{t("response")}</h3>
                {responseStatus !== null && (
                  <Badge
                    variant={responseStatus >= 200 && responseStatus < 300 ? "success" : "error"}
                    size="sm"
                  >
                    {responseStatus}
                  </Badge>
                )}
                {responseDuration !== null && (
                  <span className="text-xs text-text-muted">{responseDuration}ms</span>
                )}
                {loading && (
                  <Icon name="progress_activity" size={14} className="text-primary animate-spin" />
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => void handleCopy(responseBody)}
                  className="text-text-muted"
                  title={t("copy")}
                  aria-label={t("copy")}
                  icon="content_copy"
                />
              </div>
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              {audioUrl ? (
                <div className="p-4 space-y-3">
                  <audio controls src={audioUrl} className="w-full rounded-lg" autoPlay />
                  <a
                    href={audioUrl}
                    download="speech.mp3"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Icon name="download" size={16} />
                    {t("downloadAudio")}
                  </a>
                </div>
              ) : imageData ? (
                <ImageResultsInline images={imageData} />
              ) : transcriptionText !== null ? (
                <div className="p-4 space-y-2">
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wider">
                    {t("transcription")}
                  </p>
                  <div className="bg-surface/50 rounded p-3 text-sm text-text-main leading-relaxed whitespace-pre-wrap">
                    {transcriptionText}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="content_copy"
                    onClick={() => void handleCopy(transcriptionText)}
                    className="text-xs"
                  >
                    {t("copyText")}
                  </Button>
                </div>
              ) : (
                <Editor
                  height="400px"
                  defaultLanguage="json"
                  value={responseBody}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 12,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    automaticLayout: true,
                    readOnly: true,
                  }}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
