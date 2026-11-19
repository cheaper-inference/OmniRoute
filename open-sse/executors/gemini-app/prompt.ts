/**
 * Normalize an OpenAI Chat Completions / Responses body into the canonical
 * Gemini App prompt (system text + one user text + image attachments).
 *
 * Sampling controls other than thinking settings are advisory: the native
 * Robin transport does not carry them. Unknown keys are ignored here — the
 * chat pipeline already applies its own Zod validation upstream.
 */

import type { NativeImageAttachment } from "./robinWire.ts";
import {
  PROMPT_MAX_BYTES,
  resolveThinkingLevel,
  canonicalModel,
  isNativeModel,
} from "./modelPolicy.ts";
import { GeminiAppError } from "./errors.ts";

export interface CanonicalPrompt {
  userText: string;
  systemText?: string;
  images: NativeImageAttachment[];
  modelId: "gemini-neon" | "gemini-hydrogen" | "gemini-flash-lite";
  modeCategory: number;
  thinkingLevel: number;
  tools: unknown[];
  toolChoice: unknown;
  stream: boolean;
}

type ContentPart = { type?: string; text?: string; image_url?: { url?: string } };

function plainText(part: ContentPart): string {
  return typeof part.text === "string" ? part.text : "";
}

function isPlainImageUrl(value: unknown): value is string {
  return typeof value === "string" && /^https:\/\/[^\s]{1,8192}$/.test(value);
}

/** Reject non-remote image URLs up front: raw bytes are never inline-encoded. */
function toImageAttachment(part: ContentPart): NativeImageAttachment | null {
  const url = part.image_url?.url;
  if (!isPlainImageUrl(url)) {
    throw new GeminiAppError(
      "NATIVE_INVALID_REQUEST",
      400,
      "Images must be uploaded to a remote HTTPS URL"
    );
  }
  const ext = /\.(png|jpe?g|webp)(?:[?#]|$)/i.exec(url)?.[1]?.toLowerCase();
  const mimeType =
    ext === "png"
      ? "image/png"
      : ext === "jpg" || ext === "jpeg"
        ? "image/jpeg"
        : ext === "webp"
          ? "image/webp"
          : null;
  if (!mimeType) {
    throw new GeminiAppError("NATIVE_INVALID_REQUEST", 400, "Unsupported image MIME type");
  }
  // blobId is the uploaded asset identifier; the URL is carried in the prompt
  // text so the transport never sees raw bytes.
  return { blobId: url.slice(0, 4096), mimeType };
}

function flattenContent(content: unknown): { text: string; images: NativeImageAttachment[] } {
  if (typeof content === "string") return { text: content, images: [] };
  if (!Array.isArray(content)) return { text: "", images: [] };
  const chunks: string[] = [];
  const images: NativeImageAttachment[] = [];
  for (const raw of content) {
    if (typeof raw === "string") {
      chunks.push(raw);
      continue;
    }
    if (raw === null || typeof raw !== "object" || Array.isArray(raw)) continue;
    const part = raw as ContentPart;
    if (part.type === "image_url") {
      const image = toImageAttachment(part);
      if (image) images.push(image);
    } else if (part.type === "text" || part.text !== undefined) {
      chunks.push(plainText(part));
    }
  }
  return { text: chunks.join("\n"), images };
}

export function normalizeGeminiAppPrompt(
  body: unknown,
  model: string,
  stream: boolean
): CanonicalPrompt {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    throw new GeminiAppError("NATIVE_INVALID_REQUEST", 400, "Request body must be an object");
  }
  const record = body as Record<string, unknown>;
  const resolved = canonicalModel(record.model ?? model) ?? model;
  if (!isNativeModel(resolved)) {
    throw new GeminiAppError(
      "NATIVE_INVALID_REQUEST",
      400,
      `Unsupported Gemini App model: ${resolved}`
    );
  }
  let thinkingLevel: number;
  try {
    thinkingLevel = resolveThinkingLevel(record);
  } catch (error) {
    throw new GeminiAppError("NATIVE_INVALID_REQUEST", 400, (error as Error).message);
  }

  const systemParts: string[] = [];
  const userParts: string[] = [];
  const images: NativeImageAttachment[] = [];
  const messages = Array.isArray(record.messages) ? record.messages : [];
  for (const raw of messages) {
    if (raw === null || typeof raw !== "object" || Array.isArray(raw)) continue;
    const message = raw as { role?: unknown; content?: unknown };
    const flattened = flattenContent(message.content);
    images.push(...flattened.images);
    if (message.role === "system" || message.role === "developer") systemParts.push(flattened.text);
    else if (message.role === "user") userParts.push(flattened.text);
    else if (message.role === "assistant" && flattened.text) {
      userParts.push(`[assistant]\n${flattened.text}`);
    }
  }

  const input = Array.isArray(record.input) ? record.input : [];
  for (const raw of input) {
    if (raw === null || typeof raw !== "object" || Array.isArray(raw)) continue;
    const item = raw as { role?: unknown; type?: string; content?: unknown; text?: string };
    if (item.role === "system" || item.role === "developer") {
      const flattened = flattenContent(item.content);
      systemParts.push(flattened.text);
    } else if (item.type === "message" || item.role === "user") {
      const flattened = flattenContent(item.content);
      userParts.push(flattened.text || (typeof item.text === "string" ? item.text : ""));
      images.push(...flattened.images);
    }
  }

  const userText = userParts.filter(Boolean).join("\n\n").trim();
  if (!userText) {
    throw new GeminiAppError("NATIVE_INVALID_REQUEST", 400, "Empty user prompt");
  }
  if (Buffer.byteLength(userText) > PROMPT_MAX_BYTES) {
    throw new GeminiAppError(
      "NATIVE_INVALID_REQUEST",
      413,
      "Prompt exceeds the native 4 MiB budget"
    );
  }
  if (images.length > 4) {
    throw new GeminiAppError("NATIVE_INVALID_REQUEST", 413, "At most 4 images per request");
  }

  const modelId = resolved as CanonicalPrompt["modelId"];
  return {
    userText,
    systemText: systemParts.filter(Boolean).join("\n\n") || undefined,
    images,
    modelId,
    modeCategory: { "gemini-neon": 3, "gemini-hydrogen": 1, "gemini-flash-lite": 6 }[modelId],
    thinkingLevel,
    tools: Array.isArray(record.tools) ? record.tools : [],
    toolChoice: record.tool_choice,
    stream,
  };
}
