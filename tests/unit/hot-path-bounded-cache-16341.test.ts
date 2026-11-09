/**
 * Hot-path caches from #16341. The canonical-provider map is an LRU of a pure
 * catalog lookup: evicting an alias must still resolve to the same id. parseModel's
 * LRU must return the same value as a second call (and as the uncached parser).
 *
 * The size assertion is the red-on-tip proof: origin/release/v3.8.52 has no cap,
 * so filling 512 distinct providers grows the map past 512.
 */
import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  canonicalProviderCache,
  getCanonicalLockProvider,
} from "../../open-sse/services/accountFallback.ts";
import { parseModel } from "../../open-sse/services/model.ts";

const CANONICAL_LIMIT = 512;

const RELEASE_PARSES: Array<[string, ReturnType<typeof parseModel>]> = [
  [
    "openai/gpt-4o",
    {
      provider: "openai",
      model: "gpt-4o",
      isAlias: false,
      providerAlias: "openai",
      extendedContext: false,
    },
  ],
  [
    "agy/gemini-2.5-flash",
    {
      provider: "antigravity",
      model: "gemini-2.5-flash",
      isAlias: false,
      providerAlias: "agy",
      extendedContext: false,
    },
  ],
  [
    "  cx / gpt-5.6-sol  ",
    {
      provider: "codex",
      model: "gpt-5.6-sol",
      isAlias: false,
      providerAlias: "cx",
      extendedContext: false,
    },
  ],
  [
    "claude-sonnet-4-6[1m]",
    {
      provider: null,
      model: "claude-sonnet-4-6",
      isAlias: true,
      providerAlias: null,
      extendedContext: true,
    },
  ],
];

describe("hot-path bounded caches", { concurrency: false }, () => {
  test("canonical provider cache stays within 512 and recomputes an evicted alias", () => {
    canonicalProviderCache.clear();
    assert.equal(getCanonicalLockProvider("cx"), "codex");

    for (let i = 0; i < CANONICAL_LIMIT; i++) {
      const id = `probe-lock-provider-${i}`;
      assert.equal(getCanonicalLockProvider(id), id);
    }

    assert.ok(
      canonicalProviderCache.size <= CANONICAL_LIMIT,
      `canonical provider cache grew to ${canonicalProviderCache.size}`
    );
    // The alias was the oldest entry, so the cap evicted it. A hit would mean
    // the lookup never had to recompute.
    assert.equal(canonicalProviderCache.get("cx"), undefined);
    assert.equal(getCanonicalLockProvider("cx"), "codex");
    assert.ok(canonicalProviderCache.size <= CANONICAL_LIMIT);
  });

  test("parseModel LRU matches a second call and the release parser", () => {
    for (const [input, expected] of RELEASE_PARSES) {
      const first = parseModel(input);
      const second = parseModel(input);
      assert.deepEqual(first, expected, `parseModel(${JSON.stringify(input)})`);
      assert.deepEqual(second, first);
      assert.notEqual(second, first);
    }
  });

  test("parseModel cache key follows MODEL_ALIAS_COMPAT_ENABLED", () => {
    const model = "anthropic/claude-opus-4.5";
    const previous = process.env.MODEL_ALIAS_COMPAT_ENABLED;
    try {
      delete process.env.MODEL_ALIAS_COMPAT_ENABLED;
      const enabled = parseModel(model);
      process.env.MODEL_ALIAS_COMPAT_ENABLED = "false";
      const disabled = parseModel(model);
      assert.notDeepEqual(enabled, disabled);
      // #16811: the provider-qualified alias keeps `anthropic` and resolves to the dashed
      // wire ID; only the bare `claude-opus-4.5` still maps to the dated snapshot.
      assert.equal(enabled.model, "claude-opus-4-5");
      assert.equal(enabled.provider, "anthropic");
      assert.equal(enabled.isAlias, false);
      assert.equal(disabled.provider, "anthropic");
      assert.equal(disabled.model, "claude-opus-4.5");
      assert.equal(disabled.isAlias, false);
    } finally {
      if (previous === undefined) delete process.env.MODEL_ALIAS_COMPAT_ENABLED;
      else process.env.MODEL_ALIAS_COMPAT_ENABLED = previous;
    }
  });

  test("parseModel cache stays within 2048 and recomputes an evicted id", async () => {
    const mod = await import("../../open-sse/services/model.ts");
    const cache = mod.parseModelCache;
    assert.ok(cache, "parseModelCache is not exported");
    cache.clear();

    for (let i = 0; i < mod.PARSE_MODEL_CACHE_LIMIT; i++) {
      const id = `probe-parse-model-${i}`;
      const parsed = parseModel(id);
      assert.equal(parsed.model, id);
      assert.equal(parsed.isAlias, true);
      assert.equal(parsed.provider, null);
    }
    assert.equal(cache.size, mod.PARSE_MODEL_CACHE_LIMIT);

    parseModel("probe-parse-model-extra");
    assert.ok(cache.size <= mod.PARSE_MODEL_CACHE_LIMIT);
    const rawCompat = process.env.MODEL_ALIAS_COMPAT_ENABLED;
    const compatFlag = rawCompat === "false" || rawCompat === "0" ? "0" : "1";
    assert.equal(cache.get(`${compatFlag}\0probe-parse-model-0`), undefined);

    const recomputed = parseModel("probe-parse-model-0");
    assert.deepEqual(recomputed, {
      provider: null,
      model: "probe-parse-model-0",
      isAlias: true,
      providerAlias: null,
      extendedContext: false,
    });
    assert.ok(cache.size <= mod.PARSE_MODEL_CACHE_LIMIT);
  });
});
