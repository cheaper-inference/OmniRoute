/**
 * Media detection for client-format request bodies (pre-translation).
 *
 * Used to skip behavioral style prompts (output styles) on turns that carry an
 * image, audio clip or file: on susceptible models those prompts measurably
 * degrade multimodal grounding (a solid-red image answered as "Gray" with the
 * prompt injected, correctly without it).
 *
 * Bounded tree-walk instead of `JSON.stringify` + regex: bodies with inline
 * base64 media can be tens of MB, and serializing them only to scan for a
 * marker is wasteful. Only the message containers are walked
 * (`messages`, `input`, `contents`) — never `tools[]`, so a tool schema with an
 * `image` property is not a false positive — and the walk stops at the first hit.
 */

/** Content-part `type` values that carry media, across the supported wire formats. */
const MEDIA_PART_TYPES = new Set([
  // Claude
  "image",
  "document",
  // OpenAI Chat Completions
  "image_url",
  "input_audio",
  "audio_url",
  "file",
  // OpenAI Responses
  "input_image",
  "input_file",
]);

/** Gemini part keys that only ever carry media. */
const MEDIA_PART_KEYS = ["inlineData", "inline_data", "fileData", "file_data"] as const;

/** Keys holding nested part arrays (Claude tool_result.content, Responses output, Gemini parts). */
const NESTED_PART_KEYS = ["content", "output", "parts"] as const;

const MAX_DEPTH = 4;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nodeHasMedia(node: unknown, depth: number): boolean {
  if (!isRecord(node) || depth > MAX_DEPTH) return false;
  if (typeof node.type === "string" && MEDIA_PART_TYPES.has(node.type)) return true;
  for (const key of MEDIA_PART_KEYS) {
    if (isRecord(node[key])) return true;
  }
  for (const key of NESTED_PART_KEYS) {
    const nested = node[key];
    if (Array.isArray(nested) && nested.some((child) => nodeHasMedia(child, depth + 1))) {
      return true;
    }
  }
  return false;
}

/** True when the body carries any image / audio / file block in any supported format. */
export function hasMediaBlocks(body: unknown): boolean {
  if (!isRecord(body)) return false;
  for (const key of ["messages", "input", "contents"] as const) {
    const items = body[key];
    if (Array.isArray(items) && items.some((item) => nodeHasMedia(item, 0))) return true;
  }
  return false;
}
