export type ModelCatalogSource = "system" | "custom" | "imported" | "fallback" | "alias" | "auto";

type ModelCatalogTarget = {
  modelId?: string | null;
  modelName?: string | null;
  alias?: string | null;
  source?: string | null;
};

function normalizeText(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function normalizeModelCatalogSource(source?: string | null): ModelCatalogSource {
  const normalized = normalizeText(source);

  if (
    normalized === "api-sync" ||
    normalized === "synced" ||
    normalized === "auto-sync" ||
    normalized === "imported"
  ) {
    return "imported";
  }
  if (normalized === "fallback") return "fallback";
  if (normalized === "alias") return "alias";
  // Models discovered live from a custom provider's upstream `/models` endpoint.
  if (normalized === "auto") return "auto";
  if (normalized === "custom" || normalized === "manual") {
    return "custom";
  }

  return "system";
}

export function getModelCatalogSourceLabel(source?: string | null): string {
  switch (normalizeModelCatalogSource(source)) {
    case "imported":
      return "Imported";
    case "custom":
      return "Custom";
    case "fallback":
      return "Fallback";
    case "alias":
      return "Alias";
    case "auto":
      return "Auto";
    case "system":
    default:
      return "Built-in";
  }
}

function getModelCatalogSourceSearchText(source?: string | null): string {
  switch (normalizeModelCatalogSource(source)) {
    case "imported":
      return "synced api imported discovered";
    case "custom":
      return "custom manual imported";
    case "fallback":
      return "fallback compatible";
    case "alias":
      return "alias shortcut";
    case "auto":
      return "auto fetched discovered upstream";
    case "system":
    default:
      return "built-in builtin official catalog";
  }
}

/** `/pattern/` or `/pattern/flags` (case-insensitive by default); null when the text is not a valid one. */
function parseRegexQuery(query: string): RegExp | null {
  const m = /^\/(.+)\/([a-z]*)$/i.exec(query.trim());
  if (!m) return null;
  try {
    return new RegExp(m[1], m[2] || "i");
  } catch {
    return null;
  }
}

/**
 * Substring match on the id, name, alias and source label. Two operators on top:
 * `/regex/` matches a regular expression, and a `!term` token excludes models that contain `term`
 * (`claude !haiku`). Any other query, including `-pro`, stays a plain substring.
 */
export function matchesModelCatalogQuery(query: string, target: ModelCatalogTarget): boolean {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return true;

  const haystacks = [
    normalizeText(target.modelId),
    normalizeText(target.modelName),
    normalizeText(target.alias),
    getModelCatalogSourceSearchText(target.source),
  ].filter(Boolean);

  const regex = parseRegexQuery(query);
  if (regex) return haystacks.some((value) => regex.test(value));

  const tokens = normalizedQuery.split(/\s+/);
  const excluded = tokens.filter((t) => t.length > 1 && t.startsWith("!")).map((t) => t.slice(1));
  if (excluded.some((term) => haystacks.some((value) => value.includes(term)))) return false;

  const included = tokens.filter((t) => !(t.length > 1 && t.startsWith("!")));
  if (included.length === 0) return true;
  // Space-separated tokens stay one phrase, as before; only the `!` tokens are split off.
  const positive = included.join(" ");
  return haystacks.some((value) => value.includes(positive));
}
