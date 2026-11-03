"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import {
  parseFalEditor,
  falFingerprint,
  persistFalReceipt,
  readFalReceipts,
  falReceiptSnapshot,
  subscribeFalReceipts,
  type FalDraft,
  type FalSubmission,
  type FalReceipt,
} from "@/shared/fal/submission";
import {
  readFalEvents,
  mergeFalEvent,
  type FalStreamState,
} from "@omniroute/open-sse/handlers/fal/events";

export type FalValue = Record<string, unknown>;
type Model = { endpoint_id: string; metadata?: { display_name?: string; category?: string } };
type Fields = { inputs: Record<string, FalValue>; required: string[] };
type Definition = Model & {
  capabilities: Fields & {
    transports: Record<string, boolean>;
    reasoning: FalValue;
    transport_inputs?: Record<string, Fields>;
  };
};
type State = {
  query: string;
  category: string;
  models: Model[];
  cursor: string | null;
  endpoint: string;
  definition: Definition | null;
  input: string;
  schema: string;
  transport: string;
  jobId: string | null;
  result: FalValue | null;
  error: string;
  busy: boolean;
  selectedReceipt: FalReceipt | null;
};
const initial: State = {
  query: "",
  category: "",
  models: [],
  cursor: null,
  endpoint: "",
  definition: null,
  input: "{}",
  schema: "{}",
  transport: "queue",
  jobId: null,
  result: null,
  error: "",
  busy: false,
  selectedReceipt: null,
};

export function useFalNativeController(connectionId: string | null) {
  const [state, setState] = useState(initial);
  const t = useTranslations("falNative");
  const common = useTranslations("common");
  const jsonText = useTranslations("playground");
  const abort = useRef<AbortController | null>(null);
  const lock = useRef(false);
  const submission = useRef<FalSubmission | null>(null);
  const receiptData = useSyncExternalStore(subscribeFalReceipts, falReceiptSnapshot, () => "[]");
  const receipts = useMemo(() => readFalReceipts(receiptData), [receiptData]);
  const activeReceipt = state.selectedReceipt ?? receipts[0] ?? null;
  const parsed = parseFalEditor(state.input);
  const patch = (value: Partial<State>) => setState((s) => ({ ...s, ...value }));
  useEffect(() => () => abort.current?.abort(), []);
  const context = {
    state,
    patch,
    connectionId,
    t,
    common,
    jsonText,
    abort,
    lock,
    submission,
    receipts,
    activeReceipt,
    parsed,
  };
  return {
    ...state,
    connectionId,
    t,
    common,
    patch,
    abort,
    receipts,
    activeReceipt,
    currentJobId: state.jobId ?? activeReceipt?.jobId ?? "",
    values: parsed.valid ? parsed.value : {},
    valid: parsed.valid,
    visibleError: parsed.valid ? state.error : jsonText("invalidJson"),
    fields:
      state.definition?.capabilities.transport_inputs?.[state.transport] ??
      state.definition?.capabilities,
    action: (task: () => Promise<void>) => action(context, task),
    search: (next = false) => search(context, next),
    load: () => load(context),
    register: () => register(context),
    run: (recover = false) => run(context, recover),
    retrieve: (cancel = false) => retrieve(context, cancel),
    setParameter: (name: string, value: unknown) => setParameter(context, name, value),
    selectReceipt: (key: string) => selectReceipt(context, key),
  };
}
export type FalPanelController = ReturnType<typeof useFalNativeController>;
type Context = Parameters<typeof action>[0];
type ControllerContext = {
  state: State;
  patch: (value: Partial<State>) => void;
  connectionId: string | null;
  t: ReturnType<typeof useTranslations>;
  common: ReturnType<typeof useTranslations>;
  jsonText: ReturnType<typeof useTranslations>;
  abort: { current: AbortController | null };
  lock: { current: boolean };
  submission: { current: FalSubmission | null };
  receipts: FalReceipt[];
  activeReceipt: FalReceipt | null;
  parsed: ReturnType<typeof parseFalEditor>;
};

