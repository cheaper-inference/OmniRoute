/**
 * Gemini Decision 1 account selection, quota handling and response workflow.
 * The HTTP route performs request validation and caller-key scope admission.
 */
import { errorResponse, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  executeGeminiDecision, geminiDecisionErrorText, geminiDecisionInputTokens,
} from "./geminiDecisions.ts";
import type { GeminiDecisionTransportResult, GeminiDecisionPayload } from "./geminiDecisions.ts";

const PROVIDER = "gemini";
const MAX_UPSTREAM_ATTEMPTS = 4;
const TOTAL_DEADLINE_MS = 45_000;
const RETRYABLE_STATUS = new Set([401, 402, 403, 408, 429, 500, 502, 503, 504]);

type AllowedConnections = string[] | null;
type RecordDecisionUsage = (tokens: number, startedAt: number, connectionId: string) => void;
type Credential = {
  apiKey?: string | null;
  connectionId?: string | null;
  projectId?: string | null;
  id?: string | null;
  testStatus?: string | null;
  lastErrorAt?: string | null;
  rateLimitedUntil?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
};

export type GeminiDecisionWorkflowDeps = {
  select: (allowed: AllowedConnections, excluded: string[]) => Promise<unknown>;
  unusable: (credentials: unknown) => Response | null;
  getConnections: () => Promise<unknown[]>;
  markUnavailable: (credentials: Credential, response: GeminiDecisionTransportResult, message: string) => Promise<void>;
  clearRecovered: (credentials: Credential, snapshot: { testStatus: string | null; lastErrorAt: string | null; rateLimitedUntil: string | null }) => Promise<void>;
  logAttempt: (response: GeminiDecisionTransportResult, credentials: Credential, error: string | null) => void;
  decorateSuccessHeaders: (headers: Headers, body: Record<string, unknown>, duration: number) => void;
};
type FailureState = {
  attempts: number;
  status: number;
  message: string;
  retryAfter: string | null;
  code: string | null;
};

function projectIdOf(credentials: Credential): string | null {
  const data = credentials.providerSpecificData;
  const possible = credentials.projectId || data?.googleProjectId || data?.projectId;
  return typeof possible === "string" && possible.trim() ? possible.trim() : null;
}

/** Quota is Google-project scoped. Sibling keys must not consume the retry budget. */
async function excludeProjectSiblings(project: string, excluded: Set<string>, deps: GeminiDecisionWorkflowDeps): Promise<void> {
  try {
    const connections = await deps.getConnections();
    for (const connection of connections) {
      const sibling = connection as Credential;
      if (projectIdOf(sibling) === project && sibling.id) excluded.add(sibling.id);
    }
  } catch {
    // The selection loop still excludes each selected connection permanently.
  }
}

function jsonSuccess(body: Record<string, unknown>, duration: number, attempts: number, deps: GeminiDecisionWorkflowDeps): Response {
  const headers = new Headers({ "Content-Type": "application/json" });
  deps.decorateSuccessHeaders(headers, body, duration);
  headers.set("X-OmniRoute-Decisions-Attempts", String(attempts));
  return new Response(JSON.stringify(body), { status: 200, headers });
}
function recordFailure(
  state: FailureState, response: GeminiDecisionTransportResult, error: string | null
): void {
  state.status = response.status;
  state.message = error ? sanitizeErrorMessage(error).slice(0, 350)
    : "Google Decisions returned HTTP " + response.status;
  state.retryAfter = response.headers.get("retry-after");
  const upstreamError = response.body?.error;
  state.code = upstreamError && typeof upstreamError === "object" &&
    !Array.isArray(upstreamError) &&
    typeof (upstreamError as Record<string, unknown>).code === "string"
      ? (upstreamError as Record<string, string>).code : null;
}

function finalFailure(state: FailureState): Response {
  const retryAfter = state.retryAfter && /^\d+(?:\.\d+)?$/.test(state.retryAfter)
    ? Number(state.retryAfter) : undefined;
  return errorResponse(state.status, state.message, {
    retryAfter,
    code: state.code ?? undefined,
  });
}

async function markFailedCredential(
  credentials: Credential,
  response: GeminiDecisionTransportResult,
  message: string,
  exhaustedProjects: Set<string>,
  tried: Set<string>,
  deps: GeminiDecisionWorkflowDeps
): Promise<void> {
  const project = projectIdOf(credentials);
  if (project && response.status === 429) {
    exhaustedProjects.add(project);
    await excludeProjectSiblings(project, tried, deps);
  }
  if (credentials.connectionId && credentials.connectionId !== "env:GEMINI_API_KEY") {
    try {
      await deps.markUnavailable(credentials, response, message);
    } catch {
      // Local retry exclusion still applies if persisting cooldown fails.
    }
  }
}

