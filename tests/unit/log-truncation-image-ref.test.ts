/**
 * Oversized image data URLs in persisted chat-log payloads: head/tail
 * truncation used to leave a corrupt half-image no decoder can read. They now
 * collapse into a compact `_omniroute_image_ref` record (mime, base64 bytes,
 * 16-hex sha256 fingerprint, 64-char head) — the same marker family the
 * array-tail truncation already uses.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

const { collapseOversizedDataUrlForLog, cloneBoundedChatLogPayload } = await import(
  "../../open-sse/handlers/chatCore/logTruncation.ts"
);

const base64 = "A".repeat(500_000); // far past any configured text limit
const oversizedImage = `data:image/png;base64,${base64}`;

test("1. an oversized image data URL collapses into an _omniroute_image_ref record", () => {
  const collapsed = collapseOversizedDataUrlForLog(oversizedImage) as Record<string, unknown>;
  assert.equal(collapsed._omniroute_image_ref, true);
  assert.equal(collapsed.mime, "image/png");
  assert.equal(collapsed.base64Bytes, base64.length);
  assert.equal(
    collapsed.sha256,
    createHash("sha256").update(base64).digest("hex").slice(0, 16)
  );
  assert.equal(collapsed.head, oversizedImage.slice(0, 64));
});

test("2. the fingerprint is stable across rows (same image → same sha)", () => {
  const a = collapseOversizedDataUrlForLog(oversizedImage) as { sha256: string };
  const b = collapseOversizedDataUrlForLog(`data:image/png;base64,${base64}`) as {
    sha256: string;
  };
  assert.equal(a.sha256, b.sha256);
  const other = collapseOversizedDataUrlForLog(
    `data:image/png;base64,${"B".repeat(500_000)}`
  ) as { sha256: string };
  assert.notEqual(a.sha256, other.sha256);
});

test("3. non-image oversize strings keep the head/tail truncation", () => {
  const plain = "x".repeat(500_000);
  const truncated = collapseOversizedDataUrlForLog(plain);
  assert.equal(typeof truncated, "string");
  assert.ok((truncated as string).includes("[...truncated"));

  const nonImageDataUrl = `data:application/pdf;base64,${base64}`;
  assert.equal(typeof collapseOversizedDataUrlForLog(nonImageDataUrl), "string");
});

test("4. strings under the limit pass through untouched (fast path)", () => {
  const small = "data:image/png;base64,iVBORw0KGgo=";
  assert.equal(collapseOversizedDataUrlForLog(small), small);
});

test("5. cloneBoundedChatLogPayload routes strings through the collapse", () => {
  const cloned = cloneBoundedChatLogPayload({
    messages: [{ role: "user", content: oversizedImage }],
  }) as { messages: Array<{ content: Record<string, unknown> }> };
  assert.equal(cloned.messages[0].content._omniroute_image_ref, true);
});
