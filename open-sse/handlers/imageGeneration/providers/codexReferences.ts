import { normalizeImageBuffer } from "../../../utils/imageNormalize.ts";

const CODEX_REFERENCE_MAX_BYTES = 400_000;
const CODEX_REFERENCE_MAX_LONG_EDGE = 1024;

// Preserve the established normalization contract for legacy hosted models.
export async function shrinkCodexReferenceImage(image: {
  bytes: Buffer;
  mime?: string;
}): Promise<{ bytes: Buffer; mime: string }> {
  const mime = image.mime || "image/png";
  if (image.bytes.length <= CODEX_REFERENCE_MAX_BYTES) return { bytes: image.bytes, mime };
  const out = await normalizeImageBuffer(image.bytes, {
    maxLongEdge: CODEX_REFERENCE_MAX_LONG_EDGE,
  });
  if (!out.resized) return { bytes: image.bytes, mime };
  return { bytes: out.buffer, mime: out.mime || mime };
}

export async function codexReferenceImageUrl(
  model: string,
  image: { bytes: Buffer; mime?: string }
): Promise<string> {
  // The newly admitted Sol route must submit the original reference, not a thumbnail.
  const reference = model === "gpt-6.1-sol" ? image : await shrinkCodexReferenceImage(image);
  return `data:${reference.mime || "image/png"};base64,${reference.bytes.toString("base64")}`;
}
