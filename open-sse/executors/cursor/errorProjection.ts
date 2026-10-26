import { sanitizeErrorMessage } from "../../utils/errorSanitization.ts";

const ERROR_DETAILS_TYPE = "aiserver.v1.ErrorDetails";
const MAX_ENVELOPE_BYTES = 128 * 1024;
const MAX_VALUE_BYTES = 8192;
const MAX_FIELDS = 128;
const MAX_DETAILS = 16;
const MAX_TEXT_BYTES = 2048;

type WireField = { number: number; bytes?: Buffer; integer?: bigint };

/** Bounded uint64 reader: the generic Agent codec need not accept error input. */
function varint(buf: Buffer, offset: number): [bigint, number] {
  let value = 0n;
  for (let i = 0; i < 10 && offset < buf.length; i++) {
    const byte = buf[offset++];
    if (i === 9 && byte > 1) break;
    value |= BigInt(byte & 0x7f) << BigInt(i * 7);
    if (byte < 0x80) return [value, offset];
  }
  throw new Error("Invalid Cursor error varint");
}

function readField(buf: Buffer, offset: number): [WireField, number] {
  const [tag, next] = varint(buf, offset);
  if (tag < 8n || tag > 0xffffffffn) throw new Error("Invalid Cursor error tag");
  let pos = next;
  const field: WireField = { number: Number(tag >> 3n) };
  const wire = Number(tag & 7n);
  if (wire === 0) {
    [field.integer, pos] = varint(buf, pos);
  } else if (wire === 2) {
    const [length, start] = varint(buf, pos);
    if (length > BigInt(buf.length - start)) throw new Error("Truncated Cursor error field");
    pos = start + Number(length);
    field.bytes = buf.subarray(start, pos);
  } else {
    if (wire !== 1 && wire !== 5) throw new Error("Invalid Cursor error wire type");
    pos += wire === 1 ? 8 : 4;
    if (pos > buf.length) throw new Error("Truncated Cursor fixed field");
  }
  return [field, pos];
}

function fields(buf: Buffer): WireField[] {
  const result: WireField[] = [];
  let pos = 0;
  while (pos < buf.length) {
    if (result.length >= MAX_FIELDS) throw new Error("Too many Cursor error fields");
    const [field, next] = readField(buf, pos);
    result.push(field);
    pos = next;
  }
  return result;
}

function bytesAt(list: WireField[], number: number): Buffer | undefined {
  return list.findLast((field) => field.number === number)?.bytes;
}

function textAt(list: WireField[], number: number): string {
  const bytes = bytesAt(list, number);
  if (!bytes) return "";
  if (bytes.length > MAX_TEXT_BYTES) throw new Error("Cursor error text too large");
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/** Public text only: never propagate URLs, debug JSON, buttons or additional_info. */
function safeText(value: unknown): string {
  if (typeof value !== "string") return "";
  return sanitizeErrorMessage(value.slice(0, MAX_TEXT_BYTES))
    .replace(/https?:\/\/[^\s<>"']{1,4096}/gi, "[URL removed]")
    .trim();
}

function detailText(detail: unknown): string {
  const entry = record(detail);
  if (entry?.type !== ERROR_DETAILS_TYPE) return "";
  if (!Object.hasOwn(entry, "value")) {
    const details = record(record(entry.debug)?.details);
    return [safeText(details?.title), safeText(details?.detail)].filter(Boolean).join(" ");
  }
  return typedText(entry.value);
}

function typedText(value: unknown): string {
  if (typeof value !== "string") return "";
  if (!value || value.length > Math.ceil(MAX_VALUE_BYTES / 3) * 4) return "";
  // Buffer's decoder silently accepts junk; require canonical standard base64
  // (Connect permits omitted padding) before touching the protobuf wire value.
  if (!/^[A-Za-z0-9+/]{1,10924}={0,2}$/.test(value)) return "";
  const decoded = Buffer.from(value, "base64");
  if (decoded.length > MAX_VALUE_BYTES) return "";
  const canonical = decoded.toString("base64");
  if (value !== canonical && value !== canonical.replace(/=+$/, "")) return "";
  try {
    // Official aiserver.v1 schema: ErrorDetails.details=2;
    // CustomErrorDetails.title=1, detail=2. Do not decode this as an agent action.
    const custom = bytesAt(fields(decoded), 2);
    if (!custom) return "";
    const list = fields(custom);
    return [safeText(textAt(list, 1)), safeText(textAt(list, 2))].filter(Boolean).join(" ");
  } catch {
    // Malformed/oversized untrusted details are optional; keep code/message.
    return "";
  }
}

/** Inputs have already passed the same bounded public-text sanitizer. */
function withMessage(details: string, message: string): string {
  if (!details) return message;
  if (!message || /^error[.!:]?$/i.test(message) || details.includes(message)) return details;
  // Keep details intact; append only a complete message within the former cap.
  // Details stay first so downstream credential redaction cannot eat them.
  if (details.length + 1 + message.length > MAX_TEXT_BYTES * 2 + 1) return details;
  return `${details} ${message}`;
}

function isJsonWhitespace(byte: number): boolean {
  return byte === 0x20 || byte === 0x09 || byte === 0x0a || byte === 0x0d;
}

/** Shared projection for JSON envelopes and Connect end-stream trailers. */
export function projectCursorError(payload: Buffer): string | null {
  if (payload.length < 2) return null;
  // JSON permits only these four ASCII whitespace bytes. Bound the prefix scan
  // as well as parsing; do not decode/copy an arbitrarily large input first.
  let start = 0;
  while (start < payload.length && start < MAX_ENVELOPE_BYTES && isJsonWhitespace(payload[start])) {
    start++;
  }
  if (start === MAX_ENVELOPE_BYTES) return "unknown: Cursor error envelope too large";
  if (payload[start] !== 0x7b) return null;
  if (payload.length > MAX_ENVELOPE_BYTES) return "unknown: Cursor error envelope too large";
  let parsed: unknown;
  try {
    parsed = JSON.parse(payload.toString("utf8"));
  } catch {
    return null; // Not a JSON error envelope; the caller may handle protobuf.
  }
  const error = record(record(parsed)?.error);
  if (!error) return null;
  const code = safeText(error.code) || "unknown";
  const fallback = safeText(error.message);
  const details = Array.isArray(error.details) ? error.details.slice(0, MAX_DETAILS) : [];
  const text = withMessage(details.map(detailText).find(Boolean) || "", fallback);
  return `${code}${text ? `: ${text}` : ""}`;
}
