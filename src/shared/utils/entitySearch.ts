import { normalizeForSearch } from "./turkishText";

export function normalizeEntitySearch(text: string): string {
  return normalizeForSearch(text)
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\s\u200c]+/g, " ")
    .trim();
}

/** Every term may match a different field in the pre-normalized text. */
export function matchesEntitySearch(query: string, text: string): boolean {
  return normalizeEntitySearch(query)
    .split(" ")
    .every((term) => text.includes(term));
}
