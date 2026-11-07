import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
import { parseAndValidateNonMetadataUrl } from "@/shared/network/outboundUrlGuard";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { DecisionError, type DecisionCredentials } from "./decisionTypes.ts";

export const DECISION_MAX_BYTES = 16 * 1024 * 1024;

/** Bound the stream itself: Content-Length alone does not constrain chunked bodies. */
export async function readDecisionJson(
  message: Request | Response,
  status = 502,
  signal?: AbortSignal
): Promise<unknown> {
  await checkDecisionLength(message, status);
  const reader = message.body?.getReader();
  if (!reader) throw new DecisionError(status, "invalid_json");
  const cancel = () => {
    void reader.cancel().catch(() => {});
  }; // Already-closed streams need no cleanup.
  signal?.addEventListener("abort", cancel, { once: true });
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      if (signal?.aborted) throw new DecisionError(504, "timeout_or_cancelled");
      const result = await reader.read();
      if (result.done) break;
      size += result.value.byteLength;
      if (size > DECISION_MAX_BYTES) {
        await reader.cancel();
        throw new DecisionError(status === 400 ? 413 : status, "payload_too_large");
      }
      chunks.push(result.value);
    }
    if (signal?.aborted) throw new DecisionError(504, "timeout_or_cancelled");
    return parseDecisionChunks(chunks, size, status);
  } finally {
    signal?.removeEventListener("abort", cancel);
    reader.releaseLock();
  }
}

function parseDecisionChunks(chunks: Uint8Array[], size: number, status: number): unknown {
  const buffer = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.length;
  }
  try {
    return JSON.parse(new TextDecoder().decode(buffer));
  } catch {
    throw new DecisionError(status, "invalid_json");
  }
}

export function decisionHeaders(credentials: DecisionCredentials): Record<string, string> {
  const token = credentials.apiKey || credentials.accessToken;
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/** Same operator-managed connection, DNS/SSRF guard and proxy path as other providers. */
export async function fetchDecision(
  url: string,
  credentials: DecisionCredentials,
  init: RequestInit
) {
  parseAndValidateNonMetadataUrl(url); // IMDS stays blocked even with the legacy full opt-in.
  const proxy = credentials.connectionId
    ? await resolveProxyForConnection(credentials.connectionId)
    : null;
  return safeOutboundFetch(url, {
    ...init,
    guard: getProviderOutboundGuard(),
    proxyConfig: proxy?.proxy || null,
    allowRedirect: false,
    retry: false, // A timed-out inference may have executed; never replay it automatically.
    timeoutMs: 120_000,
  });
}

async function checkDecisionLength(message: Request | Response, status: number): Promise<void> {
  if (Number(message.headers.get("content-length")) > DECISION_MAX_BYTES) {
    await message.body?.cancel();
    throw new DecisionError(status === 400 ? 413 : status, "payload_too_large");
  }
}
