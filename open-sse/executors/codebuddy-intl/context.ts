import { randomBytes } from "node:crypto";

/**
 * CodeBuddy International CLI request context.
 *
 * The official CLI (CLI/2.175.0) sends several INDEPENDENT identifier families.
 * Treating them as one value is the bug this module exists to prevent:
 *
 * | Family                    | Shape | Scope                                   |
 * | ------------------------- | ----- | --------------------------------------- |
 * | conversation              | uuid7 | whole conversation (client session)     |
 * | conversation request      | 32hex | one turn (main) or one auxiliary call   |
 * | message / request         | 32hex | one step; mirrored on `X-Request-ID`     |
 * | trace                     | 32hex | shared by the turn and its auxiliaries  |
 * | span / parent span        | 16hex | one HTTP attempt / the owning operation |
 *
 * `traceId` is NOT `conversationRequestId`, and the telemetry `sessionId` is NOT
 * `baggage.codebuddy.session_id` (which carries the conversation id).
 */

export type AgentType = "main" | "auxiliary";

export type AgentPurpose = "conversation" | "conversation_topic" | "summary" | "prompt_suggestion";

export interface PurposePolicy {
  agentType: AgentType;
  /** Own conversation id instead of the root conversation (captured for `summary`). */
  ownConversation: boolean;
  /** Send `X-Root-Request-ID` (captured absent on `summary`). */
  sendRootRequestId: boolean;
  /** Send `x-codebuddy-request: 1` (captured absent on `summary`). */
  sendCodebuddyRequest: boolean;
  /** Baggage always describes the ROOT turn, never the operation. */
  rootBaggage: true;
}

/**
 * Per-purpose correlation policy, transcribed from the CLI captures.
 *
 * `conversation_topic` is not part of the captured matrix: it is declared with
 * the same shape as `summary` (its own topic request) but no field of it is
 * asserted as verified — see the UNVERIFIED note on the constant.
 */
export const PURPOSE_POLICY: Record<AgentPurpose, PurposePolicy> = {
  conversation: {
    agentType: "main",
    ownConversation: false,
    sendRootRequestId: true,
    sendCodebuddyRequest: true,
    rootBaggage: true,
  },
  conversation_topic: {
    // UNVERIFIED: no capture of this purpose exists yet; mirrors `summary`
    // (an auxiliary that describes its own request) and sends no root header.
    agentType: "auxiliary",
    ownConversation: false,
    sendRootRequestId: false,
    sendCodebuddyRequest: false,
    rootBaggage: true,
  },
  summary: {
    agentType: "auxiliary",
    ownConversation: true,
    sendRootRequestId: false,
    sendCodebuddyRequest: false,
    rootBaggage: true,
  },
  prompt_suggestion: {
    agentType: "auxiliary",
    ownConversation: false,
    sendRootRequestId: true,
    sendCodebuddyRequest: true,
    rootBaggage: true,
  },
};

export interface CodeBuddyRootContext {
  /** `X-Conversation-ID` / `baggage.codebuddy.session_id`. */
  conversationId: string;
  /** `X-Conversation-Request-ID` / `baggage.codebuddy.conversation_request_id`. */
  conversationRequestId: string;
  /** `X-Trace-ID` / `X-B3-TraceId` / traceparent trace-id. */
  traceId: string;
  /** Parent span of every operation belonging to this turn. */
  interactionSpanId: string;
  /** Telemetry envelope session id — deliberately distinct from the conversation. */
  sessionId: string;
}

export interface CodeBuddyOperationContext {
  root: CodeBuddyRootContext;
  agentType: AgentType;
  agentPurpose: AgentPurpose;
  conversationId: string;
  conversationRequestId: string;
  messageId: string;
  /** Mirror of `messageId` on `X-Request-ID`. */
  requestId: string;
  traceId: string;
  spanId: string;
  parentSpanId: string;
  stepIndex: number;
  /** 1-based HTTP attempt for this operation. */
  attempt: number;
}

/** RFC 9562 version 7 UUID: 48-bit big-endian unix ms + version/variant + random. */
export function createUuidv7(now: number = Date.now()): string {
  const bytes = randomBytes(16);
  // 48-bit timestamp (ms) in bytes 0..5, big-endian.
  const ts = BigInt(Math.floor(now));
  bytes[0] = Number((ts >> 40n) & 0xffn);
  bytes[1] = Number((ts >> 32n) & 0xffn);
  bytes[2] = Number((ts >> 24n) & 0xffn);
  bytes[3] = Number((ts >> 16n) & 0xffn);
  bytes[4] = Number((ts >> 8n) & 0xffn);
  bytes[5] = Number(ts & 0xffn);
  bytes[6] = (bytes[6] & 0x0f) | 0x70; // version 7
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // RFC 4122 variant
  const hex = bytes.toString("hex");
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join("-");
}

