/**
 * Muse Code subscription usage, as Meta reports it to the Muse Code client.
 *
 * Every Muse Code Responses stream ends, after `response.completed`, with one non-standard event:
 *
 *   event: response.subscription_usage
 *   data: {"type":"response.subscription_usage","subscription":{"tier":"<tier id>",
 *          "window":{"used_percent":6,"resets_at":1794119418,"window_duration_mins":300},
 *          "weekly":{"used_percent":4,"resets_at":1794182400}}}
 *
 * `window` is the rolling session window (5 h), `weekly` the weekly allowance; `resets_at` is in
 * Unix seconds. This module reads that frame off the stream without altering it, keeps the latest
 * reading on the connection (`providerSpecificData.subscriptionUsage`), and turns a stored reading
 * into the `session` / `weekly` quota windows the usage page and quota routing already understand.
 */
import { getRegisteredConnectionStore } from "../utils/registeredConnectionStore.ts";

export const MUSE_SUBSCRIPTION_USAGE_EVENT = "response.subscription_usage";

const WEEK_SECONDS = 7 * 24 * 60 * 60;

export type MuseUsageWindow = {
  usedPercent: number;
  /** ISO timestamp when the window resets. */
  resetAt: string;
  windowSeconds: number;
};

/** The latest subscription usage Meta reported for one connection. */
export type MuseSubscriptionUsage = {
  tierId?: string;
  window?: MuseUsageWindow;
  weekly?: MuseUsageWindow;
  /** ISO timestamp of the stream that carried the reading. */
  observedAt: string;
};

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function finiteNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/** A window whose numbers are in domain, or null. Out-of-domain windows are ignored, not clamped. */
function parseWindow(raw: unknown, fallbackSeconds: number | null): MuseUsageWindow | null {
  const record = asRecord(raw);
  if (!record) return null;
  const usedPercent = finiteNumber(record.used_percent);
  const resetsAt = finiteNumber(record.resets_at);
  const minutes = finiteNumber(record.window_duration_mins);
  const windowSeconds = minutes !== null && minutes > 0 ? minutes * 60 : fallbackSeconds;
  if (usedPercent === null || usedPercent < 0 || usedPercent > 100) return null;
  if (
    resetsAt === null ||
    resetsAt <= 0 ||
    windowSeconds === null ||
    !Number.isFinite(windowSeconds) ||
    windowSeconds <= 0
  )
    return null;
  const resetDate = new Date(resetsAt * 1000);
  // Beyond the Date range (`resets_at` > 8.64e12 s) there is no instant to report.
  if (Number.isNaN(resetDate.getTime())) return null;
  return { usedPercent, resetAt: resetDate.toISOString(), windowSeconds };
}

/**
 * Parse one `response.subscription_usage` payload. Returns null for any other event, or when
 * neither window is usable.
 */
export function parseMuseSubscriptionUsageEvent(
  payload: unknown,
  observedAt: Date = new Date()
): MuseSubscriptionUsage | null {
  const event = asRecord(payload);
  if (!event || event.type !== MUSE_SUBSCRIPTION_USAGE_EVENT) return null;
  const subscription = asRecord(event.subscription);
  if (!subscription) return null;
  const window = parseWindow(subscription.window, null);
  const weekly = parseWindow(subscription.weekly, WEEK_SECONDS);
  if (!window && !weekly) return null;
  return {
    ...(typeof subscription.tier === "string" && subscription.tier
      ? { tierId: subscription.tier }
      : {}),
    ...(window ? { window } : {}),
    ...(weekly ? { weekly } : {}),
    observedAt: observedAt.toISOString(),
  };
}

/** The blank line that ends an SSE block, with LF or CRLF line endings. */
const SSE_BLOCK_END_SOURCE = String.raw`\r?\n\r?\n`;
/** The longest separator (`\r\n\r\n`) can start this many characters before a chunk boundary. */
const SEPARATOR_OVERLAP = 3;
/**
 * The usage frame is a few hundred bytes. A block that grows past this without ending cannot be
 * it, so its text is dropped instead of buffered (the upstream base URL is configurable per
 * connection, so the stream is not always from a trusted host).
 */
