import { z } from "zod";
import {
  containsSensitiveErrorCredential,
  redactSensitiveErrorText,
  sanitizeErrorMessage,
} from "@omniroute/open-sse/utils/errorSanitization.ts";

// '*' is reserved for a single terminal prefix wildcard, never an unrestricted selector.
const HEADER_NAME = /^[!#$%&'+.^_`|~0-9a-z-]+$/i;
const MAX_NAME_BYTES = 256;
const MAX_SNAPSHOT_BYTES = 1024 * 1024;
const MAX_SOURCE_HEADERS = 256;
const MAX_HEADERS = 32;
const MAX_VALUES = 16;
const MAX_VALUE_BYTES = 4096;
const MAX_TOTAL_BYTES = 16384;

export const requestHeaderAllowlistSchema = z
  .union([
    z.array(z.string()).max(64),
    z
      .string()
      .max(16448)
      .transform((value) =>
        value
          .split(/[\n,]/)
          .map((name) => name.trim())
          .filter(Boolean)
      ),
  ])
  .pipe(
    z
      .array(
        z
          .string()
          .min(1)
          .max(MAX_NAME_BYTES + 1)
          .refine((name) => {
            const prefix = name.endsWith("*") ? name.slice(0, -1) : name;
            return prefix.length <= MAX_NAME_BYTES && HEADER_NAME.test(prefix);
          }, "Use exact header names or a nonempty prefix followed by *")
      )
      .max(64)
  )
  .transform((names) => [...new Set(names.map((name) => name.toLowerCase()))])
  .default([]);

type HeaderAttribute = {
  key: string;
  value: { arrayValue: { values: { stringValue: string }[] } } | { stringValue: string };
};

function sensitiveName(name: string): boolean {
  // Never treat partially masked credentials in historical snapshots as safe evidence.
  const compact = name.replace(/[-_]/g, "");
  return [
    "auth",
    "cookie",
    "apikey",
    "token",
    "secret",
    "password",
    "credential",
    "runtimekey",
    "storagestate",
    "capability",
    "xomnirouteleaseowner",
    "xomnirouteselfloopkeyid",
    "xomnirouteplaygroundkeyid",
  ].some((part) => compact.includes(part));
}

function validValues(value: unknown): string[] | null {
  const values = typeof value === "string" ? [value] : value;
  if (!Array.isArray(values) || !values.length || values.length > MAX_VALUES) return null;
  return values.every(
    (item) =>
      typeof item === "string" &&
      Buffer.byteLength(item) <= MAX_VALUE_BYTES &&
      !/[\x00-\x08\x0a-\x1f\x7f\ud800-\udfff]/u.test(item) &&
      !/\[redacted|\[truncated\]/i.test(item) &&
      !containsSensitiveErrorCredential(item) &&
      // Cover labeled assignments/PEM without treating escape normalization as redaction.
      !redactSensitiveErrorText(item).includes("[REDACTED") &&
      // Include the complete public recognition chain (notably its final quote pass).
      // Use only its credential marker: safe path/escape changes must not alter export.
      !sanitizeErrorMessage(item).includes("[REDACTED")
  )
    ? values
    : null;
}

/** Read only the already-hydrated client snapshot; malformed/oversized detail is optional. */
export function requestHeaderAttributes(
  snapshot: string | null,
  allowlist: readonly string[]
): HeaderAttribute[] {
  if (
    !allowlist.length ||
    typeof snapshot !== "string" ||
    snapshot.length > MAX_SNAPSHOT_BYTES ||
    Buffer.byteLength(snapshot) > MAX_SNAPSHOT_BYTES
  )
    return [];
  let headers: Record<string, unknown>;
  try {
    const parsed = JSON.parse(snapshot);
    headers = parsed?.headers;
    if (!headers || typeof headers !== "object" || Array.isArray(headers)) return [];
  } catch {
    return []; // Missing, damaged or export-clipped JSON must not fail a cursor batch.
  }
  const entries = Object.entries(headers);
  if (entries.length > MAX_SOURCE_HEADERS) return [];
  const selected = new Map<string, string[] | null>();
  for (const [rawName, value] of entries) {
    const name = rawName.toLowerCase();
    if (
      rawName.length > MAX_NAME_BYTES ||
      !HEADER_NAME.test(rawName) ||
      ["__proto__", "constructor", "prototype"].includes(name) ||
      sensitiveName(name) ||
      !allowlist.some((pattern) =>
        pattern.endsWith("*") ? name.startsWith(pattern.slice(0, -1)) : name === pattern
      )
    )
      continue;
    const values = validValues(value);
    const previous = selected.get(name);
    // Case variants merge in stored order. Any invalid variant omits the whole header.
    selected.set(
      name,
      values === null || previous === null ? null : [...(previous ?? []), ...values]
    );
  }
  const attributes: HeaderAttribute[] = [];
  let bytes = 0;
  let count = 0;
  for (const [name, values] of [...selected].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))) {
    if (!values || values.length > MAX_VALUES || count >= MAX_HEADERS) continue;
    const size =
      Buffer.byteLength(name) + values.reduce((sum, value) => sum + Buffer.byteLength(value), 0);
    if (bytes + size > MAX_TOTAL_BYTES) continue;
    bytes += size;
    count++;
    attributes.push({
      key: `http.request.header.${name}`,
      value: { arrayValue: { values: values.map((stringValue) => ({ stringValue })) } },
    });
    if (name === "user-agent" && values.length === 1)
      attributes.push({ key: "user_agent.original", value: { stringValue: values[0] } });
  }
  return attributes;
}
