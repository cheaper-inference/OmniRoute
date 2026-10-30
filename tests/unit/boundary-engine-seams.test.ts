import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The open-sse → src boundary ratchet (quality-baseline.json) counts one edge per importing file.
// These seams keep engine code off src/: the numeric helpers live in open-sse and src re-exports
// them; streamingTail reaches the PII gate through streamingPipeline, the existing PII seam.

test("src/shared/utils/numeric re-exports the engine helpers (same function objects)", async () => {
  const engine = await import("../../open-sse/utils/numeric.ts");
  const src = await import("../../src/shared/utils/numeric.ts");
  for (const name of ["toNumber", "toNumberOrNull", "toNumberArray"]) {
    assert.equal(typeof engine[name], "function", name);
    assert.equal(src[name], engine[name], name);
  }
  assert.equal(engine.toNumber(" 12 "), 12);
  assert.equal(engine.toNumber("12abc", 7), 7);
  assert.equal(engine.toNumberOrNull(""), null);
});

test("streamingPipeline exposes the PII gate resolver from the PII stream module", async () => {
  const pipeline = await import("../../open-sse/handlers/chatCore/streamingPipeline.ts");
  const pii = await import("../../src/lib/streamingPiiTransform.ts");
  assert.equal(pipeline.resolvePiiGate, pii.resolvePiiGate);
  const gate = await pipeline.resolvePiiGate({ resolveDisabledGuardrails: () => ["pii-masker"] });
  assert.deepEqual(gate, { piiDisabledGuardrails: ["pii-masker"] });
});

test("engine files touched by the seams do not import src/ directly", () => {
  for (const f of [
    "open-sse/handlers/responseTranslator.ts",
    "open-sse/handlers/chatCore/streamingTail.ts",
  ]) {
    const s = readFileSync(f, "utf8");
    assert.doesNotMatch(
      s,
      /from ["'](?:@\/|(?:\.\.\/)+src\/)(?:shared\/utils\/numeric|lib\/streamingPiiTransform)/,
      f
    );
  }
});

test("combo services reach the dashboard event bus through rrDashboardEvents", async () => {
  const seam = await import("../../open-sse/services/combo/rrDashboardEvents.ts");
  const bus = await import("../../src/lib/events/eventBus.ts");
  assert.equal(seam.emit, bus.emit);
  const s = readFileSync("open-sse/services/combo/truncatedStreamFailover.ts", "utf8");
  assert.doesNotMatch(s, /from ["'](?:@\/|(?:\.\.\/)+src\/)lib\/events\/eventBus/);
});
