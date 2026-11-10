import { randomUUID } from "node:crypto";
import { z } from "zod";
import { buildPplxRequestBody, buildPplxHeaders } from "../../executors/perplexity-web/protocol.ts";
import { tlsFetchPerplexity } from "../../services/perplexityTlsClient.ts";
import { hasMcpHttpAuthContext } from "../httpAuthContext.ts";
import {
  acquireResearchLock,
  releaseResearchLock,
  markUpstreamUnconfirmed,
} from "./perplexityResearchLock.ts";
import { parseResearchFrames } from "./perplexityResearchParse.ts";
import { clampResearchResult } from "./perplexityResearchLimits.ts";
import { markStreamableSessionBusy } from "../sessionActivity.ts";
import {
  getRegisteredConnectionStore,
  type RegisteredConnectionStore,
} from "../../utils/registeredConnectionStore.ts";
import { recordResearchCooldown, cooldownRemainingMs } from "./perplexityResearchCooldown.ts";
import { remainingResearch } from "./perplexityResearchQuota.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

const inputSchema = z.object({
  query: z.string().min(1),
  connectionId: z.string().min(1),
  maxTotalMinutes: z.number().int().min(5).max(120).optional(),
});

const ASK_URL = "https://www.perplexity.ai/rest/sse/perplexity_ask";

function envelope(payload: Record<string, unknown>, isError: boolean) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(payload) }],
    structuredContent: payload,
    isError,
  };
}

function failure(code: string) {
  return envelope(
    {
      ok: false,
      error: { code, message: code, correlationId: randomUUID(), autoRetryAllowed: false },
    },
    true
  );
}

type ResearchInput = z.infer<typeof inputSchema>;
type ResearchExtra = { authInfo?: unknown; signal?: AbortSignal; sessionId?: string };
type ResearchResult = ReturnType<typeof envelope>;
type ResearchConnection = Record<string, unknown> | null;

const TOOL_DESCRIPTION =
  "Runs one Perplexity Deep Research and returns the report. Off unless OMNIROUTE_PPLX_RESEARCH_ENABLED=1. connectionId must name an active perplexity-web connection. A client that does not pass its own timeout will be cut off at 60 seconds while this call keeps running, so set timeout 120000, maxTotalTimeout 2760000 and resetTimeoutOnProgress with an onprogress handler. Errors: research_unavailable (connectionId is not an active perplexity-web connection), research_aborted (client cancel or time budget), research_failed (unexpected error).";

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

// Refusals that need no connection, no lock and no upstream call.
function refuseEarly(extra: ResearchExtra | undefined): ResearchResult | null {
  if (process.env.OMNIROUTE_PPLX_RESEARCH_ENABLED !== "1") return failure("research_disabled");
  if (hasMcpHttpAuthContext() && !extra?.authInfo) return failure("auth_required");
  return null;
}

const RESEARCH_PROVIDER = "perplexity-web";

async function loadConnection(
  store: RegisteredConnectionStore,
  connectionId: string
): Promise<ResearchConnection> {
  // Called through a plain identifier on purpose: the hard-session-lease bypass
  // inventory counts bare getProviderConnectionById calls, so a store.method()
  // call here would drop this read from the inventory.
  const { getProviderConnectionById } = store;
  return ((await getProviderConnectionById(connectionId)) ?? null) as ResearchConnection;
}

// Only an existing, active perplexity-web connection may run a report: its
// accessToken/apiKey goes to perplexity.ai, so a connection of any other
// provider must never reach buildPplxHeaders.
function isResearchConnection(connection: ResearchConnection): boolean {
  if (!connection || connection.provider !== RESEARCH_PROVIDER) return false;
  return connection.isActive !== false && connection.isActive !== 0;
}

function warn(message: string, err?: unknown): void {
  const detail = err === undefined ? "" : `: ${sanitizeErrorMessage(err)}`;
  console.warn(`[MCP] omniroute_perplexity_research ${message}${detail}`);
}

// How one run ended, for the lock. `sent` turns true just before the research
// request goes out; `finished` turns true once a final report came back;
// `settled` turns true when Perplexity ended the run without a report, either
// with an HTTP error status (the stream never started) or with its end marker.
type RunProgress = { sent: boolean; finished: boolean; settled: boolean };

// A finished report is kept even when the cooldown cannot be stored: the
// in-memory cooldown is set before the DB write, so it still applies here.
async function storeCooldown(store: RegisteredConnectionStore, connectionId: string) {
  try {
    await recordResearchCooldown({
      connectionId,
      nowMs: Date.now(),
      upstreamEnded: true,
      confirmed: true,
      merge: store.mergeConnectionProviderSpecificData,
    });
  } catch (err) {
    warn("could not store the cooldown", err);
  }
}