async function action(c: ControllerContext, task: () => Promise<void>) {
  if (c.lock.current) return;
  c.lock.current = true;
  c.patch({ busy: true, error: "" });
  try {
    await task();
  } catch (failure) {
    c.patch({ error: failure instanceof Error ? failure.message : c.common("error") });
  } finally {
    c.lock.current = false;
    c.patch({ busy: false });
  }
}
async function readResponse(response: Response) {
  const value = await response.json();
  if (!response.ok)
    throw new Error(
      typeof value.error?.message === "string" ? value.error.message : `HTTP ${response.status}`
    );
  return value;
}
function managementUrl(c: Context) {
  return `/api/providers/${encodeURIComponent(c.connectionId ?? "")}/fal`;
}
async function search(c: Context, next: boolean) {
  const params = new URLSearchParams({ q: c.state.query, category: c.state.category, limit: "30" });
  if (next && c.state.cursor) params.set("cursor", c.state.cursor);
  const page = await readResponse(await fetch(`${managementUrl(c)}?${params}`));
  c.patch({
    models: next ? [...c.state.models, ...page.models] : page.models,
    cursor: page.has_more ? page.next_cursor : null,
  });
}
async function load(c: Context) {
  const params = new URLSearchParams({ endpoint_id: c.state.endpoint, refresh: "true" });
  const value: Definition = await readResponse(await fetch(`${managementUrl(c)}?${params}`));
  const available = Object.entries(value.capabilities.transports)
    .filter(([, supported]) => supported)
    .map(([name]) => name);
  c.patch({
    definition: value,
    transport: available.includes(c.state.transport) ? c.state.transport : available[0],
  });
}
async function register(c: Context) {
  await readResponse(
    await fetch(managementUrl(c), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint_id: c.state.endpoint, openapi: JSON.parse(c.state.schema) }),
    })
  );
  await load(c);
}
function setParameter(c: Context, name: string, value: unknown) {
  const parsed = c.parsed;
  if (parsed.valid === false) {
    c.patch({ error: c.jsonText("invalidJson") });
    return;
  }
  c.patch({ input: JSON.stringify({ ...parsed.value, [name]: value }, null, 2) });
}
function selectReceipt(c: Context, key: string) {
  const receipt = c.receipts.find((r) => r.key === key);
  if (!receipt) return;
  c.submission.current = c.submission.current?.key === receipt.key ? c.submission.current : receipt;
  c.patch({ selectedReceipt: receipt, jobId: receipt.jobId ?? "" });
}
function save(c: Context, value: FalSubmission) {
  c.submission.current = value;
  c.patch({ selectedReceipt: value });
  persistFalReceipt(value);
}
async function snapshot(c: Context, recover: boolean): Promise<FalSubmission> {
  const parsed = c.parsed;
  if (parsed.valid === false || !c.connectionId) throw new Error(c.jsonText("invalidJson"));
  const draft: FalDraft = {
    endpoint_id: c.state.endpoint,
    connection_id: c.connectionId,
    transport: c.state.transport,
    input: parsed.value,
  };
  if (!recover)
    return {
      key: crypto.randomUUID(),
      fingerprint: await falFingerprint(draft),
      endpoint: draft.endpoint_id,
      connection: c.connectionId,
      transport: draft.transport,
      draft,
      status: "SUBMISSION_UNKNOWN",
    };
  const original: FalSubmission | null = c.submission.current ?? c.activeReceipt;
  if (!original || original.connection !== c.connectionId) throw new Error(c.t("recoveryMismatch"));
  if (!original.draft && (await falFingerprint(draft)) !== original.fingerprint)
    throw new Error(c.t("recoveryMismatch"));
  return { ...original, draft: original.draft ?? draft, status: "SUBMISSION_UNKNOWN" };
}
async function stream(c: Context, response: Response, transport: string) {
  if (!response.body) throw new Error(c.t("streamIncomplete"));
  let state: FalStreamState = { artifacts: [], events: [] };
  await readFalEvents(
    response.body,
    (event) => {
      state = mergeFalEvent(state, event);
      c.patch({
        result: { ...state },
        ...(state.error !== undefined ? { error: c.t("streamError") } : {}),
      });
    },
    c.abort.current?.signal
  );
  if (state.final === undefined && transport === "stream") throw new Error(c.t("streamIncomplete"));
}
async function run(c: Context, recover: boolean) {
  const value = await snapshot(c, recover);
  save(c, value);
  c.abort.current = new AbortController();
  const response = await fetch("/api/v1/fal/run", {
    method: "POST",
    signal: c.abort.current.signal,
    headers: {
      "Content-Type": "application/json",
      ...(value.transport === "queue" ? { "Idempotency-Key": value.key } : {}),
    },
    body: JSON.stringify(value.draft),
  });
  // Receipt headers survive every HTTP status and malformed/non-JSON bodies.
  const jobId = response.headers.get("X-Request-ID");
  if (jobId) {
    c.patch({ jobId });
    save(c, { ...c.submission.current!, jobId });
  }
  if (["stream", "realtime", "http-websocket"].includes(value.transport) && response.ok) {
    await stream(c, response, value.transport);
    return;
  }
  const result = await readResponse(response);
  c.patch({ result, ...(result.id ? { jobId: result.id } : {}) });
  save(c, {
    ...c.submission.current!,
    ...(result.id ? { jobId: result.id } : {}),
    status: result.status ?? "COMPLETED",
  });
}
async function retrieve(c: Context, cancel: boolean) {
  const id = c.state.jobId ?? c.activeReceipt?.jobId ?? "";
  const result = await readResponse(
    await fetch(`/api/v1/fal/jobs/${encodeURIComponent(id)}${cancel ? "" : "?result=true"}`, {
      method: cancel ? "DELETE" : "GET",
    })
  );
  c.patch({ result });
}
