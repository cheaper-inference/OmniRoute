"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card } from "@/shared/components";

type RecordValue = Record<string, unknown>;
type Model = { endpoint_id: string; metadata?: { display_name?: string; category?: string } };
type Definition = Model & {
  capabilities: {
    inputs: Record<string, RecordValue>;
    transports: Record<string, boolean>;
    reasoning: RecordValue;
    required: string[];
  };
};

async function readResponse(response: Response) {
  const value = await response.json();
  if (!response.ok)
    throw new Error(
      typeof value.error?.message === "string" ? value.error.message : `HTTP ${response.status}`
    );
  return value;
}

export default function FalNativePanel({ connectionId }: { connectionId: string | null }) {
  const t = useTranslations("falNative");
  const common = useTranslations("common");
  const jsonText = useTranslations("playground");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [models, setModels] = useState<Model[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [endpoint, setEndpoint] = useState("");
  const [definition, setDefinition] = useState<Definition | null>(null);
  const [input, setInput] = useState("{}");
  const [schema, setSchema] = useState("{}");
  const [transport, setTransport] = useState("queue");
  const [jobId, setJobId] = useState("");
  const [result, setResult] = useState<RecordValue | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);

  async function action(task: () => Promise<void>) {
    setBusy(true);
    setError("");
    try {
      await task();
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : common("error"));
    } finally {
      setBusy(false);
    }
  }

  const managementUrl = `/api/providers/${encodeURIComponent(connectionId ?? "")}/fal`;
  async function search(next = false) {
    const params = new URLSearchParams({ q: query, category, limit: "30" });
    if (next && cursor) params.set("cursor", cursor);
    const page = await readResponse(await fetch(`${managementUrl}?${params}`));
    setModels((current) => (next ? [...current, ...page.models] : page.models));
    setCursor(page.has_more ? page.next_cursor : null);
  }
  async function load(refresh = false) {
    const params = new URLSearchParams({ endpoint_id: endpoint, refresh: String(refresh) });
    const value = await readResponse(await fetch(`${managementUrl}?${params}`));
    setDefinition(value);
    const available = Object.entries(value.capabilities.transports)
      .filter(([, supported]) => supported)
      .map(([name]) => name);
    if (!available.includes(transport)) setTransport(available[0]);
  }
  function setParameter(name: string, value: unknown) {
    try {
      const parsed: unknown = JSON.parse(input);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        setError(jsonText("invalidJson"));
        return;
      }
      setInput(JSON.stringify({ ...parsed, [name]: value }, null, 2));
    } catch {
      setError(jsonText("invalidJson"));
    }
  }
  async function retrieve(cancel = false) {
    const value = await readResponse(
      await fetch(`/api/v1/fal/jobs/${encodeURIComponent(jobId)}${cancel ? "" : "?result=true"}`, {
        method: cancel ? "DELETE" : "GET",
      })
    );
    setResult(value);
  }
  async function run() {
    abort.current = new AbortController();
    const response = await fetch("/api/v1/fal/run", {
      method: "POST",
      signal: abort.current.signal,
      headers: {
        "Content-Type": "application/json",
        ...(transport === "queue" ? { "Idempotency-Key": crypto.randomUUID() } : {}),
      },
      body: JSON.stringify({
        endpoint_id: endpoint,
        connection_id: connectionId,
        transport,
        input: JSON.parse(input),
      }),
    });
    if ((transport === "stream" || transport === "realtime") && response.ok) {
      setJobId(response.headers.get("X-Request-ID") ?? "");
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let output = "";
      try {
        while (true) {
          const chunk = await reader.read();
          if (chunk.done) break;
          output += decoder.decode(chunk.value, { stream: true });
          setResult({ stream: output });
        }
        output += decoder.decode();
        setResult({ stream: output });
      } finally {
        reader.releaseLock();
      }
    } else {
      const value = await readResponse(response);
      setResult(value);
      if (response.status === 202 && value.id) setJobId(value.id);
    }
  }

  let values: RecordValue = {};
  try {
    values = JSON.parse(input);
  } catch {
    /* Invalid JSON remains editable until validation. */
  }
  const artifacts = Array.isArray(result?.artifacts) ? (result.artifacts as RecordValue[]) : [];
  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold">{t("title")}</h2>
      <p className="text-sm text-text-muted">{t("description")}</p>
      {!connectionId ? (
        <p>{t("connectionRequired")}</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            <input
              aria-label={common("search")}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setCursor(null);
              }}
              className="rounded border bg-transparent p-2"
            />
            <input
              aria-label={t("category")}
              placeholder={t("category")}
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setCursor(null);
              }}
              className="rounded border bg-transparent p-2"
            />
            <Button disabled={busy} onClick={() => action(() => search())}>
              {common("search")}
            </Button>
            {cursor && (
              <Button disabled={busy} onClick={() => action(() => search(true))}>
                {common("next")}
              </Button>
            )}
          </div>
          <select
            aria-label={t("endpoint")}
            className="w-full rounded border bg-transparent p-2"
            value={endpoint}
            onChange={(event) => {
              setEndpoint(event.target.value);
              setDefinition(null);
            }}
          >
            <option value="">{t("endpoint")}</option>
            {models.map((model) => (
              <option key={model.endpoint_id} value={model.endpoint_id}>
                {model.metadata?.display_name ?? model.endpoint_id} ·{" "}
                {model.metadata?.category ?? ""}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              aria-label={t("endpoint")}
              value={endpoint}
              onChange={(event) => {
                setEndpoint(event.target.value);
                setDefinition(null);
              }}
              className="min-w-0 flex-1 rounded border bg-transparent p-2"
              placeholder="owner/app/subpath"
            />
            <Button disabled={busy || !endpoint} onClick={() => action(() => load(true))}>
              {common("refresh")}
            </Button>
          </div>
          {definition && (
            <div className="grid gap-3 md:grid-cols-2">
              {Object.entries(definition.capabilities.inputs)
                .filter(
                  ([, field]) =>
                    ["string", "number", "integer", "boolean"].includes(String(field.type)) ||
                    Array.isArray(field.enum)
                )
                .map(([name, field]) => (
                  <label className="flex flex-col gap-1 text-sm" key={name}>
                    <span>
                      {name}
                      {definition.capabilities.required.includes(name) ? " *" : ""}
                      {name in definition.capabilities.reasoning ? ` · ${t("reasoning")}` : ""}
                    </span>
                    {Array.isArray(field.enum) ? (
                      <select
                        className="rounded border bg-transparent p-2"
                        value={values[name] === undefined ? "" : String(values[name])}
                        onChange={(event) =>
                          setParameter(
                            name,
                            event.target.value === ""
                              ? undefined
                              : (field.enum as unknown[]).find(
                                  (value) => String(value) === event.target.value
                                )
                          )
                        }
                      >
                        <option value="">—</option>
                        {field.enum.map((value) => (
                          <option key={String(value)} value={String(value)}>
                            {String(value)}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "boolean" ? (
                      <select
                        className="rounded border bg-transparent p-2"
                        value={values[name] === undefined ? "" : String(values[name])}
                        onChange={(event) =>
                          setParameter(
                            name,
                            event.target.value === "" ? undefined : event.target.value === "true"
                          )
                        }
                      >
                        <option value="">—</option>
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                    ) : (
                      <input
                        className="rounded border bg-transparent p-2"
                        type={
                          field.type === "number" || field.type === "integer" ? "number" : "text"
                        }
                        value={String(values[name] ?? "")}
                        onChange={(event) =>
                          setParameter(
                            name,
                            event.target.value === ""
                              ? undefined
                              : field.type === "number" || field.type === "integer"
                                ? Number(event.target.value)
                                : event.target.value
                          )
                        }
                      />
                    )}
                  </label>
                ))}
              {Object.keys(definition.capabilities.inputs)
                .filter((name) => /(?:image|audio|video|file).*urls?$/.test(name))
                .map((name) => (
                  <label className="text-sm" key={name}>
                    {name}
                    <input
                      type="file"
                      multiple={
                        String(definition.capabilities.inputs[name].type) === "array" ||
                        name.endsWith("_urls")
                      }
                      onChange={(event) => {
                        const files = Array.from(event.target.files ?? []);
                        action(async () => {
                          const urls = await Promise.all(
                            files.map(
                              (file) =>
                                new Promise<string>((resolve, reject) => {
                                  const reader = new FileReader();
                                  reader.onload = () => resolve(String(reader.result));
                                  reader.onerror = reject;
                                  reader.readAsDataURL(file);
                                })
                            )
                          );
                          setParameter(name, name.endsWith("_urls") ? urls : urls[0]);
                        });
                      }}
                    />
                  </label>
                ))}
            </div>
          )}
          <label className="block text-sm">
            {t("input")}
            <textarea
              className="mt-1 min-h-48 w-full rounded border bg-transparent p-2 font-mono"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              spellCheck={false}
            />
          </label>
          <div className="flex gap-2">
            <select
              aria-label={t("transport")}
              value={transport}
              onChange={(event) => setTransport(event.target.value)}
              className="rounded border bg-transparent p-2"
            >
              {["queue", "direct", "stream", "realtime"]
                .filter((name) => definition?.capabilities.transports[name])
                .map((name) => (
                  <option key={name}>{name}</option>
                ))}
            </select>
            <Button disabled={busy || !definition} onClick={() => action(run)}>
              {t("run")}
            </Button>
            {busy && <Button onClick={() => abort.current?.abort()}>{common("cancel")}</Button>}
          </div>
          <div className="flex gap-2">
            <input
              aria-label={t("job")}
              placeholder={t("job")}
              value={jobId}
              onChange={(event) => setJobId(event.target.value)}
              className="min-w-0 flex-1 rounded border bg-transparent p-2"
            />
            <Button disabled={busy || !jobId} onClick={() => action(() => retrieve())}>
              {common("refresh")}
            </Button>
            <Button disabled={busy || !jobId} onClick={() => action(() => retrieve(true))}>
              {common("cancel")}
            </Button>
          </div>
          <details>
            <summary>{t("register")}</summary>
            <label className="block">
              {t("schema")}
              <textarea
                className="min-h-40 w-full rounded border bg-transparent p-2 font-mono"
                value={schema}
                onChange={(event) => setSchema(event.target.value)}
              />
            </label>
            <Button
              disabled={busy || !endpoint}
              onClick={() =>
                action(async () => {
                  await readResponse(
                    await fetch(managementUrl, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ endpoint_id: endpoint, openapi: JSON.parse(schema) }),
                    })
                  );
                  await load();
                })
              }
            >
              {common("save")}
            </Button>
          </details>
        </>
      )}
      {error && (
        <p role="alert" className="text-red-500">
          {error}
        </p>
      )}
      {result && (
        <>
          <pre
            aria-live="polite"
            className="max-h-96 overflow-auto whitespace-pre-wrap rounded border p-3 text-xs"
          >
            {JSON.stringify(result, null, 2)}
          </pre>
          <ul>
            {artifacts.map((artifact, i) => (
              <li key={i}>
                <a
                  className="underline"
                  download
                  rel="noopener noreferrer"
                  target="_blank"
                  href={String(artifact.url)}
                >
                  {String(artifact.file_name ?? artifact.path ?? t("download"))}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
}
