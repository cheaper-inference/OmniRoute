/** Pure, bounded public projection of native provider failures. Never emits a raw body. */
import { sanitizeErrorMessage } from "../utils/errorSanitization.ts";

export type SystemOneFailureKind =
  | "edge"
  | "authentication"
  | "access"
  | "client_restricted"
  | "rate_limit"
  | "quota"
  | "request"
  | "provider"
  | "unknown";

export type SystemOneFailureDiagnostic = {
  message: string;
  kind: SystemOneFailureKind;
  /** Presented credentials do not establish successful account authentication. */
  authScope: "anonymous" | "unknown";
  terminalAccessDenied: boolean;
  details: { title?: string; detail?: string; type?: string; code?: string; message?: string };
};

export type SystemOneFailureInput = {
  status: number;
  bodyText?: string;
  body?: unknown;
  /** False means a known credential-free request. True only means credentials were presented. */
  authenticated?: boolean;
  /** Caller-owned credentials, connection/account IDs and request strings to redact literally. */
  sensitiveValues?: readonly string[];
};

const MAX_BODY = 65_536;
const MAX_TEXT_SCAN = 16_384;
const MAX_NODES = 16;
const MAX_DEPTH = 4;
const COLLECTION_OVERFLOW = "!".repeat(2049);
const PUBLIC_REQUEST_KEYS = new Set([
  "model",
  "state",
  "questions",
  "type",
  "instructions",
  "criteria",
  "assets",
  "format",
  "part",
]);
const IDENTIFIER = /^[A-Za-z0-9][A-Za-z0-9._-]{0,95}$/;
// Semantic identifiers survive new vendor names; opaque account/trace IDs do not.
const DIAGNOSTIC_WORD =
  /error|quota|limit|usage|credit|budget|auth|forbid|denied|access|request|invalid|unsupported|unavailable|timeout|entitlement|exceed|exhaust|cloudflare|rate|service|refus|restrict/i;
const HTML_ENTITY = /&#(?:x[0-9a-f]{1,8}|\d{1,10});?|&[a-z][a-z0-9]{1,31};/gi;
const RESIDUAL_ENTITY = /&#|&[a-z][a-z0-9]{1,31};/i;
const HTML_ENTITIES: Readonly<Record<string, string>> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hyphen: "-",
  dash: "-",
  ndash: "–",
  mdash: "—",
  lowbar: "_",
  sol: "/",
  bsol: "\\",
  period: ".",
  colon: ":",
  semi: ";",
  commat: "@",
  equals: "=",
  num: "#",
  lpar: "(",
  rpar: ")",
  tab: "\t",
  newline: "\n",
};

function decodedEntity(entity: string): string | null {
  const token = entity.toLowerCase().replace(/;$/, "");
  if (!token.startsWith("&#")) {
    const name = token.slice(1);
    return Object.hasOwn(HTML_ENTITIES, name) ? HTML_ENTITIES[name] : null;
  }
  const hex = token.startsWith("&#x");
  const point = Number.parseInt(token.slice(hex ? 3 : 2), hex ? 16 : 10);
  if (!Number.isFinite(point) || point < 1 || point > 0x10ffff) return null;
  if (point >= 0xd800 && point <= 0xdfff) return null;
  return String.fromCodePoint(point);
}

function decodedDiagnosticText(value: string): string | null {
  if (value.length > MAX_TEXT_SCAN) return null;
  let text = value;
  for (let pass = 0; pass < 3; pass++) {
    let unsupported = false;
    const decoded = text.replace(HTML_ENTITY, (entity) => {
      const replacement = decodedEntity(entity);
      if (replacement === null) unsupported = true;
      return replacement ?? "";
    });
    if (unsupported) return null;
    if (decoded === text) break;
    text = decoded;
  }
  return RESIDUAL_ENTITY.test(text) ? null : text;
}

type CollectedNode = { value: unknown; depth: number };

function collectSensitiveNode(
  item: CollectedNode,
  strings: Set<string>,
  pending: CollectedNode[],
  seen: Set<unknown>
): boolean {
  if (typeof item.value === "string") {
    if (item.value.length > 2048) return false;
    if (item.value) strings.add(item.value);
    return true;
  }
  if (!item.value || typeof item.value !== "object" || seen.has(item.value)) return true;
  seen.add(item.value);
  const children = sensitiveChildren(item.value);
  if (!children) return false;
  for (const child of children) pending.push({ value: child, depth: item.depth + 1 });
  return true;
}

/** Collect caller-owned values without invoking getters. Never log the result.
 * Overflow returns a static overlong sentinel, making the projector fail closed. */
export function systemOneSensitiveValues(values: readonly unknown[]): string[] {
  if (values.length > 256) return [COLLECTION_OVERFLOW];
  const strings = new Set<string>();
  const pending = values.map((value) => ({ value, depth: 0 }));
  const seen = new Set<unknown>();
  let visited = 0;
  while (pending.length) {
    const item = pending.pop()!;
    if (++visited > 512 || item.depth > 8) return [COLLECTION_OVERFLOW];
    if (!collectSensitiveNode(item, strings, pending, seen)) return [COLLECTION_OVERFLOW];
    if (strings.size > 256) return [COLLECTION_OVERFLOW];
  }
  return [...strings];
}

