import { unsupportedFeature } from "../translator/request/openai-responses/helpers.ts";
import {
  BRIDGE_COMPACTION_PREFIX,
  SUMMARY_PREFIX,
} from "../vendor/codex-chatgpt-web/responses/compaction.ts";

const COMPACTION_TYPES = new Set(["compaction", "compaction_summary", "context_compaction"]);
const STRICT_BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
type JsonRecord = Record<string, unknown>;

export function isEmptyContextCompactionMarker(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const item = value as JsonRecord;
  return (
    item.type === "context_compaction" &&
    (item.id === undefined || typeof item.id === "string") &&
    Object.keys(item).every((key) => key === "type" || key === "id")
  );
}

function decodeSummary(payload: string): string {
  try {
    if (!payload || !STRICT_BASE64.test(payload)) throw new Error("Invalid base64");
    const bytes = Buffer.from(payload, "base64");
    if (bytes.toString("base64") !== payload) throw new Error("Noncanonical base64");
    const summary = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes);
    if (!summary.trim()) throw new Error("Empty summary");
    return summary;
  } catch {
    throw unsupportedFeature(
      "Invalid readable Responses compaction summary; resend a plaintext summary."
    );
  }
}

function isNonBlankString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// Responses history uses `output_text` for assistant turns and `input_text` otherwise; the Codex
// normalizer returns restored items as-is, so they must already carry the role's part type.
function textPartTypeForRole(role: string): "input_text" | "output_text" {
  return role === "assistant" ? "output_text" : "input_text";
}

function toRoleTextPart(part: unknown, partType: string): unknown {
  if (typeof part === "string") return { type: partType, text: part };
  if (!part || typeof part !== "object" || Array.isArray(part)) return part;
  const record = part as JsonRecord;
  const isTextPart =
    record.type === "input_text" || record.type === "output_text" || record.type === "text";
  return isTextPart ? { ...record, type: partType } : record;
}

function readableCompactionContent(item: JsonRecord, role: string): unknown[] | null {
  const partType = textPartTypeForRole(role);
  if (isNonBlankString(item.content)) return [{ type: partType, text: item.content }];
  if (Array.isArray(item.content) && item.content.length > 0) {
    return item.content.map((part) => toRoleTextPart(part, partType));
  }
  if (isNonBlankString(item.text)) return [{ type: partType, text: item.text }];
  return null;
}

// #19730: a `compaction`/`compaction_summary` item that already carries readable content or text
// becomes a plain message, so Chat Completions fallbacks can replay it as context.
function restoreInlineCompactionItem(item: JsonRecord, type: string): JsonRecord | null {
  if (type !== "compaction" && type !== "compaction_summary") return null;
  const role = isNonBlankString(item.role) ? item.role : "user";
  const content = readableCompactionContent(item, role);
  return content ? { type: "message", role, content } : null;
}

function restoreBridgeCompactionItem(item: JsonRecord): JsonRecord | null {
  const content = item.encrypted_content;
  if (typeof content !== "string" || !content.startsWith(BRIDGE_COMPACTION_PREFIX)) return null;
  const summary = decodeSummary(content.slice(BRIDGE_COMPACTION_PREFIX.length));
  return {
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: `${SUMMARY_PREFIX}\n\n${summary}` }],
  };
}

export function restoreReadableCompactionItem(item: JsonRecord): JsonRecord | null {
  const type = typeof item.type === "string" ? item.type : "";
  if (!COMPACTION_TYPES.has(type)) return null;
  return restoreInlineCompactionItem(item, type) ?? restoreBridgeCompactionItem(item);
}
