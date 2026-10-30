import { createHash } from "node:crypto";
import { CodeBuddyBaseExecutor, NEUTRAL_PROMPT, responseFromResult } from "./codebuddy/shared.ts";
import { type ExecuteInput, type ExecutorExecuteResult, type ProviderCredentials } from "./base.ts";
import {
  buildCorrelationHeaders,
  createOperationContext,
  createRootContext,
  deriveRetryContext,
  type AgentPurpose,
  type CodeBuddyOperationContext,
} from "./codebuddy-intl/context.ts";
import { buildCodeBuddyCliHeaders } from "./codebuddy-intl/cliProfile.ts";
import { applyCliBody } from "./codebuddy-intl/body.ts";
import { parseCodeBuddyRateLimit } from "./codebuddy-intl/lockout.ts";
import { reportTurn, isCodeBuddyTelemetryEnabled } from "./codebuddy-intl/reportTurn.ts";
import {
  createTurnObservationSink,
  tapResponseForObservation,
  type TurnObservation,
  type TurnOutcome,
} from "./codebuddy-intl/turnObservation.ts";

/**
 * Deterministic RFC-4122-v5-shaped UUID derived from a session key, mirroring
 * the official client's per-conversation id (uuid5 over the session key).
 */
export function stableUuidFrom(key: string): string {
  const hash = createHash("sha1").update(key).digest("hex");
  const timeHigh = ((parseInt(hash.slice(12, 16), 16) & 0x0fff) | 0x5000)
    .toString(16)
    .padStart(4, "0");
  const clockSeq = ((parseInt(hash.slice(16, 20), 16) & 0x3fff) | 0x8000)
    .toString(16)
    .padStart(4, "0");
  return [hash.slice(0, 8), hash.slice(8, 12), timeHigh, clockSeq, hash.slice(20, 32)].join("-");
}

function readHeader(headers: Record<string, string> | Headers | unknown, name: string): string {
  if (typeof (headers as Headers)?.get === "function") {
    const value = (headers as Headers).get(name);
    return typeof value === "string" ? value.trim() : "";
  }
  if (!headers || typeof headers !== "object") return "";
  const obj = headers as Record<string, string>;
  const key = Object.keys(obj).find((k) => k.toLowerCase() === name.toLowerCase());
  const value = key ? obj[key] : undefined;
  return typeof value === "string" ? value.trim() : "";
}

function writeHeader(
  headers: Record<string, string> | Headers | unknown,
  name: string,
  value: string
): void {
  if (typeof (headers as Headers)?.set === "function") {
    (headers as Headers).set(name, value);
    return;
  }
  if (!headers || typeof headers !== "object") return;
  const obj = headers as Record<string, string>;
  const key = Object.keys(obj).find((k) => k.toLowerCase() === name.toLowerCase());
  obj[key || name] = value;
}

/**
 * Attach the conversation-correlation family the gateway's channel verification
 * demands (HTTP 400 code 11128 "conversation id missing" without it). Values
 * that already exist and are non-empty are preserved, so a caller tracking its
 * own conversation keeps it; blank values count as absent.
 *
 * All three of `X-Conversation-ID`, `X-Conversation-Request-ID` and
 * `X-Conversation-Message-ID` are required — verified A/B against the live
 * gateway, where any two of them are still answered 11128. `X-Request-ID` is
 * NOT part of the requirement; it is mirrored from the message id because the
 * official client sends it.
 *
 * Kept as the legacy entry point (tests and callers import it); new code goes
 * through `applyCliProfile`, which additionally derives the trace family and
 * the per-purpose header policy from the CLI captures.
 */
export function withConversationHeaders<T extends Record<string, string> | Headers>(
  headers: T,
  body: unknown = null
): T {
  const correlation = resolveCorrelationContext(headers, body);
  const family = buildCorrelationHeaders(correlation);
  for (const [name, value] of Object.entries(family)) {
    writeHeader(headers, name, value);
  }
  return headers;
}

/**
 * Resolve (or adopt) the correlation context for one upstream call.
 *
 * Header values already present win, so an upstream caller that tracks its own
 * conversation keeps it; the per-purpose policy then fills in what is missing
 * and never overwrites the families it does not own.
 */
