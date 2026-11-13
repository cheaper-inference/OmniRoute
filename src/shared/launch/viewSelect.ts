/**
 * viewSelect.ts: the ONE launch model view selector (architecture section 3.2).
 *
 * Shared by the launcher core (`bin/cli/launch/core/view.mjs`, via `bin/cli/launch/contract.mjs`)
 * and the gateway view engine, so the list a tool is told about (inject) and the list the gateway
 * serves (server-view) are identical for the same input rows.
 *
 * Pure on purpose: no imports, no I/O, no clock, no randomness. The hash is a self-contained
 * SHA-256 so this module runs unchanged in Node, the CLI bundle and the browser.
 *
 * Order of operations: filter -> order -> dedupe -> limit. Authorization (what the parent key may
 * see) happens BEFORE this function, server side; selectView can only drop rows, never add.
 *
 * Unknown context (row without a positive `contextTokens`): KEPT by `minContextTokens`, dropped
 * only when `requireKnownContext` is true (section 2 `ViewSelectSpec.filter`). Tools such as
 * hermes, openclaw and crush need a number per row and set `requireKnownContext`.
 */

export type WireProtocol =
  "anthropic-messages" | "openai-responses" | "openai-chat" | "gemini-native";

export const WIRE_PROTOCOLS: readonly WireProtocol[] = [
  "anthropic-messages",
  "openai-responses",
  "openai-chat",
  "gemini-native",
];

/** Catalog surface kinds a view may keep (catalogFilters.ts vocabulary subset). */
export type ViewCatalogKind = "chat" | "embedding" | "image" | "audio" | "rerank";

export const VIEW_CATALOG_KINDS: readonly ViewCatalogKind[] = [
  "chat",
  "embedding",
  "image",
  "audio",
  "rerank",
];

export interface ViewSelectSpec {
  /** Stable name for logs and cache keys, e.g. "claude-code". Not a server-side switch. */
  name: string;
  filter: {
    /** Keep only rows callable over at least one of these protocols. Rows that do not declare
     *  `protocols` are kept (the gateway translates between wire formats). */
    protocols?: WireProtocol[];
    /** Keep only these catalog kinds. Default ["chat"]. A row without `type` is "chat". */
    kinds?: ViewCatalogKind[];
    /** Drop rows whose KNOWN context window is below this. Unknown context is kept unless
     *  `requireKnownContext`. */
    minContextTokens?: number;
    requireKnownContext?: boolean;
    /** Every listed capability must be present on the row. "tools" and "tool_calling" are
     *  treated as the same capability (architecture vs catalog vocabulary). */
    capabilities?: string[];
    /** Glob (`*` only) allow list on raw ids. Empty or absent = allow all. */
    includeIds?: string[];
    /** Glob (`*` only) deny list on raw ids; wins over includeIds. */
    excludeIds?: string[];
    /** Keep combo and auto rows. Default true. */
    combos?: boolean;
  };
  /** "preferences" (default): favorites, then recents, then catalog order. "catalog": as given. */
  order?: "preferences" | "catalog";
  /** Cap on the number of rows, applied last. Absent = no cap. */
  limit?: number;
}

/** One normalized view row (section 2 `LaunchModelView.rows[number]`). */
export interface LaunchViewRow {
  id: string;
  label?: string;
  contextTokens?: number;
  maxOutputTokens?: number;
  capabilities: ReadonlyArray<string>;
  kind: "model" | "combo" | "auto";
  availability?: "ok" | "degraded" | "down" | null;
}

/** Input row: a view row plus the catalog-only fields the filter reads. */
export interface ViewCatalogRow extends LaunchViewRow {
  /** Catalog surface type; absent = "chat". */
  type?: string;
  /** Wire protocols the row is callable over; absent = any. */
  protocols?: ReadonlyArray<WireProtocol>;
}

export interface ViewPreferences {
  favorites?: ReadonlyArray<string>;
  recent?: ReadonlyArray<string>;
}

