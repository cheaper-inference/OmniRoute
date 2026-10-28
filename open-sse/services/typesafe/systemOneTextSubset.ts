/** Bounded local text/JSON subset. Recognizes documented multimodal framing,
 * not arbitrary URLs, field names, or every possible upstream interpretation.
 */
const MAX_NODES = 16_384;
function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function text(value: unknown): boolean {
  return typeof value === "string" && value.length > 0;
}
function urlPayload(value: unknown): boolean {
  return text(value) || (record(value) && text(value.url));
}
function sourcePayload(value: unknown): boolean {
  return (
    record(value) &&
    ((value.type === "base64" && text(value.data)) || (value.type === "url" && text(value.url)))
  );
}
function mediaPart(value: Record<string, unknown>): boolean {
  switch (value.type) {
    case "image_url":
      return urlPayload(value.image_url);
    case "input_image":
      return urlPayload(value.image_url) || text(value.file_id);
    case "image":
      return sourcePayload(value.source);
    case "input_audio":
      return (
        record(value.input_audio) && text(value.input_audio.data) && text(value.input_audio.format)
      );
    case "audio_url":
      return urlPayload(value.audio_url);
    case "video_url":
      return urlPayload(value.video_url);
    default:
      return false;
  }
}
export function systemOneTextSubsetError(
  body: Record<string, unknown>,
  maxBytes: number
): string | null {
  if (Buffer.byteLength(JSON.stringify(body), "utf8") > maxBytes)
    return "Native text/JSON subset body exceeds its local byte guard";
  const pending: { value: unknown; depth: number }[] = [{ value: body, depth: 0 }];
  let visited = 0;
  while (pending.length) {
    const { value, depth } = pending.pop()!;
    if (++visited > MAX_NODES || depth > 64)
      return "Native text/JSON subset exceeds its local structure guard";
    if (!value || typeof value !== "object") continue;
    if (record(value) && mediaPart(value))
      return "Recognized image/audio/video parts are deferred by this native text/JSON subset";
    const children = Array.isArray(value) ? value : Object.values(value);
    if (children.length + visited + pending.length > MAX_NODES)
      return "Native text/JSON subset exceeds its local structure guard";
    for (const child of children) pending.push({ value: child, depth: depth + 1 });
  }
  return null;
}