function sensitiveChildren(value: object): unknown[] | null {
  try {
    const keys = Reflect.ownKeys(value);
    if (keys.length > 256) return null;
    const children: unknown[] = [];
    for (const key of keys) {
      const property = Object.getOwnPropertyDescriptor(value, key);
      if (!property?.enumerable) continue;
      if (!("value" in property)) return null;
      if (typeof key === "string" && !PUBLIC_REQUEST_KEYS.has(key) && !Array.isArray(value))
        children.push(key);
      children.push(property.value);
    }
    return children;
  } catch {
    return null;
  }
}

function own(value: unknown, key: string): unknown {
  if (!value || typeof value !== "object") return undefined;
  try {
    const property = Object.getOwnPropertyDescriptor(value, key);
    return property && "value" in property ? property.value : undefined;
  } catch {
    return undefined;
  }
}

function parsedBody(input: SystemOneFailureInput): unknown {
  if (input.body !== undefined) return input.body;
  if (!input.bodyText || input.bodyText.length > MAX_BODY) return null;
  try {
    return JSON.parse(input.bodyText);
  } catch {
    return null;
  }
}

function sensitiveVariants(values: readonly string[]): string[] | null {
  if (values.length > 256) return null;
  const variants = new Set<string>();
  for (const value of values) {
    if (typeof value !== "string" || !value) continue;
    if (value.length > 2048) return null;
    let uri: string;
    try {
      uri = encodeURIComponent(value);
    } catch {
      return null;
    }
    const decoded = decodedDiagnosticText(value);
    if (decoded === null) return null;
    const encoded = [value, decoded, JSON.stringify(value).slice(1, -1), uri];
    if (encoded.some((entry) => entry.length > MAX_TEXT_SCAN - 1024)) return null;
    for (const variant of encoded) variants.add(variant);
  }
  return [...variants].sort((left, right) => right.length - left.length);
}

function redactLiterals(text: string, variants: readonly string[]): string {
  let result = text;
  for (const value of variants) {
    const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(escaped, "gi"), "[REDACTED]");
  }
  return result;
}

