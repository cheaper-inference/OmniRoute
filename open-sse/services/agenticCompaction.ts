import { createHash } from "node:crypto";

type Body = Record<string, unknown>;
export type AgenticCompactionConfig = {
  enabled?: boolean;
  defaultMaxChars?: number;
  targetRatio?: number;
  toolResultMaxChars?: number;
  modelMaxChars?: Record<string, number>;
};
const record = (value: unknown): Body =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as Body) : {};
const chars = (value: unknown): number => JSON.stringify(value).length;
const resultTypes = new Set([
  "tool_result",
  "function_call_output",
  "computer_call_output",
  "local_shell_call_output",
]);

function evidence(value: unknown, max: number): unknown {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  if (!text || text.length <= max) return value;
  const marker = `\n...[evidence compacted; sha256=${createHash("sha256").update(text).digest("hex").slice(0, 16)}]...\n`;
  const edge = Math.max(1, Math.floor((max - marker.length) / 2));
  return `${text.slice(0, edge)}${marker}${text.slice(-edge)}`;
}

function trimResult(value: unknown, max: number): unknown {
  const item = record(value);
  // Native computer outputs carry structured screenshots, not text evidence.
  // Replacing them with a digest string corrupts both the payload and its schema.
  if (item.type === "computer_call_output" && typeof item.output === "object") return item;
  if (item.role === "tool") return { ...item, content: evidence(item.content, max) };
  if (resultTypes.has(String(item.type))) {
    const key = "output" in item ? "output" : "content";
    return { ...item, [key]: evidence(item[key], max) };
  }
  if (item.functionResponse || item.function_response) {
    const key = item.functionResponse ? "functionResponse" : "function_response";
    const response = record(item[key]);
    const trimmed = evidence(response.response, max);
    return trimmed === response.response
      ? item
      : { ...item, [key]: { ...response, response: { result: trimmed } } };
  }
  return item;
}

function isResult(value: unknown): boolean {
  const item = record(value);
  return (
    item.role === "tool" ||
    resultTypes.has(String(item.type)) ||
    Boolean(item.functionResponse || item.function_response) ||
    [item.content, item.parts].some((parts) => Array.isArray(parts) && parts.some(isResult))
  );
}

function isCall(value: unknown): boolean {
  const item = record(value);
  return (
    ["tool_use", "function_call", "computer_call", "local_shell_call"].includes(
      String(item.type)
    ) ||
    Boolean(item.functionCall || item.function_call) ||
    (Array.isArray(item.tool_calls) && item.tool_calls.length > 0) ||
    [item.content, item.parts].some((parts) => Array.isArray(parts) && parts.some(isCall))
  );
}

function prepareHistory(
  body: Body,
  maxEvidence: number
): { key: string; trimmed: Body[]; groups: Body[][] } {
  // Only remove byte-identical definitions: name collisions can have different schemas.
  if (Array.isArray(body.tools)) {
    const seen = new Set<string>();
    body.tools = body.tools.filter((tool) => {
      const signature = JSON.stringify(tool);
      if (seen.has(signature)) return false;
      seen.add(signature);
      return true;
    });
  }
  const key = Array.isArray(body.input)
    ? "input"
    : Array.isArray(body.contents)
      ? "contents"
      : "messages";
  const entries = Array.isArray(body[key]) ? (body[key] as unknown[]) : [];
  const trimmed = entries.map((entry) => {
    const item = record(trimResult(entry, maxEvidence));
    for (const field of ["content", "parts"])
      if (Array.isArray(item[field]))
        item[field] = (item[field] as unknown[]).map((part) => trimResult(part, maxEvidence));
    return item;
  });

  const groups = groupHistory(trimmed);
  return { key, trimmed, groups };
}

function groupHistory(trimmed: Body[]): Body[][] {
  // Group calls and their parallel results atomically; never orphan a tool boundary.
  const groups: Body[][] = [];
  for (const item of trimmed) {
    const previous = groups.at(-1);
    if (previous && (isResult(item) || (isCall(item) && previous.every(isCall))))
      previous.push(item);
    else groups.push([item]);
  }

  return groups;
}

function compactionLedger(key: string, omitted: number): Body {
  const text = `[Earlier history compacted: ${omitted} entries omitted. Do not infer missing evidence.]`;
  return key === "contents"
    ? { role: "user", parts: [{ text }] }
    : { role: "system", content: text };
}

function pruneHistory(
  body: Body,
  key: string,
  groups: Body[][],
  pinned: Set<Body[]>,
  target: number
): void {
  // Account for each entry once. JSON array size is the sum of serialized entries
  // plus commas; the empty-array body already includes its brackets and field key.
  const fixedChars = chars({ ...body, [key]: [] });
  const groupChars = groups.map((group) => group.reduce((sum, item) => sum + chars(item), 0));
  let retainedChars = groupChars.reduce((sum, size) => sum + size, 0);
  let retainedEntries = groups.reduce((sum, group) => sum + group.length, 0);
  let omitted = 0;
  let ledger: Body | null = null;
  const removed = new Set<Body[]>();
  const size = () =>
    fixedChars +
    retainedChars +
    (ledger ? chars(ledger) : 0) +
    Math.max(0, retainedEntries + Number(Boolean(ledger)) - 1);
  for (const [index, group] of groups.entries()) {
    if (size() <= target) break;
    if (pinned.has(group)) continue;
    removed.add(group);
    retainedChars -= groupChars[index];
    retainedEntries -= group.length;
    omitted += group.length;
    ledger = compactionLedger(key, omitted);
  }
  const kept = groups.filter((group) => !removed.has(group)).flat();
  body[key] = ledger ? [ledger, ...kept] : kept;
}

/** Character budgets are payload thresholds, not model token-window claims. */
export function compactAgenticBody(
  source: Body,
  model: string,
  config?: AgenticCompactionConfig | null
): {
  body: Body;
  compacted: boolean;
  before: number;
  after: number;
  limit: number;
  overLimit: boolean;
} {
  const before = chars(source);
  const limit =
    config?.enabled === true
      ? (config.modelMaxChars?.[model] ?? config.defaultMaxChars ?? 400_000)
      : Number.MAX_SAFE_INTEGER;
  if (before <= limit)
    return { body: source, compacted: false, before, after: before, limit, overLimit: false };
  const body = structuredClone(source);
  const target = Math.floor(limit * (config?.targetRatio ?? 0.72));
  const maxEvidence = config?.toolResultMaxChars ?? 24_000;
  const { key, trimmed, groups } = prepareHistory(body, maxEvidence);
  const latestUser = trimmed.findLast((item) => item.role === "user" && !isResult(item));
  const pinned = new Set(
    groups.filter(
      (group, index) =>
        group.some(
          (item) => item.role === "system" || item.role === "developer" || item === latestUser
        ) ||
        // prependSystemInstruction represents Gemini's routing instruction as first user content.
        (key === "contents" && index === 0) ||
        index === groups.length - 1
    )
  );
  pruneHistory(body, key, groups, pinned, target);
  const after = chars(body);
  return { body, compacted: after < before, before, after, limit, overLimit: after > limit };
}