export function resolveCorrelationContext(
  headers: Record<string, string> | Headers | unknown,
  body: unknown = null,
  purpose: AgentPurpose = "conversation"
): CodeBuddyOperationContext {
  const suppliedConversationId = readHeader(headers, "X-Conversation-ID");
  const root = createRootContext({
    conversationId: suppliedConversationId || conversationKeyFromBody(body),
  });

  const op = createOperationContext(root, purpose, {
    conversationRequestId: readHeader(headers, "X-Conversation-Request-ID") || null,
    messageId:
      readHeader(headers, "X-Conversation-Message-ID") ||
      readHeader(headers, "X-Request-ID") ||
      null,
  });

  // A caller that tracks its own conversation always wins over the purpose
  // default (which gives `summary` a conversation of its own).
  if (suppliedConversationId) op.conversationId = suppliedConversationId;

  return op;
}

/** Stable conversation key derived from the body, used when no header exists. */
function conversationKeyFromBody(body: unknown): string | null {
  const b = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  const sessionKey =
    (typeof b?.session_id === "string" && b.session_id) ||
    (typeof b?.prompt_cache_key === "string" && b.prompt_cache_key) ||
    (typeof b?.conversation_id === "string" && b.conversation_id) ||
    null;
  if (sessionKey) return stableUuidFrom(`cbai:${sessionKey}`);

  const messages = Array.isArray(b?.messages)
    ? (b?.messages as Array<Record<string, unknown>>)
    : null;
  const firstUser = messages ? messages.find((m) => m?.role === "user") : null;
  const userText =
    typeof firstUser?.content === "string"
      ? firstUser.content
      : Array.isArray(firstUser?.content)
        ? (firstUser.content as Array<Record<string, unknown>>)
            .map((part) => (part && typeof part.text === "string" ? part.text : ""))
            .join("\n")
        : "";
  return userText ? stableUuidFrom(`cbai:${userText}`) : null;
}

/** Layer the captured CLI client profile and the correlation family onto headers. */
export function applyCliProfile<T extends Record<string, string> | Headers>(
  headers: T,
  op: CodeBuddyOperationContext
): T {
  const profile = buildCodeBuddyCliHeaders({ purpose: op.agentPurpose, attempt: op.attempt });
  for (const [name, value] of Object.entries(profile)) {
    writeHeader(headers, name, value);
  }
  for (const [name, value] of Object.entries(buildCorrelationHeaders(op))) {
    writeHeader(headers, name, value);
  }
  return headers;
}

/**
 * CodeBuddyIntlExecutor — talks to https://www.codebuddy.ai/v2/chat/completions
 *
 * CodeBuddy International gateway strictly requires:
 * 1. The first message in the request to be a system prompt (rejects with 400
 *    "first message is not system prompt" otherwise).
 * 2. Channel verification: the `X-Conversation-*` header family that the
 *    official CLI sends (HTTP 400 code 11128 "conversation id missing" without it).
 */
export class CodeBuddyIntlExecutor extends CodeBuddyBaseExecutor {
  /**
   * Operation context per request body.
   *
   * `buildHeaders` and `transformRequest` both receive the SAME body object, so
   * keying on it lets the headers and the body of one request describe the same
   * operation — while keeping concurrent requests fully isolated. A plain
   * instance field would leak ids across requests: executors are cached
   * singletons (`open-sse/executors/registry.ts`) shared by every in-flight
   * turn, and `WeakMap` also releases the entry once the request is done.
   *
   * The stored value is the LATEST attempt of that body: a base-executor retry
   * re-enters `buildHeaders` with the same body, which derives a new attempt
   * from the stored one instead of replaying the failed attempt's identity.
   */
  private readonly operations = new WeakMap<object, CodeBuddyOperationContext>();

  constructor(providerId: string = "codebuddy-intl") {
    super(providerId);
  }

