import { csvToJsonlInputSchema, type CsvToJsonlInput } from "./schemas";

/**
 * RFC 4180 minimal CSV parser.
 *
 * Supports: quoted fields, escaped double-quotes (""), CRLF/LF line endings,
 * inline newlines inside quoted fields.
 * Does NOT strip BOM — callers should strip before invoking if needed.
 */
function parseCsvRow(line: string): string[] {
  if (!line.includes('"')) return line.split(",");

  const out: string[] = [];
  let buf = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      // Escaped quote: "" inside a quoted field
      if (ch === '"' && line[i + 1] === '"') {
        buf += '"';
        i++;
        continue;
      }
      if (ch === '"') {
        inQuotes = false;
        continue;
      }
      buf += ch;
    } else {
      if (ch === '"') {
        inQuotes = true;
        continue;
      }
      if (ch === ",") {
        out.push(buf);
        buf = "";
        continue;
      }
      buf += ch;
    }
  }
  out.push(buf);
  return out;
}

/**
 * Split CSV text into logical lines, preserving inline newlines inside quoted fields.
 * Handles CRLF and LF; does not collapse multiple empty lines.
 */
function splitLines(s: string, limit = Infinity): string[] {
  const out: string[] = [];
  let start = 0;
  let inQuotes = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '"') {
      if (inQuotes && s[i + 1] === '"') {
        i++;
        continue;
      }
      inQuotes = !inQuotes;
      continue;
    }
    if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (i > start) out.push(s.slice(start, i));
      if (out.length >= limit) return out;
      if (ch === "\r" && s[i + 1] === "\n") i++;
      start = i + 1;
    }
  }
  if (start < s.length) out.push(s.slice(start));
  return out;
}

function splitCompleteCsv(csv: string): string[] {
  return csv.includes('"') ? splitLines(csv) : csv.split(/\r\n?|\n/).filter(Boolean);
}

/** Read the first logical CSV record using the same parser as batch conversion. */
export function parseCsvHeaders(csv: string): string[] {
  const firstLine = splitLines(csv.replace(/^\uFEFF/, ""), 1)[0];
  return firstLine === undefined ? [] : parseCsvRow(firstLine);
}

// ── Prototype-pollution guard ─────────────────────────────────────────────────

/**
 * Keys that are forbidden as object property names (CWE-915 — prototype pollution).
 * A legitimate CSV mapping path cannot contain these: the Zod schema
 * `wizardCsvMappingSchema` validates paths come from a controlled UI dropdown;
 * we add this explicit denylist as defence-in-depth.
 */
const FORBIDDEN_KEYS = new Set(["__proto__", "constructor", "prototype"]);

/**
 * Write `value` to `obj[key]` using Object.defineProperty instead of bracket
 * assignment.  Object.defineProperty bypasses the prototype-chain write path,
 * preventing prototype-pollution attacks (semgrep rule
 * javascript.lang.security.audit.prototype-pollution-assignment).
 */
