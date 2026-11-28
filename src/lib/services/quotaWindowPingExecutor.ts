/**
 * quotaWindowPingExecutor.ts — the one tiny billed request a quota window ping sends.
 *
 * The ping goes through the normal chat-path executor registry (never a feature-local
 * HTTP client) with a body that spends as little quota as possible: a Codex Responses
 * stream that only counts when it carries `response.completed`, or a Claude
 * non-streaming message that must parse as a complete message object. The executor
 * re-checks the exclusive lease immediately before dispatch, cancels a failed
 * response body like the legacy path, and reports fixed outcome codes only.
 */
import { QUOTA_WINDOW_PING_REQUEST_TYPE } from "@/shared/constants/quotaWindowPing";
import type { QuotaWindowDescriptor } from "@/shared/types/quotaWindowPing";
import { readCodexPingOutcome } from "./quotaAutoPingOutcome";
import type { QuotaWindowPingConnection, QuotaWindowPingDeps } from "./quotaWindowPing";

export interface QuotaWindowPingPingResult {
  status: "succeeded" | "failed" | "skipped";
  reason: "completed" | "not_completed" | "timeout" | "error" | "exclusive_lease";
  durationMs: number;
  httpStatus: number | null;
}

type PingSendDeps = Pick<
  QuotaWindowPingDeps,
  "getExecutor" | "isConnectionUnavailableToAuxiliaryActivity"
>;

type PingExecuteDeps = Pick<
  QuotaWindowPingDeps,
  "getExecutor" | "saveCallLog" | "isConnectionUnavailableToAuxiliaryActivity"
>;

type PingSendResult = { ok: boolean; httpStatus: number | null; url: string | null };

/** Raised when the lease re-check blocks dispatch; mapped to `skipped/exclusive_lease`. */
class ExclusiveLeaseError extends Error {
  constructor() {
    super("exclusive_lease");
    this.name = "ExclusiveLeaseError";
  }
}

class PingAbortedError extends Error {
  constructor() {
    super("aborted");
    this.name = "PingAbortedError";
  }
}

function isClaudePing(descriptor: QuotaWindowDescriptor): boolean {
  return descriptor.provider === "claude";
}

/** The minimal ping body per provider: the smallest request that still reports usage. */
function buildPingBody(
  descriptor: QuotaWindowDescriptor,
  pingModel: string
): Record<string, unknown> {
  if (isClaudePing(descriptor)) {
    return {
      model: pingModel,
      max_tokens: descriptor.pingMaxTokens ?? 1,
      messages: [{ role: "user", content: descriptor.pingText }],
    };
  }
  return {
    model: pingModel,
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: descriptor.pingText }],
      },
    ],
    instructions: descriptor.pingInstructions,
    reasoning: descriptor.pingReasoningEffort
      ? { effort: descriptor.pingReasoningEffort, summary: "auto" }
      : undefined,
    store: false,
    stream: true,
  };
}

async function cancelBody(response: Response | undefined): Promise<void> {
  try {
    await (response as { body?: { cancel?: () => Promise<void> } })?.body?.cancel?.();
  } catch {
    // Best-effort cleanup of an already-failed ping, same as the legacy path.
  }
}

