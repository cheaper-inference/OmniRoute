import { toNumber } from "@/shared/utils/numeric";
import { hexId, type CodeBuddyOperationContext, type CodeBuddyRootContext } from "./context.ts";
import { CODEBUDDY_INTL_CLI } from "./cliProfile.ts";

/**
 * Synthetic CodeBuddy telemetry, generated locally from the REAL execution and
 * sent to the captured endpoints.
 *
 * "Synthetic" here means OmniRoute builds the report events and spans itself
 * (instead of the CLI's own instrumentation). It does NOT mean fake values: the
 * ids come from the request context, the timings from the actual stream, the
 * tokens from the upstream usage block and the bytes from the real buffers.
 */

export const REPORT_EVENT_SEQUENCE = [
  "chat_request_send",
  "chat_message_send",
  "chat_message_response",
  "chat_message_status",
  "chat_request_response",
] as const;

export type ReportEventName = (typeof REPORT_EVENT_SEQUENCE)[number];

export interface NormalizedUsage {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  reasoningTokens?: number;
  cacheHitTokens?: number;
  cacheMissTokens?: number;
  credit?: number;
}

export interface ReportEvent {
  event: ReportEventName | string;
  sessionId: string;
  conversationId: string;
  conversationRequestId: string;
  requestId: string;
  messageId: string;
  traceId: string;
  spanId: string;
  agentType: string;
  agentPurpose: string;
  model?: string;
  presentAt: string;
  firstTokenAt?: string;
  status?: string;
  message?: string;
  usage?: NormalizedUsage;
}

export interface ReportBatch {
  version: string;
  releaseDate?: string;
  commit?: string;
  featureModule: "cli_local";
  /**
   * Only ever the account's OWN machine id, when the connection carries one.
   * OmniRoute never synthesises one: a fabricated `omniroute-<platform>-<arch>`
   * both identifies the proxy as the client and leaks the host it runs on.
   */
  machineId?: string;
  sessionId: string;
  accountId?: string;
  batchRequestId: string;
  /**
   * Terminal event of the batch, at the TOP LEVEL of the envelope.
   *
   * Verified against the live gateway: `/v2/report` reads `eventCode` here, not
   * inside `events[]`. Sending it only per event is rejected with
   * `10001:eventCode is empty or not string`.
   */
  eventCode: string;
  /**
   * Milliseconds the client held the batch before reporting. The gateway accepts
   * `reportDelay` on its own; it is always sent so a batch never trips the
   * "event missing both reportDelay and timestamp fields" validation.
   */
  reportDelay: number;
  /** Epoch milliseconds. When present the gateway requires a float64, never an ISO string. */
  timestamp?: number;
  events: ReportEvent[];
}

export interface ReportCacheMetrics {
  cachedTokens: number;
  cachedWriteTokens: number;
  cachedMissTokens: number;
}

export function mapReportCacheMetrics(usage: unknown): ReportCacheMetrics {
  const record =
    usage && typeof usage === "object"
      ? (usage as Record<string, unknown>)
      : ({} as Record<string, unknown>);
  return {
    cachedTokens: toNumber(record.prompt_cache_hit_tokens, 0),
    cachedWriteTokens: toNumber(record.prompt_cache_miss_tokens, 0),
    cachedMissTokens: 0,
  };
}

function normalizeUsage(raw: unknown): NormalizedUsage | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const usage = raw as Record<string, unknown>;
  const details =
    usage.completion_tokens_details && typeof usage.completion_tokens_details === "object"
      ? (usage.completion_tokens_details as Record<string, unknown>)
      : {};

  const reasoning =
    toNumber(details.reasoning_tokens) ?? toNumber(usage.completion_thinking_tokens);

  return {
    promptTokens: toNumber(usage.prompt_tokens),
    completionTokens: toNumber(usage.completion_tokens),
    // Reasoning tokens are INCLUDED in completion_tokens: never re-add them.
    totalTokens: toNumber(usage.total_tokens),
    reasoningTokens: reasoning,
    cacheHitTokens: toNumber(usage.prompt_cache_hit_tokens),
    cacheMissTokens: toNumber(usage.prompt_cache_miss_tokens),
    credit: toNumber(usage.credit),
  };
}

export interface TelemetrySessionOptions {
  root: CodeBuddyRootContext;
  /** The account's own machine id. Omitted when the connection has none. */
  machineId?: string;
  accountId?: string;
  /** Test seam; defaults to Date.now. */
  now?: () => number;
}

