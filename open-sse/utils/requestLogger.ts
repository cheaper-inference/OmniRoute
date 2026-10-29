import { getPendingById, updatePendingRequestStreamChunksById } from "@/lib/usage/usageHistory";
import { getChatLogMaxDepth, getChatLogArrayTailItems } from "@/lib/logEnv";
import { sanitizeErrorMessage } from "./error.ts";
import { redactUrlQuerySecrets } from "./errorSanitization.ts";

type JsonRecord = Record<string, unknown>;

type HeaderInput =
  | Headers
  | Record<string, unknown>
  | { entries?: () => IterableIterator<[string, string]> }
  | null
  | undefined;

export type RequestPipelinePayloads = {
  routeDecision?: JsonRecord;
  clientRawRequest?: JsonRecord;
  openaiRequest?: JsonRecord;
  providerRequest?: JsonRecord;
  providerResponse?: JsonRecord;
  clientResponse?: JsonRecord;
  error?: JsonRecord;
  toolLoop?: { legs: JsonRecord[] };
  streamChunks?: {
    provider?: string[];
    openai?: string[];
    client?: string[];
  };
};

type RequestLogger = {
  sessionPath: null;
  logClientRawRequest: (
    endpoint: unknown,
    body: unknown,
    headers?: HeaderInput,
    effectiveInput?: unknown
  ) => void;
  logRouteDecision: (decision: unknown) => void;
  logOpenAIRequest: (body: unknown) => void;
  logTargetRequest: (url: unknown, headers: HeaderInput, body: unknown) => void;
  logProviderResponse: (
    status: unknown,
    statusText: unknown,
    headers: HeaderInput,
    body: unknown
  ) => void;
  logProviderDiagnostic: (diagnostic: JsonRecord | null) => void;
  appendProviderChunk: (chunk: string) => void;
  appendOpenAIChunk: (chunk: string) => void;
  logConvertedResponse: (body: unknown) => void;
  appendConvertedChunk: (chunk: string) => void;
  logError: (error: unknown, requestBody?: unknown) => void;
  logToolLoopReceipt: (receipt: unknown) => void;
  getPipelinePayloads: () => RequestPipelinePayloads | null;
};

type RequestLoggerOptions = {
  enabled?: boolean;
  captureStreamChunks?: boolean;
  maxStreamChunkBytes?: number;
  maxStreamChunkItems?: number;
  requestId?: string | null;
  model?: string;
  provider?: string;
  connectionId?: string | null;
};

const DEFAULT_MAX_STREAM_CHUNK_BYTES = 128 * 1024;
const DEFAULT_MAX_STREAM_CHUNK_ITEMS = 10_240;
const STREAM_CHUNK_SYNC_THRESHOLD = 64 * 1024;
const MAX_LOG_STRING_LENGTH = 64 * 1024;
// Was its own separate hardcoded 24, independent of the sibling
// cloneBoundedChatLogPayload (chatCore/logTruncation.ts) implementation's
// configurable cap — the two duplicated the same "bound an array for
// logging" policy with different, drifting limits. Sharing
// getChatLogArrayTailItems() keeps both bounding passes over the same
// artifact data consistent. Read once at module load, matching this file's
// existing plain-constant shape; CHAT_LOG_ARRAY_TAIL_ITEMS still overrides it.
export const MAX_LOG_ARRAY_ITEMS = getChatLogArrayTailItems();
const MAX_LOG_OBJECT_KEYS = 80;
const MAX_TOOL_LOOP_LEGS = 4;

function maskSensitiveHeaders(headers: HeaderInput): Record<string, unknown> {
  if (!headers) return {};

  const headerEntries =
    typeof (headers as Headers).entries === "function"
      ? Object.fromEntries((headers as Headers).entries())
      : { ...(headers as Record<string, unknown>) };

  const masked = { ...headerEntries };
  const sensitiveKeys = [
    "authorization",
    "x-api-key",
    "apikey",
    "cookie",
    "token",
    "secret",
    "password",
    "runtimekey",
    "storage-state",
    "storagestate",
    "capability",
    "x-omniroute-lease-owner",
  ];

  for (const key of Object.keys(masked)) {
    const lowerKey = key.toLowerCase();
    // Whitelist x-ratelimit- headers from redaction
    if (lowerKey.startsWith("x-ratelimit-")) {
      continue;
    }
    if (lowerKey === "x-omniroute-lease-owner") {
      masked[key] = "[REDACTED]";
      continue;
    }
    const compactedKey = lowerKey.replace(/-/g, "");
    if (!sensitiveKeys.some((candidate) => compactedKey.includes(candidate.replace(/-/g, "")))) {
      continue;
    }

    const value = masked[key];
    if (typeof value === "string" && value.length > 20) {
      masked[key] = `${value.slice(0, 10)}...${value.slice(-5)}`;
    } else if (value) {
      masked[key] = "[REDACTED]";
    }
  }

  return masked;
}