function safePropSet(obj: object, key: string | number, value: unknown): void {
  Object.defineProperty(obj, key, {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}

/** Tokenize a dot/bracket mapping path once before processing the CSV rows. */
function parsePath(path: string): Array<string | number> {
  const tokens: Array<string | number> = [];

  for (const part of path.split(".")) {
    const match = part.match(/^([^[]+)((?:\[\d+\])*)$/);
    if (!match) continue;
    const key = match[1];
    if (FORBIDDEN_KEYS.has(key)) return [];
    tokens.push(key);
    for (const idx of match[2].match(/\d+/g) ?? []) {
      tokens.push(Number(idx));
    }
  }

  return tokens;
}

/** Set a nested value at a validated mapping path. */
function setByPath(
  target: Record<string, unknown>,
  tokens: ReadonlyArray<string | number>,
  value: unknown
): void {
  if (tokens.length === 0) return;

  let cur: Record<string, unknown> = target;
  for (let i = 0; i < tokens.length - 1; i++) {
    const k = tokens[i];
    const next = tokens[i + 1];
    if (!Object.prototype.hasOwnProperty.call(cur, k) || cur[k] == null) {
      const child: unknown = typeof next === "number" ? [] : Object.create(null);
      safePropSet(cur, k, child);
    }
    const nextCur = Object.prototype.hasOwnProperty.call(cur, k) ? cur[k] : undefined;
    if (nextCur == null || typeof nextCur !== "object") return; // bail if tree navigation failed
    cur = nextCur as Record<string, unknown>;
  }

  safePropSet(cur, tokens[tokens.length - 1], value);
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Convert a CSV string + column mapping into a JSONL batch request file.
 *
 * - Validates input via `csvToJsonlInputSchema` (Zod).
 * - Parses CSV per RFC 4180 (quoted fields, escaped quotes, CRLF/LF).
 * - Auto-fills `role: "user"` when mapping includes a content path but no role path.
 * - Coerces max_tokens / temperature to numbers.
 * - Skips rows missing `custom_id` or content; records them in `errors`.
 */
export function csvToJsonl(rawInput: CsvToJsonlInput): {
  jsonl: string;
  rowsParsed: number;
  rowsSkipped: number;
  errors: Array<{ row: number; reason: string }>;
} {
  const input = csvToJsonlInputSchema.parse(rawInput);
  // Strip UTF-8 BOM if present so the first header cell parses cleanly
  const normalizedCsv = input.csv.replace(/^﻿/, "");
  const lines = splitCompleteCsv(normalizedCsv);

  if (lines.length < 2) {
    return {
      jsonl: "",
      rowsParsed: 0,
      rowsSkipped: 0,
      errors: [{ row: 0, reason: "CSV has no data rows" }],
    };
  }

  const headers = parseCsvRow(lines[0]);
  const mapping = new Map(Object.entries(input.mapping));
  const mappedPaths = new Set(mapping.values());
  const columns = headers.flatMap((header, index) => {
    const path = mapping.get(header);
    if (!path) return [];
    const messageContent = path.startsWith("body.messages[") && path.endsWith(".content");
    const rolePath = messageContent ? path.replace(".content", ".role") : "";
    return [
      {
        index,
        path,
        messageContent,
        tokens: parsePath(path),
        defaultRoleTokens: rolePath && !mappedPaths.has(rolePath) ? parsePath(rolePath) : [],
      },
    ];
  });
  const out: string[] = [];
  const errors: Array<{ row: number; reason: string }> = [];
  let skipped = 0;

  for (let r = 1; r < lines.length; r++) {
    const cells = parseCsvRow(lines[r]);

    // Skip blank rows
    if (cells.length === 0 || cells.every((c) => c.trim() === "")) {
      skipped++;
      continue;
    }

    const request: Record<string, unknown> = {
      method: input.defaults.method,
      url: input.defaults.url,
      body: Object.assign(Object.create(null) as Record<string, unknown>, {
        model: input.defaults.model,
      }),
    };

    let hasContent = false;
    let hasCustomId = false;

    for (const { index, path, messageContent, tokens, defaultRoleTokens } of columns) {
      const raw = cells[index] ?? "";

      if (path === "custom_id") {
        if (raw.trim().length === 0) {
          errors.push({ row: r + 1, reason: "custom_id is empty" });
          continue;
        }
        request.custom_id = raw;
        hasCustomId = true;
      } else if (messageContent) {
        setByPath(request, tokens, raw);
        // Auto-fill role: "user" unless the mapping already maps a role for this slot
        setByPath(request, defaultRoleTokens, "user");
        hasContent = true;
      } else if (path === "body.input" || path === "body.prompt") {
        setByPath(request, tokens, raw);
        hasContent = true;
      } else if (path.startsWith("body.")) {
        // Coerce numeric fields (max_tokens, temperature, top_p, etc.)
        const num = Number(raw);
        setByPath(request, tokens, Number.isFinite(num) && raw.trim() !== "" ? num : raw);
      }
    }

    if (!hasContent || !hasCustomId) {
      skipped++;
      errors.push({ row: r + 1, reason: "missing content or custom_id" });
      continue;
    }

    out.push(JSON.stringify(request));
  }

  return {
    jsonl: out.join("\n") + (out.length > 0 ? "\n" : ""),
    rowsParsed: out.length,
    rowsSkipped: skipped,
    errors,
  };
}
