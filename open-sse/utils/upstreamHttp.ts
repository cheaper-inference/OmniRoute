import { z } from "zod";

export const UPSTREAM_HTTP_ATTEMPT = "upstream_http_attempt";
export const TRANSPORT_ERROR_LABEL = "Upstream transport error";
export const NO_RESPONSE_LABEL = "No HTTP response observed";
const count = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
const time = z.number().finite().nonnegative();
export const httpAttemptSchema = z
  .object({
    id: z.string().uuid(),
    ordinal: count.min(1),
    provider: z.string().max(64),
    model: z.string().max(128),
    connectionId: z.string().max(96).nullable(),
    method: z.literal("POST"),
    endpoint: z.enum([
      "chat_completions",
      "responses",
      "messages",
      "generate_content",
      "antigravity_generate",
      "unknown",
    ]),
    startedAt: time,
    endedAt: time.nullable(),
    cutoffAt: time.nullable(),
    durationMs: time.nullable(),
    status: z.number().int().min(100).max(599).nullable(),
    outcome: z.enum(["response", "transport_error", "no_response_observed"]),
    retryReason: z.enum(["unknown", "quota_header_removed_after_403", "body_rewritten_after_400"]),
  })
  .strip();
export type HttpAttemptRecord = z.infer<typeof httpAttemptSchema>;
const upstreamHttpSchema = z.discriminatedUnion("role", [
  z
    .object({
      version: z.literal(1),
      groupId: z.string().uuid(),
      role: z.literal("attempt"),
      send: httpAttemptSchema,
    })
    .strip(),
  z
    .object({
      version: z.literal(1),
      groupId: z.string().uuid(),
      role: z.literal("logical"),
      send: httpAttemptSchema.nullable(),
      total: count,
      failed: count,
      omitted: count,
      logicalOutcome: z.enum(["success", "failure", "unknown"]),
    })
    .strip(),
]);
export type UpstreamHttpSummary = z.infer<typeof upstreamHttpSchema>;

function isValidHttpAttempt(send: HttpAttemptRecord): boolean {
  if (new TextEncoder().encode(JSON.stringify(send)).length > 1024) return false;
  if (
    send.outcome === "response"
      ? send.status === null || send.endedAt === null
      : send.status !== null || send.durationMs !== null
  )
    return false;
  if (send.outcome === "no_response_observed") {
    if (send.endedAt !== null || send.cutoffAt === null) return false;
  } else if (send.endedAt === null || send.cutoffAt !== null) return false;
  if (send.outcome === "response" && send.durationMs === null) return false;
  return true;
}

/** One projection for persistence, API DTOs and browser display; never returns unknown members. */
export function parseUpstreamHttp(value: unknown): UpstreamHttpSummary | null {
  const result = upstreamHttpSchema.safeParse(value);
  if (!result.success) return null;
  const summary = result.data;
  const send = summary.send;
  if (send && !isValidHttpAttempt(send)) return null;
  if (
    summary.role === "logical" &&
    (summary.failed > summary.total ||
      summary.omitted > summary.total ||
      (summary.send && summary.send.ordinal > summary.total))
  )
    return null;
  return summary;
}

type DisplayRow = {
  status?: number;
  active?: boolean;
  error?: unknown;
  requestType?: string | null;
  upstreamHttp?: unknown;
};
export function classifyHttpLog(row: DisplayRow) {
  if (row.active) return "pending" as const;
  if (row.requestType === UPSTREAM_HTTP_ATTEMPT && !row.status) {
    const summary = parseUpstreamHttp(row.upstreamHttp);
    return summary?.send?.outcome === "no_response_observed" || row.error === NO_RESPONSE_LABEL
      ? ("no_response" as const)
      : ("transport_error" as const);
  }
  return Number(row.status) >= 400 || Boolean(row.error)
    ? ("error" as const)
    : ("completed" as const);
}
export function isHttpLogError(row: DisplayRow): boolean {
  const kind = classifyHttpLog(row);
  return kind === "error" || kind === "transport_error";
}