/**
 * Provider URLs can carry the credential in the query string (Vertex Express / Google
 * media `?key=`, search providers' `api_key=`). Captured URLs are persisted to call-log
 * artifacts, so mask those params before storing; anything else passes through as-is.
 */
function maskUrlSecrets(url: unknown): unknown {
  if (typeof url === "string") return redactUrlQuerySecrets(url);
  if (url instanceof URL) return redactUrlQuerySecrets(url.toString());
  return url;
}

function createEmptyStreamChunks() {
  return {
    provider: [] as string[],
    openai: [] as string[],
    client: [] as string[],
  };
}

const TRUNCATED_ARRAY_MARKER = "_omniroute_truncated_array";
const TRUNCATED_KEYS_MARKER = "_omniroute_truncated_keys";

function isTruncatedArrayMarker(value: unknown): boolean {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    (value as JsonRecord)[TRUNCATED_ARRAY_MARKER] === true
  );
}

function slicePrefixWithoutSplitSurrogate(value: string, end: number): string {
  const code = end > 0 ? value.charCodeAt(end - 1) : 0;
  // A cut that keeps a high surrogate (U+D800–U+DBFF) without its pair becomes
  // U+FFFD in the Buffer round-trip below. Shorten by one code unit instead.
  const cut = code >= 0xd800 && code <= 0xdbff ? end - 1 : end;
  return value.slice(0, cut);
}

function sliceSuffixWithoutSplitSurrogate(value: string, length: number): string {
  const start = Math.max(0, value.length - Math.max(0, length));
  const prev = start > 0 ? value.charCodeAt(start - 1) : 0;
  const curr = start < value.length ? value.charCodeAt(start) : 0;
  const split = prev >= 0xd800 && prev <= 0xdbff && curr >= 0xdc00 && curr <= 0xdfff;
  return value.slice(split ? start + 1 : start);
}

function truncateLogString(value: string, maxLength = MAX_LOG_STRING_LENGTH): string {
  if (value.length <= maxLength) return value;
  // The marker has to fit INSIDE the budget (#7847): keeping maxLength characters and then
  // adding the marker produced a result longer than maxLength, so re-bounding an already
  // bounded string truncated it a second time and the function was not idempotent.
  const marker = `\n[...truncated ${value.length - maxLength} chars...]\n`;
  const keep = Math.max(0, maxLength - marker.length);
  const head = slicePrefixWithoutSplitSurrogate(value, Math.floor(keep / 2));
  const tail = sliceSuffixWithoutSplitSurrogate(value, Math.ceil(keep / 2));
  // Flatten the bounded string before it is retained anywhere (call-log details,
  // previews): String#slice() returns a V8 SlicedString whose parent is the whole
  // source, so a 64 KB preview would keep a multi-megabyte request body alive.
  return Buffer.from(`${head}${marker}${tail}`, "utf8").toString("utf8");
}

/**
 * Recursively clone `value` for logging, with size bounds applied:
 * - Arrays longer than MAX_LOG_ARRAY_ITEMS are truncated to the tail with a
 *   sentinel marker prepended.
 * - The `tools` field is exempt from array truncation: the full tool inventory
 *   is debug-critical for understanding which tools the model had access to,
 *   and individual tool descriptions are independently bounded by
 *   truncateLogString, so the total size remains naturally capped.
 *
 * The optional `key` parameter carries the parent object's field name when
 * recursing into an object's values, enabling the per-field exemption above.
 * Top-level arrays (no key context) remain subject to truncation.
 */
