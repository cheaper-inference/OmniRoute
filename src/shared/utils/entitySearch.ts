import { normalizeForSearch } from "./turkishText";

/** Only explicitly projected, public text belongs in an entity search index. */
export interface EntitySearchOption {
  value: string;
  label: string;
  description?: string;
  keywords?: readonly string[];
  disabled?: boolean;
  alwaysVisible?: boolean;
}

export function normalizeEntitySearch(text: string): string {
  return normalizeForSearch(text)
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\s\u200c]+/g, " ")
    .trim();
}

export function indexEntityOptions<T extends EntitySearchOption>(options: readonly T[]) {
  return options.map((option) => ({
    option,
    text: normalizeEntitySearch(
      [option.label, option.value, option.description ?? "", ...(option.keywords ?? [])].join(" ")
    ),
  }));
}

export function filterEntityOptions<T extends EntitySearchOption>(
  index: readonly { option: T; text: string }[],
  query: string
): T[] {
  const terms = normalizeEntitySearch(query).split(" ").filter(Boolean);
  return index
    .filter(
      ({ option, text }) => option.alwaysVisible || terms.every((term) => text.includes(term))
    )
    .map(({ option }) => option);
}

/** All query terms may match different explicitly allowed fields. */
export function matchesEntitySearch(texts: readonly string[], query: string): boolean {
  const text = normalizeEntitySearch(texts.join(" "));
  return normalizeEntitySearch(query)
    .split(" ")
    .filter(Boolean)
    .every((term) => text.includes(term));
}