  /**
   * Run the turn and report it.
   *
   * The telemetry is synthetic (OmniRoute builds the events) but really sent to
   * `/v2/report` and `/v1/traces`, and it is OPT-IN
   * (`CODEBUDDY_TELEMETRY_ENABLED`, off by default). It is a SIDE
   * CHANNEL: `reportTurn()` never throws and is never awaited on the response
   * path, so a telemetry outage cannot delay or fail the user's request.
   *
   * The turn is only closed when the STREAM ends: `usage` and the first-token
   * instant exist only inside the SSE events (`stream_options.include_usage`),
   * so the response is passed through `tapResponseForObservation` and the
   * report is emitted from its flush/cancel. Reporting at `return` time would
   * send an empty usage block and no first-token time — plausible, but false.
   */
  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const startedAtMs = Date.now();
    const model = typeof input.model === "string" ? input.model : String(input.model ?? "");

    let result: ExecutorExecuteResult;
    try {
      result = await super.execute(input);
    } catch (error) {
      const op = this.peekOperation(input.body);
      // No operation means the request never reached the wire, so there is
      // nothing to correlate and nothing to report.
      if (op) {
        void reportTurn({
          op,
          model,
          startedAtMs,
          endedAtMs: Date.now(),
          credentials: input.credentials,
          status: "error",
          message: error instanceof Error ? error.message : String(error),
        });
      }
      throw error;
    }

    const op = this.peekOperation(input.body);
    if (!op) return result;
    if (!isCodeBuddyTelemetryEnabled()) return result;

    const response = responseFromResult(result);
    const finish = (observation: TurnObservation, outcome: TurnOutcome) => {
      // A stream that reached its natural end reports the HTTP verdict; a turn
      // the consumer abandoned is `cancelled` — it is NOT an upstream failure
      // and must not be counted as one.
      const status =
        outcome === "cancelled" ? "cancelled" : response && response.ok ? "success" : "error";
      void reportTurn({
        op,
        model,
        startedAtMs,
        endedAtMs: Date.now(),
        ...(observation.firstTokenAtMs !== undefined
          ? { firstTokenAtMs: observation.firstTokenAtMs }
          : {}),
        credentials: input.credentials,
        status,
        ...(observation.usage ? { usage: observation.usage } : {}),
        ...(outcome === "cancelled" ? { message: "client closed the stream" } : {}),
      });
    };

    // No body to observe (upstream never streamed, or the transport gave us a
    // bare Response): report what we have and invent nothing.
    if (!response || !response.body) {
      finish({ sawEvent: false }, "completed");
      return result;
    }

