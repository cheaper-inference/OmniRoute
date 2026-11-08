// Internal failure metadata only. Never serialize provider strings, IDs, names,
// arguments, headers or payloads; cap traversal independently of payload size.
const MAX_ITEMS = 32;
const REASONS = new Set([
  "empty",
  "empty_choices",
  "no_terminal",
  "parse_fail",
  "content_is_upstream_error",
]);
const record = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

interface ShapeCounts {
  textChars: number;
  refusalChars: number;
  tools: number;
  other: number;
  clipped: boolean;
}

function bounded(value: unknown, counts: ShapeCounts): unknown[] {
  if (!Array.isArray(value)) return [];
  if (value.length > MAX_ITEMS) counts.clipped = true;
  return value.slice(0, MAX_ITEMS);
}

function countParts(value: unknown, counts: ShapeCounts): void {
  for (const raw of bounded(value, counts)) {
    const part = record(raw);
    if ((part.type === "text" || part.type === "output_text") && typeof part.text === "string")
      counts.textChars += part.text.length;
    else if (part.type === "refusal" && typeof part.refusal === "string")
      counts.refusalChars += part.refusal.length;
    else if (part.type === "tool_use") counts.tools++;
    else counts.other++;
  }
}

function countResponses(output: unknown, counts: ShapeCounts): void {
  for (const raw of bounded(output, counts)) {
    const item = record(raw);
    if (item.type === "message") countParts(item.content, counts);
    else if (item.type === "function_call") counts.tools++;
    else counts.other++;
  }
}

function countChat(choices: unknown, counts: ShapeCounts): void {
  for (const raw of bounded(choices, counts)) {
    const choice = record(raw);
    const message = record(choice.message ?? choice.delta);
    if (typeof message.content === "string") counts.textChars += message.content.length;
    else countParts(message.content, counts);
    if (typeof message.refusal === "string") counts.refusalChars += message.refusal.length;
    counts.tools += bounded(message.tool_calls, counts).length;
  }
}

function describe(value: unknown): string {
  const root = record(value);
  const body = root.response && root.response !== value ? record(root.response) : root;
  const counts: ShapeCounts = { textChars: 0, refusalChars: 0, tools: 0, other: 0, clipped: false };
  let kind = "unknown";
  if (body.object === "response") {
    kind = "responses";
    countResponses(body.output, counts);
  } else if (Array.isArray(body.choices)) {
    kind = "chat";
    countChat(body.choices, counts);
  } else if (Array.isArray(body.content)) {
    kind = "claude";
    countParts(body.content, counts);
  }
  const { textChars, refusalChars, tools, other, clipped } = counts;
  return `kind=${kind},textChars=${textChars},refusalChars=${refusalChars},tools=${tools},other=${other},clipped=${clipped}`;
}

/** Fits the retained error_summary even if large pipeline artifacts are omitted. */
export function buildMalformedResponseDiagnostic(
  reason: string,
  upstream: unknown,
  translated: unknown
): string {
  return `malformed_translated_response:${REASONS.has(reason) ? reason : "unknown"} upstream{${describe(upstream)}} translated{${describe(translated)}}`;
}