export function cloneBoundedForLog(value: unknown, depth = 0, key: string | null = null): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === "string") return truncateLogString(value);
  if (typeof value !== "object") return value;
  // Binary/opaque byte views (Uint8Array, Buffer, DataView, ...) are not
  // "real" arrays to Array.isArray(); without this guard they fall through
  // to the generic-object branch below and get expanded into one JS key per
  // decoded byte instead of being treated as an opaque buffer (see #7297).
  if (ArrayBuffer.isView(value)) {
    return `[binary ${(value as ArrayBufferView).byteLength} bytes]`;
  }
  if (depth >= getChatLogMaxDepth()) return "[MaxDepth]";

  if (Array.isArray(value)) {
    // Idempotence (#7847): an already-bounded array is [marker, ...tail] — MAX_LOG_ARRAY_ITEMS + 1
    // entries, which is over the limit. Re-truncating it would drop the marker plus one real
    // item and rewrite originalLength with the truncated length (25 instead of the true 800), so
    // the log would misreport how much was cut. Keep the original marker, re-bound only the tail.
    if (isTruncatedArrayMarker(value[0])) {
      return [value[0], ...value.slice(1).map((item) => cloneBoundedForLog(item, depth + 1))];
    }
    const exempt = key === "tools";
    const shouldTruncate = !exempt && value.length > MAX_LOG_ARRAY_ITEMS;
    const source = shouldTruncate ? value.slice(-MAX_LOG_ARRAY_ITEMS) : value;
    const mapped = source.map((item) => cloneBoundedForLog(item, depth + 1));
    if (shouldTruncate) {
      return [
        {
          [TRUNCATED_ARRAY_MARKER]: true,
          originalLength: value.length,
          retainedTailItems: MAX_LOG_ARRAY_ITEMS,
        },
        ...mapped,
      ];
    }
    return mapped;
  }

  const result: JsonRecord = {};
  // Idempotence (#7847): our own marker key must not be counted as payload, or a re-bounded
  // object would push a real key out to make room for it and report `1` dropped instead of 20.
  const carriedDropped = (value as JsonRecord)[TRUNCATED_KEYS_MARKER];
  const carried = typeof carriedDropped === "number" ? carriedDropped : 0;
  const entries = Object.entries(value as JsonRecord).filter(
    ([k]) => !(carried > 0 && k === TRUNCATED_KEYS_MARKER)
  );
  for (const [k, item] of entries.slice(0, MAX_LOG_OBJECT_KEYS)) {
    result[k] = cloneBoundedForLog(item, depth + 1, k);
  }
  const dropped = Math.max(0, entries.length - MAX_LOG_OBJECT_KEYS) + carried;
  if (dropped > 0) {
    result[TRUNCATED_KEYS_MARKER] = dropped;
  }
  return result;
}

function utf8Prefix(value: string, maxBytes: number): string {
  if (value.length <= maxBytes && Buffer.byteLength(value, "utf8") <= maxBytes) {
    return Buffer.from(value, "utf8").toString("utf8");
  }
  let end = 0;
  let bytes = 0;
  for (const character of value) {
    const size = Buffer.byteLength(character, "utf8");
    if (bytes + size > maxBytes) break;
    bytes += size;
    end += character.length;
  }
  // Copy only the bounded prefix so a V8 slice cannot retain the entire source chunk.
  return Buffer.from(value.slice(0, end), "utf8").toString("utf8");
}

function appendBoundedChunk(
  chunks: string[],
  bytes: { value: number; truncated: boolean },
  chunk: string,
  maxBytes: number,
  maxItems = DEFAULT_MAX_STREAM_CHUNK_ITEMS
) {
  if (typeof chunk !== "string" || chunk.length === 0 || bytes.truncated) {
    return;
  }
  if (chunks.length >= maxItems) {
    bytes.truncated = true;
    chunks[maxItems - 1] = `[stream chunk log truncated after ${maxItems} chunks]`;
    return;
  }
  if (bytes.value >= maxBytes) {
    bytes.truncated = true;
    return;
  }

  const prefix = utf8Prefix(chunk, maxBytes - bytes.value);
  chunks.push(prefix);
  bytes.value += Buffer.byteLength(prefix, "utf8");
  if (prefix.length === chunk.length) return;

  // One marker is outside the data-byte budget, but still inside the item cap.
  if (chunks.length < maxItems) {
    chunks.push(`[stream chunk log truncated after ${maxBytes} bytes]`);
  }
  bytes.truncated = true;
}

function hasOwnValues(value: unknown): boolean {
  return Boolean(value && typeof value === "object" && Object.keys(value as JsonRecord).length > 0);
}