/**
 * Accumulates report events for one execution session.
 *
 * The telemetry `sessionId` is NOT `root.conversationId` (the CLI sends the
 * conversation id in `baggage.codebuddy.session_id`) and NOT `root.sessionId`.
 */
export class CodeBuddyTelemetrySession {
  readonly sessionId: string;
  private readonly root: CodeBuddyRootContext;
  private readonly machineId?: string;
  private readonly accountId?: string;
  private readonly now: () => number;
  private buffer: ReportEvent[] = [];
  private readonly firstTokenAt = new Map<string, string>();

  constructor(options: TelemetrySessionOptions) {
    this.root = options.root;
    this.machineId = options.machineId;
    this.accountId = options.accountId;
    this.now = options.now ?? (() => Date.now());
    this.sessionId = hexId(16);
  }

  get events(): readonly ReportEvent[] {
    return this.buffer;
  }

  private base(op: CodeBuddyOperationContext, extra: Partial<ReportEvent>): ReportEvent {
    return {
      event: "chat_request_send",
      sessionId: this.root.conversationId,
      conversationId: op.conversationId,
      conversationRequestId: op.conversationRequestId,
      requestId: op.requestId,
      messageId: op.messageId,
      traceId: op.traceId,
      spanId: op.spanId,
      agentType: op.agentType,
      agentPurpose: op.agentPurpose,
      presentAt: new Date(this.now()).toISOString(),
      ...extra,
    };
  }

  private push(
    op: CodeBuddyOperationContext,
    event: ReportEventName,
    extra: Partial<ReportEvent> = {}
  ) {
    this.buffer.push(this.base(op, { ...extra, event }));
  }

  requestSend(op: CodeBuddyOperationContext, extra: { model?: string } = {}) {
    this.push(op, "chat_request_send", { model: extra.model });
  }

  messageSend(op: CodeBuddyOperationContext, extra: { model?: string } = {}) {
    this.push(op, "chat_message_send", { model: extra.model });
  }

  /** Record the first token of the stream (reasoning or content). */
  firstToken(op: CodeBuddyOperationContext) {
    if (this.firstTokenAt.has(op.messageId)) return;
    this.firstTokenAt.set(op.messageId, new Date(this.now()).toISOString());
  }

  messageResponse(
    op: CodeBuddyOperationContext,
    extra: { content?: string; usage?: unknown; model?: string } = {}
  ) {
    this.push(op, "chat_message_response", {
      model: extra.model,
      firstTokenAt: this.firstTokenAt.get(op.messageId),
      usage: normalizeUsage(extra.usage),
    });
  }

  messageStatus(op: CodeBuddyOperationContext, extra: { status?: string; message?: string } = {}) {
    this.push(op, "chat_message_status", { status: extra.status, message: extra.message });
  }

  requestResponse(op: CodeBuddyOperationContext, extra: { status?: string } = {}) {
    this.push(op, "chat_request_response", { status: extra.status });
  }

  /** Terminal path for errors, cancellation and timeouts. */
  fail(op: CodeBuddyOperationContext, extra: { status: string; message?: string }) {
    // `cancelled` is a CLIENT-side stop, not a provider failure: it is closed
    // through the same terminal events but must stay distinguishable from
    // `error` so it never reads as an upstream fault.
    this.messageStatus(op, { status: extra.status, message: extra.message });
    this.requestResponse(op, { status: extra.status });
  }

  /** Drain the buffer into one batch (events are never sent twice). */
  buildBatch(): ReportBatch {
    const events = this.buffer;
    this.buffer = [];
    // The envelope's `eventCode`/`reportDelay`/`timestamp` are the fields the
    // gateway validates (verified live — see ReportBatch). The terminal event
    // names the batch; the oldest event stamps when it was observed.
    const terminal = events.length ? events[events.length - 1] : null;
    const first = events.length ? events[0] : null;
    const observedAtMs = first ? Date.parse(first.presentAt) : NaN;
    const reportDelay =
      Number.isFinite(observedAtMs) && observedAtMs > 0
        ? Math.max(0, Date.now() - observedAtMs)
        : 0;

    return {
      version: CODEBUDDY_INTL_CLI.version,
      featureModule: "cli_local",
      ...(this.machineId ? { machineId: this.machineId } : {}),
      sessionId: this.sessionId,
      ...(this.accountId ? { accountId: this.accountId } : {}),
      batchRequestId: hexId(16),
      eventCode: terminal ? String(terminal.event) : "",
      reportDelay,
      timestamp: Date.now(),
      events,
    };
  }
}