/** Claude non-streaming outcome: a complete JSON message object. */
export async function readClaudePingOutcome(
  response: Response
): Promise<"completed" | "failed" | "incomplete"> {
  let parsed: unknown;
  try {
    parsed = await response.json();
  } catch {
    return "incomplete";
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return "incomplete";
  const message = parsed as Record<string, unknown>;
  if (message.type === "error") return "failed";
  if (message.type !== "message" || typeof message.stop_reason !== "string") return "incomplete";
  return "completed";
}

export async function sendQuotaWindowPing(
  descriptor: QuotaWindowDescriptor,
  connection: QuotaWindowPingConnection,
  pingModel: string,
  deps: PingSendDeps,
  signal?: AbortSignal
): Promise<PingSendResult> {
  if (await deps.isConnectionUnavailableToAuxiliaryActivity(connection.id)) {
    throw new ExclusiveLeaseError();
  }

  const executor = await deps.getExecutor(descriptor.provider);
  const claude = isClaudePing(descriptor);
  const result = await executor.execute({
    model: pingModel,
    stream: !claude,
    signal,
    credentials: {
      accessToken: connection.accessToken,
      connectionId: connection.id,
      providerSpecificData: connection.providerSpecificData,
    },
    log: null,
    body: buildPingBody(descriptor, pingModel),
  });
  const record = result as { response?: Response; url?: string };
  const response = record.response;
  const url = record.url ?? null;

  if (!response) return { ok: false, httpStatus: null, url };
  if (!response.ok) {
    await cancelBody(response);
    return { ok: false, httpStatus: response.status, url };
  }
  if (claude) {
    const outcome = await readClaudePingOutcome(response);
    if (outcome !== "completed") await cancelBody(response);
    return { ok: outcome === "completed", httpStatus: response.status, url };
  }
  const outcome = await readCodexPingOutcome(response);
  if (outcome !== "completed") await cancelBody(response);
  return { ok: outcome === "completed", httpStatus: response.status, url };
}

function raceWithAbort<T>(work: Promise<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) return Promise.reject(new PingAbortedError());
  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(new PingAbortedError());
    signal.addEventListener("abort", onAbort, { once: true });
    work.then(
      (value) => {
        signal.removeEventListener("abort", onAbort);
        resolve(value);
      },
      (error) => {
        signal.removeEventListener("abort", onAbort);
        reject(error);
      }
    );
  });
}

function writeCallLog(
  deps: PingExecuteDeps,
  descriptor: QuotaWindowDescriptor,
  connection: QuotaWindowPingConnection,
  pingModel: string,
  result: PingSendResult,
  durationMs: number
): Promise<void> {
  return deps
    .saveCallLog(
      {
        timestamp: new Date().toISOString(),
        method: "POST",
        path: result.url ?? "quota-window-ping",
        status: result.httpStatus ?? 0,
        model: pingModel,
        provider: descriptor.provider,
        connectionId: connection.id,
        duration: durationMs,
        error: null,
        requestType: QUOTA_WINDOW_PING_REQUEST_TYPE,
        noLog: false,
      },
      true
    )
    .catch(() => undefined);
}

export async function executeQuotaWindowPing(
  input: {
    target: unknown;
    descriptor: QuotaWindowDescriptor;
    connection: QuotaWindowPingConnection;
    pingModel: string;
    signal: AbortSignal;
  },
  deps: PingExecuteDeps
): Promise<QuotaWindowPingPingResult> {
  const startedAt = Date.now();
  const { descriptor, connection, pingModel, signal } = input;
  const duration = () => Date.now() - startedAt;

  const skipped = (): QuotaWindowPingPingResult => ({
    status: "skipped",
    reason: "exclusive_lease",
    durationMs: duration(),
    httpStatus: null,
  });

  try {
    if (await deps.isConnectionUnavailableToAuxiliaryActivity(connection.id)) return skipped();

    const result = await raceWithAbort(
      sendQuotaWindowPing(descriptor, connection, pingModel, deps, signal),
      signal
    );
    await writeCallLog(deps, descriptor, connection, pingModel, result, duration());
    return {
      status: result.ok ? "succeeded" : "failed",
      reason: result.ok ? "completed" : "not_completed",
      durationMs: duration(),
      httpStatus: result.httpStatus,
    };
  } catch (error) {
    if (error instanceof ExclusiveLeaseError) return skipped();
    // A timed-out request may still have reached the provider, so it is audited too.
    await writeCallLog(
      deps,
      descriptor,
      connection,
      pingModel,
      { ok: false, httpStatus: null, url: null },
      duration()
    );
    return {
      status: "failed",
      reason: signal.aborted ? "timeout" : "error",
      durationMs: duration(),
      httpStatus: null,
    };
  }
}
