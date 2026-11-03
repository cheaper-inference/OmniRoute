"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  OPENAPI_ENDPOINTS,
  OPENAPI_TAGS,
  OPENAPI_VERSION,
  type OpenApiEndpoint,
} from "../lib/openapi.generated";
import { Field } from "@omniroute/ui-kit/field";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import EmptyState from "@/shared/components/EmptyState";
import Input from "@/shared/components/Input";
import Textarea from "@/shared/components/Textarea";
import { cn } from "@/shared/utils/cn";

// HTTP method → status tone of the Badge adapter (kit badge `data-tone`).
const METHOD_TONES: Record<string, "success" | "info" | "warning" | "error" | "default"> = {
  GET: "success",
  POST: "info",
  PUT: "warning",
  DELETE: "error",
  // Lime-tinted "primary" fails contrast on the dark surface; PATCH reads as the neutral tone.
  PATCH: "default",
};

/**
 * A small map of richer "Try It" example bodies keyed by full path. The
 * generated OpenAPI module exposes every endpoint with its description and
 * summary; only paths in this map get a non-empty default request body when
 * selected. Anything not listed here falls back to the empty placeholder
 * (the user can paste their own body).
 */
const EXAMPLE_BODIES: Record<string, string> = {
  "/api/v1/chat/completions": JSON.stringify(
    {
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: "Hello!" }],
      stream: true,
    },
    null,
    2
  ),
  "/api/v1/embeddings": JSON.stringify(
    { model: "openai/text-embedding-3-small", input: "Hello world" },
    null,
    2
  ),
  "/api/v1/images/generations": JSON.stringify(
    { model: "openai/gpt-image-2", prompt: "A sunset over mountains", n: 1 },
    null,
    2
  ),
  "/api/v1/responses": JSON.stringify(
    { model: "openai/gpt-4o-mini", input: "What is OmniRoute?" },
    null,
    2
  ),
  "/api/v1/messages": JSON.stringify(
    {
      model: "anthropic/claude-3-5-sonnet",
      max_tokens: 1024,
      messages: [{ role: "user", content: "Hi" }],
    },
    null,
    2
  ),
  "/api/v1/messages/count_tokens": JSON.stringify(
    {
      model: "anthropic/claude-3-5-sonnet",
      messages: [{ role: "user", content: "Hi" }],
    },
    null,
    2
  ),
  "/api/v1/moderations": JSON.stringify(
    { model: "openai/omni-moderation-latest", input: "Sample text" },
    null,
    2
  ),
  "/api/v1/rerank": JSON.stringify(
    {
      model: "cohere/rerank-v3.5",
      query: "best ai gateway",
      documents: ["Document 1", "Document 2"],
    },
    null,
    2
  ),
  "/api/v1/audio/transcriptions": "",
  "/api/v1/audio/speech": JSON.stringify(
    { model: "openai/tts-1", input: "Hello world", voice: "alloy" },
    null,
    2
  ),
};

