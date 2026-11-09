import {
  currentHttpAttemptCollector,
  isProviderRequestCaptureActive,
} from "./providerRequestCaptureContext.ts";
import { randomUUID } from "node:crypto";
import type { HttpAttemptRecord, UpstreamHttpSummary } from "./upstreamHttp.ts";

export type HttpAttemptMetadata = Pick<
  HttpAttemptRecord,
  "provider" | "model" | "connectionId" | "endpoint"
> & {
  retryReason?: HttpAttemptRecord["retryReason"];
};
export type HttpAttemptRef = Readonly<{ groupId: string; record: Readonly<HttpAttemptRecord> }>;
export type HttpAttemptSelection = { current: HttpAttemptRef | null };
export type HttpAttemptRejectionSlot = { selection: HttpAttemptSelection | null };
const responses = new WeakMap<object, HttpAttemptRef>();
const owners = new WeakMap<HttpAttemptRef, HttpAttemptCollector>();
const encoder = new TextEncoder();
// Escaped scalar budgets leave room for fixed fields and response completion within 1 KiB.
function bounded(value: unknown, bytes: number): string {
  const text = typeof value === "string" ? value : "unknown";
  let result = "";
  for (const char of text) {
    if (encoder.encode(JSON.stringify(result + char)).length - 2 > bytes) break;
    result += char;
  }
  return result;
}

export class HttpAttemptCollector {
  readonly groupId = randomUUID();
  private sealed = false;
  private total = 0;
  private failed = 0;
  private first: HttpAttemptRef[] = [];
  private latest: HttpAttemptRef | null = null;

  begin(metadata: HttpAttemptMetadata): HttpAttemptRef | null {
    if (this.sealed) return null;
    const record: HttpAttemptRecord = {
      id: randomUUID(),
      ordinal: ++this.total,
      provider: bounded(metadata.provider, 64),
      model: bounded(metadata.model, 128),
      connectionId: metadata.connectionId ? bounded(metadata.connectionId, 96) : null,
      method: "POST",
      endpoint: metadata.endpoint,
      startedAt: Date.now(),
      endedAt: null,
      cutoffAt: null,
      durationMs: null,
      status: null,
      outcome: "no_response_observed",
      retryReason: metadata.retryReason ?? "unknown",
    };
    const ref = Object.freeze({ groupId: this.groupId, record });
    owners.set(ref, this);
    if (this.first.length < 30) this.first.push(ref);
    this.latest = ref;
    return ref;
  }

  complete(ref: HttpAttemptRef, response: Response | null): void {
    if (this.sealed || owners.get(ref) !== this) return;
    const record = ref.record as HttpAttemptRecord;
    record.endedAt = Date.now();
    record.status = response?.status ?? null;
    record.durationMs = response ? Math.max(0, record.endedAt - record.startedAt) : null;
    record.outcome = response ? "response" : "transport_error";
    if (!response || response.status >= 400) this.failed++;
    if (response) responses.set(response, ref);
  }

  selection(response: object): HttpAttemptSelection {
    let selected = this.sealed ? null : (responses.get(response) ?? null);
    const owner = this;
    return {
      get current() {
        return selected;
      },
      set current(value) {
        if (!owner.sealed && (!value || owners.get(value) === owner)) selected = value;
      },
    };
  }

  /** Seal collection and every selection synchronously before any persistence can await. */
  drain(selection: HttpAttemptSelection | null, status?: number, error?: unknown) {
    if (this.sealed) return null;
    this.sealed = true;
    const selected = selection?.current;
    const associated = selected && owners.get(selected) === this ? selected : null;
    const refs = [...this.first, this.latest, associated].filter(
      (ref): ref is HttpAttemptRef => !!ref
    );
    const unique = [...new Map(refs.map((ref) => [ref.record.id, ref])).values()];
    const cutoff = Date.now();
    const records = unique
      .map((ref) =>
        Object.freeze({
          ...ref.record,
          cutoffAt: ref.record.endedAt === null ? cutoff : null,
        })
      )
      .sort((a, b) => a.ordinal - b.ordinal);
    const send = records.find((record) => record.id === associated?.record.id) ?? null;
    const logicalStatus = status ?? 0;
    const summary: UpstreamHttpSummary = {
      version: 1,
      groupId: this.groupId,
      role: "logical",
      send,
      total: this.total,
      failed: this.failed,
      omitted: this.total - records.length,
      logicalOutcome:
        logicalStatus >= 400 || error
          ? "failure"
          : logicalStatus >= 200 && logicalStatus < 400
            ? "success"
            : "unknown",
    };
    this.first = [];
    this.latest = null;
    return Object.freeze({ records: Object.freeze(records), summary: Object.freeze(summary) });
  }
}

export function selectHttpResponse(response: object): HttpAttemptSelection | null {
  const ref = responses.get(response);
  return ref ? (owners.get(ref)?.selection(response) ?? null) : null;
}

/**
 * A re-wrapped body (for example a stream-readiness probe that hands back a new Response) is still
 * the same upstream HTTP send: keep its association so the logical row selects that send.
 */
export function retainHttpResponse(from: object, to: object): void {
  if (from === to) return;
  const ref = responses.get(from);
  if (ref && !responses.has(to)) responses.set(to, ref);
}

/** Observe only an explicit inference boundary. The exact Response/exception passes through. */
export async function observeProviderHttpSend(
  metadata: HttpAttemptMetadata,
  send: () => Promise<Response>
): Promise<Response> {
  const collector = currentHttpAttemptCollector();
  let ref: HttpAttemptRef | null = null;
  try {
    ref = collector?.begin(metadata) ?? null;
  } catch {
    /* logging is best effort */
  }
  try {
    const response = await send();
    try {
      if (ref && isProviderRequestCaptureActive()) collector?.complete(ref, response);
    } catch {
      /* logging is best effort */
    }
    return response;
  } catch (error) {
    try {
      if (ref && isProviderRequestCaptureActive()) collector?.complete(ref, null);
    } catch {
      /* logging is best effort */
    }
    throw error;
  }
}