// One upstream run: quota check, then the research request.
async function runResearch(input: {
  query: string;
  connectionId: string;
  connection: ResearchConnection;
  invocationId: string;
  budgetMs: number;
  signal: AbortSignal;
  store: RegisteredConnectionStore;
  progress: RunProgress;
}): Promise<ResearchResult> {
  if (input.signal.aborted) return failure("research_aborted");
  const body = buildPplxRequestBody(
    input.query,
    input.query,
    "copilot",
    "pplx_alpha",
    null,
    input.invocationId
  );
  const headers = buildPplxHeaders(input.invocationId, {
    accessToken: asString(input.connection?.accessToken),
    apiKey: asString(input.connection?.apiKey),
  });
  const remaining = await remainingResearch(headers);
  if (remaining === 0) return failure("research_quota_exhausted");
  if (input.signal.aborted) return failure("research_aborted");
  input.progress.sent = true;
  const res = await tlsFetchPerplexity(ASK_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    signal: input.signal,
    timeoutMs: input.budgetMs,
    stream: true,
  });
  if (input.signal.aborted) return failure("research_aborted");
  if (res.status < 200 || res.status >= 300) {
    warn(`research request answered HTTP ${res.status}`);
    input.progress.settled = true;
  }
  const parsedFrames = clampResearchResult(parseResearchFrames(res.text ?? ""));
  if (parsedFrames.outcome === "report_unconfirmed") input.progress.settled = true;
  if (res.status !== 200 || parsedFrames.outcome !== "success") {
    return failure(parsedFrames.outcome);
  }
  input.progress.finished = true;
  await storeCooldown(input.store, input.connectionId);
  const data = {
    report: parsedFrames.report,
    citations: parsedFrames.citations,
    truncated: parsedFrames.truncated,
    warnings: parsedFrames.warnings,
  };
  return envelope({ ok: true, data }, false);
}

// Holds the per-connection lock for one run. The lock is released after a
// final report, when no research request went out, or when Perplexity settled
// the run (HTTP error status, or end marker without a report). Any other end
// after the request went out (no end marker, a throw, an abort or timeout)
// marks the lock unconfirmed, which keeps the connection busy until its
// deadline plus UNCONFIRMED_GRACE_MS, since the run may still be going upstream.
async function runWithLock(input: {
  query: string;
  connectionId: string;
  connection: ResearchConnection;
  minutes: number;
  extra: ResearchExtra | undefined;
  store: RegisteredConnectionStore;
}): Promise<ResearchResult> {
  const { connectionId, extra } = input;
  const invocationId = randomUUID();
  const lock = acquireResearchLock({
    connectionId,
    invocationId,
    nowMs: Date.now(),
    maxTotalMinutes: input.minutes,
  });
  if (lock === "research_busy") return failure("research_busy");
  markStreamableSessionBusy(extra?.sessionId, true);

  const controller = new AbortController();
  const progress: RunProgress = { sent: false, finished: false, settled: false };
  const budgetMs = input.minutes * 60_000;
  const timer = setTimeout(() => controller.abort(), budgetMs);
  extra?.signal?.addEventListener("abort", () => controller.abort(), { once: true });
  if (extra?.signal?.aborted) controller.abort();
  try {
    return await runResearch({
      ...input,
      invocationId,
      budgetMs,
      signal: controller.signal,
      progress,
    });
  } catch (err) {
    warn("run failed", err);
    return failure(controller.signal.aborted ? "research_aborted" : "research_failed");
  } finally {
    clearTimeout(timer);
    markStreamableSessionBusy(extra?.sessionId, false);
    if (progress.finished || progress.settled || !progress.sent)
      releaseResearchLock(connectionId, invocationId);
    else markUpstreamUnconfirmed(connectionId, invocationId);
  }
}

async function startResearch(
  args: unknown,
  extra: ResearchExtra | undefined,
  store: RegisteredConnectionStore
) {
  const input = inputSchema.safeParse(args ?? {});
  if (!input.success) return failure("research_invalid_input");
  const parsed: ResearchInput = input.data;
  const connectionId = parsed.connectionId;
  const connection = await loadConnection(store, connectionId);
  if (!isResearchConnection(connection)) return failure("research_unavailable");
  const data = (connection?.providerSpecificData ?? {}) as Record<string, unknown>;
  if (cooldownRemainingMs(data, Date.now(), connectionId) > 0) return failure("research_cooldown");
  return runWithLock({
    query: parsed.query,
    connectionId,
    connection,
    minutes: parsed.maxTotalMinutes ?? 45,
    extra,
    store,
  });
}

async function handleResearch(args: unknown, extra: ResearchExtra | undefined) {
  const refused = refuseEarly(extra);
  if (refused) return refused;
  const store = getRegisteredConnectionStore();
  if (!store) {
    warn("has no connection store; src/lib/db/providers.ts has not loaded");
    return failure("research_unavailable");
  }
  try {
    return await startResearch(args, extra, store);
  } catch (err) {
    warn("could not start", err);
    return failure("research_failed");
  }
}

export function registerPerplexityResearchTool(
  server: { registerTool: (...args: unknown[]) => unknown },
  withScopeEnforcement: (name: string, handler: unknown, scopes: string[]) => unknown
) {
  if (process.env.OMNIROUTE_PPLX_RESEARCH_ENABLED !== "1") return;

  server.registerTool(
    "omniroute_perplexity_research",
    {
      description: TOOL_DESCRIPTION,
      inputSchema,
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: true,
      },
    },
    withScopeEnforcement("omniroute_perplexity_research", handleResearch, ["manage"])
  );
}