function compactPipelinePayloads(
  payloads: RequestPipelinePayloads
): RequestPipelinePayloads | null {
  const result: RequestPipelinePayloads = {};

  for (const [key, value] of Object.entries(payloads)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (key === "streamChunks" && value && typeof value === "object") {
      const chunkRecord = value as Record<string, unknown>;
      const compactedChunks = Object.fromEntries(
        Object.entries(chunkRecord).filter(
          ([, chunkValue]) => Array.isArray(chunkValue) && chunkValue.length > 0
        )
      );
      if (Object.keys(compactedChunks).length > 0) {
        result.streamChunks = compactedChunks;
      }
      continue;
    }

    if (key === "toolLoop" && value && typeof value === "object") {
      const legs = (value as { legs?: unknown }).legs;
      if (Array.isArray(legs) && legs.length > 0) {
        result.toolLoop = { legs: legs as JsonRecord[] };
      }
      continue;
    }

    const payloadKey = key as Exclude<keyof RequestPipelinePayloads, "streamChunks" | "toolLoop">;
    result[payloadKey] = value as JsonRecord;
  }

  return hasOwnValues(result) ? result : null;
}
function makeStreamChunkMethods(options: RequestLoggerOptions, captureChunks: boolean) {
  const streamChunks = createEmptyStreamChunks();
  const streamChunkBytes = {
    provider: { value: 0, truncated: false },
    openai: { value: 0, truncated: false },
    client: { value: 0, truncated: false },
  };
  const maxBytes =
    Number.isInteger(options.maxStreamChunkBytes) && Number(options.maxStreamChunkBytes) > 0
      ? Number(options.maxStreamChunkBytes)
      : DEFAULT_MAX_STREAM_CHUNK_BYTES;
  const maxItems =
    Number.isInteger(options.maxStreamChunkItems) && Number(options.maxStreamChunkItems) > 0
      ? Number(options.maxStreamChunkItems)
      : DEFAULT_MAX_STREAM_CHUNK_ITEMS;
  let lastSyncedBytes = 0;
  const push = (): boolean => {
    if (!options.requestId && (!options.connectionId || !options.model)) return false;
    try {
      // A finished exact request must never fall back to another concurrent attempt.
      if (options.requestId) {
        const updated = updatePendingRequestStreamChunksById(options.requestId, streamChunks);
        if (updated) lastSyncedBytes = totalCapturedBytes();
        return updated;
      }
      const pending = getPendingById();
      for (const entry of pending.values()) {
        if (
          entry?.connectionId === options.connectionId &&
          entry?.model === options.model &&
          entry?.provider === (options.provider || "")
        ) {
          const updated = updatePendingRequestStreamChunksById(entry.id, streamChunks);
          if (updated) lastSyncedBytes = totalCapturedBytes();
          return updated;
        }
      }
      return false;
    } catch (e) {
      // Do not allow logging failures to disrupt request handling
      try {
        console.warn("[requestLogger] updatePendingRequestStreamChunks failed:", e);
      } catch {}
      return false;
    }
  };
  const totalCapturedBytes = () =>
    streamChunkBytes.provider.value + streamChunkBytes.openai.value + streamChunkBytes.client.value;
  const flush = () => {
    push();
  };

  const append = (arr: string[], bytes: { value: number; truncated: boolean }, chunk: string) => {
    if (!captureChunks) return;
    const ts = new Date().toISOString().slice(11, 23);
    appendBoundedChunk(arr, bytes, `[${ts}] ${chunk}`, maxBytes, maxItems);
    if (totalCapturedBytes() - lastSyncedBytes >= STREAM_CHUNK_SYNC_THRESHOLD) {
      push();
    }
  };

  return {
    streamChunks,
    streamChunkBytes,
    flush,
    appendProviderChunk(chunk: string) {
      append(streamChunks.provider, streamChunkBytes.provider, chunk);
    },
    appendOpenAIChunk(chunk: string) {
      append(streamChunks.openai, streamChunkBytes.openai, chunk);
    },
    appendConvertedChunk(chunk: string) {
      append(streamChunks.client, streamChunkBytes.client, chunk);
    },
  };
}