type AttemptResult =
  | { kind: "response"; response: Response }
  | { kind: "continue" }
  | { kind: "stop" };

type AttemptContext = {
  body: GeminiDecisionsBody;
  selected: unknown;
  state: FailureState;
  tried: Set<string>;
  exhaustedProjects: Set<string>;
  signal: AbortSignal;
  started: number;
  remaining: number;
  recordUsage: RecordDecisionUsage;
  deps: GeminiDecisionWorkflowDeps;
};

async function recoverDecisionSuccess(
  context: AttemptContext, credentials: Credential,
  snapshot: { testStatus: string | null; lastErrorAt: string | null; rateLimitedUntil: string | null },
  body: Record<string, unknown>
): Promise<Response> {
  context.recordUsage(geminiDecisionInputTokens(body), context.started, credentials.connectionId!);
  try {
    await context.deps.clearRecovered(credentials, snapshot);
  } catch {
    // A failed cleanup must not hide a successful answer.
  }
  return jsonSuccess(body, Date.now() - context.started, context.state.attempts, context.deps);
}
/** One selected connection is either dispatched once, skipped, or stopped. */
async function attemptDecision(context: AttemptContext): Promise<AttemptResult> {
  const { body, selected, state, tried, exhaustedProjects, signal, remaining, deps } = context;
  const unavailable = deps.unusable(selected);
  if (unavailable) {
    return {
      kind: "response",
      response: state.attempts === 0 ? unavailable : finalFailure(state),
    };
  }

  const credentials = selected as Credential;
  const connectionId = credentials.connectionId;
  if (!connectionId || tried.has(connectionId) || !credentials.apiKey) return { kind: "stop" };
  tried.add(connectionId);
  const project = projectIdOf(credentials);
  if (project && exhaustedProjects.has(project)) return { kind: "continue" };

  state.attempts++;
  const recoverySnapshot = {
    testStatus: credentials.testStatus ?? null,
    lastErrorAt: credentials.lastErrorAt ?? null,
    rateLimitedUntil: credentials.rateLimitedUntil ?? null,
  };
  const response = await executeGeminiDecision({
    model: body.model, input: body.input, questions: body.questions,
  }, credentials.apiKey, {
    signal,
    timeoutMs: Math.min(20_000, remaining),
  });
  const error = response.transportError || geminiDecisionErrorText(response.body);
  deps.logAttempt(response, credentials, error);
  if (response.status === 200 && response.body) {
    return { kind: "response", response: await recoverDecisionSuccess(
      context, credentials, recoverySnapshot, response.body
    ) };
  }
  if (response.status === 499) {
    return { kind: "response", response: errorResponse(499, "Client request cancelled") };
  }

  recordFailure(state, response, error);
  if (!RETRYABLE_STATUS.has(response.status)) return { kind: "stop" };
  await markFailedCredential(credentials, response, state.message, exhaustedProjects, tried, deps);
  return { kind: "continue" };
}

/**
 * Google quota is project-scoped: retrying sibling keys cannot recover
 * capacity. Every selection uses the caller API key's allowed connection IDs.
 */
export async function handleGeminiDecisionRequest(
  body: GeminiDecisionPayload, allowedConnections: AllowedConnections, signal: AbortSignal,
  recordUsage: RecordDecisionUsage, deps: GeminiDecisionWorkflowDeps
): Promise<Response> {
  const started = Date.now();
  const tried = new Set<string>();
  const exhaustedProjects = new Set<string>();
  const state: FailureState = {
    attempts: 0,
    status: 503,
    message: "No eligible Gemini credentials for Decisions API",
    retryAfter: null,
    code: null,
  };

  while (state.attempts < MAX_UPSTREAM_ATTEMPTS) {
    if (signal.aborted) return errorResponse(499, "Client request cancelled");
    const remaining = TOTAL_DEADLINE_MS - (Date.now() - started);
    if (remaining <= 0) break;
    const selected = await deps.select(allowedConnections, Array.from(tried));
    if (!selected) break;
    const outcome = await attemptDecision({
      body, selected, state, tried, exhaustedProjects, signal, started, remaining, recordUsage, deps,
    });
    if (outcome.kind === "response") return outcome.response;
    if (outcome.kind === "stop") break;
  }
  return finalFailure(state);
}
