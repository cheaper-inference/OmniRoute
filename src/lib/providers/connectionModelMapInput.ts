/**
 * Connection-level model map formatting and parsing for dashboard UI and API helpers.
 */

export interface ParsedModelMap {
  map: Record<string, string> | null;
  error: string | null;
}

/**
 * Format a Record<string, string> map into key-value lines for form editing.
 */
export function formatModelMapInput(map: Record<string, string> | null | undefined): string {
  if (!map || typeof map !== "object" || Array.isArray(map)) return "";
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
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

  if (raw.startsWith("{")) {
    try {
      const parsed = JSON.parse(raw);
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
      return { map: Object.keys(map).length > 0 ? map : null, error: null };
    } catch {
      return { map: null, error: "Invalid JSON format" };
    }
  }

  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const map: Record<string, string> = {};

  for (const line of lines) {
    let sepIdx = line.indexOf("->");
    let sepLen = 2;
    if (sepIdx === -1) {
      sepIdx = line.indexOf("=");
      sepLen = 1;
    }
    if (sepIdx === -1) {
      sepIdx = line.indexOf(":");
      sepLen = 1;
    }
    if (sepIdx === -1) {
      return { map: null, error: `Invalid entry "${line}". Expected requested: target` };
    }

    const from = line.slice(0, sepIdx).trim();
    const to = line.slice(sepIdx + sepLen).trim();
    if (!from || !to) {
      return {
        map: null,
        error: `Invalid entry "${line}". Both requested and target models are required`,
      };
    }
    map[from] = to;
  }

  return { map: Object.keys(map).length > 0 ? map : null, error: null };
}
