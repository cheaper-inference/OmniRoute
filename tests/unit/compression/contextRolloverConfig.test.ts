import test from "node:test";
import assert from "node:assert/strict";

import {
  applyDetailConfigUpdate,
  normalizeContextRolloverConfig,
} from "../../../src/lib/db/compressionDetailNormalizers.ts";
import { compressionSettingsUpdateSchema } from "../../../src/shared/validation/compressionConfigSchemas.ts";
import {
  DEFAULT_CONTEXT_ROLLOVER_CONFIG,
  type CompressionConfig,
} from "../../../open-sse/services/compression/types.ts";

test("context rollover config defaults to disabled with the engine thresholds", () => {
  assert.deepEqual(normalizeContextRolloverConfig(undefined), DEFAULT_CONTEXT_ROLLOVER_CONFIG);
  assert.equal(DEFAULT_CONTEXT_ROLLOVER_CONFIG.enabled, false);
});

test("stored context rollover rows are clamped to the engine bounds and de-duplicated", () => {
  const normalized = normalizeContextRolloverConfig({
    enabled: true,
    triggerPercent: 500,
    preserveRecentPercent: 0,
    minRetainedMessages: 3.9,
    maxArchiveSectionChars: 10,
    excludedModelKeys: [" openai/gpt-4o ", "openai/gpt-4o", "", 42],
    currentPromptPipeline: ["lite", "lite"],
  });
  assert.equal(normalized.enabled, true);
  assert.equal(normalized.triggerPercent, 100);
  assert.equal(normalized.preserveRecentPercent, 1);
  assert.equal(normalized.minRetainedMessages, 3);
  assert.equal(normalized.maxArchiveSectionChars, 1_000);
  assert.deepEqual(normalized.excludedModelKeys, ["openai/gpt-4o"]);
  assert.deepEqual(normalized.currentPromptPipeline, ["lite"]);
});

test("the contextRollover settings row is applied during the settings row scan", () => {
  const config = { enabled: false } as CompressionConfig;
  applyDetailConfigUpdate(config, "contextRollover", { enabled: true });
  assert.equal(config.contextRollover?.enabled, true);
});

test("PUT schema accepts a context rollover patch and rejects out-of-range values", () => {
  assert.equal(
    compressionSettingsUpdateSchema.safeParse({
      contextRollover: { enabled: true, triggerPercent: 85, excludedModelKeys: ["a/b"] },
    }).success,
    true
  );
  assert.equal(
    compressionSettingsUpdateSchema.safeParse({ contextRollover: { triggerPercent: 0 } }).success,
    false
  );
  assert.equal(
    compressionSettingsUpdateSchema.safeParse({ contextRollover: { unknownKey: 1 } }).success,
    false
  );
});
