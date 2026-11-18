/**
 * Unit tests for the model-id prefix helpers shared by the /v1/models
 * catalog emission and the provider-model write paths.
 *
 * Pins the exact-match (case-sensitive) collapse contract and the boundary
 * cases the integration tests cannot reach on their own.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  collapseProviderPrefix,
  resolveProviderNodePrefix,
} from "../../src/shared/utils/modelIdPrefix";

test("collapseProviderPrefix strips repeated leading node prefixes", () => {
  assert.equal(collapseProviderPrefix("qwen-8b", ["strata"]), "qwen-8b");
  assert.equal(collapseProviderPrefix("strata/qwen-8b", ["strata"]), "qwen-8b");
  assert.equal(collapseProviderPrefix("strata/strata/qwen-8b", ["strata"]), "qwen-8b");
  assert.equal(
    collapseProviderPrefix("strata/strata/strata/qwen-8b", ["strata"]),
    "qwen-8b",
    "the live pollution shape collapses fully"
  );
});

test("collapseProviderPrefix keeps slashed upstream ids that are not node stacks", () => {
  assert.equal(collapseProviderPrefix("opc/big-pickle", ["strata"]), "opc/big-pickle");
  assert.equal(
    collapseProviderPrefix("opc/big-pickle", [null, undefined, "strata"]),
    "opc/big-pickle"
  );
  assert.equal(collapseProviderPrefix("strata/strata/m", []), "strata/strata/m");
  assert.equal(collapseProviderPrefix("openai/gpt-x", ["nvidia"]), "openai/gpt-x");
});

test("collapseProviderPrefix boundary cases", () => {
  assert.equal(
    collapseProviderPrefix("strata", ["strata"]),
    "strata",
    "bare prefix never collapses to empty"
  );
  assert.equal(
    collapseProviderPrefix("strata/", ["strata"]),
    "strata/",
    "trailing-slash-only id is left alone"
  );
  assert.equal(
    collapseProviderPrefix("a/b/a/b/m", ["a", "b"]),
    "m",
    "interleaved stacks collapse across candidates"
  );
  assert.equal(collapseProviderPrefix("", ["strata"]), "");
});

test("collapseProviderPrefix matching is exact (case-sensitive)", () => {
  // Pinned contract: a prefix renamed (or re-cased) after storage no longer
  // collapses; the stale id surfaces for cleanup instead of silently
  // changing identity.
  assert.equal(collapseProviderPrefix("Strata/m", ["strata"]), "Strata/m");
});

test("resolveProviderNodePrefix prefers the configured prefix", () => {
  assert.equal(resolveProviderNodePrefix({ prefix: "strata", name: "Local Strata" }), "strata");
  assert.equal(
    resolveProviderNodePrefix({ prefix: "  ", name: "Local Strata (probe)" }),
    "local-strata-probe"
  );
  assert.equal(
    resolveProviderNodePrefix({ prefix: 42, name: "N" }),
    "n",
    "non-string prefix falls back to the name slug"
  );
});

test("resolveProviderNodePrefix slug fallback and null cases", () => {
  assert.equal(resolveProviderNodePrefix({ name: "Local Strata (probe)" }), "local-strata-probe");
  assert.equal(resolveProviderNodePrefix({ name: "   " }), null);
  assert.equal(resolveProviderNodePrefix({}), null);
  assert.equal(resolveProviderNodePrefix(null), null);
  assert.equal(resolveProviderNodePrefix(undefined), null);
});
