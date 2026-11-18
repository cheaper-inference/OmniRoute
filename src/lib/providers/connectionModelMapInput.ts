/**
 * Connection-level model map formatting and parsing for dashboard UI and API helpers.
 */

export interface ParsedModelMap {
  map: Record<string, string> | null;
  error: string | null;
}

/**
 * Format a Record<string, string> map into key-value lines for form editing.
 *
 * The default `key: value` separator is ambiguous once a model id contains a colon, which is
 * common for provider-prefixed ids (`openai:gpt-4o`). Any such pair is written with `->` instead,
 * which `parseModelMapInput` checks first and which never appears inside a model id, so the text
 * this function returns always parses back to the map it came from.
 */
export function formatModelMapInput(map: Record<string, string> | null | undefined): string {
  if (!map || typeof map !== "object" || Array.isArray(map)) return "";
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}${k.includes(":") || v.includes(":") ? " -> " : ": "}${v}`)
    .join("\n");
}

function toParsedMap(map: Record<string, string>): ParsedModelMap {
  return { map: Object.keys(map).length > 0 ? map : null, error: null };
}

function parseModelMapJson(raw: string): ParsedModelMap {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { map: null, error: "Invalid JSON format" };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { map: null, error: "Model map JSON must be an object" };
  }
  const map: Record<string, string> = {};
  for (const [k, v] of Object.entries(parsed)) {
    if (typeof v !== "string") {
      return { map: null, error: `Invalid target model for "${k}"` };
    }
    if (k.trim() && v.trim()) {
      map[k.trim()] = v.trim();
    }
  }
  return toParsedMap(map);
}

/** First separator on the line, tried in order: `->`, `=`, `:`. */
function findSeparator(line: string): { index: number; length: number } | null {
  for (const sep of ["->", "=", ":"]) {
    const index = line.indexOf(sep);
    if (index !== -1) return { index, length: sep.length };
  }
  return null;
}

function parseModelMapLines(raw: string): ParsedModelMap {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const map: Record<string, string> = {};

  for (const line of lines) {
    const sep = findSeparator(line);
    if (!sep) {
      return { map: null, error: `Invalid entry "${line}". Expected requested: target` };
    }

    const from = line.slice(0, sep.index).trim();
    const to = line.slice(sep.index + sep.length).trim();
    if (!from || !to) {
      return {
        map: null,
        error: `Invalid entry "${line}". Both requested and target models are required`,
      };
    }
    map[from] = to;
  }

  return toParsedMap(map);
}

/**
 * Parse textarea input into a model map Record<string, string>.
 * Accepts:
 *  - JSON object (e.g. `{"gpt-4o": "gpt-4o-mini"}`)
 *  - Lines with colon, equal, or arrow separators:
 *      gpt-4o: gpt-4o-mini
 *      gpt-4o = gpt-4o-mini
 *      gpt-4o -> gpt-4o-mini
 */
export function parseModelMapInput(text: string): ParsedModelMap {
  const raw = typeof text === "string" ? text.trim() : "";
  if (!raw) return { map: null, error: null };
  return raw.startsWith("{") ? parseModelMapJson(raw) : parseModelMapLines(raw);
}