const MAX_PENDING_CHARS = 1024 * 1024;

/** The `response.subscription_usage` payload of one SSE block, or null for any other block. */
function usagePayloadOf(block: string): unknown {
  let eventName: string | null = null;
  const data: string[] = [];
  for (const line of block.split(/\r?\n/)) {
    if (line.startsWith("event:")) eventName = line.slice(6).trim();
    else if (line.startsWith("data:")) data.push(line.slice(5).trimStart());
  }
  if (eventName !== null && eventName !== MUSE_SUBSCRIPTION_USAGE_EVENT) return null;
  const text = data.join("\n");
  if (!text.includes(MUSE_SUBSCRIPTION_USAGE_EVENT)) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/**
 * Return `response` with a body that yields exactly the same bytes, calling `onUsage` with the
 * last usage reading the stream carries once the stream ends. Non-SSE responses are returned as
 * they are. A failing `onUsage` never affects the stream.
 */
export function tapMuseSubscriptionUsage(
  response: Response,
  onUsage: (usage: MuseSubscriptionUsage) => void | Promise<void>
): Response {
  const contentType = response.headers.get("content-type") || "";
  if (!response.body || !contentType.includes("text/event-stream")) return response;
  const decoder = new TextDecoder();
  // Per tap: the scan resumes from `lastIndex`, so each character is searched about once.
  const blockEnd = new RegExp(SSE_BLOCK_END_SOURCE, "g");
  let pending = "";
  // A dropped block is still the same event until its blank line arrives. Keeping
  // only the separator overlap bounds retained text without admitting its tail.
  let droppingBlock = false;
  let latest: MuseSubscriptionUsage | null = null;
  const inspect = (block: string) => {
    if (!block.includes(MUSE_SUBSCRIPTION_USAGE_EVENT)) return;
    const usage = parseMuseSubscriptionUsageEvent(usagePayloadOf(block));
    if (usage) latest = usage;
  };
  const tap = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      controller.enqueue(chunk);
      // Text already in `pending` held no separator, except one cut by the chunk boundary.
      blockEnd.lastIndex = Math.max(0, pending.length - SEPARATOR_OVERLAP);
      pending += decoder.decode(chunk, { stream: true });
      let separator = blockEnd.exec(pending);
      while (separator) {
        if (!droppingBlock && separator.index <= MAX_PENDING_CHARS) {
          inspect(pending.slice(0, separator.index));
        }
        droppingBlock = false;
        pending = pending.slice(separator.index + separator[0].length);
        blockEnd.lastIndex = 0;
        separator = blockEnd.exec(pending);
      }
      if (droppingBlock || pending.length > MAX_PENDING_CHARS) {
        droppingBlock = true;
        pending = pending.slice(-SEPARATOR_OVERLAP);
      }
    },
    flush() {
      pending += decoder.decode();
      if (!droppingBlock && pending.length <= MAX_PENDING_CHARS && pending.trim()) inspect(pending);
      const usage = latest;
      if (!usage) return;
      try {
        void Promise.resolve(onUsage(usage)).catch(() => undefined);
      } catch {
        // A reading that cannot be recorded must never break the response.
      }
    },
  });
  return new Response(response.body.pipeThrough(tap), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

/** Keep a reading on its connection, for the usage page and quota routing. */
export async function recordMuseSubscriptionUsage(
  connectionId: string | null | undefined,
  usage: MuseSubscriptionUsage
): Promise<void> {
  if (!connectionId) return;
  const store = getRegisteredConnectionStore();
  if (!store) return;
  try {
    await store.mergeConnectionProviderSpecificData(connectionId, { subscriptionUsage: usage });
  } catch (error) {
    console.warn(
      `[muse-code] Could not record subscription usage for ${connectionId}:`,
      (error as { message?: string } | null)?.message || error
    );
  }
}

/**
 * Read the usage frame off a Muse Code response, for the connection that served it. Every other
 * provider's response, a response without a connection, and a live-test probe (which must not
 * write account state) are returned untouched.
 */
export async function observeMuseSubscriptionUsage(input: {
  provider: string;
  connectionId: unknown;
  response: Response;
  isProbe: () => Promise<boolean>;
}): Promise<Response> {
  const { provider, connectionId, response } = input;
  if (provider !== "muse-code" || !connectionId || (await input.isProbe())) return response;
  const id = String(connectionId);
  return tapMuseSubscriptionUsage(response, (usage) => recordMuseSubscriptionUsage(id, usage));
}

function readWindow(raw: unknown): MuseUsageWindow | null {
  const record = asRecord(raw);
  if (!record) return null;
  const usedPercent = finiteNumber(record.usedPercent);
  const windowSeconds = finiteNumber(record.windowSeconds);
  const resetAt = typeof record.resetAt === "string" ? record.resetAt : null;
  if (usedPercent === null || usedPercent < 0 || usedPercent > 100) return null;
  if (windowSeconds === null || windowSeconds <= 0) return null;
  if (resetAt === null || Number.isNaN(Date.parse(resetAt))) return null;
  return { usedPercent, resetAt, windowSeconds };
}

/** A stored reading (`providerSpecificData.subscriptionUsage`), or null when absent or malformed. */
export function readStoredMuseSubscriptionUsage(raw: unknown): MuseSubscriptionUsage | null {
  const record = asRecord(raw);
  if (
    !record ||
    typeof record.observedAt !== "string" ||
    Number.isNaN(Date.parse(record.observedAt))
  )
    return null;
  const window = readWindow(record.window);
  const weekly = readWindow(record.weekly);
  if (!window && !weekly) return null;
  return {
    ...(typeof record.tierId === "string" ? { tierId: record.tierId } : {}),
    ...(window ? { window } : {}),
    ...(weekly ? { weekly } : {}),
    observedAt: record.observedAt,
  };
}

export type MuseUsageQuota = {
  used: number;
  total: number;
  remaining: number;
  remainingPercentage: number;
  resetAt: string | null;
  unlimited: false;
  windowSeconds: number;
  fractionReported: boolean;
  displayName: string;
};

function toQuota(window: MuseUsageWindow, displayName: string, now: number): MuseUsageQuota {
  // A window that has reset since the reading was taken starts again from zero; the reading no
  // longer says how much of the new window is used, so the fraction is not reported.
  if (Date.parse(window.resetAt) <= now) {
    return {
      used: 0,
      total: 100,
      remaining: 100,
      remainingPercentage: 100,
      resetAt: null,
      unlimited: false,
      windowSeconds: window.windowSeconds,
      fractionReported: false,
      displayName,
    };
  }
  return {
    used: window.usedPercent,
    total: 100,
    remaining: 100 - window.usedPercent,
    remainingPercentage: 100 - window.usedPercent,
    resetAt: window.resetAt,
    unlimited: false,
    windowSeconds: window.windowSeconds,
    fractionReported: true,
    displayName,
  };
}

function sessionLabel(windowSeconds: number): string {
  const hours = windowSeconds / 3600;
  return Number.isInteger(hours) ? `Session (${hours}h)` : "Session";
}

/** The reading as `session` / `weekly` quota windows, in percent of each allowance. */
export function museUsageQuotas(
  usage: MuseSubscriptionUsage,
  now: number = Date.now()
): Record<string, MuseUsageQuota> {
  const quotas: Record<string, MuseUsageQuota> = {};
  if (usage.window) {
    quotas.session = toQuota(usage.window, sessionLabel(usage.window.windowSeconds), now);
  }
  if (usage.weekly) quotas.weekly = toQuota(usage.weekly, "Weekly", now);
  return quotas;
}
