import { getRegistryEntry } from "../../config/providerRegistry.ts";
import { FORMATS } from "../../translator/formats.ts";
import { detectMediaParts } from "../../utils/mediaParts.ts";

/** A vision-capable model may still need inline pixels on its selected transport. */
export function hasUnsupportedRemoteVisionImages(
  provider: string,
  targetFormat: string,
  body: { messages?: unknown; input?: unknown }
): boolean {
  const providerId = getRegistryEntry(provider)?.id;
  // The first-party Anthropic endpoint accepts URL image sources. Other Claude-wire
  // endpoints may reject them, and the MiniMax Code executor only converts data URLs.
  const requiresInline =
    (targetFormat === FORMATS.CLAUDE && providerId !== "anthropic" && providerId !== "claude") ||
    providerId === "minimax-code";
  if (!requiresInline) return false;

  // Scan both message content and Responses tool outputs without changing the body a
  // subsequent target receives.
  return [body.messages, body.input].some(
    (items) =>
      Array.isArray(items) &&
      detectMediaParts([{ content: items }]).some(
        (part) =>
          part.kind === "image" &&
          (part.shape === "image_source_url" || /^https?:\/\//i.test(part.ref.trim()))
      )
  );
}
