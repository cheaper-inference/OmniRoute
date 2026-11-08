/**
 * Copilot cites its sources inline with private-use control markers,
 * `\uE200cite\uE202<id>[\uE202<id>…]\uE201`, and sends the sources themselves as a `references`
 * dictionary on the bot message (and on the update that streams the cited text). Each entry's
 * `displayData.content` is a JSON string whose `metadata.referenceId` is the marker id.
 *
 * Markers never reach a client: a resolved source becomes a numbered Markdown link plus a
 * `url_citation` annotation covering it, and a source that never arrives is dropped.
 */
type JsonRecord = Record<string, unknown>;
const record = (value: unknown): JsonRecord | null =>
  value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;

const OPEN = "\uE200";
const SEPARATOR = "\uE202";
const CLOSE = "\uE201";
const MARKER_HEAD = `${OPEN}cite${SEPARATOR}`;
const MARKER_ID = /^[A-Za-z0-9_.:-]{1,128}$/;
/** Longest marker accepted; a longer unterminated span is literal text, not a marker. */
const MAX_MARKER_LENGTH = 1024;
export const M365_MAX_REFERENCES = 512;
const MAX_TITLE_LENGTH = 512;

export interface M365Source {
  url: string;
  title: string;
}
export interface M365UrlCitation {
  type: "url_citation";
  url_citation: { url: string; title: string; start_index: number; end_index: number };
}
export interface M365RenderedCitations {
  text: string;
  annotations: M365UrlCitation[];
  /** Length of `text` that can no longer change; later text waits for a source or the end. */
  stableLength: number;
}

function parseJson(value: unknown): JsonRecord | null {
  if (typeof value !== "string") return null;
  try {
    return record(JSON.parse(value));
  } catch {
    // Not JSON: the reference carries no usable display data.
    return null;
  }
}

function webUrl(value: unknown): URL | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    // Not a URL: the reference is unusable.
    return null;
  }
}

function firstText(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim().slice(0, MAX_TITLE_LENGTH);
  }
}

/** One `references` entry, or null when it has no marker id or no web URL. */
export function m365Reference(value: unknown): { id: string; source: M365Source } | null {
  const entry = record(value);
  const url = webUrl(entry?.targetLink);
  if (!entry || !url) return null;
  const display = parseJson(record(entry.displayData)?.content);
  const metadata = record(display?.metadata);
  const id = firstText(metadata?.referenceId, metadata?.citationRefId);
  if (!id || !MARKER_ID.test(id)) return null;
  const title =
    firstText(display?.Title, display?.title, display?.providerDisplayName, entry.title) ??
    url.hostname;
  return { id, source: { url: url.href, title } };
}

/** The sources one turn has announced so far, by marker id. */
export class M365CitationLedger {
  private readonly sources = new Map<string, M365Source>();

  add(references: unknown): void {
    const entries = record(references);
    if (!entries) return;
    for (const value of Object.values(entries)) {
      if (this.sources.size >= M365_MAX_REFERENCES) return;
      const reference = m365Reference(value);
      if (reference && !this.sources.has(reference.id))
        this.sources.set(reference.id, reference.source);
    }
  }

  get(id: string): M365Source | undefined {
    return this.sources.get(id);
  }
}

type Marker =
  { kind: "marker"; ids: string[]; end: number } | { kind: "pending" } | { kind: "literal" };

function readMarker(raw: string, start: number, final: boolean): Marker {
  const end = raw.indexOf(CLOSE, start);
  const span = end < 0 ? raw.slice(start) : raw.slice(start, end);
  const head = span.slice(0, MARKER_HEAD.length);
  if (!MARKER_HEAD.startsWith(head) || span.length > MAX_MARKER_LENGTH) return { kind: "literal" };
  // A marker cut off by the end of the turn is control markup without a source: drop it.
  if (end < 0)
    return final ? { kind: "marker", ids: [], end: raw.length - 1 } : { kind: "pending" };
  const ids = span.slice(MARKER_HEAD.length).split(SEPARATOR);
  if (span.length < MARKER_HEAD.length || !ids.every((id) => MARKER_ID.test(id)))
    return { kind: "literal" };
  return { kind: "marker", ids, end };
}

class Renderer {
  text = "";
  readonly annotations: M365UrlCitation[] = [];
  stableLength: number | undefined;
  private readonly numbers = new Map<string, number>();

  constructor(private readonly ledger: M365CitationLedger) {}

  hold(): void {
    this.stableLength ??= this.text.length;
  }

  private annotate(source: M365Source, piece: string): void {
    const start = this.text.length;
    this.text += piece;
    this.annotations.push({
      type: "url_citation",
      url_citation: {
        url: source.url,
        title: source.title,
        start_index: start,
        end_index: this.text.length,
      },
    });
  }

  marker(ids: string[], final: boolean): void {
    const sources = ids.map((id) => this.ledger.get(id));
    // A source can follow the text that cites it; until the turn ends, wait for it.
    if (!final && sources.some((source) => !source)) this.hold();
    const known = sources.filter((source): source is M365Source => source !== undefined);
    if (!known.length) return;
    // Cited as a Markdown link target, `[file.md](marker)`: the marker becomes the URL.
    if (this.text.endsWith("](")) {
      this.annotate(known[0], known[0].url);
      return;
    }
    for (const source of known) {
      if (this.text && !/\s$/.test(this.text)) this.text += " ";
      const number = this.numbers.get(source.url) ?? this.numbers.size + 1;
      this.numbers.set(source.url, number);
      this.annotate(source, `[${number}](${source.url})`);
    }
  }
}

/**
 * Render Copilot's answer text with its citation markers resolved. Deterministic in the raw
 * text, sources and `final`, and `text.slice(0, stableLength)` only ever grows as the raw
 * text grows, so it is safe to stream.
 */
export function renderM365Citations(
  raw: string,
  ledger: M365CitationLedger,
  final: boolean
): M365RenderedCitations {
  const out = new Renderer(ledger);
  let index = 0;
  while (index < raw.length) {
    const start = raw.indexOf(OPEN, index);
    if (start < 0) {
      out.text += raw.slice(index);
      break;
    }
    out.text += raw.slice(index, start);
    const marker = readMarker(raw, start, final);
    if (marker.kind === "pending") {
      out.hold();
      break;
    }
    if (marker.kind === "literal") {
      out.text += OPEN;
      index = start + 1;
      continue;
    }
    out.marker(marker.ids, final);
    index = marker.end + 1;
  }
  return {
    text: out.text,
    annotations: out.annotations,
    stableLength: out.stableLength ?? out.text.length,
  };
}