export interface ViewSelection {
  /** Selected raw ids, in view order. */
  ids: string[];
  /** Selected rows, in view order, normalized to `LaunchViewRow` (catalog-only keys dropped). */
  rows: LaunchViewRow[];
  /** Lowercase hex SHA-256 of `JSON.stringify(ids)`. */
  hash: string;
}

const TOOL_CAPABILITY_ALIASES = new Set(["tools", "tool_calling"]);

function hasCapability(row: ViewCatalogRow, wanted: string): boolean {
  const caps = Array.isArray(row.capabilities) ? row.capabilities : [];
  if (TOOL_CAPABILITY_ALIASES.has(wanted)) {
    return caps.some((cap) => TOOL_CAPABILITY_ALIASES.has(cap));
  }
  return caps.includes(wanted);
}

function knownContext(row: ViewCatalogRow): number | null {
  const value = row.contextTokens;
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}

/** `*` matches any run of characters (including none); every other character is literal. */
export function globMatch(pattern: string, value: string): boolean {
  const parts = pattern.split("*");
  if (parts.length === 1) return pattern === value;
  const first = parts[0];
  const last = parts[parts.length - 1];
  if (!value.startsWith(first)) return false;
  if (value.length < first.length + last.length) return false;
  if (!value.endsWith(last)) return false;
  let cursor = first.length;
  const end = value.length - last.length;
  for (let i = 1; i < parts.length - 1; i++) {
    const part = parts[i];
    if (part === "") continue;
    const found = value.indexOf(part, cursor);
    if (found === -1 || found + part.length > end) return false;
    cursor = found + part.length;
  }
  return true;
}

function rowPasses(row: ViewCatalogRow, spec: ViewSelectSpec): boolean {
  const filter = spec.filter || {};
  if (!row || typeof row.id !== "string" || row.id === "") return false;

  const kinds = filter.kinds && filter.kinds.length > 0 ? filter.kinds : ["chat"];
  const rowType = typeof row.type === "string" && row.type !== "" ? row.type : "chat";
  if (!(kinds as string[]).includes(rowType)) return false;

  if (filter.combos === false && (row.kind === "combo" || row.kind === "auto")) return false;

  if (filter.protocols && filter.protocols.length > 0 && Array.isArray(row.protocols)) {
    if (!row.protocols.some((protocol) => filter.protocols!.includes(protocol))) return false;
  }

  const context = knownContext(row);
  if (filter.requireKnownContext && context === null) return false;
  if (typeof filter.minContextTokens === "number" && context !== null) {
    if (context < filter.minContextTokens) return false;
  }

  for (const cap of filter.capabilities || []) {
    if (!hasCapability(row, cap)) return false;
  }

  if (filter.includeIds && filter.includeIds.length > 0) {
    if (!filter.includeIds.some((pattern) => globMatch(pattern, row.id))) return false;
  }
  if (filter.excludeIds && filter.excludeIds.some((pattern) => globMatch(pattern, row.id))) {
    return false;
  }
  return true;
}

function toViewRow(row: ViewCatalogRow): LaunchViewRow {
  const out: LaunchViewRow = {
    id: row.id,
    capabilities: Array.isArray(row.capabilities) ? [...row.capabilities] : [],
    kind: row.kind === "combo" || row.kind === "auto" ? row.kind : "model",
  };
  if (typeof row.label === "string") out.label = row.label;
  if (knownContext(row) !== null) out.contextTokens = row.contextTokens;
  if (typeof row.maxOutputTokens === "number" && row.maxOutputTokens > 0) {
    out.maxOutputTokens = row.maxOutputTokens;
  }
  if (row.availability !== undefined) out.availability = row.availability;
  return out;
}

/**
 * Select the launch view. Deterministic: the same (rows, spec, prefs) always yields the same
 * ids, rows and hash. Duplicate ids keep their first occurrence.
 */
