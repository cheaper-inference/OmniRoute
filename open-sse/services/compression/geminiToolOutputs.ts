/**
 * Opt-in Gemini / Antigravity tool-output projection for the compression engines.
 *
 * The compression engines read `body.messages`. A Gemini body carries tool output as
 * `functionResponse.response` objects inside `contents[].parts[]`, so the engines never see
 * it. This module projects the string leaves into synthesized `role:"tool"` messages, lets the
 * caller run the engines, and writes a shorter text back in place. Off unless the flag is on.
 */

const FLAG = "GEMINI_TOOL_OUTPUT_COMPRESSION_ENABLED";
const TEXT_KEYS = new Set(["result", "output", "content", "text"]);
const MAX_DEPTH = 3;
const PATH = "__geminiToolOutputPath";

type JsonRecord = Record<string, unknown>;

type Leaf = { path: string[]; text: string };

function isRecord(value: unknown): value is JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function looksJson(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed || (trimmed[0] !== "{" && trimmed[0] !== "[")) return false;
  try {
    JSON.parse(trimmed);
    return true;
  } catch {
    return false;
  }
}

/** Collect string leaves under functionResponse.response (keys in TEXT_KEYS, depth <= 3). */
function collectLeaves(value: unknown, path: string[], depth: number, out: Leaf[]): void {
  if (depth > MAX_DEPTH || !isRecord(value)) return;
  for (const [key, child] of Object.entries(value)) {
    if (typeof child === "string" && TEXT_KEYS.has(key) && child.length > 0 && !looksJson(child)) {
      out.push({ path: [...path, key], text: child });
    } else if (isRecord(child)) {
      collectLeaves(child, [...path, key], depth + 1, out);
    }
  }
}

function contentsOf(body: JsonRecord): unknown[] | null {
  if (Array.isArray(body.contents)) return body.contents;
  if (isRecord(body.request) && Array.isArray(body.request.contents)) return body.request.contents;
  return null;
}

function enabled(): boolean {
  const raw = process.env[FLAG];
  return raw === "true" || raw === "1" || raw === "yes";
}

/**
 * Project Gemini tool-output leaves into role:"tool" messages. Returns the body unchanged
 * (adapted: false) when the flag is off or there is nothing to project.
 */
export function projectGeminiToolOutputs(body: JsonRecord): {
  body: JsonRecord;
  adapted: boolean;
  restore: (compressed: JsonRecord) => JsonRecord;
} {
  const unchanged = { body, adapted: false, restore: (compressed: JsonRecord) => compressed };
  if (!enabled()) return unchanged;
  const contents = contentsOf(body);
  if (!contents) return unchanged;

  const leaves: Array<Leaf & { contentIndex: number; partIndex: number }> = [];
  contents.forEach((content, contentIndex) => {
    if (!isRecord(content) || !Array.isArray(content.parts)) return;
    content.parts.forEach((part, partIndex) => {
      if (!isRecord(part) || !isRecord(part.functionResponse)) return;
      const response = part.functionResponse.response;
      const found: Leaf[] = [];
      collectLeaves(response, [], 1, found);
      for (const leaf of found) leaves.push({ ...leaf, contentIndex, partIndex });
    });
  });
  if (leaves.length === 0) return unchanged;

  const messages = leaves.map((leaf) => ({
    role: "tool",
    content: leaf.text,
    [PATH]: { contentIndex: leaf.contentIndex, partIndex: leaf.partIndex, path: leaf.path },
  }));

  return {
    body: { ...body, messages },
    adapted: true,
    restore(compressed: JsonRecord): JsonRecord {
      const rewritten = Array.isArray(compressed.messages) ? compressed.messages : [];
      const nextContents = JSON.parse(JSON.stringify(contents)) as unknown[];
      for (const message of rewritten) {
        if (!isRecord(message) || !isRecord(message[PATH])) continue;
        const { contentIndex, partIndex, path } = message[PATH] as {
          contentIndex: number;
          partIndex: number;
          path: string[];
        };
        if (typeof message.content !== "string") continue;
        let cursor: unknown = ((nextContents[contentIndex] as JsonRecord).parts as JsonRecord[])[
          partIndex
        ];
        cursor = (cursor as JsonRecord).functionResponse;
        cursor = (cursor as JsonRecord).response;
        for (let i = 0; i < path.length - 1; i += 1) cursor = (cursor as JsonRecord)[path[i]];
        const key = path[path.length - 1];
        const original = (cursor as JsonRecord)[key];
        if (typeof original === "string" && message.content.length < original.length) {
          (cursor as JsonRecord)[key] = message.content;
        }
      }
      const rest = { ...compressed };
      delete rest.messages;
      if (isRecord(body.request)) {
        return { ...rest, request: { ...body.request, contents: nextContents } };
      }
      return { ...rest, contents: nextContents };
    },
  };
}
