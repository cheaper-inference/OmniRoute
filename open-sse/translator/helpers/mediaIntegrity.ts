import { detectMediaParts } from "../../utils/mediaParts.ts";

/** Fingerprints stay local: errors must never echo file bytes or signed URLs. */
export function requestMediaRefs(body: Record<string, unknown>): Set<string> {
  return new Set(
    detectMediaParts([{ content: [body.messages, body.input, body.contents, body.attachments] }])
      .filter((part) => part.ref.length > 0)
      .map((part) => `${part.kind}:${part.ref.replace(/^data:[^,]*,/i, "")}`)
  );
}

/** Reject a CI translation if an original attachment reference disappears. */
export function assertCIMediaPreserved(
  before: ReadonlySet<string> | null,
  after: Record<string, unknown>
): void {
  if (!before?.size) return;
  const retained = requestMediaRefs(after);
  if ([...before].some((ref) => !retained.has(ref))) {
    throw Object.assign(
      new Error(
        "The selected inference format cannot preserve every media/file input. Use a compatible model and input format."
      ),
      { statusCode: 400, errorType: "unsupported_media_input" }
    );
  }
}