export function ApiExplorerClient() {
  const t = useTranslations("docs");
  const te = useTranslations("endpoint");
  const [selected, setSelected] = useState<OpenApiEndpoint | null>(null);
  const [baseUrl, setBaseUrl] = useState(
    typeof window !== "undefined" ? window.location.origin : "http://localhost:20128"
  );
  const [apiKey, setApiKey] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const filteredEndpoints = useMemo(
    () => (filterTag ? OPENAPI_ENDPOINTS.filter((e) => e.tag === filterTag) : OPENAPI_ENDPOINTS),
    [filterTag]
  );

  const handleSelect = useCallback((endpoint: OpenApiEndpoint) => {
    setSelected(endpoint);
    setResponse(null);
    const example = EXAMPLE_BODIES[endpoint.path] ?? "";
    setRequestBody(example);
  }, []);

  const handleTryIt = async () => {
    if (!selected) return;
    setLoading(true);
    setResponse(null);

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

      const opts: RequestInit = { method: selected.method, headers };
      if (selected.method !== "GET" && requestBody.trim()) {
        opts.body = requestBody;
      }

      // Strip the leading /api so callers can paste `http://localhost:20128`
      // as the base URL without doubling the prefix. The OpenAPI spec uses
      // `/api/v1/...` because that is the Next.js route; the runtime client
      // hits the same path.
      const res = await fetch(`${baseUrl}${selected.path}`, opts);
      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("text/event-stream")) {
        setResponse(t("apiExplorerSseStarted"));
      } else {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      setResponse(
        t("apiExplorerError", {
          message: err instanceof Error ? err.message : te("requestFailed"),
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-72 shrink-0">
        <div className="sticky top-4">
          <div className="mb-3 flex items-center gap-2 text-xs text-text-muted">
            <span>
              {OPENAPI_ENDPOINTS.length} endpoints · OpenAPI v{OPENAPI_VERSION}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            <Button
              size="sm"
              variant={!filterTag ? "secondary" : "ghost"}
              aria-pressed={!filterTag}
              onClick={() => setFilterTag(null)}
            >
              {te("all")}
            </Button>
            {OPENAPI_TAGS.map((tag) => (
              <Button
                key={tag}
                size="sm"
                variant={filterTag === tag ? "secondary" : "ghost"}
                aria-pressed={filterTag === tag}
                onClick={() => setFilterTag(filterTag === tag ? null : tag)}
              >
                {tag}
              </Button>
            ))}
          </div>

          <div className="space-y-1 max-h-96 overflow-y-auto">
            {filteredEndpoints.map((endpoint) => {
              const active =
                selected?.path === endpoint.path && selected?.method === endpoint.method;
              return (
                <Button
                  key={`${endpoint.method}-${endpoint.path}`}
                  variant="ghost"
                  aria-pressed={active}
                  onClick={() => handleSelect(endpoint)}
                  className={cn(
                    "h-auto w-full justify-start px-3 py-2 text-left",
                    active && "bg-bg-subtle"
                  )}
                >
                  <Badge
                    size="sm"
                    variant={METHOD_TONES[endpoint.method] ?? "default"}
                    className="font-mono font-bold"
                  >
                    {endpoint.method}
                  </Badge>
                  <span className="truncate text-text-muted font-mono text-xs">
                    {endpoint.path}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        {selected ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge
                variant={METHOD_TONES[selected.method] ?? "default"}
                className="font-mono font-bold"
              >
                {selected.method}
              </Badge>
              <span className="font-mono text-sm text-text-main">{selected.path}</span>
              {selected.requiresAuth && (
                <Badge size="sm" variant="warning" className="font-mono">
                  {t("apiExplorerAuth")}
                </Badge>
              )}
            </div>
            <p className="text-sm text-text-muted">{selected.summary || selected.description}</p>
            {selected.description && selected.description !== selected.summary && (
              <p className="text-xs text-text-muted whitespace-pre-line">{selected.description}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label={te("baseUrl")}
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
              />
              <Input
                label={te("apiKey")}
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
              />
            </div>

            {selected.method !== "GET" && selected.hasRequestBody && (
              <Field label={te("requestBody")} htmlFor="api-explorer-request-body">
                <Textarea
                  id="api-explorer-request-body"
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  rows={8}
                  className="font-mono"
                />
              </Field>
            )}

            <Button onClick={handleTryIt} loading={loading}>
              {loading ? te("sending") : te("sendRequest")}
            </Button>

            {response !== null && (
              <section aria-labelledby="api-explorer-response">
                <p id="api-explorer-response" className="text-xs text-text-muted mb-1">
                  {t("apiExplorerResponseLabel")}
                </p>
                <pre className="bg-bg-subtle border border-border p-4 rounded-lg overflow-x-auto text-xs font-mono text-text-main max-h-80">
                  {response}
                </pre>
              </section>
            )}
          </div>
        ) : (
          <EmptyState
            icon="api"
            title={t("apiExplorerSelectEndpoint")}
            description={t("apiExplorerChooseApi")}
          />
        )}
      </div>
    </div>
  );
}