export async function createRequestLogger(
  _sourceFormat?: string,
  _targetFormat?: string,
  _model?: string,
  options: RequestLoggerOptions = {}
): Promise<RequestLogger> {
  const captureStreamChunks = options.captureStreamChunks !== false;
  // Stream chunk capture is always set up — even when the logger is disabled,
  // so that active requests always have real-time stream data available via
  // the /api/logs/active endpoint.
  const chunkMethods = makeStreamChunkMethods(options, captureStreamChunks);

  if (options.enabled === false) {
    let routeDecision: JsonRecord | null = null;
    return {
      sessionPath: null,
      logClientRawRequest() {},
      logRouteDecision(decision) {
        routeDecision = cloneBoundedForLog(decision) as JsonRecord;
      },
      logOpenAIRequest() {},
      logTargetRequest() {},
      logProviderResponse() {},
      logProviderDiagnostic() {},
      appendProviderChunk: chunkMethods.appendProviderChunk,
      appendOpenAIChunk: chunkMethods.appendOpenAIChunk,
      logConvertedResponse() {},
      appendConvertedChunk: chunkMethods.appendConvertedChunk,
      logError() {},
      logToolLoopReceipt() {},
      getPipelinePayloads() {
        chunkMethods.flush();
        return routeDecision ? { routeDecision } : null;
      },
    };
  }

  const payloads: RequestPipelinePayloads = {
    ...(captureStreamChunks ? { streamChunks: chunkMethods.streamChunks } : {}),
  };

  return {
    sessionPath: null,

    logClientRawRequest(endpoint, body, headers = {}, effectiveInput) {
      payloads.clientRawRequest = {
        timestamp: new Date().toISOString(),
        endpoint,
        headers: maskSensitiveHeaders(headers),
        body: cloneBoundedForLog(body),
        // The actual `input` this request dispatched with, captured AFTER
        // OmniRoute's own previous_response_id reconstruction (see
        // src/sse/handlers/chat.ts) -- `body` above is deliberately the
        // pre-reconstruction raw client bytes (captureDeferredClientRawBody's
        // whole point) and is NOT what got sent for a continued turn.
        // resolvePreviousResponseState must chain off this field, not
        // `body.input`: reading the raw pre-reconstruction input for a
        // request that was itself a continuation compounds into progressively
        // truncated history a few hops deep (live incident 2026-09-03,
        // manifested as a malformed request with no leading system/user
        // message rejected by the upstream provider).
        ...(effectiveInput !== undefined
          ? { effectiveInput: cloneBoundedForLog(effectiveInput) }
          : {}),
      };
    },

    logRouteDecision(decision) {
      payloads.routeDecision = cloneBoundedForLog(decision) as JsonRecord;
    },

    logOpenAIRequest(body) {
      payloads.openaiRequest = {
        timestamp: new Date().toISOString(),
        body: cloneBoundedForLog(body),
      };
    },

    logTargetRequest(url, headers, body) {
      payloads.providerRequest = {
        timestamp: new Date().toISOString(),
        url: maskUrlSecrets(url),
        headers: maskSensitiveHeaders(headers),
        body: cloneBoundedForLog(body),
      };
    },

    logProviderResponse(status, statusText, headers, body) {
      payloads.providerResponse = {
        timestamp: new Date().toISOString(),
        status,
        statusText,
        headers: maskSensitiveHeaders(headers),
        body: cloneBoundedForLog(body),
      };
    },

    /**
     * Record a terminal upstream failure by its already-allowlisted classification INSTEAD of
     * its response (#3229).
     *
     * Deliberately narrower than {@link logProviderResponse}: no status text, no response
     * headers, no upstream body. Callers pass a small fixed-shape record they have already
     * projected to a closed set of scalars/enums — this method does not sanitize arbitrary
     * provider data and must never be handed a raw upstream payload. Used for providers whose
     * error bodies may echo request content, where the only safe thing to retain is the
     * classification itself.
     */
    logProviderDiagnostic(diagnostic) {
      payloads.providerResponse = {
        timestamp: new Date().toISOString(),
        diagnostic: (diagnostic ? cloneBoundedForLog(diagnostic) : null) as JsonRecord | null,
      };
    },

    appendProviderChunk: chunkMethods.appendProviderChunk,
    appendOpenAIChunk: chunkMethods.appendOpenAIChunk,
    logConvertedResponse(body) {
      payloads.clientResponse = {
        timestamp: new Date().toISOString(),
        body: cloneBoundedForLog(body),
      };
    },
    appendConvertedChunk: chunkMethods.appendConvertedChunk,

    logError(error, requestBody = null) {
      payloads.error = {
        timestamp: new Date().toISOString(),
        error: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
        requestBody: cloneBoundedForLog(requestBody),
      };
    },

    logToolLoopReceipt(receipt) {
      const legs = payloads.toolLoop?.legs ?? [];
      if (legs.length >= MAX_TOOL_LOOP_LEGS) return;
      const cloned = cloneBoundedForLog(receipt);
      if (!cloned || typeof cloned !== "object" || Array.isArray(cloned)) return;
      payloads.toolLoop = { legs: [...legs, cloned as JsonRecord] };
    },

    getPipelinePayloads() {
      chunkMethods.flush();
      return compactPipelinePayloads(payloads);
    },
  };
}