export function selectView(
  rows: ReadonlyArray<ViewCatalogRow>,
  spec: ViewSelectSpec,
  prefs: ViewPreferences = {}
): ViewSelection {
  const kept: ViewCatalogRow[] = [];
  const seen = new Set<string>();
  for (const row of rows || []) {
    if (!rowPasses(row, spec)) continue;
    if (seen.has(row.id)) continue;
    seen.add(row.id);
    kept.push(row);
  }

  let ordered = kept;
  if ((spec.order ?? "preferences") === "preferences") {
    const rank = new Map<string, number>();
    const preferred = [...(prefs.favorites || []), ...(prefs.recent || [])];
    for (const id of preferred) if (!rank.has(id)) rank.set(id, rank.size);
    ordered = kept
      .map((row, index) => ({ row, index, rank: rank.has(row.id) ? rank.get(row.id)! : Infinity }))
      .sort((a, b) => (a.rank === b.rank ? a.index - b.index : a.rank - b.rank))
      .map((entry) => entry.row);
  }

  if (typeof spec.limit === "number" && spec.limit >= 0) {
    ordered = ordered.slice(0, Math.floor(spec.limit));
  }

  const ids = ordered.map((row) => row.id);
  return { ids, rows: ordered.map(toViewRow), hash: viewHash(ids) };
}

/** The canonical view hash: lowercase hex SHA-256 of `JSON.stringify(ids)`. */
export function viewHash(ids: ReadonlyArray<string>): string {
  return sha256Hex(JSON.stringify([...ids]));
}

// ---------- self-contained SHA-256 (FIPS 180-4), so this module needs no imports ----------

const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

function utf8Bytes(text: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    if (code >= 0xd800 && code <= 0xdbff && i + 1 < text.length) {
      const next = text.charCodeAt(i + 1);
      if (next >= 0xdc00 && next <= 0xdfff) {
        code = 0x10000 + ((code - 0xd800) << 10) + (next - 0xdc00);
        i++;
      }
    }
    if (code >= 0xd800 && code <= 0xdfff) code = 0xfffd; // lone surrogate, as TextEncoder does
    if (code < 0x80) bytes.push(code);
    else if (code < 0x800) bytes.push(0xc0 | (code >> 6), 0x80 | (code & 63));
    else if (code < 0x10000) {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 63), 0x80 | (code & 63));
    } else {
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 63),
        0x80 | ((code >> 6) & 63),
        0x80 | (code & 63)
      );
    }
  }
  return bytes;
}

export function sha256Hex(text: string): string {
  const bytes = utf8Bytes(text);
  const bitLength = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  const high = Math.floor(bitLength / 0x100000000);
  const low = bitLength >>> 0;
  bytes.push((high >>> 24) & 255, (high >>> 16) & 255, (high >>> 8) & 255, high & 255);
  bytes.push((low >>> 24) & 255, (low >>> 16) & 255, (low >>> 8) & 255, low & 255);

  const h = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];
  const w = new Array<number>(64);
  const rotr = (x: number, n: number) => (x >>> n) | (x << (32 - n));
  for (let offset = 0; offset < bytes.length; offset += 64) {
    for (let i = 0; i < 16; i++) {
      const j = offset + i * 4;
      w[i] = ((bytes[j] << 24) | (bytes[j + 1] << 16) | (bytes[j + 2] << 8) | bytes[j + 3]) >>> 0;
    }
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, hh] = h;
    for (let i = 0; i < 64; i++) {
      const s1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (hh + s1 + ch + K[i] + w[i]) >>> 0;
      const s0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (s0 + maj) >>> 0;
      hh = g;
      g = f;
      f = e;
      e = (d + t1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (t1 + t2) >>> 0;
    }
    h[0] = (h[0] + a) >>> 0;
    h[1] = (h[1] + b) >>> 0;
    h[2] = (h[2] + c) >>> 0;
    h[3] = (h[3] + d) >>> 0;
    h[4] = (h[4] + e) >>> 0;
    h[5] = (h[5] + f) >>> 0;
    h[6] = (h[6] + g) >>> 0;
    h[7] = (h[7] + hh) >>> 0;
  }
  return h.map((word) => word.toString(16).padStart(8, "0")).join("");
}