    const sink = createTurnObservationSink();
    const tapped = tapResponseForObservation(response, sink, finish);
    if (result instanceof Response) return tapped;
    return { ...result, response: tapped };
  }

  buildHeaders(
    credentials: ProviderCredentials,
    stream: boolean = true,
    clientHeaders?: Record<string, string> | null,
    model?: string | null,
    _health?: unknown,
    body?: unknown
  ): Record<string, string> {
    const headers = super.buildHeaders(credentials, stream, clientHeaders, model, _health, body);
    try {
      const correlation = resolveCorrelationContext(headers, body);
      this.rememberAttempt(body, correlation);
      const op = this.peekOperation(body) ?? correlation;
      return applyCliProfile(headers, op);
    } catch (error) {
      const err = error as Error | undefined;
      throw new Error(
        `CodeBuddy channel verification: could not attach the X-Conversation-* family ` +
          `(${err?.message || error}). The intl gateway rejects any request without it ` +
          `(HTTP 400 code 11128 "conversation id missing"), so this request cannot succeed.`
      );
    }
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const transformed = super.transformRequest(model, body, stream, credentials);
    if (!transformed || typeof transformed !== "object" || Array.isArray(transformed)) {
      return transformed;
    }
    const out = transformed as Record<string, unknown>;

    if (Array.isArray(out.messages)) {
      const first = out.messages[0] as Record<string, unknown> | undefined;
      if (!first || first.role !== "system") {
        out.messages = [{ role: "system", content: NEUTRAL_PROMPT }, ...out.messages];
      }
    }

    // CLI body contract: stream/stream_options/cache_retention + the serialized
    // harness metadata. Correlation ids come from the operation context that
    // buildHeaders() resolved for this SAME request body.
    const operation = this.operationForBody(body);
    return applyCliBody(out, { op: operation });
  }

  /**
   * Record an attempt for this body.
   *
   * `buildHeaders` runs once per upstream attempt (including the base
   * executor's intra-retries), so seeing the same body again means the previous
   * attempt failed and is being re-sent. Deriving instead of overwriting keeps
   * the conversation identity while advancing the attempt counter, allocating a
   * fresh span and minting a fresh message for this dispatch — which is what the
   * gateway's `x-stainless-retry-count` describes.
   */
  private rememberAttempt(body: unknown, op: CodeBuddyOperationContext): void {
    if (!body || typeof body !== "object") return;
    const previous = this.operations.get(body as object);
    this.operations.set(body as object, previous ? deriveRetryContext(previous) : op);
  }

  /** The operation (latest attempt) recorded for this request, if any. */
  private peekOperation(body: unknown): CodeBuddyOperationContext | null {
    if (!body || typeof body !== "object") return null;
    return this.operations.get(body as object) ?? null;
  }

  /**
   * The operation context of this request. `buildHeaders` resolves and stores it
   * first (it runs before `transformRequest` in the base executor), so headers
   * and body describe the SAME operation instead of generating ids
   * independently. A body that was never seen gets a fresh context — which is
   * also what keeps two concurrent requests from sharing identifiers.
   *
   * The purpose is always `conversation` here: this executor only dispatches the
   * main chat turn. The auxiliary purposes (`summary`, `prompt_suggestion`,
   * `conversation_topic`) are modelled in `context.ts` because the CLI sends
   * them, but OmniRoute does not issue those calls yet — wiring them is a
   * separate feature, not a side effect of this one.
   */
  private operationForBody(body: unknown): CodeBuddyOperationContext {
    if (body && typeof body === "object") {
      const known = this.operations.get(body as object);
      if (known) return known;
      const created = resolveCorrelationContext({}, body);
      this.operations.set(body as object, created);
      return created;
    }
    return resolveCorrelationContext({}, body);
  }

  parseError(
    response: Response,
    bodyText: string
  ): { status: number; message: string; resetsAtMs?: number } {
    if (bodyText) {
      try {
        const data = JSON.parse(bodyText);
        const msg = String(data?.msg || data?.message || "");

        // Code 11128 is overloaded: it also carries "first message is not system
        // prompt" (a body-shape problem fixed in transformRequest). Only the
        // conversation-id variant is channel verification, so branch on the
        // message, never on the code alone.
        if (data?.code === 11128 && /conversation id missing/i.test(msg)) {
          const tip = data?.displayTips?.en || data?.displayMsg?.en || "";
          return {
            status: 400,
            message:
              'CodeBuddy channel verification failed (11128 "conversation id missing"): ' +
              "the upstream gateway requires the X-Conversation-* header family the official " +
              "CLI sends, supplied by CodeBuddyIntlExecutor.buildHeaders(). If this appears, " +
              "the gate likely changed (e.g. a new required header)." +
              (tip ? ` Upstream said: ${tip}` : ""),
          };
        }
      } catch {}
    }

    // Dated 429: surface the authoritative unlock date in the error message.
    // The persistent freeze itself is NOT applied here — it is the central
    // cooldown path's job (open-sse/services/accountFallback.ts parses
    // Retry-After / reset dates into `rateLimitedUntil`, which
    // `getProviderCredentials` already honors). Returning the date keeps this
    // executor honest without duplicating that policy.
    if (response.status === 429) {
      const parsed = parseCodeBuddyRateLimit({
        status: 429,
        headers: response.headers,
        body: bodyText,
      });
      if (parsed.authoritative) {
        return {
          status: 429,
          message:
            `CodeBuddy International rate limit: the account must wait until ` +
            `${new Date(parsed.resetAtMs as number).toISOString()} ` +
            `(source: ${parsed.source}). It must not be retried before that date.`,
          resetsAtMs: parsed.resetAtMs as number,
        };
      }
    }

    return super.parseError(response, bodyText);
  }
}
