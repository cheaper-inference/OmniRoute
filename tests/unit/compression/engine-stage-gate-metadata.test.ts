/**
 * Stage × engine gate without `metadata`.
 *
 * `assertValidEngine()` (engines/registry.ts) validates `id`, `apply`, `compress`,
 * `getConfigSchema` and `validateConfig` — does NOT require `metadata`. An engine without
 * this field is therefore a legal record. But `canRunAtCompressionStage`
 * read `engine.metadata.executionStages` without guard, so this cool engine
 * crashed the entire pipeline with `TypeError: Cannot read properties of
 * undefined` — instead of failing open, which is the compression contract.
 *
 * The documented fallback for those who do not declare `executionStages` is "just
 * pre-translation". Missing metadata is the same case as "not declared", and must be
 * cair no mesmo fallback.
 */
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "../../../open-sse/services/compression/engines/registry.ts";
import { applyStackedCompression } from "../../../open-sse/services/compression/strategySelector.ts";
import type { CompressionEngine } from "../../../open-sse/services/compression/engines/types.ts";

const ENGINE_ID = "metadata-less-test-engine";

const body = () => ({ messages: [{ role: "user", content: "hello world" }] });

describe("stage gate — engine sem metadata", () => {
  beforeEach(() => {
    // Registration deliberately without `metadata`: this is what assertValidEngine accepts.
    registerCompressionEngine({
      id: ENGINE_ID,
      name: "metadata-less test engine",
      targets: ["messages"],
      stackable: true,
      apply(input: Record<string, unknown>) {
        return { body: input, compressed: false, stats: null };
      },
      compress() {
        return { text: "", stats: null };
      },
      getConfigSchema() {
        return [];
      },
      validateConfig() {
        return { valid: true, errors: [] };
      },
    } as unknown as CompressionEngine);
  });

  afterEach(() => unregisterCompressionEngine(ENGINE_ID));

  it("does not crash the pipeline at the pre-translation stage (default)", () => {
    const r = applyStackedCompression(body(), [{ engine: ENGINE_ID }]);
    assert.equal(r.compressed, false);
    assert.deepEqual(r.body, body());
  });

  it("does not drop the pipeline at the post-translation stage — skips fallback", () => {
    const r = applyStackedCompression(body(), [{ engine: ENGINE_ID }], {
      compressionStage: "post-translation",
    });
    assert.equal(r.compressed, false);
    assert.deepEqual(r.body, body());
    // Documented fallback: those who do not declare a stage only run pre-translation.
    assert.ok(
      r.stats?.validationWarnings?.some((w) => w.includes(ENGINE_ID) && w.includes("skipped")),
      `esperado aviso de skip por estágio, veio ${JSON.stringify(r.stats?.validationWarnings)}`
    );
  });
});
