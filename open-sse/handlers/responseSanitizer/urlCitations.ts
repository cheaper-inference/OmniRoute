/**
 * `url_citation` annotations on a chat completion message or stream delta: the sources a
 * web-grounded answer cites. Only well-formed entries and their standard fields are kept.
 */
type JsonRecord = Record<string, unknown>;

const record = (value: unknown): JsonRecord | null =>
  value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;

function httpUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:" ? value : null;
  } catch {
    // Not a URL: the annotation is dropped rather than forwarded.
    return null;
  }
}

function urlCitation(annotation: unknown): JsonRecord | null {
  const entry = record(annotation);
  const citation = entry?.type === "url_citation" ? record(entry.url_citation) : null;
  const url = httpUrl(citation?.url);
  if (!citation || !url) return null;
  const kept: JsonRecord = { url };
  if (typeof citation.title === "string") kept.title = citation.title;
  for (const key of ["start_index", "end_index"] as const) {
    const index = citation[key];
    if (Number.isSafeInteger(index) && (index as number) >= 0) kept[key] = index;
  }
  return { type: "url_citation", url_citation: kept };
}

/** Copy the usable `url_citation` annotations of `source` onto `target`, if there are any. */
export function copyUrlCitationAnnotations(source: JsonRecord, target: JsonRecord): void {
  if (!Array.isArray(source.annotations)) return;
  const annotations = source.annotations.map(urlCitation).filter((citation) => citation !== null);
  if (annotations.length) target.annotations = annotations;
}
