import type { CodeBuddyOperationContext } from "./context.ts";

/**
 * CodeBuddy International CLI request body.
 *
 * Captured invariants (CLI/2.175.0):
 *  - `stream: true` and `stream_options.include_usage: true` on every call;
 *  - `cache_retention: "long"`;
 *  - `extra_vars.harnessMetadata` is a JSON STRING, not a nested object;
 *  - reasoning parameters are opt-in per request (`reasoning_effort` was
 *    present on the Kimi turn and absent on the auxiliary calls), so this
 *    module never invents them.
 */

export const HARNESS_METADATA_KEY = "harnessMetadata";

export interface HarnessMetadata {
  sessionId: string;
  conversationId: string;
  conversationRequestId: string;
  messageId: string;
  traceId: string;
  spanId: string;
  stepIndex: number;
  agentType: string;
  agentPurpose: string;
  model?: string;
}

export interface ApplyCliBodyOptions {
  op: CodeBuddyOperationContext;
  /** Harness counters — deliberately distinct from `harnessMetadata.stepIndex`. */
  currentStepCount?: number;
  totalStepCount?: number;
  stepIndex?: number;
}

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function buildHarnessMetadata(
  op: CodeBuddyOperationContext,
  options: { stepIndex?: number; model?: string } = {}
): HarnessMetadata {
  const metadata: HarnessMetadata = {
    // The telemetry envelope session id is intentionally NOT used here: the
    // captured `codebuddy.session_id` carries the CONVERSATION id.
    sessionId: op.root.conversationId,
    conversationId: op.conversationId,
    conversationRequestId: op.conversationRequestId,
    messageId: op.messageId,
    traceId: op.traceId,
    spanId: op.spanId,
    stepIndex: options.stepIndex ?? op.stepIndex,
    agentType: op.agentType,
    agentPurpose: op.agentPurpose,
  };
  if (options.model) metadata.model = options.model;
  return metadata;
}

/**
 * Apply the CLI body contract. Returns a NEW object — the caller's body (which
 * may be the live translated body) is never mutated.
 *
 * Non-enumerable and symbol-keyed side channels survive the copy: the CodeBuddy
 * translators attach `_toolNameMap` (a `Map`) to the transformed body so the
 * response can restore sanitized tool names, and dropping it silently breaks
 * tool-call recovery.
 */
export function applyCliBody(body: unknown, options: ApplyCliBodyOptions): JsonRecord {
  const base: JsonRecord = isRecord(body) ? { ...body } : {};
  const { op } = options;

  base.stream = true;
  base.stream_options = {
    ...(isRecord(base.stream_options) ? base.stream_options : {}),
    include_usage: true,
  };
  base.cache_retention = "long";

  const extraVars: JsonRecord = isRecord(base.extra_vars) ? { ...base.extra_vars } : {};
  extraVars[HARNESS_METADATA_KEY] = JSON.stringify(
    buildHarnessMetadata(op, {
      stepIndex: options.stepIndex,
      model: typeof base.model === "string" ? base.model : undefined,
    })
  );
  base.extra_vars = extraVars;

  if (typeof options.currentStepCount === "number") {
    base.currentStepCount = options.currentStepCount;
  }
  if (typeof options.totalStepCount === "number") {
    base.totalStepCount = options.totalStepCount;
  }

  // Preserve side channels (own properties the translators attach, including
  // non-enumerable ones and symbols) that a spread would not carry over.
  if (isRecord(body)) {
    for (const key of Reflect.ownKeys(body)) {
      if (key in base) continue;
      const descriptor = Object.getOwnPropertyDescriptor(body, key);
      if (!descriptor) continue;
      Object.defineProperty(base, key, descriptor);
    }
  }

  return base;
}

/** Read back the serialized metadata. Returns null on any malformed shape. */
export function readHarnessMetadata(body: unknown): HarnessMetadata | null {
  if (!isRecord(body)) return null;
  const extraVars = body.extra_vars;
  if (!isRecord(extraVars)) return null;
  const raw = extraVars[HARNESS_METADATA_KEY];
  if (typeof raw !== "string" || !raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isRecord(parsed) ? (parsed as unknown as HarnessMetadata) : null;
  } catch {
    return null;
  }
}
