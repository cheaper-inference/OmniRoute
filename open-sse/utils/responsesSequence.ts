/**
 * @file responsesSequence.ts
 * @description Shared `sequence_number` convention for Responses API frames that are
 * synthesized OUTSIDE the real per-stream event emitter (open-sse/translator/response/
 * openai-responses/eventEmitter.ts, whose `state.seq` starts at 0 so the first real event
 * is numbered 1).
 *
 * The seed applies before a real response has started. Once upstream events have
 * passed through, a generated failure must retain that response identity and use
 * a sequence number beyond the greatest fully observed event.
 */
export const SYNTHETIC_RESPONSES_SEQUENCE_NUMBER = 1;

/** Bounded identity projection of complete, client-visible Responses events. */
export type ResponsesStreamContext = {
  id?: string;
  model?: string;
  createdAt?: number;
  lastSequenceNumber?: number;
};

export function withResponsesFailureContext(
  event: Record<string, unknown>,
  context: ResponsesStreamContext = {}
): Record<string, unknown> {
  if (event.type !== "response.failed") return event;
  const response = event.response;
  if (!response || typeof response !== "object" || Array.isArray(response)) return event;
  const sequence = event.sequence_number;
  const last = context.lastSequenceNumber;
  const next = last === undefined ? undefined : last + 1;
  const sequenceNumber =
    next === undefined
      ? sequence
      : typeof sequence === "number" && Number.isSafeInteger(sequence) && sequence > last!
        ? sequence
        : next;
  return {
    ...event,
    ...(sequenceNumber === undefined ? {} : { sequence_number: sequenceNumber }),
    response: {
      ...response,
      ...(context.id ? { id: context.id } : {}),
      ...(context.model ? { model: context.model } : {}),
      ...(context.createdAt === undefined ? {} : { created_at: context.createdAt }),
    },
  };
}

/** Wraps a `response.failed` payload's `response` object with the synthetic seed. */
export function buildSyntheticResponsesFailedEvent(
  response: Record<string, unknown>
): Record<string, unknown> {
  return {
    type: "response.failed",
    sequence_number: SYNTHETIC_RESPONSES_SEQUENCE_NUMBER,
    response,
  };
}

/**
 * Synthetic `response.id` for the keepalive `response.in_progress` frame (#15202).
 *
 * The value is constant on purpose: the frame is emitted once as the very first
 * stream byte, before the upstream has produced a real response id. Being a
 * string (never `null`) matters because strict Responses decoders validate
 * `response.id` as `string | undefined` and abort the stream on the first frame.
 */
export const SYNTHETIC_RESPONSES_KEEPALIVE_ID = "resp_keepalive_omniroute";

/**
 * Build a fresh string id for a synthesized `response.failed` frame (#15202).
 *
 * The `resp_error_*` prefix mirrors the precedent in streamErrorFormat.ts. A
 * fresh id per frame keeps two failures in the same request from colliding.
 */
export function buildSyntheticResponsesFailureId(): string {
  const unique =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `resp_error_${unique}`;
}
