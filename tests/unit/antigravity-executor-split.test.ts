import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the antigravity executor SSE-collect extraction.
// The pure SSE-payload -> collected-stream parser lives in antigravity/sseCollect.ts
// (no host state, no fetch/auth). Host imports the helpers it uses and re-exports
// processAntigravitySSEPayload for external importers (tests).
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");
const HOST = join(EXE, "antigravity.ts");
const LEAF = join(EXE, "antigravity/sseCollect.ts");

test("leaf hosts the SSE-collect helpers and does not import the host", () => {
  const src = readFileSync(LEAF, "utf8");
  for (const sym of [
    "processAntigravitySSEPayload",
    "processAntigravitySSEText",
    "flushAntigravitySSEText",
    "stripZeroWidth",
  ]) {
    assert.match(src, new RegExp(`export (function|type) ${sym}\\b`));
  }
  assert.doesNotMatch(src, /from "\.\.\/antigravity\.ts"/);
});

test("host re-exports processAntigravitySSEPayload", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(
    host,
    /export \{ processAntigravitySSEPayload \} from "\.\/antigravity\/sseCollect\.ts"/
  );
  assert.match(host, /from "\.\/antigravity\/sseCollect\.ts"/);
});

test("SSE-collect helpers are callable and tolerate empty/garbage input", async () => {
  const { processAntigravitySSEPayload, stripZeroWidth } =
    await import("../../open-sse/executors/antigravity/sseCollect.ts");
  assert.equal(typeof processAntigravitySSEPayload, "function");
  // stripZeroWidth removes zero-width markers from strings, passes through non-strings.
  assert.equal(stripZeroWidth("a​b"), "ab");
  assert.deepEqual(stripZeroWidth(42), 42);
  // A malformed payload must not throw (defensive parse).
  const collected = { textContent: "" };
  assert.doesNotThrow(() => processAntigravitySSEPayload("not-json", collected));
});

test("processAntigravitySSEPayload extracts cachedContentTokenCount into usage", async () => {
  const { processAntigravitySSEPayload } =
    await import("../../open-sse/executors/antigravity/sseCollect.ts");
  const collected = { textContent: "", toolCalls: [], usage: null };
  const payload = JSON.stringify({
    response: {
      candidates: [{ content: { parts: [{ text: "hello" }] } }],
      usageMetadata: {
        promptTokenCount: 1000,
        candidatesTokenCount: 50,
        totalTokenCount: 1050,
        cachedContentTokenCount: 800,
      },
    },
  });
  processAntigravitySSEPayload(payload, collected);
  assert.equal(collected.usage?.prompt_tokens, 1000);
  assert.equal(collected.usage?.completion_tokens, 50);
  assert.equal(collected.usage?.prompt_tokens_details?.cached_tokens, 800);
});
