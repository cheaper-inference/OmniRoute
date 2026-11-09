import {
  getChatLogTextLimit,
  getChatLogMaxDepth,
  getChatLogArrayTailItems,
  getChatLogMaxObjectKeys,
  getChatLogMaxBodyBytes,
} from "@/lib/logEnv";
import { createHash } from "node:crypto";
import { estimateSizeFast } from "../../utils/estimateSize.ts";

export const MEMORY_EXTRACTION_TEXT_LIMIT = 64 * 1024;

export function capMemoryExtractionText(value: string): string {
  if (value.length <= MEMORY_EXTRACTION_TEXT_LIMIT) return value;
  return value.slice(-MEMORY_EXTRACTION_TEXT_LIMIT);
}

export function truncateChatLogText(value: string): string {
  const limit = getChatLogTextLimit();
  if (value.length <= limit) return value;
  const head = value.slice(0, Math.floor(limit / 2));
  const tail = value.slice(-Math.ceil(limit / 2));
  return `${head}\n[...truncated ${value.length - limit} chars...]\n${tail}`;
}

/**
 * An oversized `data:image/*;base64,...` URL would otherwise be head/tail
 * truncated into a corrupt half-image that no viewer or decoder can read —
 * dead weight in the persisted log. Replace it with a compact reference:
 * mime, base64 byte count, a 16-hex sha256 fingerprint (stable identity for
 * dedup/correlation across rows) and a 64-char head. Strings under the limit
 * and non-image oversize strings keep their existing behavior.
 */
export function collapseOversizedDataUrlForLog(value: string): string | Record<string, unknown> {
  if (value.length <= getChatLogTextLimit()) return value;
  const match = /^data:(image\/[-\w.+/]+);base64,([\s\S]*)$/.exec(value);
  if (!match) return truncateChatLogText(value);
  return {
    _omniroute_image_ref: true,
    mime: match[1],
    base64Bytes: match[2].length,
    sha256: createHash("sha256").update(match[2]).digest("hex").slice(0, 16),
    head: value.slice(0, 64),
  };
}

export function cloneBoundedChatLogPayload(value: unknown, depth = 0): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === "string") return collapseOversizedDataUrlForLog(value);
  if (typeof value !== "object") return value;
  if (depth >= getChatLogMaxDepth()) return "[MaxDepth]";

  const maxTailItems = getChatLogArrayTailItems();

  if (Array.isArray(value)) {
    const retained = value.length > maxTailItems ? value.slice(-maxTailItems) : value;
    const cloned = retained.map((item) => cloneBoundedChatLogPayload(item, depth + 1));
    if (value.length > maxTailItems) {
      return [
        {
          _omniroute_truncated_array: true,
          originalLength: value.length,
          retainedTailItems: maxTailItems,
        },
        ...cloned,
      ];
    }
    return cloned;
  }

  const result: Record<string, unknown> = {};
  const entries = Object.entries(value as Record<string, unknown>);
  const maxKeys = getChatLogMaxObjectKeys();
  for (const [key, item] of maxKeys > 0 ? entries.slice(0, maxKeys) : entries) {
    result[key] = cloneBoundedChatLogPayload(item, depth + 1);
  }
  if (maxKeys > 0 && entries.length > maxKeys) {
    result._omniroute_truncated_keys = entries.length - maxKeys;
  }
  return result;
}

/**
 * Truncate a large object for logging. If its JSON representation exceeds
 * getChatLogMaxBodyBytes() (default 1MB; CHAT_LOG_MAX_BODY_KB env override),
 * return a lightweight summary instead of the full clone. This prevents
 * persistAttemptLogs from holding unbounded references to translatedBody
 * across 17 call sites per request.
 *
 * When the summarized object carries a `tools` definition, re-attach it
 * (bounded via `cloneBoundedChatLogPayload`) so the request-details view can
 * still show which tools were available even though the rest of the payload
 * — including the message history that triggered this summary — is dropped.
 * The reused helper already caps array length, object keys, nesting depth,
 * and string length, so this stays a small, bounded addition rather than a
 * separately-budgeted multi-KB/MB re-clone.
 */
export function truncateForLog(value: unknown): Record<string, unknown> | null | undefined {
  if (value === null || value === undefined) return value as null | undefined;
  if (typeof value !== "object") return value as unknown as Record<string, unknown>;
  const maxBodyBytes = getChatLogMaxBodyBytes();
  // Pass maxBodyBytes as the early-exit point — otherwise estimateSizeFast's
  // own default 256KB early-exit caps what it can ever report, silently
  // making any configured threshold above 256KB unreachable (#trunc-limit-config).
  const estimatedSize = estimateSizeFast(value, maxBodyBytes);
  if (estimatedSize <= maxBodyBytes) return value as Record<string, unknown>;
  // Object is too large — return a summary instead of a deep clone
  const obj = value as Record<string, unknown>;
  const summary: Record<string, unknown> = {
    _truncated: true,
    _originalBytes: estimatedSize,
  };
  if (typeof obj.model === "string") summary.model = obj.model;
  if (typeof obj.provider === "string") summary.provider = obj.provider;
  if (Array.isArray(obj.messages)) summary.messageCount = obj.messages.length;
  // Responses API bodies use `input[]`, not `messages[]` (OpenAI-chat/Gemini-only
  // field name) — without this, a large /v1/responses request got summarized
  // with no count at all, leaving the dashboard's "Full Conversation" panel
  // nothing to base its "N messages not shown" placeholder on.
  else if (Array.isArray(obj.input)) summary.messageCount = obj.input.length;
  if (Array.isArray(obj.contents)) summary.contentCount = obj.contents.length;
  if (typeof obj.stream === "boolean") summary.stream = obj.stream;
  if (Array.isArray(obj.tools)) summary.tools = cloneBoundedChatLogPayload(obj.tools);
  return summary;
}