function safeText(value: unknown, variants: readonly string[], maximum: number): string | null {
  if (typeof value !== "string" || !value) return null;
  const decoded = decodedDiagnosticText(value);
  if (decoded === null || /<\/?[a-z][^>]{0,512}>/i.test(decoded)) return null;
  let text = redactLiterals(decoded, variants);
  text = sanitizeErrorMessage(text);
  const normalized = decodedDiagnosticText(text);
  if (normalized === null || /<\/?[a-z][^>]{0,512}>/i.test(normalized)) return null;
  // Canonical sanitization can decode escaped literals: redact them again afterwards.
  text = redactLiterals(normalized, variants)
    .replace(/https?:\/\/[^\s<>"']+/gi, "[REDACTED URL]")
    .replace(/\b[A-Z0-9._%+-]{1,64}@[A-Z0-9.-]{1,253}\.[A-Z]{2,24}\b/gi, "[REDACTED ACCOUNT]")
    .replace(
      /\b(account|user|organization|org|project|tenant|customer)(?:[_ -]?id)?(?:\s*[:=#]\s*|\s+)(?:"[^"\r\n]{1,128}"|'[^'\r\n]{1,128}'|[^\s,;:!?<>"']{1,128})/gi,
      "$1 [REDACTED ACCOUNT]"
    )
    .replace(
      /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
      "[REDACTED ACCOUNT]"
    )
    .replace(/\b[0-9a-f]{24,128}\b/gi, "[REDACTED ID]")
    .replace(
      /\b(?:acct|account|user|org|organization|project|proj|tenant|customer|cus|connection|conn|workspace|ws)_[A-Za-z0-9][A-Za-z0-9_-]{3,127}\b/gi,
      "[REDACTED ACCOUNT]"
    )
    .replace(/[\u0000-\u001f\u007f]+/g, " ");
  text = sanitizeErrorMessage(text).slice(0, maximum).trim();
  return text || null;
}

function safeIdentifier(value: unknown, variants: readonly string[]): string | null {
  if (typeof value !== "string" || !value || value.length > 2048) return null;
  let candidate = value;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) {
    try {
      const url = new URL(value);
      candidate =
        url.protocol === "urn:"
          ? url.pathname.split(":").at(-1) || ""
          : url.hash.slice(1) || url.pathname.split("/").at(-1) || "";
    } catch {
      return null;
    }
  }
  const safe = safeText(candidate, variants, 96);
  if (!safe || !IDENTIFIER.test(safe)) return null;
  return DIAGNOSTIC_WORD.test(safe) || safe === "1010" ? safe : null;
}

function diagnosticChildren(value: unknown, depth: number): CollectedNode[] {
  return ["error", "cause", "errors"].flatMap((key) => {
    const child = own(value, key);
    const children = Array.isArray(child) ? child.slice(0, 4) : [child];
    return children
      .filter((entry) => entry !== undefined)
      .map((entry) => ({ value: entry, depth }));
  });
}

function diagnosticNodes(root: unknown): unknown[] {
  const found: unknown[] = [];
  const pending = [{ value: root, depth: 0 }];
  const seen = new Set<unknown>();
  while (pending.length && found.length < MAX_NODES) {
    const item = pending.shift()!;
    if (item.depth >= MAX_DEPTH || seen.has(item.value)) continue;
    seen.add(item.value);
    found.push(item.value);
    pending.push(...diagnosticChildren(item.value, item.depth + 1));
  }
  return found;
}

function projectTextFields(
  node: unknown,
  details: SystemOneFailureDiagnostic["details"],
  variants: readonly string[]
): void {
  for (const field of ["title", "detail", "message"] as const) {
    const text = safeText(
      field === "message" && typeof node === "string" ? node : own(node, field),
      variants,
      field === "title" ? 192 : 512
    );
    if (text && !details[field]) details[field] = text;
  }
}

function projectedDetails(
  root: unknown,
  variants: readonly string[]
): SystemOneFailureDiagnostic["details"] {
  const details: SystemOneFailureDiagnostic["details"] = {};
  for (const node of diagnosticNodes(root)) {
    projectTextFields(node, details, variants);
    const type = safeIdentifier(own(node, "type"), variants);
    const code = safeIdentifier(own(node, "code") ?? own(node, "name"), variants);
    if (type && !details.type) details.type = type;
    if (code && !details.code) details.code = code;
  }
  return details;
}

function failureKind(status: number, text: string, edge: boolean): SystemOneFailureKind {
  if (edge) return "edge";
  if (
    /(?:only (?:available|allowed|supported|accessible)|requires?|restricted to).{0,48}opencode|only (?:be )?(?:used|accessed) (?:through|with|in|from|via) opencode|opencode(?: client)?(?: is)? (?:required|only)|client[_ -]?restrict(?:ed|ion)/i.test(
      text
    )
  )
    return "client_restricted";
  if (status === 401) return "authentication";
  if (status === 403 || status === 451) return "access";
  if (status === 402) return "quota";
  if (status === 429) {
    // This private gateway error can describe quota or client eligibility. Do not
    // convert its wording into proof that an account's allowance was exhausted.
    if (/free[_ -]*usage[_ -]*limit/i.test(text)) return "unknown";
    if (/rate[_ -]?limit|too many requests/i.test(text)) return "rate_limit";
    return /quota|usage|credit|budget|limit/i.test(text) ? "quota" : "rate_limit";
  }
  if (status >= 400 && status < 500) return "request";
  return status >= 500 ? "provider" : "unknown";
}

export function projectSystemOneFailure(input: SystemOneFailureInput): SystemOneFailureDiagnostic {
  const status =
    Number.isInteger(input.status) && input.status >= 100 && input.status <= 599
      ? input.status
      : 502;
  const root = parsedBody(input);
  const variants = sensitiveVariants(input.sensitiveValues ?? []);
  const details = variants ? projectedDetails(root, variants) : {};
  const text = Object.values(details).join("; ");
  const rawText = (input.bodyText ?? "").slice(0, MAX_BODY);
  const html = /^\s*(?:<!doctype\s+html|<html|<head|<title)/i.test(rawText) ? rawText : "";
  const edgeEvidence = `${html} ${text}`;
  const edge = status === 403 && /cloudflare/i.test(edgeEvidence) && /\b1010\b/.test(edgeEvidence);
  const kind = failureKind(status, text, edge);
  // An HTTP status does not prove which provider, edge or intermediary emitted it.
  const prefix = `Upstream returned HTTP ${status}`;
  const message = edge
    ? `${prefix}: Cloudflare 1010 edge restriction; check truthful application identification`
    : sanitizeErrorMessage(text ? `${prefix}: ${text}` : prefix).slice(0, 1200);
  return {
    message,
    kind,
    authScope: input.authenticated === false ? "anonymous" : "unknown",
    terminalAccessDenied:
      kind === "client_restricted" || [401, 402, 403, 429, 451].includes(status),
    details: edge ? {} : details,
  };
}

/** Preserve only bounded delta-seconds or canonical IMF-fixdate, never arbitrary header text. */
export function systemOneRetryAfter(value: string | null): string | null {
  if (value === null || value.length > 64) return null;
  const text = value.trim();
  if (/^\d{1,10}$/.test(text)) {
    const seconds = Number(text);
    return seconds <= 2_147_483_647 ? String(seconds) : null;
  }
  if (
    !/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), \d{2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4} \d{2}:\d{2}:\d{2} GMT$/.test(
      text
    )
  )
    return null;
  const instant = Date.parse(text);
  return Number.isFinite(instant) && new Date(instant).toUTCString() === text ? text : null;
}