/** Fixed-width lowercase hex id. `byteLength` counts BYTES (16 bytes → 32 chars). */
export function hexId(byteLength: number): string {
  return randomBytes(byteLength).toString("hex");
}

export function createRootContext(
  options: { conversationId?: string | null; sessionId?: string | null } = {}
): CodeBuddyRootContext {
  return {
    conversationId: options.conversationId || createUuidv7(),
    conversationRequestId: hexId(16),
    traceId: hexId(16),
    interactionSpanId: hexId(8),
    sessionId: options.sessionId || createUuidv7(),
  };
}

export interface OperationOptions {
  stepIndex?: number;
  attempt?: number;
  /** Reuse an existing turn id (retries, follow-up steps of the same turn). */
  conversationRequestId?: string | null;
  /** Reuse an existing message id (retry of the same step). */
  messageId?: string | null;
  retry?: boolean;
}

/**
 * Derive one operation (a single upstream HTTP call) from a root turn.
 * A retry keeps the operation identity but allocates a fresh span.
 */
export function createOperationContext(
  root: CodeBuddyRootContext,
  purpose: AgentPurpose,
  options: OperationOptions = {}
): CodeBuddyOperationContext {
  const policy = PURPOSE_POLICY[purpose];
  const messageId = options.messageId || hexId(16);
  const stepIndex = options.stepIndex ?? 0;
  const attempt = options.retry ? (options.attempt ?? 1) + 1 : (options.attempt ?? 1);

  // The MAIN turn's request id IS the root one (that is what makes
  // `X-Root-Request-ID` meaningful). Auxiliaries describe their own request, so
  // they allocate one — even when they reuse the root conversation.
  const conversationRequestId =
    options.conversationRequestId ||
    (policy.agentType === "main" ? root.conversationRequestId : hexId(16));

  return {
    root,
    agentType: policy.agentType,
    agentPurpose: purpose,
    conversationId: policy.ownConversation ? createUuidv7() : root.conversationId,
    conversationRequestId,
    messageId,
    requestId: messageId,
    traceId: root.traceId,
    spanId: hexId(8),
    parentSpanId: root.interactionSpanId,
    stepIndex,
    attempt,
  };
}

/**
 * Derive the context of a RETRY of an operation that already ran.
 *
 * A retry re-sends the SAME message: the captured CLI keeps the message id and
 * only advances its attempt counter, and the telemetry needs the same grouping
 * to report one message with N attempts instead of N phantom messages. What
 * changes is the attempt (it feeds `x-stainless-retry-count`) and the span,
 * which gets a fresh id parented by the previous attempt's span.
 *
 * A second DISPATCH of the same request body is NOT a retry (the caller re-sent
 * the turn deliberately, e.g. an agent loop): it keeps the conversation but
 * allocates a fresh message/request identity through `createOperationContext`.
 */
export function deriveRetryContext(
  previous: CodeBuddyOperationContext,
  options: { messageId?: string | null; conversationRequestId?: string | null } = {}
): CodeBuddyOperationContext {
  const messageId = options.messageId || hexId(16);
  const conversationRequestId = options.conversationRequestId || hexId(16);
  return {
    ...previous,
    conversationRequestId,
    messageId,
    requestId: messageId,
    spanId: hexId(8),
    parentSpanId: previous.spanId,
    attempt: previous.attempt + 1,
  };
}

/** Headers for one operation, minus auth/CLI profile (added by the executor). */
export function buildCorrelationHeaders(op: CodeBuddyOperationContext): Record<string, string> {
  const policy = PURPOSE_POLICY[op.agentPurpose];
  const headers: Record<string, string> = {
    "X-Conversation-ID": op.conversationId,
    "X-Conversation-Request-ID": op.conversationRequestId,
    "X-Conversation-Message-ID": op.messageId,
    "X-Request-ID": op.requestId,
    "X-Trace-ID": op.traceId,
    "X-B3-TraceId": op.traceId,
    "X-B3-SpanId": op.spanId,
    "X-B3-ParentSpanId": op.parentSpanId,
    traceparent: buildTraceparent(op),
    b3: buildB3(op),
    baggage: buildBaggage(op),
  };

  if (policy.sendRootRequestId) {
    headers["X-Root-Request-ID"] = op.root.conversationRequestId;
  }
  if (policy.sendCodebuddyRequest) {
    headers["x-codebuddy-request"] = "1";
  }

  return headers;
}

/** W3C baggage. Always describes the ROOT turn, never the auxiliary call. */
export function buildBaggage(op: CodeBuddyOperationContext): string {
  return [
    `codebuddy.session_id=${op.root.conversationId}`,
    `codebuddy.conversation_request_id=${op.root.conversationRequestId}`,
  ].join(",");
}

export function buildTraceparent(op: CodeBuddyOperationContext): string {
  return `00-${op.traceId}-${op.spanId}-01`;
}

export function buildB3(op: CodeBuddyOperationContext): string {
  return `${op.traceId}-${op.spanId}-1-${op.parentSpanId}`;
}
